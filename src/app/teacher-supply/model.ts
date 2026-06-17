import type { Assumptions } from "../teacher-ops/data";
import {
  computeFunnel,
  computeQualifiedCac,
  computeSummary,
  formatCny,
  formatPct,
  clamp,
} from "../teacher-ops/model";
import {
  CHANNEL_IDS,
  CHANNEL_PRESETS,
  DEFAULT_AI_LEVERAGE,
  DEFAULT_POOL_INPUTS,
  type AiLeverageInputs,
  type ChannelEconomics,
  type PoolInputs,
  type TeacherChannelId,
} from "./data";

export { computeFunnel, computeQualifiedCac, computeSummary, formatCny, formatPct };
export type { Assumptions, PoolInputs, AiLeverageInputs, ChannelEconomics };

/** 月流失人数 = 池子规模 × 年流失率 ÷ 12 */
export function computeMonthlyChurn(pool: PoolInputs) {
  return (pool.poolSize * pool.annualChurnRatePct) / 100 / 12;
}

/** 净池变化 = 月招聘 − 月流失 */
export function computeNetPoolChange(pool: PoolInputs) {
  return pool.monthlyHires - computeMonthlyChurn(pool);
}

/** 年池刷新率 = 月招聘 × 12 ÷ 池子规模 */
export function computeAnnualRefreshPct(pool: PoolInputs) {
  if (pool.poolSize <= 0) return 0;
  return ((pool.monthlyHires * 12) / pool.poolSize) * 100;
}

/** 单次招聘占池子比例 */
export function computeHireAsPoolPct(pool: PoolInputs) {
  if (pool.poolSize <= 0) return 0;
  return (pool.monthlyHires / pool.poolSize) * 100;
}

export type PoolProjectionMonth = {
  month: number;
  poolSize: number;
  churn: number;
  hires: number;
  netChange: number;
};

/** 滚动投影池子规模 */
export function projectPool(pool: PoolInputs, months: number): PoolProjectionMonth[] {
  const rows: PoolProjectionMonth[] = [];
  let current = pool.poolSize;
  const monthlyChurnRate = pool.annualChurnRatePct / 100 / 12;

  for (let m = 1; m <= months; m++) {
    const churn = current * monthlyChurnRate;
    const net = pool.monthlyHires - churn;
    current = Math.max(0, current + net);
    rows.push({
      month: m,
      poolSize: Math.round(current),
      churn: Math.round(churn * 10) / 10,
      hires: pool.monthlyHires,
      netChange: Math.round(net * 10) / 10,
    });
  }
  return rows;
}

export function computePoolHealth(pool: PoolInputs) {
  const monthlyChurn = computeMonthlyChurn(pool);
  const netChange = computeNetPoolChange(pool);
  const annualRefresh = computeAnnualRefreshPct(pool);
  const hireAsPoolPct = computeHireAsPoolPct(pool);
  const projection6 = projectPool(pool, 6);
  const projection12 = projectPool(pool, 12);

  return {
    monthlyChurn,
    netChange,
    annualRefresh,
    hireAsPoolPct,
    projection6,
    projection12,
    kpis: [
      {
        label: "当前池规模",
        value: `${pool.poolSize.toLocaleString("zh-CN")} 人`,
        hint: "在职可排课师资总量",
      },
      {
        label: "月净变化",
        value: `${netChange >= 0 ? "+" : ""}${Math.round(netChange * 10) / 10} 人`,
        hint: `招聘 ${pool.monthlyHires} − 流失 ${Math.round(monthlyChurn * 10) / 10}`,
      },
      {
        label: "年池刷新率",
        value: `${Math.round(annualRefresh * 10) / 10}%`,
        hint: "月招聘×12÷池规模，衡量池子新陈代谢",
      },
      {
        label: "单次招聘占比",
        value: `${Math.round(hireAsPoolPct * 100) / 100}%`,
        hint: "12人/月÷4000池 ≈ 0.3%/月",
      },
    ],
  };
}

export function getChannelEconomics(channelId: TeacherChannelId): ChannelEconomics {
  return CHANNEL_PRESETS[channelId].economics;
}

