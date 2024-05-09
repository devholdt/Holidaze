"use client";

import React, { useState, useEffect } from "react";
import { elMessiri } from "@/app/ui/fonts";
import { getBookingById } from "@/app/lib/data";
import Image, { StaticImageData } from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";

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
            <p>Booking not found</p>
         </div>
      );
   }

   return (
      <div className="m-8">
         <div className="relative mb-4 h-80">
            <Image
               src={imgSrc}
               alt={booking?.venue?.media?.[0]?.alt || "Venue image"}
               onError={() => setImgSrc(backgroundReflection)}
               fill
               unoptimized
               className="max-h-[320px] object-cover object-center"
            />
         </div>

         <h1
            className={`${elMessiri.className} mb-2 mt-8 text-6xl tracking-wide`}
         >
            {booking.venue.name}
         </h1>
      </div>
   );
};

export default BookingDetails;
