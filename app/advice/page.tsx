"use client";

import { useEffect, useState } from "react";

export default function AdvicePage() {
  const [score, setScore] = useState<number | null>(null);
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const storedScore = localStorage.getItem("sthir-score");

    // Agar score nahi mila ya NaN hai → show nothing
    if (!storedScore || isNaN(parseInt(storedScore))) {
      setScore(null);
      return;
    }

    const s = parseInt(storedScore);
    setScore(s);
    generateAdvice(s);
  }, []);

  const generateAdvice = (s: number) => {
    if (s >= 41) {
      setAdvice(
        "Your mental well-being is excellent! Keep doing what brings you peace and joy."
      );
    } else if (s >= 31) {
      setAdvice(
        "You’re doing well! A little mindfulness or a relaxing activity can make your day even better."
      );
    } else if (s >= 21) {
      setAdvice(
        "Your well-being is moderate. Try taking small breaks, hydrating well, or talking to someone close."
      );
    } else if (s >= 11) {
      setAdvice(
        "Your score indicates low well-being. Slow down, rest properly, and be kind to yourself today."
      );
    } else {
      setAdvice(
        "You might be feeling very low. Please talk to a close friend, family member, or a professional. You are not alone."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-black">
        
        <h1 className="text-3xl font-bold text-black mb-4">
          Your Personalized Wellness Advice
        </h1>

        {/* -------- SCORE SECTION -------- */}
        {score !== null ? (
          <p className="text-lg font-semibold text-black mb-6">
            Your Score: <span className="text-green-600">{score}</span> / 50
          </p>
        ) : (
          <p className="text-red-600 font-semibold mb-6">
            No valid test score found. Please take the test again.
          </p>
        )}

        {/* -------- ADVICE TEXT -------- */}
        {score !== null && (
          <p className="text-black text-lg leading-relaxed mb-6">{advice}</p>
        )}

        {/* -------- BUTTON -------- */}
        <div className="mt-4">
          <a
            href="/dashboard"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition"
          >
            View Detailed Report
          </a>
        </div>
      </div>
    </div>
  );
}
