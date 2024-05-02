import React from "react";
import { API_PATH } from "@/app/lib/constants";
import { FormAction } from "@/app/lib/definitions";

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
   action: FormAction,
   isChecked?: boolean
) => {
   event.preventDefault();

   const formData = new FormData(event.currentTarget);

   let formValues: { [key: string]: FormDataEntryValue | boolean } =
      Object.fromEntries(formData.entries());

   if (action === FormAction.Register) {
      formValues.venueManager = isChecked as boolean;
   }

   try {
      const response = await fetch(`${API_PATH}/auth/${[action]}`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formValues),
      });

      if (!response.ok) {
         const errorText = await response.text();
         throw new Error(`Failed to ${action}: ${errorText}`);
      }

      const data = await response.json();

      console.log(`User ${action} successfully: `, data);
      return data;
   } catch (error) {
      console.error(
         `An error occurred while submitting user ${action} form: `,
         error
      );
      throw error;
   }
};
