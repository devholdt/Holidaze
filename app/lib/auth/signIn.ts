import { headers } from "@/app/lib/utils";

export async function signIn(provider: string, formData: FormData) {
   if (provider !== "credentials") {
      throw new Error("Unsupported provider");
   }

   const email = formData.get("email") as string;
   const password = formData.get("password") as string;

   if (!email || !password) {
      throw new Error("Email and password are required");
   }

   const response = await fetch(
      process.env.NEXT_PUBLIC_API_PATH + "/auth/login?_holidaze=true",
      {
         method: "POST",
         headers: headers("application/json"),
         body: JSON.stringify({ email, password }),
      }
   );

   const json = await response.json();

   if (!response.ok) {
      const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
      throw new Error(errorText);
   }

   const user = json.data;

   return user;
}
