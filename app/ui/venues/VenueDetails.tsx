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
      <div className="mx-1 my-4 xs:mx-4">
         <div className="relative mb-4 h-80">
            <Image
               src={imgSrc}
               alt={venue?.media?.[0]?.alt || "Venue image"}
               onError={() => setImgSrc(backgroundReflection)}
               fill
               unoptimized
               className="z-1 object-cover object-center drop-shadow"
            />
         </div>

         <div className="flex flex-col gap-4 md:flex-row">
            <div className="grow">
               <h1
                  className={`${elMessiri.className} text-[9vw] tracking-wide md:max-w-[440px] md:text-[4.7vw] lg:text-5xl`}
               >
                  {venue.name}
               </h1>
               <p className="mb-2 text-sm font-light italic">
                  Created {formatDate(venue.created)}
               </p>
               <div className="mb-4 flex gap-2 font-extralight xs:gap-4">
                  <p>
                     <span className="font-normal">£{venue.price}</span> / night
                  </p>
                  <span className="font-medium">|</span>
                  <p>
                     max <span className="font-normal">{venue.maxGuests}</span>{" "}
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
               <h3
                  className={`${elMessiri.className} mb-2 text-3xl tracking-wide`}
               >
                  Amenities
               </h3>
               <div className="mb-8 mt-4 flex flex-col gap-1">
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
               <div className="w-full bg-white shadow">
                  <div
                     className="flex h-[80px] items-center justify-center"
                     style={{
                        backgroundImage: `url(${venue.owner.banner.url})`,
                     }}
                  ></div>
                  <div className="px-6 py-12 text-center xs:text-left">
                     <h2
                        className={`${elMessiri.className} mb-2 text-3xl tracking-wide`}
                     >
                        Venue host
                     </h2>
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
   );
};

export default VenueDetails;
