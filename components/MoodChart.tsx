"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MoodChartProps {
  answers: number[];
}

export default function MoodChart({ answers }: MoodChartProps) {
  const data = answers.map((value, index) => ({
    name: `Q${index + 1}`,
    score: value,
  }));

  return (
    <div className="w-full h-80 bg-white rounded-2xl shadow-md border border-black p-4">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Question-wise Response (0–5)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "black" }} />
          <YAxis domain={[0, 5]} tick={{ fill: "black" }} />
          <Tooltip />
          <Bar dataKey="score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
