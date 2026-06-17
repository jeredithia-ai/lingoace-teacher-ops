/* ── 全链路：Selena 的师资运营逻辑框架 ── */

export const META = {
  title: "LingoAce 师资运营 · 战略诊断与组织能力方案",
  author: "Selena",
  subtitle: "从「招到人」到「组织能力可复制」——支撑语数英三大项目协同与全球化师资网络",
  disclaimer:
    "个人面试准备材料，非 LingoAce 官方数据。默认值对齐伴鱼/VIPKID 等公开报道与行业区间；计算器含完整口径手册与引用链接。",
};

/** CEO 视角：两轮思考开场框架 */
export const CEO_FRAMING = {
  round1:
    "第一轮我回答了「师资运营怎么管」——招培用证闭环、错配拆解、60 天验收。",
  round2:
    "第二轮我想回答「师资如何支撑 LingoAce 未来三年」——语数英协同、AI 时代能力重定义、全球化管理半径下的组织能力规模化。",
  thesis:
    "师资不是成本中心，而是三大项目交付质量与续费 LTV 的组织能力底座；我的价值是把这条链路做成可度量、可复制、可跨项目协同的系统。",
};

/** 业务全局视图：CEO 关心的顶层叙事 */
export const BUSINESS_OVERVIEW = {
  headline: "LingoAce 的增长，最终由「师资组织能力」决定天花板",
  pillars: [
    {
      label: "语文",
      focus: "华裔传承 · 读写表达 · 文化认同",
      teacherNeed: "双语母语级表达 + 结构化写作引导 + 文化情境教学",
      risk: "师资画像与英语线混用，家长对「中文正宗感」敏感",
    },
    {
      label: "数学",
      focus: "逻辑建构 · 双语解题 · 北美/新加坡体系",
      teacherNeed: "学科功底 + 英文讲题能力 + 可视化互动",
      risk: "数学老师招聘池窄，师训周期长，与英语师共用漏斗易失真",
    },
    {
      label: "英语",
      focus: "口语对话 · 分级阅读 · 考试路径",
      teacherNeed: "发音标准 + 课堂能量 + 分级阅读/PBL 经验",
      risk: "外教供给全球化竞争白热化，CAC 与留存是主战场",
    },
  ],
  northStar: [
    { label: "组织目标", value: "三大项目「同一套师资主数据 + 差异化画像」" },
    { label: "经营杠杆", value: "首月达标率 × 错配率 × 90 天留存 → 续费 LTV" },
    { label: "战略变量", value: "AI 提效师资产能 · 菲教/多国外教组合优化全球半径" },
  ],
};

/** 三大项目协同矩阵 */
export const THREE_PROJECT_MATRIX = {
  headline: "不是三套师资团队，而是一套组织能力、三种交付画像",
  dimensions: ["语文", "数学", "英语"] as const,
  rows: [
    {
      axis: "核心师资画像",
      values: [
        "中文母语/近母语 · 写作引导型 · 文化情境",
        "数理功底 · 双语讲题 · 逻辑可视化",
        "口语流利 · 分级阅读 · 课堂互动能量",
      ],
    },
    {
      axis: "招聘主渠道",
      values: [
        "华人教师社群 · 师范/中文系 · 内推",
        "STEM 背景华人 · 师范数学 · 跨学科人才",
        "北美/欧/菲外教 · LinkedIn · 教师转介绍",
      ],
    },
    {
      axis: "师训差异化",
      values: ["汉字书写/阅读策略师训", "双语解题话术 + 教具", "发音/互动/阅读分级师训"],
    },
    {
      axis: "可共享能力",
      values: [
        "师生标签匹配 · 首课陪跑 · 质检 rubric · AI 备课助手",
        "同一套",
        "同一套",
      ],
    },
    {
      axis: "协同 KPI",
      values: [
        "跨项目转介绍师资率",
        "同一 teacher_id 多项目授课占比",
        "共享师训模块完课率",
      ],
    },
  ],
};

/** AI 时代师资能力新模型 */
export const AI_TEACHER_MODEL = {
  headline: "AI 不替代教师，但重新定义「合格教师」的产能边界",
  layers: [
    {
      id: "human",
      label: "人类不可替代",
      items: [
        "情感连接与文化情境（尤其语文传承）",
        "课堂即兴互动与动机激发",
        "复杂错因诊断与个性化纠偏",
        "家校沟通与信任建立",
      ],
      color: "#4f46e5",
    },
    {
      id: "ai",
      label: "AI 放大产能",
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
      label: "组织需建设",
      items: [
        "「人机协同」师训模块纳入结业标准",
        "AI 使用合规与儿童隐私红线",
        "师资产能指标：单位师训成本下达标教师产出",
      ],
      color: "#059669",
    },
  ],
  capabilityFormula:
    "新师资能力 = 学科交付力 × 互动能量 × AI 协同熟练度 × 数据回流意识",
};

