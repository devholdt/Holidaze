import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import RadioButtons from "@/app/ui/venues/radio-buttons";
import Search from "@/app/ui/venues/search";
import { getVenues } from "@/app/lib/data";
import VenueList from "@/app/ui/venues/VenueList";
import { Suspense } from "react";

export const metadata: Metadata = {
   title: "Venues",
};

export default async function Page() {
   const venues = await getVenues();

   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Hero heading="Venues" headingLevel={1} />

         <div className="mx-12 mb-12 mt-28 flex justify-between gap-20">
            <RadioButtons />
            <Search />
         </div>

         <div className="mb-36 flex flex-col items-center">
            <Suspense fallback={<p>Loading...</p>}>
               <VenueList venues={venues} showMoreButton={true} />
            </Suspense>
         </div>
      </main>
   );
}
