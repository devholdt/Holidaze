import { createElement } from "react";
import { elMessiri } from "@/app/ui/fonts";
import { HeroProps } from "@/app/lib/definitions";
import Image from "next/image";
import Subheading from "@/app/ui/Subheading";
import backgroundImage from "@/public/background-beach.jpg";

const Hero: React.FC<HeroProps> = ({
   heading,
   headingLevel,
   subheading = "",
   text = "",
   styles = "",
}) => {
   const Heading = createElement(
      `h${headingLevel}` as keyof JSX.IntrinsicElements,
      {
         className: `${elMessiri.className} leading-none`,
      },
      heading
   );

   return (
      <div
         className={`text-body relative z-10 flex h-64 flex-col justify-center border-y border-white p-0 xs:p-12 md:h-80 md:p-28 ${styles}`}
      >
         <Image
            src={backgroundImage.src}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="beach with waves crashing on shore from a bird eye view"
         />
         <div className="z-20 flex flex-col items-center xs:items-start">
            <div>
               {subheading && <Subheading text={subheading} left={""} />}
               <div className="text-6xl">{Heading}</div>
               {text && <p className="max-w-80 font-light">{text}</p>}
            </div>
         </div>
      </div>
   );
};

export default Hero;
