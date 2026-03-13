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
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Daily Learning Streak Tracker
        </h1>
        <p className="text-gray-600">
          Welcome back, {session.user.name}! 👋
        </p>
      </div>

      <StreakCard />
      <StudyButton />

      <div className="mt-6 text-center space-x-4">
        <Link
          href="/history"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          View Study History
        </Link>
        <span className="text-gray-400">•</span>
        <Link
          href="/stats"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          View Statistics
        </Link>
      </div>
    </main>
  );
}
