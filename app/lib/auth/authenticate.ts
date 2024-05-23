export async function authenticate(formData: FormData) {
   const email = formData.get("email") as string;
   const password = formData.get("password") as string;

   if (!email || !password) {
      throw new Error("Email and password are required");
   }

   const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
   });

   const json = await response.json();

   if (!response.ok) {
      const errorText = `${json.data.statusCode} (${json.data.status}) - ${json.data.errors[0].message}`;
      throw new Error(errorText);
   }

   return json;
}
