import { useState, useEffect, useRef } from 'react';

const PHASES = [
  {
    id: 'red', label: 'Red', icon: '🔴', color: '#ef4444', bg: '#fef2f2', border: '#fecaca',
    title: '테스트 먼저 작성',
    desc: '아직 구현이 없으므로 테스트 실패 (Red)',
    code: `// 1단계: 테스트 먼저 작성
describe('Snake', () => {
  it('초기 길이는 3이어야 한다', () => {
    const snake = new Snake();
    expect(snake.length).toBe(3); // ❌ FAIL
  });
});`,
    result: '❌  FAIL  — Snake is not defined',
  },
  {
    id: 'green', label: 'Green', icon: '🟢', color: '#10b981', bg: '#f0fdf4', border: '#bbf7d0',
    title: '최소한의 구현',
    desc: '테스트를 통과할 최소 코드만 작성 (Green)',
    code: `// 2단계: 최소 구현
class Snake {
  constructor() {
    this.length = 3;  // 테스트 통과용
    this.body = [[5,5],[5,4],[5,3]];
  }
}`,
    result: '✅  PASS  — 1 test passed',
  },
  {
    id: 'refactor', label: 'Refactor', icon: '🔵', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe',
    title: '코드 품질 개선',
    desc: '테스트는 유지하면서 코드를 깔끔하게 정리 (Refactor)',
    code: `// 3단계: 리팩토링
class Snake {
  constructor(startPos = [5,5]) {
    this.body = this.#initBody(startPos);
  }

  get length() { return this.body.length; }

  #initBody(head) {
    return Array.from({length:3}, (_,i) =>
      [head[0], head[1]-i]);
  }
}`,
    result: '✅  PASS  — 1 test passed (더 깔끔한 코드)',
  },
  {
    id: 'trust5', label: 'TRUST-5', icon: '⭐', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a',
    title: 'TRUST-5 품질 검사',
    desc: '5가지 품질 기준 자동 검사 후 통과 시 완료',
    code: `// TRUST-5 자동 검사 결과
T Tested     ✅ 커버리지 92%
R Reviewed   ✅ 코드 리뷰 자동 완료
U Understood ✅ JSDoc 주석 충분
S Secured    ✅ 취약점 없음
T Typed      ✅ 타입 선언 완료

→ 모두 통과! 다음 마일스톤으로`,
    result: '🚀  TRUST-5 통과 — 다음 기능으로',
  },
];

const MILESTONES = [
  { id: 1, name: 'Canvas 초기화', done: true },
  { id: 2, name: '뱀 이동 로직', done: true },
  { id: 3, name: '먹이·충돌', done: false },
  { id: 4, name: '게임 오버', done: false },
  { id: 5, name: '점수 UI', done: false },
];

export default function TddLoopDiagram() {
  const [phase, setPhase] = useState(0);
  const [auto, setAuto] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (auto) {
      timerRef.current = setInterval(() => {
        setPhase(p => {
          if (p >= PHASES.length - 1) { setAuto(false); return 0; }
          return p + 1;
        });
      }, 1800);
    }
    return () => clearInterval(timerRef.current);
  }, [auto]);

  const cur = PHASES[phase];

  return (
    <div className="space-y-4">
      {/* 사이클 시각화 */}
      <div className="flex items-center justify-center gap-2">
        {PHASES.map((p, i) => (
          <div key={p.id} className="flex items-center gap-2">
            <button
              onClick={() => { setAuto(false); setPhase(i); }}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                phase === i ? 'scale-110 shadow-lg' : 'opacity-50 hover:opacity-80'
              }`}
              style={{ borderColor: p.color, backgroundColor: phase===i ? p.bg : 'white' }}>
              <span className="text-2xl">{p.icon}</span>
              <span className="text-xs font-bold" style={{ color: p.color }}>{p.label}</span>
            </button>
            {i < PHASES.length - 1 && (
              <div className="text-gray-300 text-lg">→</div>
            )}
          </div>
        ))}
      </div>

      {/* 현재 단계 상세 */}
      <div className="rounded-xl border-2 p-4 transition-all"
        style={{ borderColor: cur.color, backgroundColor: cur.bg }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{cur.icon}</span>
          <div>
            <div className="font-bold" style={{ color: cur.color }}>{cur.label} 단계 — {cur.title}</div>
            <div className="text-xs text-gray-500">{cur.desc}</div>
          </div>
        </div>
        <pre className="bg-gray-950 text-green-300 text-xs rounded-lg p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap mt-2">
          {cur.code}
        </pre>
        <div className="mt-2 flex items-center gap-2 text-xs font-mono"
          style={{ color: cur.color }}>
          <span>{cur.result}</span>
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="flex items-center gap-2">
        <button onClick={() => setPhase(p => Math.max(0, p-1))}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 hover:bg-gray-200">← 이전</button>
        <button onClick={() => { setAuto(false); setPhase(p => (p+1) % PHASES.length); }}
          className="px-3 py-1.5 rounded-lg text-xs font-bold text-white hover:opacity-90"
          style={{ backgroundColor: cur.color }}>다음 →</button>
        <button onClick={() => setAuto(a => !a)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${auto ? 'bg-orange-500 text-white' : 'bg-gray-800 text-white'}`}>
          {auto ? '⏸ 정지' : '▶ 자동 재생'}
        </button>
      </div>

      {/* 마일스톤 진행 */}
      <div>
        <div className="text-xs font-bold text-gray-600 mb-2">스네이크 게임 — 마일스톤별 TDD 진행</div>
        <div className="space-y-1">
          {MILESTONES.map(m => (
            <div key={m.id} className="flex items-center gap-2 text-xs">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${m.done ? 'bg-green-500' : 'bg-gray-300'}`}>
                {m.done ? '✓' : m.id}
              </div>
              <span className={m.done ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}>
                M{m.id}: {m.name}
              </span>
              {m.done && <span className="text-green-500 text-xs">Red→Green→Refactor→TRUST-5 통과</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
