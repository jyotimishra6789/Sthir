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
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
        <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-6" />
        <h1 className="text-3xl font-bold text-black">Sthir</h1>
        <p className="text-gray-700 mt-2">
          Finding your balance…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
