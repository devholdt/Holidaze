"use client";

import React, { useState } from "react";
import { useFetch } from "@/app/lib/data";
import { CreateCard } from "@/app/ui/venues/create-card";
import Button from "@/app/ui/button";

interface VenueListProps {
	listLimit?: number;
	showMoreButton?: boolean;
}

export default function VenueList({
	listLimit = 9,
	showMoreButton = false,
}: VenueListProps) {
	const url = "https://v2.api.noroff.dev/holidaze/venues";
	const { data, loading, error } = useFetch(url);
	const INITIAL_LIMIT = listLimit;
	const [limit, setLimit] = useState(INITIAL_LIMIT);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error</div>;
	}

	return (
		<div className="flex flex-col items-center w-full">
			<div className="grid grid-cols-3 gap-8 w-full px-4 md:px-14 xl:px-32">
				{data?.slice(0, limit).map((venue) => (
					<CreateCard key={venue.id} venue={venue} />
				))}
			</div>
			{showMoreButton && data && limit < data.length && (
				<Button
					text={"Show more"}
					styles={"bg-brown hover:bg-darkBrown text-white mt-12"}
					onClick={() => setLimit(limit + INITIAL_LIMIT)}
				/>
			)}
		</div>
	);
}
