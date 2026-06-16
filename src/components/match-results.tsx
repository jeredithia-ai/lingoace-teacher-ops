import type { MatchAnalysis } from "@/types";
import { getScoreBg, getScoreColor } from "@/lib/utils";
import {
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Target,
  Crosshair,
} from "lucide-react";

interface MatchResultsProps {
  analysis: MatchAnalysis;
  companyName?: string | null;
  positionTitle?: string | null;
}

export function MatchResults({
  analysis,
  companyName,
  positionTitle,
}: MatchResultsProps) {
  return (
    <div className="space-y-6">
      {(companyName || positionTitle) && (
        <div className="text-center">
          {companyName && (
            <p className="text-sm text-slate-500">{companyName}</p>
          )}
          {positionTitle && (
            <h2 className="text-xl font-bold text-slate-900">{positionTitle}</h2>
          )}
        </div>
      )}

      <div
        className={`mx-auto flex max-w-xs flex-col items-center rounded-2xl border p-6 ${getScoreBg(analysis.score)}`}
      >
        <p className="mb-1 text-sm font-medium text-slate-600">匹配度</p>
        <p className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
          {analysis.score}
          <span className="text-2xl">%</span>
        </p>
        <p className="mt-2 text-center text-sm text-slate-600">
          {analysis.summary}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Section icon={TrendingUp} title="你的优势" items={analysis.strengths} color="emerald" />
        <Section icon={AlertTriangle} title="技能缺口" items={analysis.gaps} color="amber" />
        <Section icon={Lightbulb} title="准备建议" items={analysis.recommendations} color="blue" />
        <Section icon={Target} title="核心话题" items={analysis.keyTopics} color="violet" />
      </div>

      <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
        <div className="mb-3 flex items-center gap-2 font-semibold text-brand-800">
          <Crosshair className="h-5 w-5" />
          面试官最可能深挖的方向
        </div>
        <ul className="space-y-2">
          {analysis.interviewFocus.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-brand-900">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-200 text-xs font-bold">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  items,
  color,
}: {
  icon: React.ElementType;
  title: string;
  items: string[];
  color: string;
}) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-50 border-emerald-100 text-emerald-800",
    amber: "bg-amber-50 border-amber-100 text-amber-800",
    blue: "bg-blue-50 border-blue-100 text-blue-800",
    violet: "bg-violet-50 border-violet-100 text-violet-800",
  };

  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <div className="mb-3 flex items-center gap-2 font-semibold">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <ul className="space-y-1.5 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
