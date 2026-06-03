import { useState } from 'react';

const FRONTMATTER_FIELDS = [
  { field: 'name',        required: true,  desc: '에이전트 고유 식별자',        example: 'security-checker',     color: '#ef4444' },
  { field: 'description', required: true,  desc: '기능 설명 (에이전트 선택에 사용)', example: '보안 취약점 검사 전문', color: '#f59e0b' },
  { field: 'tools',       required: false, desc: '허용 도구 목록',              example: '[Read, Bash]',          color: '#3b82f6' },
  { field: 'model',       required: false, desc: '사용할 Claude 모델',          example: 'claude-sonnet-4-6',    color: '#8b5cf6' },
  { field: 'context',     required: false, desc: 'fork = 메인 컨텍스트와 격리', example: 'fork | inherit',        color: '#10b981' },
  { field: 'max_tokens',  required: false, desc: '최대 출력 토큰 제한',         example: '8192',                  color: '#6366f1' },
];

const AGENT_TYPES = [
  {
    type: '보안 검사', icon: '🔒', color: '#ef4444',
    tools: ['Read', 'Bash'],
    prompt: 'OWASP Top10 기준으로 취약점을 검사합니다.\n심각도: Critical / High / Medium / Low',
  },
  {
    type: '문서화', icon: '📝', color: '#3b82f6',
    tools: ['Read', 'Write'],
    prompt: 'JSDoc 형식으로 함수·클래스에 주석을 자동 생성합니다.\n기존 코드를 변경하지 않고 주석만 추가합니다.',
  },
  {
    type: '테스트 생성', icon: '🧪', color: '#10b981',
    tools: ['Read', 'Write', 'Bash'],
    prompt: '함수 시그니처를 분석해 Jest 테스트 코드를 생성합니다.\n엣지 케이스와 경계값을 포함합니다.',
  },
];

const TEMPLATE = `---
name: security-checker
description: OWASP Top10 기반 보안 취약점 검사 에이전트
tools: [Read, Bash]
model: claude-sonnet-4-6
context: fork
---

# 보안 검사 에이전트

당신은 사이버 보안 전문가입니다.

## 검사 항목
- SQL Injection (A03)
- XSS Cross-Site Scripting (A07)
- 하드코딩된 시크릿·API 키
- 취약한 의존성 패키지 (npm audit)

## 출력 형식
각 취약점을 다음 형식으로 보고하세요:
- 심각도: Critical / High / Medium / Low
- 파일 위치: 파일명:줄번호
- 설명: 취약점 내용
- 수정 방법: 권장 해결책`;

export default function CustomAgentDiagram() {
  const [tab, setTab] = useState('structure');
  const [activeAgent, setActiveAgent] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['structure','파일 구조'], ['frontmatter','프론트매터'], ['examples','예제']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'structure' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">에이전트 정의 파일 위치 및 전체 구조</div>
          <div className="bg-gray-950 rounded-xl p-3 font-mono text-xs text-gray-300 space-y-0.5">
            {[
              { indent: 0, text: '.claude/', color: '#9ca3af' },
              { indent: 1, text: 'agents/', color: '#9ca3af' },
              { indent: 2, text: 'security-checker.md', color: '#ef4444', badge: '커스텀' },
              { indent: 2, text: 'doc-writer.md', color: '#3b82f6', badge: '커스텀' },
              { indent: 2, text: 'test-generator.md', color: '#10b981', badge: '커스텀' },
              { indent: 1, text: 'skills/', color: '#9ca3af' },
              { indent: 1, text: 'settings.json', color: '#f59e0b' },
              { indent: 0, text: '~/.claude/', color: '#9ca3af' },
              { indent: 1, text: 'agents/', color: '#9ca3af' },
              { indent: 2, text: 'my-personal-agent.md', color: '#8b5cf6', badge: '전역' },
            ].map((line, i) => (
              <div key={i} className="flex items-center gap-2" style={{ paddingLeft: line.indent * 16 }}>
                <span style={{ color: line.color }}>{line.indent > 0 ? (line.indent === 1 ? '├─ ' : '│  ├─ ') : ''}{line.text}</span>
                {line.badge && (
                  <span className="text-xs px-1.5 py-0.5 rounded font-bold"
                    style={{ backgroundColor: line.color + '30', color: line.color }}>{line.badge}</span>
                )}
              </div>
            ))}
          </div>
          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">{TEMPLATE}</pre>
        </div>
      )}

      {tab === 'frontmatter' && (
        <div className="space-y-2">
          <div className="text-xs text-gray-500">YAML 프론트매터 필드 완전 가이드</div>
          {FRONTMATTER_FIELDS.map(f => (
            <div key={f.field} className="flex items-start gap-3 p-3 rounded-xl border-2"
              style={{ borderColor: f.color + '50', backgroundColor: f.color + '08' }}>
              <code className="font-mono text-xs px-2 py-1 rounded text-white font-bold flex-shrink-0"
                style={{ backgroundColor: f.color }}>{f.field}</code>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-700">{f.desc}</span>
                  {f.required && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">필수</span>}
                </div>
                <code className="text-xs text-gray-400 mt-0.5 block font-mono">{f.example}</code>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'examples' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {AGENT_TYPES.map((a, i) => (
              <button key={i} onClick={() => setActiveAgent(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${activeAgent === i ? 'text-white' : 'bg-white opacity-60'}`}
                style={{ borderColor: a.color, backgroundColor: activeAgent === i ? a.color : undefined }}>
                {a.icon} {a.type}
              </button>
            ))}
          </div>
          {(() => {
            const a = AGENT_TYPES[activeAgent];
            return (
              <div className="rounded-xl border-2 p-4 space-y-3"
                style={{ borderColor: a.color, backgroundColor: a.color + '08' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{a.icon}</span>
                  <span className="font-bold" style={{ color: a.color }}>{a.type} 에이전트</span>
                </div>
                <div className="text-xs text-gray-600 font-medium">허용 도구:</div>
                <div className="flex gap-1">
                  {a.tools.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded font-bold text-white"
                      style={{ backgroundColor: a.color }}>{t}</span>
                  ))}
                </div>
                <div className="text-xs text-gray-600 font-medium">프롬프트 핵심:</div>
                <div className="bg-gray-50 rounded-lg p-2 text-xs text-gray-600 whitespace-pre-line">{a.prompt}</div>
                <div className="text-xs text-gray-400">
                  호출: <code className="bg-gray-100 px-1 rounded">claude --agent {a.type === '보안 검사' ? 'security-checker' : a.type === '문서화' ? 'doc-writer' : 'test-generator'} -p "작업 설명"</code>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
