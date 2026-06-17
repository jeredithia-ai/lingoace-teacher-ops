"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Brain,
  Calculator,
  CheckCircle2,
  GitBranch,
  Globe2,
  Grid3X3,
  Lightbulb,
  Route,
  Sparkles,
  Table2,
  Target,
} from "lucide-react";
import {
  META,
  CORE_JUDGMENT,
  PROBLEM_CARDS,
  CHANNEL_MATRIX,
  SUBJECT_PROFILES,
  AI_TEACHER_MODEL,
  OPERATIONS_LOOP,
  ROADMAP_90,
  MAIN_NAV,
  CHANNEL_PRESETS,
  CHANNEL_IDS,
} from "./data";
import { compareChannels, formatCny } from "./model";
import {
  LabelChip,
  MobileNav,
  ProblemCard,
  SectionHeader,
  SideNav,
} from "./components/ui";

const LOOP_COLORS = ["#4f46e5", "#6366f1", "#7c3aed", "#8b5cf6"];

const NAV_WITH_ICONS = [
  { id: "judgment", label: "核心判断", icon: Lightbulb },
  { id: "problems", label: "五个问题", icon: Target },
  { id: "channels", label: "渠道矩阵", icon: Table2 },
  { id: "subjects", label: "学科画像", icon: Grid3X3 },
  { id: "ai-model", label: "AI 模型", icon: Brain },
  { id: "calculator", label: "数据算盘", icon: Calculator },
  { id: "roadmap", label: "90天路径", icon: Route },
];