/** 渠道在月招聘配额下的实际产出与花费 */
export function computeChannelAtScale(
  channelId: TeacherChannelId,
  pool: PoolInputs,
  assumptionsOverride?: Assumptions
) {
  const preset = CHANNEL_PRESETS[channelId];
  const economics = preset.economics;
  const assumptions = assumptionsOverride ?? preset.assumptions;
  const funnel = computeFunnel(assumptions);
  const cac = computeQualifiedCac(assumptions, funnel.qualified);

  const allocatedHires = Math.round((pool.monthlyHires * economics.hireAllocationPct) / 100);
  const monthlyRecruitSpend =
    economics.costPerHire * allocatedHires +
    (assumptions.channelCostBudgetCny * economics.hireAllocationPct) / 100;
  const costPerActiveInPool =
    pool.poolSize > 0 ? monthlyRecruitSpend / pool.poolSize : 0;

  return {
    id: channelId,
    label: preset.label,
    shortLabel: preset.shortLabel,
    color: preset.color,
    planned: preset.planned ?? false,
    tag: preset.tag,
    economics,
    funnel,
    cac,
    allocatedHires,
    monthlyRecruitSpend,
    costPerActiveInPool,
    applicants: funnel.applicants,
    qualified: funnel.qualified,
    misalignmentRate: assumptions.misalignmentRate,
    retention30d: Math.round(
      funnel.qualified * clamp(assumptions.retention90dRate * 0.92, 0, 1)
    ),
  };
}

export function compareChannelsAtScale(pool: PoolInputs = DEFAULT_POOL_INPUTS) {
  return CHANNEL_IDS.map((id) => computeChannelAtScale(id, pool));
}

export function computePortfolioSummary(pool: PoolInputs = DEFAULT_POOL_INPUTS) {
  const channels = compareChannelsAtScale(pool);
  const totalMonthlySpend = channels.reduce((s, c) => s + c.monthlyRecruitSpend, 0);
  const totalApplicants = channels.reduce((s, c) => s + c.applicants, 0);
  const weightedQuality =
    channels.reduce((s, c) => s + c.economics.qualityIndex * c.allocatedHires, 0) /
    Math.max(1, pool.monthlyHires);
  const avgCostPerActive = pool.poolSize > 0 ? totalMonthlySpend / pool.poolSize : 0;

  return {
    channels,
    totalMonthlySpend,
    totalApplicants,
    weightedQuality,
    avgCostPerActive,
    poolHealth: computePoolHealth(pool),
  };
}

/** 全局漏斗：各渠道投递加总 */
export function computeAggregateFunnel(pool: PoolInputs = DEFAULT_POOL_INPUTS) {
  const channels = compareChannelsAtScale(pool);
  const totals = channels.reduce(
    (acc, ch) => {
      const f = ch.funnel;
      return {
        applicants: acc.applicants + f.applicants,
        screened: acc.screened + f.screened,
        demo: acc.demo + f.demo,
        offer: acc.offer + f.offer,
        graduated: acc.graduated + f.graduated,
        qualified: acc.qualified + f.qualified,
        retained30d: acc.retained30d + ch.retention30d,
      };
    },
    { applicants: 0, screened: 0, demo: 0, offer: 0, graduated: 0, qualified: 0, retained30d: 0 }
  );

  const steps = [
    { id: "applicants", label: "简历投递", count: totals.applicants, rate: null as number | null },
    {
      id: "screened",
      label: "初筛通过",
      count: totals.screened,
      rate: totals.applicants > 0 ? totals.screened / totals.applicants : 0,
    },
    {
      id: "demo",
      label: "试讲完成",
      count: totals.demo,
      rate: totals.screened > 0 ? totals.demo / totals.screened : 0,
    },
    {
      id: "offer",
      label: "录用",
      count: totals.offer,
      rate: totals.demo > 0 ? totals.offer / totals.demo : 0,
    },
    {
      id: "graduated",
      label: "培训结业",
      count: totals.graduated,
      rate: totals.offer > 0 ? totals.graduated / totals.offer : 0,
    },
    {
      id: "qualified",
      label: "首月达标",
      count: totals.qualified,
      rate: totals.graduated > 0 ? totals.qualified / totals.graduated : 0,
      highlight: true,
    },
    {
      id: "retained30d",
      label: "30天留存",
      count: totals.retained30d,
      rate: totals.qualified > 0 ? totals.retained30d / totals.qualified : 0,
    },
  ];

  return { ...totals, steps };
}

