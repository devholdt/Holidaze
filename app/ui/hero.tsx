import { elMessiri } from "@/app/ui/fonts";
import { FC, createElement } from "react";
import Subheading from "@/app/ui/subheading";
import backgroundImage from "@/public/background-beach.jpg";

type HeroProps = {
   heading: string;
   headingLevel: number;
   subheading?: string;
   text?: string;
};

const Hero: FC<HeroProps> = ({
   heading,
   headingLevel,
   subheading = "",
   text = "",
}) => {
   const Heading = createElement(
      `h${headingLevel}` as keyof JSX.IntrinsicElements,
      {
         className: `${elMessiri.className} leading-none`,
         children: heading,
      }
   );

   return (
      <div
         style={{
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
         }}
         className="flex h-80 flex-col justify-center p-28 text-dark"
      >
         {subheading && <Subheading text={subheading} left={""} />}
         {Heading}
         {text && <p className="max-w-80 font-light">{text}</p>}
      </div>
   );
};

export default Hero;
