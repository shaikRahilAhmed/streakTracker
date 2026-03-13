# Daily Learning Streak Tracker

A full-stack web application to help students maintain consistent daily learning habits with user authentication and detailed statistics.

## Project Description

This application allows students to:
- Create personal accounts with secure authentication
- Mark when they studied each day
- Track their current study streak
- View their best streak record
- See weekly and monthly statistics
- View complete study history with visual calendar
- Get motivational messages based on streak progress

Built with Next.js, TypeScript, Tailwind CSS, and NextAuth.js.

## Technology Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **NextAuth.js** for authentication
- **bcryptjs** for password hashing
- **API Routes** for backend
- **JSON file storage** for data persistence

## Features

### Authentication
- Secure sign up and sign in
- Password hashing with bcryptjs
- Session management with NextAuth.js
- Protected routes

### Dashboard
- Current streak counter with fire emoji 🔥
- Total study days counter
- Best streak record (personal best)
- Last study date
- Motivational messages based on streak
- "I Studied Today" button

### Streak Logic
The streak system follows these rules:
- If you study today and studied yesterday → streak continues
- If you miss a day → streak resets to 1
- You cannot mark the same day twice

Example:
- Day 1: Study → Streak = 1
- Day 2: Study → Streak = 2
- Day 3: Study → Streak = 3
- Day 4: Miss → Streak = 0
- Day 5: Study → Streak = 1

### Study History
- View all study dates in chronological order (newest first)
- Clean, simple list interface

### Statistics & Insights
- This week's study count
- This month's study count
- Weekly average calculation
- Visual 30-day calendar view
- Color-coded study days

### Motivational System
Dynamic messages based on streak:
- 30+ days: "🌟 Incredible! 30+ days! You're a learning champion!"
- 21+ days: "💪 Amazing! 21 days - You've built a solid habit!"
- 14+ days: "🎯 Two weeks strong! Keep the momentum going!"
- 7+ days: "🔥 One week streak! You're on fire!"
- 3+ days: "✨ Great start! Keep it up!"
- 1+ days: "🚀 You're doing great! Every day counts!"

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd daily-learning-streak-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Generate a NextAuth secret:
```bash
openssl rand -base64 32
```

5. Update `.env.local`:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here
```

6. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - `NEXTAUTH_URL`: Your Vercel app URL (e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: Your generated secret key
5. Deploy!

Your app will be live at `https://your-project.vercel.app`

## Project Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/route.ts  # NextAuth handler
│   │   └── signup/route.ts         # User registration
│   ├── study/route.ts              # POST endpoint to mark study
│   ├── streak/route.ts             # GET endpoint for streak data
│   └── history/route.ts            # GET endpoint for study history
├── auth/
│   ├── signin/page.tsx             # Sign in page
│   └── signup/page.tsx             # Sign up page
├── history/
│   └── page.tsx                    # Study history page
├── stats/
│   └── page.tsx                    # Statistics page
├── layout.tsx                      # Root layout with auth
├── page.tsx                        # Dashboard page (protected)
└── globals.css                     # Global styles

components/
├── SessionProvider.tsx             # NextAuth session wrapper
├── Header.tsx                      # Navigation header
├── StreakCard.tsx                  # Displays streak statistics
├── StudyButton.tsx                 # Button to mark study
├── HistoryList.tsx                 # List of study dates
└── StatsView.tsx                   # Statistics and calendar

lib/
├── auth.ts                         # NextAuth configuration
├── userStorage.ts                  # User data management
├── streakLogic.ts                  # Streak calculation logic
└── storage.ts                      # Study data persistence

types/
└── next-auth.d.ts                  # TypeScript types for NextAuth

middleware.ts                       # Route protection
```

## API Endpoints

### POST /api/auth/signup
Creates a new user account.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### POST /api/study
Marks today as studied (requires authentication).

**Response:**
- Success: `{ message: "Study marked successfully!", date: "2026-03-13" }`
- Already marked: `{ message: "You have already marked today." }`

### GET /api/streak
Returns current streak data (requires authentication).

**Response:**
```json
{
  "currentStreak": 4,
  "totalDays": 10,
  "lastStudyDate": "2026-03-13",
  "bestStreak": 7
}
```

### GET /api/history
Returns all study dates (requires authentication, newest first).

**Response:**
```json
{
  "studyDates": ["2026-03-13", "2026-03-12", "2026-03-11"]
}
```

## How Streak Logic Works

The streak calculation follows these steps:

1. **Get all study dates** from storage
2. **Sort dates** in descending order (newest first)
3. **Check last study date**:
   - If more than 1 day ago → streak = 0
   - If today or yesterday → continue counting
4. **Count consecutive days**:
   - Start from most recent date
   - For each date, check if previous date is exactly 1 day before
   - If yes → increment streak
   - If no → stop counting

This ensures the streak only counts consecutive study days and resets when a day is missed.

## License

MIT
