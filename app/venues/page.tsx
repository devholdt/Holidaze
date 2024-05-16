import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import RadioButtons from "@/app/ui/venues/radio-buttons";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const Search = dynamic(() => import("@/app/ui/venues/Search"), {
   ssr: false,
   loading: () => <div>Loading...</div>,
});

const VenueList = dynamic(() => import("@/app/ui/venues/VenueList"), {
   ssr: false,
   loading: () => <div>Loading...</div>,
});

export const metadata: Metadata = {
   title: "Venues",
};

export default function Page() {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Hero heading="Venues" headingLevel={1} />

         <div className="mx-12 mb-12 mt-28 flex justify-between gap-20">
            <RadioButtons />
            <Suspense fallback={<p>Loading...</p>}>
               <Search />
            </Suspense>
         </div>

         <div className="mb-36 flex flex-col items-center">
            <VenueList showMoreButton={true} />
         </div>
      </main>
   );
}
