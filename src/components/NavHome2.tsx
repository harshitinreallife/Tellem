'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

type NavbarLinksProps = {
  textColor?: string;
};

const navItems = [
  { title: 'About', href: '/about' },
  { title: 'Safety', href: '/safety' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact Us', href: '/contact' },
];

export default function NavbarLinks({
  textColor = 'text-white',
}: NavbarLinksProps) {
  const dotRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const target = e.currentTarget;
    const dot = dotRef.current;

    if (!dot) return;

    const targetRect = target.getBoundingClientRect();
    const parentRect = target.parentElement?.getBoundingClientRect();

    if (!parentRect) return;

    gsap.to(dot, {
      x:
        targetRect.left -
        parentRect.left +
        targetRect.width / 2 -
        3,
      opacity: 1,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(dotRef.current, {
      opacity: 0,
      duration: 0.2,
    });
  };

  return (
    <div
      className="relative flex flex-wrap justify-center gap-x-4 sm:gap-4 md:gap-6"
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={dotRef}
        className="pointer-events-none absolute -bottom-4 left-0 h-2 w-2 rounded-full bg-current opacity-0"
      />

      {navItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          onMouseEnter={handleMouseEnter}
          className={`relative text-[13px] sm:text-base md:text-[18.5px] tracking-tight font-semibold transition-opacity duration-200 hover:opacity-80  ${textColor}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}