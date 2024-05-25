"use client";

import { useEffect } from "react";
import { elMessiri } from "@/app/ui/fonts";
import { formatDate } from "@/app/lib/utils";
import { BookingProps } from "@/app/lib/definitions";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Subheading from "@/app/ui/subheading";
import useImageSource from "@/app/lib/hooks/useImageSource";
import useFetchLoggedInUser from "@/app/lib/hooks/useFetchLoggedInUser";
import useFetchVenueById from "@/app/lib/hooks/useFetchVenueById";
import backgroundReflection from "@/public/background-reflection.jpg";

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
         <div className="mt-12 flex flex-col items-center justify-center text-center">
            <p>Loading...</p>
         </div>
      );
   }

   const sortedBookings = [...venue.bookings].sort(
      (a: BookingProps, b: BookingProps) =>
         new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
   );

   return (
      <div className="mx-1 mb-4 xs:mx-4">
         <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative min-h-80 w-full md:w-6/12">
               <Image
                  src={imgSrc}
                  alt={venue?.media?.[0]?.alt || "Venue image"}
                  onError={() => setImgSrc(backgroundReflection)}
                  fill
                  unoptimized
                  className="object-cover object-center"
                  priority={true}
               />
            </div>

            <div className="md:w-6/12">
               <div className="flex items-start justify-between">
                  <div className="flex flex-col">
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
                        className={`${elMessiri.className} text-[9vw] tracking-wide md:max-w-[440px] md:text-[4.7vw] lg:text-5xl`}
                     >
                        {venue.name}
                     </h1>
                     <p className="font-light">
                        {venue.location.city ? venue.location.city : ""}
                        {venue.location.city && venue.location.country && (
                           <span>, </span>
                        )}
                        {venue.location.country
                           ? `${venue.location.country}`
                           : ""}
                        {!venue.location.city && !venue.location.country && (
                           <span className="font-light">N/A</span>
                        )}
                     </p>
                  </div>
                  {user?.name === venue.owner.name && (
                     <Modal
                        modal="Edit venue"
                        textContent={
                           <span className="icon-[mdi--square-edit-outline] h-7 w-7 text-dark"></span>
                        }
                     />
                  )}
               </div>

               <hr className="my-4" />

               <div className="mb-4 flex gap-2 font-extralight">
                  <p>
                     <span className="font-normal">£{venue.price}</span> / night
                  </p>
                  |
                  <p>
                     max <span className="font-normal">{venue.maxGuests}</span>{" "}
                     guests
                  </p>
               </div>

               <p className="whitespace-pre-wrap break-words font-extralight">
                  {venue.description || "No description available"}
               </p>

               <hr className="my-4" />

               <h2 className={`${elMessiri.className} mb-2 text-3xl`}>
                  Amenities
               </h2>
               <div className="flex flex-col gap-4">
                  <p className="flex gap-2">
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
                  </p>
                  <p className="flex gap-2">
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
                  </p>
                  <p className="flex gap-2">
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
                  </p>
                  <p className="flex gap-2">
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
                  </p>
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
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                     {sortedBookings.length === 0 ? (
                        <p>No bookings for this venue yet</p>
                     ) : (
                        sortedBookings.map((booking: BookingProps) => (
                           <div
                              key={booking.id}
                              className="flex flex-col items-center justify-center gap-4 rounded bg-white p-4 text-center font-extralight shadow-md sm:flex-row sm:text-left"
                           >
                              <Image
                                 src={booking.customer.avatar.url}
                                 alt={booking.customer.avatar.alt}
                                 width={400}
                                 height={400}
                                 className="h-[100px] w-[100px] rounded-full border border-lightGrey object-cover object-center"
                                 priority={true}
                              />
                              <div className="w-full">
                                 <div className="flex items-center justify-between gap-2">
                                    <h4 className="text-xl">
                                       {booking.customer.name}
                                    </h4>
                                    <Link
                                       href={`/user/${booking.customer.name}`}
                                       className="bg-brown px-2 py-1 font-light uppercase tracking-widest text-white transition hover:bg-darkBrown"
                                    >
                                       visit
                                    </Link>
                                 </div>
                                 <hr className="my-2 text-lightGrey" />
                                 <p>
                                    <span className="font-medium">
                                       {booking.guests} guests
                                    </span>{" "}
                                    from{" "}
                                    <span className="font-medium">
                                       {formatDate(booking.dateFrom)}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-medium">
                                       {formatDate(booking.dateTo)}
                                    </span>
                                 </p>
                                 <p className="italic">
                                    Booked on {formatDate(booking.created)}
                                 </p>
                              </div>
                           </div>
                        ))
                     )}
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default ManagerVenueDetails;
