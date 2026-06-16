import mammoth from "mammoth";

export async function extractTextFromFile(
  buffer: Buffer,
  fileName: string
): Promise<string> {
  const ext = fileName.split(".").pop()?.toLowerCase();

  if (ext === "pdf") {
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return data.text.trim();
  }

  if (ext === "docx" || ext === "doc") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value.trim();
  }

  if (ext === "txt" || ext === "md") {
    return buffer.toString("utf-8").trim();
  }

  throw new Error(`不支持的文件格式: .${ext}。请上传 PDF、DOCX 或 TXT 文件。`);
}

export function validateTextContent(text: string, label: string): void {
  if (!text || text.trim().length < 50) {
    throw new Error(`${label}内容过短，请至少提供 50 个字符的有效内容。`);
  }
}
