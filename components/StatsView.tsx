'use client';

import { useEffect, useState } from 'react';

interface Stats {
  thisWeek: number;
  thisMonth: number;
  weeklyAverage: number;
  studyDates: string[];
}

export default function StatsView() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/history');
        const data = await response.json();
        
        const studyDates = data.studyDates;
        const now = new Date();
        
        // calculate dates for filtering
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const monthAgo = new Date(now);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        
        // count studies in the last week
        const thisWeek = studyDates.filter((date: string) => 
          new Date(date) >= weekAgo
        ).length;
        
        // count studies in the last month
        const thisMonth = studyDates.filter((date: string) => 
          new Date(date) >= monthAgo
        ).length;
        
        // calculate weekly average
        const weeklyAverage = studyDates.length > 0 
          ? Math.round((studyDates.length / Math.max(1, Math.ceil((now.getTime() - new Date(studyDates[studyDates.length - 1]).getTime()) / (7 * 24 * 60 * 60 * 1000)))) * 10) / 10
          : 0;
        
        setStats({
          thisWeek,
          thisMonth,
          weeklyAverage,
          studyDates,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-gray-500">Loading statistics...</div>;
  }

  if (!stats) {
    return <div className="text-gray-500">Failed to load statistics</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">This Week</p>
          <p className="text-3xl sm:text-4xl font-bold text-blue-600">{stats.thisWeek}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">days studied</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">This Month</p>
          <p className="text-3xl sm:text-4xl font-bold text-green-600">{stats.thisMonth}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">days studied</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">Weekly Average</p>
          <p className="text-3xl sm:text-4xl font-bold text-purple-600">{stats.weeklyAverage}</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">days per week</p>
        </div>
      </div>

      {/* Calendar view for last 30 days */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          Study Calendar (Last 30 Days)
        </h2>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {Array.from({ length: 30 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            const dateStr = date.toISOString().split('T')[0];
            const studied = stats.studyDates.includes(dateStr);
            
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm ${
                  studied
                    ? 'bg-green-500 text-white font-semibold'
                    : 'bg-gray-100 text-gray-400'
                }`}
                title={dateStr}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-center gap-4 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded"></div>
            <span>Studied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-100 rounded"></div>
            <span>Missed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
