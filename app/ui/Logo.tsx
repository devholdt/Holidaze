"use client";

import { LogoProps } from "@/app/lib/definitions";
import Image from "next/image";

const Logo: React.FC<LogoProps> = ({ src, styles }) => {
   return (
      <Image
         src={src}
         width={400}
         height={400}
         alt="Holidaze logo"
         className={styles}
      />
   );
};

export default Logo;
