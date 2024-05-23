import { NextRequest, NextResponse } from "next/server";

const fetchBookings = async (name: string, token: string) => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/profiles/${name}/bookings?_customer=true&_venue=true`,
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

export async function GET(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;
   const name = req.cookies.get("name")?.value;

   if (!token || !name) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   try {
      const data = await fetchBookings(name, token);
      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
}
