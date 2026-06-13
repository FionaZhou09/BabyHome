"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { request } from "@/lib/api/request";
import { parseChatStreamChunk, type ChatStreamResourceNeed } from "@/lib/chat/chat-stream";
import { ChatHeader } from "./ChatHeader";
import { AssistantVoiceButton } from "./AssistantVoiceButton";
import { ChatInputBar } from "./ChatInputBar";
import { CrisisResourceCard } from "./CrisisResourceCard";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  resourceNeed?: ChatStreamResourceNeed;
}

interface ChatHistoryMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await request("/api/chat");
        const data = await res.json();
        if (data.messages?.length) {
          setMessages(
            data.messages.map((m: ChatHistoryMessage) => ({
              role: m.role,
              content: m.content,
              timestamp: m.timestamp,
            }))
          );
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMsg, timestamp: new Date().toISOString() },
    ]);
    setIsTyping(true);

    try {
      const res = await request("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", timestamp: new Date().toISOString() },
      ]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const { events } = parseChatStreamChunk(chunk);
          for (const event of events) {
            if (event.type === "resource") {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  resourceNeed: event.resourceNeed,
                };
                return updated;
              });
              continue;
            }

            assistantContent += event.text;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                content: assistantContent,
              };
              return updated;
            });
          }
        }
      }

    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }

  function formatTime(iso: string): string {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    if (diffMs < 60000) return "Just now";
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  }

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-accent)] overflow-hidden">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto w-full p-5 space-y-5 flex flex-col items-stretch">
        {/* Greeting */}
        {messages.length === 0 && !loading && (
          <div className="flex flex-col max-w-[85%] items-start mr-auto w-full">
            <div
              className="p-4 text-sm font-medium leading-relaxed rounded-[20px] text-white"
              style={{
                background: "var(--color-secondary)",
                boxShadow: "3px 3px 0px var(--color-border)",
                borderRadius: "20px 20px 20px 4px",
              }}
            >
              Hi there, brave parent. I&apos;m your cozy companion. Ask me anything at all. Is your
              baby sleeping differently? Unsure about feeding quantities? I&apos;m here.
            </div>
            <div className="mt-2 p-3 rounded-[12px] bg-emerald-50 border-2 border-[var(--color-secondary)]/30 text-[12px] font-semibold text-[#256851] italic flex gap-2">
              <span>🧸</span>
              <span>Remember: You are doing an amazing job. No one knows your baby like you do.</span>
            </div>
            <span className="text-xs font-bold text-[var(--color-text-secondary)] mt-1.5 px-2">
              Now
            </span>
          </div>
        )}

        {/* Message History */}
        {messages.map((msg, i) => {
          const isUser = msg.role === "user";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col max-w-[85%] w-full ${
                isUser ? "items-end ml-auto" : "items-start mr-auto"
              }`}
            >
              <div
                className="p-4 text-sm font-medium leading-relaxed"
                style={{
                  background: isUser ? "var(--color-primary)" : "var(--color-secondary)",
                  color: "white",
                  boxShadow: "3px 3px 0px var(--color-border)",
                  borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                }}
              >
                {msg.content}
              </div>
              {!isUser && msg.content && i === messages.length - 1 && (
                <div className="mt-2 p-3 rounded-[12px] bg-emerald-50 border-2 border-[var(--color-secondary)]/30 text-[12px] font-semibold text-[#256851] italic flex gap-2 max-w-full">
                  <span>🧸</span>
                  <span>It is completely valid to feel exhausted. Deep breaths. You are surviving this perfectly.</span>
                </div>
              )}
              {!isUser && msg.content && <AssistantVoiceButton text={msg.content} />}
              {!isUser && msg.resourceNeed && (
                <CrisisResourceCard resourceNeed={msg.resourceNeed} />
              )}
              <span className="text-xs font-bold text-[var(--color-text-secondary)] mt-1.5 px-2">
                {formatTime(msg.timestamp)}
              </span>
            </motion.div>
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col max-w-[85%] items-start mr-auto w-full"
          >
            <div
              className="p-4 flex items-center gap-1"
              style={{
                background: "var(--color-secondary)",
                borderRadius: "20px 20px 20px 4px",
                boxShadow: "3px 3px 0px var(--color-border)",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-[var(--color-secondary)] mt-1.5 px-2 flex items-center gap-1.5">
              <span className="font-heading">Drafting kindness...</span>
            </span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInputBar input={input} onInputChange={setInput} onSend={handleSend} />
    </div>
  );
}
