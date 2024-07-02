"use client";

import { useEffect } from "react";
import { elMessiri } from "@/app/ui/fonts";
import { BookingsTableProps } from "@/app/lib/definitions";
import { LoadingSpinner } from "@/app/ui/LoadingSkeleton";
import { BookingsTable } from "@/app/ui/user/venues/ManagerVenueBookingsTable";

import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import Subheading from "@/app/ui/subheading";
import useImageSource from "@/app/lib/hooks/useImageSource";
import useFetchLoggedInUser from "@/app/lib/hooks/useFetchLoggedInUser";
import useFetchVenueById from "@/app/lib/hooks/useFetchVenueById";
import backgroundReflection from "@/public/background-reflection.avif";

const Modal = dynamic(() => import("@/app/ui/Modal"));

const ManagerVenueDetails = ({ id }: { id: string }) => {
   const { venue, loading } = useFetchVenueById(id);
   const { user } = useFetchLoggedInUser();
   const [imgSrc, setImgSrc] = useImageSource(venue);

   useEffect(() => {
      document.title = `${venue?.name} | Holidaze Resorts`;
   });

   if (!venue || loading) {
      return (
         <div className="mt-12 flex items-center justify-center">
            <LoadingSpinner />
         </div>
      );
   }

   const sortedBookings: BookingsTableProps[] = [...venue.bookings]
      .sort(
         (a, b) =>
            new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
      )
      .map((booking) => ({
         id: booking.id,
         name: booking.customer.name,
         guests: booking.guests.toString(),
         dateFrom: booking.dateFrom,
         dateTo: booking.dateTo,
      }));

   return (
      <div className="mx-1 mb-4 xs:mx-4">
         <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative h-[300px] w-full drop-shadow md:h-[480px] md:w-6/12">
               <Image
                  src={imgSrc}
                  alt={venue?.media?.[0]?.alt || "Venue image"}
                  onError={() => setImgSrc(backgroundReflection)}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  priority={true}
               />
            </div>

            <div className="md:w-6/12">
               <div className="flex items-start justify-between">
                  <div className="flex max-w-[90%] flex-col">
                     <Subheading
                        text={
                           user?.name === venue.owner.name
                              ? "Your venue"
                              : `${venue.owner.name}'s venue`
                        }
                        left=""
                        right="w-14 ms-2"
                     />
                     <h1
                        className={`${elMessiri.className} break-words text-[9vw] tracking-wide md:max-w-[440px] md:text-[4.7vw] lg:text-5xl`}
                     >
                        {venue.name}
                     </h1>
                     <div className="flex gap-1 font-light">
                        <div className="truncate">
                           {venue.location.city ? venue.location.city : ""}
                           {venue.location.city && venue.location.country && (
                              <span>, </span>
                           )}
                        </div>
                        <div className="truncate">
                           {venue.location.country
                              ? `${venue.location.country}`
                              : ""}
                           {!venue.location.city && !venue.location.country && (
                              <span className="font-light">N/A</span>
                           )}
                        </div>
                     </div>
                  </div>
                  {user?.name === venue.owner.name && (
                     <Modal
                        modal="Edit venue"
                        textContent={
                           <span className="icon-[mdi--square-edit-outline] h-7 w-7"></span>
                        }
                     />
                  )}
               </div>

               <hr className="my-4" />

               <div className="mb-4 flex gap-2 font-extralight">
                  <div>
                     <span className="font-normal">£{venue.price}</span> / night
                  </div>
                  |
                  <div>
                     max <span className="font-normal">{venue.maxGuests}</span>{" "}
                     guests
                  </div>
               </div>

               <p className="whitespace-pre-wrap break-words font-extralight">
                  {venue.description || "No description available"}
               </p>

               <hr className="my-4" />

               <h2 className={`${elMessiri.className} mb-2 text-3xl`}>
                  Amenities
               </h2>
               <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                     {venue.meta.wifi ? (
                        <>
                           <span className="icon-[mdi--wifi] h-6 w-6 text-dark"></span>{" "}
                           Wifi
                        </>
                     ) : (
                        <>
                           <span className="icon-[mdi--wifi-off] h-6 w-6 text-grey"></span>{" "}
                           No Wifi
                        </>
                     )}
                  </div>
                  <div className="flex gap-2">
                     {venue.meta.parking ? (
                        <>
                           <span className="icon-[mdi--car] h-6 w-6 text-dark"></span>{" "}
                           Parking
                        </>
                     ) : (
                        <>
                           <span className="icon-[mdi--car-off] h-6 w-6 text-grey"></span>{" "}
                           No parking
                        </>
                     )}
                  </div>
                  <div className="flex gap-2">
                     {venue.meta.breakfast ? (
                        <>
                           <span className="icon-[mdi--free-breakfast] h-6 w-6 text-dark"></span>{" "}
                           Breakfast
                        </>
                     ) : (
                        <>
                           <span className="icon-[mdi--free-breakfast-off] h-6 w-6 text-grey"></span>{" "}
                           No breakfast
                        </>
                     )}
                  </div>
                  <div className="flex gap-2">
                     {venue.meta.pets ? (
                        <>
                           <span className="icon-[mdi--dog-side] h-6 w-6 text-dark"></span>{" "}
                           Pets allowed
                        </>
                     ) : (
                        <>
                           <span className="icon-[mdi--dog-side-off] h-6 w-6 text-grey"></span>{" "}
                           No pets allowed
                        </>
                     )}
                  </div>
               </div>
            </div>
         </div>
         <hr className="my-8" />
         {user?.name === venue.owner.name && (
            <>
               <div>
                  <h3 className={`${elMessiri.className} mb-2 text-3xl`}>
                     Bookings for this venue
                  </h3>
                  {sortedBookings.length === 0 ? (
                     <p>No bookings for this venue yet</p>
                  ) : (
                     <BookingsTable data={sortedBookings} />
                  )}
               </div>
            </>
         )}
      </div>
   );
};

export default ManagerVenueDetails;
