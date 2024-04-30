import { elMessiri } from "@/app/ui/fonts";
import { FC, createElement } from "react";
import Subheading from "@/app/ui/subheading";

type HeroProps = {
   heading: string;
   headingLevel: number;
   subHeading?: string;
   text?: string;
};

const Hero: FC<HeroProps> = ({
   heading,
   headingLevel,
   subHeading = "",
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
            backgroundImage: `url(./background-beach.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
         }}
         className="flex h-80 flex-col justify-center p-28 text-dark"
      >
         {subHeading && <Subheading text={subHeading} left={""} />}
         {Heading}
         {text && <p>{text}</p>}
      </div>
   );
};

export default Hero;