/** 结论先行：整体运营逻辑 */
export const OPERATIONS_LOGIC = {
  headline:
    "CEO 视角下，师资运营的本质是：用组织系统把「个体名师经验」变成「三大项目可规模复制的交付能力」",
  loop: [
    {
      id: "recruit",
      label: "招",
      title: "精准招聘",
      desc: "用「首月能达标」反推画像，而不是用简历条件正推",
      output: "合格候选人 → 录用",
    },
    {
      id: "train",
      label: "培",
      title: "快速上岗",
      desc: "师训目标对齐真实课堂，不是「结业」而是「能独立交付」",
      output: "持证教师 → 可排课",
    },
    {
      id: "use",
      label: "用",
      title: "交付与激励",
      desc: "排课、质检、薪酬与课堂质量挂钩，让好教师留下来",
      output: "稳定授课 → 学员满意",
    },
    {
      id: "verify",
      label: "证",
      title: "数据验证",
      desc: "教师侧 15/30/45/60 天逐级验收；学员侧反馈周期可更长（如 90 天）",
      output: "达标/错配 → 反哺招聘画像",
    },
  ],
};

/** 痛点 → 解法 一一对应 */
export const SOLUTIONS = [
  {
    pain: "合格师资难招 + 成本高",
    solution: "漏斗监控 + 渠道 ROI + 单师 CAC（按达标人数算）",
    verify: "首月达标人数、CAC 是否下降",
  },
  {
    pain: "招聘与交付脱节",
    solution:
      "师训多维标签（语言/语法/互动/性格/教师类型）+ 学员标签双向匹配 + 标准交接包；招聘 KPI 绑定首月达标率",
    verify:
      "错配率（非单纯低分率）、首课换师率、匹配后排课满意度、交接完整率",
  },
  {
    pain: "语文/数学/英语师资画像割裂",
    solution:
      "建立「统一 teacher_id + 项目画像标签」主数据；共享招培用证基础设施，师训模块分轨、质检 rubric 分轨",
    verify: "跨项目错配率、共享师训完课率、同一师资多项目授课满意度",
  },
  {
    pain: "AI 时代师资能力模型滞后",
    solution:
      "师训新增「人机协同」模块；AI 备课/反馈工具纳入结业考核；试讲引入 AI 陪练预评分",
    verify: "新师 AI 工具采用率、单位师训成本下达标产出、AI 辅助课后反馈时效",
  },
  {
    pain: "全球化管理半径与规模化瓶颈",
    solution:
      "外教组合策略（北美品牌 + 菲教成本优化）+ 时区排班中枢 + 远程质检抽样；招聘渠道矩阵按 ROI 动态调配",
    verify: "分区域 CAC、跨时区完课率、远程师训结业率、全球师资池活跃率",
  },
];

/** 效果验证：双时间线 */
export const VERIFICATION = {
  teacher: {
    title: "教师侧验收（兼职运营节奏紧，建议 60 天内闭环）",
    milestones: [
      { day: 15, label: "首课陪跑", check: "完课率、设备/时区、基础互动达标" },
      { day: 30, label: "首月达标", check: "满意度≥4.0、无重大投诉、可独立授课" },
      { day: 45, label: "稳定期", check: "完课率稳定、师训遗留问题是否解决" },
      { day: 60, label: "留存决策", check: "A/B/C 分级、排课优先级、是否淘汰/辅导" },
    ],
  },
  user: {
    title: "学员侧反馈（周期更长，可作辅助验证）",
    milestones: [
      { day: 30, label: "短期体验", check: "课后评价、续课意愿" },
      { day: 90, label: "续费贡献", check: "续费率、LTV 贡献（验证教师长期价值）" },
    ],
  },
};

/**
 * 计算器三档假设：基础 / 中等 / 最优（非真实数据，用于推演对比）
 */
export type Assumptions = {
  applicantsPerMonth: number;
  resumeToScreenRate: number;
  screenToDemoRate: number;
  demoToOfferRate: number;
  offerToTrainingRate: number;
  trainingCompletionRate: number;
  firstMonthQualifiedRate: number;
  retention90dRate: number;
  misalignmentRate: number;
  lowRatingRate: number;
  handoverCompleteRate: number;
  channelCostBudgetCny: number;
  trainingCostPerTeacherCny: number;
  opsCostPerTeacherCny: number;
};

export const SCENARIOS: Record<
  "基础档" | "中档" | "最优档",
  { label: string; desc: string; assumptions: Assumptions; basis: string }
