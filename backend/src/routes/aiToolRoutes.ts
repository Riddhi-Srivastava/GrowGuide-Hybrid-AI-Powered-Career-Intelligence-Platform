import { Router } from "express";
import {
  createAITool,
  deleteAITool,
  getAIToolBySlugOrId,
  getAllAITools,
  getTrendingAITools,
  updateAITool
} from "../controllers/aiToolController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getAllAITools));
router.get("/trending", asyncHandler(getTrendingAITools));
router.get("/:slugOrId", asyncHandler(getAIToolBySlugOrId));
router.post("/", asyncHandler(createAITool));
router.patch("/:id", asyncHandler(updateAITool));
router.delete("/:id", asyncHandler(deleteAITool));

export default router;
