import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import RadioButtons from "@/app/ui/radio-buttons";

export const metadata: Metadata = {
	title: "Venues",
};

export default function Page() {
	return (
		<main className="flex flex-col min-h-screen max-w-7xl m-auto border-x border-lightGrey bg-background">
			<Hero heading="Venues" headingLevel={1} />

			<div className="mx-12 mt-28 mb-12">
				<fieldset>
					<div className="w-fit bg-white rounded-full">
						<RadioButtons
							name="venueType"
							options={["Latest", "Popular", "Featured"]}
							defaultOption="Latest"
						/>
					</div>
				</fieldset>
			</div>
		</main>
	);
}
