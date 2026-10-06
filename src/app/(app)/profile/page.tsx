"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {User, Link as LinkIcon, Copy, Check, LogOut, MessageCircle,} from "lucide-react";
import { gsap } from "gsap";
import NavDashboard from "@/components/NavDashboard";
import { toast } from "sonner";
import { Alata, Protest_Guerrilla } from "next/font/google";


{/*Google Fonts*/}
const alata = Alata({
  subsets: ["latin"],
  weight: "400",
});
const fredoka = Protest_Guerrilla({
  subsets: ["latin"],
  weight: "400",
});


{/*Marquee Text*/}
const texts = [
  "tell me who your crush is",
  "send me your confessions",
  "ask me anything",
  "not gonna lie",
  "send me a never have I ever",
  "describe me in 3 words",
  "share an opinion that’ll get you cancelled",
];


export default function ProfilePage() {
  const { data: session, status } = useSession();
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [profileUrl, setProfileUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [tellsCount, setTellsCount] = useState(0);
  const [loadingTells, setLoadingTells] = useState(true);

  {/* Marquee Animation */}

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

  {/* Create profile URL */}
  useEffect(() => {
    if (session?.user?.username) {
      setProfileUrl(
        `${window.location.origin}/u/${session.user.username}`
      );
    }
  }, [session]);

  {/* Fetch number of Tells */}
  useEffect(() => {
    const fetchTellsCount = async () => {
      try {
        const response = await fetch("/api/get-messages");

        const data = await response.json();

        if (data.success) {
          setTellsCount(data.messages.length);
        }
      } catch (error) {
        console.error("Error fetching tells:", error);
      } finally {
        setLoadingTells(false);
      }
    };

    if (session?.user) {
      fetchTellsCount();
    }
  }, [session]);

  {/* Copy profile link */ }
  const copyProfileLink = async () => {
    if (!profileUrl) return;

    await navigator.clipboard.writeText(profileUrl);

    setCopied(true);
    toast.success("Profile link copied!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  {/* Loading */ }
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F9F9FA]">
        <NavDashboard />

        <div className="flex min-h-[80vh] items-center justify-center">
          <p className="text-[#242424]">Loading...</p>
        </div>
      </div>
    );
  }

  {/* Not authenticated */ }
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#F9F9FA]">
        <NavDashboard />

        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4">
          <p className="text-[#737373]">
            Please login to view your profile.
          </p>

          <Link
            href="/sign-in"
            className="rounded-full bg-[#ED1C7D] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#d91870]"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

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
        <div ref={marqueeRef} className="flex w-max items-center bg-white text-[#f40977]">
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


      <main className={`${alata.className} font-bold relative text-[#0f0e42] flex flex-col items-center w-[calc(100%-2rem)] lg:w-full lg:max-w-5xl mx-auto px-4 sm:px-6 md:px-20 pt-28 sm:pt-32 pb-10 bg-white mt-4 rounded-[3rem] border border-[#F3DCE7] shadow-[0_8px_32px_rgba(15,14,66,0.08)] overflow-y-auto mb-7`}>

        {/* NAVBAR */}

            <div className="Hero-nav absolute top-10 sm:top-14 md:top-10 left-0 w-full flex justify-center px-2 text-2xl">
                <NavDashboard />
            </div>




        {/* Username */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-35 w-30 items-center justify-center rounded-2xl border-3 border-[#ED1C7D] bg-[#074fc3]">
            <User
              size={48}
              strokeWidth={1.4}
              className="text-[#ffffff]"
            />
          </div>

          <h1 className="mt-2 text-2xl font-semibold text-[#0F0E42]">
            Anonymous
          </h1>

          <p className="mt-1 text-md text-[#737373]">
            @{session?.user?.username}
          </p>
        </div>

        {/* Profile Link */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-40 w-full">

          <div className="mt-5 w-full md:w-auto">
            <div className="flex items-center gap-2 rounded-2xl border border-[#F3DCE7] bg-[#fcfcfca4] p-2 shadow-[0_8px_32px_rgba(15,14,66,0.08)]">
              <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
                <LinkIcon
                  size={18}
                  className="shrink-0 text-[#ED1C7D]"
                />

                <span className="truncate text-sm text-[#0F0E42]">
                  {profileUrl}
                </span>
              </div>

              <button onClick={copyProfileLink} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ED1C7D] text-white transition hover:bg-[#d91870]" >
                {copied ? (
                  <Check size={18} />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Tells Count */}
          <div className="mt-5 items-center rounded-2xl border border-[#F3DCE7] bg-[#fcfcfca4] shadow-[0_8px_32px_rgba(15,14,66,0.08)] w-full md:mr-20 md:w-60 px-2 py-1.5">
            <div className="flex items-center">
              <div className="flex h-8 w-9 items-center justify-center rounded-xl bg-[#FFE4F1]">
                <MessageCircle
                  size={21}
                  className="text-[#ED1C7D]"
                />
              </div>

              <div className="flex items-center gap-2 p-3">
                <p className="text-sm font-medium text-[#0F0E42]">
                  Tells received :
                </p>
                <span className="text-[16px] font-semibold text-[#ED1C7D]">
                  {loadingTells ? "..." : tellsCount}
                </span>

              </div>
            </div>

          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="mt-5 flex w-fit items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3.5 text-md font-medium text-red-500 transition hover:bg-red-100 cursor-pointer"
        >
          <LogOut size={18} />
          Sign out
        </button>

      </main>
    </div>
  );
}