import { useState } from 'react';

const EVENTS = [
  { id: 'PreToolUse',  icon: '🛡️', color: '#ef4444', label: 'PreToolUse',  when: '도구 실행 직전',   canBlock: true,  example: 'rm -rf 명령 차단' },
  { id: 'PostToolUse', icon: '📋', color: '#3b82f6', label: 'PostToolUse', when: '도구 실행 직후',   canBlock: false, example: '실행 결과 로깅' },
  { id: 'Stop',        icon: '🔔', color: '#10b981', label: 'Stop',        when: '응답 생성 완료',   canBlock: false, example: 'Slack 알림 전송' },
  { id: 'Notification',icon: '📣', color: '#8b5cf6', label: 'Notification',when: '알림 발생 시',     canBlock: false, example: '모바일 푸시 알림' },
];

const EXIT_CODES = [
  { code: 0, color: '#10b981', label: '성공 (계속)', desc: '훅이 정상 완료 → Claude가 작업 계속 진행' },
  { code: 1, color: '#f59e0b', label: '소프트 차단', desc: '경고 메시지만 출력 → Claude에게 전달, 계속 진행' },
  { code: 2, color: '#ef4444', label: '하드 차단',   desc: '즉시 중단! Claude가 해당 도구 실행을 취소' },
];

const EXAMPLES = [
  {
    name: 'rm -rf 차단', event: 'PreToolUse', code: 2,
    script: `#!/bin/bash
TOOL="$1"  CMD="$2"
if [[ "$CMD" == *"rm -rf"* ]]; then
  echo "⛔ rm -rf 명령은 차단됩니다!"
  exit 2  # 하드 차단
fi
exit 0  # 허용`,
  },
  {
    name: '작업 완료 알림', event: 'Stop', code: 0,
    script: `#!/bin/bash
# 클로드 작업 완료 시 알림
notify-send "Claude 완료" "작업이 끝났습니다"
# macOS: osascript -e 'display notification ...'
exit 0`,
  },
];

export default function HookSystemDiagram() {
  const [activeEvent, setActiveEvent] = useState('PreToolUse');
  const [showExample, setShowExample] = useState(0);

  return (
    <div className="space-y-4">
      {/* 이벤트 흐름 */}
      <div className="flex items-center gap-1 flex-wrap justify-center bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-16 h-10 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center text-xs font-bold text-blue-700">사용자</div>
        </div>
        <div className="text-gray-400 text-sm">→</div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-10 bg-purple-100 border-2 border-purple-400 rounded-lg flex items-center justify-center text-xs font-bold text-purple-700">Claude</div>
        </div>
        <div className="text-gray-400 text-sm">→</div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-10 bg-red-100 border-2 border-red-400 rounded-lg flex items-center justify-center text-xs font-bold text-red-700">PreToolUse</div>
          <div className="text-xs text-red-500 mt-0.5">훅 실행</div>
        </div>
        <div className="text-gray-400 text-sm">→</div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-10 bg-gray-100 border-2 border-gray-400 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600">도구</div>
          <div className="text-xs text-gray-400 mt-0.5">Bash/Read</div>
        </div>
        <div className="text-gray-400 text-sm">→</div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-10 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center text-xs font-bold text-blue-700">PostToolUse</div>
          <div className="text-xs text-blue-500 mt-0.5">훅 실행</div>
        </div>
        <div className="text-gray-400 text-sm">→</div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-10 bg-green-100 border-2 border-green-400 rounded-lg flex items-center justify-center text-xs font-bold text-green-700">Stop</div>
          <div className="text-xs text-green-500 mt-0.5">완료 훅</div>
        </div>
      </div>

      {/* 이벤트 선택 */}
      <div className="grid grid-cols-2 gap-2">
        {EVENTS.map(e => (
          <button key={e.id} onClick={() => setActiveEvent(e.id)}
            className={`p-3 rounded-xl border-2 text-left transition-all ${activeEvent === e.id ? 'shadow-md scale-[1.02]' : 'opacity-70 hover:opacity-100'}`}
            style={{ borderColor: activeEvent === e.id ? e.color : '#e5e7eb', backgroundColor: activeEvent === e.id ? e.color + '12' : '#f9fafb' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{e.icon}</span>
              <span className="font-bold text-xs font-mono" style={{ color: e.color }}>{e.label}</span>
              {e.canBlock && <span className="text-xs bg-red-100 text-red-600 px-1 rounded font-bold">차단가능</span>}
            </div>
            <div className="text-xs text-gray-500">{e.when}</div>
            <div className="text-xs text-gray-400 mt-0.5">예) {e.example}</div>
          </button>
        ))}
      </div>

      {/* 종료 코드 */}
      <div>
        <div className="text-xs font-bold text-gray-600 mb-2">종료 코드 — 훅이 반환하는 값의 의미</div>
        <div className="space-y-2">
          {EXIT_CODES.map(ec => (
            <div key={ec.code} className="flex items-center gap-3 p-3 rounded-xl border"
              style={{ backgroundColor: ec.color + '10', borderColor: ec.color + '40' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: ec.color }}>
                {ec.code}
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: ec.color }}>{ec.label}</div>
                <div className="text-xs text-gray-500">{ec.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 예제 스크립트 */}
      <div>
        <div className="text-xs font-bold text-gray-600 mb-2">실용적인 훅 스크립트 예시</div>
        <div className="flex gap-2 mb-2">
          {EXAMPLES.map((ex, i) => (
            <button key={i} onClick={() => setShowExample(i)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${showExample===i ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
              {ex.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
            훅 이벤트: {EXAMPLES[showExample].event}
          </span>
          <span className="text-xs px-2 py-0.5 rounded font-bold text-white"
            style={{ backgroundColor: EXIT_CODES.find(ec => ec.code === EXAMPLES[showExample].code)?.color }}>
            exit {EXAMPLES[showExample].code}
          </span>
        </div>
        <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {EXAMPLES[showExample].script}
        </pre>
      </div>
    </div>
  );
}
