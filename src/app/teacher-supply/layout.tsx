import type { Metadata } from "next";
import "../teacher-ops/lingoace.css";

export const metadata: Metadata = {
  title: "师资供给与匹配系统 | Selena",
  description:
    "从中教根基出发的全球化师资渠道 — 招聘、成本、匹配与数据算盘",
};

export default function TeacherSupplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="lingoace-root">{children}</div>;
}
