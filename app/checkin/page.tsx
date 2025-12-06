"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";
import QuestionCard from "@/components/QuestionCard";

export default function CheckinPage() {
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(null));

  const updateAnswer = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null as any)) {
      alert("Please answer all questions");
      return;
    }

    const totalScore = answers.reduce((sum, val) => sum + val, 0);
    alert(`Your Wellness Score is: ${totalScore}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Daily Wellness Test
        </h1>

        {questions.map((q, i) => (
          <QuestionCard
            key={i}
            question={q}
            index={i}
            value={answers[i]}
            onChange={(val) => updateAnswer(i, val)}
          />
        ))}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold mt-6"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}
