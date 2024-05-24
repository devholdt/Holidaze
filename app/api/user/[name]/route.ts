import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

const fetchUserByName = async (name: string, token: string) => {
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

const editUser = async (name: string, formValues: any, token: string) => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/profiles/${name}`,
      {
         method: "PUT",
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
   const name = req.cookies.get("name")?.value;

   if (!token || !name) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   try {
      const userData = await fetchUserByName(name, token);
      return NextResponse.json(userData);
   } catch (error) {
      return NextResponse.json({ message: error }, { status: 401 });
   }
}

export async function PUT(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;
   const name = req.cookies.get("name")?.value;

   if (!token || !name) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   try {
      const data = await editUser(name, req.body, token);

      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json({ error }, { status: 401 });
   }
}
