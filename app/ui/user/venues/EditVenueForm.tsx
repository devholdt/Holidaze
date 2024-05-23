"use client";

import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getVenueById } from "@/app/lib/data";
import { Button } from "@/app/ui/buttons";
import { editVenue, deleteVenue } from "@/app/lib/actions";

const EditVenueForm = () => {
   const pathname = usePathname();
   const venueId = pathname.substring(pathname.lastIndexOf("/") + 1);
   const [venue, setVenue] = useState<any>(null);
   const mediaUrlRef = useRef<HTMLInputElement>(null);

   const clearMediaUrl = () => {
      if (mediaUrlRef.current) {
         mediaUrlRef.current.value = "";
      }
   };

   useEffect(() => {
      const fetchVenue = async () => {
         const fetchedVenue = await getVenueById(venueId);
         setVenue(fetchedVenue);
      };

      fetchVenue();
   }, [venueId]);

   if (!venue) {
      return <p>Loading...</p>;
   }

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

         if (name === "city" || name === "country") {
            return {
               ...prevVenue,
               location: {
                  ...prevVenue.location,
                  [name]: value,
               },
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
         className="flex h-full max-w-[480px] flex-col justify-center"
      >
         <h4 className="text-center text-2xl font-extralight uppercase tracking-widest">
            Edit venue
         </h4>

         <div className="alert-container my-4"></div>

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

         <div className="flex flex-col xs:flex-row xs:gap-4">
            <div className="mb-4">
               <label className="text-dark" htmlFor="city">
                  City
               </label>
               <div className="relative">
                  <input
                     type="text"
                     id="city"
                     name="city"
                     placeholder="Enter venue city"
                     value={venue.location.city || ""}
                     onChange={handleChange}
                     className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  />
               </div>
            </div>
            <div className="mb-4">
               <label className="text-dark" htmlFor="country">
                  Country
               </label>
               <div className="relative">
                  <input
                     type="text"
                     id="country"
                     name="country"
                     placeholder="Enter venue country"
                     value={venue.location.country || ""}
                     onChange={handleChange}
                     className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  />
               </div>
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
                  value={venue.description || ""}
                  onChange={handleChange}
                  className="h-full min-h-[120px] w-full resize-none rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
               />
            </div>

            <div className="flex flex-row gap-4 xs:flex-col xs:gap-2">
               <div>
                  <label className="text-dark" htmlFor="price">
                     Price
                  </label>
                  <div className="relative">
                     <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="£0.00"
                        value={venue.price || 1}
                        onChange={handleChange}
                        className="w-full rounded bg-background px-1 py-3 text-center outline-green placeholder:text-grey"
                     />
                  </div>
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
                           placeholder="1"
                           value={venue.maxGuests || 1}
                           onChange={handleChange}
                           className="w-full max-w-[60px] rounded bg-background px-1 py-3 text-center outline-green placeholder:text-grey"
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
                           value={venue?.rating || 0}
                           onChange={handleChange}
                           className="w-full max-w-[60px] rounded bg-background px-1 py-3 text-center outline-green placeholder:text-grey"
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
            <div className="flex">
               <input
                  type="text"
                  id="url"
                  name="url"
                  placeholder="Enter URL"
                  ref={mediaUrlRef}
                  value={venue.media[0].url || ""}
                  onChange={handleChange}
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
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
      </form>
   );
};

export default EditVenueForm;
