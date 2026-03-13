export interface StudyRecord {
  date: string; // YYYY-MM-DD format
}

export interface StreakData {
  currentStreak: number;
  totalDays: number;
  lastStudyDate: string | null;
  studyDates: string[];
}

// calculate the current streak based on study dates
export function calculateStreak(studyDates: string[]): number {
  if (studyDates.length === 0) return 0;

  // sort dates from newest to oldest
  const sortedDates = [...studyDates].sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastStudyDate = new Date(sortedDates[0]);
  lastStudyDate.setHours(0, 0, 0, 0);

  // check how many days since last study
  const daysDiff = Math.floor(
    (today.getTime() - lastStudyDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // if more than 1 day has passed, streak is broken
  if (daysDiff > 1) return 0;

  let streak = 1;
  // loop through dates and count consecutive days
  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i - 1]);
    const prevDate = new Date(sortedDates[i]);
    
    currentDate.setHours(0, 0, 0, 0);
    prevDate.setHours(0, 0, 0, 0);

    const diff = Math.floor(
      (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  return date.toLocaleDateString('en-GB', options);
}
