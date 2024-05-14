import Logo from "@/app/ui/Logo";
import logoWhite from "@/public/logo-white.svg";

export default function Footer() {
   return (
      <footer className="flex flex-col bg-darkBrown">
         <div className="flex items-center justify-around p-12">
            <div>
               <Logo src={logoWhite} styles="max-w-[200px]" />
            </div>
            <div>
               <p className="max-w-96 text-lightBrown">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               </p>
            </div>
         </div>
         <div className="flex w-full justify-center bg-darkerBrown p-4 text-lightBrown">
            © Holidaze Resorts 2024
         </div>
      </footer>
   );
}
