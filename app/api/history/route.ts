import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getStudyDates } from '@/lib/storage';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const studyDates = getStudyDates(session.user.id);
    
    const sortedDates = [...studyDates].sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    );

    return NextResponse.json({ studyDates: sortedDates });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
