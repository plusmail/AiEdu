import { useState } from 'react';

const ITEMS = [
  { label: '대화 이력', tokens: 8000,  color: '#3b82f6', icon: '💬', desc: '주고받은 메시지 전체' },
  { label: 'CLAUDE.md', tokens: 3000,  color: '#8b5cf6', icon: '📋', desc: '프로젝트 규칙·지시사항' },
  { label: '파일 내용', tokens: 25000, color: '#10b981', icon: '📄', desc: '읽어온 소스 코드 파일' },
  { label: '도구 결과', tokens: 12000, color: '#f59e0b', icon: '🔧', desc: '터미널·검색 실행 결과' },
];
const TOTAL = 200000;

const STRATEGIES = [
  { id: 'compact', icon: '🗜️', label: '/compact', desc: '대화 내용 요약 압축\n컨텍스트 50~70% 절약', color: 'blue' },
  { id: 'clear',   icon: '🧹', label: '/clear',   desc: '컨텍스트 완전 초기화\n새로운 세션처럼 시작', color: 'red' },
  { id: 'claudemd',icon: '📋', label: 'CLAUDE.md',desc: '규칙을 파일로 외재화\n매 세션 자동 로드', color: 'purple' },
  { id: 'select',  icon: '🎯', label: '선택적 로딩', desc: '필요한 파일만 참조\n전체 코드베이스 금지', color: 'green' },
];

export default function ContextWindowDiagram() {
  const [active, setActive] = useState(null);
  const used = ITEMS.reduce((s, i) => s + i.tokens, 0);
  const free  = TOTAL - used;

  return (
    <div className="space-y-5">
      <div className="text-center text-xs text-gray-400 font-mono">총 컨텍스트 윈도우: 200,000 토큰 ≈ 15만 단어 ≈ 300~500페이지</div>

      {/* 막대 시각화 */}
      <div className="space-y-1">
        <div className="flex h-10 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          {ITEMS.map((item) => {
            const pct = (item.tokens / TOTAL) * 100;
            return (
              <div
                key={item.label}
                style={{ width: `${pct}%`, backgroundColor: item.color }}
                className={`flex items-center justify-center text-white text-xs font-bold cursor-pointer transition-opacity ${active && active !== item.label ? 'opacity-40' : ''}`}
                onMouseEnter={() => setActive(item.label)}
                onMouseLeave={() => setActive(null)}
                title={`${item.label}: ${item.tokens.toLocaleString()} 토큰`}
              >
                {pct > 5 ? item.icon : ''}
              </div>
            );
          })}
          <div
            style={{ width: `${(free / TOTAL) * 100}%`, backgroundColor: '#e5e7eb' }}
            className="flex items-center justify-center text-gray-400 text-xs"
            onMouseEnter={() => setActive('free')}
            onMouseLeave={() => setActive(null)}
          >
            {(free / TOTAL) * 100 > 5 ? '여유' : ''}
          </div>
        </div>

        {/* 범례 */}
        <div className="flex flex-wrap gap-2 mt-2">
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg cursor-pointer transition-all ${active === item.label ? 'shadow-md scale-105' : ''}`}
              style={{ backgroundColor: item.color + '18', border: `1px solid ${item.color}50` }}
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}
            >
              <span>{item.icon}</span>
              <span style={{ color: item.color }} className="font-bold">{item.label}</span>
              <span className="text-gray-500">{(item.tokens/1000).toFixed(0)}K</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg bg-gray-100 border border-gray-200">
            <span className="text-gray-500">□ 여유</span>
            <span className="text-gray-400">{(free/1000).toFixed(0)}K</span>
          </div>
        </div>
      </div>

      {/* 선택된 항목 상세 */}
      {active && active !== 'free' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm">
          {(() => { const it = ITEMS.find(i => i.label === active); return it ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl">{it.icon}</span>
              <div>
                <div className="font-bold text-blue-800">{it.label}</div>
                <div className="text-blue-600 text-xs">{it.desc}</div>
                <div className="text-xs text-gray-500 mt-0.5">{it.tokens.toLocaleString()} 토큰 ({((it.tokens/TOTAL)*100).toFixed(1)}%)</div>
              </div>
            </div>
          ) : null; })()}
        </div>
      )}

      {/* 관리 전략 */}
      <div>
        <div className="text-xs font-bold text-gray-600 mb-2">컨텍스트 관리 전략</div>
        <div className="grid grid-cols-2 gap-2">
          {STRATEGIES.map(s => (
            <div key={s.id} className={`p-3 rounded-xl border ${
              s.color === 'blue'   ? 'bg-blue-50 border-blue-200' :
              s.color === 'red'    ? 'bg-red-50 border-red-200' :
              s.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                                     'bg-green-50 border-green-200'
            }`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-lg">{s.icon}</span>
                <span className={`text-xs font-bold font-mono ${
                  s.color === 'blue' ? 'text-blue-700' : s.color === 'red' ? 'text-red-700' :
                  s.color === 'purple' ? 'text-purple-700' : 'text-green-700'
                }`}>{s.label}</span>
              </div>
              <div className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
