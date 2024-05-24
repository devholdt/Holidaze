import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

const fetchLoggedInUser = async (name: string, token: string) => {
   noStore();

   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/profiles/${name}?_bookings=true&_venues=true`,
      {
         method: "GET",
         headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
         },
      }
   );
   const json = await response.json();

   if (!response.ok) {
      const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
      throw errorText;
   }

   return json;
};

export async function GET(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;
   const name = req.cookies.get("name")?.value;

   if (!token || !name) {
      return NextResponse.json(
         { message: "User is not logged in" },
         { status: 200 }
      );
   }

   try {
      const userData = await fetchLoggedInUser(name, token);
      return NextResponse.json(userData);
   } catch (error) {
      return NextResponse.json({ message: error }, { status: 401 });
   }
}
