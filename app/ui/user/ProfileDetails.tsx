"use client";

import { useEffect } from "react";
import { LoadingSpinner } from "@/app/ui/LoadingSkeleton";
import { elMessiri } from "@/app/ui/fonts";
import { ProfileDetailsProps } from "@/app/lib/definitions";
import Image from "next/legacy/image";
import useFetchUserByName from "@/app/lib/hooks/useFetchUserByName";
import ManagerVenueList from "@/app/ui/user/venues/ManagerVenueList";

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ name }) => {
   const userData = useFetchUserByName(name);
   const user = userData.user;

   useEffect(() => {
      document.title = `${user?.name ?? "User"} | Holidaze Resorts`;
   }, [user?.name]);

   if (!user) {
      return (
         <div className="mt-12 flex items-center justify-center">
            <LoadingSpinner />
         </div>
      );
   }

   return (
      <div>
         <div className="border-b border-white">
            <Image
               src={user.banner?.url ?? ""}
               alt={user.banner?.alt ?? ""}
               width={1000}
               height={1000}
               priority={true}
               className="h-[200px] w-full object-cover"
            />
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
               <div className="flex flex-col items-center gap-4 p-4 sm:p-8 md:flex-row">
                  <Image
                     src={user.avatar?.url ?? ""}
                     alt={user.avatar?.alt ?? ""}
                     width={300}
                     height={300}
                     className="h-[160px] w-[160px] rounded-full"
                  />

                  <div className="text-center md:text-left">
                     <div className="flex gap-1">
                        <h2
                           className={`${elMessiri.className} break-words text-4xl tracking-wide text-blue`}
                        >
                           {user.name}
                        </h2>
                        {user.venueManager && (
                           <span className="icon-[mdi--check-circle-outline] h-5 w-5 text-yellow"></span>
                        )}
                     </div>
                     <p className="font-light tracking-wide">{user.email}</p>
                  </div>
               </div>

               <div className="m-4 h-full w-full max-w-[160px] rounded bg-white p-4 shadow">
                  <p className="mb-2 text-xl font-light uppercase tracking-wide text-blue">
                     Stats
                  </p>
                  <p>Bookings: {user.bookings?.length}</p>
                  <p>Venues: {user.venues?.length}</p>
               </div>
            </div>
         </div>
         {user.venueManager ? (
            <>
               <p className="mx-4 mt-4 break-words text-2xl text-blue">
                  {user.name}&apos;s venues
               </p>
               <ManagerVenueList name={name} />
            </>
         ) : (
            <p className="mb-8 p-4 text-center">
               This user is not a venue manager.
            </p>
         )}
      </div>
   );
};
