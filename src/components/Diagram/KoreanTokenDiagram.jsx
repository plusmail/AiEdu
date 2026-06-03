import { useState } from 'react';

const COMPARISONS = [
  {
    label: '일반 문장',
    en: { text: 'The cat sat on the mat', tokens: ['The', ' cat', ' sat', ' on', ' the', ' mat'], count: 6 },
    ko: { text: '고양이가 매트 위에 앉았다', tokens: ['고', '양', '이', '가', ' 매', '트', ' 위', '에', ' 앉', '았', '다'], count: 11 },
  },
  {
    label: '기술 문서',
    en: { text: 'Deep learning model training', tokens: ['Deep', ' learning', ' model', ' training'], count: 4 },
    ko: { text: '딥러닝 모델 학습', tokens: ['딥', '러', '닝', ' 모', '델', ' 학', '습'], count: 7 },
  },
  {
    label: 'API 호출',
    en: { text: 'Summarize this document please', tokens: ['Sum', 'mar', 'ize', ' this', ' document', ' please'], count: 6 },
    ko: { text: '이 문서를 요약해주세요', tokens: ['이', ' 문', '서', '를', ' 요', '약', '해', '주', '세', '요'], count: 10 },
  },
];

const CONTEXT_SIZES = [
  { label: '4K 컨텍스트', tokens: 4096 },
  { label: '8K 컨텍스트', tokens: 8192 },
  { label: '32K 컨텍스트', tokens: 32768 },
  { label: '128K 컨텍스트', tokens: 131072 },
];

const TOKEN_COLORS = [
  '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444',
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1', '#14b8a6',
];

