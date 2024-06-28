import "@/app/ui/globals.css";

import Footer from "@/app/ui/FooterComponent";
import Header from "@/app/ui/HeaderComponent";

import { Metadata } from "next";
import { robotoFlex } from "@/app/ui/fonts";
import { ScrollButton } from "@/app/ui/ButtonComponents";

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
            <ScrollButton />
            <Footer />
         </body>
      </html>
   );
}
