import { useState, useEffect } from "react";
import { getVenues } from "@/app/lib/data";
import { VenueProps } from "@/app/lib/definitions";

const useFetchVenues = () => {
   const [venues, setVenues] = useState<VenueProps[]>([]);
   const [loading, setLoading] = useState(true);

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

   return { venues, loading };
};

export default useFetchVenues;
