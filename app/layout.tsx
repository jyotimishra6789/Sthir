import "./globals.css";
import LoaderWrapper from "./loader-wrapper";
import { Toaster } from "react-hot-toast";

export const metadata = {
title: "Sthir – Mental Wellness App",
description:
"Sthir is a daily mental wellness app to track mood and reflect.",
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return ( <html lang="en"> <body> <LoaderWrapper>{children}</LoaderWrapper> <Toaster position="top-center" /> </body> </html>
);
}
