import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import RadioButtons from "@/app/ui/radio-buttons";
import DatePick from "@/app/ui/date-picker";
import Search from "@/app/ui/search";

export const metadata: Metadata = {
	title: "Venues",
};

export default function Page() {
	return (
		<main className="flex flex-col min-h-screen max-w-7xl m-auto border-x border-lightGrey bg-background">
			<Hero heading="Venues" headingLevel={1} />

			<div className="flex justify-between gap-20 mx-12 mt-28 mb-12">
				<RadioButtons />
				<DatePick />
				<Search />
			</div>
		</main>
	);
}
