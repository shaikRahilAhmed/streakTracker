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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Info section */}
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white">
        <div className="flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <span className="text-4xl">📚</span>
              <div>
                <h1 className="text-2xl font-bold">Streak Tracker</h1>
                <p className="text-blue-200 text-sm">Your daily learning companion</p>
              </div>
            </div>

            <div className="space-y-5 mt-8">
              <div>
                <h3 className="font-semibold text-lg mb-2">🔥 Daily Streaks</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Mark your study sessions and watch your streak grow
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">📈 Statistics</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Get insights with weekly and monthly study patterns
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">🏆 Best Record</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Track your personal best and challenge yourself
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-blue-400/30">
            <p className="text-blue-200 text-sm italic">
              "Success is the sum of small efforts repeated day in and day out"
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="md:hidden text-center mb-8">
            <span className="text-5xl">📚</span>
            <h1 className="text-2xl font-bold text-gray-800 mt-3 mb-1">
              Streak Tracker
            </h1>
            <p className="text-gray-600 text-sm">Continue your learning journey</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600 text-sm mt-1">
                Sign in to continue your streak
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md disabled:opacity-50 transition-colors mt-6"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Mobile features */}
          <div className="md:hidden mt-6 space-y-3">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl">🔥</span>
                <div>
                  <p className="font-medium text-gray-800 text-sm">Daily Streaks</p>
                  <p className="text-gray-600 text-xs mt-0.5">Build consistent habits</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl">📈</span>
                <div>
                  <p className="font-medium text-gray-800 text-sm">View Stats</p>
                  <p className="text-gray-600 text-xs mt-0.5">Track your progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
