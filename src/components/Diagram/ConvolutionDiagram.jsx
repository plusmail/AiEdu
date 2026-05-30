import { useState, useEffect, useRef } from 'react';

const INPUT = [
  [1,1,1,0,0],
  [0,1,1,1,0],
  [0,0,1,1,1],
  [0,0,1,1,0],
  [0,1,1,0,0],
];
const FILTER_TYPES = {
  edge: { label:'엣지 검출', vals:[[-1,-1,-1],[-1,8,-1],[-1,-1,-1]], color:'#ef4444' },
  sharpen:{ label:'샤프닝', vals:[[0,-1,0],[-1,5,-1],[0,-1,0]], color:'#f59e0b' },
  blur: { label:'블러', vals:[[1,1,1],[1,1,1],[1,1,1]], color:'#3b82f6', scale:1/9 },
  vert: { label:'수직 엣지', vals:[[-1,0,1],[-2,0,2],[-1,0,1]], color:'#a855f7' },
};

function computeConv(input, filter, scale=1) {
  const out=[];
  for(let r=0;r<3;r++){
    out.push([]);
    for(let c=0;c<3;c++){
      let sum=0;
      for(let fr=0;fr<3;fr++)
        for(let fc=0;fc<3;fc++)
          sum+=input[r+fr][c+fc]*filter[fr][fc];
      out[r].push(Math.max(0,Math.round(sum*scale)));
    }
  }
  return out;
}

const SZ=44;

