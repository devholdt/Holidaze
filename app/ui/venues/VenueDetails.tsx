"use client";

import { Suspense } from "react";
import { elMessiri } from "@/app/ui/fonts";
import { formatDate, formatNumber } from "@/app/lib/utils";
import { LoadingSpinner } from "@/app/ui/LoadingSkeleton";
import Image from "next/image";
import Form from "@/app/ui/venues/BookingForm";
import Link from "next/link";
import useImageSource from "@/app/lib/hooks/useImageSource";
import useFetchVenueById from "@/app/lib/hooks/useFetchVenueById";
import Cookies from "js-cookie";
import RenderStars from "@/app/ui/venues/RenderStars";
import backgroundReflection from "@/public/background-reflection.avif";

import { VenueHost } from "@/app/ui/venues/VenueHost";

const VenueDetails = ({ id }: { id: string }) => {
   const { venue, loading } = useFetchVenueById(id);
   const [imgSrc, setImgSrc] = useImageSource(venue);

   const user = Cookies.get("name");

   if (!venue || loading) {
      return (
         <div className="mt-12 flex items-center justify-center">
            <LoadingSpinner />
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
            <div className="relative mb-4">
               <Image
                  src={imgSrc}
                  alt={venue.media?.[0]?.alt || "Venue image"}
                  onError={() => setImgSrc(backgroundReflection)}
                  width={1000}
                  height={1000}
                  className="h-80 w-full object-cover object-center drop-shadow"
                  priority={true}
               />
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
               <div className="grow">
                  <div className="items-top flex flex-col justify-between md:flex-row">
                     <h1
                        className={`${elMessiri.className} break-words text-[12vw] tracking-wide sm:text-[9vw] md:max-w-[440px] md:text-[5vw] lg:text-5xl`}
                     >
                        {venue.name}
                     </h1>

                     <p className="text-sm font-light italic">
                        Created {formatDate(venue.created)}
                     </p>
                  </div>
                  <div className="mb-4 flex gap-1 font-light">
                     <p className="truncate">
                        {venue.location.city ? venue.location.city : ""}
                        {venue.location.city && venue.location.country && (
                           <span>, </span>
                        )}
                     </p>
                     <p className="truncate">
                        {venue.location.country
                           ? `${venue.location.country}`
                           : ""}
                        {!venue.location.city && !venue.location.country && (
                           <span className="font-light">N/A</span>
                        )}
                     </p>
                  </div>
                  <div className="mb-4 flex gap-2 font-extralight xs:gap-4">
                     <p>
                        <span className="font-normal">
                           £{formatNumber(venue.price)}
                        </span>{" "}
                        / night
                     </p>
                     <span className="font-medium">|</span>
                     <p>
                        max{" "}
                        <span className="font-normal">{venue.maxGuests}</span>{" "}
                        guests
                     </p>
                     <span className="font-medium">|</span>
                     <p className="flex items-center gap-2">
                        rating:{" "}
                        <span className="hidden xs:block">
                           <div className="flex items-center">
                              {RenderStars(venue.rating)}
                           </div>
                        </span>
                        <span className="block font-normal xs:hidden ">
                           {venue.rating}/5
                        </span>
                     </p>
                  </div>
                  <p className="max-w-[500px] whitespace-pre-wrap break-words font-extralight">
                     {venue.description}
                  </p>
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
                  <VenueHost owner={venue.owner} />
                  <div className="w-full bg-white p-6 shadow">
                     <h4 className={`${elMessiri.className} mb-4 text-3xl`}>
                        Book this venue
                     </h4>
                     {user ? (
                        <Form
                           maxGuests={venue.maxGuests}
                           venueId={venue.id}
                           bookedDates={bookedDates}
                        />
                     ) : (
                        <p className="text-center text-red">
                           <Link
                              href="/user/login"
                              className="underline hover:text-body"
                           >
                              Log in
                           </Link>{" "}
                           to book this venue
                        </p>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </Suspense>
   );
};

export default VenueDetails;
