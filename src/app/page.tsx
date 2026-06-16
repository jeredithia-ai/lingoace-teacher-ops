import Link from "next/link";
import {
  ArrowRight,
  Mic,
  FileText,
  Target,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "智能匹配分析",
    desc: "上传简历与 JD，AI 分析匹配度、技能缺口与面试重点",
  },
  {
    icon: Mic,
    title: "语音模拟面试",
    desc: "实时语音对话，AI 面试官针对性提问与追问，接近真实体验",
  },
  {
    icon: FileText,
    title: "问答清单准备",
    desc: "自动生成个性化问题与参考答案，支持编辑、收藏与导出",
  },
];

const steps = [
  "上传简历和岗位描述",
  "查看 AI 匹配分析报告",
  "选择语音模拟或问答清单模式",
  "获得反馈，持续改进",
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-20 pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/60 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
            <Sparkles className="h-4 w-4" />
            AI 驱动的个性化面试准备
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            上传简历与 JD，
            <br />
            <span className="gradient-text">模拟真实面试</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
            无论面向哪家公司、哪个岗位，Interview Coach
            都能根据你的简历和 JD 生成专属面试模拟，帮你充分准备每一次机会。
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register" className="btn-primary px-8 py-3 text-base">
              免费开始
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/login" className="btn-secondary px-8 py-3 text-base">
              已有账号，登录
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold text-slate-900">
          两大核心功能
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold">使用流程</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={step}
                className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <span className="font-medium text-slate-800">{step}</span>
                <CheckCircle2 className="ml-auto h-5 w-5 text-brand-400" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
