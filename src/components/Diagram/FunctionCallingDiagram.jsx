import { useState } from 'react';

const FLOW_STEPS = [
  { id: 'user',   icon: '👤', label: '사용자 요청',    color: '#6b7280', msg: '"서울 날씨 알려줘"' },
  { id: 'llm1',   icon: '🤖', label: 'LLM 분석',      color: '#8b5cf6', msg: '도구 필요 판단 → get_weather 선택' },
  { id: 'call',   icon: '📡', label: '함수 호출',      color: '#3b82f6', msg: 'get_weather(city="Seoul", unit="celsius")' },
  { id: 'api',    icon: '🌐', label: 'API 실행',       color: '#10b981', msg: '{"temp": 18, "condition": "Cloudy", "humidity": 65}' },
  { id: 'llm2',   icon: '🤖', label: 'LLM 결과 해석', color: '#8b5cf6', msg: '결과를 자연어로 변환' },
  { id: 'answer', icon: '💬', label: '최종 답변',      color: '#059669', msg: '"서울 현재 날씨: 18°C, 흐림, 습도 65%"' },
];

const TOOL_SCHEMA = `{
  "type": "function",
  "function": {
    "name": "get_weather",
    "description": "특정 도시의 현재 날씨 반환",
    "parameters": {
      "type": "object",
      "properties": {
        "city": {
          "type": "string",
          "description": "도시명 (예: Seoul)"
        },
        "unit": {
          "type": "string",
          "enum": ["celsius", "fahrenheit"]
        }
      },
      "required": ["city"]
    }
  }
}`;

const USE_CASES = [
  { icon: '🔍', name: 'web_search',      desc: '실시간 정보 검색',     color: '#3b82f6' },
  { icon: '🧮', name: 'calculate',       desc: '수학 계산',            color: '#10b981' },
  { icon: '🗄️', name: 'query_database', desc: '사내 DB 조회',          color: '#8b5cf6' },
  { icon: '📧', name: 'send_email',      desc: '이메일 발송',           color: '#ef4444' },
  { icon: '📅', name: 'create_event',    desc: '캘린더 일정 생성',      color: '#f59e0b' },
  { icon: '🔌', name: 'call_api',        desc: '외부 REST API 호출',    color: '#6366f1' },
];

export default function FunctionCallingDiagram() {
  const [tab, setTab] = useState('flow');
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['flow', '호출 흐름'], ['schema', '함수 스키마'], ['usecases', '활용 사례']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab === id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'flow' && (
        <div className="space-y-2">
          <div className="text-xs text-gray-500 text-center">
            LLM이 직접 어떤 함수를 호출할지 결정하는 과정
          </div>
          {FLOW_STEPS.map((s, i) => (
            <button key={s.id} onClick={() => setActiveStep(i)}
              className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all ${activeStep === i ? 'shadow-md' : 'opacity-60 hover:opacity-90'}`}
              style={{ borderColor: activeStep === i ? s.color : '#e5e7eb', backgroundColor: activeStep === i ? s.color + '08' : '#f9fafb' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: s.color }}>{i + 1}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{s.icon}</span>
                  <span className="font-bold text-xs" style={{ color: s.color }}>{s.label}</span>
                </div>
                <code className="text-xs text-gray-500 font-mono mt-0.5 block leading-relaxed">{s.msg}</code>
              </div>
            </button>
          ))}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-blue-700 mb-1">핵심: LLM이 직접 결정</div>
            <div className="text-gray-600">
              <strong>기존:</strong> 개발자가 언제 어떤 API를 호출할지 코드로 작성<br/>
              <strong>Function Calling:</strong> LLM이 질문을 이해하고 스스로 적절한 함수 선택·호출
            </div>
          </div>
        </div>
      )}

      {tab === 'schema' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">
            JSON 스키마로 함수 명세 → LLM이 읽고 자동으로 올바른 인자 생성
          </div>
          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {TOOL_SCHEMA}
          </pre>
          <pre className="bg-gray-950 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">{`# OpenAI API 호출 예시
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "서울 날씨는?"}],
    tools=[weather_tool_schema],
    tool_choice="auto"  # LLM이 알아서 판단
)

# LLM 응답에 tool_calls 포함
tool_call = response.choices[0].message.tool_calls[0]
# → name: "get_weather"
# → arguments: {"city": "Seoul", "unit": "celsius"}`}</pre>
        </div>
      )}

      {tab === 'usecases' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">
            Function Calling으로 LLM에 연결 가능한 도구들
          </div>
          <div className="grid grid-cols-2 gap-2">
            {USE_CASES.map(uc => (
              <div key={uc.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-2xl flex-shrink-0">{uc.icon}</span>
                <div>
                  <code className="font-mono text-xs font-bold" style={{ color: uc.color }}>{uc.name}</code>
                  <div className="text-xs text-gray-500 mt-0.5">{uc.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-green-700 mb-1">ReAct와의 차이</div>
            <div className="space-y-1 text-gray-600">
              <div><strong>ReAct:</strong> LLM이 Thought→Action→Observation 루프를 텍스트로 추론</div>
              <div><strong>Function Calling:</strong> LLM이 구조화된 JSON으로 함수를 직접 호출 (더 정확하고 안정적)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
