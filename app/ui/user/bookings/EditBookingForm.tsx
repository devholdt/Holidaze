"use client";

import React, { useState, useEffect } from "react";
import DateRange from "@/app/ui/venues/DateRange";
import { Button } from "@/app/ui/buttons";
import { formatDateISO } from "@/app/lib/utils";
import { getBookingById, getVenueById } from "@/app/lib/data";
import { usePathname } from "next/navigation";
import { BookingProps } from "@/app/lib/definitions";
import { editBooking, deleteBooking } from "@/app/lib/actions";

export default function Form() {
   const pathname = usePathname();
   const bookingId = pathname.substring(pathname.lastIndexOf("/") + 1);

   const [booking, setBooking] = useState<any>(null);
   const [venue, setVenue] = useState<any>(null);
   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
      null,
      null,
   ]);
   const [startDate, endDate] = dateRange;

   useEffect(() => {
      const fetchBooking = async () => {
         const fetchedBooking = await getBookingById(bookingId);
         setBooking(fetchedBooking);
         if (fetchedBooking && fetchedBooking.venue) {
            const fetchedVenue = await getVenueById(fetchedBooking.venue.id);
            setVenue(fetchedVenue);
         }
      };

      fetchBooking();
   }, [bookingId]);

   if (!booking || !venue) {
      return <p>Loading...</p>;
   }

   const formatDateValue = (date: Date | null) => {
      return date ? formatDateISO(date).toString() : "";
   };

   const bookedDates = venue.bookings.map((booking: BookingProps) => ({
      dateFrom: booking.dateFrom,
      dateTo: booking.dateTo,
   }));

   return (
      <form
         onSubmit={(event) => editBooking(event, bookingId)}
         className="flex min-w-[240px] max-w-[480px] flex-col justify-center"
      >
         <h4 className="mb-4 text-center font-extralight uppercase tracking-widest">
            Edit booking
         </h4>

         <div className="mb-4 flex flex-col">
            <input
               type="hidden"
               name="dateFrom"
               value={formatDateValue(startDate)}
            />
            <input
               type="hidden"
               name="dateTo"
               value={formatDateValue(endDate)}
            />
            <DateRange
               dateRange={dateRange}
               setDateRange={setDateRange}
               bookedDates={bookedDates}
            />
         </div>

         <div className="mb-4 flex flex-col">
            <label htmlFor="guests">Guests</label>
            <div>
               <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  max={booking.venue.maxGuests}
                  placeholder={`1 - ${booking.venue.maxGuests.toString()}`}
                  className="w-20 rounded border border-lightGrey bg-background p-2 text-center hover:border-grey"
                  required
               />
               <span className="ms-2 text-red">
                  max {booking.venue.maxGuests}
               </span>
            </div>
         </div>
         <Button text="Confirm" styles="mb-4" primary={false} />
         <button
            onClick={() => deleteBooking(bookingId)}
            className="mx-auto w-fit lowercase underline"
            type="button"
         >
            Delete booking
         </button>
         <div className="alert-container"></div>
      </form>
   );
}
