"use client";

import { ArrowRight, Brain, Tags, UserCheck } from "lucide-react";
import { TEACHER_MATCHING } from "../data";
import { LabelChip } from "./ui";

export function MatchingFramework() {
  const m = TEACHER_MATCHING;

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50/90 via-white to-indigo-50/50">
      <div className="border-b border-violet-100/80 bg-white/60 px-6 py-5">
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-md">
            <Tags className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
              Selena 方案 · 匹配算法
            </p>
            <h3 className="mt-1 text-lg font-bold text-slate-900">{m.headline}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.insight}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-rose-100 bg-rose-50/50 px-4 py-3 text-sm">
            <span className="font-semibold text-rose-700">常见误区</span>
            <p className="mt-1 text-slate-600">{m.reframe.wrong}</p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 text-sm">
            <span className="font-semibold text-emerald-700">正确拆解</span>
            <p className="mt-1 text-slate-600">{m.reframe.right}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-2">
        {/* Teacher dimensions */}
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
            <UserCheck className="h-4 w-4 text-indigo-500" />
            师训阶段 · 教师多维标签
          </p>
          <div className="space-y-3">
            {m.teacherDimensions.map((dim) => (
              <div
                key={dim.id}
                className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-900">{dim.label}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {dim.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700 ring-1 ring-indigo-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-slate-400">{dim.trainPhase}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Student mirror + algorithm */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-sm font-bold text-slate-800">学员侧标签（早期销售同理）</p>
            <ul className="mt-3 space-y-2">
              {m.studentMirror.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold text-slate-800">匹配闭环四步</p>
            <div className="space-y-2">
              {m.algorithmSteps.map((s, i) => (
                <div
                  key={s.step}
                  className="flex gap-3 rounded-xl border border-slate-100 bg-white p-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-xs font-bold text-violet-700">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-violet-700">{s.step}</p>
                    <p className="mt-0.5 text-sm text-slate-700">{s.action}</p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-indigo-600">
                      <ArrowRight className="h-3 w-3" />
                      {s.output}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-violet-100/80 bg-white/50 px-6 py-5">
        <div className="flex items-start gap-3">
          <Brain className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <p className="text-sm font-bold text-slate-900">{m.humanJudgment.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {m.humanJudgment.body}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {m.humanJudgment.practices.map((p) => (
                <LabelChip key={p} tone="warn">
                  {p}
                </LabelChip>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
            可验证指标
          </p>
          <p className="mt-1 text-sm text-slate-600">{m.verifyMetrics.join(" · ")}</p>
        </div>
      </div>
    </div>
  );
}
