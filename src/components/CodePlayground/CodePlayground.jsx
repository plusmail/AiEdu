import { useState, useRef, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { Play, RotateCcw, Copy, Check, Terminal, Loader2, ExternalLink, AlertCircle, BookOpen } from 'lucide-react';

/* ── 브라우저에서 실행 불가능한 Python 라이브러리 ── */
const LOCAL_ONLY_PATTERNS = [
  'sklearn', 'from sklearn', 'import sklearn',
  'tensorflow', 'import tf', 'from tf.',
  'keras', 'from keras', 'import keras',
  'torch', 'import torch', 'from torch',
  'anthropic', 'from anthropic',
  'openai', 'from openai',
  'api_key', 'YOUR_API_KEY',
  'transformers', 'from transformers',
  'cv2', 'import cv2',
  'ultralytics', 'from ultralytics',
  'faiss', 'import faiss',
  'BartForConditionalGeneration', 'PreTrainedTokenizerFast',
  'xgboost', 'lightgbm',
];

function isLocalOnlyPython(code) {
  return LOCAL_ONLY_PATTERNS.some(p => code.includes(p));
}

/* ── Pyodide 로더 ── */
let pyodideInstance = null;
let pyodideLoading = false;
let pyodideLoadPromise = null;

async function loadPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) return pyodideLoadPromise;
  pyodideLoading = true;
  pyodideLoadPromise = (async () => {
    if (!window.loadPyodide) {
      await new Promise((res, rej) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js';
        s.onload = res; s.onerror = rej;
        document.head.appendChild(s);
      });
    }
    const py = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/' });
    pyodideInstance = py;
    return py;
  })();
  return pyodideLoadPromise;
}

/* ── JavaScript 실행 (new Function + console 교체) ── */
function runJavaScript(code) {
  const logs = [];
  const fmt = (args) =>
    args.map(a => (typeof a === 'object' && a !== null) ? JSON.stringify(a, null, 2) : String(a)).join(' ');

  const _log = console.log, _err = console.error, _warn = console.warn, _table = console.table;
  console.log   = (...a) => { if (logs.length < 500) logs.push(fmt(a)); };
  console.error = (...a) => logs.push('❌ ' + fmt(a));
  console.warn  = (...a) => logs.push('⚠️  ' + fmt(a));
  console.table = (d)    => logs.push(JSON.stringify(d, null, 2));

  try {
    new Function(code)();
  } catch (e) {
    logs.push(`❌ ${e.name}: ${e.message}`);
  } finally {
    console.log = _log; console.error = _err;
    console.warn = _warn; console.table = _table;
  }
  return logs.join('\n') || '(출력 없음)';
}

/* ── Python 실행 (Pyodide, numpy/math 전용) ── */
async function runPythonCode(code) {
  const py = await loadPyodide();
  py.runPython('import sys, io\nsys.stdout=io.StringIO()\nsys.stderr=io.StringIO()');
  try {
    py.runPython(code);
    const out = py.runPython('sys.stdout.getvalue()');
    const err = py.runPython('sys.stderr.getvalue()');
    return { output: out + (err ? '\n⚠️  stderr:\n' + err : '') };
  } catch (e) {
    return { output: `❌ ${e.message}` };
  }
}

