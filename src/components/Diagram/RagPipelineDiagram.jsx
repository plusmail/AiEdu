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

const LIMITS = [
  { icon: '⏰', label: '정보 단절', desc: '학습 데이터 이후 정보 없음 → RAG로 해결' },
  { icon: '💾', label: '컨텍스트 한계', desc: '매번 원본 재검색, 긴 문서는 담기 어려움' },
  { icon: '🔍', label: '검색 실패', desc: '쿼리와 청크가 어휘적으로 달라 못 찾을 수 있음' },
  { icon: '📖', label: '청킹 문제', desc: '문장 중간에서 잘리면 의미 손실 가능' },
];

export default function RagPipelineDiagram() {
  const [tab, setTab] = useState('pipeline');
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['pipeline','파이프라인'], ['limits','한계와 해결']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'pipeline' && (
        <div className="space-y-2">
          {/* 인덱싱 / 검색 구분 */}
          <div className="grid grid-cols-2 gap-2 text-xs text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-1.5 font-bold text-blue-600">📥 인덱싱 단계 (1회)</div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-1.5 font-bold text-orange-600">🔍 검색·생성 단계 (매 쿼리)</div>
          </div>

          {STEPS.map((s, i) => (
            <button key={s.id} onClick={() => setActiveStep(i)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all ${activeStep===i ? 'shadow-md' : 'opacity-70 hover:opacity-100'}`}
              style={{ borderColor: activeStep===i ? s.color : '#e5e7eb', backgroundColor: activeStep===i ? s.color+'08' : '#f9fafb' }}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 ${i < 3 ? '' : ''}`}
                style={{ backgroundColor: s.color }}>{i+1}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{s.icon}</span>
                  <span className="font-bold text-xs" style={{ color: s.color }}>{s.label}</span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                {activeStep===i && (
                  <div className="mt-1.5 text-xs text-gray-600 bg-white rounded-lg p-2 whitespace-pre-line border"
                    style={{ borderColor: s.color+'30' }}>{s.detail}</div>
                )}
              </div>
              {i < 2 && <span className="text-blue-300 text-xs mt-1 flex-shrink-0">인덱싱</span>}
              {i >= 3 && <span className="text-orange-300 text-xs mt-1 flex-shrink-0">검색·생성</span>}
            </button>
          ))}
        </div>
      )}

      {tab === 'limits' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">RAG가 해결하는 문제와 여전히 남는 한계</div>
          <div className="space-y-2">
            {LIMITS.map((l, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                <span className="text-xl flex-shrink-0">{l.icon}</span>
                <div>
                  <div className="font-bold text-gray-700">{l.label}</div>
                  <div className="text-gray-500 mt-0.5">{l.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-green-700 mb-1.5">개선 방향</div>
            <div className="space-y-1 text-gray-600">
              <div>• <strong>Hybrid Search:</strong> 벡터 검색 + BM25 키워드 검색 병합</div>
              <div>• <strong>Re-ranking:</strong> 검색된 청크를 LLM으로 재순위화</div>
              <div>• <strong>HyDE:</strong> 가상의 답변을 생성 후 그것으로 검색</div>
              <div>• <strong>GraphRAG:</strong> 지식 그래프로 관계 기반 검색</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
