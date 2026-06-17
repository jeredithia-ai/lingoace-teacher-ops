/* ── 师资供给与匹配 · 精简版 ── */

import type { Assumptions } from "../teacher-ops/data";

export const META = {
  title: "师资供给与匹配",
  author: "Selena",
  subtitle: "从宗教社群出发，搭建全球化师资渠道 — 招聘、成本、匹配一条链",
  disclaimer: "个人项目作品集，非 LingoAce 官方数据。默认值来自行业公开区间推演，计算器可替换真实数据。",
};

export const CORE_JUDGMENT =
  "师资瓶颈不在「有没有老师」，而在「付的钱和课堂交付是否一致」——选对渠道、对齐首月达标，比盲目扩招聘更重要。";

export const LINGOACE_CONTEXT =
  "LingoAce 从海外华裔家庭中文教育起步，扩至英语、数学后，招聘承诺与课堂交付的错位、多渠道成本失控成为组织核心挑战。";

/** 三个问题 · 问题 → 思路 → 解法 */
export const PROBLEM_CARDS = [
  {
    id: "misalign",
    title: "招聘与交付错位",
    severity: "高" as const,
    problem: "招聘时承诺的发音标准、互动风格，首月课堂却够不上——家长付 A 线价格，拿到 B 线交付。",
    thinking: "多数「老师不行」是错配而非能力差。师训结业就应输出标签，排课按标签匹配。",
    solution: "统一交接包：试讲 rubric → 师训标签 → 学员标签双向匹配；错配与能力问题分开统计。",
  },
  {
    id: "channel-cost",
    title: "渠道结构与成本控制",
    severity: "高" as const,
    problem: "宗教、欧美、北美、菲教四条线成本差 3–5 倍，招聘路径完全不同，却共用一套 KPI。",
    thinking: "竞品江红树从宗教/社群路线起步，小红书与公众号转化欧美外教；菲教是规划而非现状。渠道要分轨算账。",
    solution: "四渠道矩阵分轨招聘、师训、CAC 看板；内推/社群作为低成本高质量通道优先投入。",
  },
  {
    id: "ai-match",
    title: "AI 时代师资匹配",
    severity: "较高" as const,
    problem: "AI 改变了老师该做什么，但匹配仍停留在「好老师/坏老师」，忽视师生契合与社群转化价值。",
    thinking: "AI 接管重复劳动，人类守住情感连接与即兴互动。合格标准要纳入人机协同，社群转介绍是最高质量渠道。",
    solution: "师训新增人机协同模块；AI 备课/反馈纳入考核；官网/LinkedIn/TikTok/内推/社群 ROI 分渠道追踪。",
  },
];

/** 顶层导航：3 个一级区块 */
export const TOP_NAV = [
  { id: "overview", label: "判断与问题" },
  { id: "channels", label: "渠道体系" },
  { id: "action", label: "算盘与路径" },
] as const;

/** 招聘渠道 · 用户实战经验 */
export const RECRUITMENT_UX = [
  { label: "官网", desc: "品牌入口 · 简历收集" },
  { label: "LinkedIn", desc: "北美/欧美外教定向触达" },
  { label: "TikTok", desc: "海外社媒短视频获客" },
  { label: "内推", desc: "同类相吸 · CAC 最低" },
  { label: "社群", desc: "公众号/小红书 简历+面试" },
];

export const SIDE_NAV = [
  { id: "judgment", label: "核心判断" },
  { id: "problems", label: "三个问题" },
  { id: "channel-cards", label: "师资渠道" },
  { id: "subjects", label: "学科画像" },
  { id: "ai-model", label: "AI 时代" },
  { id: "calculator", label: "数据算盘" },
  { id: "path", label: "执行路径" },
] as const;

/** 师资渠道 · 顺序：宗教 → 欧美 → 北美 → 菲教(规划) */
export type TeacherChannelId =
  | "religious"
  | "europe-us"
  | "north-america"
  | "philippines";

