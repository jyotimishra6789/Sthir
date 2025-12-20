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
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGFkem45a2QwNWsxcDR4bnd1dmNyZnRhMDNvNGI0ZDg0ZmpvZjFvbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fY7tXnYwurNH9vR4PZ/giphy.gif"
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
