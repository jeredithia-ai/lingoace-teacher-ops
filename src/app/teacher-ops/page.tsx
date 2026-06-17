"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ChevronRight,
  GitBranch,
  Globe2,
  Grid3X3,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Brain,
  LayoutDashboard,
} from "lucide-react";
import {
  META,
  CEO_FRAMING,
  BUSINESS_OVERVIEW,
  THREE_PROJECT_MATRIX,
  AI_TEACHER_MODEL,
  OPERATIONS_LOGIC,
  SOLUTIONS,
  VERIFICATION,
  PAIN_POINTS,
  HANDOVER_PROCESS,
  ROADMAP_60,
  ROADMAP_VISION,
  SCENARIOS,
  MAIN_NAV,
} from "./data";
import { computeSummary } from "./model";
import {
  LabelChip,
  MobileNav,
  SectionHeader,
  SideNav,
} from "./components/ui";
import { MatchingFramework } from "./components/matching-panel";

const LOOP_COLORS = ["#4f46e5", "#6366f1", "#7c3aed", "#8b5cf6"];

const NAV_WITH_ICONS = [
  { id: "overview", label: "业务全局", icon: LayoutDashboard },
  { id: "logic", label: "运营逻辑", icon: GitBranch },
  { id: "synergy", label: "项目协同", icon: Grid3X3 },
  { id: "pain", label: "痛点解法", icon: Target },
  { id: "ai-model", label: "AI 能力", icon: Brain },
  { id: "verify", label: "效果验证", icon: ShieldCheck },
  { id: "roadmap", label: "时间地图", icon: Route },
];

const TIER_STYLES = {
  基础档: { cls: "lingoace-tier-base", accent: "text-slate-700", ring: "ring-slate-200" },
  中档: { cls: "lingoace-tier-mid", accent: "text-amber-700", ring: "ring-amber-200" },
  最优档: { cls: "lingoace-tier-best", accent: "text-emerald-700", ring: "ring-emerald-200" },
} as const;

