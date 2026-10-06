import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, code } = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const existingUser = await UserModel.findOne({ username: decodedUsername })

        if (!existingUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            })
        }

        const isCodeValid = existingUser.verifyCode === code;
        const isCodeNotExpired = new Date(existingUser.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
            existingUser.isVerified = true;
            await existingUser.save()
            return Response.json({
                success: true,
                message: "Email verified successfully"
            }, {
                status: 200
            }
            )
        }
        else if (!isCodeNotExpired) {
            // Code has expired
            return Response.json({
                success: false,
                message: "Verification code is expired"
            }, {
                status: 400
            })
        } 
        
        else {
            return Response.json({
                success: false,
                message: "Verification code is invalid"
            }, {
                status: 400
            }
            )
        }




    }
    catch (error) {
        console.error('Error verifying user:', error);
        return Response.json(
            { success: false, message: 'Error verifying user' },
            { status: 500 }
        );
    }
}