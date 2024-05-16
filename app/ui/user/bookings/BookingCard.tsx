"use client";

import Image from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import { BookingProps } from "@/app/lib/definitions";
import { elMessiri } from "@/app/ui/fonts";
import Link from "next/link";
import { formatDate } from "@/app/lib/utils";
import useImageSource from "@/app/lib/hooks/useImageSource";

const BookingCard = ({ booking }: { booking: BookingProps }) => {
   const [imgSrc, setImgSrc] = useImageSource(booking);

   let description;

   if (!booking.venue.description) {
      description = `No description available`;
   } else {
      description = booking.venue.description;
   }

   return (
      <Link
         href={`/user/bookings/${booking.id}`}
         className="relative flex flex-col rounded-xl border border-white bg-white shadow transition duration-75 hover:border-grey"
      >
         <Image
            src={imgSrc}
            alt={booking.venue.media?.[0].alt || "Venue image"}
            onError={() => setImgSrc(backgroundReflection)}
            width={800}
            height={600}
            unoptimized
            className="h-[200px] max-h-[240px] rounded-t-xl object-cover object-center"
         />
         <div className="px-6 pb-2 text-center">
            <h2
               className={`${elMessiri.className} mt-4 text-3xl font-medium md:text-4xl`}
            >
               {booking.venue.name}
            </h2>
            <div className="mb-4 font-extralight">
               <span className="font-normal">
                  {formatDate(booking.dateFrom)}
               </span>
               {" to "}
               <span className="font-normal">{formatDate(booking.dateTo)}</span>
            </div>
            <p className="truncate font-light">{description}</p>
            <hr className="my-4 border-[1px] text-grey" />
            <div className="mb-4 flex justify-between font-extralight">
               <p>
                  <span className="font-normal">£{booking.venue.price}</span> /
                  night
               </p>
               |
               <p>
                  <span className="font-normal">{booking.guests}</span> guest(s)
               </p>
               |
               <p>
                  rating:{" "}
                  <span className="font-normal">{booking.venue.rating}/5</span>
               </p>
            </div>
         </div>
      </Link>
   );
};

export default BookingCard;
