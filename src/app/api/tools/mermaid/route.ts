import { NextRequest, NextResponse } from 'next/server';

// POST: 接收 mermaid graph，返回 svg/png 的 data url
export async function POST(req: NextRequest) {
  try {
    const { graph } = await req.json();
    if (!graph || typeof graph !== 'string') {
      return NextResponse.json({ success: false, error: '参数 mermaid graph 缺失', graph }, { status: 400 });
    }

    // 编码 mermaid graph
    const graphBytes = new TextEncoder().encode(graph);
    const base64String = Buffer.from(graphBytes).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    // 请求 mermaid.ink 服务
    const url = `https://mermaid.ink/svg/${base64String}`;


    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ success: false, error: `网络请求错误: ${response.statusText}`, graph }, { status: 500 });
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('svg')) {
      // 直接返回 SVG 字符串和 data url
      const svgText = await response.text();
      const svgBase64 = Buffer.from(svgText, 'utf-8').toString('base64');
      const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;
      const result = {
        success: true,
        format: 'svg',
        mime_type: 'image/svg+xml',
        data_url: dataUrl,
        svg: svgText,
        size: svgText.length,
        graph,
      };
      return NextResponse.json(result);
    } else {
      // 其他格式如 PNG
      const imgData = new Uint8Array(await response.arrayBuffer());
      const imgBase64 = Buffer.from(imgData).toString('base64');
      const dataUrl = `data:image/png;base64,${imgBase64}`;
      const result = {
        success: true,
        format: 'png',
        mime_type: 'image/png',
        data_url: dataUrl,
        size: imgData.length,
        graph,
      };
      return NextResponse.json(result);
    }
  } catch (e: any) {
    return NextResponse.json({ success: false, error: `处理过程中出错: ${e.message || e}`, graph: '' }, { status: 500 });
  }
}


