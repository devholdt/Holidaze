import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BookingDetails from "@/app/ui/user/bookings/BookingDetails";
import Breadcrumbs from "@/app/ui/Breadcrumbs";

export const metadata: Metadata = {
   title: "Booking",
};

export default function Page({ params }: { params: { id: string } }) {
   const name = cookies().get("name");

   if (!name) {
      redirect("/user/login");
   }

   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <Breadcrumbs
            breadcrumbs={[
               { label: "Home", href: "/" },
               {
                  label: "Bookings",
                  href: "/user/bookings",
               },
               {
                  label: "Your booking",
                  href: `/user/bookings/${params.id}`,
                  active: true,
               },
            ]}
         />
         <BookingDetails id={params.id} />
      </main>
   );
}
