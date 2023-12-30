import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import prisma from "./connect";

import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Credentials({
      name: "credentials",
      type: "credentials",
      id: "1",
      credentials: {
        password: {
          type: "password",
          label: "password",
          placeholder: "password",
        },
        email: {
          type: "text",
          placeholder: "email",
          label: "email",
        },
      },
      authorize(credentials) {
        console.log("exec");
        const user = {
          id: "1",
          email: "n@n.com",
          password: "n",
        };
        if (credentials?.email === null || credentials?.password === null)
          return null;

        if (
          credentials?.email !== user.email &&
          credentials?.password !== user.password
        ) {
          return null;
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "http://localhost:3000/login",
  },
};
