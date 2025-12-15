"use client";

import { funFacts } from "@/lib/funfacts";
import { useEffect, useState } from "react";
import MoodChart from "@/components/MoodChart";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [answers, setAnswers] = useState<number[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [fact, setFact] = useState("");
  const [mood, setMood] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const storedAnswers = localStorage.getItem("sthir-answers");
    const storedScore = localStorage.getItem("sthir-score");
    const storedMood = localStorage.getItem("sthir-mood");

    if (storedMood) setMood(storedMood);

    if (storedAnswers) {
      try {
        const parsed = JSON.parse(storedAnswers);
        if (Array.isArray(parsed)) {
          setAnswers(parsed.map((v) => (typeof v === "number" ? v : 0)));
        }
      } catch (e) {
        console.error("Error parsing answers:", e);
      }
    }

    if (storedScore && !isNaN(parseInt(storedScore))) {
      setScore(parseInt(storedScore));
    }

    const random = funFacts[Math.floor(Math.random() * funFacts.length)];
    setFact(random);
  }, []);

  if (!mounted) return null;

  const getStatus = (s: number) => {
    if (s >= 41) return "Excellent well-being 😄";
    if (s >= 31) return "Good well-being 🙂";
    if (s >= 21) return "Moderate well-being 😐";
    if (s >= 11) return "Low well-being ☹️";
    return "Very low well-being 😭";
  };

  if (!answers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-6">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-black">
          <h1 className="text-3xl font-bold text-black mb-4">
            Detailed Wellness Report
          </h1>

          <p className="text-red-600 font-semibold">
            No test data found. Please complete the wellness test first.
          </p>

          <a
            href="/checkin"
            className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition"
          >
            Go to Test
          </a>

          <div className="bg-white rounded-2xl shadow-md border border-black p-6 mt-6">
            <h2 className="text-xl font-semibold text-black mb-2">
              Daily Mood Tip 🌿
            </h2>
            <p className="text-black text-lg">{fact}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-black text-center">
          Detailed Wellness Report
        </h1>

        <div className="bg-white rounded-2xl shadow-md border border-black p-6">
          <h2 className="text-2xl font-semibold text-black mb-2">
            Today&apos;s Summary
          </h2>

          {score !== null && (
            <>
              <p className="text-lg text-black">
                Total Score:{" "}
                <span className="font-bold text-green-600">{score}</span> / 50
              </p>

              <p className="text-md text-black mt-2">{getStatus(score)}</p>
            </>
          )}

          {mood && (
            <p className="text-lg text-black mt-2">
              Today&apos;s Mood: <span className="text-3xl">{mood}</span>
            </p>
          )}
        </div>

        <MoodChart answers={answers} />

        <div className="flex flex-wrap gap-4 mt-4">
          <a
            href="/advice"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition"
          >
            View AI Advice
          </a>

          <a
            href="/checkin"
            className="bg-gray-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-900 transition"
          >
            Retake Test
          </a>

          <a
            href="/"
            className="bg-white border border-black text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Back to Home
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-black p-6 mt-6">
          <h2 className="text-xl font-semibold text-black mb-2">
            Daily Mood Tip 🌿
          </h2>
          <p className="text-black text-lg">{fact}</p>
        </div>
      </div>
    </div>
  );
}
