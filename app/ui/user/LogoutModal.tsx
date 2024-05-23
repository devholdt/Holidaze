"use client";

import { LogoutProps } from "@/app/lib/definitions";
import { logout } from "@/app/lib/auth/logout";
import { useState } from "react";

const LogoutModal: React.FC<LogoutProps> = ({ hideModal }) => {
   const [errorMessage, setErrorMessage] = useState<string | null>(null);

   const handleLogout = async () => {
      try {
         await logout();
         window.location.href = "/";
      } catch (error: any) {
         setErrorMessage(error.message);
      }
   };

   return (
      <>
         <h4 className="text-center text-xl">
            Are you sure you want to log out?
         </h4>
         <div className="flex justify-evenly gap-2">
            <button
               onClick={hideModal}
               className="mt-4 bg-yellow px-6 py-3 text-base font-extralight uppercase tracking-widest text-blue shadow-md transition hover:bg-darkYellow xs:px-10 xs:text-lg"
            >
               Go Back
            </button>
            <button
               onClick={handleLogout}
               className="mt-4 bg-dark px-4 py-3 text-base font-extralight uppercase tracking-widest text-white shadow-md transition hover:bg-black xs:px-6 xs:text-lg"
            >
               Logout
            </button>
         </div>
         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </>
   );
};

export default LogoutModal;
