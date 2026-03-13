import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import StreakCard from "@/components/StreakCard";
import StudyButton from "@/components/StudyButton";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <main className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Daily Learning Streak Tracker
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Welcome back, {session.user.name}! 👋
        </p>
      </div>

      <StreakCard />
      <StudyButton />

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Link
          href="/history"
          className="w-full sm:w-auto text-center bg-white hover:bg-gray-50 text-blue-600 font-semibold px-6 py-3 rounded-lg border-2 border-blue-600 transition-colors"
        >
          📅 View Study History
        </Link>
        <Link
          href="/stats"
          className="w-full sm:w-auto text-center bg-white hover:bg-gray-50 text-purple-600 font-semibold px-6 py-3 rounded-lg border-2 border-purple-600 transition-colors"
        >
          📊 View Statistics
        </Link>
      </div>
    </main>
  );
}
