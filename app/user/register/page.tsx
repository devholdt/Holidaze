import { Metadata } from "next";
import RegistrationForm from "@/app/ui/user/register/RegistrationForm";
import Logo from "@/app/ui/holidaze-logo";
import logoBlack from "@/public/logo-black.svg";

export const metadata: Metadata = {
   title: "Register",
};

export default function Page() {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col items-center border-x border-lightGrey bg-background">
         <div className="mt-24 flex w-2/6 min-w-[300px] flex-col items-center bg-white px-6 py-10">
            <Logo src={logoBlack} width={240} height={60} />
            <h1 className="my-8 text-center text-2xl font-extralight uppercase tracking-widest">
               Sign up
            </h1>

            <RegistrationForm />
         </div>
      </main>
   );
}
