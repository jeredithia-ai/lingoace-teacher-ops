/**
 * 公开行业参考与口径来源（非 LingoAce 内部数据）
 * 面试口径：「默认值对齐竞品公开报道与行业区间，入职后用本公司 ATS/财务替换。」
 */

export type IndustrySource = {
  id: string;
  label: string;
  publisher: string;
  year?: string;
  url: string;
  excerpt: string;
};

export const INDUSTRY_SOURCES: Record<string, IndustrySource> = {
  palfish_acceptance: {
    id: "palfish_acceptance",
    label: "伴鱼外教录取率约 5%",
    publisher: "中国消费网（伴鱼官方口径）",
    year: "2020",
    url: "https://www.ccn.com.cn/Content/2020/09-01/1354053117.html",
    excerpt:
      "录取外教考核 TESOL/TEFL、身份国籍、发音口音、教学方法与课堂表现等，经多项考核后录取率约 5%。",
  },
  palfish_teacher_channel: {
    id: "palfish_teacher_channel",
    label: "伴鱼外教招聘渠道与转介绍",
    publisher: "小饭桌 / 行业报道",
    year: "2020",
    url: "https://www.xfz.cn/post/9545.html",
    excerpt:
      "外教主要通过招聘网站、社交媒体及教师转介绍获取，其中转介绍占比超过 50%；固定外教模式提升留存与教学质量。",
  },
  palfish_cac_student: {
    id: "palfish_cac_student",
    label: "伴鱼注册用户获客成本约 10 元（学员侧）",
    publisher: "腾讯新闻（伴鱼市场部负责人翟磊）",
    year: "2020",
    url: "https://news.qq.com/rain/a/20201127A020TV00",
    excerpt:
      "依托伴鱼绘本自有流量池，全渠道摊薄后注册用户获客成本近年保持在 10 元上下；赛道头部 1v1 学员获客曾有约 4000 元报道。",
  },
  palfish_teacher_cost_ratio: {
    id: "palfish_teacher_cost_ratio",
    label: "伴鱼教师成本约占收入 50%",
    publisher: "行业分析 / 伴鱼商业模式报道",
    year: "2020",
    url: "https://www.xfz.cn/post/9545.html",
    excerpt: "在线 1v1 模式下师资薪酬是最大成本项之一，伴鱼报道中教师薪资约占整体收入约 50%。",
  },
  vipkid_acceptance: {
    id: "vipkid_acceptance",
    label: "VIPKID 北美外教月申请数万、录取率不足 10%",
    publisher: "36氪",
    year: "2017",
    url: "https://36kr.com/p/1721737035777",
    excerpt: "每月数万人申请，录取率不足 10%；外教需 K12 或 ESL 教学经验。",
  },
  vipkid_teacher_pay: {
    id: "vipkid_teacher_pay",
    label: "VIPKID 北美外教时薪与师资成本占比",
    publisher: "界面新闻",
    year: "2019",
    url: "https://www.jiemian.com/article/3603224.html",
    excerpt:
      "招聘显示北美外教时薪约 14–22 美元；单节约 120 元/25 分钟课程中，师资成本占比约 60%。",
  },
  vipkid_training: {
    id: "vipkid_training",
    label: "VIPKID 新外教约 40 小时入职培训",
    publisher: "VIPKID 官网内容",
    year: "2022",
    url: "https://mobile.vipkid.com.cn/posts/14036.html",
    excerpt: "新入职外教需完成约 40 小时培训，含线上互动、延迟处理、课件等专项技能。",
  },
  talk915_acceptance: {
    id: "talk915_acceptance",
    label: "说客英语外教录取率约 5%",
    publisher: "爱分析（说客英语访谈）",
    year: "2020",
    url: "https://ifenxi.com/research/content/5517",
    excerpt: "BAPO 评估体系严选外教，录取率仅约 5%，并根据学生点评末位淘汰。",
  },
  shakespeare_acceptance: {
    id: "shakespeare_acceptance",
    label: "莎翁英语教师录取率约 6%",
    publisher: "36氪",
    year: "2019",
    url: "https://36kr.com/p/1722131660801",
    excerpt: "从国籍、口音、学历与教学经验等维度筛选，教师录取率约 6%。",
  },
  yiyi_referral: {
    id: "yiyi_referral",
    label: "YiYi 英语转介绍占获客 50%+",
    publisher: "36氪",
    year: "2019",
    url: "https://36kr.com/p/1722917044225",
    excerpt: "转介绍率占获客来源 50% 以上；师资采用全职模式以稳定教师收入与留存。",
  },
  dada_pay_qa: {
    id: "dada_pay_qa",
    label: "哒哒英语外教课酬与 QA 管理成本",
    publisher: "爱分析（哒哒英语访谈）",
    year: "2018",
    url: "https://ifenxi.com/research/content/3468",
    excerpt: "外教薪酬约 10–12 美元/节；QA 质量监控等管理成本约占 10%。",
  },
  industry_lead_price: {
    id: "industry_lead_price",
    label: "在线教育单条获客线索约 100–200 元",
    publisher: "姚科技（行业数据引用）",
    year: "2020",
    url: "https://yaokejinews.com/2940/",
    excerpt: "媒体报道在线教育行业单个获客线索价格约在 100–200 元区间（学员侧线索，作成本量级参照）。",
  },
};