export type ChannelPreset = {
  id: TeacherChannelId;
  label: string;
  shortLabel: string;
  tag?: string;
  planned?: boolean;
  recruitmentChannels: string[];
  trainingPath: string;
  useCase: string;
  costRange: string;
  color: string;
  assumptions: Assumptions;
  basis: string;
};

export const CHANNEL_PRESETS: Record<TeacherChannelId, ChannelPreset> = {
  religious: {
    id: "religious",
    label: "宗教外教",
    shortLabel: "宗教",
    tag: "起点",
    recruitmentChannels: [
      "教会/宗教学校社群网络",
      "内推 · 同类相吸",
      "官网投放 + 社群转化",
    ],
    trainingPath: "约 25–30h：价值观对齐 · 文化情境 · 发音基础 · 社群口碑",
    useCase: "社群信任起点 · 海外华裔家庭 · 转介绍裂变",
    costRange: "¥800–1,500",
    color: "#b45309",
    basis: "江红树模式：宗教/社群路线为起点；内推 CAC 最低、达标率最高",
    assumptions: {
      applicantsPerMonth: 180,
      resumeToScreenRate: 0.42,
      screenToDemoRate: 0.78,
      demoToOfferRate: 0.22,
      offerToTrainingRate: 0.92,
      trainingCompletionRate: 0.82,
      firstMonthQualifiedRate: 0.62,
      retention90dRate: 0.88,
      misalignmentRate: 0.18,
      lowRatingRate: 0.12,
      handoverCompleteRate: 0.8,
      channelCostBudgetCny: 22000,
      trainingCostPerTeacherCny: 1800,
      opsCostPerTeacherCny: 900,
    },
  },
  "europe-us": {
    id: "europe-us",
    label: "欧美外教",
    shortLabel: "欧美",
    recruitmentChannels: [
      "公众号/小红书简历 + 面试（江红树模式）",
      "LinkedIn / TikTok 海外社媒",
      "UK/US/加拿大/南非教师社群",
    ],
    trainingPath: "约 30–40h：分国籍口音校准 · 双语讲题 · 跨时区规范",
    useCase: "产能主力 · 多国籍覆盖 · 英语/数学扩科",
    costRange: "¥2,200–4,500",
    color: "#2563eb",
    basis: "欧美多国籍组合；社群简历+面试为竞品常见低成本通道",
    assumptions: {
      applicantsPerMonth: 900,
      resumeToScreenRate: 0.22,
      screenToDemoRate: 0.74,
      demoToOfferRate: 0.18,
      offerToTrainingRate: 0.88,
      trainingCompletionRate: 0.78,
      firstMonthQualifiedRate: 0.56,
      retention90dRate: 0.82,
      misalignmentRate: 0.26,
      lowRatingRate: 0.19,
      handoverCompleteRate: 0.74,
      channelCostBudgetCny: 85000,
      trainingCostPerTeacherCny: 2400,
      opsCostPerTeacherCny: 1200,
    },
  },
  "north-america": {
    id: "north-america",
    label: "北美外教",
    shortLabel: "北美",
    tag: "高端线",
    recruitmentChannels: [
      "LinkedIn / Indeed 定向投放",
      "北美教师社群与 KOL",
      "在职教师内推",
    ],
    trainingPath: "约 40h：发音标准 · 课堂能量 rubric · 品牌话术 · AI 工具入门",
    useCase: "品牌信任 · 高客单华裔家庭 · 口语/精读",
    costRange: "¥3,500–6,000",
    color: "#4f46e5",
    basis: "VIPKID 北美招聘公开报道；LinkedIn 投放 CAC 偏高",
    assumptions: {
      applicantsPerMonth: 600,
      resumeToScreenRate: 0.2,
      screenToDemoRate: 0.7,
      demoToOfferRate: 0.15,
      offerToTrainingRate: 0.86,
      trainingCompletionRate: 0.75,
      firstMonthQualifiedRate: 0.52,
      retention90dRate: 0.8,
      misalignmentRate: 0.28,
      lowRatingRate: 0.2,
      handoverCompleteRate: 0.7,
      channelCostBudgetCny: 120000,
      trainingCostPerTeacherCny: 2800,
      opsCostPerTeacherCny: 1500,
    },
  },
  philippines: {
    id: "philippines",
    label: "菲教",
    shortLabel: "菲教",
    tag: "规划中",
    planned: true,
    recruitmentChannels: [
      "菲教供应商 / 海外基地（规划）",
      "本地招聘网站",
      "基地内转介绍",
    ],
    trainingPath: "约 40–50h：口音强化 · 远程陪跑加码 · 质检抽样提高",
    useCase: "扩产能 · 降本 · 大班/低价线（竞品规划，尚未执行）",
    costRange: "¥900–1,800",
    color: "#059669",
    basis: "江红树等竞品规划菲教但尚未落地；说客/哒哒菲教基地为行业参照",
    assumptions: {
      applicantsPerMonth: 1500,
      resumeToScreenRate: 0.28,
      screenToDemoRate: 0.8,
      demoToOfferRate: 0.2,
      offerToTrainingRate: 0.9,
      trainingCompletionRate: 0.72,
      firstMonthQualifiedRate: 0.5,
      retention90dRate: 0.78,
      misalignmentRate: 0.3,
      lowRatingRate: 0.22,
      handoverCompleteRate: 0.68,
      channelCostBudgetCny: 55000,
      trainingCostPerTeacherCny: 3200,
      opsCostPerTeacherCny: 1400,
    },
  },
};

