"use client";

import { BookOpen, ExternalLink } from "lucide-react";
import {
  CHANNEL_BENCHMARKS,
  COST_BENCHMARKS,
  DATA_HANDBOOK,
  FUNNEL_BENCHMARKS,
  getSources,
  INDUSTRY_SOURCES,
} from "../industry-sources";

export function DataHandbook() {
  return (
    <div className="lingoace-panel overflow-hidden">
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/40 px-6 py-5">
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          <div>
            <h2 className="text-lg font-bold text-slate-900">{DATA_HANDBOOK.title}</h2>
            <p className="text-sm text-slate-500">{DATA_HANDBOOK.subtitle}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
          {DATA_HANDBOOK.principles.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="text-indigo-400">·</span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Cost */}
      <section className="border-b border-slate-100 p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-800">成本口径</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {Object.values(COST_BENCHMARKS).map((c) => (
            <div key={c.label} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <p className="font-semibold text-slate-900">{c.label}</p>
              <p className="mt-1 text-sm text-indigo-700">
                {"rangeCny" in c
                  ? `推演区间 ¥${c.rangeCny[0].toLocaleString()}–${c.rangeCny[1].toLocaleString()}`
                  : `行业区间 ${c.range}`}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{c.interpretation}</p>
              <SourceLinks ids={c.sourceIds} />
            </div>
          ))}
        </div>
      </section>

      {/* Channels */}
      <section className="border-b border-slate-100 p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-800">招聘渠道参照（单师 CAC 推演）</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500">
                <th className="pb-2 pr-4 font-semibold">渠道</th>
                <th className="pb-2 pr-4 font-semibold">CAC 区间</th>
                <th className="pb-2 pr-4 font-semibold">质/量</th>
                <th className="pb-2 pr-4 font-semibold">建议</th>
                <th className="pb-2 font-semibold">解读</th>
              </tr>
            </thead>
            <tbody>
              {CHANNEL_BENCHMARKS.map((ch) => (
                <tr key={ch.name} className="border-b border-slate-50">
                  <td className="py-3 pr-4 font-medium text-slate-800">{ch.name}</td>
                  <td className="py-3 pr-4 text-indigo-700">
                    ¥{ch.cacRangeCny[0].toLocaleString()}–{ch.cacRangeCny[1].toLocaleString()}
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    {ch.quality}/{ch.volume}
                  </td>
                  <td className="py-3 pr-4 text-xs font-medium text-emerald-700">{ch.recommend}</td>
                  <td className="py-3 text-xs text-slate-500">{ch.roiNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Funnel */}
      <section className="border-b border-slate-100 p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-800">漏斗行业基准</h3>
        <div className="space-y-2">
          {FUNNEL_BENCHMARKS.map((f) => (
            <div
              key={f.stage}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-lg bg-slate-50 px-4 py-2.5 text-sm"
            >
              <span className="w-28 shrink-0 font-medium text-slate-800">{f.stage}</span>
              <span className="font-semibold text-indigo-700">{f.range}</span>
              <span className="text-xs text-slate-500">{f.interpretation}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sources bibliography */}
      <section className="p-6">
        <h3 className="mb-4 text-sm font-bold text-slate-800">公开引用文献（可点击核验）</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {Object.values(INDUSTRY_SOURCES).map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-slate-100 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/30"
            >
              <p className="flex items-center gap-1 text-sm font-semibold text-slate-900 group-hover:text-indigo-700">
                {s.label}
                <ExternalLink className="h-3.5 w-3.5 opacity-50" />
              </p>
              <p className="mt-1 text-[10px] text-slate-400">
                {s.publisher}
                {s.year ? ` · ${s.year}` : ""}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{s.excerpt}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function SourceLinks({ ids }: { ids: string[] }) {
  const sources = getSources(ids);
  if (!sources.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {sources.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-medium text-indigo-600 hover:underline"
        >
          {s.publisher} ↗
        </a>
      ))}
    </div>
  );
}
