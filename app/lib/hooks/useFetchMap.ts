"use client";

import { GOOGLE_API_PATH } from "@/app/lib/constants";
import { useState, useEffect } from "react";

const useFetchMap = (country?: string, city?: string) => {
   const [mapUrl, setMapUrl] = useState<string | null>(null);

   useEffect(() => {
      if (city || country) {
         const getStaticMap = () => {
            const url = `${GOOGLE_API_PATH}center=${city || country}&size=320x240&
            &markers=size:mid%7Ccolor:red%7C${city || country}&key=${process.env.NEXT_PUBLIC_STATIC_MAPS_API_KEY}`;
            return url;
         };

         const mapUrl = getStaticMap();
         setMapUrl(mapUrl);
      }
   }, [city]);

   return mapUrl;
};

export default useFetchMap;
