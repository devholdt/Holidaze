import { headers } from "@/app/lib/utils";

export async function signIn(email: string, password: string) {
   const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: headers("application/json"),
      body: JSON.stringify({ email, password }),
   });

   const json = await response.json();

   if (!response.ok) {
      const errorText = `${json.data.statusCode} (${json.data.status}) - ${json.data.errors[0].message}`;
      throw new Error(errorText);
   }

   return json;
}
