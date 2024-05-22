"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ModalContent from "@/app/ui/ModalContent";
import { ModalProps } from "@/app/lib/definitions";

const Modal = ({ modal, textContent, buttonStyles }: ModalProps) => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
   const [modalContent, setModalContent] = useState<string>("");
   const modalRef = useRef<HTMLDivElement>(null);

   const handleClickOutside = useCallback((event: MouseEvent) => {
      if (
         modalRef.current &&
         !modalRef.current.contains(event.target as Node)
      ) {
         setIsModalOpen(false);
      }
   }, []);

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, [handleClickOutside]);

   const modalActions = {
      show: useCallback((content: string) => {
         setModalContent(content);
         setIsModalOpen(true);
      }, []),
      hide: useCallback(() => setIsModalOpen(false), []),
   };

   return (
      <>
         <button
            onClick={() => modalActions.show(modal)}
            className={buttonStyles}
         >
            {textContent}
         </button>
         {isModalOpen && (
            <ModalContent
               modalContent={modalContent}
               hideModal={modalActions.hide}
            />
         )}
      </>
   );
};

export default Modal;
