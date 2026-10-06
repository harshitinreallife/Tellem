"use client";

// This is homepage

import Image from "next/image";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { Protest_Guerrilla } from "next/font/google";
import { useRouter } from "next/navigation";
import NavHome2 from "@/components/NavHome2";
import { FaApple, FaAndroid } from "react-icons/fa";
import NavHome from "@/components/NavHome";

const fredoka = Protest_Guerrilla({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  useLayoutEffect(() => {
    let runAnimation: (() => void) | null = null;
    const ctx = gsap.context(() => {

      runAnimation = () => {

        { /*Kill previous animations*/ }
        gsap.killTweensOf([
          marqueeRef.current,
          ".Hero-nav",
          ".hero-title",
          ".hero-left img",
          ".hero-right img",
          ".hero-float",
          ".hero-2-left",
          ".hero-2-right",
          ".hero-left-emoji-1",
          ".hero-right-emoji-1",
          ".hero-btn",
        ]);

        { /* Reset animation states*/ }

        gsap.set(".Hero-nav", {
          y: 100,
          opacity: 0,
        });

        gsap.set(".hero-title", {
          y: 120,
          opacity: 0,
        });

        gsap.set(".hero-left img", {
          scale: 0,
          opacity: 0,
        });

        gsap.set(".hero-right img", {
          scale: 0,
          opacity: 0,
        });

        gsap.set(".hero-btn", {
          scale: 0,
          opacity: 0,
        });

        { /*Reset marquee*/ }
        gsap.set(marqueeRef.current, {
          xPercent: 0,
        });

        { /*Marquee animation*/ } 
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 40,
          ease: "none",
          repeat: -1,
        });

        { /* Main hero animation*/ } 
        const tl = gsap.timeline();

        tl.to(".Hero-nav", {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        })

          .to(".hero-title", {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.25,
            ease: "power4.out",
          })

          .to(".hero-left img", {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          })

          .to(".hero-right img",
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.8"
          )

          .to(".hero-btn",
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=0.8"
          )

        { /* LEFT IMAGE FLOAT */ }
        gsap.to(".hero-left .hero-float", {
          y: -25,
          duration: 5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        { /* RIGHT IMAGE FLOAT*/ }
        gsap.to(".hero-right .hero-float", {
          y: -15,
          duration: 5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 5,
        });

        { /* SECOND SECTION FLOATING DECORATIONS */}
        gsap.to([".hero-2-left", ".hero-2-right"], {
          y: -20,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });


      };

      { /* Run animation when page first loads*/ }
      runAnimation();

      { /* Mouse movement effect*/ }
      const handleMouseMove = (e: MouseEvent) => {
        gsap.to(".hero-left-emoji-1, .hero-right-emoji-1", {
          x: e.clientX * 0.05,
          y: e.clientY * 0.05,
          duration: 2,
          delay: 0.3,
          ease: "power4.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      { /* IMPORTANT: This handles browser Back / Forward restoration. When the browser restores this page from its cache, GSAP may not automatically run again.*/}
      const handlePageShow = (event: PageTransitionEvent) => {
        if (event.persisted && runAnimation) {
          runAnimation();
        }
      };

      window.addEventListener("pageshow", handlePageShow);

      { /* Cleanup */}
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("pageshow", handlePageShow);
      };
    }, pageRef);

    { /* GSAP CLEANUP */}
    return () => {
      ctx.revert();
    };
  }, []);



  const texts = [
    "tell me who your crush is",
    "send me your confessions",
    "ask me anything",
    "not gonna lie",
    "send me a never have I ever",
    "describe me in 3 words",
    "share an opinion that’ll get you cancelled",
  ];

  return (
    <div ref={pageRef} className="bg-black">
      <NavHome />

      {/* NAVBAR MARQUEE */}
      <div
        className={`${fredoka.className} overflow-hidden w-full my-2.5`}
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div
          ref={marqueeRef}
          className="flex w-max items-center"
        >
          {[...texts, ...texts, ...texts].map((text, index) => (
            <div
              key={index}
              className="flex items-center whitespace-nowrap text-white"
            >
              <span className="mx-1 text-sm sm:text-md font-light tracking-wide">
                {text}
              </span>

              <span className="ml-2 mt-1 pr-2 text-sm sm:text-md font-bold">
                •
              </span>
            </div>
          ))}
        </div>
      </div>


      {/* MAIN HERO */}
      <section className="relative text-white flex flex-col items-center w-[calc(100%-2rem)] mx-auto rounded-t-[24px] md:rounded-t-[30px] justify-center px-4 sm:px-6 md:px-20 pt-28 sm:pt-32 md:pt-15 pb-12 md:pb-15 border border-black bg-linear-to-b from-[#EE1E7B] to-[#FB7239] overflow-hidden"
      >

        {/* HERO NAVIGATION */}
        <div>

          {/* LOGO */}
          <div>
            <Image
              className="Hero-nav absolute -top-2 -left-6 sm:-top-5 sm:-left-8 md:-top-6 md:-left-4 lg:-top-10 lg:-left-5 w-38 sm:w-56 md:w-66 lg:w-87.5 h-auto"
              src="/images/tellem.png"
              alt="Tell'em logo"
              width={350}
              height={300}
            />
          </div>

          {/* NAVBAR 2 */}

          <div className="Hero-nav absolute top-16 sm:top-14 md:top-10 left-0 w-full flex justify-center px-2">
            <NavHome2 />
          </div>


          {/* APP DOWNLOAD BOX */}
          <div className="Hero-nav z-5 absolute right-2 top-5 sm:right-4 sm:top-6 md:right-10 md:top-7 md:-translate-y-1/2 flex h-8 sm:h-10 md:h-12 items-center overflow-hidden rounded-4xl bg-black">
            
            {/* APPLE */}
            <button
              type="button"
              aria-label="Download on the App Store"
              className="flex h-9 w-10 sm:h-10 sm:w-11 md:h-12 md:w-14 items-center justify-center text-white -mr-1 transition-colors duration-200 hover:text-[#ED1C7D]"
            >
              <FaApple
                size={18}
                className="sm:hidden"
              />

              <FaApple
                size={20}
                className="hidden sm:block md:hidden"
              />

              <FaApple
                size={27}
                className="hidden md:block"
              />
            </button>

            {/* DIVIDER */}

            <div className="h-4 sm:h-5 w-px bg-white" />

            {/* ANDROID */}

            <button
              type="button"
              aria-label="Get it on Google Play"
              className="flex -ml-1 h-9 w-10 sm:h-10 sm:w-11 md:h-12 md:w-14 mt-0.5 md:mt-1 items-center justify-center text-white transition-colors duration-200 hover:text-[#ED1C7D]"
            >
              <FaAndroid
                size={19}
                className="sm:hidden"
              />

              <FaAndroid
                size={21}
                className="hidden sm:block md:hidden"
              />

              <FaAndroid
                size={28}
                className="hidden md:block"
              />
            </button>
          </div>
        </div>


        {/* HERO CONTENT */}
        <div className="flex flex-row flex-wrap shrink-0 sm:flex-row sm:flex-wrap md:flex-row md:flex-wrap lg:flex-nowrap justify-center w-full h-full mt-0 sm:mt-0 md:mt-16 gap-x-6 sm:gap-x-2 md:gap-x-6 md:gap-y-6 lg:gap-4 md:shrink-0 sm:shrink-0 sm:justify-center md:justify-center">

          {/* LEFT IMAGE */}
          <div className="order-1 hero-left relative w-33 h-40 sm:w-44 sm:h-60 md:w-40 md:h-52 lg:w-55 lg:h-76 md:order-1">
            <Image
              className="hero-float -rotate-8 z-0 relative top-8 left-10 sm:top-10 md:top-18 lg:top-20 lg:left-10 xl:top-10 xl:-left-15 w-30 h-40 sm:w-35 sm:h-45 md:w-35 md:h-45 lg:w-45 lg:h-55 xl:h-full xl:w-full  object-cover border-4 rounded-[25px] md:rounded-[30px] lg:rounded-[40px] border-[#e7a26e]"
              src="/images/Hero-2.png"
              alt="Friends laughing together while using Tell'em"
              width={200}
              height={200}
            />

            {/* LEFT EMOJI 1  */}
            <Image
              className="hero-left-emoji-1 absolute -rotate-10! -top-2 -left-2  sm:-top-15 sm:-left-15 md:-top-10  md:-left-18 lg:-top-18 lg:left-18 xl:-top-30 xl:left-8 w-17 h-17 sm:w-25 sm:h-25 md:w-27 md:h-27 lg:w-35 lg:h-35 xl:w-50 xl:h-45 "
              src="/images/Hero-thumb.png"
              alt=""
              width={200}
              height={200}
            />

            {/* LEFT EMOJI 2 */}
            <Image
              className="hero-left-emoji-2 absolute -bottom-57 left-65 sm:-bottom-78 sm:left-83 md:-bottom-80 md:left-80 lg:-bottom-30 lg:left-30 xl:-bottom-40 xl:-left-20  w-18 h-20 sm:w-25 sm:h-25 md:w-27 md:h-30 lg:w-35 lg:h-35 xl:w-50 xl:h-45"
              src="/images/Hero-4.png"
              alt=""
              width={200}
              height={200}
            />
          </div>


          {/* CENTER CONTENT  */}
          <div className="order-3 lg:order-2 flex flex-col mt-10 text-center md:w-full lg:w-auto leading-tight sm:leading-none md:leading-24 lg:leading-33.75 tracking-tight sm:tracking-[-3px] md:tracking-[-4px] lg:tracking-[-5px] sm:mt-0 md:mt-12 lg:ml-10">
            <h1 className="hero-title text-6xl sm:text-7xl md:text-[80px] lg:text-[90px] xl:text-[115px]">
              real
            </h1>

            <h1 className="hero-title text-6xl sm:text-7xl md:text-[80px] lg:text-[90px] xl:text-[115px]">
              friends
            </h1>

            <h1 className="hero-title text-6xl sm:text-7xl md:text-[80px] lg:text-[84px] xl:text-[115px]">
              real fun
            </h1>

            {/* SIGN UP */}
            <button type="button" className="hero-btn bg-white text-[#FD7A24] font-bold rounded-[50px] mx-auto w-52 sm:w-60 md:w-60 lg:w-65 xl:w-70 py-3.5 sm:py-4 md:py-3 md:mb-5 lg:py-4 xl:py-4 text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl mt-6 sm:mt-7 tracking-tight cursor-pointer hover:text-[#ED1C7D]"onClick={handleSignUp}>
              Sign Up!
            </button>
          </div>


          {/* RIGHT IMAGE */}
          <div className="order-2 lg:order-3 hero-right relative w-33 h-40 sm:w-48 sm:h-80 md:w-40 md:h-52 lg:w-60 lg:h-100">
            <Image className="hero-float z-0 relative rotate-4! top-5 sm:top-20 md:top-18 lg:top-45 lg:-right-14 xl:left-15 xl:top-30 w-30 h-40 sm:w-35 sm:h-55 md:w-55 md:h-52 lg:w-45 lg:h-65 xl:h-full xl:w-full object-cover border-4 rounded-[30px] md:rounded-[30px] lg:rounded-[50px] border-[#e7a26e]" src="/images/Hero-1.jpg" alt="Two friends sharing a fun moment on Tell'em" width={350} height={300} />

            {/* RIGHT EMOJI */}
            <Image className="hero-right-emoji-1 z-10 absolute -bottom-13 right-0 w-18 h-25 sm:w-20 sm:h-30 md:w-25 md:h-30 sm:bottom-0 sm:right-10 md:-bottom-20 md:-right-10 lg:bottom-60 lg:right-30 xl:bottom-66 xl:right-28 lg:w-30 lg:h-40 xl:w-40 xl:h-50" src="/images/Hero-5.png" alt="" width={350} height={300} />
          </div>
        </div>
      </section>


      {/* SECOND SECTION */}

      <section className="text-white flex flex-col items-center min-h-[70vh] lg:h-[125vh] w-[calc(100%-2rem)] mx-auto relative overflow-hidden px-4 py-10 sm:py-6 md:py-10 lg:py-0">
        
        {/* Curve */}
        <div className="absolute z-0 left-1/2 -translate-x-1/2 -top-8 w-full h-20 bg-black rounded-[30%]" />

        <div className="z-10 text-base sm:text-lg md:text-xl tracking-tight">
          <h1>! Scroll for more</h1>
        </div>

        {/* HERO 2 CONTENT */}
        <div className="flex flex-row items-center justify-between text-center mt-8 sm:mt-10 gap-2 sm:gap-4 lg:gap-0 w-full">

          {/* LEFT DECORATION */}
          <div className="hero-2-left relative shrink-0 w-13 h-24 sm:w-20 sm:h-32 md:w-40 md:h-40 lg:w-50 lg:h-50">
            <Image className="absolute z-20 -rotate-10 bottom-38 -left-4 w-20 h-20 sm:bottom-36 sm:-left-10 sm:w-20 sm:h-20 md:bottom-48 md:-left-28 md:w-48 md:h-48 lg:bottom-65 lg:-left-18 lg:w-55 lg:h-55" src="/images/crown.png" alt="" width={200} height={200} />

            <Image className="absolute z-10 bottom-28 -left-1 w-20 h-20 sm:bottom-27 sm:-left-2 sm:w-20 sm:h-20 md:bottom-28 md:-left-8 md:w-48 md:h-48 lg:bottom-36 lg:-left-13 lg:w-55 lg:h-55" src="/images/donut.png" alt="" width={200} height={200} />
          </div>

          {/* CENTER */}
          <div>
            <div className="whitespace-nowrap text-center hero-title text-5xl sm:text-[70px] md:text-[95px] lg:text-[113px] tracking-tight sm:tracking-[-3px] md:tracking-[-6px] lg:tracking-[-9px] leading-none mt-10 md:mt-6 lg:mt-10">
              <h1>play q&a</h1>
              <h1>games</h1>
            </div>

            <div className="text-xl whitespace-nowrap sm:text-2xl md:text-5xl lg:text-[60px] mt-8 sm:mt-10 md:mt-12 lg:mt-15 leading-relaxed md:leading-tight lg:leading-25 space-y-1 md:space-y-0">
              <h1 className="hover:text-[#ED1C7D] transition-colors duration-300 cursor-pointer">never have i ever</h1>
              <h1 className="hover:text-[#ED1C7D] transition-colors duration-300 cursor-pointer">ask me anything</h1>
              <h1 className="hover:text-[#ED1C7D] transition-colors duration-300 cursor-pointer">confessions</h1>
              <h1 className="hover:text-[#ED1C7D] transition-colors duration-300 cursor-pointer">3 words</h1>
            </div>
          </div>

          {/* RIGHT DECORATION */}

          <div className="hero-2-right shrink-0  relative w-13 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-50 lg:h-50">
            <Image className="absolute rotate-15 bottom-44 -left-8 w-20 h-20 sm:bottom-40 sm:left-3 sm:w-32 sm:h-36 md:bottom-56 md:-left-4 md:w-40 md:h-48 lg:bottom-77 lg:left-5 lg:w-50 lg:h-60" src="/images/cloud.png" alt="" width={200} height={200} />

            <Image className="z-10 absolute rotate-20 top-54 -left-2 w-20 h-20 sm:top-68 sm:-left-5 sm:w-32 sm:h-32 md:top-68 md:left-10 md:w-40 md:h-40 lg:top-35 lg:left-20 lg:w-45 lg:h-45" src="/images/teddy.png" alt="" width={200} height={200} />

            <Image className="absolute rotate-10 top-44 -left-4 w-15 h-20 sm:top-48 sm:left-3 sm:w-32 sm:h-32 md:top-44 md:left-10 md:w-40 md:h-40 lg:top-10 lg:left-15 lg:w-45 lg:h-45" src="/images/heart.png" alt="" width={200} height={200} />
          </div>
        </div>
      </section>


      {/* FOOTER */}


      <section>
        <footer className="text-center p-4 text-sm sm:text-md w-full mx-auto bg-black text-white">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-20 leading-normal md:leading-10">
            <h1> © 2026 TELL'EM. All rights reserved. </h1>
            <h1>Made with ❤️ by TELL'EM Team</h1>
          </div>
        </footer>
      </section>
    </div>
  );
}



