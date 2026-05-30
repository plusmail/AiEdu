// 혼자 공부하는 머신러닝+딥러닝 (박해선) 목차 기반 커리큘럼
export const modules = [
  // ════════════════════════════════════════════════
  // Chapter 01 — 나의 첫 머신러닝
  // ════════════════════════════════════════════════
  {
    id: 1,
    title: "Chapter 01 — 나의 첫 머신러닝",
    description: "AI·머신러닝·딥러닝의 차이를 이해하고, 구글 코랩으로 첫 번째 분류 프로그램을 만들어 봅니다.",
    icon: "🐟",
    color: "blue",
    estimatedTime: "60분",
    lessons: [
      {
        id: "ch01-1",
        title: "01-1 인공지능과 머신러닝, 딥러닝",
        duration: "15분",
        content: `
<h2>인공지능이란?</h2>
<p>인공지능(AI)은 사람처럼 학습하고 추론하는 컴퓨터 프로그램을 만드는 과학 분야입니다. 1950년대 앨런 튜링이 "기계가 생각할 수 있는가?"를 묻는 <strong>튜링 테스트</strong>를 제안하며 시작되었습니다.</p>

<div class="highlight-box">
<strong>포함 관계:</strong> 인공지능 ⊃ 머신러닝 ⊃ 딥러닝
</div>

<h2>머신러닝이란?</h2>
<p>머신러닝은 규칙을 직접 프로그래밍하지 않고, <strong>데이터에서 스스로 규칙을 학습</strong>하는 알고리즘입니다.</p>
<div class="example-box">
<strong>전통적 프로그래밍:</strong> 데이터 + 규칙 → 답<br>
<strong>머신러닝:</strong> 데이터 + 답 → 규칙(모델)
</div>

<h2>딥러닝이란?</h2>
<p>딥러닝은 <strong>인공 신경망</strong>을 여러 층 쌓아 복잡한 패턴을 학습하는 머신러닝의 한 분야입니다. 이미지·음성·텍스트 분야에서 혁신적인 성능을 보입니다.</p>

<div class="example-box">
<strong>📌 이 책에서 배울 것:</strong><br>
1~6장: 머신러닝 (사이킷런 sklearn)<br>
7~9장: 딥러닝 (케라스 Keras / 파이토치 PyTorch)<br>
10장: 언어 모델 (트랜스포머, LLM)
</div>`,
        keyPoints: ["AI ⊃ 머신러닝 ⊃ 딥러닝 포함 관계", "머신러닝: 데이터에서 스스로 규칙(모델)을 학습", "딥러닝: 신경망 다층 쌓기로 복잡한 패턴 처리"],
        diagramType: "ai-hierarchy",
      },
      {
        id: "ch01-2",
        title: "01-2 코랩과 주피터 노트북",
        duration: "10분",
        content: `
<h2>구글 코랩(Colab)</h2>
<p>구글 코랩은 브라우저에서 파이썬 코드를 실행할 수 있는 <strong>무료 클라우드 환경</strong>입니다. 설치 없이 GPU도 무료로 사용할 수 있습니다.</p>

<div class="highlight-box">
<strong>접속:</strong> colab.research.google.com<br>
<strong>장점:</strong> 설치 불필요, 구글 드라이브 연동, 무료 GPU/TPU
</div>

<h2>텍스트 셀 vs 코드 셀</h2>
<div class="example-box">
<strong>📝 텍스트 셀:</strong> 마크다운 형식으로 설명 작성<br>
<strong>⚡ 코드 셀:</strong> 파이썬 코드 작성 및 실행 (Shift+Enter)
</div>

<h2>노트북 기본 단축키</h2>
<div class="example-box">
<strong>Shift + Enter:</strong> 셀 실행 후 다음 셀로<br>
<strong>Ctrl + Enter:</strong> 셀 실행 (이동 없음)<br>
<strong>Ctrl + M B:</strong> 아래에 새 코드 셀 추가<br>
<strong>Ctrl + M D:</strong> 셀 삭제
</div>

<div class="warning-box">
<strong>⚠️ 코랩 주의사항:</strong><br>
• 90분 미사용 시 세션 초기화 (변수 사라짐)<br>
• 최대 12시간 연속 사용 후 초기화<br>
• 데이터는 구글 드라이브에 저장 권장
</div>`,
        keyPoints: ["코랩 = 설치 없는 무료 클라우드 파이썬 환경", "텍스트 셀(마크다운)과 코드 셀(Python) 두 종류", "Shift+Enter로 셀 실행"],
        codeExampleId: "ch01-colab",
      },
      {
        id: "ch01-3",
        title: "01-3 마켓과 머신러닝 — 도미·빙어 분류",
        duration: "20분",
        content: `
<h2>생선 분류 문제</h2>
<p>도미(bream)와 빙어(smelt) 두 종류의 생선을 <strong>무게와 길이</strong> 데이터만으로 분류합니다. 이것이 이 책의 첫 번째 머신러닝 문제입니다.</p>

<div class="example-box">
<strong>데이터 구조:</strong><br>
특성(feature): 무게(g), 길이(cm)<br>
레이블(label): 1 = 도미, 0 = 빙어
</div>

<h2>K-최근접 이웃 (KNN)</h2>
<p>KNN은 새로운 데이터가 들어오면 <strong>가장 가까운 K개의 이웃</strong>을 찾아 다수결로 분류하는 알고리즘입니다.</p>

<div class="highlight-box">
<strong>사이킷런 KNN 분류 3단계:</strong><br>
1. 모델 생성: KNeighborsClassifier(n_neighbors=5)<br>
2. 훈련:      model.fit(X_train, y_train)<br>
3. 예측:      model.predict([[무게, 길이]])
</div>

<div class="example-box">
<strong>[문제해결 과정] 도미와 빙어 분류:</strong><br>
① 데이터 준비 (리스트로 만들기)<br>
② 산점도(scatter plot)로 시각화<br>
③ KNeighborsClassifier 훈련<br>
④ 새 생선 예측 → '도미' 또는 '빙어'
</div>

<div class="warning-box">
<strong>⚠️ 이 장의 문제점:</strong><br>
훈련 데이터 전체로 정확도를 평가 → 과적합 가능성<br>
→ 다음 장에서 훈련/테스트 세트 분리로 해결!
</div>`,
        keyPoints: ["KNN: 가장 가까운 K개 이웃의 다수결로 분류", "fit() 훈련 → predict() 예측 기본 패턴", "훈련 데이터로만 평가하면 신뢰할 수 없음"],
        diagramType: 'knn',
        codeExampleId: "ch01-fish",
      },
    ],
    quizId: "quiz-ch01",
  },

  // ════════════════════════════════════════════════
  // Chapter 02 — 데이터 다루기
  // ════════════════════════════════════════════════
  {
    id: 2,
    title: "Chapter 02 — 데이터 다루기",
    description: "훈련/테스트 세트 분리로 모델을 올바르게 평가하고, 데이터 전처리(스케일 조정)의 중요성을 배웁니다.",
    icon: "📊",
    color: "purple",
    estimatedTime: "60분",
    lessons: [
      {
        id: "ch02-1",
        title: "02-1 훈련 세트와 테스트 세트",
        duration: "20분",
        content: `
<h2>지도 학습과 비지도 학습</h2>
<div class="example-box">
<strong>지도 학습(Supervised):</strong> 정답(레이블)이 있는 데이터로 학습<br>
예: 도미/빙어 분류, 주가 예측<br><br>
<strong>비지도 학습(Unsupervised):</strong> 정답 없이 데이터의 패턴을 스스로 발견<br>
예: 군집화(클러스터링), 차원 축소
</div>

<h2>훈련 세트와 테스트 세트</h2>
<p>모델이 처음 보는 데이터에서도 잘 작동하는지 확인하려면, 데이터를 <strong>훈련용과 테스트용으로 나눠야</strong> 합니다.</p>

<div class="highlight-box">
<strong>일반적인 분리 비율:</strong><br>
훈련 세트: 70~80% | 테스트 세트: 20~30%<br><br>
<strong>사이킷런:</strong><br>
from sklearn.model_selection import train_test_split<br>
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
</div>

<h2>샘플링 편향(Sampling Bias)</h2>
<p>데이터를 앞에서부터 자르면 특정 클래스가 훈련/테스트에 몰릴 수 있습니다. <code>shuffle=True</code>(기본값)로 방지합니다.</p>

<div class="example-box">
<strong>넘파이 기본 활용:</strong><br>
np.array() — 리스트를 NumPy 배열로<br>
arr.shape — 배열 크기 확인<br>
arr[:, 0] — 열(column) 선택
</div>`,
        keyPoints: ["훈련 세트 = 모델 학습용, 테스트 세트 = 공정한 성능 평가용", "train_test_split()으로 무작위 분리 (shuffle=True 기본)", "샘플링 편향: 편향된 분리 → 잘못된 평가"],
        diagramType: "ml-pipeline",
        codeExampleId: "ch02-train-test",
      },
      {
        id: "ch02-2",
        title: "02-2 데이터 전처리",
        duration: "20분",
        content: `
<h2>수상한 도미 한 마리 — 스케일 문제</h2>
<p>무게(g)와 길이(cm)는 단위가 다릅니다. KNN은 거리를 기준으로 이웃을 찾기 때문에, <strong>값이 큰 무게 특성이 거리 계산을 지배</strong>하게 됩니다.</p>

<div class="warning-box">
<strong>⚠️ 스케일 문제:</strong><br>
무게: 0~1000g, 길이: 10~50cm → 무게 단위가 거리를 지배<br>
→ 길이가 매우 달라도 거리에 영향을 거의 못 줌
</div>

<h2>표준화(Standardization)</h2>
<p>각 특성의 평균을 0, 표준편차를 1로 맞춰서 모든 특성이 같은 스케일을 갖게 합니다.</p>

<div class="highlight-box">
<strong>표준점수(Z-score) 공식:</strong><br>
z = (x − μ) / σ<br>
(μ: 평균, σ: 표준편차)<br><br>
<strong>사이킷런:</strong><br>
from sklearn.preprocessing import StandardScaler<br>
scaler = StandardScaler()<br>
X_train_scaled = scaler.fit_transform(X_train)<br>
X_test_scaled  = scaler.transform(X_test)  # fit 없이 transform만!
</div>

<div class="warning-box">
<strong>⚠️ 중요 원칙:</strong><br>
테스트 세트에는 반드시 <strong>훈련 세트의 통계(μ, σ)</strong>를 사용해야 합니다.<br>
테스트 세트로 fit()을 호출하면 데이터 누수(Data Leakage)가 발생합니다.
</div>`,
        keyPoints: ["스케일이 다른 특성 → KNN 거리 왜곡 발생", "StandardScaler로 평균0·표준편차1 표준화", "테스트 세트에는 훈련 통계로 transform만 (fit 금지)"],
        diagramType: 'train-test',
        codeExampleId: "ch02-scaler",
      },
    ],
    quizId: "quiz-ch02",
  },

  // ════════════════════════════════════════════════
  // Chapter 03 — 회귀 알고리즘과 모델 규제
  // ════════════════════════════════════════════════
  {
    id: 3,
    title: "Chapter 03 — 회귀 알고리즘과 모델 규제",
    description: "연속적인 수치를 예측하는 회귀 문제를 KNN·선형·다항 회귀로 해결하고 Ridge·Lasso 규제를 배웁니다.",
    icon: "📈",
    color: "green",
    estimatedTime: "80분",
    lessons: [
      {
        id: "ch03-1",
        title: "03-1 k-최근접 이웃 회귀",
        duration: "20분",
        content: `
<h2>회귀(Regression)란?</h2>
<p>분류가 클래스를 맞히는 것이라면, 회귀는 <strong>연속적인 숫자를 예측</strong>합니다.</p>

<div class="example-box">
<strong>분류 예시:</strong> 도미 or 빙어?<br>
<strong>회귀 예시:</strong> 이 생선의 무게는 몇 g?
</div>

<h2>KNN 회귀</h2>
<p>KNN 분류와 동일하게 가까운 K개의 이웃을 찾되, 다수결 대신 <strong>이웃 값들의 평균</strong>을 예측값으로 반환합니다.</p>

<div class="highlight-box">
<strong>사이킷런 KNN 회귀:</strong><br>
from sklearn.neighbors import KNeighborsRegressor<br>
model = KNeighborsRegressor(n_neighbors=3)<br>
model.fit(X_train, y_train)<br>
model.predict([[30]])   # 길이 30cm 생선 무게 예측
</div>

<h2>결정계수 R²</h2>
<p>회귀 모델의 성능 지표입니다. 1에 가까울수록 좋고, 0이면 단순히 평균을 예측하는 것과 같습니다.</p>

<div class="example-box">
<strong>R² = 1 − (타깃-예측)² 합 / (타깃-평균)² 합</strong><br><br>
R² ≈ 1.0: 완벽한 예측<br>
R² = 0.0: 평균으로만 예측 (무의미)<br>
R² &lt; 0: 평균보다 못한 예측
</div>

<div class="example-box">
<strong>과대적합 vs 과소적합:</strong><br>
훈련 R² ≫ 테스트 R²  → <strong>과대적합</strong> (overfitting)<br>
훈련 R² ≈ 테스트 R² ≈ 낮음 → <strong>과소적합</strong> (underfitting)
</div>`,
        keyPoints: ["KNN 회귀 = 이웃 K개의 평균으로 수치 예측", "R²(결정계수): 1에 가까울수록 좋은 회귀 성능", "과대적합: 훈련 ≫ 테스트, 과소적합: 둘 다 낮음"],
        diagramType: 'regression',
        codeExampleId: "ch03-knn-reg",
      },
      {
        id: "ch03-2",
        title: "03-2 선형 회귀",
        duration: "20분",
        content: `
<h2>KNN 회귀의 한계</h2>
<p>KNN은 훈련 데이터 범위 밖의 값을 예측할 때 <strong>가장 끝 이웃의 평균</strong>을 반환합니다. 즉, 새로운 범위를 전혀 예측하지 못합니다.</p>

<div class="warning-box">
<strong>⚠️ KNN 한계:</strong><br>
길이 100cm 생선 → 이웃 최대 길이 50cm → 50cm의 이웃 평균만 반환<br>
실제로 100cm면 훨씬 무거울 텐데 예측 불가!
</div>

<h2>선형 회귀 (Linear Regression)</h2>
<p>데이터에 가장 잘 맞는 <strong>직선(y = ax + b)</strong>을 찾아 예측합니다.</p>

<div class="highlight-box">
<strong>사이킷런 선형 회귀:</strong><br>
from sklearn.linear_model import LinearRegression<br>
model = LinearRegression()<br>
model.fit(X_train, y_train)<br>
print(model.coef_)      # 기울기(a)<br>
print(model.intercept_) # 절편(b)
</div>

<h2>다항 회귀 (Polynomial Regression)</h2>
<p>직선으로 표현이 안 될 때 <strong>특성의 거듭제곱</strong>을 추가해 곡선으로 적합합니다.</p>

<div class="example-box">
<strong>2차 다항 회귀:</strong><br>
특성 추가: [길이] → [길이, 길이²]<br><br>
from sklearn.preprocessing import PolynomialFeatures<br>
poly = PolynomialFeatures(degree=2)<br>
X_poly = poly.fit_transform(X_train)
</div>`,
        keyPoints: ["KNN은 훈련 범위 밖 예측 불가 → 선형 회귀로 해결", "선형 회귀: y = ax + b 직선 찾기, coef_·intercept_ 확인", "다항 회귀: 특성 거듭제곱 추가로 곡선 적합"],
        diagramType: 'regression',
        codeExampleId: "ch03-linear",
      },
      {
        id: "ch03-3",
        title: "03-3 특성 공학과 규제",
        duration: "25분",
        content: `
<h2>다중 회귀와 특성 공학</h2>
<p>여러 특성을 사용하는 <strong>다중 회귀(Multiple Regression)</strong>와, 기존 특성에서 새로운 특성을 만드는 <strong>특성 공학(Feature Engineering)</strong>을 배웁니다.</p>

<div class="example-box">
<strong>PolynomialFeatures(degree=2, include_bias=False):</strong><br>
특성 [a, b] → [a, b, a², ab, b²]<br>
5개 특성 → 15개 특성으로 확장
</div>

<h2>규제(Regularization)</h2>
<p>특성이 너무 많거나 복잡한 모델은 과대적합이 발생합니다. 규제는 <strong>계수(coef_)의 크기를 제한</strong>해 과대적합을 방지합니다.</p>

<div class="highlight-box">
<strong>릿지(Ridge) 회귀 — L2 규제:</strong><br>
손실 = MSE + α × Σcoef²<br>
계수를 작게 만들되 완전히 0으로 만들지 않음<br><br>
from sklearn.linear_model import Ridge<br>
ridge = Ridge(alpha=0.1)   # alpha: 규제 강도
</div>

<div class="highlight-box">
<strong>라쏘(Lasso) 회귀 — L1 규제:</strong><br>
손실 = MSE + α × Σ|coef|<br>
일부 계수를 완전히 0으로 만들어 <strong>특성 선택</strong> 효과<br><br>
from sklearn.linear_model import Lasso<br>
lasso = Lasso(alpha=0.1)
</div>

<div class="example-box">
<strong>alpha 선택 기준:</strong><br>
alpha ↑ → 규제 강화 → 과소적합 위험<br>
alpha ↓ → 규제 완화 → 과대적합 위험<br>
→ 교차 검증으로 최적 alpha 탐색
</div>`,
        keyPoints: ["PolynomialFeatures로 특성 확장 → 다중 회귀", "Ridge(L2): 계수를 작게 유지, Lasso(L1): 계수를 0으로", "alpha = 규제 강도, 교차 검증으로 최적값 선택"],
        codeExampleId: "ch03-regularization",
      },
    ],
    quizId: "quiz-ch03",
  },

  // ════════════════════════════════════════════════
  // Chapter 04 — 다양한 분류 알고리즘
  // ════════════════════════════════════════════════
  {
    id: 4,
    title: "Chapter 04 — 다양한 분류 알고리즘",
    description: "확률을 출력하는 로지스틱 회귀와, 데이터를 조금씩 학습하는 확률적 경사 하강법을 배웁니다.",
    icon: "🎰",
    color: "orange",
    estimatedTime: "70분",
    lessons: [
      {
        id: "ch04-1",
        title: "04-1 로지스틱 회귀",
        duration: "25분",
        content: `
<h2>럭키백의 확률</h2>
<p>단순 분류를 넘어 "이 생선이 도미일 확률은 몇 %인가?"처럼 <strong>확률을 예측</strong>해야 할 때 로지스틱 회귀를 사용합니다.</p>

<h2>시그모이드 함수</h2>
<p>로지스틱 회귀는 선형 방정식의 출력을 <strong>시그모이드(sigmoid) 함수</strong>를 통해 0~1 사이의 확률로 변환합니다.</p>

<div class="highlight-box">
<strong>σ(z) = 1 / (1 + e⁻ᶻ)</strong><br><br>
z → -∞: σ(z) → 0<br>
z = 0:  σ(z) = 0.5<br>
z → +∞: σ(z) → 1
</div>

<h2>소프트맥스 — 다중 분류</h2>
<p>3개 이상 클래스를 분류할 때는 각 클래스의 점수를 <strong>소프트맥스(Softmax)</strong>로 변환해 모든 클래스의 확률 합이 1이 되게 합니다.</p>

<div class="example-box">
<strong>사이킷런 로지스틱 회귀:</strong><br>
from sklearn.linear_model import LogisticRegression<br>
lr = LogisticRegression(C=20, max_iter=1000)<br>
lr.fit(X_train_scaled, y_train)<br>
proba = lr.predict_proba(X_test_scaled[:5])<br>
print(lr.classes_)  # 클래스 목록
</div>

<div class="example-box">
<strong>C 파라미터 (규제 강도의 역수):</strong><br>
C ↑ → 규제 약화 (기본값 C=1.0)<br>
C ↓ → 규제 강화
</div>`,
        keyPoints: ["로지스틱 회귀: 선형 출력 → 시그모이드 → 확률", "predict_proba()로 각 클래스 확률 반환", "다중 분류: 소프트맥스로 전체 확률 합 = 1"],
        diagramType: 'sigmoid',
        codeExampleId: "ch04-logistic",
      },
      {
        id: "ch04-2",
        title: "04-2 확률적 경사 하강법 (SGD)",
        duration: "25분",
        content: `
<h2>점진적인 학습</h2>
<p>데이터가 매우 크거나 계속 새 데이터가 들어올 때, 전체를 한 번에 학습하는 대신 <strong>조금씩 점진적으로 학습</strong>하는 방법이 필요합니다.</p>

<div class="example-box">
<strong>배치 경사 하강법:</strong> 전체 데이터로 한 번에 학습 (느리지만 안정)<br>
<strong>미니배치 경사 하강법:</strong> 일부씩 나눠 학습 (균형)<br>
<strong>확률적 경사 하강법(SGD):</strong> 샘플 하나씩 학습 (빠르지만 불안정)
</div>

<h2>에포크(Epoch)</h2>
<p>전체 훈련 데이터를 한 바퀴 도는 것을 <strong>1 에포크</strong>라고 합니다.</p>

<div class="highlight-box">
<strong>사이킷런 SGDClassifier:</strong><br>
from sklearn.linear_model import SGDClassifier<br>
sgd = SGDClassifier(loss='log_loss', max_iter=1)<br>
sgd.fit(X_train_scaled, y_train)<br><br>
# 추가 학습 (점진적 학습의 핵심!)<br>
sgd.partial_fit(X_new_scaled, y_new)
</div>

<div class="example-box">
<strong>에포크와 과대/과소적합:</strong><br>
에포크 너무 적음 → <strong>과소적합</strong> (훈련 덜 됨)<br>
에포크 너무 많음 → <strong>과대적합</strong> (훈련 데이터 암기)<br>
→ 검증 손실이 최소인 에포크에서 조기 종료(Early Stopping)!
</div>

<div class="warning-box">
<strong>loss 매개변수 주요 값:</strong><br>
'hinge': SVM 기반, 클래스 확률 미제공<br>
'log_loss': 로지스틱 회귀, 확률 제공<br>
'modified_huber': log_loss보다 강건
</div>`,
        keyPoints: ["SGD: 샘플 하나씩 손실 기울기 계산 → 가중치 업데이트", "partial_fit()으로 새 데이터를 점진적으로 추가 학습", "에포크 수 = 검증 손실 최소점에서 조기 종료"],
        diagramType: 'sigmoid',
        codeExampleId: "ch04-sgd",
      },
    ],
    quizId: "quiz-ch04",
  },

  // ════════════════════════════════════════════════
  // Chapter 05 — 트리 알고리즘
  // ════════════════════════════════════════════════
  {
    id: 5,
    title: "Chapter 05 — 트리 알고리즘",
    description: "직관적인 결정 트리부터 교차 검증, 랜덤 포레스트·그레이디언트 부스팅 앙상블까지 배웁니다.",
    icon: "🌲",
    color: "red",
    estimatedTime: "90분",
    lessons: [
      {
        id: "ch05-1",
        title: "05-1 결정 트리",
        duration: "20분",
        content: `
<h2>결정 트리 (Decision Tree)</h2>
<p>결정 트리는 <strong>if-else 질문을 연속적으로</strong> 분기하며 분류하는 알고리즘입니다. 사람이 읽고 이해할 수 있어 <strong>설명 가능한 AI</strong>의 대표적 모델입니다.</p>

<div class="example-box">
<strong>트리 구조:</strong><br>
루트 노드 → 내부 노드(분기) → 리프 노드(예측값)<br><br>
"알코올 도수 ≤ 11.5?" → Yes → "당도 ≤ 4.3?" → …
</div>

<h2>불순도(Impurity)와 정보 이득</h2>
<p>어떤 질문으로 분기할지는 <strong>불순도를 가장 많이 낮추는</strong> 기준으로 결정합니다.</p>

<div class="highlight-box">
<strong>지니 불순도(Gini Impurity):</strong><br>
gini = 1 − Σ(pᵢ²)<br>
클래스가 완전히 섞이면 0.5, 완전히 분리되면 0<br><br>
<strong>엔트로피(Entropy):</strong><br>
entropy = −Σ(pᵢ × log₂(pᵢ))
</div>

<div class="example-box">
<strong>사이킷런 결정 트리:</strong><br>
from sklearn.tree import DecisionTreeClassifier<br>
dt = DecisionTreeClassifier(max_depth=3, random_state=42)<br>
dt.fit(X_train_scaled, y_train)<br>
print(dt.feature_importances_)  # 특성 중요도
</div>

<div class="warning-box">
<strong>⚠️ max_depth 미설정:</strong><br>
훈련 데이터에 완벽 적합 (과대적합) → max_depth로 깊이 제한 필요
</div>`,
        keyPoints: ["결정 트리 = if-else 질문의 연속, 설명 가능", "지니 불순도 최소화 방향으로 분기 결정", "max_depth로 깊이 제한 → 과대적합 방지"],
        diagramType: 'decision-tree',
        codeExampleId: "ch05-decision-tree",
      },
      {
        id: "ch05-2",
        title: "05-2 교차 검증과 그리드 서치",
        duration: "20분",
        content: `
<h2>검증 세트 (Validation Set)</h2>
<p>하이퍼파라미터를 튜닝하면서 테스트 세트를 반복 사용하면 테스트 세트에 과적합됩니다. 별도의 <strong>검증 세트</strong>가 필요합니다.</p>

<div class="example-box">
훈련 세트 60% + 검증 세트 20% + 테스트 세트 20%
</div>

<h2>교차 검증 (Cross Validation)</h2>
<p>데이터를 K개의 폴드로 나눠 K번 반복해 평가하는 방법입니다. 데이터를 더 효율적으로 사용합니다.</p>

<div class="highlight-box">
<strong>k-폴드 교차 검증:</strong><br>
from sklearn.model_selection import cross_validate<br>
scores = cross_validate(dt, X_train, y_train, cv=5)<br>
print(scores['test_score'].mean())  # 5회 평균 성능
</div>

<h2>그리드 서치 (Grid Search)</h2>
<p>여러 하이퍼파라미터 조합을 <strong>모두 시도</strong>해 최적을 찾습니다.</p>

<div class="example-box">
<strong>사이킷런 GridSearchCV:</strong><br>
from sklearn.model_selection import GridSearchCV<br>
params = {'max_depth': [2,3,4], 'min_samples_leaf': [1,2,3]}<br>
gs = GridSearchCV(DecisionTreeClassifier(), params, cv=5)<br>
gs.fit(X_train, y_train)<br>
print(gs.best_params_)    # 최적 파라미터<br>
print(gs.best_score_)     # 최적 교차 검증 점수
</div>`,
        keyPoints: ["검증 세트: 하이퍼파라미터 튜닝용 (테스트 세트 오염 방지)", "cross_validate(): K-폴드로 더 신뢰할 수 있는 성능 평가", "GridSearchCV: 모든 파라미터 조합 탐색"],
        codeExampleId: "ch05-cross-val",
      },
      {
        id: "ch05-3",
        title: "05-3 트리의 앙상블",
        duration: "25분",
        content: `
<h2>앙상블 학습 (Ensemble Learning)</h2>
<p>여러 모델의 예측을 합쳐 더 좋은 결과를 얻는 방법입니다. "100명의 전문가 의견 종합"과 같습니다.</p>

<h2>랜덤 포레스트 (Random Forest)</h2>
<p>각기 다른 데이터 샘플(부트스트랩)과 특성 일부로 학습한 여러 결정 트리를 평균 내는 방법입니다.</p>

<div class="highlight-box">
<strong>from sklearn.ensemble import RandomForestClassifier</strong><br>
rf = RandomForestClassifier(n_estimators=100, random_state=42)<br>
rf.fit(X_train, y_train)<br>
print(rf.feature_importances_)
</div>

<h2>그레이디언트 부스팅 (Gradient Boosting)</h2>
<p>약한 트리를 순차적으로 훈련해 앞 트리의 오차를 다음 트리가 보정하는 방식입니다. 정확도가 높지만 학습이 느립니다.</p>

<div class="example-box">
<strong>히스토그램 기반 그레이디언트 부스팅:</strong><br>
from sklearn.ensemble import HistGradientBoostingClassifier<br>
hgb = HistGradientBoostingClassifier(random_state=42)<br>
hgb.fit(X_train, y_train)<br><br>
XGBoost, LightGBM도 같은 계열 — 정형 데이터 최강!
</div>

<div class="example-box">
<strong>정형 vs 비정형 데이터:</strong><br>
정형(표 데이터): 앙상블(랜덤 포레스트, XGBoost) 강세<br>
비정형(이미지·텍스트): 딥러닝(CNN, Transformer) 강세
</div>`,
        keyPoints: ["랜덤 포레스트: 부트스트랩 샘플 × 무작위 특성 → 다수결", "그레이디언트 부스팅: 오차를 순차적으로 보완", "정형 데이터는 앙상블, 비정형 데이터는 딥러닝이 강세"],
        diagramType: 'decision-tree',
        codeExampleId: "ch05-ensemble",
      },
    ],
    quizId: "quiz-ch05",
  },

  // ════════════════════════════════════════════════
  // Chapter 06 — 비지도 학습
  // ════════════════════════════════════════════════
  {
    id: 6,
    title: "Chapter 06 — 비지도 학습",
    description: "정답 없이 데이터를 그룹화하는 군집(K-평균)과 고차원 데이터를 압축하는 PCA를 배웁니다.",
    icon: "🍎",
    color: "cyan",
    estimatedTime: "75분",
    lessons: [
      {
        id: "ch06-1",
        title: "06-1 군집 알고리즘",
        duration: "20분",
        content: `
<h2>비지도 학습이란?</h2>
<p>정답(레이블) 없이 데이터의 <strong>숨겨진 구조나 패턴을 스스로 발견</strong>하는 학습입니다.</p>

<div class="example-box">
<strong>비지도 학습 활용 사례:</strong><br>
• 고객 세분화 (비슷한 구매 패턴끼리 묶기)<br>
• 이상 탐지 (정상 패턴에서 벗어난 것 탐지)<br>
• 차원 축소 (특성 수 줄이기)
</div>

<h2>픽셀값 분석으로 과일 사진 분류</h2>
<p>100×100 픽셀 흑백 사진을 <strong>10,000개 숫자(픽셀값)의 배열</strong>로 표현합니다.</p>

<div class="highlight-box">
<strong>numpy 배열 조작:</strong><br>
fruits = np.load('fruits_300.npy')  # (300, 100, 100)<br>
fruits_2d = fruits.reshape(-1, 100*100)  # (300, 10000)<br><br>
# 픽셀 평균으로 유사한 사진 묶기<br>
apple_mean = fruits_2d[:100].mean(axis=0)  # shape (10000,)
</div>

<div class="example-box">
<strong>axis 매개변수:</strong><br>
axis=0: 행 방향(샘플 간) 평균 → 대표 이미지<br>
axis=1: 열 방향(픽셀 간) 평균 → 샘플별 평균 밝기
</div>`,
        keyPoints: ["비지도 학습: 레이블 없이 패턴을 스스로 발견", "이미지 = 픽셀 숫자 배열 (100×100 = 10,000개)", "reshape(-1, n): 2D로 펼치기 (배치 처리 핵심)"],
        codeExampleId: "ch06-clustering-intro",
      },
      {
        id: "ch06-2",
        title: "06-2 k-평균 군집",
        duration: "25분",
        content: `
<h2>K-평균 알고리즘</h2>
<p>K개의 <strong>클러스터 중심(centroid)</strong>을 반복적으로 업데이트해 비슷한 샘플끼리 묶는 알고리즘입니다.</p>

<div class="highlight-box">
<strong>K-평균 동작 과정:</strong><br>
1. 무작위로 K개의 중심점 초기화<br>
2. 각 샘플을 가장 가까운 중심으로 배정<br>
3. 각 클러스터의 새 중심 = 소속 샘플들의 평균<br>
4. 중심이 더 이상 변하지 않을 때까지 2~3 반복
</div>

<div class="example-box">
<strong>사이킷런 KMeans:</strong><br>
from sklearn.cluster import KMeans<br>
km = KMeans(n_clusters=3, random_state=42)<br>
km.fit(fruits_2d)<br>
print(km.labels_)         # 각 샘플의 클러스터 번호<br>
print(km.cluster_centers_)  # 클러스터 중심 (shape: 3×10000)
</div>

<h2>최적의 K 찾기 — 엘보우 방법</h2>
<div class="example-box">
<strong>이너샤(Inertia) = 클러스터 내 거리 합계</strong><br><br>
K를 늘릴수록 이너샤 감소, 하지만 어느 지점에서 감소폭이 꺾임<br>
그 꺾이는 지점("엘보우")이 최적의 K
</div>`,
        keyPoints: ["K-평균: 무작위 중심 초기화 → 배정 → 중심 재계산 반복", "km.labels_: 클러스터 번호, km.cluster_centers_: 중심 좌표", "엘보우 방법: 이너샤 감소폭이 꺾이는 K가 최적"],
        diagramType: 'kmeans',
        codeExampleId: "ch06-kmeans",
      },
      {
        id: "ch06-3",
        title: "06-3 주성분 분석 (PCA)",
        duration: "25분",
        content: `
<h2>차원 축소란?</h2>
<p>10,000개 픽셀로 표현된 이미지를 <strong>핵심 정보만 남기고 압축</strong>하는 기술입니다. 메모리와 계산량을 줄이면서 성능을 유지합니다.</p>

<h2>주성분 분석 (PCA)</h2>
<p>데이터의 <strong>분산이 최대인 방향(주성분)</strong>을 찾아 그 방향으로 투영해 차원을 축소합니다.</p>

<div class="highlight-box">
<strong>사이킷런 PCA:</strong><br>
from sklearn.decomposition import PCA<br>
pca = PCA(n_components=50)  # 50개 주성분<br>
pca.fit(fruits_2d)<br>
fruits_pca = pca.transform(fruits_2d)  # (300, 50)으로 축소<br><br>
# 원본 복원 (손실 있음)<br>
fruits_back = pca.inverse_transform(fruits_pca)
</div>

<h2>설명된 분산 (Explained Variance)</h2>
<div class="example-box">
<strong>pca.explained_variance_ratio_:</strong><br>
각 주성분이 원본 분산의 몇 %를 설명하는지<br><br>
np.cumsum(pca.explained_variance_ratio_)<br>
→ 주성분 50개로 원본 분산의 92% 설명 가능
</div>

<div class="example-box">
<strong>PCA 활용:</strong><br>
• 10,000 → 50 차원 축소 후 KMeans 적용 → 성능 동일, 속도 200배<br>
• 2~3 주성분으로 시각화 (고차원 데이터 탐색)
</div>`,
        keyPoints: ["PCA: 분산 최대 방향(주성분)으로 투영해 차원 축소", "explained_variance_ratio_: 각 주성분의 분산 설명력", "PCA 후 머신러닝 모델 적용 → 속도 대폭 향상"],
        codeExampleId: "ch06-pca",
      },
    ],
    quizId: "quiz-ch06",
  },

  // ════════════════════════════════════════════════
  // Chapter 07 — 딥러닝을 시작합니다
  // ════════════════════════════════════════════════
  {
    id: 7,
    title: "Chapter 07 — 딥러닝을 시작합니다",
    description: "케라스(Keras)로 인공 신경망을 만들고, 심층 신경망·드롭아웃·콜백으로 성능을 향상시킵니다.",
    icon: "🧠",
    color: "indigo",
    estimatedTime: "90분",
    lessons: [
      {
        id: "ch07-1",
        title: "07-1 인공 신경망",
        duration: "25분",
        content: `
<h2>패션 MNIST 데이터셋</h2>
<p>28×28 픽셀 의류 이미지 70,000장, 10개 클래스(티셔츠·바지·풀오버 등)로 구성된 딥러닝 입문 데이터셋입니다.</p>

<div class="example-box">
<strong>데이터 로드:</strong><br>
from tensorflow import keras<br>
(X_train, y_train), (X_test, y_test) = keras.datasets.fashion_mnist.load_data()<br>
X_train = X_train / 255.0  # 0~1 정규화
</div>

<h2>케라스 Sequential API</h2>
<p>층을 순서대로 쌓는 가장 단순한 신경망 구성 방법입니다.</p>

<div class="highlight-box">
<strong>가장 기본적인 신경망:</strong><br>
model = keras.Sequential([<br>
&nbsp;&nbsp;keras.layers.Flatten(input_shape=(28,28)),  # 784개로 펼치기<br>
&nbsp;&nbsp;keras.layers.Dense(100, activation='sigmoid'),  # 은닉층<br>
&nbsp;&nbsp;keras.layers.Dense(10, activation='softmax'),   # 출력층<br>
])<br>
model.compile(optimizer='sgd',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loss='sparse_categorical_crossentropy',<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metrics=['accuracy'])<br>
model.fit(X_train, y_train, epochs=5)
</div>`,
        keyPoints: ["Flatten: (28,28) → (784,) 1D로 펼치기", "Dense: 완전 연결층, 마지막 층은 softmax로 확률 변환", "compile(): optimizer·loss·metrics 지정 후 fit()으로 훈련"],
        diagramType: "neural-network",
        codeExampleId: "ch07-ann",
      },
      {
        id: "ch07-2",
        title: "07-2 심층 신경망",
        duration: "25분",
        content: `
<h2>심층 신경망 (Deep Neural Network)</h2>
<p>은닉층을 2개 이상 쌓으면 더 복잡한 패턴을 학습할 수 있습니다.</p>

<div class="example-box">
model = keras.Sequential([<br>
&nbsp;&nbsp;keras.layers.Flatten(input_shape=(28,28)),<br>
&nbsp;&nbsp;keras.layers.Dense(300, activation='relu'),  # 1번째 은닉층<br>
&nbsp;&nbsp;keras.layers.Dense(100, activation='relu'),  # 2번째 은닉층<br>
&nbsp;&nbsp;keras.layers.Dense(10, activation='softmax')<br>
])
</div>

<h2>렐루 함수 (ReLU)</h2>
<p>시그모이드의 <strong>기울기 소실(Gradient Vanishing) 문제</strong>를 해결하는 활성화 함수입니다.</p>

<div class="highlight-box">
<strong>ReLU(x) = max(0, x)</strong><br><br>
시그모이드: 양쪽 끝에서 기울기 → 0 (역전파 시 소실)<br>
ReLU: x > 0 이면 기울기 = 1 (소실 없음) → 은닉층 기본값
</div>

<h2>옵티마이저 (Optimizer)</h2>
<div class="example-box">
<strong>주요 옵티마이저:</strong><br>
SGD: 기본 경사 하강법<br>
Adam: 적응적 학습률 (가장 많이 사용)<br>
RMSprop: 과거 기울기 제곱의 지수 평균<br><br>
model.compile(optimizer='adam', ...)
</div>`,
        keyPoints: ["ReLU = max(0, x): 은닉층의 표준 활성화 함수 (기울기 소실 해결)", "Adam 옵티마이저: 적응적 학습률, 가장 범용적으로 사용", "층이 깊어질수록 복잡한 특성 추출 가능"],
        codeExampleId: "ch07-dnn",
      },
      {
        id: "ch07-3",
        title: "07-3 신경망 모델 훈련",
        duration: "25분",
        content: `
<h2>손실 곡선과 검증 손실</h2>
<p>훈련/검증 손실을 시각화해 과대·과소적합을 진단합니다.</p>

<div class="example-box">
history = model.fit(X_train, y_train,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;epochs=20,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;validation_data=(X_val, y_val))<br>
# history.history['loss'], history.history['val_loss']
</div>

<h2>드롭아웃 (Dropout)</h2>
<p>훈련 시 무작위로 일부 뉴런을 <strong>꺼서(drop) 과대적합을 방지</strong>합니다.</p>

<div class="highlight-box">
keras.layers.Dropout(0.3)  # 30% 뉴런 무작위 제거<br><br>
→ 모델이 특정 뉴런에 의존하지 않도록 강제<br>
→ 예측 시에는 모든 뉴런 사용 (자동 처리)
</div>

<h2>콜백 (Callback)</h2>
<div class="example-box">
<strong>ModelCheckpoint:</strong> 최고 성능 모델 자동 저장<br>
<strong>EarlyStopping:</strong> 검증 손실이 개선 없으면 조기 종료<br><br>
callbacks = [<br>
&nbsp;&nbsp;keras.callbacks.ModelCheckpoint('best.h5', save_best_only=True),<br>
&nbsp;&nbsp;keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True)<br>
]<br>
model.fit(..., callbacks=callbacks)
</div>`,
        keyPoints: ["validation_data로 에포크별 훈련/검증 손실 모니터링", "Dropout(0.3): 30% 뉴런 무작위 제거 → 과대적합 방지", "EarlyStopping: 검증 손실 개선 없으면 자동 조기 종료"],
        codeExampleId: "ch07-training",
      },
    ],
    quizId: "quiz-ch07",
  },

  // ════════════════════════════════════════════════
  // Chapter 08 — 이미지를 위한 인공 신경망
  // ════════════════════════════════════════════════
  {
    id: 8,
    title: "Chapter 08 — 이미지를 위한 인공 신경망",
    description: "합성곱 신경망(CNN)의 구조를 이해하고 케라스로 이미지 분류기를 만들고 시각화합니다.",
    icon: "🖼️",
    color: "blue",
    estimatedTime: "90분",
    lessons: [
      {
        id: "ch08-1",
        title: "08-1 합성곱 신경망의 구성 요소",
        duration: "25분",
        content: `
<h2>합성곱(Convolution)이란?</h2>
<p>이미지 전체를 펼쳐 완전 연결하는 대신, 작은 <strong>필터(커널)</strong>를 슬라이딩하며 지역적 특성을 추출합니다.</p>

<div class="highlight-box">
<strong>합성곱 연산:</strong><br>
입력 이미지의 일부(3×3)와 필터(3×3)의 원소별 곱의 합<br>
→ 특성 맵(Feature Map) 생성<br><br>
keras.layers.Conv2D(32, kernel_size=3, activation='relu', padding='same')
</div>

<div class="example-box">
<strong>padding 매개변수:</strong><br>
'same': 입력과 동일한 크기 유지 (가장자리에 0 패딩)<br>
'valid': 필터가 들어가는 부분만 계산 (크기 축소)
</div>

<h2>풀링(Pooling)</h2>
<p>특성 맵의 크기를 <strong>줄이며 중요한 특성만 남기는</strong> 연산입니다.</p>

<div class="example-box">
<strong>MaxPooling2D:</strong><br>
2×2 영역에서 최대값만 선택 → 크기 절반으로 축소<br><br>
keras.layers.MaxPooling2D(2)
</div>

<h2>CNN 전체 구조</h2>
<div class="highlight-box">
입력(28×28×1) → Conv+ReLU → MaxPool → Conv+ReLU → MaxPool<br>
→ Flatten → Dense → Dense(출력)<br><br>
앞부분(Conv+Pool): 이미지 특성 추출기<br>
뒷부분(Dense): 분류기
</div>`,
        keyPoints: ["합성곱: 작은 필터로 지역 특성 추출 (위치 불변성)", "MaxPooling: 최대값으로 크기 축소 + 노이즈 제거", "CNN = 특성 추출기(Conv+Pool) + 분류기(Dense)"],
        diagramType: 'convolution',
        codeExampleId: "ch08-conv",
      },
      {
        id: "ch08-2",
        title: "08-2 합성곱 신경망을 사용한 이미지 분류",
        duration: "25분",
        content: `
<h2>패션 MNIST CNN 모델</h2>

<div class="example-box">
model = keras.Sequential([<br>
&nbsp;&nbsp;keras.layers.Conv2D(32, (3,3), activation='relu', padding='same', input_shape=(28,28,1)),<br>
&nbsp;&nbsp;keras.layers.MaxPooling2D(2),<br>
&nbsp;&nbsp;keras.layers.Conv2D(64, (3,3), activation='relu', padding='same'),<br>
&nbsp;&nbsp;keras.layers.MaxPooling2D(2),<br>
&nbsp;&nbsp;keras.layers.Flatten(),<br>
&nbsp;&nbsp;keras.layers.Dense(100, activation='relu'),<br>
&nbsp;&nbsp;keras.layers.Dropout(0.4),<br>
&nbsp;&nbsp;keras.layers.Dense(10, activation='softmax')<br>
])
</div>

<h2>배치 정규화 (Batch Normalization)</h2>
<div class="highlight-box">
<strong>BatchNormalization:</strong><br>
각 배치의 활성화값을 정규화 → 학습 안정화 + 속도 향상<br><br>
keras.layers.BatchNormalization()  # Conv2D 다음에 삽입
</div>

<div class="example-box">
<strong>Dense 모델 vs CNN 성능 비교:</strong><br>
Dense(Flatten): 패션 MNIST 정확도 ~87%<br>
CNN:            패션 MNIST 정확도 ~92%<br><br>
→ 이미지의 공간적 구조를 살리는 CNN이 우수
</div>`,
        keyPoints: ["이미지 입력은 (H, W, C) 형태 — 채널(C) 추가 필요", "배치 정규화: 활성화값 정규화로 학습 안정화", "CNN > Dense: 이미지에서 공간적 패턴 보존"],
        codeExampleId: "ch08-cnn",
      },
      {
        id: "ch08-3",
        title: "08-3 합성곱 신경망의 시각화",
        duration: "20분",
        content: `
<h2>가중치 시각화</h2>
<p>첫 번째 합성곱 층의 필터를 이미지로 시각화해 <strong>모델이 무엇을 배웠는지</strong> 확인할 수 있습니다.</p>

<div class="example-box">
<strong>가중치 추출:</strong><br>
conv_weights = model.layers[0].weights[0].numpy()<br>
# shape: (3, 3, 1, 32) — 3×3 필터 32개<br><br>
plt.imshow(conv_weights[:,:,0,0], vmin=-1, vmax=1)<br>
plt.colorbar()
</div>

<h2>함수형 API (Functional API)</h2>
<p>여러 입력/출력, 층 재사용, 복잡한 구조에는 Sequential 대신 <strong>함수형 API</strong>를 사용합니다.</p>

<div class="highlight-box">
inputs = keras.Input(shape=(28,28,1))<br>
x = keras.layers.Conv2D(32, 3, activation='relu')(inputs)<br>
x = keras.layers.MaxPooling2D(2)(x)<br>
x = keras.layers.Flatten()(x)<br>
outputs = keras.layers.Dense(10, activation='softmax')(x)<br>
model = keras.Model(inputs=inputs, outputs=x)  # 중간층 출력 추출!
</div>

<h2>특성 맵 시각화</h2>
<div class="example-box">
<strong>중간층 출력 확인:</strong><br>
feature_extractor = keras.Model(inputs=model.inputs,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;outputs=model.layers[1].output)<br>
feature_maps = feature_extractor.predict(X_test[:1])<br>
# shape: (1, 28, 28, 32) — 32개의 특성 맵
</div>`,
        keyPoints: ["가중치 시각화: 필터가 어떤 패턴을 감지하는지 확인", "함수형 API: 중간 층 출력 추출 가능 (디버깅·해석)", "특성 맵: 각 필터가 이미지에서 감지한 패턴 시각화"],
        codeExampleId: "ch08-visualize",
        diagramType: "opencv-demo",
      },
    ],
    quizId: "quiz-ch08",
  },

  // ════════════════════════════════════════════════
  // Chapter 09 — 텍스트를 위한 인공 신경망
  // ════════════════════════════════════════════════
  {
    id: 9,
    title: "Chapter 09 — 텍스트를 위한 인공 신경망",
    description: "순서가 있는 데이터를 처리하는 RNN, LSTM, GRU를 배우고 영화 리뷰 감성 분석을 구현합니다.",
    icon: "📝",
    color: "purple",
    estimatedTime: "90분",
    lessons: [
      {
        id: "ch09-1",
        title: "09-1 순차 데이터와 순환 신경망",
        duration: "20분",
        content: `
<h2>순차 데이터 (Sequential Data)</h2>
<p>텍스트, 시계열, 음성처럼 <strong>순서가 중요한 데이터</strong>입니다. Dense나 CNN은 순서 정보를 활용하지 못합니다.</p>

<h2>순환 신경망 (RNN)</h2>
<p>이전 시점의 은닉 상태(hidden state)를 현재 입력과 함께 사용해 <strong>순서 정보를 기억</strong>합니다.</p>

<div class="highlight-box">
<strong>RNN 수식:</strong><br>
h_t = tanh(W_x · x_t + W_h · h_{t-1} + b)<br><br>
h_t: 현재 은닉 상태<br>
x_t: 현재 입력<br>
h_{t-1}: 이전 은닉 상태
</div>

<div class="example-box">
keras.layers.SimpleRNN(8, return_sequences=True)  # 모든 시점 출력<br>
keras.layers.SimpleRNN(8)                          # 마지막 시점만 출력
</div>

<div class="warning-box">
<strong>⚠️ 기울기 소실 문제:</strong><br>
시퀀스가 길어질수록 먼 과거 정보가 희미해짐<br>
→ LSTM, GRU로 해결
</div>`,
        keyPoints: ["RNN: 이전 은닉 상태 h_{t-1}을 현재 입력과 함께 처리", "return_sequences=True: 모든 시점 출력, False: 마지막만", "기울기 소실: 긴 시퀀스에서 오래된 정보 희미해짐"],
        diagramType: 'rnn-lstm',
        codeExampleId: "ch09-rnn",
      },
      {
        id: "ch09-2",
        title: "09-2 IMDB 리뷰 분류",
        duration: "25분",
        content: `
<h2>IMDB 영화 리뷰 데이터셋</h2>
<p>25,000개 훈련 + 25,000개 테스트 영화 리뷰를 긍정(1)/부정(0)으로 분류하는 감성 분석 데이터셋입니다.</p>

<div class="example-box">
<strong>데이터 로드와 패딩:</strong><br>
(X_train, y_train), (X_test, y_test) = keras.datasets.imdb.load_data(num_words=300)<br><br>
# 시퀀스 길이 맞추기<br>
from tensorflow.keras.preprocessing import sequence<br>
X_train = sequence.pad_sequences(X_train, maxlen=100)
</div>

<h2>단어 임베딩 (Word Embedding)</h2>
<p>단어를 고차원 벡터로 표현해 <strong>의미가 비슷한 단어를 가깝게</strong> 배치합니다.</p>

<div class="highlight-box">
<strong>Embedding 층:</strong><br>
keras.layers.Embedding(300, 16)  # 300단어 사전, 16차원 임베딩<br><br>
원-핫 인코딩: "사랑" → [0,0,1,0,...] (300차원, 희소)<br>
임베딩: "사랑" → [0.3, -0.2, ...] (16차원, 밀집)
</div>

<div class="example-box">
<strong>전체 모델:</strong><br>
model = keras.Sequential([<br>
&nbsp;&nbsp;keras.layers.Embedding(300, 16),<br>
&nbsp;&nbsp;keras.layers.SimpleRNN(8),<br>
&nbsp;&nbsp;keras.layers.Dense(1, activation='sigmoid')<br>
])
</div>`,
        keyPoints: ["pad_sequences(): 시퀀스 길이를 maxlen으로 통일", "Embedding: 단어 ID → 밀집 벡터 (의미 유사성 학습)", "이진 분류 출력: Dense(1, activation='sigmoid')"],
        codeExampleId: "ch09-imdb",
      },
      {
        id: "ch09-3",
        title: "09-3 LSTM과 GRU 셀",
        duration: "25분",
        content: `
<h2>LSTM (Long Short-Term Memory)</h2>
<p>RNN의 기울기 소실 문제를 <strong>셀 상태(cell state)와 3개의 게이트</strong>로 해결합니다.</p>

<div class="highlight-box">
<strong>LSTM의 3개 게이트:</strong><br>
• 망각 게이트(f_t): 오래된 정보를 얼마나 지울지<br>
• 입력 게이트(i_t): 새 정보를 얼마나 저장할지<br>
• 출력 게이트(o_t): 은닉 상태로 얼마나 내보낼지<br><br>
keras.layers.LSTM(32)
</div>

<h2>GRU (Gated Recurrent Unit)</h2>
<p>LSTM보다 단순한 구조(게이트 2개)로 <strong>비슷한 성능을 더 빠르게</strong> 얻습니다.</p>

<div class="example-box">
keras.layers.GRU(32)   # LSTM보다 파라미터 25% 적음
</div>

<h2>드롭아웃과 2층 쌓기</h2>
<div class="example-box">
model = keras.Sequential([<br>
&nbsp;&nbsp;keras.layers.Embedding(300, 16),<br>
&nbsp;&nbsp;keras.layers.LSTM(32, dropout=0.3, return_sequences=True),<br>
&nbsp;&nbsp;keras.layers.LSTM(8, dropout=0.3),<br>
&nbsp;&nbsp;keras.layers.Dense(1, activation='sigmoid')<br>
])
</div>

<div class="example-box">
<strong>SimpleRNN vs LSTM vs GRU 비교:</strong><br>
SimpleRNN: 파라미터 적지만 긴 시퀀스에 약함<br>
LSTM: 긴 의존성 강점, 파라미터 많음<br>
GRU: LSTM과 비슷하지만 더 빠름 (실무 기본값)
</div>`,
        keyPoints: ["LSTM: 셀 상태 + 3게이트로 장기 의존성 학습", "GRU: 게이트 2개, LSTM보다 가볍고 빠름", "다층 쌓기: return_sequences=True 후 다음 층 연결"],
        diagramType: 'rnn-lstm',
        codeExampleId: "ch09-lstm",
      },
    ],
    quizId: "quiz-ch09",
  },

  // ════════════════════════════════════════════════
  // Chapter 10 — 언어 모델을 위한 신경망
  // ════════════════════════════════════════════════
  {
    id: 10,
    title: "Chapter 10 — 언어 모델을 위한 신경망",
    description: "어텐션 메커니즘과 트랜스포머를 이해하고, Hugging Face로 BART 요약과 LLM 텍스트 생성을 실습합니다.",
    icon: "🤗",
    color: "indigo",
    estimatedTime: "100분",
    lessons: [
      {
        id: "ch10-1",
        title: "10-1 어텐션 메커니즘과 트랜스포머",
        duration: "30분",
        content: `
<h2>인코더-디코더 네트워크</h2>
<p>번역·요약처럼 입력 시퀀스를 다른 시퀀스로 변환할 때 사용합니다. RNN 기반 인코더-디코더는 긴 문장에서 성능이 떨어지는 문제가 있습니다.</p>

<h2>어텐션 메커니즘</h2>
<p>디코더가 각 출력을 생성할 때 <strong>입력의 어느 부분에 집중할지</strong> 동적으로 결정합니다.</p>

<div class="highlight-box">
<strong>셀프 어텐션 (Self-Attention):</strong><br>
Attention(Q, K, V) = softmax(QK^T / √d_k) · V<br><br>
같은 시퀀스 내 단어끼리의 관계를 학습<br>
"그것이 맛있었다" → "그것"이 "음식"을 참조
</div>

<h2>트랜스포머 구조</h2>
<div class="example-box">
<strong>인코더 블록 (N회 반복):</strong><br>
LayerNorm → Multi-Head Self-Attention → Residual<br>
LayerNorm → Feed-Forward Network → Residual<br><br>
<strong>위치 인코딩 (Positional Encoding):</strong><br>
PE(pos, 2i) = sin(pos / 10000^(2i/d))<br>
→ 단어 순서 정보를 임베딩에 추가
</div>`,
        keyPoints: ["어텐션: 디코더가 입력의 어느 부분에 집중할지 동적 결정", "셀프 어텐션: 같은 문장 내 단어 간 관계 학습", "위치 인코딩: 순서 없는 어텐션에 위치 정보 추가"],
        diagramType: "transformer-arch",
        codeExampleId: "attention-js",
      },
      {
        id: "ch10-2",
        title: "10-2 트랜스포머로 상품 설명 요약하기",
        duration: "25분",
        content: `
<h2>전이 학습 (Transfer Learning)</h2>
<p>대규모 데이터로 사전 훈련된 모델의 가중치를 활용해 <strong>적은 데이터로 빠르게 fine-tuning</strong>하는 방법입니다.</p>

<div class="highlight-box">
<strong>허깅페이스 (Hugging Face):</strong><br>
pip install transformers<br><br>
100,000개 이상의 사전 훈련 모델을 1줄 코드로 로드
</div>

<h2>BART 모델</h2>
<p>Facebook AI가 개발한 인코더-디코더 트랜스포머입니다. 텍스트 요약에 뛰어난 성능을 보입니다.</p>

<div class="example-box">
<strong>KoBART로 한국어 요약:</strong><br>
from transformers import BartForConditionalGeneration, PreTrainedTokenizerFast<br><br>
tokenizer = PreTrainedTokenizerFast.from_pretrained('gogamza/kobart-base-v2')<br>
model = BartForConditionalGeneration.from_pretrained('gogamza/kobart-base-v2')<br><br>
input_ids = tokenizer.encode(text, return_tensors='pt')<br>
summary_ids = model.generate(input_ids, max_length=128)<br>
print(tokenizer.decode(summary_ids[0]))
</div>`,
        keyPoints: ["전이 학습: 대규모 사전 훈련 모델 → 내 태스크에 파인튜닝", "허깅페이스: 10만+ 모델을 코드 1줄로 로드", "BART/KoBART: 인코더-디코더 구조, 한국어 요약에 활용"],
        codeExampleId: "ch10-bart",
      },
      {
        id: "ch10-3",
        title: "10-3 대규모 언어 모델로 텍스트 생성하기",
        duration: "25분",
        content: `
<h2>디코더 기반 LLM</h2>
<p>GPT 계열은 인코더 없이 <strong>디코더만</strong> 사용하며, 이전 토큰을 바탕으로 다음 토큰을 예측해 텍스트를 생성합니다.</p>

<div class="example-box">
<strong>LLM 계보:</strong><br>
GPT-1(2018) → GPT-2(2019) → GPT-3(2020) → ChatGPT(2022) → GPT-4(2023)<br>
LLaMA(Meta) → EXAONE(LG) → HyperCLOVA(Naver)
</div>

<h2>토큰 디코딩 전략</h2>
<div class="highlight-box">
<strong>그리디(Greedy):</strong> 매 스텝 가장 높은 확률 토큰 선택 (단순, 반복 많음)<br>
<strong>Beam Search:</strong> 상위 k개 후보를 병렬 탐색 (균형)<br>
<strong>Top-k Sampling:</strong> 상위 k개 중 무작위 선택 (다양성)<br>
<strong>Top-p (Nucleus):</strong> 누적 확률 p 이내에서 무작위 선택 (창의성)
</div>

<h2>OpenAI API</h2>
<div class="example-box">
from openai import OpenAI<br>
client = OpenAI(api_key="YOUR_KEY")<br><br>
response = client.chat.completions.create(<br>
&nbsp;&nbsp;model="gpt-4o-mini",<br>
&nbsp;&nbsp;messages=[{"role":"user", "content":"파이썬이란?"}]<br>
)<br>
print(response.choices[0].message.content)
</div>`,
        keyPoints: ["디코더 전용 LLM: 이전 토큰 → 다음 토큰 반복 예측으로 생성", "디코딩 전략: 그리디·빔서치·top-k·top-p로 다양성 조절", "OpenAI API: client.chat.completions.create()로 GPT 호출"],
        codeExampleId: "ch10-llm",
      },
    ],
    quizId: "quiz-ch10",
  },
];

export const getModuleById = (id) => modules.find((m) => m.id === id);
export const getLessonById = (lessonId) => {
  for (const module of modules) {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, module };
  }
  return null;
};
