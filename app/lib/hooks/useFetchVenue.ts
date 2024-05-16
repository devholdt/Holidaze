"use client";

import { useState, useEffect } from "react";
import { getVenueById } from "@/app/lib/data";
import { VenueProps } from "@/app/lib/definitions";

const useFetchVenue = (id: string): VenueProps | null => {
   const [venue, setVenue] = useState<VenueProps | null>(null);

   useEffect(() => {
      const fetchVenue = async () => {
         const venueData = await getVenueById(id);
         setVenue(venueData);
      };

      fetchVenue();
   }, [id]);

   return venue;
};

export default useFetchVenue;
