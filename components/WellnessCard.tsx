import Link from "next/link";

export default function WellnessCard() {
  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl border-2 border-black">
      <h2 className="text-xl font-semibold">Take your Wellness Test</h2>

      <p className="text-gray-600 mt-2">
        A quick daily check-in to understand your mood.
      </p>

      <Link href="/checkin">
        <button className="mt-4 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition">
          Start Test
        </button>
      </Link>
    </div>
  );
}
