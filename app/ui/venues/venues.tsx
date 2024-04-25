"use client";

import { useFetch } from "@/app/lib/data";

const url = "https://v2.api.noroff.dev/holidaze/venues";

function Venues() {
	const { data, loading, error } = useFetch(url);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	if (!data) return <p>No data available</p>;

	return (
		<div className="venues-container">
			{data.map((venue) => (
				<div key={venue.id} className="venue">
					<p>{venue.title}</p>
				</div>
			))}
		</div>
	);
}
