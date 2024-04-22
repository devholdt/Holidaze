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
			className="flex justify-between items-center py-8 px-12"
		>
			<Link href="/">
				<Logo src="/logo-white.svg" width={180} height={63} />
			</Link>
			<nav className="flex gap-4">
				<Link href="/">Home</Link>
				<Link href="/">Venues</Link>
				<Link href="/">Contact</Link>
				<div>User</div>
			</nav>
		</header>
	);
}
