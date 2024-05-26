"use client";

import { BookingListProps } from "@/app/lib/definitions";
import { LinkButton } from "@/app/ui/Buttons";
import { LoadingSpinner } from "@/app/ui/LoadingSkeleton";
import useFetchBookingsByUser from "@/app/lib/hooks/useFetchBookingsByUser";
import BookingCard from "@/app/ui/user/bookings/BookingCard";
import useFetchLoggedInUser from "@/app/lib/hooks/useFetchLoggedInUser";

const BookingsList: React.FC<BookingListProps> = ({ name }) => {
   const { user, loading: userLoading } = useFetchLoggedInUser();
   const username = name;

   const { bookings, loading: bookingsLoading } = useFetchBookingsByUser();

   if (userLoading || bookingsLoading) {
      return (
         <div className="my-12 flex flex-col items-center justify-center font-light">
            <LoadingSpinner />
         </div>
      );
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
         <div className="mt-8 flex w-full flex-col items-center justify-center gap-2 bg-white py-8 font-light shadow">
            <p className="mb-8 mt-4">No bookings found.</p>
            <h2 className="text-center text-lg font-light uppercase tracking-wider text-blue sm:text-xl">
               Browse our venues
            </h2>
            <LinkButton text="Venues" targetHref="/venues" />
         </div>
      );
   }

   return (
      <>
         <div className="mb-4 mt-8 flex w-full flex-col items-center justify-center gap-2 bg-white py-4 shadow">
            <h2 className="text-center text-lg font-light uppercase tracking-wider text-blue sm:text-xl">
               Find new adventures
            </h2>
            <LinkButton text="Venues" targetHref="/venues" />
         </div>
         <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-3">
            {bookings.map((booking) => (
               <BookingCard key={booking.id} booking={booking} user={user!} />
            ))}
         </div>
      </>
   );
};

export default BookingsList;
