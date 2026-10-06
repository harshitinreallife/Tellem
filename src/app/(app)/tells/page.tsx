
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { apiResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { gsap } from "gsap";
import NavDashboard from "@/components/NavDashboard";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { Switch } from "@/components/ui/switch";
import { Loader2, RefreshCcw, Mail, } from "lucide-react";
import { toast } from "sonner";
import { Protest_Guerrilla, Alata, } from "next/font/google";


{/* Fonts */ }

const fredoka = Protest_Guerrilla({
    subsets: ["latin"],
    weight: "400",
});

const alata = Alata({
    subsets: ["latin"],
    weight: "400",
});

type MessageType = {
    _id: string;
    content: string;
    createdAt: string | Date;
    isRead: boolean;
};

const page = () => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSwitchLoading, setIsSwitchLoading] = useState(false);


    const { data: session } = useSession();

    const form = useForm({
        resolver: zodResolver(acceptMessageSchema),
        defaultValues: {
            acceptMessages: false,
        },
    });

    const { register, watch, setValue, } = form;

    const acceptMessages = watch("acceptMessages");



    {/* DELETE MESSAGE */ }

    const handleDelete = async (messageId: string) => {
        try {
            await axios.delete(
                `/api/delete-message/${messageId}`
            );

            setMessages((prevMessages) =>
                prevMessages.filter(
                    (message) =>
                        message._id.toString() !== messageId
                )
            );

            toast.success(
                "Tell Deleted Successfully",
                {
                    description: "Showing messages now",
                }
            );
        } catch (error: any) {
            toast.error(
                error?.response?.data.message ||
                "Failed to delete message"
            );
        }
    };

    const handleMessageRead = (messageId: string) => {
        setMessages((prevMessages) =>
            prevMessages.map((message) =>
                message._id === messageId
                    ? { ...message, isRead: true }
                    : message
            )
        );
    };

    {/* ACCEPT MESSAGES */ }
    const fetchAcceptMessage = useCallback(
        async () => {
            setIsSwitchLoading(true);

            try {
                const response =
                    await axios.get<apiResponse>(
                        "/api/accept-message"
                    );

                setValue(
                    "acceptMessages",
                    response.data
                        .isAcceptingMessages as boolean
                );
            } catch (error: any) {
                toast.error(
                    error?.response?.data.message ||
                    "Failed to fetch messages"
                );
            } finally {
                setIsSwitchLoading(false);
            }
        },
        [setValue]
    );


    {/* GET MESSAGES */ }
    const fetchMessages = useCallback(
        async (refresh: boolean = false) => {
            setIsLoading(true);

            try {
                const response =
                    await axios.get<apiResponse>(
                        "/api/get-messages"
                    );

                const fetchedMessages =
                    response.data.messages ?? [];

                setMessages(
                    fetchedMessages.map((message) => ({
                        _id: message._id.toString(),
                        content: message.content,
                        createdAt: message.createdAt,
                        isRead: message.isRead,
                    }))
                );

                if (refresh) {
                    toast.success(
                        "Messages Refreshed successfully",
                        {
                            description:
                                "Now showing latest messages",
                            position: "top-right",
                        }
                    );
                }
            } catch (error: any) {
                toast.error(
                    error?.response?.data.message ||
                    "Failed to fetch messages"
                );
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    {/* MARQUEE */ }
    useEffect(() => {
        gsap.to(marqueeRef.current, {
            xPercent: -50,
            duration: 40,
            ease: "none",
            repeat: -1,
        });

        if (!session || !session.user) return;

        fetchMessages();
        fetchAcceptMessage();
    }, [
        session,
        fetchMessages,
        fetchAcceptMessage,
    ]);

    {/* SWITCH CHANGE */ }

    const handleSwitchChange = async () => {
        try {
            const response =await axios.post<apiResponse>("/api/accept-message",
                    {
                        acceptMessages:!acceptMessages,
                    }
                );

            setValue(
                "acceptMessages",
                !acceptMessages
            );

            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(
                error?.response?.data.message ||
                "Failed to update"
            );
        }
    };

    {/* LOGIN CHECK */ }

    if (!session || !session.user) {
        return <div>Please Login</div>;
    }

    const { username } = session.user as User;

    {/* MARQUEE TEXT */ }

    const texts = [
        "tell me who your crush is",
        "send me your confessions",
        "ask me anything",
        "not gonna lie",
        "send me a never have I ever",
        "describe me in 3 words",
        "share an opinion that’ll get you cancelled",
    ];

    {/* UI */ }

    return (
        <div className="h-dvh overflow-hidden bg-[#F9F9FA]">
            {/* MARQUEE */}

            <div
                className={`${fredoka.className} overflow-hidden w-full `}
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent, white 25%, white 85%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, white 25%, white 85%, transparent)",
                }}
            >
                <div ref={marqueeRef} className="flex w-max items-center bg-white text-[#f40977]"
                >
                    {[...texts, ...texts, ...texts,].map((text, index) => (
                        <div key={index} className="flex items-center whitespace-nowrap py-2.5">
                            <span className="mx-1 text-sm sm:text-md font-light tracking-wide">{text}</span>
                            <span className="ml-2 mt-1 pr-2 text-sm sm:text-md font-bold"> • </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* MAIN DASHBOARD */}

            <section
                className={`${alata.className} font-bold relative text-[#0f0e42] flex flex-col items-center w-[calc(100%-2rem)] lg:w-full lg:max-w-5xl mx-auto h-180 max-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-20 pt-28 sm:pt-32 bg-white mt-4 rounded-[2rem] border border-[#F3DCE7] shadow-[0_8px_32px_rgba(15,14,66,0.08)] overflow-hidden mb-7`}
            >

                {/* NAVBAR  */}

                <div className="Hero-nav absolute top-10 sm:top-14 md:top-10 left-0 w-full flex justify-center px-2 text-2xl">
                    <NavDashboard />
                </div>

                {/* CONTROLS  */}

                <div className="flex flex-wrap items-center gap-3 w-full max-w-4xl justify-between px-2 sm:px-4 shrink-0">

                    {/* Receive Tells */}

                    <div className="flex items-center">
                        <Switch {...register("acceptMessages")} checked={acceptMessages} onCheckedChange={handleSwitchChange} disabled={isSwitchLoading} className={'cursor-pointer'} />

                        <span className=" ml-2 tracking-wider text-sm sm:text-md ">
                            💌 Receive Tells : {acceptMessages ? "On" : "Off"}
                        </span>
                    </div>

                    {/* Refresh Tells */}

                    <div className="flex items-center gap-2">
                        <span className=" tracking-wider text-sm sm:text-md">
                            Refresh Tells:
                        </span>

                        <Button className="h-8 w-8 rounded-full border-2 border-[#F3DCE7] text-[#ED1C7D] hover:bg-[#FFE4F1] cursor-pointer" variant="outline" onClick={(e) => { e.preventDefault(); fetchMessages(true); }}>
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <RefreshCcw />
                            )}
                        </Button>
                    </div>
                </div>

                {/* TELLS LIST  */}

                <div className=" mt-6 w-full max-w-4xl flex-1 min-h-0 mb-8">
                    {messages.length > 0 ? (
                        <div className="h-full w-full p-3 overflow-y-auto overflow-x-hidden rounded-[1rem] border border-[#F3DCE7] bg-white shadow-[0_8px_32px_rgba(15,14,66,0.08)] scrollbar-thumb-[#F3DCE7] scrollbar-track-transparent ">
                            {messages.map((message) => (
                                <MessageCard key={message._id} messages={message} onMessageDelete={handleDelete} onMessageRead={handleMessageRead} />
                            )
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center px-6 text-center">
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFE4F1]">
                                <Mail className="h-6 w-6 text-[#ED1C7D]" />
                            </div>

                            <p className=" text-lg font-semibold text-[#171717]">No tells yet</p>

                            <p className="mt-1 max-w-sm text-sm text-[#737373]">Share your anonymous message link and start receiving tells from people.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default page;
