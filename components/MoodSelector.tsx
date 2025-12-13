"use client";

const moods = [
  { emoji: "😄", label: "Very Happy" },
  { emoji: "🙂", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "☹️", label: "Sad" },
  { emoji: "😭", label: "Very Sad" },
];

interface MoodSelectorProps {
  onMoodChange?: (mood: string) => void;
}

export default function MoodSelector({ onMoodChange }: MoodSelectorProps) {
  const handleSelect = (emoji: string) => {
    localStorage.setItem("sthir-mood", emoji);
    onMoodChange?.(emoji);
  };

  return (
    <div className="bg-white shadow-md border border-black rounded-2xl p-5">
      <h2 className="text-xl font-semibold text-black mb-3">
        Select Your Mood Today
      </h2>

      <div className="flex gap-4 justify-between">
        {moods.map((mood) => (
          <button
            key={mood.emoji}
            onClick={() => handleSelect(mood.emoji)}
            className="text-3xl p-2 rounded-xl bg-gray-100 hover:bg-green-200 transition"
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
