import Image from "next/image";
import { elMessiri } from "@/app/ui/fonts";
import { Venue } from "@/app/lib/definitions";
import { formatNumber } from "@/app/lib/utils";
import { motion } from "framer-motion";

interface CreateCardProps {
	venue: Venue;
}

export function CreateCard({ venue }: CreateCardProps) {
	const imageUrl = venue.media[0]?.url ?? "./background-reflection.jpg";
	const imageAlt = venue.media[0]?.alt ?? venue.name;

	return (
		<motion.div
			className="relative text-white flex flex-col justify-end h-96 p-2 hover:cursor-pointer"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 1.02 }}
		>
			<Image
				src={imageUrl}
				alt={imageAlt}
				onError={(event) => {
					const target = event.target as HTMLImageElement;
					target.src = "./background-reflection.jpg";
				}}
				fill
				unoptimized
				className="object-cover object-center z-1 drop-shadow-md"
			/>

			<div className="flex flex-col gap-1 z-10 px-4 py-2 bg-darkBrown border border-brown">
				<p className="font-light">
					<span className="break-all">£{formatNumber(venue.price)}</span>{" "}
					<span className="uppercase">/ night</span>
				</p>
				<h4 className={`${elMessiri.className} truncate`}>{venue.name}</h4>
			</div>
		</motion.div>
	);
}
