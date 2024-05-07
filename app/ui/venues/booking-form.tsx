"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { createBooking } from "@/app/lib/actions";
import { Button } from "@/app/ui/buttons";
import { BookingFormProps } from "@/app/lib/definitions";

export default function Form({
   venueId,
   maxGuests,
   bookedDates,
}: BookingFormProps) {
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());

   const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
      const date = new Date(startDate.getTime());
      const dates = [];

      while (date <= endDate) {
         dates.push(new Date(date));
         date.setDate(date.getDate() + 1);
      }

      return dates;
   };

   const disabledDates = bookedDates.flatMap((range) =>
      getDatesInRange(new Date(range.dateFrom), new Date(range.dateTo))
   );

   const CustomInput = React.forwardRef<
      HTMLButtonElement,
      { value: string; onClick: () => void }
   >(({ value, onClick }, ref) => (
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
   ));

   const minEndDate = startDate > new Date() ? startDate : new Date();
   const today = new Date();
   today.setHours(0, 0, 0, 0);

   return (
      <form onSubmit={(event) => createBooking(event)}>
         <input type="hidden" name="venueId" value={venueId} />
         <div className="mt-4 flex flex-col">
            <label htmlFor="dateFrom">Start Date</label>
            <DatePicker
               selected={startDate}
               onChange={(date) => {
                  setStartDate(date || new Date());
                  if (endDate && date && endDate < date) {
                     setEndDate(date);
                  }
               }}
               customInput={
                  <CustomInput
                     value={startDate.toDateString()}
                     onClick={() => {}}
                  />
               }
               excludeDates={disabledDates}
               minDate={new Date()}
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
               excludeDates={disabledDates}
               minDate={minEndDate}
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
