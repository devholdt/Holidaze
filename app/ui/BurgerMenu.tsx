"use client";

import React, { useState, useMemo } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import useFetchLoggedInUser from "@/app/lib/hooks/useFetchLoggedInUser";
import Link from "next/link";
import {
   loggedOutMenuItems,
   customerMenuItems,
   managerMenuItems,
} from "@/app/lib/constants";
import { MenuItemProps } from "@/app/lib/definitions";
import dynamic from "next/dynamic";
import { slide as Menu } from "react-burger-menu";
import BackgroundReflection from "@/public/background-reflection.jpg";
import logoWhite from "@/public/logo-white.svg";
import Logo from "@/app/ui/Logo";
import { LinkButton } from "@/app/ui/buttons";

const Modal = dynamic(() => import("@/app/ui/Modal"));
const UserDetails = dynamic(() => import("@/app/ui/user/UserDetails"));

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

const BurgerMenu = () => {
   const user = useFetchLoggedInUser();
   const [menuOpen, setMenuOpen] = useState(false);

   const closeMenu = () => {
      setMenuOpen(false);
   };

   const menuItems = useMemo(() => {
      if (!user) return loggedOutMenuItems;
      return user.venueManager ? managerMenuItems : customerMenuItems;
   }, [user]);

   const MenuItem: React.FC<{ item: MenuItemProps }> = ({ item }) => {
      const isModalItem = [
         "Change avatar",
         "Change banner",
         "Log out",
      ].includes(item.title);
      return isModalItem ? (
         <>
            {item.title === "Log out"}
            <Modal
               modal={item.title}
               textContent={item.title}
               buttonStyles="px-4 py-3 font-light text-dark hover:bg-lighterGrey text-left"
            />
         </>
      ) : (
         <>
            {item.title === "Log in" && !user}
            <Link
               href={item.route ?? ""}
               onClick={() => setMenuOpen(false)}
               className="px-4 py-3 font-light text-dark hover:bg-lighterGrey"
            >
               {item.title}
            </Link>
         </>
      );
   };

   return (
      <Menu
         right
         isOpen={menuOpen}
         onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
         customBurgerIcon={<Bars3Icon className="text-white" />}
         customCrossIcon={<XMarkIcon className="text-white" />}
         width={"100%"}
      >
         <div
            className="h-[180px] bg-cover bg-center p-8"
            style={{ backgroundImage: `url(${BackgroundReflection.src})` }}
         >
            <div className="flex h-full flex-col justify-between">
               <div>
                  <Logo src={logoWhite} styles="max-w-[160px] border" />
               </div>

               <div className="flex justify-center">
                  <LinkButton
                     targetHref="/venues"
                     text="Venues"
                     primary={false}
                  />
               </div>
            </div>
         </div>

         {user && <UserDetails user={user} />}

         <Link
            onClick={closeMenu}
            href="/"
            className="px-4 py-3 text-left font-light text-dark hover:bg-lighterGrey"
         >
            Home
         </Link>
         <Link
            onClick={closeMenu}
            href="/venues"
            className="px-4 py-3 text-left font-light text-dark hover:bg-lighterGrey"
         >
            Venues
         </Link>

         <hr className="text-lightGrey" />

         <div>
            <div className="flex flex-col">
               {menuItems.map((item, index) => (
                  <MenuItem key={index} item={item} />
               ))}
            </div>
         </div>

         <hr className="text-lightGrey" />
      </Menu>
   );
};

export default BurgerMenu;
