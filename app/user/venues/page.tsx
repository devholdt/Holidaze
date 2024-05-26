import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Hero from "@/app/ui/HeroComponent";
import ManagerVenueList from "@/app/ui/user/venues/ManagerVenueList";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

export const metadata: Metadata = {
   title: "Your Venues",
};

export default function Page() {
   const name = cookies().get("name");
   const venueManager = cookies().get("venueManager");
   const nameValue = cookies().get("name")?.value;

   if (!name) {
      redirect("/user/login");
   }

   if (venueManager?.value !== "true") {
      redirect("/user/bookings");
   }

   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Breadcrumbs
            breadcrumbs={[
               { label: "Home", href: "/" },
               {
                  label: "Your venues",
                  href: "/user/venues",
                  active: true,
               },
            ]}
         />
         <Hero heading="Venues" headingLevel={1} subheading="Your" />

         <ManagerVenueList name={nameValue ?? ""} />
      </main>
   );
}
