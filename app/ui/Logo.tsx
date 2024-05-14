"use client";

import Image from "next/image";
import { FC } from "react";

type LogoProps = {
   src: string;
   styles: string;
};

const Logo: FC<LogoProps> = ({ src, styles }) => {
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
