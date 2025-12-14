"use client";

import { useEffect, useState } from "react";

const moods = [
  { emoji: "😄", label: "Very Happy", color: "bg-green-200" },
  { emoji: "🙂", label: "Happy", color: "bg-lime-200" },
  { emoji: "😐", label: "Neutral", color: "bg-yellow-200" },
  { emoji: "☹️", label: "Sad", color: "bg-orange-200" },
  { emoji: "😭", label: "Very Sad", color: "bg-red-200" },
];

interface MoodSelectorProps {
  onMoodChange?: (mood: string) => void;
}

export default function MoodSelector({ onMoodChange }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
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
    <div className="bg-white shadow-lg border border-black rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-black mb-1">
        How are you feeling today?
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Select the emoji that best matches your mood
      </p>

      <div className="grid grid-cols-5 gap-3 text-center">
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.emoji;

          return (
            <button
              key={mood.emoji}
              onClick={() => handleSelect(mood.emoji)}
              className={`rounded-xl p-3 transition transform
                ${
                  isSelected
                    ? `${mood.color} scale-110 ring-2 ring-black`
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              <div className="text-3xl mb-1">{mood.emoji}</div>
              <div className="text-xs font-medium text-black">
                {mood.label}
              </div>
            </button>
          );
        })}
      </div>

      {selectedMood && (
        <p className="mt-4 text-sm text-green-700 font-medium text-center">
          Mood saved successfully ✔
        </p>
      )}
    </div>
  );
}
