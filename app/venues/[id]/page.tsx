import { Metadata } from "next";
import { getVenueById } from "@/app/lib/data";

export const metadata: Metadata = {
	title: "Venue",
};

export default async function Page({ params }: { params: { id: string } }) {
	const fetchVenue = await getVenueById(params.id);
	const venue = fetchVenue.data;

	return (
		<main className="flex flex-col min-h-screen max-w-7xl m-auto border-x border-lightGrey bg-background">
			<h1>{venue.name}</h1>
		</main>
	);
}
