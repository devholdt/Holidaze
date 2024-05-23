export async function loginAuth(formData: FormData) {
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
      throw new Error(json.message || "Invalid credentials");
   }

   return json;
}

export async function registerAuth(formData: FormData, isChecked: boolean) {
   const name = formData.get("name") as string;
   const email = formData.get("email") as string;
   const password = formData.get("password") as string;

   if (!name || !email || !password) {
      throw new Error("Name, email and password are required");
   }

   const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, venueManager: isChecked }),
   });

   const json = await response.json();

   if (!response.ok) {
      throw new Error(json.message || "Invalid credentials");
   }

   return json;
}
