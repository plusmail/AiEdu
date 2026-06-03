import { useState } from 'react';

const PHASES = [
  {
    id: 'sft', icon: '📚', label: 'SFT', fullLabel: '지도 미세 조정 (SFT)',
    color: '#3b82f6',
    desc: '사람이 작성한 (질문, 좋은 답변) 쌍으로 모델을 fine-tuning',
    steps: ['대화 데이터셋 수집 (질문 + 이상적 답변)', '기본 LLM을 이 데이터로 미세 조정', 'Cross-Entropy Loss로 정답 답변 모방 학습'],
    output: 'SFT 모델: 명령을 따를 수 있는 모델',
  },
  {
    id: 'rm', icon: '🏆', label: 'RM', fullLabel: '보상 모델 학습 (Reward Model)',
    color: '#f59e0b',
    desc: '같은 질문에 대한 여러 답변을 사람이 순위 매겨 보상 모델 학습',
    steps: ['SFT 모델로 같은 질문에 여러 답변 생성', '사람 평가자가 답변 순위 매기기 (선호도)', 'Bradley-Terry 모델로 보상 점수 학습'],
    output: 'Reward Model: 답변 품질을 0~1 점수로 평가',
  },
  {
    id: 'rl', icon: '🎮', label: 'PPO', fullLabel: 'PPO 강화 학습',
    color: '#10b981',
    desc: '보상 모델 피드백을 이용해 LLM을 강화학습으로 최적화',
    steps: ['현재 정책으로 답변 생성', '보상 모델이 점수 계산', 'PPO 알고리즘으로 가중치 업데이트', 'KL Divergence로 너무 많이 변하지 않게 제약'],
    output: 'RLHF 모델: 인간이 선호하는 답변 생성',
  },
];

const COMPARE = [
  { label: '할루시네이션', before: '많음', after: '줄어듦', icon: '👻' },
  { label: '유해 콘텐츠', before: '차단 안됨', after: '차단됨', icon: '🚫' },
  { label: '명령 따르기', before: '약함', after: '강함', icon: '📋' },
  { label: '창의성', before: '높음', after: '제한적', icon: '🎨' },
];

export default function RlhfDiagram() {
  const [activePhase, setActivePhase] = useState(0);
  const [tab, setTab] = useState('pipeline');

  const p = PHASES[activePhase];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['pipeline','RLHF 파이프라인'], ['compare','SFT vs RLHF']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'pipeline' && (
        <div className="space-y-3">
          {/* 단계 선택 */}
          <div className="flex items-center gap-2">
            {PHASES.map((ph, i) => (
              <div key={ph.id} className="flex items-center gap-2 flex-1">
                <button onClick={() => setActivePhase(i)}
                  className={`flex-1 flex flex-col items-center p-2.5 rounded-xl border-2 transition-all text-center ${activePhase===i ? 'shadow-lg scale-[1.05]' : 'opacity-60 hover:opacity-90'}`}
                  style={{ borderColor: activePhase===i ? ph.color : '#e5e7eb', backgroundColor: activePhase===i ? ph.color+'12' : 'white' }}>
                  <span className="text-2xl">{ph.icon}</span>
                  <span className="font-black text-xs mt-0.5" style={{ color: ph.color }}>{ph.label}</span>
                </button>
                {i < PHASES.length - 1 && <span className="text-gray-300 font-bold">→</span>}
              </div>
            ))}
          </div>

          {/* 상세 */}
          <div className="rounded-xl border-2 p-4 space-y-3"
            style={{ borderColor: p.color, backgroundColor: p.color+'08' }}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{p.icon}</span>
              <div>
                <div className="font-bold" style={{ color: p.color }}>{p.fullLabel}</div>
                <div className="text-xs text-gray-500 mt-0.5">{p.desc}</div>
              </div>
            </div>
            <div className="space-y-1.5">
              {p.steps.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: p.color }}>{i+1}</span>
                  <span className="text-gray-700">{s}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t text-xs font-bold" style={{ borderColor: p.color+'30', color: p.color }}>
              ✅ 출력: {p.output}
            </div>
          </div>

          {/* ChatGPT 예시 */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-gray-700 mb-1.5">ChatGPT = GPT-4 + RLHF</div>
            <div className="flex items-center gap-2 flex-wrap">
              {['GPT-4 기반 모델', '→', 'SFT', '→', 'Reward Model', '→', 'PPO 학습', '→', 'ChatGPT'].map((s, i) => (
                s === '→' ? <span key={i} className="text-gray-400">→</span> : (
                  <span key={i} className={`px-2 py-0.5 rounded font-bold text-white text-xs ${s==='ChatGPT' ? 'bg-green-600' : 'bg-gray-600'}`}>{s}</span>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'compare' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">SFT만 적용 vs RLHF까지 적용한 모델 비교</div>
          <div className="space-y-2">
            {COMPARE.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                <span className="text-xl flex-shrink-0">{c.icon}</span>
                <span className="w-24 font-medium text-gray-700">{c.label}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 text-center px-2 py-1 bg-red-100 text-red-700 rounded font-bold">{c.before}</div>
                  <span className="text-gray-400">→</span>
                  <div className="flex-1 text-center px-2 py-1 bg-green-100 text-green-700 rounded font-bold">{c.after}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-yellow-700 mb-1">⚠️ RLHF의 한계</div>
            <div className="text-gray-600">사람의 선호도 데이터 수집 비용이 매우 높습니다. 또한 "사람이 선호하는 답변 = 사실에 기반한 답변"이 항상 성립하지 않아 새로운 형태의 환각이 생길 수 있습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
}
