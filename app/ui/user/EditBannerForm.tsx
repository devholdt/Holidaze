"use client";

import { useRef } from "react";
import { Button } from "@/app/ui/ButtonComponents";
import { handleEditProfileBanner } from "@/app/lib/actions";

const EditProfileMediaForm = () => {
   const mediaUrlRef = useRef<HTMLInputElement>(null);

   const clearMediaUrl = () => {
      if (mediaUrlRef.current) {
         mediaUrlRef.current.value = "";
      }
   };

   return (
      <form
         onSubmit={(event) => handleEditProfileBanner(event)}
         className="mx-auto flex max-w-[350px] flex-col justify-center"
      >
         <h4 className="mb-4 text-center text-2xl font-extralight uppercase tracking-widest">
            Change banner
         </h4>
         <div className="mb-4">
            <label className="text-body" htmlFor="url">
               Banner URL
            </label>
            <div className="flex">
               <input
                  id="url"
                  type="text"
                  name="url"
                  ref={mediaUrlRef}
                  placeholder="Enter URL"
                  className="w-full rounded-s bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
               <button
                  type="button"
                  onClick={clearMediaUrl}
                  className="clear-button text-body rounded-e border border-lightGrey px-3 hover:bg-background"
               >
                  Clear
               </button>
            </div>
         </div>
         <div className="mb-8">
            <label className="text-body" htmlFor="alt">
               Alt text
            </label>
            <div className="relative">
               <input
                  id="alt"
                  type="text"
                  name="alt"
                  placeholder="Enter alt text"
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>
         </div>
         <Button text="Confirm" styles="w-[150px] mx-auto" primary={false} />
         <div className="alert-container"></div>
      </form>
   );
};

export default EditProfileMediaForm;
