// app/about/page.tsx
'use client'

import NavHome2 from "@/components/NavHome2";
import Image from "next/image";
import { gsap } from 'gsap';
import { useEffect } from "react";
import TellemLogo from "@/components/TellemLogo";

export default function AboutPage() {

    useEffect(() => {
        gsap.to(".hero-float , .hero-2-left, .hero-2-right", {
            y: -25,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
    }, []);

    return (
        <main className="h-full bg-white text-[#000000]">

            <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-20">

                {/* Logo */}
                <TellemLogo />

                {/* Navbar-2 Content */}
                <div className="Hero-nav absolute top-16 sm:top-14 md:top-10 left-0 w-full flex justify-center px-2">
                    <NavHome2 textColor="text-black/90" />
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-evenly w-full mt-8 sm:mt-12 lg:mt-20 gap-6 lg:gap-10">

                    <div className="relative text-center lg:text-left self-start">
                        <h1 className="text-left text-4xl sm:text-6xl md:text-7xl lg:text-[105px] tracking-tighter leading-none font-medium"><span className="text-[#EE1E7B]">about</span> section<br /></h1>
                    </div>

                    <div className="tracking-wider w-full lg:w-auto">

                        <p className="max-w-2xl mx-auto lg:mx-0 leading-7 text-[#000000] sm:text-lg">
                            <span className="sm:text-4xl md:text-5xl lg:text-[55px] text-3xl tracking-widest">our goal</span><br /><br />
                            Tellem is a fun anonymous messaging platform where your friends can send you honest thoughts, questions,confessions and random messages without revealing their identity. We believe that our online friendships are just an extension of the real world, and not a replacement. Your online interactions with your friends should deepen your connections rather than strain them. Tellem allows you to get to know your friends authentically through exciting and intriguing Q&A games, strengthening your friendships and helping you be your authentic self.It's hard to make real friends, and it's hard to be authentic online today. Tellem is here to help you do both in a fun and safe way.
                        </p>
                    </div>

                </div>

                <div className="mt-12 flex flex-col w-full max-w-full">

                    <div className="bg-white p-6">
                        <div className="text-3xl flex items-center gap-3">💌<h2 className="font-semibold">
                            Anonymous
                        </h2></div>

                        <p className="mt-2 text-sm text-[#737373]">
                            Send messages without revealing who you are.
                        </p>
                    </div>

                    <div className="bg-white p-6">
                        <div className="text-3xl flex items-center gap-3">👀<h2 className="font-semibold">
                            Honest
                        </h2></div>

                        <p className="mt-2 text-sm text-[#737373]">
                            Say what you really think and feel.
                        </p>
                    </div>

                </div>

                <div className="hero-2-left relative hidden lg:block w-50 h-50">
                    <Image className="absolute z-20 -rotate-10 bottom-65 -right-38 w-60 h-60" src={'/images/crown.png'} alt="" width={200} height={200} />
                    <Image className="absolute z-10 bottom-36 -right-60 w-60 h-60" src={'/images/donut.png'} alt="" width={200} height={200} />

                </div>

            </section>

        </main>
    );
}