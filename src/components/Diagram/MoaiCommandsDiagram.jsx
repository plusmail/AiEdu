import { useState } from 'react';

const CMD_GROUPS = [
  {
    group: '핵심 워크플로', icon: '🔄', color: '#6366f1',
    cmds: [
      { cmd: '/moai plan [설명]',  desc: 'EARS 형식 SPEC 문서 자동 생성',       example: '/moai plan "로그인 기능 구현"' },
      { cmd: '/moai run [SPEC]',   desc: 'TDD Loop Engine으로 구현 자동화',       example: '/moai run SPEC/login.md' },
      { cmd: '/moai sync',         desc: '코드·SPEC·문서·Git 한 번에 동기화',    example: '/moai sync' },
      { cmd: '/moai',              desc: 'plan→run→sync 전체 자율 자동화 모드',   example: '/moai "결제 기능 전체 개발"' },
    ],
  },
  {
    group: '프로젝트 관리', icon: '📋', color: '#3b82f6',
    cmds: [
      { cmd: '/moai project [설명]', desc: 'PROJECT.md, ARCHITECTURE.md 생성',    example: '/moai project "쇼핑몰 앱"' },
      { cmd: '/moai fix [설명]',     desc: '특정 버그 수정 자동화',                example: '/moai fix "로그인 500 에러"' },
      { cmd: '/moai loop',           desc: 'TRUST-5 품질 루프 재실행',             example: '/moai loop' },
    ],
  },
  {
    group: '에이전트·스킬 빌더', icon: '🏗️', color: '#10b981',
    cmds: [
      { cmd: '/builder-agent [설명]', desc: '커스텀 에이전트 MD 파일 자동 생성',  example: '/builder-agent "GraphQL 전문가"' },
      { cmd: '/builder-skill [설명]', desc: '커스텀 스킬 MD 파일 자동 생성',      example: '/builder-skill "PR 설명 작성"' },
    ],
  },
  {
    group: 'CLI 유틸리티', icon: '⚙️', color: '#f59e0b',
    cmds: [
      { cmd: 'moai init',              desc: '프로젝트 초기화 (CLAUDE.md 생성)', example: 'moai init' },
      { cmd: 'moai diagnose',          desc: '환경 진단 및 문제 확인',           example: 'moai diagnose' },
      { cmd: 'moai worktree create',   desc: 'Git 작업 트리 생성',               example: 'moai worktree create feature/auth' },
      { cmd: 'moai report',            desc: 'TRUST-5 품질 리포트 생성',         example: 'moai report' },
    ],
  },
];

export default function MoaiCommandsDiagram() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeCmd, setActiveCmd] = useState(null);

  const g = CMD_GROUPS[activeGroup];

  return (
    <div className="space-y-4">
      {/* 그룹 탭 */}
      <div className="grid grid-cols-2 gap-2">
        {CMD_GROUPS.map((grp, i) => (
          <button key={i} onClick={() => { setActiveGroup(i); setActiveCmd(null); }}
            className={`flex items-center gap-2 p-2.5 rounded-xl border-2 transition-all text-left ${activeGroup === i ? 'shadow-md' : 'opacity-60 hover:opacity-90'}`}
            style={{ borderColor: activeGroup === i ? grp.color : '#e5e7eb', backgroundColor: activeGroup === i ? grp.color + '10' : 'white' }}>
            <span className="text-xl">{grp.icon}</span>
            <span className="font-bold text-xs" style={{ color: grp.color }}>{grp.group}</span>
          </button>
        ))}
      </div>

      {/* 명령어 목록 */}
      <div className="space-y-2">
        {g.cmds.map((c, i) => (
          <button key={i} onClick={() => setActiveCmd(activeCmd === i ? null : i)}
            className={`w-full flex flex-col p-3 rounded-xl border-2 text-left transition-all ${activeCmd === i ? 'shadow-md' : 'hover:shadow-sm'}`}
            style={{ borderColor: activeCmd === i ? g.color : '#e5e7eb', backgroundColor: activeCmd === i ? g.color + '08' : '#f9fafb' }}>
            <div className="flex items-center gap-2">
              <code className="font-mono text-xs px-2 py-1 rounded text-white font-bold"
                style={{ backgroundColor: g.color }}>{c.cmd}</code>
              <span className="text-xs text-gray-500 flex-1">{c.desc}</span>
              <span className="text-gray-300 text-xs">{activeCmd === i ? '▲' : '▼'}</span>
            </div>
            {activeCmd === i && (
              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">예시:</div>
                <pre className="bg-gray-950 text-green-300 text-xs rounded-lg px-3 py-2 font-mono">{c.example}</pre>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 전체 워크플로 요약 */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3">
        <div className="text-xs font-bold text-indigo-700 mb-2">전형적인 MoAI 개발 흐름</div>
        <div className="flex items-center gap-1 text-xs flex-wrap">
          {['moai init', '→', '/moai project', '→', '/moai plan', '→', '/moai run', '→', '/moai sync', '→', '배포'].map((s, i) => (
            s === '→' ? (
              <span key={i} className="text-indigo-300">→</span>
            ) : (
              <code key={i} className="px-2 py-0.5 rounded font-mono font-bold text-white"
                style={{ backgroundColor: '#6366f1' }}>{s}</code>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
