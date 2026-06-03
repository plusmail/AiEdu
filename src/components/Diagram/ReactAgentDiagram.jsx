import { useState, useEffect, useRef } from 'react';

const STEPS = [
  { id: 'think', icon: '🧠', label: 'Thought (추론)', color: '#8b5cf6',
    bg: '#f5f3ff', content: '"사용자가 서울 날씨를 묻고 있다. 실시간 날씨 API를 호출해야 한다."' },
  { id: 'act',   icon: '⚡', label: 'Action (행동)',  color: '#3b82f6',
    bg: '#eff6ff', content: 'weather_api.get_current(city="Seoul")' },
  { id: 'obs',   icon: '👁️', label: 'Observation (관찰)', color: '#10b981',
    bg: '#f0fdf4', content: '{"temp": 18, "condition": "Cloudy", "humidity": 65}' },
  { id: 'think2',icon: '🧠', label: 'Thought (추론)', color: '#8b5cf6',
    bg: '#f5f3ff', content: '"날씨 데이터를 받았다. 사람이 이해하기 쉽게 정리해서 답변하자."' },
  { id: 'final', icon: '✅', label: 'Final Answer',   color: '#059669',
    bg: '#f0fdf4', content: '서울 현재 날씨: 18°C, 흐림, 습도 65%입니다.' },
];

const TOOLS = [
  { icon: '🌐', name: 'web_search', desc: '실시간 웹 검색', color: '#3b82f6' },
  { icon: '🧮', name: 'calculator', desc: '수식 계산', color: '#f59e0b' },
  { icon: '🗄️', name: 'database_query', desc: '사내 DB 조회', color: '#8b5cf6' },
  { icon: '📧', name: 'send_email', desc: '이메일 발송', color: '#ef4444' },
  { icon: '📝', name: 'create_document', desc: '문서 생성', color: '#10b981' },
  { icon: '🔌', name: 'custom_api', desc: '외부 API 호출', color: '#6366f1' },
];

const MULTI_AGENTS = [
  { role: '🎯 Planner',    desc: '전체 계획 수립·분해',         color: '#6366f1' },
  { role: '🔍 Researcher', desc: '정보 검색·수집',              color: '#3b82f6' },
  { role: '⚙️ Executor',   desc: '도구 실행·코드 작성',         color: '#10b981' },
  { role: '✅ Critic',     desc: '결과 검토·품질 보장',         color: '#f59e0b' },
];

export default function ReactAgentDiagram() {
  const [tab, setTab] = useState('react');
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setStep(s => {
          if (s >= STEPS.length - 1) { setRunning(false); return s; }
          return s + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  function startDemo() {
    setStep(-1);
    setRunning(false);
    clearInterval(timerRef.current);
    setTimeout(() => { setStep(0); setRunning(true); }, 100);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['react','ReAct 루프'], ['tools','도구 목록'], ['multi','멀티 에이전트']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'react' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500 text-center">ReAct = <strong>Re</strong>asoning + <strong>Act</strong>ion 반복</div>

          {/* 루프 다이어그램 */}
          <div className="flex justify-center">
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl p-3 flex-wrap justify-center gap-y-2">
              {['🧠 Thought', '→', '⚡ Action', '→', '👁️ Observation', '→'].map((s, i) => (
                s === '→' ? <span key={i} className="text-gray-400">→</span> : (
                  <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold">{s}</span>
                )
              ))}
              <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-lg text-xs">반복...</span>
              <span className="text-gray-400">→</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">✅ Final Answer</span>
            </div>
          </div>

          {/* 시뮬레이션 */}
          <div className="bg-gray-950 rounded-xl p-3 min-h-48 font-mono text-xs space-y-2 overflow-y-auto">
            {step < 0 ? (
              <div className="text-gray-500 text-center pt-6">▶ 아래 버튼으로 에이전트 실행 시뮬레이션</div>
            ) : (
              STEPS.slice(0, step + 1).map((s, i) => (
                <div key={i} className="flex gap-2">
                  <span style={{ color: s.color }} className="font-bold flex-shrink-0">[{s.label}]</span>
                  <span className="text-green-300 flex-1">{s.content}</span>
                </div>
              ))
            )}
            {running && <span className="text-gray-500 animate-pulse">▌</span>}
          </div>

          <div className="flex gap-2">
            <button onClick={startDemo}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 transition-colors">
              ▶ 에이전트 실행
            </button>
            <button onClick={() => { setStep(-1); setRunning(false); clearInterval(timerRef.current); }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
              ↺ 초기화
            </button>
          </div>
        </div>
      )}

      {tab === 'tools' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">LLM에 연결할 수 있는 외부 도구 예시</div>
          <div className="grid grid-cols-2 gap-2">
            {TOOLS.map(t => (
              <div key={t.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-2xl flex-shrink-0">{t.icon}</span>
                <div>
                  <code className="font-mono text-xs font-bold" style={{ color: t.color }}>{t.name}</code>
                  <div className="text-xs text-gray-500 mt-0.5">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">{`# 도구 정의 예시 (OpenAI Function Calling 형식)
tools = [{
    "name": "web_search",
    "description": "실시간 웹 검색",
    "parameters": {
        "query": {"type": "string", "description": "검색어"}
    }
}]

# 에이전트가 필요시 자동으로 도구 선택·호출`}</pre>
        </div>
      )}

      {tab === 'multi' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">복잡한 작업을 역할 분담으로 병렬 처리</div>
          <div className="space-y-2">
            {MULTI_AGENTS.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border-2"
                style={{ borderColor: a.color+'50', backgroundColor: a.color+'08' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundColor: a.color+'20' }}>{a.role.split(' ')[0]}</div>
                <div>
                  <div className="font-bold text-sm" style={{ color: a.color }}>{a.role}</div>
                  <div className="text-xs text-gray-500">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-blue-700 mb-1">단일 에이전트 vs 멀티 에이전트</div>
            <div className="space-y-1 text-gray-600">
              <div><strong>단일:</strong> 간단한 작업, 빠른 응답 필요 시</div>
              <div><strong>멀티:</strong> 장기 복잡 작업, 병렬 처리 필요 시 (비용 ↑)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
