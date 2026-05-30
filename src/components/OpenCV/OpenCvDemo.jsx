import { useState, useRef, useEffect, useCallback } from 'react';
import { Loader2, Upload, Camera, RefreshCw, Info, Play } from 'lucide-react';

/* ── Web Worker 소스 (Blob URL 방식 — Vite가 번들하지 않음) ── */
const WORKER_SRC = `
importScripts('https://docs.opencv.org/4.10.0/opencv.js');

function waitCv(cb) {
  if (typeof cv !== 'undefined' && cv.Mat) { cb(); return; }
  if (typeof cv !== 'undefined') { cv.onRuntimeInitialized = cb; return; }
  setTimeout(() => waitCv(cb), 200);
}

waitCv(() => self.postMessage({ type: 'ready' }));

self.onmessage = function(e) {
  if (e.data.type !== 'process') return;
  const { pixels, width, height, filter } = e.data;
  try {
    const src = cv.matFromImageData(
      new ImageData(new Uint8ClampedArray(pixels), width, height)
    );
    let dst = new cv.Mat();

    switch (filter) {
      case 'original':
        dst = src.clone(); break;
      case 'gray': {
        const g = new cv.Mat();
        cv.cvtColor(src, g, cv.COLOR_RGBA2GRAY);
        cv.cvtColor(g, dst, cv.COLOR_GRAY2RGBA);
        g.delete(); break;
      }
      case 'blur':
        cv.GaussianBlur(src, dst, new cv.Size(21, 21), 0); break;
      case 'canny': {
        const g = new cv.Mat(), e2 = new cv.Mat();
        cv.cvtColor(src, g, cv.COLOR_RGBA2GRAY);
        cv.Canny(g, e2, 50, 150, 3, false);
        cv.cvtColor(e2, dst, cv.COLOR_GRAY2RGBA);
        g.delete(); e2.delete(); break;
      }
      case 'threshold': {
        const g = new cv.Mat(), t = new cv.Mat();
        cv.cvtColor(src, g, cv.COLOR_RGBA2GRAY);
        cv.threshold(g, t, 127, 255, cv.THRESH_BINARY);
        cv.cvtColor(t, dst, cv.COLOR_GRAY2RGBA);
        g.delete(); t.delete(); break;
      }
      case 'dilate': {
        const k = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(7, 7));
        cv.dilate(src, dst, k); k.delete(); break;
      }
      case 'contour': {
        const g = new cv.Mat(), b = new cv.Mat();
        const cs = new cv.MatVector(), h = new cv.Mat();
        cv.cvtColor(src, g, cv.COLOR_RGBA2GRAY);
        cv.threshold(g, b, 100, 255, cv.THRESH_BINARY);
        cv.findContours(b, cs, h, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
        dst = src.clone();
        for (let i = 0; i < cs.size(); i++) {
          cv.drawContours(dst, cs, i,
            new cv.Scalar(55+Math.random()*200|0, 55+Math.random()*200|0, 55+Math.random()*200|0, 255),
            2, cv.LINE_8, h, 0);
        }
        g.delete(); b.delete(); cs.delete(); h.delete(); break;
      }
    }

    /* 출력은 항상 RGBA 4채널로 통일 */
    let out = dst;
    if (dst.channels() === 1) {
      out = new cv.Mat();
      cv.cvtColor(dst, out, cv.COLOR_GRAY2RGBA);
      dst.delete();
    } else if (dst.channels() === 3) {
      out = new cv.Mat();
      cv.cvtColor(dst, out, cv.COLOR_RGB2RGBA);
      dst.delete();
    }

    const buf = new Uint8ClampedArray(out.data).buffer.slice(0);
    self.postMessage(
      { type: 'result', pixels: buf, width: out.cols, height: out.rows },
      [buf]
    );
    src.delete(); out.delete();
  } catch (err) {
    self.postMessage({ type: 'error', message: err.message });
  }
};
`;

