"use client";

import { LogoutProps } from "@/app/lib/definitions";

const LogoutModal: React.FC<LogoutProps> = ({ hideModal }) => {
   return (
      <>
         <h4>Are you sure you want to log out?</h4>
         <div className="flex justify-evenly gap-2">
            <button
               onClick={hideModal}
               className="mt-4 bg-yellow px-10 py-3 text-lg font-extralight uppercase tracking-widest text-blue shadow-md transition hover:bg-darkYellow"
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
               className="mt-4 bg-dark px-6 py-3 text-lg font-extralight uppercase tracking-widest text-white shadow-md transition hover:bg-black"
            >
               Logout
            </button>
         </div>
      </>
   );
};

export default LogoutModal;
