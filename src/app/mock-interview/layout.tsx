import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "模拟面试 | Mock Interview",
  description: "上传简历与岗位描述，AI 帮你匹配分析、模拟语音面试、生成问答清单",
};

export default function MockInterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
