import React from "react";
import { API_PATH, API_URLS } from "@/app/lib/constants";
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

      const json = await response.json();
      const booking = json.data;

      alert(
         "success",
         `Booking successful! <br /> <span class="font-light">Click <a href="/user/bookings/${booking.id}" class="underline font-medium">here</a> to view.</span>`,
         ".alert-container"
      );

      return booking;
   } catch (error) {
      console.error("An error occurred while creating a booking: ", error);
      throw error;
   }
};

export const editBooking = async (
   event: React.FormEvent<HTMLFormElement>,
   id: string
) => {
   event.preventDefault();

   const data = new FormData(event.currentTarget);
   const formValues: CreateBookingProps = Object.fromEntries(data.entries());

   formValues.guests = Number(formValues.guests);

   try {
      const response = await fetch(`${API_PATH}/holidaze/bookings/${id}`, {
         method: "PUT",
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
         throw new Error(`Failed to edit booking: ${errorText}`);
      }

      const json = await response.json();
      const booking = json.data;

      alert(
         "success",
         `Booking successfully edited! <br /> <span class="font-light">Click <a href="/user/bookings/${booking.id}" class="underline font-medium">here</a> to view.</span>`,
         ".alert-container"
      );

      return booking;
   } catch (error) {
      console.error("An error occurred while editing a booking: ", error);
      throw error;
   }
};

export const deleteBooking = async (id: string) => {
   if (confirm("Are you sure you want to delete this booking?") === true) {
      try {
         const response = await fetch(`${API_PATH}/holidaze/bookings/${id}`, {
            method: "DELETE",
            headers: headers("application/json"),
         });

         if (!response.ok) {
            const errorText = await response.text();
            alert(
               "error",
               `An error occured (${response.status})`,
               ".alert-container"
            );
            throw new Error(`Failed to delete booking: ${errorText}`);
         }

         alert("success", `Booking successfully deleted!`, ".alert-container");

         setTimeout(() => {
            window.location.href = "/";
         }, 2000);
      } catch (error) {
         console.error("An error occurred while deleting a booking: ", error);
         throw error;
      }
   }
};

export const createVenue = async (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();

   const data = new FormData(event.currentTarget);
   const formValues: CreateVenueProps = {
      name: data.get("name") as string,
      description: data.get("description") as string,
      media: [
         {
            url: (data.get("url") as string) || "",
            alt: (data.get("alt") as string) || "",
         },
      ],
      price: Number(data.get("price")),
      maxGuests: Number(data.get("maxGuests")),
      rating: Number(data.get("rating") || 0),
      meta: {
         wifi: data.get("wifi") === "wifi",
         parking: data.get("parking") === "parking",
         breakfast: data.get("breakfast") === "breakfast",
         pets: data.get("pets") === "pets",
      },
   };

   try {
      const response = await fetch(API_URLS.VENUES, {
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
         throw new Error(`Failed to create venue: ${errorText}`);
      }

      const json = await response.json();
      const venue = json.data;

      alert(
         "success",
         `Venue successfully created! <br /> <span class="font-light">Click <a href="/user/venues/${venue.id}" class="underline font-medium">here</a> to view.</span>`,
         ".alert-container"
      );

      return venue;
   } catch (error) {
      console.error("An error occurred while creating a venue: ", error);
   }
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
