"use client";

import BookingCard from "@/app/ui/user/bookings/BookingCard";
import Link from "next/link";
import useFetchBookingsByUser from "@/app/lib/hooks/useFetchBookingsByUser";

const BookingsList: React.FC = () => {
   const { bookings, loading } = useFetchBookingsByUser();

   if (loading) return <p className="mt-8 flex justify-center">Loading...</p>;

   if (bookings.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center font-light">
            <p className="mb-4 mt-8">No bookings found.</p>
            <p>
               Click{" "}
               <Link href="/venues" className="font-normal underline">
                  here
               </Link>{" "}
               to look for your next adventure!
            </p>
         </div>
      );
   }

   return (
      <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-3">
         {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
         ))}
      </div>
   );
};

export default BookingsList;
