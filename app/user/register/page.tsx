import { Metadata } from "next";
import Logo from "@/app/ui/holidaze-logo";
import RegistrationForm from "@/app/ui/registration-form";

export const metadata: Metadata = {
	title: "Register",
};

export default function Page() {
	return (
		<main className="flex flex-col items-center min-h-screen max-w-7xl m-auto border-x border-lightGrey bg-background">
			<div className="flex flex-col items-center bg-white mt-24 px-6 py-10 w-2/6 min-w-[300px]">
				<Logo src="/logo-black.svg" width={240} height={60} />
				<h1 className="uppercase text-2xl font-extralight text-center my-8 tracking-widest">
					Sign up
				</h1>

				<RegistrationForm />
			</div>
		</main>
	);
}
