import "@/app/ui/globals.css";
import "@mantine/core/styles.css";

import Footer from "@/app/ui/FooterComponent";
import Header from "@/app/ui/HeaderComponent";

import { Metadata } from "next";
import { robotoFlex } from "@/app/ui/fonts";
import { ScrollButton } from "@/app/ui/ButtonComponents";

import { MantineProvider } from "@mantine/core";

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
            <MantineProvider>{children}</MantineProvider>
            <ScrollButton />
            <Footer />
         </body>
      </html>
   );
}
