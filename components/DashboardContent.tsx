"use client";


import { useEffect, useState } from "react";
import MoodChart from "@/components/MoodChart";

export default function DashboardContent() {
  const [mounted, setMounted] = useState(false);
  const [answers, setAnswers] = useState<number[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [fact, setFact] = useState("Generating a unique AI wellness tip for you...");
  const [mood, setMood] = useState<string | null>(null);

  const getMentalLoad = (score: number) => {
    const avg = score / 10;

    if (avg <= 1.5) {
      return {
        label: "Light Mental Load 🟢",
        message: "You seem mentally relaxed today. Keep this balance.",
        color: "bg-emerald-100/80 text-emerald-800 border-emerald-200 shadow-emerald-500/10",
      };
    }

    if (avg <= 3.5) {
      return {
        label: "Moderate Mental Load 🟡",
        message: "You’re handling things, but some mental pressure is present.",
        color: "bg-amber-100/80 text-amber-800 border-amber-200 shadow-amber-500/10",
      };
    }

    return {
      label: "Heavy Mental Load 🔴",
      message: "Your mind seems overloaded today. Rest and slow down if you can.",
      color: "bg-rose-100/80 text-rose-800 border-rose-200 shadow-rose-500/10",
    };
  };

  const getStatus = (s: number) => {
    if (s >= 41) return "Excellent well-being 😄";
    if (s >= 31) return "Good well-being 🙂";
    if (s >= 21) return "Moderate well-being 😐";
    if (s >= 11) return "Low well-being ☹️";
    return "Very low well-being 😭";
  };

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
      } catch (err) {
        console.error("Error parsing answers", err);
      }
    }

    if (storedScore && !isNaN(Number(storedScore))) {
      setScore(Number(storedScore));
    }

    const fetchTip = async () => {
      try {
        const res = await fetch('/api/tip');
        if (res.ok) {
          const data = await res.json();
          setFact(data.tip || "Take a moment to breathe deeply today.");
        } else {
          setFact("Remember to drink water and take short breaks today.");
        }
      } catch (e) {
        setFact("Focus on one small positive thing today.");
      }
    };
    
    fetchTip();
  }, []);

  if (!mounted) return null;

  if (!answers) {
    return (
      <div className="bg-transparent p-6 relative w-full">
        <div className="max-w-2xl mx-auto glass-card p-10 text-center animate-scale-up">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Detailed Wellness Report
          </h1>

          <div className="bg-red-50 text-red-600 font-medium py-3 px-6 rounded-xl border border-red-100 mb-8 inline-block">
            No test data found. Please complete the wellness test first.
          </div>

          <div>
            <a
              href="/checkin"
              className="inline-block bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-3.5 rounded-full font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Take Assessment
            </a>
          </div>

          <div className="glass-card bg-white/60 p-6 mt-10 text-left">
            <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center">
              <span className="text-2xl mr-2">🌿</span> Daily Mood Tip
            </h2>
            <p className="text-slate-600 leading-relaxed font-light">{fact}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent p-4 sm:p-8 relative">
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight text-center mb-10 animate-scale-up">
          Detailed Wellness Report
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Summary */}
          <div className="glass-card p-8 animate-scale-up" style={{ animationDelay: '50ms' }}>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b border-slate-200/60 pb-3">
              Today&apos;s Summary
            </h2>

            {score !== null && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-slate-600 font-medium">Total Score</span>
                  <span className="font-bold text-teal-600 text-2xl">{score} <span className="text-sm text-slate-400 font-normal">/ 50</span></span>
                </div>

                <div className="flex justify-between items-center text-md">
                  <span className="text-slate-600 font-medium">Status</span>
                  <span className="font-medium text-slate-800 bg-white px-3 py-1 rounded-full shadow-sm">{getStatus(score)}</span>
                </div>
              </div>
            )}

            {mood && (
              <div className="mt-6 pt-6 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-slate-600 font-medium text-lg">Logged Mood</span>
                <span className="text-4xl bg-white p-2 rounded-2xl shadow-sm hover:scale-110 transition-transform duration-300">{mood}</span>
              </div>
            )}
          </div>

          {/* Mental Load Meter */}
          {score !== null && (
            <div
              className={`rounded-3xl border p-8 shadow-lg backdrop-blur-md transition-all duration-500 hover:shadow-xl animate-scale-up flex flex-col justify-center ${getMentalLoad(score).color}`}
              style={{ animationDelay: '100ms' }}
            >
              <h2 className="text-xl font-bold mb-3 opacity-90">
                Mental Load Meter
              </h2>
              <p className="text-2xl font-extrabold mb-3 tracking-tight">
                {getMentalLoad(score).label}
              </p>
              <p className="text-md opacity-90 leading-relaxed font-medium">
                {getMentalLoad(score).message}
              </p>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="animate-scale-up" style={{ animationDelay: '150ms' }}>
          <MoodChart answers={answers} />
        </div>

        {/* Fun Fact */}
        <div className="glass-card p-8 animate-scale-up" style={{ animationDelay: '250ms' }}>
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center">
            <span className="text-2xl mr-3">🌿</span> Daily Mood Tip
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed font-light">{fact}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center animate-scale-up" style={{ animationDelay: '300ms' }}>
          <a
            href="/advice"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex-1 sm:flex-none"
          >
            View AI Advice
          </a>

          <a
            href="/checkin"
            className="bg-slate-800 text-white px-8 py-3.5 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 text-center flex-1 sm:flex-none"
          >
            Retake Test
          </a>

          <a
            href="/"
            className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 px-8 py-3.5 rounded-full font-semibold shadow-sm hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center w-full sm:w-auto"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
