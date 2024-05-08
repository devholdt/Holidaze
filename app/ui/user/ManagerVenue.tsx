"use client";

import Image from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import { VenueProps } from "@/app/lib/definitions";
import { elMessiri } from "@/app/ui/fonts";
import { useState } from "react";

const ManagerVenue = ({ venue }: { venue: VenueProps }) => {
   const [imgSrc, setImgSrc] = useState(
      venue.media?.[0].url || backgroundReflection
   );

   let description;

   if (!venue.description) {
      description = `No description available`;
   } else {
      description = venue.description;
   }

   return (
      <div className="relative flex flex-col">
         <Image
            src={imgSrc}
            alt={venue.media?.[0].alt || "Venue image"}
            onError={() => setImgSrc(backgroundReflection)}
            width={800}
            height={600}
            unoptimized
            className="max-h-[320px] object-cover object-center"
         />
         <div>
            <h2
               className={`${elMessiri.className} mb-3 mt-5 text-4xl font-medium`}
            >
               {venue.name}
            </h2>
            <p className="font-light">{description}</p>
            <hr className="my-2 border-[1px] text-grey" />
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
                  rating: <span className="font-normal">{venue.rating}/5</span>
               </p>
            </div>
         </div>
      </div>
   );
};

export default ManagerVenue;
