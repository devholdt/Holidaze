"use client";

import { useState, useEffect } from "react";
import { BookingProps } from "@/app/lib/definitions";

const useFetchBooking = (id: string) => {
   const [booking, setBooking] = useState<BookingProps | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchBooking() {
         const response = await fetch(`/api/auth/bookings/${id}`, {
            credentials: "include",
         });

         if (response.ok) {
            const json = await response.json();
            setBooking(json.data);
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
