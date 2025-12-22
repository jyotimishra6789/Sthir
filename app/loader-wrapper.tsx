"use client";

import { useEffect, useState } from "react";

export default function LoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
        <img
        className="w-40 h-40 mb-4"

          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMW01a2hhMHo0ZnF4dHpmZDhtamw0Zndramc3bGJnM3RuZXN0d2FoZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0tcm0qD0k4ev6Qiln1/giphy.gif"
          alt="Loading..."
        
        />

        <h1 className="text-3xl font-bold text-black">Sthir</h1>
        <p className="text-gray-700 mt-2 text-center max-w-xs">
          Finding your balance…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
