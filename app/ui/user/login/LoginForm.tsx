"use client";

import { useState } from "react";
import Link from "next/link";
import { authenticate } from "@/app/lib/auth/authenticate";

export default function LoginForm() {
   const [errorMessage, setErrorMessage] = useState<string | null>(null);

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      try {
         const result = await authenticate(formData);
         setErrorMessage(null);
      } catch (error: any) {
         console.error("Authentication failed:", error);
         setErrorMessage(error);
      }
   };

   return (
      <form className="w-full max-w-[320px]" onSubmit={handleSubmit}>
         <div className="mb-4">
            <label className="text-dark" htmlFor="email">
               Email
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email"
               />
            </div>
         </div>
         <div className="mb-8">
            <label className="text-dark" htmlFor="password">
               Password
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
               />
            </div>
         </div>
         <div>{errorMessage && <p>{errorMessage}</p>}</div>
         <button
            className="w-full bg-green px-6 py-3 text-lg font-extralight uppercase tracking-widest text-white transition hover:bg-lightGreen"
            type="submit"
         >
            Login
         </button>
         <div className="mt-4 w-full font-extralight tracking-wider">
            Don&apos;t have an account? Register{" "}
            <Link
               href="/user/register"
               className="text-blue underline hover:font-medium"
            >
               here
            </Link>
         </div>
         <div className="alert-container"></div>
      </form>
   );
}
