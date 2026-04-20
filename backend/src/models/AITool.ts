import { InferSchemaType, Model, Schema, model } from "mongoose";
import { slugify } from "../utils/slugify.js";

const aiToolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    summary: {
      type: String,
      trim: true,
      default: ""
    },
    features: {
      type: [String],
      default: [],
      validate: {
        validator: (value: string[]) => value.length > 0,
        message: "At least one feature is required."
      }
    },
    developer: {
      type: String,
      required: true,
      trim: true
    },
    launchDate: {
      type: Date
    },
    tags: {
      type: [String],
      default: []
    },
    website: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    logoUrl: {
      type: String,
      trim: true,
      default: ""
    },
    source: {
      type: String,
      trim: true,
      default: "manual"
    },
    sourceUrl: {
      type: String,
      trim: true,
      default: ""
    },
    popularityScore: {
      type: Number,
      default: 0,
      min: 0
    },
    isTrending: {
      type: Boolean,
      default: false
    },
    discoveredAt: {
      type: Date,
      default: Date.now
    },
    lastCheckedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

aiToolSchema.pre("validate", function syncSlug(next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name);
  }
  next();
});

export type AIToolDocument = InferSchemaType<typeof aiToolSchema>;
export type AIToolModel = Model<AIToolDocument>;

export const AITool = model<AIToolDocument, AIToolModel>("AITool", aiToolSchema);
