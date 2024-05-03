"use client";

import { Button } from "@/app/ui/buttons";
import { handleEditProfileMedia } from "@/app/lib/actions";
import { FormAction } from "@/app/lib/definitions";

export default function ChangeAvatarForm() {
   return (
      <form
         onSubmit={(event) => handleEditProfileMedia(event, FormAction.Avatar)}
         className="flex w-[320px] flex-col justify-center"
      >
         <h4 className="mb-4 text-center font-extralight uppercase tracking-widest">
            Change avatar
         </h4>
         <div className="mb-4">
            <label className="text-dark" htmlFor="avatarUrl">
               Avatar URL
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="avatarUrl"
                  type="text"
                  name="avatarUrl"
                  placeholder="Enter URL"
               />
            </div>
         </div>
         <div className="mb-8">
            <label className="text-dark" htmlFor="avatarAlt">
               Alt text
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="avatarAlt"
                  type="text"
                  name="avatarAlt"
                  placeholder="Enter alt text"
               />
            </div>
         </div>
         <Button text="Confirm" styles="w-[150px] mx-auto" primary={false} />
         <div className="alert-container"></div>
      </form>
   );
}
