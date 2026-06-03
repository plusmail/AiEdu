import { useState } from 'react';

const STYLES = [
  {
    id: 'default', icon: '📄', label: '기본 (Default)', color: '#6b7280',
    sample: `src/auth.ts 분석이 완료되었습니다.

**주요 발견사항:**
- JWT 토큰 만료 검증이 누락되어 있습니다
- 비밀번호 해싱에 bcrypt 대신 MD5를 사용 중

**권장 수정사항:**
1. \`jwt.verify()\`에 expiry 옵션 추가
2. bcryptjs 라이브러리로 교체`,
  },
  {
    id: 'concise', icon: '⚡', label: '간결 (Concise)', color: '#3b82f6',
    sample: `JWT 만료 검증 누락 → jwt.verify() 수정 필요
MD5 비밀번호 해싱 → bcryptjs로 교체 필요`,
  },
  {
    id: 'json', icon: '{}', label: 'JSON 출력', color: '#10b981',
    sample: `{
  "analysis": {
    "file": "src/auth.ts",
    "issues": [
      {
        "severity": "Critical",
        "type": "missing_validation",
        "line": 42,
        "message": "JWT expiry not validated"
      }
    ]
  }
}`,
  },
  {
    id: 'markdown', icon: '✍️', label: '마크다운 보고서', color: '#8b5cf6',
    sample: `# 코드 분석 보고서

## 요약
| 항목 | 결과 |
|------|------|
| 심각도 | 🔴 Critical |
| 파일 | src/auth.ts |

## 세부 내용
JWT 토큰 만료 검증이 line 42에서 누락...`,
  },
];

const CUSTOM_STYLE = `# 출력 스타일 가이드
# .claude/styles/team-standard.md

## 응답 형식
항상 다음 순서로 응답하세요:
1. 한 줄 요약 (최대 50자)
2. 주요 변경사항 (불릿 리스트)
3. 주의사항 (있을 경우만)

## 금지 사항
- "물론입니다", "알겠습니다" 등 서론 금지
- 불필요한 마무리 인사 금지

## 코드 블록
반드시 언어 태그 포함: \`\`\`typescript`;

export default function OutputStyleDiagram() {
  const [active, setActive] = useState('default');
  const [showCustom, setShowCustom] = useState(false);

  const s = STYLES.find(x => x.id === active);

  return (
    <div className="space-y-4">
      {/* 스타일 선택 */}
      <div className="grid grid-cols-2 gap-2">
        {STYLES.map(style => (
          <button key={style.id} onClick={() => setActive(style.id)}
            className={`p-3 rounded-xl border-2 text-left transition-all ${active === style.id ? 'shadow-md scale-[1.02]' : 'opacity-60 hover:opacity-90'}`}
            style={{ borderColor: active === style.id ? style.color : '#e5e7eb', backgroundColor: active === style.id ? style.color + '10' : 'white' }}>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-lg" style={{ color: style.color }}>{style.icon}</span>
              <span className="font-bold text-xs" style={{ color: style.color }}>{style.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* 미리보기 */}
      {s && (
        <div className="rounded-xl border-2 overflow-hidden"
          style={{ borderColor: s.color }}>
          <div className="px-3 py-2 text-xs font-bold text-white flex items-center gap-2"
            style={{ backgroundColor: s.color }}>
            {s.icon} {s.label} — 출력 예시
          </div>
          <pre className="bg-gray-950 text-green-300 text-xs p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {s.sample}
          </pre>
        </div>
      )}

      {/* 변경 방법 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 space-y-2">
        <div className="text-xs font-bold text-blue-700">출력 스타일 변경 방법</div>
        <div className="space-y-1.5">
          {[
            { method: 'CLI 플래그', cmd: 'claude --output-format json -p "분석해줘"', color: '#10b981' },
            { method: 'settings.json', cmd: '{ "outputStyle": "concise" }', color: '#8b5cf6' },
            { method: '대화 중 요청', cmd: '"앞으로 JSON 형식으로만 답해줘"', color: '#f59e0b' },
          ].map(item => (
            <div key={item.method}>
              <span className="text-xs font-bold" style={{ color: item.color }}>{item.method}</span>
              <pre className="bg-gray-950 text-green-300 text-xs rounded px-2 py-1 mt-0.5 font-mono">{item.cmd}</pre>
            </div>
          ))}
        </div>
      </div>

      {/* 커스텀 스타일 */}
      <div>
        <button onClick={() => setShowCustom(s => !s)}
          className="w-full flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs font-bold text-purple-700">
          <span>✍️ 팀 표준 커스텀 스타일 만들기</span>
          <span>{showCustom ? '▲' : '▼'}</span>
        </button>
        {showCustom && (
          <pre className="bg-gray-950 text-green-300 text-xs rounded-b-xl p-3 font-mono leading-relaxed whitespace-pre-wrap">
            {CUSTOM_STYLE}
          </pre>
        )}
      </div>
    </div>
  );
}
