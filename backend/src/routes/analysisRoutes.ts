import { Router } from "express";
import {
  analyze,
  clearAnalysisHistory,
  listAnalysisHistory,
  listRoles
} from "../controllers/analysisController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/roles", listRoles);
router.post("/", asyncHandler(analyze));
router.get("/history", asyncHandler(listAnalysisHistory));
router.delete("/history", asyncHandler(clearAnalysisHistory));

export default router;
