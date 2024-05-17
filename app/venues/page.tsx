import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import dynamic from "next/dynamic";

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
         <div className="mb-36 flex flex-col items-center">
            <VenueList venuePage={true} />
         </div>
      </main>
   );
}
