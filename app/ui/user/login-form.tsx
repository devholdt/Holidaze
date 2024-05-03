"use client";

import { Button } from "@/app/ui/buttons";
import Link from "next/link";
import { handleSubmit } from "@/app/lib/actions";
import { FormAction } from "@/app/lib/definitions";

export default function LoginForm() {
   return (
      <form
         className="w-full max-w-[320px]"
         onSubmit={(event) => handleSubmit(event, FormAction.Login)}
      >
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
                  required
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
                  required
                  minLength={6}
               />
            </div>
         </div>
         <Button text="Login" styles="w-full" primary={false} />
         <div className="mt-4 w-full font-extralight tracking-wider">
            Don't have an account? Register{" "}
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
