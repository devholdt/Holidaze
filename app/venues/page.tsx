import { Metadata } from "next";
import { elMessiri } from "@/app/ui/fonts";
import Hero from "@/app/ui/Hero";
import dynamic from "next/dynamic";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

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
         <Breadcrumbs
            breadcrumbs={[
               { label: "Home", href: "/" },
               {
                  label: "Venues",
                  href: "/venues",
                  active: true,
               },
            ]}
         />
         <Hero heading="Venues" headingLevel={1} />
         <h2
            className={`${elMessiri.className} mx-8 mb-2 mt-8 text-center text-xl font-light uppercase tracking-widest text-blue sm:text-2xl`}
         >
            Find your next adventure
         </h2>
         <div className="mb-36 flex flex-col items-center">
            <VenueList venuePage={true} />
         </div>
      </main>
   );
}
