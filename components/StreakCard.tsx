'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/streakLogic';

interface StreakData {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
  bestStreak: number;
}

export default function StreakCard() {
  const [data, setData] = useState<StreakData>({
    currentStreak: 0,
    totalDays: 0,
    lastStudyDate: null,
    bestStreak: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch streak data when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('/api/streak');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch streak data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
        Welcome Back! 👋
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Current Streak 🔥</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">
            {data.currentStreak}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {data.currentStreak === 1 ? 'day' : 'days'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Days 📖</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">{data.totalDays}</p>
          <p className="text-xs text-gray-500 mt-1">studied</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Best Streak 🏆</p>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600">
            {data.bestStreak}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {data.bestStreak === 1 ? 'day' : 'days'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Last Studied 📅</p>
          <p className="text-sm sm:text-lg font-semibold text-orange-600 break-words">
            {data.lastStudyDate ? formatDate(data.lastStudyDate) : 'Never'}
          </p>
        </div>
      </div>

      {data.currentStreak > 0 && (
        <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <p className="text-center text-sm sm:text-base text-gray-700 font-medium">
            {getMotivationalMessage(data.currentStreak)}
          </p>
        </div>
      )}
    </div>
  );
}

// show different messages based on how long the streak is
function getMotivationalMessage(streak: number): string {
  if (streak >= 30) {
    return "🌟 Incredible! 30+ days! You're a learning champion!";
  } else if (streak >= 21) {
    return "💪 Amazing! 21 days - You've built a solid habit!";
  } else if (streak >= 14) {
    return "🎯 Two weeks strong! Keep the momentum going!";
  } else if (streak >= 7) {
    return "🔥 One week streak! You're on fire!";
  } else if (streak >= 3) {
    return "✨ Great start! Keep it up!";
  } else {
    return "🚀 You're doing great! Every day counts!";
  }
}
