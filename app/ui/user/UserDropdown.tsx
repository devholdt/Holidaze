"use client";

import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import UserDetails from "@/app/ui/user/UserDetails";
import Modal from "@/app/ui/Modal";
import {
   loggedOutMenuItems,
   customerMenuItems,
   managerMenuItems,
} from "@/app/lib/constants";
import { MenuItemProps } from "@/app/lib/definitions";
import useOutsideClick from "@/app/lib/hooks/useOutsideClick";
import useFetchLoggedInUser from "@/app/lib/hooks/useFetchLoggedInUser";

const UserDropdown: React.FC = () => {
   const user = useFetchLoggedInUser();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   useOutsideClick(dropdownRef, () => setIsOpen(false));

   const menuItems = useMemo(() => {
      if (!user) return loggedOutMenuItems;
      return user.venueManager ? managerMenuItems : customerMenuItems;
   }, [user]);

   const MenuItem: React.FC<{ item: MenuItemProps }> = ({ item }) => {
      const isSpecialItem = [
         "Change avatar",
         "Change banner",
         "Log out",
      ].includes(item.title);
      return isSpecialItem ? (
         <>
            {item.title === "Log out" && <hr className="text-lightGrey" />}
            <Modal
               modal={item.title}
               textContent={item.title}
               buttonStyles="px-4 py-3 font-extralight text-dark hover:bg-lighterGrey text-left"
            />
         </>
      ) : (
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
            onClick={() => setIsOpen(!isOpen)}
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
