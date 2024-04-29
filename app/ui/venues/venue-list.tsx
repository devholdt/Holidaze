"use client";

import Button from "@/app/ui/button";
import Link from "next/link";
import { FC, useState } from "react";
import { Venue } from "@/app/lib/definitions";
import { elMessiri } from "@/app/ui/fonts";
import { formatNumber } from "@/app/lib/utils";
import { motion } from "framer-motion";

import VenueImage from "@/app/ui/venues/venue-image";

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
					<motion.div
						key={venue.id}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 1.02 }}
					>
						<Link
							href={`/venues/${venue.id}`}
							className="relative text-white flex flex-col justify-end h-96 p-2 hover:cursor-pointer"
						>
							<VenueImage venue={venue} />

							<div className="flex flex-col gap-1 z-10 px-4 py-2 bg-darkBrown border border-brown">
								<p className="font-light">
									<span className="break-all">
										£{formatNumber(venue.price)}
									</span>{" "}
									<span className="uppercase">/ night</span>
								</p>
								<h4 className={`${elMessiri.className} truncate`}>
									{venue.name}
								</h4>
							</div>
						</Link>
					</motion.div>
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
