import { useState } from 'react';

const TEXT = ['The', 'cat', 'sat', 'on', 'the', 'mat', 'and', 'slept'];
const WINDOW = 4;

export default function SlidingWindowDiagram() {
  const [pos, setPos] = useState(0);
  const maxPos = TEXT.length - WINDOW;

  const inputSeq  = TEXT.slice(pos, pos + WINDOW - 1);
  const targetSeq = TEXT.slice(pos + 1, pos + WINDOW);

  const allSamples = Array.from({ length: maxPos + 1 }, (_, i) => ({
    input:  TEXT.slice(i, i + WINDOW - 1),
    target: TEXT.slice(i + 1, i + WINDOW),
  }));

  return (
    <div className="space-y-4">
      <div className="text-xs text-gray-500 text-center">
        슬라이딩 윈도우: 한 칸씩 밀며 (입력 → 정답) 쌍을 생성
      </div>

      {/* 전체 텍스트 + 윈도우 */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="text-xs font-bold text-gray-600 mb-3">원본 토큰 시퀀스</div>
        <div className="flex gap-1.5 flex-wrap">
          {TEXT.map((tok, i) => {
            const inInput  = i >= pos && i < pos + WINDOW - 1;
            const inTarget = i > pos && i < pos + WINDOW;
            const isAll    = i >= pos && i < pos + WINDOW;
            return (
              <div key={i} className={`flex flex-col items-center gap-0.5`}>
                <div className={`px-2 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                  isAll ? 'scale-110 shadow-sm' : 'opacity-40'
                } ${inInput && inTarget ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
                  : inInput ? 'bg-blue-100 border-blue-400 text-blue-800'
                  : inTarget ? 'bg-green-100 border-green-400 text-green-800'
                  : 'bg-white border-gray-200 text-gray-600'}`}>
                  {tok}
                </div>
                <div className="text-xs text-gray-400">{i}</div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 mt-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-300 rounded inline-block"/><span className="text-gray-600">입력(Input)</span></span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-300 rounded inline-block"/><span className="text-gray-600">정답(Target)</span></span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-300 rounded inline-block"/><span className="text-gray-600">겹치는 부분</span></span>
        </div>
      </div>

      {/* 현재 샘플 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-3">
          <div className="text-xs font-bold text-blue-700 mb-2">📥 입력 (Input) x[{pos}:{pos+WINDOW-1}]</div>
          <div className="flex gap-1">
            {inputSeq.map((t, i) => (
              <span key={i} className="px-2 py-1 bg-blue-200 text-blue-800 text-xs font-bold rounded">{t}</span>
            ))}
          </div>
        </div>
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3">
          <div className="text-xs font-bold text-green-700 mb-2">🎯 정답 (Target) x[{pos+1}:{pos+WINDOW}]</div>
          <div className="flex gap-1">
            {targetSeq.map((t, i) => (
              <span key={i} className="px-2 py-1 bg-green-200 text-green-800 text-xs font-bold rounded">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 핵심 개념 */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs">
        <div className="font-bold text-purple-700 mb-1">핵심: +1 Shift로 "다음 단어 예측" 학습</div>
        <div className="text-gray-600">
          입력 <span className="font-mono bg-purple-100 px-1 rounded">[{inputSeq.join(', ')}]</span>을 보고
          정답 <span className="font-mono bg-purple-100 px-1 rounded">[{targetSeq.join(', ')}]</span>을 맞추도록 학습합니다.
          각 위치에서 "다음 토큰이 뭔지" 예측하는 것이 LLM 학습의 본질입니다.
        </div>
      </div>

      {/* 슬라이더 */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>윈도우 위치: {pos}</span>
          <span>전체 샘플 수: {allSamples.length}개</span>
        </div>
        <input type="range" min={0} max={maxPos} value={pos}
          onChange={e => setPos(Number(e.target.value))}
          className="w-full accent-blue-500"/>
      </div>

      {/* 전체 샘플 목록 */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-3 py-2 bg-gray-200 text-xs font-bold text-gray-700">생성되는 훈련 샘플 전체 (총 {allSamples.length}개)</div>
        <div className="divide-y divide-gray-100 max-h-40 overflow-y-auto">
          {allSamples.map((s, i) => (
            <div key={i} className={`flex items-center gap-3 px-3 py-1.5 text-xs transition-colors ${i===pos ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
              <span className="text-gray-400 w-4">{i}</span>
              <span className="text-blue-700 font-mono">[{s.input.join(', ')}]</span>
              <span className="text-gray-400">→</span>
              <span className="text-green-700 font-mono">[{s.target.join(', ')}]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
