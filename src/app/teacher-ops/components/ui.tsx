"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  num,
  title,
  subtitle,
}: {
  num: number;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="lingoace-section-num">{num}</span>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-2 pl-10 text-sm leading-relaxed text-slate-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function SideNav({
  items,
  activeId,
}: {
  items: { id: string; label: string; icon: LucideIcon }[];
  activeId: string;
}) {
  return (
    <nav className="lingoace-panel hidden p-3 lg:block">
      <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        目录
      </p>
      <div className="space-y-0.5">
        {items.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={cn("lingoace-nav-link", activeId === n.id && "active")}
          >
            <n.icon className="h-4 w-4 shrink-0 opacity-70" />
            {n.label}
          </a>
        ))}
      </div>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <Link
          href="/teacher-ops/calculator"
          className="lingoace-nav-link w-full text-indigo-600 hover:bg-indigo-50"
        >
          数据推演 →
        </Link>
      </div>
    </nav>
  );
}

export function MobileNav({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5">
        {items.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700"
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
  tone?: "brand" | "pain" | "ok" | "warn";
}) {
  const tones = {
    brand: "border-indigo-200/80 bg-indigo-50 text-indigo-700",
    pain: "border-rose-200/80 bg-rose-50 text-rose-700",
    ok: "border-emerald-200/80 bg-emerald-50 text-emerald-700",
    warn: "border-amber-200/80 bg-amber-50 text-amber-800",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}
