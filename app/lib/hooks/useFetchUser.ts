import { useState, useEffect } from "react";
import { getUserByName } from "@/app/lib/data";
import { UserProps } from "@/app/lib/definitions";

const useFetchUser = (username: string): UserProps | null => {
   const [user, setUser] = useState<UserProps | null>(null);

   useEffect(() => {
      const fetchUser = async () => {
         try {
            if (username) {
               const loggedInUser = await getUserByName(username);
               setUser(loggedInUser);
            }
         } catch (error) {
            console.error("Error fetching user:", error);
         }
      };
      fetchUser();
   }, [username]);

   return user;
};

export default useFetchUser;
