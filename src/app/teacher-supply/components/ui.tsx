"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}

export function TopNav({
  items,
  activeId,
}: {
  items: readonly { id: string; label: string }[];
  activeId: string;
}) {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl gap-2 px-4 py-2.5 sm:gap-3 sm:px-6">
        {items.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={cn(
              "flex-1 rounded-xl px-3 py-2.5 text-center text-xs font-semibold transition sm:text-sm",
              activeId === n.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
            )}
          >
            {n.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function SideNav({
  items,
  activeId,
}: {
  items: { id: string; label: string; icon?: LucideIcon }[];
  activeId: string;
}) {
  return (
    <nav className="lingoace-panel hidden p-3 lg:sticky lg:top-24 lg:block lg:self-start">
      <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        目录
      </p>
      <div className="space-y-0.5">
        {items.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={cn("lingoace-nav-link", activeId === n.id && "active")}
          >
            {n.icon && <n.icon className="h-4 w-4 shrink-0 opacity-70" />}
            {n.label}
          </a>
        ))}
      </div>
      <div className="mt-3 border-t border-slate-100 pt-3">
        <Link
          href="/teacher-supply/calculator"
          className="lingoace-nav-link w-full text-indigo-600 hover:bg-indigo-50"
        >
          数据算盘 →
        </Link>
      </div>
    </nav>
  );
}

export function MobileNav({
  items,
  activeId,
}: {
  items: { id: string; label: string }[];
  activeId: string;
}) {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
        {items.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition",
              activeId === n.id
                ? "bg-indigo-600 text-white"
                : "border border-slate-200 bg-white text-slate-600"
            )}
          >
            {n.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function LabelChip({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "pain" | "ok" | "warn" | "muted";
}) {
  const tones = {
    brand: "border-indigo-200/80 bg-indigo-50 text-indigo-700",
    pain: "border-rose-200/80 bg-rose-50 text-rose-700",
    ok: "border-emerald-200/80 bg-emerald-50 text-emerald-700",
    warn: "border-amber-200/80 bg-amber-50 text-amber-800",
    muted: "border-slate-200 bg-slate-50 text-slate-500",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function ProblemCard({
  title,
  severity,
  problem,
  thinking,
  solution,
}: {
  title: string;
  severity: "高" | "较高";
  problem: string;
  thinking: string;
  solution: string;
}) {
  return (
    <article className="rounded-xl border border-slate-100 bg-white p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h3 className="font-bold text-slate-900">{title}</h3>
        <LabelChip tone={severity === "高" ? "pain" : "warn"}>{severity}</LabelChip>
      </div>
      <div className="grid gap-3 text-sm sm:grid-cols-3">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-rose-600">问题</p>
          <p className="leading-relaxed text-slate-600">{problem}</p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600">思路</p>
          <p className="leading-relaxed text-slate-600">{thinking}</p>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">解法</p>
          <p className="leading-relaxed text-slate-600">{solution}</p>
        </div>
      </div>
    </article>
  );
}

const CHANNEL_SLUG: Record<string, string> = {
  中教: "china",
  北美: "north-america",
  欧美: "europe-us",
  菲教: "philippines",
};

export function ChannelCard({
  label,
  shortLabel,
  tag,
  planned,
  color,
  useCase,
  costRange,
  recruitmentChannels,
  trainingPath,
}: {
  label: string;
  shortLabel: string;
  tag?: string;
  planned?: boolean;
  color: string;
  useCase: string;
  costRange: string;
  recruitmentChannels: string[];
  trainingPath: string;
}) {
  const slug = CHANNEL_SLUG[shortLabel] ?? "china";
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        planned && "border-dashed opacity-80"
      )}
      style={{ borderTopColor: color, borderTopWidth: 3 }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-bold" style={{ color }}>
          {label}
        </p>
        {tag && (
          <LabelChip tone={planned ? "muted" : "brand"}>{tag}</LabelChip>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-500">{useCase}</p>
      <p className="mt-2 text-xs font-semibold text-slate-700">{costRange}</p>
      <ul className="mt-2 space-y-1">
        {recruitmentChannels.map((c) => (
          <li key={c} className="text-xs text-slate-500">
            · {c}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-600">师训：</span>
        {trainingPath}
      </p>
      <Link
        href={`/teacher-supply/calculator?channel=${slug}`}
        className="mt-3 inline-flex text-xs font-semibold text-indigo-600 hover:text-indigo-800"
      >
        打开算盘 →
      </Link>
    </div>
  );
}
