"use client";

import { Venue } from "@/app/lib/definitions";
import { FC, useState } from "react";
import { CreateCard } from "./create-card";
import Button from "@/app/ui/button";

const VenueList: FC<{
	venues: Venue[];
	listLimit?: number;
	showMoreButton?: boolean;
}> = ({ venues, listLimit = 9, showMoreButton = false }) => {
	const INITIAL_LIMIT = listLimit;
	const [limit, setLimit] = useState(INITIAL_LIMIT);

	return (
		<>
			<div className="grid grid-cols-3 gap-8 w-full px-4 md:px-14 xl:px-32">
				{venues.slice(0, limit).map((venue) => (
					<CreateCard key={venue.id} venue={venue} />
				))}
			</div>
			{showMoreButton && venues && limit < venues.length && (
				<Button
					text={"Show more"}
					styles={"bg-brown hover:bg-darkBrown text-white mt-12"}
					onClick={() => setLimit(limit + INITIAL_LIMIT)}
				/>
			)}
		</>
	);
};

export default VenueList;
