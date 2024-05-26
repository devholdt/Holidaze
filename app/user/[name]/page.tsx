import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileDetails } from "@/app/ui/user/ProfileDetails";
import Hero from "@/app/ui/HeroComponent";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

export const metadata: Metadata = {
   title: "Profile",
};

export default function Page({ params }: { params: { name: string } }) {
   const nameData = cookies().get("name");
   const name = cookies().get("name")?.value.toLowerCase();

   if (!nameData) {
      redirect("/user/login");
   }

   if (name === params.name) {
      redirect("/user/venues");
   }

   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Breadcrumbs
            breadcrumbs={[
               { label: "Home", href: "/" },
               { label: "Venues", href: "/venues" },
               {
                  label: `${params.name}`,
                  href: `/user/${params.name}`,
                  active: true,
               },
            ]}
         />
         <Hero
            heading="Profile"
            headingLevel={1}
            subheading={`${params.name}'s`}
         />

         <ProfileDetails name={params.name} />
      </main>
   );
}
