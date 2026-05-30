import { useState, useMemo } from 'react';

// 3개 클러스터 데이터
const CLUSTERS = [
  { cx:80, cy:80, points:[[60,70],[75,60],[85,90],[100,75],[65,95],[90,55]] },
  { cx:220, cy:150, points:[[200,140],[230,130],[215,165],[240,150],[195,160],[225,175]] },
  { cx:340, cy:70, points:[[320,60],[350,55],[360,80],[335,90],[315,85],[345,70]] },
];
const ALL_POINTS = CLUSTERS.flatMap((c,ci)=>c.points.map(p=>({x:p[0],y:p[1],trueCluster:ci})));

const STEPS = [
  { title:'Step 1 — 중심 무작위 초기화', desc:'K개의 중심점을 무작위로 선택합니다.', centers:[{x:120,y:120,color:'#ef4444'},{x:180,y:100,color:'#3b82f6'},{x:280,y:130,color:'#22c55e'}] },
  { title:'Step 2 — 클러스터 배정', desc:'각 샘플을 가장 가까운 중심으로 배정합니다.', centers:[{x:120,y:120,color:'#ef4444'},{x:180,y:100,color:'#3b82f6'},{x:280,y:130,color:'#22c55e'}] },
  { title:'Step 3 — 중심 재계산', desc:'각 클러스터 내 샘플들의 평균으로 중심을 이동합니다.', centers:[{x:80,y:80,color:'#ef4444'},{x:220,y:150,color:'#3b82f6'},{x:340,y:70,color:'#22c55e'}] },
  { title:'Step 4 — 재배정 & 반복', desc:'수렴까지 2~3 단계를 반복합니다.', centers:[{x:80,y:80,color:'#ef4444'},{x:220,y:150,color:'#3b82f6'},{x:340,y:70,color:'#22c55e'}] },
  { title:'✅ 수렴 완료', desc:'중심이 더 이상 이동하지 않으면 알고리즘이 종료됩니다.', centers:[{x:80,y:80,color:'#ef4444'},{x:220,y:150,color:'#3b82f6'},{x:340,y:70,color:'#22c55e'}] },
];

const W=420, H=220;

function distP(a,b){return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2);}
function assignCluster(pt, centers){
  return centers.reduce((minIdx,c,i,arr)=>distP(pt,c)<distP(pt,arr[minIdx])?i:minIdx,0);
}

export default function KMeansDiagram(){
  const [step, setStep]=useState(0);
  const [k,setK]=useState(3);
  const s=STEPS[step];

  const assigned=useMemo(()=>{
    if(step===0) return ALL_POINTS.map(p=>({...p,cluster:-1}));
    return ALL_POINTS.map(p=>({...p,cluster:assignCluster(p,s.centers)}));
  },[step]);

  const clusterColors=['#ef4444','#3b82f6','#22c55e','#f59e0b','#a855f7'];

  return (
    <div className="space-y-3">
      {/* K 선택 */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600 font-medium">K =</span>
          {[2,3,4].map(v=>(
            <button key={v} onClick={()=>{setK(v);setStep(0);}}
              className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${k===v?'bg-cyan-600 text-white shadow-md scale-110':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {v}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {STEPS.map((_,i)=>(
            <button key={i} onClick={()=>setStep(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${step===i?'bg-cyan-600 scale-125':'bg-gray-300 hover:bg-gray-400'}`}/>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        {/* SVG */}
        <div className="bg-gray-950 rounded-xl overflow-hidden flex-shrink-0">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:'block'}}>
            {/* 포인트 → 중심 연결선 (step 2+) */}
            {step>=1&&assigned.map((p,i)=>(
              <line key={`l${i}`} x1={p.x} y1={p.y}
                x2={s.centers[p.cluster]?.x??p.x} y2={s.centers[p.cluster]?.y??p.y}
                stroke={clusterColors[p.cluster]??'gray'} strokeWidth={0.8} strokeOpacity={0.3}/>
            ))}

            {/* 데이터 포인트 */}
            {assigned.map((p,i)=>(
              <circle key={i} cx={p.x} cy={p.y} r={5}
                fill={step===0?'#6b7280':clusterColors[p.cluster]??'gray'}
                stroke="white" strokeWidth={1}
                style={{transition:'fill 0.5s'}}/>
            ))}

            {/* 클러스터 중심 */}
            {s.centers.slice(0,k).map((c,i)=>(
              <g key={i} style={{transition:'all 0.6s'}}>
                <circle cx={c.x} cy={c.y} r={16} fill={c.color} fillOpacity={0.15}
                  stroke={c.color} strokeWidth={2} strokeDasharray="4,2"/>
                <text x={c.x} y={c.y+5} textAnchor="middle" fontSize="16">✕</text>
                <text x={c.x} y={c.y-18} textAnchor="middle" fontSize="9" fill={c.color} fontWeight="bold">
                  중심 {i+1}
                </text>
              </g>
            ))}

            {/* step3+ 화살표 (이동 표시) */}
            {step===2&&[
              {from:{x:120,y:120},to:{x:80,y:80}},
              {from:{x:180,y:100},to:{x:220,y:150}},
              {from:{x:280,y:130},to:{x:340,y:70}},
            ].slice(0,k).map((arr,i)=>(
              <g key={i}>
                <line x1={arr.from.x} y1={arr.from.y} x2={arr.to.x} y2={arr.to.y}
                  stroke={clusterColors[i]} strokeWidth={2}
                  markerEnd={`url(#arrowK${i})`} strokeDasharray="4,2"/>
                <defs>
                  <marker id={`arrowK${i}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill={clusterColors[i]}/>
                  </marker>
                </defs>
              </g>
            ))}
          </svg>
        </div>

        {/* 설명 패널 */}
        <div className="flex-1 space-y-3">
          <div className="bg-cyan-50 border-2 border-cyan-300 rounded-xl p-4">
            <div className="font-bold text-cyan-800 mb-1">{s.title}</div>
            <div className="text-sm text-gray-600">{s.desc}</div>
          </div>

          {/* 클러스터 통계 */}
          {step>=1&&(
            <div className="space-y-1.5">
              {s.centers.slice(0,k).map((c,ci)=>{
                const members=assigned.filter(p=>p.cluster===ci);
                return (
                  <div key={ci} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor:c.color}}/>
                    <span className="text-gray-600">클러스터 {ci+1}:</span>
                    <span className="font-bold text-gray-800">{members.length}개</span>
                    <span className="text-gray-400">중심({c.x},{c.y})</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* 네비게이션 */}
          <div className="flex gap-2">
            <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
              className="flex-1 py-2 text-xs border border-gray-300 rounded-lg text-gray-600 disabled:opacity-30 hover:bg-gray-50">
              ◀ 이전
            </button>
            <span className="self-center text-xs text-gray-400">{step+1}/{STEPS.length}</span>
            <button onClick={()=>setStep(s=>Math.min(STEPS.length-1,s+1))} disabled={step===STEPS.length-1}
              className="flex-1 py-2 text-xs border border-cyan-300 bg-cyan-50 rounded-lg text-cyan-700 disabled:opacity-30 hover:bg-cyan-100">
              다음 ▶
            </button>
          </div>

          <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
            💡 K 값을 바꿔서 클러스터 결과가 어떻게 달라지는지 확인하세요
          </div>
        </div>
      </div>
    </div>
  );
}
