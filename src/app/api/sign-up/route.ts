import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/models/User.model";
import { sendVerificationEmail } from "@/helpers/sendVerifyEmail";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json()

        // Check 1 — Username Already Taken?
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {
                status: 400
            })
        }
        
        // Generate Verification Code
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        // Check 2 — Email Already Exists?
        const existingUserbyemail = await UserModel.findOne({ email })

        if (existingUserbyemail) {
            
            //Branch A — Email Exists, User is Verified
            if (existingUserbyemail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                }, {
                    status: 400
                })
            } 
            
            //Branch B — Email Exists, But User is NOT Verified
            else { 

                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserbyemail.username = username
                existingUserbyemail.password = hashedPassword
                existingUserbyemail.verifyCode = verifyCode
                existingUserbyemail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserbyemail.save()

            }
        } 
           // Branch C — Completely New User
        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = await new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isUserAcceptingMessage: true,
                messages: [],

            })
            await newUser.save()
        }
        //Send Verification Email 
        const emailResponse = await sendVerificationEmail(email, username, verifyCode)
        if (!emailResponse.success) {
            return Response.json(
                {
                    message: "Email sent failed",
                    success: false

                }, { status: 500 }
            )
        }
        return Response.json(
            {
                success: true,
                message: "User registered successfully.Please verify your email"
            }, { status: 200 }
        )

    }
    catch (error) {
        console.log("error in signup ", error);
        return Response.json({
            success: false,
            message: "error in signup"
        }, {
            status: 500
        })
    }
}
