import { Metadata } from "next";
import BookingDetails from "@/app/ui/user/bookings/BookingDetails";

export const metadata: Metadata = {
   title: "Booking",
};

export default function Page({ params }: { params: { id: string } }) {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <BookingDetails id={params.id} />
      </main>
   );
}
