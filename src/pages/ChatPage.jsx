import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Key, Trash2, ChevronDown, ChevronUp, Sparkles, AlertCircle } from 'lucide-react';

const PROMPT_EXAMPLES = [
  { label: '역할 부여 실습', text: '당신은 10년 경력의 마케팅 전문가입니다. 친환경 텀블러를 20~30대 직장인에게 홍보하는 인스타그램 홍보 문구 3가지를 작성해주세요. 각각 이모지 포함, 3문장 이내로 작성해주세요.' },
  { label: '보고서 작성 실습', text: '이번 달 생산팀 주간 업무 보고서를 작성해주세요.\n- 생산량: 1,250개 (목표 대비 102%)\n- 불량률: 1.8% (전주 2.3% 대비 개선)\n- 주요 이슈: 2호 라인 설비 점검 완료\n- 다음 주 계획: 신규 모델 생산 준비\n3개 단락으로 작성해주세요.' },
  { label: '이메일 작성 실습', text: '거래처에 납품 일정이 이틀 지연될 것 같다는 내용의 사과 이메일을 작성해주세요. 원인은 원자재 수급 지연입니다. 정중하고 전문적인 톤으로 작성해주세요.' },
  { label: 'AI 개념 질문', text: '인공지능 할루시네이션이 무엇인지, 그리고 업무에서 AI를 사용할 때 어떻게 주의해야 하는지 쉽게 설명해주세요.' },
  { label: '브레인스토밍', text: '소규모 물류 창고에서 AI를 활용해 업무 효율을 높일 수 있는 방법 5가지를 제안해주세요. 각 방법마다 구체적인 실행 방법도 한 줄씩 추가해주세요.' },
];

