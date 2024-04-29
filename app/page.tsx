import Logo from "@/app/ui/holidaze-logo";
import Subheading from "@/app/ui/subheading";
import Link from "next/link";
import { elMessiri } from "@/app/ui/fonts";
import waterImg from "@/public/texture-water-lighter.jpg";
import beachImg from "@/public/background-beach.jpg";
import logoWhiteSubtitle from "@/public/logo-white-subtitle.svg";
import { getVenues } from "@/app/lib/data";
import VenueList from "@/app/ui/venues/venue-list";
import { Suspense } from "react";

export default async function Home() {
	const { data } = await getVenues();

	return (
		<main className="flex flex-col min-h-screen max-w-7xl m-auto border-x border-lightGrey bg-background">
			<div
				style={{
					backgroundImage: `url(${waterImg.src})`,
					backgroundSize: "cover",
				}}
				className="flex items-center justify-center h-96"
			>
				<h1>
					<Logo src={logoWhiteSubtitle} width={400} height={200} />
				</h1>
			</div>

			<div
				style={{
					backgroundImage: `url(${beachImg.src})`,
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

			<div className="flex flex-col items-center mt-36">
				<div className="flex flex-col items-center text-center mb-12">
					<h3 className={`${elMessiri.className} leading-tight`}>
						Bookings & Venues
					</h3>
					<Subheading
						text={"Dream Vacations"}
						left={"w-24 me-2"}
						right={"w-24 ms-2"}
					/>
				</div>
			</div>
			<div className="flex flex-col items-center mb-36">
				<Suspense fallback={<p>Loading...</p>}>
					<VenueList venues={data} listLimit={3} />
				</Suspense>
				<Link
					href="/venues"
					className="bg-brown hover:bg-darkBrown transition uppercase text-white mt-12 font-extralight text-lg uppercase py-3 px-6 text-lg font-extralight tracking-widest"
				>
					View all
				</Link>
			</div>
		</main>
	);
}
