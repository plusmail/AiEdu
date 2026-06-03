import { useState } from 'react';

const WORDS = [
  { word: 'king',   vec: [0.8, 0.2, 0.7, -0.1], color: '#3b82f6' },
  { word: 'queen',  vec: [0.7, 0.3, 0.6, -0.2], color: '#8b5cf6' },
  { word: 'man',    vec: [0.6, 0.1, 0.5, -0.3], color: '#10b981' },
  { word: 'woman',  vec: [0.5, 0.4, 0.4, -0.2], color: '#f59e0b' },
  { word: 'apple',  vec: [-0.2, 0.8, -0.1, 0.7], color: '#ef4444' },
  { word: 'orange', vec: [-0.3, 0.9, -0.2, 0.6], color: '#f97316' },
];

const POS_TYPES = [
  {
    id: 'absolute', label: '절대 위치 (GPT)', color: '#3b82f6',
    desc: '각 위치마다 별도 임베딩 학습 (nn.Embedding)',
    pros: '단순하고 직관적', cons: '학습 길이 초과 시 일반화 어려움',
  },
  {
    id: 'sinusoidal', label: '사인파 (원논문)', color: '#10b981',
    desc: 'sin/cos 함수로 각 차원에 다른 주파수 인코딩',
    pros: '학습 불필요, 임의 길이 가능', cons: '상대 거리 표현 약함',
  },
  {
    id: 'rope', label: 'RoPE (현대 모델)', color: '#8b5cf6',
    desc: '회전 행렬로 어텐션 스코어에 위치 정보 직접 주입',
    pros: '상대 거리 자연스럽게 표현, 긴 컨텍스트 강함', cons: '구현 복잡',
  },
];

