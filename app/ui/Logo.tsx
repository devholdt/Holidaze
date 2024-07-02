"use client";

import { LogoProps } from "@/app/lib/definitions";
import Image from "next/legacy/image";

const Logo: React.FC<LogoProps> = ({ src, width, height }) => {
   return (
      <Image
         src={src}
         width={width}
         height={height}
         alt="Holidaze logo"
      />
   );
};

export default Logo;
