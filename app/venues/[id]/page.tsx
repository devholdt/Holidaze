import { Metadata } from "next";
import { getVenueById } from "@/app/lib/data";
import VenueImage from "@/app/ui/venues/venue-image";
import { elMessiri } from "@/app/ui/fonts";
import { BookingProps } from "@/app/lib/definitions";
import {
   WifiIcon,
   TruckIcon,
   CakeIcon,
   FaceSmileIcon,
   FaceFrownIcon,
} from "@heroicons/react/24/outline";
import Form from "@/app/ui/venues/booking-form";

export const metadata: Metadata = {
   title: "Venue",
};

export default async function Page({ params }: { params: { id: string } }) {
   const venue = await getVenueById(params.id);

   if (!venue) {
      return (
         <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
            <div className="mt-12 flex flex-col items-center justify-center text-center">
               <p>Venue not found</p>
            </div>
         </main>
      );
   }

   const bookedDates = venue.bookings.map((booking: BookingProps) => ({
      dateFrom: booking.dateFrom,
      dateTo: booking.dateTo,
   }));

   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <div className="m-8">
            <div className="relative mb-4 h-80">
               <VenueImage venue={venue} />
            </div>

            <h1
               className={`${elMessiri.className} mb-2 mt-8 text-6xl tracking-wide`}
            >
               {venue.name}
            </h1>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <div className="mb-4 flex gap-4 font-extralight">
                     <p>
                        <span className="font-normal">£{venue.price}</span> /
                        night
                     </p>
                     |
                     <p>
                        max{" "}
                        <span className="font-normal">{venue.maxGuests}</span>{" "}
                        guests
                     </p>
                     |
                     <p>
                        rating:{" "}
                        <span className="font-normal">{venue.rating}/5</span>
                     </p>
                  </div>
                  <p className="font-extralight">{venue.description}</p>
                  <hr className="my-4" />
                  <h2 className={`${elMessiri.className} text-3xl`}>
                     Amenities
                  </h2>
                  <div className="mt-4 flex flex-col gap-2">
                     <p className="flex gap-2">
                        {venue.meta.wifi && (
                           <>
                              <WifiIcon className="w-6" /> Wifi
                           </>
                        )}
                     </p>
                     <p className="flex gap-2">
                        {venue.meta.parking && (
                           <>
                              <TruckIcon className="w-6" /> Parking
                           </>
                        )}
                     </p>
                     <p className="flex gap-2">
                        {venue.meta.breakfast && (
                           <>
                              <CakeIcon className="w-6" /> Breakfast
                           </>
                        )}
                     </p>
                     <p className="flex gap-2">
                        {venue.meta.pets ? (
                           <>
                              <FaceSmileIcon className="w-6" /> Pets allowed
                           </>
                        ) : (
                           <>
                              <FaceFrownIcon className="w-6" /> Pets not allowed
                           </>
                        )}
                     </p>
                  </div>
               </div>
               <div className="bg-white px-10 py-8">
                  <h3 className={`${elMessiri.className} text-3xl`}>
                     Book this venue
                  </h3>
                  <Form
                     maxGuests={venue.maxGuests}
                     venueId={venue.id}
                     bookedDates={bookedDates}
                  />
               </div>
            </div>
         </div>
      </main>
   );
}
