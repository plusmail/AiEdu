import { useState } from 'react';

const PHASES = [
  {
    id: 'explore', icon: '🔍', label: '탐색 (Explore)', color: '#3b82f6',
    desc: '먼저 코드베이스를 이해하고\n작업 범위를 파악합니다.',
    tips: [
      '"이 코드베이스 구조 파악해줘"',
      '"인증 관련 파일이 어디 있어?"',
      '"현재 버그가 왜 발생하는지 분석해줘"',
    ],
    tools: ['Read', 'Bash(find)', 'Bash(grep)', 'Bash(git log)'],
    warning: '구현하기 전에 반드시 탐색부터!',
  },
  {
    id: 'plan', icon: '📋', label: '계획 (Plan)', color: '#8b5cf6',
    desc: '구현 전에 접근 방법을 계획하고\n인간의 검토를 받습니다.',
    tips: [
      '"계획만 알려줘, 아직 구현하지 마"',
      '"어떤 파일을 어떻게 수정할지 먼저 설명해줘"',
      '"위험한 변경 사항이 있는지 체크해줘"',
    ],
    tools: ['(도구 사용 없음 - 계획만 출력)'],
    warning: '계획 단계를 건너뛰면 의도치 않은 변경 발생!',
  },
  {
    id: 'code', icon: '💻', label: '구현 (Code)', color: '#10b981',
    desc: '계획에 따라 코드를 작성하고\n테스트로 검증합니다.',
    tips: [
      '"계획대로 구현해줘"',
      '"테스트 먼저 작성하고 구현해줘 (TDD)"',
      '"한 번에 하나씩 단계적으로 진행해줘"',
    ],
    tools: ['Write', 'Read', 'Bash(npm test)', 'Bash(npm run lint)'],
    warning: '한 번에 너무 많이 변경하지 말 것!',
  },
  {
    id: 'commit', icon: '📦', label: '커밋 (Commit)', color: '#f59e0b',
    desc: '의미 있는 단위로 커밋하고\n변경 사항을 정리합니다.',
    tips: [
      '"변경사항 요약해서 커밋해줘"',
      '"커밋 메시지 컨벤션에 맞게 작성해줘"',
      '"PR 설명도 작성해줘"',
    ],
    tools: ['Bash(git add)', 'Bash(git commit)', 'Bash(gh pr create)'],
    warning: 'feat/fix/docs 등 prefix 사용 권장',
  },
];

export default function WorkflowDiagram() {
  const [active, setActive] = useState('explore');
  const phase = PHASES.find(p => p.id === active);

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-purple-50 border border-purple-200 rounded-lg p-2">
        💡 <strong>탐색 → 계획 → 구현 → 커밋</strong> 순서를 지키면 실수를 줄이고 품질이 높아집니다
      </div>

      {/* 단계 선택 */}
      <div className="flex gap-2 flex-wrap">
        {PHASES.map((p, i) => (
          <div key={p.id} className="flex items-center gap-1">
            {i > 0 && <div className="text-gray-300 font-bold">→</div>}
            <button onClick={() => setActive(p.id)}
              className="flex flex-col items-center px-3 py-2 rounded-xl border-2 transition-all min-w-[72px]"
              style={{
                borderColor: active === p.id ? p.color : '#e5e7eb',
                backgroundColor: active === p.id ? p.color + '15' : 'white',
              }}>
              <span className="text-xl">{p.icon}</span>
              <span className="text-xs font-bold mt-0.5" style={{ color: active === p.id ? p.color : '#6b7280' }}>
                {p.label.split(' ')[0]}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* 현재 단계 상세 */}
      <div className="border-2 rounded-xl overflow-hidden" style={{ borderColor: phase.color }}>
        <div className="text-white px-4 py-3 flex items-center gap-3"
          style={{ backgroundColor: phase.color }}>
          <span className="text-2xl">{phase.icon}</span>
          <div>
            <div className="font-bold">{phase.label}</div>
            <div className="text-xs opacity-80 whitespace-pre-line mt-0.5">{phase.desc}</div>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {/* 사용 예시 */}
          <div>
            <div className="text-xs font-bold text-gray-700 mb-1">💬 Claude에게 이렇게 말하세요</div>
            <div className="space-y-1">
              {phase.tips.map(tip => (
                <div key={tip} className="text-xs bg-gray-900 text-green-300 rounded-lg px-3 py-1.5 font-mono">
                  &gt; {tip}
                </div>
              ))}
            </div>
          </div>
          {/* 사용 도구 */}
          <div>
            <div className="text-xs font-bold text-gray-700 mb-1">🔧 주로 사용하는 도구</div>
            <div className="flex gap-1.5 flex-wrap">
              {phase.tools.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                  style={{ backgroundColor: phase.color + '20', color: phase.color, border: `1px solid ${phase.color}40` }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* 경고 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-yellow-800">
            ⚠️ {phase.warning}
          </div>
        </div>
      </div>

      {/* 파이프 활용 */}
      <div className="border border-gray-200 rounded-xl p-4">
        <div className="text-xs font-bold text-gray-700 mb-2">🔗 파이프(|)로 강력한 자동화</div>
        <div className="space-y-1.5 text-xs">
          {[
            { cmd: 'git diff origin/main | claude -p "코드 리뷰해줘"', desc: 'PR 자동 리뷰' },
            { cmd: 'npm test 2>&1 | claude -p "실패 원인 분석"', desc: '테스트 실패 분석' },
            { cmd: 'cat error.log | claude -p "에러 패턴 분류"', desc: '로그 자동 분석' },
          ].map(({ cmd, desc }) => (
            <div key={cmd} className="flex items-start gap-2">
              <span className="text-blue-500 font-bold flex-shrink-0">$</span>
              <div>
                <div className="font-mono text-gray-800">{cmd}</div>
                <div className="text-gray-400"># {desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
