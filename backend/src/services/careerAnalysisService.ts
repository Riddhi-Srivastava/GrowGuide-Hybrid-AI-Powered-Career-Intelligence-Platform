import { CareerSkill, loadCareerModel, TrainedCareerRole } from "../data/careerModel.js";

export interface AnalyzeInput {
  role: string;
  skills: string[];
  hoursPerDay?: number;
  targetWeeks?: number;
}

export interface AnalysisResult {
  role: string;
  predictedRole: string;
  matchScore: number;
  roleConfidence: number;
  matchedSkills: CareerSkill[];
  missingSkills: Array<CareerSkill & { priority: "High" | "Medium" | "Low" }>;
  roadmap: Array<{ phase: number; title: string; duration: string; skills: string[]; description: string }>;
  planner: Array<{ week: number; skill: string; hoursPerDay: number; totalHours: number; milestone: string }>;
  recommendations: string[];
  insights: string[];
  model: {
    trainedAt: string;
    sourceRows: number;
    roleCount: number;
  };
  source: "Backend Trained TF-IDF Model";
}

const stopwords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "for",
  "from",
  "in",
  "of",
  "on",
  "or",
  "the",
  "to",
  "with",
  "your"
]);

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1 && !stopwords.has(token));

const vectorMagnitude = (vector: Map<number, number>) => {
  let sum = 0;
  for (const value of vector.values()) {
    sum += value * value;
  }
  return Math.sqrt(sum);
};

const normalizeVector = (vector: Map<number, number>) => {
  const magnitude = vectorMagnitude(vector);
  if (!magnitude) return vector;

  for (const [index, value] of vector.entries()) {
    vector.set(index, value / magnitude);
  }
  return vector;
};

const buildQueryVector = (query: string) => {
  const model = loadCareerModel();
  const vocabularyIndex = new Map(model.vocabulary.map((term, index) => [term, index]));
  const counts = new Map<number, number>();
  const tokens = tokenize(query);
  const terms = [...tokens];

  for (let index = 0; index < tokens.length - 1; index += 1) {
    terms.push(`${tokens[index]} ${tokens[index + 1]}`);
  }

  for (const term of terms) {
    const vocabularyPosition = vocabularyIndex.get(term);
    if (vocabularyPosition !== undefined) {
      counts.set(vocabularyPosition, (counts.get(vocabularyPosition) ?? 0) + 1);
    }
  }

  const vector = new Map<number, number>();
  for (const [index, count] of counts.entries()) {
    vector.set(index, count * model.idf[index]);
  }

  return normalizeVector(vector);
};

const cosineWithSparseRole = (queryVector: Map<number, number>, roleVector: Array<[number, number]>) => {
  let score = 0;
  for (const [index, value] of roleVector) {
    score += (queryVector.get(index) ?? 0) * value;
  }
  return score;
};

