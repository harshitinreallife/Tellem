
// app/blog/page.tsx

'use client';

import NavHome2 from "@/components/NavHome2";
import TellemLogo from "@/components/TellemLogo";

export default function BlogPage() {
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
                    <div className="static lg:sticky lg:top-40 self-start text-center lg:text-left">
                        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[130px] tracking-tighter leading-none font-medium">
                            <span className="text-black">
                                blog
                            </span>
                        </h1>
                    </div>

                    {/* Right Side */}
                    <div className="w-full max-w-xl">

                        <div className="mb-12">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] tracking-tighter leading-none">
                                thoughts,
                                <span className="text-[#f40977]">
                                    {" "}stories
                                </span>
                                {" "}and updates
                            </h2>
                        </div>

                        <div className="space-y-12">

                            <article>
                                <p className="text-sm uppercase tracking-widest text-[#f40977] mb-2">
                                    September 2026
                                </p>

                                <h3 className="text-3xl tracking-tight mb-4">
                                    Why anonymous conversations can be meaningful
                                </h3>

                                <p className="text-[#3a3a3a] leading-8">
                                    Anonymous conversations allow people to
                                    express honest thoughts, share feedback,
                                    and ask questions they may otherwise
                                    hesitate to ask. When used responsibly,
                                    anonymity can encourage authenticity and
                                    create meaningful interactions.
                                </p>
                            </article>

                            <article>
                                <p className="text-sm uppercase tracking-widest text-[#f40977] mb-2">
                                    September 2026
                                </p>

                                <h3 className="text-3xl tracking-tight mb-4">
                                    Questions that start better conversations
                                </h3>

                                <p className="text-[#3a3a3a] leading-8">
                                    Great conversations often begin with simple
                                    but thoughtful questions. Asking about
                                    experiences, opinions, goals, and interests
                                    can help people connect in a genuine way.
                                </p>
                            </article>

                            <article>
                                <p className="text-sm uppercase tracking-widest text-[#f40977] mb-2">
                                    September 2026
                                </p>

                                <h3 className="text-3xl tracking-tight mb-4">
                                    Building a positive online community
                                </h3>

                                <p className="text-[#3a3a3a] leading-8">
                                    Every message contributes to the culture of
                                    a community. Respectful communication,
                                    kindness, and empathy help create an
                                    environment where people feel comfortable
                                    expressing themselves.
                                </p>
                            </article>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

