import { useState } from 'react';

function Code({ children }) {
  return <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{children}</pre>;
}

/* ══════════════════════════════
   TAB 1: 순방향 vs 역방향 사상 (01~03)
══════════════════════════════ */
function MappingTab() {
  const [zoom, setZoom] = useState(1.5);

  const srcW=6, srcH=4;
  const dstW=Math.round(srcW*zoom), dstH=Math.round(srcH*zoom);

  // 순방향: 빈 픽셀 생김
  const forward = Array.from({length:dstH},()=>Array(dstW).fill(null));
  for(let r=0;r<srcH;r++) for(let c=0;c<srcW;c++) {
    const dr=Math.floor(r*zoom), dc=Math.floor(c*zoom);
    if(dr<dstH&&dc<dstW) forward[dr][dc]=true;
  }

  // 역방향: 빈 픽셀 없음
  const backward = Array.from({length:dstH},(_,r)=>Array.from({length:dstW},(_,c)=>{
    const sr=r/zoom, sc=c/zoom;
    return sr<srcH&&sc<srcW;
  }));

  const Cell = ({v,empty}) => (
    <div className={`w-5 h-5 rounded-sm border ${v?'bg-blue-400 border-blue-500':'empty'?'bg-red-200 border-red-300':'bg-gray-800 border-gray-700'}`}
      style={{backgroundColor: v?(empty?'#fca5a5':'#60a5fa'):(!v&&empty)?'#fca5a5':'#1e293b'}}/>
  );

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
        💡 <strong>역방향 사상</strong>을 써야 빈 픽셀이 생기지 않음. OpenCV 모든 변환이 역방향 사용
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1"><span>확대 비율 (zoom)</span><span className="font-bold text-blue-600">×{zoom.toFixed(1)}</span></div>
        <input type="range" min={1.2} max={2.5} step={0.1} value={zoom} onChange={e=>setZoom(Number(e.target.value))} className="w-full accent-blue-500"/>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* 순방향 */}
        <div>
          <div className="text-xs font-bold text-red-700 mb-1">❌ 순방향 사상 (Forward)</div>
          <div className="text-xs text-gray-500 mb-2">src→dst 직접 매핑 → 빈 픽셀(홀) 발생</div>
          <div className="flex flex-col gap-0.5 bg-gray-900 p-2 rounded-lg inline-flex">
            {forward.map((row,r)=>(
              <div key={r} className="flex gap-0.5">
                {row.map((v,c)=>(
                  <div key={c} className={`w-4 h-4 rounded-sm ${v?'bg-blue-400':'bg-red-900'}`}
                    title={v?'채워짐':'빈 픽셀'}/>
                ))}
              </div>
            ))}
          </div>
          <div className="text-xs mt-1"><span className="text-red-400">■</span> 빈 픽셀(홀)</div>
        </div>
        {/* 역방향 */}
        <div>
          <div className="text-xs font-bold text-green-700 mb-1">✅ 역방향 사상 (Backward)</div>
          <div className="text-xs text-gray-500 mb-2">dst→src 역매핑 + 보간 → 빈 픽셀 없음</div>
          <div className="flex flex-col gap-0.5 bg-gray-900 p-2 rounded-lg inline-flex">
            {backward.map((row,r)=>(
              <div key={r} className="flex gap-0.5">
                {row.map((v,c)=>(
                  <div key={c} className={`w-4 h-4 rounded-sm ${v?'bg-blue-400':'bg-gray-800'}`}/>
                ))}
              </div>
            ))}
          </div>
          <div className="text-xs mt-1"><span className="text-blue-400">■</span> 모든 픽셀 채워짐</div>
        </div>
      </div>

      <Code>{`# 01.scaling.py — 순방향 (빈 픽셀 발생!)
for y in range(src.shape[0]):
    for x in range(src.shape[1]):
        i, j = int(y*ratio), int(x*ratio)
        dst[i, j] = src[y, x]   # 일부 dst 픽셀 미채움

# OpenCV resize — 역방향 + 보간법 (빈 픽셀 없음)
dst = cv2.resize(src, None, fx=${zoom.toFixed(1)}, fy=${zoom.toFixed(1)},
                 interpolation=cv2.INTER_LINEAR)`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 2: 보간법 비교 (02~03)
══════════════════════════════ */
function InterpTab() {
  const [method, setMethod] = useState('nearest');
  const small = [[50,200],[150,80]]; // 2×2 → 4×4 확대

  function nearest(r,c) { return small[Math.floor(r/2)][Math.floor(c/2)]; }
  function bilinear(r,c) {
    const sr=(r+0.5)/2-0.5, sc=(c+0.5)/2-0.5;
    const r0=Math.max(0,Math.floor(sr)), r1=Math.min(1,r0+1);
    const c0=Math.max(0,Math.floor(sc)), c1=Math.min(1,c0+1);
    const dr=sr-r0, dc=sc-c0;
    return Math.round(small[r0][c0]*(1-dr)*(1-dc)+small[r0][c1]*(1-dr)*dc+small[r1][c0]*dr*(1-dc)+small[r1][c1]*dr*dc);
  }
  const fn = method==='nearest'?nearest:bilinear;
  const grid4 = Array.from({length:4},(_,r)=>Array.from({length:4},(_,c)=>fn(r,c)));

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-orange-50 border border-orange-200 rounded-lg p-2">
        💡 축소 시 INTER_AREA, 확대 시 INTER_CUBIC 권장
      </div>
      <div className="flex gap-2">
        {[['nearest','최근접 이웃'],['bilinear','양선형']].map(([id,lb])=>(
          <button key={id} onClick={()=>setMethod(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${method===id?'bg-orange-600 text-white':'bg-gray-100 text-gray-600'}`}>{lb}</button>
        ))}
      </div>

      <div className="flex gap-6 items-start flex-wrap">
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">원본 2×2</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,48px)',gap:3}}>
            {small.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`} className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{backgroundColor:`rgb(${v},${v},${v})`,color:v>128?'#111':'#eee'}}>{v}</div>
            )))}
          </div>
        </div>
        <div className="text-2xl text-gray-400 self-center">→</div>
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">확대 4×4 ({method==='nearest'?'최근접':'양선형'})</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,40px)',gap:2}}>
            {grid4.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`} className="w-10 h-10 rounded flex items-center justify-center text-xs font-bold"
                style={{backgroundColor:`rgb(${v},${v},${v})`,color:v>128?'#111':'#eee'}}>{v}</div>
            )))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          {id:'NEAREST', flag:'INTER_NEAREST', desc:'가장 가까운 픽셀 복사\n빠름, 계단 현상 발생', use:'픽셀 아트, 빠른 처리'},
          {id:'LINEAR',  flag:'INTER_LINEAR',  desc:'주변 4픽셀 거리 가중 평균\n기본값, 균형', use:'일반적인 크기 변경'},
          {id:'CUBIC',   flag:'INTER_CUBIC',   desc:'주변 16픽셀 3차 회선\n고품질, 느림', use:'확대 (고화질)'},
          {id:'AREA',    flag:'INTER_AREA',    desc:'픽셀 영역 평균\n축소 시 최적', use:'축소 (앨리어싱↓)'},
        ].map(({id,flag,desc,use})=>(
          <div key={id} className="border border-gray-200 rounded-xl p-2 bg-gray-50">
            <div className="font-bold text-blue-700 font-mono">{flag}</div>
            <div className="text-gray-600 whitespace-pre-line mt-0.5">{desc}</div>
            <div className="text-orange-600 mt-0.5">→ {use}</div>
          </div>
        ))}
      </div>

      <Code>{`# 02~03.scaling_nearest/bilinear.py
# 최근접 (계단 현상)
dst = cv2.resize(src, None, fx=2, fy=2, interpolation=cv2.INTER_NEAREST)
# 양선형 (부드러움)
dst = cv2.resize(src, None, fx=2, fy=2, interpolation=cv2.INTER_LINEAR)
# 3차 회선 (고품질)
dst = cv2.resize(src, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 3: 어파인 변환 분해 (07~08)
══════════════════════════════ */
function AffineTab() {
  const [tx, setTx] = useState(20);
  const [ty, setTy] = useState(10);
  const [angle, setAngle] = useState(15);
  const [scale, setScale] = useState(1.0);

  const rad = angle * Math.PI / 180;
  const cos = Math.cos(rad) * scale, sin = Math.sin(rad) * scale;

  // 2×3 어파인 행렬
  const M = [[cos, -sin, tx],[sin, cos, ty]];

  // 사각형 꼭짓점 변환
  const pts = [[50,50],[150,50],[150,100],[50,100]];
  const transformed = pts.map(([x,y])=>([
    Math.round(M[0][0]*x + M[0][1]*y + M[0][2]),
    Math.round(M[1][0]*x + M[1][1]*y + M[1][2]),
  ]));

  const svgPoly = (pts) => pts.map(p=>p.join(',')).join(' ');

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-purple-50 border border-purple-200 rounded-lg p-2">
        💡 어파인 변환 = 이동(tx,ty) + 회전(θ) + 스케일(s) 조합. 평행선이 유지됨
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[{l:'이동 tx',v:tx,s:setTx,min:-50,max:80},{l:'이동 ty',v:ty,s:setTy,min:-30,max:60},
          {l:'회전 θ(도)',v:angle,s:setAngle,min:-45,max:45},{l:'스케일',v:scale,s:setScale,min:0.5,max:1.5,step:0.05}
        ].map(({l,v,s,min,max,step=1})=>(
          <div key={l}>
            <div className="flex justify-between text-xs mb-0.5"><span>{l}</span><span className="font-bold text-purple-600">{typeof v==='number'&&step<1?v.toFixed(2):v}</span></div>
            <input type="range" min={min} max={max} step={step} value={v} onChange={e=>s(Number(e.target.value))} className="w-full accent-purple-500"/>
          </div>
        ))}
      </div>

      {/* SVG 변환 시각화 */}
      <div className="flex gap-4 items-start flex-wrap">
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">변환 시각화</div>
          <svg width="220" height="160" className="bg-gray-900 rounded-xl">
            <line x1="20" y1="80" x2="200" y2="80" stroke="#374151" strokeWidth="1"/>
            <line x1="110" y1="10" x2="110" y2="150" stroke="#374151" strokeWidth="1"/>
            {/* 원본 */}
            <polygon points={svgPoly(pts)} fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4,3"/>
            {/* 변환 */}
            <polygon points={svgPoly(transformed)} fill="rgba(167,139,250,0.2)" stroke="#a78bfa" strokeWidth="2"/>
            {pts.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill="#60a5fa"/>)}
            {transformed.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill="#a78bfa"/>)}
          </svg>
          <div className="flex gap-3 text-xs mt-1">
            <span><span className="text-blue-400">─</span> 원본</span>
            <span><span className="text-purple-400">─</span> 변환 후</span>
          </div>
        </div>

        {/* 행렬 */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-gray-600">2×3 어파인 행렬 M</div>
          <div className="bg-gray-900 rounded-xl p-3 font-mono text-xs text-green-300">
            {M.map((row,r)=>(
              <div key={r}>[{row.map(v=>String(v.toFixed(2)).padStart(6)).join(', ')}]</div>
            ))}
          </div>
          <div className="text-xs text-gray-500 space-y-0.5">
            <div>M[0][0]=cos×s, M[0][1]=-sin×s</div>
            <div>M[1][0]=sin×s, M[1][1]= cos×s</div>
            <div>M[0][2]=tx,    M[1][2]=ty</div>
          </div>
        </div>
      </div>

      <Code>{`# 07.affine_transform.py
# 회전 행렬 생성
M = cv2.getRotationMatrix2D(
    center=(cx, cy), angle=${angle}, scale=${scale.toFixed(2)})

# 평행이동 추가
M[0][2] += ${tx}; M[1][2] += ${ty}

# 3점 대응으로 어파인 행렬 직접 계산
pts1 = np.float32([[30,70],[20,240],[300,110]])
pts2 = np.float32([[120,20],[10,180],[280,260]])
M2 = cv2.getAffineTransform(pts1, pts2)
dst = cv2.warpAffine(image, M, (W, H))`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 4: 원근 투시 변환 (10~11)
══════════════════════════════ */
function PerspectiveTab() {
  const [drag, setDrag] = useState(null);
  const [pts, setPts] = useState([[60,50],[280,40],[50,210],[290,220]]);
  const dst = [[30,30],[300,30],[30,230],[300,230]];

  function onMouseDown(i,e) {
    e.preventDefault(); setDrag(i);
  }
  function onMouseMove(e) {
    if(drag===null) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x=Math.round(Math.max(10,Math.min(320,e.clientX-rect.left)));
    const y=Math.round(Math.max(10,Math.min(270,e.clientY-rect.top)));
    setPts(prev=>prev.map((p,i)=>i===drag?[x,y]:p));
  }
  function onMouseUp(){setDrag(null);}

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-green-50 border border-green-200 rounded-lg p-2">
        💡 4점 대응으로 카메라 각도·기울기 보정. 문서 스캔, 번호판 정렬에 활용
      </div>
      <div className="text-xs text-gray-500">파란 점을 드래그해서 원근 변환 입력 좌표 조정</div>

      <div className="flex gap-4 flex-wrap items-start">
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">원본 (4점 드래그)</div>
          <svg width="340" height="280" className="bg-gray-900 rounded-xl cursor-crosshair"
            onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
            {/* 격자 */}
            {[60,120,180,240,300].map(x=><line key={x} x1={x} y1={10} x2={x} y2={270} stroke="#1f2937" strokeWidth="1"/>)}
            {[50,100,150,200,250].map(y=><line key={y} x1={10} y1={y} x2={330} y2={y} stroke="#1f2937" strokeWidth="1"/>)}
            {/* 원본 폴리곤 */}
            <polygon points={pts.map(p=>p.join(',')).join(' ')} fill="rgba(96,165,250,0.15)" stroke="#60a5fa" strokeWidth="2"/>
            {/* 목적 폴리곤 */}
            <polygon points={dst.map(p=>p.join(',')).join(' ')} fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="5,3"/>
            {/* 대응 화살표 */}
            {pts.map(([x,y],i)=>(
              <line key={i} x1={x} y1={y} x2={dst[i][0]} y2={dst[i][1]} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.6"/>
            ))}
            {/* 원본 점 */}
            {pts.map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r={drag===i?8:6} fill="#3b82f6" stroke="white" strokeWidth="2"
                onMouseDown={e=>onMouseDown(i,e)} style={{cursor:'grab'}}/>
            ))}
            {/* 목적 점 */}
            {dst.map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r={4} fill="#a78bfa"/>
            ))}
          </svg>
          <div className="flex gap-3 text-xs mt-1">
            <span><span className="text-blue-400">●</span> 원본(드래그)</span>
            <span><span className="text-purple-400">●</span> 목적</span>
            <span><span className="text-yellow-400">---</span> 대응</span>
          </div>
        </div>
        <div className="space-y-2 flex-1 min-w-48">
          <div className="text-xs font-bold text-gray-600">4점 좌표</div>
          {pts.map(([x,y],i)=>(
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i+1}</div>
              <span className="text-gray-500">원본</span>
              <span className="font-mono text-blue-600">({x},{y})</span>
              <span className="text-gray-400">→</span>
              <span className="font-mono text-purple-600">({dst[i][0]},{dst[i][1]})</span>
            </div>
          ))}
        </div>
      </div>

      <Code>{`# 10.perspective_transform.py
pts1 = np.float32([${pts.map(p=>`[${p}]`).join(', ')}])
pts2 = np.float32([[30,30],[300,30],[30,230],[300,230]])

# 3×3 원근 변환 행렬 계산
M = cv2.getPerspectiveTransform(pts1, pts2)

# 역방향 사상 + 보간
dst = cv2.warpPerspective(image, M, (330,260),
                          flags=cv2.INTER_CUBIC)`}</Code>
    </div>
  );
}

/* ══════════════════════════════ 메인 ══════════════════════════════ */
export default function Chap08Diagram() {
  const [tab, setTab] = useState('mapping');
  const tabs = [
    {id:'mapping',     icon:'↔️', label:'순방향 vs 역방향', file:'01~03'},
    {id:'interp',      icon:'🔍', label:'보간법 비교',      file:'02~03'},
    {id:'affine',      icon:'📐', label:'어파인 변환',      file:'07~08'},
    {id:'perspective', icon:'🔲', label:'원근 투시 변환',   file:'10~11'},
  ];
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
        {tab==='mapping'     && <MappingTab/>}
        {tab==='interp'      && <InterpTab/>}
        {tab==='affine'      && <AffineTab/>}
        {tab==='perspective' && <PerspectiveTab/>}
      </div>
    </div>
  );
}