const findBestRole = (query: string) => {
  const model = loadCareerModel();
  const queryVector = buildQueryVector(query);
  const normalizedQuery = normalizeText(query);

  const scored = model.roles.map((role) => {
    const vectorScore = cosineWithSparseRole(queryVector, role.vector);
    const roleName = normalizeText(role.roleName);
    const exactBoost = roleName === normalizedQuery ? 0.35 : 0;
    const partialBoost =
      roleName.includes(normalizedQuery) || normalizedQuery.includes(roleName) ? 0.18 : 0;
    const keywordBoost = role.keywords.some((keyword) => normalizedQuery.includes(normalizeText(keyword)))
      ? 0.12
      : 0;

    return {
      role,
      score: vectorScore + exactBoost + partialBoost + keywordBoost
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return {
    role: scored[0].role,
    confidence: Math.min(100, Math.round(scored[0].score * 100))
  };
};

const canonical = (value: string) => normalizeText(value).replace(/[^a-z0-9+#.]/g, "");

const hasSkill = (userSkills: string[], requiredSkill: string) => {
  const required = canonical(requiredSkill);
  return userSkills.some((skill) => {
    const userSkill = canonical(skill);
    return userSkill === required || required.includes(userSkill) || userSkill.includes(required);
  });
};

const priorityFor = (weight: number): "High" | "Medium" | "Low" => {
  if (weight >= 8) return "High";
  if (weight >= 5) return "Medium";
  return "Low";
};

const buildRoadmap = (missingSkills: CareerSkill[]): AnalysisResult["roadmap"] => {
  const sorted = [...missingSkills].sort((a, b) => b.weight - a.weight);
  const phaseSize = Math.max(1, Math.ceil(sorted.length / 3));
  const titles = ["Foundation And Core Readiness", "Applied Practice", "Advanced Role Preparation"];
  const durations = ["2-4 weeks", "4-6 weeks", "6-8 weeks"];

  return Array.from({ length: Math.ceil(sorted.length / phaseSize) }, (_, index) => {
    const skills = sorted.slice(index * phaseSize, index * phaseSize + phaseSize);
    return {
      phase: index + 1,
      title: titles[index] ?? `Phase ${index + 1}`,
      duration: durations[index] ?? "4-8 weeks",
      skills: skills.map((skill) => skill.name),
      description: `Build evidence around ${skills.map((skill) => skill.name).join(", ")} through focused study, practice, and role-specific projects.`
    };
  });
};

const buildPlanner = (
  missingSkills: CareerSkill[],
  hoursPerDay: number,
  targetWeeks: number
): AnalysisResult["planner"] => {
  const sorted = [...missingSkills].sort((a, b) => b.weight - a.weight);
  const weeksPerSkill = Math.max(1, Math.floor(targetWeeks / Math.max(sorted.length, 1)));

  return sorted.map((skill, index) => ({
    week: index * weeksPerSkill + 1,
    skill: skill.name,
    hoursPerDay,
    totalHours: hoursPerDay * 7 * weeksPerSkill,
    milestone: `Complete ${skill.name} fundamentals and create one proof-of-work artifact.`
  }));
};

const buildRecommendations = (role: TrainedCareerRole, matched: CareerSkill[], missing: CareerSkill[]) => {
  const recommendations = [
    `Use the trained Kaggle/job-data model's closest role match: ${role.roleName}.`,
    "Build a portfolio or preparation plan around the highest-weight missing skills."
  ];

  if (matched.length) {
    recommendations.unshift(`Use your existing strength in ${matched.slice(0, 3).map((skill) => skill.name).join(", ")} as leverage.`);
  }

  if (missing.length) {
    recommendations.unshift(`Start with ${missing[0].name}; it has the highest missing skill weight for this role.`);
  }

  return recommendations;
};

const buildInsights = (matchScore: number, confidence: number, missing: CareerSkill[]) => {
  const insights = [`Role prediction confidence: ${confidence}%.`];

  if (matchScore >= 80) {
    insights.push("You are close to readiness for the predicted role.");
  } else if (matchScore >= 50) {
    insights.push("You have a usable base, but the roadmap should close important gaps.");
  } else {
    insights.push("This role needs a foundation-building plan before advanced preparation.");
  }

  if (missing.length) {
    insights.push(`Highest priority gap: ${missing[0].name}.`);
  }

  return insights;
};

export const analyzeCareer = (input: AnalyzeInput): AnalysisResult => {
  const model = loadCareerModel();
  const hoursPerDay = Math.min(Math.max(Number(input.hoursPerDay ?? 2), 1), 12);
  const targetWeeks = Math.min(Math.max(Number(input.targetWeeks ?? 12), 1), 52);
  const { role, confidence } = findBestRole(input.role);

  const matchedSkills: CareerSkill[] = [];
  const missingSkills: AnalysisResult["missingSkills"] = [];

  for (const requiredSkill of role.requiredSkills) {
    if (hasSkill(input.skills, requiredSkill.name)) {
      matchedSkills.push(requiredSkill);
    } else {
      missingSkills.push({ ...requiredSkill, priority: priorityFor(requiredSkill.weight) });
    }
  }

  const totalWeight = role.requiredSkills.reduce((sum, skill) => sum + skill.weight, 0);
  const matchedWeight = matchedSkills.reduce((sum, skill) => sum + skill.weight, 0);
  const matchScore = totalWeight ? Math.round((matchedWeight / totalWeight) * 100) : 0;
  const sortedMissing = missingSkills.sort((a, b) => b.weight - a.weight);

  return {
    role: role.roleName,
    predictedRole: role.roleName,
    matchScore,
    roleConfidence: confidence,
    matchedSkills,
    missingSkills: sortedMissing,
    roadmap: buildRoadmap(sortedMissing),
    planner: buildPlanner(sortedMissing, hoursPerDay, targetWeeks),
    recommendations: buildRecommendations(role, matchedSkills, sortedMissing),
    insights: buildInsights(matchScore, confidence, sortedMissing),
    model: {
      trainedAt: model.trainedAt,
      sourceRows: model.sourceRows,
      roleCount: model.roleCount
    },
    source: "Backend Trained TF-IDF Model"
  };
};

export const getCareerRoles = () => loadCareerModel().roles.map((role) => role.roleName);
