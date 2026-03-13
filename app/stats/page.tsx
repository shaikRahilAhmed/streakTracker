import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import StatsView from '@/components/StatsView';

export default async function StatsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <main className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        📊 Statistics & Insights
      </h1>

      <StatsView />
    </main>
  );
}
