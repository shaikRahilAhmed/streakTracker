'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        // redirect to dashboard on success
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - App Info (Hidden on mobile, shown on tablet+) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 lg:p-12 text-white flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="text-5xl">📚</div>
            <div>
              <h1 className="text-3xl font-bold">Streak Tracker</h1>
              <p className="text-blue-200 text-sm">Daily Learning Companion</p>
            </div>
          </div>

          <div className="space-y-6 mt-12">
            <h2 className="text-2xl font-semibold mb-6">
              Build Your Learning Habit
            </h2>
            
            <div className="flex items-start gap-4">
              <div className="text-3xl">🔥</div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Track Your Streak</h3>
                <p className="text-blue-100 text-sm">
                  Mark your daily study sessions and watch your streak grow day by day
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">📊</div>
              <div>
                <h3 className="font-semibold text-lg mb-1">View Statistics</h3>
                <p className="text-blue-100 text-sm">
                  Get insights with weekly, monthly stats and visual calendar
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">🏆</div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Beat Your Record</h3>
                <p className="text-blue-100 text-sm">
                  Challenge yourself to beat your best streak and stay motivated
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-3xl">💪</div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Stay Consistent</h3>
                <p className="text-blue-100 text-sm">
                  Build lasting learning habits with daily reminders and motivation
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-500">
          <p className="text-blue-200 text-sm">
            "Consistency is the key to success. Track your progress, stay motivated, and achieve your learning goals!"
          </p>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Streak Tracker
            </h1>
            <p className="text-gray-600">
              Build your daily learning habit
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-600 text-sm">
                Sign in to continue your learning streak
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-800 font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-8 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">Track Your Streak</h3>
                  <p className="text-gray-600 text-xs">Build consistent learning habits</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">View Statistics</h3>
                  <p className="text-gray-600 text-xs">Weekly & monthly insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
