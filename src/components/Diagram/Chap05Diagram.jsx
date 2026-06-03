import { useState } from 'react';

/* ── 공통 컴포넌트 ── */
function Code({ children }) {
  return (
    <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto">
      {children}
    </pre>
  );
}

function Badge({ color = 'blue', children }) {
  const c = {
    blue:   'bg-blue-100 text-blue-800',
    red:    'bg-red-100 text-red-800',
    green:  'bg-green-100 text-green-800',
    orange: 'bg-orange-100 text-orange-800',
    purple: 'bg-purple-100 text-purple-800',
    gray:   'bg-gray-100 text-gray-700',
  };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${c[color]}`}>{children}</span>;
}

function Arrow({ label, vertical }) {
  if (vertical) return (
    <div className="flex flex-col items-center my-1">
      <div className="w-0.5 h-4 bg-gray-400" />
      <div className="text-gray-400" style={{ fontSize: 10, marginTop: -2 }}>▼</div>
      {label && <div className="text-xs text-gray-500 mt-0.5">{label}</div>}
    </div>
  );
  return (
    <div className="flex items-center mx-1">
      <div className="h-0.5 w-6 bg-gray-400" />
      <div className="text-gray-400 -ml-0.5">▶</div>
      {label && <div className="text-xs text-gray-500 ml-1 whitespace-nowrap">{label}</div>}
    </div>
  );
}

function Cell({ v, highlight }) {
  return (
    <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-all
      ${v ? 'bg-white text-gray-800' : 'bg-gray-800 text-gray-500'}
      ${highlight ? 'ring-2 ring-yellow-400' : ''}`}>
      {v}
    </div>
  );
}

