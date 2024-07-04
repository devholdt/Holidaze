"use client";

import { useState, useEffect } from "react";
import { ButtonProps, LinkButtonProps } from "@/app/lib/definitions";
import Link from "next/link";

const Button: React.FC<ButtonProps> = ({
   text,
   styles,
   primary = true,
   onClick,
}) => {
   return (
      <button
         className={`px-6 py-3 text-lg font-extralight uppercase tracking-widest transition ${styles} ${
            primary
               ? "bg-brown text-white hover:bg-darkBrown"
               : "bg-green text-white hover:bg-lightGreen"
         }`}
         onClick={onClick}
      >
         {text}
      </button>
   );
};

const LinkButton: React.FC<LinkButtonProps> = ({
   text,
   fontSize = "lg",
   styles = "px-6 py-3",
   primary = true,
   targetHref,
   onClick,
}) => {
   return (
      <Link
         onClick={onClick}
         href={targetHref}
         className={`text-${fontSize} text-center font-extralight transition ${styles} ${
            primary
               ? "bg-brown text-white hover:bg-darkBrown"
               : "bg-yellow text-blue hover:bg-darkYellow"
         }`}
      >
         {text}
      </Link>
   );
};

const ScrollButton = () => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const checkScroll = () => {
         if (!isVisible && window.scrollY > 500) {
            setIsVisible(true);
         } else if (isVisible && window.scrollY <= 500) {
            setIsVisible(false);
         }
      };

      window.addEventListener("scroll", checkScroll);
      return () => window.removeEventListener("scroll", checkScroll);
   }, [isVisible]);

   return isVisible ? (
      <button
         onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
         }}
         className="fixed bottom-4 right-4 block rounded-full bg-yellow px-3 pb-1 pt-3 text-blue shadow md:hidden"
      >
         <span className="icon-[mdi--chevron-up] h-6 w-6"></span>
      </button>
   ) : null;
};

export { Button, LinkButton, ScrollButton };
