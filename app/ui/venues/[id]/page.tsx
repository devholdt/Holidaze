import { Metadata } from "next";
import { getVenueById } from "@/app/lib/data";

export const metadata: Metadata = {
	title: "Venue",
};

export default async function Page({ params }: { params: { id: string } }) {
	const [venue] = await Promise.all([getVenueById(params.id)]);

	return (
		<main>
			<p>params id: {params.id}</p>
			<p>venue id: {venue.id}</p>
		</main>
	);
}
