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
        // redirect to signin page after successful registration
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - App Info (Hidden on mobile, shown on tablet+) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 p-8 lg:p-12 text-white flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="text-5xl">📚</div>
            <div>
              <h1 className="text-3xl font-bold">Streak Tracker</h1>
              <p className="text-purple-200 text-sm">Your Learning Journey Starts Here</p>
            </div>
          </div>

          <div className="space-y-6 mt-12">
            <h2 className="text-2xl font-semibold mb-6">
              Why Join Streak Tracker?
            </h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">✨</span>
                <h3 className="font-semibold text-lg">Free Forever</h3>
              </div>
              <p className="text-purple-100 text-sm">
                No credit card required. Start tracking your learning journey today at no cost.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🎯</span>
                <h3 className="font-semibold text-lg">Stay Motivated</h3>
              </div>
              <p className="text-purple-100 text-sm">
                Visual progress tracking and motivational messages keep you going every day.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📈</span>
                <h3 className="font-semibold text-lg">Track Progress</h3>
              </div>
              <p className="text-purple-100 text-sm">
                Detailed statistics, calendar views, and insights into your learning patterns.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🔒</span>
                <h3 className="font-semibold text-lg">Secure & Private</h3>
              </div>
              <p className="text-purple-100 text-sm">
                Your data is encrypted and secure. We respect your privacy always.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-purple-400">
          <div className="flex items-center gap-8 text-sm">
            <div>
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-purple-200">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-purple-200">Study Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-purple-200">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Streak Tracker
            </h1>
            <p className="text-gray-600">
              Start your learning journey today
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600 text-sm">
                Join thousands of learners building consistent habits
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="At least 6 characters"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters long
                </p>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link href="/auth/signin" className="text-purple-600 hover:text-purple-800 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-8 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 shadow-sm text-center">
              <div className="text-2xl mb-1">✨</div>
              <p className="text-xs font-semibold text-gray-800">Free Forever</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm text-center">
              <div className="text-2xl mb-1">🎯</div>
              <p className="text-xs font-semibold text-gray-800">Stay Motivated</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm text-center">
              <div className="text-2xl mb-1">📈</div>
              <p className="text-xs font-semibold text-gray-800">Track Progress</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm text-center">
              <div className="text-2xl mb-1">🔒</div>
              <p className="text-xs font-semibold text-gray-800">Secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
