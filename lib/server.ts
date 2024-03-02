import { NextResponse } from "next/server";
import prisma from "./prisma";
import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import Email from "next-auth/providers/email";
import { cache } from "react";

const admins = ["fahimh7@nycstudents.net", "davidw201@nycstudents.net"];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {},
  providers: [
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
      authorization: { params: { scope: "identify guilds role_connections.write" } },
    }),
  ],
  session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (!(account || user)) return false;

      console.log(user);
      console.log(account);

      return true;
    },
    session: ({ session, user }) => ({
      ...session,
      user,
    }),
  },
  events: {
    async signIn({ user: user, account }) {
      if (!user || !account) {
        return;
      }
      if (admins.includes(user.email!)) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            role: "ADMIN",
          },
        });
      }
      if (account.provider === "discord") {
        await fetch(`https://discord.com/api/v10/applications/${process.env.DISCORD_ID}/role-connections/metadata`, {
          method: "PUT",
          body: JSON.stringify([]),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          },
        });
        await fetch(`https://discord.com/api/v10/users/@me/applications/${process.env.DISCORD_ID}/role-connection`, {
          method: "PUT",
          body: JSON.stringify({
            platform_name: "Name",
            platform_username: user.name,
          }),
          headers: {
            Authorization: `Bearer ${account.access_token}`,
            "Content-Type": "application/json",
          },
        });
      }
    },
  },
};

export const wrongMethod = () => NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
export const unauthorized = () => NextResponse.json({ message: "Unauthorized" }, { status: 401 });
export const missingFields = () =>
  NextResponse.json({ message: "Bad Request - Missing required fields" }, { status: 400 });
export const duplicateEntry = () => NextResponse.json({ message: "Conflict" }, { status: 409 });
export const notFound = () => NextResponse.json({ message: "Not Found" }, { status: 404 });

/*
type GetUserOverloads = {
  (req: NextRequest | NextApiRequest | GetServerSidePropsContext["req"]): Promise<Prisma.UserGetPayload<{
    include: {
      accounts: true;
      team: { include: { users: { include: { formInfo: true } }; submission: true } };
      formInfo: true;
    };
  }> | null>;
  (req: string): Promise<Prisma.UserGetPayload<{
    include: {
      accounts: true;
      team: { include: { users: { include: { formInfo: true } }; submission: true } };
      formInfo: true;
    };
  }> | null>;
};
*/

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      accounts: true,
      team: {
        include: {
          users: {
            include: {
              formInfo: true,
            },
          },
          submission: true,
        },
      },
      formInfo: true,
    },
  });
  console.log("hi");
  if (!user) {
    return null;
  }
  return user;
};

export const getUserFromRequest = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }
  return getUser(session.user.id);
};

export const getSignedUsers = cache(async () => {
  return await prisma.user.findMany({
    where: { NOT: { formInfo: null } },
    include: {
      team: {
        include: {
          submission: true,
        },
      },
    },
  });
});

export const getAllSubmissions = async () => {
  return await prisma.submission.findMany({
    include: {
      team: true,
    },
  });
};

export const getAllSubmissionsPublic = async () => {
  return await prisma.submission.findMany({
    include: {
      team: true,
    },
    where: {
      public: true,
    },
  });
};

export const getSubmission = cache(async (id?: string) => {
  const user = await getUserFromRequest();
  // wtf https://github.com/prisma/prisma/issues/14976
  const userId = user?.id ?? "-1";
  console.log(id);
  console.log(user);
  const submission = await prisma.submission.findFirst({
    where: {
      AND: [
        {
          id: {
            equals: id,
          },
        },
        {
          OR: [
            {
              public: {
                equals: true,
              },
            },
            {
              team: {
                users: {
                  some: {
                    id: userId,
                  },
                },
              },
            },
          ],
        },
      ],
    },
    include: {
      team: {
        include: {
          users: true,
        },
      },
      media: true,
    },
  });
  if (!submission) {
    console.log("what the hell");
    return null;
  }
  return submission;
});

export async function redirect(destination = "/") {
  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
}

// https://stackoverflow.com/questions/61190495/how-to-create-object-from-another-without-undefined-properties
export function filterBody<T extends { [k: string]: unknown }, U extends string>(
  body: T,
  validFields: readonly U[],
): Partial<Pick<T, U>> {
  return Object.fromEntries(
    validFields.filter((field) => body[field] != undefined).map((field) => [field, body[field]]),
  ) as Partial<Pick<T, U>>;
}

export function filterBodyAndValidate<T extends { [k: string]: unknown }, U extends string, V extends U>(
  body: T,
  validFields: readonly U[],
  requiredFields: readonly V[],
): (Pick<T, V> & Partial<Pick<T, U>>) | null {
  const filteredBody = filterBody(body, validFields);
  if (!requiredFields.every((field) => filteredBody[field] != undefined)) {
    return null;
  }
  return filteredBody as Pick<T, V> & Partial<Pick<T, U>>;
}
