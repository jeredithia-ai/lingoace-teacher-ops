import type { Assumptions } from "../teacher-ops/data";
import {
  computeFunnel,
  computeQualifiedCac,
  computeSummary,
  formatCny,
  formatPct,
} from "../teacher-ops/model";
import {
  CHANNEL_IDS,
  CHANNEL_PRESETS,
  type TeacherChannelId,
} from "./data";

export { computeFunnel, computeQualifiedCac, computeSummary, formatCny, formatPct };
export type { Assumptions };

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

export function compareChannels() {
  return CHANNEL_IDS.map((id) => {
    const result = computeChannelSummary(id);
    return {
      id,
      label: result.preset.label,
      shortLabel: result.preset.shortLabel,
      color: result.preset.color,
      planned: result.preset.planned ?? false,
      tag: result.preset.tag,
      qualified: result.funnel.qualified,
      cac: result.cac,
      monthlyTotalCost: result.monthlyTotalCost,
      applicants: result.funnel.applicants,
      costRange: result.preset.costRange,
    };
  });
}
