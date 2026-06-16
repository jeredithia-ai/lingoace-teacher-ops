"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Plus,
  Loader2,
  Trash2,
  Mic,
  FileText,
  ChevronRight,
} from "lucide-react";
import { formatDate, getScoreColor } from "@/lib/utils";

interface Session {
  id: string;
  title: string;
  companyName: string | null;
  positionTitle: string | null;
  matchScore: number | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  _count: { qaItems: number; voiceMessages: number };
}

const STATUS_LABELS: Record<string, string> = {
  draft: "草稿",
  matched: "已匹配",
  qa_ready: "问答已生成",
  voice_in_progress: "语音进行中",
  voice_completed: "语音已完成",
  completed: "已完成",
};

export default function DashboardPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sessions")
      .then((r) => {
        if (r.status === 401) {
          router.push("/login");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d?.sessions) setSessions(d.sessions);
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function deleteSession(id: string) {
    if (!confirm("确定删除这次面试准备记录？")) return;
    await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    setSessions((s) => s.filter((x) => x.id !== id));
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">我的面试准备</h1>
          <p className="mt-1 text-sm text-slate-600">
            管理你的简历-JD 匹配与模拟记录
          </p>
        </div>
        <Link href="/session/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          新建准备
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="mb-4 text-slate-600">还没有面试准备记录</p>
          <Link href="/session/new" className="btn-primary">
            上传简历和 JD 开始
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="glass-card flex items-center gap-4 p-5 transition hover:shadow-lg"
            >
              <Link href={`/session/${s.id}`} className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatDate(s.updatedAt)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
                        {STATUS_LABELS[s.status] || s.status}
                      </span>
                      {s._count.qaItems > 0 && (
                        <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700">
                          <FileText className="h-3 w-3" />
                          {s._count.qaItems} 题
                        </span>
                      )}
                      {s._count.voiceMessages > 0 && (
                        <span className="flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-0.5 text-xs text-violet-700">
                          <Mic className="h-3 w-3" />
                          {s._count.voiceMessages} 轮对话
                        </span>
                      )}
                    </div>
                  </div>
                  {s.matchScore != null && (
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getScoreColor(s.matchScore)}`}>
                        {s.matchScore}%
                      </p>
                      <p className="text-xs text-slate-500">匹配度</p>
                    </div>
                  )}
                </div>
              </Link>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => deleteSession(s.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <Link
                  href={`/session/${s.id}`}
                  className="rounded-lg p-2 text-slate-400 hover:bg-brand-50 hover:text-brand-600"
                >
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
