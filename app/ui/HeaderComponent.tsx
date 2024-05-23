"use client";

import Link from "next/link";
import Logo from "@/app/ui/Logo";
import logoWhite from "@/public/logo-white.svg";
import waterImg from "@/public/texture-water-sm.jpg";
import BurgerMenu from "@/app/ui/BurgerMenu";
import UserDropdown from "@/app/ui/user/UserDropdown";

const HeaderComponent = () => {
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
                  <BurgerMenu />
               </div>
            </nav>
         </div>
      </header>
   );
};

export default HeaderComponent;
