import Logo from "@/app/ui/holidaze-logo";

export default function Footer() {
	return (
		<footer className="flex flex-col bg-darkBrown">
			<div className="flex justify-around items-center p-12">
				<div>
					<Logo src="/logo-white.svg" width={200} height={60} />
				</div>
				<div>
					<p className="text-lightBrown max-w-96">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
				</div>
			</div>
			<div className="flex justify-center text-lightBrown bg-darkerBrown w-full p-4">
				© Holidaze Resorts 2024
			</div>
		</footer>
	);
}
