import "./globals.css";
import LoaderWrapper from "./loader-wrapper";

export const metadata = {
  title: "Sthir – Mental Wellness App",
  description:
    "Sthir is a daily mental wellness app to track mood, reflect on emotions, and find balance through mindful check-ins.",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <LoaderWrapper>{children}</LoaderWrapper>
        <Toaster 
          position="top-center" 
          toastOptions={{ 
            style: { 
              background: 'rgba(255, 255, 255, 0.9)', 
              backdropFilter: 'blur(10px)',
              color: '#334155',
              border: '1px solid rgba(226, 232, 240, 0.6)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              borderRadius: '9999px',
              padding: '12px 24px',
              fontWeight: 500
            } 
          }} 
        />
      </body>
    </html>
  );
}
