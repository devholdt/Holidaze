"use client";

import Link from "next/link";
import { elMessiri } from "@/app/ui/fonts";
import { formatNumber } from "@/app/lib/utils";
import { VenueProps } from "@/app/lib/definitions";
import Image from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import useImageSource from "@/app/lib/hooks/useImageSource";

const VenueCard = ({ venue }: { venue: VenueProps }) => {
   const [imgSrc, setImgSrc] = useImageSource(venue);

   return (
      <Link
         href={`/venues/${venue.id}`}
         className="relative flex flex-col justify-end rounded-xl"
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
            unoptimized
            className="h-[320px] rounded-t-xl object-cover object-center"
         />

         <div className="rounded-b-xl bg-white px-6 py-4">
            <h4 className={`${elMessiri.className} truncate`}>{venue.name}</h4>
            <hr className="mb-2 mt-1" />
            <div className="flex justify-between gap-4">
               <p className="text-nowrap font-light">
                  <span className="font-normal">
                     £{formatNumber(venue.price)}
                  </span>{" "}
                  <span className="font-light">/ night</span>
               </p>
               <p className="truncate font-light">
                  {venue.location.city ? venue.location.city : "N/A"}
                  {venue.location.country ? `, ${venue.location.country}` : ""}
               </p>
            </div>
         </div>
      </Link>
   );
};

export default VenueCard;
