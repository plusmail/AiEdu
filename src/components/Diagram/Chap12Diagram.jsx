import { useState } from 'react';

function Code({ children }) {
  return <pre className="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{children}</pre>;
}

/* ══════════════════════════════
   TAB 1: 동전 인식 파이프라인 (01~03)
══════════════════════════════ */
function CoinTab() {
  const [step, setStep] = useState(0);
  const coins = [{cx:80,cy:100,r:35},{cx:180,cy:90,r:28},{cx:280,cy:105,r:42},{cx:370,cy:95,r:22}];

  const steps = [
    { icon:'📷', title:'원본 영상 입력', color:'gray',
      desc:'동전이 있는 영상 촬영\nRGB 컬러 영상',
      visual: 'original' },
    { icon:'⬜', title:'그레이스케일 + 블러', color:'blue',
      desc:'cvtColor(BGR2GRAY)\nGaussianBlur(9,9) → 노이즈 제거',
      visual: 'gray' },
    { icon:'⬛', title:'이진화 (Otsu)', color:'purple',
      desc:'threshold(THRESH_OTSU)\n자동 최적 임계값 선택',
      visual: 'binary' },
    { icon:'🔵', title:'허프 원 검출', color:'orange',
      desc:'HoughCircles → 원의 중심·반지름\nminDist=50, minRadius=20',
      visual: 'circles' },
    { icon:'✂️', title:'동전 ROI 추출', color:'green',
      desc:'각 원 영역을 잘라내기\n원형 마스크 적용',
      visual: 'roi' },
    { icon:'📊', title:'HSV 히스토그램', color:'indigo',
      desc:'색상(Hue) 분포로 동전 종류 구분\n10원/50원/100원/500원',
      visual: 'hist' },
    { icon:'✅', title:'분류 + 금액 계산', color:'green',
      desc:'compareHist로 기준 히스토그램과 비교\n총 금액 계산 및 표시',
      visual: 'result' },
  ];

  const coinColors = ['#d4af37','#b8b8b8','#c0a060','#f0c040'];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-orange-50 border border-orange-200 rounded-lg p-2">
        💡 허프 원 검출로 동전 위치 찾기 → 색상 히스토그램 비교로 동전 종류 판별
      </div>

      {/* 파이프라인 스텝 */}
      <div className="flex gap-1 flex-wrap">
        {steps.map((s,i)=>(
          <button key={i} onClick={()=>setStep(i)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-bold transition-all ${step===i?'bg-orange-600 text-white shadow':'bg-gray-100 text-gray-600'}`}>
            {s.icon} <span>{i+1}</span>
          </button>
        ))}
      </div>

      {/* 현재 단계 시각화 */}
      <div className="border-2 border-orange-200 rounded-xl overflow-hidden">
        <div className="bg-orange-600 text-white px-4 py-2 text-xs font-bold">
          {steps[step].icon} {step+1}. {steps[step].title}
        </div>
        <div className="p-4 bg-orange-50 flex gap-4 items-start flex-wrap">
          {/* SVG 시각화 */}
          <svg width="420" height="180" className="bg-gray-900 rounded-xl flex-shrink-0">
            {step>=0 && coins.map((c,i)=>(
              <ellipse key={i} cx={c.cx} cy={c.cy} rx={c.r} ry={c.r*0.9}
                fill={step===0?coinColors[i]:step===1?`rgb(${150+i*20},${150+i*20},${150+i*20})`:step===2?'white':step>=3?coinColors[i]:'transparent'}
                opacity={step>=3?0.9:0.7}
                stroke={step>=3?'#fff':'#475569'} strokeWidth={step>=3?2:1}/>
            ))}
            {/* 허프 원 검출 표시 */}
            {step>=3 && coins.map((c,i)=>(
              <g key={i}>
                <circle cx={c.cx} cy={c.cy} r={2} fill="#f59e0b"/>
                <circle cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke="#22c55e" strokeWidth="2"/>
                {step>=6 && <text x={c.cx-8} y={c.cy+5} fill="white" fontSize="9" fontWeight="bold">
                  {['10','50','100','500'][i]}원
                </text>}
              </g>
            ))}
            {step>=6 && <text x="10" y="170" fill="#22c55e" fontSize="10">합계: 660원</text>}
          </svg>
          <div className="text-xs text-orange-700 whitespace-pre-line flex-1">{steps[step].desc}</div>
        </div>
      </div>

      <Code>{`# 01.find_coins.py + 03.calc_coins.py
# 전처리
gray    = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (9, 9), 2)
_, th   = cv2.threshold(blurred, 0, 255,
              cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# 허프 원 검출
circles = cv2.HoughCircles(blurred, cv2.HOUGH_GRADIENT,
    dp=1, minDist=50, param1=50, param2=30,
    minRadius=20, maxRadius=80)

# 각 동전 히스토그램 비교
for cx, cy, r in circles[0]:
    roi  = image[cy-r:cy+r, cx-r:cx+r]
    hist = calc_histo_hue(roi)      # HSV Hue 히스토그램
    group = grouping([hist])         # 유사 동전끼리 그룹화
    ncoins = classify_coins(circles, group)  # 종류 분류`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 2: SVM 번호판 검출 (04~06)
══════════════════════════════ */
function SvmTab() {
  const [c, setC] = useState(1.0);
  const [step, setStep] = useState(0);

  /* SVM 결정 경계 시뮬레이션 */
  const positive = [[80,80],[90,90],[100,85],[85,100],[95,95]];  // 번호판
  const negative = [[180,180],[200,170],[170,200],[190,190],[160,160]];  // 비번호판

  const steps = [
    { title:'① 후보 영역 추출', desc:'Canny 에지 → findContours\n가로:세로 비율 필터 (번호판 비율 3:1~5:1)', icon:'🔍' },
    { title:'② 특징 추출', desc:'후보 영역을 20×10으로 정규화\n flatten() → 200차원 벡터', icon:'📐' },
    { title:'③ SVM 학습', desc:'번호판(1) / 비번호판(0) 이진 분류\nLinear SVM, C={}'.replace('{}',c.toFixed(1)), icon:'🤖' },
    { title:'④ 번호판 판별', desc:'svm.predict(features)\n→ 1이면 번호판, 0이면 제외', icon:'✅' },
    { title:'⑤ 기울기 보정', desc:'warpAffine으로 번호판 정렬\n수평이 되도록 회전 보정', icon:'📐' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
        💡 SVM = 두 클래스를 최대 마진으로 분리하는 초평면 찾기. C가 클수록 오분류 허용 감소
      </div>

      <div className="flex gap-2">
        {steps.map((_,i)=>(
          <button key={i} onClick={()=>setStep(i)}
            className={`w-8 h-8 rounded-xl text-xs font-bold ${step===i?'bg-blue-600 text-white':'bg-gray-100 text-gray-600'}`}>{i+1}</button>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap">
        {/* SVM 결정 경계 시각화 */}
        <div>
          <div className="text-xs font-bold text-gray-600 mb-1">SVM 결정 경계</div>
          <svg width="240" height="220" className="bg-gray-900 rounded-xl">
            {/* 배경 색상 */}
            <rect x={0} y={0} width={240} height={130} fill="rgba(96,165,250,0.1)"/>
            <rect x={0} y={130} width={240} height={90} fill="rgba(239,68,68,0.1)"/>
            {/* 결정 경계 */}
            <line x1={0} y1={130} x2={240} y2={130} stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,3"/>
            <text x={5} y={125} fill="#f59e0b" fontSize="8">결정 경계</text>
            {/* 마진 */}
            <line x1={0} y1={110} x2={240} y2={110} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
            <line x1={0} y1={150} x2={240} y2={150} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
            {/* 번호판 (파랑) */}
            {positive.map(([x,y],i)=>(
              <g key={i}><circle cx={x} cy={y} r={7} fill="#3b82f6"/>
                <text x={x-3} y={y+4} fill="white" fontSize="8" fontWeight="bold">+</text></g>
            ))}
            {/* 비번호판 (빨강) */}
            {negative.map(([x,y],i)=>(
              <g key={i}><rect x={x-6} y={y-6} width={12} height={12} fill="#ef4444"/>
                <text x={x-3} y={y+4} fill="white" fontSize="8" fontWeight="bold">-</text></g>
            ))}
            <text x={5} y={15} fill="#60a5fa" fontSize="9">+ 번호판</text>
            <text x={5} y={200} fill="#ef4444" fontSize="9">- 비번호판</text>
            <text x={140} y={200} fill="#f59e0b" fontSize="8">마진 최대화</text>
          </svg>
        </div>

        {/* 현재 단계 */}
        <div className="flex-1 min-w-40">
          <div className="border-2 border-blue-200 bg-blue-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{steps[step].icon}</span>
              <div className="font-bold text-blue-800">{steps[step].title}</div>
            </div>
            <div className="text-xs text-blue-700 whitespace-pre-line">{steps[step].desc}</div>
          </div>

          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1"><span>SVM C 파라미터</span><span className="font-bold text-blue-600">{c.toFixed(1)}</span></div>
            <input type="range" min={0.1} max={10} step={0.1} value={c} onChange={e=>setC(Number(e.target.value))} className="w-full accent-blue-500"/>
            <div className="text-xs text-gray-500 mt-1">
              {c<1?'C 작음 → 마진 넓음, 일부 오분류 허용':c>5?'C 큼 → 마진 좁음, 오분류 최소화':'균형'}
            </div>
          </div>
        </div>
      </div>

      <Code>{[
        '# 04.train_plate_data.py + 07.classify_plates.py',
        'svm = cv2.ml.SVM_create()',
        'svm.setType(cv2.ml.SVM_C_SVC)',
        'svm.setKernel(cv2.ml.SVM_LINEAR)',
        'svm.setC('+c.toFixed(1)+')',
        '',
        '# 학습 (번호판=1, 비번호판=0)',
        "svm.train(train_features, cv2.ml.ROW_SAMPLE, labels)",
        "svm.save('plate_svm.xml')",
        '',
        '# 예측',
        '_, result = svm.predict(candidate_features)',
        'if result[0][0] == 1:',
        '    print("번호판 검출!")',
      ].join('\n')}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 3: k-NN 문자 인식 (07~08)
══════════════════════════════ */
function PlateKnnTab() {
  const [step, setStep] = useState(0);
  const chars = ['2','5','가','3','4','8'];

  const steps = [
    { icon:'🔲', title:'번호판 영역 추출', desc:'SVM으로 검출된 번호판 영역을\nwarpAffine으로 수평 정렬' },
    { icon:'⬛', title:'Otsu 이진화', desc:'threshold(THRESH_BINARY + OTSU)\n문자와 배경 분리' },
    { icon:'📦', title:'findContours', desc:'외곽선 추출 → 개별 문자 위치\n너비/높이 필터로 잡음 제거' },
    { icon:'📐', title:'문자 정규화', desc:'각 문자를 20×20으로 resize\nflatten() → 400차원 벡터' },
    { icon:'🤖', title:'k-NN 예측', desc:'knn.findNearest(char_vec, k=3)\n→ 가장 유사한 문자 반환' },
    { icon:'📋', title:'번호판 완성', desc:'인식된 문자들을 순서대로 조합\n→ 번호판 문자열 완성' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 bg-green-50 border border-green-200 rounded-lg p-2">
        💡 번호판 문자를 20×20 픽셀로 정규화 후 k-NN으로 각 문자 인식
      </div>

      <div className="flex gap-1 flex-wrap">
        {steps.map((_,i)=>(
          <button key={i} onClick={()=>setStep(i)}
            className={`w-8 h-8 rounded-xl text-xs font-bold ${step===i?'bg-green-600 text-white':'bg-gray-100 text-gray-600'}`}>{i+1}</button>
        ))}
      </div>

      {/* 번호판 + 문자 분리 시각화 */}
      <div className="bg-gray-900 rounded-xl p-3">
        <div className="text-xs text-gray-400 mb-2">번호판 문자 분리 과정</div>
        <div className="flex gap-2 items-center flex-wrap">
          {/* 번호판 전체 */}
          <div className="bg-yellow-300 border-2 border-gray-600 rounded px-2 py-1 flex gap-1 items-center">
            {chars.map((c,i)=>(
              <div key={i} className={`w-7 h-8 bg-white border border-gray-300 rounded flex items-center justify-center text-xs font-bold text-gray-800 transition-all ${step>=2?'border-green-400 border-2':''}`}>{c}</div>
            ))}
          </div>
          <div className="text-gray-400 text-xs">→</div>
          {/* 개별 문자 */}
          {step>=3 && chars.map((c,i)=>(
            <div key={i} className={`flex flex-col items-center gap-0.5 ${step>=4?'':'opacity-50'}`}>
              <div className="w-10 h-10 bg-white border-2 border-green-400 rounded flex items-center justify-center text-sm font-bold text-gray-800">{c}</div>
              <div className="text-xs text-gray-400">20×20</div>
              {step>=5 && <div className="text-xs text-green-500 font-bold">✓{c}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="border-2 border-green-200 bg-green-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{steps[step].icon}</span>
          <div className="font-bold text-green-800">{`${step+1}. ${steps[step].title}`}</div>
        </div>
        <div className="text-xs text-green-700 whitespace-pre-line">{steps[step].desc}</div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs">
        <div className="font-bold text-yellow-800 mb-1">💡 k-NN 학습 데이터</div>
        <div className="text-yellow-700">
          MNIST 또는 직접 촬영한 번호판 숫자/한글 영상 수백 장<br/>
          각 문자를 20×20 → 400차원 벡터로 저장<br/>
          knn.train(char_samples, ROW_SAMPLE, char_labels)
        </div>
      </div>

      <Code>{`# 08.classify_number.py
knn = cv2.ml.KNearest_create()
knn.train(char_samples, cv2.ml.ROW_SAMPLE, labels)

# 문자 분리 후 각각 인식
contours, _ = cv2.findContours(plate_binary,
    cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

result_chars = []
for cnt in contours:
    x,y,w,h = cv2.boundingRect(cnt)
    char_roi = plate[y:y+h, x:x+w]
    char_resized = cv2.resize(char_roi, (20, 20))
    feat = char_resized.flatten().astype(np.float32).reshape(1,-1)
    _, res, _, _ = knn.findNearest(feat, k=3)
    result_chars.append(chr(int(res[0][0])))`}</Code>
    </div>
  );
}

/* ══════════════════════════════
   TAB 4: 전체 종합 파이프라인 (12장)
══════════════════════════════ */
function PipelineTab() {
  const [system, setSystem] = useState('coin');

  const pipelines = {
    coin: {
      title:'동전 인식 시스템',
      color:'orange',
      steps:[
        '입력 영상', 'GaussianBlur', 'Otsu 이진화', '허프 원 검출',
        '동전 ROI 추출', '원형 마스크', 'HSV 히스토그램', '히스토그램 비교',
        '동전 그룹화', '금액 계산', '결과 표시',
      ],
      result:'10원 N개 + 50원 M개 + ... = 합계 금액',
    },
    plate: {
      title:'번호판 인식 시스템',
      color:'blue',
      steps:[
        '입력 영상', 'Sobel + 이진화', '닫힘 연산', 'findContours',
        '비율 필터링', 'SVM 분류', '번호판 정렬', 'Otsu 이진화',
        '문자 분리', 'k-NN 인식', '번호판 문자열',
      ],
      result:'25가 3456 → 문자열 완성',
    },
  };

  const p = pipelines[system];
  const colors = {orange:'bg-orange-500', blue:'bg-blue-500'};

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['coin','동전 인식'],['plate','번호판 인식']].map(([id,lb])=>(
          <button key={id} onClick={()=>setSystem(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${system===id?`${colors[p.color.split(' ')[0]]} text-white`:'bg-gray-100 text-gray-600'}`}>{lb}</button>
        ))}
      </div>

      <div className="text-xs font-bold text-gray-700">{p.title} 전체 파이프라인</div>

      {/* 파이프라인 박스 */}
      <div className="flex flex-wrap gap-1 items-center">
        {p.steps.map((s,i)=>(
          <div key={i} className="flex items-center gap-0.5">
            {i>0 && <div className="text-gray-400 text-xs">▶</div>}
            <div className={`px-2 py-1.5 rounded-lg text-xs font-bold text-center ${i===0||i===p.steps.length-1?`${colors[p.color.split(' ')[0]]} text-white`:'bg-gray-100 text-gray-700'}`}
              style={{minWidth:50}}>
              {s}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs">
        <div className="font-bold text-gray-700 mb-1">최종 결과</div>
        <div className="text-gray-600 font-mono">{p.result}</div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        {[
          { title:'공통 기술', items:['허프 원/직선 검출','히스토그램 비교','이진화 + 모폴로지','관심 영역(ROI) 처리'] },
          { title:'핵심 분류기', items:['동전: HSV 히스토그램 비교','번호판 위치: SVM (이진 분류)','번호판 문자: k-NN (다중 분류)','성별 (Ch11): 히스토그램 비교'] },
        ].map(({title,items})=>(
          <div key={title} className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <div className="font-bold text-blue-800 mb-1">{title}</div>
            {items.map(it=><div key={it} className="text-blue-700 flex gap-1"><span>•</span>{it}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════ 메인 ══════════════════════════════ */
export default function Chap12Diagram() {
  const [tab, setTab] = useState('coin');
  const tabs = [
    {id:'coin',     icon:'🪙', label:'동전 인식',     file:'01~03'},
    {id:'svm',      icon:'🤖', label:'SVM 번호판',    file:'04~07'},
    {id:'plateknn', icon:'🔤', label:'k-NN 문자인식', file:'08'},
    {id:'pipeline', icon:'🔄', label:'종합 파이프라인', file:'전체'},
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
        {tab==='coin'     && <CoinTab/>}
        {tab==='svm'      && <SvmTab/>}
        {tab==='plateknn' && <PlateKnnTab/>}
        {tab==='pipeline' && <PipelineTab/>}
      </div>
    </div>
  );
}
