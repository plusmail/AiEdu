import { useState } from 'react';

const LIFECYCLE = [
  { step: 1, icon: '✏️', label: '스킬 파일 작성', color: '#3b82f6', desc: '.claude/skills/name.md 생성\nYAML 프론트매터 + 절차 작성' },
  { step: 2, icon: '🔍', label: '트리거 감지',    color: '#f59e0b', desc: '사용자 입력에서 키워드 매칭\n"리뷰해줘" → code-review 로드' },
  { step: 3, icon: '📥', label: '스킬 로드',      color: '#8b5cf6', desc: '컨텍스트 윈도우에 스킬 내용 추가\ntoken_budget 만큼만 소비' },
  { step: 4, icon: '▶️', label: '스킬 실행',      color: '#10b981', desc: '정의된 절차대로 도구 실행\n격리 옵션: context:fork' },
  { step: 5, icon: '✅', label: '결과 반환',      color: '#059669', desc: '실행 결과를 메인 컨텍스트에 반환\n스킬 종료 후 메모리 해제' },
];

const TEMPLATE = `---
name: code-review
description: 코드 품질 검토 스킬
tools: [Read, Bash]
triggers:
  keywords: ["리뷰해줘", "코드 리뷰", "review"]
context: fork
token_budget: 5000
---

# 코드 리뷰 스킬

## 수행 절차
1. 변경된 파일 목록 파악 (git diff)
2. 각 파일 순서대로 품질 검토
   - 코드 스타일 준수 여부
   - 잠재적 버그·엣지 케이스
   - 성능 이슈
3. 개선사항 우선순위별 정리
4. 마크다운 리뷰 보고서 출력

## 환각 방지 지침
- 확인된 사실만 주장하세요
- 불확실한 경우 파일을 직접 Read로 확인
- 추측은 "추측:" 접두어 사용`;

const ANTI_HALLUCINATION = [
  { rule: '확인 후 주장', desc: 'Read 도구로 파일 직접 확인 후 언급', icon: '📖' },
  { rule: '불확실성 명시', desc: '"추측:", "확인 필요:" 접두어 사용', icon: '❓' },
  { rule: '범위 제한',    desc: '스킬이 다루는 파일/기능만 언급', icon: '🎯' },
  { rule: '모르면 인정',  desc: '"모르겠습니다, 확인해볼게요" 가능', icon: '🤷' },
];

export default function SkillDevDiagram() {
  const [tab, setTab] = useState('lifecycle');
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['lifecycle','생명주기'], ['template','템플릿'], ['antihall','환각 방지']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'lifecycle' && (
        <div className="space-y-2">
          {LIFECYCLE.map((s, i) => (
            <button key={i} onClick={() => setActiveStep(i)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${activeStep === i ? 'shadow-md' : 'opacity-70 hover:opacity-100'}`}
              style={{ borderColor: activeStep === i ? s.color : '#e5e7eb', backgroundColor: activeStep === i ? s.color + '10' : '#f9fafb' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: s.color }}>{s.step}</div>
              <span className="text-xl flex-shrink-0">{s.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-sm" style={{ color: s.color }}>{s.label}</div>
                {activeStep === i && (
                  <div className="text-xs text-gray-500 mt-0.5 whitespace-pre-line">{s.desc}</div>
                )}
              </div>
              {i < LIFECYCLE.length - 1 && activeStep !== i && <span className="text-gray-300">▼</span>}
            </button>
          ))}
          <div className="text-xs bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
            💡 <strong>점진적 공개:</strong> 트리거 키워드가 없으면 스킬 내용이 컨텍스트에 로드되지 않아 토큰 절약
          </div>
        </div>
      )}

      {tab === 'template' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">SKILL.md 기본 템플릿 — 그대로 복사해서 사용하세요</div>
          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{TEMPLATE}</pre>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { key: 'name', desc: '고유 식별자 (파일명과 동일 권장)', color: '#3b82f6' },
              { key: 'description', desc: 'AI가 선택에 사용하는 설명 (중요)', color: '#8b5cf6' },
              { key: 'tools', desc: '허용 도구 — 최소 권한 원칙 적용', color: '#f59e0b' },
              { key: 'context: fork', desc: '메인 컨텍스트와 격리 실행', color: '#10b981' },
            ].map(item => (
              <div key={item.key} className="p-2 rounded-lg border"
                style={{ backgroundColor: item.color + '10', borderColor: item.color + '40' }}>
                <code className="font-bold" style={{ color: item.color }}>{item.key}</code>
                <div className="text-gray-500 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'antihall' && (
        <div className="space-y-3">
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-red-700 mb-1">⚠️ 환각(Hallucination)이란?</div>
            <div className="text-gray-600">AI가 실제로 없는 파일, 함수, 동작을 "있다"고 주장하는 현상입니다. 스킬에 방지 지침을 명시해 줄여야 합니다.</div>
          </div>
          <div className="space-y-2">
            {ANTI_HALLUCINATION.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xl flex-shrink-0">{a.icon}</span>
                <div>
                  <div className="font-bold text-xs text-gray-700">{a.rule}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">{`## 환각 방지 지침 (스킬에 포함)
- 존재하지 않는 파일이나 함수를 언급하지 마세요
- 확신이 없으면 Read 도구로 직접 확인하세요
- 없다고 판단되면 "해당 파일이 없습니다"라고 말하세요
- 추측이 필요하면 반드시 "추측:" 접두어를 붙이세요`}</pre>
        </div>
      )}
    </div>
  );
}
