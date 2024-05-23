import { NextRequest, NextResponse } from "next/server";

const fetchBooking = async (id: string, token: string) => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/bookings/${id}?_customer=true&_venue=true`,
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

const editBooking = async (id: string, formValues: any, token: string) => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/holidaze/bookings/${id}`,
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

   const data = await response.json();

   if (!response.ok) {
      throw new Error(data.message || "Failed to edit booking");
   }

   return data;
};

export async function GET(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;
   const id = req.url.split("/").pop();

   if (!token || !id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   try {
      const data = await fetchBooking(id, token);
      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
}

export async function PUT(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;
   const id = req.url.split("/").pop();

   if (!token || !id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   const formValues = await req.json();

   console.log("Form values received:", formValues);

   try {
      const editedBooking = await editBooking(id, formValues, token);
      return NextResponse.json(editedBooking);
   } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
   }
}
