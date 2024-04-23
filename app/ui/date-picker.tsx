"use client";

import React, { useState, useEffect, FC, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateInputProps = {
	selectedDate: Date | null;
	minDate: Date;
	setSelectedDate: (date: Date | null) => void;
};

const DateInput: FC<DateInputProps> = ({
	selectedDate,
	minDate,
	setSelectedDate,
}) => (
	<DatePicker
		selected={selectedDate}
		onChange={setSelectedDate}
		dateFormat="dd/MM/yy"
		minDate={minDate}
		className="bg-yellow py-2 text-center rounded-full w-24 hover:cursor-pointer"
	/>
);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export default function DatePick() {
	const [checkInDate, setCheckInDate] = useState<Date | null>(new Date());
	const [checkOutDate, setCheckOutDate] = useState<Date | null>(tomorrow);

	useEffect(() => {
		if (checkInDate && checkOutDate && checkInDate >= checkOutDate) {
			const newCheckOutDate = new Date(
				checkInDate.getTime() + 24 * 60 * 60 * 1000
			);
			setCheckOutDate(newCheckOutDate);
		}
	}, [checkInDate, checkOutDate]);

	const minCheckOutDate = useMemo(() => {
		return checkInDate
			? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
			: tomorrow;
	}, [checkInDate]);

	return (
		<fieldset>
			<legend className="text-blue mb-1">Pick dates:</legend>
			<div className="flex items-center w-fit text-blue bg-white rounded-full">
				<DateInput
					selectedDate={checkInDate}
					minDate={new Date()}
					setSelectedDate={setCheckInDate}
				/>
				<p className="mx-4">to</p>
				<DateInput
					selectedDate={checkOutDate}
					minDate={minCheckOutDate}
					setSelectedDate={setCheckOutDate}
				/>
			</div>
		</fieldset>
	);
}
