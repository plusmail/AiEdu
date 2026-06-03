import { useState } from 'react';

const PHASES = [
  {
    num: 1, icon: '🔍', label: '분석 및 계획', color: '#6366f1',
    tasks: ['구현된 코드 전체 분석', 'SPEC과 실제 구현 비교', '불일치 항목 목록 작성', '문서화 범위 결정'],
    output: '분석 리포트 (내부)',
  },
  {
    num: 2, icon: '📝', label: '문서 동기화', color: '#3b82f6',
    tasks: ['README.md 자동 업데이트', 'API.md 함수·엔드포인트 문서 생성', 'ARCHITECTURE.md 구조도 갱신', 'CHANGELOG.md 변경 이력 추가'],
    output: '문서 파일들 업데이트',
  },
  {
    num: 3, icon: '💾', label: '깃 커밋 생성', color: '#10b981',
    tasks: ['변경된 파일 자동 스테이징', '의미 있는 커밋 메시지 생성', 'Co-Authored-By 메타데이터 추가', '커밋 실행'],
    output: 'Git 커밋 완료',
  },
  {
    num: 4, icon: '📊', label: '완료 요약 보고', color: '#f59e0b',
    tasks: ['개발 시간 및 파일 수 통계', '테스트 결과 요약', 'TRUST-5 달성 여부', '다음 작업 제안'],
    output: '완료 리포트 출력',
  },
];

export default function SyncFlowDiagram() {
  const [active, setActive] = useState(0);

  const p = PHASES[active];

  return (
    <div className="space-y-4">
      {/* 단계 타임라인 */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {PHASES.map((phase, i) => (
          <div key={phase.num} className="flex items-center gap-1 flex-shrink-0">
            <button onClick={() => setActive(i)}
              className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all min-w-[72px] ${active === i ? 'shadow-lg scale-[1.05]' : 'opacity-60 hover:opacity-90'}`}
              style={{ borderColor: active === i ? phase.color : '#e5e7eb', backgroundColor: active === i ? phase.color + '12' : 'white' }}>
              <span className="text-2xl">{phase.icon}</span>
              <span className="text-xs font-bold mt-1" style={{ color: phase.color }}>Phase {phase.num}</span>
              <span className="text-xs text-gray-400 mt-0.5 text-center leading-tight">{phase.label}</span>
            </button>
            {i < PHASES.length - 1 && <span className="text-gray-300 text-sm">→</span>}
          </div>
        ))}
      </div>

      {/* 상세 내용 */}
      <div className="rounded-xl border-2 p-4 space-y-3"
        style={{ borderColor: p.color, backgroundColor: p.color + '08' }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{p.icon}</span>
          <div>
            <div className="font-bold" style={{ color: p.color }}>Phase {p.num}: {p.label}</div>
          </div>
        </div>
        <div className="space-y-1.5">
          {p.tasks.map((t, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: p.color }}>{i + 1}</span>
              <span className="text-gray-700">{t}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs pt-1 border-t" style={{ borderColor: p.color + '30' }}>
          <span className="font-bold" style={{ color: p.color }}>출력:</span>
          <span className="text-gray-600">{p.output}</span>
        </div>
      </div>

      {/* 커밋 메시지 예시 */}
      <div>
        <div className="text-xs font-bold text-gray-600 mb-1">자동 생성되는 커밋 메시지 예시</div>
        <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">{`feat: HTML5 스네이크 게임 구현 완료

- Snake, Food, Game 핵심 클래스 구현
- requestAnimationFrame 기반 60fps 게임 루프
- EARS 수용 테스트 6/6 통과
- TRUST-5 전 항목 달성 (테스트 커버리지 95%)
- 테스트 44개 전체 통과

Co-Authored-By: MoAI-ADK Loop Engine <noreply@moai>`}</pre>
      </div>

      {/* 전체 명령어 */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs">
        <div className="font-bold text-green-700 mb-1.5">/moai sync 실행 한 번으로 자동 처리</div>
        <div className="space-y-1 text-gray-600">
          <div>✅ README, API 문서, CHANGELOG 자동 업데이트</div>
          <div>✅ 의미 있는 커밋 메시지 자동 생성</div>
          <div>✅ SPEC ↔ 코드 불일치 자동 감지</div>
        </div>
      </div>
    </div>
  );
}
