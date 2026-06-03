import { useState } from 'react';

const TOKENS = ['The', 'cat', 'sat', 'on', 'mat'];

// 예시 attention 가중치 (행=query, 열=key)
const ATTN = [
  [0.60, 0.10, 0.10, 0.10, 0.10],
  [0.10, 0.50, 0.25, 0.05, 0.10],
  [0.05, 0.30, 0.40, 0.15, 0.10],
  [0.05, 0.10, 0.20, 0.50, 0.15],
  [0.05, 0.10, 0.15, 0.20, 0.50],
];

const CAUSAL_MASK = [
  [1,0,0,0,0],
  [1,1,0,0,0],
  [1,1,1,0,0],
  [1,1,1,1,0],
  [1,1,1,1,1],
];

const QKV_ROLES = [
  { key: 'Q', label: 'Query (질문)', color: '#3b82f6', desc: '"내가 어떤 정보를 찾고 있나?"', example: '"cat"이 묻는다: "나와 관련 있는 단어는?"' },
  { key: 'K', label: 'Key (색인)',   color: '#10b981', desc: '"내가 어떤 정보를 제공하나?"', example: '모든 단어가 자신의 특징 키를 제공' },
  { key: 'V', label: 'Value (값)',   color: '#f59e0b', desc: '"실제 전달할 정보는?"',        example: 'Query-Key 점수에 따라 가중 합산' },
];

export default function SelfAttentionDiagram() {
  const [tab, setTab] = useState('heatmap');
  const [hovRow, setHovRow] = useState(1); // "cat"
  const [showCausal, setShowCausal] = useState(false);

  const attn = ATTN;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['heatmap','어텐션 히트맵'], ['qkv','Q·K·V 역할'], ['causal','인과적 마스킹']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'heatmap' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">행 = Query 단어, 열 = Key 단어, 밝을수록 높은 어텐션</div>
          <div className="overflow-x-auto">
            <table className="mx-auto border-collapse text-xs">
              <thead>
                <tr>
                  <th className="p-1 text-gray-400 text-right pr-2">Query↓ / Key→</th>
                  {TOKENS.map(t => (
                    <th key={t} className="p-1 text-center w-12 text-gray-600 font-bold">{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOKENS.map((rowTok, r) => (
                  <tr key={r} onMouseEnter={() => setHovRow(r)} className="cursor-pointer">
                    <td className={`text-right pr-2 font-bold text-xs py-0.5 transition-colors ${hovRow===r ? 'text-blue-600' : 'text-gray-600'}`}>{rowTok}</td>
                    {TOKENS.map((_, c) => {
                      const v = attn[r][c];
                      const alpha = v;
                      return (
                        <td key={c} className="p-0.5 text-center">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all mx-auto"
                            style={{
                              backgroundColor: `rgba(59,130,246,${alpha})`,
                              color: v > 0.3 ? 'white' : '#6b7280',
                              transform: hovRow===r ? 'scale(1.1)' : 'scale(1)',
                            }}>
                            {v.toFixed(2)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hovRow !== null && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs">
              <span className="font-bold text-blue-700">"{TOKENS[hovRow]}"</span>은
              <span className="font-bold text-blue-600"> "{TOKENS[attn[hovRow].indexOf(Math.max(...attn[hovRow]))]}"</span>에
              가장 많이 주목합니다 (어텐션 {Math.max(...attn[hovRow]).toFixed(2)})
            </div>
          )}
        </div>
      )}

      {tab === 'qkv' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500 text-center">셀프 어텐션 = 모든 단어가 서로를 Query·Key·Value로 변환</div>

          {/* Q K V 흐름 */}
          <div className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-4">
            {['입력 임베딩', '×W_Q', 'Q', '점수\nQ·Kᵀ', '÷√d', 'Softmax', '×V', '출력'].map((s, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className={`px-2 py-1 rounded-lg text-xs font-bold text-center whitespace-pre-line ${
                  s === 'Q' ? 'bg-blue-600 text-white' :
                  s.includes('×W') ? 'bg-gray-200 text-gray-700' :
                  s === '출력' ? 'bg-purple-600 text-white' :
                  'bg-gray-100 text-gray-600'
                }`}>{s}</div>
                {i < 7 && <span className="text-gray-300">→</span>}
              </div>
            ))}
          </div>

          {QKV_ROLES.map(role => (
            <div key={role.key} className="flex items-start gap-3 p-3 rounded-xl border"
              style={{ backgroundColor: role.color + '10', borderColor: role.color + '40' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                style={{ backgroundColor: role.color }}>{role.key}</div>
              <div>
                <div className="font-bold text-sm" style={{ color: role.color }}>{role.label}</div>
                <div className="text-xs text-gray-600 mt-0.5">{role.desc}</div>
                <div className="text-xs text-gray-400 mt-0.5 italic">{role.example}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'causal' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">GPT의 디코더: 미래 단어를 보지 못하도록 마스킹</div>

          <div className="flex items-center gap-3">
            <button onClick={() => setShowCausal(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${!showCausal ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300'}`}>
              전체 어텐션 (인코더)
            </button>
            <button onClick={() => setShowCausal(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${showCausal ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-300'}`}>
              인과적 마스킹 (디코더)
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="mx-auto border-collapse text-xs">
              <thead>
                <tr>
                  <th className="p-1 text-gray-400 text-right pr-2"></th>
                  {TOKENS.map(t => (
                    <th key={t} className="p-1 text-center w-10 text-gray-600 font-bold">{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOKENS.map((rowTok, r) => (
                  <tr key={r}>
                    <td className="text-right pr-2 font-bold text-xs py-0.5 text-gray-600">{rowTok}</td>
                    {TOKENS.map((_, c) => {
                      const allowed = !showCausal || CAUSAL_MASK[r][c];
                      const v = attn[r][c];
                      return (
                        <td key={c} className="p-0.5 text-center">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold mx-auto transition-all"
                            style={{
                              backgroundColor: !allowed ? '#1f2937' : `rgba(139,92,246,${v})`,
                              color: !allowed ? '#6b7280' : v > 0.3 ? 'white' : '#6b7280',
                            }}>
                            {!allowed ? '✗' : v.toFixed(2)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-purple-700 mb-1">왜 미래를 가리나?</div>
            <div className="text-gray-600">훈련 중 "답안 미리 보기"를 방지합니다. "cat sat on"을 보고 "mat"을 예측하는 것이 목표인데, "mat"을 미리 보면 아무것도 학습하지 않습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
}
