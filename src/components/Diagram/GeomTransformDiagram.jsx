import { useState } from 'react';

const W=300, H=220;

// 사각형 원본 꼭짓점
const RECT = { x:60, y:60, w:80, h:60 };

export default function GeomTransformDiagram(){
  const [op, setOp] = useState('translate');
  const [tx, setTx] = useState(60);
  const [ty, setTy] = useState(40);
  const [scale, setScale] = useState(1.5);
  const [angle, setAngle] = useState(30);

  // 원본 꼭짓점
  const orig = [
    [RECT.x,         RECT.y],
    [RECT.x+RECT.w,  RECT.y],
    [RECT.x+RECT.w,  RECT.y+RECT.h],
    [RECT.x,         RECT.y+RECT.h],
  ];

  // 변환된 꼭짓점
  let transformed;
  const cx=RECT.x+RECT.w/2, cy=RECT.y+RECT.h/2;
  const rad = angle*Math.PI/180;

  if(op==='translate'){
    transformed = orig.map(([x,y])=>[x+tx, y+ty]);
  } else if(op==='scale'){
    transformed = orig.map(([x,y])=>[cx+(x-cx)*scale, cy+(y-cy)*scale]);
  } else if(op==='rotate'){
    transformed = orig.map(([x,y])=>[
      cx+(x-cx)*Math.cos(rad)-(y-cy)*Math.sin(rad),
      cy+(x-cx)*Math.sin(rad)+(y-cy)*Math.cos(rad),
    ]);
  } else { // affine (shear + scale)
    transformed = orig.map(([x,y])=>[x+0.4*(y-cy), y*0.8+20]);
  }

  const pts = (verts) => verts.map(v=>`${v[0].toFixed(0)},${v[1].toFixed(0)}`).join(' ');
  const centroid = (verts) => [
    verts.reduce((s,v)=>s+v[0],0)/4,
    verts.reduce((s,v)=>s+v[1],0)/4,
  ];
  const [ocx,ocy]=centroid(orig);
  const [tcx,tcy]=centroid(transformed);

  const matrices = {
    translate: `[[1, 0, tx],\n [0, 1, ty]]  ← 2×3 행렬\n\ntx=${tx}, ty=${ty}`,
    scale:     `[[sx, 0,  0],\n [0,  sy, 0]]  ← 2×3 행렬\n\nsx=sy=${scale.toFixed(1)} (균등 스케일)`,
    rotate:    `[[cos θ, -sin θ, cx(1-cosθ)+cy·sinθ],\n [sin θ,  cos θ, cy(1-cosθ)-cx·sinθ]]\n\nθ=${angle}°`,
    affine:    `[[a, b, tx],   임의의 2×3 행렬\n [c, d, ty]]  (3점 대응으로 계산)`,
  };

  const descs = {
    translate: '이동(Translation): 모든 픽셀을 (tx,ty)만큼 평행 이동합니다. 형태와 크기는 유지됩니다.',
    scale:     '크기 변경(Scale): 중심점 기준으로 확대/축소합니다. fx=fy이면 균등 변환.',
    rotate:    '회전(Rotation): 중심점을 기준으로 θ도 회전합니다. getRotationMatrix2D() 사용.',
    affine:    '어파인 변환(Affine): 이동+회전+크기+기울기를 포함. 3개 대응점으로 행렬 결정.',
  };

  return (
    <div className="space-y-3">
      {/* 연산 선택 */}
      <div className="flex flex-wrap gap-2">
        {[['translate','이동'],['scale','크기 변경'],['rotate','회전'],['affine','어파인']].map(([id,lb])=>(
          <button key={id} onClick={()=>setOp(id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all ${op===id?'bg-orange-600 text-white border-orange-600':'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        {/* SVG 시각화 */}
        <div className="bg-gray-950 rounded-xl overflow-hidden flex-shrink-0">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display:'block'}}>
            {/* 그리드 */}
            {Array.from({length:8},(_,i)=>(
              <g key={i}>
                <line x1={i*40} y1={0} x2={i*40} y2={H} stroke="#1e293b" strokeWidth={1}/>
                <line x1={0} y1={i*30} x2={W} y2={i*30} stroke="#1e293b" strokeWidth={1}/>
              </g>
            ))}

            {/* 원본 사각형 */}
            <polygon points={pts(orig)} fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5,3"/>
            <text x={ocx} y={ocy+4} textAnchor="middle" fontSize="10" fill="#60a5fa">원본</text>

            {/* 변환 화살표 */}
            <line x1={ocx} y1={ocy} x2={tcx} y2={tcy}
              stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="4,2"
              markerEnd="url(#arrow)"/>
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#fbbf24"/>
              </marker>
            </defs>

            {/* 변환된 사각형 */}
            <polygon points={pts(transformed)} fill="rgba(239,68,68,0.3)" stroke="#ef4444" strokeWidth={2.5}/>
            <text x={tcx} y={tcy+4} textAnchor="middle" fontSize="10" fill="#fca5a5">변환</text>

            {/* 좌표축 */}
            <text x={5} y={15} fontSize="10" fill="#6b7280">x→</text>
            <text x={5} y={H-5} fontSize="10" fill="#6b7280">y↓</text>
          </svg>
        </div>

        {/* 컨트롤 + 행렬 */}
        <div className="flex-1 space-y-3">
          {op==='translate' && (
            <div className="space-y-2">
              {[{l:'tx (수평 이동)',v:tx,s:setTx,min:-80,max:120},{l:'ty (수직 이동)',v:ty,s:setTy,min:-50,max:100}].map(c=>(
                <div key={c.l}>
                  <div className="flex justify-between text-xs text-gray-500 mb-0.5">
                    <span>{c.l}</span><span className="font-bold text-orange-600">{c.v}px</span>
                  </div>
                  <input type="range" min={c.min} max={c.max} value={c.v}
                    onChange={e=>c.s(Number(e.target.value))} className="w-full accent-orange-500"/>
                </div>
              ))}
            </div>
          )}
          {op==='scale' && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-0.5">
                <span>scale (배율)</span><span className="font-bold text-orange-600">{scale.toFixed(1)}×</span>
              </div>
              <input type="range" min={0.3} max={2.5} step={0.1} value={scale}
                onChange={e=>setScale(Number(e.target.value))} className="w-full accent-orange-500"/>
            </div>
          )}
          {op==='rotate' && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-0.5">
                <span>angle (회전각)</span><span className="font-bold text-orange-600">{angle}°</span>
              </div>
              <input type="range" min={-180} max={180} value={angle}
                onChange={e=>setAngle(Number(e.target.value))} className="w-full accent-orange-500"/>
            </div>
          )}

          {/* 변환 행렬 */}
          <div className="bg-gray-900 rounded-xl p-3">
            <div className="text-xs text-gray-400 mb-1.5">변환 행렬</div>
            <pre className="font-mono text-xs text-green-400 whitespace-pre">{matrices[op]}</pre>
          </div>

          {/* 설명 */}
          <div className="text-xs text-gray-600 bg-gray-50 rounded-xl p-3 border border-gray-200 leading-relaxed">
            {descs[op]}
          </div>

          {/* OpenCV 코드 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 text-xs font-mono text-blue-800">
            {op==='translate' && `M = np.float32([[1,0,${tx}],[0,1,${ty}]])\ndst = cv2.warpAffine(img, M, (W,H))`}
            {op==='scale' && `dst = cv2.resize(img, None, fx=${scale.toFixed(1)}, fy=${scale.toFixed(1)},\n       interpolation=cv2.INTER_LINEAR)`}
            {op==='rotate' && `M = cv2.getRotationMatrix2D((cx,cy), ${angle}, 1.0)\ndst = cv2.warpAffine(img, M, (W,H))`}
            {op==='affine' && `M = cv2.getAffineTransform(pts1, pts2)\ndst = cv2.warpAffine(img, M, (W,H))`}
          </div>
        </div>
      </div>
    </div>
  );
}
