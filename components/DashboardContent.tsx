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

    if (avg >= 3.5) {
      return {
        label: "Light Mental Load 🟢",
        message: "You seem mentally relaxed today. Keep this balance.",
        color: "bg-emerald-100/80 text-emerald-800 border-emerald-200 shadow-emerald-500/10",
      };
    }

    if (avg >= 1.5) {
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
      <div className="bg-white p-6 relative w-full min-h-screen">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-10 text-center animate-scale-up shadow-sm">
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

          <div className="bg-white border border-gray-200 rounded-xl p-6 mt-10 text-left shadow-sm">
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
    <div className="bg-white p-4 sm:p-8 relative min-h-screen">
      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-12 animate-scale-up text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[2rem] bg-gradient-to-tr from-teal-400 via-emerald-500 to-green-400 text-white shadow-xl shadow-teal-500/30 mb-6 transform hover:rotate-12 transition-transform duration-500">
             <span className="text-3xl">🌿</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight drop-shadow-sm">
            Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Report</span>
          </h1>
          <p className="text-slate-500 mt-4 font-medium text-lg max-w-lg mx-auto">
            Your personalized insights to help you reflect, breathe, and cultivate balance today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Summary Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-scale-up" style={{ animationDelay: '50ms' }}>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center">
              Today's Overview
            </h2>

            {score !== null && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex justify-between items-center transition-transform hover:scale-[1.02] duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-teal-600 shadow-inner">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <span className="text-slate-700 font-bold">Total Score</span>
                  </div>
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 text-3xl drop-shadow-sm">
                    {score} <span className="text-sm text-slate-400 font-semibold align-middle">/ 50</span>
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex justify-between items-center transition-transform hover:scale-[1.02] duration-300">
                  <span className="text-slate-700 font-bold ml-1">Status</span>
                  <span className="font-bold text-slate-800 bg-white border border-slate-100 px-4 py-2 rounded-xl shadow-sm text-sm">
                    {getStatus(score)}
                  </span>
                </div>
              </div>
            )}

            {mood && (
              <div className="mt-6 pt-6 border-t border-slate-200/50 flex items-center justify-between">
                <span className="text-slate-700 font-bold ml-1 text-lg">Logged Mood</span>
                <span className="text-4xl bg-white border border-slate-100 p-3 rounded-[1.5rem] shadow-sm hover:scale-110 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  {mood}
                </span>
              </div>
            )}
          </div>

          {/* Mental Load Meter */}
          {score !== null && (
            <div
              className={`bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col justify-center animate-scale-up ${getMentalLoad(score).color.replace('bg-', 'bg-').replace('text-', 'text-').replace('border-', 'border-').replace('shadow-', 'shadow-')} transition-all duration-500`}
              style={{ animationDelay: '100ms' }}
            >
              <div className="text-center">
                <h2 className="text-sm uppercase tracking-widest font-bold mb-3 opacity-80 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                  Mental Load
                </h2>
                <p className="text-3xl font-black mb-3 tracking-tight drop-shadow-sm">
                  {getMentalLoad(score).label}
                </p>
                <p className="text-base opacity-95 leading-relaxed font-semibold max-w-[90%] mx-auto">
                  {getMentalLoad(score).message}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="animate-scale-up" style={{ animationDelay: '150ms' }}>
          <MoodChart answers={answers} />
        </div>

        {/* AI Daily Insight */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-scale-up" style={{ animationDelay: '250ms' }}>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <span className="text-2xl mr-3">✨</span>
            AI Daily Insight
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-slate-700 text-lg leading-relaxed font-medium">
              {fact}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-12 justify-center animate-scale-up" style={{ animationDelay: '300ms' }}>
          <a
            href="/advice"
            className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 text-center flex-1 sm:flex-none"
          >
            <span className="relative z-10 flex items-center justify-center">
              Chat with AI
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <div className="absolute inset-0 block bg-gradient-to-r from-purple-600 to-pink-600 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out z-0"></div>
          </a>

          <a
            href="/checkin"
            className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-emerald-600 border border-emerald-600 hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 text-center flex-1 sm:flex-none"
          >
            Retake Test
          </a>

          <a
            href="/"
            className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold shadow-sm hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center flex-1 sm:flex-none"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
