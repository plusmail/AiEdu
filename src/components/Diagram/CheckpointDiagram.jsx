import { useState } from 'react';

const CHECKPOINTS = [
  { id: 0, label: '시작', time: '10:00', desc: '작업 시작 전 상태', icon: '🚀', color: '#3b82f6' },
  { id: 1, label: 'CP #1', time: '10:15', desc: '파일 구조 분석 완료', icon: '📁', color: '#8b5cf6' },
  { id: 2, label: 'CP #2', time: '10:30', desc: 'auth.ts 수정 완료', icon: '✏️', color: '#10b981' },
  { id: 3, label: 'CP #3', time: '10:45', desc: '테스트 추가 완료', icon: '🧪', color: '#f59e0b' },
  { id: 4, label: '현재', time: '11:00', desc: '빌드 실패 발생!', icon: '❌', color: '#ef4444' },
];

const COMMANDS = [
  { cmd: '/checkpoint',       desc: '현재 상태를 수동으로 저장', icon: '💾', color: '#3b82f6' },
  { cmd: '/rewind',           desc: '체크포인트 목록 표시',        icon: '📜', color: '#8b5cf6' },
  { cmd: '/rewind [번호]',    desc: '해당 시점으로 즉시 복구',     icon: '⏪', color: '#f59e0b' },
  { cmd: '/rewind last',      desc: '바로 이전 체크포인트로',       icon: '↩️', color: '#10b981' },
];

const STRATEGIES = [
  { title: '/compact로 절약', desc: '대화 압축 → 컨텍스트 50~70% 절약\n내용은 유지한 채 세션 연장', icon: '🗜️', color: '#3b82f6' },
  { title: '/clear로 초기화',  desc: '컨텍스트 완전 초기화\n완전히 새로운 작업 시작 시', icon: '🧹', color: '#ef4444' },
  { title: '새 세션 시작',     desc: 'claude 재실행\nCLAUDE.md는 자동으로 다시 로드', icon: '🔄', color: '#8b5cf6' },
  { title: 'Git과 병행',       desc: 'git stash + 체크포인트\n안전한 실험적 변경 가능', icon: '🔀', color: '#10b981' },
];

export default function CheckpointDiagram() {
  const [tab, setTab] = useState('rewind');
  const [target, setTarget] = useState(2);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['rewind','되감기 시스템'], ['session','세션 관리'], ['gitflow','Git 통합']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'rewind' && (
        <div className="space-y-4">
          {/* 타임라인 */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {CHECKPOINTS.map((cp, i) => (
              <div key={cp.id} className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => setTarget(cp.id)}
                  className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${target === cp.id ? 'shadow-lg scale-110' : 'opacity-70 hover:opacity-100'}`}
                  style={{ borderColor: target === cp.id ? cp.color : '#e5e7eb', backgroundColor: target === cp.id ? cp.color + '15' : 'white' }}>
                  <span className="text-xl">{cp.icon}</span>
                  <span className="text-xs font-bold mt-0.5" style={{ color: cp.color }}>{cp.label}</span>
                  <span className="text-xs text-gray-400">{cp.time}</span>
                </button>
                {i < CHECKPOINTS.length - 1 && (
                  <span className="text-gray-300 text-xs">→</span>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-xl border-2 p-3 space-y-2"
            style={{ borderColor: CHECKPOINTS[target].color, backgroundColor: CHECKPOINTS[target].color + '10' }}>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-xl">{CHECKPOINTS[target].icon}</span>
              <div>
                <div className="font-bold" style={{ color: CHECKPOINTS[target].color }}>
                  {CHECKPOINTS[target].label} — {CHECKPOINTS[target].desc}
                </div>
                <div className="text-gray-500">{CHECKPOINTS[target].time}</div>
              </div>
            </div>
            <pre className="bg-gray-950 text-green-300 text-xs rounded-lg px-3 py-2 font-mono">
              {target === 4 ? '/rewind     ← 목록 확인' : `/rewind ${target}   ← ${CHECKPOINTS[target].label}로 복구`}
            </pre>
          </div>

          {/* 명령어 목록 */}
          <div className="space-y-1.5">
            {COMMANDS.map(c => (
              <div key={c.cmd} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-lg flex-shrink-0">{c.icon}</span>
                <code className="font-mono text-xs px-2 py-0.5 rounded text-white font-bold flex-shrink-0"
                  style={{ backgroundColor: c.color }}>{c.cmd}</code>
                <span className="text-xs text-gray-500">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'session' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">컨텍스트 부족 신호가 보이면 아래 전략 사용</div>
          <div className="grid grid-cols-2 gap-2">
            {STRATEGIES.map(s => (
              <div key={s.title} className="p-3 rounded-xl border-2"
                style={{ borderColor: s.color + '60', backgroundColor: s.color + '08' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-bold text-xs" style={{ color: s.color }}>{s.title}</span>
                </div>
                <div className="text-xs text-gray-500 whitespace-pre-line">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-yellow-700 mb-1">⚠️ 컨텍스트 부족 신호</div>
            <div className="space-y-1 text-gray-600">
              <div>• 이전에 만든 파일을 "없다"고 말함</div>
              <div>• 앞서 논의한 내용을 기억 못함</div>
              <div>• 응답이 점점 짧아지고 generic해짐</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'gitflow' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">실험적 변경 전 가장 안전한 패턴</div>
          <div className="space-y-2">
            {[
              { step: 1, icon: '🔀', text: 'git checkout -b experiment/feature', desc: '실험용 브랜치 생성' },
              { step: 2, icon: '💾', text: '/checkpoint', desc: '클로드 체크포인트 저장' },
              { step: 3, icon: '🧪', text: '실험적 변경 진행', desc: 'Claude가 마음껏 수정' },
              { step: 4, icon: '✅', text: '만족 → git commit', desc: '결과물 커밋 후 PR 생성' },
              { step: 5, icon: '↩️', text: '불만족 → /rewind + git checkout main', desc: '두 가지 모두 되돌리기' },
            ].map(row => (
              <div key={row.step} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                <span className="w-6 h-6 rounded-full bg-gray-300 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{row.step}</span>
                <span className="text-lg flex-shrink-0">{row.icon}</span>
                <div>
                  <code className="text-xs font-mono text-purple-600">{row.text}</code>
                  <div className="text-xs text-gray-400 mt-0.5">{row.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs bg-green-50 border border-green-200 rounded-lg p-2">
            💡 <strong>Git + 체크포인트</strong>를 함께 쓰면 파일 변경(Git)과 대화 상태(체크포인트) 두 가지 모두 되돌릴 수 있습니다.
          </div>
        </div>
      )}
    </div>
  );
}
