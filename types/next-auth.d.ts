/* eslint-disable no-unused-vars */
import { User } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
