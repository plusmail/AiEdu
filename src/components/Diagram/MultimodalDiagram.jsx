import { useState } from 'react';

const CLIP_STEPS = [
  { icon: '🖼️', label: '이미지 입력', desc: '고양이 사진', color: '#3b82f6' },
  { icon: '🔢', label: 'Vision Encoder', desc: 'ViT로 이미지 → 벡터', color: '#8b5cf6' },
  { icon: '📐', label: '이미지 임베딩', desc: '[0.82, -0.31, ..., 0.54]', color: '#8b5cf6' },
];
const CLIP_TEXT_STEPS = [
  { icon: '💬', label: '텍스트 입력', desc: '"a photo of a cat"', color: '#10b981' },
  { icon: '🔤', label: 'Text Encoder', desc: 'Transformer로 텍스트 → 벡터', color: '#f59e0b' },
  { icon: '📐', label: '텍스트 임베딩', desc: '[0.79, -0.33, ..., 0.51]', color: '#f59e0b' },
];

const PAIRS = [
  { img: '🐱', texts: ['"고양이 사진"', '"a cat"', '"귀여운 동물"'], correct: 0, color: '#10b981' },
  { img: '🐶', texts: ['"강아지와 공"', '"개 사진"', '"날씨가 맑음"'], correct: 1, color: '#3b82f6' },
  { img: '🌅', texts: ['"저녁 노을"', '"도시 풍경"', '"일출 사진"'], correct: 0, color: '#f59e0b' },
];

export default function MultimodalDiagram() {
  const [tab, setTab] = useState('clip');
  const [selectedPair, setSelectedPair] = useState(0);
  const [guessed, setGuessed] = useState(null);

  const pair = PAIRS[selectedPair];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['clip','CLIP 모델'], ['matching','이미지-텍스트 매칭'], ['arch','멀티모달 LLM']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'clip' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500 text-center">이미지와 텍스트를 같은 벡터 공간으로 정렬 (대조 학습)</div>

          {/* 두 인코더 흐름 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              {CLIP_STEPS.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 p-2 rounded-lg border text-xs"
                    style={{ backgroundColor: s.color+'10', borderColor: s.color+'40' }}>
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <div className="font-bold" style={{ color: s.color }}>{s.label}</div>
                      <div className="text-gray-500">{s.desc}</div>
                    </div>
                  </div>
                  {i < CLIP_STEPS.length - 1 && <div className="text-center text-gray-300">↓</div>}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {CLIP_TEXT_STEPS.map((s, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 p-2 rounded-lg border text-xs"
                    style={{ backgroundColor: s.color+'10', borderColor: s.color+'40' }}>
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <div className="font-bold" style={{ color: s.color }}>{s.label}</div>
                      <div className="text-gray-500">{s.desc}</div>
                    </div>
                  </div>
                  {i < CLIP_TEXT_STEPS.length - 1 && <div className="text-center text-gray-300">↓</div>}
                </div>
              ))}
            </div>
          </div>

          {/* 코사인 유사도 */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs text-center">
            <div className="text-2xl mb-1">📐</div>
            <div className="font-bold text-purple-700">코사인 유사도로 쌍 매칭</div>
            <div className="text-gray-600 mt-1">올바른 (이미지, 텍스트) 쌍 → 유사도 ↑<br/>잘못된 쌍 → 유사도 ↓ (대조 학습)</div>
          </div>
        </div>
      )}

      {tab === 'matching' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">CLIP이 이미지에 맞는 텍스트를 고르는 방법</div>
          <div className="flex gap-2 mb-2">
            {PAIRS.map((p, i) => (
              <button key={i} onClick={() => { setSelectedPair(i); setGuessed(null); }}
                className={`flex-1 py-2 rounded-xl border-2 text-2xl text-center transition-all ${selectedPair===i ? 'scale-110 shadow-md' : 'opacity-60'}`}
                style={{ borderColor: selectedPair===i ? p.color : '#e5e7eb', backgroundColor: selectedPair===i ? p.color+'10' : 'white' }}>
                {p.img}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {pair.texts.map((t, i) => (
              <button key={i} onClick={() => setGuessed(i)}
                className={`w-full p-3 rounded-xl border-2 text-xs font-bold text-left transition-all ${
                  guessed === null ? 'bg-gray-50 border-gray-200 hover:border-gray-400' :
                  i === pair.correct ? 'bg-green-50 border-green-400 text-green-700' :
                  guessed === i ? 'bg-red-50 border-red-300 text-red-600' :
                  'bg-gray-50 border-gray-200 opacity-50'
                }`}>
                {guessed !== null && i === pair.correct && '✅ '}
                {guessed !== null && guessed === i && i !== pair.correct && '❌ '}
                {t}
              </button>
            ))}
          </div>
          {guessed !== null && (
            <div className={`text-center text-sm font-bold ${guessed===pair.correct ? 'text-green-600' : 'text-red-600'}`}>
              {guessed===pair.correct ? '🎉 CLIP도 이렇게 판단합니다!' : `❌ CLIP은 "${pair.texts[pair.correct]}"을 선택합니다`}
            </div>
          )}
        </div>
      )}

      {tab === 'arch' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">LLaVA, GPT-4V 등 멀티모달 LLM 아키텍처</div>
          <div className="flex flex-col gap-2">
            {[
              { label: '🖼️ 이미지', color: '#3b82f6', note: '입력' },
              { label: '🔢 Vision Encoder (ViT)', color: '#8b5cf6', note: '이미지 → 패치 벡터' },
              { label: '🔗 Projection Layer (MLP)', color: '#f59e0b', note: '비전 공간 → LLM 텍스트 공간으로 변환' },
              { label: '💬 + 텍스트 토큰 병합', color: '#10b981', note: '[이미지 패치들] + [텍스트 토큰들]' },
              { label: '🤖 LLM (GPT/LLaMA)', color: '#6366f1', note: '통합 처리 후 텍스트 생성' },
              { label: '📝 텍스트 출력', color: '#059669', note: '"사진에는 고양이가..."' },
            ].map((row, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 p-2.5 rounded-xl border text-xs"
                  style={{ backgroundColor: row.color+'10', borderColor: row.color+'40' }}>
                  <span className="font-bold flex-1" style={{ color: row.color }}>{row.label}</span>
                  <span className="text-gray-500">{row.note}</span>
                </div>
                {i < 5 && <div className="text-center text-gray-300 py-0.5">↓</div>}
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-yellow-700 mb-1">Projection Layer가 핵심</div>
            <div className="text-gray-600">Vision Encoder와 LLM은 서로 다른 차원의 벡터 공간을 사용합니다. Projection Layer(MLP)가 이 간극을 연결하여 LLM이 이미지를 "이해"할 수 있게 합니다.</div>
          </div>
        </div>
      )}
    </div>
  );
}
