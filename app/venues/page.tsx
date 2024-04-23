import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Venues",
};

export default function Page() {
	return (
		<main className="flex flex-col min-h-screen max-w-7xl m-auto">
			<h1>Venues</h1>
			<p>This is the venues page</p>
		</main>
	);
}
