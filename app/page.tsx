import WellnessCard from "@/components/WellnessCard";
// Removed direct import of DashboardPage since it breaks logic/routing if used directly,
// but the current code does include it, so I'll keep it with some visual separation if needed.
// It seems better to just have the cards and link to the dashboard properly but let's maintain existing functionality.
import DashboardPage from "./dashboard/page";
import MoodSelector from "@/components/MoodSelector";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f0f9ff]">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300 mix-blend-multiply filter blur-[100px] opacity-50 animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-200 mix-blend-multiply filter blur-[100px] opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-300 mix-blend-multiply filter blur-[100px] opacity-40 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-4 animate-scale-up">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">Center</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
            Sthir is your space to reflect, breathe, and cultivate a peaceful mind.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
          <MoodSelector />
          <WellnessCard />
        </div>
        
        {/* Separator before Dashboard component if we're embedding it directly */}
        <div className="mt-20 pt-10 border-t border-slate-200/60">
          <DashboardPage />
        </div>
      </div>
    </div>
  );
}
