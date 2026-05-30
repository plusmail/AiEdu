import { useState } from 'react';

const W=440,H=220,PX=45,PY=25;
const zMin=-6,zMax=6;
const sz=z=>PX+(z-zMin)/(zMax-zMin)*(W-PX*2);
const sigmoid=z=>1/(1+Math.exp(-z));
const sp=p=>H-PY-p*(H-PY*2);

// SGD 경사 하강 경로 시뮬레이션
const sgdPath=(()=>{
  let w=-4,lr=0.5;
  const path=[{w,loss:(w*w)}];
  for(let i=0;i<20;i++){
    const grad=2*w+0.3*(Math.random()-0.5);
    w-=lr*grad; lr*=0.92;
    path.push({w,loss:(w*w)});
  }
  return path;
})();

export default function SigmoidDiagram() {
  const [tab,setTab]=useState('sigmoid');
  const [z,setZ]=useState(0);
  const prob=sigmoid(z);

  const curvePoints=Array.from({length:61},(_,i)=>{const zv=zMin+i*0.2;return {z:zv,p:sigmoid(zv)};});
  const pathStr=curvePoints.map((p,i)=>`${i===0?'M':'L'}${sz(p.z).toFixed(1)},${sp(p.p).toFixed(1)}`).join(' ');

  return (
    <div className="space-y-3">
      <div className="flex gap-2 border-b border-gray-200">
        {[['sigmoid','시그모이드 함수'],['sgd','경사 하강법 (SGD)'],['softmax','소프트맥스']].map(([id,lb])=>(
          <button key={id} onClick={()=>setTab(id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab===id?'border-purple-600 text-purple-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {lb}
          </button>
        ))}
      </div>

      {/* ── 시그모이드 ── */}
      {tab==='sigmoid'&&(
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="bg-gray-950 rounded-xl overflow-hidden flex-shrink-0">
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:'block'}}>
              {/* 결정 경계 0.5 */}
              <line x1={PX} y1={sp(0.5)} x2={W-PX} y2={sp(0.5)} stroke="#fbbf24" strokeWidth={1} strokeDasharray="5,3"/>
              <text x={W-PX+3} y={sp(0.5)+4} fontSize="9" fill="#fbbf24">0.5</text>
              {/* 0 라인 */}
              <line x1={sz(0)} y1={PY} x2={sz(0)} y2={H-PY} stroke="#374151" strokeWidth={1}/>

              {/* 그리드 */}
              {[-6,-4,-2,0,2,4,6].map(zv=>(
                <g key={zv}>
                  <text x={sz(zv)} y={H-6} textAnchor="middle" fontSize="9" fill="#6b7280">{zv}</text>
                </g>
              ))}
              {[0,0.25,0.5,0.75,1].map(pv=>(
                <g key={pv}>
                  <line x1={PX} y1={sp(pv)} x2={W-PX} y2={sp(pv)} stroke="#1f2937" strokeWidth={1}/>
                  <text x={PX-3} y={sp(pv)+4} textAnchor="end" fontSize="9" fill="#6b7280">{pv}</text>
                </g>
              ))}

              {/* 빨간/파란 영역 */}
              <rect x={sz(0)} y={PY} width={W-PX-sz(0)} height={H-PY*2} fill="rgba(239,68,68,0.06)"/>
              <rect x={PX} y={PY} width={sz(0)-PX} height={H-PY*2} fill="rgba(59,130,246,0.06)"/>

              {/* 시그모이드 곡선 */}
              <path d={pathStr} fill="none" stroke="#a855f7" strokeWidth={2.5}/>

              {/* 현재 z 포인트 */}
              <line x1={sz(z)} y1={PY} x2={sz(z)} y2={H-PY} stroke="white" strokeWidth={1} strokeDasharray="3,2" strokeOpacity={0.5}/>
              <line x1={PX} y1={sp(prob)} x2={W-PX} y2={sp(prob)} stroke="white" strokeWidth={1} strokeDasharray="3,2" strokeOpacity={0.5}/>
              <circle cx={sz(z)} cy={sp(prob)} r={7} fill="#a855f7" stroke="white" strokeWidth={2}/>
              <text x={sz(z)+10} y={sp(prob)-8} fontSize="10" fill="white">
                ({z.toFixed(1)}, {prob.toFixed(3)})
              </text>

              <text x={W/2} y={H-1} textAnchor="middle" fontSize="10" fill="#9ca3af">z (선형 결합)</text>
              <text x={10} y={H/2} textAnchor="middle" fontSize="10" fill="#9ca3af" transform={`rotate(-90,10,${H/2})`}>σ(z)</text>
            </svg>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>z = {zMin}</span><span className="font-bold text-purple-600">z = {z.toFixed(1)}</span><span>z = {zMax}</span>
              </div>
              <input type="range" min={-60} max={60} value={z*10} step={1}
                onChange={e=>setZ(e.target.value/10)}
                className="w-full accent-purple-600"/>
            </div>
            <div className={`rounded-xl p-4 border-2 text-center ${prob>0.5?'bg-red-50 border-red-300':'bg-blue-50 border-blue-300'}`}>
              <div className="text-xs text-gray-500 mb-1">σ({z.toFixed(1)}) =</div>
              <div className="text-3xl font-bold" style={{color:prob>0.5?'#ef4444':'#3b82f6'}}>{prob.toFixed(4)}</div>
              <div className="text-sm font-bold mt-1" style={{color:prob>0.5?'#ef4444':'#3b82f6'}}>
                → {prob>0.5?'클래스 1 (양성)':'클래스 0 (음성)'}
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-600">
              {[
                {z:'-6',p:'0.0025','desc':'거의 0 → 강하게 음성'},
                {z:'0',p:'0.5','desc':'결정 경계'},
                {z:'+6',p:'0.9975','desc':'거의 1 → 강하게 양성'},
              ].map(r=>(
                <div key={r.z} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                  <span className="font-mono w-8 font-bold text-purple-600">z={r.z}</span>
                  <span className="font-mono w-16 text-gray-700">σ={r.p}</span>
                  <span className="text-gray-500">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SGD 경사 하강법 ── */}
      {tab==='sgd'&&(
        <div className="space-y-3">
          <div className="bg-gray-950 rounded-xl p-4 overflow-x-auto">
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:'block'}}>
              {/* 손실 곡선 (포물선) */}
              {(()=>{
                const pts=Array.from({length:60},(_,i)=>{const wx=-5+i*0.17;return {wx,loss:wx*wx};});
                const pStr=pts.map((p,i)=>{
                  const px=PX+(p.wx+5)/10*(W-PX*2);
                  const py=H-PY-Math.min(p.loss/25,0.95)*(H-PY*2);
                  return `${i===0?'M':'L'}${px.toFixed(1)},${py.toFixed(1)}`;
                }).join(' ');
                return (
                  <>
                    <path d={pStr} fill="none" stroke="#3b82f6" strokeWidth={2.5}/>
                    <text x={W-PX-10} y={PY+15} textAnchor="end" fontSize="10" fill="#3b82f6">손실 함수 L(w)</text>
                  </>
                );
              })()}

              {/* 최솟점 */}
              <circle cx={PX+(0+5)/10*(W-PX*2)} cy={H-PY} r={5} fill="#22c55e" stroke="white" strokeWidth={2}/>
              <text x={PX+(0+5)/10*(W-PX*2)} y={H-PY-10} textAnchor="middle" fontSize="9" fill="#22c55e">최솟값</text>

              {/* SGD 이동 경로 */}
              {sgdPath.slice(0,15).map((p,i)=>{
                if(i===sgdPath.length-1) return null;
                const next=sgdPath[i+1];
                const x1=PX+(p.w+5)/10*(W-PX*2);
                const y1=H-PY-Math.min(p.loss/25,0.95)*(H-PY*2);
                const x2=PX+(next.w+5)/10*(W-PX*2);
                const y2=H-PY-Math.min(next.loss/25,0.95)*(H-PY*2);
                return (
                  <g key={i}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth={1.5}
                      markerEnd="url(#arrow)"/>
                    <circle cx={x1} cy={y1} r={3} fill="#f59e0b" fillOpacity={1-i*0.05}/>
                  </g>
                );
              })}
              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="#f59e0b"/>
                </marker>
              </defs>
              <text x={PX+5} y={PY+14} fontSize="9" fill="#f59e0b">SGD 경로</text>
              <text x={W/2} y={H-1} textAnchor="middle" fontSize="10" fill="#9ca3af">가중치 w</text>
              <text x={10} y={H/2} textAnchor="middle" fontSize="10" fill="#9ca3af" transform={`rotate(-90,10,${H/2})`}>손실</text>
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            {[
              {icon:'📐',title:'기울기 계산',desc:'현재 가중치에서 손실 함수의 편미분(기울기) 계산'},
              {icon:'⬅️',title:'가중치 업데이트',desc:'w = w − lr × (∂L/∂w)  기울기 반대 방향으로 이동'},
              {icon:'🔁',title:'반복',desc:'에포크마다 반복하며 손실이 최소인 가중치를 탐색'},
            ].map(s=>(
              <div key={s.title} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="font-bold text-gray-700 mb-1">{s.title}</div>
                <div className="text-gray-500 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 소프트맥스 ── */}
      {tab==='softmax'&&(
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="text-sm font-bold text-gray-700 mb-3">소프트맥스 = 다중 분류의 확률 변환</div>
            {(()=>{
              const logits=[2.5,0.8,-0.3,1.2,0.4];
              const labels=['도미','빙어','농어','광어','고등어'];
              const expVals=logits.map(Math.exp);
              const sumExp=expVals.reduce((a,b)=>a+b,0);
              const probs=expVals.map(e=>e/sumExp);
              return (
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 mb-2">선형 출력(logit) → softmax → 확률 (합=1)</div>
                  {logits.map((l,i)=>(
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-12 text-xs font-bold text-gray-600">{labels[i]}</span>
                      <span className="font-mono text-xs text-gray-500 w-12 text-right">{l.toFixed(1)}</span>
                      <span className="text-gray-400 text-xs">→</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-5 overflow-hidden">
                        <div className="h-5 flex items-center justify-end pr-2 rounded-full transition-all duration-500"
                          style={{width:`${probs[i]*100}%`, backgroundColor:i===0?'#ef4444':'#3b82f6', opacity:0.8+probs[i]*0.2}}>
                          <span className="text-white text-xs font-bold">{(probs[i]*100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-green-600 font-bold mt-2">
                    합계: {probs.reduce((a,b)=>a+b,0).toFixed(4)} (항상 1!)
                  </div>
                </div>
              );
            })()}
          </div>
          <div className="bg-blue-50 rounded-xl p-3 text-xs font-mono text-blue-900">
            softmax(zᵢ) = e^zᵢ / Σⱼ e^zⱼ
          </div>
        </div>
      )}
    </div>
  );
}
