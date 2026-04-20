import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export interface CareerSkill {
  name: string;
  weight: number;
  category: string;
}

export interface TrainedCareerRole {
  roleName: string;
  keywords: string[];
  examples: number;
  requiredSkills: CareerSkill[];
  vector: Array<[number, number]>;
}

export interface CareerModelArtifact {
  version: number;
  trainedAt: string;
  sourceRows: number;
  roleCount: number;
  vocabulary: string[];
  idf: number[];
  roles: TrainedCareerRole[];
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const artifactPath = resolve(__dirname, "../../ml/artifacts/career_model.json");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const validateSkill = (value: unknown): CareerSkill => {
  if (!isRecord(value)) {
    throw new Error("Invalid model artifact: skill must be an object.");
  }

  if (typeof value.name !== "string" || !value.name.trim()) {
    throw new Error("Invalid model artifact: skill.name is required.");
  }

  if (typeof value.weight !== "number" || value.weight < 1 || value.weight > 10) {
    throw new Error("Invalid model artifact: skill.weight must be 1-10.");
  }

  if (typeof value.category !== "string" || !value.category.trim()) {
    throw new Error("Invalid model artifact: skill.category is required.");
  }

  return {
    name: value.name,
    weight: value.weight,
    category: value.category
  };
};

const validateRole = (value: unknown): TrainedCareerRole => {
  if (!isRecord(value)) {
    throw new Error("Invalid model artifact: role must be an object.");
  }

  if (typeof value.roleName !== "string" || !value.roleName.trim()) {
    throw new Error("Invalid model artifact: roleName is required.");
  }

  if (!Array.isArray(value.keywords) || !value.keywords.every((keyword) => typeof keyword === "string")) {
    throw new Error(`Invalid model artifact: ${value.roleName} keywords must be strings.`);
  }

  if (!Array.isArray(value.requiredSkills) || value.requiredSkills.length === 0) {
    throw new Error(`Invalid model artifact: ${value.roleName} requiredSkills must be non-empty.`);
  }

  if (
    !Array.isArray(value.vector) ||
    !value.vector.every(
      (item) =>
        Array.isArray(item) &&
        item.length === 2 &&
        Number.isInteger(item[0]) &&
        typeof item[1] === "number"
    )
  ) {
    throw new Error(`Invalid model artifact: ${value.roleName} vector is invalid.`);
  }

  return {
    roleName: value.roleName,
    keywords: value.keywords,
    examples: typeof value.examples === "number" ? value.examples : 0,
    requiredSkills: value.requiredSkills.map(validateSkill),
    vector: value.vector as Array<[number, number]>
  };
};

const validateArtifact = (value: unknown): CareerModelArtifact => {
  if (!isRecord(value)) {
    throw new Error("Invalid model artifact: root must be an object.");
  }

  if (!Array.isArray(value.vocabulary) || !value.vocabulary.every((term) => typeof term === "string")) {
    throw new Error("Invalid model artifact: vocabulary must be a string array.");
  }

  if (!Array.isArray(value.idf) || !value.idf.every((weight) => typeof weight === "number")) {
    throw new Error("Invalid model artifact: idf must be a number array.");
  }

  if (value.vocabulary.length !== value.idf.length) {
    throw new Error("Invalid model artifact: vocabulary and idf lengths must match.");
  }

  if (!Array.isArray(value.roles) || value.roles.length === 0) {
    throw new Error("Invalid model artifact: roles must be a non-empty array.");
  }

  return {
    version: typeof value.version === "number" ? value.version : 1,
    trainedAt: typeof value.trainedAt === "string" ? value.trainedAt : "",
    sourceRows: typeof value.sourceRows === "number" ? value.sourceRows : 0,
    roleCount: typeof value.roleCount === "number" ? value.roleCount : value.roles.length,
    vocabulary: value.vocabulary,
    idf: value.idf,
    roles: value.roles.map(validateRole)
  };
};

let cachedModel: CareerModelArtifact | null = null;

export const loadCareerModel = () => {
  if (cachedModel) return cachedModel;

  try {
    const raw = readFileSync(artifactPath, "utf8");
    cachedModel = validateArtifact(JSON.parse(raw));
    return cachedModel;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown model error.";
    throw new Error(
      `Career model is not trained. Add Kaggle/job CSV data to backend/ml/data and run npm run train:model. ${message}`
    );
  }
};
