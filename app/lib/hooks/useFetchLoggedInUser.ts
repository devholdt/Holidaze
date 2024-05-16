import { useState, useEffect } from "react";
import { getLoggedInUser } from "@/app/lib/data";
import { UserProps } from "@/app/lib/definitions";

const useFetchLoggedInUser = (): UserProps | null => {
   const [user, setUser] = useState<UserProps | null>(null);

   useEffect(() => {
      const fetchUser = async () => {
         const loggedInUser = await getLoggedInUser();
         setUser(loggedInUser);
      };

      fetchUser();
   }, []);

   return user;
};

export default useFetchLoggedInUser;
