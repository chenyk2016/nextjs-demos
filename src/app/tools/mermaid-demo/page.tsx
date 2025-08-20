"use client";
import { useState } from "react";

export default function MermaidChat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    format: string;
    mime_type: string;
    data_url: string;
    size: number;
    graph: string;
    success: boolean;
    error?: string;
  }>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/tools/mermaid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graph: input })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "生成失败");
      }
    } catch (e: any) {
      setError(e.message || "请求出错");
    } finally {
      setLoading(false);
    }
  }

  // 示例 mermaid 代码
  const example = `graph LR;\nA--> B & C & D\nB--> A & E\nC--> A & E\nD--> A & E\nE--> B & C & D`;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Mermaid 流程图对话生成器</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-8">
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-3 py-1 rounded transition"
            onClick={() => setInput(example)}
            disabled={loading}
          >
            填入案例
          </button>
        </div>
        <textarea
          className="w-full min-h-[120px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          placeholder={"输入 mermaid 代码，如:\ngraph TD;\nA-->B;\nB-->C"}
          value={input}
          onChange={e => setInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-60"
          disabled={loading || !input.trim()}
        >
          {loading ? "生成中..." : "生成流程图"}
        </button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {result && result.success && (
        <div className="w-full flex flex-col items-center gap-4">
          {result.format === "svg" ? (
            <img src={result.data_url} alt="mermaid svg" className="max-w-full h-auto" />
          ) : (
            <img src={result.data_url} alt="mermaid png" className="max-w-full h-auto" />
          )}
          <div className="text-xs text-gray-500">格式: {result.format.toUpperCase()} | 大小: {result.size} bytes</div>
        </div>
      )}
    </div>
  );
}
