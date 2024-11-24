// import CredentialsProvider from 'next-auth/providers/credentials';

// export const NEXT_AUTH_CONFIG = {
//     providers: [
//       CredentialsProvider({
//           name: 'Credentials',
//           credentials: {
//             username: { label: 'email', type: 'text', placeholder: '' },
//             password: { label: 'password', type: 'password', placeholder: '' },
//           },
//           async authorize(credentials: any) {
  
//               return {
//                   id: "user1",
//                   name: "asd",
//                   userId: "asd",
//                   email: "ramdomEmail"
//               };
//           },
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     callbacks: {
//         jwt: async ({ user, token }: any) => {
//         if (user) {
//             token.uid = user.id;
//         }
//         return token;
//         },
//       session: ({ session, token, user }: any) => {
//           if (session.user) {
//               session.user.id = token.uid
//           }
//           return session
//       }
//     },
//   }
// import { PrismaClient } from '@prisma/client';
// import CredentialsProvider from 'next-auth/providers/credentials';


// const prisma = new PrismaClient();

// export const NEXT_AUTH_CONFIG = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
//         password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
//         userType: { label: 'User Type', type: 'text' }, // Capture userType
//         adminCode: { label: 'Admin Code', type: 'text' }, // Capture adminCode for admins
//       },
//       async authorize(credentials: any) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Email and password are required');
//         }

//         const { email, password, userType, adminCode } = credentials;

//         // Fetch user from the database
//         const user = await prisma.user.findUnique({
//           where: { email },
//         });

//         if (!user) {
//           throw new Error('No user found with the given email');
//         }

//         // Check user type
//         if (userType === 'admin' && user.role !== 'admin') {
//           throw new Error('You are not authorized as an admin');
//         }

//         // Validate admin code for admin users
//         if (userType === 'admin' && adminCode !== process.env.ADMIN_CODE) {
//           throw new Error('Invalid admin code');
//         }

//         // Verify password
//         // const isPasswordValid = await bcrypt.compare(password, user.password);
//         // if (!isPasswordValid) {
//         //   throw new Error('Invalid password');
//         // }

//         return {
//           id: user.id,
//           password: user.password,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     jwt: async ({ user, token }: any) => {
//       if (user) {
//         token.uid = user.id;
//         token.role = user.role; // Add role to token
//       }
//       return token;
//     },
//     session: ({ session, token }: any) => {
//       if (session.user) {
//         session.user.id = token.uid;
//         session.user.role = token.role; // Include role in session
//       }
//       return session;
//     },
//   },
// };



import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
import { prisma } from "./client";

const ADMIN_CODE = "786123";

export const NEXT_AUTH_HANDLER: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
        userType: { label: "User Type", type: "text", placeholder: "User or Admin" },
        adminCode: { label: "Admin Code", type: "text", placeholder: "Admin Code", optional: true },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({ where: { email: credentials.email } });
        if (!user) {
          throw new Error("No user found with the given email.");
        }

        if (credentials.userType === "admin" && credentials.adminCode !== ADMIN_CODE) {
          throw new Error("Invalid admin code.");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.email = token.email ?? null;
        session.user.role = token.role ?? null;
      }
      return session;
    },
  },
};
