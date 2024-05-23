"use client";

import Image from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import { ManagerVenueCardProps } from "@/app/lib/definitions";
import { elMessiri } from "@/app/ui/fonts";
import Link from "next/link";
import useImageSource from "@/app/lib/hooks/useImageSource";

const ManagerVenueCard: React.FC<ManagerVenueCardProps> = ({ venue, user }) => {
   const [imgSrc, setImgSrc] = useImageSource(venue);

   let description = venue.description || `No description available`;

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
            width={800}
            height={600}
            className="h-full max-h-[240px] rounded-t-xl object-cover object-center"
         />
         <div className="px-6 pb-2 text-center">
            <h2
               className={`${elMessiri.className} mt-4 text-4xl font-medium md:text-5xl`}
            >
               {venue.name}
            </h2>
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
