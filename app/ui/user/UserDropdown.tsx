"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
   loggedOutMenuItems,
   customerMenuItems,
   managerMenuItems,
} from "@/app/lib/constants";
import { MenuItemProps } from "@/app/lib/definitions";
import Link from "next/link";
import dynamic from "next/dynamic";
import useFetchLoggedInUser from "@/app/lib/hooks/useFetchLoggedInUser";
import UserDetails from "@/app/ui/user/UserDetails";

const Modal = dynamic(() => import("@/app/ui/Modal"));

const UserDropdown = () => {
   const { user } = useFetchLoggedInUser();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const menuItems = useMemo(() => {
      if (!user) return loggedOutMenuItems;
      return user.venueManager ? managerMenuItems : customerMenuItems;
   }, [user]);

   const MenuItem: React.FC<{ item: MenuItemProps }> = ({ item }) => {
      const isModalItem = [
         "Create venue",
         "Change avatar",
         "Change banner",
         "Log out",
      ].includes(item.title);
      return isModalItem ? (
         <>
            {item.title === "Log out" && <hr className="text-lightGrey" />}
            <Modal
               modal={item.title}
               textContent={item.title}
               buttonStyles="px-4 py-3 font-extralight text-body hover:bg-lighterGrey text-left"
            />
         </>
      ) : (
         <>
            {item.title === "Log in" && !user && (
               <hr className="text-lightGrey" />
            )}
            <Link
               href={item.route ?? ""}
               onClick={() => setIsOpen(false)}
               className="text-body px-4 py-3 font-extralight hover:bg-lighterGrey"
            >
               {item.title}
            </Link>
         </>
      );
   };

   const handleClickOutside = (event: MouseEvent) => {
      if (
         dropdownRef.current &&
         !dropdownRef.current.contains(event.target as Node)
      ) {
         setIsOpen(false);
      }
   };

   useEffect(() => {
      if (isOpen) {
         document.addEventListener("mousedown", handleClickOutside);
      } else {
         document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [isOpen]);

   return (
      <div className="relative" ref={dropdownRef}>
         <button
            className="text-body flex items-center gap-2 rounded-full bg-white p-2"
            onClick={() => setIsOpen(!isOpen)}
         >
            <span className="text-body icon-[mdi--menu] h-6 w-8"></span>
            <span className="text-body icon-[mdi--user-circle] h-6 w-6"></span>
         </button>
         <div
            className={`text-body absolute right-0 top-0 z-30 flex w-max min-w-44 flex-col rounded-3xl bg-white shadow-md ${isOpen ? "flex" : "hidden"}`}
         >
            <button
               onClick={() => setIsOpen(false)}
               className="self-end px-3 py-2 text-xl font-bold hover:text-black"
            >
               &#x2715;
            </button>
            {user && <UserDetails user={user} />}
            <div className="flex flex-col pb-6">
               {menuItems.map((item, index) => (
                  <MenuItem key={index} item={item} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default UserDropdown;
