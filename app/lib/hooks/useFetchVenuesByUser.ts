"use client";

import { useEffect, useState } from "react";
import { VenueProps } from "@/app/lib/definitions";

const useFetchVenuesByName = () => {
   const [venues, setVenues] = useState<VenueProps[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchVenues() {
         const response = await fetch("/api/auth/managerVenues", {
            credentials: "include",
         });
         if (response.ok) {
            const json = await response.json();

            const venuesData = json.data;

            setVenues(venuesData);
         } else {
            setVenues([]);
         }
         setLoading(false);
      }
      fetchVenues();
   }, []);

   return { venues, loading };
};

export default useFetchVenuesByName;
