import { useState, useMemo } from 'react';

const W=320, H=220;

// 이미지 공간: 직선 위의 에지 포인트들
const EDGE_POINTS = [[40,40],[80,80],[120,120],[160,160],[200,200]]; // 대각선
const EXTRA_POINTS = [[60,150],[100,60],[180,100]]; // 노이즈 포인트

export default function HoughTransformDiagram(){
  const [step, setStep] = useState(0);
  const [showCircle, setShowCircle] = useState(false);

  const steps = [
    {
      title:'Step 1 — 에지 영상',
      desc:'Canny 엣지 검출로 경계 픽셀만 추출합니다. 각 흰 점 = 에지 픽셀.',
      color:'#60a5fa',
    },
    {
      title:'Step 2 — ρ-θ 파라미터 공간 투표',
      desc:'각 에지 픽셀(x,y)에 대해 모든 θ에서 ρ = x·cosθ + y·sinθ를 계산해 누적 배열에 투표.',
      color:'#a855f7',
    },
    {
      title:'Step 3 — 누적 최댓값 선택',
      desc:'가장 많이 투표된 (ρ,θ) = 직선 파라미터. 임계값 이상인 것만 직선으로 선택.',
      color:'#f59e0b',
    },
    {
      title:'Step 4 — 직선 그리기',
      desc:'선택된 (ρ,θ)로 원본 영상에 직선을 그립니다.',
      color:'#22c55e',
    },
  ];

  const s = steps[step];

  // 파라미터 공간 시각화 (θ-ρ 그래프 포인트)
  const sineCurves = useMemo(()=>{
    return EDGE_POINTS.map(([x,y])=>{
      return Array.from({length:36},(_,i)=>{
        const theta = i*5*Math.PI/180;
        const rho = x*Math.cos(theta)+y*Math.sin(theta);
        return {theta:i*5, rho};
      });
    });
  },[]);

  return (
    <div className="space-y-3">
      {/* 스텝 선택 */}
      <div className="flex gap-2 flex-wrap">
        {steps.map((s,i)=>(
          <button key={i} onClick={()=>setStep(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border-2 ${step===i?'text-white border-transparent':'bg-white text-gray-600 border-gray-300'}`}
            style={{backgroundColor:step===i?s.color:''}}>
            Step {i+1}
          </button>
        ))}
        <button onClick={()=>setShowCircle(!showCircle)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all ${showCircle?'bg-teal-600 text-white border-teal-600':'bg-white text-gray-600 border-gray-300'}`}>
          허프 원 보기
        </button>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        {/* 이미지 공간 SVG */}
        <div className="space-y-1">
          <div className="text-xs font-bold text-gray-600">이미지 공간 ({W}×{H})</div>
          <div className="bg-gray-950 rounded-xl overflow-hidden">
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:'block'}}>
              {/* 배경 그리드 */}
              {Array.from({length:8},(_,i)=>(
                <g key={i}>
                  <line x1={i*40} y1={0} x2={i*40} y2={H} stroke="#1e293b" strokeWidth={1}/>
                  <line x1={0} y1={i*30} x2={W} y2={i*30} stroke="#1e293b" strokeWidth={1}/>
                </g>
              ))}

              {/* 노이즈 에지 */}
              {(step>=0)&&EXTRA_POINTS.map(([x,y],i)=>(
                <circle key={i} cx={x} cy={y} r={4} fill="#4b5563"/>
              ))}

              {/* 주요 에지 포인트 */}
              {EDGE_POINTS.map(([x,y],i)=>(
                <g key={i}>
                  {step===1 && (
                    <circle cx={x} cy={y} r={12} fill="none" stroke="#a855f7" strokeWidth={1.5} strokeDasharray="3,2" strokeOpacity={0.5}/>
                  )}
                  <circle cx={x} cy={y} r={5}
                    fill={step>=1?s.color:'#60a5fa'}
                    stroke="white" strokeWidth={1.5}
                    style={{transition:'fill 0.3s'}}/>
                </g>
              ))}

              {/* 검출된 직선 */}
              {step>=3 && (
                <line x1={0} y1={0} x2={240} y2={240} stroke="#22c55e" strokeWidth={2.5}
                  strokeDasharray={step===3?'none':'5,0'}/>
              )}

              {/* 허프 원 예시 */}
              {showCircle && (
                <>
                  <circle cx={160} cy={110} r={60} fill="none" stroke="#f59e0b" strokeWidth={2}/>
                  <circle cx={160} cy={110} r={3} fill="#f59e0b"/>
                  <text x={165} y={115} fontSize="10" fill="#f59e0b">중심</text>
                </>
              )}

              <text x={5} y={15} fontSize="10" fill="#6b7280">x→</text>
              <text x={5} y={H-5} fontSize="10" fill="#6b7280">y↓</text>
            </svg>
          </div>
        </div>

        {/* 파라미터 공간 (Step 1~2) */}
        {step<=2 && (
          <div className="space-y-1">
            <div className="text-xs font-bold text-gray-600">ρ-θ 파라미터 공간</div>
            <div className="bg-gray-950 rounded-xl overflow-hidden">
              <svg width={240} height={H} viewBox={`0 0 240 ${H}`} style={{display:'block'}}>
                {/* 그리드 */}
                {Array.from({length:6},(_,i)=>(
                  <g key={i}>
                    <line x1={i*40} y1={0} x2={i*40} y2={H} stroke="#1e293b" strokeWidth={1}/>
                    <line x1={0} y1={i*37} x2={240} y2={i*37} stroke="#1e293b" strokeWidth={1}/>
                  </g>
                ))}

                {/* 사인 곡선들 */}
                {step>=1&&sineCurves.map((curve,ci)=>{
                  const path=curve.map((p,i)=>{
                    const px=p.theta/180*200+20;
                    const py=H/2-p.rho*0.5;
                    return `${i===0?'M':'L'}${px.toFixed(1)},${py.toFixed(1)}`;
                  }).join(' ');
                  return <path key={ci} d={path} fill="none"
                    stroke={`hsl(${ci*60},80%,60%)`} strokeWidth={1.5} strokeOpacity={0.8}/>;
                })}

                {/* 교차점 강조 */}
                {step>=2 && (
                  <>
                    <circle cx={130} cy={60} r={10} fill="none" stroke="#f59e0b" strokeWidth={2.5}/>
                    <circle cx={130} cy={60} r={5} fill="#f59e0b"/>
                    <text x={142} y={55} fontSize="9" fill="#fde68a">최다 투표!</text>
                    <text x={142} y={67} fontSize="8" fill="#fde68a">(ρ≈170, θ≈45°)</text>
                  </>
                )}

                <text x={5} y={15} fontSize="10" fill="#6b7280">ρ↑</text>
                <text x={200} y={H-5} fontSize="10" fill="#6b7280">θ→</text>
                <text x={15} y={H/2} textAnchor="middle" fontSize="8" fill="#4b5563">0</text>
                <line x1={20} y1={H/2} x2={220} y2={H/2} stroke="#374151" strokeWidth={1} strokeDasharray="4,2"/>
              </svg>
            </div>
          </div>
        )}

        {/* 설명 (Step 3~4) */}
        {step>=3 && (
          <div className="flex-1 space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="font-bold text-green-700 mb-2">직선 검출 완료</div>
              <div className="font-mono text-xs text-gray-700 space-y-1">
                <div>ρ ≈ 170, θ ≈ 45°</div>
                <div>직선 방정식: ρ = x·cos45° + y·sin45°</div>
              </div>
            </div>
            <div className="text-xs text-gray-600 bg-gray-50 rounded-xl p-3 border border-gray-200">
              <div className="font-bold mb-1">실제 OpenCV 코드</div>
              <div className="font-mono space-y-1 text-xs text-gray-700">
                <div>edges = cv2.Canny(gray, 50, 150)</div>
                <div>lines = cv2.HoughLinesP(edges,</div>
                <div>&nbsp;&nbsp;rho=1, theta=np.pi/180,</div>
                <div>&nbsp;&nbsp;threshold=100)</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 단계 설명 */}
      <div className="rounded-xl p-4 border-2 transition-all"
        style={{borderColor:s.color+'60',backgroundColor:s.color+'08'}}>
        <div className="font-bold text-sm mb-1" style={{color:s.color}}>{s.title}</div>
        <p className="text-sm text-gray-600">{s.desc}</p>
      </div>

      {/* 이전/다음 */}
      <div className="flex justify-between">
        <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
          className="px-4 py-1.5 text-xs border border-gray-300 rounded-lg disabled:opacity-30 text-gray-600 hover:bg-gray-50">
          ◀ 이전
        </button>
        <span className="text-xs text-gray-400 self-center">{step+1} / {steps.length}</span>
        <button onClick={()=>setStep(s=>Math.min(steps.length-1,s+1))} disabled={step===steps.length-1}
          className="px-4 py-1.5 text-xs border border-blue-300 rounded-lg disabled:opacity-30 text-blue-600 hover:bg-blue-50">
          다음 ▶
        </button>
      </div>
    </div>
  );
}
