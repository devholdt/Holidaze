import backgroundBeach from "@/public/background-beach.jpg";

export default function Home() {
	return (
		<main className="flex flex-col m-auto min-h-screen flex-col max-w-7xl">
			<div
				style={{
					backgroundImage: `url(${backgroundBeach.src})`,
					backgroundSize: "cover",
				}}
				className="flex items-center py-40"
			>
				<h1>Holidaze</h1>
			</div>
		</main>
	);
}
