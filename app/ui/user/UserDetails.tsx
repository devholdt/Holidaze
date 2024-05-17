"use client";

import React from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { UserDetailsProps } from "@/app/lib/definitions";
import BackgroundReflection from "@/public/background-reflection.jpg";

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
   if (!user) {
      return (
         <div className="mt-12 flex flex-col items-center justify-center text-center">
            <p>Loading...</p>
         </div>
      );
   }

   let userAvatar;
   let userAlt;

   if (!user.avatar) {
      userAvatar = BackgroundReflection.src;
      userAlt = "User avatar";
   } else {
      userAvatar = user.avatar.url;
      userAlt = user.avatar.alt;
   }

   return (
      <>
         <div className="m-auto mx-6 mb-6 flex flex items-center justify-center gap-2">
            <Image
               src={userAvatar}
               alt={userAlt}
               width={200}
               height={200}
               className="h-[72px] w-[72px] rounded-full border border-grey"
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