function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`chat-message flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-blue-600 text-white' : 'bg-purple-100 text-purple-700'
      }`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`text-xs font-medium ${isUser ? 'text-right text-blue-400' : 'text-purple-500'}`}>
          {isUser ? '나' : 'AI 어시스턴트'}
        </div>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-sm'
            : 'bg-white border border-gray-200 text-gray-700 rounded-tl-sm shadow-sm'
        }`}>
          {msg.content}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '안녕하세요! 저는 AI 학습 실습을 도와드리는 어시스턴트입니다. 🤖\n\n배운 프롬프트 기법을 직접 연습해보세요. 아래 예제 버튼을 눌러보거나 자유롭게 질문해보세요!\n\n⚠️ Claude API 키를 설정하면 실제 AI와 대화할 수 있습니다. API 키 없이는 시뮬레이션 모드로 작동합니다.',
    },
  ]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('aiedu_api_key') || '');
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  function saveApiKey() {
    const key = apiKeyInput.trim();
    if (key) {
      localStorage.setItem('aiedu_api_key', key);
      setApiKey(key);
    }
    setShowApiSettings(false);
    setApiKeyInput('');
  }

  function removeApiKey() {
    localStorage.removeItem('aiedu_api_key');
    setApiKey('');
    setApiKeyInput('');
  }

  async function sendMessage(text) {
    const userText = text || input.trim();
    if (!userText || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      if (apiKey) {
        // Claude API 호출
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system: '당신은 직업훈련 훈련생들이 AI를 배우고 실습할 수 있도록 돕는 교육 AI 어시스턴트입니다. 친절하고 명확하게 한국어로 답변하세요. 훈련생들이 AI 활용 역량을 키울 수 있도록 실용적인 답변을 제공하세요.',
            messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error?.message || 'API 오류가 발생했습니다.');
        }

        const data = await response.json();
        const reply = data.content[0]?.text || '응답을 받지 못했습니다.';
        setMessages([...newMessages, { role: 'assistant', content: reply }]);
      } else {
        // 시뮬레이션 모드
        await new Promise((r) => setTimeout(r, 1200));
        const simulatedReply = getSimulatedReply(userText);
        setMessages([...newMessages, { role: 'assistant', content: simulatedReply }]);
      }
    } catch (err) {
      setMessages([...newMessages, {
        role: 'assistant',
        content: `⚠️ 오류가 발생했습니다: ${err.message}\n\nAPI 키를 확인하거나 다시 시도해주세요.`,
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    setMessages([{
      role: 'assistant',
      content: '대화가 초기화되었습니다. 새로운 실습을 시작해보세요! 🤖',
    }]);
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">AI 챗봇 실습</h1>
          <p className="text-gray-500 text-sm mt-1">배운 프롬프트 기법을 직접 실습해보세요.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowApiSettings(!showApiSettings)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              apiKey ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Key size={14} />
            {apiKey ? 'API 연결됨' : 'API 설정'}
          </button>
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Trash2 size={14} /> 초기화
          </button>
        </div>
      </div>

      {/* API 설정 패널 */}
      {showApiSettings && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 animate-slide-up">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-700 leading-relaxed">
              <strong>보안 안내:</strong> API 키는 브라우저의 로컬 스토리지에만 저장됩니다. 공용 PC에서는 사용 후 반드시 '키 삭제'를 해주세요.
              Claude API 키는 <strong>console.anthropic.com</strong>에서 발급받을 수 있습니다.
            </div>
          </div>
          {apiKey ? (
            <div className="flex items-center gap-2">
              <div className="flex-1 text-xs text-green-700 bg-green-100 rounded-lg px-3 py-2">
                ✅ API 키가 설정되어 있습니다 (sk-ant-...{apiKey.slice(-4)})
              </div>
              <button onClick={removeApiKey} className="px-3 py-2 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                키 삭제
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button onClick={saveApiKey} className="px-4 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-500 transition-colors">
                저장
              </button>
            </div>
          )}
        </div>
      )}

      {/* 예제 프롬프트 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple-500" /> 프롬프트 예제 실습
          </span>
          {showExamples ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showExamples && (
          <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-gray-100">
            {PROMPT_EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => sendMessage(ex.text)}
                disabled={isLoading}
                className="text-left px-3 py-2.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-xs text-purple-700 font-medium transition-colors disabled:opacity-50"
              >
                {ex.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 채팅 창 */}
      <div className="bg-slate-50 rounded-xl border border-gray-200 shadow-sm">
        <div className="h-[420px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1.5 items-center h-5">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* 입력창 */}
        <div className="border-t border-gray-200 p-3">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="프롬프트를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
              rows={2}
              className="flex-1 text-sm border border-gray-300 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-1.5 text-center">
            {apiKey ? '✅ Claude API 연결됨 · 실제 AI와 대화 중' : '⚙️ 시뮬레이션 모드 · API 키 설정 시 실제 AI와 대화 가능'}
          </div>
        </div>
      </div>
    </div>
  );
}

function getSimulatedReply(input) {
  const lower = input.toLowerCase();
  if (lower.includes('역할') || lower.includes('마케터') || lower.includes('전문가')) {
    return `[시뮬레이션 응답]\n\n좋은 역할 부여 프롬프트입니다! 실제 Claude API를 연결하면 전문가 역할에 맞는 상세한 답변을 받을 수 있습니다.\n\n역할 부여의 핵심:\n• "당신은 [전문가]입니다" 형태로 시작\n• 구체적인 경력과 특성 명시\n• 결과물 형식도 함께 지정\n\n이 프롬프트는 훌륭하게 구성되었습니다 👍`;
  }
  if (lower.includes('보고서') || lower.includes('생산') || lower.includes('업무')) {
    return `[시뮬레이션 응답]\n\n업무 보고서 작성 요청이네요! API 키를 설정하면 실제로 완성된 보고서를 생성해드릴 수 있습니다.\n\n좋은 보고서 프롬프트의 조건:\n✅ 구체적인 수치 데이터 포함\n✅ 원하는 단락/섹션 구조 명시\n✅ 분량이나 형식 지정\n\n현재 프롬프트는 잘 작성되었습니다!`;
  }
  if (lower.includes('이메일') || lower.includes('메일')) {
    return `[시뮬레이션 응답]\n\n이메일 작성 요청입니다! 실제 AI 연결 시 상황에 맞는 완성된 이메일을 즉시 생성해드립니다.\n\n효과적인 이메일 프롬프트 팁:\n• 발신자와 수신자 관계 설명\n• 톤(공식적/친근한) 명시\n• 포함할 핵심 내용 목록화`;
  }
  if (lower.includes('할루시네이션') || lower.includes('ai') || lower.includes('인공지능')) {
    return `[시뮬레이션 응답]\n\nAI에 대한 질문이네요!\n\n할루시네이션(Hallucination)이란 AI가 사실이 아닌 내용을 자신 있게 답변하는 현상입니다.\n\n주의 방법:\n1. 중요한 수치/날짜는 검색으로 확인\n2. "출처를 알려줘"라고 추가 질문\n3. 중요 결정은 AI만 믿지 않기\n\nAPI 키 설정 시 실제 AI가 더 상세히 답변해드립니다!`;
  }
  return `[시뮬레이션 응답]\n\n"${input.slice(0, 30)}..." 질문을 받았습니다.\n\n현재 시뮬레이션 모드입니다. 실제 AI 응답을 받으려면 화면 상단의 'API 설정' 버튼을 눌러 Claude API 키를 입력해주세요.\n\nAPI 키는 console.anthropic.com에서 무료로 발급받을 수 있습니다. 💡`;
}
