import Link from "next/link";
import Logo from "@/app/ui/holidaze-logo";
import logoWhite from "@/public/logo-white.svg";
import UserDropdown from "@/app/ui/user/user-dropdown";
import waterImg from "@/public/texture-water-sm.jpg";

export default function Header() {
  return (
    <header
      style={{
        backgroundImage: `url(${waterImg.src})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex justify-between items-center py-8 px-10 max-w-7xl m-auto">
        <Link href="/">
          <Logo src={logoWhite} width={160} height={80} />
        </Link>
        <nav className="flex gap-8 items-center">
          <Link href="/" className="text-white uppercase">
            Home
          </Link>
          <Link href="/venues" className="text-white uppercase">
            Venues
          </Link>
          <Link href="/contact" className="text-white uppercase">
            Contact
          </Link>
          <UserDropdown />
        </nav>
      </div>
    </header>
  );
}
