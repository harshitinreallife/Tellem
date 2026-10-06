
"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Check, Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { gsap } from "gsap";
import { Protest_Guerrilla, Alata } from "next/font/google";
import { FaInstagram, FaWhatsapp, FaSnapchatGhost, } from "react-icons/fa";
import NavDashboard from "@/components/NavDashboard";

type Platform = "Instagram" | "WhatsApp" | "Snapchat";

const prompts = [
    "Send me anonymous messages 👀",
    "Ask me anything 💌",
    "Tell me your biggest secret 🤫",
    "Describe me in 3 words ✨",
    "Tell me who your crush is ❤️",
    "Send me your confessions 🔥",
    "What's your first impression of me? 👀",
    "Tell me something you've never said to me 🤭",
    "Give me your honest opinion 💭",
    "Tell me something I don't know about you 👀",
    "Send me a never have I ever 😈",
    "Share a secret with me 🤫",
];

const texts = [
    "tell me who your crush is",
    "send me your confessions",
    "ask me anything",
    "not gonna lie",
    "send me a never have I ever",
    "describe me in 3 words",
    "share an opinion that’ll get you cancelled",
];

const alata = Alata({
    subsets: ["latin"],
    weight: "400",
});

const fredoka = Protest_Guerrilla({
    subsets: ["latin"],
    weight: "400",
});

