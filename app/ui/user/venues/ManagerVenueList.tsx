"use client";

import { ManagerVenueListProps } from "@/app/lib/definitions";
import useFetchLoggedInUser from "@/app/lib/hooks/useFetchLoggedInUser";
import useFetchVenuesByUser from "@/app/lib/hooks/useFetchVenuesByUser";
import ManagerVenueCard from "@/app/ui/user/venues/ManagerVenueCard";

const ManagerVenueList: React.FC<ManagerVenueListProps> = ({ name }) => {
   const { user, loading: userLoading } = useFetchLoggedInUser();
   const { venues, loading: venuesLoading } = useFetchVenuesByUser(name);

   if (userLoading || venuesLoading) {
      return (
         <div className="my-12 flex flex-col items-center justify-center font-light">
            <p>Loading...</p>
         </div>
      );
   }

   if (!name) {
      return (
         <div className="my-12 flex flex-col items-center justify-center font-light">
            <p>No venue manager found.</p>
         </div>
      );
   }

   if (venues?.length === 0) {
      return (
         <div className="my-12 flex flex-col items-center justify-center font-light">
            <p>No venues created yet.</p>
         </div>
      );
   }

   return (
      <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2">
         {venues.map((venue) => (
            <ManagerVenueCard key={venue.id} venue={venue} user={user!} />
         ))}
      </div>
   );
};

export default ManagerVenueList;
