import { Metadata } from "next";
import ManagerVenueDetails from "@/app/ui/user/venues/ManagerVenueDetails";

export const metadata: Metadata = {
   title: "Booking",
};

export default async function Page({ params }: { params: { id: string } }) {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <ManagerVenueDetails id={params.id} />
      </main>
   );
}
