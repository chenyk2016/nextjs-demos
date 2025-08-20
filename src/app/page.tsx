
import Image from "next/image";

const aiTools = [
  {
    name: "Mermaid 流程图生成",
    desc: "输入 mermaid 代码，一键生成流程图 SVG/PNG。",
    icon: "/file.svg",
    href: "/tools/mermaid-demo",
    color: "from-[#6EE7B7] to-[#3B82F6]"
  },
  {
    name: "AI 聊天助手",
    desc: "智能对话、知识问答、代码生成。",
    icon: "/globe.svg",
    href: "/tools/chat",
    color: "from-[#FDE68A] to-[#FCA5A5]"
  },
  {
    name: "图片识别",
    desc: "上传图片，AI 自动识别内容。",
    icon: "/window.svg",
    href: "/tools/image-ocr",
    color: "from-[#A5B4FC] to-[#F472B6]"
  },
  {
    name: "文本摘要",
    desc: "长文快速提炼关键信息。",
    icon: "/vercel.svg",
    href: "/tools/summarize",
    color: "from-[#FCA5A5] to-[#FDE68A]"
  },
  {
    name: "更多功能...",
    desc: "持续上新，敬请期待！",
    icon: "/next.svg",
    href: "#",
    color: "from-[#C7D2FE] to-[#6EE7B7]"
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #6d9ff0ff 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        /* 暗色模式渐变 */
        ...(typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? { background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }
          : {})
      }}
    >
      <header className="mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">AI 工具集</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">一站式体验多种智能能力</p>
      </header>
      <main className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {aiTools.map((tool) => (
          <a
            key={tool.name}
            href={tool.href}
            className={`group rounded-3xl shadow-lg bg-gradient-to-br ${tool.color} p-6 flex flex-col items-start transition-transform hover:-translate-y-2 hover:shadow-2xl border border-transparent hover:border-blue-400/40`}
            style={{ minHeight: 180 }}
          >
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform">
              <Image src={tool.icon} alt={tool.name} width={32} height={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{tool.name}</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base flex-1">{tool.desc}</p>
          </a>
        ))}
      </main>
      <footer className="mt-16 text-sm text-gray-400 dark:text-gray-600">© {new Date().getFullYear()} AI 工具集 </footer>
    </div>
  );
}
