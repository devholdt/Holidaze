"use client";

import { elMessiri } from "@/app/ui/fonts";
import { formatDate } from "@/app/lib/utils";
import Image from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import Subheading from "@/app/ui/subheading";
import Link from "next/link";
import useFetchBooking from "@/app/lib/hooks/useFetchBooking";
import useImageSource from "@/app/lib/hooks/useImageSource";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/app/ui/Modal"));

const BookingDetails = ({ id }: { id: string }) => {
   const { booking, loading } = useFetchBooking(id);

   const [imgSrc, setImgSrc] = useImageSource(booking);

   if (!booking || loading) {
      return (
         <div className="mt-12 flex flex-col items-center justify-center text-center">
            <p>Loading...</p>
         </div>
      );
   }

   return (
      <div className="mx-1 mb-4 xs:mx-4">
         <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative min-h-80 w-full md:w-6/12">
               <Image
                  src={imgSrc}
                  alt={booking?.venue?.media?.[0]?.alt || "Venue image"}
                  onError={() => setImgSrc(backgroundReflection)}
                  fill
                  unoptimized
                  className="max-h-[800px] object-cover object-center"
                  priority={true}
               />
            </div>

            <div className="md:w-6/12">
               <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                     <Subheading
                        text="Your destination"
                        left=""
                        right="w-14 ms-2"
                     />
                     <h1
                        className={`${elMessiri.className} break-all text-[9vw] tracking-wide  md:text-[4.7vw] lg:text-5xl`}
                     >
                        {booking.venue.name}
                     </h1>
                     <p className="mb-4 break-all font-light">
                        {booking.venue.location.city
                           ? booking.venue.location.city
                           : ""}
                        {booking.venue.location.city &&
                           booking.venue.location.country && <span>, </span>}
                        {booking.venue.location.country
                           ? `${booking.venue.location.country}`
                           : ""}
                        {!booking.venue.location.city &&
                           !booking.venue.location.country && (
                              <span className="font-light">N/A</span>
                           )}
                     </p>
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
                     textContent={
                        <span className="icon-[mdi--square-edit-outline] h-7 w-7 text-dark"></span>
                     }
                  />
               </div>

               <hr className="my-4" />

               <div className="mb-4 flex gap-2 font-extralight">
                  <p>
                     <span className="font-normal">£{booking.venue.price}</span>{" "}
                     / night
                  </p>
                  |
                  <p>
                     <span className="font-normal">{booking.guests}</span>{" "}
                     guests
                  </p>
               </div>

               <p className="whitespace-pre-wrap break-all font-extralight">
                  {booking.venue.description || "No description available"}
               </p>

               <hr className="my-4" />

               <h2
                  className={`${elMessiri.className} mb-2 text-2xl md:text-3xl`}
               >
                  Amenities
               </h2>
               <div className="flex flex-col gap-4">
                  <p className="flex gap-2">
                     {booking.venue.meta.wifi ? (
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
                     {booking.venue.meta.parking ? (
                        <>
                           <span className="icon-[mdi--car] h-6 w-6 text-dark"></span>{" "}
                           Parking
                        </>
                     ) : (
                        <>
                           <span className="icon-[mdi--car-off] h-6 w-6 text-grey"></span>{" "}
                           No Parking
                        </>
                     )}
                  </p>
                  <p className="flex gap-2">
                     {booking.venue.meta.breakfast ? (
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
                     {booking.venue.meta.pets ? (
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
         <div>
            <h3
               className={`${elMessiri.className} mb-2 text-2xl tracking-wide md:text-4xl`}
            >
               Your host
            </h3>
            <div className="drop-shadow">
               <div
                  className="flex h-[80px] bg-cover bg-center"
                  style={{
                     backgroundImage: `url(${booking.venue.owner.banner.url})`,
                  }}
               ></div>
               <div className="bg-white px-6 py-4">
                  <div className="flex flex-col items-center gap-4 text-center xs:flex-row xs:text-left">
                     <Image
                        src={booking.venue.owner.avatar.url}
                        alt={booking.venue.owner.avatar.alt}
                        width={200}
                        height={200}
                        className="h-[100px] w-full max-w-[100px] rounded-full border border-lightGrey object-cover object-cover drop-shadow-md"
                     />

                     <div className="flex flex-col">
                        <div>
                           <p className="text-xl">{booking.venue.owner.name}</p>
                           <p className="font-extralight italic">
                              {booking.venue.owner.email}
                           </p>
                        </div>
                        <hr className="my-2" />
                        <Link
                           href={`/user/${booking.venue.owner.name}`}
                           className="mx-auto w-fit bg-brown px-4 py-2 font-extralight uppercase tracking-widest text-white transition hover:bg-darkBrown xs:mx-0"
                        >
                           profile
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default BookingDetails;
