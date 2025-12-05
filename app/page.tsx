export default function Home() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-100 to-blue-100">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. Wellness Test */}
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">Take Your Wellness Test</h2>
          <p className="text-gray-600 mt-2">
            A quick daily check-in to understand your mood.
          </p>
          <button className="mt-4 px-4 py-2 rounded-xl bg-green-500 text-white">
            Start Test
          </button>
        </div>

        {/* 2. AI Advice */}
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">AI-Powered Advice</h2>
          <p className="text-gray-600 mt-2">
            Personalized guidance based on your recent mood.
          </p>
          <button className="mt-4 px-4 py-2 rounded-xl bg-blue-500 text-white">
            View Advice
          </button>
        </div>

        {/* 3. Daily Fun Fact */}
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">Daily Mood Boost</h2>
          <p className="text-gray-600 mt-2">
            Did you know? A short walk can improve mood instantly!
          </p>
          <button className="mt-4 px-4 py-2 rounded-xl bg-purple-500 text-white">
            More Facts
          </button>
        </div>

        {/* 4. Report */}
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-xl font-semibold">Your Mood Report</h2>
          <p className="text-gray-600 mt-2">
            Track your emotional pattern with clean charts.
          </p>
          <button className="mt-4 px-4 py-2 rounded-xl bg-yellow-500 text-white">
            View Report
          </button>
        </div>

      </div>
    </div>
  );
}
