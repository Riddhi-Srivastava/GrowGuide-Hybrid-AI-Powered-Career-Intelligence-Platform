import { Request, Response } from "express";
import mongoose from "mongoose";
import { AnalysisHistory } from "../models/AnalysisHistory.js";
import { analyzeCareer, getCareerRoles } from "../services/careerAnalysisService.js";

const validateAnalyzeBody = (body: Request["body"]) => {
  if (!body || typeof body.role !== "string" || !body.role.trim()) {
    const error = new Error("Target role is required.") as Error & { statusCode?: number };
    error.statusCode = 400;
    throw error;
  }

  if (!Array.isArray(body.skills) || body.skills.length === 0) {
    const error = new Error("At least one current skill is required.") as Error & { statusCode?: number };
    error.statusCode = 400;
    throw error;
  }

  return {
    role: body.role.trim(),
    skills: body.skills.map((skill: unknown) => String(skill).trim()).filter(Boolean),
    hoursPerDay: Number(body.hoursPerDay ?? 2),
    targetWeeks: Number(body.targetWeeks ?? 12)
  };
};

export const analyze = async (req: Request, res: Response) => {
  const query = validateAnalyzeBody(req.body);
  const result = analyzeCareer(query);
  const entry =
    mongoose.connection.readyState === 1
      ? await AnalysisHistory.create({ query, result }).catch(() => null)
      : null;

  res.status(201).json({
    id: entry?._id,
    timestamp: entry?.createdAt ?? new Date().toISOString(),
    query,
    result
  });
};

export const listAnalysisHistory = async (_req: Request, res: Response) => {
  const entries = await AnalysisHistory.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  res.json({
    entries: entries.map((entry) => ({
      id: entry._id,
      timestamp: entry.createdAt,
      query: entry.query,
      result: entry.result
    }))
  });
};

export const clearAnalysisHistory = async (_req: Request, res: Response) => {
  await AnalysisHistory.deleteMany({});
  res.status(204).send();
};

export const listRoles = (_req: Request, res: Response) => {
  res.json({ roles: getCareerRoles() });
};