/* ── 필터 메타데이터 ──────────────────────────────────────── */
const FILTERS = [
  { id: 'original',   label: '원본',          color: '#6b7280',
    desc: '처리하지 않은 원본 이미지입니다.',
    formula: 'output = input' },
  { id: 'gray',       label: '그레이스케일',   color: '#374151',
    desc: '컬러(RGB 3채널)를 명도 1채널로 변환합니다.',
    formula: 'Y = 0.299R + 0.587G + 0.114B' },
  { id: 'blur',       label: '가우시안 블러',  color: '#3b82f6',
    desc: '주변 픽셀의 가우시안 가중 평균으로 노이즈를 제거합니다.',
    formula: 'G(x,y) = (1/2πσ²) · e^(-(x²+y²)/2σ²)' },
  { id: 'canny',      label: 'Canny 엣지',    color: '#7c3aed',
    desc: 'Sobel 그래디언트 → NMS → 이중 임계값으로 경계선을 검출합니다.',
    formula: '∇I = √(Gx² + Gy²),  θ = arctan(Gy/Gx)' },
  { id: 'threshold',  label: '임계값 처리',    color: '#059669',
    desc: '픽셀 밝기 > 127 이면 255, 아니면 0으로 이진화합니다.',
    formula: 'dst = maxVal if src > thresh, else 0' },
  { id: 'dilate',     label: '팽창 (Dilate)', color: '#d97706',
    desc: '커널 범위 내 최대값으로 교체해 밝은 영역을 팽창시킵니다.',
    formula: 'dst(x,y) = max{ src(x+i,y+j) } for (i,j)∈kernel' },
  { id: 'contour',    label: '윤곽선 검출',    color: '#dc2626',
    desc: '이진화 후 객체 경계 윤곽선을 찾아 색으로 표시합니다.',
    formula: 'findContours → RETR_CCOMP + CHAIN_APPROX_SIMPLE' },
];

/* ── 샘플 이미지 생성 (외부 리소스 없이) ──────────────────── */
function drawSample(canvas) {
  const ctx = canvas.getContext('2d');
  const { width: w, height: h } = canvas;
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#1e3a5f'); bg.addColorStop(1, '#0d2137');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);

  [{ x:80,y:80,r:55,c:'#3b82f6' },{ x:220,y:70,r:45,c:'#7c3aed' },
   { x:310,y:130,r:60,c:'#059669' },{ x:140,y:160,r:40,c:'#d97706' },
   { x:260,y:190,r:35,c:'#dc2626' }].forEach(({ x,y,r,c }) => {
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle = c+'cc'; ctx.fill();
    ctx.strokeStyle='white'; ctx.lineWidth=2; ctx.stroke();
  });
  [[20,200,80,40],[190,210,100,35],[320,60,60,60]].forEach(([x,y,w2,h2]) => {
    ctx.strokeStyle='#60a5fa'; ctx.lineWidth=2.5;
    ctx.strokeRect(x,y,w2,h2);
    ctx.fillStyle='#60a5fa22'; ctx.fillRect(x,y,w2,h2);
  });
  ctx.beginPath(); ctx.moveTo(30,250); ctx.lineTo(370,120);
  ctx.strokeStyle='#fbbf24'; ctx.lineWidth=2; ctx.stroke();
  ctx.font='bold 13px sans-serif'; ctx.fillStyle='rgba(255,255,255,0.6)';
  ctx.fillText('OpenCV 샘플 이미지', 10, h - 10);
}

