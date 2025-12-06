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
    <div className="bg-white p-6 rounded-2xl shadow-md border mb-6">
      <h3 className="text-lg font-semibold mb-4 text-black">
        {index + 1}. {question}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[5, 4, 3, 2, 1, 0].map((opt) => (
          <label
            key={opt}
            className={`cursor-pointer p-3 rounded-xl border text-sm transition text-center 
            ${value === opt
              ? "bg-green-500 text-white border-green-600"
              : "bg-gray-100 text-black border-gray-300"}`}
          >
            <input
              type="radio"
              name={`q-${index}`}
              className="hidden"
              onChange={() => onChange(opt)}
            />

            {opt === 5 && "All of the time"}
            {opt === 4 && "Most of the time"}
            {opt === 3 && "More than half of the time"}
            {opt === 2 && "Less than half of the time"}
            {opt === 1 && "Some of the time"}
            {opt === 0 && "At no time"}
          </label>
        ))}
      </div>
    </div>
  );
}
