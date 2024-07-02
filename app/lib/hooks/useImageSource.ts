"use client";

import { useState, useEffect, useCallback } from "react";
import { StaticImageData } from "next/legacy/image";
import {
   ImageSourceProps,
   BookingProps,
   VenueProps,
} from "@/app/lib/definitions";
import { defaultImgSrc } from "@/app/lib/utils";
import backgroundReflection from "@/public/background-reflection.avif";

const useImageSource = <T extends BookingProps | VenueProps>(
   entity: T | null,
   getMediaSrc: ImageSourceProps<T> = defaultImgSrc
): [string | StaticImageData, (src: string | StaticImageData) => void] => {
   const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
      backgroundReflection
   );

   const memoizedGetMediaSrc = useCallback(getMediaSrc, [getMediaSrc]);

   useEffect(() => {
      if (entity) {
         const src = memoizedGetMediaSrc(entity);
         setImgSrc(src || backgroundReflection);
      } else {
         setImgSrc(backgroundReflection);
      }
   }, [entity, memoizedGetMediaSrc]);

   return [imgSrc, setImgSrc];
};

export default useImageSource;
