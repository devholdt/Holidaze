"use client";

import React, { useEffect } from "react";
import { ModalContentProps } from "@/app/lib/definitions";
import EditProfileMediaForm from "@/app/ui/user/edit-profile-media-form";
import CreateVenueForm from "@/app/ui/user/CreateVenueForm";
import EditBookingForm from "@/app/ui/user/bookings/EditBookingForm";
import LogoutModal from "@/app/ui/user/LogoutModal";

const ModalContent: React.FC<ModalContentProps> = ({
   modalContent,
   hideModal,
}) => {
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
         case "Edit booking":
            return <EditBookingForm />;
         case "Log out":
            return <LogoutModal hideModal={hideModal} />;
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

export default ModalContent;
