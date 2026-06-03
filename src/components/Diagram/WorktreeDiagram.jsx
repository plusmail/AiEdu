import { useState } from 'react';

const BRANCHES = [
  { id: 'main',      label: 'main',             color: '#6366f1', x: 50,  agent: null,          desc: '최종 통합 브랜치' },
  { id: 'auth',      label: 'feature/auth',     color: '#3b82f6', x: 20,  agent: '🔐 인증 에이전트', desc: '로그인·JWT·OAuth 구현' },
  { id: 'payment',   label: 'feature/payment',  color: '#10b981', x: 40,  agent: '💳 결제 에이전트', desc: '결제 API·PG 연동' },
  { id: 'dashboard', label: 'feature/dashboard',color: '#f59e0b', x: 60,  agent: '📊 대시보드 에이전트', desc: '차트·통계 UI' },
  { id: 'api',       label: 'feature/api',      color: '#8b5cf6', x: 80,  agent: '⚙️ API 에이전트',  desc: 'REST API 엔드포인트' },
];

const STAGES = [
  { id: 'create', label: '① 작업트리 생성', desc: '각 에이전트가 독립 디렉토리에서 작업 시작' },
  { id: 'work',   label: '② 병렬 개발',     desc: '4개 에이전트 동시 TDD 진행 — 파일 충돌 없음' },
  { id: 'pass',   label: '③ TRUST-5 통과',  desc: '각 브랜치가 독립적으로 품질 기준 통과' },
  { id: 'merge',  label: '④ 순차 머지',      desc: '오케스트레이터가 main에 충돌 없이 순차 통합' },
];

export default function WorktreeDiagram() {
  const [stage, setStage] = useState(0);
  const [hoveredBranch, setHoveredBranch] = useState(null);

  const worktreeBranches = BRANCHES.filter(b => b.id !== 'main');

  return (
    <div className="space-y-4">
      {/* SVG 브랜치 트리 */}
      <div className="bg-gray-950 rounded-xl p-4 overflow-x-auto">
        <svg viewBox="0 0 320 200" className="w-full" style={{ minWidth: 280 }}>
          {/* main 타임라인 */}
          <line x1="160" y1="20" x2="160" y2="180" stroke="#6366f1" strokeWidth="3" strokeDasharray={stage < 3 ? "6,3" : "none"} />
          <circle cx="160" cy="20" r="6" fill="#6366f1" />
          <text x="168" y="25" fill="#a5b4fc" fontSize="10" fontWeight="bold">main</text>

          {/* 피처 브랜치들 */}
          {worktreeBranches.map((b, i) => {
            const bx = 30 + i * 70;
            const byStart = 50;
            const byEnd   = stage >= 3 ? 160 : 150;
            const active  = stage >= 1;
            return (
              <g key={b.id}
                onMouseEnter={() => setHoveredBranch(b.id)}
                onMouseLeave={() => setHoveredBranch(null)}
                className="cursor-pointer">
                {/* 분기선 */}
                <line x1="160" y1="50" x2={bx} y2={byStart+10} stroke={b.color} strokeWidth="1.5" strokeDasharray="4,2" opacity={active?0.8:0.3} />
                {/* 브랜치 세로선 */}
                <line x1={bx} y1={byStart+10} x2={bx} y2={byEnd}
                  stroke={b.color} strokeWidth="2.5" opacity={active?1:0.2} />
                {/* 분기 시작점 */}
                <circle cx="160" cy="50" r="4" fill="#6366f1" />
                {/* 에이전트 노드 */}
                {stage >= 1 && (
                  <circle cx={bx} cy={byStart+30} r="12"
                    fill={hoveredBranch===b.id ? b.color : b.color+'88'}
                    stroke={b.color} strokeWidth="2" />
                )}
                {stage >= 2 && (
                  <circle cx={bx} cy={byEnd-10} r="6" fill="#10b981" stroke="white" strokeWidth="1.5" />
                )}
                {/* 머지선 */}
                {stage >= 3 && (
                  <line x1={bx} y1={byEnd} x2="160" y2="165" stroke={b.color} strokeWidth="1.5" strokeDasharray="3,2" />
                )}
                <text x={bx} y={byStart+5} textAnchor="middle" fill={b.color} fontSize="8" fontWeight="bold">
                  {b.label.replace('feature/','')}
                </text>
              </g>
            );
          })}

          {/* 머지 완료 노드 */}
          {stage >= 3 && (
            <>
              <circle cx="160" cy="165" r="8" fill="#10b981" stroke="white" strokeWidth="2" />
              <text x="170" y="168" fill="#6ee7b7" fontSize="9" fontWeight="bold">✓ 통합</text>
            </>
          )}

          {/* 시간축 */}
          <text x="5" y="55"  fill="#4b5563" fontSize="8">분기</text>
          <text x="5" y="90"  fill="#4b5563" fontSize="8">개발</text>
          <text x="5" y="145" fill="#4b5563" fontSize="8">통과</text>
          {stage >= 3 && <text x="5" y="168" fill="#4b5563" fontSize="8">머지</text>}
        </svg>
      </div>

      {/* hover 정보 */}
      {hoveredBranch && (
        <div className="text-xs text-center py-1 rounded-lg"
          style={{ backgroundColor: BRANCHES.find(b=>b.id===hoveredBranch)?.color+'20',
                   color: BRANCHES.find(b=>b.id===hoveredBranch)?.color }}>
          <strong>{BRANCHES.find(b=>b.id===hoveredBranch)?.agent}</strong>
          {' — '}{BRANCHES.find(b=>b.id===hoveredBranch)?.desc}
        </div>
      )}

      {/* 단계 선택 */}
      <div className="grid grid-cols-2 gap-2">
        {STAGES.map((s, i) => (
          <button key={s.id} onClick={() => setStage(i)}
            className={`p-2.5 rounded-xl border-2 text-left transition-all ${stage===i ? 'bg-indigo-50 border-indigo-400 shadow-sm' : 'bg-gray-50 border-gray-200'}`}>
            <div className={`text-xs font-bold ${stage===i ? 'text-indigo-700' : 'text-gray-600'}`}>{s.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.desc}</div>
          </button>
        ))}
      </div>

      {/* 명령어 */}
      <div>
        <div className="text-xs font-bold text-gray-600 mb-1">moai worktree 명령어</div>
        <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">
{`# 작업 트리 생성 (에이전트별 독립 디렉토리)
moai worktree create feature/auth
moai worktree create feature/payment

# 병렬 개발 현황 확인
moai worktree status

# 완료 후 main에 순차 머지
moai worktree merge feature/auth
moai worktree merge feature/payment

# 완료된 작업 트리 정리
moai worktree prune`}
        </pre>
      </div>
    </div>
  );
}
