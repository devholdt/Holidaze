import { useState, useEffect } from "react";
import backgroundReflection from "@/public/background-reflection.jpg";
import { StaticImageData } from "next/image";
import { ImageSourceProps } from "@/app/lib/definitions";
import { defaultImgSrc } from "@/app/lib/utils";
import { BookingProps, VenueProps } from "@/app/lib/definitions";

const useImageSource = <T extends BookingProps | VenueProps>(
   entity: T | null,
   getMediaSrc: ImageSourceProps<T> = defaultImgSrc
): [string | StaticImageData, (src: string | StaticImageData) => void] => {
   const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
      backgroundReflection
   );

   useEffect(() => {
      const src = getMediaSrc(entity);
      setImgSrc(src || backgroundReflection);
   }, [entity, getMediaSrc]);

   return [imgSrc, setImgSrc];
};

export default useImageSource;
