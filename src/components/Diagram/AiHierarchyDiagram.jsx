import { useState } from 'react';

const layers = [
  {
    id: 'ai',
    label: 'AI (인공지능)',
    sublabel: 'Artificial Intelligence',
    color: '#3b82f6',
    light: '#eff6ff',
    r: 170,
    desc: '인간의 지능적 행동을 컴퓨터로 구현하는 모든 기술의 총칭',
    examples: ['음성인식', '자율주행', '추천시스템', '번역'],
  },
  {
    id: 'ml',
    label: '머신러닝',
    sublabel: 'Machine Learning',
    color: '#7c3aed',
    light: '#f5f3ff',
    r: 130,
    desc: '데이터를 학습해 스스로 규칙을 찾아내는 AI의 한 분야',
    examples: ['스팸 필터', '주가 예측', '이상 탐지'],
  },
  {
    id: 'dl',
    label: '딥러닝',
    sublabel: 'Deep Learning',
    color: '#059669',
    light: '#ecfdf5',
    r: 90,
    desc: '사람 뇌의 신경망을 모방한 다층 구조의 학습 방법',
    examples: ['얼굴인식', '의료영상 분석', '게임 AI'],
  },
  {
    id: 'gen',
    label: '생성형 AI',
    sublabel: 'Generative AI',
    color: '#d97706',
    light: '#fffbeb',
    r: 50,
    desc: '새로운 콘텐츠(텍스트·이미지·코드)를 생성하는 딥러닝',
    examples: ['ChatGPT', 'Claude', 'DALL-E'],
  },
];

export default function AiHierarchyDiagram() {
  const [active, setActive] = useState('gen');
  const cx = 200, cy = 200;
  const activeLayer = layers.find(l => l.id === active);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center">
      {/* SVG 다이어그램 */}
      <div className="relative flex-shrink-0">
        <svg width="400" height="400" viewBox="0 0 400 400" className="cursor-pointer">
          <defs>
            {layers.map(l => (
              <radialGradient key={l.id} id={`grad-${l.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={l.color} stopOpacity={active === l.id ? '0.25' : '0.1'} />
                <stop offset="100%" stopColor={l.color} stopOpacity={active === l.id ? '0.15' : '0.05'} />
              </radialGradient>
            ))}
          </defs>

          {/* 동심원 */}
          {[...layers].reverse().map(l => (
            <g key={l.id} onClick={() => setActive(l.id)}>
              <circle
                cx={cx} cy={cy} r={l.r}
                fill={`url(#grad-${l.id})`}
                stroke={l.color}
                strokeWidth={active === l.id ? 2.5 : 1.5}
                strokeDasharray={active === l.id ? 'none' : ''}
                style={{
                  transition: 'all 0.3s ease',
                  filter: active === l.id ? `drop-shadow(0 0 8px ${l.color}80)` : 'none',
                }}
              />
            </g>
          ))}

          {/* 레이블 */}
          {layers.map(l => {
            const labelY = cy - l.r + 22;
            return (
              <g key={`label-${l.id}`} onClick={() => setActive(l.id)} className="cursor-pointer">
                <text
                  x={cx} y={labelY}
                  textAnchor="middle"
                  fontSize={active === l.id ? '13' : '11'}
                  fontWeight={active === l.id ? 'bold' : 'normal'}
                  fill={l.color}
                  style={{ transition: 'all 0.2s' }}
                >
                  {l.label}
                </text>
              </g>
            );
          })}

          {/* 중앙 GenAI 아이콘 */}
          <g onClick={() => setActive('gen')} className="cursor-pointer">
            <text x={cx} y={cy + 5} textAnchor="middle" fontSize="22">🤖</text>
          </g>

          {/* 클릭 안내 */}
          <text x={cx} y={385} textAnchor="middle" fontSize="11" fill="#9ca3af">
            원을 클릭해서 각 개념을 확인하세요
          </text>
        </svg>
      </div>

      {/* 설명 패널 */}
      <div className="flex-1 space-y-4">
        <div
          className="rounded-xl p-5 border-2 transition-all duration-300"
          style={{ borderColor: activeLayer.color, backgroundColor: activeLayer.light }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeLayer.color }} />
            <span className="font-bold text-lg" style={{ color: activeLayer.color }}>{activeLayer.label}</span>
            <span className="text-sm text-gray-400">({activeLayer.sublabel})</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">{activeLayer.desc}</p>
          <div className="flex flex-wrap gap-2">
            {activeLayer.examples.map(e => (
              <span key={e} className="text-xs px-2 py-1 rounded-full text-white font-medium" style={{ backgroundColor: activeLayer.color }}>
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* 포함 관계 */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="text-xs font-bold text-gray-500 mb-3">포함 관계</div>
          <div className="flex items-center gap-2 flex-wrap text-sm font-medium">
            {layers.map((l, i) => (
              <span key={l.id} className="flex items-center gap-2">
                <button
                  onClick={() => setActive(l.id)}
                  className="px-3 py-1 rounded-full text-white text-xs transition-all"
                  style={{
                    backgroundColor: l.color,
                    opacity: active === l.id ? 1 : 0.5,
                    transform: active === l.id ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {l.label}
                </button>
                {i < layers.length - 1 && <span className="text-gray-400">⊃</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
