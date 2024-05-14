import { API_URLS } from "@/app/lib/constants";
import { getItem } from "@/app/lib/storage";
import { headers } from "@/app/lib/utils";

export async function getVenues() {
   try {
      const response = await fetch(
         `${API_URLS.VENUES}?_owner=true&_bookings=true&sort=created`,
         {
            next: { revalidate: 10 },
         }
      );

      const json = await response.json();
      const data = json.data;

      return data;
   } catch (error) {
      console.error("An error occured while fetching venues data: ", error);
      throw new Error("Failed to fetch venues data.");
   }
}

export async function getVenueById(id: string) {
   const url = `${API_URLS.VENUES}/${id}?_owner=true&_bookings=true`;

   try {
      const response = await fetch(url, {
         next: { revalidate: 10 },
      });

      const json = await response.json();
      const data = json.data;

      return data;
   } catch (error) {
      console.error("An error occured while fetching venue data: ", error);
      throw new Error("Failed to fetch venue data.");
   }
}

export async function getLoggedInUser() {
   const url = `${API_URLS.PROFILES}/${getItem("name")}`;
   const options = {
      method: "GET",
      headers: headers("application/json"),
   };

   try {
      const response = await fetch(url, options);

      const json = await response.json();
      const data = json.data;

      return data;
   } catch (error) {
      console.error("An error occured while fetching logged in user: ", error);
      throw new Error("Failed to fetch logged in user.");
   }
}

export async function getProfileBookings() {
   const url = `${API_URLS.PROFILES}/${getItem("name")}/bookings?_venue=true`;
   const options = {
      method: "GET",
      headers: headers("application/json"),
   };

   try {
      const response = await fetch(url, options);
      const json = await response.json();

      return json.data || [];
   } catch (error) {
      console.error(
         "An error occured while fetching profile bookings: ",
         error
      );
      throw new Error("Failed to fetch profile bookings.");
   }
}

export async function getBookingById(id: string) {
   const url = `${API_URLS.BOOKINGS}/${id}?_customer=true&_venue=true`;
   const options = {
      method: "GET",
      headers: headers("application/json"),
   };

   try {
      const response = await fetch(url, options);

      const json = await response.json();
      const data = json.data;

      return data;
   } catch (error) {
      console.error("An error occured while fetching booking data: ", error);
      throw new Error("Failed to fetch booking data.");
   }
}

export async function getManagerVenues() {
   const url = `${API_URLS.PROFILES}/${getItem("name")}/venues?_bookings=true&_owner=true`;
   const options = {
      method: "GET",
      headers: headers("application/json"),
   };

   try {
      const response = await fetch(url, options);
      const json = await response.json();

      return json.data || [];
   } catch (error) {
      console.error("An error occured while fetching manager venues: ", error);
      throw new Error("Failed to fetch manager venues.");
   }
}
