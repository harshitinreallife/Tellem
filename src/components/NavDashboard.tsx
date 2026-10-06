
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pacifico } from "next/font/google";


const pacifico = Pacifico({
    subsets: ['latin'],
    weight: "400"
});

const navItems = [
    { title: "Share", href: "/share" },
    { title: "Tells", href: "/tells" },
    { title: "Profile", href: "/profile" },
];

export default function NavbarLinks({
    textColor = "text-[#6c6b6b]",
}: {
    textColor?: string;
}) {
    const pathname = usePathname();

    return (
        <div className="relative flex flex-wrap justify-center gap-1 sm:gap-2">
            {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.title}
                        href={item.href}
                        className={`${pacifico.className} px-2.5 sm:px-4 md:px-5 border-r border-[#5a5959] last:border-r-0 text-[20px] sm:text-[25px] md:text-[24px] tracking-tight font-semibold transition-colors duration-200 ${isActive ? "text-[#ED1C7D]" : `${textColor}  hover:text-[#ED1C7D]`}`}
                    >
                        {item.title}
                    </Link>
                );
            })}
        </div>
    );
}

