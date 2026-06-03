import { useState } from 'react';

const STEPS = [
  { id: 'chunk',  icon: '✂️', label: '문서 청킹',       color: '#3b82f6',  desc: '긴 문서를 512~1024 토큰 크기로 분할', detail: '청크가 너무 크면 관련성 낮은 내용 포함\n청크가 너무 작으면 컨텍스트 부족' },
  { id: 'embed',  icon: '🔢', label: '벡터 임베딩',     color: '#8b5cf6',  desc: '각 청크를 고차원 벡터로 변환', detail: 'text-embedding-3-small 등 임베딩 모델 사용\n의미적으로 유사한 텍스트 = 벡터 공간에서 가까움' },
  { id: 'store',  icon: '🗄️', label: 'Vector DB 저장', color: '#10b981',  desc: '벡터와 원본 텍스트를 함께 저장', detail: 'Pinecone, Chroma, Weaviate, pgvector 등\nANN(근사 최근접 이웃) 검색으로 빠른 조회' },
  { id: 'query',  icon: '🔍', label: '쿼리 임베딩',     color: '#f59e0b',  desc: '사용자 질문을 벡터로 변환', detail: '동일한 임베딩 모델로 변환해야 같은 공간에 존재' },
  { id: 'search', icon: '📐', label: '코사인 유사도 검색', color: '#ef4444', desc: '쿼리 벡터와 가장 유사한 청크 상위 K개 반환', detail: 'cosine similarity = (A·B) / (|A||B|)\n1에 가까울수록 유사한 의미' },
  { id: 'inject', icon: '💉', label: '컨텍스트 주입',   color: '#6366f1',  desc: '검색된 청크를 프롬프트에 주입', detail: '"Context: [청크들]\n\nQuestion: [질문]\nAnswer:"' },
  { id: 'gen',    icon: '🤖', label: 'LLM 답변 생성',  color: '#059669',  desc: '컨텍스트를 바탕으로 답변 생성', detail: 'LLM은 검색된 컨텍스트를 기반으로만 답변\n학습 데이터에 없는 최신 정보도 답변 가능' },
];

export default function RagPipelineDiagram() {
  const [activeStep, setActiveStep] = useState(0);
  const [phase, setPhase] = useState(null);

  const visibleSteps = STEPS.filter((_, i) =>
    phase === null || (phase === 'index' ? i < 3 : i >= 3)
  );

  function togglePhase(p) {
    setPhase(prev => prev === p ? null : p);
    setActiveStep(p === 'search' ? 3 : 0);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 text-xs text-center">
        <button onClick={() => togglePhase('index')}
          className={`rounded-lg p-1.5 font-bold border-2 transition-all ${phase === 'index' ? 'bg-blue-500 text-white border-blue-500 shadow' : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'}`}>
          📥 인덱싱 단계 (1회)
        </button>
        <button onClick={() => togglePhase('search')}
          className={`rounded-lg p-1.5 font-bold border-2 transition-all ${phase === 'search' ? 'bg-orange-500 text-white border-orange-500 shadow' : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'}`}>
          🔍 검색·생성 단계 (매 쿼리)
        </button>
      </div>
      {phase && (
        <div className="text-xs text-center text-gray-400">
          클릭한 단계만 표시 중 — 다시 클릭하면 전체 보기
        </div>
      )}

      <div className="space-y-2">
        {visibleSteps.map((s) => {
          const i = STEPS.indexOf(s);
          return (
            <button key={s.id} onClick={() => setActiveStep(i)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all ${activeStep === i ? 'shadow-md' : 'opacity-70 hover:opacity-100'}`}
              style={{ borderColor: activeStep === i ? s.color : '#e5e7eb', backgroundColor: activeStep === i ? s.color + '08' : '#f9fafb' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ backgroundColor: s.color }}>{i + 1}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{s.icon}</span>
                  <span className="font-bold text-xs" style={{ color: s.color }}>{s.label}</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                {activeStep === i && (
                  <div className="mt-1.5 text-xs text-gray-600 bg-white rounded-lg p-2 whitespace-pre-line border"
                    style={{ borderColor: s.color + '30' }}>{s.detail}</div>
                )}
              </div>
              {i < 3 && <span className="text-blue-300 text-xs mt-1 flex-shrink-0">인덱싱</span>}
              {i >= 3 && <span className="text-orange-300 text-xs mt-1 flex-shrink-0">검색·생성</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
