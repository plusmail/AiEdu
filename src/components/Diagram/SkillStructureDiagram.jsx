import { useState } from 'react';

const SKILL_EXAMPLE = `---
name: code-review
description: 코드 리뷰 자동화 스킬
tools: [Read, Bash]
context: fork
triggers:
  keywords: ["리뷰", "review", "검토"]
---

# 코드 리뷰 스킬

당신은 시니어 개발자입니다.

## 검토 항목
1. 코드 품질 (가독성, 중복 제거)
2. 보안 취약점
3. 성능 이슈
4. 테스트 커버리지

## 출력 형식
### 요약
[전체 평가]

### 개선 사항
- [파일:라인] 문제 설명 → 해결책`;

export default function SkillStructureDiagram() {
  const [section, setSection] = useState('frontmatter');

  const sections = {
    frontmatter: {
      label: 'YAML 프론트매터', color: '#3b82f6',
      fields: [
        { key: 'name', val: 'code-review', desc: '스킬 고유 식별자 (필수)' },
        { key: 'description', val: '코드 리뷰 자동화', desc: '스킬 선택 시 클로드가 참고' },
        { key: 'tools', val: '[Read, Bash]', desc: '허용된 도구 목록' },
        { key: 'context', val: 'fork', desc: 'fork=격리실행 / inherit=공유' },
        { key: 'triggers.keywords', val: '["리뷰", "review"]', desc: '자동 로드 트리거 키워드' },
      ],
    },
    body: {
      label: '스킬 본문 (Markdown)', color: '#10b981',
      items: [
        { title: '역할 정의', desc: '"당신은 시니어 개발자입니다" 등 페르소나 설정', important: true },
        { title: '검토 항목', desc: '수행할 작업의 구체적 기준 명시', important: true },
        { title: '환각 방지', desc: '"모르면 파일을 직접 읽어 확인하라" 명시', important: true },
        { title: '출력 형식', desc: '응답 구조를 템플릿으로 제공', important: false },
      ],
    },
    lifecycle: {
      label: '3단계 작동 방식', color: '#8b5cf6',
      steps: [
        { step: '① 트리거', desc: '사용자 입력에서 키워드 감지\n"코드 리뷰해줘" → code-review 스킬 매칭' },
        { step: '② 로드', desc: 'SKILL.md 파일을 컨텍스트에 추가\n필요한 도구 권한 활성화' },
        { step: '③ 실행', desc: '스킬 절차에 따라 작업 수행\ncontext:fork이면 격리된 공간에서 실행' },
      ],
    },
  };

  const sec = sections[section];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
        💡 스킬 = 재사용 가능한 전문 작업 절차. 트리거 키워드로 자동 활성화됩니다
      </div>

      <div className="flex gap-2">
        {Object.entries(sections).map(([id, s]) => (
          <button key={id} onClick={() => setSection(id)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all"
            style={{
              borderColor: section === id ? s.color : '#e5e7eb',
              backgroundColor: section === id ? s.color : 'white',
              color: section === id ? 'white' : '#6b7280',
            }}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 스킬 파일 예시 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">.claude/skills/code-review.md</div>
          <pre className="text-xs font-mono bg-gray-900 text-green-300 rounded-xl p-3 leading-relaxed h-64 overflow-y-auto">{SKILL_EXAMPLE}</pre>
        </div>

        {/* 선택된 섹션 상세 */}
        <div className="border-2 rounded-xl overflow-hidden" style={{ borderColor: sec.color }}>
          <div className="text-white px-3 py-2 text-xs font-bold" style={{ backgroundColor: sec.color }}>
            {sec.label}
          </div>
          <div className="p-3 space-y-2">
            {section === 'frontmatter' && sec.fields?.map(({ key, val, desc }) => (
              <div key={key} className="border border-gray-100 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-blue-700 font-bold">{key}:</span>
                  <span className="font-mono text-xs text-gray-600">{val}</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
              </div>
            ))}
            {section === 'body' && sec.items?.map(({ title, desc, important }) => (
              <div key={title} className={`border rounded-lg p-2 ${important ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                <div className="text-xs font-bold text-gray-700">{important ? '⭐ ' : ''}{title}</div>
                <div className="text-xs text-gray-600 mt-0.5">{desc}</div>
              </div>
            ))}
            {section === 'lifecycle' && sec.steps?.map(({ step, desc }) => (
              <div key={step} className="border border-purple-100 bg-purple-50 rounded-lg p-2">
                <div className="text-xs font-bold text-purple-800">{step}</div>
                <div className="text-xs text-purple-700 whitespace-pre-line mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* context:fork 핵심 개념 */}
      <div className="border border-indigo-200 bg-indigo-50 rounded-xl p-3 text-xs">
        <div className="font-bold text-indigo-800 mb-2">⚡ context:fork — 격리 실행의 장점</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="font-bold text-indigo-700">✅ fork 사용 시</div>
            <div className="text-indigo-600">• 스킬 대화가 메인 컨텍스트에 영향 없음</div>
            <div className="text-indigo-600">• 컨텍스트 낭비 방지</div>
            <div className="text-indigo-600">• 비용 절약</div>
          </div>
          <div>
            <div className="font-bold text-gray-700">❌ fork 없이</div>
            <div className="text-gray-600">• 스킬 내용이 컨텍스트 누적</div>
            <div className="text-gray-600">• 20만 토큰 소진 빠름</div>
            <div className="text-gray-600">• 다른 작업에 영향 가능</div>
          </div>
        </div>
      </div>
    </div>
  );
}
