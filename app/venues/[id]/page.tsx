import { Metadata } from "next";
import VenueDetails from "@/app/ui/venues/VenueDetails";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

export const metadata: Metadata = {
   title: "Venue",
};

export default function Page({ params }: { params: { id: string } }) {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Breadcrumbs
            breadcrumbs={[
               { label: "Home", href: "/" },
               { label: "Venues", href: "/venues" },
               {
                  label: "Venue details",
                  href: `/venues/${params.id}`,
                  active: true,
               },
            ]}
         />
         <VenueDetails id={params.id} />
      </main>
   );
}
