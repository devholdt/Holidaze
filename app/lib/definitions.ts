export interface Venue {
   id: string;
   name: string;
   description: string;
   media: { url: string; alt: string }[];
   price: number;
   maxGuests: number;
   rating: number;
}

export interface MenuItemProps {
   route: string;
   title: string;
}

export interface ModalsProps {
   modalContent: string;
   hideModal: () => void;
   logout: () => void;
}

export interface EditProfileMediaFormProps {
   type: string;
}

export type CreateBooking = {
   dateFrom: string;
   dateTo: string;
   guests: number;
   venueId: string;
};

export enum FormAction {
   Register = "register",
   Login = "login",
   Avatar = "avatar",
   Banner = "banner",
}
