import { StaticImageData } from "next/image";
export interface VenueProps {
   id: string;
   name: string;
   description: string;
   media: { url: string; alt: string }[];
   price: number;
   rating: number;
   maxGuests: number;
   bookings: BookingProps[];
   meta: {
      wifi: boolean;
      parking: boolean;
      breakfast: boolean;
      pets: boolean;
   };
   owner: VenueOwnerProps;
   location: {
      city: string;
      country: string;
   };
   created: string;
   href: string;
}

export interface BookingProps {
   id: string;
   dateFrom: string;
   dateTo: string;
   created: string;
   guests: number;
   customer: {
      avatar: {
         url: string;
         alt: string;
      };
      banner: {
         url: string;
         alt: string;
      };
      name: string;
      email: string;
   };
   venue: VenueProps;
}

export interface BookingCardProps {
   booking: BookingProps;
   user: UserProps;
}

export interface BookingListProps {
   name: string;
}

export interface VenueOwnerProps {
   name: string;
   email: string;
   bio: string;
   avatar: { url: string; alt: string };
   banner: { url: string; alt: string };
}

export interface ManagerVenueCardProps {
   venue: VenueProps;
   user: UserProps;
}

export interface ManagerVenueListProps {
   name: string;
}

export interface VenueListProps {
   listLimit?: number;
   venuePage?: boolean;
}

export interface MenuItemProps {
   title: string;
   route?: string;
}

export interface UserProps {
   name: string;
   email: string;
   avatar?: { url: string; alt: string };
   banner?: { url: string; alt: string };
   venueManager: boolean;
   accessToken: string;
}

export interface UseUserProps {
   user: UserProps | null;
   loading: boolean;
}

export interface UserDetailsProps {
   user: UserProps;
}

export interface BookingFormProps {
   venueId: string;
   maxGuests: number;
   bookedDates: { dateFrom: string; dateTo: string }[];
}

export interface ModalContentProps {
   modalContent: string;
   hideModal: () => void;
   id?: string;
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
   action: FormAction;
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
   location: {
      city: string;
      country: string;
   };
}

export interface EditAvatarProps {
   avatar: {
      url: string;
      alt: string;
   };
}

export interface EditBannerProps {
   banner: {
      url: string;
      alt: string;
   };
}

export interface BreadcrumbProps {
   label: string;
   href: string;
   active?: boolean;
}

export type SubheadingProps = {
   text: string;
   left?: string;
   right?: string;
};

export type ImageSourceProps<T> = (
   entity: T | null
) => string | StaticImageData;

export type DateRangeProps = {
   dateRange: [Date | null, Date | null];
   setDateRange: (update: [Date | null, Date | null]) => void;
   bookedDates?: { dateFrom: string; dateTo: string }[];
};

export type HeroProps = {
   heading: string;
   headingLevel: number;
   subheading?: string;
   text?: string;
   styles?: string;
};

export enum FormAction {
   Register = "register",
   Login = "login",
   Avatar = "avatar",
   Banner = "banner",
}
