import { useState, useEffect, useRef } from 'react';

const LAYERS = [
  { label: '입력층', nodes: 3, color: '#3b82f6', desc: '원시 데이터 입력 (예: 픽셀, 수치)' },
  { label: '은닉층 1', nodes: 4, color: '#7c3aed', desc: '특징 추출 및 변환' },
  { label: '은닉층 2', nodes: 4, color: '#7c3aed', desc: '고수준 특징 학습' },
  { label: '출력층', nodes: 2, color: '#059669', desc: '분류 결과 (예: 고양이/개)' },
];

const W = 480, H = 280;
const layerX = (i) => 60 + i * (W - 120) / (LAYERS.length - 1);
const nodeY = (layerIdx, nodeIdx) => {
  const count = LAYERS[layerIdx].nodes;
  const spacing = Math.min(50, (H - 60) / count);
  return H / 2 - (count - 1) * spacing / 2 + nodeIdx * spacing;
};

export default function NeuralNetworkDiagram() {
  const [activeNode, setActiveNode] = useState(null);
  const [signalStep, setSignalStep] = useState(-1);
  const intervalRef = useRef(null);

  function startAnimation() {
    setSignalStep(0);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSignalStep(s => {
        if (s >= LAYERS.length) { clearInterval(intervalRef.current); return -1; }
        return s + 1;
      });
    }, 600);
  }

  useEffect(() => {
    startAnimation();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="space-y-4">
      {/* 레이어 설명 */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {LAYERS.map((l, i) => (
          <div key={i} className="rounded-lg p-2" style={{ backgroundColor: l.color + '15', border: `1px solid ${l.color}40` }}>
            <div className="font-bold mb-0.5" style={{ color: l.color }}>{l.label}</div>
            <div className="text-gray-500 leading-tight">{l.desc}</div>
          </div>
        ))}
      </div>

      {/* SVG 신경망 */}
      <div className="bg-gray-950 rounded-xl p-3 overflow-x-auto">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ minWidth: 320 }}>
          {/* 연결선 */}
          {LAYERS.slice(0, -1).map((layer, li) =>
            Array.from({ length: layer.nodes }).map((_, ni) =>
              Array.from({ length: LAYERS[li + 1].nodes }).map((_, nj) => {
                const active = signalStep > li;
                return (
                  <line
                    key={`${li}-${ni}-${nj}`}
                    x1={layerX(li)} y1={nodeY(li, ni)}
                    x2={layerX(li + 1)} y2={nodeY(li + 1, nj)}
                    stroke={active ? LAYERS[li].color : '#374151'}
                    strokeWidth={active ? 1.5 : 0.8}
                    strokeOpacity={active ? 0.6 : 0.3}
                    style={{ transition: 'all 0.4s ease' }}
                  />
                );
              })
            )
          )}

          {/* 신호 이동 애니메이션 점 */}
          {signalStep >= 0 && signalStep < LAYERS.length - 1 &&
            Array.from({ length: LAYERS[signalStep].nodes }).map((_, ni) =>
              Array.from({ length: LAYERS[signalStep + 1].nodes }).map((_, nj) => (
                <circle key={`sig-${ni}-${nj}`} r={3} fill="#fbbf24">
                  <animateMotion
                    dur="0.5s"
                    fill="freeze"
                    path={`M ${layerX(signalStep)} ${nodeY(signalStep, ni)} L ${layerX(signalStep + 1)} ${nodeY(signalStep + 1, nj)}`}
                  />
                </circle>
              ))
            )
          }

          {/* 뉴런 노드 */}
          {LAYERS.map((layer, li) =>
            Array.from({ length: layer.nodes }).map((_, ni) => {
              const x = layerX(li), y = nodeY(li, ni);
              const isActive = signalStep > li;
              const isHovered = activeNode?.li === li && activeNode?.ni === ni;
              return (
                <g key={`node-${li}-${ni}`}
                  onMouseEnter={() => setActiveNode({ li, ni })}
                  onMouseLeave={() => setActiveNode(null)}
                  className="cursor-pointer">
                  {isActive && (
                    <circle cx={x} cy={y} r={18} fill={layer.color} fillOpacity={0.15}>
                      <animate attributeName="r" values="14;22;14" dur="0.8s" repeatCount="2" />
                      <animate attributeName="fill-opacity" values="0.15;0.05;0.15" dur="0.8s" repeatCount="2" />
                    </circle>
                  )}
                  <circle
                    cx={x} cy={y} r={14}
                    fill={isActive ? layer.color : '#1f2937'}
                    stroke={layer.color}
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    style={{ transition: 'all 0.3s' }}
                  />
                  <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fill={isActive ? 'white' : '#9ca3af'}>
                    {li === 0 ? `x${ni + 1}` : li === LAYERS.length - 1 ? `y${ni + 1}` : `h`}
                  </text>
                  {isHovered && (
                    <text x={x} y={y - 20} textAnchor="middle" fontSize="9" fill="white"
                      style={{ filter: 'drop-shadow(0 1px 2px black)' }}>
                      σ(Σwx+b)
                    </text>
                  )}
                </g>
              );
            })
          )}

          {/* 레이어 이름 */}
          {LAYERS.map((l, i) => (
            <text key={`lname-${i}`} x={layerX(i)} y={H - 8} textAnchor="middle" fontSize="10" fill={l.color} fontWeight="bold">
              {l.label}
            </text>
          ))}
        </svg>
      </div>

      {/* 컨트롤 */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          각 뉴런: σ(Σ wᵢxᵢ + b) — 가중합에 활성화 함수 적용
        </div>
        <button
          onClick={startAnimation}
          className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          ▶ 신호 전파 재생
        </button>
      </div>
    </div>
  );
}
