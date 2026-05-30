import { useState } from 'react';

// 5×5 이진 영상 (객체)
const ORIGINAL = [
  [0,0,0,0,0,0,0],
  [0,1,1,1,1,0,0],
  [0,1,1,1,1,1,0],
  [0,1,0,1,1,1,0],
  [0,1,1,1,1,0,0],
  [0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0],
];

const N = 7;
// 3×3 십자 구조 요소
const KERNEL = [[0,1,0],[1,1,1],[0,1,0]];

function erode(img) {
  const out = img.map(r=>[...r]);
  for(let r=1;r<N-1;r++) for(let c=1;c<N-1;c++) {
    let ok=true;
    for(let kr=0;kr<3;kr++) for(let kc=0;kc<3;kc++)
      if(KERNEL[kr][kc]===1 && img[r-1+kr][c-1+kc]===0) ok=false;
    out[r][c]=ok?1:0;
  }
  return out;
}

function dilate(img) {
  const out = img.map(r=>[...r]);
  for(let r=1;r<N-1;r++) for(let c=1;c<N-1;c++) {
    let hit=false;
    for(let kr=0;kr<3;kr++) for(let kc=0;kc<3;kc++)
      if(KERNEL[kr][kc]===1 && img[r-1+kr][c-1+kc]===1) hit=true;
    out[r][c]=hit?1:0;
  }
  return out;
}

const eroded  = erode(ORIGINAL);
const dilated = dilate(ORIGINAL);
const opened  = dilate(erode(ORIGINAL));
const closed  = erode(dilate(ORIGINAL));

const SZ = 36;

function Grid({data, label, color, subLabel}){
  return (
    <div className="text-center">
      <div className="text-xs font-bold mb-0.5" style={{color}}>{label}</div>
      <div style={{display:'grid',gridTemplateColumns:`repeat(${N},${SZ}px)`,gap:1.5}}>
        {data.map((row,r)=>row.map((v,c)=>(
          <div key={`${r}${c}`} className="rounded-sm transition-all duration-300"
            style={{width:SZ,height:SZ,
              backgroundColor:v?color:'#1e293b',
              border:`1px solid ${v?color+'80':'#334155'}`}}/>
        )))}
      </div>
      {subLabel && <div className="text-xs text-gray-400 mt-1">{subLabel}</div>}
    </div>
  );
}

