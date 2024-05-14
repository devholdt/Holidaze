"use client";

import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import React, {
   useState,
   useEffect,
   useRef,
   useCallback,
   useMemo,
} from "react";
import Link from "next/link";
import { getItem } from "@/app/lib/storage";
import UserDetails from "@/app/ui/user/UserDetails";
import { getLoggedInUser } from "@/app/lib/data";
import Modal from "@/app/ui/Modal";
import {
   loggedOutMenuItems,
   customerMenuItems,
   managerMenuItems,
} from "@/app/lib/constants";
import { UserProps, MenuItemProps } from "@/app/lib/definitions";

const UserDropdown: React.FC = () => {
   const [user, setUser] = useState<UserProps | null>(null);
   const [isOpen, setIsOpen] = useState<boolean>(false);
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
            const loggedInUser = await getLoggedInUser();
            setUser(loggedInUser);
         };
         fetchUser();
      }
   }, []);

   const menuItems = useMemo(() => {
      if (!user) return loggedOutMenuItems;
      return user.venueManager ? managerMenuItems : customerMenuItems;
   }, [user]);

   const MenuItem: React.FC<{ item: MenuItemProps }> = ({ item }) => {
      if (["Change Avatar", "Change Banner", "Log out"].includes(item.title)) {
         return (
            <>
               {item.title === "Log out" && <hr className="text-lightGrey" />}
               <Modal
                  modal={item.title}
                  textContent={item.title}
                  buttonStyles="px-4 py-3 font-extralight text-dark hover:bg-lighterGrey text-left"
               />
            </>
         );
      }

      return (
         <>
            {item.title === "Contact us" && !user && (
               <hr className="text-lightGrey" />
            )}
            <Link
               href={item.route ?? ""}
               onClick={() => setIsOpen(false)}
               className="px-4 py-3 font-extralight text-dark hover:bg-lighterGrey"
            >
               {item.title}
            </Link>
         </>
      );
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
            {user && <UserDetails />}
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
