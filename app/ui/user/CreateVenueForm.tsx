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
            <label className="text-dark" htmlFor="venueName">
               Venue Name
            </label>
            <div className="relative">
               <input
                  type="text"
                  id="venueName"
                  name="venueName"
                  placeholder="Enter venue name"
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>
         </div>

         <div className="mb-4 flex gap-4">
            <div className="flex flex-col">
               <label className="text-dark" htmlFor="venueDescription">
                  Description
               </label>
               <textarea
                  id="venueDescription"
                  name="venueDescription"
                  placeholder="Enter description"
                  className="h-full w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>

            <div>
               <label className="text-dark" htmlFor="venuePrice">
                  Price (per night)
               </label>
               <div className="relative">
                  <input
                     type="number"
                     id="venuePrice"
                     name="venuePrice"
                     placeholder="£0.00"
                     className="rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  />
               </div>

               <label className="text-dark" htmlFor="venueGuests">
                  Max guests
               </label>
               <div className="relative">
                  <input
                     type="number"
                     id="venueGuests"
                     name="venueGuests"
                     min="1"
                     placeholder="1"
                     className="rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  />
               </div>

               <label className="text-dark" htmlFor="venueRating">
                  Rating
               </label>
               <div className="relative">
                  <input
                     type="number"
                     id="venueRating"
                     name="venueRating"
                     min="0"
                     max="5"
                     placeholder="0"
                     className="rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  />
               </div>
            </div>
         </div>

         <fieldset className="mb-4">
            <legend>Amenities</legend>
            <div className="flex gap-6">
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="venueWifi"
                     name="venueWifi"
                     value="wifi"
                  />
                  <label className="text-dark" htmlFor="venueWifi">
                     Wifi
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="venueParking"
                     name="venueParking"
                     value="parking"
                  />
                  <label className="text-dark" htmlFor="venueParking">
                     Parking
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="venueBreakfast"
                     name="venueBreakfast"
                     value="breakfast"
                  />
                  <label className="text-dark" htmlFor="venueBreakfast">
                     Breakfast
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="venuePets"
                     name="venuePets"
                     value="pets"
                  />
                  <label className="text-dark" htmlFor="venuePets">
                     Pets allowed
                  </label>
               </div>
            </div>
         </fieldset>

         <div className="mb-4">
            <label className="text-dark" htmlFor="venueMediaUrl">
               Media URL
            </label>
            <input
               type="text"
               id="venueMediaUrl"
               name="venueMediaUrl"
               placeholder="Enter URL"
               className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
            />
         </div>
         <div className="mb-4">
            <label className="text-dark" htmlFor="venueMediaAlt">
               Alt text
            </label>
            <input
               type="text"
               id="venueMediaAlt"
               name="venueMediaAlt"
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
