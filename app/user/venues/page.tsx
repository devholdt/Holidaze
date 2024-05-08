import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import ManagerVenueList from "@/app/ui/user/manager-venues-list";

import CreateVenueButton from "@/app/ui/user/CreateVenueButton";

export const metadata: Metadata = {
   title: "Your Venues",
};

export default async function Page() {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Hero heading="Venues" headingLevel={1} subheading="Your" />

         <CreateVenueButton />

         <ManagerVenueList />
      </main>
   );
}
