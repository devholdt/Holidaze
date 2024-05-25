"use client";

import { useState, useEffect } from "react";
import { UserProps } from "@/app/lib/definitions";

const useFetchUserByName = (name: string) => {
   const [user, setUser] = useState<UserProps | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchUser() {
         const response = await fetch(`/api/user/${name}`, {
            credentials: "include",
         });
         const json = await response.json();

         if (json.message === "User not found") {
            setUser(null);
         } else if (response.ok) {
            const userData = json.data;

            setUser(userData);
         } else {
            setUser(null);
         }
         setLoading(false);
      }
      fetchUser();
   }, [name]);

   return { user, loading };
};

export default useFetchUserByName;
