"use client";
import { useState } from "react";
import { questions } from "@/lib/questions";
import QuestionCard from "@/components/QuestionCard";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckinPage() {
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(null));
  const router = useRouter();

  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = (answeredCount / 10) * 100;

  const updateAnswer = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null as any)) {
      toast.error("Please answer all questions before proceeding.", {
        icon: '📝',
      });
      return;
    }

    const totalScore = answers.reduce((sum, val) => sum + val, 0);

    // SAVE SCORE CORRECTLY
    localStorage.setItem("sthir-score", totalScore.toString());
    localStorage.setItem("sthir-answers", JSON.stringify(answers));

    // REDIRECT
    router.push("/advice");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white py-12 px-4 sm:px-6">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-teal-200 mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse-soft"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-purple-200 mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8 animate-scale-up">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
            Daily Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Check-in</span>
          </h1>
          <p className="text-slate-600 text-lg mb-8">Take a moment to reflect on how you've been feeling.</p>
          
          <div className="max-w-xl mx-auto">
            <div className="mb-2 flex justify-between items-center text-sm font-medium text-slate-500">
              <span>Your Progress</span>
              <span>{answeredCount} / 10</span>
            </div>
            <div className="w-full bg-white/60 backdrop-blur-sm rounded-full h-3 border border-slate-200 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, i) => (
            <div key={i} className="animate-scale-up" style={{ animationDelay: `${(i % 5) * 100}ms` }}>
              <QuestionCard
                question={q}
                index={i}
                value={answers[i]}
                onChange={(val) => updateAnswer(i, val)}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 mb-8 animate-scale-up" style={{ animationDelay: '500ms' }}>
          <button
            onClick={handleSubmit}
            className="w-full relative group overflow-hidden px-8 py-4 rounded-2xl bg-emerald-500 text-white font-bold text-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 border border-emerald-600 hover:border-emerald-400"
          >
            <span className="relative z-10 flex items-center justify-center">
              Complete Assessment
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-teal-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out z-0"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
