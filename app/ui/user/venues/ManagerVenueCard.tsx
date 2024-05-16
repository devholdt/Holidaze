"use client";

import Image from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import { VenueProps } from "@/app/lib/definitions";
import { elMessiri } from "@/app/ui/fonts";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getLoggedInUser } from "@/app/lib/data";
import useImageSource from "@/app/lib/hooks/useImageSource";

const ManagerVenueCard = ({ venue }: { venue: VenueProps }) => {
   const [user, setUser] = useState<any>(null);
   const [imgSrc, setImgSrc] = useImageSource(venue);

   useEffect(() => {
      const fetchUser = async () => {
         setUser(await getLoggedInUser());
      };

      fetchUser();
   }, []);

   let description;

   if (!venue.description) {
      description = `No description available`;
   } else {
      description = venue.description;
   }

   return (
      <Link
         href={
            user?.name === venue.owner.name
               ? `/user/venues/${venue.id}`
               : `/venues/${venue.id}`
         }
         className="relative flex flex-col rounded-xl border border-white bg-white shadow transition duration-75 hover:border-grey"
      >
         <Image
            src={imgSrc}
            alt={venue.media?.[0]?.alt || "Venue image"}
            onError={() => setImgSrc(backgroundReflection)}
            width={800}
            height={600}
            unoptimized
            className="h-full max-h-[240px] rounded-t-xl object-cover object-center"
         />
         <div className="px-6 pb-2 text-center">
            <h2
               className={`${elMessiri.className} my-4 text-4xl font-medium md:text-5xl`}
            >
               {venue.name}
            </h2>

            <p className="font-light">{description}</p>
            <hr className="my-4 border-[1px] text-grey" />
            <div className="mb-4 flex justify-between font-extralight">
               <p>
                  <span className="font-normal">£{venue.price}</span> / night
               </p>
               <p>
                  max <span className="font-normal">{venue.maxGuests}</span>{" "}
                  guests
               </p>
               <p>
                  rating: <span className="font-normal">{venue.rating}/5</span>
               </p>
            </div>
         </div>
      </Link>
   );
};

export default ManagerVenueCard;
