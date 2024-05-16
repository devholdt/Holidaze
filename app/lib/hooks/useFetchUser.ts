import { useState, useEffect } from "react";
import { getUserByName } from "@/app/lib/data";
import { UserProps } from "@/app/lib/definitions";

const useFetchUser = (username: string): UserProps | null => {
   const [user, setUser] = useState<UserProps | null>(null);

   useEffect(() => {
      const fetchUser = async () => {
         if (username) {
            const loggedInUser = await getUserByName(username);
            setUser(loggedInUser);
         }
      };
      fetchUser();
   }, [username]);

   return user;
};

export default useFetchUser;
