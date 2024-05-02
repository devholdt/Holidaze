import { API_URLS } from "@/app/lib/constants";

export async function createBooking(request: Request) {
   event?.preventDefault();

   const formData = await request.formData();
   const dateFrom = formData.get("dateFrom");
   const dateTo = formData.get("dateTo");
   const guests = formData.get("guests");

   return Response.json({ dateFrom, dateTo, guests });
}

export const handleSubmit = async (
   event: React.FormEvent<HTMLFormElement>,
   isChecked: boolean
) => {
   event.preventDefault();

   const formData = new FormData(event.currentTarget);
   const formValues: { [key: string]: FormDataEntryValue | boolean } =
      Object.fromEntries(formData.entries());
   formValues.venueManager = isChecked;

   try {
      const response = await fetch(API_URLS.REGISTER, {
         method: "POST",
         body: JSON.stringify(formValues),
         headers: {
            "Content-Type": "application/json",
         },
      });

      if (!response.ok) {
         throw new Error("Failed to submit the form.");
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("An error occurred while submitting the form: ", error);
   }
};
