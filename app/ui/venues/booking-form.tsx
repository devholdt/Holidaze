"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { createBooking } from "@/app/lib/actions";
import { Button } from "@/app/ui/buttons";

export default function Form({
   maxGuests,
   venueId,
}: {
   maxGuests: number;
   venueId: string;
}) {
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());

   const CustomInput = React.forwardRef(
      (
         { value, onClick }: { value: string; onClick: () => void },
         ref: React.Ref<HTMLButtonElement>
      ) => (
         <div className="flex items-center gap-2">
            <button
               type="button"
               className="flex w-full max-w-44 rounded border border-lightGrey bg-background px-4 py-2 hover:border-grey"
               onClick={onClick}
               ref={ref}
            >
               {value}
            </button>
            <CalendarIcon className="h-6 w-6 text-dark" />
         </div>
      )
   );

   return (
      <form onSubmit={(event) => createBooking(event)}>
         <input type="hidden" name="venueId" value={venueId} />
         <div className="mt-4 flex flex-col">
            <label htmlFor="dateFrom">Start Date</label>
            <DatePicker
               selected={startDate}
               onChange={(date) => setStartDate(date || new Date())}
               customInput={
                  <CustomInput
                     value={startDate.toDateString()}
                     onClick={() => {}}
                  />
               }
            />
            <input
               type="hidden"
               name="dateFrom"
               value={startDate.toISOString()}
            />
         </div>
         <div className="mt-4 flex flex-col">
            <label htmlFor="dateTo">End Date</label>
            <DatePicker
               selected={endDate}
               onChange={(date) => setEndDate(date || new Date())}
               customInput={
                  <CustomInput
                     value={endDate.toDateString()}
                     onClick={() => {}}
                  />
               }
            />
            <input type="hidden" name="dateTo" value={endDate.toISOString()} />
         </div>
         <div className="mt-4 flex flex-col">
            <label htmlFor="guests">Guests</label>
            <div>
               <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  max={maxGuests}
                  placeholder={`1 - ${maxGuests.toString()}`}
                  className="w-20 rounded border border-lightGrey bg-background p-2 text-center hover:border-grey"
               />
               <span className="ms-2 text-red">max {maxGuests}</span>
            </div>
         </div>
         <Button text="Book" styles="mt-4" />
         <div className="alert-container"></div>
      </form>
   );
}
