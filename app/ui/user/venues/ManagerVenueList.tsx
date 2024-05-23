"use client";

import { ManagerVenueListProps } from "@/app/lib/definitions";
import useUser from "@/app/lib/hooks/useUser";
import useFetchVenuesByUser from "@/app/lib/hooks/useFetchVenuesByUser";
import ManagerVenueCard from "@/app/ui/user/venues/ManagerVenueCard";

const ManagerVenueList: React.FC<ManagerVenueListProps> = ({ name }) => {
   const { user, loading: userLoading } = useUser();
   const managerName = name;

   const { venues, loading: venuesLoading } = useFetchVenuesByUser();

   if (userLoading || venuesLoading) {
      return <p className="mt-8 flex justify-center">Loading...</p>;
   }

   if (!managerName) {
      return (
         <div className="flex flex-col items-center justify-center font-light">
            <p className="mt-8">No manager name found.</p>
         </div>
      );
   }

   if (venues?.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center font-light">
            <p className="mt-8">No venues created yet.</p>
         </div>
      );
   }

   return (
      <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
         {venues.map((venue) => (
            <ManagerVenueCard key={venue.id} venue={venue} manager={user!} />
         ))}
      </div>
   );
};

export default ManagerVenueList;
