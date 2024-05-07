import Logo from "@/app/ui/holidaze-logo";
import Subheading from "@/app/ui/subheading";
import { elMessiri } from "@/app/ui/fonts";
import waterImg from "@/public/texture-water-lighter.jpg";
import logoWhiteSubtitle from "@/public/logo-white-subtitle.svg";
import { getVenues } from "@/app/lib/data";
import VenueList from "@/app/ui/venues/venue-list";
import { Suspense } from "react";
import { LinkButton } from "@/app/ui/buttons";

import Hero from "@/app/ui/hero";

export default async function Home() {
   const venues = await getVenues();

   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <div
            style={{
               backgroundImage: `url(${waterImg.src})`,
               backgroundSize: "cover",
            }}
            className="flex h-96 items-center justify-center"
         >
            <h1>
               <Logo src={logoWhiteSubtitle} width={400} height={200} />
            </h1>
         </div>

         <Hero
            heading="Serene Escapes"
            headingLevel={2}
            subheading="Welcome"
            text="Explore our global collection of exquisite resorts, each
                  offering a unique sanctuary of peace and luxury. Dive into
                  unparalleled comfort and serene settings, where every stay
                  promises a memorable escape."
         />

         <div className="mt-36 flex flex-col items-center">
            <div className="mb-12 flex flex-col items-center text-center">
               <h3 className={`${elMessiri.className} leading-tight`}>
                  Bookings & Venues
               </h3>
               <Subheading
                  text={"Dream Vacations"}
                  left={"w-24 me-2"}
                  right={"w-24 ms-2"}
               />
            </div>
         </div>
         <div className="mb-36 flex flex-col items-center">
            <Suspense fallback={<p>Loading...</p>}>
               <VenueList venues={venues} listLimit={3} />
            </Suspense>
            <LinkButton targetHref="/venues" text="View all" styles="mt-12" />
         </div>
      </main>
   );
}
