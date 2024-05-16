import { useState, useEffect } from "react";
import { getBookingById } from "@/app/lib/data";
import { BookingProps } from "@/app/lib/definitions";

const useFetchBooking = (id: string): BookingProps | null => {
   const [booking, setBooking] = useState<BookingProps | null>(null);

   useEffect(() => {
      const fetchBooking = async () => {
         const bookingData = await getBookingById(id);
         setBooking(bookingData);
      };

      fetchBooking();
   }, [id]);

   return booking;
};

export default useFetchBooking;
