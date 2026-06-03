import { useState } from 'react';

const MODES = [
  {
    id: 'interactive', icon: '💬', label: '대화형 모드', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe',
    desc: '사람과 AI가 실시간 대화하며 작업',
    usage: 'claude',
    steps: ['터미널에서 claude 실행', '프롬프트 입력 대기 (>)', '메시지 입력 → 응답 확인', '다음 메시지 입력 반복', '/clear, /compact 등 슬래시 명령 사용'],
    when: '코드 리뷰, 설계 논의, 복잡한 버그 분석',
  },
  {
    id: 'noninteractive', icon: '🤖', label: '비대화형 모드', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe',
    desc: '한 번의 요청 → 응답 후 종료 (자동화용)',
    usage: 'claude -p "질문" --output-format json',
    steps: ['-p 플래그로 입력 전달', '응답 생성 후 즉시 종료', 'exit code로 성공/실패 판단', '파이프(|)로 다른 명령과 연결', 'CI/CD 파이프라인에 삽입'],
    when: 'CI/CD 자동화, 스크립트 통합, 배치 처리',
  },
];

const FLAGS = [
  { flag: '-p / --print',        desc: '비대화형 실행 (응답 후 종료)',     color: '#7c3aed' },
  { flag: '--output-format',     desc: 'json | text | stream-json',       color: '#3b82f6' },
  { flag: '--model',             desc: '사용할 Claude 모델 지정',           color: '#059669' },
  { flag: '--max-tokens',        desc: '최대 출력 토큰 수 제한',             color: '#f59e0b' },
  { flag: '--dangerously-skip-permissions', desc: '권한 확인 건너뜀 (CI 전용)', color: '#ef4444' },
  { flag: '--resume',            desc: '중단된 세션 재개',                   color: '#6366f1' },
];

const SHORTCUTS = [
  { key: 'Ctrl + C',   action: '현재 응답 중단',       icon: '⛔' },
  { key: 'Ctrl + L',   action: '화면 지우기',           icon: '🧹' },
  { key: 'Esc Esc',    action: '멀티라인 입력 모드',    icon: '📝' },
  { key: '↑ / ↓',     action: '이전/다음 명령 이력',   icon: '📋' },
  { key: '/clear',     action: '컨텍스트 초기화',       icon: '🔄' },
  { key: '/compact',   action: '컨텍스트 압축',         icon: '🗜️' },
  { key: '/rewind',    action: '체크포인트 복구',       icon: '⏪' },
  { key: '/help',      action: '도움말 표시',           icon: '❓' },
];

export default function CliModesDiagram() {
  const [tab, setTab] = useState('modes');
  const [active, setActive] = useState('interactive');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['modes','실행 모드'], ['flags','플래그'], ['shortcuts','단축키']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'modes' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {MODES.map(m => (
              <button key={m.id} onClick={() => setActive(m.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${active === m.id ? 'shadow-lg scale-[1.02]' : 'opacity-60 hover:opacity-90'}`}
                style={{ borderColor: active === m.id ? m.color : '#e5e7eb', backgroundColor: active === m.id ? m.bg : 'white' }}>
                <div className="text-2xl mb-1">{m.icon}</div>
                <div className="font-bold text-sm" style={{ color: m.color }}>{m.label}</div>
                <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
              </button>
            ))}
          </div>

          {(() => {
            const m = MODES.find(x => x.id === active);
            return m ? (
              <div className="rounded-xl border-2 p-4 space-y-3"
                style={{ borderColor: m.color, backgroundColor: m.bg }}>
                <div className="space-y-1.5">
                  {m.steps.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: m.color }}>{i + 1}</span>
                      <span className="text-gray-700">{s}</span>
                    </div>
                  ))}
                </div>
                <pre className="bg-gray-950 text-green-300 text-xs rounded-lg p-2.5 font-mono">{m.usage}</pre>
                <div className="text-xs" style={{ color: m.color }}>
                  ✅ 적합한 상황: {m.when}
                </div>
              </div>
            ) : null;
          })()}

          {/* 파이프 예시 */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
            <div className="text-xs font-bold text-gray-600 mb-2">⚡ 파이프(|)로 다른 도구와 연결</div>
            <div className="space-y-1.5">
              {[
                { cmd: 'cat error.log | claude -p "에러 원인 분석해줘"', desc: '로그 분석' },
                { cmd: 'git diff | claude -p "변경사항 리뷰해줘"', desc: '코드 리뷰' },
                { cmd: 'npm test 2>&1 | claude -p "실패 원인 찾아줘"', desc: '테스트 분석' },
              ].map((ex, i) => (
                <div key={i}>
                  <pre className="bg-gray-950 text-green-300 text-xs rounded px-2 py-1 font-mono">{ex.cmd}</pre>
                  <div className="text-xs text-gray-400 mt-0.5 ml-1">→ {ex.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'flags' && (
        <div className="space-y-2">
          {FLAGS.map(f => (
            <div key={f.flag} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <code className="font-mono text-xs px-2 py-1 rounded font-bold text-white flex-shrink-0"
                style={{ backgroundColor: f.color }}>{f.flag}</code>
              <span className="text-xs text-gray-600">{f.desc}</span>
            </div>
          ))}
          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed mt-2">{`# 비대화형 + JSON 출력
claude -p "src/ 보안 검사" --output-format json

# 모델 지정 + 토큰 제한
claude -p "요약해줘" --model claude-haiku-4-5 --max-tokens 500

# CI/CD에서 권한 자동 승인 (격리 환경에서만!)
claude -p "테스트 실행" --dangerously-skip-permissions`}</pre>
        </div>
      )}

      {tab === 'shortcuts' && (
        <div className="grid grid-cols-2 gap-2">
          {SHORTCUTS.map(s => (
            <div key={s.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-xl flex-shrink-0">{s.icon}</span>
              <div>
                <code className="font-mono text-xs bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded font-bold">{s.key}</code>
                <div className="text-xs text-gray-500 mt-0.5">{s.action}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
