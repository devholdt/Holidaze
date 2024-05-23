"use client";

import { useEffect, useState } from "react";
import { VenueProps } from "@/app/lib/definitions";

const useFetchVenuesByUser = (name: string) => {
   const [venues, setVenues] = useState<VenueProps[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchVenues() {
         const response = await fetch(`/api/auth/managerVenues?name=${name}`, {
            credentials: "include",
         });

         if (response.ok) {
            const json = await response.json();
            setVenues(json.data);
         } else {
            setVenues([]);
         }
         setLoading(false);
      }

      fetchVenues();
   }, [name]);

   return { venues, loading };
};

export default useFetchVenuesByUser;
