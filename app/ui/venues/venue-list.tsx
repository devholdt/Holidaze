"use client";

import { Button } from "@/app/ui/buttons";
import Link from "next/link";
import { FC, useState } from "react";
import { VenueProps } from "@/app/lib/definitions";
import { elMessiri } from "@/app/ui/fonts";
import { formatNumber } from "@/app/lib/utils";
import VenueImage from "@/app/ui/venues/venue-image";
import { MotionDiv } from "@/app/lib/motion";

const VenueList: FC<{
   venues: VenueProps[];
   listLimit?: number;
   showMoreButton?: boolean;
}> = ({ venues, listLimit = 9, showMoreButton = false }) => {
   const INITIAL_LIMIT = listLimit;
   const [limit, setLimit] = useState(INITIAL_LIMIT);

   return (
      <>
         <div className="grid w-full grid-cols-3 gap-8 px-4 md:px-14 xl:px-32">
            {venues.slice(0, limit).map((venue) => (
               <MotionDiv
                  key={venue.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.02 }}
               >
                  <Link
                     href={`/venues/${venue.id}`}
                     className="relative flex h-96 flex-col justify-end p-2 text-white hover:cursor-pointer"
                  >
                     <VenueImage venue={venue} />

                     <div className="z-10 flex flex-col gap-1 border border-brown bg-darkBrown px-4 py-2">
                        <p className="font-light">
                           <span className="break-all">
                              £{formatNumber(venue.price)}
                           </span>{" "}
                           <span className="uppercase">/ night</span>
                        </p>
                        <h4 className={`${elMessiri.className} truncate`}>
                           {venue.name}
                        </h4>
                     </div>
                  </Link>
               </MotionDiv>
            ))}
         </div>
         {showMoreButton && venues && limit < venues.length && (
            <Button
               text={"Show more"}
               styles={"mt-12"}
               onClick={() => setLimit(limit + INITIAL_LIMIT)}
            />
         )}
      </>
   );
};

export default VenueList;
