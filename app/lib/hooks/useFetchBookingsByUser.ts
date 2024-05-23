"use client";

import { useEffect, useState } from "react";
import { BookingProps } from "@/app/lib/definitions";

const useFetchBookingsByUser = () => {
   const [bookings, setBookings] = useState<BookingProps[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchBookings() {
         const response = await fetch("/api/auth/bookings", {
            credentials: "include",
         });

         if (response.ok) {
            const json = await response.json();
            setBookings(json.data);
         } else {
            setBookings([]);
         }

         setLoading(false);
      }

      fetchBookings();
   }, []);

   return { bookings, loading };
};

export default useFetchBookingsByUser;
