import { Metadata } from "next";
import BookingDetails from "@/app/ui/user/bookings/BookingDetails";

import Modal from "@/app/ui/Modal";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
   title: "Booking",
};

export default async function Page({ params }: { params: { id: string } }) {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col border-x border-lightGrey bg-background">
         <div className="absolute right-0 m-8">
            <Modal
               modal="Edit booking"
               textContent={<PencilSquareIcon className="w-6" />}
            />
         </div>
         <BookingDetails id={params.id} />
      </main>
   );
}
