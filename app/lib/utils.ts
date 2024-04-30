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
