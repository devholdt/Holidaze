import { NextRequest, NextResponse } from "next/server";

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

export async function PUT(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;
   const name = req.cookies.get("name")?.value;

   if (!token || !name) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   const formValues = await req.json();

   try {
      const data = await editUser(name, formValues, token);

      return NextResponse.json(data);
   } catch (error) {
      return NextResponse.json({ error }, { status: 401 });
   }
}
