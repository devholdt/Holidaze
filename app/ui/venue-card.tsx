"use client";

import { useFetch } from "@/app/lib/data";
import { elMessiri } from "@/app/ui/fonts";

const url = "https://v2.api.noroff.dev/holidaze/venues";

export default function VenueCard() {
	const { data, loading, error } = useFetch(url);

	return (
		<div className="flex flex-col bg-white h-96 w-full min-w-48">
			<div className="bg-transparent flex-1"></div>
			<div className="bg-gradient-to-t from-darkBrown from-30% via-brown via-60% text-white flex flex-col justify-center px-4 pb-4 pt-12">
				<p className="font-light uppercase">$200 / night</p>
				<h4 className={`${elMessiri.className}`}>Venue</h4>
			</div>
		</div>
	);
}
