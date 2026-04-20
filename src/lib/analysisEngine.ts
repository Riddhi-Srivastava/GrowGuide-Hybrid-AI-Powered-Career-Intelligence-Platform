import Fuse from "fuse.js";
import { rolesDatabase, skillSynonyms, type RoleData } from "./careerData";

export interface AnalysisResult {
  role: string;
  matchScore: number;
  matchedSkills: { name: string; weight: number; category: string }[];
  missingSkills: { name: string; weight: number; category: string; priority: string }[];
  roadmap: { phase: number; title: string; duration: string; skills: string[]; description: string }[];
  planner: { week: number; skill: string; hoursPerDay: number; totalHours: number; milestone: string }[];
  recommendations: string[];
  source: "AI" | "Offline NLP";
}

function normalizeSkill(skill: string): string {
  const lower = skill.toLowerCase().trim();
  for (const [canonical, synonyms] of Object.entries(skillSynonyms)) {
    if (synonyms.includes(lower) || canonical === lower) return canonical;
  }
  return lower;
}

function findRole(query: string): RoleData | null {
  const q = query.toLowerCase().trim();

  // Exact keyword match first
  for (const role of rolesDatabase) {
    if (role.keywords.some(k => q.includes(k) || k.includes(q))) return role;
  }

  // Fuzzy search
  const fuse = new Fuse(rolesDatabase, {
    keys: ["roleName", "keywords"],
    threshold: 0.1,
    includeScore: true,
  });
  const results = fuse.search(q);
  return results.length > 0 ? results[0].item : null;
}

function generateRoadmap(missing: { name: string; weight: number; category: string }[]): AnalysisResult["roadmap"] {
  const sorted = [...missing].sort((a, b) => b.weight - a.weight);
  const phases: AnalysisResult["roadmap"] = [];
  const chunkSize = Math.max(2, Math.ceil(sorted.length / 3));

  for (let i = 0; i < sorted.length; i += chunkSize) {
    const chunk = sorted.slice(i, i + chunkSize);
    const phaseNum = Math.floor(i / chunkSize) + 1;
    const titles = ["Foundation & Core Skills", "Intermediate Growth", "Advanced Mastery", "Specialization"];
    const durations = ["2-4 weeks", "3-6 weeks", "4-8 weeks", "6-12 weeks"];
    phases.push({
      phase: phaseNum,
      title: titles[phaseNum - 1] || `Phase ${phaseNum}`,
      duration: durations[phaseNum - 1] || "4-8 weeks",
      skills: chunk.map(s => s.name),
      description: `Focus on mastering ${chunk.map(s => s.name).join(", ")} to strengthen your profile.`,
    });
  }
  return phases;
}

function generatePlanner(
  missing: { name: string; weight: number }[],
  hoursPerDay: number,
  targetWeeks: number
): AnalysisResult["planner"] {
  const sorted = [...missing].sort((a, b) => b.weight - a.weight);
  const weeksPerSkill = Math.max(1, Math.floor(targetWeeks / sorted.length));

  return sorted.map((skill, i) => ({
    week: i * weeksPerSkill + 1,
    skill: skill.name,
    hoursPerDay,
    totalHours: hoursPerDay * 7 * weeksPerSkill,
    milestone: `Complete ${skill.name} fundamentals and build a mini-project`,
  }));
}

function generateRecommendations(matched: string[], missing: string[], role: string): string[] {
  const recs: string[] = [];
  if (matched.length > 0) recs.push(`Leverage your strengths in ${matched.slice(0, 3).join(", ")} to build projects`);
  if (missing.length > 0) recs.push(`Prioritize learning ${missing[0]} as it has the highest impact for ${role}`);
  if (missing.length > 2) recs.push(`Consider a structured bootcamp or course covering ${missing.slice(0, 3).join(", ")}`);
  recs.push("Build portfolio projects that combine your existing and new skills");
  recs.push("Contribute to open-source projects in your target domain");
  if (missing.length > 4) recs.push("Focus on 2-3 skills at a time rather than spreading thin");
  return recs;
}

export function analyzeOffline(
  roleQuery: string,
  userSkills: string[],
  hoursPerDay: number = 2,
  targetWeeks: number = 12
): AnalysisResult | null {
  const role = findRole(roleQuery);
  if (!role) return null;

  const normalizedUserSkills = userSkills.map(normalizeSkill);

  const matched: AnalysisResult["matchedSkills"] = [];
  const missing: AnalysisResult["missingSkills"] = [];

  for (const req of role.requiredSkills) {
    const reqNorm = normalizeSkill(req.name);
    const isMatched = normalizedUserSkills.some(us => {
      if (us === reqNorm) return true;
      const syns = skillSynonyms[reqNorm] || [];
      return syns.includes(us);
    });

    if (isMatched) {
      matched.push(req);
    } else {
      missing.push({
        ...req,
        priority: req.weight >= 8 ? "High" : req.weight >= 5 ? "Medium" : "Low",
      });
    }
  }

  const totalWeight = role.requiredSkills.reduce((sum, s) => sum + s.weight, 0);
  const matchedWeight = matched.reduce((sum, s) => sum + s.weight, 0);
  const matchScore = Math.round((matchedWeight / totalWeight) * 100);

  return {
    role: role.roleName,
    matchScore,
    matchedSkills: matched,
    missingSkills: missing.sort((a, b) => b.weight - a.weight),
    roadmap: generateRoadmap(missing),
    planner: generatePlanner(missing, hoursPerDay, targetWeeks),
    recommendations: generateRecommendations(
      matched.map(s => s.name),
      missing.map(s => s.name),
      role.roleName
    ),
    source: "Offline NLP",
  };
}

export function getAvailableRoles(): string[] {
  return rolesDatabase.map(r => r.roleName);
}
