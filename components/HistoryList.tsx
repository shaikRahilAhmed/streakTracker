'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/streakLogic';

export default function HistoryList() {
  const [studyDates, setStudyDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch study history when component loads
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/history');
        const data = await response.json();
        setStudyDates(data.studyDates);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">Loading history...</p>
      </div>
    );
  }

  // show message if no study records exist
  if (studyDates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">
          No study records yet. Start your streak today!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <ul className="space-y-3">
        {studyDates.map((date, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-800 font-medium">
              {formatDate(date)}
            </span>
            <span className="text-green-600 text-xl">✓</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
