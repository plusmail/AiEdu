import { useState, useMemo } from 'react';

function Code({ children }) {
  return <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{children}</pre>;
}

/* ══════════════════════════════
   TAB 1: 공간 주파수 개념 (01~02)
══════════════════════════════ */
function FreqConceptTab() {
  const [freq, setFreq] = useState(3);
  const N = 64;
  const wave = Array.from({length:N}, (_,x) => Math.round(128 + 100*Math.cos(2*Math.PI*freq*x/N)));

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
        💡 <strong>공간 주파수</strong> = 영상에서 밝기가 얼마나 빠르게 변하는가. 주파수가 높을수록 빠른 변화(에지·노이즈)
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span>주파수</span>
          <span className="font-bold text-blue-600">f = {freq}</span>
        </div>
        <input type="range" min={1} max={16} value={freq} onChange={e=>setFreq(Number(e.target.value))} className="w-full accent-blue-500"/>
      </div>

      {/* 파형 시각화 */}
      <div className="bg-gray-900 rounded-xl p-3 relative" style={{height:80}}>
        <svg width="100%" height="60" viewBox={`0 0 ${N} 60`} preserveAspectRatio="none">
          <polyline points={wave.map((v,x)=>`${x},${60-v*60/255}`).join(' ')} fill="none" stroke="#60a5fa" strokeWidth="1.5"/>
          <line x1={0} y1={30} x2={N} y2={30} stroke="#374151" strokeWidth="0.5"/>
        </svg>
        <div className="absolute bottom-1 right-2 text-xs text-gray-500">64 픽셀</div>
      </div>

      {/* 대역 설명 */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        {[
          {range:'저주파 (f=1~3)', color:'bg-blue-400', desc:'밝기 변화 완만\n배경, 평탄한 영역\nLPF로 통과 → 블러 효과', ex:'파란 하늘, 벽'},
          {range:'고주파 (f=8~)', color:'bg-orange-400', desc:'밝기 변화 급격\n에지, 텍스처, 노이즈\nHPF로 통과 → 샤프닝', ex:'물체 경계선, 노이즈'},
        ].map(({range,color,desc,ex})=>(
          <div key={range} className="border border-gray-200 rounded-xl p-3 bg-gray-50">
            <div className="flex items-center gap-2 mb-1"><div className={`w-4 h-4 rounded ${color}`}/><span className="font-bold text-gray-700">{range}</span></div>
            <div className="text-gray-600 whitespace-pre-line">{desc}</div>
            <div className="text-blue-600 mt-1">예: {ex}</div>
          </div>
        ))}
      </div>

      <Code>{`# 01.frequence.py — 주파수별 코사인 파형 합성
# A×cos(2π×f×x/N)
# f=1: 저주파 (부드러운 변화)
# f=N/2: 최고주파 (픽셀 하나씩 교대)

# 영상에서 저주파 = 배경 / 고주파 = 에지·노이즈
# DFT로 주파수 분석 후 원하는 대역만 필터링`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 2: DFT 스펙트럼 (04~05)
══════════════════════════════ */
function DftTab() {
  const [imgType, setImgType] = useState('rect');

  const SIZE = 32;

  const imgs = {
    rect: Array.from({length:SIZE},(_,r)=>Array.from({length:SIZE},(_,c)=>r>=8&&r<24&&c>=8&&c<24?200:20)),
    stripe: Array.from({length:SIZE},()=>Array.from({length:SIZE},(_,c)=>c%4<2?200:20)),
    circle: Array.from({length:SIZE},(_,r)=>Array.from({length:SIZE},(_,c)=>{
      const dr=r-SIZE/2, dc=c-SIZE/2;
      return dr*dr+dc*dc<64?200:20;
    })),
  };
  const img = imgs[imgType];

  /* 간단 DFT 스펙트럼: 실제 FFT 대신 저주파=중앙, 에지=외곽 개념 시각화 */
  const spectrum = useMemo(()=>{
    return Array.from({length:SIZE},(_,r)=>Array.from({length:SIZE},(_,c)=>{
      const dr=(r-SIZE/2)/SIZE, dc=(c-SIZE/2)/SIZE;
      const dist=Math.sqrt(dr*dr+dc*dc);
      const src=img;
      // 에지 많을수록 고주파 성분 강함 (근사)
      let energy=0;
      for(let i=1;i<SIZE-1;i++) for(let j=1;j<SIZE-1;j++) {
        const edge=Math.abs(src[i][j]-(src[i-1]?.[j]||0))+Math.abs(src[i][j]-(src[i]?.[j-1]||0));
        const fx=Math.cos(2*Math.PI*(i-SIZE/2)*dr+(j-SIZE/2)*dc);
        energy+=edge*fx*0.01;
      }
      const base = Math.max(0, 200 - dist*500 + Math.abs(energy)*2);
      return Math.min(255,Math.round(base));
    }));
  },[imgType]);

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-purple-50 border border-purple-200 rounded-lg p-2">
        💡 DFT 스펙트럼: <strong>중앙 = 저주파</strong>(배경), <strong>외곽 = 고주파</strong>(에지). fftshift로 저주파를 중앙으로 이동
      </div>

      <div className="flex gap-2">
        {[['rect','사각형'],['stripe','줄무늬'],['circle','원']].map(([id,lb])=>(
          <button key={id} onClick={()=>setImgType(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${imgType===id?'bg-purple-600 text-white':'bg-gray-100 text-gray-600'}`}>{lb}</button>
        ))}
      </div>

      <div className="flex gap-6 items-start flex-wrap">
        {/* 입력 영상 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">입력 영상 (32×32)</div>
          <div style={{display:'grid',gridTemplateColumns:`repeat(${SIZE},5px)`}}>
            {img.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`} style={{width:5,height:5,backgroundColor:`rgb(${v},${v},${v})`}}/>
            )))}
          </div>
        </div>
        {/* 스펙트럼 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">DFT 스펙트럼 (fftshift 후)</div>
          <div style={{display:'grid',gridTemplateColumns:`repeat(${SIZE},5px)`,position:'relative'}}>
            {spectrum.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`} style={{width:5,height:5,backgroundColor:`rgb(${v},${v},${v})`}}/>
            )))}
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">중앙 = 저주파</div>
        </div>

        {/* 설명 */}
        <div className="flex-1 min-w-40 space-y-2 text-xs">
          {[
            {label:'저주파 (중앙)', color:'bg-white border-2 border-gray-300', desc:'배경, 전체적인 밝기'},
            {label:'고주파 (외곽)', color:'bg-gray-800', desc:'에지, 텍스처, 노이즈'},
          ].map(({label,color,desc})=>(
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded ${color} flex-shrink-0`}/>
              <div><div className="font-bold text-gray-700">{label}</div><div className="text-gray-500">{desc}</div></div>
            </div>
          ))}
        </div>
      </div>

      <Code>{`# 04~05.2d_dft/fft.py
import numpy as np, cv2

# DFT 변환
dft = cv2.dft(np.float32(image), flags=cv2.DFT_COMPLEX_OUTPUT)
dft_shift = np.fft.fftshift(dft)   # 저주파 → 중앙

# 스펙트럼 시각화 (log 스케일)
mag = cv2.magnitude(dft_shift[:,:,0], dft_shift[:,:,1])
spectrum = 20 * np.log(mag + 1)

# IDFT (역변환)
idft = cv2.idft(dft, flags=cv2.DFT_SCALE | cv2.DFT_REAL_OUTPUT)`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 3: LPF / HPF 필터링 (06~07)
══════════════════════════════ */
function FilteringTab() {
  const [d0, setD0] = useState(10);
  const [filterType, setFilterType] = useState('lpf');
  const SIZE = 64;

  const previewColors = {
    lpf: {pass:'#60a5fa', block:'#1e293b', label:'저주파 통과 (LPF)', effect:'블러 효과'},
    hpf: {pass:'#f97316', block:'#1e293b', label:'고주파 통과 (HPF)', effect:'에지·샤프닝'},
  };
  const pc = previewColors[filterType];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-orange-50 border border-orange-200 rounded-lg p-2">
        💡 DFT 스펙트럼에 원형 마스크를 곱한 뒤 역변환 → 주파수 대역 선택 필터링
      </div>

      <div className="flex gap-2">
        {[['lpf','저주파 통과 (LPF)'],['hpf','고주파 통과 (HPF)']].map(([id,lb])=>(
          <button key={id} onClick={()=>setFilterType(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${filterType===id?'bg-orange-600 text-white':'bg-gray-100 text-gray-600'}`}>{lb}</button>
        ))}
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span>차단 주파수 D0</span>
          <span className="font-bold text-orange-600">{d0}</span>
        </div>
        <input type="range" min={3} max={30} value={d0} onChange={e=>setD0(Number(e.target.value))} className="w-full accent-orange-500"/>
      </div>

      <div className="flex gap-6 items-center flex-wrap">
        {/* 마스크 시각화 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">{pc.label} 마스크</div>
          <div className="relative" style={{width:SIZE*3,height:SIZE*3}}>
            <svg width={SIZE*3} height={SIZE*3} viewBox={`0 0 ${SIZE} ${SIZE}`} className="rounded-xl overflow-hidden">
              <rect width={SIZE} height={SIZE} fill="#1e293b"/>
              <circle cx={SIZE/2} cy={SIZE/2} r={d0}
                fill={filterType==='lpf'?'#60a5fa':'transparent'}
                stroke={filterType==='hpf'?'#f97316':'none'}
                strokeWidth="1"/>
              {filterType==='hpf' && <rect width={SIZE} height={SIZE} fill="#f97316" opacity="0.4"/>}
              {filterType==='hpf' && <circle cx={SIZE/2} cy={SIZE/2} r={d0} fill="#1e293b"/>}
              {/* 중심 점 */}
              <circle cx={SIZE/2} cy={SIZE/2} r={1} fill="white" opacity="0.5"/>
            </svg>
          </div>
        </div>

        {/* 파이프라인 */}
        <div className="flex-1 space-y-2 text-xs">
          {[
            {step:'① 영상 → DFT', color:'blue'},
            {step:'② fftshift (저주파 중앙)', color:'purple'},
            {step:`③ × ${pc.label} 마스크`, color:'orange'},
            {step:'④ ifftshift → IDFT', color:'green'},
            {step:`⑤ 결과: ${pc.effect}`, color:'green'},
          ].map(({step,color})=>(
            <div key={step} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${color==='green'?'border-green-200 bg-green-50 text-green-800':'border-gray-200 bg-gray-50 text-gray-700'}`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-${color}-500 flex-shrink-0`}/>
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="font-bold text-blue-800">LPF (저주파 통과)</div>
          <div className="text-blue-700">중앙 원 내부만 통과 → 역변환 시 블러 효과<br/>D0 클수록 더 많은 디테일 보존</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
          <div className="font-bold text-orange-800">HPF (고주파 통과)</div>
          <div className="text-orange-700">중앙 원 외부만 통과 → 역변환 시 에지만 남음<br/>D0 작을수록 더 많은 에지 포함</div>
        </div>
      </div>

      <Code>{`# 06.FFT_filtering1.py
dft, spectrum = FFT(image)           # DFT + fftshift

# 원형 마스크 생성
rows, cols = image.shape
cy, cx = rows//2, cols//2
mask = np.zeros((rows, cols, 2), np.float32)
cv2.circle(mask, (cx,cy), ${d0}, (1,1), -1)  # LPF

# HPF = 1 - LPF
# mask_hpf = np.ones_like(mask) - mask

filtered = dft * mask               # 마스크 적용
result = IFFT(filtered, image.shape) # 역변환`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 4: DCT (09~10)
══════════════════════════════ */
function DctTab() {
  const [keep, setKeep] = useState(4);

  /* 8×8 블록 예시 */
  const block = [[52,55,61,66,70,61,64,73],[63,59,55,90,109,85,69,72],[62,59,68,113,144,104,66,73],
                 [63,58,71,122,154,106,70,69],[67,61,68,104,126,88,68,70],[79,65,60,70,77,68,58,75],
                 [85,71,64,59,55,61,65,83],[87,79,69,68,65,76,78,94]];

  /* DCT 계수 (간소화: 저주파 계수만 표시) */
  const dctCoeffs = [[-415,-30,-61,27,56,-20,-2,0],
                     [4,-22,-61,10,13,-7,-9,1],
                     [-47,7,77,-25,-29,10,5,-6],
                     [-49,12,34,-15,-10,6,2,-3],
                     [12,-7,-13,5,2,-3,-1,1],
                     [-8,3,2,-4,1,2,0,0],
                     [-1,0,0,1,0,0,0,0],
                     [0,0,0,0,0,0,0,0]];

  /* 지그재그 순서로 keep개만 보존 */
  const compressed = Array.from({length:8},()=>Array(8).fill(0));
  let cnt=0;
  outer: for(let d=0;d<15;d++) {
    for(let r=Math.max(0,d-7);r<=Math.min(7,d);r++) {
      const c=d-r;
      if(cnt<keep*keep) { compressed[r][c]=dctCoeffs[r][c]; cnt++; }
      else break outer;
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-green-50 border border-green-200 rounded-lg p-2">
        💡 <strong>DCT</strong> = JPEG 압축 핵심. 8×8 블록을 주파수 계수로 변환 → 고주파 계수 버림 → 압축
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span>보존할 계수 수</span>
          <span className="font-bold text-green-600">{keep}×{keep} = {keep*keep}개</span>
        </div>
        <input type="range" min={1} max={8} value={keep} onChange={e=>setKeep(Number(e.target.value))} className="w-full accent-green-500"/>
      </div>

      <div className="flex gap-4 items-start flex-wrap">
        {/* 원본 블록 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">원본 8×8 픽셀</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(8,28px)',gap:1}}>
            {block.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`} className="w-7 h-7 flex items-center justify-center text-xs rounded"
                style={{backgroundColor:`rgb(${v},${v},${v})`,color:v>128?'#111':'#eee',fontSize:9}}>{v}</div>
            )))}
          </div>
        </div>

        {/* DCT 계수 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">DCT 계수 (보존: {keep}×{keep})</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(8,28px)',gap:1}}>
            {dctCoeffs.map((row,r)=>row.map((v,c)=>{
              const inKeep = r<keep&&c<keep;
              return (
                <div key={`${r}${c}`} className={`w-7 h-7 flex items-center justify-center rounded transition-all`}
                  style={{fontSize:8,
                    backgroundColor:inKeep?(Math.abs(v)>100?'#065f46':Math.abs(v)>20?'#047857':'#d1fae5'):'#1e293b',
                    color:inKeep?'#fff':'#374151',
                    opacity:inKeep?1:0.3,
                  }}>{inKeep?v:'0'}</div>
              );
            }))}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {8*8-keep*keep}개 계수 제거 (압축률: {Math.round((1-keep*keep/64)*100)}%)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs text-center">
        {[
          {label:'DCT[0][0]', val:'DC 계수 (평균 밝기)', color:'green'},
          {label:'저주파 (좌상)', val:'전체적인 형태', color:'blue'},
          {label:'고주파 (우하)', val:'세밀한 디테일', color:'orange'},
        ].map(({label,val,color})=>(
          <div key={label} className={`border rounded-xl p-2 bg-${color}-50 border-${color}-200`}>
            <div className="font-mono font-bold text-gray-700">{label}</div>
            <div className={`text-${color}-700`}>{val}</div>
          </div>
        ))}
      </div>

      <Code>{`# 09.dct.py — JPEG 압축 원리
block = image[r:r+8, c:c+8].astype("float32")

# DCT 변환
dct = cv2.dct(block)

# 고주파 계수 제거 (압축)
dct[${keep}:, :] = 0   # 하단 행 제거
dct[:, ${keep}:] = 0   # 우측 열 제거

# 역DCT (복원)
idct = cv2.dct(dct, flags=cv2.DCT_INVERSE)

# cv2.dct()는 8×8 뿐만 아니라 임의 크기도 가능`}</Code>
    </div>
  );
}

/* ══════════════════════════════ 메인 ══════════════════════════════ */
export default function Chap09Diagram() {
  const [tab, setTab] = useState('freq');
  const tabs = [
    {id:'freq',  icon:'〰️', label:'공간 주파수',    file:'01~02'},
    {id:'dft',   icon:'🌀', label:'DFT 스펙트럼',   file:'04~05'},
    {id:'filter',icon:'🔵', label:'LPF / HPF 필터링', file:'06~07'},
    {id:'dct',   icon:'📦', label:'DCT (JPEG 압축)', file:'09~10'},
  ];
  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 flex-wrap">
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${tab===t.id?'bg-blue-600 text-white shadow':'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}>
            <div>{t.icon} {t.label}</div>
            <div className={`font-mono font-normal mt-0.5 ${tab===t.id?'opacity-70':'text-gray-400'}`}>{t.file}.py</div>
          </button>
        ))}
      </div>
      <div className="min-h-[300px]">
        {tab==='freq'   && <FreqConceptTab/>}
        {tab==='dft'    && <DftTab/>}
        {tab==='filter' && <FilteringTab/>}
        {tab==='dct'    && <DctTab/>}
      </div>
    </div>
  );
}
