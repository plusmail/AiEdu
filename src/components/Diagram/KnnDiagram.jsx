import { useState, useMemo } from 'react';

// 도미(1) / 빙어(0) 샘플 [길이, 무게, 레이블]
const DATA = [
  [25,242,1],[26,290,1],[29,363,1],[31,500,1],[33,650,1],[35,700,1],[36,725,1],[38,850,1],
  [10,7,0],[11,10,0],[12,12,0],[13,16,0],[14,20,0],[15,22,0],
];

const W=440, H=280, PX=48, PY=30;
const xMin=8,xMax=42,yMin=0,yMax=950;
const sx = (x)=> PX + (x-xMin)/(xMax-xMin)*(W-PX*2);
const sy = (y)=> H-PY - (y-yMin)/(yMax-yMin)*(H-PY*2);
const dist = ([x1,y1],[x2,y2])=>{
  const nx=(x1-x2)/(xMax-xMin), ny=(y1-y2)/(yMax-yMin);
  return Math.sqrt(nx*nx+ny*ny);
};

const TEST_POINTS = [
  { label:'?', length:28, weight:400, key:'A' },
  { label:'?', length:12, weight:11, key:'B' },
];

export default function KnnDiagram() {
  const [k, setK] = useState(3);
  const [testIdx, setTestIdx] = useState(0);
  const tp = TEST_POINTS[testIdx];

  const neighbors = useMemo(()=>{
    return DATA
      .map((d,i)=>({ i, d: dist([d[0],d[1]],[tp.length,tp.weight]), label: d[2] }))
      .sort((a,b)=>a.d-b.d)
      .slice(0, k);
  }, [k, testIdx]);

  const votes = neighbors.reduce((a,n)=>{a[n.label]=(a[n.label]||0)+1;return a;},{});
  const pred = (votes[1]||0) >= (votes[0]||0) ? '도미 🐡' : '빙어 🐟';
  const predColor = (votes[1]||0) >= (votes[0]||0) ? '#ef4444' : '#3b82f6';

  const maxD = Math.max(...neighbors.map(n=>n.d));
  const [rx, ry] = [sx(tp.length), sy(tp.weight)];

  return (
    <div className="space-y-3">
      {/* 컨트롤 */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">K =</span>
          {[1,3,5,7].map(v=>(
            <button key={v} onClick={()=>setK(v)}
              className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${k===v?'bg-blue-600 text-white shadow-md scale-110':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {v}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">테스트 샘플:</span>
          {TEST_POINTS.map((tp,i)=>(
            <button key={tp.key} onClick={()=>setTestIdx(i)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all border ${testIdx===i?'bg-purple-600 text-white border-purple-600':'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
              샘플 {tp.key} (길이 {tp.length}, 무게 {tp.weight})
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        {/* SVG 산점도 */}
        <div className="bg-gray-950 rounded-xl overflow-hidden flex-shrink-0">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display:'block' }}>
            {/* 그리드 */}
            {[10,15,20,25,30,35,40].map(x=>(
              <g key={x}>
                <line x1={sx(x)} y1={PY} x2={sx(x)} y2={H-PY} stroke="#1f2937" strokeWidth={1}/>
                <text x={sx(x)} y={H-8} textAnchor="middle" fontSize="9" fill="#6b7280">{x}cm</text>
              </g>
            ))}
            {[0,200,400,600,800].map(y=>(
              <g key={y}>
                <line x1={PX} y1={sy(y)} x2={W-PX} y2={sy(y)} stroke="#1f2937" strokeWidth={1}/>
                <text x={PX-4} y={sy(y)+4} textAnchor="end" fontSize="9" fill="#6b7280">{y}</text>
              </g>
            ))}

            {/* K-거리 원 */}
            {maxD > 0 && (() => {
              const radiusX = maxD * (W-PX*2)/(xMax-xMin) * 1.05;
              const radiusY = maxD * (H-PY*2)/(yMax-yMin) * 1.05;
              return (
                <ellipse cx={rx} cy={ry} rx={radiusX} ry={radiusY}
                  fill="rgba(168,85,247,0.07)" stroke="#a855f7" strokeWidth={1.5} strokeDasharray="5,3"/>
              );
            })()}

            {/* 이웃 연결선 */}
            {neighbors.map(n=>(
              <line key={n.i} x1={rx} y1={ry} x2={sx(DATA[n.i][0])} y2={sy(DATA[n.i][1])}
                stroke="#a855f7" strokeWidth={1} strokeDasharray="3,2" strokeOpacity={0.6}/>
            ))}

            {/* 훈련 데이터 */}
            {DATA.map(([l,w,lb],i)=>{
              const isNeighbor = neighbors.some(n=>n.i===i);
              return (
                <g key={i}>
                  {isNeighbor && (
                    <circle cx={sx(l)} cy={sy(w)} r={10}
                      fill="none" stroke={lb===1?'#ef4444':'#3b82f6'} strokeWidth={2}
                      opacity={0.7}/>
                  )}
                  <circle cx={sx(l)} cy={sy(w)} r={isNeighbor?6:4.5}
                    fill={lb===1?'#ef4444':'#3b82f6'}
                    stroke="white" strokeWidth={isNeighbor?2:1}
                    style={{ transition:'all 0.2s' }}/>
                </g>
              );
            })}

            {/* 테스트 포인트 */}
            <g>
              <circle cx={rx} cy={ry} r={14} fill="#a855f7" fillOpacity={0.2}/>
              <text x={rx} y={ry+5} textAnchor="middle" fontSize="16">⭐</text>
              <text x={rx} y={ry-18} textAnchor="middle" fontSize="10" fill="#e9d5ff" fontWeight="bold">
                새 샘플
              </text>
            </g>

            {/* 축 레이블 */}
            <text x={W/2} y={H-1} textAnchor="middle" fontSize="10" fill="#9ca3af">길이 (cm)</text>
            <text x={10} y={H/2} textAnchor="middle" fontSize="10" fill="#9ca3af"
              transform={`rotate(-90,10,${H/2})`}>무게 (g)</text>

            {/* 범례 */}
            <circle cx={PX+5} cy={PY-12} r={5} fill="#ef4444"/>
            <text x={PX+14} y={PY-8} fontSize="10" fill="#fca5a5">도미</text>
            <circle cx={PX+45} cy={PY-12} r={5} fill="#3b82f6"/>
            <text x={PX+54} y={PY-8} fontSize="10" fill="#93c5fd">빙어</text>
          </svg>
        </div>

        {/* 투표 결과 패널 */}
        <div className="flex-1 space-y-3">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="text-xs font-bold text-gray-500 mb-3">K={k} 최근접 이웃</div>
            <div className="space-y-1.5">
              {neighbors.map((n,i)=>(
                <div key={n.i} className="flex items-center gap-2 text-xs">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: DATA[n.i][2]===1?'#ef4444':'#3b82f6' }}>
                    {i+1}
                  </span>
                  <span className="text-gray-600">
                    길이{DATA[n.i][0]}·무게{DATA[n.i][1]}
                  </span>
                  <span className="font-bold" style={{ color: DATA[n.i][2]===1?'#ef4444':'#3b82f6' }}>
                    {DATA[n.i][2]===1?'도미':'빙어'}
                  </span>
                  <span className="text-gray-400 ml-auto">거리 {n.d.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 투표 바 */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="text-xs font-bold text-gray-500 mb-2">다수결 투표</div>
            {[{lb:'도미',c:1,color:'#ef4444'},{lb:'빙어',c:0,color:'#3b82f6'}].map(({lb,c,color})=>(
              <div key={lb} className="flex items-center gap-2 mb-1.5">
                <span className="text-xs w-8 font-medium" style={{ color }}>{lb}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div className="h-4 rounded-full flex items-center justify-end pr-1.5 transition-all duration-500 text-white text-xs font-bold"
                    style={{ width:`${((votes[c]||0)/k)*100}%`, backgroundColor:color, minWidth:'20px' }}>
                    {votes[c]||0}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 예측 결과 */}
          <div className="rounded-xl p-4 text-center border-2 transition-all"
            style={{ borderColor:predColor, backgroundColor:predColor+'15' }}>
            <div className="text-xs text-gray-500 mb-1">예측 결과</div>
            <div className="text-2xl font-bold" style={{ color:predColor }}>{pred}</div>
            <div className="text-xs text-gray-400 mt-1">K={k} 이웃 중 과반수</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
        💡 K 값을 바꾸거나 테스트 샘플을 바꿔서 결과 변화를 확인하세요. K가 작으면 노이즈에 민감, 크면 경계가 부드러워집니다.
      </div>
    </div>
  );
}
