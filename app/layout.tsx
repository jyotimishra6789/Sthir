"use client";

import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds splash

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
            <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h1 className="text-3xl font-bold text-black">Sthir</h1>
            <p className="text-gray-700 mt-2">
              Finding your balance…
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
