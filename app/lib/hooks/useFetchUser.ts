import { useState, useEffect } from "react";
import { getUserByName } from "@/app/lib/data";
import { getItem } from "@/app/lib/storage";
import { UserProps } from "@/app/lib/definitions";

const useFetchUser = (): UserProps | null => {
   const [user, setUser] = useState<UserProps | null>(null);

   useEffect(() => {
      const fetchUser = async () => {
         const userName = getItem("name");
         if (userName) {
            const loggedInUser = await getUserByName(userName);
            setUser(loggedInUser);
         }
      };
      fetchUser();
   }, []);

   return user;
};

export default useFetchUser;
