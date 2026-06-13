import { NextRequest } from "next/server";
import { detectCrisisResourceNeed } from "@/lib/agent/crisis-resources";
import { createPlaceholderReply } from "@/lib/agent/placeholder";
import {
  getDemoActivities,
  getDemoChatHistory,
  saveDemoChatMessage,
} from "@/lib/demo/store";

export const runtime = "nodejs";
export const maxDuration = 60;

function streamTextChunks(text: string, size = 36) {
  const chars = Array.from(text);
  const chunks: string[] = [];
  for (let index = 0; index < chars.length; index += size) {
    chunks.push(chars.slice(index, index + size).join(""));
  }
  return chunks;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const message = typeof body.message === "string" ? body.message : "";
  saveDemoChatMessage("user", message);

  const encoder = new TextEncoder();
  const reply = createPlaceholderReply(message, getDemoActivities("7days"));
  const resourceNeed = detectCrisisResourceNeed(message);

  const readable = new ReadableStream({
    async start(controller) {
      try {
        if (resourceNeed.level !== "none") {
          controller.enqueue(
            encoder.encode(`event: resource\ndata: ${JSON.stringify(resourceNeed)}\n\n`)
          );
        }

        for (const text of streamTextChunks(reply)) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
        saveDemoChatMessage("assistant", reply);
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function GET() {
  const messages = getDemoChatHistory(40);
  return Response.json({ messages });
}
