"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Search = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = (searchTerm: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", "1");
		if (searchTerm) {
			params.set("query", searchTerm);
		} else {
			params.delete("query");
		}
		replace(`${pathname}?${params.toString()}`);
	};

	return (
		<div className="flex flex-col text-blue w-full">
			<label htmlFor="search">Search:</label>
			<input
				className="rounded-full border border-yellow border-2 pl-4 py-2 placeholder:text-gray-500"
				placeholder="Search venues..."
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get("query")?.toString()}
			/>
		</div>
	);
};

export default Search;
