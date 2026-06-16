"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Loader2,
  Star,
  ChevronDown,
  ChevronUp,
  Download,
  Sparkles,
  Filter,
} from "lucide-react";
import { CATEGORY_LABELS, type QACategory } from "@/types";

interface QAItem {
  id: string;
  category: string;
  question: string;
  suggestedAnswer: string;
  userNotes: string;
  isStarred: boolean;
}

export default function QAPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [items, setItems] = useState<QAItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadItems();
  }, [id]);

  async function loadItems() {
    setLoading(true);
    try {
      const res = await fetch(`/api/sessions/${id}/qa`);
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      const data = await res.json();
      if (data.items?.length) {
        setItems(data.items);
      }
    } finally {
      setLoading(false);
    }
  }

  async function generateItems() {
    setGenerating(true);
    try {
      const res = await fetch(`/api/sessions/${id}/qa`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems(data.items);
    } catch (err) {
      alert(err instanceof Error ? err.message : "生成失败");
    } finally {
      setGenerating(false);
    }
  }

  async function updateItem(
    itemId: string,
    updates: Partial<Pick<QAItem, "userNotes" | "isStarred" | "suggestedAnswer">>
  ) {
    const res = await fetch(`/api/sessions/${id}/qa/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (data.item) {
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, ...data.item } : i))
      );
    }
  }

  function exportMarkdown() {
    const md = items
      .map(
        (item, i) =>
          `## ${i + 1}. ${item.question}\n\n**类别:** ${CATEGORY_LABELS[item.category as QACategory] || item.category}\n\n**参考答案:**\n${item.suggestedAnswer}\n\n${item.userNotes ? `**我的笔记:**\n${item.userNotes}\n` : ""}---\n`
      )
      .join("\n");

    const blob = new Blob([`# 面试问答清单\n\n${md}`], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "interview-qa.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  const categories = useMemo(() => {
    const cats = new Set(items.map((i) => i.category));
    return Array.from(cats);
  }, [items]);

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link
        href={`/session/${id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回
      </Link>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">问答清单</h1>
          <p className="mt-1 text-sm text-slate-600">
            {items.length > 0
              ? `共 ${items.length} 道个性化面试题`
              : "AI 将根据你的简历和 JD 生成面试题"}
          </p>
        </div>
        <div className="flex gap-2">
          {items.length > 0 && (
            <button onClick={exportMarkdown} className="btn-secondary">
              <Download className="h-4 w-4" />
              导出 Markdown
            </button>
          )}
          <button
            onClick={generateItems}
            disabled={generating}
            className="btn-primary"
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {items.length > 0 ? "重新生成" : "生成问答清单"}
          </button>
        </div>
      </div>

      {generating && (
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
          <Loader2 className="h-4 w-4 animate-spin" />
          AI 正在生成个性化面试题，约需 30-60 秒…
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                filter === "all"
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              全部 ({items.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  filter === cat
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {CATEGORY_LABELS[cat as QACategory] || cat} (
                {items.filter((i) => i.category === cat).length})
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((item, index) => (
              <div key={item.id} className="glass-card overflow-hidden">
                <button
                  onClick={() =>
                    setExpanded(expanded === item.id ? null : item.id)
                  }
                  className="flex w-full items-start gap-3 p-5 text-left"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="mb-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {CATEGORY_LABELS[item.category as QACategory] || item.category}
                    </span>
                    <p className="font-medium text-slate-900">{item.question}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateItem(item.id, { isStarred: !item.isStarred });
                      }}
                      className={`rounded-lg p-1.5 ${
                        item.isStarred
                          ? "text-amber-500"
                          : "text-slate-300 hover:text-amber-400"
                      }`}
                    >
                      <Star
                        className="h-4 w-4"
                        fill={item.isStarred ? "currentColor" : "none"}
                      />
                    </button>
                    {expanded === item.id ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {expanded === item.id && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                    <div className="mb-4">
                      <label className="label-text">参考答案</label>
                      <textarea
                        className="input-field min-h-[120px] resize-y text-sm leading-relaxed"
                        value={item.suggestedAnswer}
                        onChange={(e) =>
                          setItems((prev) =>
                            prev.map((i) =>
                              i.id === item.id
                                ? { ...i, suggestedAnswer: e.target.value }
                                : i
                            )
                          )
                        }
                        onBlur={(e) =>
                          updateItem(item.id, {
                            suggestedAnswer: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="label-text">我的笔记</label>
                      <textarea
                        className="input-field min-h-[80px] resize-y text-sm"
                        value={item.userNotes}
                        onChange={(e) =>
                          setItems((prev) =>
                            prev.map((i) =>
                              i.id === item.id
                                ? { ...i, userNotes: e.target.value }
                                : i
                            )
                          )
                        }
                        onBlur={(e) =>
                          updateItem(item.id, { userNotes: e.target.value })
                        }
                        placeholder="添加你的个性化回答要点…"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {items.length === 0 && !generating && (
        <div className="glass-card p-12 text-center">
          <Sparkles className="mx-auto mb-4 h-12 w-12 text-brand-400" />
          <p className="mb-4 text-slate-600">
            点击上方按钮，AI 将为你生成 20+ 道个性化面试题
          </p>
        </div>
      )}
    </div>
  );
}
