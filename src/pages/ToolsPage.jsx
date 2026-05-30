import { useState, useRef } from 'react';
import { ExternalLink, Maximize2, Minimize2, AlertCircle } from 'lucide-react';
import OpenCvDemo from '../components/OpenCV/OpenCvDemo';

/* ── 외부 도구 목록 ──────────────────────────────────────────── */
const TOOLS = [
  {
    id: 'bbycroft',
    title: 'LLM 내부 3D 탐색기',
    subtitle: 'bbycroft.net/llm',
    url: 'https://bbycroft.net/llm',
    icon: '🧊',
    color: '#7c3aed',
    tag: 'LLM · Transformer',
    difficulty: '중급',
    desc: 'GPT-2 모델의 실제 가중치가 작동하는 과정을 3D로 시각화합니다. 토큰 임베딩 → 어텐션 → FFN → 출력까지 한 눈에 탐색할 수 있습니다.',
    highlights: ['토큰별 어텐션 패턴 실시간 확인', '각 레이어의 가중치 행렬 시각화', '실제 GPT-2 소형 모델 내장'],
    tryEmbed: true,
  },
  {
    id: 'tfplayground',
    title: '신경망 학습 플레이그라운드',
    subtitle: 'playground.tensorflow.org',
    url: 'https://playground.tensorflow.org',
    icon: '🧠',
    color: '#f59e0b',
    tag: '신경망 · 분류',
    difficulty: '입문',
    desc: '브라우저에서 신경망의 레이어·뉴런 수·활성화 함수를 바꿔가며 분류 문제를 직접 학습시킬 수 있습니다.',
    highlights: ['레이어/뉴런 수를 드래그로 조정', '학습 곡선 실시간 시각화', '다양한 데이터셋 선택 가능'],
    tryEmbed: true,
  },
  {
    id: 'cnnexplainer',
    title: 'CNN 구조 인터랙티브 해설',
    subtitle: 'poloclub.github.io/cnn-explainer',
    url: 'https://poloclub.github.io/cnn-explainer/',
    icon: '🔍',
    color: '#0ea5e9',
    tag: 'CNN · 이미지 분류',
    difficulty: '중급',
    desc: 'Tiny VGG 모델을 통해 Convolution, Pooling, ReLU의 역할을 이미지와 함께 단계별로 설명합니다.',
    highlights: ['필터(커널)가 이미지에 적용되는 과정', 'Flatten → Dense 연결 구조', '실제 ImageNet 분류 결과'],
    tryEmbed: false,
  },
  {
    id: 'teachable',
    title: '구글 Teachable Machine',
    subtitle: 'teachablemachine.withgoogle.com',
    url: 'https://teachablemachine.withgoogle.com',
    icon: '🤖',
    color: '#059669',
    tag: '노코드 AI · 분류',
    difficulty: '입문',
    desc: '웹캠으로 직접 데이터를 수집하고 이미지/소리/자세 분류 모델을 코드 없이 학습시킬 수 있습니다.',
    highlights: ['웹캠으로 실시간 학습 데이터 수집', '모델 내보내기 (TensorFlow.js)', '포즈·제스처 인식 지원'],
    tryEmbed: false,
  },
  {
    id: 'hf',
    title: 'Hugging Face Spaces',
    subtitle: 'huggingface.co/spaces',
    url: 'https://huggingface.co/spaces',
    icon: '🤗',
    color: '#e5850a',
    tag: '모델 허브 · 실습',
    difficulty: '중급',
    desc: '전 세계 개발자들이 만든 수만 개의 AI 데모를 웹브라우저에서 바로 실행할 수 있는 플랫폼입니다.',
    highlights: ['텍스트·이미지·음성 모델 무료 실습', 'Gradio/Streamlit 앱 호스팅', 'PyTorch, Transformers 모델 지원'],
    tryEmbed: false,
  },
  {
    id: 'jalammar',
    title: 'Jay Alammar — 그림으로 배우는 AI',
    subtitle: 'jalammar.github.io',
    url: 'https://jalammar.github.io',
    icon: '🎨',
    color: '#6366f1',
    tag: 'Transformer · 시각화',
    difficulty: '중급',
    desc: 'Transformer, GPT, BERT, Word2Vec을 아름다운 애니메이션 그림으로 단계별 설명합니다. "Illustrated Transformer" 시리즈로 유명합니다.',
    highlights: [
      'The Illustrated Transformer — 어텐션 메커니즘 시각화',
      'The Illustrated GPT-2 — 언어 모델 작동 원리',
      'Visualizing Neural Machine Translation',
    ],
    tryEmbed: false,
  },
  {
    id: 'colah',
    title: "Chris Olah's Blog — 신경망 직관적 이해",
    subtitle: 'colah.github.io',
    url: 'https://colah.github.io',
    icon: '🔬',
    color: '#0891b2',
    tag: 'LSTM · CNN · 위상',
    difficulty: '고급',
    desc: 'Understanding LSTMs, Conv Nets 등 신경망의 수학적 직관을 인터랙티브 그래프로 깊이 있게 설명합니다.',
    highlights: [
      'Understanding LSTM Networks — 게이트 구조 시각화',
      'Conv Nets: A Modular Perspective',
      'Neural Networks, Manifolds, and Topology',
    ],
    tryEmbed: false,
  },
  {
    id: 'lmarena',
    title: 'LM Arena — 모델 성능 비교',
    subtitle: 'lmarena.ai',
    url: 'https://lmarena.ai',
    icon: '⚔️',
    color: '#dc2626',
    tag: 'LLM 벤치마크 · 비교',
    difficulty: '입문',
    desc: '여러 LLM(Claude, GPT, Gemini 등)에게 같은 질문을 보내고 어느 모델이 더 좋은지 직접 투표로 순위를 매기는 플랫폼입니다.',
    highlights: [
      '익명 A/B 테스트로 모델 편견 없이 비교',
      '수백만 건 투표 기반 ELO 리더보드',
      '무료로 여러 최신 LLM 직접 체험',
    ],
    tryEmbed: false,
  },
];

