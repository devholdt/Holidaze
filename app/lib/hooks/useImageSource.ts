import { useState, useEffect } from "react";
import { VenueProps } from "@/app/lib/definitions";
import backgroundReflection from "@/public/background-reflection.jpg";
import { StaticImageData } from "next/image";

const useImageSource = (
   venue: VenueProps | null
): [string | StaticImageData, (src: string | StaticImageData) => void] => {
   const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
      backgroundReflection
   );

   useEffect(() => {
      if (venue && venue.media && venue.media.length > 0) {
         setImgSrc(venue.media[0].url);
      } else {
         setImgSrc(backgroundReflection);
      }
   }, [venue]);

   return [imgSrc, setImgSrc];
};

export default useImageSource;
