import { useState } from 'react';

const PIXEL_GRID = [
  [20,  40,  80,  120, 160],
  [35,  70,  110, 150, 190],
  [50,  100, 140, 180, 220],
  [65,  130, 170, 200, 240],
  [80,  160, 200, 230, 255],
];

const COLOR_IMG = [
  [[180,50,50],[200,80,80],[220,110,110],[240,140,140],[255,170,170]],
  [[50,180,50],[80,200,80],[110,220,110],[140,240,140],[170,255,170]],
  [[50,50,180],[80,80,200],[110,110,220],[140,140,240],[170,170,255]],
  [[180,180,50],[200,200,80],[220,220,110],[240,240,140],[255,255,170]],
  [[50,180,180],[80,200,200],[110,220,220],[140,240,240],[170,255,255]],
];

const SZ = 44;

export default function ImageRepresentDiagram() {
  const [tab, setTab] = useState('pixel');
  const [hoverCell, setHoverCell] = useState(null);
  const [bitDepth, setBitDepth] = useState(8);

  const levels = Math.pow(2, bitDepth);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 border-b border-gray-200">
        {[['pixel','픽셀 구조'],['channel','채널 분리'],['bitdepth','비트 깊이'],['size','영상 크기']].map(([id,lb])=>(
          <button key={id} onClick={()=>setTab(id)}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors ${tab===id?'border-blue-600 text-blue-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {lb}
          </button>
        ))}
      </div>

      {/* ── 픽셀 구조 ── */}
      {tab==='pixel' && (
        <div className="flex gap-5 flex-col lg:flex-row">
          <div className="space-y-2">
            <div className="text-xs font-bold text-gray-600 text-center">그레이스케일 영상 (5×5)</div>
            <div style={{display:'grid',gridTemplateColumns:`repeat(5,${SZ}px)`,gap:2}}>
              {PIXEL_GRID.map((row,r)=>row.map((v,c)=>{
                const isHover = hoverCell?.r===r && hoverCell?.c===c;
                return (
                  <div key={`${r}${c}`}
                    onMouseEnter={()=>setHoverCell({r,c,v})}
                    onMouseLeave={()=>setHoverCell(null)}
                    className="flex items-center justify-center rounded cursor-pointer transition-all"
                    style={{
                      width:SZ,height:SZ,
                      backgroundColor:`rgb(${v},${v},${v})`,
                      border:isHover?'3px solid #3b82f6':'2px solid transparent',
                      transform:isHover?'scale(1.15)':'scale(1)',
                      color:v>128?'#000':'#fff',
                      fontSize:'11px',fontWeight:'bold',
                    }}>
                    {v}
                  </div>
                );
              }))}
            </div>
            <div className="text-xs text-gray-400 text-center">각 셀 = 픽셀값 (0~255)</div>
          </div>
          <div className="flex-1 space-y-3">
            {hoverCell ? (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
                <div className="font-bold text-blue-700 mb-2">선택된 픽셀</div>
                <div className="space-y-1 text-sm text-gray-700">
                  <div>위치: <strong>img[{hoverCell.r}, {hoverCell.c}]</strong></div>
                  <div>밝기값: <strong>{hoverCell.v}</strong></div>
                  <div>밝기 %: <strong>{(hoverCell.v/255*100).toFixed(1)}%</strong></div>
                  <div>이진: <strong>0b{hoverCell.v.toString(2).padStart(8,'0')}</strong></div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-500">
                픽셀에 마우스를 올려보세요
              </div>
            )}
            <div className="space-y-2 text-xs">
              {[
                {label:'픽셀(Pixel)', desc:'영상의 최소 단위. Picture Element'},
                {label:'img[y, x]', desc:'y=행(세로), x=열(가로) 접근'},
                {label:'img.shape', desc:`(${PIXEL_GRID.length}, ${PIXEL_GRID[0].length}) → (H, W)`},
                {label:'uint8 타입', desc:'0~255 정수 (8비트 = 256단계)'},
              ].map(i=>(
                <div key={i.label} className="flex gap-2 bg-white rounded-lg p-2 border border-gray-100">
                  <span className="font-mono font-bold text-blue-600 w-24 flex-shrink-0">{i.label}</span>
                  <span className="text-gray-600">{i.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 채널 분리 ── */}
      {tab==='channel' && (
        <div className="space-y-3">
          <div className="text-xs text-gray-500 text-center">컬러 영상 = B채널 + G채널 + R채널</div>
          <div className="flex gap-3 flex-wrap justify-center">
            {[
              { label:'원본 (BGR)', ch:'all', palette:(r,c)=>`rgb(${COLOR_IMG[r][c][2]},${COLOR_IMG[r][c][1]},${COLOR_IMG[r][c][0]})` },
              { label:'B 채널', ch:'b', palette:(r,c)=>`rgb(0,0,${COLOR_IMG[r][c][0]})` },
              { label:'G 채널', ch:'g', palette:(r,c)=>`rgb(0,${COLOR_IMG[r][c][1]},0)` },
              { label:'R 채널', ch:'r', palette:(r,c)=>`rgb(${COLOR_IMG[r][c][2]},0,0)` },
            ].map(channel=>(
              <div key={channel.ch} className="text-center">
                <div className="text-xs font-bold text-gray-600 mb-1">{channel.label}</div>
                <div style={{display:'grid',gridTemplateColumns:`repeat(5,32px)`,gap:1}}>
                  {COLOR_IMG.map((row,r)=>row.map((v,c)=>(
                    <div key={`${r}${c}`} className="rounded-sm"
                      style={{width:32,height:32,backgroundColor:channel.palette(r,c)}}/>
                  )))}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200 text-xs space-y-1">
            <div className="font-bold text-blue-700">OpenCV 채널 분리</div>
            <div className="font-mono text-gray-700">b, g, r = cv2.split(img)</div>
            <div className="font-mono text-gray-700">b = img[:, :, 0]  # 슬라이스도 가능</div>
            <div className="text-red-600 font-bold mt-1">⚠️ OpenCV는 BGR 순서 (RGB 아님!)</div>
          </div>
        </div>
      )}

      {/* ── 비트 깊이 ── */}
      {tab==='bitdepth' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">비트 깊이:</span>
            {[1,2,4,8].map(b=>(
              <button key={b} onClick={()=>setBitDepth(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${bitDepth===b?'bg-blue-600 text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {b}bit
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="text-xs font-bold text-gray-700 mb-2">{bitDepth}비트 = {levels}단계</div>
              <div className="flex gap-1 flex-wrap">
                {Array.from({length:Math.min(levels,32)},(_,i)=>{
                  const v=Math.round(i/(Math.min(levels,32)-1)*255);
                  return <div key={i} style={{width:Math.max(8,200/Math.min(levels,32)),height:24,backgroundColor:`rgb(${v},${v},${v})`}} className="rounded-sm"/>;
                })}
                {levels>32&&<div className="text-xs text-gray-400 self-center">... ({levels}단계)</div>}
              </div>
            </div>
            <div className="space-y-2 text-xs">
              {[
                {b:1,levels:2,use:'흑백 2단계'},
                {b:4,levels:16,use:'16단계 그레이'},
                {b:8,levels:256,use:'표준 그레이스케일'},
                {b:24,levels:'1677만',use:'표준 컬러(RGB 각 8bit)'},
              ].map(r=>(
                <div key={r.b} className={`flex gap-2 rounded-lg p-2 border ${bitDepth===r.b?'bg-blue-50 border-blue-300':'bg-white border-gray-100'}`}>
                  <span className="font-bold text-blue-600 w-8">{r.b}bit</span>
                  <span className="text-gray-500 w-12">{r.levels}단계</span>
                  <span className="text-gray-600">{r.use}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 영상 크기 ── */}
      {tab==='size' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              {name:'QVGA',w:320,h:240,c:1},{name:'VGA',w:640,h:480,c:3},
              {name:'HD',w:1280,h:720,c:3},{name:'FHD',w:1920,h:1080,c:3},
            ].map(r=>{
              const mb=(r.w*r.h*r.c/1024/1024).toFixed(2);
              const pct=Math.min(r.w/1920*100,100);
              return (
                <div key={r.name} className="bg-white rounded-xl border border-gray-200 p-3">
                  <div className="font-bold text-gray-800">{r.name}</div>
                  <div className="text-gray-500">{r.w} × {r.h} × {r.c}ch</div>
                  <div className="text-blue-600 font-bold">{mb} MB</div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                    <div className="h-2 bg-blue-500 rounded-full" style={{width:`${pct}%`}}/>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 font-mono text-xs text-green-800">
            img.shape  → (H, W, C) = (480, 640, 3)<br/>
            img.size   → H × W × C = 921,600<br/>
            img.dtype  → uint8 (0~255)
          </div>
        </div>
      )}
    </div>
  );
}
