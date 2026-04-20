import { AITool } from "../models/AITool.js";
import { seedTools } from "../data/seedTools.js";
import { slugify } from "../utils/slugify.js";

export const syncAIToolsFromSources = async () => {
  const synced: string[] = [];

  for (const tool of seedTools) {
    await AITool.findOneAndUpdate(
      { website: tool.website },
      {
        ...tool,
        slug: slugify(tool.name),
        source: "seed-sync",
        sourceUrl: tool.website,
        lastCheckedAt: new Date()
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );

    synced.push(tool.name);
  }

  return {
    count: synced.length,
    synced
  };
};
