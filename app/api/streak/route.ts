import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getStudyDates, getBestStreak } from '@/lib/storage';
import { calculateStreak } from '@/lib/streakLogic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // make sure user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const studyDates = getStudyDates(userId);
    const currentStreak = calculateStreak(studyDates);
    const totalDays = studyDates.length;
    const bestStreak = getBestStreak(userId);
    
    // get the most recent study date
    const sortedDates = [...studyDates].sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    );
    const lastStudyDate = sortedDates[0] || null;

    return NextResponse.json({
      currentStreak,
      totalDays,
      lastStudyDate,
      bestStreak,
    });
  } catch (error) {
    console.error('Error fetching streak:', error);
    return NextResponse.json(
      { message: 'Failed to fetch streak data' },
      { status: 500 }
    );
  }
}
