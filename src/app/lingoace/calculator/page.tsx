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
import { SCENARIOS, type Assumptions } from "../data";
import { computeSummary, formatPct, computeFunnel } from "../model";
import { FIELD_META, DATA_TRUTH_BANNER } from "../field-meta";
import { LabelChip } from "../components/ui";
import { DataHandbook } from "../components/data-handbook";
import { getSources } from "../industry-sources";

const INPUT_GROUPS = [
  {
    title: "招聘漏斗",
    icon: "①",
    desc: "每一步 = 上一步人数 × 转化率",
    fields: [
      { key: "applicantsPerMonth", label: "月投递量", type: "number" as const, min: 50, max: 2000, step: 10 },
      { key: "resumeToScreenRate", label: "简历→初筛", type: "pct" as const },
      { key: "screenToDemoRate", label: "初筛→试讲", type: "pct" as const },
      { key: "demoToOfferRate", label: "试讲→录用", type: "pct" as const },
      { key: "trainingCompletionRate", label: "培训结业率", type: "pct" as const },
      { key: "firstMonthQualifiedRate", label: "首月达标率", type: "pct" as const, highlight: true },
      { key: "retention90dRate", label: "90天留存（学员侧）", type: "pct" as const },
    ],
  },
  {
    title: "对齐指标",
    icon: "②",
    desc: "教师侧 15–60 天验收口径",
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
      { key: "trainingCostPerTeacherCny", label: "单师培训", type: "number" as const, min: 500, max: 5000, step: 100, prefix: "¥" },
      { key: "opsCostPerTeacherCny", label: "单师首月运营", type: "number" as const, min: 200, max: 3000, step: 50, prefix: "¥" },
    ],
  },
];

const TIER_BTN = {
  基础档: "border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100",
  中档: "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100",
  最优档: "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
} as const;

