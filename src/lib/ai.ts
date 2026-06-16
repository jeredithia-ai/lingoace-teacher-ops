import OpenAI from "openai";
import type { MatchAnalysis, QAItemData, VoiceFeedback } from "@/types";

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "sk-...") {
    throw new Error("请先在 .env 中配置 OPENAI_API_KEY");
  }
  return new OpenAI({ apiKey });
}

function getModel(): string {
  return process.env.OPENAI_MODEL || "gpt-4o";
}

async function chatJson<T>(system: string, user: string): Promise<T> {
  const client = getClient();
  const response = await client.chat.completions.create({
    model: getModel(),
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("AI 未返回有效内容");
  return JSON.parse(content) as T;
}

export async function analyzeMatch(
  resumeText: string,
  jdText: string
): Promise<MatchAnalysis & { companyName?: string; positionTitle?: string }> {
  const system = `你是一位资深 HR 和招聘顾问。根据简历和岗位描述(JD)，分析匹配度并给出面试准备建议。
返回 JSON 格式：
{
  "score": 0-100的整数,
  "summary": "一句话总结匹配情况",
  "strengths": ["优势1", "优势2", ...],
  "gaps": ["技能/经验缺口1", ...],
  "recommendations": ["准备建议1", ...],
  "keyTopics": ["面试可能涉及的核心话题"],
  "interviewFocus": ["面试官最可能深挖的方向"],
  "companyName": "从JD推断的公司名或'未知'",
  "positionTitle": "从JD推断的岗位名"
}
使用中文回复。`;

  return chatJson(system, `【简历】\n${resumeText.slice(0, 8000)}\n\n【岗位描述 JD】\n${jdText.slice(0, 8000)}`);
}

export async function generateQAItems(
  resumeText: string,
  jdText: string,
  matchAnalysis: MatchAnalysis,
  count = 20
): Promise<QAItemData[]> {
  const system = `你是一位经验丰富的面试官。根据候选人简历、JD 和匹配分析，生成 ${count} 道面试问题及参考答案。
每道题使用 STAR 法则（行为题）或结构化技术回答（技术题）。
返回 JSON：
{
  "items": [
    {
      "category": "technical|behavioral|project|company|situational|general",
      "question": "面试问题",
      "suggestedAnswer": "详细参考答案，结合简历内容个性化"
    }
  ]
}
类别分布：technical 30%, behavioral 25%, project 20%, company 10%, situational 10%, general 5%
使用中文。`;

  const user = `【简历】\n${resumeText.slice(0, 6000)}\n\n【JD】\n${jdText.slice(0, 6000)}\n\n【匹配分析】\n${JSON.stringify(matchAnalysis, null, 2)}`;

  const result = await chatJson<{ items: QAItemData[] }>(system, user);
  return result.items || [];
}

export async function getInterviewerResponse(
  resumeText: string,
  jdText: string,
  matchAnalysis: MatchAnalysis,
  history: { role: string; content: string }[],
  userMessage: string
): Promise<string> {
  const client = getClient();

  const systemPrompt = `你是一位专业、友善但严谨的面试官，正在对候选人进行模拟面试。
根据以下背景信息进行针对性提问和追问。

【简历摘要】
${resumeText.slice(0, 4000)}

【岗位 JD】
${jdText.slice(0, 4000)}

【匹配分析要点】
- 匹配度: ${matchAnalysis.score}%
- 重点考察: ${matchAnalysis.interviewFocus.join("、")}
- 技能缺口: ${matchAnalysis.gaps.join("、")}

规则：
1. 每次回复只问一个问题或做简短反馈后追问，不要一次问多个问题
2. 根据候选人回答质量决定是否追问
3. 混合技术题、行为题和项目经历题
4. 面试进行约 8-12 轮对话后，可以说"今天的模拟面试到此结束"并给出简短总结
5. 使用中文，语气专业自然
6. 如果候选人回答过于简短，引导其用 STAR 法则展开`;

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemPrompt },
    ...history.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: userMessage },
  ];

  const response = await client.chat.completions.create({
    model: getModel(),
    messages,
    temperature: 0.8,
    max_tokens: 800,
  });

  return response.choices[0]?.message?.content || "请继续回答上一个问题。";
}

export async function generateVoiceFeedback(
  resumeText: string,
  jdText: string,
  transcript: { role: string; content: string }[]
): Promise<VoiceFeedback> {
  const system = `你是一位面试教练。根据模拟面试对话记录，给出全面评估。
返回 JSON：
{
  "overallScore": 0-100,
  "summary": "总体评价",
  "strengths": ["表现亮点"],
  "improvements": ["需改进之处"],
  "communicationScore": 0-100,
  "technicalScore": 0-100,
  "behavioralScore": 0-100,
  "recommendations": ["具体改进建议"]
}
使用中文。`;

  const transcriptText = transcript
    .map((m) => `${m.role === "interviewer" ? "面试官" : "候选人"}: ${m.content}`)
    .join("\n\n");

  const user = `【简历】\n${resumeText.slice(0, 3000)}\n\n【JD】\n${jdText.slice(0, 3000)}\n\n【对话记录】\n${transcriptText}`;

  return chatJson<VoiceFeedback>(system, user);
}

export async function getOpeningQuestion(
  resumeText: string,
  jdText: string,
  matchAnalysis: MatchAnalysis
): Promise<string> {
  const system = `你是面试官，请生成开场白和第一个面试问题（合并为一段自然的话）。
先简短自我介绍和说明面试流程，然后提出第一个问题。使用中文，150字以内。`;

  const user = `岗位: ${matchAnalysis.interviewFocus[0] || "综合岗位"}\nJD 要点: ${jdText.slice(0, 2000)}`;

  const client = getClient();
  const response = await client.chat.completions.create({
    model: getModel(),
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return (
    response.choices[0]?.message?.content ||
    "你好，欢迎参加今天的模拟面试。请先做一个简短的自我介绍。"
  );
}
