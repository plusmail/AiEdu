import { useState } from 'react';

function Code({ children }) {
  return <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{children}</pre>;
}
function Tag({ color = 'blue', children }) {
  const c = { blue:'bg-blue-100 text-blue-800', red:'bg-red-100 text-red-800', green:'bg-green-100 text-green-800', orange:'bg-orange-100 text-orange-800', purple:'bg-purple-100 text-purple-800', gray:'bg-gray-100 text-gray-700' };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${c[color]}`}>{children}</span>;
}

/* ══════════════════════════════
   TAB 1: 회선(Convolution) 원리 (01.blurring)
══════════════════════════════ */
const SRC = [[10,20,30,20,10],[20,40,80,40,20],[30,80,200,80,30],[20,40,80,40,20],[10,20,30,20,10]];
const KERNEL = [[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]];

function ConvTab() {
  const [cy, setCy] = useState(2);
  const [cx, setCx] = useState(2);

  const roi = Array.from({length:3},(_,r)=>Array.from({length:3},(_,c)=>SRC[cy-1+r]?.[cx-1+c]??0));
  const result = Math.round(roi.flat().reduce((s,v,i)=>s+v*KERNEL.flat()[i],0));

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
        💡 <strong>회선(Convolution)</strong> = 커널을 입력 행렬 위에 슬라이딩하며 원소별 곱의 합 계산
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* 5×5 입력 영상 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">입력 (5×5) — 클릭으로 중심 이동</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,44px)',gap:3}}>
            {SRC.map((row,r)=>row.map((v,c)=>{
              const isRoi = Math.abs(r-cy)<=1 && Math.abs(c-cx)<=1;
              const isCenter = r===cy && c===cx;
              return (
                <div key={`${r}${c}`} onClick={()=>{if(r>0&&r<4&&c>0&&c<4){setCy(r);setCx(c);}}}
                  className="flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-all select-none"
                  style={{width:44,height:44,
                    backgroundColor: isCenter?'#3b82f6':isRoi?'#bfdbfe':`rgb(${v},${v},${v})`,
                    color: isCenter?'white':isRoi?'#1e40af':(v>128?'#111':'#eee'),
                    transform: isRoi?'scale(1.05)':'scale(1)',
                    border: isCenter?'3px solid #1d4ed8':isRoi?'2px solid #3b82f6':'2px solid transparent',
                  }}>
                  {v}
                </div>
              );
            }))}
          </div>
          <div className="text-xs text-gray-400 mt-1 text-center">내부 픽셀 클릭 → 커널 이동</div>
        </div>

        {/* 커널 × ROI */}
        <div className="space-y-3 flex-1">
          <div className="text-xs font-bold text-gray-600">3×3 블러링 커널 × ROI</div>
          <div className="flex items-center gap-2">
            {/* 커널 */}
            <div className="flex flex-col gap-0.5">
              {KERNEL.map((row,r)=>(
                <div key={r} className="flex gap-0.5">
                  {row.map((v,c)=>(
                    <div key={c} className="w-10 h-8 bg-orange-100 border border-orange-300 rounded flex items-center justify-center text-xs font-mono text-orange-800">
                      1/9
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <span className="text-lg font-bold text-gray-400">×</span>
            {/* ROI */}
            <div className="flex flex-col gap-0.5">
              {roi.map((row,r)=>(
                <div key={r} className="flex gap-0.5">
                  {row.map((v,c)=>(
                    <div key={c} className="w-10 h-8 bg-blue-100 border border-blue-300 rounded flex items-center justify-center text-xs font-mono text-blue-800">{v}</div>
                  ))}
                </div>
              ))}
            </div>
            <span className="text-lg font-bold text-gray-400">=</span>
            {/* 결과 */}
            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow">{result}</div>
          </div>
          <div className="text-xs text-gray-500">
            합계 = {roi.flat().map((v,i)=>`${v}×(1/9)`).slice(0,3).join(' + ')} + ... = <strong className="text-green-700">{result}</strong>
          </div>

          {/* 4가지 블러 비교 */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              {name:'평균 블러', fn:'cv2.blur(img,(5,5))', desc:'모든 가중치 동일\n→ 빠르지만 흐릿함'},
              {name:'가우시안', fn:'cv2.GaussianBlur(img,(5,5),0)', desc:'중앙 가중치 큼\n→ 자연스러운 블러'},
              {name:'미디언', fn:'cv2.medianBlur(img,5)', desc:'중앙값 선택\n→ 점잡음(소금후추) 제거'},
              {name:'양방향', fn:'cv2.bilateralFilter(img,9,75,75)', desc:'에지 보존 블러\n→ 가장 고품질'},
            ].map(({name,fn,desc})=>(
              <div key={name} className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                <div className="text-xs font-bold text-gray-700">{name}</div>
                <div className="text-xs font-mono text-blue-600 mt-0.5 break-all">{fn}</div>
                <div className="text-xs text-gray-500 mt-0.5 whitespace-pre-line">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Code>{`# 01.blurring.py — 직접 구현 vs OpenCV
def filter(image, mask):
    for i in range(ycenter, rows - ycenter):
        for j in range(xcenter, cols - xcenter):
            roi = image[i-yc:i+yc+1, j-xc:j+xc+1].astype("float32")
            dst[i, j] = cv2.sumElems(cv2.multiply(roi, mask))[0]

# OpenCV 내장 (훨씬 빠름)
blur = cv2.blur(image, (3,3))              # 평균
gaus = cv2.GaussianBlur(image, (5,5), 0)  # 가우시안`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 2: Sobel 마스크 방향 (05.edge_sobel)
══════════════════════════════ */
function SobelTab() {
  const [dir, setDir] = useState('both');

  const sobelX = [[-1,0,1],[-2,0,2],[-1,0,1]];
  const sobelY = [[-1,-2,-1],[0,0,0],[1,2,1]];

  const img5 = [[50,50,50,200,200],[50,50,50,200,200],[50,50,50,200,200],[50,50,50,200,200],[50,50,50,200,200]];

  function applySobel(img, mask) {
    const res = Array.from({length:3},()=>Array(3).fill(0));
    for(let r=0;r<3;r++) for(let c=0;c<3;c++) {
      let s=0;
      for(let mr=0;mr<3;mr++) for(let mc=0;mc<3;mc++) s+=img[r+mr][c+mc]*mask[mr][mc];
      res[r][c]=Math.round(Math.abs(s));
    }
    return res;
  }

  const edgeX = applySobel(img5, sobelX);
  const edgeY = applySobel(img5, sobelY);

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-orange-50 border border-orange-200 rounded-lg p-2">
        💡 <strong>Sobel 마스크</strong>: 수직 에지는 x방향 마스크로, 수평 에지는 y방향 마스크로 검출
      </div>

      {/* 마스크 선택 */}
      <div className="flex gap-2">
        {[['x','x방향 (수직 에지)'],['y','y방향 (수평 에지)'],['both','합산']].map(([id,lb])=>(
          <button key={id} onClick={()=>setDir(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${dir===id?'bg-orange-600 text-white':'bg-gray-100 text-gray-600'}`}>{lb}</button>
        ))}
      </div>

      <div className="flex gap-6 flex-wrap items-start">
        {/* 마스크 */}
        <div className="space-y-3">
          {(dir==='y'?[sobelY]:(dir==='x'?[sobelX]:[sobelX,sobelY])).map((mask,idx)=>(
            <div key={idx}>
              <div className="text-xs font-bold text-gray-600 mb-1">{dir==='both'?(idx===0?'Sobel-X (수직)':'Sobel-Y (수평)'):(dir==='x'?'Sobel-X':'Sobel-Y')}</div>
              <div className="flex flex-col gap-0.5">
                {mask.map((row,r)=>(
                  <div key={r} className="flex gap-0.5">
                    {row.map((v,c)=>(
                      <div key={c} className={`w-10 h-8 rounded flex items-center justify-center text-xs font-bold font-mono ${v>0?'bg-red-100 text-red-700':v<0?'bg-blue-100 text-blue-700':'bg-gray-100 text-gray-500'}`}>{v}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 적용 결과 */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-gray-600">5×5 테스트 영상 (세로 에지)</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,36px)',gap:2}}>
            {img5.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`} className="w-9 h-7 rounded text-xs flex items-center justify-center font-mono"
                style={{backgroundColor:`rgb(${v},${v},${v})`,color:v>128?'#111':'#eee'}}>{v}</div>
            )))}
          </div>
          <div className="text-xs font-bold text-gray-600 mt-2">에지 강도 (중앙 3×3)</div>
          <div className="flex gap-3">
            {dir!=='y' && <div>
              <div className="text-xs text-orange-600 mb-1">Gx (x방향)</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,36px)',gap:2}}>
                {edgeX.map((row,r)=>row.map((v,c)=>(
                  <div key={`${r}${c}`} className="w-9 h-7 rounded text-xs flex items-center justify-center font-mono font-bold"
                    style={{backgroundColor:`rgb(${v},${v},${v})`,color:v>128?'#111':'#eee'}}>{v}</div>
                )))}
              </div>
            </div>}
            {dir!=='x' && <div>
              <div className="text-xs text-blue-600 mb-1">Gy (y방향)</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,36px)',gap:2}}>
                {edgeY.map((row,r)=>row.map((v,c)=>(
                  <div key={`${r}${c}`} className="w-9 h-7 rounded text-xs flex items-center justify-center font-mono font-bold"
                    style={{backgroundColor:`rgb(${v},${v},${v})`,color:v>128?'#111':'#eee'}}>{v}</div>
                )))}
              </div>
            </div>}
          </div>
        </div>
      </div>

      <Code>{`# 05.edge_sobel.py
# x방향(수직 마스크): 세로 에지 강조
sobelX = cv2.Sobel(np.float32(image), cv2.CV_32F, 1, 0, ksize=3)
# y방향(수평 마스크): 가로 에지 강조
sobelY = cv2.Sobel(np.float32(image), cv2.CV_32F, 0, 1, ksize=3)

# 절댓값으로 변환 (음수 에지도 포함)
absX = cv2.convertScaleAbs(sobelX)
absY = cv2.convertScaleAbs(sobelY)

# 두 방향 합산 = 전체 에지
combined = cv2.addWeighted(absX, 0.5, absY, 0.5, 0)`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 3: Canny 4단계 (08.edge_canny)
══════════════════════════════ */
function CannyTab() {
  const [step, setStep] = useState(0);

  const steps = [
    { title:'① 가우시안 블러', icon:'🌫️', color:'blue',
      desc:'노이즈로 인한 가짜 에지 제거\ncv2.GaussianBlur(image, (5,5), 0.3)',
      detail:'sigma가 클수록 더 많이 흐림 → 에지 손실 가능\n작은 sigma = 세밀한 에지 보존' },
    { title:'② Sobel 그래디언트', icon:'📐', color:'orange',
      desc:'x·y 방향 미분으로 에지 강도와 방향 계산\nGx, Gy → magnitude, direction',
      detail:'direction = arctan(Gy/Gx)\n0°/45°/90°/135° 중 가장 가까운 방향으로 양자화' },
    { title:'③ NMS (비최대 억제)', icon:'✂️', color:'purple',
      desc:'에지 방향으로 이웃 픽셀과 비교\n최대값이 아니면 0으로 제거 → 에지 얇게(1픽셀)',
      detail:'에지 방향의 양쪽 픽셀보다 크면 유지\n그렇지 않으면 제거 → 두꺼운 에지 → 얇은 에지' },
    { title:'④ 이중 임계값 + 이력', icon:'🔗', color:'green',
      desc:'강한 에지(>high): 확정\n약한 에지(low~high): 강한 에지와 연결되면 유지\n나머지: 제거',
      detail:'추천 비율: low:high = 1:2 ~ 1:3\ncv2.Canny(image, threshold1=100, threshold2=200)' },
  ];

  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-500 bg-purple-50 border border-purple-200 rounded-lg p-2">
        💡 <strong>Canny</strong> = 4단계 처리로 얇고 정확한 에지 검출. OpenCV 최고 성능 에지 검출기
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {steps.map((s,i)=>(
          <button key={i} onClick={()=>setStep(i)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${step===i?'bg-purple-600 text-white shadow':'bg-gray-100 text-gray-600'}`}>
            {s.title}
          </button>
        ))}
      </div>

      {/* 파이프라인 흐름 */}
      <div className="flex items-center gap-1 flex-wrap">
        {steps.map((s,i)=>(
          <div key={i} className="flex items-center gap-1">
            {i>0 && <div className="text-gray-400 text-xs">▶</div>}
            <div onClick={()=>setStep(i)} className={`px-2 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${step===i?'bg-purple-600 text-white':'bg-gray-100 text-gray-600 hover:bg-purple-50'}`}>
              {s.icon} {['가우시안','Sobel','NMS','이중임계'][i]}
            </div>
          </div>
        ))}
        <div className="text-gray-400 text-xs">▶</div>
        <div className="px-2 py-1 rounded-lg text-xs font-bold bg-green-100 text-green-800">✅ Canny 에지</div>
      </div>

      <div className="border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{steps[step].icon}</span>
          <div className="font-bold text-purple-800">{steps[step].title}</div>
        </div>
        <div className="text-xs text-purple-700 mb-2">{steps[step].desc}</div>
        <div className="text-xs text-gray-600 whitespace-pre-line bg-white rounded-lg p-2 border border-purple-100">{steps[step].detail}</div>
      </div>

      {/* 임계값 다이어그램 (step 3) */}
      {step===3 && (
        <div className="flex items-center gap-2 flex-wrap">
          {[
            {label:'> high(200)', color:'bg-green-500', desc:'강한 에지\n항상 유지'},
            {label:'low~high', color:'bg-yellow-400', desc:'약한 에지\n연결 시 유지'},
            {label:'< low(100)', color:'bg-gray-700', desc:'잡음\n제거'},
          ].map(({label,color,desc})=>(
            <div key={label} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
              <div className={`w-8 h-8 rounded-lg ${color} flex-shrink-0`}/>
              <div><div className="text-xs font-bold text-gray-700">{label}</div><div className="text-xs text-gray-500 whitespace-pre-line">{desc}</div></div>
            </div>
          ))}
        </div>
      )}

      <Code>{`# 08.edge_canny.py — OpenCV Canny
canny = cv2.Canny(image,
    threshold1=100,  # 하위 임계값
    threshold2=200,  # 상위 임계값
    apertureSize=3   # Sobel 커널 크기
)

# 직접 구현 순서 (교재 참고):
gaus = cv2.GaussianBlur(image, (5,5), 0.3)  # ①
Gx = cv2.Sobel(np.float32(gaus), cv2.CV_32F, 1, 0, 3)  # ②
Gy = cv2.Sobel(np.float32(gaus), cv2.CV_32F, 0, 1, 3)
directs = cv2.phase(Gx, Gy) / (np.pi/4)    # 방향 양자화
max_sobel = nonmax_suppression(sobel, directs)  # ③
hysteresis_th(max_sobel, low=100, high=150)     # ④`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 4: 모폴로지 원리 (14~16)
══════════════════════════════ */
const MORPH_SRC = [[0,0,0,0,0,0,0],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,0,1,1,1,0,0],[0,0,0,0,0,0,0]];
// 잡음 추가
const NOISE_SRC = MORPH_SRC.map(r=>[...r]);
NOISE_SRC[0][3]=1; NOISE_SRC[6][2]=1; NOISE_SRC[2][6]=1;

const SE = [[0,1,0],[1,1,1],[0,1,0]]; // 십자 구조요소

function erodeOp(img) {
  return img.map((row,r)=>row.map((_,c)=>{
    for(let mr=0;mr<3;mr++) for(let mc=0;mc<3;mc++) {
      if(SE[mr][mc]===1 && !(img[r+mr-1]?.[c+mc-1])) return 0;
    }
    return img[r][c];
  }));
}
function dilateOp(img) {
  return img.map((row,r)=>row.map((_,c)=>{
    for(let mr=0;mr<3;mr++) for(let mc=0;mc<3;mc++) {
      if(SE[mr][mc]===1 && img[r+mr-1]?.[c+mc-1]===1) return 1;
    }
    return 0;
  }));
}

function MorphTab() {
  const [op, setOp] = useState('erode');

  const eroded  = erodeOp(NOISE_SRC);
  const dilated = dilateOp(NOISE_SRC);
  const opened  = dilateOp(erodeOp(NOISE_SRC));
  const closed  = erodeOp(dilateOp(NOISE_SRC));

  const results = {erode:eroded, dilate:dilated, open:opened, close:closed};
  const result  = results[op] || NOISE_SRC;

  const Grid = ({data, label, highlight=false}) => (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs font-bold text-gray-600">{label}</div>
      <div className="flex flex-col gap-0.5">
        {data.map((row,r)=>(
          <div key={r} className="flex gap-0.5">
            {row.map((v,c)=>(
              <div key={c} className="w-6 h-6 rounded transition-all"
                style={{backgroundColor: v?highlight?'#f59e0b':'#60a5fa':'#1e293b',
                  border:`1px solid ${v?highlight?'#d97706':'#3b82f6':'#334155'}`}}/>
            ))}
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400">{data.flat().filter(Boolean).length}px</div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-indigo-50 border border-indigo-200 rounded-lg p-2">
        💡 구조요소(SE)가 완전히 맞으면 침식, 하나라도 맞으면 팽창
      </div>

      {/* 연산 선택 */}
      <div className="flex gap-2 flex-wrap">
        {[['erode','침식(Erode)'],['dilate','팽창(Dilate)'],['open','열림(Open)'],['close','닫힘(Close)']].map(([id,lb])=>(
          <button key={id} onClick={()=>setOp(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${op===id?'bg-indigo-600 text-white':'bg-gray-100 text-gray-600'}`}>{lb}</button>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap items-end">
        <Grid data={NOISE_SRC} label="원본 (잡음 포함)" />
        {/* 구조요소 */}
        <div className="flex flex-col items-center gap-1">
          <div className="text-xs font-bold text-gray-600">구조요소 (SE)</div>
          <div className="flex flex-col gap-0.5">
            {SE.map((row,r)=>(
              <div key={r} className="flex gap-0.5">
                {row.map((v,c)=>(
                  <div key={c} className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${v?'bg-orange-400 text-white':'bg-gray-200 text-gray-400'}`}>{v}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="text-xs text-orange-600">십자형</div>
        </div>
        <div className="text-2xl text-gray-400">→</div>
        <Grid data={result} label={['erode','dilate','open','close'].includes(op)?{erode:'침식 결과',dilate:'팽창 결과',open:'열림 결과 (잡음↓)',close:'닫힘 결과'}[op]:'결과'} highlight={op==='open'||op==='close'} />
      </div>

      {/* 설명 */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          {op:'erode', color:'blue', title:'침식 = 구조요소가 완전히 포함', desc:'객체 축소 → 작은 잡음 제거\nSE 전체가 1이어야 출력 1'},
          {op:'dilate',color:'green',title:'팽창 = 구조요소 하나라도 포함', desc:'객체 확장 → 구멍 메우기\nSE 중 하나라도 1이면 출력 1'},
          {op:'open',  color:'orange',title:'열림 = 침식 → 팽창', desc:'작은 잡음 제거 후 크기 복원\ncv2.MORPH_OPEN'},
          {op:'close', color:'purple',title:'닫힘 = 팽창 → 침식', desc:'구멍 메운 후 크기 복원\ncv2.MORPH_CLOSE'},
        ].map(({op:o,color,title,desc})=>(
          <div key={o} onClick={()=>setOp(o)} className={`border rounded-xl p-2 cursor-pointer transition-all ${op===o?`border-${color}-400 bg-${color}-50`:'border-gray-200 bg-gray-50'}`}>
            <div className="font-bold text-gray-700">{title}</div>
            <div className="text-gray-500 whitespace-pre-line mt-0.5">{desc}</div>
          </div>
        ))}
      </div>

      <Code>{`kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3,3))
_, binary = cv2.threshold(image, 128, 255, cv2.THRESH_BINARY)

eroded  = cv2.erode(binary, kernel)           # 침식 (14.erode.py)
dilated = cv2.dilate(binary, kernel)          # 팽창 (15.dilate.py)
opened  = cv2.morphologyEx(binary, cv2.MORPH_OPEN,  kernel)  # 잡음↓
closed  = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)  # 구멍↓`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 5: 번호판 검출 파이프라인 (17.detect_plate)
══════════════════════════════ */
function PlateTab() {
  const [step, setStep] = useState(0);
  const steps = [
    {icon:'🚗', label:'원본 영상', color:'gray',   desc:'차량 컬러 영상 입력'},
    {icon:'⬜', label:'그레이스케일', color:'gray', desc:'cv2.cvtColor → 명암도 변환'},
    {icon:'🌫️', label:'블러링',    color:'blue',   desc:'cv2.blur(gray,(5,5))\n→ 노이즈 제거'},
    {icon:'📐', label:'Sobel 에지', color:'orange', desc:'cv2.Sobel(gray, CV_8U, 1,0,5)\n→ 수직 에지 강조'},
    {icon:'⬛', label:'이진화',    color:'purple',  desc:'cv2.threshold → 흑백\n번호판 후보 영역 분리'},
    {icon:'🔲', label:'닫힘 연산', color:'green',   desc:'mask=(5,17) 가로 긴 커널\n→ 번호판 글자들 연결'},
    {icon:'🎯', label:'번호판 영역', color:'green', desc:'연결된 직사각형 → 번호판 후보'},
  ];
  return (
    <div className="space-y-3">
      <div className="text-xs text-gray-500 bg-green-50 border border-green-200 rounded-lg p-2">
        💡 Sobel + 이진화 + 닫힘 연산으로 번호판처럼 글자가 모인 직사각형 영역 검출
      </div>
      {/* 스텝 버튼 */}
      <div className="flex gap-1 flex-wrap">
        {steps.map((s,i)=>(
          <button key={i} onClick={()=>setStep(i)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold transition-all ${step===i?'bg-green-600 text-white shadow':'bg-gray-100 text-gray-600'}`}>
            {s.icon} <span>{i+1}</span>
          </button>
        ))}
      </div>
      {/* 파이프라인 */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {steps.map((s,i)=>(
          <div key={i} className="flex items-center gap-0.5 flex-shrink-0">
            {i>0&&<div className="text-gray-300 text-xs">▶</div>}
            <div onClick={()=>setStep(i)} className={`flex flex-col items-center px-2 py-1 rounded-lg cursor-pointer text-center min-w-[52px] transition-all ${step===i?'bg-green-100 border-2 border-green-400':'bg-gray-50 border border-gray-200 hover:bg-green-50'}`}>
              <span>{s.icon}</span>
              <span className="text-xs font-bold text-gray-700 leading-tight">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-2 border-green-200 bg-green-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{steps[step].icon}</span>
          <div className="font-bold text-green-800">{steps[step].label}</div>
        </div>
        <div className="text-xs text-green-700 whitespace-pre-line">{steps[step].desc}</div>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
        <div className="font-bold text-yellow-800 mb-1">💡 핵심 포인트: 닫힘 연산 커널 모양</div>
        <div className="text-yellow-700">
          mask = np.ones(<Tag color="orange">(5, 17)</Tag>, np.uint8) — 가로로 긴 커널<br/>
          번호판 글자들 사이 빈 공간을 연결 → 하나의 직사각형으로 합침
        </div>
      </div>
      <Code>{`# 17.detect_plate.py
mask = np.ones((5, 17), np.uint8)        # 가로 긴 닫힘 커널
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
gray = cv2.blur(gray, (5, 5))            # 블러링
gray = cv2.Sobel(gray, cv2.CV_8U, 1, 0, 5)  # 수직 Sobel

_, th = cv2.threshold(gray, 120, 255, cv2.THRESH_BINARY)
morph = cv2.morphologyEx(th, cv2.MORPH_CLOSE, mask, iterations=3)`}</Code>
    </div>
  );
}

/* ══════════════════════════════ 메인 ══════════════════════════════ */
const ALL_TABS = [
  {id:'conv',  icon:'🔲', label:'회선 원리',    file:'01~02'},
  {id:'sobel', icon:'📐', label:'Sobel 방향',   file:'05'},
  {id:'canny', icon:'✂️', label:'Canny 4단계',  file:'08'},
  {id:'morph', icon:'🔵', label:'모폴로지 원리', file:'14~16'},
  {id:'plate', icon:'🚗', label:'번호판 검출',   file:'17'},
];

export default function Chap07Diagram({ onlyTabs }) {
  const tabs = onlyTabs ? ALL_TABS.filter(t => onlyTabs.includes(t.id)) : ALL_TABS;
  const [tab, setTab] = useState(tabs[0]?.id || 'conv');
  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 flex-wrap">
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${tab===t.id?'bg-blue-600 text-white shadow':'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}>
            <div>{t.icon} {t.label}</div>
            <div className={`font-mono font-normal mt-0.5 ${tab===t.id?'opacity-70':'text-gray-400'}`}>{t.file}.py</div>
          </button>
        ))}
      </div>
      <div className="min-h-[300px]">
        {tab==='conv'  && <ConvTab/>}
        {tab==='sobel' && <SobelTab/>}
        {tab==='canny' && <CannyTab/>}
        {tab==='morph' && <MorphTab/>}
        {tab==='plate' && <PlateTab/>}
      </div>
    </div>
  );
}