> = {
  基础档: {
    label: "基础档",
    desc: "交接弱、错配高 — 接近未打通数据时的常见状态",
    basis: "漏斗取行业区间下限；错配率偏高（未做师生标签匹配）",
    assumptions: {
      applicantsPerMonth: 800,
      resumeToScreenRate: 0.18,
      screenToDemoRate: 0.68,
      demoToOfferRate: 0.22,
      offerToTrainingRate: 0.85,
      trainingCompletionRate: 0.72,
      firstMonthQualifiedRate: 0.48,
      retention90dRate: 0.76,
      misalignmentRate: 0.32,
      lowRatingRate: 0.24,
      handoverCompleteRate: 0.52,
      channelCostBudgetCny: 110000,
      trainingCostPerTeacherCny: 2800,
      opsCostPerTeacherCny: 1400,
    },
  },
  中档: {
    label: "中档",
    desc: "有一定机制 — 对齐伴鱼/VIPKID 等公开录取率与培训强度",
    basis:
      "月投递 1200（中小团队量级）；试讲→录用约 18%（总录取约 5–8%）；师训 ¥2200 参照 40h 培训工作量",
    assumptions: {
      applicantsPerMonth: 1200,
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
      channelCostBudgetCny: 95000,
      trainingCostPerTeacherCny: 2200,
      opsCostPerTeacherCny: 1150,
    },
  },
  最优档: {
    label: "最优档",
    desc: "转介绍为主 + 标签匹配 — 对齐伴鱼转介绍>50% 等最佳实践",
    basis:
      "转介绍/内推拉高转化率；错配率下降；渠道预算降低但单师陪跑投入保留",
    assumptions: {
      applicantsPerMonth: 1000,
      resumeToScreenRate: 0.26,
      screenToDemoRate: 0.8,
      demoToOfferRate: 0.22,
      offerToTrainingRate: 0.92,
      trainingCompletionRate: 0.84,
      firstMonthQualifiedRate: 0.64,
      retention90dRate: 0.87,
      misalignmentRate: 0.18,
      lowRatingRate: 0.13,
      handoverCompleteRate: 0.91,
      channelCostBudgetCny: 72000,
      trainingCostPerTeacherCny: 2000,
      opsCostPerTeacherCny: 1050,
    },
  },
};

