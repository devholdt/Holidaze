export async function logout() {
   const response = await fetch("/api/auth/logout", {
      method: "POST",
   });

   const json = await response.json();

   if (!response.ok) {
      const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
      throw new Error(errorText);
   }

   const data = json.data;

   return data;
}
