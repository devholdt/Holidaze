"use client";

import { elMessiri } from "@/app/ui/fonts";
import { formatDate, formatNumber } from "@/app/lib/utils";
import { BookingCardProps } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import useImageSource from "@/app/lib/hooks/useImageSource";
import RenderStars from "@/app/ui/venues/RenderStars";
import backgroundReflection from "@/public/background-reflection.avif";

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
   const [imgSrc, setImgSrc] = useImageSource(booking);

   return (
      <Link
         href={`/user/bookings/${booking.id}`}
         className="relative flex flex-col rounded-xl border border-white bg-white shadow transition duration-75 hover:border-grey"
      >
         <Image
            src={imgSrc}
            alt={booking.venue.media[0]?.alt || "Venue image"}
            onError={() => setImgSrc(backgroundReflection)}
            width={800}
            height={600}
            className="h-[200px] rounded-t-xl object-cover object-center"
         />
         <div className="flex h-full flex-col justify-between px-6 pb-2 text-center">
            <div>
               <h3
                  className={`${elMessiri.className} mt-4 truncate text-3xl font-medium md:text-4xl`}
               >
                  {booking.venue.name}
               </h3>
               <div className="mb-4 flex justify-center gap-1 break-words font-light">
                  <p className="truncate">
                     {booking.venue.location.city
                        ? booking.venue?.location.city
                        : ""}
                     {booking.venue.location.city &&
                        booking.venue.location.country && <span>, </span>}
                  </p>
                  <p className="truncate">
                     {booking.venue.location.country
                        ? booking.venue?.location.country
                        : ""}
                     {!booking.venue.location.city &&
                        !booking.venue.location.country && (
                           <span className="font-light">N/A</span>
                        )}
                  </p>
               </div>
               <p className="mb-4 flex items-center justify-center gap-2">
                  <div className="flex items-center">
                     {RenderStars(booking.venue.rating)}
                  </div>
               </p>
               <div className="mb-4 font-extralight">
                  <span className="font-normal">
                     {formatDate(booking.dateFrom)}
                  </span>
                  {" to "}
                  <span className="font-normal">
                     {formatDate(booking.dateTo)}
                  </span>
               </div>
            </div>
            <div>
               <hr className="mb-4 border-[1px] text-grey" />
               <div className="mb-4 flex justify-between font-extralight">
                  <p>
                     <span className="font-normal">
                        £{formatNumber(booking.venue.price)}
                     </span>{" "}
                     / night
                  </p>
                  <p>
                     <span className="font-normal">{booking.guests}</span>{" "}
                     guest(s)
                  </p>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default BookingCard;
