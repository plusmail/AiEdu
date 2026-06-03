import { useState } from 'react';

const NODES = [
  { id: 'llm',    x: 150, y: 50,  label: 'LLM',            icon: '🤖', color: '#8b5cf6', type: 'ai' },
  { id: 'vec',    x: 50,  y: 140, label: '벡터 DB',         icon: '🗄️', color: '#3b82f6', type: 'store' },
  { id: 'obs',    x: 250, y: 140, label: 'Obsidian',        icon: '💎', color: '#6366f1', type: 'app' },
  { id: 'ai',     x: 50,  y: 240, label: 'AI 아키텍처',    icon: '🏗️', color: '#10b981', type: 'doc' },
  { id: 'rag',    x: 150, y: 240, label: 'RAG 패턴',       icon: '🔍', color: '#10b981', type: 'doc' },
  { id: 'agent',  x: 250, y: 240, label: 'Agent 설계',     icon: '⚙️', color: '#10b981', type: 'doc' },
  { id: 'prompt', x: 100, y: 330, label: '프롬프트 엔지니어링', icon: '✍️', color: '#f59e0b', type: 'doc' },
  { id: 'embed',  x: 220, y: 330, label: '임베딩 기법',    icon: '📐', color: '#f59e0b', type: 'doc' },
];

const EDGES = [
  ['llm', 'vec'], ['llm', 'obs'], ['vec', 'ai'], ['vec', 'rag'],
  ['obs', 'agent'], ['ai', 'rag'], ['rag', 'agent'],
  ['ai', 'prompt'], ['rag', 'embed'], ['agent', 'embed'],
];

const AI_ACTIONS = [
  { icon: '📝', action: '요약', desc: '새 문서 → 핵심 3줄 자동 요약 + 태그 생성' },
  { icon: '🔗', action: '인덱싱', desc: '유사 문서 감지 → [[Wiki Link]] 자동 제안' },
  { icon: '♻️', action: '교차 참조', desc: '관련 개념 연결 → 지식 그래프 자동 구성' },
  { icon: '🗑️', action: '중복 감지', desc: '유사 내용 문서 발견 → 병합 제안' },
];

export default function LlmWikiDiagram() {
  const [tab, setTab] = useState('graph');
  const [hovNode, setHovNode] = useState(null);

  const hov = NODES.find(n => n.id === hovNode);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['graph', '지식 그래프'], ['actions', 'AI 자동 작업'], ['vs', 'RAG vs Wiki']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'graph' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500 text-center">
            AI가 능동적으로 유지하는 연결된 지식 그래프
          </div>
          <div className="bg-gray-950 rounded-xl overflow-hidden" style={{ height: 380 }}>
            <svg width="100%" height="380" viewBox="0 0 300 380">
              {EDGES.map(([a, b]) => {
                const na = NODES.find(n => n.id === a);
                const nb = NODES.find(n => n.id === b);
                return (
                  <line key={a + b}
                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke="#374151" strokeWidth="1.5" strokeDasharray="4,3" />
                );
              })}
              {NODES.map(n => {
                const isHov = hovNode === n.id;
                return (
                  <g key={n.id}
                    onMouseEnter={() => setHovNode(n.id)}
                    onMouseLeave={() => setHovNode(null)}
                    style={{ cursor: 'pointer' }}>
                    <circle cx={n.x} cy={n.y} r={isHov ? 22 : 18}
                      fill={n.color + (n.type === 'ai' ? 'ff' : '33')}
                      stroke={n.color}
                      strokeWidth={isHov ? 2.5 : 1.5}
                      style={{ transition: 'r 0.15s' }} />
                    <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="13">{n.icon}</text>
                    <text x={n.x} y={n.y + 30} textAnchor="middle" fontSize="8" fill={n.color} fontWeight="bold">
                      {n.label.length > 8 ? n.label.slice(0, 8) + '…' : n.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          {hov ? (
            <div className="rounded-xl border p-2.5 text-xs"
              style={{ borderColor: hov.color + '60', backgroundColor: hov.color + '08' }}>
              <span className="text-lg">{hov.icon}</span>
              <span className="font-bold ml-1" style={{ color: hov.color }}>{hov.label}</span>
              <span className="text-gray-400 ml-2">
                {hov.type === 'ai' ? 'AI 핵심 엔진' : hov.type === 'store' ? '벡터 저장소' : hov.type === 'app' ? '편집 UI' : '지식 문서 노드'}
              </span>
            </div>
          ) : (
            <div className="text-xs text-gray-400 text-center">노드 위에 마우스를 올려 확인하세요</div>
          )}
        </div>
      )}

      {tab === 'actions' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">
            단순 저장(RAG)과 달리 AI가 지식을 <strong>능동적으로 연결·유지</strong>
          </div>
          <div className="space-y-2">
            {AI_ACTIONS.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-2xl flex-shrink-0">{a.icon}</span>
                <div>
                  <div className="font-bold text-xs text-gray-700">{a.action}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">{`# Obsidian + LLM 자동화 파이프라인
새 파일 감지
→ LLM: 요약 + 태그 자동 생성
→ 임베딩 계산 → 벡터 DB 저장
→ 유사 문서 검색 → [[링크]] 제안
→ 지식 그래프 업데이트

# 질문 시
"RAG와 벡터 DB의 차이는?"
→ 관련 노드 클러스터 탐색
→ 연결된 문서들 통합 답변`}</pre>
        </div>
      )}

      {tab === 'vs' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                title: '기존 RAG', color: '#6b7280', icon: '🗂️',
                items: ['문서를 청크로 쪼개 저장', '쿼리 → 유사도 검색', '관계 없는 청크들', 'AI는 수동적 검색만'],
                limit: true,
              },
              {
                title: 'LLM Wiki', color: '#8b5cf6', icon: '🧩',
                items: ['문서 간 관계 능동 구성', 'AI가 연결·요약·인덱싱', '상호 연결된 지식 그래프', '지식이 계속 진화'],
                limit: false,
              },
            ].map(card => (
              <div key={card.title} className="rounded-xl border-2 p-3"
                style={{ borderColor: card.color + '50', backgroundColor: card.color + '08' }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-lg">{card.icon}</span>
                  <span className="font-bold text-xs" style={{ color: card.color }}>{card.title}</span>
                </div>
                {card.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600 mb-1">
                    <span style={{ color: card.limit ? '#9ca3af' : card.color }}>{card.limit ? '•' : '✓'}</span>
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-purple-700 mb-1">조직의 암묵지를 자산으로</div>
            <div className="text-gray-600">팀이 축적한 경험·노하우·결정 이유를 AI가 연결·정리해 새 팀원도 즉시 활용 가능한 살아있는 지식 베이스 구성</div>
          </div>
        </div>
      )}
    </div>
  );
}
