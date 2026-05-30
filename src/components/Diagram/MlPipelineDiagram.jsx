import { useState } from 'react';

const STEPS = [
  {
    id: 'data',
    icon: '🗄️',
    label: '데이터 수집',
    color: '#3b82f6',
    detail: {
      title: '1단계: 데이터 수집',
      desc: 'AI 학습에 필요한 원시 데이터를 모으는 단계입니다.',
      items: ['이미지, 텍스트, 수치 데이터 수집', '웹 크롤링, 센서, 설문, DB', '데이터 양이 많을수록 학습 품질 향상'],
      code: 'import pandas as pd\ndf = pd.read_csv("data.csv")\nprint(df.shape)  # (행 수, 열 수)',
    },
  },
  {
    id: 'prep',
    icon: '🧹',
    label: '데이터 전처리',
    color: '#7c3aed',
    detail: {
      title: '2단계: 데이터 전처리',
      desc: '수집한 데이터를 AI가 학습할 수 있는 형태로 변환합니다.',
      items: ['결측값 처리 (삭제 / 평균값 대체)', '정규화 (0~1 범위로 스케일링)', '카테고리 → 숫자 변환 (원-핫 인코딩)'],
      code: 'from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)',
    },
  },
  {
    id: 'train',
    icon: '🏋️',
    label: '모델 학습',
    color: '#059669',
    detail: {
      title: '3단계: 모델 학습',
      desc: '전처리된 데이터로 AI 모델의 가중치(파라미터)를 최적화합니다.',
      items: ['손실 함수 계산 → 역전파', '경사하강법으로 가중치 업데이트', '에포크(epoch)마다 반복 학습'],
      code: 'from sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier()\nmodel.fit(X_train, y_train)',
    },
  },
  {
    id: 'eval',
    icon: '📊',
    label: '평가',
    color: '#d97706',
    detail: {
      title: '4단계: 모델 평가',
      desc: '학습된 모델이 새 데이터에서 얼마나 잘 작동하는지 측정합니다.',
      items: ['테스트 셋으로 정확도(Accuracy) 측정', '과적합(Overfitting) 확인', '혼동 행렬(Confusion Matrix) 분석'],
      code: 'from sklearn.metrics import accuracy_score\npred = model.predict(X_test)\nprint(accuracy_score(y_test, pred))',
    },
  },
  {
    id: 'deploy',
    icon: '🚀',
    label: '배포',
    color: '#dc2626',
    detail: {
      title: '5단계: 배포 (Deployment)',
      desc: '완성된 모델을 실제 서비스에 연결합니다.',
      items: ['API 서버에 모델 탑재', '실시간 예측 서비스 제공', '성능 모니터링 및 재학습'],
      code: 'import pickle\n# 모델 저장\nwith open("model.pkl", "wb") as f:\n    pickle.dump(model, f)',
    },
  },
];

export default function MlPipelineDiagram() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <div className="space-y-4">
      {/* 파이프라인 바 */}
      <div className="flex items-center gap-0 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-shrink-0">
            <button
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl transition-all duration-200 min-w-[80px]"
              style={{
                backgroundColor: active === i ? s.color + '20' : 'transparent',
                border: `2px solid ${active === i ? s.color : '#e5e7eb'}`,
              }}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: active === i ? s.color : '#6b7280' }}>
                {s.label}
              </span>
              <div
                className="w-2 h-2 rounded-full transition-all"
                style={{ backgroundColor: active >= i ? s.color : '#d1d5db' }}
              />
            </button>
            {i < STEPS.length - 1 && (
              <div className="flex items-center mx-1">
                <div
                  className="h-0.5 w-6 transition-all duration-500"
                  style={{ backgroundColor: active > i ? STEPS[i].color : '#d1d5db' }}
                />
                <div className="text-gray-300 text-sm">▶</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 상세 패널 */}
      <div
        className="rounded-xl p-5 border-2 transition-all duration-300 grid md:grid-cols-2 gap-4"
        style={{ borderColor: step.color, backgroundColor: step.color + '08' }}
      >
        <div>
          <h3 className="font-bold text-base mb-2" style={{ color: step.color }}>{step.detail.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{step.detail.desc}</p>
          <ul className="space-y-1.5">
            {step.detail.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                  style={{ backgroundColor: step.color }}>
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-2 font-mono">Python 코드 예시</div>
          <pre className="text-xs text-green-400 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {step.detail.code}
          </pre>
        </div>
      </div>

      {/* 단계 이동 버튼 */}
      <div className="flex justify-between">
        <button
          onClick={() => setActive(Math.max(0, active - 1))}
          disabled={active === 0}
          className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors"
        >
          ◀ 이전 단계
        </button>
        <span className="text-xs text-gray-400 self-center">{active + 1} / {STEPS.length}</span>
        <button
          onClick={() => setActive(Math.min(STEPS.length - 1, active + 1))}
          disabled={active === STEPS.length - 1}
          className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 disabled:opacity-30 hover:bg-gray-50 transition-colors"
        >
          다음 단계 ▶
        </button>
      </div>
    </div>
  );
}
