"use client";

import Link from "next/link";
import useFetchBookingsByUser from "@/app/lib/hooks/useFetchBookingsByUser";
import BookingCard from "@/app/ui/user/bookings/BookingCard";
import useUser from "@/app/lib/hooks/useUser";
import { BookingListProps } from "@/app/lib/definitions";

const BookingsList: React.FC<BookingListProps> = ({ name }) => {
   const { user, loading: userLoading } = useUser();
   const username = name;

   const { bookings, loading: bookingsLoading } = useFetchBookingsByUser();

   if (userLoading || bookingsLoading) {
      return <p className="mt-8 flex justify-center">Loading...</p>;
   }

   if (!username) {
      return (
         <div className="flex flex-col items-center justify-center font-light">
            <p className="mt-8">No user found.</p>
         </div>
      );
   }

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
            <BookingCard key={booking.id} booking={booking} user={user!} />
         ))}
      </div>
   );
};

export default BookingsList;
