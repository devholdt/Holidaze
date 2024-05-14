"use client";

import React, { useState, useEffect } from "react";
import { elMessiri } from "@/app/ui/fonts";
import { formatDate } from "@/app/lib/utils";
import { getBookingById } from "@/app/lib/data";
import Image, { StaticImageData } from "next/image";
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
import Modal from "@/app/ui/Modal";

const BookingDetails = ({ id }: { id: string }) => {
   const [booking, setBooking] = useState<any>(null);
   const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
      booking?.venue.media?.[0].url || backgroundReflection
   );

   useEffect(() => {
      const fetchBooking = async () => {
         setBooking(await getBookingById(id));
      };

      fetchBooking();
   }, [id]);

   useEffect(() => {
      setImgSrc(booking?.venue?.media?.[0]?.url || backgroundReflection);
   }, [booking]);

   if (!booking) {
      return (
         <div className="mt-12 flex flex-col items-center justify-center text-center">
            <p>Loading...</p>
         </div>
      );
   }

   return (
      <div className="m-8 flex gap-4">
         <div className="relative w-6/12">
            <Image
               src={imgSrc}
               alt={booking?.venue?.media?.[0]?.alt || "Venue image"}
               onError={() => setImgSrc(backgroundReflection)}
               fill
               unoptimized
               className="object-cover object-center"
            />
         </div>

         <div className="w-6/12">
            <div className="flex items-start justify-between">
               <div className="flex flex-col">
                  <Subheading
                     text="Your destination"
                     left=""
                     right="w-14 ms-2"
                  />
                  <h1
                     className={`${elMessiri.className} text-6xl tracking-wide`}
                  >
                     {booking.venue.name}
                  </h1>
                  <p className="font-extralight">
                     <span className="font-normal">
                        {formatDate(booking.dateFrom)}
                     </span>
                     {" to "}
                     <span className="font-normal">
                        {formatDate(booking.dateTo)}
                     </span>
                  </p>
               </div>
               <Modal
                  modal="Edit booking"
                  textContent={<PencilSquareIcon className="w-6" />}
               />
            </div>

            <hr className="my-4" />

            <div className="mb-4 flex gap-2 font-extralight">
               <p>
                  <span className="font-normal">£{booking.venue.price}</span> /
                  night
               </p>
               |
               <p>
                  <span className="font-normal">{booking.guests}</span> guests
               </p>
            </div>

            <p className="font-extralight">
               {booking.venue.description || "No description available"}
            </p>

            <hr className="my-4" />

            <h2 className={`${elMessiri.className} mb-2 text-3xl`}>
               Amenities
            </h2>
            <div className="flex flex-col gap-4">
               <p className="flex gap-2">
                  {booking.venue.meta.wifi ? (
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
                  {booking.venue.meta.parking ? (
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
                  {booking.venue.meta.breakfast ? (
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
                  {booking.venue.meta.pets ? (
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
   );
};

export default BookingDetails;
