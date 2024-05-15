import { Metadata } from "next";
import ManagerVenueList from "@/app/ui/user/venues/ManagerVenueList";
import Hero from "@/app/ui/hero";

export const metadata: Metadata = {
   title: "Profile",
};

export default function Page({ params }: { params: { name: string } }) {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Hero
            heading="Venues"
            headingLevel={1}
            subheading={`${params.name}'s`}
         />
         <ManagerVenueList name={params.name} />
      </main>
   );
}
