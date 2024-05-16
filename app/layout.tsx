import "@/app/ui/globals.css";
import type { Metadata } from "next";
import { robotoFlex } from "@/app/ui/fonts";
import Footer from "@/app/ui/footer";
import dynamic from "next/dynamic";

export const Header = dynamic(() => import("@/app/ui/Header"), { ssr: false });

export const metadata: Metadata = {
   title: {
      template: "%s | Holidaze Resorts",
      default: "Holidaze Resorts",
   },
   description: "Find your next holiday destination",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={`${robotoFlex.className} bg-lighterGrey antialiased`}>
            <Header />
            {children}
            <Footer />
         </body>
      </html>
   );
}
