"use client";

import { useState, useEffect } from "react";
import { getLoggedInUser } from "@/app/lib/data";
import { UserProps } from "@/app/lib/definitions";

const useFetchLoggedInUser = (): UserProps | null => {
   const [user, setUser] = useState<UserProps | null>(null);

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const loggedInUser = await getLoggedInUser();
            setUser(loggedInUser);
         } catch (error) {
            console.error("Error fetching user:", error);
         }
      };

      fetchUser();
   }, []);

   return user;
};

export default useFetchLoggedInUser;
