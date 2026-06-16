"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Mic, FileText, ArrowLeft } from "lucide-react";
import { MatchResults } from "@/components/match-results";
import type { MatchAnalysis } from "@/types";

interface Session {
  id: string;
  title: string;
  companyName: string | null;
  positionTitle: string | null;
  matchScore: number | null;
  status: string;
}

export default function SessionPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [analysis, setAnalysis] = useState<MatchAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/sessions/${id}`)
      .then((r) => {
        if (r.status === 401) {
          router.push("/login");
          return null;
        }
        if (r.status === 404) {
          router.push("/dashboard");
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d) {
          setSession(d.session);
          setAnalysis(d.analysis);
        }
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!session || !analysis) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回列表
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold">{session.title}</h1>
        <p className="mt-1 text-sm text-slate-600">匹配分析完成，选择模拟方式开始准备</p>
      </div>

      <div className="glass-card mb-8 p-6">
        <MatchResults
          analysis={analysis}
          companyName={session.companyName}
          positionTitle={session.positionTitle}
        />
      </div>

      <h2 className="mb-4 text-lg font-semibold">选择模拟方式</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href={`/session/${id}/voice`}
          className="glass-card group p-6 transition hover:border-brand-300 hover:shadow-lg"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
            <Mic className="h-7 w-7" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">语音模拟面试</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            与 AI 面试官实时语音对话，支持语音识别与朗读，模拟真实面试场景，结束后获得详细反馈。
          </p>
        </Link>

        <Link
          href={`/session/${id}/qa`}
          className="glass-card group p-6 transition hover:border-brand-300 hover:shadow-lg"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">问答清单模式</h3>
          <p className="text-sm leading-relaxed text-slate-600">
            生成 20+ 道个性化面试题与参考答案，按类别浏览，支持编辑笔记、收藏重点，适合考前突击。
          </p>
        </Link>
      </div>
    </div>
  );
}
