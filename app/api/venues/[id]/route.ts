import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

const fetchVenue = async (id: string) => {
   noStore();

   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/venues/${id}?_bookings=true&_owner=true`,
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

const editVenue = async (id: string, formValues: any, token: string) => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/venues/${id}`,
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

const deleteVenue = async (id: string, token: string) => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/venues/${id}`,
      {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": process.env.NEXT_PUBLIC_API_KEY as string,
         },
      }
   );

   if (response.status !== 204) {
      const json = await response.json();
      const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
      throw errorText;
   }
};

export async function GET(req: NextRequest) {
   const id = req.url.split("/").pop();

   if (!id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   try {
      const data = await fetchVenue(id);

      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json({ error }, { status: 401 });
   }
}

export async function PUT(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;
   const id = req.url.split("/").pop();

   if (!token || !id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   const formValues = await req.json();

   try {
      const editedVenue = await editVenue(id, formValues, token);

      return NextResponse.json(editedVenue);
   } catch (error: any) {
      return NextResponse.json({ message: error }, { status: 400 });
   }
}

export async function DELETE(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;
   const id = req.url.split("/").pop();

   if (!token || !id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   try {
      await deleteVenue(id, token);
      return NextResponse.json({ message: "Venue successfully deleted" });
   } catch (error: any) {
      return NextResponse.json({ error }, { status: 400 });
   }
}
