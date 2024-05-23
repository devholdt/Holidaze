import { headers } from "@/app/lib/utils";

export async function signIn(email: string, password: string) {
   console.log("SignIn called with email and password:", email, password);
   const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: headers("application/json"),
      body: JSON.stringify({ email, password }),
   });

   const json = await response.json();

   console.log("SignIn response:", response, json);

   if (!response.ok) {
      const errorText = `${json.data.statusCode} (${json.data.status}) - ${json.data.errors[0].message}`;
      throw new Error(errorText);
   }

   return json;
}
