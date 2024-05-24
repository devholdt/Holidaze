"use client";

import { elMessiri } from "@/app/ui/fonts";
import { formatNumber } from "@/app/lib/utils";
import { VenueProps } from "@/app/lib/definitions";
import Image from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import useImageSource from "@/app/lib/hooks/useImageSource";

import { formatDate } from "@/app/lib/utils";

const VenueCard: React.FC<{ venue: VenueProps; onClick: () => void }> = ({
   venue,
   onClick,
}) => {
   const [imgSrc, setImgSrc] = useImageSource(venue);

   return (
      <div
         onClick={onClick}
         className="relative flex cursor-pointer flex-col rounded-xl border border-white bg-white shadow transition duration-75 hover:border-grey"
      >
         <Image
            src={imgSrc}
            alt={
               venue.media && venue.media.length > 0
                  ? venue.media[0].alt
                  : "Venue image"
            }
            onError={() => setImgSrc(backgroundReflection)}
            width={800}
            height={600}
            className="h-[240px] rounded-t-xl object-cover object-center"
         />

         <div className="rounded-b-xl bg-white px-6 py-4">
            <h2
               className={`${elMessiri.className} truncate text-4xl lg:text-3xl`}
            >
               {venue.name}
            </h2>
            <hr className="mb-2 mt-1" />
            <div className="flex flex-col justify-between">
               <p className="text-nowrap font-light">
                  <span className="font-normal">
                     £{formatNumber(venue.price)}
                  </span>{" "}
                  <span className="font-light">/ night</span>
               </p>
               <p className="truncate font-light">
                  {venue.location.city ? venue.location.city : ""}
                  {venue.location.city && venue.location.country && (
                     <span>, </span>
                  )}
                  {venue.location.country ? `${venue.location.country}` : ""}
                  {!venue.location.city && !venue.location.country && (
                     <span className="font-light">N/A</span>
                  )}
               </p>
            </div>
         </div>
      </div>
   );
};

export default VenueCard;
