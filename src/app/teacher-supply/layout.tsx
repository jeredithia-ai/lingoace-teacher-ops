import type { Metadata } from "next";
import "../teacher-ops/lingoace.css";

export const metadata: Metadata = {
  title: "师资供给与匹配系统 | Selena",
  description:
    "AI 时代在线教育师资运营实践 — 招聘渠道矩阵、成本算盘、师生匹配与 90 天执行路径",
};

export default function TeacherSupplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="lingoace-root">{children}</div>;
}
