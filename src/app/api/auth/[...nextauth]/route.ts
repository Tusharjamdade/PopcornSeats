import NextAuth from "next-auth";
import { NEXT_AUTH_HANDLER } from "../../../../../handler";


const handler = NextAuth(NEXT_AUTH_HANDLER);


export const GET = handler;
export const POST = handler;
