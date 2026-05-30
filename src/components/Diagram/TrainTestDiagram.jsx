import { useState } from 'react';

const N = 40;
const SAMPLES = Array.from({ length: N }, (_, i) => ({ id: i, label: i % 3 === 0 ? 0 : 1 }));

export default function TrainTestDiagram() {
  const [tab, setTab] = useState('split');
  const trainN = Math.round(N * 0.8);

  // 샘플링 편향 예시 (순서대로 자름 vs 무작위)
  const biasedTrain = SAMPLES.slice(0, trainN);
  const biasedTest  = SAMPLES.slice(trainN);
  const biasedTrainFish = biasedTrain.filter(s => s.label === 0).length;
  const biasedTestFish  = biasedTest.filter(s => s.label === 0).length;

  // 표준화 전후 데이터
  const rawData = [8, 150, 320, 6, 480, 90, 210, 55, 380, 25];
  const mean = rawData.reduce((a,b)=>a+b,0)/rawData.length;
  const std  = Math.sqrt(rawData.map(x=>(x-mean)**2).reduce((a,b)=>a+b,0)/rawData.length);
  const scaled = rawData.map(x => ((x-mean)/std).toFixed(2));

  return (
    <div className="space-y-3">
      {/* 탭 */}
      <div className="flex gap-2 border-b border-gray-200">
        {[['split','훈련/테스트 분리'],['bias','샘플링 편향'],['scaler','StandardScaler']].map(([id,lb])=>(
          <button key={id} onClick={()=>setTab(id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab===id?'border-blue-600 text-blue-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {lb}
          </button>
        ))}
      </div>

      {/* ── 훈련/테스트 분리 ── */}
      {tab==='split' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-sm font-bold text-blue-800 mb-3">전체 데이터 → 훈련(80%) + 테스트(20%)</div>
            <div className="flex items-center gap-2 mb-3">
              <div className="text-xs text-gray-500 w-20 flex-shrink-0">전체 데이터</div>
              <div className="flex flex-wrap gap-1 flex-1">
                {Array.from({length:N},(_,i)=>(
                  <div key={i} className="w-5 h-5 rounded text-xs flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: '#9ca3af' }}>
                    {i+1}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs text-gray-500 w-20 flex-shrink-0">
                🔀 shuffle<br/>= True
              </div>
              <div className="text-2xl text-gray-400">↓</div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs font-bold text-blue-700 w-20 flex-shrink-0">훈련 세트<br/>{trainN}개 (80%)</div>
              <div className="flex flex-wrap gap-1 flex-1">
                {Array.from({length:trainN},(_,i)=>(
                  <div key={i} className="w-5 h-5 rounded text-xs flex items-center justify-center text-white font-bold bg-blue-500">
                    {i+1}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs font-bold text-orange-600 w-20 flex-shrink-0">테스트 세트<br/>{N-trainN}개 (20%)</div>
              <div className="flex flex-wrap gap-1 flex-1">
                {Array.from({length:N-trainN},(_,i)=>(
                  <div key={i} className="w-5 h-5 rounded text-xs flex items-center justify-center text-white font-bold bg-orange-500">
                    {trainN+i+1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600">
            <div className="font-mono bg-white rounded p-2 border border-gray-200">
              X_train, X_test, y_train, y_test = train_test_split(<br/>
              &nbsp;&nbsp;X, y, <span className="text-blue-600">test_size=0.2, random_state=42</span><br/>
              )
            </div>
          </div>
        </div>
      )}

      {/* ── 샘플링 편향 ── */}
      {tab==='bias' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="text-sm font-bold text-red-700 mb-2">❌ 편향된 분리 (앞에서 자름)</div>
            <div className="text-xs text-gray-600 mb-3">빙어(🐟)가 주로 뒤쪽에 있다면?</div>
            <div className="space-y-2">
              <div>
                <div className="text-xs font-bold text-blue-600 mb-1">훈련 ({trainN}개)</div>
                <div className="text-xs text-gray-500">🐡도미 비율: {((biasedTrainFish/trainN*100).toFixed(0))}%</div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="h-4 bg-red-400 rounded-full flex items-center justify-center text-white text-xs"
                    style={{width:`${biasedTrainFish/trainN*100}%`}}>편향!</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-orange-600 mb-1">테스트 ({N-trainN}개)</div>
                <div className="text-xs text-gray-500">🐟빙어 비율: {((1-biasedTestFish/(N-trainN))*100).toFixed(0)}%</div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="h-4 bg-red-400 rounded-full flex items-center justify-center text-white text-xs"
                    style={{width:`${(1-biasedTestFish/(N-trainN))*100}%`}}>편향!</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="text-sm font-bold text-green-700 mb-2">✅ shuffle=True + stratify</div>
            <div className="text-xs text-gray-600 mb-3">클래스 비율을 동일하게 유지</div>
            <div className="space-y-2">
              <div>
                <div className="text-xs font-bold text-blue-600 mb-1">훈련 ({trainN}개)</div>
                <div className="text-xs text-gray-500">클래스 비율 동일</div>
                <div className="w-full h-4 rounded-full overflow-hidden flex">
                  <div className="h-4 bg-red-400 flex items-center justify-center text-white text-xs" style={{width:'67%'}}>도미</div>
                  <div className="h-4 bg-blue-400 flex items-center justify-center text-white text-xs" style={{width:'33%'}}>빙어</div>
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-orange-600 mb-1">테스트 ({N-trainN}개)</div>
                <div className="text-xs text-gray-500">훈련과 동일한 비율</div>
                <div className="w-full h-4 rounded-full overflow-hidden flex">
                  <div className="h-4 bg-red-400 flex items-center justify-center text-white text-xs" style={{width:'67%'}}>도미</div>
                  <div className="h-4 bg-blue-400 flex items-center justify-center text-white text-xs" style={{width:'33%'}}>빙어</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── StandardScaler ── */}
      {tab==='scaler' && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* 전 */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="text-sm font-bold text-red-700 mb-3">❌ 스케일 전 (원본값)</div>
              <div className="flex items-end gap-1 h-24">
                {rawData.map((v,i)=>(
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="text-xs text-gray-500 leading-none" style={{fontSize:'9px'}}>{v}</div>
                    <div className="w-full bg-red-400 rounded-t-sm transition-all"
                      style={{height:`${(v/Math.max(...rawData))*80}px`}}/>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500">범위: {Math.min(...rawData)} ~ {Math.max(...rawData)}</div>
              <div className="text-xs text-red-600 mt-1">→ 값이 큰 특성이 거리를 지배!</div>
            </div>
            {/* 후 */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="text-sm font-bold text-green-700 mb-3">✅ 표준화 후 (Z-score)</div>
              <div className="flex items-end gap-1 h-24 relative">
                <div className="absolute left-0 right-0" style={{top:'50%'}}>
                  <div className="border-t border-dashed border-gray-400 w-full"/>
                  <span className="text-xs text-gray-400 absolute -top-2 right-0">μ=0</span>
                </div>
                {scaled.map((v,i)=>{
                  const h = Math.abs(v)*20;
                  const pos = parseFloat(v)>=0;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center" style={{height:'80px',justifyContent:'center'}}>
                      <div className="text-xs leading-none text-center" style={{fontSize:'8px',color:pos?'#16a34a':'#dc2626'}}>{v}</div>
                      <div className={`w-full rounded-sm transition-all ${pos?'bg-green-400 rounded-t-sm':'bg-blue-400 rounded-b-sm'}`}
                        style={{height:`${Math.min(h,38)}px`}}/>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 text-xs text-gray-500">범위: {Math.min(...scaled.map(parseFloat)).toFixed(1)} ~ {Math.max(...scaled.map(parseFloat)).toFixed(1)}</div>
              <div className="text-xs text-green-600 mt-1">→ 모든 특성이 같은 스케일!</div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-3">
            <div className="font-mono text-xs text-gray-700 space-y-0.5">
              <div><span className="text-purple-600">z</span> = (<span className="text-blue-600">x</span> − <span className="text-red-500">μ</span>) / <span className="text-orange-500">σ</span></div>
              <div className="text-gray-500"># μ = {mean.toFixed(1)} (평균), σ = {std.toFixed(1)} (표준편차)</div>
              <div className="text-gray-500"># 결과: 평균=0, 표준편차=1</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