export default function CalculatorPage() {
  const [scenario, setScenario] = useState<keyof typeof SCENARIOS>("中档");
  const [assumptions, setAssumptions] = useState<Assumptions>(SCENARIOS["中档"].assumptions);
  const [expandedField, setExpandedField] = useState<keyof Assumptions | null>(null);

  const summary = useMemo(() => computeSummary(assumptions), [assumptions]);
  const maxCount = Math.max(1, ...summary.funnel.steps.map((s) => s.count));

  function applyScenario(key: keyof typeof SCENARIOS) {
    setScenario(key);
    setAssumptions(SCENARIOS[key].assumptions);
  }

  function setField(key: keyof Assumptions, raw: number, type: "number" | "pct") {
    setAssumptions((a) => ({ ...a, [key]: type === "pct" ? raw / 100 : raw }));
  }

  return (
    <>
      <header className="lingoace-hero border-b border-white/10">
        <div className="lingoace-hero-grid" />
        <div className="relative mx-auto max-w-6xl px-6 py-8">
          <Link
            href="/lingoace"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-indigo-200 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            返回主方案
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">诊断计算器</h1>
              <p className="text-sm text-indigo-200/80">分支页 · 三档假设对比与漏斗演算</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <div className="flex gap-3 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50/50 p-5">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div className="text-sm text-amber-950">
            <p className="font-semibold">{DATA_TRUTH_BANNER.title}</p>
            <ul className="mt-2 space-y-1 leading-relaxed text-amber-900/85">
              {DATA_TRUTH_BANNER.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span>·</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lingoace-panel overflow-hidden">
          {/* Scenario picker */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 via-white to-violet-50/50 px-6 py-5">
            <p className="text-sm font-medium text-slate-700">三档示例数据</p>
            <p className="mt-0.5 text-xs text-slate-500">切换预设，或在下方微调单项</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(Object.keys(SCENARIOS) as Array<keyof typeof SCENARIOS>).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => applyScenario(k)}
                  className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                    scenario === k
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : TIER_BTN[k]
                  }`}
                >
                  {SCENARIOS[k].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">{SCENARIOS[scenario].desc}</p>
            <p className="mt-1.5 rounded-lg bg-white/80 px-3 py-2 text-xs text-indigo-800 ring-1 ring-indigo-100">
              <b>设定依据：</b>
              {SCENARIOS[scenario].basis}
            </p>
          </div>

          <div className="grid lg:grid-cols-2">
            {/* Inputs */}
            <div className="space-y-8 border-b border-slate-100 p-6 lg:border-b-0 lg:border-r">
              {INPUT_GROUPS.map((group) => (
                <div key={group.title}>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700">
                      {group.icon}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{group.title}</h3>
                      <p className="text-xs text-slate-500">{group.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
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
                          className={`overflow-hidden rounded-xl border transition-colors ${
                            isHighlight
                              ? "border-amber-200 bg-amber-50/30"
                              : "border-slate-100 bg-slate-50/50"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 px-4 py-3">
                            <button
                              type="button"
                              onClick={() => setExpandedField(isOpen ? null : key)}
                              className="min-w-0 flex-1 text-left"
                            >
                              <span className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-800">
                                {f.label}
                                {isHighlight && (
                                  <LabelChip tone="warn">核心</LabelChip>
                                )}
                              </span>
                              <span className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
                                点击查看口径
                                {isOpen ? (
                                  <ChevronUp className="h-3 w-3" />
                                ) : (
                                  <ChevronDown className="h-3 w-3" />
                                )}
                              </span>
                            </button>
                            <div className="flex shrink-0 items-center gap-1">
                              {"prefix" in f && f.prefix && (
                                <span className="text-xs text-slate-400">{f.prefix}</span>
                              )}
                              <input
                                type="number"
                                className="lingoace-calc-input w-20 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-right text-sm font-bold text-slate-900"
                                value={display}
                                onChange={(e) =>
                                  setField(key, Number(e.target.value), isPct ? "pct" : "number")
                                }
                              />
                              {isPct && (
                                <span className="text-xs font-medium text-slate-500">%</span>
                              )}
                            </div>
                          </div>
                          {isOpen && (
                            <FieldMetaPanel meta={meta} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Results */}
            <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6">
              <div className="mb-5 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">自动计算结果</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {summary.kpis.map((k, i) => (
                  <div
                    key={k.label}
                    className={`rounded-xl border bg-white p-4 shadow-sm ${
                      i === 0 ? "col-span-2 border-indigo-100" : "border-slate-100"
                    }`}
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                      {k.label}
                    </p>
                    <p
                      className={`mt-1 font-bold text-indigo-700 ${
                        i === 0 ? "text-3xl" : "text-xl"
                      }`}
                    >
                      {k.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  招聘漏斗
                </p>
                <div className="space-y-3">
                  {summary.funnel.steps.map((step) => {
                    const w = Math.max(18, Math.round((step.count / maxCount) * 100));
                    return (
                      <div key={step.id} className="flex items-center gap-3">
                        <span className="w-[4.5rem] shrink-0 text-right text-[11px] font-medium text-slate-600">
                          {step.label}
                        </span>
                        <div className="relative min-w-0 flex-1">
                          <div
                            className={`lingoace-funnel-bar flex h-8 items-center rounded-lg px-3 text-xs font-semibold text-white shadow-sm ${
                              step.highlight
                                ? "bg-gradient-to-r from-amber-500 to-orange-500"
                                : "bg-gradient-to-r from-indigo-500 to-violet-500"
                            }`}
                            style={{ width: `${w}%`, minWidth: "72px" }}
                          >
                            <span className="truncate">
                              {step.count}
                              {step.rate != null && (
                                <span className="ml-1 opacity-80">
                                  ×{formatPct(step.rate)}
                                </span>
                              )}
                            </span>
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

        <DataHandbook />
      </main>
    </>
  );
}

function FieldMetaPanel({ meta }: { meta: (typeof FIELD_META)[keyof Assumptions] }) {
  const refs = meta.sourceIds ? getSources(meta.sourceIds) : [];
  return (
    <div className="space-y-2 border-t border-slate-100 bg-white px-4 py-3 text-xs leading-relaxed text-slate-600">
      <p>
        <b className="text-slate-800">定义：</b>
        {meta.definition}
      </p>
      <p>
        <b className="text-slate-800">公式：</b>
        {meta.formula}
      </p>
      <p>
        <b className="text-slate-800">系统来源：</b>
        {meta.source}
      </p>
      <p>
        <b className="text-slate-800">如何核验：</b>
        {meta.howToVerify}
      </p>
      {meta.benchmark && (
        <p>
          <b className="text-slate-800">行业参照：</b>
          {meta.benchmark}
        </p>
      )}
      {meta.interpretation && (
        <p className="rounded-lg bg-indigo-50 px-2 py-1.5 text-indigo-900">
          <b>解读：</b>
          {meta.interpretation}
        </p>
      )}
      <p className="text-amber-800">
        <b>当前默认值说明：</b>
        {meta.exampleNote}
      </p>
      {refs.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
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
    `→ 试讲 ${f.demo}（×${formatPct(assumptions.screenToDemoRate)}）`,
    `→ 录用 ${f.offer} → 结业 ${f.graduated} → 达标 ${f.qualified}`,
  ];
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white/80 p-4">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        演算过程
      </p>
      <div className="space-y-1 font-mono text-[11px] leading-relaxed text-slate-600">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
    </div>
  );
}
