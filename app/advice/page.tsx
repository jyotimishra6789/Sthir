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
    <div className="min-h-screen relative overflow-hidden bg-[#f0f9ff] py-12 px-4 flex items-center justify-center">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-200 mix-blend-multiply filter blur-[100px] opacity-50 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-200 mix-blend-multiply filter blur-[100px] opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="glass-card p-10 sm:p-12 text-center relative overflow-hidden animate-scale-up">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 text-white mb-8 shadow-xl shadow-indigo-500/30">
            <span className="text-4xl text-white pt-1">✨</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-8 tracking-tight">
            Your Personalized Advice
          </h1>

          {/* -------- SCORE SECTION -------- */}
          {score !== null ? (
            <div className="inline-block bg-white/60 backdrop-blur-sm border border-slate-200 py-3 px-6 rounded-2xl mb-8 shadow-sm">
              <p className="text-lg font-medium text-slate-700">
                Wellness Score: <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 ml-2">{score}</span> <span className="text-sm font-normal text-slate-400">/ 50</span>
              </p>
            </div>
          ) : (
            <div className="bg-red-50 text-red-600 font-medium py-3 px-6 rounded-xl border border-red-100 mb-8 inline-block">
              No valid test score found. Please take the test again.
            </div>
          )}

          {/* -------- ADVICE TEXT -------- */}
          {score !== null && (
            <div className="bg-white/40 border border-white/60 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm backdrop-blur-sm text-left relative">
              <div className="absolute -top-3 -left-3 text-4xl opacity-20">"</div>
              <p className="text-slate-700 text-xl leading-relaxed font-medium relative z-10">{advice}</p>
              <div className="absolute -bottom-5 -right-3 text-4xl opacity-20 rotate-180">"</div>
            </div>
          )}

          {/* -------- BUTTON -------- */}
          <div className="mt-2">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center w-full sm:w-auto relative group overflow-hidden px-10 py-4 rounded-full bg-slate-900 text-white font-semibold hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 border border-slate-700 hover:border-slate-500"
            >
              <span className="relative z-10">View Detailed Report</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out z-0"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
