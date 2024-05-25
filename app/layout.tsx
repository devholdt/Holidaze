import "@/app/ui/globals.css";
import { Metadata } from "next";
import { robotoFlex } from "@/app/ui/fonts";
import { ScrollButton } from "@/app/ui/Buttons";
import Footer from "@/app/ui/Footer";
import HeaderComponent from "@/app/ui/HeaderComponent";

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
            <HeaderComponent />
            {children}
            <ScrollButton />
            <Footer />
         </body>
      </html>
   );
}
