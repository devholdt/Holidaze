"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/ButtonComponents";
import { VenueListProps, VenueProps } from "@/app/lib/definitions";
import { LoadingSpinner } from "@/app/ui/LoadingSkeleton";
import VenueCard from "@/app/ui/venues/VenueCard";
import useFetchAllVenues from "@/app/lib/hooks/useFetchAllVenues";
import VenueFiltering from "@/app/ui/venues/VenueFiltering";

const VenueList: React.FC<VenueListProps> = ({
   listLimit = 12,
   venuePage = false,
}) => {
   const { venues, loading } = useFetchAllVenues();
   const INITIAL_LIMIT = listLimit;
   const [limit, setLimit] = useState(INITIAL_LIMIT);
   const [filteredVenues, setFilteredVenues] = useState<VenueProps[]>([]);
   const router = useRouter();

   useEffect(() => {
      if (venues.length > 0) {
         setFilteredVenues(venues);
      }
   }, [venues]);

   useEffect(() => {
      if (window.location.pathname === "/venues") {
         const savedScrollPosition = sessionStorage.getItem("scrollPosition");
         const savedLimit = sessionStorage.getItem("venueLimit");

         if (savedLimit) {
            setLimit(parseInt(savedLimit, 10));
         }

         if (savedScrollPosition) {
            setTimeout(() => {
               window.focus();
               window.scrollTo(0, parseInt(savedScrollPosition, 10));
               sessionStorage.removeItem("scrollPosition");
               sessionStorage.removeItem("venueLimit");
            }, 500);
         }
      } else {
         sessionStorage.removeItem("scrollPosition");
         sessionStorage.removeItem("venueLimit");
      }
   }, []);

   const handleCardClick = (href: string) => {
      if (window.location.pathname === "/venues" && window.scrollY >= 500) {
         sessionStorage.setItem("scrollPosition", String(window.scrollY));
         sessionStorage.setItem("venueLimit", String(limit));
      }

      router.push(href);
   };

   if (loading)
      return (
         <div className="mt-12 flex items-center justify-center">
            <LoadingSpinner />
         </div>
      );

   return (
      <>
         {venuePage && (
            <VenueFiltering
               venues={venues}
               setFilteredVenues={setFilteredVenues}
            />
         )}
         <div className="mx-2 flex flex-col items-center md:mx-4">
            <div className="grid w-full w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
               {filteredVenues.slice(0, limit).map((venue) => (
                  <VenueCard
                     key={venue.id}
                     venue={venue}
                     onClick={() => handleCardClick(`/venues/${venue.id}`)}
                  />
               ))}
            </div>
            {filteredVenues.length === 0 && (
               <div className="mx-auto mt-12 flex w-full flex-col items-center justify-center text-lg font-light">
                  <p>No venues found.</p>
                  <p>Try another search query or filter combination.</p>
               </div>
            )}
            {venuePage && filteredVenues && limit < filteredVenues.length && (
               <Button
                  text={"Show more"}
                  styles={"mt-12"}
                  onClick={() => setLimit(limit + INITIAL_LIMIT)}
               />
            )}
         </div>
      </>
   );
};

export default VenueList;
