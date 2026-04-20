import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { startToolSyncJob } from "./jobs/toolSyncJob.js";

const bootstrap = async () => {
  try {
    await connectDatabase(env.mongoUri);
    console.log("MongoDB connected.");
  } catch (error) {
    console.warn("MongoDB unavailable. Server will run without history persistence.");
    console.warn(error instanceof Error ? error.message : error);
  }

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });

  startToolSyncJob();
};

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
