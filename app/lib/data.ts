import { API_PATH, API_URLS } from "@/app/lib/constants";
import { getItem } from "@/app/lib/storage";
import { headers } from "@/app/lib/utils";

export async function getVenues() {
   try {
      const data = await fetch(API_URLS.VENUES, {
         next: { revalidate: 10 },
      });

      return data.json();
   } catch (error) {
      console.error("An error occured while fetching venues data: ", error);
      throw new Error("Failed to fetch venues data.");
   }
}

export async function getVenueById(id: string) {
   try {
      const data = await fetch(`${API_URLS.VENUES}/${id}`, {
         next: { revalidate: 10 },
      });

      return data.json();
   } catch (error) {
      console.error("An error occured while fetching venue data: ", error);
      throw new Error("Failed to fetch venue data.");
   }
}

export async function getLoggedInUser() {
   const url = `${API_PATH}/holidaze/profiles/${getItem("name")}`;
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
      console.log(
         "An error occured when fetching logged in user data: ",
         error
      );
   }
}
