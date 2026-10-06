'use client'

import NavHome2 from "@/components/NavHome2";
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

                    <div className="static lg:sticky lg:top-40 self-start text-center lg:text-left">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[130px] tracking-tighter leading-none font-medium"><span className="text-black">safety</span> center<br /></h1>
                    </div>

                    <div className="tracking-wider leading-8 w-full lg:w-auto">

                        <p className="max-w-2xl mx-auto lg:mx-0 text-[#000000] sm:text-lg wrap-break-word">
                            <div className="leading-tight sm:leading-13 h-auto sm:h-37">
                                <span className="text-2xl sm:text-4xl md:text-[55px] tracking-tighter ">our approach to</span><span className="text-2xl sm:text-4xl md:text-[55px] tracking-wider text-[#f40977] "> safety</span><br /><br />
                            </div>
                            At Tell'em, creating a safe, respectful, and enjoyable environment for everyone is one of our highest priorities. Anonymous messaging can be a fun way to connect, share thoughts, ask questions, and express opinions honestly, but it should always be used responsibly. We encourage all users to communicate with kindness, empathy, and respect for others. While anonymity can help people feel more comfortable sharing their thoughts, it should never be used as a tool for bullying, harassment, threats, discrimination, hate speech, or any form of harmful behavior. Every message sent through Tell'em should contribute to a positive and welcoming experience for the recipient.<span><br /><br /></span>

                            To protect your privacy and security, we strongly recommend that you never share sensitive personal information such as passwords, verification codes, banking details, home addresses, government identification numbers, or any other confidential data through messages. If you receive content that makes you uncomfortable, violates our community standards, or appears suspicious, we encourage you to report it immediately so appropriate action can be taken. Our team is committed to reviewing reports and maintaining a platform that prioritizes user well-being.<span><br /><br /></span>

                            Tell'em is continuously working to improve safety measures, strengthen account security, and create a better experience for our community. By using our platform, you agree to help foster a culture of positivity, honesty, and mutual respect. Together, we can build a space where people feel comfortable expressing themselves, making meaningful connections, and enjoying anonymous conversations in a safe and responsible way.<span><br /><br /></span>

                        </p>
                    </div>

                </div>

            </section>

        </main>
    );
}