/* ── iframe 임베딩 카드 ──────────────────────────────────────── */
function EmbedCard({ tool }) {
  const [expanded, setExpanded] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const timerRef = useRef(null);

  function handleLoad() {
    clearTimeout(timerRef.current);
  }

  function handleOpenEmbed() {
    setShowEmbed(true);
    setEmbedFailed(false);
    // 5초 후에도 응답 없으면 실패로 간주
    timerRef.current = setTimeout(() => setEmbedFailed(true), 8000);
  }

  return (
    <div className="rounded-2xl border-2 overflow-hidden transition-all"
      style={{ borderColor: tool.color + '40' }}>
      {/* 헤더 */}
      <div className="p-5" style={{ background: `linear-gradient(135deg, ${tool.color}15, ${tool.color}05)` }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{tool.icon}</div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-gray-800">{tool.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                  style={{ backgroundColor: tool.color }}>{tool.tag}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{tool.difficulty}</span>
              </div>
              <div className="text-xs text-gray-400 mt-0.5 font-mono">{tool.subtitle}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {tool.tryEmbed && (
              <button onClick={() => { setExpanded(!expanded); if (!expanded) handleOpenEmbed(); }}
                className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border transition-all"
                style={{
                  borderColor: tool.color,
                  color: expanded ? 'white' : tool.color,
                  backgroundColor: expanded ? tool.color : 'transparent',
                }}>
                {expanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                {expanded ? '닫기' : '임베드'}
              </button>
            )}
            <a href={tool.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: tool.color }}>
              <ExternalLink size={13} /> 새 탭에서 열기
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-3 leading-relaxed">{tool.desc}</p>

        <ul className="mt-3 space-y-1">
          {tool.highlights.map((h, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: tool.color }} />
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* iframe 임베딩 영역 */}
      {expanded && showEmbed && (
        <div className="border-t-2" style={{ borderColor: tool.color + '30' }}>
          {embedFailed ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 bg-gray-50">
              <AlertCircle size={32} className="text-yellow-500" />
              <div className="text-center">
                <div className="font-medium text-gray-700 text-sm">이 사이트는 임베딩을 차단합니다</div>
                <div className="text-xs text-gray-400 mt-1">X-Frame-Options 또는 CSP 정책에 의해 차단됨</div>
              </div>
              <a href={tool.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-80"
                style={{ backgroundColor: tool.color }}>
                <ExternalLink size={15} /> 새 탭에서 열기
              </a>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10 pointer-events-none"
                style={{ display: 'none' }} id={`loading-${tool.id}`}>
                <div className="text-sm text-gray-500">로딩 중...</div>
              </div>
              <iframe
                src={tool.url}
                title={tool.title}
                className="w-full"
                style={{ height: '600px', border: 'none' }}
                onLoad={handleLoad}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── 일반 도구 카드 ──────────────────────────────────────────── */
function ToolCard({ tool }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white hover:shadow-md transition-shadow space-y-3">
      <div className="flex items-start gap-3">
        <div className="text-2xl">{tool.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-gray-800 text-sm">{tool.title}</span>
            <span className="text-xs px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: tool.color }}>
              {tool.difficulty}
            </span>
          </div>
          <div className="text-xs text-gray-400 font-mono mt-0.5">{tool.subtitle}</div>
        </div>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{tool.desc}</p>
      <div className="space-y-1">
        {tool.highlights.map((h, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: tool.color }} />
            {h}
          </div>
        ))}
      </div>
      <a href={tool.url} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-white transition-opacity hover:opacity-80"
        style={{ backgroundColor: tool.color }}>
        <ExternalLink size={13} /> 열기
      </a>
    </div>
  );
}

/* ── ToolsPage ──────────────────────────────────────────────── */
const TABS = [
  { id: 'llm', label: '🧊 LLM 시각화 도구' },
  { id: 'opencv', label: '👁️ OpenCV 실습' },
  { id: 'all', label: '🗂️ 전체 도구 목록' },
];

export default function ToolsPage() {
  const [tab, setTab] = useState('llm');
  const featuredTools = TOOLS.filter(t => t.tryEmbed);
  const otherTools = TOOLS.filter(t => !t.tryEmbed);

  return (
    <div className="animate-fade-in space-y-6">
      {/* 헤더 */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">🔗</div>
          <div>
            <h1 className="text-2xl font-bold">AI 학습 도구 연동</h1>
            <p className="text-indigo-200 text-sm mt-1 leading-relaxed">
              외부 인터랙티브 시각화 도구와 브라우저 기반 OpenCV 실습을 한 곳에서 사용하세요.
            </p>
            <div className="flex flex-wrap gap-3 mt-3 text-xs text-indigo-300">
              <span>🧊 LLM 3D 탐색기 (bbycroft)</span>
              <span>🧠 신경망 플레이그라운드</span>
              <span>👁️ OpenCV.js 브라우저 실습</span>
              <span>🤗 Hugging Face Spaces</span>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              tab === t.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* LLM 시각화 탭 */}
      {tab === 'llm' && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-800 flex items-start gap-2">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>
              <strong>임베드 안내:</strong> 일부 사이트는 보안 정책(X-Frame-Options)으로 임베딩을 차단할 수 있습니다.
              차단 시 "새 탭에서 열기" 버튼을 이용하세요.
            </span>
          </div>
          {featuredTools.map(tool => (
            <EmbedCard key={tool.id} tool={tool} />
          ))}
          <div className="grid md:grid-cols-2 gap-4">
            {otherTools.slice(0, 2).map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      )}

      {/* OpenCV 탭 */}
      {tab === 'opencv' && (
        <div className="space-y-5 animate-fade-in">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">👁️</div>
              <div>
                <h2 className="font-bold text-gray-800">OpenCV.js — 브라우저 이미지 처리 실습</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  OpenCV C++ 라이브러리를 WebAssembly로 컴파일한 버전입니다. 서버 없이 브라우저에서 바로 실행됩니다.
                </p>
              </div>
            </div>
            <OpenCvDemo />
          </div>

          {/* OpenCV 활용 분야 */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '🏭', title: '제조 품질 검사', desc: '결함 부위 자동 탐지, 치수 측정', color: '#3b82f6' },
              { icon: '🔒', title: '얼굴 인식 보안', desc: 'CCTV 분석, 출입 통제 시스템', color: '#7c3aed' },
              { icon: '🚗', title: '자율주행', desc: '차선 감지, 장애물 인식', color: '#059669' },
              { icon: '🏥', title: '의료 영상 분석', desc: 'X-Ray, MRI 이상 감지', color: '#d97706' },
              { icon: '🌾', title: '농업 AI', desc: '병충해 감지, 작물 상태 분류', color: '#dc2626' },
              { icon: '📦', title: '물류 자동화', desc: '바코드 인식, 박스 분류', color: '#0ea5e9' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-sm text-gray-800 mb-1">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
                <div className="w-full h-1 rounded-full mt-3" style={{ backgroundColor: item.color + '40' }}>
                  <div className="h-1 rounded-full w-3/4" style={{ backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 전체 도구 목록 탭 */}
      {tab === 'all' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          {/* 추가 학습 자료 링크 */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3">📚 추가 학습 자료</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { title: 'Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', desc: 'Transformer를 그림으로 완벽 이해', icon: '🎨' },
                { title: 'Illustrated GPT-2', url: 'https://jalammar.github.io/illustrated-gpt2/', desc: 'GPT 언어 모델 시각화', icon: '🤖' },
                { title: 'Understanding LSTMs', url: 'https://colah.github.io/posts/2015-08-Understanding-LSTMs/', desc: 'LSTM 구조 직관적 설명', icon: '🔬' },
                { title: 'Papers With Code', url: 'https://paperswithcode.com', desc: 'SOTA 논문 + 재현 코드', icon: '📄' },
                { title: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', desc: '무료 ML 마이크로코스', icon: '🎓' },
                { title: 'Fast.ai', url: 'https://www.fast.ai', desc: '탑다운 실용 딥러닝 강의', icon: '⚡' },
              ].map(r => (
                <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <span className="text-xl">{r.icon}</span>
                  <div>
                    <div className="font-medium text-sm text-gray-800">{r.title}</div>
                    <div className="text-xs text-gray-400">{r.desc}</div>
                  </div>
                  <ExternalLink size={13} className="ml-auto text-gray-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
