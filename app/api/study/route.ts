import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { addStudyDate, getStudyDates, updateBestStreak } from '@/lib/storage';
import { getTodayDate, calculateStreak } from '@/lib/streakLogic';

export async function POST() {
  try {
    // check if user is logged in
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const today = getTodayDate();
    const added = addStudyDate(session.user.id, today);

    if (!added) {
      return NextResponse.json(
        { message: 'You have already marked today.' },
        { status: 400 }
      );
    }

    // update streak and best streak
    const studyDates = getStudyDates(session.user.id);
    const currentStreak = calculateStreak(studyDates);
    updateBestStreak(session.user.id, currentStreak);

    return NextResponse.json(
      { message: 'Study marked successfully!', date: today },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to mark study' },
      { status: 500 }
    );
  }
}
