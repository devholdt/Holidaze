"use client";

import React, { useState, useEffect } from "react";
import { getProfileBookings } from "@/app/lib/data";
import { BookingProps } from "@/app/lib/definitions";
import BookingCard from "@/app/ui/user/bookings/BookingCard";

const BookingsList: React.FC = () => {
   const [bookings, setBookings] = useState<BookingProps[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchBookings = async () => {
         try {
            const fetchedBookings = await getProfileBookings();
            setBookings(fetchedBookings);
         } catch (error) {
            console.error("Error fetching bookings:", error);
         }
         setLoading(false);
      };

      fetchBookings();
   }, []);

   if (loading) return <p className="mt-8 flex justify-center">Loading...</p>;

   if (bookings.length === 0) {
      return (
         <div className="flex justify-center">
            <p className="mt-8">No bookings found.</p>
         </div>
      );
   }

   return (
      <div className="grid w-full grid-cols-3 gap-6 p-6">
         {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
         ))}
      </div>
   );
};

export default BookingsList;
