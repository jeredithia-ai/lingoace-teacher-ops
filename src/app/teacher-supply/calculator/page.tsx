"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Calculator,
  ChevronDown,
  ChevronUp,
  Info,
  TrendingUp,
} from "lucide-react";
import type { Assumptions } from "../../teacher-ops/data";
import { FIELD_META, DATA_TRUTH_BANNER } from "../../teacher-ops/field-meta";
import { getSources } from "../../teacher-ops/industry-sources";
import { LabelChip } from "../components/ui";
import {
  CHANNEL_IDS,
  CHANNEL_PRESETS,
  type TeacherChannelId,
} from "../data";
import {
  compareChannels,
  computeChannelSummary,
  formatCny,
  formatPct,
  computeFunnel,
} from "../model";

const INPUT_GROUPS = [
  {
    title: "招聘漏斗",
    icon: "①",
    desc: "每一步 = 上一步人数 × 转化率",
    fields: [
      { key: "applicantsPerMonth", label: "月投递量", type: "number" as const, min: 50, max: 3000, step: 10 },
      { key: "resumeToScreenRate", label: "简历→初筛", type: "pct" as const },
      { key: "screenToDemoRate", label: "初筛→试讲", type: "pct" as const },
      { key: "demoToOfferRate", label: "试讲→录用", type: "pct" as const },
      { key: "trainingCompletionRate", label: "培训结业率", type: "pct" as const },
      { key: "firstMonthQualifiedRate", label: "首月达标率", type: "pct" as const, highlight: true },
      { key: "retention90dRate", label: "90天留存", type: "pct" as const },
    ],
  },
  {
    title: "对齐指标",
    icon: "②",
    desc: "错配与交接口径",
    fields: [
      { key: "misalignmentRate", label: "错配率", type: "pct" as const },
      { key: "lowRatingRate", label: "满意度<4.0", type: "pct" as const },
      { key: "handoverCompleteRate", label: "交接完整率", type: "pct" as const },
    ],
  },
  {
    title: "成本",
    icon: "③",
    desc: "CAC = (预算 + 单师成本×达标人数) ÷ 达标人数",
    fields: [
      { key: "channelCostBudgetCny", label: "渠道月预算", type: "number" as const, min: 10000, max: 500000, step: 5000, prefix: "¥" },
      { key: "trainingCostPerTeacherCny", label: "单师培训", type: "number" as const, min: 500, max: 6000, step: 100, prefix: "¥" },
      { key: "opsCostPerTeacherCny", label: "单师首月运营", type: "number" as const, min: 200, max: 3000, step: 50, prefix: "¥" },
    ],
  },
];

