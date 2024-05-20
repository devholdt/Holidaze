"use client";

import { Button } from "@/app/ui/buttons";
import { handleEditProfileMedia } from "@/app/lib/actions";
import { EditProfileMediaFormProps } from "@/app/lib/definitions";

const EditProfileMediaForm: React.FC<EditProfileMediaFormProps> = ({
   type,
   action,
}) => {
   return (
      <form
         onSubmit={(event) => handleEditProfileMedia(event, action)}
         className="flex flex-col justify-center"
      >
         <h4 className="mb-4 text-center font-extralight uppercase tracking-widest">
            Change {type}
         </h4>
         <div className="mb-4">
            <label className="text-dark" htmlFor={`url`}>
               {type} URL
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id={`url`}
                  type="text"
                  name={`url`}
                  placeholder="Enter URL"
                  required
               />
            </div>
         </div>
         <div className="mb-8">
            <label className="text-dark" htmlFor={`alt`}>
               Alt text
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id={`alt`}
                  type="text"
                  name={`alt`}
                  placeholder="Enter alt text"
                  required
               />
            </div>
         </div>
         <Button text="Confirm" styles="w-[150px] mx-auto" primary={false} />
         <div className="alert-container"></div>
      </form>
   );
};

export default EditProfileMediaForm;
