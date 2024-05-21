"use client";

import { createVenue } from "@/app/lib/actions";
import { Button } from "@/app/ui/buttons";

const CreateVenueForm = () => {
   return (
      <form
         onSubmit={(event) => createVenue(event)}
         className="flex max-w-[480px] flex-col justify-center"
      >
         <h4 className="mb-4 text-center font-extralight uppercase tracking-widest">
            Create Venue
         </h4>

         <div className="mb-4">
            <label className="text-dark" htmlFor="name">
               Venue Name
            </label>
            <div className="relative">
               <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter venue name"
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>
         </div>

         <div className="mb-4 flex flex-col gap-4 xs:flex-row">
            <div className="flex flex-col">
               <label className="text-dark" htmlFor="description">
                  Description
               </label>
               <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  className="h-full w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>

            <div>
               <label className="text-dark" htmlFor="price">
                  Price (per night)
               </label>
               <div className="relative">
                  <input
                     type="number"
                     id="price"
                     name="price"
                     placeholder="£0.00"
                     className="max-w-[100px] rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  />
               </div>

               <div className="flex gap-4">
                  <div>
                     <label className="text-dark" htmlFor="maxGuests">
                        Max guests
                     </label>
                     <div className="relative">
                        <input
                           type="number"
                           id="maxGuests"
                           name="maxGuests"
                           min="1"
                           placeholder="1"
                           className="max-w-[100px] rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                        />
                     </div>
                  </div>

                  <div>
                     <label className="text-dark" htmlFor="rating">
                        Rating
                     </label>
                     <div className="relative">
                        <input
                           type="number"
                           id="rating"
                           name="rating"
                           min="0"
                           max="5"
                           placeholder="0"
                           className="rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <fieldset className="mb-4">
            <legend>Amenities</legend>
            <div className="grid grid-cols-2 xs:flex xs:gap-6">
               <div className="flex items-center gap-1">
                  <input type="checkbox" id="wifi" name="wifi" value="wifi" />
                  <label className="text-dark" htmlFor="wifi">
                     Wifi
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="parking"
                     name="parking"
                     value="parking"
                  />
                  <label className="text-dark" htmlFor="parking">
                     Parking
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="breakfast"
                     name="breakfast"
                     value="breakfast"
                  />
                  <label className="text-dark" htmlFor="breakfast">
                     Breakfast
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input type="checkbox" id="pets" name="pets" value="pets" />
                  <label className="text-dark" htmlFor="pets">
                     Pets allowed
                  </label>
               </div>
            </div>
         </fieldset>

         <div className="mb-4">
            <label className="text-dark" htmlFor="url">
               Media URL
            </label>
            <input
               type="text"
               id="url"
               name="url"
               placeholder="Enter URL"
               className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
            />
         </div>
         <div className="mb-4">
            <label className="text-dark" htmlFor="alt">
               Alt text
            </label>
            <input
               type="text"
               id="alt"
               name="alt"
               placeholder="Enter alt text"
               className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
            />
         </div>
         <Button text="Confirm" styles="w-[150px] mx-auto" primary={false} />
         <div className="alert-container"></div>
      </form>
   );
};

export default CreateVenueForm;
