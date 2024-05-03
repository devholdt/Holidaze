"use client";

import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { elMessiri } from "@/app/ui/fonts";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getItem } from "@/app/lib/storage";

interface MenuItemProps {
   route: string;
   title: string;
}

const UserDropdown = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [user, setUser] = useState<any>(null);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const toggle = () => setIsOpen(!isOpen);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
         ) {
            setIsOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   useEffect(() => {
      const storedUser = getItem("user");
      setUser(storedUser);
   }, []);

   const userDetails = () => {
      if (user && user.avatar) {
         return (
            <>
               <div className="m-auto mx-6 mb-6 flex items-center gap-2">
                  <img
                     src={user.avatar.url}
                     alt={user.avatar.alt}
                     className="h-12 w-12 rounded-full border border-grey"
                  />
                  <div className="flex flex-col">
                     <p
                        className={`${elMessiri.className} text-2xl font-medium`}
                     >
                        {user.name}
                     </p>
                     <p className="font-thin text-dark">{user.email}</p>
                  </div>
               </div>
               <hr className="text-lightGrey" />
            </>
         );
      }
      return null;
   };

   const menuItems: MenuItemProps[] = [
      { title: "Register", route: "/user/register" },
      { title: "Log in", route: "/user/login" },
      { title: "Contact us", route: "/contact" },
   ];

   const loggedInMenuItems: MenuItemProps[] = [
      { title: "Bookings", route: "/user/bookings" },
      { title: "Venues", route: "/user/venues" },
      { title: "Change avatar", route: "/user/avatar" },
      { title: "Change banner", route: "/user/banner" },
      { title: "Log out", route: "/user/logout" },
      { title: "Contact us", route: "/contact" },
   ];

   const renderMenuItems = () => {
      const itemsToDisplay = user ? loggedInMenuItems : menuItems;
      return itemsToDisplay.map((menuItem, index) => (
         <React.Fragment key={menuItem.route}>
            <Link
               href={menuItem.route}
               className="px-4 py-3 font-extralight text-dark hover:bg-lighterGrey"
            >
               {menuItem.title}
            </Link>
            {(!user && index === menuItems.length - 2) ||
            (user &&
               index ===
                  loggedInMenuItems.findIndex(
                     (item) => item.title === "Venues"
                  )) ||
            (user &&
               index ===
                  loggedInMenuItems.findIndex(
                     (item) => item.title === "Log out"
                  )) ? (
               <hr className="text-lightGrey" />
            ) : null}
         </React.Fragment>
      ));
   };

   return (
      <div className="relative">
         <button
            className="flex items-center gap-2 rounded-full bg-white p-2 text-dark"
            onClick={toggle}
         >
            <Bars3Icon className="h-6 w-8" />
            <UserCircleIcon className="h-6 w-6" />
         </button>

         <div
            ref={dropdownRef}
            className={`absolute right-0 top-0 z-30 flex w-max min-w-44 flex-col rounded-3xl bg-white text-dark shadow-md ${
               isOpen ? "flex" : "hidden"
            }`}
         >
            <button
               onClick={() => setIsOpen(false)}
               className="self-end px-3 py-2 text-lg font-bold"
            >
               &#x2715;
            </button>
            {user ? userDetails() : null}
            <div className="flex flex-col pb-6">{renderMenuItems()}</div>
         </div>
      </div>
   );
};

export default UserDropdown;
