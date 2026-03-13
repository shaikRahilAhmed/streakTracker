'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // don't show header on auth pages
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  if (!session) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
        <Link href="/" className="text-xl font-bold text-blue-600">
          📚 Streak Tracker
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-gray-700">
            {session.user.name}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
