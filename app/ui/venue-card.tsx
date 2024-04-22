import { elMessiri } from "@/app/ui/fonts";

export default function VenueCard() {
	return (
		<div className="flex flex-col bg-white h-96 w-64">
			<div className="bg-transparent flex-1"></div>
			<div className="bg-gradient-to-t from-darkBrown from-30% via-brown via-60% text-white flex flex-col justify-center px-4 pb-4 pt-12">
				<p className="font-light uppercase">$200 / night</p>
				<h4 className={`${elMessiri.className}`}>Venue</h4>
			</div>
		</div>
	);
}
