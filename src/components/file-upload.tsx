"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  accept?: Record<string, string[]>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  textValue: string;
  onTextChange: (text: string) => void;
  textPlaceholder: string;
}

export function FileUpload({
  label,
  file,
  onFileChange,
  textValue,
  onTextChange,
  textPlaceholder,
}: FileUploadProps) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted[0]) {
        onFileChange(accepted[0]);
        onTextChange("");
      }
    },
    [onFileChange, onTextChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="space-y-3">
      <label className="label-text">{label}</label>

      {file ? (
        <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4">
          <FileText className="h-8 w-8 shrink-0 text-brand-600" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-slate-800">{file.name}</p>
            <p className="text-xs text-slate-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <>
          <div
            {...getRootProps()}
            className={cn(
              "cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition",
              isDragActive
                ? "border-brand-400 bg-brand-50"
                : "border-slate-200 hover:border-brand-300 hover:bg-slate-50"
            )}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto mb-3 h-8 w-8 text-slate-400" />
            <p className="text-sm font-medium text-slate-700">
              拖拽文件到此处，或点击上传
            </p>
            <p className="mt-1 text-xs text-slate-500">支持 PDF、DOCX、TXT</p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400">或直接粘贴文本</span>
            </div>
          </div>

          <textarea
            className="input-field min-h-[160px] resize-y"
            value={textValue}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder={textPlaceholder}
          />
        </>
      )}
    </div>
  );
}
