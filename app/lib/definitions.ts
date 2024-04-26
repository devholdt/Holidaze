export interface Venue {
	id: string;
	name: string;
	description: string;
	price: number;
	media: { url: string; alt: string }[];
}
