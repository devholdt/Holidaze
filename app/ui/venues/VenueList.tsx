"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/app/ui/buttons";
import RadioButtons from "@/app/ui/venues/radio-buttons";
import VenueCard from "@/app/ui/venues/VenueCard";
import useFetchAllVenues from "@/app/lib/hooks/useFetchAllVenues";
import { VenueListProps, VenueProps } from "@/app/lib/definitions";

const Searchbar = dynamic(() => import("@/app/ui/venues/Searchbar"), {
   ssr: false,
   loading: () => <div>Loading...</div>,
});

const VenueList: React.FC<VenueListProps> = ({
   listLimit = 9,
   venuePage = false,
}) => {
   const { venues, loading } = useFetchAllVenues();
   const INITIAL_LIMIT = listLimit;
   const [limit, setLimit] = useState(INITIAL_LIMIT);
   const [filteredVenues, setFilteredVenues] = useState<VenueProps[]>([]);

   if (loading) return <p className="mt-8 flex justify-center">Loading...</p>;

   return (
      <div className="w-full px-8">
         {venuePage && (
            <div className="my-8 flex w-full justify-between gap-20">
               <Suspense fallback={<p>Loading...</p>}>
                  <Searchbar
                     venues={venues}
                     setFilteredVenues={setFilteredVenues}
                  />
                  <RadioButtons />
               </Suspense>
            </div>
         )}
         <div className="mb-8 flex flex-col items-center">
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
               {venuePage
                  ? filteredVenues
                       .slice(0, limit)
                       .map((venue) => (
                          <VenueCard key={venue.id} venue={venue} />
                       ))
                  : venues
                       .slice(0, limit)
                       .map((venue) => (
                          <VenueCard key={venue.id} venue={venue} />
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
