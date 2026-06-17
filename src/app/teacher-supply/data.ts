/* ── 师资供给与匹配系统 · 项目作品集数据 ── */

import type { Assumptions } from "../teacher-ops/data";

export const META = {
  title: "师资供给与匹配系统",
  author: "Selena",
  subtitle: "AI 时代在线教育的师资运营实践 — 招聘、成本、匹配、交付一条链",
  disclaimer:
    "个人项目作品集，非 LingoAce 官方数据。默认值对齐行业公开报道与区间推演；计算器可替换为本公司真实数据。",
};

/** 核心判断：一句话定调 */
export const CORE_JUDGMENT =
  "在线教育的师资瓶颈不在「有没有老师」，而在「首月能不能达标交付」——招聘、师训、排课必须同一条数据链，否则成本只会越来越高。";

/** 五个问题 · 问题 → 思路 → 解法 */
export const PROBLEM_CARDS = [
  {
    id: "misalign",
    title: "招聘—培训—交付错位",
    severity: "高" as const,
    problem:
      "简历好看、师训结业，首月家长却说「不合适」——招聘看证书，交付看课堂感受，中间没有统一标准。",
    thinking:
      "多数「老师不行」其实是师生不匹配，不是能力问题。师训结束就应输出结构化标签，排课按标签匹配而非只看档期。",
    solution:
      "建立标准交接包：试讲 rubric → 师训多维标签 → 学员标签双向匹配；错配与能力不达标分开统计。",
    verify: "错配率、首课换师率、交接完整率",
  },
  {
    id: "recruit-cost",
    title: "合格师资难招、成本走高",
    severity: "高" as const,
    problem:
      "北美/欧美外教供给竞争白热化，简历量大但达标率低；培训期流失抬高隐性成本，单师全链路 CAC 难核算。",
    thinking:
      "招聘 KPI 应绑定「首月达标人数」而非「录用人数」。用达标反推画像，用渠道 ROI 决定预算分配。",
    solution:
      "漏斗分渠道监控 + 单师 CAC（按达标人数摊销）+ 关停低 ROI 渠道；转介绍/内推作为核心低成本通道。",
    verify: "首月达标人数、分渠道 CAC、漏斗瓶颈环节",
  },
  {
    id: "global-mix",
    title: "全球化师资组合缺乏模型",
    severity: "高" as const,
    problem:
      "北美外教建立品牌信任但 CAC 高；菲教扩产能降本但师训质检需加码；各区域各自为政，全球人才库未打通。",
    thinking:
      "不是单一路线，而是「品牌线 + 产能线」动态组合。竞品实践（如江红树：公众号简历+面试招欧美外教）说明渠道要分区域建模。",
    solution:
      "师资渠道矩阵：北美/欧美/菲教分轨招聘、分轨师训、分区域 CAC 看板；时区排班中枢化。",
    verify: "分区域 CAC、远程师训结业率、跨时区完课率",
  },
  {
    id: "subject-profile",
    title: "多学科师资画像割裂",
    severity: "较高" as const,
    problem:
      "语文、数学、英语各自招师、各自师训，teacher_id 不统一；共享职能重复建设，质检口径不一致。",
    thinking:
      "不是三套团队，而是一套组织能力、三种交付画像。统一主数据 + 项目标签分层，师训模块共享与分轨拆分。",
    solution:
      "统一 teacher_id 主档；共享招培用证基础设施，师训/质检 rubric 按学科分轨；挖掘跨项目复用师资。",
    verify: "跨项目师资复用率、共享师训完课率、项目间错配投诉占比",
  },
  {
    id: "ai-gap",
    title: "AI 时代师资能力模型滞后",
    severity: "较高" as const,
    problem:
      "新师备课耗时长，课后反馈质量参差，试讲评估全靠人工；行业已在用 AI 降本，师训标准未跟上。",
    thinking:
      "AI 不替代教师，但重新定义合格教师的产能边界。LingoAce 已有 AI 备课/反馈能力，关键是如何纳入师训结业标准。",
    solution:
      "师训新增「人机协同」模块；AI 备课/反馈工具纳入考核；试讲引入 AI 陪练预评分，释放师训师产能。",
    verify: "新师 AI 工具采用率、单位师训成本达标产出、反馈 24h 达成率",
  },
];

