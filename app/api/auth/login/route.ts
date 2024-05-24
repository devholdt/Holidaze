import { NextRequest, NextResponse } from "next/server";
import { headers } from "@/app/lib/utils";

const loginUser = async (email: string, password: string) => {
   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_PATH}/auth/login?_holidaze=true`,
      {
         method: "POST",
         headers: headers("application/json"),
         body: JSON.stringify({ email, password }),
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
   const { email, password } = await req.json();

   try {
      const userData = await loginUser(email, password);

      const response = NextResponse.json({
         message: `Login successful! <br /> Welcome back <strong>${userData.data.name}</strong>`,
         user: userData,
      });

      response.cookies.set("user", JSON.stringify(userData.data), {
         path: "/",
         httpOnly: true,
         maxAge: 60 * 60 * 24 * 7,
      });

      response.cookies.set(
         "venueManager",
         JSON.stringify(userData.data.venueManager),
         {
            path: "/",
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
         }
      );

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
