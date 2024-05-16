import { useEffect, useCallback } from "react";

const useOutsideClick = (
   ref: React.RefObject<HTMLDivElement>,
   callback: () => void
) => {
   const handleClick = useCallback(
      (event: MouseEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
         }
      },
      [ref, callback]
   );

   useEffect(() => {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
   }, [handleClick]);
};

export default useOutsideClick;
