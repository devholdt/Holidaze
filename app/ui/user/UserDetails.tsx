"use client";

import { UserDetailsProps } from "@/app/lib/definitions";
import Image from "next/image";
import BackgroundReflection from "@/public/background-reflection.jpg";

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
   if (!user) {
      return (
         <div className="mt-12 flex flex-col items-center justify-center text-center">
            <p>Loading...</p>
         </div>
      );
   }

   return (
      <>
         <div className="m-auto mx-6 mb-6 flex flex flex-col items-center justify-center gap-2 xs:flex-row">
            <Image
               src={user.avatar?.url ?? BackgroundReflection.src}
               alt={user.avatar?.alt ?? "User avatar"}
               width={300}
               height={300}
               className="h-[72px] w-[72px] rounded-full border border-grey object-cover object-center"
            />
            <div className="flex flex-col items-center xs:items-start">
               <div className="flex items-start text-3xl font-medium">
                  <span className="flex h-[44px] flex-col justify-end text-blue">
                     {user.name}
                  </span>
                  {user.venueManager && (
                     <span className="icon-[mdi--check-circle-outline] h-[24px] w-[24px] text-yellow"></span>
                  )}
               </div>
               <p className="text-body text-sm font-thin xs:text-base">
                  {user.email}
               </p>
            </div>
         </div>
         <hr className="text-lightGrey" />
      </>
   );
};

export default UserDetails;
