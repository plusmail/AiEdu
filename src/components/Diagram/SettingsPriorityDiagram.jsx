import { useState } from 'react';

const LAYERS = [
  {
    rank: 1, label: '프로젝트 로컬', path: '.claude/settings.local.json',
    color: '#ef4444', bg: '#fef2f2', border: '#fecaca',
    icon: '🔒', desc: 'Git에 커밋하지 않는 개인 설정\n(API 키, 개인 선호)',
    example: '{ "model": "claude-opus-4-5" }',
  },
  {
    rank: 2, label: '프로젝트 공유', path: '.claude/settings.json',
    color: '#f59e0b', bg: '#fffbeb', border: '#fde68a',
    icon: '👥', desc: 'Git으로 팀 전체 공유\n팀 표준 설정 적용',
    example: '{ "permissions": { "allow": ["Bash(git:*)"] } }',
  },
  {
    rank: 3, label: '사용자 전역', path: '~/.claude/settings.json',
    color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe',
    icon: '🌐', desc: '모든 프로젝트에 적용\n개인 기본값',
    example: '{ "theme": "dark" }',
  },
];

const TOOLS = [
  { name: 'Bash', risk: 5, icon: '⚡', desc: '터미널 명령 실행', color: '#ef4444' },
  { name: 'Write', risk: 3, icon: '✏️', desc: '파일 쓰기·수정', color: '#f59e0b' },
  { name: 'Read', risk: 1, icon: '👁️', desc: '파일 읽기 전용', color: '#10b981' },
  { name: 'Agent', risk: 4, icon: '🤖', desc: '서브에이전트 실행', color: '#8b5cf6' },
  { name: 'MCP', risk: 3, icon: '🔌', desc: '외부 서버 연결', color: '#3b82f6' },
];

export default function SettingsPriorityDiagram() {
  const [tab, setTab] = useState('priority');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['priority','우선순위'], ['tools','도구 권한'], ['example','설정 예시']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'priority' && (
        <div className="space-y-2">
          <div className="text-xs text-gray-500 mb-3">높은 숫자가 낮은 숫자를 덮어씁니다 (위→아래)</div>
          {LAYERS.map((l, i) => (
            <div key={l.rank} className="relative">
              <div className="rounded-xl border-2 p-4 transition-all hover:shadow-md"
                style={{ backgroundColor: l.bg, borderColor: l.border }}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: l.color }}>
                      {l.rank}
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: l.color }}>{l.label} {l.icon}</div>
                      <div className="font-mono text-xs text-gray-500 mt-0.5">{l.path}</div>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full text-white font-bold"
                    style={{ backgroundColor: l.color }}>
                    {l.rank === 1 ? '최우선' : l.rank === 2 ? '중간' : '기본값'}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mt-2 whitespace-pre-line">{l.desc}</div>
              </div>
              {i < LAYERS.length - 1 && (
                <div className="flex items-center justify-center my-1">
                  <div className="text-gray-300 text-xs">덮어씀 ↑</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'tools' && (
        <div className="space-y-2">
          <div className="text-xs text-gray-500 mb-2">도구별 위험도 — 위험할수록 더 엄격한 권한 관리 필요</div>
          {TOOLS.sort((a,b) => b.risk - a.risk).map(t => (
            <div key={t.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xl">{t.icon}</span>
              <div className="w-16 font-bold font-mono text-sm" style={{ color: t.color }}>{t.name}</div>
              <div className="flex-1">
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="h-3 flex-1 rounded-sm transition-all"
                      style={{ backgroundColor: i < t.risk ? t.color : '#e5e7eb' }} />
                  ))}
                </div>
                <div className="text-xs text-gray-500">{t.desc}</div>
              </div>
              <div className="text-xs text-gray-400">위험도 {t.risk}/5</div>
            </div>
          ))}
          <div className="text-xs bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
            💡 <strong>팁:</strong> deny 목록에 <code className="bg-yellow-100 px-1 rounded">Bash(rm:*)</code>와 <code className="bg-yellow-100 px-1 rounded">Read(.env*)</code>를 추가하면 위험한 명령과 민감한 파일을 보호할 수 있습니다.
          </div>
        </div>
      )}

      {tab === 'example' && (
        <div className="space-y-3">
          {LAYERS.map(l => (
            <div key={l.rank} className="rounded-xl border-2 overflow-hidden"
              style={{ borderColor: l.border }}>
              <div className="px-3 py-2 text-xs font-bold" style={{ backgroundColor: l.color, color: 'white' }}>
                {l.icon} {l.path}
              </div>
              <pre className="bg-gray-950 text-green-300 text-xs p-3 font-mono leading-relaxed overflow-x-auto">
                {l.example}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
