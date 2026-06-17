"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Calculator,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Assumptions } from "../../teacher-ops/data";
import { FIELD_META, DATA_TRUTH_BANNER } from "../../teacher-ops/field-meta";
import { getSources } from "../../teacher-ops/industry-sources";
import { LabelChip } from "../components/ui";
import {
  CHANNEL_IDS,
  CHANNEL_PRESETS,
  DATA_METHODOLOGY,
  DEFAULT_AI_LEVERAGE,
  DEFAULT_POOL_INPUTS,
  type AiLeverageInputs,
  type PoolInputs,
  type TeacherChannelId,
} from "../data";
import {
  compareChannelsAtScale,
  computeAggregateFunnel,
  computeAiLeverage,
  computeChannelAtScale,
  computePoolHealth,
  computePortfolioSummary,
  formatCny,
  formatPct,
} from "../model";

type TabId = "pool" | "channels" | "funnel" | "ai";

const TABS: { id: TabId; label: string; icon: typeof Users }[] = [
  { id: "pool", label: "池子健康度", icon: Users },
  { id: "channels", label: "渠道结构", icon: Layers },
  { id: "funnel", label: "招聘漏斗", icon: TrendingUp },
  { id: "ai", label: "AI 杠杆", icon: Sparkles },
];

const FUNNEL_FIELDS: { key: keyof Assumptions; label: string }[] = [
  { key: "applicantsPerMonth", label: "月投递量" },
  { key: "resumeToScreenRate", label: "简历→初筛" },
  { key: "screenToDemoRate", label: "初筛→试讲" },
  { key: "demoToOfferRate", label: "试讲→录用" },
  { key: "trainingCompletionRate", label: "培训结业率" },
  { key: "firstMonthQualifiedRate", label: "首月达标率" },
  { key: "retention90dRate", label: "90天留存" },
];

