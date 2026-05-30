import { useState, useEffect, useRef } from 'react';

const TOKENS = ['나는','파이썬이','정말','좋아'];

export default function RnnLstmDiagram(){
  const [tab,setTab]=useState('rnn');
  const [step,setStep]=useState(-1);
  const [auto,setAuto]=useState(false);
  const timerRef=useRef(null);

  useEffect(()=>{
    if(!auto){clearInterval(timerRef.current);return;}
    timerRef.current=setInterval(()=>{
      setStep(s=>{
        if(s>=TOKENS.length-1){setAuto(false);return s;}
        return s+1;
      });
    },700);
    return()=>clearInterval(timerRef.current);
  },[auto]);

  function startAnim(){setStep(-1);setAuto(true);}

  return (
    <div className="space-y-3">
      <div className="flex gap-2 border-b border-gray-200">
        {[['rnn','순환 신경망 (RNN)'],['lstm','LSTM 게이트'],['compare','RNN vs LSTM vs GRU']].map(([id,lb])=>(
          <button key={id} onClick={()=>{setTab(id);setStep(-1);setAuto(false);}}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab===id?'border-purple-600 text-purple-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {lb}
          </button>
        ))}
      </div>

      {/* ── RNN ── */}
      {tab==='rnn'&&(
        <div className="space-y-3">
          <div className="bg-gray-950 rounded-xl p-4 overflow-x-auto">
            <svg width={480} height={180} viewBox="0 0 480 180" style={{display:'block',minWidth:400}}>
              {/* 각 타임스텝 */}
              {TOKENS.map((tok,i)=>{
                const x=40+i*110;
                const active=step>=i;
                return (
                  <g key={i}>
                    {/* 이전 은닉→현재 연결 화살표 */}
                    {i>0&&(
                      <g>
                        <line x1={x-110+30} y1={90} x2={x-10} y2={90}
                          stroke={step>=i?'#a855f7':'#374151'} strokeWidth={2}
                          markerEnd={`url(#ha${i})`} style={{transition:'stroke 0.3s'}}/>
                        <defs>
                          <marker id={`ha${i}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L6,3 z" fill={step>=i?'#a855f7':'#374151'}/>
                          </marker>
                        </defs>
                        <rect x={x-80} y={80} width={50} height={20} rx={4}
                          fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth={1}/>
                        <text x={x-55} y={93} textAnchor="middle" fontSize="9" fill="#e9d5ff">h_{i-1}</text>
                      </g>
                    )}

                    {/* RNN 셀 */}
                    <rect x={x} y={70} width={60} height={40} rx={8}
                      fill={active?'#7c3aed':'#1f2937'}
                      stroke={active?'#a855f7':'#4b5563'} strokeWidth={2}
                      style={{transition:'all 0.3s'}}/>
                    <text x={x+30} y={88} textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
                      h_{i}
                    </text>
                    <text x={x+30} y={100} textAnchor="middle" fontSize="8" fill="#c4b5fd">
                      tanh
                    </text>

                    {/* 입력 화살표 */}
                    <line x1={x+30} y1={155} x2={x+30} y2={115}
                      stroke={active?'#22c55e':'#374151'} strokeWidth={2}
                      markerEnd={`url(#va${i})`} style={{transition:'stroke 0.3s'}}/>
                    <defs>
                      <marker id={`va${i}`} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L6,3 z" fill={active?'#22c55e':'#374151'}/>
                      </marker>
                    </defs>

                    {/* 입력 토큰 */}
                    <rect x={x+5} y={155} width={50} height={22} rx={6}
                      fill={active?'#064e3b':'#1f2937'} stroke={active?'#22c55e':'#4b5563'} strokeWidth={1.5}/>
                    <text x={x+30} y={169} textAnchor="middle" fontSize="9" fill={active?'#86efac':'#9ca3af'}>
                      {tok}
                    </text>

                    {/* 출력 (마지막) */}
                    {i===TOKENS.length-1&&(
                      <g>
                        <line x1={x+30} y1={70} x2={x+30} y2={30}
                          stroke={active?'#f59e0b':'#374151'} strokeWidth={2}
                          markerEnd={`url(#out)`}/>
                        <defs>
                          <marker id="out" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L6,3 z" fill={active?'#f59e0b':'#374151'}/>
                          </marker>
                        </defs>
                        <rect x={x+5} y={8} width={50} height={22} rx={6}
                          fill={active?'#451a03':'#1f2937'} stroke={active?'#f59e0b':'#4b5563'} strokeWidth={1.5}/>
                        <text x={x+30} y={22} textAnchor="middle" fontSize="9" fill={active?'#fde68a':'#9ca3af'}>
                          출력
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
              <text x={240} y={178} textAnchor="middle" fontSize="10" fill="#6b7280">시간 흐름 (t=1 → t=4) →</text>
            </svg>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={startAnim}
              className="px-4 py-1.5 bg-purple-600 text-white rounded-lg text-xs hover:bg-purple-500 transition-colors">
              ▶ 순서대로 처리
            </button>
            <button onClick={()=>setStep(-1)}
              className="px-4 py-1.5 border border-gray-300 text-gray-600 rounded-lg text-xs hover:bg-gray-50">
              초기화
            </button>
            <span className="text-xs text-gray-400">
              {step>=0?`처리 중: "${TOKENS[step]}" (t=${step+1})`:'▶ 버튼을 눌러 시작'}
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 font-mono text-xs text-gray-700">
            h_t = tanh(W_x · x_t + W_h · h_(t-1) + b)
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-800">
            ⚠️ <strong>기울기 소실 문제:</strong> 시퀀스가 길면 역전파 시 기울기가 지수적으로 감소합니다.
            "나는"의 정보가 t=10에 거의 도달하지 못함 → LSTM/GRU로 해결!
          </div>
        </div>
      )}

      {/* ── LSTM ── */}
      {tab==='lstm'&&(
        <div className="space-y-3">
          <div className="overflow-x-auto">
            <svg width={520} height={280} viewBox="0 0 520 280" style={{display:'block',minWidth:480}}>
              {/* 셀 상태 (수평 파이프) */}
              <line x1={30} y1={50} x2={490} y2={50} stroke="#22c55e" strokeWidth={3}/>
              <text x={260} y={40} textAnchor="middle" fontSize="11" fill="#22c55e" fontWeight="bold">
                셀 상태 C_t (장기 기억)
              </text>
              <text x={10} y={54} fontSize="10" fill="#22c55e">C_(t-1)</text>
              <text x={470} y={54} fontSize="10" fill="#22c55e">C_t</text>

              {/* 망각 게이트 */}
              {[{x:100,label:'망각\n게이트',color:'#ef4444',sym:'×',desc:'오래된 정보를\n얼마나 지울지'},
                {x:230,label:'입력\n게이트',color:'#f59e0b',sym:'+',desc:'새 정보를\n얼마나 저장할지'},
                {x:360,label:'출력\n게이트',color:'#3b82f6',sym:'h',desc:'은닉 상태로\n얼마나 내보낼지'}
              ].map(g=>(
                <g key={g.x}>
                  {/* 게이트 원 */}
                  <circle cx={g.x} cy={50} r={18} fill={g.color+'30'} stroke={g.color} strokeWidth={2}/>
                  <text x={g.x} y={54} textAnchor="middle" fontSize="14" fill={g.color} fontWeight="bold">{g.sym}</text>

                  {/* 게이트 박스 */}
                  <rect x={g.x-35} y={90} width={70} height={50} rx={8}
                    fill={g.color+'20'} stroke={g.color} strokeWidth={1.5}/>
                  <text x={g.x} y={110} textAnchor="middle" fontSize="9" fill={g.color} fontWeight="bold">
                    {g.label.split('\n')[0]}
                  </text>
                  <text x={g.x} y={122} textAnchor="middle" fontSize="9" fill={g.color}>
                    {g.label.split('\n')[1]}
                  </text>
                  <text x={g.x} y={133} textAnchor="middle" fontSize="8" fill={g.color+'aa'}>
                    σ
                  </text>

                  {/* 설명 */}
                  <rect x={g.x-45} y={155} width={90} height={40} rx={6} fill="#1f2937"/>
                  {g.desc.split('\n').map((line,i)=>(
                    <text key={i} x={g.x} y={170+i*14} textAnchor="middle" fontSize="9" fill="#9ca3af">
                      {line}
                    </text>
                  ))}

                  {/* 입력 화살표 (x_t, h_{t-1}) */}
                  <line x1={g.x} y1={88} x2={g.x} y2={68} stroke={g.color} strokeWidth={1.5}
                    markerEnd={`url(#gArr${g.x})`}/>
                  <defs>
                    <marker id={`gArr${g.x}`} markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
                      <path d="M0,0 L0,5 L5,2.5 z" fill={g.color}/>
                    </marker>
                  </defs>

                  {/* 셀 상태와 연결 */}
                  <line x1={g.x} y1={32} x2={g.x} y2={50}
                    stroke={g.color} strokeWidth={1.5} strokeDasharray="3,2"/>
                </g>
              ))}

              {/* 입력 바 */}
              <rect x={20} y={210} width={480} height={30} rx={6} fill="#1e3a5f"/>
              <text x={260} y={229} textAnchor="middle" fontSize="10" fill="#93c5fd" fontWeight="bold">
                x_t (현재 입력) + h_(t-1) (이전 은닉 상태)
              </text>

              {/* 입력 화살표들 */}
              {[100,230,360].map(x=>(
                <line key={x} x1={x} y1={210} x2={x} y2={145}
                  stroke="#6b7280" strokeWidth={1} strokeDasharray="3,2"/>
              ))}
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              {c:'#ef4444',t:'망각 게이트 f_t',d:'σ(W_f·[h,x]+b) → 0~1\n0: 완전 삭제, 1: 완전 유지'},
              {c:'#f59e0b',t:'입력 게이트 i_t',d:'σ(...) × tanh(...)\n새 정보를 셀 상태에 추가'},
              {c:'#3b82f6',t:'출력 게이트 o_t',d:'σ(...) × tanh(C_t)\n최종 은닉 상태 h_t 계산'},
            ].map(g=>(
              <div key={g.t} className="rounded-lg p-2 border" style={{borderColor:g.c+'60',backgroundColor:g.c+'10'}}>
                <div className="font-bold mb-1" style={{color:g.c}}>{g.t}</div>
                <div className="text-gray-600 whitespace-pre-line leading-tight">{g.d}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 비교 ── */}
      {tab==='compare'&&(
        <div className="space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {['','SimpleRNN','LSTM','GRU'].map(h=>(
                    <th key={h} className="p-2 text-left border border-gray-200 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['구조','단순 순환','셀 상태 + 3 게이트','2 게이트'],
                  ['장기 의존성','❌ 약함','✅ 강함','✅ 강함'],
                  ['파라미터 수','적음 (p·n²)','많음 (4×)','중간 (3×)'],
                  ['학습 속도','빠름','느림','중간'],
                  ['실무 선택','짧은 시퀀스','매우 긴 텍스트','기본 선택'],
                  ['Keras 코드','SimpleRNN(n)','LSTM(n)','GRU(n)'],
                ].map(([label,...vals])=>(
                  <tr key={label} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-2 font-medium text-gray-600 border border-gray-200 bg-gray-50">{label}</td>
                    {vals.map((v,i)=>(
                      <td key={i} className={`p-2 border border-gray-200 ${v.startsWith('✅')?'text-green-600':v.startsWith('❌')?'text-red-500':'text-gray-700'}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs text-purple-800">
            💡 <strong>선택 기준:</strong> 대부분의 NLP 태스크에서는 GRU로 시작하고, 성능이 부족하면 LSTM으로 전환합니다.
            최근에는 Transformer(Ch10)가 이들을 대체하는 추세입니다.
          </div>
        </div>
      )}
    </div>
  );
}
