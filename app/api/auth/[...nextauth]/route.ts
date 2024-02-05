import prisma from "@/lib/prisma";

import NextAuth, { NextAuthOptions } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import DiscordProvider from "next-auth/providers/discord";
import { Adapter } from "next-auth/adapters";
import Email from "next-auth/providers/email";
// import GitHubProvider from "next-auth/providers/github";

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
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (!(account || user)) return false;
      console.log(user);
      console.log(account);
      return true;
    },
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
