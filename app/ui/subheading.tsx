import { FC } from "react";

type SubheadingProps = {
   text: string;
   left?: string;
   right?: string;
};

const Subheading: FC<SubheadingProps> = ({
   text,
   left = "w-20 me-2",
   right = "w-20 ms-2",
}) => {
   return (
      <div className="flex flex-row items-center">
         <div
            className={`${left} to-transparent h-px bg-gradient-to-l from-dark`}
         ></div>
         <p className="font-light uppercase tracking-widest">{text}</p>
         <div
            className={`${right} to-transparent h-px bg-gradient-to-r from-dark`}
         ></div>
      </div>
   );
};

export default Subheading;
