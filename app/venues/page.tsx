import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import RadioButtons from "@/app/ui/radio-buttons";
import DatePick from "@/app/ui/date-picker";
import Search from "@/app/ui/search";
import VenueCard from "@/app/ui/venue-card";
import Button from "@/app/ui/button";

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

			<div className="flex flex-col items-center mb-36">
				<div className="flex flex-wrap md:flex-nowrap gap-8 w-full px-4 md:px-14 xl:px-32">
					<VenueCard />
					<VenueCard />
					<VenueCard />
				</div>
				<Button
					text={"Show more"}
					styles={
						"bg-brown py-3 px-6 uppercase text-white mt-12 hover:bg-darkBrown font-extralight text-lg"
					}
				/>
			</div>
		</main>
	);
}
