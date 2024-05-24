import { NextResponse } from "next/server";

export async function POST() {
   const response = NextResponse.json({ message: "Logout successful" });
   response.cookies.set("accessToken", "", {
      path: "/",
      httpOnly: true,
      maxAge: 0,
   });
   response.cookies.set("name", "", { path: "/", maxAge: 0 });
   response.cookies.set("user", "", { path: "/", maxAge: 0 });
   response.cookies.set("venueManager", "", { path: "/", maxAge: 0 });
   return response;
}
