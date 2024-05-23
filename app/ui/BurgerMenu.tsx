"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
   loggedOutMenuItems,
   customerMenuItems,
   managerMenuItems,
} from "@/app/lib/constants";
import { MenuItemProps } from "@/app/lib/definitions";
import dynamic from "next/dynamic";
import BackgroundReflection from "@/public/background-reflection.jpg";
import logoWhite from "@/public/logo-white.svg";
import Logo from "@/app/ui/Logo";
import { LinkButton } from "@/app/ui/buttons";
import { slide as Menu } from "react-burger-menu";
import useUser from "@/app/lib/hooks/useUser";

const Modal = dynamic(() => import("@/app/ui/Modal"));
const UserDetails = dynamic(() => import("@/app/ui/user/UserDetails"));

const BurgerMenu = () => {
   const { user } = useUser();
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
               buttonStyles="py-4 font-light text-center text-dark hover:bg-lighterGrey text-left"
            />
         </>
      ) : (
         <>
            {item.title === "Log in" && !user}
            <Link
               href={item.route ?? ""}
               onClick={() => setMenuOpen(false)}
               className="py-4 text-center font-light text-dark hover:bg-lighterGrey"
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
         customBurgerIcon={
            <span className="icon-[mdi--menu] text-white"></span>
         }
         customCrossIcon={
            <span className="icon-[mdi--close] text-white"></span>
         }
         width={"100%"}
      >
         <div
            className="mb-6 h-[180px] bg-cover bg-center p-8"
            style={{ backgroundImage: `url(${BackgroundReflection.src})` }}
         >
            <div className="flex h-full flex-col justify-between">
               <Link onClick={closeMenu} href="/" className="w-fit">
                  <Logo src={logoWhite} styles="max-w-[160px] border" />
               </Link>

               <div className="flex justify-center">
                  <LinkButton
                     text="venues"
                     targetHref="/venues"
                     onClick={closeMenu}
                     primary={false}
                  />
               </div>
            </div>
         </div>

         {user && <UserDetails user={user} />}

         <Link
            onClick={closeMenu}
            href="/"
            className="py-4 text-left text-center font-light text-dark hover:bg-lighterGrey"
         >
            Home
         </Link>

         <div>
            <div className="flex flex-col">
               {menuItems.map((item, index) => (
                  <MenuItem key={index} item={item} />
               ))}
            </div>
         </div>
      </Menu>
   );
};

export default BurgerMenu;
