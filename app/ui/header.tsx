"use client";

import Link from "next/link";
import Logo from "@/app/ui/Logo";
import logoWhite from "@/public/logo-white.svg";
import waterImg from "@/public/texture-water-sm.jpg";
import dynamic from "next/dynamic";

export const UserDropdown = dynamic(
   () => import("@/app/ui/user/UserDropdown"),
   { ssr: false }
);

export default function Header() {
   return (
      <header
         style={{
            backgroundImage: `url(${waterImg.src})`,
            backgroundSize: "cover",
         }}
      >
         <div className="m-auto flex max-w-7xl items-center justify-between px-10 py-8">
            <Link href="/">
               <Logo src={logoWhite} styles="max-w-[160px]" />
            </Link>
            <div className="flex items-center gap-4">
               <nav className="flex items-center gap-8">
                  <Link href="/" className="uppercase text-white">
                     Home
                  </Link>
                  <Link href="/venues" className="uppercase text-white">
                     Venues
                  </Link>
                  <Link href="/contact" className="uppercase text-white">
                     Contact
                  </Link>
               </nav>
               <UserDropdown />
            </div>
         </div>
      </header>
   );
}
