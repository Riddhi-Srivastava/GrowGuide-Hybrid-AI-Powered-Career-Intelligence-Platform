declare module "node-cron" {
  export interface ScheduledTask {
    start(): void;
    stop(): void;
    destroy(): void;
  }

  export function schedule(
    expression: string,
    task: () => void | Promise<void>,
    options?: { scheduled?: boolean; timezone?: string }
  ): ScheduledTask;
}
