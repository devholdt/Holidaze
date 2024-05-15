import { Metadata } from "next";
import VenueDetails from "@/app/ui/venues/VenueDetails";

export const metadata: Metadata = {
   title: "Venue",
};

export default function Page({ params }: { params: { id: string } }) {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <VenueDetails id={params.id} />
      </main>
   );
}
