import { StaticImageData } from "next/legacy/image";
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
      continent: string;
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
   _count: { venues: number; bookings: number };
}

export interface ManagerVenueCardProps {
   venue: VenueProps;
   user: UserProps;
}

export interface ManagerVenueListProps {
   name: string;
}

export interface BookingsTableProps {
   id: string;
   name: string;
   guests: string;
   dateFrom: string;
   dateTo: string;
}

export interface ThProps {
   children: React.ReactNode;
   reversed: boolean;
   sorted: boolean;
   onSort(): void;
}

export interface VenueListProps {
   listLimit?: number;
   venuePage?: boolean;
}

export interface VenueFilterProps {
   venues: VenueProps[];
   setFilteredVenues: React.Dispatch<React.SetStateAction<VenueProps[]>>;
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
   venues?: VenueProps[];
   bookings?: BookingProps[];
   _count?: {
      venues: number;
      bookings: number;
   };
}

export interface LoggedInUserProps {
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

export interface ProfileDetailsProps {
   name: string;
}
export interface BreadcrumbProps {
   label: string;
   href: string;
   active?: boolean;
}

export interface VenueCardBadgeProps {
   text: string;
   color?: string;
   variant?: string;
   icon: any;
}

export type SubheadingProps = {
   text: string;
   left?: string;
   right?: string;
};

export type ButtonProps = {
   text: string;
   styles?: string;
   primary?: boolean;
   onClick?: () => void;
};

export type LinkButtonProps = {
   text: string;
   fontSize?: string;
   styles?: string;
   primary?: boolean;
   targetHref: string;
   onClick?: () => void;
};

export type LogoProps = {
   src: string;
   width: number;
   height: number;
};

export type ImageSourceProps<T> = (
   entity: T | null
) => string | StaticImageData;

export interface DateRangeProps {
   dateRange: [Date | null, Date | null];
   setDateRange: (range: [Date | null, Date | null]) => void;
   bookedDates: { dateFrom: string; dateTo: string }[];
}

export type HeroProps = {
   heading: string;
   headingLevel: number;
   subheading?: string;
   text?: string;
   styles?: string;
};

export type FilterCategories = "continents" | "prices" | "ratings";
