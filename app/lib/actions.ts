import React from "react";
import { API_PATH } from "@/app/lib/constants";
import { FormAction } from "@/app/lib/definitions";
import { setItem } from "@/app/lib/storage";

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

      const user = await response.json();

      if (action === FormAction.Login) {
         setItem({ key: "user", value: user.data });
      }

      console.log(`User ${action} successfully: `, user.data);
      return user;
   } catch (error) {
      console.error(
         `An error occurred while submitting user ${action} form: `,
         error
      );
      throw error;
   }
};

export const handleChangeAvatar = async (
   event: React.FormEvent<HTMLFormElement>
   // action: FormAction
) => {
   event.preventDefault();

   console.log("Avatar change form submitted");

   // const formData = new FormData(event.currentTarget);

   // try {
   //    const response = await fetch(`${API_PATH}/auth/${[action]}`, {
   //       method: "POST",
   //       headers: { "Content-Type": "application/json" },
   //       body: JSON.stringify(Object.fromEntries(formData.entries())),
   //    });

   //    if (!response.ok) {
   //       const errorText = await response.text();
   //       throw new Error(`Failed to ${action}: ${errorText}`);
   //    }

   //    const user = await response.json();

   //    console.log(`User ${action} successfully: `, user.data);
   //    return user;
   // } catch (error) {
   //    console.error(
   //       `An error occurred while submitting user ${action} form: `,
   //       error
   //    );
   //    throw error;
   // }
};

export const handleChangeBanner = async (
   event: React.FormEvent<HTMLFormElement>
   // action: FormAction
) => {
   event.preventDefault();

   console.log("Banner change form submitted");

   // const formData = new FormData(event.currentTarget);

   // try {
   //    const response = await fetch(`${API_PATH}/auth/${[action]}`, {
   //       method: "POST",
   //       headers: { "Content-Type": "application/json" },
   //       body: JSON.stringify(Object.fromEntries(formData.entries())),
   //    });

   //    if (!response.ok) {
   //       const errorText = await response.text();
   //       throw new Error(`Failed to ${action}: ${errorText}`);
   //    }

   //    const user = await response.json();

   //    console.log(`User ${action} successfully: `, user.data);
   //    return user;
   // } catch (error) {
   //    console.error(
   //       `An error occurred while submitting user ${action} form: `,
   //       error
   //    );
   //    throw error;
   // }
};
