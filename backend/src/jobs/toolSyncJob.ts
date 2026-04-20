import cron from "node-cron";
import { env } from "../config/env.js";
import { syncAIToolsFromSources } from "../services/toolSyncService.js";

export const startToolSyncJob = () => {
  cron.schedule(env.syncCron, async () => {
    try {
      const result = await syncAIToolsFromSources();
      console.log(`[sync-job] synced ${result.count} tools`);
    } catch (error) {
      console.error("[sync-job] failed", error);
    }
  });
};
