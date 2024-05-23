import { NextRequest, NextResponse } from "next/server";

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

   const data = await response.json();

   if (!response.ok) {
      throw new Error(data.message || "Failed to edit venue");
   }

   return data;
};

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
      return NextResponse.json({ message: error.message }, { status: 400 });
   }
}
