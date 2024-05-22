"use client";

import { elMessiri } from "@/app/ui/fonts";
import {
   WifiIcon,
   TruckIcon,
   CakeIcon,
   FaceSmileIcon,
   FaceFrownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import Form from "@/app/ui/venues/BookingForm";
import { formatDate } from "@/app/lib/utils";
import Link from "next/link";
import useFetchVenue from "@/app/lib/hooks/useFetchVenue";
import useImageSource from "@/app/lib/hooks/useImageSource";
import { Suspense } from "react";

const VenueDetails = ({ id }: { id: string }) => {
   const venue = useFetchVenue(id);
   const [imgSrc, setImgSrc] = useImageSource(venue);

   if (!venue) {
      return (
         <div className="mt-12 flex flex-col items-center justify-center text-center">
            <p>Loading...</p>
         </div>
      );
   }

   const bookedDates = venue.bookings.map((booking) => ({
      dateFrom: booking.dateFrom,
      dateTo: booking.dateTo,
   }));

   return (
      <Suspense fallback={<div>Loading...</div>}>
         <div className="mx-1 mb-4 xs:mx-4">
            <div className="relative mb-4 h-80">
               <Image
                  src={imgSrc}
                  alt={venue.media?.[0]?.alt || "Venue image"}
                  onError={() => setImgSrc(backgroundReflection)}
                  fill
                  unoptimized
                  className="z-1 object-cover object-center drop-shadow"
               />
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
               <div className="grow">
                  <div className="items-top flex flex-col justify-between md:flex-row">
                     <h1
                        className={`${elMessiri.className} text-[12vw] tracking-wide sm:text-[9vw] md:max-w-[440px] md:text-[5vw] lg:text-5xl`}
                     >
                        {venue.name}
                     </h1>

                     <p className="text-sm font-light italic">
                        Created {formatDate(venue.created)}
                     </p>
                  </div>
                  <p className="mb-4 font-light">
                     {venue.location.city ? venue.location.city : ""}
                     {venue.location.city && venue.location.country && (
                        <span>, </span>
                     )}
                     {venue.location.country ? `${venue.location.country}` : ""}
                     {!venue.location.city && !venue.location.country && (
                        <span className="font-light">N/A</span>
                     )}
                  </p>
                  <div className="mb-4 flex gap-2 font-extralight xs:gap-4">
                     <p>
                        <span className="font-normal">£{venue.price}</span> /
                        night
                     </p>
                     <span className="font-medium">|</span>
                     <p>
                        max{" "}
                        <span className="font-normal">{venue.maxGuests}</span>{" "}
                        guests
                     </p>
                     <span className="font-medium">|</span>
                     <p>
                        rating:{" "}
                        <span className="font-normal">{venue.rating}/5</span>
                     </p>
                  </div>
                  <p className="font-extralight">{venue.description}</p>
                  <hr className="my-4" />
                  <h2 className={`${elMessiri.className} mb-2 text-3xl`}>
                     Amenities
                  </h2>
                  <div className="mb-8 mt-4 flex flex-col gap-4">
                     <p className="flex gap-3">
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
                     <p className="flex gap-3">
                        {venue.meta.parking ? (
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
                     <p className="flex gap-3">
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
                     <p className="flex gap-3">
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
               <div className="flex flex-col gap-4">
                  <div className="w-full bg-white shadow">
                     <div
                        className="flex h-[80px] items-center justify-center"
                        style={{
                           backgroundImage: `url(${venue.owner.banner.url})`,
                        }}
                     ></div>
                     <div className="px-6 py-12 text-center xs:text-left">
                        <h3
                           className={`${elMessiri.className} mb-2 text-3xl tracking-wide`}
                        >
                           Venue host
                        </h3>
                        <div className="flex flex-col items-center gap-4 xs:flex-row">
                           <Image
                              src={venue.owner.avatar.url}
                              alt={venue.owner.avatar.alt}
                              width={400}
                              height={400}
                              className="h-[100px] w-[100px] rounded-full border border-lightGrey object-cover object-center"
                           />

                           <div className="flex flex-col">
                              <p className="text-xl">{venue.owner.name}</p>

                              <hr className="my-2 text-lightGrey" />

                              <Link
                                 href={`/user/${venue.owner.name}`}
                                 className="w-fit bg-brown px-4 py-2 font-extralight uppercase tracking-widest text-white transition hover:bg-darkBrown"
                              >
                                 profile
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="w-full bg-white p-6 shadow">
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
      </Suspense>
   );
};

export default VenueDetails;
