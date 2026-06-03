import { useState, useMemo } from 'react';

/* ── 공통 ── */
function Code({ children }) {
  return (
    <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
      {children}
    </pre>
  );
}
function Tag({ color = 'blue', children }) {
  const c = { blue:'bg-blue-100 text-blue-800', red:'bg-red-100 text-red-800', green:'bg-green-100 text-green-800', orange:'bg-orange-100 text-orange-800', purple:'bg-purple-100 text-purple-800', gray:'bg-gray-100 text-gray-700' };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${c[color]}`}>{children}</span>;
}

/* ══════════════════════════════════════════════
   TAB 1: LUT 룩업 테이블 (02.image_access)
══════════════════════════════════════════════ */
function LutTab() {
  const [inputVal, setInputVal] = useState(180);
  const [method, setMethod] = useState('lut');

  /* 반전 LUT: out = 255 - in */
  const lut = Array.from({ length: 256 }, (_, i) => 255 - i);
  const output = lut[inputVal];

  const methods = [
    { id: 'direct', label: '① 직접 접근', color: 'red',    speed: '느림', desc: 'image[i,j]로 읽고 255-v로 써서\n모든 픽셀을 개별 접근 → 루프 오버헤드 큼' },
    { id: 'item',   label: '② item()',    color: 'orange', speed: '느림', desc: 'image.item(i,j) 방식\n직접 접근보다 살짝 빠르지만 여전히 느림' },
    { id: 'lut',    label: '③ LUT',       color: 'green',  speed: '매우 빠름', desc: '변환표를 미리 만들고 인덱싱만!\nlut[image] → 전체 영상 한번에 변환' },
    { id: 'opencv', label: '④ cv2.subtract', color: 'blue', speed: '빠름', desc: 'cv2 포화 연산 사용\nC++로 최적화된 연산' },
    { id: 'numpy',  label: '⑤ 255-image', color: 'purple', speed: '매우 빠름', desc: 'NumPy 벡터 연산\n전체 배열 브로드캐스팅' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-green-50 border border-green-200 rounded-lg p-2">
        💡 <strong>핵심:</strong> LUT는 픽셀값(0~255)을 인덱스로 변환표를 조회 — 루프 없이 전체 영상 한 번에 처리
      </div>

      {/* LUT 동작 원리 시각화 */}
      <div className="border border-green-200 rounded-xl overflow-hidden">
        <div className="bg-green-600 text-white px-4 py-2 text-xs font-bold">LUT 동작 원리 (반전 변환: out = 255 - in)</div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600 w-16">입력 픽셀</span>
            <input type="range" min={0} max={255} value={inputVal}
              onChange={e => setInputVal(Number(e.target.value))} className="flex-1 accent-green-500" />
            <span className="font-bold text-blue-700 font-mono w-8">{inputVal}</span>
          </div>

          {/* LUT 테이블 일부 + 인덱싱 */}
          <div className="flex items-start gap-4 flex-wrap">
            <div className="space-y-1">
              <div className="text-xs font-bold text-gray-600 mb-1">LUT[0~255] (반전 테이블)</div>
              <div className="flex gap-0.5 flex-wrap max-w-xs">
                {Array.from({ length: 16 }, (_, i) => {
                  const idx = Math.round(i * 255 / 15);
                  const isTarget = Math.abs(idx - inputVal) < 10;
                  return (
                    <div key={i} className={`text-center rounded transition-all ${isTarget ? 'ring-2 ring-yellow-400 scale-110' : ''}`}
                      style={{ width: 28 }}>
                      <div className="text-xs text-gray-400 font-mono leading-tight">{idx}</div>
                      <div className="h-5 rounded text-xs flex items-center justify-center font-bold"
                        style={{ backgroundColor: `rgb(${lut[idx]},${lut[idx]},${lut[idx]})`, color: lut[idx] > 128 ? '#111' : '#eee' }}>
                        {lut[idx]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 화살표 + 결과 */}
            <div className="flex flex-col items-center justify-center gap-2 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: `rgb(${inputVal},${inputVal},${inputVal})`, color: inputVal > 128 ? '#111' : '#eee' }}>
                  {inputVal}
                </div>
                <div className="text-gray-400 font-mono text-sm">→ lut[{inputVal}] →</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: `rgb(${output},${output},${output})`, color: output > 128 ? '#111' : '#eee' }}>
                  {output}
                </div>
              </div>
              <div className="text-xs text-gray-500">255 - {inputVal} = {output}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5가지 방법 비교 */}
      <div className="text-xs font-bold text-gray-700">5가지 화소 접근 방법 비교 (640×480 기준)</div>
      <div className="space-y-2">
        {methods.map(m => {
          const speedW = { '느림': '15%', '빠름': '70%', '매우 빠름': '95%' };
          const speedC = { '느림': 'bg-red-400', '빠름': 'bg-blue-400', '매우 빠름': 'bg-green-500' };
          return (
            <div key={m.id} onClick={() => setMethod(m.id)}
              className={`rounded-xl border p-3 cursor-pointer transition-all ${method === m.id ? 'border-blue-400 bg-blue-50 shadow' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
              <div className="flex items-center justify-between mb-1">
                <Tag color={m.color}>{m.label}</Tag>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${speedC[m.speed]}`} style={{ width: speedW[m.speed] }} />
                  </div>
                  <span className="text-xs text-gray-600">{m.speed}</span>
                </div>
              </div>
              {method === m.id && <div className="text-xs text-gray-600 whitespace-pre-line mt-1">{m.desc}</div>}
            </div>
          );
        })}
      </div>

      <Code>{`# ③ LUT - 가장 빠른 방법
lut = [255 - i for i in range(256)]    # 변환표 생성 (256개)
lut = np.array(lut, np.uint8)
image3 = lut[image]                    # 인덱싱으로 전체 변환

# cv2.LUT() 함수 버전
lut_table = np.array([255-i for i in range(256)], np.uint8)
dst = cv2.LUT(image, lut_table)`}
      </Code>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB 2: 대비 조절 scaleAdd (06.contrast)
══════════════════════════════════════════════ */
function ContrastTab() {
  const [avg, setAvg] = useState(128);
  const [alpha, setAlpha] = useState(1.5);

  /* scaleAdd: dst = image*scale + noimage (noimage=0) → image*scale + offset */
  const samples = [60, 100, 128, 160, 200, 230];

  const results = samples.map(v => {
    const dec1 = Math.min(255, Math.max(0, Math.round(v * 0.5 + avg / 2)));   // addWeighted 대비 감소
    const inc1 = Math.min(255, Math.max(0, Math.round(v * 2.0 - avg)));        // addWeighted 대비 증가
    const raw  = Math.min(255, Math.max(0, Math.round(v * alpha)));
    return { orig: v, dec: dec1, inc: inc1, custom: raw };
  });

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-orange-50 border border-orange-200 rounded-lg p-2">
        💡 <strong>대비(Contrast)</strong> = 픽셀값 분포의 폭. 평균을 기준으로 차이를 늘리면 대비 증가
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between text-xs mb-1"><span>영상 평균 (avg)</span><span className="font-bold text-blue-600">{avg}</span></div>
          <input type="range" min={50} max={200} value={avg} onChange={e => setAvg(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1"><span>scale (alpha)</span><span className="font-bold text-purple-600">{alpha.toFixed(1)}</span></div>
          <input type="range" min={0.2} max={3.0} step={0.1} value={alpha} onChange={e => setAlpha(Number(e.target.value))} className="w-full accent-purple-500" />
        </div>
      </div>

      {/* 수식 박스 */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        {[
          { label: '대비 감소', formula: `dst = image × 0.5 + ${avg/2|0}`, color: 'blue', key: 'dec' },
          { label: '대비 증가', formula: `dst = image × 2.0 − ${avg}`, color: 'orange', key: 'inc' },
        ].map(({ label, formula, color, key }) => (
          <div key={key} className={`border rounded-xl p-3 ${color === 'blue' ? 'border-blue-200 bg-blue-50' : 'border-orange-200 bg-orange-50'}`}>
            <div className={`font-bold mb-1 ${color === 'blue' ? 'text-blue-800' : 'text-orange-800'}`}>{label}</div>
            <div className="font-mono text-gray-700">{formula}</div>
          </div>
        ))}
      </div>

      {/* 픽셀값 변환 비교 막대 */}
      <div className="space-y-1">
        <div className="grid grid-cols-4 gap-1 text-xs text-gray-500 font-bold mb-1">
          <div>원본</div><div className="text-blue-600">대비 감소</div>
          <div className="text-orange-600">대비 증가</div><div className="text-purple-600">scale×{alpha.toFixed(1)}</div>
        </div>
        {results.map(({ orig, dec, inc, custom }) => (
          <div key={orig} className="grid grid-cols-4 gap-1">
            {[{ v: orig, c: '#6b7280' }, { v: dec, c: '#3b82f6' }, { v: inc, c: '#f97316' }, { v: custom, c: '#9333ea' }].map(({ v, c }, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
                  <div className="h-full rounded" style={{ width: `${(v / 255) * 100}%`, backgroundColor: c, opacity: 0.7 }} />
                </div>
                <span className="text-xs font-mono w-8 flex-shrink-0">{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Code>{`avg = cv2.mean(image)[0] / 2.0      # 평균의 절반
noimage = np.zeros_like(image)

# 대비 감소: image×0.5 + avg/2 → 평균 쪽으로 수렴
dst3 = cv2.addWeighted(image, 0.5, noimage, 0, avg)

# 대비 증가: image×2.0 - avg → 평균에서 더 멀어짐
dst4 = cv2.addWeighted(image, 2.0, noimage, 0, -avg)

# scaleAdd 방법: dst = src*scale + noimage
dst1 = cv2.scaleAdd(image, 0.2, noimage) + 20  # 대비 감소`}
      </Code>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB 3: 히스토그램 + 스트레칭 (07~11)
══════════════════════════════════════════════ */
function HistogramTab() {
  const [mode, setMode] = useState('concept');
  const [lowCut, setLowCut] = useState(50);
  const [highCut, setHighCut] = useState(200);

  /* 가상 픽셀 분포 (어두운 영상: 50~200 범위) */
  const pixelDist = useMemo(() => {
    const hist = new Array(256).fill(0);
    let seed = (lowCut * 73856093 ^ highCut * 19349663) | 0;
    for (let i = 0; i < 500; i++) {
      seed = (seed * 1664525 + 1013904223) | 0;
      const t = (seed >>> 0) / 4294967296;
      const v = Math.round(lowCut + t * (highCut - lowCut));
      if (v >= 0 && v < 256) hist[v]++;
    }
    return hist;
  }, [lowCut, highCut]);
  const ratio = 255 / ((highCut - lowCut) || 1);

  /* 32개 구간으로 축약 */
  const bins = Array.from({ length: 32 }, (_, i) => {
    const start = i * 8;
    return pixelDist.slice(start, start + 8).reduce((a, b) => a + b, 0);
  });
  const maxBin = Math.max(...bins);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[['concept','히스토그램 개념'], ['stretch','스트레칭 (11)']].map(([id, lb]) => (
          <button key={id} onClick={() => setMode(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${mode === id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
            {lb}
          </button>
        ))}
      </div>

      {mode === 'concept' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">히스토그램 = 각 밝기값(0~255)에 픽셀이 몇 개인지의 분포도</div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-xs mb-1"><span>최솟값 (low)</span><span className="font-bold text-blue-600">{lowCut}</span></div>
              <input type="range" min={0} max={highCut - 10} value={lowCut} onChange={e => setLowCut(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>최댓값 (high)</span><span className="font-bold text-orange-600">{highCut}</span></div>
              <input type="range" min={lowCut + 10} max={255} value={highCut} onChange={e => setHighCut(Number(e.target.value))} className="w-full accent-orange-500" />
            </div>
          </div>

          {/* 히스토그램 막대 */}
          <div>
            <div className="text-xs font-bold text-gray-600 mb-1">히스토그램 (32 구간)</div>
            <div className="relative bg-gray-900 rounded-xl p-3 h-32">
              <div className="flex items-end gap-0.5 h-full">
                {bins.map((v, i) => {
                  const center = i * 8 + 4;
                  const inRange = center >= lowCut && center <= highCut;
                  return (
                    <div key={i} className="flex-1 rounded-t transition-all"
                      style={{
                        height: `${maxBin > 0 ? (v / maxBin) * 100 : 0}%`,
                        backgroundColor: inRange ? '#60a5fa' : '#374151',
                        minWidth: 2,
                      }} />
                  );
                })}
              </div>
              {/* 범위 표시선 */}
              <div className="absolute top-0 bottom-0 w-px bg-blue-400 opacity-70"
                style={{ left: `${(lowCut / 255) * 100}%` }} />
              <div className="absolute top-0 bottom-0 w-px bg-orange-400 opacity-70"
                style={{ left: `${(highCut / 255) * 100}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-0.5">
              <span>0</span>
              <span className="text-blue-500">{lowCut}</span>
              <span className="text-orange-500">{highCut}</span>
              <span>255</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            {[
              { label: '분포 범위', val: `${highCut - lowCut}`, color: 'blue', unit: '단계 폭' },
              { label: '어두운 영상', val: '왼쪽 치우침', color: 'gray', unit: '' },
              { label: '밝은 영상', val: '오른쪽 치우침', color: 'orange', unit: '' },
            ].map(({ label, val, color, unit }) => (
              <div key={label} className={`rounded-xl border p-2 ${color === 'blue' ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="text-gray-500">{label}</div>
                <div className={`font-bold ${color === 'blue' ? 'text-blue-700' : 'text-gray-700'}`}>{val}</div>
                {unit && <div className="text-gray-400">{unit}</div>}
              </div>
            ))}
          </div>

          <Code>{`hist = cv2.calcHist(
    [image],  # 영상 리스트
    [0],      # 채널 인덱스 (0=B, 1=G, 2=R)
    None,     # 마스크 (None=전체)
    [256],    # 구간(bin) 수
    [0, 256]  # 값 범위
)
# hist.shape = (256, 1)
# hist[v] = 밝기값 v인 픽셀 수`}
          </Code>
        </div>
      )}

      {mode === 'stretch' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">스트레칭 = 실제 사용 범위를 0~255로 늘려 대비 향상 + LUT로 빠르게 적용</div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-xs mb-1"><span>원본 low</span><span className="font-bold text-blue-600">{lowCut}</span></div>
              <input type="range" min={0} max={highCut - 10} value={lowCut} onChange={e => setLowCut(Number(e.target.value))} className="w-full accent-blue-500" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>원본 high</span><span className="font-bold text-orange-600">{highCut}</span></div>
              <input type="range" min={lowCut + 10} max={255} value={highCut} onChange={e => setHighCut(Number(e.target.value))} className="w-full accent-orange-500" />
            </div>
          </div>

          {/* LUT 시각화: 원본→변환 곡선 */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-48">
              <div className="text-xs font-bold text-gray-600 mb-1">스트레칭 LUT (변환 곡선)</div>
              <div className="relative bg-gray-900 rounded-xl overflow-hidden" style={{ height: 120 }}>
                <svg width="100%" height="100%" viewBox="0 0 255 120" preserveAspectRatio="none">
                  {/* 격자 */}
                  {[0, 64, 128, 192, 255].map(x => <line key={x} x1={x} y1={0} x2={x} y2={120} stroke="#374151" strokeWidth="0.5" />)}
                  {/* 이상적 직선 (y=x) */}
                  <line x1={0} y1={120} x2={255} y2={0} stroke="#374151" strokeWidth="1" strokeDasharray="4,4" />
                  {/* 스트레칭 LUT 곡선 */}
                  <polyline
                    points={[
                      `0,120`,
                      `${lowCut},120`,
                      `${highCut},0`,
                      `255,0`,
                    ].join(' ')}
                    fill="none" stroke="#60a5fa" strokeWidth="2" />
                  {/* low/high 점 */}
                  <circle cx={lowCut} cy={120} r={4} fill="#3b82f6" />
                  <circle cx={highCut} cy={0} r={4} fill="#f97316" />
                </svg>
                <div className="absolute bottom-1 left-1 text-xs text-gray-400">0</div>
                <div className="absolute bottom-1 right-1 text-xs text-gray-400">255</div>
                <div className="absolute top-1 left-1 text-xs text-gray-400">255</div>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">
                입력 {lowCut}~{highCut} → 출력 0~255
              </div>
            </div>

            {/* 수식 */}
            <div className="flex-1 min-w-48 space-y-2">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs space-y-1">
                <div className="font-bold text-blue-800">스트레칭 공식</div>
                <div className="font-mono text-blue-900">
                  ratio = 255 / ({highCut} - {lowCut}) = <strong>{ratio.toFixed(2)}</strong>
                </div>
                <div className="font-mono text-blue-900">idx[v] = (v - {lowCut}) × {ratio.toFixed(2)}</div>
                <div className="text-blue-700 mt-1">v &lt; {lowCut} → 0<br />v &gt; {highCut} → 255</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs">
                <div className="font-bold text-green-800 mb-1">LUT 적용 (11.py 핵심)</div>
                <div className="text-green-700">256개짜리 변환표를 미리 계산 후<br /><Tag color="green">cv2.LUT(image, idx)</Tag><br />로 전체 영상 한번에 변환</div>
              </div>
            </div>
          </div>

          <Code>{`bsize, ranges = [64], [0, 256]
hist = cv2.calcHist([image], [0], None, bsize, ranges)
bin_width = ranges[1] / bsize[0]      # = 4.0

# 실제 사용 범위 탐색
high = search_value_idx(hist, bsize[0]-1) * bin_width  # = ${highCut}
low  = search_value_idx(hist, 0) * bin_width           # = ${lowCut}

# LUT 생성
idx = np.arange(0, 256)
idx = (idx - low) * 255 / (high - low)
idx[:int(low)] = 0
idx[int(high+1):] = 255

dst = cv2.LUT(image, idx.astype('uint8'))  # 빠른 적용`}
          </Code>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB 4: 히스토그램 평활화 (12.histogram_equalize)
══════════════════════════════════════════════ */
function EqualizeTab() {
  const [step, setStep] = useState(0);

  /* 가상 히스토그램 (좁은 분포) */
  const hist = useMemo(() => {
    const h = new Array(256).fill(0);
    let seed = 42;
    for (let i = 0; i < 1000; i++) {
      seed = (seed * 1664525 + 1013904223) | 0;
      const t = (seed >>> 0) / 4294967296;
      const v = Math.round(60 + t * 80);
      if (v < 256) h[v]++;
    }
    return h;
  }, []);

  const total = hist.reduce((a, b) => a + b, 0);

  /* 누적합(CDF) */
  const cdf = hist.reduce((acc, v, i) => {
    acc.push((acc[i - 1] || 0) + v);
    return acc;
  }, []);

  /* 정규화된 CDF → LUT */
  const lut = cdf.map(c => Math.round((c / total) * 255));

  const steps = [
    {
      title: '① 원본 히스토그램',
      desc: '픽셀 분포가 60~140 범위에 집중 → 대비 낮음',
      visual: 'hist_orig',
    },
    {
      title: '② 누적합(CDF) 계산',
      desc: 'Cumulative Distribution Function\naccum[i] = accum[i-1] + hist[i]',
      visual: 'cdf',
    },
    {
      title: '③ CDF 정규화 → LUT',
      desc: 'lut[v] = CDF[v] / total × 255\n각 픽셀값을 새 값으로 재매핑하는 변환표',
      visual: 'lut',
    },
    {
      title: '④ 평활화 결과',
      desc: '픽셀값이 0~255 전체에 고르게 분포\n→ 대비 크게 향상',
      visual: 'hist_out',
    },
  ];

  /* 32 구간 히스트 */
  const bins32 = Array.from({ length: 32 }, (_, i) =>
    hist.slice(i * 8, i * 8 + 8).reduce((a, b) => a + b, 0)
  );
  const maxBin = Math.max(...bins32);
  const lut32 = Array.from({ length: 32 }, (_, i) => lut[i * 8 + 4]);

  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-500 bg-purple-50 border border-purple-200 rounded-lg p-2">
        💡 <strong>평활화 원리:</strong> 히스토그램의 누적분포(CDF)를 LUT로 사용 → 픽셀 분포가 균등해짐
      </div>

      {/* 스텝 선택 */}
      <div className="flex gap-2 flex-wrap">
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${step === i ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-300'}`}>
            {s.title}
          </button>
        ))}
      </div>

      {/* 설명 */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
        <div className="text-xs font-bold text-purple-800">{steps[step].title}</div>
        <div className="text-xs text-purple-700 whitespace-pre-line mt-1">{steps[step].desc}</div>
      </div>

      {/* 시각화 */}
      <div className="bg-gray-900 rounded-xl p-3">
        <div className="flex items-end gap-0.5 h-24">
          {bins32.map((v, i) => {
            let barH, barColor;
            if (step === 0) { barH = maxBin > 0 ? (v / maxBin) * 100 : 0; barColor = '#60a5fa'; }
            else if (step === 1) { barH = (lut32[i] / 255) * 100; barColor = '#a78bfa'; } // CDF 누적
            else if (step === 2) { barH = (lut32[i] / 255) * 100; barColor = '#34d399'; }
            else { barH = 35 + (i * 7 + 13) % 45; barColor = '#f59e0b'; } // 평활화 후 고른 분포
            return (
              <div key={i} className="flex-1 rounded-t transition-all duration-500"
                style={{ height: `${barH}%`, backgroundColor: barColor, minWidth: 2 }} />
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span><span>128</span><span>255</span>
        </div>
      </div>

      <Code>{`hist = cv2.calcHist([image], [0], None, [256], [0,256])

# ① 누적합(CDF) 계산
accum = np.zeros(hist.shape, np.float32)
accum[0] = hist[0]
for i in range(1, 256):
    accum[i] = accum[i-1] + hist[i]   # 누적 더하기

# ② 정규화 → LUT (0~255 범위로)
accum = (accum / sum(hist)) * 255

# ③ 픽셀값 재매핑
dst = [[accum[val] for val in row] for row in image]
dst = np.array(dst, np.uint8)

# OpenCV 한 줄 버전
dst2 = cv2.equalizeHist(image)  # ← 위 과정 전부 자동`}
      </Code>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB 5: CMY / CMYK 변환 (13~14)
══════════════════════════════════════════════ */
function CmykTab() {
  const [r, setR] = useState(200);
  const [g, setG] = useState(100);
  const [b, setB] = useState(50);

  const C = 255 - r;
  const M = 255 - g;
  const Y = 255 - b;
  const K = Math.min(C, M, Y);
  const Ck = C - K;
  const Mk = M - K;
  const Yk = Y - K;

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500">CMY는 BGR의 보색(반전). CMYK는 CMY에서 공통 검정(K) 추출</div>

      {/* BGR 슬라이더 */}
      <div className="space-y-2">
        {[{ l: 'B (파랑)', v: b, set: setB, c: '#3b82f6' }, { l: 'G (초록)', v: g, set: setG, c: '#22c55e' }, { l: 'R (빨강)', v: r, set: setR, c: '#ef4444' }].map(item => (
          <div key={item.l} className="flex items-center gap-3">
            <span className="text-xs text-gray-600 w-16">{item.l}</span>
            <input type="range" min={0} max={255} value={item.v}
              onChange={e => item.set(Number(e.target.value))} className="flex-1" style={{ accentColor: item.c }} />
            <span className="text-xs font-mono w-8">{item.v}</span>
            <div className="w-6 h-6 rounded border" style={{ backgroundColor: `rgb(${item.v},${item.v},${item.v})` }} />
          </div>
        ))}
      </div>

      {/* 색상 미리보기 */}
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16 rounded-xl border-2 border-gray-300" style={{ backgroundColor: `rgb(${r},${g},${b})` }} />
          <div className="text-xs text-gray-600 font-bold">BGR 원본</div>
          <div className="text-xs font-mono text-gray-500">({b},{g},{r})</div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16 rounded-xl border-2 border-gray-300" style={{ backgroundColor: `rgb(${C},${M},${Y})` }} />
          <div className="text-xs text-gray-600 font-bold">CMY</div>
          <div className="text-xs font-mono text-gray-500">({C},{M},{Y})</div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          {[
            { label: 'C (Cyan)', v: Ck, bg: `rgb(0,${Ck},${Ck})` },
            { label: 'M (Magenta)', v: Mk, bg: `rgb(${Mk},0,${Mk})` },
            { label: 'Y (Yellow)', v: Yk, bg: `rgb(${Yk},${Yk},0)` },
            { label: 'K (Key/Black)', v: K, bg: `rgb(${255-K},${255-K},${255-K})` },
          ].map(({ label, v, bg }) => (
            <div key={label} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1">
              <div className="w-5 h-5 rounded border" style={{ backgroundColor: bg }} />
              <div><div className="text-xs font-bold text-gray-700">{label}</div><div className="text-xs font-mono text-gray-500">{v}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* 변환 공식 */}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3 text-xs space-y-1">
          <div className="font-bold text-cyan-800">BGR → CMY (13.py)</div>
          <div className="font-mono text-cyan-900">CMY = [255,255,255] - BGR</div>
          <div className="font-mono text-gray-600">C = 255 - R = 255 - {r} = {C}</div>
          <div className="font-mono text-gray-600">M = 255 - G = 255 - {g} = {M}</div>
          <div className="font-mono text-gray-600">Y = 255 - B = 255 - {b} = {Y}</div>
        </div>
        <div className="bg-gray-50 border border-gray-300 rounded-xl p-3 text-xs space-y-1">
          <div className="font-bold text-gray-800">CMY → CMYK (14.py)</div>
          <div className="font-mono text-gray-700">K = min(C, M, Y) = min({C},{M},{Y}) = {K}</div>
          <div className="font-mono text-gray-700">C' = C - K = {C} - {K} = {Ck}</div>
          <div className="font-mono text-gray-700">M' = M - K = {M} - {K} = {Mk}</div>
          <div className="font-mono text-gray-700">Y' = Y - K = {Y} - {K} = {Yk}</div>
          <div className="text-gray-500 mt-1">K = 공통 검정 성분 분리</div>
        </div>
      </div>

      <Code>{`white = np.array([255, 255, 255], np.uint8)

# BGR → CMY: 보색(반전)
CMY_img = white - BGR_img

# CMY → CMYK: 공통 검정(K) 분리
CMY = cv2.split(CMY_img)
K = cv2.min(CMY[0], cv2.min(CMY[1], CMY[2]))  # 최솟값
Yellow, Magenta, Cyan = CMY - K               # K 제거`}
      </Code>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB 6: 컬러 공간 비교 HSV/YUV/Lab (15~16)
══════════════════════════════════════════════ */
function ColorSpaceTab() {
  const [space, setSpace] = useState('hsv');

  const spaces = {
    hsv: {
      name: 'HSV (HSI)',
      file: '15.convert_hsv.py',
      channels: [
        { ch: 'H (Hue / 색상)', range: '0~179', color: 'bg-gradient-to-r from-red-400 via-green-400 via-blue-400 to-red-400', desc: '색의 종류(빨강=0, 초록=60, 파랑=120)\nOpenCV에서는 0~360을 반으로 압축 → 0~179' },
        { ch: 'S (Saturation / 채도)', range: '0~255', color: 'bg-gradient-to-r from-gray-200 to-red-500', desc: '색의 선명함. 0=무채색(회색), 255=순수 색상\n색상 검출 시 S>100 이상으로 필터링' },
        { ch: 'V (Value / 명도)', range: '0~255', color: 'bg-gradient-to-r from-black to-white', desc: '밝고 어두운 정도\n0=완전한 검정, 255=가장 밝음' },
      ],
      code: `hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
H, S, V = cv2.split(hsv)

# 색상 검출: 초록색 (H≈60/2=30)
lower = np.array([30, 100, 100])
upper = np.array([90, 255, 255])
mask = cv2.inRange(hsv, lower, upper)`,
      why: '색상 기반 검출에 최적 (HSV에서 H 채널만 보면 됨)',
    },
    yuv: {
      name: 'YCrCb / YUV',
      file: '16.convert_others.py',
      channels: [
        { ch: 'Y (Luma / 밝기)', range: '0~255', color: 'bg-gradient-to-r from-black to-white', desc: '밝기 정보. 인간 눈이 가장 민감한 성분\nJPEG에서 Y에 더 많은 비트 할당' },
        { ch: 'Cr / U (색차 Red)', range: '0~255', color: 'bg-gradient-to-r from-blue-300 to-red-500', desc: 'R 성분과 Y의 차이\n피부색 검출 등에 활용' },
        { ch: 'Cb / V (색차 Blue)', range: '0~255', color: 'bg-gradient-to-r from-orange-300 to-blue-500', desc: 'B 성분과 Y의 차이\nJPEG/MPEG 압축에서 색차 서브샘플링' },
      ],
      code: `yuv = cv2.cvtColor(img, cv2.COLOR_BGR2YUV)
Y, U, V = cv2.split(yuv)
# Y만 처리 → 밝기 조절 후 재결합
cv2.merge([Y_new, U, V])`,
      why: '밝기(Y)와 색상(UV)을 분리 → JPEG/MPEG 압축 기반',
    },
    lab: {
      name: 'L*a*b*',
      file: '16.convert_others.py',
      channels: [
        { ch: 'L (Lightness / 명도)', range: '0~255', color: 'bg-gradient-to-r from-black to-white', desc: '밝기. 인간 눈의 밝기 지각에 균일하게 맞춤' },
        { ch: 'a (Green→Red)', range: '0~255 (중간=128)', color: 'bg-gradient-to-r from-green-400 to-red-500', desc: '음수=초록, 양수=빨강 방향\n128이 중립(무채색)' },
        { ch: 'b (Blue→Yellow)', range: '0~255 (중간=128)', color: 'bg-gradient-to-r from-blue-400 to-yellow-400', desc: '음수=파랑, 양수=노랑 방향\n색상 거리 측정에 사용(deltaE)' },
      ],
      code: `lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
L, a, b = cv2.split(lab)
# 두 색상의 지각적 차이 계산
diff = cv2.absdiff(lab1, lab2)  # deltaE`,
      why: '인간 눈에 균일한 색차 표현 → 색상 유사도 비교에 최적',
    },
  };

  const cfg = spaces[space];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {Object.entries(spaces).map(([id, s]) => (
          <button key={id} onClick={() => setSpace(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${space === id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`}>
            {s.name}
          </button>
        ))}
      </div>

      <div className="text-xs text-gray-500 font-mono">{cfg.file}</div>

      {/* 채널 설명 */}
      <div className="space-y-2">
        {cfg.channels.map(({ ch, range, color, desc }) => (
          <div key={ch} className="rounded-xl border border-gray-200 overflow-hidden">
            <div className={`h-6 ${color}`} />
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-gray-800">{ch}</span>
                <Tag color="gray">{range}</Tag>
              </div>
              <div className="text-xs text-gray-600 whitespace-pre-line">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs">
        <div className="font-bold text-indigo-800 mb-1">사용 목적</div>
        <div className="text-indigo-700">{cfg.why}</div>
      </div>

      <Code>{cfg.code}</Code>
    </div>
  );
}

/* ══════════════════════════════════════════════
   TAB 7: Hue 이중 임계값 (17.hue_threshold)
══════════════════════════════════════════════ */
function HueThreshTab() {
  const [lo, setLo] = useState(40);
  const [hi, setHi] = useState(80);

  /* Hue 값 배열 시뮬레이션 */
  const hues = Array.from({ length: 36 }, (_, i) => i * 5);

  const applyThresh = (hue) => {
    // THRESH_TOZERO_INV: v > hi → 0, else v
    const step1 = hue > hi ? 0 : hue;
    // THRESH_BINARY: v > lo → 255, else 0
    const step2 = step1 > lo ? 255 : 0;
    return { step1, step2 };
  };

  /* Hue 팔레트 (OpenCV Hue 0~179 → 색상) */
  const hue2rgb = (h) => {
    const hsl = h / 180 * 360;
    const s = 1, l = 0.5;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hsl / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, bv;
    if (hsl < 60) { r=c; g=x; bv=0; } else if (hsl < 120) { r=x; g=c; bv=0; }
    else if (hsl < 180) { r=0; g=c; bv=x; } else if (hsl < 240) { r=0; g=x; bv=c; }
    else if (hsl < 300) { r=x; g=0; bv=c; } else { r=c; g=0; bv=x; }
    return `rgb(${Math.round((r+m)*255)},${Math.round((g+m)*255)},${Math.round((bv+m)*255)})`;
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500">2단계 임계값으로 Hue 범위 안의 색상만 추출. THRESH_TOZERO_INV → THRESH_BINARY 순서 중요!</div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between text-xs mb-1"><span>Hue_th1 (하한)</span><span className="font-bold text-blue-600">{lo}</span></div>
          <input type="range" min={0} max={hi - 5} value={lo} onChange={e => setLo(Number(e.target.value))} className="w-full accent-blue-500" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1"><span>Hue_th2 (상한)</span><span className="font-bold text-orange-600">{hi}</span></div>
          <input type="range" min={lo + 5} max={179} value={hi} onChange={e => setHi(Number(e.target.value))} className="w-full accent-orange-500" />
        </div>
      </div>

      {/* 2단계 처리 시각화 */}
      {[
        { label: '원본 Hue 값', key: 'orig' },
        { label: `① THRESH_TOZERO_INV (>${hi} → 0)`, key: 'step1' },
        { label: `② THRESH_BINARY (>${lo} → 255)`, key: 'step2' },
      ].map(({ label, key }) => (
        <div key={key}>
          <div className="text-xs font-bold text-gray-600 mb-1">{label}</div>
          <div className="flex gap-0.5">
            {hues.map(h => {
              const { step1, step2 } = applyThresh(h);
              let cellBg, cellText;
              if (key === 'orig') { cellBg = hue2rgb(h); cellText = '#000'; }
              else if (key === 'step1') { cellBg = step1 === 0 ? '#1e293b' : hue2rgb(h); cellText = step1 === 0 ? '#475569' : '#000'; }
              else { cellBg = step2 === 255 ? hue2rgb(h) : '#1e293b'; cellText = step2 === 255 ? '#000' : '#475569'; }
              return (
                <div key={h} className="flex-1 rounded text-center transition-all"
                  style={{ height: 32, backgroundColor: cellBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-xs font-mono" style={{ color: cellText, fontSize: 8 }}>
                    {key === 'orig' ? h : key === 'step1' ? step1 : step2 === 255 ? '✓' : '×'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="font-bold text-blue-800 mb-1">① THRESH_TOZERO_INV</div>
          <div className="text-blue-700">hue &gt; {hi} → 0 (상한 초과 제거)<br />hue ≤ {hi} → 그대로 유지</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
          <div className="font-bold text-orange-800 mb-1">② THRESH_BINARY</div>
          <div className="text-orange-700">step1 &gt; {lo} → 255 (선택)<br />step1 ≤ {lo} → 0 (하한 미만 제거)</div>
        </div>
      </div>

      <Code>{`HSV_img = cv2.cvtColor(BGR_img, cv2.COLOR_BGR2HSV)
hue = HSV_img[:, :, 0]          # H 채널만 추출 (0~179)

# 2단계 임계값
# ① 상한 초과 제거
_, result = cv2.threshold(hue, ${hi}, 255, cv2.THRESH_TOZERO_INV)
# ② 하한 미만 제거 → 최종 마스크
cv2.threshold(result, ${lo}, 255, cv2.THRESH_BINARY, result)

# 결과: Hue가 ${lo}~${hi} 범위인 픽셀만 255, 나머지 0`}
      </Code>
    </div>
  );
}

/* ══════════════════════════════════════════════
   메인
══════════════════════════════════════════════ */
export default function Chap06Diagram() {
  const [tab, setTab] = useState('lut');

  const tabs = [
    { id: 'lut',      icon: '⚡', label: 'LUT 접근법',     file: '02' },
    { id: 'contrast', icon: '🎚️', label: '대비 조절',      file: '06' },
    { id: 'histogram',icon: '📊', label: '히스토그램·스트레칭', file: '07~11' },
    { id: 'equalize', icon: '📈', label: '히스토그램 평활화', file: '12' },
    { id: 'cmyk',     icon: '🖨️', label: 'CMY/CMYK',      file: '13~14' },
    { id: 'colorspace',icon:'🎨', label: '컬러 공간',      file: '15~16' },
    { id: 'hue',      icon: '🎯', label: 'Hue 이중 임계값', file: '17' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${tab === t.id ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}>
            <div>{t.icon} {t.label}</div>
            <div className={`font-mono font-normal mt-0.5 ${tab === t.id ? 'opacity-70' : 'text-gray-400'}`}>{t.file}.py</div>
          </button>
        ))}
      </div>
      <div className="min-h-[320px]">
        {tab === 'lut'        && <LutTab />}
        {tab === 'contrast'   && <ContrastTab />}
        {tab === 'histogram'  && <HistogramTab />}
        {tab === 'equalize'   && <EqualizeTab />}
        {tab === 'cmyk'       && <CmykTab />}
        {tab === 'colorspace' && <ColorSpaceTab />}
        {tab === 'hue'        && <HueThreshTab />}
      </div>
    </div>
  );
}
