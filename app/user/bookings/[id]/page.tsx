import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Single Booking",
};

export default async function Page() {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <h1>Single Booking</h1>
      </main>
   );
}
