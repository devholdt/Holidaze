import { iconCheck, iconXmark } from "@/public/icons";
import { StaticImageData } from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";
import { BookingProps, VenueProps } from "@/app/lib/definitions";
import { z } from "zod";

export const loginSchema = z.object({
   email: z.string().email({ message: "Invalid email address" }),
   password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerSchema = z.object({
   name: z
      .string()
      .min(4, { message: "Name must be at least 4 characters long" })
      .refine((name) => /^[a-zA-Z0-9_]*$/.test(name), {
         message:
            "Name can only contain alphanumeric characters and underscores",
      }),
   email: z
      .string()
      .email({ message: "Invalid email address" })
      .refine((email) => email.endsWith("@stud.noroff.no"), {
         message: "Email must be a valid Noroff student email address",
      }),
   password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
});

export const venueSchema = z.object({
   name: z
      .string()
      .min(5, { message: "Name must be at least 5 characters long" }),
   description: z
      .string()
      .min(5, { message: "Description must be at least 5 characters long" }),
   price: z
      .number()
      .gte(1, { message: "Price must be at least 1" })
      .lte(10000, { message: "Price must be at most 10000" }),
   maxGuests: z
      .number()
      .gte(1, { message: "At least 1 guest is required" })
      .lte(100, { message: "At most 100 guests are allowed" }),
});

export const bookingSchema = z.object({
   dateFrom: z.string().min(10, { message: "Invalid date" }),
   dateTo: z.string().min(10, { message: "Invalid date" }),
   guests: z.number().min(1, { message: "At least 1 guest is required" }),
});

export const editProfileSchema = z.object({
   url: z.string().url({ message: "Invalid URL" }),
   alt: z
      .string()
      .min(3, { message: "Alt text must be at least 3 characters long" }),
});

export const formatDate = (
   dateString: string,
   formatOptions: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
   },
   locale: string = "en-GB"
) => {
   const date = new Date(dateString);
   const formatter = new Intl.DateTimeFormat(locale, formatOptions);
   return formatter.format(date);
};

export const formatDateISO = (date: Date | null) => {
   if (!date) return "";
   return date.toISOString();
};

export const formatNumber = (number: number, locale: string = "en-GB") => {
   const formatter = new Intl.NumberFormat(locale);
   return formatter.format(number);
};

export const getTomorrowDate = () => {
   const tomorrow = new Date();
   tomorrow.setDate(tomorrow.getDate() + 1);
   return tomorrow;
};

export const alert = (
   type: "success" | "error" | "hidden",
   message: string,
   target: string
) => {
   const element = document.querySelector(target);

   if (element) {
      element.innerHTML = "";
   }

   const wrapper = document.createElement("div");

   let textContent;
   let styles;
   let icon;

   if (type === "success") {
      textContent = message;
      icon = iconCheck;
      styles = "inline-block border-lightGreen border text-green";
   }

   if (type === "error") {
      textContent = message;
      icon = iconXmark;
      styles = "inline-block border-red border text-red";
   }

   if (wrapper) {
      wrapper.innerHTML = `
         <div class="mt-4 p-2 flex gap-2 w-full ${styles}">
            <p>
               ${icon}
            </p>
            <p class="text-wrap truncate">
               ${textContent}
            </p>
         </div>`;
   }

   if (element) {
      element.append(wrapper);
   }
};

export const defaultImgSrc = (
   entity: BookingProps | VenueProps | null
): string | StaticImageData => {
   if (!entity) {
      return backgroundReflection;
   }

   if ("venue" in entity) {
      return entity.venue.media?.[0]?.url || backgroundReflection;
   } else {
      return entity.media?.[0]?.url || backgroundReflection;
   }
};
