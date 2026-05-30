import { useState } from 'react';

// HSV → RGB 변환
function hsvToRgb(h, s, v) {
  const hh = h / 60, i = Math.floor(hh), f = hh - i;
  const p = v*(1-s), q = v*(1-f*s), t = v*(1-(1-f)*s);
  let r,g,b;
  switch(i%6){
    case 0: [r,g,b]=[v,t,p]; break; case 1: [r,g,b]=[q,v,p]; break;
    case 2: [r,g,b]=[p,v,t]; break; case 3: [r,g,b]=[p,q,v]; break;
    case 4: [r,g,b]=[t,p,v]; break; default:[r,g,b]=[v,p,q];
  }
  return [Math.round(r*255),Math.round(g*255),Math.round(b*255)];
}

export default function ColorSpaceDiagram(){
  const [tab,setTab]=useState('hsv');
  const [hue,setHue]=useState(180);
  const [sat,setSat]=useState(80);
  const [val,setVal]=useState(90);

  const [r,g,b]=hsvToRgb(hue,sat/100,val/100);
  const bgColor=`rgb(${r},${g},${b})`;

  return (
    <div className="space-y-3">
      <div className="flex gap-2 border-b border-gray-200">
        {[['hsv','HSV 컬러 공간'],['rgb','RGB 채널'],['compare','컬러 공간 비교']].map(([id,lb])=>(
          <button key={id} onClick={()=>setTab(id)}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${tab===id?'border-orange-600 text-orange-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {lb}
          </button>
        ))}
      </div>

      {/* ── HSV ── */}
      {tab==='hsv' && (
        <div className="flex gap-5 flex-col lg:flex-row">
          {/* HSV 원통 SVG */}
          <div className="flex-shrink-0">
            <svg width={240} height={260} viewBox="0 0 240 260">
              {/* 색조(Hue) 원 */}
              {Array.from({length:36},(_,i)=>{
                const angle=i*10;
                const [cr,cg,cb]=hsvToRgb(angle,1,1);
                const x1=120+70*Math.cos(angle*Math.PI/180);
                const y1=100+70*Math.sin(angle*Math.PI/180);
                const x2=120+90*Math.cos(angle*Math.PI/180);
                const y2=100+90*Math.sin(angle*Math.PI/180);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={`rgb(${cr},${cg},${cb})`} strokeWidth={8}/>;
              })}
              <circle cx={120} cy={100} r={65} fill={`hsla(${hue},${sat}%,${50}%,0.9)`} stroke="white" strokeWidth={2}/>
              <text x={120} y={104} textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">
                채도·밝기
              </text>
              <text x={120} y={118} textAnchor="middle" fontSize="10" fill="white">
                S={sat}% V={val}%
              </text>

              {/* Hue 화살표 */}
              {(()=>{
                const ax=120+80*Math.cos(hue*Math.PI/180);
                const ay=100+80*Math.sin(hue*Math.PI/180);
                return <line x1={120} y1={100} x2={ax} y2={ay} stroke="white" strokeWidth={2.5}/>;
              })()}

              {/* 레이블 */}
              {[[0,'0°빨강'],[60,'60°노랑'],[120,'120°초록'],[180,'180°청록'],[240,'240°파랑'],[300,'300°보라']].map(([a,label])=>{
                const lx=120+105*Math.cos(a*Math.PI/180);
                const ly=100+105*Math.sin(a*Math.PI/180);
                const [lr,lg,lb_]=hsvToRgb(a,1,0.9);
                return <text key={a} x={lx} y={ly+4} textAnchor="middle" fontSize="8" fill={`rgb(${lr},${lg},${lb_})`}>{label}</text>;
              })}

              {/* 채도·밝기 막대 */}
              <text x={20} y={195} fontSize="9" fill="#9ca3af">채도(S)</text>
              <defs>
                <linearGradient id="satGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white"/>
                  <stop offset="100%" stopColor={`hsl(${hue},100%,50%)`}/>
                </linearGradient>
                <linearGradient id="valGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="black"/>
                  <stop offset="100%" stopColor={`hsl(${hue},${sat}%,50%)`}/>
                </linearGradient>
              </defs>
              <rect x={55} y={188} width={130} height={12} rx={4} fill="url(#satGrad)"/>
              <circle cx={55+sat/100*130} cy={194} r={6} fill="white" stroke="#374151" strokeWidth={1.5}/>
              <text x={20} y={222} fontSize="9" fill="#9ca3af">밝기(V)</text>
              <rect x={55} y={215} width={130} height={12} rx={4} fill="url(#valGrad)"/>
              <circle cx={55+val/100*130} cy={221} r={6} fill="white" stroke="#374151" strokeWidth={1.5}/>

              {/* 결과 색상 */}
              <rect x={75} y={238} width={90} height={18} rx={6} fill={bgColor} stroke="white" strokeWidth={1}/>
              <text x={120} y={250} textAnchor="middle" fontSize="9" fill={val>50?'black':'white'}>
                H={hue} S={sat} V={val}
              </text>
            </svg>
          </div>

          {/* 슬라이더 */}
          <div className="flex-1 space-y-4">
            {[
              {label:'색조 H (Hue)',val:hue,set:setHue,min:0,max:359,unit:'°',
               desc:'색의 종류 (0=빨강, 120=초록, 240=파랑)',color:'#ef4444'},
              {label:'채도 S (Saturation)',val:sat,set:setSat,min:0,max:100,unit:'%',
               desc:'색의 선명도 (0=무채색, 100=가장 선명)',color:'#22c55e'},
              {label:'밝기 V (Value)',val:val,set:setVal,min:0,max:100,unit:'%',
               desc:'색의 밝음 (0=검정, 100=가장 밝음)',color:'#3b82f6'},
            ].map(s=>(
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium" style={{color:s.color}}>{s.label}</span>
                  <span className="font-bold" style={{color:s.color}}>{s.val}{s.unit}</span>
                </div>
                <input type="range" min={s.min} max={s.max} value={s.val}
                  onChange={e=>s.set(Number(e.target.value))}
                  className="w-full" style={{accentColor:s.color}}/>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </div>
            ))}

            <div className="rounded-xl p-3 border-2 text-center transition-all"
              style={{borderColor:bgColor,backgroundColor:bgColor+'30'}}>
              <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{backgroundColor:bgColor}}/>
              <div className="font-mono text-xs text-gray-700">
                RGB: ({r}, {g}, {b})
              </div>
              <div className="text-xs text-gray-500 mt-1">
                HEX: #{r.toString(16).padStart(2,'0')}{g.toString(16).padStart(2,'0')}{b.toString(16).padStart(2,'0')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── RGB 채널 ── */}
      {tab==='rgb' && (
        <div className="space-y-3">
          <svg width="100%" viewBox="0 0 420 180" style={{maxWidth:420}}>
            {/* RGB 큐브 */}
            {[
              {label:'R',cx:80,cy:90,cr:'#ef4444',desc:'빨강 (0~255)'},
              {label:'G',cx:210,cy:90,cr:'#22c55e',desc:'초록 (0~255)'},
              {label:'B',cx:340,cy:90,cr:'#3b82f6',desc:'파랑 (0~255)'},
            ].map(ch=>(
              <g key={ch.label}>
                {/* 그라데이션 막대 */}
                <defs>
                  <linearGradient id={`cg${ch.label}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="black"/>
                    <stop offset="100%" stopColor={ch.cr}/>
                  </linearGradient>
                </defs>
                <rect x={ch.cx-50} y={55} width={100} height={24} rx={6} fill={`url(#cg${ch.label})`} stroke={ch.cr} strokeWidth={1}/>
                <text x={ch.cx} y={47} textAnchor="middle" fontSize="20" fontWeight="bold" fill={ch.cr}>{ch.label}</text>
                <text x={ch.cx} y={100} textAnchor="middle" fontSize="9" fill="#6b7280">{ch.desc}</text>
              </g>
            ))}
            {/* + 기호 */}
            {[145,275].map(x=>(
              <text key={x} x={x} y={72} textAnchor="middle" fontSize="20" fill="#9ca3af">+</text>
            ))}
            {/* = 결과 */}
            <text x={210} y={145} textAnchor="middle" fontSize="12" fill="#374151">
              3채널 합성 → 컬러 영상 (24bit)
            </text>
            <defs>
              <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                {[0,30,60,120,180,240,300,360].map((h,i)=>{
                  const [cr,cg,cb]=hsvToRgb(h,1,1);
                  return <stop key={i} offset={`${i/7*100}%`} stopColor={`rgb(${cr},${cg},${cb})`}/>;
                })}
              </linearGradient>
            </defs>
            <rect x={90} y={155} width={240} height={16} rx={6} fill="url(#rainbow)"/>
          </svg>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-red-50 border border-red-200 rounded-lg p-2">
              <div className="font-bold text-red-600 mb-1">BGR vs RGB</div>
              <div className="text-gray-600">OpenCV: B·G·R 순서<br/>matplotlib: R·G·B 순서<br/>변환: img[:,:,::-1] 또는<br/>cv2.cvtColor(..., COLOR_BGR2RGB)</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
              <div className="font-bold text-blue-600 mb-1">특수 색상 (BGR)</div>
              <div className="text-gray-600">
                빨강: (0, 0, 255)<br/>
                초록: (0, 255, 0)<br/>
                파랑: (255, 0, 0)<br/>
                흰색: (255, 255, 255)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 컬러 공간 비교 ── */}
      {tab==='compare' && (
        <div className="space-y-3">
          {[
            {name:'BGR/RGB',axes:['B (파랑)','G (초록)','R (빨강)'],use:'기본 컬러 표현, 화소 처리',color:'#3b82f6',shape:'cube'},
            {name:'HSV',axes:['H (색조 0~360°)','S (채도 0~100%)','V (밝기 0~100%)'],use:'색상 기반 검출, 조명 변화에 강함',color:'#f59e0b',shape:'cylinder'},
            {name:'Lab',axes:['L (밝기)','a (빨강-초록)','b (노랑-파랑)'],use:'인간 시각에 균일한 색차, 색상 비교',color:'#a855f7',shape:'sphere'},
            {name:'YUV / YCrCb',axes:['Y (밝기)','U/Cr (색차1)','V/Cb (색차2)'],use:'JPEG 압축, 방송 표준, 밝기 분리',color:'#22c55e',shape:'cube'},
          ].map(cs=>(
            <div key={cs.name} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-gray-200">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                style={{backgroundColor:cs.color}}>
                {cs.name.split('/')[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-gray-800">{cs.name}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {cs.axes.map(a=>(
                    <span key={a} className="text-xs px-1.5 py-0.5 rounded-full text-white" style={{backgroundColor:cs.color+'cc'}}>{a}</span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">{cs.use}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
