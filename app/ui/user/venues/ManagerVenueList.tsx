"use client";

import { useState, useEffect } from "react";
import { ManagerVenueListProps } from "@/app/lib/definitions";
import { LoadingSpinner } from "@/app/ui/LoadingSkeleton";
import useFetchLoggedInUser from "@/app/lib/hooks/useFetchLoggedInUser";
import useFetchVenuesByUser from "@/app/lib/hooks/useFetchVenuesByUser";
import ManagerVenueCard from "@/app/ui/user/venues/ManagerVenueCard";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/app/ui/Modal"));

const ManagerVenueList: React.FC<ManagerVenueListProps> = ({ name }) => {
   const [paramName, setParamName] = useState<string>("");
   const { user, loading: userLoading } = useFetchLoggedInUser();
   const { venues, loading: venuesLoading } = useFetchVenuesByUser(name);
   const isVenueManager = user?.venueManager;

   useEffect(() => {
      const fullUrl = window.location.href;
      const lastSegment = fullUrl.split("/").pop();
      setParamName(lastSegment!);
   }, []);

   if (userLoading || venuesLoading) {
      return (
         <div className="mt-12 flex items-center justify-center">
            <LoadingSpinner />
         </div>
      );
   }

   if (!name) {
      return (
         <div className="my-12 flex flex-col items-center justify-center font-light">
            <p>No venue manager found.</p>
         </div>
      );
   }

   if (venues.length === 0) {
      return (
         <div className="mt-8 flex w-full flex-col items-center justify-center gap-2 bg-white py-8 font-light shadow">
            <p className="mb-8 mt-4">No venues found.</p>
            <h2 className="mx-2 text-center text-lg font-light uppercase tracking-wider text-blue sm:text-xl">
               Be the curator of someones next adventure
            </h2>
            <Modal
               modal="Create venue"
               textContent="Create venue"
               buttonStyles="px-8 py-3 mx-2 text-lg font-extralight uppercase tracking-widest transition bg-brown text-white hover:bg-darkBrown"
            />
         </div>
      );
   }

   return (
      <>
         {isVenueManager && paramName === "venues" && (
            <div className="mb-4 mt-8 flex w-full flex-col items-center justify-center gap-2 bg-white py-4 shadow">
               <h2 className="text-center text-lg font-light uppercase tracking-wider text-blue sm:text-xl">
                  Be the curator of someones next adventure
               </h2>
               <Modal
                  modal="Create venue"
                  textContent="Create venue"
                  buttonStyles="px-8 py-3 w-max text-lg font-extralight uppercase tracking-widest transition bg-brown text-white hover:bg-darkBrown"
               />
            </div>
         )}
         <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
            {venues.map((venue) => (
               <ManagerVenueCard key={venue.id} venue={venue} user={user!} />
            ))}
         </div>
      </>
   );
};

export default ManagerVenueList;
