import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'studies.json');

interface UserStudyData {
  [userId: string]: {
    studyDates: string[];
    bestStreak: number;
  };
}

// make sure data directory and file exist
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2));
  }
}

function getAllData(): UserStudyData {
  ensureDataFile();
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

export function getStudyDates(userId: string): string[] {
  const allData = getAllData();
  return allData[userId]?.studyDates || [];
}

export function getBestStreak(userId: string): number {
  const allData = getAllData();
  return allData[userId]?.bestStreak || 0;
}

export function addStudyDate(userId: string, date: string): boolean {
  ensureDataFile();
  const allData = getAllData();
  
  // create user entry if it doesn't exist
  if (!allData[userId]) {
    allData[userId] = { studyDates: [], bestStreak: 0 };
  }
  
  // check if date already exists
  if (allData[userId].studyDates.includes(date)) {
    return false; // already marked for this day
  }
  
  allData[userId].studyDates.push(date);
  fs.writeFileSync(DATA_FILE, JSON.stringify(allData, null, 2));
  return true;
}

export function updateBestStreak(userId: string, streak: number): void {
  ensureDataFile();
  const allData = getAllData();
  
  if (!allData[userId]) {
    allData[userId] = { studyDates: [], bestStreak: 0 };
  }
  
  // only update if current streak is better than best streak
  if (streak > allData[userId].bestStreak) {
    allData[userId].bestStreak = streak;
    fs.writeFileSync(DATA_FILE, JSON.stringify(allData, null, 2));
  }
}
