import "@/app/ui/globals.css";
import type { Metadata } from "next";
import { robotoFlex } from "@/app/ui/fonts";

export const metadata: Metadata = {
	title: "Holidaze",
	description: "Find your next holiday destination",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={robotoFlex.className}>{children}</body>
		</html>
	);
}
