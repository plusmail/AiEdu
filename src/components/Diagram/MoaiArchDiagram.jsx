import { useState } from 'react';

const LAYERS = [
  { id: 'interface', label: '계층 1: 인터페이스', color: '#3b82f6', items: ['/moai plan', '/moai run', '/moai sync', 'CLI 유틸리티', '슬래시 명령어', '플러그인'] },
  { id: 'orch',      label: '계층 2: 오케스트레이션', color: '#8b5cf6', items: ['plan-manager', 'run-manager', 'sync-manager', 'team-orchestrator'] },
  { id: 'exec',      label: '계층 3: 실행', color: '#10b981', items: ['Expert Agents (도메인 전문가)', 'Builder Agents (생성 전문)', 'QA Agent', 'Security Agent'] },
  { id: 'infra',     label: '계층 4: 인프라', color: '#f59e0b', items: ['파일 시스템', 'Git 작업 트리', 'MCP 서버', 'LSP 서버', '도구 (Read/Write/Bash)'] },
];

const AGENTS = {
  manager: [
    { name: 'plan-manager', desc: 'SPEC 생성 총괄, 요구사항 분해' },
    { name: 'run-manager', desc: 'TDD 루프 조율, 품질 게이트 관리' },
    { name: 'sync-manager', desc: '문서 동기화, Git 커밋 생성' },
  ],
  expert: [
    { name: 'frontend-expert', desc: 'React/Vue 컴포넌트 전문' },
    { name: 'backend-expert', desc: 'API/DB 설계 전문' },
    { name: 'security-expert', desc: '보안 취약점 검사 전문' },
    { name: 'infra-expert', desc: 'Docker/K8s/CI 전문' },
  ],
  builder: [
    { name: 'builder-agent', desc: '커스텀 에이전트 생성' },
    { name: 'builder-skill', desc: '커스텀 스킬 생성' },
  ],
};

export default function MoaiArchDiagram() {
  const [activeLayer, setActiveLayer] = useState('orch');
  const [agentGroup, setAgentGroup] = useState('manager');

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-purple-50 border border-purple-200 rounded-lg p-2">
        💡 MoAI-ADK = 4계층 아키텍처로 에이전트 협업을 체계적으로 조율하는 프레임워크
      </div>

      {/* 4계층 다이어그램 */}
      <div className="space-y-1.5">
        {LAYERS.map(layer => (
          <div key={layer.id} onClick={() => setActiveLayer(layer.id)}
            className="rounded-xl border-2 cursor-pointer transition-all overflow-hidden"
            style={{ borderColor: activeLayer === layer.id ? layer.color : '#e5e7eb' }}>
            <div className="flex items-center gap-3 px-4 py-2.5"
              style={{ backgroundColor: activeLayer === layer.id ? layer.color + '15' : '#f8fafc' }}>
              <div className="text-xs font-bold" style={{ color: layer.color }}>{layer.label}</div>
              <div className="flex gap-1.5 flex-wrap ml-auto">
                {layer.items.map(item => (
                  <span key={item} className="text-xs px-2 py-0.5 rounded-full font-mono"
                    style={{ backgroundColor: layer.color + '20', color: layer.color }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 에이전트 생태계 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-700">에이전트 생태계</div>
        <div className="flex border-b border-gray-200">
          {Object.keys(AGENTS).map(g => (
            <button key={g} onClick={() => setAgentGroup(g)}
              className={`flex-1 py-2 text-xs font-bold border-r last:border-r-0 transition-colors ${agentGroup === g ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-purple-50'}`}>
              {g.charAt(0).toUpperCase() + g.slice(1)} 그룹
            </button>
          ))}
        </div>
        <div className="p-3 grid grid-cols-1 gap-2">
          {AGENTS[agentGroup].map(({ name, desc }) => (
            <div key={name} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <div className="font-mono text-xs font-bold text-purple-700">{name}</div>
              <div className="text-xs text-gray-600">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TRUST-5 + Loop Engine */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="border border-amber-200 bg-amber-50 rounded-xl p-3">
          <div className="font-bold text-amber-800 mb-2">TRUST-5 품질 기준</div>
          {['T: Tested (80%+)', 'R: Reviewed', 'U: Understood', 'S: Secured', 'T: Typed'].map(t => (
            <div key={t} className="text-amber-700 flex gap-1"><span>•</span>{t}</div>
          ))}
        </div>
        <div className="border border-green-200 bg-green-50 rounded-xl p-3">
          <div className="font-bold text-green-800 mb-2">Loop Engine</div>
          <div className="space-y-1">
            {['SPEC 분석', 'TDD 작성', '구현', 'TRUST-5 검사', '→ 실패 시 반복'].map((s, i) => (
              <div key={s} className="text-green-700 flex gap-1"><span className="text-green-500">{i + 1}.</span>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
