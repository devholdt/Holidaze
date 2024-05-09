import React from "react";
import { API_PATH } from "@/app/lib/constants";
import {
   FormAction,
   CreateBookingProps,
   CreateVenueProps,
} from "@/app/lib/definitions";
import { setItem } from "@/app/lib/storage";
import { alert, headers } from "@/app/lib/utils";

export const createBooking = async (
   event: React.FormEvent<HTMLFormElement>
) => {
   event.preventDefault();

   const data = new FormData(event.currentTarget);
   const formValues: CreateBookingProps = Object.fromEntries(data.entries());

   formValues.guests = Number(formValues.guests);

   try {
      const response = await fetch(`${API_PATH}/holidaze/bookings`, {
         method: "POST",
         headers: headers("application/json"),
         body: JSON.stringify(formValues),
      });

      if (!response.ok) {
         const errorText = await response.text();
         alert(
            "error",
            `An error occured (${response.status})`,
            ".alert-container"
         );
         throw new Error(`Failed to create booking: ${errorText}`);
      }

      alert(
         "success",
         `Booking successful! <br /> <span class="font-light">Click <a href="/user/bookings" class="underline font-medium">here</a> to view your bookings.</span>`,
         ".alert-container"
      );

      const json = await response.json();
      const booking = json.data;

      return booking;
   } catch (error) {
      console.error("An error occurred while creating a booking: ", error);
      throw error;
   }
};

export const createVenue = async (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();

   const data = new FormData(event.currentTarget);

   const formValues: CreateVenueProps = {
      name: "",
      description: "",
      media: [{ url: "", alt: "" }],
      price: 0,
      maxGuests: 0,
      rating: 0,
      meta: {
         wifi: false,
         parking: false,
         breakfast: false,
         pets: false,
      },
   };

   formValues.name = data.get("name") as string;
   formValues.description = data.get("description") as string;
   formValues.media[0].url = data.get("url") as string;
   formValues.media[0].alt = data.get("alt") as string;
   formValues.price = Number(data.get("price"));
   formValues.maxGuests = Number(data.get("maxGuests"));
   formValues.rating = Number(data.get("rating"));
   formValues.meta.wifi = Boolean(data.get("wifi"));
   formValues.meta.parking = Boolean(data.get("parking"));
   formValues.meta.breakfast = Boolean(data.get("breakfast"));
   formValues.meta.pets = Boolean(data.get("pets"));

   console.log(formValues);
};

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