/* ── 로컬 전용 안내 패널 ── */
function LocalOnlyPanel({ code, onCopy, copied }) {
  const hasSklearn     = code.includes('sklearn');
  const hasKeras       = code.includes('keras') || code.includes('tensorflow');
  const hasTorch       = code.includes('torch');
  const hasApi         = code.includes('api_key') || code.includes('YOUR_API_KEY') || code.includes('anthropic') || code.includes('openai');
  const hasTransformers = code.includes('transformers');

  const libs = [
    hasSklearn && 'scikit-learn',
    hasKeras   && 'TensorFlow/Keras',
    hasTorch   && 'PyTorch',
    hasApi     && 'API 키',
    hasTransformers && 'Hugging Face',
  ].filter(Boolean);

  const installCmd = [
    hasSklearn && 'scikit-learn',
    hasKeras   && 'tensorflow',
    hasTorch   && 'torch',
    hasApi     && 'anthropic',
    hasTransformers && 'transformers',
  ].filter(Boolean).join(' ');

  return (
    <div className="border-t border-gray-800 bg-gray-900">
      <div className="flex items-start gap-3 px-4 py-4">
        <AlertCircle size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 space-y-3">
          <div>
            <div className="text-sm font-bold text-yellow-300 mb-1">
              브라우저에서 직접 실행 불가
            </div>
            <div className="text-xs text-gray-400 leading-relaxed">
              이 코드는 <span className="text-yellow-300 font-medium">{libs.join(', ')}</span>
              {libs.length > 0 ? '을(를)' : ''} 사용합니다.
              구글 코랩 또는 로컬 Python 환경에서 실행하세요.
            </div>
          </div>

          {/* 실행 방법 카드 */}
          <div className="grid sm:grid-cols-2 gap-2">
            {/* Colab */}
            <a href="https://colab.research.google.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-2.5 bg-orange-950/60 border border-orange-700/50 rounded-lg hover:bg-orange-900/60 transition-colors group">
              <span className="text-xl flex-shrink-0">☁️</span>
              <div>
                <div className="text-xs font-bold text-orange-300">구글 코랩에서 실행</div>
                <div className="text-xs text-gray-400">무료 · GPU 지원 · 설치 불필요</div>
              </div>
              <ExternalLink size={12} className="ml-auto text-gray-500 group-hover:text-orange-300 transition-colors flex-shrink-0" />
            </a>

            {/* 로컬 */}
            <div className="px-3 py-2.5 bg-blue-950/60 border border-blue-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xl">🐍</span>
                <span className="text-xs font-bold text-blue-300">로컬 환경에서 실행</span>
              </div>
              {installCmd && (
                <div className="font-mono text-xs text-green-400 bg-gray-900 rounded px-2 py-1">
                  pip install {installCmd}
                </div>
              )}
            </div>
          </div>

          {/* 코랩 사용 가이드 */}
          <div className="bg-gray-800/60 rounded-lg px-3 py-2.5 space-y-1">
            <div className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <BookOpen size={12} /> 코랩 실행 순서
            </div>
            {[
              'colab.research.google.com 접속',
              '상단 "파일 → 새 노트북" 클릭',
              '위의 코드를 복사해서 셀에 붙여넣기',
              'Shift+Enter로 실행',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                <span className="w-4 h-4 rounded-full bg-gray-700 text-gray-300 flex items-center justify-center text-xs flex-shrink-0 font-bold">{i+1}</span>
                {step}
              </div>
            ))}
          </div>

          {/* 복사 버튼 */}
          <button onClick={onCopy}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium transition-all ${
              copied ? 'bg-green-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
            }`}>
            {copied ? <><Check size={13} /> 복사 완료!</> : <><Copy size={13} /> 코드 전체 복사</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 메인 컴포넌트 ── */
export default function CodePlayground({
  defaultCode = '',
  language = 'javascript',
  title = '코드 실행',
  description = '',
  readOnly = false,
}) {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyStatus, setPyStatus] = useState('idle');
  const [copied, setCopied] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const originalCode = useRef(defaultCode);

  const isPython    = language === 'python';
  const localOnly   = isPython && isLocalOnlyPython(code);

  const handleRun = useCallback(async () => {
    if (isRunning || localOnly) return;
    setIsRunning(true);
    setHasRun(true);

    try {
      if (isPython) {
        setPyStatus('loading');
        setOutput('🐍 Python(Pyodide) 로딩 중... (최초 실행 시 20~30초 소요)');
        const result = await runPythonCode(code);
        setPyStatus('ready');
        setOutput(result.output);
      } else {
        const result = runJavaScript(code);
        setOutput(result);
      }
    } catch (e) {
      setPyStatus('error');
      setOutput(`❌ 실행 오류: ${e.message}`);
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning, isPython, localOnly]);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function handleReset() {
    setCode(originalCode.current);
    setOutput('');
    setHasRun(false);
  }

  const langExt = isPython ? [python()] : [javascript({ jsx: true })];

  return (
    <div className="rounded-xl border border-gray-800 overflow-hidden bg-gray-950 my-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold flex-shrink-0 ${
            isPython ? 'bg-blue-900 text-blue-300' : 'bg-yellow-900 text-yellow-300'
          }`}>
            {isPython ? '🐍 Python' : '⚡ JavaScript'}
          </span>
          {localOnly && (
            <span className="text-xs px-2 py-0.5 rounded bg-yellow-900/60 text-yellow-400 border border-yellow-700/50 flex-shrink-0">
              로컬 전용
            </span>
          )}
          <span className="text-sm text-gray-300 font-medium truncate">{title}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors rounded">
            {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
            {copied ? '복사됨' : '복사'}
          </button>
          <button onClick={handleReset}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors rounded">
            <RotateCcw size={13} /> 초기화
          </button>
          {!localOnly && (
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3 py-1 text-xs rounded font-medium transition-all bg-green-600 hover:bg-green-500 text-white disabled:opacity-50"
            >
              {isRunning
                ? <><Loader2 size={13} className="animate-spin" /> 실행 중...</>
                : <><Play size={13} /> 실행 (Run)</>}
            </button>
          )}
          {localOnly && (
            <a href="https://colab.research.google.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 text-xs rounded font-medium bg-orange-700 hover:bg-orange-600 text-white transition-colors">
              <ExternalLink size={13} /> Colab
            </a>
          )}
        </div>
      </div>

      {/* 설명 */}
      {description && (
        <div className="px-4 py-2 bg-gray-900/50 text-xs text-gray-400 border-b border-gray-800">
          {description}
        </div>
      )}

      {/* 코드 에디터 */}
      <CodeMirror
        value={code}
        onChange={setCode}
        theme={oneDark}
        extensions={langExt}
        readOnly={readOnly}
        minHeight="120px"
        maxHeight="400px"
        style={{ fontSize: '13px' }}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: !readOnly,
          foldGutter: true,
          autocompletion: true,
        }}
      />

      {/* 로컬 전용 안내 */}
      {localOnly && <LocalOnlyPanel code={code} onCopy={handleCopy} copied={copied} />}

      {/* JS / Pyodide 출력 패널 */}
      {!localOnly && hasRun && (
        <div className="border-t border-gray-800">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-xs text-gray-500">
            <Terminal size={12} />
            <span>출력 결과</span>
            {isPython && pyStatus === 'ready' && (
              <span className="ml-auto text-green-500">✅ Pyodide</span>
            )}
          </div>
          <pre className={`px-4 py-3 text-xs font-mono whitespace-pre-wrap leading-relaxed min-h-[60px] ${
            output.startsWith('❌') ? 'text-red-400' :
            output.startsWith('🐍') ? 'text-blue-300' : 'text-green-300'
          }`}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
