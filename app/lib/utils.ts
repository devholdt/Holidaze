import { iconCheck, iconXmark } from "@/public/icons";

export const formatDate = (dateString: string, locale: string = "no-NO") => {
   const date = new Date(dateString);
   const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
   };
   const formatter = new Intl.DateTimeFormat(locale, options);
   return formatter.format(date);
};

export const formatNumber = (number: number, locale: string = "en-GB") => {
   const formatter = new Intl.NumberFormat(locale);
   return formatter.format(number);
};

export const alert = (
   type: "success" | "error",
   message: string,
   target: string
) => {
   const element = document.querySelector(target);

   if (element) {
      element.innerHTML = "";
   }

   const wrapper = document.createElement("div");

   let styles;
   let icon;

   if (type === "success") {
      icon = iconCheck;
      styles = "border-lightGreen border text-green";
   }

   if (type === "error") {
      icon = iconXmark;
      styles = "border-red border text-red";
   }

   if (wrapper) {
      wrapper.innerHTML = `
         <div class="mt-4 p-2 flex gap-2 w-full ${styles}">
            <p>
               ${icon}
            </p>
            <p class="text-wrap truncate">
               ${message}
            </p>
         </div>`;
   }

   if (element) {
      element.append(wrapper);
   }
};
