"use client";

import { useRef, useEffect } from "react";
import { ModalContentProps } from "@/app/lib/definitions";
import EditBannerForm from "@/app/ui/user/EditBannerForm";
import EditAvatarForm from "@/app/ui/user/EditAvatarForm";
import CreateVenueForm from "@/app/ui/user/venues/CreateVenueForm";
import EditVenueForm from "@/app/ui/user/venues/EditVenueForm";
import EditBookingForm from "@/app/ui/user/bookings/EditBookingForm";
import LogoutModal from "@/app/ui/user/LogoutModal";

const ModalContent = ({ modalContent, hideModal }: ModalContentProps) => {
   const modalRef = useRef<HTMLDivElement>(null);

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
            return <EditAvatarForm />;
         case "Change banner":
            return <EditBannerForm />;
         case "Create venue":
            return <CreateVenueForm />;
         case "Edit venue":
            return <EditVenueForm />;
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
         className="fixed inset-0 z-max flex justify-center"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
         <div className="relative m-2 h-full w-full overflow-auto xs:w-auto">
            <button
               onClick={hideModal}
               className="text-body absolute right-0 top-0 m-1 px-2 py-1 text-xl font-bold hover:text-black"
            >
               &#x2715;
            </button>
            <div
               className="w-full bg-white px-4 py-12 xs:min-w-[400px] xs:px-8"
               ref={modalRef}
            >
               {getContent()}
            </div>
         </div>
      </div>
   );
};

export default ModalContent;
