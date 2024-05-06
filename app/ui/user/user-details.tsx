"use client";

import { getItem } from "@/app/lib/storage";
import { elMessiri } from "@/app/ui/fonts";
import React, { useState, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const UserDetails = () => {
   const [user, setUser] = useState<any>(null);

   useEffect(() => {
      const storedUser = getItem("user");
      setUser(storedUser);
   }, []);

   if (!user || !user.avatar) {
      return null;
   }

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
                  className={`${elMessiri.className} flex items-start text-3xl font-medium`}
               >
                  <span className="flex h-[44px] flex-col justify-end">
                     {user.name}
                  </span>
                  {user.venueManager && (
                     <>
                        <CheckCircleIcon className="w-[22px] text-yellow" />
                     </>
                  )}
               </p>
               <p className="font-thin text-dark">{user.email}</p>
            </div>
         </div>
         <hr className="text-lightGrey" />
      </>
   );
};

export default UserDetails;
