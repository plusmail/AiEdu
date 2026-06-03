import { useState } from 'react';

// 와인 분류 트리 (알코올도수, 당도)
const TREE = {
  q:'알코올 ≤ 11.5?', feat:'알코올', thresh:11.5,
  gini:0.36,
  left:{
    q:'당도 ≤ 4.9?', feat:'당도', thresh:4.9,
    gini:0.28,
    left:{ label:'레드 와인 🍷', count:[45,2], gini:0.08, isLeaf:true },
    right:{ label:'화이트 와인 🥂', count:[5,31], gini:0.22, isLeaf:true },
  },
  right:{
    q:'알코올 ≤ 13.2?', feat:'알코올', thresh:13.2,
    gini:0.38,
    left:{ label:'화이트 와인 🥂', count:[2,48], gini:0.08, isLeaf:true },
    right:{
      q:'당도 ≤ 2.5?', feat:'당도', thresh:2.5,
      gini:0.46,
      left:{ label:'레드 와인 🍷', count:[18,4], gini:0.28, isLeaf:true },
      right:{ label:'화이트 와인 🥂', count:[3,22], gini:0.22, isLeaf:true },
    },
  },
};

function Gini({value}){
  const pct=Math.round(value*100);
  return (
    <div className="flex items-center gap-1 mt-1">
      <span className="text-gray-400 text-xs">지니:</span>
      <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div className="h-1.5 rounded-full bg-orange-400 transition-all" style={{width:`${pct*2}%`}}/>
      </div>
      <span className="text-orange-500 text-xs font-mono">{value.toFixed(2)}</span>
    </div>
  );
}

