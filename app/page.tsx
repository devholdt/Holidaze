import water from "@/public/texture-water-lighter.jpg";
import beach from "@/public/background-beach.jpg";
import Logo from "@/app/ui/holidaze-logo";
import Subheading from "@/app/ui/subheading";
import VenueCard from "@/app/ui/venue-card";
import { elMessiri } from "@/app/ui/fonts";

export default function Home() {
	return (
		<main className="flex flex-col min-h-screen max-w-7xl m-auto">
			<div
				style={{
					backgroundImage: `url(${water.src})`,
					backgroundSize: "cover",
				}}
				className="flex items-center justify-center h-96"
			>
				<h1>
					<Logo src={"/logo-white-subtitle.svg"} width={400} height={200} />
				</h1>
			</div>

			<div
				style={{
					backgroundImage: `url(${beach.src})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className="flex items-center h-80"
			>
				<div className="p-20 text-dark">
					<Subheading text={"Welcome"} left={""} right={"w-24 ms-2"} />
					<h2 className={`${elMessiri.className} leading-tight`}>
						Serene Escapes
					</h2>
					<p className="max-w-80 font-light">
						Explore our global collection of exquisite resorts, each offering a
						unique sanctuary of peace and luxury. Dive into unparalleled comfort
						and serene settings, where every stay promises a memorable escape.
					</p>
				</div>
			</div>

			<div className="flex flex-col items-center my-36">
				<div className="flex flex-col items-center">
					<h3 className={`${elMessiri.className} leading-tight`}>
						Bookings & Venues
					</h3>
					<Subheading
						text={"Dream Vacations"}
						left={"w-24 me-2"}
						right={"w-24 ms-2"}
					/>
				</div>
				<div className="flex gap-12 mt-12">
					<VenueCard />
					<VenueCard />
					<VenueCard />
				</div>
				<button className="mt-12">View all</button>
			</div>
		</main>
	);
}
