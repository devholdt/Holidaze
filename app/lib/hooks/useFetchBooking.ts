"use client";

import { useState, useEffect } from "react";
import { BookingProps } from "@/app/lib/definitions";

const useFetchBooking = (id: string) => {
   const [booking, setBooking] = useState<BookingProps | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchBooking() {
         const response = await fetch(`/api/bookings/${id}`, {
            credentials: "include",
         });

         if (response.ok) {
            const json = await response.json();
            const data = json.data;

            setBooking(data);
         } else {
            setBooking(null);
         }

         setLoading(false);
      }

      fetchBooking();
   }, [id]);

   return { booking, loading };
};

export default useFetchBooking;
