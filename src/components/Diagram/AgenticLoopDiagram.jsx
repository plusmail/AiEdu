import { useState, useEffect } from 'react';

const STEPS = [
  { id: 0, icon: '👤', label: '사용자 요청', color: '#3b82f6', desc: '자연어로 작업 지시\n"로그인 기능 구현해줘"', code: '$ claude\n> 로그인 기능 구현해줘' },
  { id: 1, icon: '🧠', label: '컨텍스트 분석', color: '#8b5cf6', desc: '파일 구조 파악\n코드베이스 이해\n의존성 분석', code: 'Read(src/) → 파일 목록\nRead(package.json) → 의존성\nBash(git log) → 이력' },
  { id: 2, icon: '📋', label: '계획 수립', color: '#f59e0b', desc: '작업 단계 결정\n도구 선택\n위험 요소 파악', code: '계획:\n1. auth.js 작성\n2. 테스트 작성\n3. 라우터 연결' },
  { id: 3, icon: '⚙️', label: '도구 실행', color: '#10b981', desc: '파일 읽기/쓰기\n터미널 명령 실행\n검색·분석', code: 'Write(src/auth.js)\nBash(npm test)\nRead(src/router.js)' },
  { id: 4, icon: '✅', label: '결과 확인', color: '#6366f1', desc: '실행 결과 검증\n오류 발생 시 재시도\n성공 시 다음 단계', code: '테스트 통과? ✅\n린트 오류? ❌ → 수정\n빌드 성공? ✅' },
  { id: 5, icon: '📤', label: '결과 반환', color: '#ec4899', desc: '작업 완료 보고\n변경 사항 요약\n다음 제안', code: '완료!\n변경 파일: auth.js, router.js\n테스트: 8/8 통과' },
];

export default function AgenticLoopDiagram() {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      setActive(prev => {
        if (prev === 4) {
          // 결과 확인 단계에서 가끔 재시도
          if (loopCount < 1 && Math.random() > 0.5) {
            setLoopCount(c => c + 1);
            return 3; // 도구 실행으로 돌아가기
          }
        }
        if (prev === 5) { setRunning(false); return 5; }
        return prev + 1;
      });
    }, 1200);
    return () => clearTimeout(timer);
  }, [active, running, loopCount]);

  function startLoop() {
    setActive(0); setRunning(true); setLoopCount(0);
  }

  const step = STEPS[active];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
        💡 에이전틱 루프 = AI가 스스로 계획·실행·검증을 반복하는 자율 처리 사이클
      </div>

      {/* 루프 시각화 */}
      <div className="relative flex flex-wrap gap-2 justify-center py-4">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-1">
            {/* 화살표 (4→3 피드백 루프) */}
            {i === 4 && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-orange-500 font-bold hidden lg:block">
                ↺ 오류 시 재시도
              </div>
            )}
            <div
              onClick={() => { setRunning(false); setActive(i); }}
              className="flex flex-col items-center cursor-pointer transition-all duration-300"
              style={{ transform: active === i ? 'scale(1.15)' : 'scale(1)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 border-2"
                style={{
                  backgroundColor: active === i ? s.color : '#f1f5f9',
                  borderColor: active === i ? s.color : '#e2e8f0',
                  boxShadow: active === i ? `0 0 16px ${s.color}66` : 'none',
                }}>
                {s.icon}
              </div>
              <div className="text-xs font-bold mt-1 text-center leading-tight"
                style={{ color: active === i ? s.color : '#64748b', maxWidth: 56 }}>
                {s.label}
              </div>
            </div>
            {i < STEPS.length - 1 && (
              <div className="text-gray-300 font-bold text-lg">→</div>
            )}
          </div>
        ))}
      </div>

      {/* 현재 단계 상세 */}
      <div className="rounded-xl border-2 overflow-hidden transition-all duration-300"
        style={{ borderColor: step.color }}>
        <div className="px-4 py-2 text-white text-sm font-bold flex items-center gap-2"
          style={{ backgroundColor: step.color }}>
          <span className="text-lg">{step.icon}</span>
          {step.label}
          {running && active < 5 && (
            <span className="ml-auto text-xs animate-pulse">처리 중...</span>
          )}
        </div>
        <div className="p-4 flex gap-4 flex-wrap">
          <div className="flex-1 min-w-36">
            <div className="text-xs font-bold text-gray-600 mb-1">설명</div>
            <div className="text-xs text-gray-700 whitespace-pre-line">{step.desc}</div>
          </div>
          <div className="flex-1 min-w-40">
            <div className="text-xs font-bold text-gray-600 mb-1">실제 동작</div>
            <pre className="text-xs font-mono bg-gray-900 text-green-300 rounded-lg p-2 leading-relaxed">{step.code}</pre>
          </div>
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="flex gap-3 items-center">
        <button onClick={startLoop}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 transition-colors">
          ▶ 루프 시뮬레이션
        </button>
        <button onClick={() => setRunning(false)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-300 transition-colors">
          ■ 정지
        </button>
        <div className="text-xs text-gray-500">단계 클릭으로 직접 이동</div>
      </div>

      {/* 컨텍스트 윈도우 개념 */}
      <div className="border border-gray-200 rounded-xl p-4 space-y-2">
        <div className="text-xs font-bold text-gray-700">컨텍스트 윈도우 (20만 토큰)</div>
        <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
          {[
            { label:'대화이력', w:25, color:'#3b82f6' },
            { label:'파일내용', w:40, color:'#8b5cf6' },
            { label:'도구결과', w:20, color:'#10b981' },
            { label:'여유',     w:15, color:'#e5e7eb' },
          ].map(({ label, w, color }, i, arr) => {
            const left = arr.slice(0, i).reduce((s, x) => s + x.w, 0);
            return (
              <div key={label} className="absolute top-0 bottom-0 flex items-center justify-center text-xs font-bold"
                style={{ left: `${left}%`, width: `${w}%`, backgroundColor: color, color: color === '#e5e7eb' ? '#9ca3af' : 'white' }}>
                {w > 12 ? label : ''}
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 flex-wrap text-xs">
          {[
            { label:'대화이력', color:'bg-blue-500' },
            { label:'파일내용', color:'bg-purple-500' },
            { label:'도구결과', color:'bg-green-500' },
            { label:'여유공간', color:'bg-gray-200' },
          ].map(({label,color}) => (
            <span key={label} className="flex items-center gap-1 text-gray-600">
              <span className={`w-3 h-3 rounded ${color}`} />{label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
