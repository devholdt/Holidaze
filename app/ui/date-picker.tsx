"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = () => {
	const [startDate, setStartDate] = useState<Date | null>(new Date());

	return (
		<DatePicker
			selected={startDate}
			onChange={(date: Date | null) => setStartDate(date)}
			dateFormat={"dd/MM/yy"}
			className="bg-yellow py-2 text-center rounded-full w-24"
		/>
	);
};

export default function DatePick() {
	return (
		<div className="flex items-center gap-4 text-blue">
			<DateInput />
			<p>to</p>
			<DateInput />
		</div>
	);
}
