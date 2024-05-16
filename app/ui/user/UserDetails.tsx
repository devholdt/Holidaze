"use client";

import React from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { UserDetailsProps } from "@/app/lib/definitions";

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
   if (!user || !user.avatar) {
      return null;
   }

   return (
      <>
         <div className="m-auto mx-6 mb-6 flex items-center gap-2">
            <Image
               src={user.avatar.url}
               alt={user.avatar.alt}
               width={200}
               height={200}
               className="h-12 w-12 rounded-full border border-grey"
            />
            <div className="flex flex-col">
               <p className="flex items-start text-3xl font-medium">
                  <span className="flex h-[44px] flex-col justify-end text-blue">
                     {user.name}
                  </span>
                  {user.venueManager && (
                     <CheckCircleIcon className="w-[22px] text-yellow" />
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
