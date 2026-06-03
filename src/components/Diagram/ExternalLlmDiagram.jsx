import { useState } from 'react';

const PROVIDERS = [
  { id: 'anthropic', icon: '🤖', label: 'Anthropic Claude', color: '#6366f1', endpoint: 'https://api.anthropic.com', models: ['claude-opus-4-5', 'claude-sonnet-4-6', 'claude-haiku-4-5'], default: true },
  { id: 'glm',       icon: '🇨🇳', label: 'GLM-5 (智谱AI)',    color: '#ef4444', endpoint: 'https://open.bigmodel.cn/api/paas/v4/', models: ['glm-4', 'glm-4-flash', 'glm-3-turbo'], default: false },
  { id: 'ollama',    icon: '🦙', label: 'Ollama (로컬)',      color: '#10b981', endpoint: 'http://localhost:11434/v1', models: ['llama3.1', 'codellama', 'mistral'], default: false },
  { id: 'deepseek',  icon: '🔍', label: 'DeepSeek',          color: '#3b82f6', endpoint: 'https://api.deepseek.com/v1', models: ['deepseek-coder', 'deepseek-chat'], default: false },
];

export default function ExternalLlmDiagram() {
  const [selected, setSelected] = useState('anthropic');

  const p = PROVIDERS.find(x => x.id === selected);

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 text-center">
        Claude Code UI를 그대로 유지하면서 내부 API 엔드포인트만 교체
      </div>

      {/* 아키텍처 그림 */}
      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="w-16 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-bold text-center leading-tight">Claude Code<br/>CLI</div>
          <div className="text-xs text-gray-400">그대로 사용</div>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-gray-400 text-xs">ANTHROPIC_BASE_URL</div>
          <div className="text-gray-300 text-lg">→</div>
        </div>
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="w-20 h-12 rounded-lg flex items-center justify-center text-xs font-bold text-center leading-tight text-white"
            style={{ backgroundColor: p?.color }}>
            {p?.icon}<br/>{p?.label.split(' ')[0]}
          </div>
          <div className="text-xs text-gray-400">OpenAI 호환 API</div>
        </div>
      </div>

      {/* 프로바이더 선택 */}
      <div className="grid grid-cols-2 gap-2">
        {PROVIDERS.map(prov => (
          <button key={prov.id} onClick={() => setSelected(prov.id)}
            className={`p-2.5 rounded-xl border-2 text-left transition-all ${selected === prov.id ? 'shadow-md scale-[1.02]' : 'opacity-60 hover:opacity-90'}`}
            style={{ borderColor: selected === prov.id ? prov.color : '#e5e7eb', backgroundColor: selected === prov.id ? prov.color + '10' : 'white' }}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{prov.icon}</span>
              <div>
                <div className="font-bold text-xs" style={{ color: prov.color }}>{prov.label}</div>
                {prov.default && <span className="text-xs bg-green-100 text-green-600 px-1 rounded font-bold">기본값</span>}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 선택된 프로바이더 설정 */}
      {p && (
        <div className="rounded-xl border-2 overflow-hidden"
          style={{ borderColor: p.color }}>
          <div className="px-3 py-2 text-xs font-bold text-white flex items-center gap-2"
            style={{ backgroundColor: p.color }}>
            {p.icon} {p.label} 설정 방법
          </div>
          <pre className="bg-gray-950 text-green-300 text-xs p-3 font-mono leading-relaxed overflow-x-auto">
            {p.id === 'anthropic'
              ? `# 기본 설정 (별도 설정 불필요)
export ANTHROPIC_API_KEY="sk-ant-..."
claude`
              : p.id === 'ollama'
              ? `# 로컬 Ollama 서버 먼저 실행
ollama serve
ollama pull llama3.1

# Claude Code에서 Ollama 사용
export ANTHROPIC_BASE_URL="http://localhost:11434/v1"
export ANTHROPIC_API_KEY="ollama"
claude --model llama3.1`
              : `# .claude/settings.json 에 추가
{
  "env": {
    "ANTHROPIC_BASE_URL": "${p.endpoint}",
    "ANTHROPIC_API_KEY": "${'$'}{${p.id.toUpperCase()}_API_KEY}",
    "ANTHROPIC_MODEL": "${p.models[0]}"
  }
}`}
          </pre>
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-200">
            <div className="text-xs font-bold text-gray-600 mb-1">사용 가능한 모델</div>
            <div className="flex gap-1 flex-wrap">
              {p.models.map(m => (
                <code key={m} className="text-xs px-2 py-0.5 rounded font-mono"
                  style={{ backgroundColor: p.color + '15', color: p.color }}>{m}</code>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
        <div className="font-bold text-yellow-700 mb-1">⚠️ 주의사항</div>
        <div className="space-y-1 text-gray-600">
          <div>• 외부 LLM은 Claude 고유 기능(캐싱 등)이 제한될 수 있습니다</div>
          <div>• 민감한 코드는 로컬 Ollama 사용을 권장합니다</div>
          <div>• OpenAI 호환 API만 연동 가능합니다</div>
        </div>
      </div>
    </div>
  );
}
