import type { Metadata } from "next";
import "./lingoace.css";

export const metadata: Metadata = {
  title: "LingoAce 师资运营 · 诊断与优化方案 | Selena",
  description:
    "招聘 × 成本 × 交付 系统化诊断方案，含可验证指标口径与 60 天落地路径",
};

export default function LingoAceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="lingoace-root">{children}</div>;
}
