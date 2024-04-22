import Link from "next/link";
import Logo from "@/app/ui/holidaze-logo";
import textureWaterSm from "../../public/texture-water-sm.jpg";

export default function Header() {
	return (
		<header
			style={{
				backgroundImage: `url(${textureWaterSm.src})`,
				backgroundSize: "cover",
			}}
			className="flex justify-between items-center py-8 px-10"
		>
			<Link href="/">
				<Logo src="/logo-white.svg" width={180} height={63} />
			</Link>
			<nav className="flex gap-8">
				<Link href="/" className="text-white uppercase">
					Home
				</Link>
				<Link href="/" className="text-white uppercase">
					Venues
				</Link>
				<Link href="/" className="text-white uppercase">
					Contact
				</Link>
				<div className="text-white uppercase">User</div>
			</nav>
		</header>
	);
}
