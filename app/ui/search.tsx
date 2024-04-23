"use client";

export default function Search() {
	return (
		<div className="flex flex-col text-blue w-full">
			<label htmlFor="search">Search:</label>
			<input
				className="rounded-full border border-yellow border-2 pl-4 py-2 placeholder:text-gray-500"
				placeholder="Search venues..."
			/>
		</div>
	);
}
