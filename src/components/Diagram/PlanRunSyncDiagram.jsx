import { useState } from 'react';

const COMMANDS = [
  {
    id: 'plan', cmd: '/moai plan', icon: '📋', color: '#3b82f6',
    desc: '"로그인 기능 구현" → SPEC/login.md 자동 생성',
    output: `SPEC/login.md 생성 완료:
┌─ 요구사항 (EARS 형식)
│  When 사용자가 로그인 클릭 시, 이메일·비번 검증
│  If 인증 실패 시, 에러 메시지 표시
├─ 기술 명세
│  JWT 토큰 기반 인증
│  bcrypt 패스워드 해싱
├─ 마일스톤
│  M1: 입력 검증 / M2: API 연동 / M3: UI
└─ 파일 매핑
   src/auth.js, src/components/LoginForm.jsx`,
    benefit: 'SPEC이 있으면 AI가 방향을 잃지 않음',
  },
  {
    id: 'run', cmd: '/moai run', icon: '▶️', color: '#10b981',
    desc: 'SPEC/login.md → TDD 루프 자동 실행',
    output: `Loop Engine 실행 중...

[M1] 입력 검증
  ✍ 테스트 작성... tests/auth.test.js
  💻 구현... src/auth.js
  🧪 테스트 실행... 5/5 통과 ✅
  🔍 TRUST-5 검사... 통과 ✅

[M2] API 연동
  ✍ 테스트 작성...
  💻 구현 중 오류 발생 → 재시도 (1/3)
  💻 재구현...
  🧪 테스트... 8/8 통과 ✅

[M3] UI 구현
  ...완료 ✅

전체 완료: 테스트 21/21 통과`,
    benefit: '오류 발생 시 자동 재시도, TRUST-5 통과까지 반복',
  },
  {
    id: 'sync', cmd: '/moai sync', icon: '🔄', color: '#8b5cf6',
    desc: '코드 ↔ SPEC ↔ 문서 동기화 + Git 커밋',
    output: `Phase 1: 분석
  → 구현 코드 vs SPEC 비교 완료
  → 차이점: 없음 ✅

Phase 2: 문서 동기화
  → README.md 업데이트
  → API 문서 자동 생성
  → CHANGELOG.md 항목 추가

Phase 3: Git 커밋
  → feat(auth): JWT 기반 로그인 구현
     - 이메일/패스워드 검증
     - JWT 토큰 발급·검증
     - bcrypt 패스워드 해싱
     Tests: 21/21 passed | TRUST-5: ✅

Phase 4: 완료 요약
  → 변경 파일: 8개
  → 테스트 커버리지: 94%`,
    benefit: '문서·코드·Git이 항상 동기화 상태 유지',
  },
];

export default function PlanRunSyncDiagram() {
  const [active, setActive] = useState('plan');
  const [showLoop, setShowLoop] = useState(false);
  const cmd = COMMANDS.find(c => c.id === active);

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-green-50 border border-green-200 rounded-lg p-2">
        💡 <strong>plan → run → sync</strong>: MoAI-ADK의 핵심 워크플로. 명세서 기반 TDD 자동화
      </div>

      {/* 전체 흐름 */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {COMMANDS.map((c, i) => (
          <div key={c.id} className="flex items-center gap-1.5">
            {i > 0 && <div className="text-gray-400 font-bold text-lg">→</div>}
            <button onClick={() => setActive(c.id)}
              className="flex flex-col items-center px-4 py-2.5 rounded-xl border-2 transition-all min-w-[88px]"
              style={{
                borderColor: active === c.id ? c.color : '#e5e7eb',
                backgroundColor: active === c.id ? c.color : 'white',
              }}>
              <span className="text-xl">{c.icon}</span>
              <span className="font-mono text-xs font-bold mt-1" style={{ color: active === c.id ? 'white' : c.color }}>
                {c.cmd}
              </span>
            </button>
          </div>
        ))}
        {/* 자율 모드 */}
        <div className="text-gray-400 font-bold text-lg">→</div>
        <div className="flex flex-col items-center px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 min-w-[88px]">
          <span className="text-xl">🤖</span>
          <span className="font-mono text-xs font-bold text-gray-400 mt-1">/moai</span>
          <span className="text-xs text-gray-400">자율모드</span>
        </div>
      </div>

      {/* 현재 명령 상세 */}
      <div className="border-2 rounded-xl overflow-hidden" style={{ borderColor: cmd.color }}>
        <div className="text-white px-4 py-2 flex items-center gap-2" style={{ backgroundColor: cmd.color }}>
          <span className="text-lg">{cmd.icon}</span>
          <span className="font-mono font-bold">{cmd.cmd}</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="text-xs text-gray-600">{cmd.desc}</div>
          <div>
            <div className="text-xs font-bold text-gray-600 mb-1">실행 결과</div>
            <pre className="text-xs font-mono bg-gray-900 text-green-300 rounded-xl p-3 leading-relaxed overflow-x-auto">{cmd.output}</pre>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs text-blue-800">
            💡 {cmd.benefit}
          </div>
        </div>
      </div>

      {/* Loop Engine 시각화 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button onClick={() => setShowLoop(!showLoop)}
          className="w-full px-4 py-2.5 bg-gray-50 text-left text-xs font-bold text-gray-700 flex justify-between items-center hover:bg-gray-100">
          🔁 Loop Engine — TRUST-5 통과까지 자율 반복
          <span>{showLoop ? '▲' : '▼'}</span>
        </button>
        {showLoop && (
          <div className="p-4">
            <div className="flex items-center gap-1 flex-wrap">
              {[
                { label: '테스트 작성', icon: '✍️', color: '#3b82f6' },
                { label: '구현', icon: '💻', color: '#10b981' },
                { label: '테스트 실행', icon: '🧪', color: '#8b5cf6' },
                { label: 'TRUST-5', icon: '🔍', color: '#f59e0b' },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-1">
                  {i > 0 && <div className="text-gray-400">→</div>}
                  <div className="flex flex-col items-center bg-white border rounded-lg px-2 py-1.5 text-center" style={{ borderColor: s.color + '60' }}>
                    <span>{s.icon}</span>
                    <span className="text-xs text-gray-600 mt-0.5">{s.label}</span>
                  </div>
                </div>
              ))}
              <div className="text-gray-400">→</div>
              <div className="flex flex-col gap-1">
                <div className="bg-green-100 border border-green-300 rounded-lg px-2 py-1 text-xs text-green-700 font-bold">✅ 통과 → 다음 마일스톤</div>
                <div className="bg-red-100 border border-red-300 rounded-lg px-2 py-1 text-xs text-red-700">❌ 실패 → 구현으로 재시도</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-5 gap-1 text-center text-xs">
              {[
                { letter: 'T', label: 'Tested', icon: '🧪', desc: '커버리지 80%+' },
                { letter: 'R', label: 'Reviewed', icon: '👁', desc: '코드 리뷰 완료' },
                { letter: 'U', label: 'Understood', icon: '📖', desc: '이해 가능한 코드' },
                { letter: 'S', label: 'Secured', icon: '🔒', desc: '보안 취약점 없음' },
                { letter: 'T', label: 'Typed', icon: '📝', desc: '타입 안전성' },
              ].map(({ letter, label, icon, desc }) => (
                <div key={label} className="border border-amber-200 bg-amber-50 rounded-lg p-1.5">
                  <div className="text-lg font-bold text-amber-700">{letter}</div>
                  <div className="text-amber-600 font-bold">{icon}</div>
                  <div className="text-gray-600 leading-tight">{label}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
