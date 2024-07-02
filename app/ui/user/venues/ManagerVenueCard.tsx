"use client";

import { ManagerVenueCardProps } from "@/app/lib/definitions";
import { elMessiri } from "@/app/ui/fonts";
import { formatNumber } from "@/app/lib/utils";
import Image from "next/legacy/image";
import backgroundReflection from "@/public/background-reflection.avif";
import Link from "next/link";
import useImageSource from "@/app/lib/hooks/useImageSource";
import RenderStars from "@/app/ui/venues/RenderStars";

const ManagerVenueCard: React.FC<ManagerVenueCardProps> = ({ venue, user }) => {
   const [imgSrc, setImgSrc] = useImageSource(venue);

   const isOwner = user && venue.owner && user.name === venue.owner.name;
   const redirectLink = isOwner
      ? `/user/venues/${venue.id}`
      : `/venues/${venue.id}`;

   return (
      <Link
         href={redirectLink}
         className="relative flex flex-col rounded-xl border border-white bg-white shadow transition duration-75 hover:border-grey"
      >
         <Image
            src={imgSrc}
            alt={venue.media?.[0]?.alt || "Venue image"}
            onError={() => setImgSrc(backgroundReflection)}
            width={400}
            height={300}
            objectFit="cover"
            objectPosition="center"
            className="rounded-t-xl"
         />
         <div className="flex flex-col justify-between px-6 pb-2 text-center">
            <div>
               <h3
                  className={`${elMessiri.className} mt-4 truncate text-3xl font-medium md:text-4xl`}
               >
                  {venue.name}
               </h3>
               <div className="mb-4 flex justify-center gap-1 break-words font-light">
                  <div className="truncate">
                     {venue.location.city ? venue.location.city : ""}
                     {venue.location.city && venue.location.country && (
                        <span>, </span>
                     )}
                  </div>
                  <div className="truncate">
                     {venue.location.country ? `${venue.location.country}` : ""}
                     {!venue.location.city && !venue.location.country && (
                        <span className="font-light">N/A</span>
                     )}
                  </div>
               </div>
               <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center">
                     {RenderStars(venue.rating)}
                  </div>
               </div>
            </div>
            <div>
               <hr className="my-4 border-[1px] text-grey" />
               <div className="mb-4 flex justify-between font-extralight">
                  <div>
                     <span className="font-normal">
                        £{formatNumber(venue.price)}
                     </span>{" "}
                     / night
                  </div>
                  <div>
                     max <span className="font-normal">{venue.maxGuests}</span>{" "}
                     guests
                  </div>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default ManagerVenueCard;
