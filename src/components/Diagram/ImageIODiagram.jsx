import { useState } from 'react';

/* ── 화살표 ── */
function Arrow({ label = '' }) {
  return (
    <div className="flex flex-col items-center justify-center mx-1 flex-shrink-0">
      <div className="flex items-center gap-0.5">
        <div className="w-8 h-0.5 bg-gray-400" />
        <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-transparent border-l-gray-400" style={{borderLeftWidth:8}} />
      </div>
      {label && <div className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">{label}</div>}
    </div>
  );
}

/* ── 노드 박스 ── */
function Node({ icon, label, sub, color = 'blue', onClick, active }) {
  const colors = {
    blue:   'bg-blue-50 border-blue-400 text-blue-800',
    green:  'bg-green-50 border-green-400 text-green-800',
    orange: 'bg-orange-50 border-orange-400 text-orange-800',
    purple: 'bg-purple-50 border-purple-400 text-purple-800',
    gray:   'bg-gray-50 border-gray-400 text-gray-700',
    red:    'bg-red-50 border-red-400 text-red-800',
    cyan:   'bg-cyan-50 border-cyan-400 text-cyan-800',
  };
  return (
    <div
      onClick={onClick}
      className={`border-2 rounded-xl px-3 py-2.5 flex flex-col items-center gap-1 min-w-[80px] cursor-pointer transition-all ${colors[color]} ${active ? 'ring-2 ring-offset-1 ring-blue-400 shadow-md scale-105' : 'hover:shadow hover:scale-105'}`}
    >
      <span className="text-xl">{icon}</span>
      <div className="text-xs font-bold text-center leading-tight">{label}</div>
      {sub && <div className="text-xs opacity-60 text-center leading-tight">{sub}</div>}
    </div>
  );
}

/* ── 코드 블록 ── */
function CodeBox({ code }) {
  return (
    <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 overflow-x-auto font-mono leading-relaxed">
      {code}
    </pre>
  );
}

/* ── 플래그 테이블 ── */
const IMREAD_FLAGS = [
  { flag: 'IMREAD_COLOR',     val: '1',  shape: '(H, W, 3)', dtype: 'uint8', desc: '컬러(BGR) 3채널 — 기본값' },
  { flag: 'IMREAD_GRAYSCALE', val: '0',  shape: '(H, W)',    dtype: 'uint8', desc: '그레이스케일 1채널' },
  { flag: 'IMREAD_UNCHANGED', val: '-1', shape: '원본 그대로', dtype: '원본', desc: '알파 채널 포함 가능' },
];

/* ── 포맷 테이블 ── */
const IMWRITE_PARAMS = [
  { ext: '.jpg', param: 'IMWRITE_JPEG_QUALITY', range: '0~100', def: '95', note: '낮을수록 용량↓, 화질↓' },
  { ext: '.png', param: 'IMWRITE_PNG_COMPRESSION', range: '0~9', def: '1',  note: '높을수록 압축↑, 속도↓' },
  { ext: '.bmp', param: '(없음)',              range: '-',    def: '-',  note: '무압축, 용량 최대' },
];

/* ──────────────────────────────── TAB 1: 영상 읽기 ── */
function ReadImageTab() {
  const [activeNode, setActiveNode] = useState(null);
  const [selectedFlag, setSelectedFlag] = useState(0);

  const details = {
    file: {
      title: '영상 파일',
      body: '지원 포맷: JPEG, PNG, BMP, TIFF, WebP 등\n파일 경로는 절대/상대 경로 모두 가능',
      code: `# 파일이 없으면 None 반환 (예외 없음!)
img = cv2.imread("images/photo.jpg")
if img is None:
    raise Exception("파일 읽기 실패")`
    },
    imread: {
      title: 'cv2.imread()',
      body: '파일 → NumPy ndarray 변환\n두 번째 인수(flag)로 읽기 방식 지정',
      code: `# flag 생략 시 IMREAD_COLOR 기본값
gray  = cv2.imread(path, cv2.IMREAD_GRAYSCALE)  # flag=0
color = cv2.imread(path, cv2.IMREAD_COLOR)       # flag=1
alpha = cv2.imread(path, cv2.IMREAD_UNCHANGED)   # flag=-1`
    },
    mat: {
      title: 'NumPy ndarray (Mat)',
      body: 'OpenCV 영상 = NumPy 배열\nshape: (H, W) 또는 (H, W, C)',
      code: `img = cv2.imread("photo.jpg")
print(img.shape)   # (480, 640, 3)  H × W × C
print(img.dtype)   # uint8  (0~255)
print(img.size)    # 921600 bytes

# BGR 채널 순서 (RGB가 아님!)
b, g, r = img[y, x]  # 한 픽셀`
    },
    imshow: {
      title: 'cv2.imshow()',
      body: '윈도우에 영상 표시\nwaitKey + destroyAllWindows 필수',
      code: `cv2.imshow("창 이름", img)
key = cv2.waitKey(0)    # 0 = 무한 대기
# waitKey(30) → 30ms 대기 (동영상용)
cv2.destroyAllWindows()`
    },
  };

  return (
    <div className="space-y-4">
      {/* 파이프라인 흐름 */}
      <div className="flex items-center justify-center gap-1 flex-wrap py-2">
        {[
          ['file',   '📁', '영상 파일', '.jpg .png .bmp', 'orange'],
          ['imread', '⚙️', 'cv2.imread()', 'path, flag', 'blue'],
          ['mat',    '🔢', 'ndarray', '(H,W,C) uint8', 'green'],
          ['imshow', '🖥️', 'cv2.imshow()', '창에 표시',    'purple'],
        ].map(([id, icon, label, sub, color], i) => (
          <>
            {i > 0 && <Arrow key={`arr-${i}`} />}
            <Node key={id} icon={icon} label={label} sub={sub} color={color}
              active={activeNode === id}
              onClick={() => setActiveNode(activeNode === id ? null : id)} />
          </>
        ))}
      </div>

      {/* 선택 노드 상세 */}
      {activeNode && details[activeNode] && (
        <div className="border border-blue-200 rounded-xl p-4 bg-blue-50 space-y-2 animate-fade-in">
          <div className="font-bold text-blue-800 text-sm">{details[activeNode].title}</div>
          <div className="text-xs text-blue-700 whitespace-pre-line">{details[activeNode].body}</div>
          <CodeBox code={details[activeNode].code} />
        </div>
      )}
      {!activeNode && (
        <div className="text-center text-xs text-gray-400 py-1">↑ 노드를 클릭하면 상세 설명이 표시됩니다</div>
      )}

      {/* IMREAD 플래그 비교 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-700">imread 플래그(flag) 비교</div>
        <div className="flex border-b border-gray-200">
          {IMREAD_FLAGS.map((f, i) => (
            <button key={i} onClick={() => setSelectedFlag(i)}
              className={`flex-1 py-2 text-xs font-mono font-medium border-r last:border-r-0 transition-colors ${selectedFlag === i ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-blue-50'}`}>
              {f.flag.replace('IMREAD_', '')}
            </button>
          ))}
        </div>
        <div className="p-4 flex gap-4 items-start">
          {/* 시각적 영상 표현 */}
          <div className="flex-shrink-0">
            {selectedFlag === 0 && (
              <div className="w-20 h-20 rounded-lg overflow-hidden grid grid-cols-4 grid-rows-4 gap-px bg-gray-200">
                {[...Array(16)].map((_, i) => (
                  <div key={i} style={{backgroundColor:`rgb(${i*8+80},${(i*5+60)%200},${(i*11+40)%180})`}} />
                ))}
              </div>
            )}
            {selectedFlag === 1 && (
              <div className="w-20 h-20 rounded-lg overflow-hidden grid grid-cols-4 grid-rows-4 gap-px bg-gray-200">
                {[...Array(16)].map((_, i) => {
                  const v = i * 14 + 30;
                  return <div key={i} style={{backgroundColor:`rgb(${v},${v},${v})`}} />;
                })}
              </div>
            )}
            {selectedFlag === 2 && (
              <div className="w-20 h-20 rounded-lg overflow-hidden grid grid-cols-4 grid-rows-4 gap-px"
                style={{ background: 'linear-gradient(135deg, rgba(100,150,200,0.8), rgba(200,100,100,0.4))' }}>
                {[...Array(16)].map((_, i) => (
                  <div key={i} style={{
                    backgroundColor: `rgba(${i*8+80},${(i*5+60)%200},${(i*11+40)%180},${0.4+i*0.03})`
                  }} />
                ))}
              </div>
            )}
          </div>
          {/* 상세 */}
          <div className="flex-1 space-y-1">
            <div className="font-mono text-xs font-bold text-blue-700">cv2.{IMREAD_FLAGS[selectedFlag].flag}</div>
            <div className="flex gap-2">
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">flag={IMREAD_FLAGS[selectedFlag].val}</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-mono">{IMREAD_FLAGS[selectedFlag].shape}</span>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-mono">{IMREAD_FLAGS[selectedFlag].dtype}</span>
            </div>
            <div className="text-xs text-gray-600 mt-1">{IMREAD_FLAGS[selectedFlag].desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────── TAB 2: 영상 쓰기 ── */
function WriteImageTab() {
  const [activeParam, setActiveParam] = useState(0);
  const [quality, setQuality] = useState(95);

  return (
    <div className="space-y-4">
      {/* 파이프라인 */}
      <div className="flex items-center justify-center gap-1 flex-wrap py-2">
        <Node icon="🔢" label="ndarray" sub="(H,W,C) uint8" color="green" />
        <Arrow />
        <Node icon="⚙️" label="cv2.imwrite()" sub="path, img, params" color="blue" />
        <Arrow />
        <Node icon="💾" label="영상 파일" sub=".jpg .png .bmp" color="orange" />
      </div>

      {/* 포맷별 파라미터 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-700">저장 포맷별 파라미터</div>
        <div className="flex border-b border-gray-200">
          {IMWRITE_PARAMS.map((p, i) => (
            <button key={i} onClick={() => setActiveParam(i)}
              className={`flex-1 py-2 text-xs font-mono font-bold border-r last:border-r-0 transition-colors ${activeParam === i ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-blue-50'}`}>
              {p.ext}
            </button>
          ))}
        </div>
        <div className="p-4 space-y-2">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-mono">{IMWRITE_PARAMS[activeParam].param}</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">범위: {IMWRITE_PARAMS[activeParam].range}</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">기본값: {IMWRITE_PARAMS[activeParam].def}</span>
          </div>
          <div className="text-xs text-gray-600">{IMWRITE_PARAMS[activeParam].note}</div>
        </div>
      </div>

      {/* JPEG 품질 슬라이더 */}
      <div className="border border-gray-200 rounded-xl p-4 space-y-3">
        <div className="text-xs font-bold text-gray-700">JPEG 화질 시뮬레이션</div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-12">quality</span>
          <input type="range" min={1} max={100} value={quality}
            onChange={e => setQuality(Number(e.target.value))}
            className="flex-1 accent-blue-500" />
          <span className="text-sm font-bold text-blue-700 w-8">{quality}</span>
        </div>
        {/* 화질 시각화: 블록 노이즈 시뮬레이션 */}
        <div className="flex gap-3 items-center">
          <div className="w-24 h-24 rounded overflow-hidden flex-shrink-0 relative">
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, #e06060 0%, #60a0e0 50%, #60e0a0 100%)',
              filter: quality < 30 ? `blur(${(30-quality)*0.15}px)` : 'none',
            }}/>
            {/* 블록 아티팩트 시뮬레이션 */}
            {quality < 50 && (
              <div className="absolute inset-0 opacity-40" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent ${Math.max(4, 12-quality/5)}px, rgba(0,0,0,0.1) ${Math.max(4,12-quality/5)}px, rgba(0,0,0,0.1) ${Math.max(5,13-quality/5)}px)`,
              }}/>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className={`text-xs font-bold ${quality >= 80 ? 'text-green-600' : quality >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
              {quality >= 80 ? '✅ 고화질' : quality >= 40 ? '⚠️ 중화질' : '❌ 저화질 (아티팩트 발생)'}
            </div>
            <div className="text-xs text-gray-500">
              예상 파일 크기: <span className="font-mono text-blue-700">~{Math.round(quality * 0.9 + 10)}KB</span> <span className="text-gray-400">(640×480 기준)</span>
            </div>
            <CodeBox code={`cv2.imwrite("out.jpg", img,\n    [cv2.IMWRITE_JPEG_QUALITY, ${quality}])`} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────── TAB 3: 카메라 ── */
function CameraTab() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      label: '① VideoCapture(0)',
      icon: '📷',
      color: 'orange',
      desc: '0번 카메라(웹캠)를 엽니다. 두 번째 카메라는 VideoCapture(1).',
      code: `capture = cv2.VideoCapture(0)
if not capture.isOpened():
    raise Exception("카메라 연결 안됨")

# 카메라 속성 읽기
w   = capture.get(cv2.CAP_PROP_FRAME_WIDTH)   # 너비
h   = capture.get(cv2.CAP_PROP_FRAME_HEIGHT)  # 높이
fps = capture.get(cv2.CAP_PROP_FPS)           # 초당 프레임
exp = capture.get(cv2.CAP_PROP_EXPOSURE)      # 노출`
    },
    {
      label: '② capture.read()',
      icon: '🎞️',
      color: 'blue',
      desc: '한 프레임을 읽습니다. ret=True면 성공, frame에 영상 배열이 담깁니다.',
      code: `while True:
    ret, frame = capture.read()
    if not ret: break          # 읽기 실패 → 종료
    if cv2.waitKey(30) >= 0: break  # 키 입력 → 종료

    # frame: (H, W, 3) uint8 BGR 배열`
    },
    {
      label: '③ 영상 처리',
      icon: '⚙️',
      color: 'purple',
      desc: '매 프레임을 실시간으로 처리합니다. 그레이스케일 변환, 필터 등 적용 가능.',
      code: `# 그레이스케일 변환
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

# 텍스트 오버레이
cv2.putText(frame, f"EXPOS: {exp}",
            (10, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7, (120, 200, 90), 2)`
    },
    {
      label: '④ imshow + 해제',
      icon: '🖥️',
      color: 'green',
      desc: '처리된 프레임을 화면에 표시합니다. 루프 종료 후 반드시 release() 호출.',
      code: `    cv2.imshow("Camera", frame)

# 루프 종료 후 자원 해제
capture.release()
cv2.destroyAllWindows()   # ← 필수!`
    },
  ];

  return (
    <div className="space-y-4">
      {/* 스텝 네비게이션 */}
      <div className="flex gap-2 justify-center">
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${step === i ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}>
            {i + 1}
          </button>
        ))}
      </div>

      {/* 전체 파이프라인 (작은 박스) */}
      <div className="flex items-center justify-center gap-1 flex-wrap">
        {steps.map((s, i) => (
          <>
            {i > 0 && <Arrow key={`a${i}`} />}
            <Node key={i} icon={s.icon} label={s.label.replace(/^[①②③④]\s*/, '')}
              color={s.color} active={step === i} onClick={() => setStep(i)} />
          </>
        ))}
      </div>

      {/* 현재 스텝 상세 */}
      <div className="border border-blue-200 rounded-xl p-4 bg-blue-50 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{steps[step].icon}</span>
          <div className="font-bold text-blue-800 text-sm">{steps[step].label}</div>
        </div>
        <div className="text-xs text-blue-700">{steps[step].desc}</div>
        <CodeBox code={steps[step].code} />
      </div>

      {/* CAP_PROP 속성 표 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-700">주요 CAP_PROP 속성</div>
        <table className="w-full text-xs">
          <thead className="bg-gray-50"><tr>
            <th className="px-3 py-2 text-left text-gray-600">속성</th>
            <th className="px-3 py-2 text-left text-gray-600">설명</th>
            <th className="px-3 py-2 text-left text-gray-600">get/set</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['FRAME_WIDTH', '프레임 너비 (픽셀)', '✅/✅'],
              ['FRAME_HEIGHT','프레임 높이 (픽셀)', '✅/✅'],
              ['FPS',         '초당 프레임 수',     '✅/✅'],
              ['EXPOSURE',    '노출값',             '✅/✅'],
              ['BRIGHTNESS',  '밝기',               '✅/✅'],
              ['POS_FRAMES',  '현재 프레임 번호(동영상)', '✅/✅'],
            ].map(([prop, desc, flag]) => (
              <tr key={prop} className="hover:bg-gray-50">
                <td className="px-3 py-2 font-mono text-blue-700">CAP_PROP_{prop}</td>
                <td className="px-3 py-2 text-gray-700">{desc}</td>
                <td className="px-3 py-2 text-gray-500 font-mono">{flag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ──────────────────────────────── TAB 4: 동영상 읽기/쓰기 ── */
function VideoTab() {
  const [mode, setMode] = useState('read');
  const [fps, setFps] = useState(30);

  return (
    <div className="space-y-4">
      {/* 읽기/쓰기 모드 전환 */}
      <div className="flex rounded-xl overflow-hidden border border-gray-300">
        <button onClick={() => setMode('read')}
          className={`flex-1 py-2 text-xs font-bold transition-colors ${mode === 'read' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-blue-50'}`}>
          📥 동영상 읽기 (VideoCapture)
        </button>
        <button onClick={() => setMode('write')}
          className={`flex-1 py-2 text-xs font-bold transition-colors ${mode === 'write' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-green-50'}`}>
          📤 동영상 쓰기 (VideoWriter)
        </button>
      </div>

      {mode === 'read' && (
        <div className="space-y-3">
          {/* 파이프라인 */}
          <div className="flex items-center justify-center gap-1 flex-wrap py-1">
            <Node icon="🎬" label="동영상 파일" sub=".avi .mp4" color="orange" />
            <Arrow />
            <Node icon="⚙️" label="VideoCapture" sub="(파일경로)" color="blue" />
            <Arrow label="read()" />
            <Node icon="🎞️" label="frame" sub="(H,W,3)" color="green" />
            <Arrow />
            <Node icon="⚙️" label="채널 처리" sub="split/merge" color="purple" />
            <Arrow />
            <Node icon="🖥️" label="imshow" sub="재생" color="cyan" />
          </div>

          <CodeBox code={`import cv2

capture = cv2.VideoCapture("video_file.avi")
if not capture.isOpened():
    raise Exception("동영상 파일 개방 안됨")

fps   = capture.get(cv2.CAP_PROP_FPS)    # 초당 프레임 수
delay = int(1000 / fps)                   # ms 단위 지연
frame_cnt = 0

while True:
    ret, frame = capture.read()
    if not ret: break
    if cv2.waitKey(delay) >= 0: break     # 키 입력으로 종료

    # 채널별 밝기 조절 (교재 20.read_video_file.py)
    blue, green, red = cv2.split(frame)
    if 100 <= frame_cnt < 200:
        cv2.add(blue, 100, blue)           # blue 채널 밝기 ↑
    elif 200 <= frame_cnt < 300:
        cv2.add(green, 100, green)         # green 채널 밝기 ↑
    frame = cv2.merge([blue, green, red])

    frame_cnt += 1
    cv2.imshow("Video", frame)

capture.release()
cv2.destroyAllWindows()`} />
        </div>
      )}

      {mode === 'write' && (
        <div className="space-y-3">
          {/* 파이프라인 */}
          <div className="flex items-center justify-center gap-1 flex-wrap py-1">
            <Node icon="📷" label="카메라" sub="VideoCapture(0)" color="orange" />
            <Arrow label="read()" />
            <Node icon="🎞️" label="frame" sub="(H,W,3)" color="green" />
            <Arrow label="write()" />
            <Node icon="⚙️" label="VideoWriter" sub="코덱·FPS·크기" color="blue" />
            <Arrow />
            <Node icon="💾" label=".avi 파일" sub="저장 완료" color="gray" />
          </div>

          {/* FPS 슬라이더 */}
          <div className="border border-gray-200 rounded-xl p-4 space-y-2">
            <div className="text-xs font-bold text-gray-700">FPS 설정 시뮬레이션</div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-8">FPS</span>
              <input type="range" min={5} max={60} value={fps}
                onChange={e => setFps(Number(e.target.value))}
                className="flex-1 accent-green-500" />
              <span className="text-sm font-bold text-green-700 w-10">{fps}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-mono font-bold text-blue-700">{fps} fps</div>
                <div className="text-gray-500">초당 프레임 수</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-mono font-bold text-orange-700">{Math.round(1000/fps)} ms</div>
                <div className="text-gray-500">프레임 간격</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="font-mono font-bold text-green-700">{fps*60}장</div>
                <div className="text-gray-500">1분 총 프레임</div>
              </div>
            </div>
          </div>

          <CodeBox code={`import cv2

fps    = ${fps}                        # 초당 프레임 수
delay  = round(1000 / fps)             # = ${Math.round(1000/fps)}ms
size   = (640, 360)                    # 해상도 (W, H)
fourcc = cv2.VideoWriter_fourcc(*'DX50')  # MPEG-4 코덱

capture = cv2.VideoCapture(0)
writer  = cv2.VideoWriter(
    "output.avi", fourcc, fps, size)

while True:
    ret, frame = capture.read()
    if not ret: break
    if cv2.waitKey(delay) >= 0: break

    writer.write(frame)               # 프레임 저장
    cv2.imshow("Recording", frame)

writer.release()                      # ← 반드시 해제!
capture.release()
cv2.destroyAllWindows()`} />

          {/* 주요 FourCC */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-700">주요 FourCC 코덱</div>
            <table className="w-full text-xs">
              <thead className="bg-gray-50"><tr>
                <th className="px-3 py-2 text-left text-gray-600">코드</th>
                <th className="px-3 py-2 text-left text-gray-600">형식</th>
                <th className="px-3 py-2 text-left text-gray-600">특징</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["'D','X','5','0'", 'AVI/MPEG-4', '범용, Windows 호환'],
                  ["'X','2','6','4'", 'MP4/H.264',  '고압축, 고화질'],
                  ["'M','J','P','G'", 'AVI/MJPEG',  '프레임별 JPEG 압축'],
                  ["'H','2','6','4'", 'MP4/H.264',  'H.264 표준'],
                ].map(([code, fmt, desc]) => (
                  <tr key={code} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-mono text-blue-700">*'{code.replace(/['"]/g,'')}'</td>
                    <td className="px-3 py-2 text-gray-700">{fmt}</td>
                    <td className="px-3 py-2 text-gray-500">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────── 메인 컴포넌트 ── */
export default function ImageIODiagram() {
  const [tab, setTab] = useState('read');

  const tabs = [
    { id: 'read',   label: '📥 영상 읽기',  sub: 'imread' },
    { id: 'write',  label: '📤 영상 쓰기',  sub: 'imwrite' },
    { id: 'camera', label: '📷 카메라',     sub: 'VideoCapture(0)' },
    { id: 'video',  label: '🎬 동영상',     sub: 'VideoCapture / Writer' },
  ];

  return (
    <div className="space-y-3">
      {/* 탭 */}
      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${tab === t.id ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}>
            <div>{t.label}</div>
            <div className={`font-mono font-normal mt-0.5 ${tab === t.id ? 'opacity-70' : 'text-gray-400'}`}>{t.sub}</div>
          </button>
        ))}
      </div>

      {/* 내용 */}
      {tab === 'read'   && <ReadImageTab />}
      {tab === 'write'  && <WriteImageTab />}
      {tab === 'camera' && <CameraTab />}
      {tab === 'video'  && <VideoTab />}
    </div>
  );
}
