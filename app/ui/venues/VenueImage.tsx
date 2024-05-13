"use client";

import Image from "next/image";
import { FC, useState } from "react";

const VenueImage: FC<{
   venue: { media: { url: string; alt: string }[] };
}> = ({ venue }) => {
   const [imageUrl, setImageUrl] = useState(
      venue.media?.[0]?.url || "/background-reflection.jpg"
   );
   const imageAlt = venue.media?.[0]?.alt || "Venue image";

   const handleImageError = () => {
      setImageUrl("/background-reflection.jpg");
   };

   return (
      <Image
         src={imageUrl}
         alt={imageAlt}
         onError={handleImageError}
         fill
         unoptimized
         className="z-1 object-cover object-center drop-shadow-md"
      />
   );
};

export default VenueImage;