export const PAIN_POINTS = [
  {
    id: "recruit",
    title: "痛点一：合格师资难招 + 成本持续走高",
    subtitle: "初面反馈 + 我在跨境教研招聘中的实际体感",
    severity: "高",
    selenaView:
      "招聘不是「找人填坑」，而是为交付端输送「首月就能达标」的师资。当前瓶颈在画像与成本口径不统一。",
    symptoms: [
      "优质北美/菲教供给稀缺，同渠道竞争导致 CAC 上升",
      "简历量大但合格率低，招聘团队大量时间耗在初筛",
      "培训期流失抬高隐性成本，单师全链路成本难核算",
      "「能上课」≠「能留班」：录用标准与课堂结果脱节",
    ],
    rootCauses: [
      { label: "画像模糊", desc: "JD 偏学历/口音，未绑定首月满意度与续费" },
      { label: "渠道无归因", desc: "多渠道投入但无法回答「哪条渠道产出达标教师」" },
      { label: "漏斗无监控", desc: "简历→试讲→培训→首月达标，瓶颈不可见" },
      { label: "成本黑箱", desc: "招聘费+培训费+试错成本未合并为单师 LTV/CAC" },
    ],
    metrics: [
      {
        label: "简历→初试通过率",
        key: "resumeToScreenRate",
        formula: "初试通过数 ÷ 简历投递数",
        verify: "ATS 导出，按渠道拆分",
        trend: "flat" as const,
      },
      {
        label: "试讲→录用率（试讲通过/录用）",
        key: "demoToOfferRate",
        formula: "录用数 ÷ 试讲完成数",
        verify: "招聘系统 + 试讲评分表",
        trend: "flat" as const,
      },
      {
        label: "首月达标率（核心）",
        key: "firstMonthQualifiedRate",
        formula: "首月达标教师数 ÷ 入职并完成首月教师数",
        verify: "课堂系统（满意度/完课率/续费贡献）+ HR 入职名单",
        trend: "flat" as const,
      },
      {
        label: "单师全链路 CAC（达标口径）",
        key: "qualifiedCac",
        formula: "(渠道预算 + 培训成本 + 首月运营成本) ÷ 首月达标教师数",
        verify: "财务台账（预算/人力摊销）+ 漏斗各环节人数",
        trend: "flat" as const,
      },
    ],
  },
  {
    id: "misalign",
    title: "痛点二：招聘—培训—交付断层（含交接失控）",
    subtitle: "初面核心痛点：「招聘和交付是脱节的」",
    severity: "较高",
    selenaView:
      "我作为一线教师的体会：早期家长说「不合适」，往往不是老师「不好」，而是「不匹配」。师训阶段就应给每位教师打上结构化标签（语言、语法、互动、性格、教师类型），像早期销售给学员打标签一样——师生双向标签、精准配对，比单纯追「优质简历」更能减少招聘与交付的断裂。",
    symptoms: [
      "招聘看学历/证书，交付看课堂感受——早期反馈是「不匹配」却被当成「不合格」",
      "师训结业只有 A/B/C，缺少「适合哪类学员」的多维画像",
      "排课按档期而非匹配度，首课换师率高、试错成本转嫁到运营",
      "一线能判断「履历光鲜但课堂不对路」，但经验未沉淀、数据接不上",
    ],
    rootCauses: [
      { label: "错配当劣师", desc: "把匹配问题当能力问题，误淘汰可培养教师" },
      { label: "标签单向", desc: "只标学员需求，师训端未输出教师多维标签" },
      { label: "交接无标准", desc: "无《教师交接包》：标签、禁忌、首课匹配建议" },
      { label: "经验未结构化", desc: "招聘/师训判断靠人，未进入可回流的数据字段" },
    ],
    metrics: [
      {
        label: "首月满意度 <4.0 占比",
        key: "lowRatingRate",
        formula: "首月低分教师 ÷ 新入职教师",
        verify: "课堂评价系统导出",
        trend: "up" as const,
      },
      {
        label: "招聘评分与首月质量：相关性目标区间",
        key: "qualityCorrelationTarget",
        formula: "Pearson(试讲 rubric 分, 首月满意度/完课率/续费贡献)",
        verify: "合并 ATS + 课堂数据后计算（至少 N≥50 才有统计意义）",
        trend: "flat" as const,
      },
      {
        label: "交接包完整交付率",
        key: "handoverCompleteRate",
        formula: "完整交接 ÷ 新入职数",
        verify: "运营交接 checklist 台账",
        trend: "flat" as const,
      },
      {
        label: "错配率（首月不匹配）",
        key: "misalignmentRate",
        formula: "首月因「师生不匹配」导致换师/投诉/未达标数 ÷ 新入职教师数（需与「纯能力不达标」分开统计）",
        verify: "运营台账标注换师原因 + 课堂指标口径一致化",
        trend: "flat" as const,
      },
    ],
  },
  {
    id: "synergy",
    title: "痛点三：语文/数学/英语师资画像割裂",
    subtitle: "CEO 全局视角：三大项目协同不足，重复建设、标准不一",
    severity: "高",
    selenaView:
      "简一总关注的不是单线英语师资，而是语数英能否共用一套组织能力。画像割裂会导致招聘重复投入、师训标准打架、质检口径不一致，最终伤害家长对「一站式学习」的信任。",
    symptoms: [
      "三条业务线各自招师、各自师训，teacher_id 不统一",
      "语文老师被英语 rubric 误筛，数学老师英语讲题能力未结构化评估",
      "跨项目转介绍师资潜力未挖掘（如双语教师可跨英语+数学）",
      "共享职能（质检、排课、数据）重复建设",
    ],
    rootCauses: [
      { label: "主数据缺失", desc: "无统一师资主档，项目标签未分层" },
      { label: "师训分轨不足", desc: "共享模块与差异化模块未拆分" },
      { label: "KPI 孤岛", desc: "各项目只看本线达标率，不看协同效率" },
      { label: "组织壁垒", desc: "招聘/师训/运营按项目割裂汇报" },
    ],
    metrics: [
      {
        label: "跨项目师资复用率",
        key: "crossProjectReuse",
        formula: "多项目授课教师数 ÷ 总在岗教师数",
        verify: "teacher_id 主数据 + 排课系统",
        trend: "flat" as const,
      },
      {
        label: "共享师训模块完课率",
        key: "sharedTrainingRate",
        formula: "完成共享模块人数 ÷ 新师入营人数",
        verify: "LMS 模块完成记录",
        trend: "flat" as const,
      },
      {
        label: "项目间错配投诉占比",
        key: "crossProjectMisalign",
        formula: "因「项目画像不符」导致换师数 ÷ 总换师数",
        verify: "运营换师原因标注",
        trend: "flat" as const,
      },
      {
        label: "重复招聘成本率",
        key: "duplicateRecruitCost",
        formula: "可复用但未复用的招聘支出 ÷ 总招聘预算",
        verify: "招聘渠道归因 + 人才库检索日志",
        trend: "flat" as const,
      },
    ],
  },
  {
    id: "ai-gap",
    title: "痛点四：AI 时代师资能力模型未升级",
    subtitle: "行业在变：合格教师定义需加入「人机协同」维度",
    severity: "较高",
    selenaView:
      "竞争对手已在用 AI 降本增效；若 LingoAce 师训仍只教「怎么上课」而不教「怎么用 AI 放大产能」，单位师训成本下的达标产出会持续落后。AI 是杠杆，不是威胁——但组织必须主动定义标准。",
    symptoms: [
      "新师备课耗时长，师训师 1:1 陪练不可扩展",
      "课后反馈质量参差，家长感知服务不一致",
      "试讲评估全靠人工，招聘产能瓶颈明显",
      "质检抽样覆盖率不足，问题发现滞后",
    ],
    rootCauses: [
      { label: "师训未迭代", desc: "结业标准未包含 AI 工具熟练度" },
      { label: "工具未嵌入流程", desc: "AI 备课/反馈与 LMS 脱节" },
      { label: "合规顾虑", desc: "儿童隐私与 AI 使用边界未明确" },
      { label: "产能指标旧", desc: "仍用「师训师人数」而非「单位成本达标产出」" },
    ],
    metrics: [
      {
        label: "新师 AI 工具周活跃率",
        key: "aiToolAdoption",
        formula: "使用 AI 备课/反馈工具的新师 ÷ 新师总数",
        verify: "LMS/工具后台日志",
        trend: "flat" as const,
      },
      {
        label: "单位师训成本达标产出",
        key: "trainingRoi",
        formula: "首月达标人数 ÷ 师训总成本",
        verify: "师训财务 + 课堂达标名单",
        trend: "flat" as const,
      },
      {
        label: "课后反馈 24h 达成率",
        key: "feedbackSla",
        formula: "24h 内完成反馈 ÷ 应反馈课次",
        verify: "课堂系统时间戳",
        trend: "flat" as const,
      },
      {
        label: "AI 试讲预评与人工分一致性",
        key: "aiDemoCorrelation",
        formula: "AI 预评分与师训师终评相关系数",
        verify: "试讲评分表对比",
        trend: "flat" as const,
      },
    ],
  },
  {
    id: "global-scale",
    title: "痛点五：全球化管理半径与组织能力规模化",
    subtitle: "外教供给全球化、时区分散、远程管理——半径扩大后系统是否跟得上",
    severity: "高",
    selenaView:
      "从江红树等竞品实践可见：欧美外教建立品牌信任，菲教扩产能降本——关键是组合策略而非单一路线。LingoAce 的全球化师资网络需要「远程可管、数据可见、标准可复制」，否则管理半径越大、质量方差越大。",
    symptoms: [
      "北美外教 CAC 高但家长信任强；菲教成本低但师训与质检投入需加码",
      "跨时区招聘面试、师训陪跑协调成本高",
      "远程教师设备/网络/合规问题难以及时发现",
      "区域负责人各自为政，全球师资池未打通",
    ],
    rootCauses: [
      { label: "外教组合未定", desc: "品牌线 vs 成本线师资比例缺乏动态模型" },
      { label: "远程质检弱", desc: "课堂抽样覆盖率不足，依赖事后投诉" },
      { label: "时区运营碎片", desc: "排班与陪跑未中枢化" },
      { label: "全球人才库孤岛", desc: "各区域简历未汇入可检索主库" },
    ],
    metrics: [
      {
        label: "分区域单师 CAC",
        key: "regionalCac",
        formula: "各区域招聘总成本 ÷ 各区域首月达标人数",
        verify: "财务按区域归因",
        trend: "flat" as const,
      },
      {
        label: "远程师训结业率",
        key: "remoteTrainingGrad",
        formula: "远程完成师训人数 ÷ 远程入营人数",
        verify: "LMS + 直播出勤",
        trend: "flat" as const,
      },
      {
        label: "跨时区完课率",
        key: "timezoneCompletion",
        formula: "按时开课并完成课时 ÷ 计划课时",
        verify: "课堂系统",
        trend: "flat" as const,
      },
      {
        label: "全球师资池月活跃率",
        key: "globalPoolActive",
        formula: "当月有授课记录教师 ÷ 师资库在册教师",
        verify: "HR + 排课系统",
        trend: "flat" as const,
      },
    ],
  },
];

