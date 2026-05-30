import { useState } from 'react';

/* ── 포화 연산 vs 오버플로우 시뮬레이터 ── */
function SatArithmetic() {
  const [a, setA] = useState(210);
  const [b, setB] = useState(60);
  const [op, setOp] = useState('add');

  const rawResult = op === 'add' ? a + b : op === 'sub' ? a - b : a * b;
  const satResult = Math.max(0, Math.min(255, rawResult));
  const overflowResult = ((rawResult % 256) + 256) % 256;
  const overflowed = rawResult < 0 || rawResult > 255;

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-gray-600 mb-2">포화(Saturate) 연산 vs 오버플로우</div>
      {/* 연산 선택 */}
      <div className="flex gap-2 text-xs">
        {[['add','덧셈(+)'],['sub','뺄셈(-)'],['mul','곱셈(×)']].map(([id,lb])=>(
          <button key={id} onClick={()=>setOp(id)}
            className={`px-2.5 py-1 rounded-lg border font-medium transition-all ${op===id?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[{l:'픽셀 A',v:a,s:setA},{l:'픽셀 B',v:b,s:setB}].map(item=>(
          <div key={item.l}>
            <div className="flex justify-between text-xs text-gray-500 mb-0.5">
              <span>{item.l}</span>
              <span className="font-bold text-blue-600">{item.v}</span>
            </div>
            <input type="range" min={0} max={255} value={item.v}
              onChange={e=>item.s(Number(e.target.value))}
              className="w-full accent-blue-500"/>
            <div className="w-full h-5 rounded mt-1" style={{backgroundColor:`rgb(${item.v},${item.v},${item.v})`}}/>
          </div>
        ))}
      </div>

      {/* 계산 과정 */}
      <div className="bg-gray-950 rounded-xl p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg"
              style={{backgroundColor:`rgb(${a},${a},${a})`}}>
              <span style={{color:a>128?'black':'white'}}>{a}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">A</div>
          </div>
          <div className="text-2xl text-gray-400 font-bold">
            {op==='add'?'+':op==='sub'?'-':'×'}
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg"
              style={{backgroundColor:`rgb(${b},${b},${b})`}}>
              <span style={{color:b>128?'black':'white'}}>{b}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">B</div>
          </div>
          <div className="text-2xl text-gray-400">=</div>
          <div className="text-center">
            <div className="w-16 h-12 rounded-lg flex items-center justify-center font-bold text-lg border-2"
              style={{borderColor:overflowed?'#ef4444':'#6b7280',backgroundColor:'#1e293b',
                color:overflowed?'#ef4444':'#9ca3af'}}>
              {rawResult}
            </div>
            <div className="text-xs mt-1" style={{color:overflowed?'#ef4444':'#9ca3af'}}>
              {overflowed?'⚠️ 범위 초과':'정상 범위'}
            </div>
          </div>
        </div>

        {/* 결과 비교 */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className={`rounded-xl p-3 border-2 ${overflowed?'border-red-700 bg-red-950/40':'border-gray-700 bg-gray-900'}`}>
            <div className="text-xs font-bold text-red-400 mb-1">❌ numpy 직접 연산</div>
            <div className="text-lg font-bold text-red-300">{overflowResult}</div>
            <div className="w-full h-5 rounded mt-1" style={{backgroundColor:`rgb(${overflowResult},${overflowResult},${overflowResult})`}}/>
            <div className="text-xs text-red-400 mt-1">uint8 오버플로우!<br/>{rawResult} → {overflowResult}</div>
          </div>
          <div className={`rounded-xl p-3 border-2 ${overflowed?'border-green-700 bg-green-950/40':'border-gray-700 bg-gray-900'}`}>
            <div className="text-xs font-bold text-green-400 mb-1">✅ cv2.add (포화 연산)</div>
            <div className="text-lg font-bold text-green-300">{satResult}</div>
            <div className="w-full h-5 rounded mt-1" style={{backgroundColor:`rgb(${satResult},${satResult},${satResult})`}}/>
            <div className="text-xs text-green-400 mt-1">
              {rawResult > 255 ? '255에서 클리핑!' : rawResult < 0 ? '0에서 클리핑!' : '범위 내 정상'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 비트(논리) 연산 시각화 ── */
function BitwiseOps() {
  const [a, setA] = useState(0b10110100);
  const [b, setB] = useState(0b11001010);

  const ops = [
    { id:'and', label:'AND (cv2.bitwise_and)', sym:'&',  result:a&b,  use:'마스크 적용, 영역 추출' },
    { id:'or',  label:'OR  (cv2.bitwise_or)',  sym:'|',  result:a|b,  use:'두 영상 합치기' },
    { id:'xor', label:'XOR (cv2.bitwise_xor)', sym:'^',  result:a^b,  use:'차이 강조' },
    { id:'not', label:'NOT (cv2.bitwise_not)', sym:'~A', result:(~a)&0xFF, use:'색상 반전' },
  ];

  function toBin8(v) { return (v & 0xFF).toString(2).padStart(8,'0'); }

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-gray-600 mb-2">비트(논리) 연산 — 마스크 처리의 핵심</div>
      <div className="grid grid-cols-2 gap-3">
        {[{l:'A',v:a,s:setA},{l:'B',v:b,s:setB}].map(item=>(
          <div key={item.l} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold text-gray-700">{item.l} = {item.v}</span>
              <span className="font-mono text-blue-600">{toBin8(item.v)}</span>
            </div>
            <input type="range" min={0} max={255} value={item.v}
              onChange={e=>item.s(Number(e.target.value))} className="w-full accent-blue-500"/>
            <div className="w-full h-4 rounded mt-1" style={{backgroundColor:`rgb(${item.v},${item.v},${item.v})`}}/>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {ops.map(op=>(
          <div key={op.id} className="bg-gray-950 rounded-lg p-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-cyan-400 mb-1">{op.label}</div>
              <div className="font-mono text-xs text-gray-400 space-y-0.5">
                <div className="text-blue-300">  {toBin8(a)}</div>
                <div className="text-purple-300">{op.sym === '~A' ? '' : op.sym + ' '}{toBin8(op.id==='not'?a:b)}</div>
                <div className="border-t border-gray-700 mt-1 pt-1 text-green-300 font-bold">= {toBin8(op.result)}</div>
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="w-12 h-10 rounded flex items-center justify-center font-bold text-sm"
                style={{backgroundColor:`rgb(${op.result},${op.result},${op.result})`,
                  color:op.result>128?'black':'white'}}>
                {op.result}
              </div>
              <div className="text-xs text-gray-500 mt-1 w-16 leading-tight">{op.use}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 통계 함수 시각화 ── */
function StatFunctions() {
  const pixels = [23, 45, 180, 67, 120, 200, 88, 155, 34, 210, 77, 142, 19, 95, 233, 58];
  const mean   = (pixels.reduce((a,b)=>a+b,0)/pixels.length).toFixed(1);
  const sorted = [...pixels].sort((a,b)=>a-b);
  const minVal = sorted[0], maxVal = sorted[sorted.length-1];
  const minIdx = pixels.indexOf(minVal), maxIdx = pixels.indexOf(maxVal);
  const std    = Math.sqrt(pixels.reduce((s,v)=>s+(v-mean)**2,0)/pixels.length).toFixed(1);

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-gray-600 mb-2">통계 함수 — 영상 품질 분석</div>
      <div className="bg-gray-950 rounded-xl p-4">
        {/* 픽셀 바 */}
        <div className="flex items-end gap-1 h-20 mb-2">
          {pixels.map((v,i)=>(
            <div key={i} className="flex-1 relative group">
              <div className="w-full rounded-t transition-all"
                style={{height:`${(v/255)*72}px`,
                  backgroundColor: i===minIdx?'#22c55e': i===maxIdx?'#ef4444': `rgb(${v},${v},${v})`,
                  border: i===minIdx||i===maxIdx ? '2px solid white':'none'}}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {v}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-3 h-3 rounded-sm bg-green-500"/><span>최솟값 {minVal}</span>
          <div className="w-3 h-3 rounded-sm bg-red-500 ml-2"/><span>최댓값 {maxVal}</span>
        </div>
        {/* 평균선 */}
        <div className="relative h-2 mt-1">
          <div className="absolute h-0.5 bg-yellow-400 opacity-50" style={{left:'0%',right:'0%',top:'50%'}}/>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          { label:'cv2.minMaxLoc()', code:'min, max, minLoc, maxLoc',
            result:`min=${minVal}(idx=${minIdx})  max=${maxVal}(idx=${maxIdx})`, color:'#22c55e' },
          { label:'cv2.mean()', code:'mean_val = cv2.mean(img)',
            result:`평균 = ${mean}`, color:'#3b82f6' },
          { label:'cv2.meanStdDev()', code:'mean, std = cv2.meanStdDev(img)',
            result:`평균=${mean}  표준편차=${std}`, color:'#a855f7' },
          { label:'cv2.countNonZero()', code:'count = cv2.countNonZero(gray)',
            result:`0이 아닌 픽셀 = ${pixels.filter(v=>v>0).length}개`, color:'#f59e0b' },
        ].map(s=>(
          <div key={s.label} className="rounded-lg p-2 border border-gray-200 bg-white">
            <div className="font-bold mb-0.5" style={{color:s.color}}>{s.label}</div>
            <div className="font-mono text-gray-500 mb-1 text-xs">{s.code}</div>
            <div className="font-mono text-gray-800 font-bold text-xs bg-gray-50 rounded px-1 py-0.5">{s.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 채널 처리 시각화 ── */
function ChannelOps() {
  const [mode, setMode] = useState('split');
  const rgb = [[220,50,50],[50,200,50],[50,50,220],[200,200,50],[200,50,200]];

  return (
    <div className="space-y-3">
      <div className="text-xs font-bold text-gray-600 mb-2">채널 분리(split) / 병합(merge)</div>
      <div className="flex gap-2">
        {[['split','채널 분리 (split)'],['merge','채널 병합 (merge)']].map(([id,lb])=>(
          <button key={id} onClick={()=>setMode(id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 transition-all ${mode===id?'bg-orange-600 text-white border-orange-600':'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {mode==='split' && (
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <div className="text-xs text-gray-500 w-16 flex-shrink-0">원본 (BGR)</div>
            <div className="flex gap-1">
              {rgb.map(([r,g,b],i)=>(
                <div key={i} className="w-8 h-8 rounded" style={{backgroundColor:`rgb(${r},${g},${b})`}}/>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="flex-1 border-t border-dashed border-gray-300"/>
            <span className="text-xs">cv2.split(img)</span>
            <div className="flex-1 border-t border-dashed border-gray-300"/>
          </div>
          {[['B채널','b','#3b82f6',0],['G채널','g','#22c55e',1],['R채널','r','#ef4444',2]].map(([label,ch,color,ci])=>(
            <div key={ch} className="flex gap-2 items-center">
              <div className="text-xs w-16 font-bold flex-shrink-0" style={{color}}>{label}</div>
              <div className="flex gap-1">
                {rgb.map(([r,g,b],i)=>{
                  const v=[b,g,r][ci];
                  return <div key={i} className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                    style={{backgroundColor:`rgb(${v},${v},${v})`,color:v>128?'black':'white'}}>{v}</div>;
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {mode==='merge' && (
        <div className="space-y-2">
          {[['B채널','#3b82f6',0],['G채널','#22c55e',1],['R채널','#ef4444',2]].map(([label,color,ci])=>(
            <div key={label} className="flex gap-2 items-center">
              <div className="text-xs w-16 font-bold flex-shrink-0" style={{color}}>{label}</div>
              <div className="flex gap-1">
                {rgb.map(([r,g,b],i)=>{
                  const v=[b,g,r][ci];
                  return <div key={i} className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                    style={{backgroundColor:`rgb(${v},${v},${v})`,color:v>128?'black':'white'}}>{v}</div>;
                })}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 text-gray-400">
            <div className="flex-1 border-t border-dashed border-gray-300"/>
            <span className="text-xs">cv2.merge([b,g,r])</span>
            <div className="flex-1 border-t border-dashed border-gray-300"/>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-xs text-gray-500 w-16 flex-shrink-0">결과 (BGR)</div>
            <div className="flex gap-1">
              {rgb.map(([r,g,b],i)=>(
                <div key={i} className="w-8 h-8 rounded" style={{backgroundColor:`rgb(${r},${g},${b})`}}/>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 font-mono text-xs text-blue-800">
        b, g, r = cv2.split(img){'  '}# 분리<br/>
        merged  = cv2.merge([b, g, r]){'  '}# 병합
      </div>
    </div>
  );
}

/* ── 메인 컴포넌트 ── */
export default function ArrayOpsDiagram() {
  const [tab, setTab] = useState('sat');
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5 border-b border-gray-200 pb-2">
        {[['sat','포화 연산'],['bitwise','비트 연산'],['stats','통계 함수'],['channel','채널 처리']].map(([id,lb])=>(
          <button key={id} onClick={()=>setTab(id)}
            className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${tab===id?'border-orange-600 text-orange-700 bg-orange-50 rounded-t':'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {lb}
          </button>
        ))}
      </div>
      {tab==='sat'     && <SatArithmetic/>}
      {tab==='bitwise' && <BitwiseOps/>}
      {tab==='stats'   && <StatFunctions/>}
      {tab==='channel' && <ChannelOps/>}
    </div>
  );
}