function TreeNode({node,depth=0,onSelect,selected}){
  const isSelected=selected===node;
  if(node.isLeaf){
    const [red,white]=node.count;
    return (
      <div className={`relative cursor-pointer rounded-xl border-2 p-3 text-center transition-all min-w-[110px] ${isSelected?'scale-105 shadow-lg border-green-500 bg-green-50':'border-gray-200 bg-white hover:border-gray-400'}`}
        onClick={()=>onSelect(node)}>
        <div className="text-base mb-1">{node.label}</div>
        <div className="flex justify-center gap-1 text-xs">
          <span className="text-red-500">🍷{red}</span>
          <span className="text-blue-500">🥂{white}</span>
        </div>
        <Gini value={node.gini}/>
        {isSelected&&<div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-green-500 text-white px-1.5 rounded-full">리프</div>}
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-0">
      <div className={`cursor-pointer rounded-xl border-2 p-3 text-center transition-all min-w-[130px] ${isSelected?'scale-105 shadow-lg border-blue-500 bg-blue-50':'border-gray-300 bg-white hover:border-blue-300'}`}
        onClick={()=>onSelect(node)}>
        <div className="text-xs font-bold text-blue-700 mb-1">{node.q}</div>
        <Gini value={node.gini}/>
        {isSelected&&<div className="text-xs text-blue-500 mt-1">↓ 분기 기준</div>}
      </div>
      <div className="flex gap-6 items-start relative">
        <div className="absolute top-0 left-1/4 right-1/4 border-t-2 border-gray-300"/>
        <div className="flex flex-col items-center">
          <div className="h-4 border-l-2 border-gray-300"/>
          <div className="text-xs text-green-600 font-bold mb-1">Yes ✓</div>
          <TreeNode node={node.left} depth={depth+1} onSelect={onSelect} selected={selected}/>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-4 border-l-2 border-gray-300"/>
          <div className="text-xs text-red-500 font-bold mb-1">No ✗</div>
          <TreeNode node={node.right} depth={depth+1} onSelect={onSelect} selected={selected}/>
        </div>
      </div>
    </div>
  );
}

export default function DecisionTreeDiagram(){
  const [selected,setSelected]=useState(null);
  const [tab,setTab]=useState('tree');

  // 앙상블 데이터
  const forests=[
    {id:1,pred:'화이트',acc:0.91,data:'샘플셋A'},
    {id:2,pred:'화이트',acc:0.88,data:'샘플셋B'},
    {id:3,pred:'레드',acc:0.89,data:'샘플셋C'},
    {id:4,pred:'화이트',acc:0.90,data:'샘플셋D'},
    {id:5,pred:'화이트',acc:0.87,data:'샘플셋E'},
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-2 border-b border-gray-200">
        {[['tree','결정 트리'],['ensemble','앙상블 (랜덤 포레스트)'],['impurity','불순도']].map(([id,lb])=>(
          <button key={id} onClick={()=>setTab(id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab===id?'border-green-600 text-green-700':'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {lb}
          </button>
        ))}
      </div>

      {tab==='tree'&&(
        <div className="space-y-3">
          <div className="text-xs text-gray-500 text-center">노드를 클릭하면 상세 정보를 확인할 수 있습니다</div>
          <div className="overflow-x-auto">
            <div className="min-w-[480px] p-4">
              <TreeNode node={TREE} onSelect={setSelected} selected={selected}/>
            </div>
          </div>
          {selected&&(
            <div className={`rounded-xl p-4 border-2 ${selected.isLeaf?'border-green-300 bg-green-50':'border-blue-300 bg-blue-50'}`}>
              {selected.isLeaf?(
                <div>
                  <div className="font-bold text-green-700 mb-2">리프 노드 — 최종 예측</div>
                  <div className="text-sm text-gray-600">예측: <strong>{selected.label}</strong></div>
                  <div className="text-sm text-gray-600">샘플: 레드 {selected.count[0]}개, 화이트 {selected.count[1]}개</div>
                  <div className="text-sm text-gray-600">지니 불순도: {selected.gini.toFixed(2)}</div>
                </div>
              ):(
                <div>
                  <div className="font-bold text-blue-700 mb-2">내부 노드 — 분기 조건</div>
                  <div className="text-sm text-gray-600">조건: <strong>{selected.q}</strong></div>
                  <div className="text-sm text-gray-600">지니 불순도: {selected.gini.toFixed(2)}</div>
                  <div className="text-xs text-gray-400 mt-1">이 조건이 불순도를 가장 많이 줄임</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab==='ensemble'&&(
        <div className="space-y-4">
          <div className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 border border-gray-200">
            랜덤 포레스트는 서로 다른 <strong>부트스트랩 샘플</strong>과 <strong>무작위 특성</strong>으로 학습한 여러 결정 트리의 다수결로 예측합니다.
          </div>
          <div className="space-y-2">
            {forests.map(t=>(
              <div key={t.id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-200">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  🌲{t.id}
                </div>
                <div className="text-xs text-gray-500 flex-1">{t.data}</div>
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${t.pred==='화이트'?'bg-blue-100 text-blue-700':'bg-red-100 text-red-700'}`}>
                  {t.pred==='화이트'?'🥂 화이트':'🍷 레드'}
                </div>
                <div className="text-xs text-gray-400">{(t.acc*100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 text-center">
            <div className="text-sm font-bold text-green-700 mb-2">다수결 투표 결과</div>
            <div className="flex justify-center gap-4 text-sm">
              <span className="text-blue-700 font-bold">🥂 화이트: 4표</span>
              <span className="text-red-700">🍷 레드: 1표</span>
            </div>
            <div className="text-lg font-bold text-green-700 mt-2">→ 🥂 화이트 와인 예측!</div>
          </div>
        </div>
      )}

      {tab==='impurity'&&(
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {[
              {title:'불순도 = 0',ratio:[10,0],gini:'0.00',desc:'하나의 클래스만 존재 (완전 분리)',color:'green'},
              {title:'불순도 = 0.5',ratio:[5,5],gini:'0.50',desc:'두 클래스가 절반씩 (가장 불순)',color:'red'},
              {title:'불순도 = 0.32',ratio:[8,2],gini:'0.32',desc:'한 클래스가 더 많음',color:'orange'},
            ].map(c=>(
              <div key={c.title} className="bg-white rounded-xl p-3 border border-gray-200 text-center">
                <div className={`text-xs font-bold mb-2 text-${c.color}-600`}>{c.title}</div>
                <div className="h-16 flex items-end justify-center gap-1 mb-2">
                  <div className="w-6 bg-red-400 rounded-t" style={{height:`${c.ratio[0]*5}px`}}/>
                  <div className="w-6 bg-blue-400 rounded-t" style={{height:`${c.ratio[1]*5}px`}}/>
                </div>
                <div className="text-xs font-mono text-gray-600">gini = {c.gini}</div>
                <div className="text-xs text-gray-500 mt-1 leading-tight">{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="bg-orange-50 rounded-xl p-3 border border-orange-200 font-mono text-xs text-orange-900">
            gini = 1 − (p₁² + p₂²)<br/>
            p₁=8/10=0.8, p₂=2/10=0.2<br/>
            gini = 1 − (0.64 + 0.04) = 0.32
          </div>
        </div>
      )}
    </div>
  );
}
