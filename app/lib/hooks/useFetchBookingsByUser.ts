import { useState, useEffect } from "react";
import { getBookingsByUser } from "@/app/lib/data";
import { BookingProps } from "@/app/lib/definitions";

const useFetchBookingsByUser = () => {
   const [bookings, setBookings] = useState<BookingProps[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchBookings = async () => {
         try {
            const fetchedBookings = await getBookingsByUser();
            setBookings(fetchedBookings);
         } catch (error) {
            console.error("Error fetching bookings:", error);
         }
         setLoading(false);
      };

      fetchBookings();
   }, []);

   return { bookings, loading };
};

export default useFetchBookingsByUser;
