"use client";

import { LogoutProps } from "@/app/lib/definitions";

const LogoutModal: React.FC<LogoutProps> = ({ hideModal }) => {
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
               onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  localStorage.removeItem("name");
                  window.location.href = "/";
               }}
               className="mt-4 bg-dark px-4 py-3 text-base font-extralight uppercase tracking-widest text-white shadow-md transition hover:bg-black xs:px-6 xs:text-lg"
            >
               Logout
            </button>
         </div>
      </>
   );
};

export default LogoutModal;
