import { elMessiri } from "@/app/ui/fonts";
import { LinkButton } from "@/app/ui/Buttons";
import dynamic from "next/dynamic";
import Logo from "@/app/ui/Logo";
import Subheading from "@/app/ui/Subheading";
import waterImg from "@/public/texture-water-lighter.jpg";
import logoWhiteSubtitle from "@/public/logo-white-subtitle.svg";
import Hero from "@/app/ui/Hero";

const VenueList = dynamic(() => import("@/app/ui/venues/VenueList"), {
   ssr: false,
   loading: () => <p>Loading...</p>,
});

const Page = () => {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col bg-background">
         <div
            style={{
               backgroundImage: `url(${waterImg.src})`,
               backgroundSize: "cover",
            }}
            className="flex h-[240px] items-center justify-center xs:h-[320px] md:h-[400px]"
         >
            <Logo src={logoWhiteSubtitle} styles="w-[480px] px-8" />
         </div>

         <div className="border-x border-lightGrey">
            <Hero
               heading="Holidaze Resorts"
               headingLevel={1}
               subheading="Welcome"
               text="Explore our global collection of exquisite resorts, each
                  offering a unique sanctuary of peace and luxury. Dive into
                  unparalleled comfort and serene settings, where every stay
                  promises a memorable escape."
               styles="hidden sm:flex"
            />
            <div className="mt-36 flex flex-col items-center">
               <div className="mb-12 flex flex-col items-center px-4 text-center">
                  <h2
                     className={`${elMessiri.className} text-3xl leading-tight xs:text-5xl`}
                  >
                     Bookings & Venues
                  </h2>
                  <Subheading
                     text={"Dream Vacations"}
                     left={"w-10 xs:w-24 me-2"}
                     right={"w-10 xs:w-24 ms-2"}
                  />
               </div>
            </div>
            <div className="mb-36 flex flex-col items-center">
               <VenueList listLimit={4} />
               <LinkButton targetHref="/venues" text="View all" styles="mt-8" />
            </div>
         </div>
      </main>
   );
};

export default Page;
