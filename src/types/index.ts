export interface MatchAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  keyTopics: string[];
  interviewFocus: string[];
}

export interface QAItemData {
  category: string;
  question: string;
  suggestedAnswer: string;
}

export interface VoiceFeedback {
  overallScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  communicationScore: number;
  technicalScore: number;
  behavioralScore: number;
  recommendations: string[];
}

export interface VoiceMessageData {
  role: "interviewer" | "candidate";
  content: string;
}

export type SessionStatus =
  | "draft"
  | "matched"
  | "qa_ready"
  | "voice_in_progress"
  | "voice_completed"
  | "completed";

export const QA_CATEGORIES = [
  "technical",
  "behavioral",
  "project",
  "company",
  "situational",
  "general",
] as const;

export type QACategory = (typeof QA_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<QACategory, string> = {
  technical: "技术问题",
  behavioral: "行为面试",
  project: "项目经历",
  company: "公司与岗位",
  situational: "情景问题",
  general: "综合问题",
};
