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
