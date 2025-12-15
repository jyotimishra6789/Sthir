import "./globals.css";
import LoaderWrapper from "./loader-wrapper";

export const metadata = {
  title: "Sthir – Mental Wellness App",
  description:
    "Sthir is a daily mental wellness app to track mood, reflect on emotions, and find balance through mindful check-ins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <LoaderWrapper>{children}</LoaderWrapper>
      </body>
    </html>
  );
}
