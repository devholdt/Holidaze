"use client";

import { useFetch } from "@/app/lib/data";
import { CreateCard } from "@/app/ui/venues/create-card";

const url = "https://v2.api.noroff.dev/holidaze/venues";

export default function VenueList() {
	const { data, loading, error } = useFetch(url);

	console.log(data);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error</div>;
	}

	return (
		<div className="grid grid-cols-3 gap-8 w-full">
			{data?.map((venue) => (
				<CreateCard key={venue.id} venue={venue} />
			))}
		</div>
	);
}
