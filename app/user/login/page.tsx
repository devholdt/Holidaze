import { Metadata } from "next";
import LoginForm from "@/app/ui/user/login/LoginForm";
import Logo from "@/app/ui/holidaze-logo";
import logoBlack from "@/public/logo-black.svg";

export const metadata: Metadata = {
   title: "Login",
};

export default function Page() {
   return (
      <main className="m-auto flex min-h-screen max-w-7xl flex-col items-center border-x border-lightGrey bg-background">
         <div className="mt-24 flex w-2/6 min-w-[300px] flex-col items-center bg-white px-6 py-10">
            <Logo src={logoBlack} width={240} height={60} />
            <h1 className="my-8 text-center text-2xl font-extralight uppercase tracking-widest">
               Login
            </h1>

            <LoginForm />
         </div>
      </main>
   );
}
