import { useState } from 'react';

const MODELS = [
  {
    id: 'opus',
    name: 'Claude Opus',
    alias: 'claude-opus',
    version: 'claude-opus-4-5',
    icon: '👑',
    color: '#7c3aed',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    speed: 2,
    cost: 5,
    power: 5,
    label: '최고 성능',
    tasks: ['복잡한 아키텍처 설계', '난해한 버그 분석', '대규모 리팩토링', '보안 취약점 검토'],
    notFor: '단순 포맷팅, 빠른 Q&A',
    price: '$15 / 1M 입력 토큰',
  },
  {
    id: 'sonnet',
    name: 'Claude Sonnet',
    alias: 'claude-sonnet',
    version: 'claude-sonnet-4-6',
    icon: '⚖️',
    color: '#2563eb',
    bg: '#eff6ff',
    border: '#bfdbfe',
    speed: 3,
    cost: 3,
    power: 4,
    label: '균형 (기본값)',
    tasks: ['일반 기능 개발', '코드 리뷰', 'PR 설명 작성', '테스트 코드 생성'],
    notFor: '초고난도 설계, 단순 반복 작업',
    price: '$3 / 1M 입력 토큰',
  },
  {
    id: 'haiku',
    name: 'Claude Haiku',
    alias: 'claude-haiku',
    version: 'claude-haiku-4-5',
    icon: '⚡',
    color: '#059669',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    speed: 5,
    cost: 1,
    power: 2,
    label: '빠른 응답',
    tasks: ['코드 포맷팅', '빠른 Q&A', '간단한 변수명 제안', '주석 추가'],
    notFor: '복잡한 설계, 심층 분석',
    price: '$0.25 / 1M 입력 토큰',
  },
];

const CACHE_STEPS = [
  { icon: '📋', label: '첫 번째 요청', desc: 'CLAUDE.md + 파일들 전체 전송', cost: '100%', color: '#ef4444', cached: false },
  { icon: '⚡', label: '두 번째 요청', desc: '변경된 부분만 전송, 나머지는 캐시 참조', cost: '10%', color: '#10b981', cached: true },
  { icon: '⚡', label: '세 번째 요청', desc: '동일 컨텍스트 → 계속 캐시 히트', cost: '10%', color: '#10b981', cached: true },
];

const STRATEGIES = [
  { task: '아키텍처 설계', model: 'opus',   reason: '복잡한 트레이드오프 분석 필요' },
  { task: '기능 구현',     model: 'sonnet', reason: '코드 품질 + 속도 균형' },
  { task: '테스트 작성',   model: 'sonnet', reason: '반복 패턴이지만 정확성 중요' },
  { task: '코드 포맷팅',   model: 'haiku',  reason: '단순 변환, 빠른 응답 우선' },
  { task: 'PR 최종 검토',  model: 'opus',   reason: '보안·품질 최종 확인' },
  { task: '주석 생성',     model: 'haiku',  reason: '대량 반복 작업, 비용 최소화' },
];

function Bar({ value, max = 5, color }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <div key={i} className="h-2.5 flex-1 rounded-sm"
          style={{ backgroundColor: i < value ? color : '#e5e7eb' }} />
      ))}
    </div>
  );
}

