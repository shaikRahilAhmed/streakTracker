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
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Statistics & Insights 📊
      </h1>

      <StatsView />
    </main>
  );
}
