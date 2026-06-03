import { useState } from 'react';

const PIPES = [
  { cmd: 'cat error.log | claude -p "에러 패턴 분석"', icon: '📋', tag: '로그 분석', color: '#3b82f6' },
  { cmd: 'git diff | claude -p "변경사항 리뷰해줘"', icon: '🔀', tag: 'PR 리뷰', color: '#8b5cf6' },
  { cmd: 'npm test 2>&1 | claude -p "실패 원인 찾아줘"', icon: '🧪', tag: '테스트 분석', color: '#10b981' },
  { cmd: 'ls src/ | claude -p "구조 파악 후 README 초안 써줘"', icon: '📁', tag: '문서화', color: '#f59e0b' },
];

const CI_EXAMPLE = `# .github/workflows/ai-review.yml
name: AI Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: AI 코드 리뷰
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/main...HEAD > changes.diff
          cat changes.diff | claude -p "보안 취약점과 버그 검사해줘" \\
            --output-format json \\
            --dangerously-skip-permissions \\
            --model claude-haiku-4-5`;

const OUTPUTS = [
  { fmt: 'text', desc: '사람이 읽기 좋은 텍스트', icon: '📄', color: '#6b7280' },
  { fmt: 'json', desc: '파이프라인 자동 처리용 JSON', icon: '{}', color: '#10b981' },
  { fmt: 'stream-json', desc: '스트리밍 JSON (실시간 처리)', icon: '⚡', color: '#3b82f6' },
];

export default function NonInteractiveDiagram() {
  const [tab, setTab] = useState('pipe');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['pipe','파이프 활용'], ['cicd','CI/CD 통합'], ['output','출력 형식']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'pipe' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">Unix 파이프(|)로 어떤 출력이든 Claude에게 전달</div>
          {/* 흐름 시각화 */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-x-auto">
            {['입력 데이터\n(파일·명령 출력)', '|  파이프', 'claude -p "..."', '분석 결과 출력'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <div className={`px-2 py-1.5 rounded-lg text-xs font-bold text-center whitespace-pre-line ${i === 1 ? 'bg-gray-200 text-gray-600' : i === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                  {s}
                </div>
                {i < 3 && <span className="text-gray-300">→</span>}
              </div>
            ))}
          </div>
          {/* 파이프 예시들 */}
          <div className="space-y-2">
            {PIPES.map((p, i) => (
              <div key={i} className="rounded-xl border overflow-hidden"
                style={{ borderColor: p.color + '50' }}>
                <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white"
                  style={{ backgroundColor: p.color }}>
                  {p.icon} {p.tag}
                </div>
                <pre className="bg-gray-950 text-green-300 text-xs px-3 py-2 font-mono">{p.cmd}</pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'cicd' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">GitHub Actions에서 Claude를 자동화 파이프라인으로 활용</div>
          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {CI_EXAMPLE}
          </pre>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { label: '--dangerously-skip-permissions', desc: 'CI 환경에서 권한 프롬프트 건너뜀\n반드시 격리 환경에서만 사용!', color: '#ef4444' },
              { label: '--output-format json', desc: '결과를 JSON으로 출력\n파이프라인에서 자동 파싱 가능', color: '#10b981' },
              { label: 'exit code 처리', desc: '0=성공, 1=소프트 실패\n파이프라인 분기 처리에 활용', color: '#3b82f6' },
              { label: 'claude-haiku-4-5 사용', desc: 'CI는 수백 번 실행 → 비용 절약\n단순 분석엔 Haiku로 충분', color: '#f59e0b' },
            ].map(item => (
              <div key={item.label} className="p-2.5 rounded-xl border"
                style={{ backgroundColor: item.color + '08', borderColor: item.color + '40' }}>
                <code className="font-bold text-xs" style={{ color: item.color }}>{item.label}</code>
                <div className="text-gray-500 mt-0.5 whitespace-pre-line">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'output' && (
        <div className="space-y-3">
          {OUTPUTS.map(o => (
            <div key={o.fmt} className="rounded-xl border-2 overflow-hidden"
              style={{ borderColor: o.color + '60' }}>
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-white"
                style={{ backgroundColor: o.color }}>
                <span className="font-mono">{o.fmt}</span>
                <span>— {o.desc}</span>
              </div>
              <pre className="bg-gray-950 text-green-300 text-xs px-3 py-2 font-mono">
                {`claude -p "분석해줘" --output-format ${o.fmt}`}
              </pre>
            </div>
          ))}
          <div className="text-xs bg-blue-50 border border-blue-200 rounded-lg p-2">
            💡 <strong>json</strong> 출력은 <code className="bg-blue-100 px-1 rounded">| jq '.result'</code>처럼 jq와 조합해 파이프라인에서 특정 필드만 추출할 수 있습니다.
          </div>
        </div>
      )}
    </div>
  );
}
