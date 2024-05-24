"use client";

import { Suspense, useState, useEffect } from "react";
import { Button } from "@/app/ui/buttons";
import VenueCard from "@/app/ui/venues/VenueCard";
import useFetchAllVenues from "@/app/lib/hooks/useFetchAllVenues";
import { VenueListProps, VenueProps } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
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

   if (loading) return <p className="mt-8 flex justify-center">Loading...</p>;

   return (
      <div className="w-full px-2 md:px-8">
         {venuePage && (
            <div className="my-8 flex w-full flex-col gap-4 xs:flex-row sm:gap-8">
               <Suspense fallback={<p>Loading...</p>}>
                  <VenueFiltering
                     venues={venues}
                     setFilteredVenues={setFilteredVenues}
                  />
               </Suspense>
            </div>
         )}
         <div className="mb-8 flex flex-col items-center">
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
               {filteredVenues.slice(0, limit).map((venue) => (
                  <VenueCard
                     key={venue.id}
                     venue={venue}
                     onClick={() => handleCardClick(`/venues/${venue.id}`)}
                  />
               ))}
            </div>
            {venuePage && filteredVenues && limit < filteredVenues.length && (
               <Button
                  text={"Show more"}
                  styles={"mt-12"}
                  onClick={() => setLimit(limit + INITIAL_LIMIT)}
               />
            )}
         </div>
      </div>
   );
};

export default VenueList;
