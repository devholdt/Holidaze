import { FC } from "react";
import Link from "next/link";

type ButtonProps = {
   text: string;
   styles?: string;
   primary?: boolean;
   onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ text, styles, primary = true, onClick }) => {
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

type LinkButtonProps = {
   text: string;
   styles?: string;
   primary?: boolean;
   targetHref: string;
};

const LinkButton: FC<LinkButtonProps> = ({
   text,
   styles,
   primary = true,
   targetHref,
}) => {
   return (
      <Link
         href={targetHref}
         className={`px-6 py-3 text-lg font-extralight uppercase tracking-widest transition ${styles} ${
            primary
               ? "bg-brown text-white hover:bg-darkBrown"
               : "bg-green text-white hover:bg-lightGreen"
         }`}
      >
         {text}
      </Link>
   );
};

export { Button, LinkButton };
