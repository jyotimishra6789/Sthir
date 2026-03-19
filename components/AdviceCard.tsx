import React from "react";

interface AdviceCardProps {
  score: number | null;
  answers: number[] | null;
}

// Example advice logic based on score
const getPersonalizedAdvice = (score: number | null) => {
  if (score === null) return "Complete your check-in to get personalized advice.";
  if (score <= 10) return "It looks like you're having a tough time. Try to take a break, reach out to someone you trust, and remember that small steps count.";
  if (score <= 25) return "You're doing okay, but some self-care could help. Consider a walk, journaling, or a relaxing activity.";
  if (score <= 40) return "You're managing well! Keep up your healthy habits and check in with yourself regularly.";
  return "Excellent! Keep maintaining your well-being and support others if you can.";
};

const AdviceCard: React.FC<AdviceCardProps> = ({ score, answers }) => {
  return (
    <div className="glass-card p-6 my-4 border border-indigo-100 rounded-2xl bg-white/70 shadow-md animate-scale-up">
      <h2 className="text-lg font-bold mb-2 text-indigo-700 flex items-center">
        <span className="mr-2">💡</span> Personalized Advice
      </h2>
      <p className="text-slate-700 text-base font-medium">
        {getPersonalizedAdvice(score)}
      </p>
    </div>
  );
};

export default AdviceCard;
