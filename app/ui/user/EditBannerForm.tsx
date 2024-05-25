"use client";

import { Button } from "@/app/ui/buttons";
import { handleEditProfileBanner } from "@/app/lib/actions";

const EditProfileMediaForm = () => {
   return (
      <form
         onSubmit={(event) => handleEditProfileBanner(event)}
         className="mx-auto flex max-w-[350px] flex-col justify-center"
      >
         <h4 className="mb-4 text-center text-2xl font-extralight uppercase tracking-widest">
            Change banner
         </h4>
         <div className="mb-4">
            <label className="text-dark" htmlFor="url">
               Banner URL
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="url"
                  type="text"
                  name="url"
                  placeholder="Enter URL"
               />
            </div>
         </div>
         <div className="mb-8">
            <label className="text-dark" htmlFor="alt">
               Alt text
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="alt"
                  type="text"
                  name="alt"
                  placeholder="Enter alt text"
               />
            </div>
         </div>
         <Button text="Confirm" styles="w-[150px] mx-auto" primary={false} />
         <div className="alert-container"></div>
      </form>
   );
};

export default EditProfileMediaForm;
