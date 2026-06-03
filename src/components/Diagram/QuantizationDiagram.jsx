import { useState } from 'react';

const FORMATS = [
  { bits: 32, label: 'FP32 (기준)', color: '#ef4444', size: 4, quality: 100, vram: '120GB', device: '고급 서버', bar: 100 },
  { bits: 16, label: 'FP16/BF16',  color: '#f59e0b', size: 2, quality: 99,  vram: '60GB',  device: 'A100 GPU',  bar: 50  },
  { bits: 8,  label: 'INT8',       color: '#3b82f6', size: 1, quality: 97,  vram: '30GB',  device: '일반 GPU',  bar: 25  },
  { bits: 4,  label: 'INT4 (GPTQ/NF4)', color: '#10b981', size: 0.5, quality: 95, vram: '15GB', device: '소비자 GPU', bar: 12.5 },
  { bits: 1,  label: '1-bit (BitNet)', color: '#8b5cf6', size: 0.125, quality: 88, vram: '4GB', device: '스마트폰', bar: 3 },
];

function WeightGrid({ bits }) {
  const values = bits === 32
    ? ['0.3847', '-1.2341', '0.0023', '2.1847']
    : bits === 16
    ? ['0.384', '-1.234', '0.002', '2.185']
    : bits === 8
    ? ['49', '-158', '0', '127']
    : bits === 4
    ? ['3', '-10', '0', '7']
    : ['0', '1', '0', '1'];

  const colors = bits === 32 ? '#ef4444' : bits === 16 ? '#f59e0b' : bits === 8 ? '#3b82f6' : bits === 4 ? '#10b981' : '#8b5cf6';
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {values.map((v, i) => (
        <div key={i} className="p-1.5 rounded text-center font-mono font-bold text-xs"
          style={{ backgroundColor: colors + '20', color: colors, border: `1px solid ${colors}40` }}>{v}</div>
      ))}
    </div>
  );
}

export default function QuantizationDiagram() {
  const [selected, setSelected] = useState(1);
  const [tab, setTab] = useState('compare');

  const f = FORMATS[selected];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['compare','비트별 비교'], ['visual','메모리 시각화']].map(([id, lb]) => (
          <button key={id} onClick={() => setTab(id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${tab===id ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab === 'compare' && (
        <div className="space-y-3">
          {/* 비트 선택 */}
          <div className="space-y-2">
            {FORMATS.map((fmt, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${selected===i ? 'shadow-md' : 'opacity-60 hover:opacity-90'}`}
                style={{ borderColor: selected===i ? fmt.color : '#e5e7eb', backgroundColor: selected===i ? fmt.color+'08' : '#f9fafb' }}>
                <div className="w-12 text-center">
                  <span className="font-black text-sm" style={{ color: fmt.color }}>{fmt.bits}bit</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-xs" style={{ color: fmt.color }}>{fmt.label}</div>
                  <div className="flex gap-3 mt-1">
                    <div className="h-2 rounded-full flex-1 bg-gray-200 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${fmt.bar}%`, backgroundColor: fmt.color }}/>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold" style={{ color: fmt.color }}>{fmt.vram}</div>
                  <div className="text-xs text-gray-400">{fmt.device}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-xl border-2 p-4 grid grid-cols-2 gap-4"
            style={{ borderColor: f.color, backgroundColor: f.color+'08' }}>
            <div>
              <div className="text-xs font-bold text-gray-600 mb-2">가중치 표현 예시</div>
              <WeightGrid bits={f.bits} />
            </div>
            <div className="space-y-2">
              {[
                { label: 'VRAM 필요', val: f.vram },
                { label: '모델 크기', val: `FP32의 ${(1/f.size).toFixed(0)}분의 1` },
                { label: '품질 (PPL)', val: `${f.quality}%` },
                { label: '구동 기기', val: f.device },
              ].map(row => (
                <div key={row.label} className="text-xs">
                  <span className="text-gray-500">{row.label}: </span>
                  <span className="font-bold" style={{ color: f.color }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'visual' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500">Llama-2 70B 모델 기준 메모리 필요량</div>
          <div className="space-y-2">
            {FORMATS.map((fmt, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-20 text-right text-xs font-bold" style={{ color: fmt.color }}>{fmt.label}</div>
                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div className="h-full flex items-center pl-2 rounded-lg transition-all"
                    style={{ width: `${fmt.bar}%`, backgroundColor: fmt.color + 'cc', minWidth: 40 }}>
                    <span className="text-white text-xs font-bold">{fmt.vram}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs">
            <div className="font-bold text-green-700 mb-1">4-bit 양자화의 실용적 의미</div>
            <div className="space-y-1 text-gray-600">
              <div>• RTX 4090 (24GB VRAM)에서 <strong>70B 모델</strong> 구동 가능</div>
              <div>• 품질 손실은 약 5% 이하로 대부분 작업에서 충분</div>
              <div>• <strong>llama.cpp, bitsandbytes, GPTQ</strong> 라이브러리 활용</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
