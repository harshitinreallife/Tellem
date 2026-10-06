import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";



export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "CredentialsProvider",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.email },
                            { username: credentials.email }
                        ]
                    });

                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Missing credentials")
                    }



                    if (!user) {
                        throw new Error("user not found")
                    }

                    if (!user.isVerified) {
                        throw new Error("please verify your account")
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

                    if (isPasswordValid) {
                        return user
                        

                    } else {
                        throw new Error("invalid password")
                    }


                }
                catch (err: unknown) {
                    if (err instanceof Error) {
                        throw new Error(err.message);
                    }

                    throw new Error("An unexpected error occurred");
                }


            },

        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user.id
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
                token.email = user.email
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id as string
                session.user.isVerified = token.isVerified as boolean
                session.user.username = token.username as string
                session.user.isAcceptingMessages = token.isAcceptingMessages as boolean
            }
            console.log(session);
            
            return session
        }
    },

    pages: {
        signIn: '/sign-in',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },






}