"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { User } from 'next-auth'
import Image from "next/image"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import NavHome2 from "./NavHome2"
import { FaApple, FaAndroid } from "react-icons/fa";

const Navbar = () => {
    const navbarRef = useRef<HTMLElement>(null);
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrolling DOWN
                gsap.to(navbarRef.current, {
                    y: '-30%',
                    duration: 0.4,
                    ease: 'power2.inOut',
                    overwrite: true,
                });
            } else if (currentScrollY < lastScrollY) {
                // Scrolling UP
                gsap.to(navbarRef.current, {
                    y: '-150%',
                    duration: 0.4,
                    ease: 'power2.inOut',
                    overwrite: true,
                });
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const { data: session } = useSession()

    const user: User = session?.user

    return (
        <nav
            ref={navbarRef}
            className="fixed top-0 left-0 z-50 w-full translate-y-[-140%] bg-black text-white"
        >
            <div className="relative z-20 container w mx-auto h-20 sm:h-24 md:h-28 flex items-center px-3 sm:px-4 md:px-6">

                {/* LOGO */}
                <Link
                    href="/"
                    className="relative h-full w-28 sm:w-56 md:w-57.5 flex items-center"
                >
                    <Image
                        src="/images/tellem.png"
                        alt="Mystery Messages"
                        width={350}
                        height={300}
                        className="absolute -left-2 sm:-left-8 md:-left-12 top-13 translate-y-[-35%] object-contain w-34 sm:w-48 md:w-87.5 h-auto" />
                </Link>

                {/* CENTER*/}
                <div className="absolute left-1/2 bottom-0 sm:bottom-3 md:bottom-4 -translate-x-1/2 px-2" >
                    <NavHome2 />
                </div>
            </div>
            {/* APP DOWNLOAD BOX */}
            <div className="z-30 absolute right-3 sm:right-6 md:right-12 -bottom-5 -translate-y-1/2 flex h-9 sm:h-10 md:h-12 items-center overflow-hidden rounded-2xl bg-black ">

                {/* APPLE */}
                <button type="button" className="flex h-9 w-10 sm:h-10 sm:w-11 md:h-12 md:w-14 items-center justify-center text-white -mr-1 transition-colors duration-200 hover:text-[#ED1C7D] ">
                    <FaApple size={18} className="sm:hidden" />
                    <FaApple size={20} className="hidden sm:block md:hidden" />
                    <FaApple size={27} className="hidden md:block" />
                </button>

                {/* DIVIDER */}
                <div className="h-4 sm:h-5 md:h-5.5 w-px bg-white" />


                {/* ANDROID */}
                <button type="button" className="flex -ml-1 h-9 w-10 sm:h-10 sm:w-11 md:h-12 md:w-14 items-center justify-center text-white transition-colors duration-200 hover:text-[#ED1C7D]">
                    <FaAndroid size={19} className="sm:hidden" />
                    <FaAndroid size={21} className="hidden sm:block md:hidden" />
                    <FaAndroid size={28} className="hidden md:block" />
                </button>

            </div>



            {/* CURVE */}
            <div className="absolute z-0 left-1/2 -translate-x-1/2 -bottom-5 w-[120%] h-20 bg-black rounded-[30%]" />

        </nav>
    )
}
export default Navbar