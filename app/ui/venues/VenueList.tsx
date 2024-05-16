"use client";

import { Button } from "@/app/ui/buttons";
import React, { useState } from "react";
import VenueCard from "@/app/ui/venues/VenueCard";
import useFetchAllVenues from "@/app/lib/hooks/useFetchAllVenues";

const VenueList: React.FC<{
   listLimit?: number;
   showMoreButton?: boolean;
}> = ({ listLimit = 9, showMoreButton = false }) => {
   const { venues, loading } = useFetchAllVenues();
   const INITIAL_LIMIT = listLimit;
   const [limit, setLimit] = useState(INITIAL_LIMIT);

   if (loading) return <p className="mt-8 flex justify-center">Loading...</p>;

   return (
      <>
         <div className="grid w-full grid-cols-3 gap-8 px-4 md:px-14 xl:px-32">
            {venues.slice(0, limit).map((venue: any) => (
               <VenueCard venue={venue} key={venue.id} />
            ))}
         </div>
         {showMoreButton && venues && limit < venues.length && (
            <Button
               text={"Show more"}
               styles={"mt-12"}
               onClick={() => setLimit(limit + INITIAL_LIMIT)}
            />
         )}
      </>
   );
};

export default VenueList;