/* ── 메인 컴포넌트 ─────────────────────────────────────────── */
export default function OpenCvDemo() {
  const [status, setStatus] = useState('idle'); // idle|loading|ready|error
  const [filter, setFilter] = useState('original');
  const [processing, setProcessing] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [camActive, setCamActive] = useState(false);
  const [camError, setCamError] = useState('');

  const inputRef  = useRef(null);
  const outputRef = useRef(null);
  const fileRef   = useRef(null);
  const videoRef  = useRef(null);
  const workerRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef    = useRef(null);
  const busyRef   = useRef(false); // 워커 처리 중 플래그

  /* 워커 생성 */
  function startWorker() {
    if (workerRef.current) return;
    setStatus('loading');
    const blob = new Blob([WORKER_SRC], { type: 'application/javascript' });
    const url  = URL.createObjectURL(blob);
    const w    = new Worker(url);
    URL.revokeObjectURL(url);

    w.onmessage = (e) => {
      if (e.data.type === 'ready') {
        setStatus('ready');
        busyRef.current = false;
      } else if (e.data.type === 'result') {
        const { pixels, width, height } = e.data;
        const out = outputRef.current;
        out.width = width; out.height = height;
        out.getContext('2d').putImageData(
          new ImageData(new Uint8ClampedArray(pixels), width, height), 0, 0
        );
        setProcessing(false);
        busyRef.current = false;
      } else if (e.data.type === 'error') {
        console.error('OpenCV Worker:', e.data.message);
        setProcessing(false);
        busyRef.current = false;
      }
    };
    w.onerror = () => setStatus('error');
    workerRef.current = w;
  }

  useEffect(() => {
    const c = inputRef.current;
    if (c) { drawSample(c); setImgLoaded(true); }
    return () => {
      workerRef.current?.terminate();
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  /* 필터 적용 — 워커에 픽셀 데이터 전송 */
  const applyFilter = useCallback((filterId, src) => {
    const worker = workerRef.current;
    const canvas = src || inputRef.current;
    if (!worker || status !== 'ready' || !imgLoaded || busyRef.current) return;

    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const buf = imageData.data.buffer.slice(0);

    busyRef.current = true;
    setProcessing(true);
    worker.postMessage(
      { type: 'process', pixels: buf, width: canvas.width, height: canvas.height, filter: filterId },
      [buf]
    );
  }, [status, imgLoaded]);

  useEffect(() => {
    if (status === 'ready') applyFilter(filter);
  }, [filter, status]);

  /* 파일 업로드 */
  function handleUpload(e) {
    const file = e.target.files?.[0]; if (!file) return;
    const img = new Image();
    img.onload = () => {
      const c = inputRef.current;
      c.width  = Math.min(img.width, 400);
      c.height = Math.round(img.height * c.width / img.width);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      setImgLoaded(true);
      if (status === 'ready') applyFilter(filter, c);
    };
    img.src = URL.createObjectURL(file);
  }

  /* 웹캠 */
  async function toggleCam() {
    if (camActive) {
      streamRef.current?.getTracks().forEach(t => t.stop());
      cancelAnimationFrame(rafRef.current);
      setCamActive(false); setCamError('');
      drawSample(inputRef.current); setImgLoaded(true);
      return;
    }
    setCamError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width:400, height:280 } });
      streamRef.current = stream;
      const v = videoRef.current;
      v.srcObject = stream; await v.play();
      setCamActive(true);

      const frame = () => {
        const c = inputRef.current;
        c.width = v.videoWidth || 400; c.height = v.videoHeight || 280;
        c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
        if (!busyRef.current && status === 'ready') applyFilter(filter, c);
        rafRef.current = requestAnimationFrame(frame);
      };
      frame();
    } catch (err) { setCamError('카메라 접근 실패: ' + err.message); }
  }

  const af = FILTERS.find(f => f.id === filter);

  return (
    <div className="space-y-4">

      {/* OpenCV 로드 버튼 (최초 1회) */}
      {status === 'idle' && (
        <div className="flex flex-col items-center gap-3 bg-gray-900 rounded-xl py-8">
          <div className="text-4xl">👁️</div>
          <p className="text-gray-300 text-sm text-center max-w-xs">
            OpenCV.js는 약 8MB WebAssembly 파일입니다.<br/>
            <strong>Web Worker</strong>에서 로드하므로 UI는 계속 사용 가능합니다.
          </p>
          <button
            onClick={startWorker}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-sm transition-colors"
          >
            <Play size={16} /> OpenCV.js 로드 시작
          </button>
          <p className="text-gray-500 text-xs">최초 로드 시 10~30초 소요</p>
        </div>
      )}

      {/* 로딩 중 */}
      {status === 'loading' && (
        <div className="flex flex-col items-center gap-3 bg-gray-900 rounded-xl py-6">
          <Loader2 size={32} className="text-green-400 animate-spin" />
          <p className="text-gray-300 text-sm">OpenCV.js 로딩 중...</p>
          <p className="text-gray-500 text-xs">Web Worker에서 실행 중 — 이 페이지는 계속 사용 가능합니다</p>
          <div className="w-48 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}

      {/* 에러 */}
      {status === 'error' && (
        <div className="bg-red-950 border border-red-700 rounded-xl px-4 py-3 text-sm text-red-300 flex items-center gap-3">
          <span>❌ OpenCV.js 로드 실패.</span>
          <button onClick={() => { workerRef.current?.terminate(); workerRef.current = null; setStatus('idle'); }}
            className="underline">다시 시도</button>
        </div>
      )}

      {/* 메인 UI — 로드 완료 후 표시 */}
      {(status === 'ready' || status === 'loading') && (
        <>
          {/* 필터 선택 */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all"
                style={{
                  borderColor: filter === f.id ? f.color : '#e5e7eb',
                  backgroundColor: filter === f.id ? f.color + '18' : 'white',
                  color: filter === f.id ? f.color : '#6b7280',
                }}>
                {f.label}
              </button>
            ))}
          </div>

          {/* 캔버스 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> 입력 이미지
              </div>
              <div className="relative">
                <canvas ref={inputRef} width={400} height={280}
                  className="w-full rounded-xl border border-gray-200 bg-gray-100" />
                {camActive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">🔴 LIVE</div>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => fileRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  <Upload size={13} /> 이미지 업로드
                </button>
                <button onClick={toggleCam}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs rounded-lg border transition-colors ${camActive ? 'bg-red-50 border-red-300 text-red-600' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                  <Camera size={13} /> {camActive ? '카메라 종료' : '웹캠'}
                </button>
                <button onClick={() => { drawSample(inputRef.current); setImgLoaded(true); applyFilter(filter); }}
                  className="px-3 py-2 text-xs bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  <RefreshCw size={13} />
                </button>
              </div>
              {camError && <div className="text-xs text-red-500">{camError}</div>}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              <video ref={videoRef} className="hidden" playsInline muted />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: af.color }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: af.color }} />
                {af.label} 결과
                {processing && <Loader2 size={12} className="animate-spin ml-1" />}
              </div>
              <canvas ref={outputRef} width={400} height={280}
                className="w-full rounded-xl border-2 bg-gray-900"
                style={{ borderColor: af.color + '60' }} />
              <div className="text-xs text-right" style={{ color: af.color }}>
                {status === 'ready' ? '✅ OpenCV.js (Web Worker)' : '⏳ 로드 중...'}
              </div>
            </div>
          </div>

          {/* 필터 설명 */}
          <div className="rounded-xl border-2 p-4 transition-all"
            style={{ borderColor: af.color + '60', backgroundColor: af.color + '08' }}>
            <div className="flex items-start gap-3">
              <Info size={16} className="flex-shrink-0 mt-0.5" style={{ color: af.color }} />
              <div className="space-y-2 flex-1">
                <div className="font-bold text-sm" style={{ color: af.color }}>{af.label} 원리</div>
                <p className="text-sm text-gray-600 leading-relaxed">{af.desc}</p>
                <div className="bg-gray-900 rounded-lg px-3 py-2 font-mono text-xs text-green-300">
                  {af.formula}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* idle 상태에서도 샘플 캔버스는 보여줌 */}
      {status === 'idle' && (
        <canvas ref={inputRef} width={400} height={280}
          className="hidden" />
      )}
    </div>
  );
}
