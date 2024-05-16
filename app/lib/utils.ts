import { iconCheck, iconXmark } from "@/public/icons";
import { getItem } from "@/app/lib/storage";
import { StaticImageData } from "next/image";
import backgroundReflection from "@/public/background-reflection.jpg";

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
   const localDate = new Date(date);
   return localDate;
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

export const headers = (contentType: string) => {
   const token = getItem("token");
   const headers: { [key: string]: string } = {};

   if (contentType) {
      headers["Content-Type"] = contentType;
   }

   if (token) {
      headers.Authorization = `Bearer ${token}`;
      headers["X-Noroff-API-Key"] = process.env.NEXT_PUBLIC_API_KEY as string;
   }

   return headers;
};

export const defaultImgSrc = (entity: any): string | StaticImageData => {
   return entity?.media?.[0]?.url || backgroundReflection;
};
