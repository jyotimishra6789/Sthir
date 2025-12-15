"use client";
import { useEffect, useState } from "react";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return <div>Loading…</div>;
  }

  return <>{children}</>;
}