export default function ChannelCalculatorPage() {
  const [activeTab, setActiveTab] = useState<TabId>("pool");
  const [pool, setPool] = useState<PoolInputs>(DEFAULT_POOL_INPUTS);
  const [ai, setAi] = useState<AiLeverageInputs>(DEFAULT_AI_LEVERAGE);
  const [activeChannel, setActiveChannel] = useState<TeacherChannelId>("china");
  const [channelAssumptions, setChannelAssumptions] = useState<Assumptions>(
    CHANNEL_PRESETS.china.assumptions
  );
  const [expandedField, setExpandedField] = useState<keyof Assumptions | null>(null);
  const [showMethodology, setShowMethodology] = useState(false);

  const portfolio = useMemo(() => computePortfolioSummary(pool), [pool]);
  const poolHealth = useMemo(() => computePoolHealth(pool), [pool]);
  const channels = useMemo(() => compareChannelsAtScale(pool), [pool]);
  const aggregateFunnel = useMemo(() => computeAggregateFunnel(pool), [pool]);
  const aiResult = useMemo(() => computeAiLeverage(pool, ai), [pool, ai]);

  const activeChannelData = useMemo(
    () => computeChannelAtScale(activeChannel, pool, channelAssumptions),
    [activeChannel, pool, channelAssumptions]
  );

  const maxProjection = Math.max(
    pool.poolSize,
    ...poolHealth.projection12.map((p) => p.poolSize)
  );

  function selectChannel(id: TeacherChannelId) {
    setActiveChannel(id);
    setChannelAssumptions(CHANNEL_PRESETS[id].assumptions);
  }

  function setPoolField<K extends keyof PoolInputs>(key: K, value: PoolInputs[K]) {
    setPool((p) => ({ ...p, [key]: value }));
  }

  function setAiField<K extends keyof AiLeverageInputs>(key: K, value: AiLeverageInputs[K]) {
    setAi((a) => ({ ...a, [key]: value }));
  }

  function setAssumptionField(key: keyof Assumptions, raw: number, isPct: boolean) {
    setChannelAssumptions((a) => ({
      ...a,
      [key]: isPct ? raw / 100 : raw,
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
              <h1 className="text-xl font-bold text-white sm:text-2xl">师资池运营算盘</h1>
              <p className="text-sm text-indigo-200/80">
                4000 人池 · 月招 12 人 · 池动态 / 渠道 / 漏斗 / AI 杠杆
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
            <p className="mt-1 text-xs leading-relaxed text-amber-900/85">
              {DATA_METHODOLOGY.intro}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-indigo-50"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "pool" && (
          <PoolTab
            pool={pool}
            poolHealth={poolHealth}
            maxProjection={maxProjection}
            onChange={setPoolField}
          />
        )}

        {activeTab === "channels" && (
          <ChannelsTab
            pool={pool}
            channels={channels}
            portfolio={portfolio}
            activeChannel={activeChannel}
            onSelectChannel={selectChannel}
          />
        )}

        {activeTab === "funnel" && (
          <FunnelTab
            pool={pool}
            aggregateFunnel={aggregateFunnel}
            activeChannel={activeChannel}
            channelAssumptions={channelAssumptions}
            activeChannelData={activeChannelData}
            expandedField={expandedField}
            onSelectChannel={selectChannel}
            onSetField={setAssumptionField}
            onToggleField={(k) => setExpandedField(expandedField === k ? null : k)}
          />
        )}

        {activeTab === "ai" && (
          <AiTab ai={ai} aiResult={aiResult} pool={pool} onChange={setAiField} />
        )}

        <MethodologyPanel
          open={showMethodology}
          onToggle={() => setShowMethodology(!showMethodology)}
        />
      </main>
    </>
  );
}

function PoolTab({
  pool,
  poolHealth,
  maxProjection,
  onChange,
}: {
  pool: PoolInputs;
  poolHealth: ReturnType<typeof computePoolHealth>;
  maxProjection: number;
  onChange: <K extends keyof PoolInputs>(key: K, value: PoolInputs[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="lingoace-panel p-5">
        <p className="mb-4 text-sm font-semibold text-slate-800">池子参数</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <SliderInput
            label="师资池规模"
            value={pool.poolSize}
            min={2000}
            max={8000}
            step={100}
            unit="人"
            hint="在职可排课师资总量"
            onChange={(v) => onChange("poolSize", v)}
          />
          <SliderInput
            label="月招聘量"
            value={pool.monthlyHires}
            min={4}
            max={30}
            step={1}
            unit="人/月"
            hint="默认一打，非大规模招聘"
            onChange={(v) => onChange("monthlyHires", v)}
          />
          <SliderInput
            label="年流失率"
            value={pool.annualChurnRatePct}
            min={2}
            max={8}
            step={0.5}
            unit="%/年"
            hint={`月流失 ≈ ${Math.round(poolHealth.monthlyChurn * 10) / 10} 人`}
            onChange={(v) => onChange("annualChurnRatePct", v)}
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {poolHealth.kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} hint={k.hint} />
        ))}
      </div>

      <div className="lingoace-panel p-5">
        <p className="mb-1 text-sm font-semibold text-slate-800">6 / 12 月池规模投影</p>
        <p className="mb-4 text-xs text-slate-500">
          每月：池规模 = 上月规模 + 月招聘 − 月流失（流失按当前池规模 × 年流失率 ÷ 12）
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <ProjectionChart
            title="6 个月"
            rows={poolHealth.projection6}
            maxVal={maxProjection}
          />
          <ProjectionChart
            title="12 个月"
            rows={poolHealth.projection12}
            maxVal={maxProjection}
          />
        </div>
      </div>
    </div>
  );
}