export default function KoreanTokenDiagram() {
  const [tab, setTab] = useState('compare');
  const [selected, setSelected] = useState(0);
  const [contextIdx, setContextIdx] = useState(1);
  const [ratio, setRatio] = useState(1.7);

  const comp = COMPARISONS[selected];
  const ctx = CONTEXT_SIZES[contextIdx];
  const enWords = Math.round(ctx.tokens / 1.3);
  const koWords = Math.round(ctx.tokens / (1.3 * ratio));

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['compare', '토큰 시각화'], ['context', '컨텍스트 한계'], ['cost', '비용 계산기']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'compare' && (
        <div className="space-y-3">
          {/* 문장 선택 */}
          <div className="flex gap-2">
            {COMPARISONS.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${selected === i ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-300'}`}>
                {c.label}
              </button>
            ))}
          </div>

          {/* 영어 */}
          <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700">🇺🇸 영어</span>
              <span className="text-sm font-black text-blue-700">{comp.en.count} 토큰</span>
            </div>
            <div className="text-xs text-gray-600 mb-2">"{comp.en.text}"</div>
            <div className="flex flex-wrap gap-1.5">
              {comp.en.tokens.map((t, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="px-2 py-1 rounded text-white text-xs font-bold font-mono"
                    style={{ backgroundColor: TOKEN_COLORS[i % TOKEN_COLORS.length] }}>
                    {t.trim() || '▪'}
                  </span>
                  <span className="text-xs text-gray-400">{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 한국어 */}
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-700">🇰🇷 한국어</span>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-red-200 text-red-700 px-2 py-0.5 rounded-full font-bold">
                  ×{(comp.ko.count / comp.en.count).toFixed(1)} 더 많음
                </span>
                <span className="text-sm font-black text-red-700">{comp.ko.count} 토큰</span>
              </div>
            </div>
            <div className="text-xs text-gray-600 mb-2">"{comp.ko.text}"</div>
            <div className="flex flex-wrap gap-1.5">
              {comp.ko.tokens.map((t, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <span className="px-2 py-1 rounded text-white text-xs font-bold font-mono"
                    style={{ backgroundColor: TOKEN_COLORS[i % TOKEN_COLORS.length] }}>
                    {t.trim() || '▪'}
                  </span>
                  <span className="text-xs text-gray-400">{i}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
            <strong className="text-yellow-700">왜 자모 단위로 분해될까?</strong>
            <div className="text-gray-600 mt-1">
              GPT 계열 토크나이저는 영어 텍스트 중심으로 BPE 학습 → 한글 자모가 어휘 사전에 적게 등록
              → 한글 단어를 자모 단위로 쪼개 표현
            </div>
          </div>
        </div>
      )}

      {tab === 'context' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">같은 컨텍스트 윈도우에서 담을 수 있는 내용의 차이</div>

          {/* 컨텍스트 크기 선택 */}
          <div className="flex gap-2 flex-wrap">
            {CONTEXT_SIZES.map((c, i) => (
              <button key={i} onClick={() => setContextIdx(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${contextIdx === i ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 border-gray-300'}`}>
                {c.label}
              </button>
            ))}
          </div>

          {/* 시각적 비교 */}
          <div className="space-y-3">
            {/* 영어 */}
            <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-700">🇺🇸 영어로 채울 수 있는 내용</span>
                <span className="text-sm font-black text-blue-700">~{enWords.toLocaleString()} 단어</span>
              </div>
              <div className="h-8 bg-blue-200 rounded-lg overflow-hidden">
                <div className="h-full bg-blue-500 rounded-lg flex items-center justify-end pr-2"
                  style={{ width: '100%' }}>
                  <span className="text-white text-xs font-bold">100%</span>
                </div>
              </div>
              <div className="text-xs text-blue-600 mt-1">A4 약 {Math.round(enWords / 250)}페이지</div>
            </div>

            {/* 한국어 */}
            <div className="rounded-xl border-2 border-red-300 bg-red-50 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-700">🇰🇷 한국어로 채울 수 있는 내용</span>
                <span className="text-sm font-black text-red-700">~{koWords.toLocaleString()} 단어</span>
              </div>
              <div className="h-8 bg-red-100 rounded-lg overflow-hidden">
                <div className="h-full bg-red-500 rounded-lg flex items-center justify-end pr-2 transition-all"
                  style={{ width: `${(100 / ratio).toFixed(0)}%` }}>
                  <span className="text-white text-xs font-bold">{(100 / ratio).toFixed(0)}%</span>
                </div>
              </div>
              <div className="text-xs text-red-600 mt-1">A4 약 {Math.round(koWords / 250)}페이지 — 영어의 {(100/ratio).toFixed(0)}%만 담김</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-green-50 border border-green-200 rounded-lg p-2.5">
              <div className="font-bold text-green-700">해결 방법</div>
              <div className="text-gray-600 mt-1 space-y-0.5">
                <div>• 한국어 특화 토크나이저</div>
                <div>• HyperCLOVA-X (한국어 최적화)</div>
                <div>• EXAONE (LG AI Research)</div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
              <div className="font-bold text-blue-700">실용적 팁</div>
              <div className="text-gray-600 mt-1 space-y-0.5">
                <div>• 한국어 입력은 간결하게</div>
                <div>• 불필요한 조사/어미 축약</div>
                <div>• 영어 전문용어 그대로 사용</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'cost' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">한국어/영어 비율을 조절해 실제 비용 차이를 계산해보세요</div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">한국어 토큰 배율</span>
              <span className="font-black text-red-600">×{ratio.toFixed(1)}</span>
            </div>
            <input type="range" min={1.2} max={2.5} step={0.1} value={ratio}
              onChange={e => setRatio(Number(e.target.value))}
              className="w-full accent-red-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>×1.2 (최소)</span><span>×2.5 (최대)</span>
            </div>
          </div>

          {/* 비용 비교 카드 */}
          <div className="space-y-2">
            {[
              { label: '월 100만 토큰 처리', enCost: 0.25, unit: '$' },
              { label: '월 1,000만 토큰 처리', enCost: 2.5, unit: '$' },
              { label: '월 1억 토큰 처리', enCost: 25, unit: '$' },
            ].map((row, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs">
                <div className="font-bold text-gray-700 mb-2">{row.label}</div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                    <div className="text-blue-600 font-bold text-xs">🇺🇸 영어</div>
                    <div className="text-blue-800 font-black text-base mt-0.5">{row.unit}{row.enCost.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center text-gray-400 text-lg">→</div>
                  <div className="flex-1 bg-red-50 border border-red-200 rounded-lg p-2 text-center">
                    <div className="text-red-600 font-bold text-xs">🇰🇷 한국어</div>
                    <div className="text-red-800 font-black text-base mt-0.5">{row.unit}{(row.enCost * ratio).toFixed(2)}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-black text-red-600 bg-red-100 px-2 py-1 rounded-full">
                      +{((ratio - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-yellow-700 mb-1">💡 비용 절감 전략</div>
            <div className="space-y-1 text-gray-600">
              <div>① 시스템 프롬프트는 <strong>영어</strong>로 작성 (사용자 메시지는 한국어 OK)</div>
              <div>② 긴 문서는 <strong>요약 후</strong> LLM에 전달</div>
              <div>③ 한국어 특화 모델 사용 시 토큰 효율 개선</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
