import React from "react";
import { API_PATH } from "@/app/lib/constants";
import { FormAction } from "@/app/lib/definitions";
import { setItem } from "@/app/lib/storage";
import { alert } from "@/app/lib/utils";

import { headers } from "@/app/lib/utils";

// export async function createBooking(request: Request) {
//    event?.preventDefault();

//    const formData = await request.formData();
//    const dateFrom = formData.get("dateFrom");
//    const dateTo = formData.get("dateTo");
//    const guests = formData.get("guests");

//    return Response.json({ dateFrom, dateTo, guests });
// }

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
      const response = await fetch(
         `${API_PATH}/auth/${[action]}?_holidaze=true`,
         {
            method: "POST",
            headers: headers("application/json"),
            body: JSON.stringify(formValues),
         }
      );

      if (!response.ok) {
         const errorText = await response.text();
         alert(
            "error",
            `An error occured (${response.status})`,
            ".alert-container"
         );
         throw new Error(`Failed to ${action}: ${errorText}`);
      }

      const json = await response.json();
      const user = json.data;

      if (action === FormAction.Login) {
         setItem({ key: "user", value: user });
         setItem({ key: "name", value: user.name });
         setItem({ key: "token", value: user.accessToken });

         alert(
            "success",
            `Login successful! <br /> Welcome back, <strong>${user.name}</strong>`,
            ".alert-container"
         );
      } else if (action === FormAction.Register) {
         try {
            const loginResponse = await fetch(
               `${API_PATH}/auth/login?_holidaze=true`,
               {
                  method: "POST",
                  headers: headers("application/json"),
                  body: JSON.stringify(formValues),
               }
            );

            if (!loginResponse.ok) {
               const errorText = await loginResponse.text();
               alert(
                  "error",
                  `An error occured (${loginResponse.status})`,
                  ".alert-container"
               );
               throw new Error(`Failed to automatically log in: ${errorText}`);
            }

            const user = await loginResponse.json();

            setItem({ key: "user", value: user.data });
            setItem({ key: "name", value: user.name });
            setItem({ key: "token", value: user.accessToken });

            alert(
               "success",
               `Registration successfull! <br /> Welcome, <strong>${user.name}</strong>`,
               ".alert-container"
            );
         } catch (error) {
            alert(
               "error",
               `An error occured when attempting to automatically log in. Please log in manually.`,
               ".alert-container"
            );
         }
      }

      setTimeout(() => {
         window.location.href = "/";
      }, 2000);

      return user;
   } catch (error) {
      console.error(
         `An error occurred while submitting user ${action} form: `,
         error
      );
      throw error;
   }
};

export const handleEditProfileMedia = async (
   event: React.FormEvent<HTMLFormElement>,
   action: FormAction
) => {
   event.preventDefault();

   if (action === FormAction.Avatar) {
      return alert(
         "success",
         "Avatar successfully changed",
         ".alert-container"
      );
   }

   if (action === FormAction.Banner) {
      return alert(
         "success",
         "Banner successfully changed",
         ".alert-container"
      );
   }
};
