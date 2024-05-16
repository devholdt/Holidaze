"use client";

import { ManagerVenueListProps } from "@/app/lib/definitions";
import ManagerVenueCard from "@/app/ui/user/venues/ManagerVenueCard";
import { getItem } from "@/app/lib/storage";
import useFetchUser from "@/app/lib/hooks/useFetchUser";
import useFetchVenuesByUser from "@/app/lib/hooks/useFetchVenuesByUser";

const ManagerVenueList: React.FC<ManagerVenueListProps> = ({ name }) => {
   const managerName = name || getItem("name");
   const manager = useFetchUser(managerName);
   const { venues, loading } = useFetchVenuesByUser(managerName);

   if (loading) return <p className="mt-8 flex justify-center">Loading...</p>;

   if (venues.length === 0) {
      return (
         <div className="flex justify-center">
            <p className="mt-8">No venues created yet.</p>
         </div>
      );
   }

   return (
      <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
         {venues.map((venue) => (
            <ManagerVenueCard key={venue.id} venue={venue} manager={manager} />
         ))}
      </div>
   );
};

export default ManagerVenueList;
