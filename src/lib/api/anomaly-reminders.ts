import { request } from "./request";

export interface AnomalyReminderResponse {
  generatedAt: string;
  reminders: {
    code: "feeding-earlier-than-usual" | "wet-diapers-decreased" | "sleep-suddenly-longer";
    severity: "watch" | "urgent";
    title: string;
    message: string;
    suggestion: string;
    detectedAt: string;
    metrics: Record<string, number>;
  }[];
}

export async function fetchAnomalyReminders() {
  const response = await request("/api/alerts/anomalies");
  if (!response.ok) {
    throw new Error(`Anomaly reminder request failed: ${response.status}`);
  }

  return (await response.json()) as AnomalyReminderResponse;
}
