import type { Assumptions } from "./data";

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function formatPct(rate: number) {
  return `${Math.round(rate * 100)}%`;
}

export function formatCny(n: number) {
  if (!Number.isFinite(n)) return "—";
  return `¥${Math.round(n).toLocaleString("zh-CN")}`;
}

/** 招聘漏斗：每一步人数由「上一步人数 × 转化率」自动算出 */
export function computeFunnel(a: Assumptions) {
  const applicants = Math.max(0, Math.round(a.applicantsPerMonth));
  const screened = Math.round(applicants * clamp(a.resumeToScreenRate, 0, 1));
  const demo = Math.round(screened * clamp(a.screenToDemoRate, 0, 1));
  const offer = Math.round(demo * clamp(a.demoToOfferRate, 0, 1));
  const training = Math.round(offer * clamp(a.offerToTrainingRate, 0, 1));
  const graduated = Math.round(training * clamp(a.trainingCompletionRate, 0, 1));
  const qualified = Math.round(graduated * clamp(a.firstMonthQualifiedRate, 0, 1));
  const retained90d = Math.round(qualified * clamp(a.retention90dRate, 0, 1));

  const steps = [
    { id: "applicants", label: "简历投递", count: applicants, rate: null as number | null },
    { id: "screened", label: "初筛通过", count: screened, rate: a.resumeToScreenRate },
    { id: "demo", label: "试讲完成", count: demo, rate: a.screenToDemoRate },
    { id: "offer", label: "录用", count: offer, rate: a.demoToOfferRate },
    { id: "graduated", label: "培训结业", count: graduated, rate: a.trainingCompletionRate },
    { id: "qualified", label: "首月达标", count: qualified, rate: a.firstMonthQualifiedRate, highlight: true },
    { id: "retained", label: "90 天留存", count: retained90d, rate: a.retention90dRate },
  ];

  return {
    applicants,
    screened,
    demo,
    offer,
    training,
    graduated,
    qualified,
    retained90d,
    steps,
  };
}

/** 单师 CAC = (渠道预算 + 单师培训×达标人数 + 单师运营×达标人数) ÷ 达标人数 */
export function computeQualifiedCac(a: Assumptions, qualifiedCount: number) {
  if (qualifiedCount <= 0) return Infinity;
  const total =
    a.channelCostBudgetCny +
    a.trainingCostPerTeacherCny * qualifiedCount +
    a.opsCostPerTeacherCny * qualifiedCount;
  return total / qualifiedCount;
}

export function computeSummary(a: Assumptions) {
  const funnel = computeFunnel(a);
  const cac = computeQualifiedCac(a, funnel.qualified);
  return {
    funnel,
    cac,
    kpis: [
      { label: "本月首月达标", value: `${funnel.qualified} 人`, hint: "招聘真正「有效产出」" },
      { label: "单师全链路 CAC", value: formatCny(cac), hint: "按达标人数摊销成本" },
      { label: "错配率", value: formatPct(a.misalignmentRate), hint: "首月未达标占比（你的体感输入）" },
      { label: "交接完整率", value: formatPct(a.handoverCompleteRate), hint: "招聘→交付是否脱节" },
    ],
  };
}
