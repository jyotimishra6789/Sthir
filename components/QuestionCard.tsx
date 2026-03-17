interface QuestionCardProps {
  question: string;
  index: number;
  value: number | null;
  onChange: (value: number) => void;
}

export default function QuestionCard({
  question,
  index,
  value,
  onChange,
}: QuestionCardProps) {
  return (
    <div className="glass-card p-6 sm:p-8 mb-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <h3 className="text-xl font-bold mb-6 text-slate-800">
        <span className="text-teal-600 mr-2">{index + 1}.</span> {question}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {[5, 4, 3, 2, 1, 0].map((opt) => {
          const isSelected = value === opt;
          return (
            <label
              key={opt}
              className={`cursor-pointer p-4 rounded-xl border-2 text-sm font-medium transition-all duration-300 text-center flex items-center justify-center relative overflow-hidden
              ${isSelected
                ? "bg-teal-50 text-teal-800 border-teal-500 shadow-md shadow-teal-500/20 scale-[1.02]"
                : "bg-white/50 text-slate-600 border-transparent hover:bg-white hover:border-teal-200 hover:shadow-sm"}`}
            >
              <input
                type="radio"
                name={`q-${index}`}
                className="hidden"
                onChange={() => onChange(opt)}
              />

              <span className="relative z-10 flex">
                {opt === 5 && "All of the time"}
                {opt === 4 && "Most of the time"}
                {opt === 3 && "More than half of the time"}
                {opt === 2 && "Less than half of the time"}
                {opt === 1 && "Some of the time"}
                {opt === 0 && "At no time"}
              </span>
              
              {isSelected && (
                <span className="absolute inset-0 bg-teal-500 opacity-5"></span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
