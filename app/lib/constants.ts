import { MenuItemProps } from "@/app/lib/definitions";

export const loggedOutMenuItems: MenuItemProps[] = [
   { title: "Register", route: "/user/register" },
   { title: "Log in", route: "/user/login" },
];

export const customerMenuItems: MenuItemProps[] = [
   { title: "Bookings", route: "/user/bookings" },
   { title: "Change avatar" },
   { title: "Change banner" },
   { title: "Log out" },
];

export const managerMenuItems: MenuItemProps[] = [
   { title: "Your venues", route: "/user/venues" },
   { title: "Create venue" },
   { title: "Bookings", route: "/user/bookings" },
   { title: "Change avatar" },
   { title: "Change banner" },
   { title: "Log out" },
];
