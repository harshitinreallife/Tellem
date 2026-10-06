import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/models/User.model";


export async function POST(request:Request){
    await dbConnect(); 

    const {username , content} = await request.json();

    try{
        const user = await UserModel.findOne({username});

        if(!user){
            return Response.json(
                {
                    success:false,
                    message:"User not found"
                },
                {
                    status:404
                }
            )
        }

        //is user accepting the messages or not

        if(!user.isAcceptingMessages){
            return Response.json(
                {
                    success:false,
                    message:"User is not accepting messages"
                },
                {
                    status:403
                }
            )
        }

        const newMessage = {
            content,createdAt:new Date(),isRead: false,
        }
        
        user.messages.push(newMessage as Message);
        //messeges array mai push kro new message 

        await user.save();
        //or message db mai bhi save krdo

         return Response.json(
            {
                success:true,
                message:"Message sent successfully"
            },
            {
                status:200
            }
        )
    }
     catch (error) {
        console.log("an error occured",error);
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