import React, { useCallback, useMemo, Suspense, lazy } from "react";
import { DateRangeProps } from "@/app/lib/definitions";
import { CalendarIcon } from "@heroicons/react/24/outline";

const DatePicker = lazy(() => import("react-datepicker"));
import "react-datepicker/dist/react-datepicker.css";

export default function DateRange({
   dateRange,
   setDateRange,
   bookedDates,
}: DateRangeProps) {
   const [startDate, endDate] = dateRange;

   const calculateMaxEndDate = useCallback(
      (start: Date): Date | null => {
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
      },
      [bookedDates]
   );

   const getDatesInRange = useCallback(
      (startDate: Date, endDate: Date): Date[] => {
         const dates = [];
         let currentDate = new Date(startDate.getTime());
         while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
         }
         return dates;
      },
      []
   );

   const disabledDates = useMemo(
      () =>
         bookedDates
            ? bookedDates.flatMap((range) =>
                 getDatesInRange(
                    new Date(range.dateFrom),
                    new Date(range.dateTo)
                 )
              )
            : [],
      [bookedDates, getDatesInRange]
   );

   const handleDateChange = useCallback(
      (dates: [Date | null, Date | null]) => {
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
      },
      [calculateMaxEndDate, setDateRange]
   );

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
               aria-label="Pick a date range"
            >
               {displayValue}
            </button>
            <CalendarIcon className="w-6" />
         </div>
      );
   });

   CustomInput.displayName = "CustomInput";

   return (
      <fieldset>
         <legend className="mb-1 text-blue">Pick dates</legend>
         <div className="flex items-center gap-2">
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
            <div className="alert-daterange"></div>
         </div>
      </fieldset>
   );
}
