import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import BookingsList from "@/app/ui/user/bookings/BookingsList";

export const metadata: Metadata = {
   title: "Bookings",
};

export default function Page() {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Hero heading="Bookings" headingLevel={1} subheading="Your upcoming" />
         <BookingsList />
      </main>
   );
}