export default function TeacherSupplyPage() {
  const [activeNav, setActiveNav] = useState("judgment");
  const [roadmapIdx, setRoadmapIdx] = useState(0);
  const channelPreview = compareChannels();
  const roadmap = ROADMAP_90[roadmapIdx];

  useEffect(() => {
    const ids = MAIN_NAV.map((n) => n.id);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveNav(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header className="lingoace-hero text-white">
        <div className="lingoace-hero-grid" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 sm:pt-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-indigo-200" />
                AI 时代师资运营 · {META.author}
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                {META.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-indigo-100/90 sm:text-lg">
                {META.subtitle}
              </p>
              <p className="mt-2 text-xs text-indigo-200/60">{META.disclaimer}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/teacher-supply/calculator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-900 shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-50"
              >
                <Calculator className="h-4 w-4" />
                打开数据算盘
              </Link>
              <a
                href="#problems"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                快速浏览五个问题
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            {[
              { label: "运营闭环", value: "招 → 培 → 用 → 证" },
              { label: "师资组合", value: "北美 · 欧美 · 菲教" },
              { label: "落地节奏", value: "90 天可执行路径" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
              >
                <p className="text-[11px] font-medium uppercase tracking-wider text-indigo-200/80">
                  {s.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <MobileNav items={MAIN_NAV} />

      <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="lingoace-sidebar">
            <SideNav items={NAV_WITH_ICONS} activeId={activeNav} />
          </aside>

          <main className="min-w-0 space-y-10">
            {/* 核心判断 */}
            <section id="judgment" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader num={1} title="核心判断" subtitle="一句话定调" />
              <blockquote className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-violet-50/50 p-6 pl-7">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-violet-500" />
                <p className="text-lg font-medium leading-relaxed text-slate-800">
                  {CORE_JUDGMENT}
                </p>
              </blockquote>

              <div className="mt-8">
                <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <GitBranch className="h-4 w-4 text-indigo-500" />
                  运营闭环
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {OPERATIONS_LOOP.map((step, i) => (
                    <div
                      key={step.label}
                      className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-4"
                    >
                      <div
                        className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
                        style={{ background: LOOP_COLORS[i] }}
                      >
                        {step.label}
                      </div>
                      <p className="font-bold text-slate-900">{step.title}</p>
                      <p className="mt-1 text-xs text-slate-600">{step.desc}</p>
                      <p className="mt-2 text-[10px] font-semibold text-indigo-600">
                        → {step.output}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 五个问题 */}
            <section id="problems" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={2}
                title="五个问题"
                subtitle="问题 → 思路 → 解法，快速扫描"
              />
              <div className="space-y-5">
                {PROBLEM_CARDS.map((p) => (
                  <ProblemCard key={p.id} {...p} />
                ))}
              </div>
            </section>

            {/* 渠道矩阵 */}
            <section id="channels" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={3}
                title="师资渠道矩阵"
                subtitle={CHANNEL_MATRIX.headline}
              />
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-4 py-3 text-left font-semibold text-slate-600">
                        维度
                      </th>
                      {CHANNEL_MATRIX.columns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 text-left font-bold text-indigo-700"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CHANNEL_MATRIX.rows.map((row, i) => (
                      <tr
                        key={row.axis}
                        className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                      >
                        <td className="px-4 py-3 font-semibold text-slate-800">
                          {row.axis}
                        </td>
                        {row.values.map((v, j) => (
                          <td key={j} className="px-4 py-3 text-slate-600">
                            {v}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {CHANNEL_IDS.map((id) => {
                  const ch = CHANNEL_PRESETS[id];
                  return (
                    <div
                      key={id}
                      className="rounded-2xl border border-slate-100 p-5"
                      style={{ borderTopColor: ch.color, borderTopWidth: 3 }}
                    >
                      <p className="font-bold" style={{ color: ch.color }}>
                        {ch.label}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{ch.useCase}</p>
                      <ul className="mt-3 space-y-1.5">
                        {ch.recruitmentChannels.map((c) => (
                          <li key={c} className="text-xs text-slate-600">
                            · {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 学科画像 */}
            <section id="subjects" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={4}
                title="多学科师资画像差异"
                subtitle={SUBJECT_PROFILES.headline}
              />
              <div className="mb-6 grid gap-4 md:grid-cols-3">
                {SUBJECT_PROFILES.subjects.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-5"
                  >
                    <p className="text-lg font-bold text-indigo-700">{s.label}</p>
                    <p className="mt-2 text-sm text-slate-700">
                      <span className="font-semibold">画像：</span>
                      {s.profile}
                    </p>
                    <p className="mt-2 text-xs text-slate-600">
                      <span className="font-semibold">招聘：</span>
                      {s.recruit}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      <span className="font-semibold">师训：</span>
                      {s.train}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  可共享能力
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SUBJECT_PROFILES.shared.map((item) => (
                    <LabelChip key={item} tone="brand">
                      {item}
                    </LabelChip>
                  ))}
                </div>
              </div>
            </section>

            {/* AI 模型 */}
            <section id="ai-model" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={5}
                title="AI 时代师资模型"
                subtitle={AI_TEACHER_MODEL.headline}
              />
              <div className="mb-6 grid gap-4 md:grid-cols-3">
                {AI_TEACHER_MODEL.layers.map((layer) => (
                  <div
                    key={layer.id}
                    className="rounded-2xl border border-slate-100 p-5"
                    style={{ borderTopColor: layer.color, borderTopWidth: 3 }}
                  >
                    <p className="font-bold" style={{ color: layer.color }}>
                      {layer.label}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {layer.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-slate-600">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: layer.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border border-violet-200 bg-violet-50/50 px-5 py-4">
                <p className="text-sm text-slate-700">{AI_TEACHER_MODEL.lingoaceNote}</p>
              </div>
            </section>

            {/* 数据算盘预览 */}
            <section id="calculator" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={6}
                title="数据算盘"
                subtitle="北美 · 欧美 · 菲教 三渠道并排对比"
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {channelPreview.map((ch) => (
                  <div
                    key={ch.id}
                    className="rounded-2xl border-2 p-5 text-center"
                    style={{ borderColor: `${ch.color}40` }}
                  >
                    <p className="text-sm font-bold" style={{ color: ch.color }}>
                      {ch.label}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">{ch.costRange}</p>
                    <p className="mt-4 text-3xl font-bold text-slate-900">
                      {ch.qualified}
                      <span className="ml-1 text-sm font-medium text-slate-500">
                        人/月达标
                      </span>
                    </p>
                    <p className="mt-3 text-lg font-semibold text-indigo-700">
                      {formatCny(ch.cac)}
                    </p>
                    <p className="text-[10px] text-slate-400">单师 CAC</p>
                    <p className="mt-2 text-sm text-slate-600">
                      月总成本约 {formatCny(ch.monthlyTotalCost)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Link
                  href="/teacher-supply/calculator"
                  className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base shadow-lg shadow-indigo-200"
                >
                  进入多渠道计算器调参
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </section>

            {/* 90 天路径 */}
            <section id="roadmap" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={7}
                title="90 天执行路径"
                subtitle="战术落地，非三年战略地图"
              />
              <div className="mb-2 flex gap-1 rounded-2xl bg-slate-100 p-1.5">
                {ROADMAP_90.map((r, i) => (
                  <button
                    key={r.phase}
                    type="button"
                    onClick={() => setRoadmapIdx(i)}
                    className={`flex-1 rounded-xl py-2.5 text-center text-xs font-semibold transition-all sm:text-sm ${
                      roadmapIdx === i
                        ? "text-white shadow-md"
                        : "text-slate-600 hover:bg-white/60"
                    }`}
                    style={
                      roadmapIdx === i
                        ? {
                            background: `linear-gradient(135deg, ${r.color}, ${r.color}dd)`,
                          }
                        : undefined
                    }
                  >
                    {r.phase}
                  </button>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100">
                <div
                  className="px-6 py-5 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${roadmap.color}18, transparent), linear-gradient(135deg, ${roadmap.color}, ${roadmap.color}cc)`,
                  }}
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                    {roadmap.phase}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{roadmap.title}</h3>
                </div>
                <div className="grid gap-6 bg-white p-6 md:grid-cols-2">
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-indigo-600">
                      目标
                    </p>
                    <ul className="space-y-2">
                      {roadmap.goals.map((g) => (
                        <li key={g} className="flex gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-violet-600">
                      动作
                    </p>
                    <ul className="space-y-2">
                      {roadmap.actions.map((a) => (
                        <li key={a} className="flex gap-2 text-sm text-slate-600">
                          <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <footer className="border-t border-slate-200/80 bg-white py-10 text-center">
        <p className="text-sm font-medium text-slate-600">{META.title}</p>
        <p className="mt-1 text-xs text-slate-400">
          by {META.author} · 数据算盘见 /teacher-supply/calculator
        </p>
      </footer>
    </>
  );
}
