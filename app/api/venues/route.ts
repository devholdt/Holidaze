import { NextRequest, NextResponse } from "next/server";

const fetchVenues = async (name: string, token: string) => {
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

   if (!response.ok) {
      throw new Error("Unauthorized");
   }

   const data = await response.json();
   return data;
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

   if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to create venue");
   }

   const data = await response.json();
   return data;
};

export async function GET(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;
   const { searchParams } = new URL(req.url);
   const name = searchParams.get("name");

   if (!token || !name) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   try {
      const data = await fetchVenues(name, token);
      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
      return NextResponse.json({ message: error.message }, { status: 400 });
   }
}