export default function ConvolutionDiagram(){
  const [pos,setPos]=useState({r:0,c:0});
  const [fKey,setFKey]=useState('edge');
  const [auto,setAuto]=useState(false);
  const timerRef=useRef(null);

  const ft=FILTER_TYPES[fKey];
  const filter=ft.vals;
  const scale=ft.scale||1;
  const output=computeConv(INPUT,filter,scale);

  const curSum=()=>{
    let s=0;
    for(let fr=0;fr<3;fr++)for(let fc=0;fc<3;fc++)s+=INPUT[pos.r+fr][pos.c+fc]*filter[fr][fc];
    return Math.round(s*scale);
  };

  useEffect(()=>{
    if(!auto){clearInterval(timerRef.current);return;}
    timerRef.current=setInterval(()=>{
      setPos(p=>{
        const nc=p.c+1>=3?0:p.c+1;
        const nr=nc===0?Math.min(p.r+1,2):p.r;
        return {r:nr,c:nc};
      });
    },600);
    return ()=>clearInterval(timerRef.current);
  },[auto]);

  const cellStyle=(v,max=1)=>({
    backgroundColor:`rgba(59,130,246,${Math.abs(v/Math.max(max,1))*0.7+0.1})`,
    color:'white',
    fontWeight:'bold',
    fontSize:'13px',
  });

  const maxOut=Math.max(...output.flat().map(Math.abs),1);

  return (
    <div className="space-y-3">
      {/* 필터 선택 */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(FILTER_TYPES).map(([k,f])=>(
          <button key={k} onClick={()=>setFKey(k)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all"
            style={{borderColor:fKey===k?f.color:'#e5e7eb',backgroundColor:fKey===k?f.color+'18':'white',color:fKey===k?f.color:'#6b7280'}}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-5 flex-wrap items-start">
        {/* 입력 이미지 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-2 text-center">입력 (5×5)</div>
          <div style={{display:'grid',gridTemplateColumns:`repeat(5,${SZ}px)`,gap:2}}>
            {INPUT.map((row,r)=>row.map((v,c)=>{
              const inWindow=r>=pos.r&&r<pos.r+3&&c>=pos.c&&c<pos.c+3;
              return (
                <div key={`${r}${c}`}
                  className="flex items-center justify-center rounded cursor-pointer transition-all"
                  style={{width:SZ,height:SZ,fontSize:'16px',fontWeight:'bold',
                    backgroundColor:inWindow?(ft.color+'30'):(v?'#1e40af':'#1e293b'),
                    border:inWindow?`2px solid ${ft.color}`:'2px solid transparent',
                    color:v?'white':'#475569',transition:'all 0.2s'}}
                  onClick={()=>{
                    const nr=Math.min(Math.max(r,0),2);
                    const nc=Math.min(Math.max(c,0),2);
                    setPos({r:nr,c:nc});
                  }}>
                  {v}
                </div>
              );
            }))}
          </div>
          <div className="text-xs text-gray-400 text-center mt-1">클릭으로 위치 이동</div>
        </div>

        {/* 연산 기호 */}
        <div className="flex flex-col items-center justify-center pt-12">
          <div className="text-3xl font-bold text-gray-400">⊗</div>
          <div className="text-xs text-gray-400 mt-1">합성곱</div>
        </div>

        {/* 필터 */}
        <div>
          <div className="text-xs font-bold mb-2 text-center" style={{color:ft.color}}>{ft.label} 필터 (3×3)</div>
          <div style={{display:'grid',gridTemplateColumns:`repeat(3,${SZ}px)`,gap:2}}>
            {filter.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`}
                className="flex items-center justify-center rounded font-mono"
                style={{width:SZ,height:SZ,fontSize:'13px',fontWeight:'bold',
                  backgroundColor:ft.color+'20',border:`2px solid ${ft.color}60`,
                  color:ft.color}}>
                {v}
              </div>
            )))}
          </div>
        </div>

        {/* 현재 연산 */}
        <div className="flex flex-col items-center justify-center pt-6">
          <div className="bg-gray-950 rounded-xl p-3 text-xs font-mono text-green-300 max-w-[140px]">
            <div className="text-gray-400 mb-1">계산 중:</div>
            {filter.map((row,r)=>(
              <div key={r} className="whitespace-nowrap">
                {row.map((fv,c)=>(
                  <span key={c} className={INPUT[pos.r+r][pos.c+c]*fv>0?'text-yellow-400':INPUT[pos.r+r][pos.c+c]*fv<0?'text-red-400':'text-gray-600'}>
                    {INPUT[pos.r+r][pos.c+c]}×{fv}{c<2?'+':''}
                  </span>
                ))}
              </div>
            ))}
            <div className="border-t border-gray-600 mt-1 pt-1 text-white font-bold">
              = ReLU({curSum()}) = {Math.max(0,curSum())}
            </div>
          </div>
        </div>

        {/* 화살표 */}
        <div className="flex flex-col items-center justify-center pt-12">
          <div className="text-3xl font-bold text-gray-400">→</div>
        </div>

        {/* 출력 특성 맵 */}
        <div>
          <div className="text-xs font-bold text-green-600 mb-2 text-center">출력 특성 맵 (3×3)</div>
          <div style={{display:'grid',gridTemplateColumns:`repeat(3,${SZ}px)`,gap:2}}>
            {output.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`}
                className="flex items-center justify-center rounded font-bold transition-all"
                style={{width:SZ,height:SZ,...cellStyle(v,maxOut),
                  border:r===pos.r&&c===pos.c?`3px solid #22c55e`:'2px solid transparent',
                  transform:r===pos.r&&c===pos.c?'scale(1.1)':'scale(1)'}}>
                {v}
              </div>
            )))}
          </div>
        </div>
      </div>

      {/* 컨트롤 & 설명 */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          필터가 입력 이미지를 <strong>슬라이딩</strong>하며 각 위치에서 원소별 곱의 합을 계산합니다.
        </div>
        <button onClick={()=>setAuto(a=>!a)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${auto?'bg-red-100 text-red-600 border border-red-300':'bg-green-100 text-green-600 border border-green-300 hover:bg-green-200'}`}>
          {auto?'⏸ 정지':'▶ 자동 실행'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
          <strong className="text-blue-700">패딩(padding):</strong>
          <div className="text-gray-600 mt-0.5">• same: 입력과 같은 크기 유지 (가장자리 0 패딩)<br/>• valid: 필터가 맞는 부분만 (크기 축소)</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-2">
          <strong className="text-purple-700">특성 맵의 의미:</strong>
          <div className="text-gray-600 mt-0.5">밝은 값 = 해당 위치에서 필터가 감지하는 패턴이 강하게 존재</div>
        </div>
      </div>
    </div>
  );
}
