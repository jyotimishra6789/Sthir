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
    <div className="w-full h-80 glass-card p-6 animate-scale-up" style={{ animationDelay: '200ms' }}>
      <h2 className="text-xl font-bold mb-4 text-slate-800">
        Daily Assessment Responses (0–5)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -20, right: 10, top: 10, bottom: 20 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.4} />
          <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
          <YAxis domain={[0, 5]} tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
          <Tooltip 
            cursor={{ fill: '#f1f5f9', opacity: 0.4 }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
          />
          <Bar 
            dataKey="score" 
            fill="url(#barGradient)" 
            isAnimationActive={true} 
            animationDuration={1500} 
            animationBegin={300}  
            animationEasing="ease-out" 
            radius={[6, 6, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
