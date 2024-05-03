"use client";

import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
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

   const menuItems: MenuItemProps[] = [
      { title: "Register", route: "/user/register" },
      { title: "Log in", route: "/user/login" },
      { title: "Contact us", route: "/contact" },
   ];

   const userDetails = () => {
      if (user && user.avatar) {
         return (
            <>
               <div className="m-auto mb-4 flex gap-3">
                  <img
                     src={user.avatar.url}
                     alt={user.avatar.alt}
                     className="h-6 w-6 rounded-full"
                  />
                  <p>{user.name}</p>
               </div>
               <hr className="text-lightGrey" />
            </>
         );
      }
      return null;
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
            className={`absolute right-0 top-0 z-30 flex w-52 flex-col rounded-3xl bg-white text-dark shadow-md ${
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
            <div className="flex flex-col pb-6 pt-4">
               {menuItems.map((menuItem, index) => (
                  <React.Fragment key={menuItem.route}>
                     <Link
                        href={menuItem.route}
                        className="px-6 py-4 hover:bg-lighterGrey hover:text-dark"
                        onClick={() => setIsOpen(false)}
                     >
                        {menuItem.title}
                     </Link>
                     {index === menuItems.length - 2 && (
                        <hr className="text-lightGrey" />
                     )}
                  </React.Fragment>
               ))}
            </div>
         </div>
      </div>
   );
};

export default UserDropdown;
