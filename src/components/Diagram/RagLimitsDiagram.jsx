import { useState } from 'react';

const LIMITS = [
  {
    id: 'chunking',
    icon: '✂️', label: '청킹 문제', color: '#ef4444',
    problem: '문단 중간에서 잘리면 의미 단절 발생',
    example: '"딥러닝은 인공신경망을 기반으로 [잘림]\n복잡한 패턴을 학습합니다"',
    solution: 'Semantic Chunking: 문장·문단 경계 기준 분할\nOverlapping: 앞뒤 청크 일부 중첩 저장',
  },
  {
    id: 'search',
    icon: '🔎', label: '검색 실패 (어휘 불일치)', color: '#f59e0b',
    problem: '쿼리 표현과 저장 표현이 달라 못 찾는 경우',
    example: '쿼리: "ML 모델 성능 개선"\n저장: "정확도 향상 기법" → 유사도 낮음',
    solution: 'HyDE: 가상 답변을 먼저 생성 후 그것으로 검색\nHybrid Search: 벡터 + BM25 키워드 병합',
  },
  {
    id: 'overload',
    icon: '📦', label: '컨텍스트 과부하', color: '#8b5cf6',
    problem: '관련성 낮은 청크가 주입되면 오히려 성능 저하',
    example: 'Top-K=10으로 너무 많이 검색\n→ 핵심 내용이 잡음에 묻힘',
    solution: 'Re-ranking: Cross-encoder로 재순위화\nK 값 튜닝: 3~5개가 일반적으로 최적',
  },
  {
    id: 'memory',
    icon: '🧠', label: '장기 메모리 부재', color: '#6366f1',
    problem: '대화 이력 전체를 컨텍스트에 담기 어려움',
    example: '100턴 대화 → 토큰 초과\n→ 초기 내용 유실',
    solution: '요약 압축: 오래된 대화 LLM으로 요약\n메모리 DB: 중요 정보 벡터 DB에 따로 저장',
  },
];

const GRAPH_RAG = [
  { icon: '🗂️', label: '기존 RAG',   desc: '청크 단위 벡터 유사도만으로 검색',          color: '#6b7280' },
  { icon: '🕸️', label: 'GraphRAG',   desc: '개체 간 관계 그래프 + 지식 커뮤니티 탐색',   color: '#8b5cf6' },
];

export default function RagLimitsDiagram() {
  const [tab, setTab] = useState('limits');
  const [activeId, setActiveId] = useState('chunking');

  const active = LIMITS.find(l => l.id === activeId);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['limits', '구조적 한계'], ['solutions', '개선 전략'], ['graphrag', 'GraphRAG']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'limits' && (
        <div className="space-y-2">
          <div className="text-xs text-gray-500">항목을 클릭해 문제와 해결책을 확인하세요</div>
          {LIMITS.map(l => (
            <button key={l.id} onClick={() => setActiveId(l.id)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all ${activeId === l.id ? 'shadow-md' : 'opacity-70 hover:opacity-100'}`}
              style={{ borderColor: activeId === l.id ? l.color : '#e5e7eb', backgroundColor: activeId === l.id ? l.color + '08' : '#f9fafb' }}>
              <span className="text-xl flex-shrink-0 mt-0.5">{l.icon}</span>
              <div className="flex-1">
                <div className="font-bold text-xs mb-0.5" style={{ color: l.color }}>{l.label}</div>
                <div className="text-xs text-gray-500">{l.problem}</div>
                {activeId === l.id && (
                  <div className="mt-2 space-y-2">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-xs">
                      <div className="font-bold text-red-600 mb-1">예시</div>
                      <pre className="text-gray-600 whitespace-pre-wrap font-mono text-xs leading-relaxed">{l.example}</pre>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-xs">
                      <div className="font-bold text-green-600 mb-1">해결책</div>
                      <pre className="text-gray-600 whitespace-pre-wrap text-xs leading-relaxed">{l.solution}</pre>
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {tab === 'solutions' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">RAG 성능을 끌어올리는 핵심 기법들</div>
          {[
            { icon: '🔀', name: 'Hybrid Search', color: '#3b82f6',
              desc: '벡터 검색(의미) + BM25 키워드 검색 결과를 RRF로 병합',
              code: '# Reciprocal Rank Fusion\nscore = Σ 1/(k + rank_i)' },
            { icon: '🔁', name: 'Re-ranking', color: '#8b5cf6',
              desc: 'Top-K 결과를 Cross-encoder 모델로 재정렬 → 정밀도 향상',
              code: 'retriever → top-20 → reranker → top-3 → LLM' },
            { icon: '💡', name: 'HyDE', color: '#10b981',
              desc: '질문 → LLM이 가상 답변 생성 → 그 답변으로 검색',
              code: 'query → LLM → hypothetical_answer\n→ embed(hypothetical_answer) → search' },
            { icon: '🧩', name: 'Semantic Chunking', color: '#f59e0b',
              desc: '고정 크기 대신 문장 임베딩 유사도 급변점에서 분할',
              code: 'sentences → embed → cosine_diff\n→ split at low-similarity boundaries' },
          ].map(s => (
            <div key={s.name} className="rounded-xl border-2 p-3"
              style={{ borderColor: s.color + '40', backgroundColor: s.color + '06' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{s.icon}</span>
                <span className="font-bold text-xs" style={{ color: s.color }}>{s.name}</span>
              </div>
              <div className="text-xs text-gray-600 mb-2">{s.desc}</div>
              <pre className="bg-gray-950 text-green-300 text-xs rounded-lg p-2 font-mono leading-relaxed">{s.code}</pre>
            </div>
          ))}
        </div>
      )}

      {tab === 'graphrag' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {GRAPH_RAG.map(g => (
              <div key={g.label} className="rounded-xl border-2 p-3"
                style={{ borderColor: g.color + '50', backgroundColor: g.color + '08' }}>
                <div className="text-2xl mb-1">{g.icon}</div>
                <div className="font-bold text-xs mb-1" style={{ color: g.color }}>{g.label}</div>
                <div className="text-xs text-gray-600">{g.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs space-y-2">
            <div className="font-bold text-gray-700">GraphRAG가 강한 질문 유형</div>
            {[
              '"A 기술이 B 산업에 미치는 영향은?"',
              '"C와 D의 공통점과 차이점은?"',
              '"E 사건의 원인 → 결과 연쇄는?"',
            ].map((q, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-purple-500 font-bold flex-shrink-0">Q.</span>
                <span className="text-gray-600">{q}</span>
              </div>
            ))}
          </div>

          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">{`# Microsoft GraphRAG 흐름
문서 → 개체(entity) 추출
     → 관계(relation) 추출
     → 지식 그래프 구성
     → 커뮤니티 요약 생성

쿼리 → 관련 커뮤니티 탐색
     → 개체 간 경로 추적
     → 통합 답변 생성`}</pre>
        </div>
      )}
    </div>
  );
}
