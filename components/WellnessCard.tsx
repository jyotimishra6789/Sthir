import Link from "next/link";

export default function WellnessCard() {
  return (
    <div className="bg-white w-100 shadow-lg p-6 rounded-2xl border-2 border-black">
      <h2 className="text-xl font-semibold text-black">Take your Wellness Test</h2>

      <p className="text-black-600 mt-2 text-black">
        A quick daily check-in to understand your mood.
      </p>

      <Link href="/checkin">
        <button className="mt-4 px-4 py-2 rounded-xl bg-green-500 text-black hover:bg-green-600 transition">
          Start Test
        </button>
      </Link>
    </div>
  );
}
