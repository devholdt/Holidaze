import {
   loginSchema,
   registerSchema,
   venueSchema,
   editProfileSchema,
   bookingSchema,
   alert,
} from "@/app/lib/utils";
import { z } from "zod";
import Cookies from "js-cookie";

const fetchData = async (
   url: string,
   options: RequestInit,
   successMessage: string,
   redirectUrl: string
) => {
   try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (!response.ok) {
         const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
         alert("error", errorText, ".alert-container");
         throw new Error(errorText);
      }

      alert("success", successMessage, ".alert-container");
      setTimeout(() => {
         window.location.href = redirectUrl;
      }, 2000);
      return json.data;
   } catch (error: any) {
      alert("error", `${error}`, ".alert-container");
      throw error;
   }
};

const handleSubmit = async (
   event: React.FormEvent<HTMLFormElement>,
   schema: any,
   apiEndpoint: string,
   successMessage: string,
   redirectUrl: string,
   method: string = "POST",
   formType: string
) => {
   event.preventDefault();
   const formData = new FormData(event.currentTarget);
   const formEntries = Object.fromEntries(formData.entries());

   let formValues: any = {};

   switch (formType) {
      case "createVenue":
      case "editVenue":
         formValues = {
            name: formEntries.name as string,
            description: formEntries.description as string,
            media: [],
            price: Number(formEntries.price),
            maxGuests: Number(formEntries.maxGuests),
            rating: Number(formEntries.rating || 0),
            meta: {
               wifi: formEntries.wifi === "wifi",
               parking: formEntries.parking === "parking",
               breakfast: formEntries.breakfast === "breakfast",
               pets: formEntries.pets === "pets",
            },
            location: {
               city: formEntries.city as string,
               country: formEntries.country as string,
            },
         };

         if (formEntries.url || formEntries.alt) {
            formValues.media.push({
               url: formEntries.url ?? "",
               alt: formEntries.alt ?? "",
            });
         }
         break;

      case "createBooking":
      case "editBooking":
         formValues = {
            dateFrom: formEntries.dateFrom,
            dateTo: formEntries.dateTo,
            guests: Number(formEntries.guests),
            venueId: formEntries.venueId,
         };
         break;

      case "register":
         formValues = {
            name: formEntries.name as string,
            email: formEntries.email as string,
            password: formEntries.password as string,
            venueManager: formEntries.venueManager === "venueManager",
         };
         break;

      case "login":
         formValues = {
            email: formEntries.email as string,
            password: formEntries.password as string,
         };
         break;

      case "editProfileAvatar":
         formValues = {
            avatar: {
               url: formEntries.url as string,
               alt: formEntries.alt as string,
            },
         };
         break;

      case "editProfileBanner":
         formValues = {
            banner: {
               url: formEntries.url as string,
               alt: formEntries.alt as string,
            },
         };
         break;

      default:
         formValues = formEntries;
         break;
   }

   const dynamicSchema =
      formType === "editProfileAvatar" || formType === "editProfileBanner"
         ? z.object({
              [formType === "editProfileAvatar" ? "avatar" : "banner"]:
                 z.object({
                    url: z.string().url({ message: "Invalid URL" }),
                    alt: z.string().min(3, {
                       message: "Alt text must be at least 3 characters long",
                    }),
                 }),
           })
         : schema;

   const result = dynamicSchema.safeParse(formValues);

   if (!result.success) {
      const errorMessages = result.error.errors
         .map((error: any) => error.message)
         .join(", ");
      alert("error", `Validation error - ${errorMessages}`, ".alert-container");
      return;
   }

   try {
      const response = await fetch(apiEndpoint, {
         method,
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(formValues),
      });

      const json = await response.json();

      if (!response.ok) {
         const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
         alert("error", errorText, ".alert-container");
         throw new Error(errorText);
      }

      alert("success", successMessage, ".alert-container");

      if (formType === "register") {
         const loginResponse = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               email: formValues.email,
               password: formValues.password,
            }),
         });

         const loginJson = await loginResponse.json();

         if (!loginResponse.ok) {
            const errorText = `${loginJson.statusCode} (${loginJson.status}) - ${loginJson.errors[0].message}`;
            alert("error", errorText, ".alert-container");
            throw new Error(errorText);
         }

         alert(
            "success",
            "Successfully registered and logged in!",
            ".alert-container"
         );

         setTimeout(() => {
            window.location.href = redirectUrl;
         }, 2000);
      } else {
         setTimeout(() => {
            window.location.href = redirectUrl;
         }, 2000);
      }
   } catch (error: any) {
      alert("error", error.message, ".alert-container");
   }
};

