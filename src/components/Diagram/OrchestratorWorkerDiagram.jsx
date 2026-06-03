import { useState } from 'react';

const WORKERS = [
  { id: 'frontend', icon: '🎨', label: 'Frontend\nAgent', color: '#3b82f6', file: 'src/components/**', task: 'React 컴포넌트 구현' },
  { id: 'backend',  icon: '⚙️', label: 'Backend\nAgent',  color: '#10b981', file: 'src/api/**',        task: 'REST API 개발' },
  { id: 'test',     icon: '🧪', label: 'QA\nAgent',       color: '#8b5cf6', file: 'tests/**',          task: '테스트 작성·실행' },
  { id: 'security', icon: '🔒', label: 'Security\nAgent', color: '#ef4444', file: 'src/**',            task: '보안 취약점 검사' },
];


export default function OrchestratorWorkerDiagram() {
  const [mode, setMode] = useState('arch');
  const [activeWorker, setActiveWorker] = useState(null);

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-orange-50 border border-orange-200 rounded-lg p-2">
        💡 오케스트레이터가 전체를 조율하고, 워커들이 전문 분야를 담당합니다
      </div>

      <div className="flex gap-2">
        {[['arch','아키텍처'], ['parallel','병렬 실행'], ['ownership','파일 소유권']].map(([id, lb]) => (
          <button key={id} onClick={() => setMode(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${mode === id ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
            {lb}
          </button>
        ))}
      </div>

      {mode === 'arch' && (
        <div className="space-y-3">
          {/* 오케스트레이터 */}
          <div className="flex justify-center">
            <div className="bg-amber-500 text-white rounded-2xl px-6 py-3 text-center shadow-lg">
              <div className="text-2xl">🎯</div>
              <div className="font-bold text-sm mt-1">Orchestrator</div>
              <div className="text-xs opacity-80">전체 조율 · 작업 분배 · 결과 통합</div>
            </div>
          </div>

          {/* 화살표 */}
          <div className="flex justify-center">
            <div className="text-gray-400 text-center">
              <div className="text-xs mb-1">작업 위임 ↓ ↑ 결과 수집</div>
              <div className="flex gap-6">
                {WORKERS.map(w => <div key={w.id} className="text-gray-300">│</div>)}
              </div>
            </div>
          </div>

          {/* 워커들 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {WORKERS.map(w => (
              <div key={w.id} onClick={() => setActiveWorker(activeWorker === w.id ? null : w.id)}
                className="border-2 rounded-xl p-3 cursor-pointer transition-all text-center"
                style={{
                  borderColor: activeWorker === w.id ? w.color : '#e5e7eb',
                  backgroundColor: activeWorker === w.id ? w.color + '15' : 'white',
                }}>
                <div className="text-2xl">{w.icon}</div>
                <div className="text-xs font-bold mt-1 whitespace-pre-line leading-tight" style={{ color: w.color }}>{w.label}</div>
                {activeWorker === w.id && (
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div className="font-mono bg-gray-100 rounded px-1">{w.file}</div>
                    <div>{w.task}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-400 text-center">워커 클릭 → 상세 정보</div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs space-y-1">
            <div className="font-bold text-gray-700">언제 서브에이전트를 사용하나요?</div>
            <div className="grid grid-cols-2 gap-1">
              {[
                { ok: true,  text: '독립적 하위 작업 3개 이상' },
                { ok: true,  text: '각 작업이 다른 도구/권한 필요' },
                { ok: true,  text: '병렬 처리로 시간 단축 가능' },
                { ok: false, text: '단순한 선형 작업 (과잉설계)' },
              ].map(({ ok, text }) => (
                <div key={text} className={`flex gap-1 items-start ${ok ? 'text-green-700' : 'text-red-600'}`}>
                  <span>{ok ? '✅' : '❌'}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {mode === 'parallel' && (
        <div className="space-y-3">
          <div className="text-xs font-bold text-gray-700">병렬 vs 순차 실행 비교</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-red-200 rounded-xl p-3 bg-red-50">
              <div className="text-xs font-bold text-red-700 mb-2">❌ 순차 실행 (느림)</div>
              {['Frontend (30분)', 'Backend (30분)', 'QA (20분)'].map((t, i) => (
                <div key={t} className="flex items-center gap-2 mb-1">
                  <div className="text-xs text-gray-500 w-4">{i + 1}</div>
                  <div className="h-5 bg-red-300 rounded text-xs text-white flex items-center px-2" style={{ width: '100%' }}>{t}</div>
                </div>
              ))}
              <div className="text-xs text-red-600 mt-2 font-bold">총 80분</div>
            </div>
            <div className="border border-green-200 rounded-xl p-3 bg-green-50">
              <div className="text-xs font-bold text-green-700 mb-2">✅ 병렬 실행 (빠름)</div>
              {[
                { label: 'Frontend', w: '80%', color: 'bg-blue-400' },
                { label: 'Backend', w: '80%', color: 'bg-green-400' },
                { label: 'QA', w: '60%', color: 'bg-purple-400' },
              ].map(({ label, w, color }) => (
                <div key={label} className="flex items-center gap-2 mb-1">
                  <div className="text-xs text-gray-500 w-16">{label}</div>
                  <div className={`h-5 ${color} rounded text-xs text-white flex items-center px-2`} style={{ width: w }}>동시</div>
                </div>
              ))}
              <div className="text-xs text-green-600 mt-2 font-bold">총 30분 ↓ 62% 단축</div>
            </div>
          </div>
          <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">{`# 병렬 실행 예시 (CLAUDE.md 또는 스킬에서)
Use Agent tools to spawn workers in parallel:

- agent: frontend-agent
  task: "로그인 UI 컴포넌트 구현"

- agent: backend-agent
  task: "로그인 API 엔드포인트 구현"

- agent: qa-agent
  task: "테스트 시나리오 작성"

Collect all results → Integration test`}</pre>
        </div>
      )}

      {mode === 'ownership' && (
        <div className="space-y-3">
          <div className="text-xs font-bold text-gray-700">파일 소유권 전략 — 에이전트 충돌 방지</div>
          <div className="space-y-2">
            {WORKERS.map(w => (
              <div key={w.id} className="flex items-center gap-3 p-3 rounded-xl border"
                style={{ borderColor: w.color + '60', backgroundColor: w.color + '0d' }}>
                <span className="text-xl flex-shrink-0">{w.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold" style={{ color: w.color }}>{w.label.replace('\n', ' ')}</div>
                  <div className="font-mono text-xs text-gray-600 mt-0.5">{w.file}</div>
                </div>
                <div className="text-xs text-gray-500">{w.task}</div>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-yellow-800 mb-1">⚠️ 소유권 위반 시</div>
            <div className="text-yellow-700">
              같은 파일을 두 에이전트가 동시에 수정 → 충돌(merge conflict) 발생<br />
              해결책: 에이전트마다 담당 디렉토리 명확히 분리
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
