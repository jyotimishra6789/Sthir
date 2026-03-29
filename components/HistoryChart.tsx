"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type HistoryRecord = {
  date: string;
  score: number;
  answers: number[];
};

interface HistoryChartProps {
  history: HistoryRecord[];
}

export default function HistoryChart({ history }: HistoryChartProps) {
  // Format dates for display
  const data = history.map((record) => {
    const d = new Date(record.date);
    return {
      name: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      fullDate: d.toLocaleDateString(),
      score: record.score,
    };
  });

  if (data.length < 2) {
    return (
      <div className="w-full h-40 glass-card p-6 flex flex-col items-center justify-center animate-scale-up border border-indigo-50 bg-white/50 backdrop-blur-sm rounded-xl mb-8 shadow-sm">
        <div className="text-4xl mb-2 flex justify-center w-full">📈</div>
        <p className="text-slate-500 font-medium text-center">Take another check-in tomorrow to unlock your wellness trend chart!</p>
      </div>
    );
  }

  return (
    <div className="w-full h-80 glass-card p-6 animate-scale-up border border-indigo-50 shadow-sm rounded-xl bg-white mb-8" style={{ animationDelay: '150ms' }}>
      <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center">
        <span className="mr-2">📈</span> Your Wellness Trend
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -20, right: 10, top: 10, bottom: 20 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.4} />
          <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
          <YAxis domain={[0, 50]} tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
          <Tooltip 
            cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '4 4' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff', color: '#475569' }}
            itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
            labelStyle={{ color: '#475569', fontWeight: 'bold', marginBottom: '4px' }}
          />
          <Area 
            type="monotone" 
            dataKey="score" 
            stroke="#6366f1" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorScore)" 
            isAnimationActive={true} 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
