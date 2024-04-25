"use client";

import { useFetch } from "@/app/lib/data";
import { elMessiri } from "@/app/ui/fonts";
import Image from "next/image";
import { formatNumber } from "@/app/lib/utils";

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
		<div className="grid grid-cols-3 gap-8 w-full">
			{data?.map((venue) => (
				<div
					key={venue.id}
					className="relative text-white flex flex-col justify-end h-96 p-2"
				>
					<Image
						src={venue.media[0].url}
						alt={venue.media[0].alt || venue.name}
						onError={(event) => {
							const target = event.target as HTMLImageElement;
							target.src = "./background-reflection.jpg";
						}}
						fill
						unoptimized
						className="object-cover object-center z-1 border border-brown"
					/>

					<div className="flex flex-col gap-1 z-10 px-4 py-2 bg-darkBrown border border-brown">
						<p className="font-light">
							<span className="break-all">£{formatNumber(venue.price)}</span>{" "}
							<span className="uppercase">/ night</span>
						</p>
						<h4 className={`${elMessiri.className}`}>{venue.name}</h4>
					</div>
				</div>
			))}
		</div>
	);
}
