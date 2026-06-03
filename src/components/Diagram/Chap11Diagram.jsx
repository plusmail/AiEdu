import { useState } from 'react';

function Code({ children }) {
  return <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{children}</pre>;
}

/* ══════════════════════════════
   TAB 1: 하르 분류기 원리 (06~07)
══════════════════════════════ */
function HaarTab() {
  const [feature, setFeature] = useState(0);

  const features = [
    { name:'수평 에지', desc:'밝은 영역 - 어두운 영역 (위/아래)',
      cells:[[1,1,1,1],[1,1,1,1],[-1,-1,-1,-1],[-1,-1,-1,-1]], color:'horizontal' },
    { name:'수직 에지', desc:'어두운 영역 - 밝은 영역 (왼/오른쪽)',
      cells:[[-1,-1,1,1],[-1,-1,1,1],[-1,-1,1,1],[-1,-1,1,1]], color:'vertical' },
    { name:'대각선',   desc:'대각 밝기 패턴',
      cells:[[1,1,-1,-1],[1,1,-1,-1],[-1,-1,1,1],[-1,-1,1,1]], color:'diagonal' },
    { name:'선 특징',  desc:'중앙 어두운 영역 (눈 검출 등)',
      cells:[[1,1,1,1],[-1,-1,-1,-1],[1,1,1,1],[1,1,1,1]], color:'line' },
  ];

  const feat = features[feature];
  const faceSteps = [
    { step:'① 학습 영상 준비', desc:'수만 장 얼굴/비얼굴 영상으로 학습', icon:'🖼️' },
    { step:'② 하르 특징값 계산', desc:'모든 크기·위치에서 밝기 차이 계산', icon:'📐' },
    { step:'③ AdaBoost 선택', desc:'분류에 유용한 특징만 선택 (수천 개)', icon:'🎯' },
    { step:'④ 캐스케이드', desc:'단계별 분류기 → 비얼굴 빠르게 제거', icon:'⚡' },
    { step:'⑤ detectMultiScale', desc:'다양한 크기로 슬라이딩 윈도우', icon:'🔍' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
        💡 하르 특징 = 인접 사각형 영역의 밝기 합 차이. 적분 영상(Integral Image)으로 빠르게 계산
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* 하르 특징 시각화 */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-gray-600">하르 특징 유형</div>
          <div className="flex gap-1 flex-wrap">
            {features.map((f,i)=>(
              <button key={i} onClick={()=>setFeature(i)}
                className={`px-2 py-1 rounded-lg text-xs font-bold ${feature===i?'bg-blue-600 text-white':'bg-gray-100 text-gray-600'}`}>
                {f.name}
              </button>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,36px)',gap:2}}>
            {feat.cells.map((row,r)=>row.map((v,c)=>(
              <div key={`${r}${c}`} className="w-9 h-9 rounded flex items-center justify-center text-sm font-bold"
                style={{backgroundColor:v>0?'#e2e8f0':'#1e293b',color:v>0?'#1e293b':'#e2e8f0'}}>
                {v>0?'□':'■'}
              </div>
            )))}
          </div>
          <div className="text-xs text-gray-600">{feat.desc}</div>
          <div className="text-xs bg-gray-100 rounded-lg p-2 font-mono">
            특징값 = Σ(흰 영역) - Σ(검은 영역)
          </div>
        </div>

        {/* 캐스케이드 파이프라인 */}
        <div className="flex-1 space-y-2">
          <div className="text-xs font-bold text-gray-600">Viola-Jones 캐스케이드 처리</div>
          {faceSteps.map(({step,desc,icon},i)=>(
            <div key={i} className="flex items-start gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-lg flex-shrink-0">{icon}</span>
              <div>
                <div className="text-xs font-bold text-gray-700">{step}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
        <div className="font-bold text-yellow-800 mb-1">⚡ 적분 영상(Integral Image) 핵심</div>
        <div className="text-yellow-700">
          일반 방법: W×H 번 덧셈 → <strong>적분 영상: 4번 참조로 임의 사각형 합 O(1) 계산</strong><br/>
          → 수천 개 하르 특징을 실시간 계산 가능
        </div>
      </div>

      <Code>{`# 06.detect_face.py
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_eye.xml')

gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
gray = cv2.equalizeHist(gray)   # 히스토그램 평활화

faces = face_cascade.detectMultiScale(
    gray,
    scaleFactor=1.1,    # 이미지 피라미드 축소 비율
    minNeighbors=2,     # 최소 이웃 사각형 수
    minSize=(100,100))  # 최소 얼굴 크기`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 2: 히스토그램 비교 (08)
══════════════════════════════ */
function HistCompareTab() {
  const [method, setMethod] = useState('correl');

  const hist1 = [5,10,30,60,80,70,50,30,15,8,5,3,2,1,0,0].map(v=>v/80);
  const hist2 = [3, 8,25,55,75,65,45,28,12,6,4,2,1,0,0,0].map(v=>v/75);
  const hist3 = [0, 2, 5,10,15,20,30,40,50,45,35,20,10,5,2,1].map(v=>v/50);

  function correl(a,b) {
    const ma=a.reduce((s,v)=>s+v,0)/a.length;
    const mb=b.reduce((s,v)=>s+v,0)/b.length;
    const num=a.reduce((s,v,i)=>s+(v-ma)*(b[i]-mb),0);
    const den=Math.sqrt(a.reduce((s,v)=>s+(v-ma)**2,0)*b.reduce((s,v)=>s+(v-mb)**2,0));
    return den>0?num/den:0;
  }
  function bhatta(a,b) {
    const bc=a.reduce((s,v,i)=>s+Math.sqrt(v*(b[i]||0)),0);
    return Math.max(0, Math.min(1, -Math.log(Math.max(bc,1e-10))));
  }

  const c12 = correl(hist1,hist2);
  const c13 = correl(hist1,hist3);
  const b12 = bhatta(hist1,hist2);
  const b13 = bhatta(hist1,hist3);

  // CORREL: 1에 가까울수록 유사 → 막대 길이 = 값 그대로
  // BHATTA: 0에 가까울수록 유사 → 막대 길이 = 1 - 값 (시각적 일관성)
  const scores = method === 'correl'
    ? [ { label:'히스트1 vs 히스트2', val:c12, bar:Math.max(0,c12), similar: c12 > 0.9 },
        { label:'히스트1 vs 히스트3', val:c13, bar:Math.max(0,c13), similar: c13 > 0.9 } ]
    : [ { label:'히스트1 vs 히스트2', val:b12, bar:1-b12, similar: b12 < 0.3 },
        { label:'히스트1 vs 히스트3', val:b13, bar:1-b13, similar: b13 < 0.3 } ];

  const hists = [
    { data:hist1, label:'히스트1 (기준)', color:'#3b82f6' },
    { data:hist2, label:'히스트2 (유사)', color:'#22c55e' },
    { data:hist3, label:'히스트3 (다름)', color:'#ef4444' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-orange-50 border border-orange-200 rounded-lg p-2">
        💡 히스토그램 비교로 영상 유사도 측정. 두 방법 모두 <strong>히스트2가 더 유사</strong>하지만 표현 방식이 다름
      </div>

      {/* 방법 선택 */}
      <div className="flex gap-2">
        {[['correl','상관계수 (CORREL)'],['bhatta','바타차리야 (BHATTACHARYYA)']].map(([id,lb])=>(
          <button key={id} onClick={()=>setMethod(id)}
            className={'px-3 py-1.5 rounded-xl text-xs font-bold transition-all '+(method===id?'bg-orange-600 text-white shadow-md':'bg-gray-100 text-gray-600 hover:bg-orange-50')}>
            {lb}
          </button>
        ))}
      </div>

      {/* 방법 설명 배너 */}
      <div className={'rounded-xl p-3 text-xs border transition-all '+(method==='correl'?'bg-blue-50 border-blue-300':'bg-purple-50 border-purple-300')}>
        {method==='correl' ? (
          <><span className="font-bold text-blue-800">CORREL 상관계수</span>
            <span className="text-blue-700"> — 범위: -1 ~ 1 &nbsp;|&nbsp; <strong>1에 가까울수록 유사</strong> &nbsp;|&nbsp; 막대가 길수록 유사</span></>
        ) : (
          <><span className="font-bold text-purple-800">BHATTACHARYYA 거리</span>
            <span className="text-purple-700"> — 범위: 0 ~ 1 &nbsp;|&nbsp; <strong>0에 가까울수록 유사</strong> &nbsp;|&nbsp; 막대가 길수록 유사 (1-값으로 표시)</span></>
        )}
      </div>

      <div className="flex gap-4 flex-wrap">
        {/* 히스토그램 3개 */}
        <div className="space-y-2 flex-shrink-0">
          <div className="text-xs font-bold text-gray-600">히스토그램 분포</div>
          {hists.map(({data,label,color})=>(
            <div key={label}>
              <div className="text-xs mb-0.5" style={{color}}>{label}</div>
              <div className="flex items-end gap-px h-10 bg-gray-900 rounded-lg px-2 py-1" style={{width:180}}>
                {data.map((v,i)=>(
                  <div key={i} className="flex-1 rounded-t"
                    style={{height:`${v*100}%`,backgroundColor:color,minWidth:2,opacity:0.85}}/>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 유사도 막대 — 방법에 따라 바뀜 */}
        <div className="flex-1 min-w-40 space-y-3">
          <div className="text-xs font-bold text-gray-600">
            유사도 결과 ({method==='correl'?'높을수록 유사':'낮을수록 유사 / 막대=1-값'})
          </div>
          {scores.map(({label,val,bar,similar})=>(
            <div key={label} className={'rounded-xl border p-3 transition-all '+(similar?'border-green-300 bg-green-50':'border-red-200 bg-red-50')}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-gray-700">{label}</span>
                <span className={'text-sm font-bold font-mono '+(similar?'text-green-700':'text-red-600')}>
                  {val.toFixed(3)}
                </span>
              </div>
              {/* 유사도 막대 */}
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: (bar*100).toFixed(1)+'%',
                    backgroundColor: similar ? '#22c55e' : '#ef4444',
                  }}/>
              </div>
              <div className="text-xs mt-1 font-bold">
                {similar
                  ? <span className="text-green-700">✅ 유사 (같은 사람/동전 가능성 높음)</span>
                  : <span className="text-red-600">❌ 다름 (다른 객체)</span>}
              </div>
            </div>
          ))}

          {/* 두 방법 비교 요약 */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs space-y-1">
            <div className="font-bold text-gray-700">두 방법의 수치 비교</div>
            <div className="grid grid-cols-3 gap-1 font-mono text-center">
              <div className="text-gray-500"></div>
              <div className="text-blue-600 font-bold">CORREL</div>
              <div className="text-purple-600 font-bold">BHATTA</div>
              <div className="text-gray-600">vs 히스트2</div>
              <div className="text-green-600">{c12.toFixed(3)}</div>
              <div className="text-green-600">{b12.toFixed(3)}</div>
              <div className="text-gray-600">vs 히스트3</div>
              <div className="text-red-500">{c13.toFixed(3)}</div>
              <div className="text-red-500">{b13.toFixed(3)}</div>
            </div>
            <div className="text-gray-500 pt-1">
              CORREL: 히스트2 {c12>c13?'>'+'크다':'<작다'} 히스트3 → 히스트2가 유사<br/>
              BHATTA: 히스트2 {b12<b13?'<'+'작다':'>크다'} 히스트3 → 히스트2가 유사
            </div>
          </div>
        </div>
      </div>

      <Code>{`# 08.compare_hist.py
hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
hist = cv2.calcHist([hsv], [0,1], mask, [18,8], [0,180,0,256])
hist = cv2.normalize(hist, None).flatten()

# CORREL: 1에 가까울수록 유사
sim_correl = cv2.compareHist(hist1, hist2, cv2.HISTCMP_CORREL)

# BHATTACHARYYA: 0에 가까울수록 유사
sim_bhatta = cv2.compareHist(hist1, hist2, cv2.HISTCMP_BHATTACHARYYA)`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 3: 성별 분류 파이프라인 (09)
══════════════════════════════ */
function GenderTab() {
  const [step, setStep] = useState(0);
  const steps = [
    { icon:'📷', title:'얼굴 검출', desc:'detectMultiScale → 얼굴 ROI 추출', color:'blue' },
    { icon:'👁️', title:'눈 검출 + 기울기 보정', desc:'눈 2개 검출 → 두 눈 중심 연결 각도로 어파인 보정', color:'purple' },
    { icon:'🎯', title:'관심 영역 설정', desc:'머리카락 영역 + 입술 영역 설정\n(얼굴 위치 기반 상대 좌표)', color:'orange' },
    { icon:'📊', title:'HSV 히스토그램 계산', desc:'각 영역의 색상 히스토그램 4개 계산\n→ normalize().flatten()', color:'green' },
    { icon:'🔍', title:'히스토그램 비교', desc:'사전에 저장된 남/녀 평균 히스토그램과 비교\ncv2.compareHist()', color:'indigo' },
    { icon:'✅', title:'성별 분류', desc:'유사도 점수 비교 → 남성/여성 판별\n결과를 얼굴 위에 표시', color:'green' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-indigo-50 border border-indigo-200 rounded-lg p-2">
        💡 머리카락·입술 색상 히스토그램 패턴으로 성별 분류. 딥러닝 없이 전통적 방법으로 구현
      </div>

      {/* 스텝 선택 */}
      <div className="flex gap-1 flex-wrap">
        {steps.map((_,i)=>(
          <button key={i} onClick={()=>setStep(i)}
            className={`w-8 h-8 rounded-xl text-xs font-bold ${step===i?'bg-indigo-600 text-white':'bg-gray-100 text-gray-600'}`}>{i+1}</button>
        ))}
      </div>

      {/* 전체 파이프라인 */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {steps.map((s,i)=>(
          <div key={i} className="flex items-center gap-0.5 flex-shrink-0">
            {i>0&&<div className="text-gray-300 text-xs">▶</div>}
            <div onClick={()=>setStep(i)} className={`flex flex-col items-center px-2 py-1 rounded-lg cursor-pointer min-w-[48px] text-center transition-all ${step===i?'bg-indigo-100 border-2 border-indigo-400':'bg-gray-50 border border-gray-200 hover:bg-indigo-50'}`}>
              <span className="text-lg">{s.icon}</span>
              <span className="text-xs font-bold text-gray-600 leading-tight" style={{fontSize:9}}>{s.title.split(' ')[0]}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-indigo-200 bg-indigo-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{steps[step].icon}</span>
          <div className="font-bold text-indigo-800">{`${step+1}. ${steps[step].title}`}</div>
        </div>
        <div className="text-xs text-indigo-700 whitespace-pre-line">{steps[step].desc}</div>
      </div>

      {/* 관심 영역 시각화 (step 2) */}
      {step===2 && (
        <div className="bg-gray-900 rounded-xl p-3 flex justify-center">
          <svg width="140" height="160" viewBox="0 0 140 160">
            {/* 얼굴 윤곽 */}
            <ellipse cx="70" cy="80" rx="50" ry="60" fill="#d4a57a" stroke="#b8864e" strokeWidth="1.5"/>
            {/* 눈 */}
            <ellipse cx="50" cy="70" rx="12" ry="6" fill="#fff" stroke="#333" strokeWidth="1"/>
            <ellipse cx="90" cy="70" rx="12" ry="6" fill="#fff" stroke="#333" strokeWidth="1"/>
            {/* 머리카락 ROI */}
            <rect x="20" y="20" width="100" height="25" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="4,2"/>
            <text x="25" y="17" fill="#f97316" fontSize="8">머리카락 ROI</text>
            {/* 입술 ROI */}
            <rect x="40" y="110" width="60" height="20" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2"/>
            <text x="40" y="142" fill="#ef4444" fontSize="8">입술 ROI</text>
          </svg>
        </div>
      )}

      <Code>{`# 09.gender_classifier.py
faces = face_cascade.detectMultiScale(gray, 1.1, 2)
if faces.any():
    eyes = eye_cascade.detectMultiScale(face_roi)
    if len(eyes) == 2:
        # 기울기 보정
        corr_image = correct_image(image, face_center, eye_centers)
        # 관심 영역 + 히스토그램
        rois = detect_object(face_center, faces[0])
        masks = make_masks(rois, corr_image.shape[:2])
        sims = calc_histo(corr_image, rois, masks)
        # 성별 분류 (사전 학습된 히스토그램과 비교)
        classify(corr_image, sims, no)`}</Code>
    </div>
  );
}

/* ══════════════════════════════ 메인 ══════════════════════════════ */
export default function Chap11Diagram() {
  const [tab, setTab] = useState('haar');
  const tabs = [
    {id:'haar',   icon:'👤', label:'하르 분류기',     file:'06~07'},
    {id:'hist',   icon:'📊', label:'히스토그램 비교', file:'08'},
    {id:'gender', icon:'⚧️', label:'성별 분류 파이프라인', file:'09'},
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
        {tab==='haar'   && <HaarTab/>}
        {tab==='hist'   && <HistCompareTab/>}
        {tab==='gender' && <GenderTab/>}
      </div>
    </div>
  );
}
