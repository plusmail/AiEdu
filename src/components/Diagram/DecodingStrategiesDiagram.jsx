import { useState } from 'react';

// 다음 토큰 후보 확률
const CANDIDATES = [
  { token: 'the',    prob: 0.35 },
  { token: 'a',      prob: 0.22 },
  { token: 'some',   prob: 0.15 },
  { token: 'this',   prob: 0.10 },
  { token: 'any',    prob: 0.08 },
  { token: 'every',  prob: 0.05 },
  { token: 'random', prob: 0.03 },
  { token: 'xyz',    prob: 0.02 },
];

function softmaxWithTemp(probs, temp) {
  if (temp === 0) {
    const maxP = Math.max(...probs);
    return probs.map(p => (p === maxP ? 1 : 0));
  }
  const logits = probs.map(p => Math.log(p) / temp);
  const maxLogit = Math.max(...logits);
  const exps = logits.map(l => Math.exp(l - maxLogit));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

export default function DecodingStrategiesDiagram() {
  const [temp, setTemp] = useState(1.0);
  const [topK, setTopK] = useState(5);
  const [topP, setTopP] = useState(0.9);
  const [strategy, setStrategy] = useState('temperature');

  const baseProbs = CANDIDATES.map(c => c.prob);
  const tempProbs = softmaxWithTemp(baseProbs, temp);

  // Top-K 마스킹
  const sortedIdx = [...tempProbs.keys()].sort((a, b) => tempProbs[b] - tempProbs[a]);
  const topKSet = new Set(sortedIdx.slice(0, topK));

  // Top-P 마스킹
  let cumulative = 0;
  const topPSet = new Set();
  for (const idx of sortedIdx) {
    if (cumulative < topP) { topPSet.add(idx); cumulative += tempProbs[idx]; }
    else break;
  }

  const isActive = (i) => {
    if (strategy === 'temperature') return true;
    if (strategy === 'topk') return topKSet.has(i);
    return topPSet.has(i);
  };

  const maxProb = Math.max(...tempProbs);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['temperature','Temperature'], ['topk','Top-K'], ['topp','Top-P']].map(([id, lb]) => (
          <button key={id} onClick={() => setStrategy(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${strategy===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {/* 설명 */}
      <div className={`rounded-xl p-3 text-xs border ${
        strategy==='temperature' ? 'bg-orange-50 border-orange-200' :
        strategy==='topk' ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'
      }`}>
        {strategy === 'temperature' && (
          <>
            <div className="font-bold text-orange-700 mb-1">🌡️ Temperature — 창의성 조절</div>
            <div className="text-gray-600">T→0: 항상 가장 높은 확률 선택 (결정론적), T=1: 원래 확률 그대로, T&gt;1: 낮은 확률 단어도 선택 가능 (창의적)</div>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-blue-600">결정론적 (T={temp.toFixed(1)})</span>
                <span className="text-red-600">창의적</span>
              </div>
              <input type="range" min={0.1} max={2.0} step={0.1} value={temp}
                onChange={e => setTemp(Number(e.target.value))} className="w-full accent-orange-500"/>
            </div>
          </>
        )}
        {strategy === 'topk' && (
          <>
            <div className="font-bold text-blue-700 mb-1">🔵 Top-K — 상위 K개만 허용</div>
            <div className="text-gray-600">상위 K개 토큰만 선택 풀에 포함합니다. 낮은 확률의 어색한 단어를 차단합니다.</div>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1"><span>K = {topK}</span></div>
              <input type="range" min={1} max={8} step={1} value={topK}
                onChange={e => setTopK(Number(e.target.value))} className="w-full accent-blue-500"/>
            </div>
          </>
        )}
        {strategy === 'topp' && (
          <>
            <div className="font-bold text-green-700 mb-1">🟢 Top-P (Nucleus) — 누적 확률 p까지</div>
            <div className="text-gray-600">누적 확률이 p에 도달할 때까지의 토큰만 포함합니다. 상황에 따라 후보 수가 동적으로 변합니다.</div>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1"><span>p = {topP.toFixed(2)}</span></div>
              <input type="range" min={0.5} max={1.0} step={0.05} value={topP}
                onChange={e => setTopP(Number(e.target.value))} className="w-full accent-green-500"/>
            </div>
          </>
        )}
      </div>

      {/* 확률 분포 막대 */}
      <div className="space-y-1.5">
        {CANDIDATES.map((c, i) => {
          const p = tempProbs[i];
          const active = isActive(i);
          return (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-14 text-right text-xs font-mono font-bold ${active ? 'text-gray-700' : 'text-gray-300'}`}>
                {c.token}
              </div>
              <div className="flex-1 h-6 bg-gray-100 rounded-lg overflow-hidden">
                <div className="h-full rounded-lg transition-all duration-300 flex items-center pl-2"
                  style={{
                    width: `${(p / maxProb) * 100}%`,
                    backgroundColor: active
                      ? strategy==='temperature' ? '#f97316'
                        : strategy==='topk' ? '#3b82f6' : '#10b981'
                      : '#d1d5db',
                  }}>
                  {p > 0.05 && (
                    <span className="text-white text-xs font-bold">{(p*100).toFixed(1)}%</span>
                  )}
                </div>
              </div>
              {!active && <span className="text-xs text-red-400 w-4">✗</span>}
              {active && <span className="text-xs text-gray-400 w-4"/>}
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs">
        <div className="font-bold text-gray-700 mb-1">실전 권장 설정</div>
        <div className="space-y-1 text-gray-600">
          <div>📝 <strong>사실 답변, 코드 생성:</strong> Temperature=0.1~0.3</div>
          <div>✍️ <strong>일반 텍스트 생성:</strong> Temperature=0.7~1.0 + Top-P=0.9</div>
          <div>🎨 <strong>창의적 글쓰기:</strong> Temperature=1.2~1.5 + Top-K=50</div>
        </div>
      </div>
    </div>
  );
}
