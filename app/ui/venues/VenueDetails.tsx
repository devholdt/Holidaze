"use client";

import React, { useState, useEffect } from "react";
import { elMessiri } from "@/app/ui/fonts";
import { getVenueById } from "@/app/lib/data";
import { BookingProps } from "@/app/lib/definitions";
import {
   WifiIcon,
   TruckIcon,
   CakeIcon,
   FaceSmileIcon,
   FaceFrownIcon,
} from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import Form from "@/app/ui/venues/BookingForm";
import { formatDate } from "@/app/lib/utils";
import Link from "next/link";

const VenueDetails = ({ id }: { id: string }) => {
   const [venue, setVenue] = useState<any>(null);
   const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
      venue?.media?.[0].url || backgroundReflection
   );

   useEffect(() => {
      const fetchVenue = async () => {
         setVenue(await getVenueById(id));
      };

      fetchVenue();
   }, [id]);

   useEffect(() => {
      setImgSrc(venue?.media?.[0].url || backgroundReflection);
   }, [venue]);

   if (!venue) {
      return (
         <div className="mt-12 flex flex-col items-center justify-center text-center">
            <p>Loading...</p>
         </div>
      );
   }

   const bookedDates = venue.bookings.map((booking: BookingProps) => ({
      dateFrom: booking.dateFrom,
      dateTo: booking.dateTo,
   }));

   return (
      <div className="m-8">
         <div className="relative mb-4 h-80">
            <Image
               src={imgSrc}
               alt={venue?.media?.[0]?.alt || "Venue image"}
               onError={() => setImgSrc(backgroundReflection)}
               fill
               unoptimized
               className="z-1 object-cover object-center drop-shadow-md"
            />
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div>
               <h1 className={`${elMessiri.className} text-6xl tracking-wide`}>
                  {venue.name}
               </h1>
               <p className="mb-2 text-sm font-light italic">
                  Created {formatDate(venue.created)}
               </p>
               <div className="mb-4 flex gap-4 font-extralight">
                  <p>
                     <span className="font-normal">£{venue.price}</span> / night
                  </p>
                  |
                  <p>
                     max <span className="font-normal">{venue.maxGuests}</span>{" "}
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
               <h3 className={`${elMessiri.className} text-3xl`}>Amenities</h3>
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
            <div className="flex flex-col gap-4">
               <div className="bg-white px-10 py-6">
                  <h2
                     className={`${elMessiri.className} mb-4 text-3xl tracking-wide`}
                  >
                     Your host
                  </h2>
                  <div className="flex gap-4">
                     <Image
                        src={venue.owner.avatar.url}
                        alt={venue.owner.avatar.alt}
                        width={200}
                        height={200}
                        className="h-24 w-24 rounded-full object-cover object-center drop-shadow-md"
                     />
                     <div className="flex flex-col">
                        <p className="text-xl">{venue.owner.name}</p>
                        <p className="font-extralight italic">
                           {venue.owner.email}
                        </p>
                        <Link
                           href={`/user/${venue.owner.name}`}
                           className="mt-2 w-fit border px-4 py-1"
                        >
                           visit
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="bg-white px-10 py-6">
                  <h4 className={`${elMessiri.className} mb-4 text-3xl`}>
                     Book this venue
                  </h4>
                  <Form
                     maxGuests={venue.maxGuests}
                     venueId={venue.id}
                     bookedDates={bookedDates}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default VenueDetails;
