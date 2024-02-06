/* eslint-disable no-unused-vars */
/* Utility functions for common server-side actions*/
import { Prisma } from "@prisma/client";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import prisma from "./prisma";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import Email from "next-auth/providers/email";

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

export const wrongMethod = () => Response.json({ message: "Method Not Allowed" }, { status: 405 });
export const unauthorized = () => Response.json({ message: "Unauthorized" }, { status: 401 });
export const missingFields = () => Response.json({ message: "Bad Request - Missing required fields" }, { status: 400 });
export const duplicateEntry = () => Response.json({ message: "Conflict" }, { status: 409 });
// this should probably be a dedicated page
export const notFound = () => Response.json({ message: "Not Found" }, { status: 404 });

// only to be used in reading, for updating just call prisma manually
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

export const getUser: GetUserOverloads = async (req) => {
  const id = typeof req == "string" ? req : (await getToken({ req }))?.sub;
  if (!id) {
    return null;
  }
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
  if (!user) {
    return null;
  }
  return user;
};

export const getSignedUsers = async () => {
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
};

export const getAllSubmissions = async () => {
  return await prisma.submission.findMany({
    include: {
      team: true,
    },
  });
};

export const getSubmission = async (
  req: NextRequest | NextApiRequest | GetServerSidePropsContext["req"] | string,
  id: string,
) => {
  const jwt = typeof req == "string" ? req : (await getToken({ req }))?.sub;
  if (!jwt) {
    return null;
  }
  // extremely common prisma W
  const submission = await prisma.submission.findFirst({
    where: {
      id,
      OR: [
        {
          public: true,
        },
        {
          team: {
            users: {
              some: {
                id: jwt,
              },
            },
          },
        },
      ],
    },
    include: {
      team: {
        include: {
          users: true,
        },
      },
    },
  });
  if (!submission) {
    return null;
  }
  return submission;
};

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
