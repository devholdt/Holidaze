"use client";

import { useState } from "react";
import { Button } from "@/app/ui/Buttons";
import { handleRegisterSubmit } from "@/app/lib/actions";
import Link from "next/link";

export default function RegistrationForm() {
   const [isChecked, setIsChecked] = useState(false);
   const handleChange = () => {
      setIsChecked(!isChecked);
   };

   return (
      <form
         className="w-full max-w-[320px]"
         onSubmit={(event) => handleRegisterSubmit(event, isChecked)}
      >
         <div className="mb-4">
            <label className="text-body" htmlFor="name">
               Name
            </label>
            <div className="relative">
               <input
                  className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Enter name"
               />
            </div>
         </div>
         <div className="mb-4">
            <label className="text-body" htmlFor="email">
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
         <div className="mb-4">
            <label className="text-body" htmlFor="password">
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
         <div className="mb-8">
            <label className="flex w-fit cursor-pointer items-center">
               <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleChange}
                  className="h-4 w-4 cursor-pointer"
                  name="venueManager"
                  id="venueManager"
                  value="venueManager"
               />
               <span className="ms-1">Register as Venue Manager</span>
            </label>
         </div>
         <Button text="Create account" styles="w-full" primary={false} />
         <div className="mt-4 w-full font-extralight tracking-wider">
            Already have an account? Login{" "}
            <Link
               href="/user/login"
               className="text-blue underline hover:font-medium"
            >
               here
            </Link>
         </div>
         <div className="alert-container"></div>
      </form>
   );
}
