import "@/app/ui/globals.css";
import "@mantine/core/styles.css";

import Footer from "@/app/ui/FooterComponent";
import Header from "@/app/ui/HeaderComponent";

import { Metadata } from "next";
import { robotoFlex } from "@/app/ui/fonts";
import { ScrollButton } from "@/app/ui/ButtonComponents";

import {
   MantineProvider,
   createTheme,
   MantineColorsTuple,
} from "@mantine/core";

export const metadata: Metadata = {
   title: {
      template: "%s | Holidaze Resorts",
      default: "Holidaze Resorts",
   },
   description: "Find your next holiday destination",
};

const yellowColor: MantineColorsTuple = [
   "#fff6e1",
   "#feeecc",
   "#fada9f",
   "#f6c66d",
   "#f3b542",
   "#f1aa26",
   "#f0a514",
   "#d68f05",
   "#be7e00",
   "#a66d00",
];

const greenColor: MantineColorsTuple = [
   "#f2f7f6",
   "#e7ebea",
   "#c9d8d4",
   "#a9c3bd",
   "#8db1a8",
   "#7ca69b",
   "#71a295",
   "#5f8d81",
   "#527e72",
   "#406d62",
];

const brownColor: MantineColorsTuple = [
   "#f6f4f4",
   "#e6e6e6",
   "#cbcbcb",
   "#afaeae",
   "#989494",
   "#8b8484",
   "#867c7c",
   "#736969",
   "#695e5e",
   "#5e4f4f",
];

const redColor: MantineColorsTuple = [
   "#ffeaea",
   "#fdd4d4",
   "#f4a7a7",
   "#ed7777",
   "#e64e4d",
   "#e33533",
   "#e22726",
   "#c91a1a",
   "#b41316",
   "#9e0510",
];

const greyColor: MantineColorsTuple = [
   "#fff2f5",
   "#ece6e7",
   "#cfcdcd",
   "#b2b2b2",
   "#9a9a9a",
   "#8b8b8b",
   "#848484",
   "#737171",
   "#686465",
   "#5f5457",
];

const theme = createTheme({
   colors: {
      yellow: yellowColor,
      green: greenColor,
      brown: brownColor,
      red: redColor,
      grey: greyColor,
   },
   primaryShade: 8,
});

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={`${robotoFlex.className} bg-lighterGrey antialiased`}>
            <Header />
            <MantineProvider theme={theme}>{children}</MantineProvider>
            <ScrollButton />
            <Footer />
         </body>
      </html>
   );
}