export default function TokenEmbeddingDiagram() {
  const [tab, setTab] = useState('embedding');
  const [hovWord, setHovWord] = useState(null);
  const [posType, setPosType] = useState('rope');

  const hov = WORDS.find(w => w.word === hovWord);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['embedding', '토큰 임베딩'], ['analogy', '의미 연산'], ['positional', '위치 인코딩']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'embedding' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500 text-center">
            토큰 ID → 고차원 벡터 공간 배치. 비슷한 의미 = 가까운 위치
          </div>

          {/* 2D 벡터 공간 시각화 (처음 두 차원) */}
          <div className="relative bg-gray-950 rounded-xl overflow-hidden" style={{ height: 220 }}>
            <svg width="100%" height="220" viewBox="0 0 300 220">
              {/* 축 */}
              <line x1="20" y1="110" x2="280" y2="110" stroke="#374151" strokeWidth="1" />
              <line x1="150" y1="10" x2="150" y2="210" stroke="#374151" strokeWidth="1" />
              <text x="275" y="108" fill="#6b7280" fontSize="9">dim₁</text>
              <text x="152" y="18" fill="#6b7280" fontSize="9">dim₂</text>

              {/* 단어 점 */}
              {WORDS.map((w) => {
                const x = 150 + w.vec[0] * 110;
                const y = 110 - w.vec[1] * 90;
                const isHov = hovWord === w.word;
                return (
                  <g key={w.word}>
                    <circle cx={x} cy={y} r={isHov ? 10 : 7}
                      fill={w.color} opacity={isHov ? 1 : 0.8}
                      style={{ cursor: 'pointer', transition: 'r 0.2s' }}
                      onMouseEnter={() => setHovWord(w.word)}
                      onMouseLeave={() => setHovWord(null)} />
                    <text x={x + 12} y={y + 4} fill={w.color} fontSize="10" fontWeight="bold">{w.word}</text>
                  </g>
                );
              })}

              {/* king-queen, man-woman 유사성 선 */}
              {[['king', 'queen'], ['man', 'woman'], ['apple', 'orange']].map(([a, b]) => {
                const wa = WORDS.find(w => w.word === a);
                const wb = WORDS.find(w => w.word === b);
                return (
                  <line key={a + b}
                    x1={150 + wa.vec[0] * 110} y1={110 - wa.vec[1] * 90}
                    x2={150 + wb.vec[0] * 110} y2={110 - wb.vec[1] * 90}
                    stroke="#374151" strokeWidth="1" strokeDasharray="3,3" />
                );
              })}
            </svg>
          </div>

          {/* hover 상세 */}
          {hov ? (
            <div className="rounded-xl border-2 p-3 text-xs"
              style={{ borderColor: hov.color, backgroundColor: hov.color + '10' }}>
              <div className="font-bold mb-1" style={{ color: hov.color }}>"{hov.word}" 임베딩 벡터</div>
              <div className="flex gap-1.5 flex-wrap">
                {hov.vec.map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <div className="w-10 h-8 rounded flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: v > 0 ? hov.color : '#6b7280', opacity: Math.abs(v) + 0.3 }}>
                      {v.toFixed(1)}
                    </div>
                    <span className="text-gray-400" style={{ fontSize: 9 }}>d{i}</span>
                  </div>
                ))}
                <span className="text-gray-400 self-center">... (실제 768차원)</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-400 text-center bg-gray-50 rounded-xl p-2 border border-gray-200">
              단어 점 위에 마우스를 올려 임베딩 벡터를 확인하세요
            </div>
          )}
        </div>
      )}

      {tab === 'analogy' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500 text-center">
            임베딩 공간에서 벡터 연산으로 의미 관계 표현 가능
          </div>

          <div className="bg-gray-950 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {[
                { word: 'king',  color: '#3b82f6' },
                { word: '−',     color: '#6b7280', plain: true },
                { word: 'man',   color: '#10b981' },
                { word: '+',     color: '#6b7280', plain: true },
                { word: 'woman', color: '#f59e0b' },
                { word: '≈',     color: '#6b7280', plain: true },
                { word: 'queen', color: '#8b5cf6', highlight: true },
              ].map((item, i) => (
                item.plain ? (
                  <span key={i} className="text-gray-400 text-xl font-bold">{item.word}</span>
                ) : (
                  <div key={i} className={`px-3 py-2 rounded-xl text-sm font-black text-white ${item.highlight ? 'scale-110 shadow-lg' : ''}`}
                    style={{ backgroundColor: item.color, boxShadow: item.highlight ? `0 0 16px ${item.color}80` : 'none' }}>
                    {item.word}
                  </div>
                )
              ))}
            </div>
            <div className="text-xs text-center text-gray-500">
              "왕에서 남성성을 빼고 여성성을 더하면 = 여왕"
            </div>
          </div>

          <div className="space-y-2">
            {[
              { eq: 'Paris - France + Germany ≈ Berlin', desc: '국가-수도 관계' },
              { eq: 'walked - walk + run ≈ ran', desc: '동사 시제 변환' },
              { eq: '한국 - 서울 + 도쿄 ≈ 일본', desc: '국가-도시 관계' },
            ].map((ex, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                <code className="font-mono text-purple-700 flex-1">{ex.eq}</code>
                <span className="text-gray-400 flex-shrink-0">{ex.desc}</span>
              </div>
            ))}
          </div>

          <div className="text-xs bg-blue-50 border border-blue-200 rounded-xl p-3">
            <div className="font-bold text-blue-700 mb-1">이게 가능한 이유</div>
            <div className="text-gray-600">임베딩 벡터는 단순 암기가 아닌 의미적 구조를 학습합니다. 방대한 텍스트에서 함께 등장하는 패턴을 통해 단어 간 관계가 벡터 방향으로 인코딩됩니다.</div>
          </div>
        </div>
      )}

      {tab === 'positional' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">
            트랜스포머는 순서 개념이 없음 → 위치 정보를 따로 더해줘야 함
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-gray-700 mb-2">최종 입력 벡터</div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-bold">토큰 임베딩</span>
              <span className="text-gray-400 font-bold">+</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded font-bold">위치 임베딩</span>
              <span className="text-gray-400 font-bold">=</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-bold">트랜스포머 입력</span>
            </div>
          </div>

          <div className="space-y-2">
            {POS_TYPES.map(pt => (
              <button key={pt.id} onClick={() => setPosType(pt.id)}
                className={`w-full p-3 rounded-xl border-2 text-left transition-all ${posType === pt.id ? 'shadow-md' : 'opacity-60 hover:opacity-90'}`}
                style={{ borderColor: posType === pt.id ? pt.color : '#e5e7eb', backgroundColor: posType === pt.id ? pt.color + '08' : '#f9fafb' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xs" style={{ color: pt.color }}>{pt.label}</span>
                </div>
                <div className="text-xs text-gray-500">{pt.desc}</div>
                {posType === pt.id && (
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-green-50 border border-green-200 rounded p-1.5">
                      <span className="text-green-600 font-bold">장점: </span>{pt.pros}
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded p-1.5">
                      <span className="text-red-600 font-bold">단점: </span>{pt.cons}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono">{`# RoPE (LLaMA, Mistral, Qwen 등 현대 모델)
# 어텐션 Q·K 계산 시 회전 행렬 적용
def apply_rope(x, position):
    cos, sin = get_rotation(position)
    return x * cos + rotate_half(x) * sin

# 결과: 내적 Q·K에 상대 위치가 자동 반영`}</pre>
        </div>
      )}
    </div>
  );
}
