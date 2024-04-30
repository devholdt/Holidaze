"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";
// import { createBooking } from "@/app/lib/actions";

export default function Form({ maxGuests }: { maxGuests: number }) {
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
      <form>
         <div className="mt-4 flex flex-col">
            <label htmlFor="dateFrom">Start Date</label>
            <DatePicker
               selected={startDate}
               onChange={(date) => setStartDate(date || new Date())}
               customInput={
                  <CustomInput
                     value={startDate.toString()}
                     onClick={() => {}}
                  />
               }
            />
         </div>
         <div className="mt-4 flex flex-col">
            <label htmlFor="dateTo">End Date</label>
            <DatePicker
               selected={endDate}
               onChange={(date) => setEndDate(date || new Date())}
               customInput={
                  <CustomInput
                     value={startDate.toString()}
                     onClick={() => {}}
                  />
               }
            />
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
         <button
            type="submit"
            className="mt-4 w-28 bg-brown p-2 font-extralight uppercase tracking-widest text-white transition hover:bg-darkBrown"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
               e.preventDefault();
            }}
         >
            Book
         </button>
      </form>
   );
}
