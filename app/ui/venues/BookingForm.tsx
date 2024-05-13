"use client";

import React, { useState } from "react";
import DateRange from "@/app/ui/venues/DateRange";
import { createBooking } from "@/app/lib/actions";
import { Button } from "@/app/ui/buttons";
import { BookingFormProps } from "@/app/lib/definitions";
import { formatDateISO } from "@/app/lib/utils";

export default function Form({
   venueId,
   maxGuests,
   bookedDates,
}: BookingFormProps) {
   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
      null,
      null,
   ]);

   const [startDate, endDate] = dateRange;

   return (
      <form onSubmit={createBooking}>
         <input type="hidden" name="venueId" value={venueId} />
         <input
            type="hidden"
            name="dateFrom"
            value={formatDateISO(startDate).toString()}
         />
         <input
            type="hidden"
            name="dateTo"
            value={formatDateISO(endDate).toString()}
         />
         <DateRange
            dateRange={dateRange}
            setDateRange={setDateRange}
            bookedDates={bookedDates}
         />
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
