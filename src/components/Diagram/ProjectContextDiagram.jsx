import { useState } from 'react';

const AUTO_READS = [
  { icon: '📁', label: '디렉토리 구조', desc: '파일 트리 자동 파악', color: '#3b82f6', example: 'src/, tests/, package.json ...' },
  { icon: '🔀', label: 'Git 상태',      desc: '브랜치·커밋·변경 파악', color: '#f59e0b', example: 'main ← feature/login (3 commits)' },
  { icon: '📋', label: 'CLAUDE.md',     desc: '프로젝트 규칙 자동 로드', color: '#8b5cf6', example: 'TypeScript strict, no console.log ...' },
  { icon: '📦', label: '설정 파일',     desc: '기술 스택 자동 인식', color: '#10b981', example: 'package.json, requirements.txt ...' },
];

const GIT_ACTIONS = [
  { action: '"변경사항 커밋해줘"',  cmd: 'git add . && git commit -m "..."',   icon: '💾' },
  { action: '"PR 만들어줘"',        cmd: 'gh pr create --title "..." --body "..."', icon: '🔁' },
  { action: '"최근 변경사항 보여줘"', cmd: 'git log --oneline -10',             icon: '📜' },
  { action: '"현재 브랜치 알려줘"',  cmd: 'git branch --show-current',          icon: '🔀' },
];

export default function ProjectContextDiagram() {
  const [active, setActive] = useState(null);
  const [showGit, setShowGit] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 text-center">클로드가 <code className="bg-gray-100 px-1 rounded">claude</code> 실행 시 자동으로 파악하는 것들</div>

      {/* 중앙 Claude + 자동 읽기 아이템 */}
      <div className="relative">
        {/* Claude 중심 */}
        <div className="flex justify-center mb-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white shadow-lg">
            <span className="text-2xl">🤖</span>
            <span className="text-xs font-bold mt-0.5">Claude</span>
          </div>
        </div>

        {/* 자동 파악 항목 */}
        <div className="grid grid-cols-2 gap-2">
          {AUTO_READS.map((item, i) => (
            <button key={i} onClick={() => setActive(active === i ? null : i)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${active === i ? 'shadow-md scale-[1.02]' : 'hover:shadow-sm'}`}
              style={{ borderColor: active === i ? item.color : '#e5e7eb', backgroundColor: active === i ? item.color + '10' : '#f9fafb' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{item.icon}</span>
                <span className="font-bold text-xs" style={{ color: item.color }}>{item.label}</span>
              </div>
              <div className="text-xs text-gray-500">{item.desc}</div>
              {active === i && (
                <div className="mt-2 text-xs font-mono bg-gray-900 text-green-300 rounded px-2 py-1">
                  {item.example}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CLAUDE.md 구조 예시 */}
      <div className="rounded-xl border border-purple-200 overflow-hidden">
        <div className="bg-purple-600 text-white text-xs px-3 py-2 font-bold flex items-center gap-2">
          <span>📋</span> CLAUDE.md — 프로젝트 규칙의 영구 저장소
        </div>
        <pre className="bg-gray-950 text-green-300 text-xs p-3 font-mono leading-relaxed">{`# 코딩 컨벤션
- TypeScript strict mode 사용
- 함수는 화살표 함수 선호
- 테스트 커버리지 80% 이상

# 금지 사항
- console.log 프로덕션 코드에 포함 금지
- any 타입 사용 금지

# 명령어
- 빌드: npm run build
- 테스트: npm test

# @import로 다른 파일 포함
@import ./rules/security.md`}</pre>
      </div>

      {/* Git 통합 */}
      <div>
        <button onClick={() => setShowGit(s => !s)}
          className="w-full flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-xl text-xs font-bold text-orange-700">
          <span>🔀 Git 통합 — 클로드가 직접 처리하는 명령들</span>
          <span>{showGit ? '▲' : '▼'}</span>
        </button>
        {showGit && (
          <div className="mt-2 space-y-2">
            {GIT_ACTIONS.map((g, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xl flex-shrink-0">{g.icon}</span>
                <div className="flex-1">
                  <div className="text-xs font-bold text-gray-700">"{g.action}"</div>
                  <code className="text-xs font-mono text-purple-600 mt-0.5 block">{g.cmd}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
