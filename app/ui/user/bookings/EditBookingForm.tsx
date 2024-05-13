"use client";

import React from "react";
import { Button } from "@/app/ui/buttons";
import DatePick from "@/app/ui/venues/date-picker";

const EditBookingForm = () => {
   return (
      <form
         onSubmit={(event) => event.preventDefault()}
         className="flex max-w-[480px] flex-col justify-center"
      >
         <h4 className="mb-4 text-center font-extralight uppercase tracking-widest">
            Edit booking
         </h4>

         <DatePick />

         <div className="mb-4 flex flex-col">
            <label htmlFor="guests">Guests</label>
            <div>
               <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  placeholder="1"
                  className="w-20 rounded border border-lightGrey bg-background p-2 text-center hover:border-grey"
               />
            </div>
         </div>
         <Button text="Book" styles="mt-4" />
         <div className="alert-container"></div>
      </form>
   );
};

export default EditBookingForm;
