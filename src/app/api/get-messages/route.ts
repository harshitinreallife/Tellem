import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    const _user: User = session?.user ;

    if (!session || !_user) {
        return Response.json(
            {   
                success: false,
                message: "Not Authenicated"
            },
            {
                status: 401
            }
        )
    }

    const userId = new mongoose.Types.ObjectId(_user._id);

    try {
        const user = await UserModel.aggregate([
            { $match: { _id: userId } },  //sirf woh document dhundho jahan _id humare logged-in user se match kare.

            { $unwind: {
                path:'$messages',
                 preserveNullAndEmptyArrays: true
             }},  //$unwind array ko "explode" karta hai — har element apna alag document ban jaata hai. Yeh isliye kiya jaata hai taaki hum agle step mein individual messages sort kar sakein.

            { $sort: { 'messages.createdAt': -1 } },

            
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
            //Sort karne ke baad 3 alag documents hain. $group unhe wapas ek document mein laata hai. $push saare messages ko wapas array mein collect karta hai — lekin ab sorted order mein.
        ]);

        if (!user || user.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "No user found"
                },
                {
                    status: 404
                }
            )
        }
        return Response.json(
            {
                success: true,
                messages: user[0].messages
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.log("an error occured");
        return Response.json(
            {
                success: false,
                message: "Something went wrong"
            },
            {
                status: 500
            }
        );


    }

}