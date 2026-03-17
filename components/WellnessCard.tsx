import Link from "next/link";

export default function WellnessCard() {
  return (
    <div className="glass-card glass-card-hover p-8 relative overflow-hidden flex flex-col items-center text-center">
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse-soft"></div>
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 w-16 h-16 bg-gradient-to-tr from-teal-400 to-emerald-300 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-teal-500/30">
        <span className="text-3xl text-white">🌿</span>
      </div>

      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-700 to-emerald-600 mb-2">
        Daily Wellness Check
      </h2>

      <p className="text-slate-600 mb-8 max-w-sm">
        Take a moment for yourself. A quick daily check-in to understand your mood and find balance.
      </p>

      <Link href="/checkin" className="w-full sm:w-auto">
        <button className="relative group overflow-hidden px-8 py-3.5 rounded-full bg-slate-900 text-white font-medium hover:shadow-lg hover:shadow-slate-500/30 transition-all duration-300 w-full sm:w-auto border border-slate-700 hover:border-slate-500">
          <span className="relative z-10">Start Your Assessment</span>
          <div className="absolute inset-0 h-full w-full block bg-gradient-to-r from-teal-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-500 ease-out z-0"></div>
        </button>
      </Link>
    </div>
  );
}
