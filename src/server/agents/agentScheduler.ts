import cron from 'node-cron';

export type AgentTask = () => Promise<void> | void;

export class AgentScheduler {
  private tasks: { cron: string; task: AgentTask }[] = [];

  register(cronExpression: string, task: AgentTask) {
    this.tasks.push({ cron: cronExpression, task });
  }

  start() {
    for (const { cron: expr, task } of this.tasks) {
      cron.schedule(expr, () => {
        try {
          Promise.resolve(task());
        } catch (err) {
          console.error('Agent task failed', err);
        }
      });
    }
  }
}

export const globalAgentScheduler = new AgentScheduler();
