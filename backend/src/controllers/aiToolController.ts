import { Request, Response } from "express";
import mongoose from "mongoose";
import { AITool } from "../models/AITool.js";
import { slugify } from "../utils/slugify.js";

const parseNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const getAllAITools = async (req: Request, res: Response) => {
  const page = parseNumber(req.query.page, 1);
  const limit = Math.min(parseNumber(req.query.limit, 12), 50);
  const skip = (page - 1) * limit;

  const search = String(req.query.search ?? "").trim();
  const category = String(req.query.category ?? "").trim();
  const tag = String(req.query.tag ?? "").trim();
  const trending = req.query.trending === "true";
  const sort = String(req.query.sort ?? "newest");

  const query: Record<string, unknown> = {
    status: "approved"
  };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } }
    ];
  }

  if (category) {
    query.category = category;
  }

  if (tag) {
    query.tags = { $in: [tag] };
  }

  if (trending) {
    query.isTrending = true;
  }

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    newest: { discoveredAt: -1, createdAt: -1 },
    oldest: { discoveredAt: 1, createdAt: 1 },
    popular: { popularityScore: -1, createdAt: -1 }
  };

  const [items, total] = await Promise.all([
    AITool.find(query).sort(sortMap[sort] ?? sortMap.newest).skip(skip).limit(limit),
    AITool.countDocuments(query)
  ]);

  res.json({
    items,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  });
};

export const getTrendingAITools = async (_req: Request, res: Response) => {
  const items = await AITool.find({ status: "approved", isTrending: true })
    .sort({ popularityScore: -1, discoveredAt: -1 })
    .limit(10);

  res.json(items);
};

export const getAIToolBySlugOrId = async (req: Request, res: Response) => {
  const { slugOrId } = req.params;

  const tool = mongoose.isValidObjectId(slugOrId)
    ? await AITool.findById(slugOrId)
    : await AITool.findOne({ slug: slugOrId });

  if (!tool || tool.status !== "approved") {
    return res.status(404).json({ message: "AI tool not found." });
  }

  return res.json(tool);
};

export const createAITool = async (req: Request, res: Response) => {
  const payload = req.body as Record<string, unknown>;

  const tool = await AITool.create({
    ...payload,
    slug: payload.slug ? String(payload.slug) : slugify(String(payload.name ?? ""))
  });

  res.status(201).json(tool);
};

export const updateAITool = async (req: Request, res: Response) => {
  const payload = req.body as Record<string, unknown>;

  if (payload.name && !payload.slug) {
    payload.slug = slugify(String(payload.name));
  }

  const tool = await AITool.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true
  });

  if (!tool) {
    return res.status(404).json({ message: "AI tool not found." });
  }

  return res.json(tool);
};

export const deleteAITool = async (req: Request, res: Response) => {
  const tool = await AITool.findByIdAndDelete(req.params.id);

  if (!tool) {
    return res.status(404).json({ message: "AI tool not found." });
  }

  return res.status(204).send();
};
