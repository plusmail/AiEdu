import { useState } from 'react';

const W=440,H=260,PX=50,PY=25;
const DATA=[[9,6.7],[11,9.8],[14,19.7],[17,60],[20,90],[23,150],[26,218],[30,320],[35,680],[38,850],[40,1015]];
const xMin=5,xMax=55,yMin=-80,yMax=1100;
const sx=x=>PX+(x-xMin)/(xMax-xMin)*(W-PX*2);
const sy=y=>H-PY-(y-yMin)/(yMax-yMin)*(H-PY*2);

// 선형 회귀 계수 (미리 계산: y = 30.6x - 388)
const LR_A=30.6,LR_B=-388;
// 다항 회귀 (degree=2: y = 1.6x² - 24x + 102)
const POLY=(x)=>1.6*x*x-24*x+102;

const trainXmax=42;

export default function RegressionDiagram() {
  const [model, setModel] = useState('both');
  const [hoverX, setHoverX] = useState(null);

  const knnPredict=(qx)=>{
    const k=3;
    const dists=DATA.map(([x,y])=>({d:Math.abs(x-qx),y})).sort((a,b)=>a.d-b.d).slice(0,k);
    return dists.reduce((s,n)=>s+n.y,0)/k;
  };

  // 선형 회귀 포인트 (직선)
  const lrPoints=[5,10,15,20,25,30,35,40,45,50,55].map(x=>({x,y:LR_A*x+LR_B}));
  // 다항 회귀 포인트 (곡선)
  const polyPoints=Array.from({length:50},(_,i)=>{const x=5+i*1;return {x,y:POLY(x)};});
  // KNN 회귀 포인트
  const knnPoints=[5,8,10,13,15,18,20,22,25,28,30,32,35,38,40,42,45,48,52,55].map(x=>({x,y:knnPredict(x)}));

  const pathStr=(pts,clip=false)=>{
    const filtered=clip?pts.filter(p=>p.x<=trainXmax):pts;
    return filtered.map((p,i)=>`${i===0?'M':'L'}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(' ');
  };

  const hx=hoverX?sx(hoverX):null;

  return (
    <div className="space-y-3">
      {/* 모델 선택 */}
      <div className="flex flex-wrap gap-2 text-sm">
        {[['both','전체 비교'],['linear','선형 회귀'],['poly','다항 회귀'],['knn','KNN 회귀']].map(([v,lb])=>(
          <button key={v} onClick={()=>setModel(v)}
            className={`px-3 py-1.5 rounded-lg border transition-all font-medium text-xs ${model===v?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
            {lb}
          </button>
        ))}
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="bg-gray-950 rounded-xl overflow-hidden flex-shrink-0">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:'block'}}
            onMouseMove={e=>{
              const rect=e.currentTarget.getBoundingClientRect();
              const mx=e.clientX-rect.left;
              const dataX=xMin+(mx-PX)/(W-PX*2)*(xMax-xMin);
              if(dataX>=xMin&&dataX<=xMax) setHoverX(Math.round(dataX));
            }}
            onMouseLeave={()=>setHoverX(null)}>
            {/* 훈련 범위 표시 */}
            <rect x={sx(xMin)} y={PY} width={sx(trainXmax)-sx(xMin)} height={H-PY*2}
              fill="rgba(255,255,255,0.03)" stroke="none"/>
            <rect x={sx(trainXmax)} y={PY} width={W-PX-sx(trainXmax)} height={H-PY*2}
              fill="rgba(239,68,68,0.07)" stroke="none"/>
            <line x1={sx(trainXmax)} y1={PY} x2={sx(trainXmax)} y2={H-PY}
              stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5,3"/>
            <text x={sx(trainXmax)+4} y={PY+12} fontSize="9" fill="#ef4444">훈련 범위 끝</text>
            <text x={sx(48)} y={PY+12} fontSize="9" fill="#ef444480">외삽 구간</text>

            {/* 그리드 */}
            {[10,20,30,40,50].map(x=>(
              <g key={x}>
                <line x1={sx(x)} y1={PY} x2={sx(x)} y2={H-PY} stroke="#1f2937" strokeWidth={1}/>
                <text x={sx(x)} y={H-6} textAnchor="middle" fontSize="9" fill="#6b7280">{x}</text>
              </g>
            ))}
            {[0,200,400,600,800,1000].map(y=>(
              <g key={y}>
                <line x1={PX} y1={sy(y)} x2={W-PX} y2={sy(y)} stroke="#1f2937" strokeWidth={1}/>
                <text x={PX-3} y={sy(y)+4} textAnchor="end" fontSize="9" fill="#6b7280">{y}</text>
              </g>
            ))}

            {/* KNN 회귀 선 */}
            {(model==='knn'||model==='both')&&(
              <>
                <path d={pathStr(knnPoints,true)} fill="none" stroke="#22c55e" strokeWidth={2} strokeDasharray="5,2"/>
                <path d={pathStr(knnPoints.filter(p=>p.x>trainXmax))} fill="none" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="3,2" strokeOpacity={0.5}/>
                {/* KNN 외삽 평탄화 표시 */}
                <text x={sx(48)} y={sy(knnPredict(48))-8} fontSize="9" fill="#22c55e">↔ 평탄화 (한계)</text>
              </>
            )}
            {/* 선형 회귀 선 */}
            {(model==='linear'||model==='both')&&(
              <path d={pathStr(lrPoints)} fill="none" stroke="#f59e0b" strokeWidth={2}/>
            )}
            {/* 다항 회귀 선 */}
            {(model==='poly'||model==='both')&&(
              <path d={pathStr(polyPoints)} fill="none" stroke="#a855f7" strokeWidth={2}/>
            )}

            {/* 훈련 데이터 */}
            {DATA.map(([x,y],i)=>(
              <circle key={i} cx={sx(x)} cy={sy(y)} r={4} fill="#60a5fa" stroke="white" strokeWidth={1}/>
            ))}

            {/* 호버 수직선 */}
            {hoverX&&(
              <g>
                <line x1={hx} y1={PY} x2={hx} y2={H-PY} stroke="white" strokeWidth={1} strokeDasharray="3,2" strokeOpacity={0.4}/>
                <rect x={hx+4} y={PY+2} width={90} height={model==='both'?52:20} rx={3} fill="rgba(0,0,0,0.8)"/>
                <text x={hx+8} y={PY+14} fontSize="10" fill="white">x={hoverX}cm</text>
                {(model==='linear'||model==='both')&&<text x={hx+8} y={PY+26} fontSize="9" fill="#f59e0b">선형: {(LR_A*hoverX+LR_B).toFixed(0)}g</text>}
                {(model==='poly'||model==='both')&&<text x={hx+8} y={PY+38} fontSize="9" fill="#a855f7">다항: {POLY(hoverX).toFixed(0)}g</text>}
                {(model==='knn'||model==='both')&&<text x={hx+8} y={PY+(model==='both'?50:26)} fontSize="9" fill="#22c55e">KNN: {knnPredict(hoverX).toFixed(0)}g</text>}
              </g>
            )}

            <text x={W/2} y={H-1} textAnchor="middle" fontSize="10" fill="#9ca3af">길이 (cm)</text>
            <text x={12} y={H/2} textAnchor="middle" fontSize="10" fill="#9ca3af" transform={`rotate(-90,12,${H/2})`}>무게 (g)</text>

            {/* 범례 */}
            <line x1={PX} y1={PY-10} x2={PX+18} y2={PY-10} stroke="#f59e0b" strokeWidth={2}/>
            <text x={PX+22} y={PY-6} fontSize="9" fill="#f59e0b">선형 회귀</text>
            <line x1={PX+70} y1={PY-10} x2={PX+88} y2={PY-10} stroke="#a855f7" strokeWidth={2}/>
            <text x={PX+92} y={PY-6} fontSize="9" fill="#a855f7">다항 회귀</text>
            <line x1={PX+148} y1={PY-10} x2={PX+166} y2={PY-10} stroke="#22c55e" strokeWidth={2} strokeDasharray="5,2"/>
            <text x={PX+170} y={PY-6} fontSize="9" fill="#22c55e">KNN 회귀</text>
          </svg>
        </div>

        <div className="flex-1 space-y-2">
          {[
            { color:'#22c55e', title:'KNN 회귀 한계', desc:'훈련 범위(42cm) 밖을 예측하면 가장 끝 이웃들의 평균에 고정됩니다. 길이 50cm 생선도 40cm와 같은 예측값!', bad:true },
            { color:'#f59e0b', title:'선형 회귀 (y=ax+b)', desc:'직선을 학습해 범위 밖으로도 외삽 가능. 하지만 실제 데이터가 곡선이면 직선으로는 한계가 있습니다.', bad:false },
            { color:'#a855f7', title:'다항 회귀 (y=ax²+bx+c)', desc:'특성의 거듭제곱을 추가해 곡선을 적합합니다. 범위 밖 예측도 가능하며 곡선 패턴도 잘 잡아냅니다.', bad:false },
          ].map(m=>(
            <div key={m.title} className={`rounded-xl p-3 border ${m.bad?'bg-red-50 border-red-200':'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor:m.color}}/>
                <span className="text-xs font-bold" style={{color:m.color}}>{m.title}</span>
                {m.bad&&<span className="text-xs bg-red-100 text-red-600 px-1.5 rounded">외삽 불가</span>}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
          <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
            💡 그래프 위에 마우스를 올려 각 모델의 예측값을 비교해보세요
          </div>
        </div>
      </div>
    </div>
  );
}
