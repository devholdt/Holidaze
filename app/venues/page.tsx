import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import RadioButtons from "@/app/ui/venues/radio-buttons";
import DateRange from "@/app/ui/venues/date-picker";
import Search from "@/app/ui/venues/search";
import VenueList from "@/app/ui/venues/venue-list";
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
				<DateRange />
				<Search />
			</div>

			<div className="flex flex-col items-center mb-36">
				<div className="flex flex-col items-center w-full px-4 md:px-14 xl:px-32">
					<VenueList />
					<Button
						text={"Show more"}
						styles={"bg-brown text-white mt-12 hover:bg-darkBrown"}
					/>
				</div>
			</div>
		</main>
	);
}