export default function ChannelCalculatorPage() {
  const [activeChannel, setActiveChannel] = useState<TeacherChannelId>("religious");
  const [assumptions, setAssumptions] = useState<Assumptions>(
    CHANNEL_PRESETS.religious.assumptions
  );
  const [expandedField, setExpandedField] = useState<keyof Assumptions | null>(null);

  const summary = useMemo(
    () => computeChannelSummary(activeChannel, assumptions),
    [activeChannel, assumptions]
  );
  const comparison = useMemo(() => {
    const base = compareChannels();
    return base.map((ch) =>
      ch.id === activeChannel
        ? {
            ...ch,
            qualified: summary.funnel.qualified,
            cac: summary.cac,
            monthlyTotalCost: summary.monthlyTotalCost,
          }
        : ch
    );
  }, [activeChannel, summary]);

  const maxCount = Math.max(1, ...summary.funnel.steps.map((s) => s.count));
  const preset = CHANNEL_PRESETS[activeChannel];

  function selectChannel(id: TeacherChannelId) {
    setActiveChannel(id);
    setAssumptions(CHANNEL_PRESETS[id].assumptions);
  }

  function setField(key: keyof Assumptions, raw: number, type: "number" | "pct") {
    setAssumptions((a) => ({
      ...a,
      [key]: type === "pct" ? raw / 100 : raw,
    }));
  }

  return (
    <>
      <header className="lingoace-hero border-b border-white/10">
        <div className="lingoace-hero-grid" />
        <div className="relative mx-auto max-w-6xl px-6 py-8">
          <Link
            href="/teacher-supply"
            className="mb-5 inline-flex items-center gap-1.5 text-sm text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            返回主站
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">多渠道数据算盘</h1>
              <p className="text-sm text-indigo-200/80">
                宗教 · 欧美 · 北美 · 菲教（规划）— CAC、漏斗、月成本对比
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-5 px-6 py-6">
        <div className="flex gap-3 rounded-xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50/50 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div className="text-sm text-amber-950">
            <p className="font-semibold">{DATA_TRUTH_BANNER.title}</p>
            <ul className="mt-1 space-y-0.5 text-xs leading-relaxed text-amber-900/85">
              {DATA_TRUTH_BANNER.points.slice(0, 2).map((p) => (
                <li key={p}>· {p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lingoace-panel p-5">
          <p className="mb-3 text-sm font-semibold text-slate-800">四渠道并排对比</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {comparison.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => selectChannel(ch.id)}
                className={`rounded-xl border-2 p-3 text-left transition-all ${
                  activeChannel === ch.id ? "shadow-md" : "border-slate-200 hover:border-slate-300"
                } ${ch.planned ? "border-dashed opacity-80" : ""}`}
                style={{
                  borderColor: activeChannel === ch.id ? ch.color : undefined,
                  boxShadow:
                    activeChannel === ch.id ? `0 0 0 2px ${ch.color}33` : undefined,
                }}
              >
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold" style={{ color: ch.color }}>
                    {ch.label}
                  </p>
                  {ch.tag && (
                    <LabelChip tone={ch.planned ? "muted" : "brand"}>{ch.tag}</LabelChip>
                  )}
                </div>
                <p className="mt-2 text-xl font-bold text-slate-900">
                  {ch.qualified}
                  <span className="ml-1 text-xs font-normal text-slate-500">人/月</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-indigo-700">
                  CAC {formatCny(ch.cac)}
                </p>
                <p className="text-[10px] text-slate-500">
                  月总成本 {formatCny(ch.monthlyTotalCost)}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="lingoace-panel overflow-hidden">
          <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 via-white to-violet-50/50 px-5 py-4">
            <p className="text-sm font-medium text-slate-700">
              当前编辑：<span style={{ color: preset.color }}>{preset.label}</span>
              {preset.planned && (
                <span className="ml-2 text-xs text-slate-400">（规划假设）</span>
              )}
            </p>
            <p className="mt-1 text-xs text-slate-500">{preset.useCase}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {CHANNEL_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectChannel(id)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    activeChannel === id
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {CHANNEL_PRESETS[id].shortLabel}
                </button>
              ))}
            </div>
            <p className="mt-2 rounded-lg bg-white/80 px-3 py-1.5 text-xs text-indigo-800 ring-1 ring-indigo-100">
              <b>师训：</b>{preset.trainingPath}
            </p>
          </div>

          <div className="grid lg:grid-cols-2">
            <div className="space-y-6 border-b border-slate-100 p-5 lg:border-b-0 lg:border-r">
              {INPUT_GROUPS.map((group) => (
                <div key={group.title}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700">
                      {group.icon}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{group.title}</h3>
                      <p className="text-[10px] text-slate-500">{group.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {group.fields.map((f) => {
                      const key = f.key as keyof Assumptions;
                      const meta = FIELD_META[key];
                      const isPct = f.type === "pct";
                      const display = isPct
                        ? Math.round((assumptions[key] as number) * 100)
                        : (assumptions[key] as number);
                      const isOpen = expandedField === key;
                      const isHighlight = "highlight" in f && f.highlight;
                      return (
                        <div
                          key={f.key}
                          className={`overflow-hidden rounded-lg border ${
                            isHighlight
                              ? "border-amber-200 bg-amber-50/30"
                              : "border-slate-100 bg-slate-50/50"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 px-3 py-2">
                            <button
                              type="button"
                              onClick={() => setExpandedField(isOpen ? null : key)}
                              className="min-w-0 flex-1 text-left"
                            >
                              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-800">
                                {f.label}
                                {isHighlight && <LabelChip tone="warn">核心</LabelChip>}
                              </span>
                            </button>
                            <div className="flex shrink-0 items-center gap-1">
                              {"prefix" in f && f.prefix && (
                                <span className="text-xs text-slate-400">{f.prefix}</span>
                              )}
                              <input
                                type="number"
                                className="lingoace-calc-input w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-right text-sm font-bold text-slate-900"
                                value={display}
                                onChange={(e) =>
                                  setField(key, Number(e.target.value), isPct ? "pct" : "number")
                                }
                              />
                              {isPct && (
                                <span className="text-xs font-medium text-slate-500">%</span>
                              )}
                              <button
                                type="button"
                                onClick={() => setExpandedField(isOpen ? null : key)}
                                className="text-slate-400"
                              >
                                {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                              </button>
                            </div>
                          </div>
                          {isOpen && <FieldMetaPanel meta={meta} />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-700">招聘渠道</p>
                <ul className="mt-1 space-y-0.5">
                  {preset.recruitmentChannels.map((c) => (
                    <li key={c} className="text-xs text-slate-600">· {c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 p-5">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">自动计算结果</h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {summary.kpis.map((k, i) => (
                  <div
                    key={k.label}
                    className={`rounded-lg border bg-white p-3 shadow-sm ${
                      i === 0 ? "col-span-2 border-indigo-100" : "border-slate-100"
                    }`}
                  >
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
                      {k.label}
                    </p>
                    <p className={`mt-0.5 font-bold text-indigo-700 ${i === 0 ? "text-2xl" : "text-lg"}`}>
                      {k.value}
                    </p>
                  </div>
                ))}
                <div className="col-span-2 rounded-lg border border-emerald-100 bg-emerald-50/50 p-3">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-emerald-700">
                    月总成本
                  </p>
                  <p className="mt-0.5 text-xl font-bold text-emerald-800">
                    {formatCny(summary.monthlyTotalCost)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  招聘漏斗
                </p>
                <div className="space-y-2">
                  {summary.funnel.steps.map((step) => {
                    const w = Math.max(18, Math.round((step.count / maxCount) * 100));
                    return (
                      <div key={step.id} className="flex items-center gap-2">
                        <span className="w-16 shrink-0 text-right text-[10px] font-medium text-slate-600">
                          {step.label}
                        </span>
                        <div className="relative min-w-0 flex-1">
                          <div
                            className={`lingoace-funnel-bar flex h-7 items-center rounded-lg px-2 text-[10px] font-semibold text-white ${
                              step.highlight
                                ? "bg-gradient-to-r from-amber-500 to-orange-500"
                                : "bg-gradient-to-r from-indigo-500 to-violet-500"
                            }`}
                            style={{ width: `${w}%`, minWidth: "64px" }}
                          >
                            {step.count}
                            {step.rate != null && (
                              <span className="ml-1 opacity-80">×{formatPct(step.rate)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <CalcWalkthrough assumptions={assumptions} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function FieldMetaPanel({ meta }: { meta: (typeof FIELD_META)[keyof Assumptions] }) {
  const refs = meta.sourceIds ? getSources(meta.sourceIds) : [];
  return (
    <div className="space-y-1.5 border-t border-slate-100 bg-white px-3 py-2 text-[11px] leading-relaxed text-slate-600">
      <p><b className="text-slate-800">定义：</b>{meta.definition}</p>
      <p><b className="text-slate-800">公式：</b>{meta.formula}</p>
      {meta.benchmark && (
        <p><b className="text-slate-800">参照：</b>{meta.benchmark}</p>
      )}
      {refs.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {refs.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700 hover:bg-indigo-100"
            >
              {s.publisher} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function CalcWalkthrough({ assumptions }: { assumptions: Assumptions }) {
  const f = computeFunnel(assumptions);
  const lines = [
    `投递 ${f.applicants} → 初筛 ${f.screened}（×${formatPct(assumptions.resumeToScreenRate)}）`,
    `→ 试讲 ${f.demo} → 录用 ${f.offer} → 结业 ${f.graduated} → 达标 ${f.qualified}`,
  ];
  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-white/80 p-3">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">演算</p>
      <div className="space-y-0.5 font-mono text-[10px] leading-relaxed text-slate-600">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
    </div>
  );
}
