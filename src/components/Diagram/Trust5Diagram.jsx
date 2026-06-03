import { useState } from 'react';

const CRITERIA = [
  {
    letter: 'T', word: 'Tested',     icon: '🧪', color: '#10b981',
    desc: '테스트 커버리지 80% 이상',
    check: 'npm test --coverage → 80%+ 확인',
    fail: '테스트 없는 코드 → 배포 불가',
    tip: 'TDD: 테스트 먼저 작성 → 구현',
  },
  {
    letter: 'R', word: 'Reviewed',   icon: '👀', color: '#3b82f6',
    desc: '코드 리뷰 완료',
    check: '보안·성능·가독성 자동 검토',
    fail: '리뷰 없는 PR → 머지 불가',
    tip: 'AI 자동 리뷰 + 사람 리뷰 조합',
  },
  {
    letter: 'U', word: 'Understood', icon: '📖', color: '#8b5cf6',
    desc: '코드 이해 가능성 확보',
    check: '함수명·변수명·JSDoc 적절성',
    fail: '난해한 코드 → 유지보수 불가',
    tip: '복잡한 로직엔 Why 주석 추가',
  },
  {
    letter: 'S', word: 'Secured',    icon: '🔒', color: '#ef4444',
    desc: '보안 취약점 없음',
    check: 'OWASP Top10 자동 스캔',
    fail: 'SQL 인젝션·XSS 발견 → 즉시 차단',
    tip: '하드코딩된 시크릿 금지',
  },
  {
    letter: 'T', word: 'Typed',      icon: '🎯', color: '#f59e0b',
    desc: '타입 안전성 확보',
    check: 'TypeScript 컴파일 오류 0개',
    fail: 'any 남용 → 런타임 오류 위험',
    tip: 'strict mode 활성화 필수',
  },
];

const FLOW_STEPS = [
  { label: 'SPEC', icon: '📋', color: '#6366f1', desc: '요구사항 정의' },
  { label: '테스트 작성', icon: '🧪', color: '#10b981', desc: 'Red (실패)' },
  { label: '구현', icon: '⌨️', color: '#3b82f6', desc: 'Green (통과)' },
  { label: 'TRUST-5 검사', icon: '✅', color: '#f59e0b', desc: '품질 게이트' },
  { label: '배포', icon: '🚀', color: '#ef4444', desc: '전 항목 통과' },
];

export default function Trust5Diagram() {
  const [active, setActive] = useState(null);
  const [allPass, setAllPass] = useState([]);

  function togglePass(letter_idx) {
    setAllPass(p => p.includes(letter_idx) ? p.filter(x => x !== letter_idx) : [...p, letter_idx]);
  }

  const passCount = allPass.length;
  const deployReady = passCount === 5;

  return (
    <div className="space-y-5">
      {/* TRUST-5 원형 배지 */}
      <div className="flex justify-center gap-3 flex-wrap">
        {CRITERIA.map((c, i) => {
          const passed = allPass.includes(i);
          return (
            <button key={i} onClick={() => togglePass(i)}
              className={`w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center transition-all cursor-pointer shadow-sm ${passed ? 'scale-110 shadow-md' : 'opacity-60 hover:opacity-80'}`}
              style={{ borderColor: c.color, backgroundColor: passed ? c.color : 'white' }}
              title={`${c.word} — 클릭으로 체크`}>
              <span className="text-xl font-black" style={{ color: passed ? 'white' : c.color }}>{c.letter}</span>
              <span className="text-xs font-bold" style={{ color: passed ? 'white' : c.color, fontSize: 9 }}>{c.word.slice(0,5)}</span>
            </button>
          );
        })}
      </div>

      <div className={`text-center text-sm font-bold py-2 rounded-xl transition-all ${
        deployReady ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-500'
      }`}>
        {deployReady ? '🚀 배포 가능! 모든 품질 기준 통과' : `${passCount}/5 통과 — 클릭으로 각 항목 체크해보세요`}
      </div>

      {/* 세부 설명 카드 */}
      <div className="grid grid-cols-1 gap-2">
        {CRITERIA.map((c, i) => (
          <div key={i}
            className="p-3 rounded-xl border-2 cursor-pointer transition-all"
            style={{ borderColor: active===i ? c.color : '#e5e7eb', backgroundColor: active===i ? c.color+'10' : '#f9fafb' }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                style={{ backgroundColor: c.color }}>
                {c.letter}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm" style={{ color: c.color }}>{c.word} — {c.desc}</div>
                {active === i && (
                  <div className="mt-1 space-y-0.5">
                    <div className="text-xs text-gray-600">✅ 검사: {c.check}</div>
                    <div className="text-xs text-red-500">❌ 실패: {c.fail}</div>
                    <div className="text-xs text-blue-600">💡 팁: {c.tip}</div>
                  </div>
                )}
              </div>
              <span className="text-xl">{c.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Loop Engine 흐름 */}
      <div>
        <div className="text-xs font-bold text-gray-600 mb-2">Loop Engine — TRUST-5 통과까지 자동 반복</div>
        <div className="flex items-center gap-1 flex-wrap">
          {FLOW_STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <div className="px-2 py-1.5 rounded-lg text-white text-xs font-bold text-center"
                  style={{ backgroundColor: s.color, minWidth: 60 }}>
                  {s.icon} {s.label}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <div className="flex flex-col items-center">
                  <div className="text-gray-400 text-sm">{i === 3 ? '↩️' : '→'}</div>
                  {i === 3 && <div className="text-xs text-red-400" style={{fontSize:9}}>실패시</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
