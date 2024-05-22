import { Metadata } from "next";
import ManagerVenueDetails from "@/app/ui/user/venues/ManagerVenueDetails";
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
               {
                  label: "Your venues",
                  href: "/user/venues",
               },
               {
                  label: "Venue details",
                  href: `/user/venues/${params.id}`,
                  active: true,
               },
            ]}
         />
         <ManagerVenueDetails id={params.id} />
      </main>
   );
}
