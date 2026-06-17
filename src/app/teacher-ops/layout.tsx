import type { Metadata } from "next";
import "./lingoace.css";

export const metadata: Metadata = {
  title: "LingoAce 师资运营 · 诊断与优化方案 | Selena",
  description:
    "语数英三大项目协同 · AI 时代师资能力 · 招聘×成本×交付 系统化诊断，含 1-3 年时间地图与可验证指标口径",
};

export default function LingoAceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="lingoace-root">{children}</div>;
}
