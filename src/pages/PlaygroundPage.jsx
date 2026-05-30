import { useState } from 'react';
import { Code2, Terminal, Zap, BookOpen } from 'lucide-react';
import CodePlayground from '../components/CodePlayground/CodePlayground';
import { codeExamples, playgroundCategories } from '../data/codeExamples';

const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-700',   active: 'bg-blue-600 text-white border-blue-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', active: 'bg-purple-600 text-white border-purple-600' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700',  active: 'bg-green-600 text-white border-green-600' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', active: 'bg-orange-600 text-white border-orange-600' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700',    active: 'bg-red-600 text-white border-red-600' },
  cyan:   { bg: 'bg-cyan-50',   border: 'border-cyan-200',   text: 'text-cyan-700',   active: 'bg-cyan-600 text-white border-cyan-600' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', active: 'bg-indigo-600 text-white border-indigo-600' },
};

export default function PlaygroundPage() {
  const [activeCategory, setActiveCategory] = useState('ai-algorithms');
  const [activeExample, setActiveExample] = useState('perceptron');

  const category = playgroundCategories.find(c => c.id === activeCategory);
  const example = codeExamples[activeExample];
  const c = colorMap[category?.color || 'blue'];

  return (
    <div className="animate-fade-in space-y-5">
      {/* 헤더 */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-500/20 border border-green-500/40 rounded-xl flex items-center justify-center flex-shrink-0">
            <Terminal size={24} className="text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">코딩 플레이그라운드</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI 알고리즘을 직접 코딩하고 실행해보세요. JavaScript는 브라우저에서 즉시 실행,
              Python은 Pyodide(웹어셈블리) 또는 로컬 환경에서 실행 가능합니다.
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1"><Zap size={12} className="text-yellow-400" /> JS — 브라우저 즉시 실행</span>
              <span className="flex items-center gap-1"><Code2 size={12} className="text-blue-400" /> Python — Pyodide or 로컬</span>
              <span className="flex items-center gap-1"><BookOpen size={12} className="text-green-400" /> 코드 수정 후 실행 가능</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-5">
        {/* 사이드바: 카테고리 + 예제 목록 */}
        <div className="lg:col-span-1 space-y-3">
          {playgroundCategories.map(cat => {
            const cc = colorMap[cat.color];
            const isActiveCat = activeCategory === cat.id;
            return (
              <div key={cat.id} className={`rounded-xl border-2 overflow-hidden transition-all ${isActiveCat ? cc.border : 'border-gray-200'}`}>
                <button
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveExample(cat.examples[0]);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm font-bold transition-colors ${
                    isActiveCat ? `${cc.bg} ${cc.text}` : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </button>
                {isActiveCat && (
                  <div className={`${cc.bg} border-t ${cc.border}`}>
                    {cat.examples.map(exId => {
                      const ex = codeExamples[exId];
                      if (!ex) return null;
                      return (
                        <button
                          key={exId}
                          onClick={() => setActiveExample(exId)}
                          className={`w-full text-left px-3 py-2 text-xs transition-colors border-b last:border-b-0 ${cc.border} ${
                            activeExample === exId ? `${cc.active}` : `${cc.text} opacity-80 hover:opacity-100 bg-white/50`
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              ex.language === 'python' ? 'bg-blue-400' : 'bg-yellow-400'
                            }`} />
                            <span className="line-clamp-1">{ex.title.split('—')[0].trim()}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* 실행 가이드 */}
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs space-y-2">
            <div className="font-bold text-gray-700">실행 방법</div>
            <div className="flex items-start gap-2 text-gray-600">
              <span className="text-yellow-500 mt-0.5">⚡</span>
              <span><strong>JS:</strong> Run 버튼 클릭</span>
            </div>
            <div className="flex items-start gap-2 text-gray-600">
              <span className="text-blue-500 mt-0.5">🐍</span>
              <span><strong>Python:</strong> 최초 실행 시 ~30초 로딩 (Pyodide)</span>
            </div>
            <div className="flex items-start gap-2 text-gray-600">
              <span className="text-purple-500 mt-0.5">🔑</span>
              <span><strong>API 코드:</strong> 로컬 환경에서 실행</span>
            </div>
          </div>
        </div>

        {/* 메인: 코드 에디터 */}
        <div className="lg:col-span-3">
          {example ? (
            <div className="space-y-3">
              <div className={`rounded-xl ${c.bg} border ${c.border} p-4`}>
                <h2 className={`font-bold ${c.text} text-lg`}>{example.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{example.description}</p>
              </div>
              <CodePlayground
                key={activeExample}
                defaultCode={example.code}
                language={example.language}
                title={example.title.split('—')[0].trim()}
                description={example.description}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400 bg-white rounded-xl border border-gray-200">
              예제를 선택하세요
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
