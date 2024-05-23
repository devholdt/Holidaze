import { NextRequest, NextResponse } from "next/server";

const fetchUserData = async (name: string, token: string) => {
   const response = await fetch(
      process.env.NEXT_PUBLIC_API_PATH + `/holidaze/profiles/${name}`,
      {
         method: "GET",
         headers: {
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
      const userData = await fetchUserData(name, token);
      return NextResponse.json(userData);
   } catch (error) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
}
