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
   listLimit = 12,
   venuePage = false,
}) => {
   const { venues, loading } = useFetchAllVenues();
   const INITIAL_LIMIT = listLimit;
   const [limit, setLimit] = useState(INITIAL_LIMIT);
   const [filteredVenues, setFilteredVenues] = useState<VenueProps[]>([]);

   if (loading) return <p className="mt-8 flex justify-center">Loading...</p>;

   return (
      <div className="w-full px-2 md:px-8">
         {venuePage && (
            <div className="xs:flex-row my-8 flex w-full flex-col gap-4 sm:gap-8">
               <Suspense fallback={<p>Loading...</p>}>
                  <Searchbar
                     venues={venues}
                     setFilteredVenues={setFilteredVenues}
                  />
                  {/* <RadioButtons /> */}
                  <div className="flex max-w-[200px] flex-col">
                     <label htmlFor="filter">Filter by:</label>
                     <select
                        name="filter"
                        id="filter"
                        className="h-12 rounded-full border-2 border-yellow px-4 text-blue hover:cursor-pointer"
                     >
                        <option value="Latest">Latest</option>
                        <option value="Popular">Popular</option>
                        <option value="Featured">Featured</option>
                     </select>
                  </div>
               </Suspense>
            </div>
         )}
         <div className="mb-8 flex flex-col items-center">
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
