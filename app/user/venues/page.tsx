import { Metadata } from "next";
import Hero from "@/app/ui/hero";
import ManagerVenueList from "@/app/ui/user/manager-venues-list";
import Modal from "@/app/ui/Modal";

export const metadata: Metadata = {
   title: "Your Venues",
};

export default function Page() {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Hero heading="Venues" headingLevel={1} subheading="Your" />

         <div className="mt-8 flex justify-center">
            <Modal modal="Create venue" textContent="Create venue" />
         </div>

         <ManagerVenueList />
      </main>
   );
}
