"use client";

import Image from "next/image";

type LogoProps = {
   src: string;
   styles: string;
};

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