export const CHANNEL_IDS: TeacherChannelId[] = [
  "religious",
  "europe-us",
  "north-america",
  "philippines",
];

export const COMMUNITY_ROI_NOTE =
  "内推与社群转化 CAC 通常为付费渠道的 1/3–1/5，首月达标率高出 10–15 个百分点——宗教线正是这一逻辑的起点。";

export const SUBJECT_PROFILES = {
  headline: "语数英一套组织能力，三种交付画像",
  subjects: [
    { label: "语文", profile: "双语表达 · 文化情境", recruit: "华人社群 · 师范 · 内推" },
    { label: "数学", profile: "学科功底 · 英文讲题", recruit: "STEM 华人 · 欧美外教" },
    { label: "英语", profile: "发音 · 课堂能量 · 分级阅读", recruit: "宗教→欧美→北美渠道" },
  ],
  shared: ["标签匹配", "首课陪跑", "统一 teacher_id", "AI 备课"],
};

export const AI_TEACHER_MODEL = {
  headline: "AI 放大产能，人类守住交付与匹配",
  ties: [
    { problem: "招聘与交付错位", ai: "AI 试讲预评 + 标签化交接", human: "情感连接 · 即兴互动" },
    { problem: "渠道成本控制", ai: "分渠道漏斗自动监控", human: "社群口碑 · 内推裂变" },
    { problem: "师资匹配", ai: "备课/反馈/质检自动化", human: "错因诊断 · 家校信任" },
  ],
  note: "LingoAce 已有 AI 备课与智能反馈——关键是嵌入师训结业标准，而非另起炉灶。",
};

export const EXECUTION_PATH = {
  headline: "90 天落地，四步闭环",
  loop: ["招：渠道分轨，绑首月达标", "培：师训输出标签", "用：标签匹配排课", "证：15/30/60 天验收"],
  phases: [
    { days: "0–15天", focus: "对齐达标定义 · 交接包 v1 · 宗教/社群渠道试点" },
    { days: "16–30天", focus: "四渠道漏斗基线 · 错配率量化 · 内推 ROI 追踪" },
    { days: "31–60天", focus: "KPI 绑达标 · 标签匹配试运行 · 关停低 ROI 渠道" },
    { days: "61–90天", focus: "画像迭代 · 交接≥90% · 师资运营月报上线" },
  ],
};
