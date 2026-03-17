"use client";

import { useEffect, useState } from "react";

const moods = [
  { emoji: "😄", label: "Very Happy", color: "from-green-400 to-emerald-500", shadow: "shadow-green-500/40" },
  { emoji: "🙂", label: "Happy", color: "from-lime-400 to-green-500", shadow: "shadow-lime-500/40" },
  { emoji: "😐", label: "Neutral", color: "from-yellow-300 to-amber-400", shadow: "shadow-yellow-500/40" },
  { emoji: "☹️", label: "Sad", color: "from-orange-400 to-red-400", shadow: "shadow-orange-500/40" },
  { emoji: "😭", label: "Very Sad", color: "from-red-500 to-rose-600", shadow: "shadow-red-500/40" },
];

interface MoodSelectorProps {
  onMoodChange?: (mood: string) => void;
}

export default function MoodSelector({ onMoodChange }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const savedMood = localStorage.getItem("sthir-mood");
    if (savedMood) {
      setSelectedMood(savedMood);
      onMoodChange?.(savedMood);
    }
  }, [onMoodChange]);

  const handleSelect = (emoji: string) => {
    setSelectedMood(emoji);
    localStorage.setItem("sthir-mood", emoji);
    onMoodChange?.(emoji);
  };

  return (
    <div className={`glass-card p-8 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          How are you feeling today?
        </h2>
        <p className="text-slate-500">
          Select the emoji that best reflects your current mood
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-4 md:gap-6 justify-center">
        {moods.map((mood, idx) => {
          const isSelected = selectedMood === mood.emoji;

          return (
            <button
              key={mood.emoji}
              onClick={() => handleSelect(mood.emoji)}
              className={`group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all duration-300 transform outline-none
                ${
                  isSelected
                    ? `bg-gradient-to-br ${mood.color} shadow-lg ${mood.shadow} scale-110 -translate-y-2`
                    : "bg-white/50 hover:bg-white hover:shadow-md hover:-translate-y-1 border border-white/60"
                }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={`text-3xl sm:text-4xl lg:text-5xl mb-2 transition-transform duration-300 ${isSelected ? 'scale-110 animate-pulse-soft' : 'group-hover:scale-110'}`}>
                {mood.emoji}
              </div>
              <div className={`text-[10px] sm:text-xs font-semibold whitespace-nowrap ${isSelected ? 'text-white' : 'text-slate-600 group-hover:text-slate-800'}`}>
                {mood.label}
              </div>
            </button>
          );
        })}
      </div>

      {selectedMood && (
        <div className="mt-8 text-center animate-scale-up">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/80 text-emerald-700 text-sm font-semibold border border-emerald-200 shadow-sm backdrop-blur-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            Mood captured successfully
          </span>
        </div>
      )}
    </div>
  );
}
