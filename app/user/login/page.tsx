import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/app/ui/user/login/LoginForm";

export const metadata: Metadata = {
   title: "Login",
};

export default function Page() {
   const name = cookies().get("name");

   if (name) {
      redirect("/");
   }

   return (
      <main className="m-auto flex max-w-7xl flex-col border-x border-lightGrey bg-background">
         <LoginForm />
      </main>
   );
}
