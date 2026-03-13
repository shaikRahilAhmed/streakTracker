'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudyButton() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStudy = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/study', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        router.refresh();
        // reload page after a short delay to show the updated streak
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Failed to mark study. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={handleStudy}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors shadow-md"
      >
        {loading ? 'Marking...' : 'I Studied Today ✓'}
      </button>

      {message && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            message.includes('already')
              ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
              : message.includes('successfully')
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