/** 师资渠道矩阵 */
export const CHANNEL_MATRIX = {
  headline: "全球化师资组合：分渠道招聘、分轨师训、分区域算账",
  columns: ["北美外教", "欧美外教", "菲教"] as const,
  rows: [
    {
      axis: "典型招聘渠道",
      values: [
        "LinkedIn / Indeed · 教师转介绍 · 北美教师社群",
        "公众号/官网简历投递 + 面试（江红树模式）· UK/US/加拿大/南非社群 · 招聘网站",
        "菲教供应商/海外基地 · 本地招聘网站 · 教师转介绍",
      ],
    },
    {
      axis: "成本区间（单师 CAC）",
      values: ["¥3,500–6,000", "¥2,200–4,500", "¥900–1,800"],
    },
    {
      axis: "适用场景",
      values: [
        "品牌信任 · 高客单 · 华裔家庭口语/阅读",
        "产能主力 · 多国籍覆盖 · 扩科试验",
        "扩产能 · 降本 · 大班/低价产品线",
      ],
    },
    {
      axis: "师训差异",
      values: [
        "发音/互动标准高 · 课堂能量 rubric · 品牌话术",
        "分国籍口音校准 · 双语讲题能力评估 · 跨时区设备规范",
        "口音与互动强化 · 远程师训陪跑加码 · 质检抽样率提高",
      ],
    },
    {
      axis: "培训周期参考",
      values: ["约 40h（行业公开参照）", "约 30–40h + 口音校准", "约 40–50h（互动/口音加码）"],
    },
  ],
};

/** 多学科师资画像差异（无 CEO 框架） */
export const SUBJECT_PROFILES = {
  headline: "语数英共用一套组织能力，三种交付画像",
  subjects: [
    {
      label: "语文",
      profile: "双语母语级表达 · 结构化写作 · 文化情境",
      recruit: "华人教师社群 · 师范/中文系 · 内推",
      train: "汉字书写/阅读策略 · 文化情境师训",
    },
    {
      label: "数学",
      profile: "学科功底 · 英文讲题 · 逻辑可视化",
      recruit: "STEM 背景华人 · 师范数学 · 跨学科",
      train: "双语解题话术 · 教具与可视化",
    },
    {
      label: "英语",
      profile: "发音标准 · 课堂能量 · 分级阅读/PBL",
      recruit: "北美/欧美/菲外教 · 社群 · 转介绍",
      train: "发音/互动/阅读分级 · 人机协同模块",
    },
  ],
  shared: ["师生标签匹配", "首课陪跑", "质检 rubric", "AI 备课助手", "统一 teacher_id"],
};

/** AI 时代师资模型 — 务实视角 */
export const AI_TEACHER_MODEL = {
  headline: "行业趋势：AI 放大产能，人类守住交付质量",
  layers: [
    {
      id: "human",
      label: "人类守住",
      items: [
        "情感连接与文化情境",
        "课堂即兴互动与动机激发",
        "复杂错因诊断与个性化纠偏",
        "家校沟通与信任建立",
      ],
      color: "#4f46e5",
    },
    {
      id: "ai",
      label: "AI 接管重复劳动",
      items: [
        "备课与教案生成（按学员标签定制）",
        "课后反馈草稿 + 作业批改初筛",
        "试讲/模拟课 AI 陪练与 rubric 预评分",
        "多语言质检抽样与异常课堂预警",
      ],
      color: "#7c3aed",
    },
    {
      id: "org",
      label: "组织需落地",
      items: [
        "「人机协同」纳入师训结业标准",
        "AI 使用合规与儿童隐私红线",
        "产能指标：单位师训成本下的达标产出",
      ],
      color: "#059669",
    },
  ],
  lingoaceNote:
    "LingoAce 已有 AI 备课、智能反馈等产品能力 — 师资运营侧关键是把这些工具嵌入师训与质检流程，而非另起炉灶。",
};

/** 运营闭环 */
export const OPERATIONS_LOOP = [
  { label: "招", title: "精准招聘", desc: "用首月达标反推画像", output: "合格候选人" },
  { label: "培", title: "快速上岗", desc: "师训对齐真实课堂 + 输出标签", output: "可排课教师" },
  { label: "用", title: "匹配交付", desc: "标签匹配排课 + 质检激励", output: "稳定授课" },
  { label: "证", title: "数据验证", desc: "15/30/60 天逐级验收", output: "反哺画像与渠道" },
];

