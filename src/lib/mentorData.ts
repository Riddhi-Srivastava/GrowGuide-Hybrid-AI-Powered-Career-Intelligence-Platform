import { rolesDatabase } from "./careerData";

export interface Mentor {
  id: string;
  name: string;
  subject: string;
  role: string;
  rating: number;
  experience: string;
  pricePerSession: number; // ✅ renamed for clarity
  price: number; // kept for backward-compat with UI that expects `mentor.price`
  location: string;
  avatar: string;
}

export interface Booking {
  id: string;
  mentorId: string;
  mentorName: string;
  subject: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed";
}

const predefinedMentors = [
  "Abhay Pandey", "Satyam Pandey", "Riddhi Srivastava", "Vishnu Dubey",
  "Juni Srivastava", "Tanu Kushwaha", "Abhijeet Gupta", "Aditya Gupta",
  "Satyam Gupta", "Adarsh Chauhan", "Srishti Singh",
];

const gorakhpurAreas = [
  "Indira Nagar, Gorakhpur", "Golghar, Gorakhpur", "Mohaddipur, Gorakhpur",
  "Bedi Hatha, Gorakhpur", "Padri Bazar, Gorakhpur", "Tara Mandal, Gorakhpur",
  "Maharaj Ganj, Gorakhpur",
];

const avatarColors = ["🟣", "🔵", "🟢", "🟠", "🔴"];

const skillRoleMap: Record<string, string> = {
  react: "Frontend Developer", html: "Frontend Developer", css: "Frontend Developer",
  tailwind: "Frontend Developer", javascript: "Frontend Developer", typescript: "Frontend Developer",
  "node.js": "Backend Developer", nodejs: "Backend Developer", express: "Backend Developer",
  "express.js": "Backend Developer",
  mongodb: "Full Stack Developer", mern: "Full Stack Developer", "full stack": "Full Stack Developer",
  angular: "MEAN Stack Developer", "mean stack": "MEAN Stack Developer",
  sql: "Data Analyst", excel: "Data Analyst", "power bi": "Data Analyst", tableau: "Data Analyst",
  python: "Data Scientist", "machine learning": "Data Scientist", ml: "Data Scientist",
  "deep learning": "Data Scientist", tensorflow: "Data Scientist",
};

function getSkillRole(skill: string): string {
  return skillRoleMap[skill.toLowerCase().trim()] || `${skill} Specialist`;
}

function buildSkillWeightMap(): Map<string, number> {
  const map = new Map<string, number>();
  for (const role of rolesDatabase) {
    for (const s of role.requiredSkills) {
      const key = s.name.toLowerCase();
      map.set(key, (map.get(key) || 0) + s.weight);
    }
  }
  return map;
}

function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash % 1000) / 1000;
}

export function generateMentorsForSkills(missingSkills: { name: string }[]): Mentor[] {
  if (!missingSkills.length) return [];

  const weightMap = buildSkillWeightMap();

  const mentors: (Mentor & { score: number })[] = missingSkills.slice(0, 8).map((skill, idx) => {
    const r = seededRandom(skill.name + idx);
    const name = predefinedMentors[idx % predefinedMentors.length];
    const rating = +(3.5 + r * 1.5).toFixed(1);
    const skillWeight = weightMap.get(skill.name.toLowerCase()) || 1;
    const score = skillWeight + rating * 2;

    return {
      id: `mentor-${skill.name.toLowerCase().replace(/\s+/g, "-")}-${idx}`,
      name,
      subject: skill.name,
      role: getSkillRole(skill.name),
      rating,
      experience: `${Math.floor(1 + r * 2)}+ years`,
      
  // ✅ PRICE FIXED HERE (₹50–₹75)
  pricePerSession: Math.floor(50 + r * 25),
  // backward-compatible alias used by UI
  price: Math.floor(50 + r * 25),

      location: gorakhpurAreas[Math.floor(seededRandom(skill.name + "loc") * gorakhpurAreas.length)],
      avatar: avatarColors[idx % avatarColors.length],
      score,
    };
  });

  mentors.sort((a, b) => b.score - a.score);
  return mentors.slice(0, 5).map(({ score, ...m }) => m);
}

export function getTopMentorsSmart(missingSkills: { name: string }[]): Mentor[] {
  return generateMentorsForSkills(missingSkills);
}

const BOOKINGS_KEY = "growguide_bookings";

export function getBookings(): Booking[] {
  try { return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]"); }
  catch { return []; }
}

export function addBooking(booking: Booking): void {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}