/** 漏斗各环节 — 公开区间 + 对应来源 */
export const FUNNEL_BENCHMARKS = [
  {
    stage: "简历投递",
    range: "按 ATS 实际统计",
    interpretation: "团队规模差异大；头部平台曾报道月申请量达数万（VIPKID）。",
    sourceIds: ["vipkid_acceptance"],
  },
  {
    stage: "初筛通过",
    range: "15%–30%",
    interpretation: "画像越清晰，通过率越低但试讲质量越高。",
    sourceIds: [] as string[],
  },
  {
    stage: "试讲完成",
    range: "65%–85%",
    interpretation: "含排期到场率；跨境招聘需考虑时差与设备因素。",
    sourceIds: [] as string[],
  },
  {
    stage: "试讲→录用",
    range: "15%–35%",
    interpretation:
      "与「总录取率 5%–10%」一致：伴鱼约 5%、说客约 5%、VIPKID 不足 10%、莎翁约 6%。",
    sourceIds: ["palfish_acceptance", "vipkid_acceptance", "talk915_acceptance"],
  },
  {
    stage: "培训结业",
    range: "70%–85%",
    interpretation: "师训强度与模块设计决定；VIPKID 等新师约 40 小时培训周期。",
    sourceIds: ["vipkid_training"],
  },
  {
    stage: "首月达标",
    range: "50%–65%",
    interpretation: "招聘—交付是否对齐的核心瓶颈；需公司明确定义达标 checklist。",
    sourceIds: [] as string[],
  },
  {
    stage: "90 天留存",
    range: "75%–88%",
    interpretation: "固定外教、稳定排课有助于留存（伴鱼、YiYi 等公开强调）。",
    sourceIds: ["palfish_teacher_channel", "yiyi_referral"],
  },
];

/**
 * 招聘渠道 — 单师招聘 CAC 为「行业推演区间」（人民币/首月达标教师）
 * 非任何公司财报披露值；相对排序参考伴鱼转介绍>50%、VIPKID 多通道招聘等公开描述
 */
