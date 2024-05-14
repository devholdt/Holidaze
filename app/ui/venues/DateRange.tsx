import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateRangeProps } from "@/app/lib/definitions";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function DateRange({
   dateRange,
   setDateRange,
   bookedDates,
}: DateRangeProps) {
   const [startDate, endDate] = dateRange;

   const calculateMaxEndDate = (start: Date): Date | null => {
      if (!start || !bookedDates) return null;
      const bookedRanges = bookedDates
         .map((range) => ({
            start: new Date(range.dateFrom),
            end: new Date(range.dateTo),
         }))
         .sort((a, b) => a.start.getTime() - b.start.getTime());

      for (const range of bookedRanges) {
         if (range.start > start) {
            const dayBefore = new Date(range.start);
            dayBefore.setDate(dayBefore.getDate() - 1);
            return dayBefore;
         }
      }

      return null;
   };

   const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
      const dates = [];
      let currentDate = new Date(startDate.getTime());
      while (currentDate <= endDate) {
         dates.push(new Date(currentDate));
         currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
   };

   const disabledDates = bookedDates
      ? bookedDates.flatMap((range) =>
           getDatesInRange(new Date(range.dateFrom), new Date(range.dateTo))
        )
      : [];

   const handleDateChange = (dates: [Date | null, Date | null]) => {
      const [start, end] = dates;
      if (start) {
         const maxEndDate = calculateMaxEndDate(start);
         if (end && maxEndDate && end > maxEndDate) {
            setDateRange([start, maxEndDate]);
         } else {
            setDateRange(dates);
         }
      } else {
         setDateRange([start, null]);
      }
   };

   const CustomInput = React.forwardRef<
      HTMLButtonElement,
      { value?: string; onClick?: () => void }
   >(({ value, onClick }, ref) => {
      const displayValue = value
         ? value.replace(" - ", " to ")
         : "Click here to pick dates";

      return (
         <div className="flex gap-2">
            <button
               className="w-fit cursor-pointer text-nowrap rounded border border-lightGrey bg-background px-4 py-2 text-center"
               onClick={onClick}
               ref={ref}
               type="button"
            >
               {displayValue}
            </button>
            <CalendarIcon className="w-6" />
         </div>
      );
   });

   return (
      <fieldset>
         <legend className="mb-1 text-blue">Pick dates</legend>
         <div className="flex items-center gap-2">
            <DatePicker
               selectsRange={true}
               startDate={startDate}
               endDate={endDate}
               onChange={handleDateChange}
               monthsShown={2}
               dateFormat="dd/MM/yy"
               minDate={new Date()}
               excludeDates={disabledDates}
               customInput={<CustomInput />}
               withPortal
            />
            <div className="alert-daterange"></div>
         </div>
      </fieldset>
   );
}