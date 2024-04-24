import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
};

export default function Page() {
	return (
		<main className="flex flex-col min-h-screen max-w-7xl m-auto border-x border-lightGrey bg-background">
			<h1>Login</h1>
		</main>
	);
}
