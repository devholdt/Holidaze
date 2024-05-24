import { Metadata } from "next";
import RegistrationForm from "@/app/ui/user/register/RegistrationForm";
import Logo from "@/app/ui/Logo";
import logoBlack from "@/public/logo-black.svg";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
   title: "Register",
};

export default function Page() {
   const name = cookies().get("name");

   if (name) {
      redirect("/");
   }

   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col items-center border-x border-lightGrey bg-background">
         <div className="mt-24 flex w-2/6 min-w-[300px] flex-col items-center bg-white px-6 py-10">
            <Logo src={logoBlack} styles="max-w-[250px]" />
            <h1 className="my-8 text-center text-2xl font-extralight uppercase tracking-widest">
               Sign up
            </h1>

            <RegistrationForm />
         </div>
      </main>
   );
}
