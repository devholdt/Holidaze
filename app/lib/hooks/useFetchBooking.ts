"use client";

import { useState, useEffect } from "react";
import { getBookingById } from "@/app/lib/data";
import { BookingProps } from "@/app/lib/definitions";

const useFetchBooking = (id: string): BookingProps | null => {
   const [booking, setBooking] = useState<BookingProps | null>(null);

   useEffect(() => {
      const fetchBooking = async () => {
         try {
            const bookingData = await getBookingById(id);
            setBooking(bookingData);
         } catch (error) {
            console.error("Error fetching booking:", error);
         }
      };

      fetchBooking();
   }, [id]);

   return booking;
};

export default useFetchBooking;
