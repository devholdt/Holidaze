import { Metadata } from "next";
import ManagerVenueList from "@/app/ui/user/venues/ManagerVenueList";
import Hero from "@/app/ui/hero";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

export const metadata: Metadata = {
   title: "Profile",
};

export default function Page({ params }: { params: { name: string } }) {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Breadcrumbs
            breadcrumbs={[
               { label: "Home", href: "/" },
               { label: "Venues", href: "/venues" },
               {
                  label: `${params.name}`,
                  href: `/user/${params.name}`,
                  active: true,
               },
            ]}
         />
         <Hero
            heading="Venues"
            headingLevel={1}
            subheading={`${params.name}'s`}
         />
         <ManagerVenueList name={params.name} />
      </main>
   );
}
