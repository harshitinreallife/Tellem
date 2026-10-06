"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TellemLogo() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleLogoClick = () => {
        if (status === "loading") return;

        if (session) {
            router.push("/tells");
        } else {
            router.push("/sign-up");
        }
    };

    return (
        <Image
            src="/images/tellem.png"
            alt="Tell'em"
            width={220}
            height={180}
            onClick={handleLogoClick}
            className="absolute top-0 -left-4 sm:top-1 sm:-left-3 md:-top-3 md:-left-3 lg:-top-5 lg:-left-5 w-38 sm:w-53 md:w-56 lg:w-80 h-auto cursor-pointer"
        />
    );
}