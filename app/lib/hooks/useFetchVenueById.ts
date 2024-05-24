"use client";

import { useEffect, useState } from "react";
import { VenueProps } from "@/app/lib/definitions";

const useFetchVenueByUser = (id: string) => {
   const [venue, setVenue] = useState<VenueProps | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchVenue() {
         const response = await fetch(`/api/venues/${id}`, {
            credentials: "include",
         });

         if (response.ok) {
            const json = await response.json();
            const data = json.data;

            setVenue(data);
         } else {
            setVenue(null);
         }

         setLoading(false);
      }

      fetchVenue();
   }, [id]);

   return { venue, loading };
};

export default useFetchVenueByUser;
