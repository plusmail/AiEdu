import { useState } from 'react';

const BLOCKS = [
  {
    id: 'input',
    label: '입력 토큰',
    sublabel: 'Input Tokens',
    color: '#6b7280',
    icon: '📝',
    detail: {
      formula: 'tokens = tokenize("파이썬은 재미있다")',
      desc: '텍스트를 숫자 ID로 변환합니다. "파이썬은" → 12543, "재미있다" → 8821처럼 단어/서브워드 단위로 쪼갭니다.',
      note: 'GPT-4는 약 100,000개의 토큰 어휘를 사용합니다.',
    },
  },
  {
    id: 'embed',
    label: '임베딩 + 위치 인코딩',
    sublabel: 'Embedding + Positional Encoding',
    color: '#3b82f6',
    icon: '🔢',
    detail: {
      formula: 'x = Embed(token) + PosEnc(position)',
      desc: '토큰 ID를 고차원 벡터(예: 768차원)로 변환하고, 위치 정보(몇 번째 단어인지)를 더해줍니다.',
      note: '"고양이"와 "개"의 벡터는 가깝고, "로켓"과는 멀리 배치됩니다.',
    },
  },
  {
    id: 'attn',
    label: '멀티헤드 어텐션',
    sublabel: 'Multi-Head Self-Attention',
    color: '#7c3aed',
    icon: '👁️',
    detail: {
      formula: 'Attn(Q,K,V) = softmax(QK^T / √d_k) · V',
      desc: '문장 내 모든 단어가 서로를 "얼마나 주목할지" 계산합니다. "그것이 맛있었다"에서 "그것"이 "음식"을 참조합니다.',
      note: 'Q(Query)·K(Key)로 관련성 점수 → softmax → V(Value)의 가중 합',
    },
  },
  {
    id: 'ffn',
    label: '피드포워드 네트워크',
    sublabel: 'Feed-Forward Network',
    color: '#059669',
    icon: '⚡',
    detail: {
      formula: 'FFN(x) = GELU(xW₁ + b₁)W₂ + b₂',
      desc: '각 위치의 표현을 개별적으로 변환합니다. 2개의 선형 레이어 사이에 GELU 활성화 함수를 끼웁니다.',
      note: '중간 차원이 입력의 4배입니다 (768 → 3072 → 768).',
    },
  },
  {
    id: 'norm',
    label: '레이어 정규화 + 잔차 연결',
    sublabel: 'LayerNorm + Residual',
    color: '#d97706',
    icon: '🔄',
    detail: {
      formula: 'x = LayerNorm(x + sublayer(x))',
      desc: '잔차 연결(x + ...)은 그래디언트 소실 문제를 해결하고, LayerNorm은 학습을 안정화합니다.',
      note: 'Transformer 블록이 12~96개 쌓입니다 (GPT-2: 12, GPT-4: ~96 추정).',
    },
  },
  {
    id: 'output',
    label: '출력 헤드',
    sublabel: 'Linear + Softmax',
    color: '#dc2626',
    icon: '🎯',
    detail: {
      formula: 'P(next) = softmax(xW_out)',
      desc: '마지막 레이어의 벡터를 어휘 크기(~100K)로 사영해서 각 토큰이 다음에 올 확률을 계산합니다.',
      note: '가장 높은 확률의 토큰을 선택하거나, 확률 분포에서 샘플링합니다.',
    },
  },
];

const N_BLOCKS = 6; // 반복되는 Transformer 블록 수 표시

export default function TransformerDiagram() {
  const [active, setActive] = useState('attn');
  const activeBlock = BLOCKS.find(b => b.id === active);

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* 아키텍처 흐름도 */}
      <div className="flex-shrink-0 flex flex-col items-center gap-1 min-w-[220px]">
        <div className="text-xs text-gray-400 mb-1 self-start">▼ 아래 방향으로 데이터 흐름</div>

        {BLOCKS.map((block, i) => {
          const isActive = active === block.id;
          const isRepeat = block.id === 'attn' || block.id === 'ffn' || block.id === 'norm';
          return (
            <div key={block.id} className="w-full flex flex-col items-center">
              {/* Transformer 블록 반복 표시 시작 */}
              {block.id === 'attn' && (
                <div className="w-full flex items-center gap-2 mb-1 text-xs text-purple-600 font-bold">
                  <div className="flex-1 border-t-2 border-dashed border-purple-300" />
                  <span>× {N_BLOCKS} 반복</span>
                  <div className="flex-1 border-t-2 border-dashed border-purple-300" />
                </div>
              )}

              <button
                onClick={() => setActive(block.id)}
                className="w-full px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all text-left border-2"
                style={{
                  backgroundColor: isActive ? block.color + '20' : 'white',
                  borderColor: isActive ? block.color : '#e5e7eb',
                  boxShadow: isActive ? `0 0 12px ${block.color}30` : 'none',
                }}
              >
                <span className="text-xl flex-shrink-0">{block.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate" style={{ color: isActive ? block.color : '#374151' }}>
                    {block.label}
                  </div>
                  <div className="text-xs text-gray-400 truncate">{block.sublabel}</div>
                </div>
              </button>

              {/* 화살표 */}
              {i < BLOCKS.length - 1 && (
                <div className="w-0.5 h-4 bg-gray-300 flex-shrink-0" />
              )}

              {/* 반복 블록 끝 */}
              {block.id === 'norm' && (
                <div className="w-full flex items-center gap-2 mt-1 text-xs text-purple-600 font-bold">
                  <div className="flex-1 border-b-2 border-dashed border-purple-300" />
                  <span>Transformer Block ×{N_BLOCKS}</span>
                  <div className="flex-1 border-b-2 border-dashed border-purple-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 상세 설명 패널 */}
      <div className="flex-1 space-y-3">
        {activeBlock && (
          <div
            className="rounded-xl p-5 border-2 transition-all duration-300 space-y-3"
            style={{ borderColor: activeBlock.color, backgroundColor: activeBlock.color + '0d' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeBlock.icon}</span>
              <div>
                <div className="font-bold text-lg" style={{ color: activeBlock.color }}>{activeBlock.label}</div>
                <div className="text-xs text-gray-400">{activeBlock.sublabel}</div>
              </div>
            </div>

            {/* 수식 */}
            <div className="bg-gray-900 rounded-lg px-4 py-3 font-mono text-sm text-green-300 overflow-x-auto">
              {activeBlock.detail.formula}
            </div>

            {/* 설명 */}
            <p className="text-sm text-gray-700 leading-relaxed">{activeBlock.detail.desc}</p>

            {/* 부가 노트 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-xs text-yellow-800">
              💡 {activeBlock.detail.note}
            </div>
          </div>
        )}

        {/* bbycroft 외부 링크 안내 */}
        <a
          href="https://bbycroft.net/llm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-4 text-white hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl">🌐</span>
          <div>
            <div className="font-bold text-sm">bbycroft.net/llm — 3D 인터랙티브 시각화</div>
            <div className="text-xs text-purple-200 mt-0.5">GPT-2 모델의 실제 가중치가 작동하는 과정을 3D로 탐색</div>
          </div>
          <span className="ml-auto text-purple-300 text-sm">↗ 열기</span>
        </a>
      </div>
    </div>
  );
}