export const IRON_TRIANGLE = {
  thesis:
    "师资运营的本质是铁三角动态平衡：招聘决定「进什么人」，成本决定「花多少资源」，交付决定「能不能留下价值」。三者必须同频，否则任一顶点失控都会拖垮全局。",
  nodes: [
    {
      id: "recruit",
      label: "招聘",
      color: "#2563EB",
      items: ["精准画像", "多渠道矩阵", "漏斗监控", "渠道归因"],
      kpi: "合格入职率 · 首月达标率 · 单师 CAC",
      selenaSolution: "用「首月达标教师」反推招聘画像，而非用简历条件正推。",
    },
    {
      id: "cost",
      label: "成本",
      color: "#F59E0B",
      items: ["全链路 CAC", "培训 ROI", "薪酬质量系数", "留存摊销"],
      kpi: "师均综合成本 · LTV/CAC · 试错成本率",
      selenaSolution: "薪酬与课堂质量挂钩，让成本投入流向高 LTV 教师。",
    },
    {
      id: "delivery",
      label: "交付",
      color: "#10B981",
      items: ["课堂质量", "学员满意度", "续费率", "稳定留存"],
      kpi: "NPS · 续费率 · 完课率 · 活跃课时",
      selenaSolution: "交付数据 30 天回流招聘，建立 A/B/C 分级与排课优先级。",
    },
  ],
};

