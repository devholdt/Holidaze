import { Metadata } from "next";
import Hero from "@/app/ui/hero";

export const metadata: Metadata = {
   title: "Your Venues",
};

export default async function Page() {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Hero heading="Venues" headingLevel={1} subheading="Your" />
      </main>
   );
}
