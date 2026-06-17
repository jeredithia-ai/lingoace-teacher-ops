import Link from "next/link";
import { ArrowRight, Calculator, Sparkles, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">选择入口</h1>
          <p className="mt-2 text-sm text-slate-500">三个独立模块，点击下方进入</p>
        </div>
        <Link
          href="/teacher-supply"
          className="glass-card flex items-center gap-4 p-6 transition hover:border-indigo-200 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Users className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900">师资供给与匹配</p>
            <p className="text-sm text-slate-500">Teacher Supply · 项目作品集</p>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400" />
        </Link>
        <Link
          href="/teacher-ops"
          className="glass-card flex items-center gap-4 p-6 transition hover:border-slate-300 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-500 text-white">
            <Calculator className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900">师资运营（旧版）</p>
            <p className="text-sm text-slate-500">Teacher Ops · 历史版本保留</p>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400" />
        </Link>
        <Link
          href="/mock-interview"
          className="glass-card flex items-center gap-4 p-6 transition hover:border-brand-200 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-slate-900">模拟面试</p>
            <p className="text-sm text-slate-500">Mock Interview · AI 面试准备</p>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-400" />
        </Link>
      </div>
    </div>
  );
}
