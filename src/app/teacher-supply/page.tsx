"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Calculator, Sparkles } from "lucide-react";
import {
  META,
  CORE_JUDGMENT,
  LINGOACE_CONTEXT,
  PROBLEM_CARDS,
  RECRUITMENT_UX,
  TOP_NAV,
  CHANNEL_PRESETS,
  CHANNEL_IDS,
  SUBJECT_PROFILES,
  AI_TEACHER_MODEL,
  EXECUTION_PATH,
  COMMUNITY_ROI_NOTE,
} from "./data";
import { compareChannels, formatCny } from "./model";
import {
  LabelChip,
  ProblemCard,
  SectionHeader,
  TopNav,
  ChannelCard,
} from "./components/ui";

export default function TeacherSupplyPage() {
  const [activeTop, setActiveTop] = useState("overview");
  const channelPreview = compareChannels();

  useEffect(() => {
    const ids = TOP_NAV.map((n) => n.id);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveTop(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
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
        <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-12 sm:pt-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-indigo-200" />
                AI 时代师资运营 · {META.author}
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {META.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-indigo-100/90">
                {META.subtitle}
              </p>
              <p className="mt-2 text-xs text-indigo-200/60">{META.disclaimer}</p>
            </div>
            <Link
              href="/teacher-supply/calculator"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-900 shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-50"
            >
              <Calculator className="h-4 w-4" />
              打开数据算盘
            </Link>
          </div>

          <div className="mt-8 grid gap-2 sm:grid-cols-4">
            {["宗教", "欧美", "北美", "菲教(规划)"].map((ch, i) => (
              <div
                key={ch}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-sm"
              >
                <p className="text-[10px] text-indigo-200/70">
                  {i === 0 ? "起点" : i === 3 ? "扩产能" : "外教线"}
                </p>
                <p className="text-sm font-semibold text-white">{ch}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <TopNav items={TOP_NAV} activeId={activeTop} />

      <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
        <div id="overview" className="scroll-mt-16 space-y-6">
          <section id="judgment" className="lingoace-panel scroll-mt-20 p-5 sm:p-6">
            <SectionHeader title="核心判断" subtitle="一句话定调" />
            <blockquote className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-violet-50/50 p-5">
              <p className="text-base font-medium leading-relaxed text-slate-800">
                {CORE_JUDGMENT}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                {LINGOACE_CONTEXT}
              </p>
            </blockquote>
          </section>

          <section id="problems" className="lingoace-panel scroll-mt-20 p-5 sm:p-6">
            <SectionHeader title="三个问题" subtitle="问题 → 思路 → 解法" />
            <div className="space-y-4">
              {PROBLEM_CARDS.map((p) => (
                <ProblemCard key={p.id} {...p} />
              ))}
            </div>
          </section>
        </div>

        <div id="channels" className="scroll-mt-16 space-y-6">
          <section id="channel-cards" className="lingoace-panel scroll-mt-20 p-5 sm:p-6">
            <SectionHeader
              title="师资渠道"
              subtitle="宗教 → 欧美 → 北美 → 菲教（规划中）"
            />
            <div className="mb-4 grid gap-2 sm:grid-cols-5">
              {RECRUITMENT_UX.map((r) => (
                <div
                  key={r.label}
                  className="rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2"
                >
                  <p className="text-xs font-bold text-indigo-700">{r.label}</p>
                  <p className="text-[11px] text-slate-500">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="mb-4 rounded-lg bg-amber-50/60 px-4 py-3 text-xs leading-relaxed text-amber-900 ring-1 ring-amber-100">
              {COMMUNITY_ROI_NOTE}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {CHANNEL_IDS.map((id) => (
                <ChannelCard key={id} {...CHANNEL_PRESETS[id]} />
              ))}
            </div>
          </section>

          <section id="subjects" className="lingoace-panel scroll-mt-20 p-5 sm:p-6">
            <SectionHeader title="学科画像" subtitle={SUBJECT_PROFILES.headline} />
            <div className="grid gap-3 sm:grid-cols-3">
              {SUBJECT_PROFILES.subjects.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                >
                  <p className="font-bold text-indigo-700">{s.label}</p>
                  <p className="mt-1.5 text-xs text-slate-600">
                    <span className="font-semibold">画像：</span>
                    {s.profile}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    <span className="font-semibold">招聘：</span>
                    {s.recruit}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {SUBJECT_PROFILES.shared.map((item) => (
                <LabelChip key={item} tone="brand">
                  {item}
                </LabelChip>
              ))}
            </div>
          </section>

          <section id="ai-model" className="lingoace-panel scroll-mt-20 p-5 sm:p-6">
            <SectionHeader title="AI 时代" subtitle={AI_TEACHER_MODEL.headline} />
            <div className="space-y-3">
              {AI_TEACHER_MODEL.ties.map((t) => (
                <div
                  key={t.problem}
                  className="grid gap-2 rounded-xl border border-slate-100 p-4 sm:grid-cols-3"
                >
                  <p className="text-sm font-semibold text-slate-800">{t.problem}</p>
                  <p className="text-xs text-indigo-700">
                    <span className="font-semibold">AI：</span>
                    {t.ai}
                  </p>
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold">人类：</span>
                    {t.human}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">{AI_TEACHER_MODEL.note}</p>
          </section>
        </div>

        <div id="action" className="scroll-mt-16 space-y-6">
          <section id="calculator" className="lingoace-panel scroll-mt-20 p-5 sm:p-6">
            <SectionHeader title="数据算盘" subtitle="四渠道 CAC 与月成本并排对比" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {channelPreview.map((ch) => (
                <div
                  key={ch.id}
                  className={`rounded-xl border-2 p-4 text-center ${ch.planned ? "border-dashed opacity-75" : ""}`}
                  style={{ borderColor: `${ch.color}40` }}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <p className="text-sm font-bold" style={{ color: ch.color }}>
                      {ch.label}
                    </p>
                    {ch.tag && (
                      <LabelChip tone={ch.planned ? "muted" : "brand"}>{ch.tag}</LabelChip>
                    )}
                  </div>
                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {ch.qualified}
                    <span className="ml-1 text-xs font-medium text-slate-500">人/月</span>
                  </p>
                  <p className="mt-2 text-sm font-semibold text-indigo-700">
                    {formatCny(ch.cac)}
                  </p>
                  <p className="text-[10px] text-slate-400">单师 CAC · {ch.costRange}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-center">
              <Link
                href="/teacher-supply/calculator"
                className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm shadow-md shadow-indigo-200"
              >
                进入多渠道计算器
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section id="path" className="lingoace-panel scroll-mt-20 p-5 sm:p-6">
            <SectionHeader title="执行路径" subtitle={EXECUTION_PATH.headline} />
            <div className="mb-4 flex flex-wrap gap-2">
              {EXECUTION_PATH.loop.map((step) => (
                <LabelChip key={step} tone="brand">
                  {step}
                </LabelChip>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {EXECUTION_PATH.phases.map((ph) => (
                <div
                  key={ph.days}
                  className="rounded-xl border border-slate-100 px-4 py-3"
                >
                  <p className="text-xs font-bold text-indigo-600">{ph.days}</p>
                  <p className="mt-1 text-sm text-slate-700">{ph.focus}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-slate-200/80 bg-white py-8 text-center">
        <p className="text-sm font-medium text-slate-600">{META.title}</p>
        <p className="mt-1 text-xs text-slate-400">
          by {META.author} · /teacher-supply/calculator
        </p>
      </footer>
    </>
  );
}
