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

export const formatNumber = (num: number, digits: number = 1) => {
	const lookup = [
		{ value: 1, symbol: "" },
		{ value: 1e3, symbol: "k" },
		{ value: 1e6, symbol: "M" },
		{ value: 1e9, symbol: "G" },
		{ value: 1e12, symbol: "T" },
		{ value: 1e15, symbol: "P" },
		{ value: 1e18, symbol: "E" },
	];
	const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
	const item = lookup.findLast((item) => num >= item.value);
	return item
		? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
		: "0";
};

// temporary(?) price formatting function
export const formatPrice = (price: number) => {
	const maxPrice = 1e6;
	if (price > maxPrice) {
		price = maxPrice;
	}

	return price.toLocaleString("en-GB", {
		maximumFractionDigits: 2,
	});
};