export default function LingoAceMainPage() {
  const [activePain, setActivePain] = useState(PAIN_POINTS[0].id);
  const [roadmapIdx, setRoadmapIdx] = useState(0);
  const [visionIdx, setVisionIdx] = useState(0);
  const [activeNav, setActiveNav] = useState("overview");
  const pain = PAIN_POINTS.find((p) => p.id === activePain)!;

  const scenarioPreview = {
    基础档: computeSummary(SCENARIOS["基础档"].assumptions),
    中档: computeSummary(SCENARIOS["中档"].assumptions),
    最优档: computeSummary(SCENARIOS["最优档"].assumptions),
  };

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

  const roadmap = ROADMAP_60[roadmapIdx];
  const vision = ROADMAP_VISION.layers[visionIdx];

  return (
    <>
      {/* Hero */}
      <header className="lingoace-hero text-white">
        <div className="lingoace-hero-grid" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-14 sm:pt-20">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-indigo-200" />
                CEO 二面 · {META.author}
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                {META.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-indigo-100/90 sm:text-lg">
                {CEO_FRAMING.round2}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-indigo-200/80">
                {CEO_FRAMING.thesis}
              </p>
              <p className="mt-2 text-xs text-indigo-200/60">{META.subtitle}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/teacher-ops/calculator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-900 shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-50"
              >
                <Calculator className="h-4 w-4" />
                打开数据推演
              </Link>
              <a
                href="#logic"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                阅读方案逻辑
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick stats strip */}
          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            {[
              { label: "战略视角", value: "语 · 数 · 英 协同" },
              { label: "运营闭环", value: "招 → 培 → 用 → 证" },
              { label: "时间地图", value: "90天 · 1年 · 3年" },
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
            {/* 0. Business Overview */}
            <section id="overview" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={0}
                title="业务全局视图"
                subtitle="CEO 视角：师资组织能力如何支撑语数英三大项目"
              />
              <p className="mb-6 text-base font-medium text-slate-800">
                {BUSINESS_OVERVIEW.headline}
              </p>
              <div className="mb-8 grid gap-4 md:grid-cols-3">
                {BUSINESS_OVERVIEW.pillars.map((p) => (
                  <div
                    key={p.label}
                    className="rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-5"
                  >
                    <p className="text-lg font-bold text-indigo-700">{p.label}</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">{p.focus}</p>
                    <p className="mt-3 text-sm text-slate-700">
                      <span className="font-semibold">师资需求：</span>
                      {p.teacherNeed}
                    </p>
                    <p className="mt-2 text-xs text-amber-700">
                      <span className="font-semibold">风险：</span>
                      {p.risk}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {BUSINESS_OVERVIEW.northStar.map((n) => (
                  <div
                    key={n.label}
                    className="rounded-xl border border-indigo-100 bg-indigo-50/40 px-4 py-3 text-center"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      {n.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{n.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 1. Logic */}
            <section id="logic" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={1}
                title="整体运营逻辑"
                subtitle={OPERATIONS_LOGIC.headline}
              />
              <div className="relative">
                <div className="lingoace-loop-track" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {OPERATIONS_LOGIC.loop.map((step, i) => (
                    <div
                      key={step.id}
                      className="lingoace-panel-hover group relative rounded-2xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-5"
                    >
                      <div
                        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-white shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${LOOP_COLORS[i]}, ${LOOP_COLORS[i]}cc)`,
                          boxShadow: `0 8px 20px ${LOOP_COLORS[i]}40`,
                        }}
                      >
                        {step.label}
                      </div>
                      <h3 className="font-bold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {step.desc}
                      </p>
                      <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600">
                        <ChevronRight className="h-3.5 w-3.5" />
                        {step.output}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. Synergy Matrix */}
            <section id="synergy" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={2}
                title="三大项目协同矩阵"
                subtitle={THREE_PROJECT_MATRIX.headline}
              />
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-4 py-3 text-left font-semibold text-slate-600">维度</th>
                      {THREE_PROJECT_MATRIX.dimensions.map((d) => (
                        <th key={d} className="px-4 py-3 text-left font-bold text-indigo-700">
                          {d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {THREE_PROJECT_MATRIX.rows.map((row, i) => (
                      <tr
                        key={row.axis}
                        className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                      >
                        <td className="px-4 py-3 font-semibold text-slate-800">{row.axis}</td>
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
            </section>

            {/* 3. Pain */}
            <section id="pain" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={3}
                title="业务痛点 → 解法"
                subtitle="五大结构性痛点，每条解法可验收、可量化"
              />
              <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PAIN_POINTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePain(p.id)}
                    className={`rounded-2xl border p-5 text-left transition-all ${
                      activePain === p.id
                        ? "border-indigo-300 bg-gradient-to-br from-indigo-50 to-white shadow-md ring-2 ring-indigo-100"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <LabelChip tone={p.severity === "高" ? "pain" : "warn"}>
                        风险 · {p.severity}
                      </LabelChip>
                    </div>
                    <p className="font-bold text-slate-900">{p.title}</p>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                      {p.subtitle}
                    </p>
                  </button>
                ))}
              </div>

              <blockquote className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-violet-50/50 p-5 pl-6">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-violet-500" />
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Selena 的判断
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {pain.selenaView}
                </p>
              </blockquote>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {SOLUTIONS.map((s) => (
                  <div
                    key={s.pain}
                    className="lingoace-panel-hover rounded-2xl border border-slate-100 bg-white p-5"
                  >
                    <LabelChip tone="pain">痛点</LabelChip>
                    <p className="mt-3 font-semibold text-slate-900">{s.pain}</p>
                    <div className="my-4 h-px bg-gradient-to-r from-slate-200 to-transparent" />
                    <LabelChip tone="brand">解法</LabelChip>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {s.solution}
                    </p>
                    <div className="mt-4 rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        如何验证
                      </p>
                      <p className="mt-1 text-sm text-slate-600">{s.verify}</p>
                    </div>
                  </div>
                ))}
              </div>

              {activePain === "misalign" && <MatchingFramework />}

              <div className="mt-8">
                <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Users className="h-4 w-4 text-indigo-500" />
                  标准交接（解决脱节）
                </p>
                <div className="grid gap-3 sm:grid-cols-4">
                  {HANDOVER_PROCESS.steps.map((s, i) => (
                    <div
                      key={s.phase}
                      className="relative rounded-xl border border-slate-100 bg-gradient-to-b from-slate-50 to-white p-4 text-center"
                    >
                      <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="mt-2 text-xs font-bold text-slate-800">{s.phase}</p>
                      <p className="mt-1 text-[10px] text-slate-500">{s.owner}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. AI Model */}
            <section id="ai-model" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={4}
                title="AI 时代师资能力新模型"
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
              <div className="rounded-xl border border-violet-200 bg-violet-50/50 px-5 py-4 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                  能力公式
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {AI_TEACHER_MODEL.capabilityFormula}
                </p>
              </div>
            </section>

            {/* 5. Verify */}
            <section id="verify" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={5}
                title="效果验证"
                subtitle="教师侧 60 天闭环 · 学员侧可作更长周期辅助验证"
              />
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="mb-5 text-sm font-semibold text-indigo-800">
                    {VERIFICATION.teacher.title}
                  </p>
                  <div className="relative space-y-0 pl-1">
                    <div className="lingoace-timeline-line" />
                    {VERIFICATION.teacher.milestones.map((m) => (
                      <div key={m.day} className="relative flex gap-4 pb-5 last:pb-0">
                        <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-[11px] font-bold text-white shadow-md shadow-indigo-200">
                          D{m.day}
                        </span>
                        <div className="flex-1 rounded-xl border border-indigo-100/80 bg-indigo-50/40 p-3.5">
                          <p className="text-sm font-semibold text-slate-900">{m.label}</p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-600">
                            {m.check}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-5 text-sm font-semibold text-slate-600">
                    {VERIFICATION.user.title}
                  </p>
                  <div className="space-y-3">
                    {VERIFICATION.user.milestones.map((m) => (
                      <div
                        key={m.day}
                        className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50/80 p-4"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-400 text-[11px] font-bold text-white">
                          D{m.day}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{m.label}</p>
                          <p className="mt-1 text-xs text-slate-600">{m.check}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">
                    三档推演预览
                  </p>
                  <Link
                    href="/teacher-ops/calculator"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    进入计算器调参 →
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {(["基础档", "中档", "最优档"] as const).map((k) => {
                    const style = TIER_STYLES[k];
                    return (
                      <div
                        key={k}
                        className={`rounded-xl border-2 p-4 text-center ring-1 ${style.cls} ${style.ring}`}
                      >
                        <p className="text-xs font-medium text-slate-500">{k}</p>
                        <p className={`mt-2 text-2xl font-bold ${style.accent}`}>
                          {scenarioPreview[k].funnel.qualified}
                          <span className="ml-1 text-sm font-medium">人/月</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-500">首月达标</p>
                        <p className="mt-3 text-sm font-semibold text-slate-700">
                          {scenarioPreview[k].kpis[1].value}
                        </p>
                        <p className="text-[10px] text-slate-400">单师 CAC</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 6. Roadmap */}
            <section id="roadmap" className="lingoace-panel scroll-mt-24 p-6 sm:p-8">
              <SectionHeader
                num={6}
                title="1–3 年三层时间地图"
                subtitle={ROADMAP_VISION.headline}
              />

              <div className="mb-8">
                <p className="mb-3 text-sm font-semibold text-slate-700">战略层（点击切换）</p>
                <div className="mb-2 flex gap-1 rounded-2xl bg-slate-100 p-1.5">
                  {ROADMAP_VISION.layers.map((r, i) => (
                    <button
                      key={r.horizon}
                      type="button"
                      onClick={() => setVisionIdx(i)}
                      className={`flex-1 rounded-xl py-2.5 text-center text-sm font-semibold transition-all ${
                        visionIdx === i
                          ? "text-white shadow-md"
                          : "text-slate-600 hover:bg-white/60"
                      }`}
                      style={
                        visionIdx === i
                          ? {
                              background: `linear-gradient(135deg, ${r.color}, ${r.color}dd)`,
                            }
                          : undefined
                      }
                    >
                      {r.horizon}
                    </button>
                  ))}
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-100">
                  <div
                    className="px-6 py-5 text-white"
                    style={{
                      background: `linear-gradient(135deg, ${vision.color}18, transparent), linear-gradient(135deg, ${vision.color}, ${vision.color}cc)`,
                    }}
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                      {vision.theme} · {vision.horizon}
                    </p>
                    <h3 className="mt-1 text-xl font-bold">{vision.subtitle}</h3>
                  </div>
                  <div className="grid gap-6 bg-white p-6 md:grid-cols-2">
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-indigo-600">
                        目标
                      </p>
                      <ul className="space-y-2">
                        {vision.goals.map((g) => (
                          <li key={g} className="flex gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-600">
                        交付物
                      </p>
                      <ul className="space-y-2">
                        {vision.deliverables.map((d) => (
                          <li key={d} className="flex gap-2 text-sm text-slate-600">
                            <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Route className="h-4 w-4 text-indigo-500" />
                90 天内执行节奏（第一层落地）
              </p>

              <div className="mb-2 flex gap-1 rounded-2xl bg-slate-100 p-1.5">
                {ROADMAP_60.map((r, i) => (
                  <button
                    key={r.phase}
                    type="button"
                    onClick={() => setRoadmapIdx(i)}
                    className={`flex-1 rounded-xl py-2.5 text-center text-sm font-semibold transition-all ${
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
                <div className="grid gap-6 bg-white p-6 md:grid-cols-3">
                  {(
                    [
                      ["goals", "目标", "text-indigo-600"],
                      ["actions", "动作", "text-violet-600"],
                      ["deliverables", "交付物", "text-emerald-600"],
                    ] as const
                  ).map(([key, label, color]) => (
                    <div key={key}>
                      <p className={`mb-3 text-xs font-bold uppercase tracking-wider ${color}`}>
                        {label}
                      </p>
                      <ul className="space-y-2.5">
                        {roadmap[key].map((item) => (
                          <li
                            key={item}
                            className="flex gap-2 text-sm leading-snug text-slate-600"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="flex justify-center pb-4">
              <Link
                href="/teacher-ops/calculator"
                className="btn-primary gap-2 px-8 py-3 text-base shadow-lg shadow-indigo-200"
              >
                需要看漏斗演算？进入诊断计算器
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </main>
        </div>
      </div>

      <footer className="border-t border-slate-200/80 bg-white py-10 text-center">
        <p className="text-sm font-medium text-slate-600">{META.title}</p>
        <p className="mt-1 text-xs text-slate-400">
          by {META.author} · 示例数据见计算器分支页
        </p>
      </footer>
    </>
  );
}
