import { useState } from 'react';

const FILTERS = [
  {
    id:'original', label:'원본', color:'#6b7280',
    kernel: [[0,0,0],[0,1,0],[0,0,0]],
    desc:'원본 영상을 그대로 출력합니다.',
    formula:'output(x,y) = input(x,y)',
    effect:'변화 없음',
  },
  {
    id:'blur', label:'평균 블러', color:'#3b82f6',
    kernel: [[1,1,1],[1,1,1],[1,1,1]],
    kDiv:9,
    desc:'주변 9개 픽셀의 평균 → 영상이 흐려집니다. 노이즈 제거에 활용.',
    formula:'output = (1/9) × Σ input(neighbors)',
    effect:'노이즈 제거, 경계 흐림',
  },
  {
    id:'sharpen', label:'샤프닝', color:'#f59e0b',
    kernel: [[0,-1,0],[-1,5,-1],[0,-1,0]],
    desc:'중심 픽셀을 강조하고 주변을 빼서 경계를 선명하게 만듭니다.',
    formula:'output = 5×center - Σ(4 neighbors)',
    effect:'경계 강조, 선명도 향상',
  },
  {
    id:'edge', label:'엣지(라플라시안)', color:'#7c3aed',
    kernel: [[0,1,0],[1,-4,1],[0,1,0]],
    desc:'2차 미분으로 밝기 변화가 큰 경계를 검출합니다.',
    formula:'∇²f = f(x+1) + f(x-1) - 2f(x) (각 방향)',
    effect:'경계선 검출',
  },
  {
    id:'sobelx', label:'소벨 X', color:'#ef4444',
    kernel: [[-1,0,1],[-2,0,2],[-1,0,1]],
    desc:'x 방향(수직) 에지를 검출합니다. 좌-우 밝기 변화에 반응.',
    formula:'Gx = [-1,0,1; -2,0,2; -1,0,1]',
    effect:'수직 에지 검출',
  },
  {
    id:'gaussian', label:'가우시안 블러', color:'#22c55e',
    kernel: [[1,2,1],[2,4,2],[1,2,1]],
    kDiv:16,
    desc:'가우시안 분포로 가중치를 준 블러. 가장 자연스러운 블러 효과.',
    formula:'G(x,y) = (1/2πσ²)·e^(-(x²+y²)/2σ²)',
    effect:'자연스러운 노이즈 제거',
  },
];

// 5×5 샘플 이미지 (에지가 있는 패턴)
const SAMPLE = [
  [200,200,200,50, 50],
  [200,200,200,50, 50],
  [200,200,200,50, 50],
  [50, 50, 50, 200,200],
  [50, 50, 50, 200,200],
];

function applyFilter(img, filter) {
  const k = filter.kernel;
  const div = filter.kDiv || 1;
  const out = img.map(row => [...row]);
  for(let r=1;r<4;r++) for(let c=1;c<4;c++) {
    let sum=0;
    for(let kr=0;kr<3;kr++) for(let kc=0;kc<3;kc++)
      sum+=img[r-1+kr][c-1+kc]*k[kr][kc];
    out[r][c]=Math.max(0,Math.min(255,Math.round(sum/div)));
  }
  return out;
}

const SZ = 40;

export default function ImageFilterDiagram(){
  const [filter,setFilter]=useState('original');
  const f=FILTERS.find(f=>f.id===filter);
  const outputImg=applyFilter(SAMPLE,f);

  return (
    <div className="space-y-3">
      {/* 필터 선택 */}
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map(f=>(
          <button key={f.id} onClick={()=>setFilter(f.id)}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium border-2 transition-all"
            style={{borderColor:filter===f.id?f.color:'#e5e7eb',
              backgroundColor:filter===f.id?f.color+'18':'white',
              color:filter===f.id?f.color:'#6b7280'}}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 items-start">
        {/* 입력 영상 */}
        <div>
          <div className="text-xs font-bold text-gray-500 mb-1 text-center">입력 영상</div>
          <div style={{display:'grid',gridTemplateColumns:`repeat(5,${SZ}px)`,gap:2}}>
            {SAMPLE.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`}
                className="flex items-center justify-center rounded text-xs font-bold transition-all"
                style={{width:SZ,height:SZ,backgroundColor:`rgb(${v},${v},${v})`,
                  color:v>128?'#000':'#fff',fontSize:'11px'}}>
                {v}
              </div>
            )))}
          </div>
        </div>

        {/* 커널 */}
        <div>
          <div className="text-xs font-bold mb-1 text-center" style={{color:f.color}}>
            커널 (3×3)
          </div>
          <div style={{display:'grid',gridTemplateColumns:`repeat(3,${SZ}px)`,gap:2}}>
            {f.kernel.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`}
                className="flex items-center justify-center rounded font-bold font-mono"
                style={{width:SZ,height:SZ,fontSize:'14px',
                  backgroundColor:f.color+'20',border:`2px solid ${f.color}60`,
                  color:v>0?f.color:v<0?'#ef4444':'#9ca3af'}}>
                {f.kDiv?`${v}/${f.kDiv}`:v}
              </div>
            )))}
          </div>
        </div>

        {/* 화살표 */}
        <div className="flex items-center self-center text-3xl text-gray-400">→</div>

        {/* 출력 영상 */}
        <div>
          <div className="text-xs font-bold mb-1 text-center" style={{color:f.color}}>
            출력 영상
          </div>
          <div style={{display:'grid',gridTemplateColumns:`repeat(5,${SZ}px)`,gap:2}}>
            {outputImg.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`}
                className="flex items-center justify-center rounded text-xs font-bold"
                style={{width:SZ,height:SZ,
                  backgroundColor:`rgb(${v},${v},${v})`,
                  color:v>128?'#000':'#fff',fontSize:'11px',
                  border:r>0&&r<4&&c>0&&c<4?`2px solid ${f.color}60`:'2px solid transparent'}}>
                {v}
              </div>
            )))}
          </div>
          <div className="text-xs text-gray-400 text-center mt-1">중앙 3×3만 연산됨</div>
        </div>
      </div>

      {/* 설명 */}
      <div className="rounded-xl p-4 border-2 transition-all"
        style={{borderColor:f.color+'60',backgroundColor:f.color+'08'}}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{backgroundColor:f.color}}/>
          <span className="font-bold text-sm" style={{color:f.color}}>{f.label}</span>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full text-white" style={{backgroundColor:f.color}}>
            {f.effect}
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-2">{f.desc}</p>
        <div className="font-mono text-xs bg-gray-900 text-green-400 rounded-lg px-3 py-2">
          {f.formula}
        </div>
      </div>
    </div>
  );
}
