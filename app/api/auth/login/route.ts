import { NextRequest, NextResponse } from "next/server";
import { headers } from "@/app/lib/utils";

const authenticateUser = async (email: string, password: string) => {
   const response = await fetch(
      process.env.NEXT_PUBLIC_API_PATH + "/auth/login?_holidaze=true",
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
   console.log("Login API called with email and password:", {
      email,
      password,
   });

   try {
      const userData = await authenticateUser(email, password);

      const response = NextResponse.json({
         message: "Login successful",
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
      console.log("Login API userData:", userData);
      return response;
   } catch (error) {
      console.log("Login API error:", error);
      return NextResponse.json(
         { message: "Invalid credentials" },
         { status: 401 }
      );
   }
}