function Grid({ data, label, color = 'gray' }) {
  const border = { blue: 'border-blue-400', orange: 'border-orange-400', green: 'border-green-400', gray: 'border-gray-400', purple: 'border-purple-400', red: 'border-red-400' };
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs font-bold text-gray-600">{label}</div>
      <div className={`p-1.5 rounded-xl border-2 ${border[color]} bg-gray-900 inline-flex flex-col gap-0.5`}>
        {data.map((row, r) => (
          <div key={r} className="flex gap-0.5">
            {row.map((v, c) => <Cell key={c} v={v} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

function MatBox({ mat, label, highlight }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs font-bold text-gray-600">{label}</div>
      <div className="inline-flex flex-col gap-0.5 bg-gray-900 p-1.5 rounded-lg">
        {mat.map((row, r) => (
          <div key={r} className="flex gap-0.5">
            {row.map((v, c) => (
              <div key={c} className={`w-8 h-7 rounded flex items-center justify-center text-xs font-bold ${highlight ? 'bg-blue-400 text-white' : 'bg-gray-700 text-green-300'}`}>
                {typeof v === 'number' ? (Number.isInteger(v) ? v : v.toFixed(2)) : v}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 font-mono">{mat.length}×{mat[0].length}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TAB 1: 비트 연산 + 마스킹 합성 (07.bitwise_op + 08.bitwise_overlap)
══════════════════════════════════════════════════════ */
function BitwiseTab() {
  const [mode, setMode] = useState('op');

  /* 5×5 이진 그리드 */
  const circleGrid = Array.from({ length: 5 }, (_, r) =>
    Array.from({ length: 5 }, (_, c) => {
      const dr = r - 2, dc = c - 2;
      return dr * dr + dc * dc <= 4 ? 1 : 0;   // 반지름 2 원
    })
  );
  const rectGrid = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, (_, c) => (c < 3 ? 1 : 0))   // 왼쪽 3열
  );

  function opGrid(fn) {
    return circleGrid.map((row, r) => row.map((v, c) => fn(v, rectGrid[r][c])));
  }

  const ops = {
    OR:  opGrid((a, b) => a | b),
    AND: opGrid((a, b) => a & b),
    XOR: opGrid((a, b) => a ^ b),
    NOT: circleGrid.map(row => row.map(v => v ^ 1)),
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('op')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold ${mode === 'op' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'}`}>
          비트 연산 (07)
        </button>
        <button onClick={() => setMode('pipeline')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold ${mode === 'pipeline' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
          마스킹 합성 파이프라인 (08)
        </button>
      </div>

      {mode === 'op' && (
        <div className="space-y-4">
          <div className="text-xs text-gray-500">흰색(1)=255, 검정(0)=0으로 생각하세요</div>

          {/* 입력 두 영상 */}
          <div className="flex gap-4 items-center flex-wrap">
            <Grid data={circleGrid} label="image1 (원)" color="blue" />
            <Grid data={rectGrid} label="image2 (사각형)" color="orange" />
          </div>

          {/* 4가지 연산 결과 */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'OR',  label: 'bitwise_OR', color: 'green',  desc: '둘 중 하나라도 1이면 → 1\n합집합 (Union)' },
              { key: 'AND', label: 'bitwise_AND', color: 'purple', desc: '둘 다 1일 때만 → 1\n교집합 (마스크 적용)' },
              { key: 'XOR', label: 'bitwise_XOR', color: 'orange', desc: '값이 다를 때만 → 1\n차이 부분만 추출' },
              { key: 'NOT', label: 'bitwise_NOT', color: 'red',    desc: '0↔1 반전\n(image1 기준)' },
            ].map(({ key, label, color, desc }) => (
              <div key={key} className="flex flex-col items-center gap-1 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="text-xs font-bold font-mono text-gray-700">cv2.{label}()</div>
                <Grid data={ops[key]} label="" color={color} />
                <div className="text-xs text-gray-500 text-center whitespace-pre-line">{desc}</div>
              </div>
            ))}
          </div>

          <Code>{`image1 = 원 그린 영상
image2 = 왼쪽 사각형 영상

cv2.bitwise_or (image1, image2)  # 합집합
cv2.bitwise_and(image1, image2)  # 교집합 / 마스크
cv2.bitwise_xor(image1, image2)  # 차이 부분
cv2.bitwise_not(image1)          # 반전`}
          </Code>
        </div>
      )}

      {mode === 'pipeline' && (
        <div className="space-y-3">
          <div className="text-xs font-bold text-gray-700">08.bitwise_overlap.py — 로고를 원본 영상 위에 합성하는 과정</div>

          {/* 단계별 파이프라인 */}
          {[
            {
              step: '① 로고 이진화 → 마스크 생성',
              color: 'blue',
              items: [
                { label: '로고 원본', desc: '흰 배경 + 컬러 문자', icon: '🖼️' },
                { label: 'threshold(220)', desc: '흰 배경(>220) → 255', icon: '⚙️' },
                { label: 'fg_pass_mask', desc: '전경 통과 마스크\n(문자 영역=255)', icon: '🔲' },
                { label: 'bitwise_NOT', desc: 'bg_pass_mask\n(배경 영역=255)', icon: '🔄' },
              ],
              code: `masks = cv2.threshold(logo, 220, 255, THRESH_BINARY)[1]
fg_pass = cv2.bitwise_or(masks[0], masks[1])
fg_pass = cv2.bitwise_or(masks[2], fg_pass)
bg_pass = cv2.bitwise_not(fg_pass)`
            },
            {
              step: '② 마스크로 분리 후 합성',
              color: 'green',
              items: [
                { label: 'foreground', desc: 'logo AND fg_mask\n→ 문자만 추출', icon: '✒️' },
                { label: 'background', desc: 'roi AND bg_mask\n→ 문자 자리 제거', icon: '🖼️' },
                { label: 'cv2.add', desc: '전경 + 배경\n= 합성 완료', icon: '➕' },
                { label: 'dst', desc: '원본 위에\n로고 합성', icon: '✅' },
              ],
              code: `roi = image[y:y+h, x:x+w]         # 관심 영역
foreground = cv2.bitwise_and(logo, logo, mask=fg_pass)
background = cv2.bitwise_and(roi,  roi,  mask=bg_pass)
dst = cv2.add(background, foreground)
image[y:y+h, x:x+w] = dst`
            },
          ].map(({ step, color, items, code }) => (
            <div key={step} className={`border rounded-xl overflow-hidden ${color === 'blue' ? 'border-blue-200' : 'border-green-200'}`}>
              <div className={`px-4 py-2 text-xs font-bold ${color === 'blue' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
                {step}
              </div>
              <div className="p-3 space-y-2 bg-gray-50">
                <div className="flex items-center gap-1 flex-wrap">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      {i > 0 && <Arrow />}
                      <div className="flex flex-col items-center bg-white rounded-lg border border-gray-200 px-2 py-1.5 min-w-[70px]">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-xs font-bold text-gray-700 text-center">{item.label}</span>
                        <span className="text-xs text-gray-500 text-center whitespace-pre-line leading-tight mt-0.5">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Code>{code}</Code>
              </div>
            </div>
          ))}

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-yellow-800 mb-1">💡 핵심 원리</div>
            <div className="text-yellow-700">
              마스크가 <Badge color="orange">255</Badge> 인 영역만 통과, <Badge color="gray">0</Badge> 영역은 차단<br/>
              전경 마스크 + 배경 마스크는 서로 <strong>반대(NOT)</strong> 관계 → 더하면 원본 복원
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TAB 2: uint8 차분 오버플로우 vs absdiff (09.mat_abs)
══════════════════════════════════════════════════════ */
function AbsDiffTab() {
  const [a, setA] = useState(80);
  const [b, setB] = useState(120);

  const uint8Sub  = ((a - b) + 256) % 256;   // uint8 모듈로
  const satSub    = Math.max(0, a - b);        // cv2.subtract 포화
  const int16Sub  = a - b;                     // int16 보존
  const absdiff   = Math.abs(a - b);           // absdiff

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-red-50 border border-red-200 rounded-lg p-2">
        ⚠️ <strong>핵심 함정:</strong> uint8 뺄셈 결과가 음수면 오버플로우 발생! 영상 비교 시 반드시 주의
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[{ l: '픽셀 A (image1)', v: a, set: setA }, { l: '픽셀 B (image2)', v: b, set: setB }].map(item => (
          <div key={item.l}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">{item.l}</span>
              <span className="font-bold text-blue-600">{item.v}</span>
            </div>
            <input type="range" min={0} max={255} value={item.v}
              onChange={e => item.set(Number(e.target.value))}
              className="w-full accent-blue-500" />
            <div className="h-4 rounded mt-1" style={{ backgroundColor: `rgb(${item.v},${item.v},${item.v})` }} />
          </div>
        ))}
      </div>

      {/* A - B 결과 비교 */}
      <div className="text-xs font-bold text-gray-700">A({a}) - B({b}) = 실제값 <span className="text-blue-600">{a - b}</span></div>

      <div className="space-y-2">
        {[
          {
            label: 'numpy: image1 - image2',
            badge: 'uint8 모듈로',
            badgeColor: 'red',
            result: uint8Sub,
            warn: a < b,
            desc: `uint8는 0~255만 표현 → 음수가 되면 256 더함\n${a} - ${b} = ${a - b} → uint8로는 ${uint8Sub} ❌`,
          },
          {
            label: 'cv2.subtract(image1, image2)',
            badge: '포화 연산',
            badgeColor: 'orange',
            result: satSub,
            warn: a < b,
            desc: `음수면 0에서 클리핑 (포화)\n${a} - ${b} = ${a - b} → 포화 → ${satSub} (0으로 잘림)`,
          },
          {
            label: 'int16(image1) - int16(image2)',
            badge: '음수 보전',
            badgeColor: 'green',
            result: int16Sub,
            warn: false,
            desc: `int16(-32768~32767) → 음수 그대로 보전\n${a} - ${b} = ${int16Sub} ✅`,
          },
          {
            label: 'cv2.absdiff(image1, image2)',
            badge: '차분 절댓값',
            badgeColor: 'blue',
            result: absdiff,
            warn: false,
            desc: `|A - B| → 항상 양수\n|${a} - ${b}| = ${absdiff} ✅ (영상 비교에 최적)`,
          },
        ].map(({ label, badge, badgeColor, result, warn, desc }) => (
          <div key={label} className={`rounded-xl border p-3 ${warn ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
              <span className="text-xs font-mono font-bold text-gray-700">{label}</span>
              <Badge color={badgeColor}>{badge}</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ backgroundColor: result < 0 ? '#fee2e2' : `rgb(${result},${result},${result})`, color: result > 128 ? '#111' : result < 0 ? '#991b1b' : '#eee' }}>
                {result}
              </div>
              <div className="text-xs text-gray-600 whitespace-pre-line flex-1">{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Code>{`# 두 영상의 차이를 비교할 때
dif1 = cv2.subtract(img1, img2)      # 음수→0 클리핑 (차이 손실)
dif2 = cv2.subtract(np.int16(img1),  # int16으로 음수 보전
                    np.int16(img2))
abs1 = np.absolute(dif2).astype('uint8')
abs2 = cv2.absdiff(img1, img2)       # ← 가장 안전한 방법`}
      </Code>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TAB 3: 정규화 스트레칭 (11.image_min_max)
══════════════════════════════════════════════════════ */
function NormalizeTab() {
  const [minVal, setMinVal] = useState(60);
  const [maxVal, setMaxVal] = useState(200);

  const ratio = 255 / (maxVal - minVal || 1);
  const samples = [minVal, Math.round((minVal + maxVal) / 2), maxVal,
                   Math.round(minVal + (maxVal - minVal) * 0.25),
                   Math.round(minVal + (maxVal - minVal) * 0.75)].sort((a, b) => a - b);
  const stretched = samples.map(v => Math.round(Math.min(255, Math.max(0, (v - minVal) * ratio))));

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500">
        영상의 밝기값 범위가 좁을 때 → 0~255 전체 범위로 늘려 대비 향상
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between text-xs mb-1"><span>원본 최솟값</span><span className="font-bold text-blue-600">{minVal}</span></div>
          <input type="range" min={0} max={200} value={minVal} onChange={e => setMinVal(Math.min(Number(e.target.value), maxVal - 10))} className="w-full accent-blue-500" />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1"><span>원본 최댓값</span><span className="font-bold text-orange-600">{maxVal}</span></div>
          <input type="range" min={55} max={255} value={maxVal} onChange={e => setMaxVal(Math.max(Number(e.target.value), minVal + 10))} className="w-full accent-orange-500" />
        </div>
      </div>

      {/* 수식 시각화 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="text-xs font-bold text-blue-800 mb-2">정규화 스트레칭 공식</div>
        <div className="flex items-center gap-2 flex-wrap text-sm">
          <span className="font-mono font-bold text-blue-700">dst[y,x]</span>
          <span className="text-gray-500">=</span>
          <span className="font-mono bg-white border border-blue-300 px-2 py-1 rounded">
            (원본 - {minVal}) × {ratio.toFixed(2)}
          </span>
          <span className="text-gray-500 text-xs">where ratio = 255 / ({maxVal} - {minVal})</span>
        </div>
      </div>

      {/* 변환 전후 비교 막대 */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-gray-700">픽셀값 변환 전후 비교</div>
        {samples.map((orig, i) => {
          const dst = stretched[i];
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-20 text-right text-xs text-gray-500 font-mono">{orig}</div>
              {/* 원본 바 */}
              <div className="w-28 h-5 bg-gray-200 rounded relative overflow-hidden">
                <div className="h-full rounded" style={{ width: `${(orig / 255) * 100}%`, backgroundColor: `rgb(${orig},${orig},${orig})` }} />
              </div>
              <Arrow />
              {/* 변환 바 */}
              <div className="w-28 h-5 bg-gray-200 rounded relative overflow-hidden">
                <div className="h-full rounded" style={{ width: `${(dst / 255) * 100}%`, backgroundColor: `rgb(${dst},${dst},${dst})` }} />
              </div>
              <div className="w-12 text-xs font-bold font-mono" style={{ color: dst > orig ? '#16a34a' : dst < orig ? '#dc2626' : '#6b7280' }}>
                {dst} {dst > orig ? '▲' : dst < orig ? '▼' : '='}
              </div>
            </div>
          );
        })}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="w-20 text-right">원본</div>
          <div className="w-28 text-center">0────255</div>
          <div className="w-6" />
          <div className="w-28 text-center">0────255</div>
          <div className="w-12 text-center">결과</div>
        </div>
      </div>

      <Code>{`min_val, max_val, _, _ = cv2.minMaxLoc(image)
ratio = 255 / (max_val - min_val)
dst = np.round((image - min_val) * ratio).astype('uint8')
# → 어두운 영상도 0~255 전체 범위 활용`}
      </Code>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TAB 4: reduce 방향 (16.mat_reduce)
══════════════════════════════════════════════════════ */
const REDUCE_MAT = [[85, 12, 67, 34, 90], [23, 56, 8, 71, 45], [62, 37, 93, 18, 50]];

function ReduceTab() {
  const [op, setOp] = useState('SUM_0');

  const configs = {
    SUM_0: { dim: 0, rtype: 'REDUCE_SUM', label: 'dim=0 (열→행 축소)', fn: col => col.reduce((a, b) => a + b, 0), color: 'blue',   desc: '각 열의 합 → 결과: 1행 5열' },
    AVG_1: { dim: 1, rtype: 'REDUCE_AVG', label: 'dim=1 (행→열 축소)', fn: row => (row.reduce((a, b) => a + b, 0) / row.length).toFixed(1), color: 'green',  desc: '각 행의 평균 → 결과: 3행 1열' },
    MAX_0: { dim: 0, rtype: 'REDUCE_MAX', label: 'dim=0 최댓값',        fn: col => Math.max(...col), color: 'orange', desc: '각 열에서 최댓값 → 결과: 1행 5열' },
    MIN_1: { dim: 1, rtype: 'REDUCE_MIN', label: 'dim=1 최솟값',        fn: row => Math.min(...row), color: 'purple', desc: '각 행에서 최솟값 → 결과: 3행 1열' },
  };

  const cfg = configs[op];
  const rows = REDUCE_MAT.length, cols = REDUCE_MAT[0].length;

  let result;
  if (cfg.dim === 0) {
    result = Array.from({ length: cols }, (_, c) => Number(cfg.fn(REDUCE_MAT.map(r => r[c]))));
  } else {
    result = REDUCE_MAT.map(row => Number(cfg.fn(row)));
  }

  const colors = { blue: '#3b82f6', green: '#22c55e', orange: '#f97316', purple: '#a855f7' };
  const hlColor = colors[cfg.color];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(configs).map(([k, v]) => (
          <button key={k} onClick={() => setOp(k)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${op === k ? `text-white border-transparent` : 'bg-white text-gray-600 border-gray-300'}`}
            style={{ backgroundColor: op === k ? hlColor : undefined }}>
            {v.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 text-xs text-gray-600">
        <span className="font-bold">방향:</span> {cfg.desc}
      </div>

      <div className="flex gap-6 items-start flex-wrap">
        {/* 입력 행렬 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-2">입력 (3×5)</div>
          <div className="inline-flex flex-col gap-0.5">
            {REDUCE_MAT.map((row, r) => (
              <div key={r} className="flex gap-0.5 items-center">
                {row.map((v, c) => (
                  <div key={c}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      backgroundColor: (cfg.dim === 0 ? true : false) && cfg.dim === 0
                        ? `rgba(${hlColor.match(/\d+/g)?.join(',')}, 0.1)`
                        : cfg.dim === 1 ? `rgba(${hlColor.match(/\d+/g)?.join(',')}, 0.1)` : '#f9fafb',
                      border: `1.5px solid ${hlColor}33`,
                    }}>
                    {v}
                  </div>
                ))}
                {/* 행 방향이면 오른쪽에 결과 */}
                {cfg.dim === 1 && (
                  <>
                    <Arrow label="→" />
                    <div className="w-12 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: hlColor }}>{result[r]}</div>
                  </>
                )}
              </div>
            ))}
            {/* 열 방향이면 아래쪽에 결과 */}
            {cfg.dim === 0 && (
              <div className="flex gap-0.5 mt-1">
                {result.map((v, c) => (
                  <div key={c} className="flex flex-col items-center gap-0.5">
                    <span className="text-xs text-gray-400">↓</span>
                    <div className="w-10 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: hlColor }}>{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* 방향 화살표 설명 */}
          {cfg.dim === 0
            ? <div className="text-xs text-gray-500 mt-2 text-center">↑ dim=0: 세로 방향으로 압축 → 1행 결과</div>
            : <div className="text-xs text-gray-500 mt-2">← dim=1: 가로 방향으로 압축 → 1열 결과</div>}
        </div>

        {/* 결과 형태 */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-gray-600">결과 형태</div>
          <div className="rounded-xl border-2 p-3 text-xs font-mono space-y-1"
            style={{ borderColor: hlColor, backgroundColor: `${hlColor}11` }}>
            <div style={{ color: hlColor }} className="font-bold">{cfg.rtype}</div>
            <div className="text-gray-700">dim={cfg.dim}</div>
            <div className="text-gray-700">
              결과: {cfg.dim === 0 ? `(1, ${cols})` : `(${rows}, 1)`}
            </div>
            <div className="mt-2 text-gray-600">
              [{result.join(', ')}]
            </div>
          </div>
        </div>
      </div>

      <Code>{`m = np.random.rand(3, 5)
# dim=0: 열 방향(↓) 축소 → 1행 결과
cv2.reduce(m, dim=0, rtype=cv2.REDUCE_SUM)  # 열합
cv2.reduce(m, dim=0, rtype=cv2.REDUCE_MAX)  # 열최댓값

# dim=1: 행 방향(→) 축소 → 1열 결과
cv2.reduce(m, dim=1, rtype=cv2.REDUCE_AVG)  # 행평균
cv2.reduce(m, dim=1, rtype=cv2.REDUCE_MIN)  # 행최솟값`}
      </Code>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TAB 5: GEMM 플래그 + 회전 행렬 (17~18)
══════════════════════════════════════════════════════ */
const SRC1 = [[1, 2, 3], [1, 2, 3]];    // 2×3
const SRC2 = [[1, 2, 3], [4, 5, 6]];    // 2×3
const SRC3 = [[1, 2], [1, 2], [1, 2]];  // 3×2

function matMul(A, B) {
  return A.map(row => Array.from({ length: B[0].length }, (_, c) =>
    row.reduce((sum, v, k) => sum + v * B[k][c], 0)
  ));
}
function transpose(M) { return M[0].map((_, c) => M.map(r => r[c])); }

function GemmTab() {
  const [flag, setFlag] = useState('GEMM_2_T');
  const [angle, setAngle] = useState(30);

  const src1T = transpose(SRC1);
  const src2T = transpose(SRC2);

  const results = {
    NONE:     { A: SRC1, B: SRC3, result: matMul(SRC1, SRC3),   desc: 'src1(2×3) × src3(3×2) = dst(2×2)' },
    GEMM_1_T: { A: src1T, B: SRC2, result: matMul(src1T, SRC2), desc: 'src1ᵀ(3×2) × src2(2×3) = dst(3×3)' },
    GEMM_2_T: { A: SRC1, B: src2T, result: matMul(SRC1, src2T), desc: 'src1(2×3) × src2ᵀ(3×2) = dst(2×2)' },
  };

  const cfg = results[flag];

  // 회전 행렬 좌표 변환
  const rad = angle * Math.PI / 180;
  const rotMat = [[Math.cos(rad), -Math.sin(rad)], [Math.sin(rad), Math.cos(rad)]];
  const pts = [[1, 0], [0, 1], [1, 1]];
  const rotPts = pts.map(pt => [
    rotMat[0][0] * pt[0] + rotMat[0][1] * pt[1],
    rotMat[1][0] * pt[0] + rotMat[1][1] * pt[1],
  ]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {[
          ['NONE', '일반 행렬 곱'],
          ['GEMM_1_T', 'GEMM_1_T (src1 전치)'],
          ['GEMM_2_T', 'GEMM_2_T (src2 전치)'],
        ].map(([k, lb]) => (
          <button key={k} onClick={() => setFlag(k)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${flag === k ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {/* 행렬 시각화 */}
      <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 font-mono">
        {cfg.desc}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <MatBox mat={cfg.A} label={flag === 'GEMM_1_T' ? 'src1ᵀ' : 'src1'} />
        <div className="text-2xl font-bold text-gray-400">×</div>
        <MatBox mat={cfg.B} label={flag === 'GEMM_2_T' ? 'src2ᵀ' : flag === 'NONE' ? 'src3' : 'src2'} />
        <div className="text-2xl font-bold text-gray-400">=</div>
        <MatBox mat={cfg.result} label="dst" highlight />
      </div>

      <Code>{`# 기본 행렬 곱: src1(2×3) × src3(3×2)
cv2.gemm(src1, src3, 1.0, None, 0.0)

# GEMM_1_T: src1을 전치 후 곱
cv2.gemm(src1, src2, 1.0, None, 0.0, flags=cv2.GEMM_1_T)
# → src1ᵀ(3×2) × src2(2×3) = (3×3)

# GEMM_2_T: src2을 전치 후 곱
cv2.gemm(src1, src2, 1.0, None, 0.0, flags=cv2.GEMM_2_T)
# → src1(2×3) × src2ᵀ(3×2) = (2×2)`}
      </Code>

      {/* 회전 행렬 응용 */}
      <div className="border border-indigo-200 rounded-xl overflow-hidden">
        <div className="bg-indigo-600 text-white px-4 py-2 text-xs font-bold">
          📐 응용: 회전 행렬로 좌표 변환 (18.point_transform.py)
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600">회전 각도</span>
            <input type="range" min={0} max={90} value={angle}
              onChange={e => setAngle(Number(e.target.value))}
              className="flex-1 accent-indigo-500" />
            <span className="text-sm font-bold text-indigo-700 w-10">{angle}°</span>
          </div>

          {/* SVG 좌표 변환 시각화 */}
          <div className="flex gap-4 items-start flex-wrap">
            <svg width="140" height="140" className="bg-gray-900 rounded-lg flex-shrink-0">
              {/* 축 */}
              <line x1="70" y1="10" x2="70" y2="130" stroke="#374151" strokeWidth="1" />
              <line x1="10" y1="70" x2="130" y2="70" stroke="#374151" strokeWidth="1" />
              {/* 원래 점들 */}
              {pts.map((pt, i) => (
                <circle key={`o${i}`} cx={70 + pt[0] * 50} cy={70 - pt[1] * 50} r="5"
                  fill="#60a5fa" opacity="0.5" />
              ))}
              {/* 회전된 점들 */}
              {rotPts.map((pt, i) => (
                <g key={`r${i}`}>
                  <line x1={70 + pts[i][0] * 50} y1={70 - pts[i][1] * 50}
                    x2={70 + pt[0] * 50} y2={70 - pt[1] * 50}
                    stroke="#818cf8" strokeWidth="1" strokeDasharray="3,3" />
                  <circle cx={70 + pt[0] * 50} cy={70 - pt[1] * 50} r="5" fill="#818cf8" />
                </g>
              ))}
              <text x="5" y="135" fill="#9ca3af" fontSize="9">⬤원본 ⬤회전후</text>
            </svg>
            <div className="text-xs space-y-1 flex-1">
              <div className="font-bold text-gray-700">회전 행렬:</div>
              <div className="font-mono bg-gray-100 rounded p-2 text-gray-700">
                [[cos{angle}°, -sin{angle}°],<br />
                &nbsp;[sin{angle}°,  cos{angle}°]]<br />
                = [[{Math.cos(rad).toFixed(2)}, {(-Math.sin(rad)).toFixed(2)}],<br />
                &nbsp;&nbsp; [{Math.sin(rad).toFixed(2)},  {Math.cos(rad).toFixed(2)}]]
              </div>
              <Code>{`theta = ${angle} * np.pi / 180
rot_mat = np.array([
    [np.cos(theta), -np.sin(theta)],
    [np.sin(theta),  np.cos(theta)]])
pts2 = cv2.gemm(pts1, rot_mat, 1,
                None, 1, flags=cv2.GEMM_2_T)`}
              </Code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TAB 6: 역행렬로 연립방정식 풀기 (19.equation)
══════════════════════════════════════════════════════ */
function EquationTab() {
  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500">연립방정식 Ax = b → x = A⁻¹b (역행렬을 이용한 풀이)</div>

      {/* 연립방정식 → 행렬 표현 */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
          <div className="text-xs font-bold text-blue-800">연립방정식</div>
          <div className="font-mono text-sm space-y-1 text-blue-900">
            <div>3x + 0y + 6z = 36</div>
            <div className="text-gray-400">-3x + 4y + 2z = 10</div>
            <div>-5x - y + 9z = 28</div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
          <div className="text-xs font-bold text-green-800">행렬 표현: Ax = b</div>
          <div className="flex items-center gap-2 text-xs">
            <div className="font-mono bg-white rounded p-2 text-center text-green-900 border border-green-200">
              A =<br />
              [[3,0,6],<br />
              [-3,4,2],<br />
              [-5,-1,9]]
            </div>
            <div className="font-mono">×</div>
            <div className="font-mono bg-white rounded p-2 text-center text-green-900 border border-green-200">
              x =<br />
              [x]<br />
              [y]<br />
              [z]
            </div>
            <div className="font-mono">=</div>
            <div className="font-mono bg-white rounded p-2 text-center text-green-900 border border-green-200">
              b =<br />
              [36]<br />
              [10]<br />
              [28]
            </div>
          </div>
        </div>
      </div>

      {/* 풀이 흐름 */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-gray-700">풀이 과정</div>
        {[
          { step: '①', label: 'A의 역행렬 계산', code: 'ret, inv = cv2.invert(A, cv2.DECOMP_LU)', color: 'blue', desc: 'LU 분해법으로 역행렬 계산\nret=True면 역행렬 존재' },
          { step: '②', label: 'x = A⁻¹ × b', code: 'x = inv.dot(b)  # 또는 cv2.gemm(inv, b, 1, None, 1)', color: 'orange', desc: '역행렬과 b를 곱해 해 x 구하기' },
          { step: '③', label: '또는 직접 풀기', code: 'ret, x = cv2.solve(A, b, cv2.DECOMP_LU)', color: 'green', desc: 'cv2.solve: 역행렬 없이 직접 연립방정식 풀기\n더 안정적이고 빠름' },
        ].map(({ step, label, code, color, desc }) => {
          const border = { blue: 'border-blue-200 bg-blue-50', orange: 'border-orange-200 bg-orange-50', green: 'border-green-200 bg-green-50' };
          const text = { blue: 'text-blue-800', orange: 'text-orange-800', green: 'text-green-800' };
          return (
            <div key={step} className={`rounded-xl border p-3 ${border[color]}`}>
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full bg-white border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${text[color]}`} style={{ borderColor: 'currentColor' }}>
                  {step}
                </div>
                <div className="flex-1">
                  <div className={`text-xs font-bold ${text[color]} mb-1`}>{label}</div>
                  <div className="text-xs text-gray-600 whitespace-pre-line mb-1">{desc}</div>
                  <Code>{code}</Code>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs space-y-1">
        <div className="font-bold text-yellow-800">⚠️ 주의사항</div>
        <div className="text-yellow-700">• det(A) = 0이면 역행렬 없음 → <Badge color="red">특이행렬(Singular)</Badge></div>
        <div className="text-yellow-700">• 대규모 행렬은 <Badge color="green">cv2.solve()</Badge> 가 역행렬보다 수치 안정성 높음</div>
        <div className="text-yellow-700">• 결과: x≈2, y≈1, z≈5 (교재 정답)</div>
      </div>

      <Code>{`import numpy as np, cv2

A = np.array([3,0,6,-3,4,2,-5,-1,9],
             np.float32).reshape(3, 3)
b = np.array([36, 10, 28], np.float32)

ret, inv = cv2.invert(A, cv2.DECOMP_LU)
if ret:
    x1 = inv.dot(b)           # [x, y, z]
    ret, x2 = cv2.solve(A, b, cv2.DECOMP_LU)
    print(x1.flatten())       # → [2. 1. 5.]`}
      </Code>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   메인
══════════════════════════════════════════════════════ */
export default function Chap05Diagram() {
  const [tab, setTab] = useState('bitwise');

  const tabs = [
    { id: 'bitwise',   icon: '🔲', label: '비트 연산·마스킹', file: '07~08' },
    { id: 'absdiff',   icon: '⚠️', label: '차분 오버플로우',  file: '09' },
    { id: 'normalize', icon: '📈', label: '정규화 스트레칭',  file: '11' },
    { id: 'reduce',    icon: '🔽', label: 'reduce 방향',     file: '16' },
    { id: 'gemm',      icon: '🔣', label: 'GEMM 플래그·회전', file: '17~18' },
    { id: 'equation',  icon: '📐', label: '연립방정식',       file: '19' },
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
      <div className="min-h-[300px]">
        {tab === 'bitwise'   && <BitwiseTab />}
        {tab === 'absdiff'   && <AbsDiffTab />}
        {tab === 'normalize' && <NormalizeTab />}
        {tab === 'reduce'    && <ReduceTab />}
        {tab === 'gemm'      && <GemmTab />}
        {tab === 'equation'  && <EquationTab />}
      </div>
    </div>
  );
}