export const handleRegisterSubmit = async (
   event: React.FormEvent<HTMLFormElement>,
   isChecked: boolean
) => {
   const formData = new FormData(event.currentTarget);
   formData.set("venueManager", isChecked ? "true" : "false");

   await handleSubmit(
      event,
      registerSchema,
      "/api/auth/register",
      "Successfully registered! <br /> Logging in...",
      "/",
      "POST",
      "register"
   );
};

export const handleLoginSubmit = async (
   event: React.FormEvent<HTMLFormElement>
) => {
   await handleSubmit(
      event,
      loginSchema,
      "/api/auth/login",
      "Successfully logged in! <br /> Welcome back!",
      "/",
      "POST",
      "login"
   );
};

export const createBooking = async (
   event: React.FormEvent<HTMLFormElement>
) => {
   await handleSubmit(
      event,
      bookingSchema,
      "/api/bookings",
      "Booking successfully created! <br /> Redirecting to bookings...",
      "/user/bookings",
      "POST",
      "createBooking"
   );
};

export const editBooking = async (
   event: React.FormEvent<HTMLFormElement>,
   id: string
) => {
   await handleSubmit(
      event,
      bookingSchema,
      `/api/bookings/${id}`,
      "Booking successfully edited! <br /> Redirecting to booking...",
      `/user/bookings/${id}`,
      "PUT",
      "editBooking"
   );
};

export const deleteBooking = async (id: string) => {
   if (confirm("Are you sure you want to delete this booking?") === true) {
      await fetchData(
         `/api/bookings/${id}`,
         {
            method: "DELETE",
         },
         "Booking successfully deleted! <br /> Redirecting to bookings...",
         "/user/bookings"
      );
   }
};

export const createVenue = async (event: React.FormEvent<HTMLFormElement>) => {
   await handleSubmit(
      event,
      venueSchema,
      "/api/venues",
      "Venue successfully created! <br /> Redirecting to venues...",
      "/user/venues",
      "POST",
      "createVenue"
   );
};

export const editVenue = async (
   event: React.FormEvent<HTMLFormElement>,
   id: string
) => {
   await handleSubmit(
      event,
      venueSchema,
      `/api/venues/${id}`,
      "Venue successfully edited! <br /> Redirecting to venue...",
      `/user/venues/${id}`,
      "PUT",
      "editVenue"
   );
};

export const deleteVenue = async (id: string) => {
   if (confirm("Are you sure you want to delete this venue?") === true) {
      await fetchData(
         `/api/venues/${id}`,
         {
            method: "DELETE",
         },
         "Venue successfully deleted! <br /> Redirecting to venues...",
         "/user/venues"
      );
   }
};

export const handleEditProfileAvatar = async (
   event: React.FormEvent<HTMLFormElement>
) => {
   const name = Cookies.get("name");
   await handleSubmit(
      event,
      editProfileSchema,
      `/api/user/${name}`,
      "Avatar image successfully changed!",
      "/",
      "PUT",
      "editProfileAvatar"
   );
};

export const handleEditProfileBanner = async (
   event: React.FormEvent<HTMLFormElement>
) => {
   const name = Cookies.get("name");
   await handleSubmit(
      event,
      editProfileSchema,
      `/api/user/${name}`,
      "Banner image successfully changed!",
      "/",
      "PUT",
      "editProfileBanner"
   );
};