/** AI 杠杆 ROI — 针对小批量招聘 */
export function computeAiLeverage(
  pool: PoolInputs = DEFAULT_POOL_INPUTS,
  ai: AiLeverageInputs = DEFAULT_AI_LEVERAGE
) {
  const monthlyChurn = computeMonthlyChurn(pool);
  const misalignmentChurnBefore =
    monthlyChurn * (ai.misalignmentChurnOfTotalPct / 100);
  const misalignmentChurnAfter =
    misalignmentChurnBefore * (1 - ai.aiMisalignmentReductionPct / 100);
  const churnSaved = misalignmentChurnBefore - misalignmentChurnAfter;

  const screeningHoursSaved = ai.aiScreeningEnabled
    ? ai.aiHoursSavedPerHire * pool.monthlyHires
    : 0;
  const screeningCostSaved = screeningHoursSaved * ai.recruiterHourlyCostCny;

  const qualityVarianceDelta =
    ai.qualityScoreVarianceBefore - ai.qualityScoreVarianceAfter;
  const perHireImportance = pool.poolSize > 0 ? (1 / pool.monthlyHires) * 100 : 0;

  const annualScreeningSavings = screeningCostSaved * 12;
  const annualChurnValue = churnSaved * ai.avgTeacherReplacementCostCny * 12;

  return {
    screeningHoursSaved,
    screeningCostSaved,
    misalignmentChurnBefore,
    misalignmentChurnAfter,
    churnSaved,
    qualityVarianceDelta,
    perHireImportance,
    annualScreeningSavings,
    annualChurnValue,
    annualTotalBenefit: annualScreeningSavings + annualChurnValue,
    kpis: [
      {
        label: "AI 筛简历节省",
        value: `${Math.round(screeningHoursSaved)} h/月`,
        hint: `${pool.monthlyHires} 人 × ${ai.aiHoursSavedPerHire}h/人`,
      },
      {
        label: "错配流失减少",
        value: `${Math.round(churnSaved * 10) / 10} 人/月`,
        hint: "关联「招聘交付错位」问题",
      },
      {
        label: "质量分方差改善",
        value: `−${Math.round(qualityVarianceDelta * 10) / 10}`,
        hint: "AI 匹配前后课堂质量离散度",
      },
      {
        label: "单次招聘权重",
        value: `${Math.round(perHireImportance * 10) / 10}%`,
        hint: "12人/月下每次招聘对池子影响",
      },
    ],
  };
}

/** 保留主站预览兼容 */
export function computeChannelSummary(
  channelId: TeacherChannelId,
  assumptionsOverride?: Assumptions
) {
  const preset = CHANNEL_PRESETS[channelId];
  const assumptions = assumptionsOverride ?? preset.assumptions;
  const summary = computeSummary(assumptions);
  return {
    ...summary,
    preset,
    monthlyTotalCost:
      assumptions.channelCostBudgetCny +
      assumptions.trainingCostPerTeacherCny * summary.funnel.qualified +
      assumptions.opsCostPerTeacherCny * summary.funnel.qualified,
  };
}

/** 保留主站预览兼容 */
export function compareChannels() {
  const pool = DEFAULT_POOL_INPUTS;
  return CHANNEL_IDS.map((id) => {
    const scaled = computeChannelAtScale(id, pool);
    const preset = CHANNEL_PRESETS[id];
    return {
      id,
      label: scaled.label,
      shortLabel: scaled.shortLabel,
      color: scaled.color,
      planned: scaled.planned,
      tag: scaled.tag,
      qualified: scaled.allocatedHires,
      cac: scaled.cac,
      monthlyTotalCost: scaled.monthlyRecruitSpend,
      applicants: scaled.applicants,
      costRange: preset.costRange,
    };
  });
}