export const CHANNEL_BENCHMARKS = [
  {
    name: "教师转介绍 / 内推",
    costLevel: "低",
    quality: "高",
    volume: "中",
    cacRangeCny: [600, 1200],
    cacMidCny: 850,
    roiNote: "伴鱼等报道外教转介绍占比可超 50%，边际成本最低",
    recommend: "核心渠道",
    sourceIds: ["palfish_teacher_channel", "yiyi_referral"],
  },
  {
    name: "教师社群 / KOL",
    costLevel: "中",
    quality: "高",
    volume: "中",
    cacRangeCny: [1000, 2200],
    cacMidCny: 1500,
    roiNote: "垂直社群精准度高，适合北美/菲教细分画像",
    recommend: "加大",
    sourceIds: ["vipkid_acceptance"],
  },
  {
    name: "LinkedIn / Indeed",
    costLevel: "高",
    quality: "中",
    volume: "高",
    cacRangeCny: [2800, 5500],
    cacMidCny: 3800,
    roiNote: "北美招聘曝光成本高，需用试讲 rubric 快速过滤",
    recommend: "优化投放",
    sourceIds: ["vipkid_teacher_pay"],
  },
  {
    name: "菲教供应商 / 海外基地",
    costLevel: "低",
    quality: "中",
    volume: "高",
    cacRangeCny: [900, 1800],
    cacMidCny: 1300,
    roiNote: "说客等在菲设立师资基地；单节课酬低于欧美（参见哒哒 10–12 美元/节）",
    recommend: "维持",
    sourceIds: ["talk915_acceptance", "dada_pay_qa"],
  },
  {
    name: "招聘网站 / 社交媒体",
    costLevel: "中",
    quality: "中",
    volume: "高",
    cacRangeCny: [1500, 3200],
    cacMidCny: 2100,
    roiNote: "伴鱼公开渠道之一；线索质量参差，需漏斗监控",
    recommend: "试点 + 归因",
    sourceIds: ["palfish_teacher_channel", "industry_lead_price"],
  },
  {
    name: "付费信息流广告",
    costLevel: "高",
    quality: "低",
    volume: "高",
    cacRangeCny: [4500, 9000],
    cacMidCny: 6200,
    roiNote: "学员侧线索曾报 100–200 元/条；教师侧精准投放更贵，ROI 常偏低",
    recommend: "严控 / 关停",
    sourceIds: ["industry_lead_price", "palfish_cac_student"],
  },
];

/** 成本项 — 公开参照 + 推演说明 */
export const COST_BENCHMARKS = {
  channelBudget: {
    label: "渠道月预算",
    rangeCny: [60000, 200000],
    interpretation:
      "随团队招聘目标浮动；应能按渠道拆分到「录用/达标」人数，计算分渠道 CAC。",
    sourceIds: ["palfish_cac_student", "industry_lead_price"],
  },
  trainingPerTeacher: {
    label: "单师培训成本",
    rangeCny: [1500, 3500],
    interpretation:
      "含师训人力、LMS、模拟课、质检；VIPKID 公开约 40 小时新师培训周期可作工作量参照。",
    sourceIds: ["vipkid_training"],
  },
  opsPerTeacher: {
    label: "单师首月运营",
    rangeCny: [800, 1800],
    interpretation:
      "班主任、QA、排课、陪跑摊销；哒哒公开 QA 等管理成本约占 10%，可作首月人力参照。",
    sourceIds: ["dada_pay_qa"],
  },
  teacherPayRatio: {
    label: "师资占收入比（课酬，非招聘 CAC）",
    range: "50%–60%",
    interpretation:
      "伴鱼约 50%、VIPKID 报道约 60%——指课酬占营收，与招聘 CAC 是不同口径，面试时需区分。",
    sourceIds: ["palfish_teacher_cost_ratio", "vipkid_teacher_pay"],
  },
};

export const DATA_HANDBOOK = {
  title: "数据口径手册",
  subtitle: "每个标签 = 定义 + 公式 + 来源 + 行业参照 + 真实解读",
  principles: [
    "页内数字分三类：① 公开报道引用 ② 行业区间推演 ③ 本公司待接入真实值",
    "学员获客 CAC（如伴鱼 ~10 元注册）≠ 教师招聘 CAC，口径不可混用",
    "「录取率 5%」通常指申请→签约，计算器中的「首月达标」是更后置的结果指标",
    "入职后第一周：用 ATS + LMS + 课堂系统导出，替换三档默认值",
  ],
};

export function getSources(ids: string[]): IndustrySource[] {
  return ids.map((id) => INDUSTRY_SOURCES[id]).filter(Boolean);
}
