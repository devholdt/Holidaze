import "@/app/ui/globals.css";
import { Metadata } from "next";
import { robotoFlex } from "@/app/ui/fonts";
import Footer from "@/app/ui/footer";
import Header from "@/app/ui/Header";

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
