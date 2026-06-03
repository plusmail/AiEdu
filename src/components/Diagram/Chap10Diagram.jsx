import { useState } from 'react';

function Code({ children }) {
  return <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{children}</pre>;
}

/* ══════════════════════════════
   TAB 1: 허프 변환 원리 (01)
══════════════════════════════ */
function HoughTab() {
  const [selectedPt, setSelectedPt] = useState(0);
  const pts = [[30,80],[80,55],[130,80],[80,105]]; // 직선 위 4점 (y=ax+b)

  // 각 점에서 ρ=x·cos(θ)+y·sin(θ) 곡선 계산
  const THETAS = Array.from({length:37},(_,i)=>i*5); // 0~180
  function calcRho(x,y,theta){
    const rad=theta*Math.PI/180;
    return Math.round(x*Math.cos(rad)+y*Math.sin(rad));
  }

  const curves = pts.map(([x,y])=>THETAS.map(t=>({t,rho:calcRho(x,y,t)})));
  const pt = pts[selectedPt];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
        💡 각 에지 픽셀 → (ρ,θ) 공간에 사인 곡선. 여러 곡선이 교차하는 점 = 공통 직선의 파라미터
      </div>
      <div className="text-xs text-gray-500">점을 클릭하면 해당 점의 사인 곡선이 강조됩니다</div>

      <div className="flex gap-4 flex-wrap">
        {/* 영상 공간 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">영상 공간 (직선 위 4점)</div>
          <svg width="170" height="140" className="bg-gray-900 rounded-xl">
            <line x1="0" y1="80" x2="170" y2="80" stroke="#374151" strokeWidth="0.5"/>
            <line x1="80" y1="0" x2="80" y2="140" stroke="#374151" strokeWidth="0.5"/>
            {/* 직선 */}
            <line x1="10" y1="97" x2="160" y2="47" stroke="#334155" strokeWidth="1" strokeDasharray="4,3"/>
            {pts.map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r={selectedPt===i?7:5}
                fill={selectedPt===i?'#f59e0b':'#60a5fa'} stroke="white" strokeWidth="1.5"
                onClick={()=>setSelectedPt(i)} style={{cursor:'pointer'}}/>
            ))}
            {pt && <text x={pt[0]+8} y={pt[1]-5} fill="#f59e0b" fontSize="9">({pt[0]},{pt[1]})</text>}
          </svg>
        </div>

        {/* 허프 공간 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">허프 공간 (ρ-θ)</div>
          <svg width="190" height="140" className="bg-gray-900 rounded-xl">
            <line x1="0" y1="70" x2="190" y2="70" stroke="#374151" strokeWidth="0.5"/>
            {curves.map((curve,i)=>{
              const color=['#60a5fa','#a78bfa','#34d399','#f97316'][i];
              const opacity = selectedPt===i?1:0.3;
              const pts2 = curve.filter(p=>p.rho>-70&&p.rho<70);
              return (
                <polyline key={i} opacity={opacity}
                  points={pts2.map(p=>`${p.t/180*185+2},${70-p.rho}`).join(' ')}
                  fill="none" stroke={color} strokeWidth={selectedPt===i?2:1}/>
              );
            })}
            {/* 교차점 표시 */}
            <circle cx={85} cy={30} r={5} fill="#f59e0b" opacity={0.9}/>
            <text x={90} y={28} fill="#f59e0b" fontSize="8">교차점</text>
            <text x={2} y={10} fill="#9ca3af" fontSize="7">ρ↑</text>
            <text x={160} y={135} fill="#9ca3af" fontSize="7">θ →180°</text>
          </svg>
        </div>

        <div className="flex-1 min-w-36 text-xs space-y-2">
          <div className="font-bold text-gray-700">원리</div>
          {['직선 위 점들은 (ρ,θ) 공간에서 같은 교차점을 지남','교차점 = 그 직선의 파라미터 (ρ, θ)','ρ = x·cos(θ) + y·sin(θ)','누적 값이 threshold 이상인 교차점이 직선'].map((t,i)=>(
            <div key={i} className="flex gap-2"><span className="text-blue-500 flex-shrink-0">{i+1}</span><span className="text-gray-600">{t}</span></div>
          ))}
        </div>
      </div>

      <Code>{`# 01.hough_lines.py
edges = cv2.Canny(gray, 50, 150)

# 확률적 허프 변환 (선분 직접 반환)
lines = cv2.HoughLinesP(
    edges, rho=1, theta=np.pi/180,
    threshold=80,        # 누적 임계값
    minLineLength=40,    # 최소 선분 길이
    maxLineGap=10)       # 최대 끊김

for x1,y1,x2,y2 in lines[:,0]:
    cv2.line(img,(x1,y1),(x2,y2),(0,255,0),2)`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 2: 해리스 코너 (03)
══════════════════════════════ */
function HarrisTab() {
  const [k, setK] = useState(0.04);
  const [thresh, setThresh] = useState(50);

  /* 5×5 영상 예시 (코너가 있는 간단한 패턴) */
  const img = [[0,0,0,200,200],[0,0,0,200,200],[0,0,0,200,200],[0,0,0,0,0],[0,0,0,0,0]];

  /* 해리스 응답 시뮬레이션 */
  function harrisResp(r,c) {
    if(r===0||r===4||c===0||c===4) return 0;
    const neighbors = [[img[r-1][c-1],img[r-1][c],img[r-1][c+1]],
                       [img[r][c-1],  img[r][c],  img[r][c+1]],
                       [img[r+1][c-1],img[r+1][c],img[r+1][c+1]]];
    const Ix = neighbors[1][2]-neighbors[1][0];
    const Iy = neighbors[0][1]-neighbors[2][1];
    const A=Ix*Ix, B=Iy*Iy, C=Ix*Iy;
    const det=A*B-C*C;
    const trace=A+B;
    return det - k*trace*trace;
  }

  const responses = Array.from({length:5},(_,r)=>Array.from({length:5},(_,c)=>harrisResp(r,c)));
  const maxR = Math.max(...responses.flat());

  function cellColor(r,c,v) {
    const norm = maxR>0?v/maxR:0;
    if(norm*100>thresh) return '#ef4444'; // 코너
    if(norm>0.1) return '#f97316';        // 에지
    return `rgb(${img[r][c]},${img[r][c]},${img[r][c]})`;
  }

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-orange-50 border border-orange-200 rounded-lg p-2">
        💡 해리스: 모든 방향으로 밝기 변화가 큰 점 = 코너. R = det(M) - k·trace(M)²
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between text-xs mb-1"><span>k 파라미터</span><span className="font-bold">{k.toFixed(2)}</span></div>
          <input type="range" min={0.01} max={0.2} step={0.01} value={k} onChange={e=>setK(Number(e.target.value))} className="w-full accent-orange-500"/>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1"><span>임계값 (%)</span><span className="font-bold">{thresh}</span></div>
          <input type="range" min={10} max={90} value={thresh} onChange={e=>setThresh(Number(e.target.value))} className="w-full accent-red-500"/>
        </div>
      </div>

      <div className="flex gap-6 flex-wrap items-start">
        {/* 영상 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">입력 영상 (5×5)</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,44px)',gap:3}}>
            {img.map((row,r)=>row.map((v,c)=>(
              <div key={r+"_"+c} className="w-11 h-11 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{backgroundColor:`rgb(${v},${v},${v})`,color:v>128?'#111':'#eee'}}>{v}</div>
            )))}
          </div>
        </div>

        {/* 해리스 응답 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">해리스 응답</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(5,44px)',gap:3}}>
            {responses.map((row,r)=>row.map((v,c)=>{
              const color = cellColor(r,c,v);
              const isCorner = maxR>0&&v/maxR*100>thresh;
              return (
                <div key={r+"_"+c} className="w-11 h-11 rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-all"
                  style={{backgroundColor:color,color:isCorner?'white':(img[r][c]>128?'#111':'#eee')}}>
                  {isCorner && <span>★</span>}
                  <span style={{fontSize:8}}>{Math.round(v)}</span>
                </div>
              );
            }))}
          </div>
        </div>

        <div className="text-xs space-y-1 flex-1 min-w-32">
          {[
            {color:'bg-red-500',label:'코너 (★)', desc:'모든 방향 밝기 변화 큼'},
            {color:'bg-orange-400',label:'에지', desc:'한 방향만 변화'},
            {color:'bg-gray-600',label:'평탄', desc:'변화 없음'},
          ].map(({color,label,desc})=>(
            <div key={label} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${color} flex-shrink-0`}/>
              <div><div className="font-bold text-gray-700">{label}</div><div className="text-gray-500">{desc}</div></div>
            </div>
          ))}
        </div>
      </div>

      <Code>{[
        '# 03.harris_detect.py',
        'gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY).astype(np.float32)',
        'corner = cv2.cornerHarris(gray,',
        '    blockSize=4,    # 이웃 픽셀 범위',
        '    ksize=3,        # Sobel 커널',
        '    k='+k.toFixed(2)+'         # Harris 파라미터',
        ')',
        '# 임계값 이상인 픽셀 = 코너',
        'image[corner > '+(thresh/100).toFixed(2)+' * corner.max()] = [0,0,255]',
      ].join('\n')}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 3: kNN 분류 (04~07)
══════════════════════════════ */
function KnnTab() {
  const [K, setK] = useState(3);
  const [testX, setTestX] = useState(200);
  const [testY, setTestY] = useState(200);

  const trainA = [[150,130],[160,160],[140,150],[170,140],[130,170]];
  const trainB = [[250,240],[260,260],[240,250],[270,230],[230,270]];
  const all = [...trainA.map(p=>({p,cls:0})),...trainB.map(p=>({p,cls:1}))];

  const dists = all.map(({p,cls})=>({cls,dist:Math.sqrt((p[0]-testX)**2+(p[1]-testY)**2)}))
    .sort((a,b)=>a.dist-b.dist);
  const kNeighbors = dists.slice(0,K);
  const votes = kNeighbors.filter(d=>d.cls===0).length;
  const predicted = votes > K/2 ? 0 : 1;

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-green-50 border border-green-200 rounded-lg p-2">
        💡 kNN: 테스트 점 주변 k개 이웃의 다수결로 분류. k가 클수록 안정적이나 경계 불명확
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between text-xs mb-1"><span>K (이웃 수)</span><span className="font-bold text-blue-600">K={K}</span></div>
          <input type="range" min={1} max={5} value={K} onChange={e=>setK(Number(e.target.value))} className="w-full accent-blue-500"/>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">분류 공간 (테스트 점 드래그)</div>
          <svg width="320" height="280" className="bg-gray-900 rounded-xl cursor-crosshair"
            onClick={e=>{
              const rect=e.currentTarget.getBoundingClientRect();
              setTestX(Math.round(e.clientX-rect.left));
              setTestY(Math.round(e.clientY-rect.top));
            }}>
            {/* 배경 색상 (결정 경계) */}
            {Array.from({length:16},(_,r)=>Array.from({length:16},(_,c)=>{
              const px=c*20+10,py=r*17+10;
              const ds=all.map(({p,cls})=>({cls,d:(p[0]-px)**2+(p[1]-py)**2})).sort((a,b)=>a.d-b.d);
              const kv=ds.slice(0,K).filter(d=>d.cls===0).length;
              const pred=kv>K/2?0:1;
              return <rect key={r+'_'+c} x={c*20} y={r*17} width={20} height={17} fill={pred===0?'rgba(96,165,250,0.12)':'rgba(167,139,250,0.12)'}/>;
            }))}
            {/* 훈련 데이터 */}
            {trainA.map(([x,y],i)=><circle key={"a"+i} cx={x} cy={y} r={7} fill="#3b82f6" stroke="white" strokeWidth="1.5"/>)}
            {trainB.map(([x,y],i)=><circle key={"b"+i} cx={x} cy={y} r={7} fill="#a78bfa" stroke="white" strokeWidth="1.5"/>)}
            {/* k개 이웃 연결선 */}
            {kNeighbors.map((_,i)=>{
              const srcPt=all.sort((a,b)=>{
                const da=(a.p[0]-testX)**2+(a.p[1]-testY)**2;
                const db=(b.p[0]-testX)**2+(b.p[1]-testY)**2;
                return da-db;
              })[i].p;
              return <line key={i} x1={testX} y1={testY} x2={srcPt[0]} y2={srcPt[1]} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.7"/>;
            })}
            {/* 테스트 점 */}
            <circle cx={testX} cy={testY} r={9} fill={predicted===0?'#60a5fa':'#c084fc'} stroke="#f59e0b" strokeWidth="2.5"/>
            <text x={testX+12} y={testY-5} fill="#f59e0b" fontSize="9">테스트</text>
          </svg>
          <div className="text-xs text-gray-400 mt-0.5">클릭으로 테스트 점 이동</div>
        </div>

        <div className="space-y-3">
          <div className="bg-gray-800 rounded-xl p-3 text-xs space-y-1">
            <div className="font-bold text-white">분류 결과</div>
            <div>K={K} 이웃: <span className="text-blue-400">{votes}개 A</span> / <span className="text-purple-400">{K-votes}개 B</span></div>
            <div>예측: <span className="font-bold" style={{color:predicted===0?'#60a5fa':'#c084fc'}}>클래스 {predicted=== 0?'A (파랑)':'B (보라)'}</span></div>
          </div>

          <div className="text-xs space-y-1">
            <div className="font-bold text-gray-700">k값 영향</div>
            {[{k:1,desc:'최근접 1개 → 노이즈에 민감'},{k:3,desc:'3개 다수결 → 균형'},{k:5,desc:'5개 → 안정적, 경계 부드러움'}].map(({k,desc})=>(
              <div key={k} className={'flex gap-2 px-2 py-1 rounded '+(K===k?'bg-blue-50 border border-blue-200':'')}>
                <span className="font-mono font-bold text-blue-600">k={k}</span>
                <span className="text-gray-600">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Code>{[
        '# 04.kNN_exam.py',
        'knn = cv2.ml.KNearest_create()',
        'knn.train(traindata, cv2.ml.ROW_SAMPLE, labels)',
        '',
        '# k='+K+' 이웃으로 분류',
        'ret, results, neighbours, dist = knn.findNearest(test_pt, k='+K+')',
        'print(f"예측 클래스: {int(results[0][0])}")',
      ].join('\n')}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 4: 워핑 원리 (08~10)
══════════════════════════════ */
function WarpingTab() {
  const [pivotX, setPivotX] = useState(100);
  const [offsetX, setOffsetX] = useState(20);

  /* 08.warping.py — 열 이동 방식 시뮬레이션 */
  const W=200;
  const getShift = (x) => {
    const ratio = x < pivotX ? x/pivotX : (W-x)/(W-pivotX);
    return Math.round(ratio * offsetX);
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-purple-50 border border-purple-200 rounded-lg p-2">
        💡 워핑(Warping) = 제어점을 중심으로 영상을 변형. 마우스 드래그로 원하는 방향으로 왜곡
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between text-xs mb-1"><span>기준 열 (pivot)</span><span className="font-bold">{pivotX}</span></div>
          <input type="range" min={30} max={170} value={pivotX} onChange={e=>setPivotX(Number(e.target.value))} className="w-full accent-purple-500"/>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1"><span>이동량 (offset)</span><span className="font-bold">{offsetX}px</span></div>
          <input type="range" min={-40} max={40} value={offsetX} onChange={e=>setOffsetX(Number(e.target.value))} className="w-full accent-indigo-500"/>
        </div>
      </div>

      {/* SVG 워핑 시각화 */}
      <div>
        <div className="text-xs font-bold text-gray-600 mb-1">워핑 전(점선) → 워핑 후(실선)</div>
        <svg width="100%" height="100" viewBox={`0 0 ${W} 100`} className="bg-gray-900 rounded-xl">
          {/* 원본 세로선들 */}
          {Array.from({length:11},(_,i)=>i*20).map(x=>(
            <line key={x} x1={x} y1={10} x2={x} y2={90} stroke="#374151" strokeWidth="0.5" strokeDasharray="3,3"/>
          ))}
          {/* 워핑된 세로선들 */}
          {Array.from({length:11},(_,i)=>i*20).map(x=>(
            <line key={x} x1={x+getShift(x)} y1={10} x2={x+getShift(x)} y2={90} stroke="#a78bfa" strokeWidth="1.5"/>
          ))}
          {/* 기준선 */}
          <line x1={pivotX} y1={0} x2={pivotX} y2={100} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2"/>
          <text x={pivotX+3} y={12} fill="#f59e0b" fontSize="8">pivot</text>
          {/* 원본 격자 */}
          <rect x={0} y={30} width={W} height={40} fill="none" stroke="#374151" strokeWidth="0.5" strokeDasharray="2,2"/>
          {/* 워핑 격자 */}
          <polyline points={Array.from({length:W+1},(_,x)=>`${x+getShift(x)},30`).join(' ')} fill="none" stroke="#60a5fa" strokeWidth="1"/>
          <polyline points={Array.from({length:W+1},(_,x)=>`${x+getShift(x)},70`).join(' ')} fill="none" stroke="#60a5fa" strokeWidth="1"/>
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
          <div className="font-bold text-purple-800">워핑 (Warping)</div>
          <div className="text-purple-700">제어점(pivot) 기준으로 픽셀 이동<br/>마우스 드래그로 변형량 지정</div>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3">
          <div className="font-bold text-indigo-800">모핑 (Morphing)</div>
          <div className="text-indigo-700">워핑 + addWeighted 크로스페이드<br/>두 영상 자연스럽게 전환</div>
        </div>
      </div>

      <Code>{[
        '# 08.warping.py — 수평 워핑',
        'def morphing():',
        '    for y in range(image.shape[0]):',
        '        for x in range(image.shape[1]):',
        '            ratio = x/'+pivotX+' if x < '+pivotX+' else (W-x)/(W-'+pivotX+')',
        '            dx = int(x + ratio * '+offsetX+')  # 이동량 계산',
        '            if 0 <= dx < W:',
        '                dst[y, dx] = image[y, x]',
        '',
        '# 마우스 드래그로 pt1(시작)→pt2(종료) 지정',
        'def onMouse(event, x, y, flags, param):',
        '    if event == cv2.EVENT_LBUTTONUP:',
        '        morphing()  # 드래그 종료 시 워핑',
      ].join('\n')}</Code>
    </div>
  );
}

/* ══════════════════════════════ 메인 ══════════════════════════════ */
export default function Chap10Diagram() {
  const [tab, setTab] = useState('hough');
  const tabs = [
    {id:'hough',  icon:'📏', label:'허프 변환',    file:'01~02'},
    {id:'harris', icon:'⭐', label:'해리스 코너',  file:'03'},
    {id:'knn',    icon:'🔵', label:'kNN 분류',     file:'04~07'},
    {id:'warp',   icon:'🌊', label:'워핑·모핑',    file:'08~10'},
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
        {tab==='hough'  && <HoughTab/>}
        {tab==='harris' && <HarrisTab/>}
        {tab==='knn'    && <KnnTab/>}
        {tab==='warp'   && <WarpingTab/>}
      </div>
    </div>
  );
}
