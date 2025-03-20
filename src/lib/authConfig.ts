import { shortCreateProfile } from "@/lib/authAction";
import type { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: AuthOptions = {
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
    ],
    callbacks: {
        async jwt({token, user}: { token: JWT; user?: any}) {
            const res = await shortCreateProfile(user.name, user.email);
            return token
        },
    }
}