/**
 * Selena 核心方案：师生双向标签 + 匹配算法（错配 ≠ 劣师）
 * 师训中产出教师多维画像，与学员标签配对排课；招聘端用经验补位并结构化沉淀
 */
export const TEACHER_MATCHING = {
  headline: "不是「不好」，是「不匹配」——师训打标签，师生精准配对",
  insight:
    "招聘与师训的中断，常发生在「人已经培训出来了，但排给了错的学员」。早期销售给家长反馈时会标注学员特点；同理，师训结束时就应为每位教师建立多维标签，运营按标签匹配而非只看档期。",
  reframe: {
    wrong: "家长/运营反馈「老师不行」→ 淘汰或重训",
    right: "拆解为「能力未达标」vs「师生不匹配」→ 不匹配则换配对或调整排课策略",
  },
  teacherDimensions: [
    {
      id: "language",
      label: "语言能力",
      tags: ["口语流利型", "发音标准型", "双语过渡型", "慢速清晰型"],
      trainPhase: "师训模拟课 + 口音/语速测评",
    },
    {
      id: "grammar",
      label: "语法 / 知识",
      tags: ["语法精讲型", "情境运用型", "启蒙输入型", "应试强化型"],
      trainPhase: "师训考核 + 教研试讲切片",
    },
    {
      id: "interaction",
      label: "互动能力",
      tags: ["高能量带动", "提问引导型", "游戏化强", "安静陪伴型"],
      trainPhase: "模拟课互动评分 + 师训师观察记录",
    },
    {
      id: "personality",
      label: "性格 / 风格",
      tags: ["活泼外向", "温和耐心", "严谨纠错", "幽默轻松"],
      trainPhase: "师训师结构化评语（非一句「不错」）",
    },
    {
      id: "type",
      label: "教师类型",
      tags: ["幼儿启蒙", "少儿精读", "口语对话", "华裔传承", "应试/考级"],
      trainPhase: "结业前确定主类型 + 可授副类型",
    },
  ],
  studentMirror: [
    "年龄段 / 学段",
    "学习目标（口语 / 阅读 / 考试）",
    "性格（内向需带动 / 外向需聚焦）",
    "家长偏好（严格纠错 / 鼓励为主）",
    "课堂节奏（慢热 / 快节奏）",
  ],
  algorithmSteps: [
    {
      step: "师训结业",
      action: "师训师填写《教师多维标签表》，写入 LMS/交接包",
      output: "教师标签 v1 + 推荐学员类型",
    },
    {
      step: "招聘试讲",
      action: "招聘记录「预标签」+ 一线经验判断（证书与课堂表现交叉验证）",
      output: "预匹配画像，供师训校准",
    },
    {
      step: "运营排课",
      action: "学员标签 × 教师标签 → 优先匹配；档期冲突时显式标注「次优匹配」",
      output: "首课配对单 + 换师预警规则",
    },
    {
      step: "30 天回流",
      action: "换师/投诉案例标注「不匹配维度」，反哺招聘 rubric 与师训重点",
      output: "画像 v2 + 错配率（区分能力问题）",
    },
  ],
  humanJudgment: {
    title: "数据不够时，一线经验补位——但要结构化沉淀",
    body: "招聘与师训常能判断「简历好看但课堂不对路」或「履历一般但互动极强」。证书多不等于能带好课；不同背景教师（如华人 vs 外籍）评估维度也应分轨。经验不能替代数据，但可通过标签表、试讲 rubric、案例库逐步变成可回流字段。",
    practices: [
      "试讲 + 模拟课双验证，不唯证书",
      "招聘/师训「预标签」与结业标签对比，校准招聘标准",
      "错配案例入库时写清「哪一维不匹配」，而非笼统「老师差」",
    ],
  },
  verifyMetrics: [
    "错配率（与纯能力不达标分开统计）",
    "首课 15 天内换师率",
    "匹配后排课满意度 vs 随机排课",
    "标签完整率（结业教师 100% 有结构化标签）",
  ],
};

