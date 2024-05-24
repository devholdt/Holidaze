import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

const fetchAllVenues = async () => {
   noStore();

   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/venues?_owner=true&_bookings=true&sort=created`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
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

const fetchVenuesByName = async (name: string, token: string) => {
   noStore();

   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/profiles/${name}/venues?_owner=true&_bookings=true`,
      {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
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

const createVenue = async (formValues: any, token: string) => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/venues`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
         },
         body: JSON.stringify(formValues),
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
   const { searchParams } = new URL(req.url);
   const name = searchParams.get("name");

   try {
      if (name) {
         if (!token) {
            return NextResponse.json(
               { message: "Unauthorized" },
               { status: 401 }
            );
         }

         const data = await fetchVenuesByName(name, token);
         return NextResponse.json(data);
      } else {
         const data = await fetchAllVenues();
         return NextResponse.json(data);
      }
   } catch (error) {
      return NextResponse.json({ error }, { status: 401 });
   }
}

export async function POST(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;

   if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   const formValues = await req.json();

   try {
      const newVenue = await createVenue(formValues, token);
      return NextResponse.json(newVenue);
   } catch (error: any) {
      return NextResponse.json({ error }, { status: 400 });
   }
}
