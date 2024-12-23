import NextAuth, { DefaultSession, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

enum Role {
   ADMIN,
   MEMBER,
}

declare module "next-auth" {
   interface Session {
      user: {
         id: string;
         email: string;
         firstName: string;
         lastName: string;
         phone: string;
         studentId: string;
         role: Role;
      } & DefaultSession["user"];
   }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: PrismaAdapter({ prisma: db }),
   providers: [
      Credentials({
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials) => {
            if (!credentials?.email) {
               throw new Error("Email is required");
            }

            if (!credentials?.password) {
               throw new Error("Password is required");
            }

            const user = await db.user.findUnique({
               where: {
                  email: credentials.email as string,
               },
            });

            if (!user) {
               throw new Error("No user found");
            }

            const isValid = await bcrypt.compare(
               credentials.password as string,
               user.password ?? ""
            );

            if (!isValid) {
               throw new Error("Invalid password");
            }

            return user;
         },
      }),
   ],
   secret: "somethingwentwrong",
   session: {
      strategy: "jwt",
   },
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user?.id ?? "";
            token.email = user?.email ?? "";
            // @ts-ignore
            token.firstName = user?.firstName ?? "";
            // @ts-ignore
            token.lastName = user?.lastName ?? "";
            // @ts-ignore
            token.phone = user?.phone ?? "";
            // @ts-ignore
            token.studentId = user?.studentId ?? "";
            // @ts-ignore
            token.role = user?.role ?? "";
         }
         return token;
      },
      async session({ session, token }) {
         session.user.id = token.id as string;
         session.user.email = token.email as string;
         session.user.firstName = token.firstName as string;
         session.user.lastName = token.lastName as string;
         session.user.phone = token.phone as string;
         session.user.studentId = token.studentId as string;
         session.user.role = token.role as Role;
         return session;
      },
   },
});
