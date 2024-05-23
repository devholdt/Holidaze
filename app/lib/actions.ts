import React from "react";
import { API_PATH, API_URLS } from "@/app/lib/constants";
import {
   FormAction,
   CreateBookingProps,
   CreateVenueProps,
   EditAvatarProps,
   EditBannerProps,
} from "@/app/lib/definitions";
import { setItem, getItem } from "@/app/lib/storage";
import { alert, headers } from "@/app/lib/utils";
import {
   loginSchema,
   registerSchema,
   venueSchema,
   editProfileSchema,
} from "@/app/lib/utils";
import { authenticate } from "@/app/lib/auth/authenticate";

export const handleLoginSubmit = async (
   event: React.FormEvent<HTMLFormElement>
) => {
   event.preventDefault();
   const formData = new FormData(event.currentTarget);

   const formValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
   };

   const result = loginSchema.safeParse(formValues);

   if (!result.success) {
      const errorMessages = result.error.errors
         .map((error: any) => error.message)
         .join(", ");
      alert("error", `Validation error - ${errorMessages}`, ".alert-container");
      return;
   }

   try {
      const response = await authenticate(formData);
      alert("success", response.message, ".alert-container");

      setTimeout(() => {
         location.href = "/";
      }, 2000);
   } catch (error: any) {
      alert("error", error.message, ".alert-container");
   }
};

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

      const json = await response.json();

      if (!response.ok) {
         const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
         alert("error", errorText, ".alert-container");
         throw new Error(errorText);
      }

      const booking = json.data;

      alert(
         "success",
         `Booking successful! <br /> <span class="font-light">Click <a href="/user/bookings/${booking.id}" class="underline font-medium">here</a> to view.</span>`,
         ".alert-container"
      );

      return booking;
   } catch (error) {
      alert("error", `${error}`, ".alert-container");
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

      const json = await response.json();

      if (!response.ok) {
         const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
         alert("error", errorText, ".alert-container");
         throw new Error(errorText);
      }

      const booking = json.data;

      alert("success", `Booking successfully edited!`, ".alert-container");

      setTimeout(() => {
         window.location.href = `/user/bookings/${booking.id}`;
      }, 2000);

      return booking;
   } catch (error) {
      alert("error", `${error}`, ".alert-container");
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

         const json = await response.json();

         if (!response.ok) {
            const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
            alert("error", errorText, ".alert-container");
            throw new Error(errorText);
         }

         alert("success", `Booking successfully deleted!`, ".alert-container");

         setTimeout(() => {
            window.location.href = "/user/bookings";
         }, 2000);
      } catch (error) {
         alert("error", `${error}`, ".alert-container");
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
      location: {
         city: data.get("city") as string,
         country: data.get("country") as string,
      },
   };

   const parsedValues = {
      name: formValues.name as string,
      description: formValues.description as string,
      price: formValues.price as number,
      maxGuests: formValues.maxGuests as number,
   };

   const result = venueSchema.safeParse(parsedValues);

   if (!result.success) {
      const errorMessages = result.error.errors
         .map((error: any) => error.message)
         .join(", ");
      alert("error", `Validation error - ${errorMessages}`, ".alert-container");
      return;
   }

   try {
      const response = await fetch(API_URLS.VENUES, {
         method: "POST",
         headers: headers("application/json"),
         body: JSON.stringify(result.data),
      });

      const json = await response.json();

      if (!response.ok) {
         const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
         alert("error", errorText, ".alert-container");
         throw new Error(errorText);
      }

      const venue = json.data;

      alert(
         "success",
         `Venue successfully created! <br /> <span class="font-light">Click <a href="/user/venues/${venue.id}" class="underline font-medium">here</a> to view.</span>`,
         ".alert-container"
      );

      return venue;
   } catch (error) {
      alert("error", `${error}`, ".alert-container");
      throw error;
   }
};

export const editVenue = async (
   event: React.FormEvent<HTMLFormElement>,
   id: string
) => {
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
      location: {
         city: data.get("city") as string,
         country: data.get("country") as string,
      },
   };

   const parsedValues = {
      name: formValues.name as string,
      description: formValues.description as string,
      price: formValues.price as number,
      maxGuests: formValues.maxGuests as number,
   };

   const result = venueSchema.safeParse(parsedValues);

   if (!result.success) {
      const errorMessages = result.error.errors
         .map((error: any) => error.message)
         .join(", ");
      alert("error", `Validation error - ${errorMessages}`, ".alert-container");
      return;
   }

   try {
      const response = await fetch(`${API_URLS.VENUES}/${id}`, {
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
         throw new Error(`Failed to edit venue: ${errorText}`);
      }

      const json = await response.json();
      const venue = json.data;

      alert("success", `Venue successfully edited!`, ".alert-container");

      setTimeout(() => {
         window.location.href = `/user/venues/${venue.id}`;
      }, 2000);

      return venue;
   } catch (error) {
      alert("error", `${error}`, ".alert-container");
      throw error;
   }
};

export const deleteVenue = async (id: string) => {
   if (confirm("Are you sure you want to delete this venue?") === true) {
      try {
         const response = await fetch(`${API_URLS.VENUES}/${id}`, {
            method: "DELETE",
            headers: headers("application/json"),
         });

         const json = await response.json();

         if (!response.ok) {
            const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
            alert("error", errorText, ".alert-container");
            throw new Error(errorText);
         }

         alert("success", `Venue successfully deleted!`, ".alert-container");

         setTimeout(() => {
            window.location.href = "/user/venues";
         }, 2000);
      } catch (error) {
         alert("error", `${error}`, ".alert-container");
         throw error;
      }
   }
};

