import { useState } from 'react';

/* ── 공통: 픽셀 그리드 생성 ── */
function makeGrid(rows, cols, seed = 42) {
  let s = seed;
  const rng = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return Math.abs(s) % 256; };
  return Array.from({ length: rows }, () => Array.from({ length: cols }, rng));
}

const GRID = makeGrid(4, 5, 99);

/* ────────────────────────────── 1. minMaxLoc ── */
function MinMaxSection() {
  const [hovered, setHovered] = useState(null);

  const flat = GRID.flat();
  const minVal = Math.min(...flat);
  const maxVal = Math.max(...flat);
  let minLoc = null, maxLoc = null;
  GRID.forEach((row, r) => row.forEach((v, c) => {
    if (v === minVal) minLoc = [r, c];
    if (v === maxVal) maxLoc = [r, c];
  }));

  const cellBg = (r, c, v) => {
    if (r === minLoc?.[0] && c === minLoc?.[1]) return '#3b82f6'; // blue
    if (r === maxLoc?.[0] && c === maxLoc?.[1]) return '#ef4444'; // red
    return `rgb(${v},${v},${v})`;
  };
  const cellText = (r, c, v) => {
    if (r === minLoc?.[0] && c === minLoc?.[1]) return 'white';
    if (r === maxLoc?.[0] && c === maxLoc?.[1]) return 'white';
    return v > 128 ? '#111' : '#eee';
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500">그리드를 클릭·호버해서 각 픽셀값을 확인하세요</div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* 픽셀 그리드 */}
        <div className="flex-shrink-0">
          <div className="text-xs font-bold text-gray-600 mb-2 text-center">4×5 그레이스케일 행렬</div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(5, 52px)`, gap: 4 }}>
            {GRID.map((row, r) => row.map((v, c) => {
              const isHov = hovered?.r === r && hovered?.c === c;
              const isMin = r === minLoc?.[0] && c === minLoc?.[1];
              const isMax = r === maxLoc?.[0] && c === maxLoc?.[1];
              return (
                <div key={`${r}-${c}`}
                  onMouseEnter={() => setHovered({ r, c, v })}
                  onMouseLeave={() => setHovered(null)}
                  className="flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all select-none"
                  style={{
                    width: 52, height: 52,
                    backgroundColor: cellBg(r, c, v),
                    transform: isHov ? 'scale(1.12)' : 'scale(1)',
                    border: isHov ? '3px solid #f59e0b' : isMin ? '3px solid #3b82f6' : isMax ? '3px solid #ef4444' : '2px solid transparent',
                    boxShadow: isMin || isMax ? '0 0 12px rgba(0,0,0,0.3)' : 'none',
                  }}>
                  <span className="text-xs font-bold" style={{ color: cellText(r, c, v) }}>{v}</span>
                  {isMin && <span className="text-xs" style={{ color: 'white' }}>MIN</span>}
                  {isMax && <span className="text-xs" style={{ color: 'white' }}>MAX</span>}
                </div>
              );
            }))}
          </div>
          {/* 좌표 레이블 */}
          <div className="flex gap-1 mt-1 pl-0">
            {[0,1,2,3,4].map(c => (
              <div key={c} className="w-[52px] text-center text-xs text-gray-400">col {c}</div>
            ))}
          </div>
        </div>

        {/* 결과 패널 */}
        <div className="flex-1 space-y-3">
          {/* minMaxLoc 결과 */}
          <div className="rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-700 font-mono">
              cv2.minMaxLoc(image)
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{minVal}</div>
                <div>
                  <div className="text-xs font-bold text-blue-700">min_val = {minVal}</div>
                  <div className="text-xs text-gray-500">min_loc = ({minLoc?.[1]}, {minLoc?.[0]}) &nbsp;→ (col, row)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{maxVal}</div>
                <div>
                  <div className="text-xs font-bold text-red-700">max_val = {maxVal}</div>
                  <div className="text-xs text-gray-500">max_loc = ({maxLoc?.[1]}, {maxLoc?.[0]}) &nbsp;→ (col, row)</div>
                </div>
              </div>
            </div>
          </div>

          {/* 호버 정보 */}
          <div className={`rounded-xl border px-4 py-3 transition-all ${hovered ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'}`}>
            {hovered ? (
              <div className="text-xs space-y-1">
                <div className="font-bold text-yellow-700">📍 image[{hovered.r}, {hovered.c}] = {hovered.v}</div>
                <div className="text-gray-600">→ NumPy: image[행, 열] 순서</div>
                <div className="text-gray-600">→ minMaxLoc: (col, row) = ({hovered.c}, {hovered.r}) 순서 ⚠️</div>
              </div>
            ) : (
              <div className="text-xs text-gray-400">픽셀에 마우스를 올리면 좌표를 확인할 수 있습니다</div>
            )}
          </div>

          {/* 코드 */}
          <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">{`import cv2
import numpy as np

image = cv2.imread("photo.jpg",
         cv2.IMREAD_GRAYSCALE)

min_val, max_val, \\
  min_loc, max_loc = cv2.minMaxLoc(image)

# ⚠️  loc는 (x=col, y=row) 순서!
print(f"최솟값 {min_val} @ {min_loc}")
print(f"최댓값 {max_val} @ {max_loc}")`}</pre>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────── 2. mean / stdDev ── */
function MeanStdSection() {
  const [brightness, setBrightness] = useState(128);
  const [contrast, setContrast] = useState(60);

  // 가우시안 분포 픽셀 시뮬레이션 (20개)
  const pixels = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const gauss = Math.cos(angle) * contrast + brightness;
    return Math.max(0, Math.min(255, Math.round(gauss)));
  });

  const mean = pixels.reduce((a, b) => a + b, 0) / pixels.length;
  const variance = pixels.reduce((a, b) => a + (b - mean) ** 2, 0) / pixels.length;
  const std = Math.sqrt(variance);

  const low68 = mean - std;
  const hi68 = mean + std;

  return (
    <div className="space-y-4">
      {/* 슬라이더 */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: '평균 밝기 (mean)', val: brightness, set: setBrightness, color: 'blue' },
          { label: '표준편차 (std)',   val: contrast,   set: setContrast,   color: 'purple', max: 120 },
        ].map(({ label, val, set, color, max = 255 }) => (
          <div key={label}>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>{label}</span>
              <span className={`font-bold text-${color}-600`}>{val}</span>
            </div>
            <input type="range" min={0} max={max} value={val}
              onChange={e => set(Number(e.target.value))}
              className={`w-full accent-${color}-500`} />
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* 픽셀 스트립 + 분포 */}
        <div className="flex-1 space-y-2">
          {/* 픽셀값 막대 */}
          <div className="text-xs font-bold text-gray-600">샘플 픽셀 20개</div>
          <div className="flex gap-0.5 items-end h-20">
            {pixels.map((v, i) => {
              const inRange = v >= low68 && v <= hi68;
              return (
                <div key={i} className="flex-1 rounded-t transition-all"
                  style={{
                    height: `${(v / 255) * 100}%`,
                    backgroundColor: inRange ? '#7c3aed' : '#d1d5db',
                    minWidth: 6,
                  }} />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>0</span><span>밝기값 →</span><span>255</span>
          </div>

          {/* 0~255 범위 위에 mean±std 표시 */}
          <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
            {/* 전체 범위 */}
            <div className="absolute inset-0 flex items-center px-1">
              <div className="w-full h-2 bg-gray-200 rounded-full" />
            </div>
            {/* mean±std 범위 (보라) */}
            <div className="absolute top-1/2 -translate-y-1/2 h-3 bg-purple-400 rounded opacity-70"
              style={{
                left: `${Math.max(0, low68 / 255) * 100}%`,
                width: `${Math.min(100, (Math.min(255, hi68) - Math.max(0, low68)) / 255) * 100}%`,
              }} />
            {/* mean 선 */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-blue-600"
              style={{ left: `${(mean / 255) * 100}%` }} />
            {/* 레이블 */}
            <div className="absolute bottom-0.5 text-xs text-blue-700 font-bold -translate-x-1/2"
              style={{ left: `${(mean / 255) * 100}%` }}>μ</div>
          </div>

          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-600 inline-block" />mean = {mean.toFixed(1)}</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-400 inline-block" />μ±σ 범위 ({std.toFixed(1)})</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-gray-200 inline-block" />범위 밖</span>
          </div>
        </div>

        {/* 결과 + 코드 */}
        <div className="lg:w-56 space-y-3">
          <div className="rounded-xl border border-purple-200 bg-purple-50 p-3 space-y-2">
            <div className="text-xs font-bold text-purple-800 font-mono">cv2.meanStdDev()</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">mean</span>
                <span className="font-bold text-blue-700 font-mono">{mean.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">stdDev</span>
                <span className="font-bold text-purple-700 font-mono">{std.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">μ−σ</span>
                <span className="font-mono text-gray-700">{Math.max(0, low68).toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">μ+σ</span>
                <span className="font-mono text-gray-700">{Math.min(255, hi68).toFixed(1)}</span>
              </div>
            </div>
          </div>
          <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">{`mean, std = cv2.meanStdDev(img)
# 반환: (4,1) 배열 (채널별)
m = mean[0][0]   # 첫 채널
s = std[0][0]

# 활용: 대비 판단
# std 작으면 → 평탄한 영상
# std 크면  → 대비 높은 영상`}</pre>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────── 3. countNonZero ── */
function CountNonZeroSection() {
  const [threshold, setThreshold] = useState(128);
  const [showMask, setShowMask] = useState(false);

  const binary = GRID.map(row => row.map(v => v >= threshold ? 255 : 0));
  const nonZeroCount = binary.flat().filter(v => v > 0).length;
  const total = GRID.flat().length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>이진화 임계값 (threshold)</span>
            <span className="font-bold text-orange-600">{threshold}</span>
          </div>
          <input type="range" min={0} max={255} value={threshold}
            onChange={e => setThreshold(Number(e.target.value))}
            className="w-full accent-orange-500" />
        </div>
        <button onClick={() => setShowMask(!showMask)}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${showMask ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
          {showMask ? '원본 값' : '이진 값'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* 이진화 그리드 */}
        <div className="flex-shrink-0">
          <div className="text-xs font-bold text-gray-600 mb-2 text-center">
            이진화 결과 (≥{threshold} → 255, 나머지 → 0)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(5, 52px)`, gap: 4 }}>
            {binary.map((row, r) => row.map((bv, c) => {
              const ov = GRID[r][c];
              const isOne = bv > 0;
              return (
                <div key={`${r}-${c}`}
                  className="flex flex-col items-center justify-center rounded-lg transition-all"
                  style={{
                    width: 52, height: 52,
                    backgroundColor: isOne ? '#f59e0b' : '#1e293b',
                    border: isOne ? '2px solid #d97706' : '2px solid #334155',
                  }}>
                  <span className="text-xs font-bold" style={{ color: isOne ? '#1e293b' : '#64748b' }}>
                    {showMask ? bv : ov}
                  </span>
                  {isOne && <span className="text-xs font-bold" style={{ color: '#1e293b' }}>✓</span>}
                </div>
              );
            }))}
          </div>
        </div>

        {/* 결과 패널 */}
        <div className="flex-1 space-y-3">
          {/* 도넛 차트 느낌 */}
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
            <div className="text-xs font-bold text-orange-800 font-mono mb-3">cv2.countNonZero(binary)</div>
            <div className="flex items-center gap-4">
              {/* 원형 비율 시각화 */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#fed7aa" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="4"
                    strokeDasharray={`${(nonZeroCount / total) * 100} 100`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-700">{Math.round(nonZeroCount / total * 100)}%</span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-400" />
                  <span className="text-gray-700">Non-Zero: <strong className="text-orange-700">{nonZeroCount}</strong>개</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-800" />
                  <span className="text-gray-700">Zero:     <strong className="text-slate-600">{total - nonZeroCount}</strong>개</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gray-300" />
                  <span className="text-gray-700">전체:     <strong>{total}</strong>개</span>
                </div>
              </div>
            </div>
          </div>

          <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed">{`import cv2

# 이진화 먼저
_, binary = cv2.threshold(
    gray, ${threshold}, 255, cv2.THRESH_BINARY)

# 0이 아닌 픽셀 수 계산
count = cv2.countNonZero(binary)
# → ${nonZeroCount}개 (전체 ${total}개 중)

# 활용: 마스크 면적, 객체 크기 측정
ratio = count / binary.size  # ${(nonZeroCount/total).toFixed(3)}`}</pre>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────── 4. 행렬 연산 ── */
const MAT_A = [[1, 2, 3], [4, 5, 6]];
const MAT_B = [[7, 8], [9, 10], [11, 12]];

function MatrixBox({ mat, label, highlight, color = 'blue' }) {
  const colors = {
    blue:   { bg: 'bg-blue-50',   border: 'border-blue-300',   text: 'text-blue-800',   cell: 'bg-blue-100'   },
    green:  { bg: 'bg-green-50',  border: 'border-green-300',  text: 'text-green-800',  cell: 'bg-green-100'  },
    orange: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-800', cell: 'bg-orange-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-800', cell: 'bg-purple-100' },
  };
  const c = colors[color];
  return (
    <div className={`rounded-xl border-2 ${c.border} ${c.bg} p-3`}>
      <div className={`text-xs font-bold ${c.text} mb-2 font-mono`}>{label}</div>
      <div className="inline-flex flex-col gap-1">
        {mat.map((row, r) => (
          <div key={r} className="flex gap-1">
            {row.map((v, cc) => (
              <div key={cc}
                className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-all ${
                  highlight?.r === r || highlight?.c === cc ? c.cell : 'bg-white'
                }`}>
                {v}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={`text-xs ${c.text} mt-1.5 font-mono opacity-70`}>
        {mat.length}×{mat[0].length}
      </div>
    </div>
  );
}

function MatOpsSection() {
  const [op, setOp] = useState('gemm');

  // gemm: A(2×3) × B(3×2) = C(2×2)
  const gemmResult = MAT_A.map(row =>
    Array.from({ length: MAT_B[0].length }, (_, c) =>
      row.reduce((sum, v, k) => sum + v * MAT_B[k][c], 0)
    )
  );

  // transpose: A(2×3) → AT(3×2)
  const transposeResult = MAT_A[0].map((_, c) => MAT_A.map(row => row[c]));

  // determinant: 2×2 예시
  const DET_MAT = [[3, 8], [4, 6]];
  const det = DET_MAT[0][0] * DET_MAT[1][1] - DET_MAT[0][1] * DET_MAT[1][0];

  return (
    <div className="space-y-4">
      {/* 연산 선택 */}
      <div className="flex gap-2 flex-wrap">
        {[
          ['gemm', '행렬 곱 (gemm)'],
          ['transpose', '전치 (transpose)'],
          ['det', '행렬식 (determinant)'],
        ].map(([id, lb]) => (
          <button key={id} onClick={() => setOp(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${op === id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-indigo-50'}`}>
            {lb}
          </button>
        ))}
      </div>

      {op === 'gemm' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">α×A×B + β×C = 결과 &nbsp;|&nbsp; flags=0이면 A(2×3) × B(3×2) → C(2×2)</div>
          {/* 행렬 시각화 */}
          <div className="flex items-center gap-3 flex-wrap">
            <MatrixBox mat={MAT_A} label="src1 (2×3)" color="blue" />
            <div className="text-2xl font-bold text-gray-400">×</div>
            <MatrixBox mat={MAT_B} label="src2 (3×2)" color="green" />
            <div className="text-2xl font-bold text-gray-400">=</div>
            <MatrixBox mat={gemmResult} label="dst (2×2)" color="orange" />
          </div>
          {/* 계산 과정 시각화 */}
          <div className="bg-gray-50 rounded-xl p-3 text-xs space-y-1">
            <div className="font-bold text-gray-700 mb-2">계산 과정 (dst[0][0]):</div>
            <div className="font-mono text-gray-600">
              {MAT_A[0].map((v, k) => `${v}×${MAT_B[k][0]}`).join(' + ')} = <strong className="text-orange-700">{gemmResult[0][0]}</strong>
            </div>
            <div className="font-mono text-gray-600">
              {MAT_A[0].map((v, k) => `${v}×${MAT_B[k][1]}`).join(' + ')} = <strong className="text-orange-700">{gemmResult[0][1]}</strong>
            </div>
          </div>
          <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">{`src1 = np.array([[1,2,3],[4,5,6]], np.float32)
src2 = np.array([[7,8],[9,10],[11,12]], np.float32)

# α=1, β=0 → 단순 행렬 곱
dst = cv2.gemm(src1, src2, 1.0, None, 0.0)
# GEMM_1_T: src1 전치 후 곱
# GEMM_2_T: src2 전치 후 곱`}</pre>
        </div>
      )}

      {op === 'transpose' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">행(row)과 열(col)을 바꿉니다. A(2×3) → Aᵀ(3×2)</div>
          <div className="flex items-center gap-4 flex-wrap">
            <MatrixBox mat={MAT_A} label="원본 A (2×3)" color="blue" />
            <div className="flex flex-col items-center gap-1">
              <div className="text-2xl font-bold text-gray-400">→</div>
              <div className="text-xs text-gray-500 font-mono">transpose</div>
            </div>
            <MatrixBox mat={transposeResult} label="Aᵀ (3×2)" color="purple" />
          </div>
          {/* 전치 애니메이션 힌트 */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs space-y-1">
            <div className="font-bold text-purple-800">전치 규칙: Aᵀ[j][i] = A[i][j]</div>
            <div className="text-purple-600">A[0][0]=1 → Aᵀ[0][0]=1 &nbsp;|&nbsp; A[0][1]=2 → Aᵀ[1][0]=2</div>
            <div className="text-purple-600">A[1][2]=6 → Aᵀ[2][1]=6</div>
          </div>
          <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">{`# 방법 1: OpenCV
dst = cv2.transpose(src)

# 방법 2: NumPy
dst = src.T
dst = np.transpose(src)

# 영상에서: 상하 반전 대신 전치 사용 시
# 가로·세로 바뀜 주의!`}</pre>
        </div>
      )}

      {op === 'det' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">정방행렬(n×n)의 행렬식 — 역행렬 존재 여부 판단</div>
          <div className="flex flex-col lg:flex-row gap-4">
            <MatrixBox mat={DET_MAT} label="M (2×2)" color="blue" />
            <div className="flex-1 space-y-2">
              {/* 2×2 행렬식 시각화 */}
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="text-xs font-bold text-blue-800 mb-3">2×2 행렬식 공식</div>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  <span className="font-mono font-bold text-blue-700">det(M)</span>
                  <span className="text-gray-500">=</span>
                  <span className="font-mono bg-green-100 text-green-800 px-2 py-1 rounded">{DET_MAT[0][0]}×{DET_MAT[1][1]}</span>
                  <span className="text-gray-500">−</span>
                  <span className="font-mono bg-red-100 text-red-800 px-2 py-1 rounded">{DET_MAT[0][1]}×{DET_MAT[1][0]}</span>
                  <span className="text-gray-500">=</span>
                  <span className={`font-mono font-bold px-2 py-1 rounded ${det !== 0 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                    {det}
                  </span>
                </div>
                <div className={`mt-2 text-xs font-bold ${det !== 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {det !== 0 ? `✅ det ≠ 0 → 역행렬 존재` : `❌ det = 0 → 역행렬 없음 (특이행렬)`}
                </div>
              </div>
              <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">{`M = np.array([[3,8],[4,6]], np.float64)

d = cv2.determinant(M)
# → ${det.toFixed(1)}

# det ≠ 0이면 역행렬 계산 가능
if d != 0:
    ret, inv = cv2.invert(M)
    # inv: M의 역행렬`}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────── 메인 ── */
export default function StatsDiagram() {
  const [tab, setTab] = useState('minmax');

  const tabs = [
    { id: 'minmax',    icon: '🎯', label: 'minMaxLoc',   sub: '최솟·최댓값 위치' },
    { id: 'mean',      icon: '📊', label: 'mean/stdDev', sub: '평균·표준편차' },
    { id: 'nonzero',   icon: '🔢', label: 'countNonZero', sub: '비제로 픽셀 수' },
    { id: 'matrix',    icon: '🔲', label: '행렬 연산',   sub: 'gemm·transpose' },
  ];

  return (
    <div className="space-y-3">
      {/* 탭 */}
      <div className="flex gap-1.5 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all ${tab === t.id ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}>
            <span>{t.icon} {t.label}</span>
            <div className={`font-normal mt-0.5 text-xs ${tab === t.id ? 'opacity-70' : 'text-gray-400'}`}>{t.sub}</div>
          </button>
        ))}
      </div>

      {/* 내용 */}
      <div className="min-h-[300px]">
        {tab === 'minmax'  && <MinMaxSection />}
        {tab === 'mean'    && <MeanStdSection />}
        {tab === 'nonzero' && <CountNonZeroSection />}
        {tab === 'matrix'  && <MatOpsSection />}
      </div>
    </div>
  );
}
