import { useEffect, useState } from "react";

const useUser = () => {
   const [user, setUser] = useState<{ email: string } | null>(null);
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