export const HANDOVER_PROCESS = {
  title: "招聘→交付 标准交接机制（Selena 方案核心）",
  steps: [
    {
      phase: "招聘端输出",
      items: [
        "教师画像匹配度评分（试讲 rubric）",
        "擅长年龄段 / 课程类型",
        "风险标记（口音、设备、时区）",
      ],
      owner: "招聘",
    },
    {
      phase: "师训端输出",
      items: [
        "多维教师标签（语言/语法/互动/性格/类型）",
        "培训结业等级（A/B/C）+ 推荐学员画像",
        "模拟课录像 + 教研点评",
      ],
      owner: "师训",
    },
    {
      phase: "运营端验收",
      items: [
        "学员标签 × 教师标签 → 首课匹配",
        "首课陪跑 + 换师原因分类（错配 vs 能力）",
        "首月质量监控看板绑定",
      ],
      owner: "运营/交付",
    },
    {
      phase: "30天回流",
      items: [
        "首月满意度 & 完课率",
        "是否达标 → 反哺招聘画像",
        "错配案例入库",
      ],
      owner: "数据运营",
    },
  ],
};

export const FUNNEL_STAGES = [
  { stage: "简历投递", benchmark: "按 ATS（月投递）", sourceNote: "VIPKID 曾报道月申请数万" },
  { stage: "初筛通过", benchmark: "15%–30%", sourceNote: "画像越清晰通过率越低" },
  { stage: "试讲完成", benchmark: "65%–85%", sourceNote: "含到场率" },
  { stage: "试讲→录用", benchmark: "15%–35%", sourceNote: "伴鱼~5%、VIPKID<10% 总录取率" },
  { stage: "培训结业", benchmark: "70%–85%", sourceNote: "VIPKID 新师约 40h 培训" },
  { stage: "首月达标", benchmark: "50%–65%", sourceNote: "招聘-交付对齐核心瓶颈" },
  { stage: "90天留存", benchmark: "75%–88%", sourceNote: "固定外教有利于留存" },
];

/** @deprecated 请使用 industry-sources.ts 的 CHANNEL_BENCHMARKS；保留兼容 */
export const CHANNELS = [
  {
    name: "教师转介绍 / 内推",
    cost: "低",
    quality: "高",
    volume: "中",
    roi: 4.2,
    cac: 850,
    cacRange: "¥600–1,200",
    recommend: "核心渠道",
    source: "伴鱼外教转介绍>50%（小饭桌）",
  },
  {
    name: "教师社群 / KOL",
    cost: "中",
    quality: "高",
    volume: "中",
    roi: 3.1,
    cac: 1500,
    cacRange: "¥1,000–2,200",
    recommend: "加大",
    source: "行业推演 · 垂直社群",
  },
  {
    name: "LinkedIn / Indeed",
    cost: "高",
    quality: "中",
    volume: "高",
    roi: 1.6,
    cac: 3800,
    cacRange: "¥2,800–5,500",
    recommend: "优化投放",
    source: "VIPKID 北美招聘（界面新闻）",
  },
  {
    name: "菲教供应商 / 海外基地",
    cost: "低",
    quality: "中",
    volume: "高",
    roi: 2.5,
    cac: 1300,
    cacRange: "¥900–1,800",
    recommend: "维持",
    source: "说客菲教基地 · 哒哒课酬参照",
  },
  {
    name: "招聘网站 / 社交媒体",
    cost: "中",
    quality: "中",
    volume: "高",
    roi: 2.2,
    cac: 2100,
    cacRange: "¥1,500–3,200",
    recommend: "试点 + 归因",
    source: "伴鱼公开招聘渠道之一",
  },
  {
    name: "付费信息流广告",
    cost: "高",
    quality: "低",
    volume: "高",
    roi: 1.1,
    cac: 6200,
    cacRange: "¥4,500–9,000",
    recommend: "严控 / 关停",
    source: "学员线索 100–200 元作量级参照",
  },
];

export const PAY_MODEL = {
  title: "薪酬与成本联动模型",
  formula: "师均综合成本 = 固定底薪 + 课时费 × 质量系数 + 活跃奖金 − 留存摊销收益",
  disclaimer:
    "课酬占营收 50%–60% 为公开报道区间（伴鱼 ~50%、VIPKID ~60%），与左侧「招聘 CAC」是不同口径。",
  tiers: [
    {
      grade: "A",
      criteria: "满意度≥4.5 且续费贡献 Top 20%",
      pay: "质量系数 1.2x · 优先排课",
      costImpact: "高投入高回报，目标 LTV/CAC > 3（行业健康线）",
      source: "伴鱼固定外教 + 高续费模型",
    },
    {
      grade: "B",
      criteria: "满意度 4.0–4.5，稳定授课",
      pay: "质量系数 1.0x · 标准排课",
      costImpact: "基线；哒哒 QA 管理成本约 10% 作运营参照",
      source: "爱分析 · 哒哒英语",
    },
    {
      grade: "C",
      criteria: "满意度<4.0 或完课率异常",
      pay: "质量系数 0.8x · 辅导期",
      costImpact: "试错成本；30 天内区分「错配」与「能力」再决策",
      source: "Selena 方案 · 标签匹配",
    },
  ],
};

