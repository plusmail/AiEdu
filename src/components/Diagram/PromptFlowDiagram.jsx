import { useState } from 'react';

const ELEMENTS = [
  { id: 'role', label: '역할 (Role)', color: '#3b82f6', icon: '🎭', example: '당신은 10년 경력의 마케팅 전문가입니다.' },
  { id: 'ctx', label: '맥락 (Context)', color: '#7c3aed', icon: '📋', example: '대상: 30대 직장인 여성, 제품: 친환경 세제' },
  { id: 'inst', label: '지시 (Instruction)', color: '#059669', icon: '📝', example: '인스타그램용 홍보 문구 3가지를 작성해주세요.' },
  { id: 'fmt', label: '형식 (Format)', color: '#d97706', icon: '📐', example: '각 3문장 이내, 이모지 포함, 해시태그 3개' },
];

const BEFORE = `홍보 문구 써줘`;

const AFTER = `✨ 지구를 지키는 작은 실천, 오늘부터 시작해요!
#친환경생활 #클린뷰티 #제로웨이스트

🌿 바쁜 일상 속에서도 환경을 생각하는 당신의 선택.
#스마트주부 #에코라이프 #지속가능성

💚 성분 걱정 없이, 깨끗하고 안심되는 세제.
#천연성분 #가족건강 #친환경세제`;

export default function PromptFlowDiagram() {
  const [active, setActive] = useState(null);
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="space-y-4">
      {/* 비포 → 에프터 비교 */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
          <div className="text-xs font-bold text-red-500 mb-2">❌ 나쁜 프롬프트</div>
          <div className="font-mono text-sm text-red-700 bg-white rounded-lg p-3 border border-red-200">
            {BEFORE}
          </div>
          <div className="text-xs text-red-400 mt-2">→ 엉뚱하거나 너무 일반적인 결과</div>
        </div>
        <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4">
          <div className="text-xs font-bold text-green-600 mb-2">✅ 좋은 프롬프트 = 4요소 포함</div>
          <div className="text-xs text-green-700 bg-white rounded-lg p-3 border border-green-200 font-mono leading-relaxed">
            {ELEMENTS.map(e => (
              <span key={e.id}
                className="cursor-pointer hover:brightness-90 transition-all rounded px-0.5"
                style={{
                  backgroundColor: e.color + (active === e.id ? '30' : '18'),
                  borderBottom: `2px solid ${e.color}`,
                }}
                onClick={() => setActive(active === e.id ? null : e.id)}
              >
                {e.example}
              </span>
            )).reduce((prev, curr, i) => [prev, ' ', curr])}
          </div>
        </div>
      </div>

      {/* 요소 설명 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ELEMENTS.map(e => (
          <button
            key={e.id}
            onClick={() => setActive(active === e.id ? null : e.id)}
            className="rounded-xl p-3 text-left transition-all border-2"
            style={{
              borderColor: active === e.id ? e.color : '#e5e7eb',
              backgroundColor: active === e.id ? e.color + '15' : 'white',
            }}
          >
            <div className="text-2xl mb-1">{e.icon}</div>
            <div className="text-xs font-bold" style={{ color: e.color }}>{e.label}</div>
            {active === e.id && (
              <div className="text-xs text-gray-600 mt-1 leading-tight">{e.example}</div>
            )}
          </button>
        ))}
      </div>

      {/* 흐름 다이어그램 (SVG) */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <svg width="100%" viewBox="0 0 520 80" className="overflow-visible">
          {/* 4 요소 박스 */}
          {ELEMENTS.map((e, i) => (
            <g key={e.id} onClick={() => setActive(active === e.id ? null : e.id)} className="cursor-pointer">
              <rect x={10 + i * 90} y={10} width={75} height={40} rx={8}
                fill={active === e.id ? e.color : e.color + '20'}
                stroke={e.color} strokeWidth={active === e.id ? 2 : 1} />
              <text x={47 + i * 90} y={26} textAnchor="middle" fontSize="10"
                fill={active === e.id ? 'white' : e.color} fontWeight="bold">
                {e.icon}
              </text>
              <text x={47 + i * 90} y={40} textAnchor="middle" fontSize="8"
                fill={active === e.id ? 'white' : e.color}>
                {e.id === 'role' ? '역할' : e.id === 'ctx' ? '맥락' : e.id === 'inst' ? '지시' : '형식'}
              </text>
            </g>
          ))}

          {/* 화살표 → AI */}
          <text x={375} y={34} fontSize="20" fill="#9ca3af">→</text>

          {/* AI 박스 */}
          <rect x={400} y={5} width={60} height={50} rx={25}
            fill="#1e293b" stroke="#475569" strokeWidth={1.5} />
          <text x={430} y={26} textAnchor="middle" fontSize="16">🤖</text>
          <text x={430} y={44} textAnchor="middle" fontSize="8" fill="#94a3b8">Claude</text>

          {/* 화살표 → 결과 */}
          <text x={465} y={34} fontSize="20" fill="#9ca3af">→</text>

          {/* 결과 버튼 */}
          <g onClick={() => setShowResult(!showResult)} className="cursor-pointer">
            <rect x={490} y={10} width={22} height={40} rx={6}
              fill="#059669" stroke="#047857" strokeWidth={1} />
            <text x={501} y={35} textAnchor="middle" fontSize="16">✨</text>
          </g>
        </svg>

        {showResult && (
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="text-xs font-bold text-green-700 mb-2">생성 결과</div>
            <pre className="text-xs text-green-800 whitespace-pre-wrap leading-relaxed">{AFTER}</pre>
          </div>
        )}
        {!showResult && (
          <div className="text-center text-xs text-gray-400 mt-2">✨ 아이콘을 눌러 결과 확인</div>
        )}
      </div>
    </div>
  );
}
