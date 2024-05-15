"use client";

import React, { useState, useEffect } from "react";
import { getManagerVenues } from "@/app/lib/data";
import { VenueProps } from "@/app/lib/definitions";
import ManagerVenueCard from "@/app/ui/user/venues/ManagerVenueCard";
import { getItem } from "@/app/lib/storage";

interface ManagerVenueListProps {
   name?: string;
}

const ManagerVenueList: React.FC<ManagerVenueListProps> = ({ name }) => {
   const [venues, setVenues] = useState<VenueProps[]>([]);
   const [loading, setLoading] = useState(true);

   const managerName = name || getItem("name");

   useEffect(() => {
      const fetchVenues = async () => {
         try {
            const fetchedVenues = await getManagerVenues(managerName);
            setVenues(fetchedVenues);
         } catch (error) {
            console.error("Error fetching venues:", error);
         }
         setLoading(false);
      };

      fetchVenues();
   }, [managerName]);

   if (loading) return <p className="mt-8 flex justify-center">Loading...</p>;

   if (venues.length === 0) {
      return (
         <div className="flex justify-center">
            <p className="mt-8">You have not created any venues.</p>
         </div>
      );
   }

   return (
      <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
         {venues.map((venue) => (
            <ManagerVenueCard key={venue.id} venue={venue} />
         ))}
      </div>
   );
};

export default ManagerVenueList;
