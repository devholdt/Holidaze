"use client";

import { Button } from "@/app/ui/buttons";
import React, { useState, useEffect } from "react";
import { VenueProps } from "@/app/lib/definitions";
import { getVenues } from "@/app/lib/data";

import VenueCard from "@/app/ui/venues/VenueCard";

const VenueList: React.FC<{
   listLimit?: number;
   showMoreButton?: boolean;
}> = ({ listLimit = 9, showMoreButton = false }) => {
   const [venues, setVenues] = useState<VenueProps[]>([]);
   const [loading, setLoading] = useState(true);
   const INITIAL_LIMIT = listLimit;
   const [limit, setLimit] = useState(INITIAL_LIMIT);

   useEffect(() => {
      const fetchVenues = async () => {
         try {
            const fetchedVenues = await getVenues();
            setVenues(fetchedVenues);
         } catch (error) {
            console.error("Error fetching venues:", error);
         }
         setLoading(false);
      };

      fetchVenues();
   }, []);

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
