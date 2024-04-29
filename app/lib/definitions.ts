export interface Venue {
	id: string;
	name: string;
	description: string;
	price: number;
	media: { url: string; alt: string }[];
	maxGuests: number;
}

export type CreateBooking = {
	dateFrom: string;
	dateTo: string;
	guests: number;
	venueId: string;
};
