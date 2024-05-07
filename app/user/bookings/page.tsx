import Hero from "@/app/ui/hero";
import { Metadata } from "next";
import BookingsList from "@/app/ui/user/bookings-list";

export const metadata: Metadata = {
   title: "Bookings",
};

export default async function Page() {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Hero heading="Bookings" headingLevel={1} subheading="Your upcoming" />
         <BookingsList />
      </main>
   );
}
