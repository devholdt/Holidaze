"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { createBooking } from "@/app/lib/actions";

export default function Form({ maxGuests }: { maxGuests: number }) {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	const CustomInput = React.forwardRef(
		(
			{ value, onClick }: { value: string; onClick: () => void },
			ref: React.Ref<HTMLButtonElement>
		) => (
			<button
				type="button"
				className="flex gap-2 bg-background p-2 rounded"
				onClick={onClick}
				ref={ref}
			>
				{value} <CalendarIcon className="w-6 h-6" />
			</button>
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
						className="bg-background p-2 rounded w-20 text-center"
					/>
					<span className="ms-2 text-red">max {maxGuests}</span>
				</div>
			</div>
		</form>
	);
}
