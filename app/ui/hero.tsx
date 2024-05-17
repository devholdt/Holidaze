import { elMessiri } from "@/app/ui/fonts";
import { createElement } from "react";
import Subheading from "@/app/ui/subheading";
import backgroundImage from "@/public/background-beach.jpg";
import { HeroProps } from "@/app/lib/definitions";

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
         style={{
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
         }}
         className={`xs:p-12 flex h-64 flex-col justify-center p-0 text-dark md:h-80 md:p-28 ${styles}`}
      >
         <div className="xs:items-start flex flex-col items-center">
            <div>
               {subheading && <Subheading text={subheading} left={""} />}
               {Heading}
               {text && <p className="max-w-80 font-light">{text}</p>}
            </div>
         </div>
      </div>
   );
};

export default Hero;
