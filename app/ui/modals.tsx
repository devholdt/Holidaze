"use client";

import React, { useEffect } from "react";
import { ModalsProps } from "@/app/lib/definitions";
import ChangeAvatarForm from "@/app/ui/user/change-avatar-form";
import ChangeBannerForm from "@/app/ui/user/change-banner-form";

const Modals: React.FC<ModalsProps> = ({ modalContent, hideModal, logout }) => {
   const modalRef = React.useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
         ) {
            hideModal();
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [hideModal]);

   const getContent = () => {
      switch (modalContent) {
         case "Change avatar":
            return <ChangeAvatarForm />;
         case "Change banner":
            return <ChangeBannerForm />;
         case "Log out":
            return (
               <>
                  <h4>Are you sure you want to log out?</h4>
                  <div className="flex justify-evenly gap-2">
                     <button
                        onClick={hideModal}
                        className="hover:bg-darkYellow mt-4 bg-yellow px-10 py-3 text-lg font-extralight uppercase tracking-widest text-blue shadow-md transition"
                     >
                        Go Back
                     </button>
                     <button
                        onClick={logout}
                        className="mt-4 bg-dark px-6 py-3 text-lg font-extralight uppercase tracking-widest text-white shadow-md transition hover:bg-black"
                     >
                        Logout
                     </button>
                  </div>
               </>
            );
         default:
            return <p>No content available.</p>;
      }
   };

   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
         <div className="relative bg-white p-5" ref={modalRef}>
            <button
               onClick={hideModal}
               className="absolute right-0 top-0 m-1 px-2 py-1 text-xl font-bold text-dark hover:text-black"
            >
               &#x2715;
            </button>
            <div className="px-6 py-10">{getContent()}</div>
         </div>
      </div>
   );
};

export default Modals;
