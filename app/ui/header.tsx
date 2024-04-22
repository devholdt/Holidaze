import Link from "next/link";
import Logo from "@/app/ui/holidaze-logo";
import textureWaterSm from "@/public/texture-water-sm.jpg";
import UserDropdown from "@/app/ui/user-dropdown";

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
				<Logo src="/logo-white.svg" width={160} height={60} />
			</Link>
			<nav className="flex gap-8 items-center">
				<Link href="/" className="text-white uppercase">
					Home
				</Link>
				<Link href="/" className="text-white uppercase">
					Venues
				</Link>
				<Link href="/" className="text-white uppercase">
					Contact
				</Link>
				<UserDropdown />
			</nav>
		</header>
	);
}
