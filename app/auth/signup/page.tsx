'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [name, setName] = useState('');
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/auth/signin?registered=true');
      } else {
        setError(data.message || 'Failed to create account');
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
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-indigo-600 to-purple-700 p-10 text-white">
        <div className="flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <span className="text-4xl">📚</span>
              <div>
                <h1 className="text-2xl font-bold">Streak Tracker</h1>
                <p className="text-indigo-200 text-sm">Build better learning habits</p>
              </div>
            </div>

            <div className="space-y-5 mt-8">
              <div>
                <h3 className="font-semibold text-lg mb-2">📊 Track Your Progress</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  See your study patterns with detailed stats and calendar views
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">🔥 Maintain Your Streak</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  Stay motivated by keeping your daily learning streak alive
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">🎯 Set Goals</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  Challenge yourself to beat your personal best streak
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-indigo-400/30">
            <p className="text-indigo-200 text-sm italic">
              "The secret of getting ahead is getting started"
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
            <p className="text-gray-600 text-sm">Start your learning journey</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-600 text-sm mt-1">
                Join and start tracking your study habits
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
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
                  minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="At least 6 characters"
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
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md disabled:opacity-50 transition-colors mt-6"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* Mobile features */}
          <div className="md:hidden mt-6 space-y-3">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl">📊</span>
                <div>
                  <p className="font-medium text-gray-800 text-sm">Track Progress</p>
                  <p className="text-gray-600 text-xs mt-0.5">View stats and calendar</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl">🔥</span>
                <div>
                  <p className="font-medium text-gray-800 text-sm">Build Streaks</p>
                  <p className="text-gray-600 text-xs mt-0.5">Stay consistent daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
