export interface VenueProps {
   id: string;
   name: string;
   description: string;
   media: { url: string; alt: string }[];
   price: number;
   rating: number;
   maxGuests: number;
   bookings: BookingProps[];
   meta: VenueMetaProps[];
}

export interface BookingProps {
   id: string;
   dateFrom: string;
   dateTo: string;
   guests: number;
   venue: VenueProps;
}
export interface VenueMetaProps {
   wifi: boolean;
   parking: boolean;
   breakfast: boolean;
   pets: boolean;
}

export interface VenueOwnerProps {
   name: string;
   email: string;
   bio: string;
   avatar: { url: string; alt: string };
   banner: { url: string; alt: string };
}

export interface MenuItemProps {
   route: string;
   title: string;
}

export interface BookingFormProps {
   venueId: string;
   maxGuests: number;
   bookedDates: { dateFrom: string; dateTo: string }[];
}

export interface ModalContentProps {
   modalContent: string;
   hideModal: () => void;
   logout?: () => void;
}

export interface ModalProps {
   modal: string;
   textContent: React.ReactNode;
   buttonStyles?: string;
}

export interface LogoutProps {
   hideModal: () => void;
}

export interface EditProfileMediaFormProps {
   type: string;
}

export interface CreateBookingProps {
   [key: string]: FormDataEntryValue | number;
}

export interface CreateVenueProps {
   name: string;
   description: string;
   media?: [{ url: string; alt: string }];
   price: number;
   maxGuests: number;
   rating?: number;
   meta: {
      wifi: boolean;
      parking: boolean;
      breakfast: boolean;
      pets: boolean;
   };
}

export enum FormAction {
   Register = "register",
   Login = "login",
   Avatar = "avatar",
   Banner = "banner",
}
