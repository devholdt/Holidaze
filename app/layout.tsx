import "@/app/ui/globals.css";
import type { Metadata } from "next";
import { robotoFlex } from "@/app/ui/fonts";
// import Header from "@/app/ui/Header";
import Footer from "@/app/ui/footer";

// import React, { lazy, Suspense } from "react";

// const Header = lazy(() => import("@/app/ui/Header"));

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
            {/* <Suspense fallback={<p>Loading...</p>}>
               <Header />
            </Suspense> */}
            {children}
            <Footer />
         </body>
      </html>
   );
}
