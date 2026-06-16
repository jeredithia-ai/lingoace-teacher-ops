"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { FileUpload } from "@/components/file-upload";

export default function NewSessionPage() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [jdText, setJdText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setStep("正在解析文件…");

    try {
      const formData = new FormData();
      if (resumeFile) formData.append("resumeFile", resumeFile);
      if (resumeText) formData.append("resumeText", resumeText);
      if (jdFile) formData.append("jdFile", jdFile);
      if (jdText) formData.append("jdText", jdText);

      setStep("AI 正在分析匹配度…");

      const res = await fetch("/api/sessions", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "创建失败");

      router.push(`/session/${data.session.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "提交失败");
    } finally {
      setLoading(false);
      setStep("");
    }
  }

  const canSubmit =
    (resumeFile || resumeText.trim().length >= 50) &&
    (jdFile || jdText.trim().length >= 50);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">新建面试准备</h1>
        <p className="mt-2 text-sm text-slate-600">
          上传或粘贴你的简历和目标岗位描述，AI 将自动分析匹配度
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="glass-card p-6">
            <FileUpload
              label="你的简历"
              file={resumeFile}
              onFileChange={setResumeFile}
              textValue={resumeText}
              onTextChange={(t) => {
                setResumeText(t);
                setResumeFile(null);
              }}
              textPlaceholder="粘贴简历内容…（至少 50 字）"
            />
          </div>
          <div className="glass-card p-6">
            <FileUpload
              label="岗位描述 (JD)"
              file={jdFile}
              onFileChange={setJdFile}
              textValue={jdText}
              onTextChange={(t) => {
                setJdText(t);
                setJdFile(null);
              }}
              textPlaceholder="粘贴 JD 内容…（至少 50 字）"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {loading && step && (
          <div className="flex items-center justify-center gap-3 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
            <Loader2 className="h-4 w-4 animate-spin" />
            {step}
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="btn-primary px-10 py-3 text-base"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
            开始 AI 匹配分析
          </button>
        </div>
      </form>
    </div>
  );
}
