import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Hero from "@/app/ui/Hero";
import ManagerVenueList from "@/app/ui/user/venues/ManagerVenueList";
import Breadcrumbs from "@/app/ui/Breadcrumbs";
// import dynamic from "next/dynamic";

// const Modal = dynamic(() => import("@/app/ui/Modal"));

export const metadata: Metadata = {
   title: "Your Venues",
};

export default function Page() {
   const name = cookies().get("name");
   const venueManager = cookies().get("venueManager");
   const nameValue = cookies().get("name")?.value;

   if (!name) {
      redirect("/user/login");
   }

   if (venueManager?.value !== "true") {
      redirect("/venues");
   }

   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Breadcrumbs
            breadcrumbs={[
               { label: "Home", href: "/" },
               {
                  label: "Your venues",
                  href: "/user/venues",
                  active: true,
               },
            ]}
         />
         <Hero heading="Venues" headingLevel={1} subheading="Your" />

         {/* <div className="mb-4 mt-8 flex w-full flex-col items-center justify-center gap-2 bg-white py-4 shadow">
            <h2 className="text-center text-lg font-light uppercase tracking-wider text-blue sm:text-xl">
               Be the curator of someones next adventure
            </h2>
            <Modal
               modal="Create venue"
               textContent="Create venue"
               buttonStyles="px-8 py-3 w-max text-lg font-extralight uppercase tracking-widest transition bg-brown text-white hover:bg-darkBrown"
            />
         </div> */}

         <ManagerVenueList name={nameValue ?? ""} />
      </main>
   );
}
