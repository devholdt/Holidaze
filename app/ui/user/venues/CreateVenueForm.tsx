"use client";

import { createVenue } from "@/app/lib/actions";
import { Button } from "@/app/ui/buttons";
import { useRef } from "react";

const CreateVenueForm = () => {
   const mediaUrlRef = useRef<HTMLInputElement>(null);

   const clearMediaUrl = () => {
      if (mediaUrlRef.current) {
         mediaUrlRef.current.value = "";
      }
   };

   return (
      <form
         onSubmit={(event) => createVenue(event)}
         className="flex h-full max-w-[480px] flex-col justify-center"
      >
         <h4 className="text-center text-2xl font-extralight uppercase tracking-widest">
            Create Venue
         </h4>

         <div className="alert-container my-4"></div>

         <div className="mb-4">
            <label className="text-dark" htmlFor="createName">
               Venue Name
            </label>
            <div className="relative">
               <input
                  type="text"
                  id="createName"
                  name="createName"
                  placeholder="Enter venue name"
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>
         </div>

         <div className="flex flex-col xs:flex-row xs:gap-4">
            <div className="mb-4">
               <label className="text-dark" htmlFor="createCity">
                  City
               </label>
               <div className="relative">
                  <input
                     type="text"
                     id="createCity"
                     name="createCity"
                     placeholder="Enter venue city"
                     className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  />
               </div>
            </div>
            <div className="mb-4">
               <label className="text-dark" htmlFor="createCountry">
                  Country
               </label>
               <div className="relative">
                  <input
                     type="text"
                     id="createCountry"
                     name="createCountry"
                     placeholder="Enter venue country"
                     className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  />
               </div>
            </div>
         </div>

         <div className="mb-4 flex flex-col gap-4 xs:flex-row">
            <div className="flex flex-col">
               <label className="text-dark" htmlFor="createDescription">
                  Description
               </label>
               <textarea
                  id="createDescription"
                  name="createDescription"
                  placeholder="Enter description"
                  className="h-full min-h-[120px] w-full resize-none rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>

            <div className="flex flex-row gap-4 xs:flex-col xs:gap-2">
               <div>
                  <label className="text-dark" htmlFor="createPrice">
                     Price
                  </label>
                  <div className="relative">
                     <input
                        type="number"
                        id="createPrice"
                        name="createPrice"
                        placeholder="£0.00"
                        className="w-full max-w-[70px] rounded bg-background px-1 py-3 text-center outline-green placeholder:text-grey"
                     />
                  </div>
               </div>
               <div className="flex gap-4">
                  <div>
                     <label className="text-dark" htmlFor="createMaxGuests">
                        Max guests
                     </label>
                     <div className="relative">
                        <input
                           type="number"
                           id="createMaxGuests"
                           name="createMaxGuests"
                           placeholder="1"
                           className="w-full max-w-[50px] rounded bg-background px-1 py-3 text-center outline-green placeholder:text-grey"
                        />
                     </div>
                  </div>

                  <div>
                     <label className="text-dark" htmlFor="createRating">
                        Rating
                     </label>
                     <div className="relative">
                        <input
                           type="number"
                           id="createRating"
                           name="createRating"
                           min="0"
                           max="5"
                           placeholder="0"
                           className="w-full max-w-[50px] rounded bg-background px-1 py-3 text-center outline-green placeholder:text-grey"
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
                  <input
                     type="checkbox"
                     id="createWifi"
                     name="createWifi"
                     value="wifi"
                  />
                  <label className="text-dark" htmlFor="createWifi">
                     Wifi
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="createParking"
                     name="createParking"
                     value="parking"
                  />
                  <label className="text-dark" htmlFor="createParking">
                     Parking
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="createBreakfast"
                     name="createBreakfast"
                     value="breakfast"
                  />
                  <label className="text-dark" htmlFor="createBreakfast">
                     Breakfast
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="createPets"
                     name="createPets"
                     value="pets"
                  />
                  <label className="text-dark" htmlFor="createPets">
                     Pets allowed
                  </label>
               </div>
            </div>
         </fieldset>

         <div className="mb-4">
            <label className="text-dark" htmlFor="createUrl">
               Media URL
            </label>
            <div className="flex">
               <input
                  type="text"
                  id="createUrl"
                  name="createUrl"
                  ref={mediaUrlRef}
                  placeholder="Enter URL"
                  className="w-full rounded-s bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
               <button
                  type="button"
                  onClick={clearMediaUrl}
                  className="clear-button rounded-e border border-lightGrey px-3 text-dark hover:bg-background"
               >
                  Clear
               </button>
            </div>
         </div>
         <div className="mb-4">
            <label className="text-dark" htmlFor="createAlt">
               Alt text
            </label>
            <input
               type="text"
               id="createAlt"
               name="createAlt"
               placeholder="Enter alt text"
               className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
            />
         </div>
         <Button text="Confirm" styles="w-[150px] mx-auto" primary={false} />
      </form>
   );
};

export default CreateVenueForm;