const Page = () => {
    const { data: session, status } = useSession();

    const marqueeRef = useRef<HTMLDivElement>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>("Instagram");
    const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
    const [copied, setCopied] = useState(false);

    {/* PROFILE URL */ }

    const [profileUrl, setProfileUrl] = useState("");

    {/* Create profile URL after component mounts in browser */ }

    useEffect(() => {
        if (session?.user?.username) {
            const username = session.user.username;

            setProfileUrl(`${window.location.origin}/u/${username}`);
        }
    }, [session]);

    {/* MARQUEE */ }

    useEffect(() => {
        if (!marqueeRef.current) return;

        gsap.to(marqueeRef.current, {
            xPercent: -50,
            duration: 40,
            ease: "none",
            repeat: -1,
        });

        return () => {
            gsap.killTweensOf(marqueeRef.current);
        };
    }, []);

    {/* COPY PROFILE URL */ }

    const copyToClipboard = async () => {
        if (!profileUrl) {
            toast.error("Profile link is not available yet.");
            return;
        }

        try {
            await navigator.clipboard.writeText(profileUrl);

            setCopied(true);
            toast.success("Link copied! ✨", {
                description: "Your Tell'em profile link is ready to share.",
            });

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Copy failed:", error);
            toast.error("Unable to copy the link.");
        }
    };

    {/* RANDOM PROMPT */ }

    const getRandomPrompt = () => {
        if (prompts.length === 1) {
            return prompts[0];
        }

        let randomIndex = Math.floor(Math.random() * prompts.length);

        while (prompts[randomIndex] === selectedPrompt) {
            randomIndex = Math.floor(Math.random() * prompts.length);
        }

        return prompts[randomIndex];
    };

    {/* SELECT PLATFORM */ }

    const handlePlatformSelect = (platform: Platform) => {
        setSelectedPlatform(platform);
        setSelectedPrompt(getRandomPrompt());
    };

    {/* PLATFORM ICON */ }

    const renderPlatformIcon = (size = 32) => {
        if (selectedPlatform === "Instagram") {
            return (
                <FaInstagram
                    size={size}
                    className="text-[#E4405F]"
                />
            );
        }

        if (selectedPlatform === "WhatsApp") {
            return (
                <FaWhatsapp
                    size={size}
                    className="text-[#25D366]"
                />
            );
        }

        return (
            <FaSnapchatGhost
                size={size}
                className="text-black"
            />
        );
    };

    {/* WHATSAPP DIRECT SHARE */ }
    const shareToWhatsApp = () => {
        if (!profileUrl) {
            toast.error("Profile link is not available yet.");
            return;
        }

        const message = `${selectedPrompt}\n\n${profileUrl}`;

        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    };

    {/* SOCIAL BUTTON CLICK */ }

    const handleShareButton = (platform: Platform) => {
        handlePlatformSelect(platform);
    };

    {/* SESSION LOADING */ }
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[#FFF8FB] flex items-center justify-center">
                <p className="text-[#404040] text-lg">
                    Loading...
                </p>
            </div>
        );
    }

    {/* NOT LOGGED IN */ }

    if (!session || !session.user) {
        return (
            <div className="min-h-screen bg-[#FFF8FB] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-[#171717]">
                        Please Login
                    </h1>

                    <Link
                        href="/sign-in"
                        className="inline-block mt-4 text-[#ED1C7D] hover:underline"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    {/* MAIN PAGE */ }

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#F9F9FA]">

            {/* MARQUEE */}

            <div className={`${fredoka.className} overflow-hidden w-full`} style={{
                maskImage:
                    "linear-gradient(to right, transparent, white 25%, white 85%, transparent)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent, white 25%, white 85%, transparent)",
            }}
            >
                <div ref={marqueeRef} className="flex w-max items-center bg-white text-[#f40977]"
                >
                    {[...texts, ...texts, ...texts].map(
                        (text, index) => (
                            <div key={index} className="flex items-center whitespace-nowrap py-2.5"
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



            {/* MAIN DASHBOARD */}

            <section className={`${alata.className} font-bold relative text-[#0f0e42] flex flex-col items-center w-[calc(100%-2rem)] lg:w-full lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-20 pt-28 sm:pt-32 pb-10 bg-white mt-4 rounded-[2rem] border border-[#F3DCE7] shadow-[0_8px_32px_rgba(15,14,66,0.08)] overflow-visible mb-7`}
            >

                {/* NAVBAR */}

                <div className="Hero-nav absolute top-10 sm:top-14 md:top-10 left-0 w-full flex justify-center px-2 text-2xl">
                    <NavDashboard />
                </div>

                {/* CONTENT */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-18 items-start w-full mb-10">

                    {/* LEFT SIDE */}

                    <div className="w-full max-w-2xl mx-auto mt-8">

                        {/* HEADING */}

                        <div className="text-center mb-7">

                            <div className="flex justify-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#FFF0F7] border border-[#FFD6E8] flex items-center justify-center">
                                    <LinkIcon
                                        size={20}
                                        className="text-[#ED1C7D]"
                                    />
                                </div>
                                <h1 className="text-[28px] text-[#0F0E42] font-semibold lg:text-[35px]">
                                    Share Your Link</h1>
                            </div>

                            <p className="text-[#737373] text-[16px] sm:text-md mt-1 max-w-xl mx-auto">
                                Let your friends know. Share your link and receive anonymous messages.
                            </p>

                        </div>

                        {/* LINK BOX */}

                        <div className="w-full rounded-3xl border border-[#F3DCE7] bg-[#FFFAFC] p-5">

                            <p className="text-sm font-semibold text-[#404040] mb-3">Your Link</p>

                            <div className="flex items-center gap-2">

                                <input
                                    type="text"
                                    value={profileUrl}
                                    readOnly
                                    placeholder="Generating your profile link..."
                                    className="min-w-0 flex-1 h-12 px-4 rounded-2xl bg-white border border-[#E8E8EC] text-[#404040] text-sm outline-none"
                                />
                                
                                <Button
                                    type="button"
                                    onClick={copyToClipboard}
                                    disabled={!profileUrl}
                                    className="shrink-0 h-12 w-12 rounded-2xl bg-[#3b3739] hover:bg-[#514f4f] text-white disabled:opacity-50 cursor-pointer"
                                >
                                    {copied ? (
                                        <Check size={19} />
                                    ) : (
                                        <Copy size={19} />
                                    )}
                                </Button>

                            </div>

                            {/* SHARE BUTTON */}

                            <Button type="button" disabled={!profileUrl} onClick={() => {
                                if (!profileUrl) return;

                                if (typeof navigator !== "undefined" && navigator.share) {
                                    navigator.share({
                                        title: "Tell'em",
                                        text: "Send me an anonymous message 👀",
                                        url: profileUrl,
                                    });
                                } else {
                                    copyToClipboard();
                                }
                            }}
                                className="mt-4 w-full h-11 rounded-2xl bg-[#ED1C7D] hover:bg-[#D91770] text-white text-base font-semibold disabled:opacity-50  cursor-pointer"
                            >
                                Share
                            </Button>

                        </div>

                        {/* SHARE ON */}

                        <div className="mt-5">

                            <h2 className="text-2xl text-[#0F0E42] font-semibold mb-3">
                                Share on
                            </h2>

                            <div className="grid grid-cols-3 gap-2 sm:gap-4 ">

                                {/* INSTAGRAM */}
                                <button
                                    type="button"
                                    onClick={() => handleShareButton("Instagram")}
                                    className={`group h-14 w-full sm:h-16.5 sm:w-40 sm:justify-center rounded-2xl border px-1.5 lg:w-33 flex items-center justify-center  transition-all duration-200 cursor-pointer ${selectedPlatform === "Instagram"
                                            ? "border-[#F5AED1] bg-[#FFF4F9] shadow-[0_4px_16px_rgba(237,28,125,0.10)]"
                                            : "border-[#F0DCE7] bg-white hover:bg-[#FFF8FB]"
                                        }`}
                                >

                                    <div className="flex items-center justify-center sm:justify-start gap-1.5">

                                        <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full bg-linear-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4] flex items-center justify-center shrink-0">
                                            <FaInstagram className="text-[18px] sm:text-[21px] text-white" />
                                        </div>

                                        <div className="hidden sm:block text-left">
                                            <p className="text-[#171717] text-[15px]">
                                                Instagram
                                            </p>

                                            <p className="text-[12px] text-[#737373]">
                                                Story
                                            </p>
                                        </div>

                                    </div>

                                </button>


                                {/* WHATSAPP */}
                                <button
                                    type="button"
                                    onClick={() => handleShareButton("WhatsApp")}
                                    className={`group h-14 w-full sm:h-16.5 sm:w-40 sm:justify-center rounded-2xl border px-1.5 sm:px-2 flex items-center justify-center  transition-all duration-200 lg:w-33 cursor-pointer ${selectedPlatform === "WhatsApp"
                                            ? "border-[#A8E8BE] bg-[#F2FFF6] shadow-[0_4px_16px_rgba(37,211,102,0.10)]"
                                            : "border-[#DDEFE4] bg-white hover:bg-[#F8FFFA]"
                                        }`}
                                >

                                    <div className="flex items-center justify-center sm:justify-start gap-1.5">

                                        <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                                            <FaWhatsapp className="text-[18px] sm:text-[21px] text-white" />
                                        </div>

                                        <div className="hidden sm:block text-left">
                                            <p className="text-[#171717] text-[15px]">
                                                Whatsapp
                                            </p>

                                            <p className="text-[12px] text-[#737373]">
                                                Chat
                                            </p>
                                        </div>

                                    </div>

                                </button>


                                {/* SNAPCHAT */}
                                <button
                                    type="button"
                                    onClick={() => handleShareButton("Snapchat")}
                                    className={`group h-14 w-full sm:h-16.5 sm:w-40 sm:justify-center rounded-2xl border px-1.5 sm:px-2 flex items-center justify-center  transition-all duration-200 lg:w-33 cursor-pointer ${selectedPlatform === "Snapchat"
                                            ? "border-[#F3DF80] bg-[#FFFDF0] shadow-[0_4px_16px_rgba(250,210,0,0.10)]"
                                            : "border-[#EFEAD0] bg-white hover:bg-[#FFFDF7]"
                                        }`}
                                >

                                    <div className="flex items-center justify-center sm:justify-start gap-1.5">

                                        <div className="w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full bg-[#FFFC00] border border-[#EFE000] flex items-center justify-center shrink-0">
                                            <FaSnapchatGhost className="text-[18px] sm:text-[21px] text-black" />
                                        </div>

                                        <div className="hidden sm:block text-left">
                                            <p className="text-[#171717] text-[15px]">
                                                Snapchat
                                            </p>

                                            <p className="text-xs text-[#737373]">
                                                Story
                                            </p>
                                        </div>

                                    </div>

                                </button>

                            </div>
                        </div>

                        {/*  WHATSAPP DIRECT SHARE  */}

                        {selectedPlatform === "WhatsApp" && (
                            <Button type="button" onClick={shareToWhatsApp} disabled={!profileUrl}
                                className="w-full mt-3 h-11 rounded-2xl border border-[#25D366] bg-white hover:bg-[#F2FFF6] text-[#168C45] font-semibold disabled:opacity-50 cursor-pointer">
                                <FaWhatsapp size={20} />

                                Share Link on WhatsApp
                            </Button>
                        )}

                        {/*  FOOTER */}

                        <div className="mt-6 text-center">

                            <div className="flex items-center justify-center gap-6">

                                <span className="h-px w-25 bg-[#F3B4D4]" />

                                <span className="text-[#ED1C7D] text-2xl">
                                    ♡
                                </span>

                                <span className="h-px w-25 bg-[#F3B4D4]" />

                            </div>

                            <p className="text-[#8A8A8A] text-sm mt-3">
                                More people. More messages. More you.
                            </p>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="w-full flex flex-col items-center">

                        <div className="w-full max-w-100">

                            <p className="text-[#6B6B6B] text-sm sm:text-base mt-3 mb-3 text-center">
                                Take a screenshot and share it to {selectedPlatform}
                            </p>

                            {/* SHARE CARD */}

                            <div className="flex justify-center">

                                <div id="share-card" className=" relative w-90 h-full max-w-full overflow-hidden bg-linear-to-br from-[#FFE4F1] via-[#f5bdd9] to-[#FFDDBF] shadow-[0_10px_20px_rgba(15,14,66,0.15),0_6px_10px_rgba(237,28,125,0.10)] px-7 py-2 flex flex-col rounded-[40px]">

                                    {/* BACKGROUND DECORATIONS */}

                                    <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#ED1C7D]/10" />

                                    <div className="absolute top-[42%] -left-24 w-52 h-52 rounded-full bg-white/60" />

                                    <div className="absolute -bottom-14 -left-10 w-107.5 h-36 rounded-[50%] bg-[#ED1C7D]/20 rotate-[-8deg]" />

                                    <div className="absolute -bottom-24 -right-16 w-87.5 h-36 rounded-[50%] bg-[#FF9A70]/25 rotate-[7deg]" />

                                    {/* TOP LOGO */}

                                    <div className="relative z-10">

                                        <Image src="/images/tellem.png" alt="Tell'em" width={175} height={150} className="w-43.75 h-auto object-contain" />

                                    </div>

                                    {/* RANDOM PROMPT */}

                                    <div className="relative z-10 flex-1 flex flex-col justify-center">

                                        <div className="relative">

                                            {/* HEART */}

                                            <span className="absolute -top-14 left-5 text-[#ED1C7D] text-3xl rotate-[-15deg]">
                                                ♡
                                            </span>

                                            <span className="absolute -top-8 right-5 text-[#ED1C7D] text-xl">
                                                ♡
                                            </span>

                                            <span className="absolute -bottom-10 right-10 text-[#ED1C7D] text-2xl rotate-15">
                                                ♡
                                            </span>

                                            {/* SPEECH BUBBLE */}

                                            <div className="relative bg-white/80 backdrop-blur-sm rounded-[55%] shadow-[0_8px_25px_rgba(237,28,125,0.08)] mb-5 h-39 p-8">

                                                <div className="absolute -bottom-6 left-[21%] rotate-13 w-0 h-0 border-t-35 border-t-white/80 border-r-30 border-r-transparent" />

                                                <h2 className="text-center text-[#ED1C7D] text-[25.5px] leading-[1.08] font-semibold mt-2">
                                                    {selectedPrompt}
                                                </h2>

                                            </div>

                                        </div>

                                    </div>

                                    {/* PROFILE LINK */}

                                    <div className="relative z-10">

                                        <div className="bg-white/90 rounded-full min-h-13 px-3  flex items-center gap-3 shadow-[0_6px_20px_rgba(15,14,66,0.06)]">

                                            <div className="w-8 h-8 shrink-0 rounded-full bg-[#FFF0F7] flex items-center justify-center">

                                                <LinkIcon
                                                    size={16}
                                                    className="text-[#ED1C7D]"
                                                />

                                            </div>

                                            <p className="text-[#404040] text-[13.5px] truncate">
                                                {profileUrl || "Generating link..."}
                                            </p>

                                        </div>

                                    </div>

                                    {/* PLATFORM ICON */}

                                    <div className="relative z-10 flex justify-center mt-9">

                                        <div className={`w-16.5 h-16.5 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(15,14,66,0.10)] ${selectedPlatform === "Snapchat" ? "bg-[#fffb039f]" : "bg-white"}`}>
                                            {renderPlatformIcon(33)}
                                        </div>

                                    </div>

                                    {/* INSTRUCTION */}

                                    <div className="relative z-10 text-center mt-5 mb-3">

                                        <p className="text-[#0F0E42] text-[21px] leading-[1.2] font-semibold">
                                            Send me annonymous
                                            <br />
                                            messages
                                        </p>

                                        <div className="flex justify-center mt-3">
                                            <span className="text-[#ED1C7D] text-3xl">
                                                〰
                                            </span>
                                        </div>

                                    </div>

                                    {/* DECORATIVE HEARTS */}

                                    <span className="absolute bottom-24 left-7 text-[#ED1C7D] text-lg z-10">
                                        ♡
                                    </span>

                                    <span className="absolute bottom-20 left-12 text-[#ED1C7D] text-sm z-10">
                                        ♡
                                    </span>

                                    <span className="absolute bottom-32 right-8 text-[#ED1C7D] text-xl z-10">
                                        ♡
                                    </span>

                                </div>

                            </div>

                            {/* PREVIEW INFO */}

                            <div className="mt-5 text-center">

                                <p className="text-sm text-[#737373]">
                                    Tap a platform to create a new random
                                    message card.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        </div>
    );
};

export default Page;
