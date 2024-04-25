"use client";

import { useFetch } from "@/app/lib/data";
import { elMessiri } from "@/app/ui/fonts";
import Image from "next/image";
import { formatNumber, formatPrice } from "@/app/lib/utils";

const url = "https://v2.api.noroff.dev/holidaze/venues";

export default function VenueCard() {
	const { data, loading, error } = useFetch(url);

	console.log(data);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error</div>;
	}

	return (
		<div className="venues-container grid grid-cols-3 gap-8">
			{data?.map((venue) => (
				<div
					key={venue.id}
					className="relative text-white flex flex-col justify-end h-96 p-2"
				>
					<Image
						src={venue.media[0].url || "./background-reflection.jpg"}
						alt={venue.media[0].alt || venue.name}
						fill
						unoptimized
						className="object-cover object-center z-1 border border-brown"
					/>

					<div className="flex flex-col gap-1 z-10 px-4 py-2 bg-darkBrown border border-brown">
						{/* temporary(?) price formatting */}
						<p className="font-light uppercase">
							<span className="break-all">£{formatPrice(venue.price)}</span> /
							night
						</p>
						{/* <p className="font-light uppercase">
							<span className="break-all">${formatNumber(venue.price, 1)}</span>{" "}
							/ night
						</p> */}
						<h4 className={`${elMessiri.className}`}>{venue.name}</h4>
					</div>
				</div>
			))}
		</div>
	);
}
