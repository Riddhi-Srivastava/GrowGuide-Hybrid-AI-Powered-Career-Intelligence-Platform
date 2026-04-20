import { InferSchemaType, Schema, model } from "mongoose";

const analysisHistorySchema = new Schema(
  {
    query: {
      role: { type: String, required: true, trim: true },
      skills: [{ type: String, required: true, trim: true }],
      hoursPerDay: { type: Number, required: true, min: 1, max: 12 },
      targetWeeks: { type: Number, required: true, min: 1, max: 52 }
    },
    result: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: true
  }
);

analysisHistorySchema.index({ createdAt: -1 });

export type AnalysisHistoryDocument = InferSchemaType<typeof analysisHistorySchema>;

export const AnalysisHistory = model<AnalysisHistoryDocument>(
  "AnalysisHistory",
  analysisHistorySchema
);
