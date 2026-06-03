import { useState } from 'react';

const LAYERS = [
  {
    id: 'context', icon: '💬', label: '컨텍스트 윈도우', sublabel: '휘발성 (세션 종료 시 소멸)',
    color: '#ef4444', size: '20만 토큰',
    desc: '현재 대화 내용, 파일 내용, 도구 실행 결과가 임시로 저장됩니다. 세션이 끝나면 사라집니다.',
    content: ['현재 대화 이력', '읽은 파일 내용', '도구 실행 결과', '시스템 프롬프트'],
    manage: ['/compact로 압축', '/clear로 초기화', '중요 내용은 파일에 저장'],
  },
  {
    id: 'claudemd', icon: '📄', label: 'CLAUDE.md', sublabel: '비휘발성 (Git에 저장)',
    color: '#3b82f6', size: '무제한',
    desc: '프로젝트 규칙, 컨벤션, 제약사항을 정의합니다. 매 세션마다 자동으로 로드됩니다.',
    content: ['코딩 컨벤션', '금지 사항', '아키텍처 결정', '@import로 파일 포함'],
    manage: ['Git으로 버전 관리', '@import로 모듈화', '팀 전체 공유'],
  },
  {
    id: 'filesystem', icon: '📁', label: '파일 시스템', sublabel: '영구 저장',
    color: '#10b981', size: '무제한',
    desc: '실제 코드, 문서, 설정 파일이 저장됩니다. 도구(Read/Write)로 접근합니다.',
    content: ['소스 코드', '테스트 파일', '문서 (README 등)', '설정 파일'],
    manage: ['Git으로 변경 추적', '도구로 읽기/쓰기', 'CI/CD 파이프라인'],
  },
  {
    id: 'external', icon: '🌐', label: '외부 메모리 (MCP)', sublabel: 'API·DB 연결',
    color: '#8b5cf6', size: '무제한',
    desc: 'MCP 서버를 통해 외부 데이터베이스, API, 서비스와 연결합니다.',
    content: ['GitHub Issues/PR', 'PostgreSQL DB', 'Slack 메시지', '외부 API'],
    manage: ['.mcp.json 설정', 'MCP 서버 실행', 'API 키 환경 변수'],
  },
];

export default function ClaudeMemoryDiagram() {
  const [active, setActive] = useState('context');
  const layer = LAYERS.find(l => l.id === active);

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-indigo-50 border border-indigo-200 rounded-lg p-2">
        💡 클로드는 4개 계층으로 정보를 저장·관리합니다. 각 계층의 역할을 이해하면 더 효율적으로 활용 가능
      </div>

      {/* 피라미드형 레이어 시각화 */}
      <div className="flex flex-col gap-1.5">
        {LAYERS.map((l, i) => (
          <div key={l.id} onClick={() => setActive(l.id)}
            className="rounded-xl border-2 cursor-pointer transition-all overflow-hidden"
            style={{
              borderColor: active === l.id ? l.color : '#e5e7eb',
              marginLeft: `${i * 8}px`,
              marginRight: `${i * 8}px`,
            }}>
            <div className="flex items-center gap-3 px-4 py-2.5"
              style={{ backgroundColor: active === l.id ? l.color : l.color + '15' }}>
              <span className="text-xl flex-shrink-0">{l.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm" style={{ color: active === l.id ? 'white' : l.color }}>
                  {l.label}
                </div>
                <div className="text-xs" style={{ color: active === l.id ? 'rgba(255,255,255,0.8)' : '#6b7280' }}>
                  {l.sublabel}
                </div>
              </div>
              <div className="text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: active === l.id ? 'rgba(255,255,255,0.2)' : l.color + '20', color: active === l.id ? 'white' : l.color }}>
                {l.size}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 선택된 레이어 상세 */}
      <div className="border-2 rounded-xl overflow-hidden" style={{ borderColor: layer.color }}>
        <div className="text-white px-4 py-2 text-sm font-bold" style={{ backgroundColor: layer.color }}>
          {layer.icon} {layer.label}
        </div>
        <div className="p-4 space-y-3">
          <div className="text-xs text-gray-700">{layer.desc}</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-bold text-gray-600 mb-1">저장되는 내용</div>
              <ul className="space-y-1">
                {layer.content.map(c => (
                  <li key={c} className="text-xs text-gray-600 flex gap-1">
                    <span style={{ color: layer.color }}>•</span>{c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-600 mb-1">관리 방법</div>
              <ul className="space-y-1">
                {layer.manage.map(m => (
                  <li key={m} className="text-xs text-gray-600 flex gap-1">
                    <span style={{ color: layer.color }}>→</span>{m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CLAUDE.md 구조 예시 */}
      <div className="border border-gray-200 rounded-xl p-4">
        <div className="text-xs font-bold text-gray-700 mb-2">📄 CLAUDE.md 구조 예시 (@import 모듈화)</div>
        <pre className="text-xs font-mono bg-gray-900 text-green-300 rounded-lg p-3 leading-relaxed">{`# 프로젝트 규칙

## 기술 스택
- React 18, TypeScript, Tailwind CSS
- Node.js, Express, PostgreSQL

## 코딩 컨벤션
- 함수형 컴포넌트 사용
- 타입 명시 필수 (any 금지)

## 금지 사항
- console.log 프로덕션 코드 금지
- 하드코딩된 비밀키 금지

@import ./rules/security.md
@import ./rules/testing.md
@import ./rules/git-workflow.md`}</pre>
      </div>
    </div>
  );
}
