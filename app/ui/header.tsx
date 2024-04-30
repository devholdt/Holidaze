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
         <div className="m-auto flex max-w-7xl items-center justify-between px-10 py-8">
            <Link href="/">
               <Logo src={logoWhite} width={160} height={80} />
            </Link>
            <nav className="flex items-center gap-8">
               <Link href="/" className="uppercase text-white">
                  Home
               </Link>
               <Link href="/venues" className="uppercase text-white">
                  Venues
               </Link>
               <Link href="/contact" className="uppercase text-white">
                  Contact
               </Link>
               <UserDropdown />
            </nav>
         </div>
      </header>
   );
}
