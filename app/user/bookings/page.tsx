import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import BookingsList from "@/app/ui/user/bookings/BookingsList";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Bookings",
};

export default function Page() {
   const user = cookies().get("user");
   const name = cookies().get("name")?.value;

   if (!user) {
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
         <BookingsList name={name ?? ""} />
      </main>
   );
}
