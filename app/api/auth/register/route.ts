import { NextRequest, NextResponse } from "next/server";
import { headers } from "@/app/lib/utils";

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
         headers: headers("application/json"),
         body: JSON.stringify({ name, email, password, venueManager }),
      }
   );

   const data = await response.json();

   if (!response.ok) {
      const errorText = `${data.statusCode} (${data.status}) - ${data.errors[0].message}`;
      throw new Error(errorText);
   }

   return data;
};

export async function POST(req: NextRequest) {
   const { name, email, password, venueManager } = await req.json();

   try {
      const userData = await registerUser(name, email, password, venueManager);

      const response = NextResponse.json({
         message: `Registration successful! <br /> Welcome <strong>${userData.data.name}</strong>`,
         user: userData,
      });

      response.cookies.set("user", JSON.stringify(userData.data), {
         path: "/",
         httpOnly: true,
         maxAge: 60 * 60 * 24 * 7,
      });

      response.cookies.set("accessToken", userData.data.accessToken, {
         path: "/",
         httpOnly: true,
         maxAge: 60 * 60 * 24 * 7,
      });

      response.cookies.set("name", userData.data.name, {
         path: "/",
         maxAge: 60 * 60 * 24 * 7,
      });

      return response;
   } catch (error) {
      console.error("Authentication failed:", error);
      return NextResponse.json(
         { message: "Invalid credentials" },
         { status: 401 }
      );
   }
}
