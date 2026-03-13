'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // don't show header on auth pages
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  if (!session) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center max-w-6xl">
        <Link href="/" className="text-lg sm:text-xl font-bold text-blue-600 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="hidden sm:inline">Streak Tracker</span>
          <span className="sm:hidden">Streak</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-gray-700 text-sm">
            {session.user.name}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Sign Out
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 text-gray-600 hover:text-gray-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            <div className="text-gray-700 text-sm font-medium">
              {session.user.name}
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                signOut({ callbackUrl: '/auth/signin' });
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
