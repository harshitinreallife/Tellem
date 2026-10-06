// app/contact/page.tsx

'use client';

import NavHome2 from "@/components/NavHome2";
import TellemLogo from "@/components/TellemLogo";
import Image from "next/image";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white text-black">

            <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-20">

                {/* Logo */}
                <TellemLogo />

                {/* Navbar */}
                <div className="absolute top-16 sm:top-14 md:top-10 left-0 w-full flex justify-center px-2">
                    <NavHome2 textColor="text-black/90" />
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-evenly w-full mt-12 sm:mt-16 lg:mt-28 gap-8 lg:gap-36">

                    {/* Left Side */}
                    <div className="static lg:sticky lg:top-40 self-start">
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[130px] text-center tracking-tighter leading-none font-medium">
                            contact us
                        </h1>
                    </div>

                    {/* Right Side */}
                    <div className="w-full max-w-2xl">

                        <div className="mb-12">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] tracking-tighter leading-none">
                                get in
                                <span className="text-[#f40977]">
                                    {" "}touch
                                </span>
                            </h2>
                        </div>

                        <p className="text-[#3a3a3a] text-lg leading-9">
                            We'd love to hear from you. Whether you have
                            feedback, suggestions, questions, bug reports,
                            partnership inquiries, or simply want to share
                            your thoughts about Tell'em, feel free to reach
                            out to our team.
                        </p>

                        <p className="mt-8 text-[#3a3a3a] text-lg leading-9">
                            Our goal is to create a fun, safe, and engaging
                            platform for meaningful anonymous conversations,
                            and your feedback helps us improve the experience
                            for everyone.
                        </p>

                        <div className="mt-12">
                            <p className="text-sm uppercase tracking-[3px] text-[#f40977]">
                                Email
                            </p>

                            <a
                                href="mailto:your.tellem.team@gmail.com"
                                className="mt-3 inline-block text-xl tracking-tight text-black/90 hover:text-[#f40977] transition-colors duration-300"
                            >
                                your.tellem.team@gmail.com
                            </a>
                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

