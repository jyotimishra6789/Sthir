import WellnessCard from "@/components/WellnessCard";
import DashboardPage from "./dashboard/page";
import MoodSelector from "@/components/MoodSelector";
export default function Home() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-100 to-blue-100">
      <WellnessCard/>
      <DashboardPage/>
      <MoodSelector/>
    </div>
  );
}
