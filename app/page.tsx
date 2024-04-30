import Logo from "@/app/ui/holidaze-logo";
import Subheading from "@/app/ui/subheading";
import { elMessiri } from "@/app/ui/fonts";
import waterImg from "@/public/texture-water-lighter.jpg";
import beachImg from "@/public/background-beach.jpg";
import logoWhiteSubtitle from "@/public/logo-white-subtitle.svg";
import { getVenues } from "@/app/lib/data";
import VenueList from "@/app/ui/venues/venue-list";
import { Suspense } from "react";
import { LinkButton } from "@/app/ui/buttons";

export default async function Home() {
   const { data } = await getVenues();

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

         <div
            style={{
               backgroundImage: `url(${beachImg.src})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
            }}
            className="flex h-80 items-center"
         >
            <div className="p-20 text-dark">
               <Subheading text={"Welcome"} left={""} right={"w-24 ms-2"} />
               <h2 className={`${elMessiri.className} leading-tight`}>
                  Serene Escapes
               </h2>
               <p className="max-w-80 font-light">
                  Explore our global collection of exquisite resorts, each
                  offering a unique sanctuary of peace and luxury. Dive into
                  unparalleled comfort and serene settings, where every stay
                  promises a memorable escape.
               </p>
            </div>
         </div>

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
               <VenueList venues={data} listLimit={3} />
            </Suspense>
            <LinkButton targetHref="/venues" text="View all" styles="mt-12" />
         </div>
      </main>
   );
}
