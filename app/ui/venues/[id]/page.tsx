import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Venue",
};

export default async function page({ params }: { params: { id: string } }) {
	return (
		<main>
			<h1>Venue id {params.id}</h1>
		</main>
	);
}
