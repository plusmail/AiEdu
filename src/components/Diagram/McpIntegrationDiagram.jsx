import { useState } from 'react';

const MCP_SERVERS = [
  { id: 'github',   icon: '🐙', label: 'GitHub MCP',    color: '#24292e', bg: '#f6f8fa',
    tools: ['PR 생성·머지', '이슈 조회·생성', '코드 리뷰 댓글'],
    config: '"command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"]' },
  { id: 'postgres', icon: '🐘', label: 'PostgreSQL MCP', color: '#336791', bg: '#e8f0f8',
    tools: ['SQL 쿼리 실행', '스키마 조회', '데이터 분석'],
    config: '"command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres"]' },
  { id: 'slack',    icon: '💬', label: 'Slack MCP',      color: '#4a154b', bg: '#f8f0fa',
    tools: ['메시지 전송', '채널 검색', '파일 공유'],
    config: '"command": "npx", "args": ["-y", "@modelcontextprotocol/server-slack"]' },
  { id: 'puppeteer',icon: '🌐', label: 'Puppeteer MCP',  color: '#00d964', bg: '#f0fdf4',
    tools: ['웹 크롤링', '스크린샷', '자동화 테스트'],
    config: '"command": "npx", "args": ["-y", "@modelcontextprotocol/server-puppeteer"]' },
];

const VS_CLI = [
  { label: 'MCP 서버 적합', items: ['외부 API 지속 연결', '복잡한 인증·세션', '양방향 스트리밍', 'GitHub·DB·Slack'], color: '#3b82f6', icon: '🔌' },
  { label: 'CLI 도구 적합', items: ['단순 명령 실행', '로컬 파일 처리', '빠른 일회성 작업', 'git·npm·ls'], color: '#10b981', icon: '💻' },
];

export default function McpIntegrationDiagram() {
  const [tab, setTab] = useState('servers');
  const [selected, setSelected] = useState('github');

  const srv = MCP_SERVERS.find(s => s.id === selected);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['servers','MCP 서버'], ['config','설정 방법'], ['vs','MCP vs CLI']].map(([id,lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'servers' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {MCP_SERVERS.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${selected===s.id ? 'shadow-md scale-[1.02]' : 'opacity-70 hover:opacity-100'}`}
                style={{ borderColor: selected===s.id ? s.color : '#e5e7eb', backgroundColor: selected===s.id ? s.bg : 'white' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-bold text-xs" style={{ color: s.color }}>{s.label}</span>
                </div>
                <div className="space-y-0.5">
                  {s.tools.map((t,i) => (
                    <div key={i} className="text-xs text-gray-500">• {t}</div>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {srv && (
            <div className="rounded-xl border-2 overflow-hidden"
              style={{ borderColor: srv.color + '50' }}>
              <div className="px-3 py-2 text-xs font-bold text-white flex items-center gap-2"
                style={{ backgroundColor: srv.color }}>
                <span>{srv.icon}</span>{srv.label} 연결 흐름
              </div>
              <div className="p-3 flex items-center gap-3 text-xs bg-gray-50">
                <div className="px-2 py-1.5 bg-purple-100 border border-purple-300 rounded-lg font-bold text-purple-700">Claude</div>
                <div className="text-gray-400">→ MCP →</div>
                <div className="px-2 py-1.5 rounded-lg font-bold text-white" style={{ backgroundColor: srv.color }}>
                  {srv.icon} {srv.label.replace(' MCP','')}
                </div>
                <div className="text-gray-400 text-center">→</div>
                <div className="flex gap-1 flex-wrap">
                  {srv.tools.map((t,i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-gray-600">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'config' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">프로젝트 루트의 <code className="bg-gray-100 px-1 rounded">.mcp.json</code>에 추가</div>
          <div className="flex gap-2 flex-wrap">
            {MCP_SERVERS.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                className={`px-2 py-1 rounded text-xs font-bold transition-all ${selected===s.id ? 'text-white' : 'bg-gray-100 text-gray-600'}`}
                style={selected===s.id ? {backgroundColor: s.color} : {}}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
          {srv && (
            <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto">{`{
  "mcpServers": {
    "${srv.id}": {
      ${srv.config},
      "env": {
        "${srv.id.toUpperCase()}_TOKEN": "${'$'}{${srv.id.toUpperCase()}_TOKEN}"
      }
    }
  }
}`}</pre>
          )}
          <div className="text-xs bg-blue-50 border border-blue-200 rounded-lg p-2">
            💡 설정 후 Claude를 재시작하면 <strong>{srv?.icon} {srv?.label}</strong>의 도구들을 자동으로 사용할 수 있습니다.
          </div>
        </div>
      )}

      {tab === 'vs' && (
        <div className="grid grid-cols-2 gap-3">
          {VS_CLI.map(v => (
            <div key={v.label} className="rounded-xl border-2 p-3"
              style={{ borderColor: v.color + '60', backgroundColor: v.color + '08' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{v.icon}</span>
                <span className="font-bold text-sm" style={{ color: v.color }}>{v.label}</span>
              </div>
              {v.items.map((item, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600 mb-1">
                  <span style={{ color: v.color }}>✓</span>{item}
                </div>
              ))}
            </div>
          ))}
          <div className="col-span-2 text-xs bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-1">
            💡 <strong>실전 팁:</strong> GitHub·DB·Slack처럼 인증이 필요하거나 지속 연결이 필요한 경우 MCP, 그 외 단순 명령은 Bash 도구 직접 사용
          </div>
        </div>
      )}
    </div>
  );
}
