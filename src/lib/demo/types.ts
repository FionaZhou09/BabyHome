export type ActivityCategory = "feeding" | "diaper" | "sleep" | "pumping" | "other";

export interface DemoActivity {
  id: number;
  userId: string;
  category: ActivityCategory;
  babyAgeMonths: number;
  timestamp: string;
  feedingType?: string;
  feedingSide?: string;
  feedingDuration?: number;
  feedingAmount?: number;
  diaperType?: string;
  sleepLocation?: string;
  sleepStart?: string;
  sleepEnd?: string;
  pumpingDuration?: number;
  pumpingLeftAmount?: number;
  pumpingRightAmount?: number;
  otherNote?: string;
  notes?: string;
}

export interface DemoInsight {
  id: number;
  userId: string;
  content: string;
  generatedAt: string;
}

export interface DemoChatMessage {
  id: number;
  userId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
