import { useState, useEffect, useRef } from 'react';

const PROMPTS = [
  {
    label: '예시 1',
    input: '파이썬은',
    tokens: ['파이썬은', ' 프로그래밍', ' 언어로', ',', ' 배우기', ' 쉽고', ' 강력합니다', '.'],
    probs: [
      [{ t: ' 프로그래밍', p: 72 }, { t: ' 프', p: 15 }, { t: ' 인기', p: 8 }],
      [{ t: ' 언어로', p: 65 }, { t: ' 언어', p: 20 }, { t: ' 툴', p: 8 }],
      [{ t: ',', p: 55 }, { t: ' 배우기', p: 30 }, { t: ' 사용', p: 10 }],
      [{ t: ' 배우기', p: 78 }, { t: ' 활용', p: 12 }, { t: ' 쉽게', p: 7 }],
      [{ t: ' 쉽고', p: 60 }, { t: ' 재미있고', p: 25 }, { t: ' 편하고', p: 12 }],
      [{ t: ' 강력합니다', p: 70 }, { t: ' 유용합니다', p: 20 }, { t: ' 효율적', p: 7 }],
      [{ t: '.', p: 85 }, { t: '!', p: 10 }, { t: ',', p: 3 }],
    ],
  },
  {
    label: '예시 2',
    input: 'AI는',
    tokens: ['AI는', ' 인공', '지능의', ' 약자로', ',', ' 기계', '가', ' 학습합니다', '.'],
    probs: [
      [{ t: ' 인공', p: 68 }, { t: ' 인기', p: 18 }, { t: ' 미래', p: 10 }],
      [{ t: '지능의', p: 75 }, { t: '지능', p: 18 }, { t: '지능을', p: 5 }],
      [{ t: ' 약자로', p: 60 }, { t: ' 분야로', p: 25 }, { t: ' 기술로', p: 12 }],
      [{ t: ',', p: 50 }, { t: ' 다양한', p: 35 }, { t: ' 여러', p: 12 }],
      [{ t: ' 기계', p: 55 }, { t: ' 컴퓨터', p: 30 }, { t: ' 시스템', p: 12 }],
      [{ t: '가', p: 70 }, { t: '들이', p: 20 }, { t: '는', p: 8 }],
      [{ t: ' 학습합니다', p: 65 }, { t: ' 사고합니다', p: 22 }, { t: ' 처리합니다', p: 10 }],
      [{ t: '.', p: 88 }, { t: '!', p: 8 }, { t: ',', p: 3 }],
    ],
  },
];

export default function LlmTokenDiagram() {
  const [promptIdx, setPromptIdx] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [showProbs, setShowProbs] = useState(true);
  const timerRef = useRef(null);
  const data = PROMPTS[promptIdx];

  function reset(idx = promptIdx) {
    clearInterval(timerRef.current);
    setRevealed(0);
    setShowProbs(false);
    setTimeout(() => autoPlay(idx), 100);
  }

  function autoPlay(idx = promptIdx) {
    const d = PROMPTS[idx];
    setRevealed(0);
    let step = 0;
    timerRef.current = setInterval(() => {
      step++;
      setRevealed(step);
      if (step >= d.tokens.length) clearInterval(timerRef.current);
    }, 600);
  }

  useEffect(() => {
    autoPlay();
    return () => clearInterval(timerRef.current);
  }, []);

  const probStep = revealed > 0 ? Math.min(revealed - 1, data.probs.length - 1) : null;

  return (
    <div className="space-y-4">
      {/* 예시 선택 */}
      <div className="flex gap-2">
        {PROMPTS.map((p, i) => (
          <button key={i} onClick={() => { setPromptIdx(i); reset(i); }}
            className={`px-3 py-1 text-xs rounded-lg border transition-all ${promptIdx === i ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-500 hover:bg-gray-50'}`}>
            {p.label}: "{p.input}..."
          </button>
        ))}
      </div>

      {/* LLM 처리 흐름 */}
      <div className="bg-gray-950 rounded-xl p-4 space-y-3">
        {/* 입력 프롬프트 */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 w-16 flex-shrink-0">입력</span>
          <div className="bg-blue-900/40 border border-blue-700 rounded-lg px-3 py-2 text-sm font-mono text-blue-300">
            "{data.input}"
          </div>
        </div>

        {/* 토큰 생성 과정 */}
        <div className="flex items-start gap-3">
          <span className="text-xs text-gray-400 w-16 flex-shrink-0 mt-2">생성 중</span>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {data.tokens.map((token, i) => (
              <div key={i} className={`relative transition-all duration-300 ${i < revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <span
                  className="inline-block font-mono text-sm px-2 py-1 rounded"
                  style={{
                    backgroundColor: i === 0 ? '#1e3a5f' : i < revealed ? '#1a3a2a' : '#1f1f1f',
                    color: i === 0 ? '#93c5fd' : '#86efac',
                    border: `1px solid ${i === revealed - 1 ? '#22c55e' : 'transparent'}`,
                    boxShadow: i === revealed - 1 ? '0 0 8px #22c55e40' : 'none',
                  }}
                >
                  {token}
                </span>
                {/* 토큰 인덱스 */}
                <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 text-gray-600 text-xs">
                  {i > 0 ? i : ''}
                </span>
              </div>
            ))}
            {revealed > 0 && revealed < data.tokens.length && (
              <span className="inline-block w-2 h-5 bg-green-400 animate-pulse rounded-sm self-center" />
            )}
          </div>
        </div>

        {/* 확률 분포 */}
        {showProbs && probStep !== null && probStep < data.probs.length && (
          <div className="flex items-start gap-3 mt-2">
            <span className="text-xs text-gray-400 w-16 flex-shrink-0 mt-1">확률</span>
            <div className="flex-1 bg-gray-900 rounded-lg p-3 border border-gray-700">
              <div className="text-xs text-gray-500 mb-2">다음 토큰 후보 (샘플링)</div>
              <div className="space-y-1.5">
                {data.probs[probStep].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-300 w-24 text-right flex-shrink-0">"{item.t}"</span>
                    <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full transition-all duration-700"
                        style={{
                          width: `${item.p}%`,
                          backgroundColor: i === 0 ? '#22c55e' : i === 1 ? '#3b82f6' : '#6b7280',
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-8 flex-shrink-0">{item.p}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 컨트롤 */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => reset()} className="text-xs px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors">
          ▶ 재생
        </button>
        <button
          onClick={() => setShowProbs(!showProbs)}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${showProbs ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
        >
          📊 확률 분포 {showProbs ? '숨기기' : '보기'}
        </button>
        <div className="text-xs text-gray-500 self-center ml-auto">
          LLM은 매 스텝마다 다음 토큰을 확률적으로 선택합니다
        </div>
      </div>
    </div>
  );
}
