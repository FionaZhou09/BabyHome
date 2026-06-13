export interface ChatStreamResource {
  name: string;
  phone: string;
  description: string;
  url: string;
}

export interface ChatStreamResourceNeed {
  level: "maternal-support" | "urgent-crisis";
  matchedSignals?: string[];
  resources: ChatStreamResource[];
}

export type ChatStreamEvent =
  | { type: "text"; text: string }
  | { type: "resource"; resourceNeed: ChatStreamResourceNeed };

export interface ParsedChatStreamChunk {
  events: ChatStreamEvent[];
}

function parseDataPayload(eventName: string, payload: string): ChatStreamEvent | null {
  if (payload === "[DONE]") return null;

  try {
    const parsed = JSON.parse(payload) as unknown;
    if (
      eventName === "resource" &&
      parsed &&
      typeof parsed === "object" &&
      "resources" in parsed
    ) {
      return {
        type: "resource",
        resourceNeed: parsed as ChatStreamResourceNeed,
      };
    }

    if (parsed && typeof parsed === "object" && "text" in parsed) {
      const text = (parsed as { text?: unknown }).text;
      return typeof text === "string" ? { type: "text", text } : null;
    }
  } catch {
    return null;
  }

  return null;
}

export function parseChatStreamChunk(chunk: string): ParsedChatStreamChunk {
  const events: ChatStreamEvent[] = [];
  let eventName = "message";

  for (const rawLine of chunk.split("\n")) {
    const line = rawLine.trimEnd();
    if (!line) {
      eventName = "message";
      continue;
    }

    if (line.startsWith("event: ")) {
      eventName = line.slice(7).trim();
      continue;
    }

    if (!line.startsWith("data: ")) continue;

    const event = parseDataPayload(eventName, line.slice(6));
    if (event) events.push(event);
  }

  return { events };
}
