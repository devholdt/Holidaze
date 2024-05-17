"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/app/ui/Logo";
import logoWhite from "@/public/logo-white.svg";
import waterImg from "@/public/texture-water-sm.jpg";
import dynamic from "next/dynamic";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

import { stack as Menu } from "react-burger-menu";

// slide
// stack
// elastic
// bubble
// push
// pushRotate
// scaleDown
// scaleRotate
// fallDown
// reveal

const UserDropdown = dynamic(() => import("@/app/ui/user/UserDropdown"), {
   ssr: false,
});

export default function HeaderComponent() {
   const [menuOpen, setMenuOpen] = useState(false);

   const closeMenu = () => {
      setMenuOpen(false);
   };

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
            <nav>
               <ul className="hidden items-center gap-8 md:flex">
                  <li>
                     <Link
                        href="/"
                        className="font-light uppercase text-white hover:border-b"
                     >
                        Home
                     </Link>
                  </li>
                  <li>
                     <Link
                        href="/venues"
                        className="font-light uppercase text-white hover:border-b"
                     >
                        Venues
                     </Link>
                  </li>
                  <li>
                     <UserDropdown />
                  </li>
               </ul>
               <div className="react-burger-menu block md:hidden">
                  <Menu
                     right
                     isOpen={menuOpen}
                     onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
                     customBurgerIcon={<Bars3Icon className="text-white" />}
                     customCrossIcon={<XMarkIcon className="text-dark" />}
                  >
                     <Link
                        onClick={closeMenu}
                        href="/"
                        className="py-4 font-light text-dark"
                     >
                        Home
                     </Link>
                     <Link
                        onClick={closeMenu}
                        href="/venues"
                        className="py-4  font-light text-dark"
                     >
                        Venues
                     </Link>
                  </Menu>
               </div>
            </nav>
         </div>
      </header>
   );
}
