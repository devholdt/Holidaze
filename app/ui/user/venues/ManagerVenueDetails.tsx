"use client";

import { lazy } from "react";
import { elMessiri } from "@/app/ui/fonts";
import Image from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import Subheading from "@/app/ui/subheading";
import {
   WifiIcon,
   TruckIcon,
   CakeIcon,
   FaceSmileIcon,
   FaceFrownIcon,
   PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@/app/lib/utils";
import { BookingProps } from "@/app/lib/definitions";
import Link from "next/link";
import useFetchVenue from "@/app/lib/hooks/useFetchVenue";
import useFetchLoggedInUser from "@/app/lib/hooks/useFetchLoggedInUser";
import useImageSource from "@/app/lib/hooks/useImageSource";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/app/ui/Modal"));

const ManagerVenueDetails = ({ id }: { id: string }) => {
   const venue = useFetchVenue(id);
   const user = useFetchLoggedInUser();

   const [imgSrc, setImgSrc] = useImageSource(venue);

   if (!venue) {
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
      <div className="m-8">
         <div className="flex gap-4">
            <div className="relative w-6/12">
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

            <div className="w-6/12">
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
                        className={`${elMessiri.className} text-5xl tracking-wide`}
                     >
                        {venue.name}
                     </h1>
                  </div>
                  {user?.name === venue.owner.name && (
                     <Modal
                        modal="Edit venue"
                        textContent={<PencilSquareIcon className="w-6" />}
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
                     <span className="font-normal">{venue.maxGuests}</span> max
                     guests
                  </p>
               </div>

               <p className="font-extralight">
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
                           <WifiIcon className="w-6" /> Wifi
                        </>
                     ) : (
                        <>
                           <WifiIcon className="w-6" /> No Wifi
                        </>
                     )}
                  </p>
                  <p className="flex gap-2">
                     {venue.meta.parking ? (
                        <>
                           <TruckIcon className="w-6" /> Parking
                        </>
                     ) : (
                        <>
                           <TruckIcon className="w-6" /> No Parking
                        </>
                     )}
                  </p>
                  <p className="flex gap-2">
                     {venue.meta.breakfast ? (
                        <>
                           <CakeIcon className="w-6" /> Breakfast
                        </>
                     ) : (
                        <>
                           <CakeIcon className="w-6" /> No Breakfast
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
         </div>
         {user?.name === venue.owner.name && (
            <>
               <hr className="my-8" />
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
