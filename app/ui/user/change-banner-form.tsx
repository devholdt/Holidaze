"use client";

import { Button } from "@/app/ui/buttons";
import { handleEditProfileMedia } from "@/app/lib/actions";
import { FormAction } from "@/app/lib/definitions";

export default function ChangeBannerForm() {
   return (
      <form
         onSubmit={(event) => handleEditProfileMedia(event, FormAction.Banner)}
         className="flex w-[320px] flex-col justify-center"
      >
         <h4 className="mb-4 text-center font-extralight uppercase tracking-widest">
            Change banner
         </h4>
         <div className="mb-4">
            <label className="text-dark" htmlFor="bannerUrl">
               Banner URL
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="bannerUrl"
                  type="text"
                  name="bannerUrl"
                  placeholder="Enter URL"
                  required
               />
            </div>
         </div>
         <div className="mb-8">
            <label className="text-dark" htmlFor="bannerAlt">
               Alt text
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="bannerAlt"
                  type="text"
                  name="bannerAlt"
                  placeholder="Enter alt text"
                  required
               />
            </div>
         </div>
         <Button text="Confirm" styles="w-[150px] mx-auto" primary={false} />
         <div className="alert-container"></div>
      </form>
   );
}
