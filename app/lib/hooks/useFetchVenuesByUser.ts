"use client";

import { useState, useEffect } from "react";
import { getVenuesByUser } from "@/app/lib/data";
import { VenueProps } from "@/app/lib/definitions";

const useFetchVenuesByUser = (name: string) => {
   const [venues, setVenues] = useState<VenueProps[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchVenues = async () => {
         try {
            const fetchedVenues = await getVenuesByUser(name);
            setVenues(fetchedVenues);
         } catch (error) {
            console.error("Error fetching venues:", error);
         }
         setLoading(false);
      };

      fetchVenues();
   }, [name]);

   return { venues, loading };
};

export default useFetchVenuesByUser;
