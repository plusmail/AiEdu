import { useState } from 'react';

const EXAMPLES = [
  {
    lang: '🇺🇸 영어', text: 'Understanding transformers',
    tokens: ['Under', 'standing', ' trans', 'form', 'ers'],
    ids: [16051, 278, 1007, 515, 388],
    count: 5, ratio: 1.0,
    color: '#3b82f6',
  },
  {
    lang: '🇰🇷 한국어', text: '트랜스포머 이해하기',
    tokens: ['트', '랜', '스', '포', '머', ' 이', '해', '하', '기'],
    ids: [246, 247, 248, 249, 250, 251, 252, 253, 254],
    count: 9, ratio: 1.8,
    color: '#ef4444',
  },
  {
    lang: '💻 코드', text: 'print("hello")',
    tokens: ['print', '("', 'hello', '")'],
    ids: [1188, 7203, 31373, 8070],
    count: 4, ratio: 0.8,
    color: '#10b981',
  },
];

const BPE_STEPS = [
  { step: 1, icon: '📝', label: '문자 단위 분해', desc: 'h e l l o w o r l d', detail: '모든 문자를 개별 토큰으로 시작' },
  { step: 2, icon: '📊', label: '빈도 쌍 집계', desc: 'he(5) el(4) ll(6) lo(3) ...', detail: '인접 토큰 쌍의 등장 빈도 계산' },
  { step: 3, icon: '🔗', label: '가장 빈번한 쌍 병합', desc: 'll → 병합 → "ll"', detail: '최고 빈도 쌍을 하나의 토큰으로 병합' },
  { step: 4, icon: '🔄', label: '반복 병합', desc: 'hel lo world → hello world', detail: '어휘 크기(예: 50,000)에 도달할 때까지 반복' },
  { step: 5, icon: '📚', label: '어휘 사전 완성', desc: '[hello]=2867, [world]=995, ...', detail: '토큰 → 정수 ID 매핑 완성' },
];

export default function BpeTokenizationDiagram() {
  const [tab, setTab] = useState('compare');
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(0);

  const ex = EXAMPLES[selected];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['compare','언어별 비교'], ['bpe','BPE 과정'], ['cost','토큰 비용']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'compare' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {EXAMPLES.map((e, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`p-2.5 rounded-xl border-2 text-left transition-all ${selected===i ? 'shadow-md scale-[1.02]' : 'opacity-60 hover:opacity-90'}`}
                style={{ borderColor: selected===i ? e.color : '#e5e7eb', backgroundColor: selected===i ? e.color+'10' : 'white' }}>
                <div className="font-bold text-xs" style={{ color: e.color }}>{e.lang}</div>
                <div className="text-xs text-gray-500 mt-0.5 truncate">{e.text}</div>
                <div className="text-xs font-bold mt-1" style={{ color: e.color }}>{e.count} 토큰</div>
              </button>
            ))}
          </div>

          <div className="rounded-xl border-2 p-4 space-y-3"
            style={{ borderColor: ex.color, backgroundColor: ex.color+'08' }}>
            <div className="text-sm font-bold" style={{ color: ex.color }}>"{ex.text}"</div>
            <div className="flex flex-wrap gap-1.5">
              {ex.tokens.map((t, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <div className="px-2 py-1 rounded-lg text-white text-xs font-mono font-bold"
                    style={{ backgroundColor: ex.color }}>{t}</div>
                  <div className="text-xs text-gray-400 font-mono">{ex.ids[i]}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs pt-2 border-t" style={{ borderColor: ex.color+'30' }}>
              <span><strong style={{ color: ex.color }}>{ex.count}개</strong> 토큰</span>
              <span className="text-gray-400">|</span>
              <span>영어 대비 <strong style={{ color: ex.ratio > 1 ? '#ef4444' : '#10b981' }}>×{ex.ratio.toFixed(1)}</strong></span>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-yellow-700 mb-1">한국어 토큰화가 비효율적인 이유</div>
            <div className="text-gray-600">한국어는 자모 단위로 분해되어 영어의 <strong>1.5~2배</strong> 토큰을 소비합니다. 동일한 컨텍스트 윈도우에서 한국어는 더 적은 내용을 담을 수 있고, API 비용도 더 많이 발생합니다.</div>
          </div>
        </div>
      )}

      {tab === 'bpe' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">BPE가 어휘 사전을 구축하는 5단계 과정 (클릭으로 확인)</div>
          {BPE_STEPS.map((s, i) => (
            <button key={i} onClick={() => setStep(i)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${step===i ? 'shadow-md' : 'opacity-60 hover:opacity-90'}`}
              style={{ borderColor: step===i ? '#3b82f6' : '#e5e7eb', backgroundColor: step===i ? '#eff6ff' : '#f9fafb' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: step===i ? '#3b82f6' : '#9ca3af' }}>{s.step}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{s.icon}</span>
                  <span className="font-bold text-xs text-blue-700">{s.label}</span>
                </div>
                <code className="text-xs text-gray-500 font-mono mt-0.5 block">{s.desc}</code>
                {step===i && <div className="text-xs text-gray-600 mt-1">{s.detail}</div>}
              </div>
            </button>
          ))}
        </div>
      )}

      {tab === 'cost' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">토큰 수 = API 비용 = 컨텍스트 소비량</div>
          <div className="space-y-2">
            {[
              { label: '1M 토큰 처리 비용', en: '$0.25', ko: '$0.45', ratio: '×1.8', color: '#ef4444' },
              { label: '4K 컨텍스트 = 담을 수 있는 내용', en: '~3,000 단어', ko: '~1,700 단어', ratio: '×0.56', color: '#f59e0b' },
              { label: '동일 문서 토큰 수', en: '1,000 토큰', ko: '1,800 토큰', ratio: '×1.8', color: '#8b5cf6' },
            ].map((row, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs">
                <div className="font-bold text-gray-700 mb-2">{row.label}</div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2"><span className="text-blue-600 font-bold">🇺🇸 영어:</span><span>{row.en}</span></div>
                  <div className="flex items-center gap-2"><span className="text-red-600 font-bold">🇰🇷 한국어:</span><span>{row.ko}</span></div>
                  <span className="ml-auto font-bold" style={{ color: row.color }}>{row.ratio}</span>
                </div>
              </div>
            ))}
          </div>
          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono">{`import tiktoken
enc = tiktoken.get_encoding("cl100k_base")

en = enc.encode("Understanding transformers")
ko = enc.encode("트랜스포머 이해하기")

print(f"영어: {len(en)} 토큰")  # 3~5
print(f"한국어: {len(ko)} 토큰") # 9~12`}</pre>
        </div>
      )}
    </div>
  );
}
