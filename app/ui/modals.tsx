"use client";

import React, { useEffect } from "react";
import { ModalsProps } from "@/app/lib/definitions";
import EditProfileMediaForm from "@/app/ui/user/edit-profile-media-form";
import CreateVenueForm from "@/app/ui/user/CreateVenueForm";

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
            return <EditProfileMediaForm type="avatar" />;
         case "Change banner":
            return <EditProfileMediaForm type="banner" />;
         case "Create venue":
            return <CreateVenueForm />;
         case "Log out":
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
