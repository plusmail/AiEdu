import { useState, useEffect, useRef } from 'react';

const FRAMES = ['🌅', '🚗', '⛅', '🏙️', '🌆'];

const EXAMPLES = [
  {
    id: 'sora', icon: '🎬', label: 'Sora (OpenAI)',
    input: '텍스트 설명', output: '물리적으로 일관된 비디오',
    color: '#3b82f6',
    desc: '"공이 계단을 굴러 내려간다" → 실제 물리 법칙대로 움직이는 영상 생성',
  },
  {
    id: 'genie', icon: '🎮', label: 'Genie (DeepMind)',
    input: '비디오 프레임', output: '인터랙티브 환경',
    color: '#10b981',
    desc: '비디오만 보고 플레이어 행동 → 결과 예측하는 게임 환경 자동 생성',
  },
  {
    id: 'robot', icon: '🤖', label: '로보틱스 AI',
    input: '센서 데이터', output: '행동 결과 예측',
    color: '#f59e0b',
    desc: '실제 로봇 없이 시뮬레이터에서 먼저 물리 법칙 학습 → 실물 전이 비용 ↓',
  },
];

const LLM_VS_WM = [
  { aspect: '입력 데이터', llm: '텍스트 토큰', wm: '비디오·센서·공간 데이터' },
  { aspect: '학습 목표', llm: '다음 토큰 예측', wm: '다음 프레임/상태 예측' },
  { aspect: '세계 이해', llm: '통계적 패턴', wm: '인과관계·물리 법칙' },
  { aspect: '행동 예측', llm: '불가능', wm: '행동 결과를 시뮬레이션' },
  { aspect: '대표 모델', llm: 'GPT-4, Claude', wm: 'Sora, Genie, V-JEPA' },
];

export default function WorldModelDiagram() {
  const [tab, setTab] = useState('concept');
  const [frameIdx, setFrameIdx] = useState(0);
  const [predicting, setPredicting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (predicting) {
      timerRef.current = setInterval(() => {
        setFrameIdx(i => {
          if (i >= FRAMES.length - 1) { setPredicting(false); return i; }
          return i + 1;
        });
      }, 500);
    }
    return () => clearInterval(timerRef.current);
  }, [predicting]);

  function startPredict() {
    setFrameIdx(0);
    setPredicting(false);
    clearInterval(timerRef.current);
    setTimeout(() => setPredicting(true), 50);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['concept', '핵심 개념'], ['examples', '구현 사례'], ['vs', 'LLM vs 월드 모델']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'concept' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500 text-center">
            월드 모델 = 현재 상태를 보고 <strong>미래 상태를 예측</strong>하는 AI
          </div>

          {/* 프레임 예측 시뮬레이션 */}
          <div className="bg-gray-950 rounded-xl p-4 space-y-3">
            <div className="text-xs text-gray-400">비디오 프레임 예측 시뮬레이션</div>
            <div className="flex items-end gap-2">
              {/* 과거 프레임 (관찰) */}
              <div className="space-y-1">
                <div className="text-xs text-gray-500 text-center">관찰</div>
                <div className="flex gap-1">
                  {FRAMES.slice(0, 2).map((f, i) => (
                    <div key={i} className="w-12 h-12 bg-blue-900 border border-blue-600 rounded-lg flex items-center justify-center text-2xl">
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-gray-500 text-sm pb-3">→</div>

              {/* 모델 */}
              <div className="space-y-1">
                <div className="text-xs text-gray-500 text-center">월드 모델</div>
                <div className="w-14 h-12 bg-purple-900 border border-purple-500 rounded-lg flex items-center justify-center text-lg">
                  🧠
                </div>
              </div>

              <div className="text-gray-500 text-sm pb-3">→</div>

              {/* 예측 프레임 */}
              <div className="space-y-1 flex-1">
                <div className="text-xs text-gray-500 text-center">예측된 미래 프레임</div>
                <div className="flex gap-1">
                  {FRAMES.slice(2).map((f, i) => (
                    <div key={i}
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
                        i <= frameIdx - 2
                          ? 'bg-green-900 border border-green-500 opacity-100'
                          : 'bg-gray-800 border border-gray-700 opacity-30'
                      }`}>
                      {i <= frameIdx - 2 ? f : '?'}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={startPredict}
              className={`text-xs px-4 py-2 rounded-lg font-bold transition-colors ${predicting ? 'bg-purple-800 text-purple-300' : 'bg-purple-600 text-white hover:bg-purple-500'}`}>
              {predicting ? '▶ 예측 중...' : '▶ 미래 프레임 예측'}
            </button>
          </div>

          {/* 핵심 차이 */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
              <div className="font-bold text-gray-600 mb-1.5">기존 LLM의 한계</div>
              <div className="space-y-1 text-gray-500">
                <div>❌ "공이 계단에서 떨어지면?"</div>
                <div>❌ 물리 법칙을 계산 못함</div>
                <div>❌ 텍스트 패턴만 학습</div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
              <div className="font-bold text-purple-600 mb-1.5">월드 모델의 능력</div>
              <div className="space-y-1 text-gray-600">
                <div>✅ 포물선 궤적 시뮬레이션</div>
                <div>✅ 인과관계 내재화</div>
                <div>✅ 행동 결과 예측</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'examples' && (
        <div className="space-y-2">
          {EXAMPLES.map(ex => (
            <div key={ex.id} className="rounded-xl border-2 p-4"
              style={{ borderColor: ex.color + '60', backgroundColor: ex.color + '08' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{ex.icon}</span>
                <span className="font-bold" style={{ color: ex.color }}>{ex.label}</span>
              </div>
              <div className="flex items-center gap-3 text-xs mb-2">
                <span className="px-2 py-1 rounded-lg font-bold text-white"
                  style={{ backgroundColor: ex.color }}>
                  {ex.input}
                </span>
                <span className="text-gray-400">→</span>
                <span className="px-2 py-1 rounded-lg bg-white border font-bold text-gray-700"
                  style={{ borderColor: ex.color + '60' }}>
                  {ex.output}
                </span>
              </div>
              <div className="text-xs text-gray-600">{ex.desc}</div>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-blue-700 mb-1">Tesla FSD와 월드 모델</div>
            <div className="text-gray-600">
              수백만 시간의 주행 비디오 학습 → 물리 세계 내재화
              → 처음 보는 도로 상황도 인과관계로 판단 가능
            </div>
          </div>
        </div>
      )}

      {tab === 'vs' && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left border border-gray-200 text-gray-500">비교 항목</th>
                <th className="p-2 text-center border border-gray-200 text-blue-700">🤖 기존 LLM</th>
                <th className="p-2 text-center border border-gray-200 text-purple-700">🌍 월드 모델</th>
              </tr>
            </thead>
            <tbody>
              {LLM_VS_WM.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-2 border border-gray-200 font-bold text-gray-600">{row.aspect}</td>
                  <td className="p-2 border border-gray-200 text-center text-blue-700">{row.llm}</td>
                  <td className="p-2 border border-gray-200 text-center text-purple-700 font-medium">{row.wm}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-purple-700 mb-1">차세대 AI의 방향</div>
            <div className="text-gray-600">
              텍스트 패턴 인식(LLM) + 물리 세계 이해(월드 모델) + 행동 제어(강화학습)
              = <strong>범용 AI(AGI)에 한 걸음 더 가까이</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
