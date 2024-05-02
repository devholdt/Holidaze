export interface Venue {
   id: string;
   name: string;
   description: string;
   media: { url: string; alt: string }[];
   // media: Array<object>;
   price: number;
   maxGuests: number;
   rating: number;
}

export type CreateBooking = {
   dateFrom: string;
   dateTo: string;
   guests: number;
   venueId: string;
};