export default function MorphologyOpsDiagram(){
  const [op, setOp] = useState('all');

  return (
    <div className="space-y-4">
      {/* 연산 선택 */}
      <div className="flex flex-wrap gap-2">
        {[['all','전체 비교'],['erode','침식'],['dilate','팽창'],['open','열림'],['close','닫힘']].map(([id,lb])=>(
          <button key={id} onClick={()=>setOp(id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all ${op===id?'bg-teal-600 text-white border-teal-600':'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
            {lb}
          </button>
        ))}
      </div>

      {op==='all' && (
        <div className="bg-gray-950 rounded-xl p-4 overflow-x-auto">
          <div className="flex gap-4 flex-wrap justify-center">
            <Grid data={ORIGINAL} label="원본" color="#60a5fa"/>
            <div className="flex items-center text-gray-500 text-sm self-center">→침식→</div>
            <Grid data={eroded} label="침식 (Erode)" color="#ef4444" subLabel="크기 축소"/>
            <div className="flex items-center text-gray-500 text-sm self-center">→팽창→</div>
            <Grid data={dilated} label="팽창 (Dilate)" color="#22c55e" subLabel="크기 확장"/>
          </div>
          <div className="flex gap-4 flex-wrap justify-center mt-4">
            <Grid data={ORIGINAL} label="원본" color="#60a5fa"/>
            <div className="flex items-center text-gray-500 text-sm self-center">→열림→</div>
            <Grid data={opened} label="열림 (Opening)" color="#f59e0b" subLabel="침식→팽창"/>
            <div className="flex items-center text-gray-500 text-sm self-center">→닫힘→</div>
            <Grid data={closed} label="닫힘 (Closing)" color="#a855f7" subLabel="팽창→침식"/>
          </div>
        </div>
      )}

      {op==='erode' && (
        <div className="space-y-3">
          <div className="bg-gray-950 rounded-xl p-4 flex gap-6 flex-wrap justify-center">
            <Grid data={ORIGINAL} label="원본" color="#60a5fa"/>
            <div className="flex items-center text-gray-400 text-2xl self-center">⊖</div>
            <div className="text-center self-center">
              <div className="text-xs font-bold text-red-400 mb-1">구조 요소 (십자)</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,36px)',gap:1.5}}>
                {KERNEL.map((row,r)=>row.map((v,c)=>(
                  <div key={`${r}${c}`} className="rounded-sm"
                    style={{width:36,height:36,backgroundColor:v?'#ef4444':'#1e293b',border:'1px solid #334155'}}/>
                )))}
              </div>
            </div>
            <div className="flex items-center text-gray-400 text-2xl self-center">=</div>
            <Grid data={eroded} label="침식 결과" color="#ef4444"/>
          </div>
          <div className="rounded-xl p-4 bg-red-50 border border-red-200">
            <div className="font-bold text-red-700 mb-2">침식 (Erosion) 원리</div>
            <p className="text-sm text-gray-600">구조 요소가 완전히 객체 안에 들어갈 수 있는 위치만 1로 설정합니다.</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>✅ 객체 크기 감소</li>
              <li>✅ 작은 잡음(흰 점) 제거</li>
              <li>✅ 연결된 객체 분리</li>
            </ul>
            <div className="font-mono text-xs bg-gray-900 text-green-400 rounded px-2 py-1.5 mt-2">
              eroded = cv2.erode(binary, kernel)
            </div>
          </div>
        </div>
      )}

      {op==='dilate' && (
        <div className="space-y-3">
          <div className="bg-gray-950 rounded-xl p-4 flex gap-6 flex-wrap justify-center">
            <Grid data={ORIGINAL} label="원본" color="#60a5fa"/>
            <div className="flex items-center text-gray-400 text-2xl self-center">⊕</div>
            <div className="text-center self-center">
              <div className="text-xs font-bold text-green-400 mb-1">구조 요소</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,36px)',gap:1.5}}>
                {KERNEL.map((row,r)=>row.map((v,c)=>(
                  <div key={`${r}${c}`} className="rounded-sm"
                    style={{width:36,height:36,backgroundColor:v?'#22c55e':'#1e293b',border:'1px solid #334155'}}/>
                )))}
              </div>
            </div>
            <div className="flex items-center text-gray-400 text-2xl self-center">=</div>
            <Grid data={dilated} label="팽창 결과" color="#22c55e"/>
          </div>
          <div className="rounded-xl p-4 bg-green-50 border border-green-200">
            <div className="font-bold text-green-700 mb-2">팽창 (Dilation) 원리</div>
            <p className="text-sm text-gray-600">구조 요소가 객체의 어느 부분에라도 닿는 모든 위치를 1로 설정합니다.</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>✅ 객체 크기 증가</li>
              <li>✅ 작은 구멍(검은 점) 메우기</li>
              <li>✅ 끊어진 경계 연결</li>
            </ul>
            <div className="font-mono text-xs bg-gray-900 text-green-400 rounded px-2 py-1.5 mt-2">
              dilated = cv2.dilate(binary, kernel)
            </div>
          </div>
        </div>
      )}

      {op==='open' && (
        <div className="space-y-3">
          <div className="bg-gray-950 rounded-xl p-4">
            <div className="flex gap-3 flex-wrap justify-center items-center">
              <Grid data={ORIGINAL} label="원본" color="#60a5fa"/>
              <div className="text-gray-400 text-sm self-center">→침식→</div>
              <Grid data={eroded} label="침식" color="#ef4444"/>
              <div className="text-gray-400 text-sm self-center">→팽창→</div>
              <Grid data={opened} label="열림 결과" color="#f59e0b"/>
            </div>
          </div>
          <div className="rounded-xl p-4 bg-orange-50 border border-orange-200 text-sm">
            <div className="font-bold text-orange-700 mb-1">열림 (Opening) = 침식 → 팽창</div>
            <p className="text-gray-600">작은 잡음을 제거하되 큰 객체 형태는 유지합니다.</p>
            <div className="font-mono text-xs bg-gray-900 text-green-400 rounded px-2 py-1.5 mt-2">
              opened = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
            </div>
          </div>
        </div>
      )}

      {op==='close' && (
        <div className="space-y-3">
          <div className="bg-gray-950 rounded-xl p-4">
            <div className="flex gap-3 flex-wrap justify-center items-center">
              <Grid data={ORIGINAL} label="원본" color="#60a5fa"/>
              <div className="text-gray-400 text-sm self-center">→팽창→</div>
              <Grid data={dilated} label="팽창" color="#22c55e"/>
              <div className="text-gray-400 text-sm self-center">→침식→</div>
              <Grid data={closed} label="닫힘 결과" color="#a855f7"/>
            </div>
          </div>
          <div className="rounded-xl p-4 bg-purple-50 border border-purple-200 text-sm">
            <div className="font-bold text-purple-700 mb-1">닫힘 (Closing) = 팽창 → 침식</div>
            <p className="text-gray-600">작은 구멍과 끊어진 경계를 메우되 객체 크기는 유지합니다.</p>
            <div className="font-mono text-xs bg-gray-900 text-green-400 rounded px-2 py-1.5 mt-2">
              closed = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