export const handleUserRegistration = async (
   event: React.FormEvent<HTMLFormElement>,
   isChecked?: boolean
) => {
   event.preventDefault();

   const formData = new FormData(event.currentTarget);

   let formValues: { [key: string]: FormDataEntryValue | boolean } =
      Object.fromEntries(formData.entries());

   formValues.venueManager = isChecked as boolean;

   const parsedValues = {
      name: formValues.name as string,
      email: formValues.email as string,
      password: formValues.password as string,
      venueManager: formValues.venueManager as boolean,
   };

   const result = registerSchema.safeParse(parsedValues);

   if (!result.success) {
      const errorMessages = result.error.errors
         .map((error: any) => error.message)
         .join(", ");
      alert("error", `Validation error - ${errorMessages}`, ".alert-container");
      return;
   }

   try {
      const response = await fetch(`${API_PATH}/auth/register`, {
         method: "POST",
         headers: headers("application/json"),
         body: JSON.stringify(result.data),
      });

      const json = await response.json();

      if (!response.ok) {
         const errorText = `Error: ${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
         alert("error", errorText, ".alert-container");
         throw new Error(errorText);
      }

      const user = json.data;

      alert(
         "success",
         `Registration successfull! <br /> Welcome, <strong>${user.name}</strong>`,
         ".alert-container"
      );

      try {
         const loginResponse = await fetch(
            `${API_PATH}/auth/login?_holidaze=true`,
            {
               method: "POST",
               headers: headers("application/json"),
               body: JSON.stringify({
                  email: formValues.email,
                  password: formValues.password,
               }),
            }
         );

         const loginJson = await loginResponse.json();

         if (!loginResponse.ok) {
            const errorText = `${loginJson.statusCode} (${loginJson.status}) - ${loginJson.errors[0].message}`;
            alert("error", errorText, ".alert-container");
            throw new Error(`Failed to automatically log in: ${errorText}`);
         }

         const loginUser = loginJson.data;

         setItem({ key: "user", value: loginUser });
         setItem({ key: "name", value: loginUser.name });
         setItem({ key: "token", value: loginUser.accessToken });

         setTimeout(() => {
            window.location.href = "/";
         }, 2000);
      } catch (error) {
         alert(
            "error",
            `An error occured when attempting to automatically log in. Please log in manually.`,
            ".alert-container"
         );
         throw new Error(`${error}`);
      }

      return user;
   } catch (error) {
      alert(
         "error",
         "An error occured when attempting user registration",
         "alert-container"
      );
      throw new Error(
         `An error occured when attempting user registration: ${error}`
      );
   }
};

export const handleEditProfileMedia = async (
   event: React.FormEvent<HTMLFormElement>,
   action: FormAction
) => {
   event.preventDefault();

   const data = new FormData(event.currentTarget);

   if (action === FormAction.Avatar) {
      const formValues: EditAvatarProps = {
         avatar: {
            url: data.get("url") as string,
            alt: data.get("alt") as string,
         },
      };

      const parsedValues = {
         url: formValues.avatar.url as string,
         alt: formValues.avatar.alt as string,
      };

      const result = editProfileSchema.safeParse(parsedValues);

      if (!result.success) {
         const errorMessages = result.error.errors
            .map((error: any) => error.message)
            .join(", ");
         alert(
            "error",
            `Validation error - ${errorMessages}`,
            ".alert-container"
         );
         return;
      }

      try {
         const response = await fetch(
            `${API_URLS.PROFILES}/${getItem("name")}`,
            {
               method: "PUT",
               headers: headers("application/json"),
               body: JSON.stringify(formValues),
            }
         );

         const json = await response.json();

         if (!response.ok) {
            const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
            alert("error", errorText, ".alert-container");
            throw new Error(errorText);
         }

         const profile = json.data;

         alert(
            "success",
            "Avatar image successfully changed",
            ".alert-container"
         );

         setTimeout(() => {
            window.location.href = "/";
         }, 2000);

         return profile;
      } catch (error) {
         alert("error", `${error}`, ".alert-container");
         throw error;
      }
   }

   if (action === FormAction.Banner) {
      const formValues: EditBannerProps = {
         banner: {
            url: data.get("url") as string,
            alt: data.get("alt") as string,
         },
      };

      const parsedValues = {
         url: formValues.banner.url as string,
         alt: formValues.banner.alt as string,
      };

      const result = editProfileSchema.safeParse(parsedValues);

      if (!result.success) {
         const errorMessages = result.error.errors
            .map((error: any) => error.message)
            .join(", ");
         alert(
            "error",
            `Validation error - ${errorMessages}`,
            ".alert-container"
         );
         return;
      }

      try {
         const response = await fetch(
            `${API_URLS.PROFILES}/${getItem("name")}`,
            {
               method: "PUT",
               headers: headers("application/json"),
               body: JSON.stringify(formValues),
            }
         );

         const json = await response.json();

         if (!response.ok) {
            const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
            alert("error", errorText, ".alert-container");
            throw new Error(errorText);
         }

         const profile = json.data;

         alert(
            "success",
            "Banner image successfully changed",
            ".alert-container"
         );

         setTimeout(() => {
            window.location.href = "/";
         }, 2000);

         return profile;
      } catch (error) {
         alert("error", `${error}`, ".alert-container");
         throw error;
      }
   }
};
