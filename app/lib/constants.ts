import { MenuItemProps } from "@/app/lib/definitions";

export const API_PATH = "https://v2.api.noroff.dev";
export const API_KEY = "7ee005c4-b2c3-4375-b4ae-9096afdc9e35";

export const API_URLS = {
   REGISTER: `${API_PATH}/auth/register`,
   LOGIN: `${API_PATH}/auth/login`,
   PROFILES: `${API_PATH}/holidaze/profiles`,
   VENUES: `${API_PATH}/holidaze/venues`,
   BOOKINGS: `${API_PATH}/holidaze/bookings`,
};

export const menuItems: MenuItemProps[] = [
   { title: "Register", route: "/user/register" },
   { title: "Log in", route: "/user/login" },
   { title: "Contact us", route: "/contact" },
];

export const loggedInMenuItems: MenuItemProps[] = [
   { title: "Bookings", route: "/user/bookings" },
   { title: "Venues", route: "/user/venues" },
   { title: "Change avatar", route: "/user/avatar" },
   { title: "Change banner", route: "/user/banner" },
   { title: "Log out", route: "/user/logout" },
   { title: "Contact us", route: "/contact" },
];
