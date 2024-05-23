import { useEffect, useState } from "react";
import { UserProps, UseUserProps } from "@/app/lib/definitions";

const useUser = (): UseUserProps => {
   const [user, setUser] = useState<UserProps | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchUser() {
         const response = await fetch("/api/auth/user", {
            credentials: "include",
         });
         if (response.ok) {
            const json = await response.json();

            const userData = json.data;

            setUser(userData);
         } else {
            setUser(null);
         }
         setLoading(false);
      }
      fetchUser();
   }, []);

   return { user, loading };
};

export default useUser;