export const DATA_LOOP = [
  {
    step: 1,
    title: "打通数据",
    desc: "ATS + LMS + 课堂评价 + CRM 统一 teacher_id",
    outputs: ["单一教师主数据", "全链路时间线"],
    metric: "数据打通率目标 ≥95%",
    days: "D+7",
  },
  {
    step: 2,
    title: "反向画像",
    desc: "从 Top 20% 明星教师提取可招聘特征",
    outputs: ["硬性门槛", "行为特征", "淘汰红线"],
    metric: "试讲分与首月质量 r 目标 >0.6",
    days: "D+30",
  },
  {
    step: 3,
    title: "标准交接",
    desc: "招聘→师训→运营 三方交接包 + 验收签字",
    outputs: ["交接 checklist", "首课陪跑", "首月看板绑定"],
    metric: "交接完整率目标 ≥90%",
    days: "D+45",
  },
  {
    step: 4,
    title: "分级 + 闭环",
    desc: "A/B/C 分级运营，30 天数据回流修正画像与渠道",
    outputs: ["分级排课规则", "渠道 ROI 月报", "画像版本管理"],
    metric: "画像迭代周期 ≤30天",
    days: "D+90",
  },
];

export const ROADMAP_VISION = {
  headline: "三层时间地图：90 天见效 · 1 年机制 · 3 年组织能力",
  layers: [
    {
      horizon: "0–90 天",
      subtitle: "止血与对齐 — 兼职可落地",
      theme: "快速见效",
      color: "#6366F1",
      goals: [
        "统一 teacher_id 与「首月达标」定义",
        "交接包 v1 + 错配率量化",
        "英语线漏斗基线与渠道 ROI 试点",
      ],
      deliverables: ["达标定义文档", "交接 SOP v1", "漏斗基线报告"],
    },
    {
      horizon: "6–12 个月",
      subtitle: "机制固化 — 三大项目协同",
      theme: "系统建设",
      color: "#2563EB",
      goals: [
        "语数英师资主数据 + 项目画像标签上线",
        "共享师训模块与分轨模块拆分",
        "AI 备课/反馈工具师训试点",
        "全球师资池 + 分区域 CAC 看板",
      ],
      deliverables: ["协同矩阵运营手册", "AI 师训模块 v1", "全球师资看板"],
    },
    {
      horizon: "1–3 年",
      subtitle: "组织能力 — 规模化与护城河",
      theme: "战略资产",
      color: "#059669",
      goals: [
        "师资组织能力成为 LingoAce 续费 LTV 核心杠杆",
        "北美品牌线 + 菲教产能线动态组合模型成熟",
        "人机协同师训成为对内标准、对外品牌",
        "跨项目师资复用率显著提升，单位招聘成本下降",
      ],
      deliverables: ["师资 OS 2.0", "全球管理半径 playbook", "行业最佳实践白皮书"],
    },
  ],
};

/** 90 天内执行节奏（承接 ROADMAP_VISION 第一层） */
export const ROADMAP_60 = [
  {
    phase: "15天",
    title: "对齐与启动",
    color: "#6366F1",
    goals: ["统一 teacher_id", "交接包 v1", "首课陪跑"],
    actions: [
      "三方对齐「首月达标」定义",
      "梳理 ATS/LMS/课堂可导出字段",
      "新师入职必完成交接 checklist",
    ],
    deliverables: ["达标定义", "交接 SOP v1"],
  },
  {
    phase: "30天",
    title: "首月验收",
    color: "#2563EB",
    goals: ["漏斗基线", "错配率量化", "案例入库"],
    actions: [
      "导出近3月招聘→首月课堂数据",
      "计算错配率、低评分占比",
      "招聘周会复盘错配",
    ],
    deliverables: ["漏斗基线", "错配案例库"],
  },
  {
    phase: "45天",
    title: "机制固化",
    color: "#F59E0B",
    goals: ["KPI 绑达标", "渠道 ROI", "A/B/C 分级"],
    actions: [
      "试讲 rubric 挂钩首月指标",
      "关停低 ROI 渠道试点",
      "分级排课试运行",
    ],
    deliverables: ["招聘 SOP", "渠道 ROI 表"],
  },
  {
    phase: "60天",
    title: "闭环复盘",
    color: "#10B981",
    goals: ["画像 v2", "交接≥90%", "CAC 可解释"],
    actions: [
      "反向画像迭代",
      "60天留存决策",
      "师资运营月报模板",
    ],
    deliverables: ["60天复盘", "月报模板", "画像 v2"],
  },
];

export const ROADMAP = ROADMAP_60;

export const MAIN_NAV = [
  { id: "overview", label: "业务全局" },
  { id: "logic", label: "运营逻辑" },
  { id: "synergy", label: "项目协同" },
  { id: "pain", label: "痛点解法" },
  { id: "ai-model", label: "AI 能力" },
  { id: "verify", label: "效果验证" },
  { id: "roadmap", label: "时间地图" },
];
