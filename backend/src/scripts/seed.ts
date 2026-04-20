import { connectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import { seedTools } from "../data/seedTools.js";
import { AITool } from "../models/AITool.js";
import { slugify } from "../utils/slugify.js";

const run = async () => {
  await connectDatabase(env.mongoUri);

  for (const tool of seedTools) {
    await AITool.findOneAndUpdate(
      { website: tool.website },
      {
        ...tool,
        slug: slugify(tool.name),
        source: "seed",
        sourceUrl: tool.website,
        status: "approved"
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
      }
    );
  }

  console.log(`Seeded ${seedTools.length} AI tools.`);
  process.exit(0);
};

run().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});