function ChannelsTab({
  pool,
  channels,
  portfolio,
  activeChannel,
  onSelectChannel,
}: {
  pool: PoolInputs;
  channels: ReturnType<typeof compareChannelsAtScale>;
  portfolio: ReturnType<typeof computePortfolioSummary>;
  activeChannel: TeacherChannelId;
  onSelectChannel: (id: TeacherChannelId) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <KpiCard
          label="月招聘总花费"
          value={formatCny(portfolio.totalMonthlySpend)}
          hint={`${pool.monthlyHires} 人配额分配`}
        />
        <KpiCard
          label="池均月招聘成本"
          value={formatCny(portfolio.avgCostPerActive)}
          hint="月总花费 ÷ 池规模"
        />
        <KpiCard
          label="加权质量指数"
          value={Math.round(portfolio.weightedQuality).toString()}
          hint="按招聘配额加权"
        />
      </div>

      <div className="lingoace-panel overflow-x-auto p-5">
        <p className="mb-3 text-sm font-semibold text-slate-800">四渠道对比（月 {pool.monthlyHires} 人配额）</p>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <th className="pb-2 pr-3">渠道</th>
              <th className="pb-2 pr-3">配额</th>
              <th className="pb-2 pr-3">月分配</th>
              <th className="pb-2 pr-3">单师 CAC</th>
              <th className="pb-2 pr-3">月花费</th>
              <th className="pb-2 pr-3">池均成本</th>
              <th className="pb-2 pr-3">质量</th>
              <th className="pb-2">到岗周期</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((ch) => (
              <tr
                key={ch.id}
                className={`cursor-pointer border-b border-slate-50 transition hover:bg-slate-50 ${
                  activeChannel === ch.id ? "bg-indigo-50/50" : ""
                }`}
                onClick={() => onSelectChannel(ch.id)}
              >
                <td className="py-2.5 pr-3">
                  <span className="font-semibold" style={{ color: ch.color }}>
                    {ch.label}
                  </span>
                  {ch.tag && (
                    <LabelChip tone={ch.planned ? "muted" : "brand"}>{ch.tag}</LabelChip>
                  )}
                </td>
                <td className="py-2.5 pr-3">{ch.economics.hireAllocationPct}%</td>
                <td className="py-2.5 pr-3 font-medium">{ch.allocatedHires} 人</td>
                <td className="py-2.5 pr-3">{formatCny(ch.cac)}</td>
                <td className="py-2.5 pr-3">{formatCny(ch.monthlyRecruitSpend)}</td>
                <td className="py-2.5 pr-3">{formatCny(ch.costPerActiveInPool)}</td>
                <td className="py-2.5 pr-3">{ch.economics.qualityIndex}</td>
                <td className="py-2.5">{ch.economics.timeToFillDays} 天</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((ch) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => onSelectChannel(ch.id)}
            className={`rounded-xl border-2 p-3 text-left transition ${
              activeChannel === ch.id ? "shadow-md" : "border-slate-200 hover:border-slate-300"
            } ${ch.planned ? "border-dashed opacity-80" : ""}`}
            style={{
              borderColor: activeChannel === ch.id ? ch.color : undefined,
            }}
          >
            <p className="text-sm font-bold" style={{ color: ch.color }}>
              {ch.label}
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {ch.allocatedHires}
              <span className="ml-1 text-xs font-normal text-slate-500">人/月</span>
            </p>
            <p className="text-xs text-slate-500">
              {formatCny(ch.monthlyRecruitSpend)}/月 · 质量 {ch.economics.qualityIndex}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function FunnelTab({
  pool,
  aggregateFunnel,
  activeChannel,
  channelAssumptions,
  activeChannelData,
  expandedField,
  onSelectChannel,
  onSetField,
  onToggleField,
}: {
  pool: PoolInputs;
  aggregateFunnel: ReturnType<typeof computeAggregateFunnel>;
  activeChannel: TeacherChannelId;
  channelAssumptions: Assumptions;
  activeChannelData: ReturnType<typeof computeChannelAtScale>;
  expandedField: keyof Assumptions | null;
  onSelectChannel: (id: TeacherChannelId) => void;
  onSetField: (key: keyof Assumptions, raw: number, isPct: boolean) => void;
  onToggleField: (key: keyof Assumptions) => void;
}) {
  const preset = CHANNEL_PRESETS[activeChannel];
  const maxCount = Math.max(1, ...aggregateFunnel.steps.map((s) => s.count));
  const channelMax = Math.max(1, ...activeChannelData.funnel.steps.map((s) => s.count));

  return (
    <div className="space-y-5">
      <div className="lingoace-panel p-5">
        <p className="mb-1 text-sm font-semibold text-slate-800">全局漏斗（四渠道合计）</p>
        <p className="mb-4 text-xs text-slate-500">
          月投递 {aggregateFunnel.applicants} 人 → 首月达标 {aggregateFunnel.qualified} 人 →
          30天留存 {aggregateFunnel.retained30d} 人（目标招聘 {pool.monthlyHires} 人/月）
        </p>
        <FunnelBars steps={aggregateFunnel.steps} maxCount={maxCount} />
      </div>

      <div className="lingoace-panel overflow-hidden">
        <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 to-violet-50/50 px-5 py-4">
          <p className="text-sm font-medium text-slate-700">
            单渠道漏斗编辑：
            <span style={{ color: preset.color }}> {preset.label}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CHANNEL_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => onSelectChannel(id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  activeChannel === id
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {CHANNEL_PRESETS[id].shortLabel}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          <div className="space-y-1.5 border-b border-slate-100 p-5 lg:border-b-0 lg:border-r">
            {FUNNEL_FIELDS.map((f) => {
              const key = f.key;
              const meta = FIELD_META[key];
              const isPct = key !== "applicantsPerMonth";
              const display = isPct
                ? Math.round((channelAssumptions[key] as number) * 100)
                : (channelAssumptions[key] as number);
              const isOpen = expandedField === key;
              return (
                <div
                  key={f.key}
                  className="overflow-hidden rounded-lg border border-slate-100 bg-slate-50/50"
                >
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => onToggleField(key)}
                      className="min-w-0 flex-1 text-left text-sm font-medium text-slate-800"
                    >
                      {f.label}
                    </button>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        className="lingoace-calc-input w-16 rounded-lg border border-slate-200 bg-white px-2 py-1 text-right text-sm font-bold"
                        value={display}
                        onChange={(e) =>
                          onSetField(key, Number(e.target.value), isPct)
                        }
                      />
                      {isPct && <span className="text-xs text-slate-500">%</span>}
                      <button type="button" onClick={() => onToggleField(key)} className="text-slate-400">
                        {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                  {isOpen && <FieldMetaPanel meta={meta} />}
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 p-5">
            <p className="mb-3 text-sm font-bold text-slate-900">
              {preset.label} 漏斗 · 月配额 {activeChannelData.allocatedHires} 人
            </p>
            <FunnelBars steps={activeChannelData.funnel.steps} maxCount={channelMax} />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <KpiCard label="错配率" value={formatPct(activeChannelData.misalignmentRate)} />
              <KpiCard label="30天留存" value={`${activeChannelData.retention30d} 人`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiTab({
  ai,
  aiResult,
  pool,
  onChange,
}: {
  ai: AiLeverageInputs;
  aiResult: ReturnType<typeof computeAiLeverage>;
  pool: PoolInputs;
  onChange: <K extends keyof AiLeverageInputs>(key: K, value: AiLeverageInputs[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="lingoace-panel p-5">
        <p className="mb-1 text-sm font-semibold text-slate-800">AI 杠杆参数</p>
        <p className="mb-4 text-xs text-slate-500">
          月招 {pool.monthlyHires} 人时，每次招聘权重 {aiResult.perHireImportance.toFixed(1)}%——
          小批量下 AI 效率与匹配质量直接影响池子健康。
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <SliderInput
            label="AI 筛简历节省"
            value={ai.aiHoursSavedPerHire}
            min={0}
            max={6}
            step={0.5}
            unit="h/人"
            hint={`基准 ${ai.recruiterHoursPerHireBaseline}h/人`}
            onChange={(v) => onChange("aiHoursSavedPerHire", v)}
          />
          <SliderInput
            label="错配流失占比"
            value={ai.misalignmentChurnOfTotalPct}
            min={10}
            max={60}
            step={5}
            unit="%"
            hint="月流失中归因于招聘交付错位"
            onChange={(v) => onChange("misalignmentChurnOfTotalPct", v)}
          />
          <SliderInput
            label="AI 匹配降错配"
            value={ai.aiMisalignmentReductionPct}
            min={0}
            max={50}
            step={5}
            unit="%"
            hint="AI 标签匹配削减错配流失"
            onChange={(v) => onChange("aiMisalignmentReductionPct", v)}
          />
          <SliderInput
            label="质量方差（前）"
            value={ai.qualityScoreVarianceBefore}
            min={1}
            max={3}
            step={0.1}
            unit=""
            hint={`AI 后 ${ai.qualityScoreVarianceAfter}`}
            onChange={(v) => onChange("qualityScoreVarianceBefore", v)}
          />
        </div>
        <div className="mt-3 flex gap-4">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={ai.aiScreeningEnabled}
              onChange={(e) => onChange("aiScreeningEnabled", e.target.checked)}
              className="rounded border-slate-300"
            />
            AI 筛简历
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={ai.aiMatchingEnabled}
              onChange={(e) => onChange("aiMatchingEnabled", e.target.checked)}
              className="rounded border-slate-300"
            />
            AI 师生匹配
          </label>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {aiResult.kpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} hint={k.hint} />
        ))}
      </div>

      <div className="lingoace-panel p-5">
        <p className="mb-3 text-sm font-semibold text-slate-800">年度 ROI 估算</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <KpiCard
            label="招聘工时节省"
            value={formatCny(aiResult.annualScreeningSavings)}
            hint={`${Math.round(aiResult.screeningHoursSaved * 12)}h/年 × ¥${ai.recruiterHourlyCostCny}/h`}
          />
          <KpiCard
            label="错配流失价值"
            value={formatCny(aiResult.annualChurnValue)}
            hint={`减少 ${Math.round(aiResult.churnSaved * 10) / 10} 人/月流失`}
          />
          <KpiCard
            label="年度总收益"
            value={formatCny(aiResult.annualTotalBenefit)}
            hint="工时 + 流失替代成本"
            highlight
          />
        </div>
        <p className="mt-4 rounded-lg bg-indigo-50/60 px-4 py-3 text-xs leading-relaxed text-indigo-900">
          错配流失：月流失 {Math.round(aiResult.misalignmentChurnBefore * 10) / 10} 人 →
          AI 后 {Math.round(aiResult.misalignmentChurnAfter * 10) / 10} 人。
          质量方差 {ai.qualityScoreVarianceBefore} → {ai.qualityScoreVarianceAfter}，
          课堂一致性提升 {Math.round(aiResult.qualityVarianceDelta * 10) / 10} 分。
        </p>
      </div>
    </div>
  );
}

function MethodologyPanel({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="lingoace-panel overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-800">{DATA_METHODOLOGY.headline}</span>
        {open ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 pb-5">
          <div className="mt-4 space-y-3">
            {DATA_METHODOLOGY.assumptions.map((a) => (
              <div key={a.label} className="rounded-lg bg-slate-50 px-4 py-3">
                <p className="text-xs font-bold text-indigo-700">{a.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{a.detail}</p>
              </div>
            ))}
          </div>
          <p className="mb-2 mt-5 text-xs font-bold text-slate-700">三大问题 ↔ 数据模型</p>
          <div className="space-y-2">
            {DATA_METHODOLOGY.problemTies.map((t) => (
              <div key={t.problemId} className="rounded-lg border border-slate-100 px-4 py-3">
                <p className="text-xs font-semibold text-slate-800">{t.metric}</p>
                <p className="mt-0.5 text-xs text-slate-500">{t.logic}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  hint,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  hint?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        <span className="text-sm font-bold text-indigo-700">
          {value}
          <span className="ml-0.5 text-xs font-normal text-slate-500">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />
      {hint && <p className="mt-0.5 text-[10px] text-slate-400">{hint}</p>}
    </div>
  );
}

function KpiCard({
  label,
  value,
  hint,
  highlight,
}: {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? "border-emerald-200 bg-emerald-50/50" : "border-slate-100 bg-white"
      }`}
    >
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 font-bold ${highlight ? "text-xl text-emerald-800" : "text-lg text-indigo-700"}`}>
        {value}
      </p>
      {hint && <p className="mt-0.5 text-[10px] text-slate-400">{hint}</p>}
    </div>
  );
}

function ProjectionChart({
  title,
  rows,
  maxVal,
}: {
  title: string;
  rows: { month: number; poolSize: number; netChange: number }[];
  maxVal: number;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-slate-600">{title}</p>
      <div className="space-y-1.5">
        {rows.map((r) => {
          const w = Math.max(8, Math.round((r.poolSize / maxVal) * 100));
          return (
            <div key={r.month} className="flex items-center gap-2">
              <span className="w-8 shrink-0 text-right text-[10px] text-slate-500">
                M{r.month}
              </span>
              <div className="relative min-w-0 flex-1">
                <div
                  className="flex h-6 items-center rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 px-2 text-[10px] font-semibold text-white"
                  style={{ width: `${w}%`, minWidth: "48px" }}
                >
                  {r.poolSize.toLocaleString("zh-CN")}
                </div>
              </div>
              <span
                className={`w-12 shrink-0 text-right text-[10px] font-medium ${
                  r.netChange >= 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {r.netChange >= 0 ? "+" : ""}
                {r.netChange}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FunnelBars({
  steps,
  maxCount,
}: {
  steps: { id: string; label: string; count: number; rate: number | null; highlight?: boolean }[];
  maxCount: number;
}) {
  return (
    <div className="space-y-2">
      {steps.map((step) => {
        const w = Math.max(18, Math.round((step.count / maxCount) * 100));
        return (
          <div key={step.id} className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-right text-[10px] font-medium text-slate-600">
              {step.label}
            </span>
            <div className="relative min-w-0 flex-1">
              <div
                className={`flex h-7 items-center rounded-lg px-2 text-[10px] font-semibold text-white ${
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
  );
}

function FieldMetaPanel({ meta }: { meta: (typeof FIELD_META)[keyof Assumptions] }) {
  const refs = meta.sourceIds ? getSources(meta.sourceIds) : [];
  return (
    <div className="space-y-1.5 border-t border-slate-100 bg-white px-3 py-2 text-[11px] leading-relaxed text-slate-600">
      <p>
        <b className="text-slate-800">定义：</b>
        {meta.definition}
      </p>
      <p>
        <b className="text-slate-800">公式：</b>
        {meta.formula}
      </p>
      {meta.benchmark && (
        <p>
          <b className="text-slate-800">参照：</b>
          {meta.benchmark}
        </p>
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
