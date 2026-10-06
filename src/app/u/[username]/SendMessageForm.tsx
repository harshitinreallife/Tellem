"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Send, User, Sparkles, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { Alata, Protest_Guerrilla } from "next/font/google";
import { gsap } from "gsap";

const alata = Alata({
    subsets: ["latin"],
    weight: "400",
});

const fredoka = Protest_Guerrilla({
    subsets: ["latin"],
    weight: "400",
});

type SendMessageFormProps = {
    username: string;
    isAcceptingMessages: boolean;
};

const texts = [
    "tell me who your crush is",
    "send me your confessions",
    "ask me anything",
    "not gonna lie",
    "send me a never have I ever",
    "describe me in 3 words",
    "share an opinion that’ll get you cancelled",
];

export default function SendMessageForm({
    username,
    isAcceptingMessages,
}: SendMessageFormProps) {
    const [content, setContent] = useState("");
    const [isSending, setIsSending] = useState(false);

    {/* Suggestion states */ }
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isSuggesting, setIsSuggesting] = useState(false);

    const marqueeRef = useRef<HTMLDivElement>(null);

    {/* Marquee animation */ }
    useEffect(() => {
        if (!marqueeRef.current) return;

        gsap.to(marqueeRef.current, {
            xPercent: -50,
            duration: 40,
            ease: "none",
            repeat: -1,
        });

        return () => {
            if (marqueeRef.current) {
                gsap.killTweensOf(marqueeRef.current);
            }
        };
    }, []);

    {/* Generate suggested messages    */ }
    const handleSuggestMessages = async () => {
        try {
            setIsSuggesting(true);

            const response = await axios.post("/api/suggest-messages");

            const rawSuggestions = response.data?.messages || response.data?.suggestions || response.data;

            let suggestionText = "";

            if (typeof rawSuggestions === "string") {
                suggestionText = rawSuggestions;
            } else if (
                rawSuggestions?.text &&
                typeof rawSuggestions.text === "string"
            ) {
                suggestionText = rawSuggestions.text;
            }

            const parsedSuggestions = suggestionText
                .split("||")
                .map((message: string) =>
                    message
                        .replace(/^["']|["']$/g, "")
                        .replace(/^\d+[\].-]\s*/, "")
                        .trim()
                )
                .filter(Boolean)
                .slice(0, 3);

            if (parsedSuggestions.length === 0) {
                throw new Error("No suggestions received");
            }

            setSuggestions(parsedSuggestions);
        } catch (error: any) {
            console.error("Suggestion error:", error);

            toast.error("Couldn't generate suggestions", {
                description: "Please try again in a moment.",
            });
        } finally {
            setIsSuggesting(false);
        }
    };

    {/* Select suggestion   */ }
    const handleSelectSuggestion = (suggestion: string) => {
        setContent(suggestion);
    };

    {/* Send message    */ }
    const handleSendMessage = async () => {
        const trimmedContent = content.trim();

        if (!trimmedContent) {
            toast.error("Please write a message", {
                description: "Your message is empty.",
            });

            return;
        }

        if (trimmedContent.length > 500) {
            toast.error("Message cannot be longer than 500 characters", {
                description: "Your message is too long.",
            });

            return;
        }

        try {
            setIsSending(true);

            await axios.post("/api/send-message", {
                username,
                content: trimmedContent,
            });

            toast.success("Tell sent! 💌", {
                description: "Your anonymous message has been delivered.",
            });

            setContent("");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to send message",
                {
                    description: "Please try again later",
                }
            );
        } finally {
            setIsSending(false);
        }
    };

    {/* User is not accepting messages  */ }
    if (!isAcceptingMessages) {
        return (
            <div className="min-h-screen bg-[#F9F9FA] px-4 flex items-center justify-center">
                <div className="w-full max-w-lg rounded-[2rem] border border-[#F3DCE7] bg-white p-8 text-center shadow-[0_8px_32px_rgba(15,14,66,0.08)]">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE4F1]">
                        <User
                            size={28}
                            className="text-[#ED1C7D]"
                        />
                    </div>

                    <h1
                        className={`${alata.className} text-2xl font-semibold text-[#0F0E42]`}
                    >
                        @{username}
                    </h1>

                    <p className="mt-3 text-sm text-[#737373]">
                        This user is currently not accepting anonymous
                        tells.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9F9FA] px-4">
            {/* MARQUEE */}

            <div
                className={`${fredoka.className} w-full overflow-hidden`}
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent, white 25%, white 85%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, white 25%, white 85%, transparent)",
                }}
            >
                <div
                    ref={marqueeRef}
                    className="flex w-max items-center bg-white text-[#f40977]"
                >
                    {[...texts, ...texts, ...texts].map(
                        (text, index) => (
                            <div
                                key={index}
                                className="flex items-center whitespace-nowrap py-2.5"
                            >
                                <span className="mx-1 text-sm sm:text-md font-light tracking-wide">
                                    {text}
                                </span>

                                <span className="ml-2 mt-1 pr-2 text-sm sm:text-md font-bold">
                                    •
                                </span>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Logo */}

            <div>
                <Image
                    className="Hero-nav absolute top-2 -left-2 sm:top-1 sm:left-1 md:top-0 md:-left-4 lg:-top-2 lg:-left-5 w-35 sm:w-45 md:w-56 lg:w-70 mt-6 h-fit -rotate-0"
                    src="/images/tellem.png"
                    alt="Tell'em logo"
                    width={350}
                    height={300}
                />
            </div>

            <main className={`${alata.className} mx-auto w-full max-w-lg mt-15 mb-10`}>
                <div className="rounded-[2rem] border border-[#F3DCE7] bg-white p-6 shadow-[0_8px_32px_rgba(15,14,66,0.08)] sm:p-8">

                    {/* Profile */}

                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-35 w-30 items-center justify-center rounded-2xl border-3 border-[#ED1C7D] bg-[#074FC3]">
                            <User
                                size={48}
                                strokeWidth={1.4}
                                className="text-white"
                            />
                        </div>

                        <h1
                            className={`${alata.className} mt-1 text-xl font-semibold text-[#0F0E42]`}
                        >
                            @{username}
                        </h1>

                        <p className="mt-2 text-sm text-[#737373]">
                            Send me an anonymous tell 👀
                        </p>
                    </div>

                    {/* Message */}

                    <div className="mt-8">

                        {/* Suggestion Header */}

                        <div className="mb-3 flex items-center justify-between">

                            <button type="button" onClick={handleSuggestMessages} disabled={isSuggesting} className="group flex items-center gap-1.5 rounded-full border border-[#F3DCE7] bg-[#FFF8FB] px-3 py-1.5 text-sm font-semibold text-[#ED1C7D] transition-all duration-200 hover:border-[#ED1C7D] hover:bg-[#FFE4F1] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer">
                                {isSuggesting ? (
                                    <Loader2
                                        size={14}
                                        className="animate-spin"
                                    />
                                ) : (
                                    <Sparkles
                                        size={14}
                                        className="transition-transform duration-300 group-hover:rotate-12"
                                    />
                                )}

                                {isSuggesting
                                    ? "Thinking..."
                                    : suggestions.length > 0
                                        ? "New suggestions"
                                        : "Suggest a tell"}
                            </button>
                        </div>

                        {/* Suggestions */}

                        {suggestions.length > 0 && (
                            <div className="mb-4 space-y-2">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={13} className="text-[#ED1C7D]" />

                                    <span className="text-[12px] font-medium capitalize tracking-wider text-[#A3A3A3]">
                                        Try one of these
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {suggestions.map(
                                        (suggestion, index) => (
                                            <button key={index} type="button" onClick={() => handleSelectSuggestion(suggestion)} className="group w-full rounded-xl border border-[#F3DCE7] bg-[#FCFCFC] px-3.5 py-3 text-left text-[15px] text-[#404040] transition-all duration-200 hover:-translate-y-px hover:border-[#ED1C7D] hover:bg-[#FFF8FB] hover:text-[#0F0E42] hover:shadow-[0_4px_14px_rgba(237,28,125,0.08)] tracking-wide cursor-pointer"
                                            >
                                                <span className="flex items-start gap-2 ">
                                                    <span className="mt-0.5 text-[#ED1C7D] opacity-70">
                                                        {index === 0
                                                            ? "✦"
                                                            : index === 1
                                                                ? "✦"
                                                                : "✦"}
                                                    </span>

                                                    <span className="flex-1">
                                                        {suggestion}
                                                    </span>
                                                </span>
                                            </button>
                                        )
                                    )}
                                </div>

                                <p className="pt-1 text-center text-[12.5px] text-[#A3A3A3]">
                                    Tap a suggestion to use it
                                </p>
                            </div>
                        )}

                        {/* Textarea */}

                        <textarea
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            placeholder="Write something anonymously..."
                            maxLength={500}
                            className="min-h-40 w-full resize-none rounded-2xl border border-[#F3DCE7] bg-[#FCFCFC] p-4 text-sm text-[#0F0E42] outline-none placeholder:text-[#A3A3A3] focus:border-[#ED1C7D] focus:ring-2 focus:ring-[#FFE4F1]"
                        />

                        {/* Character Count */}

                        <div className="mt-2 text-right text-xs text-[#737373]">
                            {content.length}/500
                        </div>
                    </div>

                    {/* Send */}

                    <button
                        onClick={handleSendMessage}
                        disabled={isSending}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-4xl bg-[#ED1C7D] px-5 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#d91870] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer tracking-wider"
                    >
                        {isSending ? (
                            <>
                                <Loader2
                                    size={18}
                                    className="animate-spin"
                                />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send size={18} />
                                Send anonymously
                            </>
                        )}
                    </button>

                    <p className="mt-5 text-center text-sm text-[#737373]">
                        Your identity will not be shown to the recipient.
                    </p>
                </div>
            </main>
        </div>
    );
}