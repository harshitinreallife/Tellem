import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { notFound } from "next/navigation";
import SendMessageForm from "./SendMessageForm";

type PageProps = {
    params: Promise<{
        username: string;
    }>;
};

export default async function PublicProfilePage({
    params,
}: PageProps) {
    const { username } = await params;

    await dbConnect();

    const user = await UserModel.findOne({
        username,
    })
        .select("username isAcceptingMessages")
        .lean();

    if (!user) {
        notFound();
    }

    return (
        <SendMessageForm
            username={user.username}
            isAcceptingMessages={user.isAcceptingMessages}
        />
    );
}