export default function ModelSelectionDiagram() {
  const [tab, setTab] = useState('compare');
  const [selected, setSelected] = useState('sonnet');
  const [cacheStep, setCacheStep] = useState(0);

  const model = MODELS.find(m => m.id === selected);
  const modelById = Object.fromEntries(MODELS.map(m => [m.id, m]));

  return (
    <div className="space-y-4">
      {/* 탭 */}
      <div className="flex gap-2">
        {[['compare','모델 비교'], ['cache','프롬프트 캐싱'], ['strategy','선택 전략']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {/* ── 모델 비교 ── */}
      {tab === 'compare' && (
        <div className="space-y-3">
          {/* 모델 선택 카드 */}
          <div className="grid grid-cols-3 gap-2">
            {MODELS.map(m => (
              <button key={m.id} onClick={() => setSelected(m.id)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${selected === m.id ? 'shadow-lg scale-[1.03]' : 'opacity-60 hover:opacity-90'}`}
                style={{ borderColor: selected === m.id ? m.color : '#e5e7eb', backgroundColor: selected === m.id ? m.bg : 'white' }}>
                <div className="text-2xl mb-1">{m.icon}</div>
                <div className="font-black text-xs" style={{ color: m.color }}>{m.name.replace('Claude ', '')}</div>
                <div className="text-xs text-gray-400 mt-0.5">{m.label}</div>
              </button>
            ))}
          </div>

          {/* 레이더 대신 막대 비교 */}
          {model && (
            <div className="rounded-xl border-2 p-4 space-y-3"
              style={{ borderColor: model.color, backgroundColor: model.bg }}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{model.icon}</span>
                <div>
                  <div className="font-bold" style={{ color: model.color }}>{model.name}</div>
                  <div className="text-xs font-mono text-gray-500">{model.version}</div>
                </div>
                <span className="ml-auto text-xs font-bold px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: model.color }}>{model.label}</span>
              </div>

              <div className="space-y-2">
                {[
                  { label: '성능·추론력', val: model.power, icon: '🧠' },
                  { label: '응답 속도',   val: model.speed, icon: '⚡' },
                  { label: '비용 효율',   val: 6 - model.cost, icon: '💰' },
                ].map(row => (
                  <div key={row.label} className="flex items-center gap-3">
                    <span className="text-base w-5">{row.icon}</span>
                    <span className="text-xs text-gray-600 w-20">{row.label}</span>
                    <div className="flex-1"><Bar value={row.val} color={model.color} /></div>
                    <span className="text-xs font-bold w-5 text-right" style={{ color: model.color }}>{row.val}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3" style={{ borderColor: model.color + '40' }}>
                <div className="text-xs font-bold text-gray-600 mb-1.5">✅ 적합한 작업</div>
                <div className="flex flex-wrap gap-1">
                  {model.tasks.map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                      style={{ backgroundColor: model.color }}>{t}</span>
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-2">❌ 비추천: {model.notFor}</div>
                <div className="text-xs font-mono mt-1.5 text-gray-500">{model.price}</div>
              </div>

              {/* 설정 코드 */}
              <pre className="bg-gray-950 text-green-300 text-xs rounded-lg p-2.5 font-mono">
{`# CLI에서 모델 지정
claude --model ${model.alias}

# settings.json에서 기본 모델 설정
{ "model": "${model.version}" }

# 환경 변수로도 설정 가능
export ANTHROPIC_MODEL="${model.version}"`}
              </pre>
            </div>
          )}

          {/* 3모델 한눈 비교표 */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left border border-gray-200">모델</th>
                  <th className="p-2 text-center border border-gray-200">🧠 성능</th>
                  <th className="p-2 text-center border border-gray-200">⚡ 속도</th>
                  <th className="p-2 text-center border border-gray-200">💰 비용/1M</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map(m => (
                  <tr key={m.id} className={selected === m.id ? '' : 'opacity-70'}
                    style={{ backgroundColor: selected === m.id ? m.bg : 'white' }}>
                    <td className="p-2 border border-gray-200 font-bold" style={{ color: m.color }}>
                      {m.icon} {m.name.replace('Claude ', '')}
                    </td>
                    <td className="p-2 border border-gray-200 text-center">
                      {'★'.repeat(m.power)}{'☆'.repeat(5 - m.power)}
                    </td>
                    <td className="p-2 border border-gray-200 text-center">
                      {'★'.repeat(m.speed)}{'☆'.repeat(5 - m.speed)}
                    </td>
                    <td className="p-2 border border-gray-200 text-center font-mono text-gray-600">
                      {m.price.split('/')[0].trim()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 프롬프트 캐싱 ── */}
      {tab === 'cache' && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs">
            <strong className="text-purple-700">프롬프트 캐싱이란?</strong>
            <div className="text-gray-600 mt-1">
              CLAUDE.md, 대용량 파일 등 <strong>변하지 않는 컨텍스트</strong>를 앤트로픽 서버가 5분간 캐시해 두는 기능입니다.
              두 번째 요청부터는 캐시된 부분을 재사용해 비용을 최대 <strong>90% 절감</strong>합니다.
            </div>
          </div>

          {/* 단계별 시뮬레이션 */}
          <div className="space-y-2">
            {CACHE_STEPS.map((s, i) => (
              <button key={i} onClick={() => setCacheStep(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${cacheStep === i ? 'shadow-md scale-[1.01]' : 'opacity-60 hover:opacity-90'}`}
                style={{ borderColor: cacheStep === i ? s.color : '#e5e7eb', backgroundColor: cacheStep === i ? s.color + '10' : 'white' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: s.color + '20' }}>
                  {s.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-xs" style={{ color: s.color }}>{s.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-sm" style={{ color: s.color }}>{s.cost}</div>
                  <div className="text-xs text-gray-400">비용</div>
                </div>
              </button>
            ))}
          </div>

          {/* 캐시 구조 시각화 */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-800 text-white text-xs px-3 py-2 font-bold">요청 구조 (캐시 적용 후)</div>
            <div className="p-3 space-y-1.5">
              {[
                { label: 'CLAUDE.md', size: '3K 토큰', cached: true,  color: '#8b5cf6' },
                { label: 'src/auth.ts (읽어온 파일)', size: '12K 토큰', cached: true,  color: '#8b5cf6' },
                { label: '이전 대화 이력', size: '8K 토큰', cached: true,  color: '#8b5cf6' },
                { label: '새 지시 메시지', size: '0.1K 토큰', cached: false, color: '#3b82f6' },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-2 text-xs">
                  <div className="flex-1 h-6 rounded flex items-center px-2 font-medium"
                    style={{ backgroundColor: row.cached ? '#8b5cf620' : '#3b82f620', color: row.color, border: `1px solid ${row.color}40` }}>
                    {row.cached ? '📦 캐시' : '📤 전송'} {row.label}
                  </div>
                  <span className="text-gray-400 w-20 text-right">{row.size}</span>
                </div>
              ))}
            </div>
            <div className="bg-green-50 border-t border-green-200 px-3 py-2 text-xs text-green-700">
              💡 캐시된 토큰(23.1K) 비용 90% 절감 → 새 메시지(0.1K)만 정가 청구
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
              <div className="font-bold text-blue-700 mb-1">⏱ 캐시 유효 시간</div>
              <div className="text-gray-600">기본 <strong>5분</strong> (TTL)<br />5분 내 반복 요청 시 자동 히트</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-2.5">
              <div className="font-bold text-green-700 mb-1">🔧 별도 설정 필요?</div>
              <div className="text-gray-600"><strong>불필요</strong> — Claude가 자동 활성화<br />API 직접 사용 시만 수동 설정</div>
            </div>
          </div>
        </div>
      )}

      {/* ── 선택 전략 ── */}
      {tab === 'strategy' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">작업 유형에 따른 최적 모델 선택 가이드</div>

          {/* 의사결정 트리 */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
            {[
              { q: '설계·분석이 복잡한가?', yes: 'opus', no: null },
              { q: '반복적이고 단순한 작업인가?', yes: 'haiku', no: 'sonnet' },
            ].map((node, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-48 flex-shrink-0 bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-700">
                  {node.q}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-green-600 font-bold">예 →</span>
                    <span className="px-2 py-0.5 rounded-full text-white text-xs font-bold"
                      style={{ backgroundColor: modelById[node.yes]?.color }}>
                      {modelById[node.yes]?.icon} {node.yes}
                    </span>
                  </div>
                  {node.no && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-red-500 font-bold">아니요 →</span>
                      <span className="px-2 py-0.5 rounded-full text-white text-xs font-bold"
                        style={{ backgroundColor: modelById[node.no]?.color }}>
                        {modelById[node.no]?.icon} {node.no}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 실전 작업별 추천표 */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-gray-600">실전 작업별 추천 모델</div>
            {STRATEGIES.map((s, i) => {
              const m = modelById[s.model];
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border text-xs"
                  style={{ backgroundColor: m.bg, borderColor: m.border }}>
                  <span className="w-24 font-medium text-gray-700 flex-shrink-0">{s.task}</span>
                  <span className="w-16 px-2 py-0.5 rounded-full text-white text-xs font-bold text-center flex-shrink-0"
                    style={{ backgroundColor: m.color }}>
                    {m.icon} {s.model}
                  </span>
                  <span className="text-gray-500 text-xs">{s.reason}</span>
                </div>
              );
            })}
          </div>

          {/* 비용 최적화 팁 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs space-y-1.5">
            <div className="font-bold text-yellow-700">💡 비용 최적화 전략</div>
            <div className="text-gray-600">① <strong>Sonnet</strong>으로 빠르게 구현 → 완성 후 <strong>Opus</strong>로 최종 검토</div>
            <div className="text-gray-600">② 단순 반복 작업(포맷팅, 주석)은 <strong>Haiku</strong>로 일괄 처리</div>
            <div className="text-gray-600">③ <strong>프롬프트 캐싱</strong>으로 긴 컨텍스트 비용 90% 절감</div>
            <div className="text-gray-600">④ CI/CD 자동화는 <strong>Haiku</strong> — 수천 회 실행해도 저렴</div>
          </div>
        </div>
      )}
    </div>
  );
}
