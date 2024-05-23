"use client";

import Link from "next/link";
import { authenticate } from "@/app/lib/auth/authenticate";
import { useFormStatus, useFormState } from "react-dom";

export default function LoginForm() {
   const [errorMessage, dispatch] = useFormState(authenticate, undefined);

   return (
      <form className="w-full max-w-[320px]" action={dispatch}>
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
         <LoginButton />
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

function LoginButton() {
   const { pending } = useFormStatus();

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (pending) {
         event.preventDefault();
      }
   };

   return (
      <button
         className="w-full bg-green px-6 py-3 text-lg font-extralight uppercase tracking-widest text-white transition hover:bg-lightGreen"
         type="submit"
         onClick={handleClick}
      >
         Login
      </button>
   );
}

// export default function LoginForm() {
//    return (
//       <form
//          className="w-full max-w-[320px]"
//          onSubmit={(event) => handleLoginUser(event)}
//       >
//          <div className="mb-4">
//             <label className="text-dark" htmlFor="email">
//                Email
//             </label>
//             <div className="relative">
//                <input
//                   className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
//                   id="email"
//                   type="email"
//                   name="email"
//                   placeholder="Enter email"
//                />
//             </div>
//          </div>
//          <div className="mb-8">
//             <label className="text-dark" htmlFor="password">
//                Password
//             </label>
//             <div className="relative">
//                <input
//                   className="w-full rounded bg-background px-4 py-3 outline-green placeholder:text-grey"
//                   id="password"
//                   type="password"
//                   name="password"
//                   placeholder="Enter password"
//                />
//             </div>
//          </div>
//          <Button text="Login" styles="w-full" primary={false} />
//          <div className="mt-4 w-full font-extralight tracking-wider">
//             Don&apos;t have an account? Register{" "}
//             <Link
//                href="/user/register"
//                className="text-blue underline hover:font-medium"
//             >
//                here
//             </Link>
//          </div>
//          <div className="alert-container"></div>
//       </form>
//    );
// }
