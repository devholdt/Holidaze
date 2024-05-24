"use client";

import { useEffect, useState } from "react";
import { VenueProps } from "@/app/lib/definitions";

const useFetchAllVenues = () => {
   const [venues, setVenues] = useState<VenueProps[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchVenues() {
         const response = await fetch(`/api/venues`);

         if (response.ok) {
            const json = await response.json();
            setVenues(json.data);
         } else {
            setVenues([]);
         }

         setLoading(false);
      }

      fetchVenues();
   }, []);

   return { venues, loading };
};

export default useFetchAllVenues;
