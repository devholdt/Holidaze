"use client";

import { MenuItemProps } from "@/app/lib/definitions";

export const API_PATH = "https://v2.api.noroff.dev";

export const API_URLS = {
   REGISTER: `${API_PATH}/auth/register`,
   LOGIN: `${API_PATH}/auth/login`,
   PROFILES: `${API_PATH}/holidaze/profiles`,
   VENUES: `${API_PATH}/holidaze/venues`,
   BOOKINGS: `${API_PATH}/holidaze/bookings`,
};

export const loggedOutMenuItems: MenuItemProps[] = [
   { title: "Register", route: "/user/register" },
   { title: "Log in", route: "/user/login" },
   { title: "Contact us", route: "/contact" },
];

export const customerMenuItems: MenuItemProps[] = [
   { title: "Bookings", route: "/user/bookings" },
   { title: "Change avatar" },
   { title: "Change banner" },
   { title: "Log out" },
   { title: "Contact us", route: "/contact" },
];

export const managerMenuItems: MenuItemProps[] = [
   { title: "Your venues", route: "/user/venues" },
   { title: "Bookings", route: "/user/bookings" },
   { title: "Change avatar" },
   { title: "Change banner" },
   { title: "Log out" },
   { title: "Contact us", route: "/contact" },
];
