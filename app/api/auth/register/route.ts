import { NextRequest, NextResponse } from "next/server";

const registerUser = async (
   name: string,
   email: string,
   password: string,
   venueManager: boolean
) => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/auth/register`,
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ name, email, password, venueManager }),
      }
   );

   const json = await response.json();

   if (!response.ok) {
      const errorText = `${json.statusCode} (${json.status}) - ${json.errors[0].message}`;
      throw errorText;
   }

   return json;
};

export async function POST(req: NextRequest) {
   const { name, email, password, venueManager } = await req.json();

   try {
      const userData = await registerUser(name, email, password, venueManager);

      const response = NextResponse.json({
         message: `Registration successful! <br /> Welcome <strong>${userData.data.name}</strong>`,
         user: userData,
      });

      return response;
   } catch (error) {
      console.error("Authentication failed:", error);
      return NextResponse.json({ message: error }, { status: 401 });
   }
}
