import { globalAgentScheduler } from './agentScheduler';

// Placeholder for LocalAGI integration
async function callLocalAGI(action: string) {
  // In a real implementation this would call the LocalAGI service
  console.log(`[LocalAGI] Executing action: ${action}`);
}

export function registerLocalAgiAgents() {
  // Example: run every hour
  globalAgentScheduler.register('0 * * * *', () => callLocalAGI('hourlyTask'));
}
