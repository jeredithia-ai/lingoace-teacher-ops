import type { Assumptions } from "./data";

/** 每个输入字段的完整口径 — 面试被追问时照着讲 */
export type FieldMeta = {
  label: string;
  definition: string;
  formula: string;
  source: string;
  howToVerify: string;
  exampleNote: string;
  benchmark?: string;
  /** industry-sources.ts 中的来源 ID */
  sourceIds?: string[];
  /** 把数字翻译成业务含义 */
  interpretation?: string;
};

export const FIELD_META: Record<keyof Assumptions, FieldMeta> = {
  applicantsPerMonth: {
    label: "月投递量",
    definition: "当月收到并进入 ATS 的简历/申请总数（去重后）。",
    formula: "COUNT(申请记录) WHERE 月份=当月",
    source: "ATS / 招聘系统",
    howToVerify: "导出当月「新建候选人」报表，按渠道可加总核对。",
    exampleNote: "中档默认 1200 = 中小师资团队量级推演，非 LingoAce 内部数。",
    benchmark: "VIPKID 曾报道每月数万北美外教申请（36氪）；团队越小数值越低。",
    sourceIds: ["vipkid_acceptance"],
    interpretation: "投递量本身不是 KPI；要看分渠道转化与达标产出。",
  },
  resumeToScreenRate: {
    label: "简历→初筛通过率",
    definition: "简历通过硬性门槛（学历/证书/时区/设备）进入初试或电话沟通的比例。",
    formula: "初筛通过人数 ÷ 月投递量",
    source: "ATS 阶段变更记录",
    howToVerify: "ATS 导出：投递数、初筛通过数。",
    exampleNote: "中档 22% = 行业常见 15%–30% 中位。",
    benchmark: "15%–30%；伴鱼/VIPKID 等严选模式下初筛会较严。",
    interpretation: "通过率突然升高要警惕：是否门槛被放松导致后期错配上升。",
  },
  screenToDemoRate: {
    label: "初筛→试讲完成率",
    definition: "初筛通过后，实际完成试讲（Demo）的人数比例（含到场率）。",
    formula: "试讲完成人数 ÷ 初筛通过人数",
    source: "ATS + 试讲排期/完成记录",
    howToVerify: "对比「安排试讲」与「试讲完成」。",
    exampleNote: "中档 74% = 约 1/4 爽约或放弃。",
    benchmark: "65%–85%。",
    interpretation: "跨境招聘时差、设备问题是主要流失点，可单独监控。",
  },
  demoToOfferRate: {
    label: "试讲→录用率",
    definition: "完成试讲后，被发出录用通知（Offer）的比例。",
    formula: "录用人数 ÷ 试讲完成人数",
    source: "ATS（阶段=Offer / 已录用）",
    howToVerify: "当月试讲完成名单 ∩ 当月发 Offer 名单。",
    exampleNote: "中档 18% = 对齐伴鱼~5%、VIPKID<10% 等「总录取率」倒推后的环节值。",
    benchmark: "试讲→录用 15%–35%；总录取率常见 5%–10%。",
    sourceIds: ["palfish_acceptance", "vipkid_acceptance", "talk915_acceptance"],
    interpretation:
      "这是「严选」的核心阀门。录取率过高往往意味着试讲 rubric 与课堂标准脱节。",
  },
  offerToTrainingRate: {
    label: "录用→培训入营率",
    definition: "接受 Offer 并进入师训营/入职培训的人数比例。",
    formula: "培训入营人数 ÷ 录用人数",
    source: "HR 花名册 + LMS 开通记录",
    howToVerify: "Offer 接受日期 vs LMS 账号创建日期。",
    exampleNote: "中档 88% = 少数 Offer 后放弃。",
    benchmark: "85%–95%。",
    interpretation: "流失多时要查 Offer 竞争力（课酬、排课保障）——参见 YiYi 全职排课模式。",
    sourceIds: ["yiyi_referral"],
  },
  trainingCompletionRate: {
    label: "培训结业率",
    definition: "入营后完成全部师训模块、通过结业考核的比例。",
    formula: "结业人数 ÷ 培训入营人数",
    source: "LMS / 师训系统",
    howToVerify: "导出「结业状态=通过」名单。",
    exampleNote: "中档 78%；单师培训成本默认 ¥2200 参照 VIPKID 约 40h 新师培训工作量。",
    benchmark: "70%–85%。",
    sourceIds: ["vipkid_training"],
    interpretation: "师训结业时应同步输出「教师多维标签」，供运营匹配排课。",
  },
  firstMonthQualifiedRate: {
    label: "首月达标率",
    definition:
      "完成首月授课后，达到公司「可独立交付」标准的教师比例（满意度、完课率、投诉等）。",
    formula: "首月达标教师数 ÷ 首月完成授课的新教师数",
    source: "课堂系统 + 运营质检规则",
    howToVerify: "用《新师首月达标 checklist》逐条核对。",
    exampleNote: "中档 56% = 行业 50%–65% 中位偏下，留优化空间。",
    benchmark: "50%–65%；<50% 说明招聘/师训/交接/匹配至少一环断裂。",
    interpretation: "计算器 CAC 的分母——「达标教师」才是招聘真正产出。",
  },
  retention90dRate: {
    label: "90 天留存率",
    definition: "首月达标教师中，入职满 90 天仍在职且持续授课的比例。",
    formula: "满90天仍在职达标教师 ÷ 首月达标教师数",
    source: "HR 花名册 + 授课活跃记录",
    howToVerify: "按入职 cohort 追踪 90 天在职状态。",
    exampleNote: "中档 82% = 行业 75%–88% 中段。",
    benchmark: "75%–88%；固定外教、稳定排课有助于留存。",
    sourceIds: ["palfish_teacher_channel"],
    interpretation: "学员侧反馈周期长（可到 90 天），但教师侧 60 天内应能做留存决策。",
  },
  misalignmentRate: {
    label: "错配率（师生不匹配）",
    definition:
      "首月因「师生不匹配」（换师、投诉、风格不合）未达标的占比，与「纯能力不达标」分开统计。",
    formula: "首月因不匹配导致未达标数 ÷ 新入职教师数",
    source: "运营台账 + 课堂系统 + 师训标签表",
    howToVerify: "换师原因字段区分「错配」与「能力」。",
    exampleNote: "中档 26% = 未全面落地标签匹配前的推演值。",
    benchmark: "落地师生双向标签后应下降；居高不下先查排课而非重训。",
    interpretation: "早期家长说「不合适」多数是匹配问题——伴鱼强调班主任帮选固定外教。",
    sourceIds: ["palfish_teacher_channel"],
  },
  lowRatingRate: {
    label: "满意度 <4.0 占比",
    definition: "首月学员对教师课后评价均分低于 4.0（5 分制）的教师占比。",
    formula: "首月平均满意度<4.0 的教师数 ÷ 首月有评价的新教师数",
    source: "课堂评价系统",
    howToVerify: "导出首月每位新师 average(rating)。",
    exampleNote: "中档 19%；需确认公司用的是 5 分还是 10 分制。",
    benchmark: "10%–25%。",
    interpretation: "低分要先拆：错配、能力、还是偶发事件。",
  },
  handoverCompleteRate: {
    label: "交接包完整率",
    definition: "招聘→师训→运营《标准交接包》全部字段完成、验收签字的比例。",
    formula: "交接 checklist 全部打勾数 ÷ 当月新入职数",
    source: "运营台账 / 飞书多维表",
    howToVerify: "抽查：试讲分、师训标签、首课匹配、看板绑定是否齐全。",
    exampleNote: "中档 74%；目标应 ≥90%。",
    benchmark: "<60% 说明流程断裂严重。",
    interpretation: "交接包应含「教师多维标签」与「推荐学员类型」。",
  },
  channelCostBudgetCny: {
    label: "渠道月预算",
    definition: "当月招聘渠道直接费用（广告、内推奖金、供应商费、招聘网站等）。",
    formula: "SUM(各渠道花费) 当月",
    source: "财务 / 招聘费用台账",
    howToVerify: "财务报销 + 渠道对账单，按渠道归因到录用人数。",
    exampleNote: "中档 ¥95,000 = 推演值；伴鱼学员侧注册 CAC ~10 元不可直接套用。",
    benchmark: "看分渠道 CAC 而非总预算；转介绍渠道边际成本最低。",
    sourceIds: ["palfish_cac_student", "palfish_teacher_channel"],
    interpretation: "学员获客成本与教师招聘成本是两种口径，面试时务必区分。",
  },
  trainingCostPerTeacherCny: {
    label: "单师培训成本",
    definition: "师训人力、教材、模拟课、平台账号等摊到每位结业教师的平均成本。",
    formula: "当月师训总成本 ÷ 当月结业人数",
    source: "师训部门成本台账",
    howToVerify: "师训月报人均培训成本。",
    exampleNote: "中档 ¥2,200；公开参照 VIPKID 新师约 40 小时培训周期。",
    benchmark: "行业推演 ¥1,500–3,500/人。",
    sourceIds: ["vipkid_training"],
    interpretation: "培训投入应产出「可排课 + 有标签」的教师，而非仅「结业证书」。",
  },
  opsCostPerTeacherCny: {
    label: "单师首月运营成本",
    definition: "运营/质检/排课/班主任陪跑等摊到每位首月达标教师的管理成本。",
    formula: "首月运营人力成本 ÷ 首月达标人数",
    source: "运营部门台账",
    howToVerify: "运营月报或工时摊销。",
    exampleNote: "中档 ¥1,150；参照哒哒 QA 管理成本约占 10%。",
    benchmark: "行业推演 ¥800–1,800/人。",
    sourceIds: ["dada_pay_qa", "palfish_teacher_channel"],
    interpretation: "含班主任撮合师生匹配、首课陪跑——伴鱼公开强调班主任角色。",
  },
};

export const DATA_TRUTH_BANNER = {
  title: "这些数据从哪来？",
  points: [
    "三档默认值已对齐公开行业报道（伴鱼、VIPKID、说客、哒哒等）与区间推演，非 LingoAce 内部数据。",
    "每个字段可展开查看：定义 · 公式 · 系统来源 · 行业参照 · 业务解读 · 引用链接。",
    "学员获客 CAC（如伴鱼绘本摊薄 ~10 元/注册）≠ 教师招聘 CAC，不可混口径。",
    "入职后第一周：用本公司 ATS / LMS / 课堂 / 财务数据替换输入即可得到真实诊断。",
  ],
};
