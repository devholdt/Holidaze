import { Metadata } from "next";
import { getVenueById } from "@/app/lib/data";
import VenueImage from "@/app/ui/venues/venue-image";

export const metadata: Metadata = {
	title: "Venue",
};

export default async function Page({ params }: { params: { id: string } }) {
	const { data: venue } = await getVenueById(params.id);

	if (!venue) {
		return <div>Venue not found</div>;
	}

	return (
		<main className="flex flex-col min-h-screen max-w-7xl m-auto border-x border-lightGrey bg-background">
			<div className="relative m-12 h-80">
				<VenueImage venue={venue} />
			</div>
			<h1>{venue.name}</h1>
		</main>
	);
}
