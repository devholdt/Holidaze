"use client";

import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { getItem } from "@/app/lib/storage";
import { menuItems, loggedInMenuItems } from "@/app/lib/constants";
import UserDetails from "@/app/ui/user/user-details";
import { getLoggedInUser } from "@/app/lib/data";
import Modal from "@/app/ui/Modal";

const UserDropdown = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [user, setUser] = useState<any>(null);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const toggle = () => setIsOpen(!isOpen);

   const handleClickOutside = useCallback((event: MouseEvent) => {
      if (
         dropdownRef.current &&
         !dropdownRef.current.contains(event.target as Node)
      ) {
         setIsOpen(false);
      }
   }, []);

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, [handleClickOutside]);

   useEffect(() => {
      if (getItem("user")) {
         const fetchUser = async () => {
            setUser(await getLoggedInUser());
         };

         fetchUser();
      }
   }, []);

   const renderMenuItems = () => {
      const itemsToDisplay = user ? loggedInMenuItems : menuItems;
      return itemsToDisplay.map((menuItem, index) => (
         <React.Fragment key={menuItem.route}>
            {["Change avatar", "Change banner", "Log out"].includes(
               menuItem.title
            ) ? (
               <Modal
                  modal={menuItem.title}
                  textContent={menuItem.title}
                  buttonStyles="px-4 py-3 font-extralight text-dark hover:bg-lighterGrey text-left"
               />
            ) : (
               <Link
                  href={menuItem.route}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 font-extralight text-dark hover:bg-lighterGrey"
               >
                  {menuItem.title}
               </Link>
            )}
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
            className={`absolute right-0 top-0 z-30 flex w-max min-w-44 flex-col rounded-3xl bg-white text-dark shadow-md ${isOpen ? "flex" : "hidden"}`}
         >
            <button
               onClick={() => setIsOpen(false)}
               className="self-end px-3 py-2 text-xl font-bold hover:text-black"
            >
               &#x2715;
            </button>
            {user ? <UserDetails /> : null}
            <div className="flex flex-col pb-6">{renderMenuItems()}</div>
         </div>
      </div>
   );
};

export default UserDropdown;
