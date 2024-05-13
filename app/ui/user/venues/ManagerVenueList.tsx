"use client";

import React, { useState, useEffect } from "react";
import { getManagerVenues } from "@/app/lib/data";
import { VenueProps } from "@/app/lib/definitions";
import ManagerVenue from "@/app/ui/user/venues/ManagerVenue";

const ManagerVenueList: React.FC = () => {
   const [venues, setVenues] = useState<VenueProps[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchVenues = async () => {
         try {
            const fetchedVenues = await getManagerVenues();
            setVenues(fetchedVenues);
         } catch (error) {
            console.error("Error fetching venues:", error);
         }
         setLoading(false);
      };

      fetchVenues();
   }, []);

   if (loading) return <p className="mt-8 flex justify-center">Loading...</p>;

   if (venues.length === 0) {
      return (
         <div className="flex justify-center">
            <p className="mt-8">You have not created any venues.</p>
         </div>
      );
   }

   return (
      <div className="grid w-full grid-cols-2 gap-6 p-6">
         {venues.map((venue) => (
            <ManagerVenue key={venue.id} venue={venue} />
         ))}
      </div>
   );
};

export default ManagerVenueList;
