"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Mic,
  MicOff,
  Send,
  Square,
  Volume2,
  VolumeX,
  MessageSquare,
} from "lucide-react";
import { useSpeech } from "@/hooks/use-speech";
import type { VoiceFeedback } from "@/types";
import { getScoreColor } from "@/lib/utils";

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

export default function VoiceInterviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);
  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState<VoiceFeedback | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [voiceMode, setVoiceMode] = useState(true);
  const startTimeRef = useRef<number>(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSpeechResult = useCallback((text: string) => {
    setInput(text);
  }, []);

  const {
    supported,
    isListening,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useSpeech({ onResult: handleSpeechResult });

  useEffect(() => {
    fetch(`/api/sessions/${id}/voice`)
      .then((r) => {
        if (r.status === 401) {
          router.push("/login");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d?.messages?.length) {
          setMessages(d.messages);
          setStarted(true);
        }
        if (d?.feedback) setFeedback(d.feedback);
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, responding]);

  async function startInterview() {
    setResponding(true);
    try {
      const res = await fetch(`/api/sessions/${id}/voice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages(data.messages);
      setStarted(true);
      startTimeRef.current = Date.now();

      if (autoSpeak && data.message?.content) {
        speak(data.message.content);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "启动失败");
    } finally {
      setResponding(false);
    }
  }

  async function sendMessage(text?: string) {
    const content = (text || input).trim();
    if (!content || responding) return;

    setInput("");
    setResponding(true);
    stopListening();

    const tempCandidate: Message = {
      id: "temp-" + Date.now(),
      role: "candidate",
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, tempCandidate]);

    try {
      const res = await fetch(`/api/sessions/${id}/voice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "respond", message: content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages(data.messages);

      const lastMsg = data.message;
      if (autoSpeak && lastMsg?.content) {
        speak(lastMsg.content);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "发送失败");
    } finally {
      setResponding(false);
    }
  }

  async function finishInterview() {
    if (!confirm("确定结束模拟面试并生成反馈报告？")) return;

    setResponding(true);
    stopSpeaking();
    stopListening();

    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

    try {
      const res = await fetch(`/api/sessions/${id}/voice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "finish", duration }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFeedback(data.feedback);
    } catch (err) {
      alert(err instanceof Error ? err.message : "生成反馈失败");
    } finally {
      setResponding(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (feedback) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          href={`/session/${id}`}
          className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </Link>
        <FeedbackReport feedback={feedback} sessionId={id} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col px-4 py-6" style={{ height: "calc(100vh - 4rem)" }}>
      <div className="mb-4 flex items-center justify-between">
        <Link
          href={`/session/${id}`}
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`rounded-lg p-2 text-sm ${autoSpeak ? "bg-brand-100 text-brand-600" : "bg-slate-100 text-slate-500"}`}
            title="自动朗读面试官问题"
          >
            {autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          {started && (
            <button
              onClick={finishInterview}
              disabled={responding}
              className="btn-secondary !py-1.5 !px-3 text-xs"
            >
              <Square className="h-3 w-3" />
              结束面试
            </button>
          )}
        </div>
      </div>

      {!started ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-violet-100">
            <Mic className="h-12 w-12 text-violet-600" />
          </div>
          <h1 className="mb-3 text-2xl font-bold">语音模拟面试</h1>
          <p className="mb-2 max-w-md text-sm text-slate-600">
            AI 面试官将根据你的简历和 JD 进行针对性提问。你可以使用语音或文字回答。
          </p>
          {!supported && (
            <p className="mb-4 text-sm text-amber-600">
              当前浏览器不支持语音识别，请使用文字输入模式。
            </p>
          )}
          <button
            onClick={startInterview}
            disabled={responding}
            className="btn-primary px-8 py-3"
          >
            {responding ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
            开始模拟面试
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "candidate" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "candidate"
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  <p className="mb-1 text-xs opacity-70">
                    {msg.role === "candidate" ? "你" : "面试官"}
                  </p>
                  {msg.content}
                </div>
              </div>
            ))}
            {responding && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-100 px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="mt-4 space-y-3">
            {isSpeaking && (
              <div className="flex items-center gap-2 text-xs text-brand-600">
                <Volume2 className="h-3 w-3 animate-pulse" />
                面试官正在朗读…
                <button onClick={stopSpeaking} className="underline">
                  停止
                </button>
              </div>
            )}

            <div className="flex gap-2">
              {supported && voiceMode && (
                <button
                  onClick={isListening ? stopListening : startListening}
                  disabled={responding || isSpeaking}
                  className={`shrink-0 rounded-xl p-3 transition ${
                    isListening
                      ? "animate-pulse bg-red-500 text-white"
                      : "bg-violet-100 text-violet-600 hover:bg-violet-200"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </button>
              )}
              <input
                className="input-field flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="输入回答，或点击麦克风语音输入…"
                disabled={responding}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || responding}
                className="btn-primary !px-4"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <button
                onClick={() => setVoiceMode(!voiceMode)}
                className="flex items-center gap-1 hover:text-slate-600"
              >
                <MessageSquare className="h-3 w-3" />
                {voiceMode ? "语音+文字模式" : "纯文字模式"}
              </button>
              {isListening && <span className="text-red-500">正在聆听…</span>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function FeedbackReport({
  feedback,
  sessionId,
}: {
  feedback: VoiceFeedback;
  sessionId: string;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">面试反馈报告</h1>
        <p className={`mt-2 text-4xl font-bold ${getScoreColor(feedback.overallScore)}`}>
          {feedback.overallScore} 分
        </p>
      </div>

      <div className="glass-card p-6">
        <p className="text-slate-700">{feedback.summary}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "沟通表达", score: feedback.communicationScore },
          { label: "技术深度", score: feedback.technicalScore },
          { label: "行为面试", score: feedback.behavioralScore },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4 text-center">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className={`text-2xl font-bold ${getScoreColor(s.score)}`}>
              {s.score}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ListBlock title="表现亮点" items={feedback.strengths} color="emerald" />
        <ListBlock title="需改进之处" items={feedback.improvements} color="amber" />
      </div>

      <ListBlock title="改进建议" items={feedback.recommendations} color="blue" />

      <div className="flex justify-center gap-4">
        <Link href={`/session/${sessionId}`} className="btn-secondary">
          返回会话
        </Link>
        <Link href={`/session/${sessionId}/qa`} className="btn-primary">
          查看问答清单
        </Link>
      </div>
    </div>
  );
}

function ListBlock({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: string;
}) {
  const bg: Record<string, string> = {
    emerald: "bg-emerald-50 border-emerald-100",
    amber: "bg-amber-50 border-amber-100",
    blue: "bg-blue-50 border-blue-100",
  };

  return (
    <div className={`rounded-xl border p-4 ${bg[color]}`}>
      <h3 className="mb-3 font-semibold">{title}</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
