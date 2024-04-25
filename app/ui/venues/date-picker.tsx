"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateRange = [Date | null, Date | null];

export default function DatePick() {
	const getTomorrowDate = () => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		return tomorrow;
	};

	const [dateRange, setDateRange] = useState<DateRange>([
		new Date(),
		getTomorrowDate(),
	]);
	const [startDate, endDate] = dateRange;

	const CustomInput = React.forwardRef(
		(
			{ value, onClick }: { value?: string; onClick?: () => void },
			ref: React.Ref<HTMLButtonElement>
		) => {
			const formattedValue = value ? value.replace(" - ", " to ") : undefined;

			return (
				<button
					className="bg-yellow py-2 px-4 rounded-full w-fit text-center text-blue cursor-pointer text-nowrap"
					onClick={onClick}
					ref={ref}
					style={{ border: "none" }}
				>
					{formattedValue}
				</button>
			);
		}
	);

	return (
		<fieldset>
			<legend className="text-blue mb-1">Pick dates:</legend>
			<div>
				<DatePicker
					selectsRange={true}
					startDate={startDate}
					endDate={endDate}
					onChange={(update: DateRange) => setDateRange(update)}
					monthsShown={2}
					dateFormat="dd/MM/yy"
					minDate={new Date()}
					withPortal={true}
					customInput={<CustomInput />}
				/>
			</div>
		</fieldset>
	);
}