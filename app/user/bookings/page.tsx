import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Hero from "@/app/ui/HeroComponent";
import BookingsList from "@/app/ui/user/bookings/BookingsList";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

export const metadata: Metadata = {
   title: "Bookings",
};

export default function Page() {
   const name = cookies().get("name");
   const nameValue = cookies().get("name")?.value;

   if (!name) {
      redirect("/user/login");
   }

   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Breadcrumbs
            breadcrumbs={[
               { label: "Home", href: "/" },
               {
                  label: "Bookings",
                  href: "/user/bookings",
                  active: true,
               },
            ]}
         />
         <Hero heading="Bookings" headingLevel={1} subheading="Your upcoming" />

         <BookingsList name={nameValue ?? ""} />
      </main>
   );
}
