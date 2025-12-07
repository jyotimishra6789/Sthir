"use client";

import { useEffect, useState } from "react";

export default function AdvicePage() {
  const [score, setScore] = useState<number | null>(null);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const storedScore = localStorage.getItem("sthir-score");

    if (storedScore) {
      const s = parseInt(storedScore);
      setScore(s);
      giveAdvice(s);
    }
  }, []);

  const giveAdvice = (s: number) => {
    if (s >= 41) {
      setAdvice(
        "Your mental well-being is excellent! Keep doing what keeps you happy and grounded."
      );
    } else if (s >= 31) {
      setAdvice(
        "You’re doing well! A little mindfulness or a relaxing activity could make your day brighter."
      );
    } else if (s >= 21) {
      setAdvice(
        "Your well-being is moderate. Try resting a bit, hydrate well, and talk to someone you trust."
      );
    } else if (s >= 11) {
      setAdvice(
        "Your score shows low well-being. Slow down, breathe deeply, and take a small break for yourself."
      );
    } else {
      setAdvice(
        "You may be feeling very low. Please reach out to a close friend, family member, or professional support. You are not alone."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-black">

        <h1 className="text-3xl font-bold text-black mb-4">
          Your Personalized Wellness Advice
        </h1>

        {score !== null && (
          <p className="text-lg font-semibold text-black mb-6">
            Your Score: <span className="text-green-600">{score}</span> / 50
          </p>
        )}

        <p className="text-black text-lg leading-relaxed">
          {advice}
        </p>

        <a
          href="/dashboard"
          className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition"
        >
          View Detailed Report
        </a>
      </div>
    </div>
  );
}
