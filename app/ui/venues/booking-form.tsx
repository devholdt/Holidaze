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
					className="flex bg-background py-2 px-4 rounded max-w-44 w-full border border-lightGrey hover:border-grey"
					onClick={onClick}
					ref={ref}
				>
					{value}
				</button>
				<CalendarIcon className="w-6 h-6 text-dark" />
			</div>
		)
	);

	return (
		<form>
			<div className="flex flex-col mt-4">
				<label htmlFor="dateFrom">Start Date</label>
				<DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date || new Date())}
					customInput={
						<CustomInput value={startDate.toString()} onClick={() => {}} />
					}
				/>
			</div>
			<div className="flex flex-col mt-4">
				<label htmlFor="dateTo">End Date</label>
				<DatePicker
					selected={endDate}
					onChange={(date) => setEndDate(date || new Date())}
					customInput={
						<CustomInput value={startDate.toString()} onClick={() => {}} />
					}
				/>
			</div>
			<div className="flex flex-col mt-4">
				<label htmlFor="guests">Guests</label>
				<div>
					<input
						type="number"
						id="guests"
						name="guests"
						min="1"
						max={maxGuests}
						placeholder={`1 - ${maxGuests.toString()}`}
						className="bg-background p-2 rounded w-20 text-center border border-lightGrey hover:border-grey"
					/>
					<span className="ms-2 text-red">max {maxGuests}</span>
				</div>
			</div>
			<button
				type="submit"
				className="bg-brown hover:bg-darkBrown transition text-white font-extralight p-2 mt-4 w-28 uppercase tracking-widest"
				onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
					e.preventDefault();
				}}
			>
				Book
			</button>
		</form>
	);
}