/** 90 天执行路径 */
export const ROADMAP_90 = [
  {
    phase: "0–15 天",
    title: "对齐与启动",
    color: "#6366F1",
    goals: ["统一 teacher_id 与首月达标定义", "交接包 v1", "首课陪跑机制"],
    actions: ["三方对齐达标 checklist", "梳理 ATS/LMS/课堂可导出字段", "新师入职必完成交接"],
  },
  {
    phase: "16–30 天",
    title: "基线与量化",
    color: "#2563EB",
    goals: ["漏斗基线", "错配率量化", "分渠道 CAC 试点"],
    actions: ["导出近 3 月招聘→首月数据", "计算错配率与低分占比", "英语线渠道 ROI 初版"],
  },
  {
    phase: "31–60 天",
    title: "机制固化",
    color: "#F59E0B",
    goals: ["KPI 绑达标", "标签匹配试运行", "A/B/C 分级排课"],
    actions: ["试讲 rubric 挂钩首月指标", "师生标签匹配排课试点", "关停低 ROI 渠道"],
  },
  {
    phase: "61–90 天",
    title: "闭环复盘",
    color: "#10B981",
    goals: ["画像 v2", "交接≥90%", "CAC 可解释"],
    actions: ["反向画像迭代", "60 天留存决策", "师资运营月报模板上线"],
  },
];

export const MAIN_NAV = [
  { id: "judgment", label: "核心判断" },
  { id: "problems", label: "五个问题" },
  { id: "channels", label: "渠道矩阵" },
  { id: "subjects", label: "学科画像" },
  { id: "ai-model", label: "AI 模型" },
  { id: "calculator", label: "数据算盘" },
  { id: "roadmap", label: "90天路径" },
];

/** 师资渠道计算器预设 */
export type TeacherChannelId = "north-america" | "europe-us" | "philippines";

export type ChannelPreset = {
  id: TeacherChannelId;
  label: string;
  shortLabel: string;
  recruitmentChannels: string[];
  trainingPath: string;
  useCase: string;
  costRange: string;
  color: string;
  assumptions: Assumptions;
  basis: string;
};

export const CHANNEL_PRESETS: Record<TeacherChannelId, ChannelPreset> = {
  "north-america": {
    id: "north-america",
    label: "北美外教",
    shortLabel: "北美",
    recruitmentChannels: [
      "LinkedIn / Indeed 定向投放",
      "北美教师社群与 KOL",
      "在职教师转介绍 / 内推",
    ],
    trainingPath:
      "约 40h 师训：发音标准 · 课堂能量 rubric · 品牌话术 · 设备/时区规范 · AI 备课工具入门",
    useCase: "品牌信任线 · 高客单华裔家庭 · 口语/精读主力",
    costRange: "¥3,500–6,000",
    color: "#4f46e5",
    basis: "VIPKID 北美招聘公开报道；LinkedIn 投放 CAC 偏高；试讲筛选严",
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
  "europe-us": {
    id: "europe-us",
    label: "欧美外教",
    shortLabel: "欧美",
    recruitmentChannels: [
      "公众号/官网简历投递 + 线上面试（江红树模式）",
      "UK / 美国 / 加拿大 / 南非教师社群",
      "招聘网站 · 社交媒体 · 转介绍",
    ],
    trainingPath:
      "约 30–40h：分国籍口音校准 · 双语讲题能力 · 跨时区协作 · 互动风格标签化",
    useCase: "产能主力 · 多国籍覆盖 · 英语/数学扩科",
    costRange: "¥2,200–4,500",
    color: "#2563EB",
    basis: "欧美多国籍组合；公众号简历+面试为竞品常见低成本通道",
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
  philippines: {
    id: "philippines",
    label: "菲教",
    shortLabel: "菲教",
    recruitmentChannels: [
      "菲教供应商 / 马尼拉等海外基地",
      "本地招聘网站与教师社群",
      "基地内转介绍",
    ],
    trainingPath:
      "约 40–50h：口音与互动强化 · 远程师训陪跑加码 · 质检抽样率提高 · 课堂能量专项",
    useCase: "扩产能 · 降本 · 大班/低价产品线试验",
    costRange: "¥900–1,800",
    color: "#059669",
    basis: "说客菲教基地；哒哒课酬参照；师训与质检投入需高于欧美线",
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
  "north-america",
  "europe-us",
  "philippines",
];
