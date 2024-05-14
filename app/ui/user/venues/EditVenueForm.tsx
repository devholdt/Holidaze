"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getVenueById } from "@/app/lib/data";
import { Button } from "@/app/ui/buttons";
import { editVenue, deleteVenue } from "@/app/lib/actions";

export default function Form() {
   const pathname = usePathname();
   const venueId = pathname.substring(pathname.lastIndexOf("/") + 1);

   const [venue, setVenue] = useState<any>(null);

   useEffect(() => {
      const fetchVenue = async () => {
         setVenue(await getVenueById(venueId));
      };

      fetchVenue();
   }, [venueId]);

   if (!venue) {
      return <p>Loading...</p>;
   }

   //    const handleChange = (
   //       event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   //    ) => {
   //       const { name, value, type } = event.target as
   //          | HTMLInputElement
   //          | HTMLTextAreaElement;
   //       const checked =
   //          type === "checkbox"
   //             ? (event.target as HTMLInputElement).checked
   //             : undefined;

   //       setVenue((prevVenue: any) => ({
   //          ...prevVenue,
   //          [name]: type === "checkbox" ? checked : value,
   //       }));
   //    };

   const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { name, value } = event.target;

      setVenue((prevVenue: any) => {
         if (name === "url" || name === "alt") {
            const updatedMedia = [...prevVenue.media];
            updatedMedia[0] = {
               ...updatedMedia[0],
               [name]: value,
            };
            return {
               ...prevVenue,
               media: updatedMedia,
            };
         }

         return {
            ...prevVenue,
            [name]: value,
         };
      });
   };

   const handleCheckboxChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      const { name, checked } = event.target;

      setVenue((prevVenue: any) => ({
         ...prevVenue,
         meta: {
            ...prevVenue.meta,
            [name]: checked,
         },
      }));
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      editVenue(event, venueId);
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="flex min-w-[240px] max-w-[480px] flex-col justify-center"
      >
         <h4 className="mb-4 text-center font-extralight uppercase tracking-widest">
            Edit venue
         </h4>

         <div className="mb-4">
            <label className="text-dark" htmlFor="name">
               Venue Name
            </label>
            <input
               type="text"
               id="name"
               name="name"
               placeholder="Enter venue name"
               value={venue.name || ""}
               onChange={handleChange}
               className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
            />
         </div>

         <div className="mb-4 flex gap-4">
            <div className="flex flex-col">
               <label className="text-dark" htmlFor="description">
                  Description
               </label>
               <textarea
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={venue.description || ""}
                  onChange={handleChange}
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
                     value={venue.price || 0}
                     onChange={handleChange}
                     className="rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  />
               </div>

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
                     value={venue.maxGuests || 0}
                     onChange={handleChange}
                     className="rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  />
               </div>

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
                     value={venue?.rating || 0}
                     onChange={handleChange}
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
                     id="wifi"
                     name="wifi"
                     value="wifi"
                     checked={venue?.meta.wifi || false}
                     onChange={handleCheckboxChange}
                  />
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
                     checked={venue?.meta.parking || false}
                     onChange={handleCheckboxChange}
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
                     checked={venue?.meta.breakfast || false}
                     onChange={handleCheckboxChange}
                  />
                  <label className="text-dark" htmlFor="breakfast">
                     Breakfast
                  </label>
               </div>
               <div className="flex items-center gap-1">
                  <input
                     type="checkbox"
                     id="pets"
                     name="pets"
                     value="pets"
                     checked={venue?.meta.pets || false}
                     onChange={handleCheckboxChange}
                  />
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
               value={venue.media[0].url || ""}
               onChange={handleChange}
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
               value={venue.media[0].alt || ""}
               onChange={handleChange}
               className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
            />
         </div>

         <Button text="Confirm" styles="mb-4" primary={false} />

         <button
            onClick={() => deleteVenue(venueId)}
            className="mx-auto w-fit font-light lowercase underline"
            type="button"
         >
            Delete venue
         </button>

         <div className="alert-container"></div>
      </form>
   );
}