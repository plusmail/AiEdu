import { useState } from 'react';

const AGENTS = [
  { id: 'orch',     icon: '🎯', label: 'Orchestrator', color: '#6366f1', role: '전체 조율·분배', files: '모든 파일 읽기' },
  { id: 'frontend', icon: '🎨', label: 'Frontend',     color: '#3b82f6', role: 'UI 컴포넌트 구현', files: 'src/components/**' },
  { id: 'backend',  icon: '⚙️', label: 'Backend',      color: '#10b981', role: 'API·DB 로직 구현', files: 'src/api/** src/models/**' },
  { id: 'qa',       icon: '🧪', label: 'QA',           color: '#8b5cf6', role: '테스트 작성·실행', files: 'tests/** __tests__/**' },
  { id: 'security', icon: '🔒', label: 'Security',     color: '#ef4444', role: '보안 취약점 검사', files: 'src/**  읽기 전용' },
];

const MODES = [
  {
    id: 'seq', label: 'Sequential', icon: '➡️', color: '#3b82f6',
    desc: '의존성 있는 작업을 순서대로',
    flow: ['Planner', '→', 'Frontend', '→', 'Backend', '→', 'QA'],
  },
  {
    id: 'par', label: 'Parallel', icon: '⚡', color: '#10b981',
    desc: '독립적인 작업을 동시에',
    flow: ['Orchestrator', '→', ['Frontend', 'Backend', 'QA 동시']],
  },
  {
    id: 'mix', label: 'Mixed', icon: '🔀', color: '#f59e0b',
    desc: '단계별 순차 + 단계 내 병렬',
    flow: ['Plan(순차)', '→', 'Implement(병렬)', '→', 'Review(순차)'],
  },
];

const MESSAGES = [
  { from: 'orch', to: 'frontend', msg: '"로그인 폼 UI 구현해줘"', time: 0 },
  { from: 'orch', to: 'backend',  msg: '"인증 API 엔드포인트 구현해줘"', time: 0 },
  { from: 'frontend', to: 'orch', msg: '"LoginForm.jsx 완성 (TRUST-5 통과)"', time: 1 },
  { from: 'backend',  to: 'orch', msg: '"POST /auth/login 완성"', time: 1 },
  { from: 'orch', to: 'qa',      msg: '"로그인 통합 테스트 작성해줘"', time: 2 },
  { from: 'qa', to: 'orch',      msg: '"테스트 12개 전부 통과 ✅"', time: 3 },
];

export default function AgentTeamDiagram() {
  const [tab, setTab] = useState('team');
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState('mix');

  const visibleMsgs = MESSAGES.filter(m => m.time <= step);
  const agentById = Object.fromEntries(AGENTS.map(a => [a.id, a]));

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['team','팀 구성'], ['mode','실행 모드'], ['chat','메시지 흐름']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'team' && (
        <div className="space-y-2">
          <div className="text-xs text-gray-500 mb-2">각 에이전트는 <strong>담당 파일만</strong> 접근 → 충돌 방지</div>
          {AGENTS.map(a => (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl border-2 transition-all hover:shadow-sm"
              style={{ borderColor: a.color + '60', backgroundColor: a.color + '08' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0"
                style={{ backgroundColor: a.color }}>
                {a.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm" style={{ color: a.color }}>{a.label} Agent</div>
                <div className="text-xs text-gray-500">{a.role}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">{a.files}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'mode' && (
        <div className="space-y-3">
          {MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)}
              className={`w-full p-3 rounded-xl border-2 text-left transition-all ${mode===m.id ? 'shadow-md' : 'opacity-70 hover:opacity-100'}`}
              style={{ borderColor: mode===m.id ? m.color : '#e5e7eb', backgroundColor: mode===m.id ? m.color+'12' : '#f9fafb' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{m.icon}</span>
                <span className="font-bold text-sm" style={{ color: m.color }}>{m.label}</span>
                <span className="text-xs text-gray-500">— {m.desc}</span>
              </div>
              <div className="flex items-center gap-1 flex-wrap mt-2">
                {m.flow.map((f, i) => Array.isArray(f) ? (
                  <div key={i} className="flex gap-1">
                    {f.map((item, j) => (
                      <span key={j} className="px-2 py-0.5 rounded text-white text-xs font-bold"
                        style={{ backgroundColor: m.color }}>{item}</span>
                    ))}
                  </div>
                ) : (
                  <span key={i} className={f === '→' ? 'text-gray-400' : 'px-2 py-0.5 rounded text-white text-xs font-bold'}
                    style={f !== '→' ? { backgroundColor: m.color } : {}}>
                    {f}
                  </span>
                ))}
              </div>
            </button>
          ))}
          <div className="text-xs bg-yellow-50 border border-yellow-200 rounded-lg p-2">
            💡 <strong>Mixed 모드</strong>가 실전에서 가장 효율적 — 의존성은 순서 보장, 독립 작업은 병렬화
          </div>
        </div>
      )}

      {tab === 'chat' && (
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-3 h-52 overflow-y-auto space-y-2">
            {visibleMsgs.map((m, i) => {
              const from = agentById[m.from];
              const to   = agentById[m.to];
              return (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-base flex-shrink-0">{from?.icon}</span>
                  <div className="flex-1">
                    <span className="font-bold" style={{ color: from?.color }}>{from?.label}</span>
                    <span className="text-gray-400"> → </span>
                    <span className="font-bold" style={{ color: to?.color }}>{to?.label}</span>
                    <div className="mt-0.5 bg-white border border-gray-200 rounded-lg px-2 py-1 text-gray-700">
                      {m.msg}
                    </div>
                  </div>
                </div>
              );
            })}
            {visibleMsgs.length === 0 && (
              <div className="text-center text-gray-400 text-xs pt-10">▶ 아래 버튼으로 메시지 흐름을 재현하세요</div>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={() => setStep(s => Math.max(0, s-1))}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 transition-colors">← 이전</button>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${(step/3)*100}%` }} />
            </div>
            <button onClick={() => setStep(s => Math.min(3, s+1))}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors">다음 →</button>
            <button onClick={() => setStep(0)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200 transition-colors">↺</button>
          </div>
          <div className="text-xs text-center text-gray-400">단계 {step}/3</div>
        </div>
      )}
    </div>
  );
}
