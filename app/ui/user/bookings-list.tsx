"use client";

import React, { useState, useEffect } from "react";
import { getProfileBookings } from "@/app/lib/data";
import { BookingProps } from "@/app/lib/definitions";
import Booking from "@/app/ui/user/booking";

const BookingsList: React.FC = () => {
   const [bookings, setBookings] = useState<BookingProps[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchBookings = async () => {
         setBookings(await getProfileBookings());
         setLoading(false);
      };

      fetchBookings();
   }, []);

   if (loading) return <p className="mt-8 flex justify-center">Loading...</p>;

   return (
      <div className="grid w-full grid-cols-2 gap-6 p-6">
         {bookings.map((booking) => (
            <Booking key={booking.id} booking={booking} />
         ))}
      </div>
   );
};

export default BookingsList;
