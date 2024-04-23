import { Metadata } from "next";
import { elMessiri } from "@/app/ui/fonts";

export const metadata: Metadata = {
	title: "Venues",
};

export default function Page() {
	return (
		<main className="flex flex-col min-h-screen max-w-7xl m-auto border-x border-lightGrey bg-background">
			<h1 className={`${elMessiri.className}`}>Venues</h1>
			<p>This is the venues page</p>
		</main>
	);
}
