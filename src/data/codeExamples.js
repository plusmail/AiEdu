// 혼자 공부하는 머신러닝+딥러닝 챕터별 코드 예제
export const codeExamples = {

  // ────── Chapter 01 ──────────────────────────────
  'ch01-colab': {
    language: 'python',
    title: 'Colab 기본 — 셀 실행 및 numpy 확인',
    description: '구글 코랩에서 첫 번째 코드를 실행해봅니다.',
    code: `# 코드 셀 실행: Shift+Enter
print("Hello, Machine Learning!")

# 버전 확인
import numpy as np
import sklearn
import tensorflow as tf

print(f"NumPy:       {np.__version__}")
print(f"scikit-learn: {sklearn.__version__}")
print(f"TensorFlow:  {tf.__version__}")

# 간단한 연산
arr = np.array([1, 2, 3, 4, 5])
print(f"\\n배열: {arr}")
print(f"평균: {arr.mean():.2f}")
print(f"표준편차: {arr.std():.2f}")`,
  },

  'ch01-fish': {
    language: 'python',
    title: 'Ch01 — 도미/빙어 KNN 분류',
    description: '첫 번째 머신러닝: 도미와 빙어를 K-최근접 이웃으로 분류합니다.',
    code: `import numpy as np
from sklearn.neighbors import KNeighborsClassifier

# ─── 도미(bream) 데이터 ──────────────────────
bream_length = [25.4,26.3,26.5,29.0,29.0,29.7,29.7,30.0,30.0,30.7,31.0,31.0,
                31.5,32.0,32.0,32.0,33.0,33.0,33.5,33.5,34.0,34.5,35.0,35.0,
                35.0,35.0,36.0,36.0,37.0,38.5,38.5,39.5,41.0,41.0]
bream_weight = [242.0,290.0,340.0,363.0,430.0,450.0,500.0,390.0,450.0,500.0,475.0,500.0,
                500.0,340.0,600.0,600.0,700.0,700.0,610.0,650.0,575.0,685.0,620.0,520.0,
                680.0,700.0,725.0,720.0,714.0,850.0,1000.0,920.0,955.0,925.0]

# ─── 빙어(smelt) 데이터 ─────────────────────
smelt_length = [9.8,10.5,10.6,11.0,11.2,11.3,11.8,11.8,12.0,12.2,12.4,13.0,14.3,15.0]
smelt_weight = [6.7,7.5,7.0,9.7,9.8,8.7,10.0,9.9,9.8,12.2,13.4,12.2,19.7,19.9]

# ─── 데이터 합치기 ───────────────────────────
fish_length = bream_length + smelt_length
fish_weight = bream_weight + smelt_weight
fish_data = [[l, w] for l, w in zip(fish_length, fish_weight)]
fish_target = [1] * 35 + [0] * 14   # 1:도미, 0:빙어

# ─── KNN 모델 학습 ───────────────────────────
kn = KNeighborsClassifier(n_neighbors=5)
kn.fit(fish_data, fish_target)

# ─── 예측 ────────────────────────────────────
score = kn.score(fish_data, fish_target)
print(f"훈련 정확도: {score:.4f}")

# 새 생선 예측 (길이 30, 무게 600)
result = kn.predict([[30, 600]])
print(f"예측 결과: {'도미' if result[0]==1 else '빙어'}")

# 이웃 확인
distances, indexes = kn.kneighbors([[30, 600]])
print(f"이웃 인덱스: {indexes}")
print(f"이웃 거리: {distances.round(1)}")`,
  },

  // ────── Chapter 02 ──────────────────────────────
  'ch02-train-test': {
    language: 'python',
    title: 'Ch02 — 훈련·테스트 세트 분리',
    description: 'train_test_split으로 데이터를 올바르게 나누고 성능을 평가합니다.',
    code: `import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split

# 데이터 준비 (Ch01에서 이어짐)
fish_length = [25.4,26.3,26.5,29.0,29.0,29.7,29.7,30.0,30.0,30.7,31.0,31.0,
               31.5,32.0,32.0,32.0,33.0,33.0,33.5,33.5,34.0,34.5,35.0,35.0,
               35.0,35.0,36.0,36.0,37.0,38.5,38.5,39.5,41.0,41.0,
               9.8,10.5,10.6,11.0,11.2,11.3,11.8,11.8,12.0,12.2,12.4,13.0,14.3,15.0]
fish_weight = [242.0,290.0,340.0,363.0,430.0,450.0,500.0,390.0,450.0,500.0,475.0,500.0,
               500.0,340.0,600.0,600.0,700.0,700.0,610.0,650.0,575.0,685.0,620.0,520.0,
               680.0,700.0,725.0,720.0,714.0,850.0,1000.0,920.0,955.0,925.0,
               6.7,7.5,7.0,9.7,9.8,8.7,10.0,9.9,9.8,12.2,13.4,12.2,19.7,19.9]
fish_target = [1]*34 + [0]*14

fish_data = np.column_stack((fish_length, fish_weight))

# ─── 훈련/테스트 세트 분리 ───────────────────
X_train, X_test, y_train, y_test = train_test_split(
    fish_data, fish_target,
    test_size=0.25,      # 25%를 테스트 세트로
    random_state=42,     # 재현성 고정
    stratify=fish_target # 클래스 비율 유지
)

print(f"훈련 세트: {X_train.shape} | 테스트 세트: {X_test.shape}")
print(f"훈련 도미 비율: {y_train.count(1)/len(y_train):.2%}")
print(f"테스트 도미 비율: {y_test.count(1)/len(y_test):.2%}")

# ─── 모델 학습 및 평가 ──────────────────────
kn = KNeighborsClassifier(n_neighbors=5)
kn.fit(X_train, y_train)

print(f"\\n훈련 세트 정확도: {kn.score(X_train, y_train):.4f}")
print(f"테스트 세트 정확도: {kn.score(X_test, y_test):.4f}")`,
  },

  'ch02-scaler': {
    language: 'python',
    title: 'Ch02 — 데이터 전처리 (StandardScaler)',
    description: '스케일이 다른 특성을 표준화하고 KNN 성능 변화를 확인합니다.',
    code: `import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# 데이터 준비 (생략 - Ch02 훈련/테스트 세트와 동일)
np.random.seed(42)
X = np.random.randn(48, 2) * [10, 200]  # 스케일 차이 시뮬레이션
y = (X[:, 0] + X[:, 1]/20 > 0).astype(int)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# ─── 전처리 전 성능 ──────────────────────────
kn = KNeighborsClassifier()
kn.fit(X_train, y_train)
print(f"[전처리 전]")
print(f"  훈련 정확도: {kn.score(X_train, y_train):.4f}")
print(f"  테스트 정확도: {kn.score(X_test, y_test):.4f}")

# ─── StandardScaler 전처리 ───────────────────
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)  # 훈련 통계로 fit + transform
X_test_s  = scaler.transform(X_test)       # 훈련 통계만 사용해 transform

print(f"\\n[전처리 후 통계]")
print(f"  훈련 평균: {X_train_s.mean(axis=0).round(4)}")
print(f"  훈련 표준편차: {X_train_s.std(axis=0).round(4)}")

# ─── 전처리 후 성능 ──────────────────────────
kn2 = KNeighborsClassifier()
kn2.fit(X_train_s, y_train)
print(f"\\n[전처리 후]")
print(f"  훈련 정확도: {kn2.score(X_train_s, y_train):.4f}")
print(f"  테스트 정확도: {kn2.score(X_test_s, y_test):.4f}")
print("\\n⚠️  테스트 세트에는 fit() 절대 금지 (데이터 누수 방지)")`,
  },

  // ────── Chapter 03 ──────────────────────────────
  'ch03-knn-reg': {
    language: 'python',
    title: 'Ch03 — KNN 회귀 및 결정계수 R²',
    description: '농어 무게를 KNN 회귀로 예측하고 R²로 성능을 평가합니다.',
    code: `import numpy as np
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import train_test_split

# 농어 데이터 (길이 → 무게 예측)
perch_length = np.array([8.4,13.7,15.0,16.2,17.4,18.0,18.7,19.0,19.6,20.0,
                          21.0,21.0,21.0,21.3,22.0,22.0,22.0,22.0,22.0,22.5,
                          22.5,22.7,23.0,23.5,24.0,24.0,24.6,25.0,25.6,26.5,
                          27.3,27.5,27.5,27.5,28.0,28.7,30.0,32.8,34.5,35.0,
                          36.5,36.0,37.0,37.0,39.0,39.0,39.0,40.0,40.0,40.0])
perch_weight = np.array([5.9,32.0,40.0,51.5,70.0,100.0,78.0,80.0,85.0,85.0,
                          110.0,115.0,125.0,130.0,120.0,120.0,130.0,135.0,110.0,130.0,
                          150.0,145.0,150.0,170.0,225.0,145.0,188.0,180.0,197.0,218.0,
                          300.0,260.0,265.0,250.0,250.0,300.0,320.0,514.0,556.0,840.0,
                          685.0,700.0,700.0,690.0,900.0,650.0,820.0,850.0,900.0,1015.0])

# 데이터 분리
X_train, X_test, y_train, y_test = train_test_split(
    perch_length.reshape(-1, 1), perch_weight, test_size=0.2, random_state=42)

# KNN 회귀 모델
knr = KNeighborsRegressor(n_neighbors=3)
knr.fit(X_train, y_train)

print(f"훈련 R²: {knr.score(X_train, y_train):.4f}")
print(f"테스트 R²: {knr.score(X_test, y_test):.4f}")

# 다양한 K 값 비교
print("\\nK에 따른 R² 변화:")
for k in [1, 3, 5, 10]:
    m = KNeighborsRegressor(n_neighbors=k)
    m.fit(X_train, y_train)
    print(f"  k={k:2d}: 훈련={m.score(X_train, y_train):.3f}, 테스트={m.score(X_test, y_test):.3f}")

# 외삽 한계 확인
print(f"\\n길이 100cm 예측: {knr.predict([[100]])[0]:.1f}g")
print(f"길이 50cm 예측:  {knr.predict([[50]])[0]:.1f}g")
print("→ 훈련 범위 밖은 경계값 이웃 평균만 반환 (한계)")`,
  },

  'ch03-linear': {
    language: 'python',
    title: 'Ch03 — 선형 회귀 & 다항 회귀',
    description: 'LinearRegression과 PolynomialFeatures로 농어 무게를 예측합니다.',
    code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.model_selection import train_test_split

perch_length = np.array([8.4,13.7,15.0,16.2,17.4,18.0,18.7,19.0,19.6,20.0,21.0,
                          21.0,21.0,21.3,22.0,22.0,22.0,22.0,22.0,22.5,22.5,22.7,
                          23.0,23.5,24.0,24.0,24.6,25.0,25.6,26.5,27.3,27.5,27.5,
                          27.5,28.0,28.7,30.0,32.8,34.5,35.0,36.5,36.0,37.0,37.0,
                          39.0,39.0,39.0,40.0,40.0,40.0])
perch_weight = np.array([5.9,32.0,40.0,51.5,70.0,100.0,78.0,80.0,85.0,85.0,110.0,
                          115.0,125.0,130.0,120.0,120.0,130.0,135.0,110.0,130.0,150.0,
                          145.0,150.0,170.0,225.0,145.0,188.0,180.0,197.0,218.0,300.0,
                          260.0,265.0,250.0,250.0,300.0,320.0,514.0,556.0,840.0,685.0,
                          700.0,700.0,690.0,900.0,650.0,820.0,850.0,900.0,1015.0])

X = perch_length.reshape(-1, 1)
X_train, X_test, y_train, y_test = train_test_split(X, perch_weight, test_size=0.2, random_state=42)

# ─── 1. 선형 회귀 ───────────────────────────
lr = LinearRegression()
lr.fit(X_train, y_train)
print(f"[선형 회귀]")
print(f"  기울기(a): {lr.coef_[0]:.2f}")
print(f"  절편(b):   {lr.intercept_:.2f}")
print(f"  훈련 R²: {lr.score(X_train, y_train):.4f}")
print(f"  테스트 R²: {lr.score(X_test, y_test):.4f}")
print(f"  길이 100cm 예측: {lr.predict([[100]])[0]:.1f}g  (외삽 가능!)")

# ─── 2. 다항 회귀 (degree=2) ─────────────────
poly = PolynomialFeatures(degree=2, include_bias=False)
X_train_poly = poly.fit_transform(X_train)   # [길이] → [길이, 길이²]
X_test_poly  = poly.transform(X_test)

lr2 = LinearRegression()
lr2.fit(X_train_poly, y_train)
print(f"\\n[다항 회귀 degree=2]")
print(f"  계수: {lr2.coef_.round(2)}")
print(f"  훈련 R²: {lr2.score(X_train_poly, y_train):.4f}")
print(f"  테스트 R²: {lr2.score(X_test_poly, y_test):.4f}")`,
  },

  'ch03-regularization': {
    language: 'python',
    title: 'Ch03 — Ridge·Lasso 규제',
    description: '다항 특성 확장 후 Ridge/Lasso로 과대적합을 제어합니다.',
    code: `import numpy as np
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.model_selection import train_test_split
import pandas as pd

# 농어 데이터 (다중 특성 버전: 길이, 높이, 두께)
np.random.seed(42)
n = 50
length  = np.random.uniform(10, 40, n)
height  = length * 0.3 + np.random.randn(n) * 2
thick   = length * 0.1 + np.random.randn(n)
weight  = 5 * length**1.5 + 3*height + 2*thick + np.random.randn(n)*50

X = np.column_stack([length, height, thick])
X_train, X_test, y_train, y_test = train_test_split(X, weight, test_size=0.2, random_state=42)

# 다항 특성 + 표준화
poly = PolynomialFeatures(degree=2, include_bias=False)
scaler = StandardScaler()
X_train_p = scaler.fit_transform(poly.fit_transform(X_train))
X_test_p  = scaler.transform(poly.transform(X_test))
print(f"특성 수: {X.shape[1]} → {X_train_p.shape[1]} (다항 확장)")

# ─── 모델 비교 ───────────────────────────────
models = {
    "선형 회귀": LinearRegression(),
    "Ridge(α=0.1)": Ridge(alpha=0.1),
    "Ridge(α=10)": Ridge(alpha=10),
    "Lasso(α=0.1)": Lasso(alpha=0.1, max_iter=10000),
    "Lasso(α=10)": Lasso(alpha=10, max_iter=10000),
}
print(f"\n{'모델':<18} {'훈련 R²':>8} {'테스트 R²':>10}")
print("-" * 40)
for name, m in models.items():
    m.fit(X_train_p, y_train)
    tr = m.score(X_train_p, y_train)
    te = m.score(X_test_p, y_test)
    print(f"{name:<18} {tr:>8.4f} {te:>10.4f}")

# Lasso 특성 선택 효과
lasso = Lasso(alpha=0.1, max_iter=10000)
lasso.fit(X_train_p, y_train)
n_zero = np.sum(lasso.coef_ == 0)
print(f"\nLasso 0으로 설정된 계수: {n_zero}/{len(lasso.coef_)} (특성 선택 효과)")`,
  },

  // ────── Chapter 04 ──────────────────────────────
  'ch04-logistic': {
    language: 'python',
    title: 'Ch04 — 로지스틱 회귀 & 확률 예측',
    description: '여러 생선의 확률을 로지스틱 회귀로 예측합니다.',
    code: `import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# 생선 데이터 로드 (CSV 예시)
# 실제 교재 데이터: https://bit.ly/fish_csv_data
# 로컬에서: fish = pd.read_csv('fish.csv')
# 아래는 시뮬레이션 데이터

np.random.seed(42)
n = 200
species = np.random.choice(['Bream','Smelt','Pike','Roach','Perch'], n)
length  = np.random.uniform(10, 50, n)
weight  = np.random.uniform(5, 1000, n)
X = np.column_stack([length, weight])
y = species

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

# ─── 로지스틱 회귀 ──────────────────────────
lr = LogisticRegression(C=20, max_iter=1000, random_state=42)
lr.fit(X_train_s, y_train)

print(f"훈련 정확도: {lr.score(X_train_s, y_train):.4f}")
print(f"테스트 정확도: {lr.score(X_test_s, y_test):.4f}")
print(f"\\n클래스 목록: {lr.classes_}")

# 확률 예측
proba = lr.predict_proba(X_test_s[:3])
print(f"\\n상위 3개 샘플 확률:")
for i, p in enumerate(proba):
    pred = lr.classes_[np.argmax(p)]
    print(f"  샘플{i+1}: {dict(zip(lr.classes_, p.round(3)))} → {pred}")`,
  },

  'ch04-sgd': {
    language: 'python',
    title: 'Ch04 — 확률적 경사 하강법 (SGDClassifier)',
    description: 'SGD로 점진적 학습을 구현하고 에포크별 성능 변화를 관찰합니다.',
    code: `import numpy as np
from sklearn.linear_model import SGDClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# 데이터 준비
np.random.seed(42)
X = np.random.randn(200, 4)
y = (X[:, 0] + X[:, 1] > 0).astype(int)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

# ─── 에포크별 성능 추적 ──────────────────────
train_acc, test_acc = [], []
sgd = SGDClassifier(loss='log_loss', random_state=42)

print(f"{'에포크':>6} {'훈련 정확도':>12} {'테스트 정확도':>14}")
print("-" * 36)
for epoch in range(1, 21):
    sgd.partial_fit(X_train_s, y_train, classes=np.unique(y_train))
    tr = sgd.score(X_train_s, y_train)
    te = sgd.score(X_test_s, y_test)
    train_acc.append(tr); test_acc.append(te)
    if epoch <= 5 or epoch % 5 == 0:
        print(f"{epoch:>6}   {tr:>12.4f}   {te:>14.4f}")

best_epoch = np.argmax(test_acc) + 1
print(f"\\n최적 에포크: {best_epoch} (테스트 정확도: {max(test_acc):.4f})")

# ─── partial_fit으로 새 데이터 추가 학습 ─────
X_new = np.random.randn(20, 4); y_new = (X_new[:,0]+X_new[:,1]>0).astype(int)
X_new_s = scaler.transform(X_new)
sgd.partial_fit(X_new_s, y_new)
print(f"새 데이터 추가 학습 후 테스트 정확도: {sgd.score(X_test_s, y_test):.4f}")`,
  },

  // ────── Chapter 05 ──────────────────────────────
  'ch05-decision-tree': {
    language: 'python',
    title: 'Ch05 — 결정 트리 와인 분류',
    description: '결정 트리로 와인을 분류하고 특성 중요도와 트리 구조를 확인합니다.',
    code: `import numpy as np
import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# 와인 데이터 (화이트/레드 분류)
# 실제 교재 데이터: https://bit.ly/wine_csv_data
# 시뮬레이션 데이터
np.random.seed(42)
n = 300
alcohol = np.random.uniform(9, 14, n)
sugar   = np.random.uniform(0.5, 10, n)
pH      = np.random.uniform(2.8, 4.0, n)
label   = (alcohol + sugar/2 - pH*2 > 10).astype(int)  # 0:레드, 1:화이트

X = np.column_stack([alcohol, sugar, pH])
X_train, X_test, y_train, y_test = train_test_split(X, label, test_size=0.2, random_state=42)

# ─── 결정 트리 ──────────────────────────────
dt = DecisionTreeClassifier(max_depth=3, random_state=42)
dt.fit(X_train, y_train)

print(f"훈련 정확도: {dt.score(X_train, y_train):.4f}")
print(f"테스트 정확도: {dt.score(X_test, y_test):.4f}")

# 특성 중요도
feature_names = ['알코올', '당도', 'pH']
print("\\n특성 중요도:")
for name, imp in zip(feature_names, dt.feature_importances_):
    bar = "█" * int(imp * 30)
    print(f"  {name:>6}: {imp:.4f} {bar}")

# 트리 구조 텍스트 출력
print("\\n[트리 구조 (max_depth=3)]")
print(export_text(dt, feature_names=feature_names, max_depth=2))`,
  },

  'ch05-cross-val': {
    language: 'python',
    title: 'Ch05 — 교차 검증 & 그리드 서치',
    description: 'cross_validate로 교차 검증을, GridSearchCV로 최적 하이퍼파라미터를 찾습니다.',
    code: `import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_validate, GridSearchCV, StratifiedKFold
from sklearn.datasets import load_wine

# 와인 데이터셋 (sklearn 내장)
data = load_wine()
X, y = data.data, data.target
print(f"데이터: {X.shape}, 클래스: {np.unique(y)}")

# ─── 교차 검증 ──────────────────────────────
dt = DecisionTreeClassifier(random_state=42)
scores = cross_validate(dt, X, y, cv=5,
                        return_train_score=True,
                        scoring='accuracy')
print(f"\\n[5-폴드 교차 검증]")
print(f"훈련 정확도: {scores['train_score'].mean():.4f} ± {scores['train_score'].std():.4f}")
print(f"검증 정확도: {scores['test_score'].mean():.4f} ± {scores['test_score'].std():.4f}")

# ─── 그리드 서치 ────────────────────────────
params = {
    'max_depth': [None, 3, 5, 7],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}
gs = GridSearchCV(DecisionTreeClassifier(random_state=42),
                  params, cv=5, scoring='accuracy', n_jobs=-1)
gs.fit(X, y)

print(f"\\n[그리드 서치 결과]")
print(f"최적 파라미터: {gs.best_params_}")
print(f"최적 교차 검증 정확도: {gs.best_score_:.4f}")`,
  },

  'ch05-ensemble': {
    language: 'python',
    title: 'Ch05 — 랜덤 포레스트 & 그레이디언트 부스팅',
    description: '앙상블 모델들을 비교하고 특성 중요도를 확인합니다.',
    code: `import numpy as np
from sklearn.ensemble import (RandomForestClassifier, ExtraTreesClassifier,
                               GradientBoostingClassifier, HistGradientBoostingClassifier)
from sklearn.model_selection import cross_val_score
from sklearn.datasets import load_wine

data = load_wine()
X, y = data.data, data.target

models = {
    "랜덤 포레스트":      RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1),
    "엑스트라 트리":      ExtraTreesClassifier(n_estimators=100, random_state=42, n_jobs=-1),
    "그레이디언트 부스팅": GradientBoostingClassifier(n_estimators=100, random_state=42),
    "히스토그램 GB":      HistGradientBoostingClassifier(random_state=42),
}

print(f"{'모델':<22} {'교차검증 평균':>12} {'표준편차':>10}")
print("-" * 46)
for name, m in models.items():
    scores = cross_val_score(m, X, y, cv=5, scoring='accuracy')
    print(f"{name:<22} {scores.mean():>12.4f} {scores.std():>10.4f}")

# 랜덤 포레스트 특성 중요도
rf = RandomForestClassifier(n_estimators=100, random_state=42, oob_score=True)
rf.fit(X, y)
print(f"\\nOOB 점수: {rf.oob_score_:.4f}")
print("\\n특성 중요도 상위 5:")
top5 = np.argsort(rf.feature_importances_)[::-1][:5]
for i in top5:
    print(f"  {data.feature_names[i]:>30}: {rf.feature_importances_[i]:.4f}")`,
  },

  // ────── Chapter 06 ──────────────────────────────
  'ch06-clustering-intro': {
    language: 'python',
    title: 'Ch06 — 픽셀 분석으로 과일 분류',
    description: 'numpy로 이미지 데이터를 분석하고 픽셀 평균으로 유사 이미지를 찾습니다.',
    code: `import numpy as np
import matplotlib.pyplot as plt

# 과일 이미지 데이터 시뮬레이션
# 실제 데이터: https://bit.ly/fruits_300_data
np.random.seed(42)

# 사과(0): 어두운 배경에 밝은 과일
apple  = np.random.randint(60, 180, (100, 10000)) + np.random.randn(100, 10000)*20
# 파인애플(1): 중간 밝기
pine   = np.random.randint(100, 220, (100, 10000)) + np.random.randn(100, 10000)*20
# 바나나(2): 매우 밝음
banana = np.random.randint(150, 255, (100, 10000)) + np.random.randn(100, 10000)*15

fruits_2d = np.concatenate([apple, pine, banana]).clip(0, 255).astype(np.uint8)
print(f"데이터 크기: {fruits_2d.shape}")  # (300, 10000)

# ─── 픽셀 평균으로 대표 이미지 만들기 ─────────
apple_mean  = fruits_2d[:100].mean(axis=0)  # 사과 100개의 평균
pine_mean   = fruits_2d[100:200].mean(axis=0)
banana_mean = fruits_2d[200:].mean(axis=0)

print(f"\\n사과 평균 밝기:    {apple_mean.mean():.1f}")
print(f"파인애플 평균 밝기: {pine_mean.mean():.1f}")
print(f"바나나 평균 밝기:   {banana_mean.mean():.1f}")

# ─── 평균 이미지와 유사한 샘플 찾기 ──────────
def find_closest(target, pool, n=5):
    distances = np.abs(pool - target).mean(axis=1)
    return np.argsort(distances)[:n]

close_to_apple = find_closest(apple_mean, fruits_2d[:100])
print(f"\\n사과 평균과 가장 가까운 샘플: {close_to_apple}")`,
  },

  'ch06-kmeans': {
    language: 'python',
    title: 'Ch06 — K-평균 군집화',
    description: 'KMeans로 레이블 없이 과일을 자동 분류하고 엘보우로 최적 K를 찾습니다.',
    code: `import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# 데이터 준비 (픽셀 대신 요약 특성 사용)
np.random.seed(42)
n = 100

# 3종류 과일의 특성 시뮬레이션: [평균밝기, 표준편차, 대비]
apple  = np.random.randn(n, 3) * [15, 5, 10] + [80, 40, 50]
pine   = np.random.randn(n, 3) * [15, 5, 10] + [130, 50, 70]
banana = np.random.randn(n, 3) * [15, 5, 10] + [190, 35, 30]
fruits_2d = np.vstack([apple, pine, banana])
true_labels = np.array([0]*n + [1]*n + [2]*n)

# ─── K-평균 클러스터링 ───────────────────────
km = KMeans(n_clusters=3, random_state=42, n_init=10)
km.fit(fruits_2d)
print(f"클러스터 레이블 (앞 5개): {km.labels_[:5]}")
print(f"이너샤(inertia): {km.inertia_:.1f}")

# 클러스터별 샘플 수
unique, counts = np.unique(km.labels_, return_counts=True)
for c, cnt in zip(unique, counts):
    print(f"  클러스터 {c}: {cnt}개")

# ─── 엘보우 방법 (최적 K 찾기) ───────────────
print("\\n[엘보우 방법]")
print(f"{'K':>4} {'이너샤':>12} {'감소폭':>10}")
prev_inertia = None
for k in range(1, 8):
    m = KMeans(n_clusters=k, random_state=42, n_init=10)
    m.fit(fruits_2d)
    delta = f"{prev_inertia - m.inertia_:>10.1f}" if prev_inertia else "        -"
    print(f"{k:>4} {m.inertia_:>12.1f} {delta}")
    prev_inertia = m.inertia_
print("→ 감소폭이 급격히 줄어드는 K=3이 최적")`,
  },

  'ch06-pca': {
    language: 'python',
    title: 'Ch06 — 주성분 분석 (PCA) 차원 축소',
    description: 'PCA로 10000차원 이미지를 50차원으로 줄이고 KMeans 성능을 비교합니다.',
    code: `import numpy as np
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import time

np.random.seed(42)
n = 300
# 300개 샘플, 100×100=10000 픽셀 (시뮬레이션)
fruits_2d = np.random.randint(50, 230, (n, 10000)).astype(np.float64)
# 과일별 평균 밝기에 차이 추가
fruits_2d[:100]  += np.random.randn(100, 10000) * 20 - 50  # 어두운 사과
fruits_2d[200:]  += np.random.randn(100, 10000) * 20 + 50  # 밝은 바나나
fruits_2d = np.clip(fruits_2d, 0, 255)

# ─── 원본 차원으로 KMeans ────────────────────
t0 = time.time()
km_orig = KMeans(n_clusters=3, random_state=42, n_init=10).fit(fruits_2d)
t1 = time.time()
print(f"원본 (10000D): {t1-t0:.3f}초, inertia={km_orig.inertia_:.0f}")

# ─── PCA로 차원 축소 후 KMeans ───────────────
pca = PCA(n_components=50)
fruits_pca = pca.fit_transform(fruits_2d)
print(f"\\nPCA 50개 주성분으로 설명하는 분산: {pca.explained_variance_ratio_.sum():.2%}")

t2 = time.time()
km_pca = KMeans(n_clusters=3, random_state=42, n_init=10).fit(fruits_pca)
t3 = time.time()
print(f"PCA 후 (50D):  {t3-t2:.3f}초, inertia={km_pca.inertia_:.0f}")
print(f"속도 향상: {(t1-t0)/(t3-t2):.1f}배")

# 원본 복원 (inverse_transform)
fruits_back = pca.inverse_transform(fruits_pca)
mse = ((fruits_2d - fruits_back) ** 2).mean()
print(f"\\n복원 MSE: {mse:.2f} (정보 손실 수준)")

# 2D 주성분으로 시각화 (실제 코랩에서는 plt.scatter로 확인)
pca2 = PCA(n_components=2)
fruits_2d_vis = pca2.fit_transform(fruits_2d)
print(f"2D 주성분 설명 분산: {pca2.explained_variance_ratio_.sum():.2%}")`,
  },

  // ────── Chapter 07 ──────────────────────────────
  'ch07-ann': {
    language: 'python',
    title: 'Ch07 — 케라스 인공 신경망 (Fashion MNIST)',
    description: '케라스 Sequential API로 첫 번째 신경망을 만들고 패션 아이템을 분류합니다.',
    code: `import numpy as np
import tensorflow as tf
from tensorflow import keras

# ─── 데이터 준비 ─────────────────────────────
(X_train, y_train), (X_test, y_test) = keras.datasets.fashion_mnist.load_data()
print(f"훈련: {X_train.shape}, 테스트: {X_test.shape}")

# 0~255 → 0~1 정규화
X_train = X_train / 255.0
X_test  = X_test  / 255.0

class_names = ['티셔츠','바지','풀오버','드레스','코트',
               '샌들','셔츠','스니커즈','가방','앵클부츠']

# 검증 세트 분리
X_val = X_train[:6000]; y_val = y_train[:6000]
X_tr  = X_train[6000:]; y_tr  = y_train[6000:]

# ─── 모델 구성 ──────────────────────────────
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),     # 784개로 펼치기
    keras.layers.Dense(100, activation='sigmoid'),   # 은닉층
    keras.layers.Dense(10, activation='softmax')     # 출력층 (10 클래스)
])
model.summary()

# ─── 컴파일 & 훈련 ──────────────────────────
model.compile(optimizer='sgd',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

history = model.fit(X_tr, y_tr, epochs=5,
                    validation_data=(X_val, y_val))

# ─── 평가 ────────────────────────────────────
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"\\n테스트 정확도: {test_acc:.4f}")

# 예측
preds = model.predict(X_test[:3]).argmax(axis=1)
print("예측:", [class_names[p] for p in preds])
print("정답:", [class_names[y] for y in y_test[:3]])`,
  },

  'ch07-dnn': {
    language: 'python',
    title: 'Ch07 — 심층 신경망 & ReLU + Adam',
    description: 'ReLU 활성화 함수와 Adam 옵티마이저로 더 깊은 신경망을 훈련합니다.',
    code: `import tensorflow as tf
from tensorflow import keras

(X_train, y_train), (X_test, y_test) = keras.datasets.fashion_mnist.load_data()
X_train, X_test = X_train/255.0, X_test/255.0
X_val, y_val = X_train[:6000], y_train[:6000]
X_tr, y_tr   = X_train[6000:], y_train[6000:]

# ─── 심층 신경망 (ReLU + Adam) ──────────────
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(300, activation='relu'),   # 은닉층 1
    keras.layers.Dense(100, activation='relu'),   # 은닉층 2
    keras.layers.Dense(10, activation='softmax')  # 출력층
])
model.summary()

# ─── 컴파일 ─────────────────────────────────
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# ─── 훈련 ────────────────────────────────────
history = model.fit(X_tr, y_tr, epochs=20,
                    validation_data=(X_val, y_val),
                    verbose=1)

test_loss, test_acc = model.evaluate(X_test, y_test, verbose=0)
print(f"\\n최종 테스트 정확도: {test_acc:.4f}")

# 훈련/검증 손실 최솟값
import numpy as np
best_val = min(history.history['val_loss'])
best_ep  = np.argmin(history.history['val_loss']) + 1
print(f"최적 에포크: {best_ep} (val_loss: {best_val:.4f})")`,
  },

  'ch07-training': {
    language: 'python',
    title: 'Ch07 — 드롭아웃 & EarlyStopping 콜백',
    description: 'Dropout으로 과대적합을 방지하고 EarlyStopping으로 최적 모델을 자동 저장합니다.',
    code: `import tensorflow as tf
from tensorflow import keras
import numpy as np

(X_train, y_train), (X_test, y_test) = keras.datasets.fashion_mnist.load_data()
X_train, X_test = X_train/255.0, X_test/255.0
X_val, y_val = X_train[:6000], y_train[:6000]
X_tr, y_tr   = X_train[6000:], y_train[6000:]

# ─── 드롭아웃 포함 모델 ─────────────────────
model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28, 28)),
    keras.layers.Dense(300, activation='relu'),
    keras.layers.Dropout(0.3),           # 30% 드롭아웃
    keras.layers.Dense(100, activation='relu'),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(10, activation='softmax')
])
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# ─── 콜백 설정 ──────────────────────────────
callbacks = [
    keras.callbacks.ModelCheckpoint(
        'best_model.keras',
        save_best_only=True,  # 최고 성능일 때만 저장
        monitor='val_loss'
    ),
    keras.callbacks.EarlyStopping(
        patience=5,                   # 5 에포크 개선 없으면 중단
        restore_best_weights=True,    # 최적 가중치 복원
        monitor='val_loss'
    )
]

# ─── 훈련 ────────────────────────────────────
history = model.fit(X_tr, y_tr,
                    epochs=100,  # 최대 100 에포크 (조기 종료됨)
                    validation_data=(X_val, y_val),
                    callbacks=callbacks,
                    verbose=1)

actual_epochs = len(history.history['val_loss'])
print(f"\\n실제 훈련 에포크 수: {actual_epochs}")
print(f"테스트 정확도: {model.evaluate(X_test, y_test, verbose=0)[1]:.4f}")`,
  },

  // ────── Chapter 08 ──────────────────────────────
  'ch08-conv': {
    language: 'python',
    title: 'Ch08 — 합성곱 층과 풀링 층 이해',
    description: '간단한 Conv2D와 MaxPooling2D의 출력 크기 변화를 확인합니다.',
    code: `import numpy as np
import tensorflow as tf
from tensorflow import keras

# ─── 합성곱 출력 크기 계산 ───────────────────
# 입력: (28, 28, 1), 필터: 3×3, stride=1
# padding='same'  → 출력: (28, 28, 32)
# padding='valid' → 출력: ((28-3)/1+1, ...) = (26, 26, 32)

test_input = np.random.randn(1, 28, 28, 1).astype(np.float32)

# padding='same' 테스트
conv_same = keras.layers.Conv2D(32, 3, padding='same', activation='relu')
out_same = conv_same(test_input)
print(f"[padding='same']  입력: {test_input.shape} → 출력: {out_same.shape}")

conv_valid = keras.layers.Conv2D(32, 3, padding='valid', activation='relu')
out_valid = conv_valid(test_input)
print(f"[padding='valid'] 입력: {test_input.shape} → 출력: {out_valid.shape}")

pool = keras.layers.MaxPooling2D(2)
after_pool = pool(out_same)
print(f"MaxPooling2D(2): {out_same.shape} → {after_pool.shape}")

# ─── 간단한 CNN 구성 및 파라미터 수 확인 ─────
model = keras.Sequential([
    keras.layers.Conv2D(32, 3, padding='same', activation='relu', input_shape=(28,28,1)),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(64, 3, padding='same', activation='relu'),
    keras.layers.MaxPooling2D(2),
    keras.layers.Flatten(),
    keras.layers.Dense(100, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])
model.summary()

# Dense 모델 파라미터 수 비교
dense_model = keras.Sequential([
    keras.layers.Flatten(input_shape=(28,28,1)),
    keras.layers.Dense(100, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])
print(f"\\nDense 모델 파라미터: {dense_model.count_params():,}")
print(f"CNN 모델 파라미터:   {model.count_params():,}")`,
  },

  'ch08-cnn': {
    language: 'python',
    title: 'Ch08 — CNN 패션 MNIST 분류',
    description: '합성곱 신경망으로 패션 MNIST를 분류하고 Dense 모델과 성능을 비교합니다.',
    code: `import tensorflow as tf
from tensorflow import keras
import numpy as np

(X_train, y_train), (X_test, y_test) = keras.datasets.fashion_mnist.load_data()
X_train = X_train.reshape(-1, 28, 28, 1) / 255.0  # 채널 차원 추가
X_test  = X_test.reshape(-1, 28, 28, 1) / 255.0
X_val, y_val = X_train[:6000], y_train[:6000]
X_tr, y_tr   = X_train[6000:], y_train[6000:]

# ─── CNN 모델 ────────────────────────────────
model = keras.Sequential([
    keras.layers.Conv2D(32, (3,3), activation='relu', padding='same', input_shape=(28,28,1)),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(64, (3,3), activation='relu', padding='same'),
    keras.layers.MaxPooling2D(2),
    keras.layers.Flatten(),
    keras.layers.Dense(100, activation='relu'),
    keras.layers.Dropout(0.4),
    keras.layers.Dense(10, activation='softmax')
])
model.summary()
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

callbacks = [
    keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True)
]
history = model.fit(X_tr, y_tr, epochs=30,
                    validation_data=(X_val, y_val),
                    callbacks=callbacks, verbose=1)

test_acc = model.evaluate(X_test, y_test, verbose=0)[1]
print(f"\\nCNN 테스트 정확도: {test_acc:.4f}")
print(f"실제 훈련 에포크: {len(history.history['val_loss'])}")`,
  },

  'ch08-visualize': {
    language: 'python',
    title: 'Ch08 — CNN 가중치·특성 맵 시각화',
    description: '함수형 API로 중간층 출력을 추출하고 학습된 필터를 시각화합니다.',
    code: `import numpy as np
import tensorflow as tf
from tensorflow import keras
import matplotlib.pyplot as plt

# 사전 훈련된 모델 로드 (이전 셀에서 훈련된 model 사용)
(X_train, y_train), (X_test, y_test) = keras.datasets.fashion_mnist.load_data()
X_test = X_test.reshape(-1, 28, 28, 1) / 255.0

# ─── 간단한 모델 재생성 ──────────────────────
model = keras.Sequential([
    keras.layers.Conv2D(32, 3, padding='same', activation='relu', input_shape=(28,28,1)),
    keras.layers.MaxPooling2D(2),
    keras.layers.Conv2D(64, 3, padding='same', activation='relu'),
    keras.layers.MaxPooling2D(2),
    keras.layers.Flatten(),
    keras.layers.Dense(10, activation='softmax')
])
model.compile('adam', 'sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_test, y_test, epochs=1, verbose=0)  # 빠른 데모용

# ─── 1번째 Conv 층 가중치 시각화 ─────────────
conv_weights = model.layers[0].weights[0].numpy()  # (3,3,1,32)
print(f"필터 shape: {conv_weights.shape}")  # (3, 3, 1, 32)
print(f"필터값 범위: [{conv_weights.min():.3f}, {conv_weights.max():.3f}]")

# ─── 함수형 API로 특성 맵 추출 ───────────────
feature_extractor = keras.Model(
    inputs=model.inputs,
    outputs=model.layers[1].output   # 1번째 MaxPooling 출력
)
sample = X_test[:1]  # 이미지 1장
feature_maps = feature_extractor.predict(sample)
print(f"특성 맵 shape: {feature_maps.shape}")  # (1, 14, 14, 32)

# 실제 코랩에서 시각화:
# fig, axes = plt.subplots(4, 8, figsize=(15,8))
# for i, ax in enumerate(axes.flat):
#     ax.imshow(feature_maps[0,:,:,i], cmap='viridis')
#     ax.axis('off')
# plt.tight_layout()
# plt.show()
print("\\n코랩에서 plt.imshow(feature_maps[0,:,:,0])으로 시각화 가능")`,
  },

  // ────── Chapter 09 ──────────────────────────────
  'ch09-rnn': {
    language: 'python',
    title: 'Ch09 — SimpleRNN 구조 이해',
    description: 'SimpleRNN의 순환 구조와 return_sequences 옵션을 확인합니다.',
    code: `import numpy as np
import tensorflow as tf
from tensorflow import keras

# ─── RNN 입출력 형태 이해 ────────────────────
# RNN 입력: (batch_size, timesteps, features)
batch = 4; timesteps = 10; features = 3
X_sample = np.random.randn(batch, timesteps, features).astype(np.float32)

# return_sequences=False (기본): 마지막 시점만 출력
rnn1 = keras.layers.SimpleRNN(8)
out1 = rnn1(X_sample)
print(f"return_sequences=False: 입력{X_sample.shape} → 출력{out1.shape}")

# return_sequences=True: 모든 시점 출력
rnn2 = keras.layers.SimpleRNN(8, return_sequences=True)
out2 = rnn2(X_sample)
print(f"return_sequences=True:  입력{X_sample.shape} → 출력{out2.shape}")

# ─── 이중 RNN 레이어 ────────────────────────
model = keras.Sequential([
    keras.layers.SimpleRNN(32, return_sequences=True,
                           input_shape=(timesteps, features)),
    keras.layers.SimpleRNN(8),
    keras.layers.Dense(1, activation='sigmoid')
])
model.summary()

# ─── 간단한 시퀀스 분류 훈련 ─────────────────
# (0으로 가득한 시퀀스 → 0, 1로 가득한 시퀀스 → 1)
X = np.random.randint(0, 2, (200, 10, 1)).astype(np.float32)
y = (X.mean(axis=1) > 0.5).astype(np.float32)

model.compile('adam', 'binary_crossentropy', metrics=['accuracy'])
model.fit(X[:160], y[:160], epochs=10, validation_data=(X[160:], y[160:]), verbose=0)
print(f"\\n최종 검증 정확도: {model.evaluate(X[160:], y[160:], verbose=0)[1]:.4f}")`,
  },

  'ch09-imdb': {
    language: 'python',
    title: 'Ch09 — IMDB 리뷰 감성 분류',
    description: 'Embedding + SimpleRNN으로 영화 리뷰를 긍정/부정 분류합니다.',
    code: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing import sequence

# ─── IMDB 데이터 로드 ───────────────────────
(X_train, y_train), (X_test, y_test) = keras.datasets.imdb.load_data(num_words=500)
print(f"훈련: {len(X_train)}, 테스트: {len(X_test)}")
print(f"최대 리뷰 길이: {max(len(r) for r in X_train)}")
print(f"평균 리뷰 길이: {np.mean([len(r) for r in X_train]):.0f}")

# 길이 통일 (패딩/자르기)
maxlen = 100
X_train_pad = sequence.pad_sequences(X_train, maxlen=maxlen)
X_test_pad  = sequence.pad_sequences(X_test, maxlen=maxlen)
print(f"\\n패딩 후: {X_train_pad.shape}")

# ─── 모델 구성 ──────────────────────────────
model = keras.Sequential([
    keras.layers.Embedding(500, 16, input_length=maxlen),  # 500단어 → 16차원
    keras.layers.SimpleRNN(8),
    keras.layers.Dense(1, activation='sigmoid')
])
model.summary()
model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

# ─── 훈련 ────────────────────────────────────
val_size = 5000
X_val = X_train_pad[:val_size]; y_val = y_train[:val_size]
X_tr  = X_train_pad[val_size:]; y_tr  = y_train[val_size:]

callbacks = [keras.callbacks.EarlyStopping(patience=3, restore_best_weights=True)]
history = model.fit(X_tr, y_tr, epochs=20,
                    validation_data=(X_val, y_val),
                    callbacks=callbacks, verbose=1)
print(f"\\n테스트 정확도: {model.evaluate(X_test_pad, y_test, verbose=0)[1]:.4f}")`,
  },

  'ch09-lstm': {
    language: 'python',
    title: 'Ch09 — LSTM · GRU 모델 비교',
    description: 'IMDB 감성 분류에서 SimpleRNN vs LSTM vs GRU 성능을 비교합니다.',
    code: `import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing import sequence

(X_train, y_train), (X_test, y_test) = keras.datasets.imdb.load_data(num_words=500)
maxlen = 100
X_train = sequence.pad_sequences(X_train, maxlen=maxlen)
X_test  = sequence.pad_sequences(X_test, maxlen=maxlen)
X_val, y_val = X_train[:5000], y_train[:5000]
X_tr, y_tr   = X_train[5000:], y_train[5000:]

def build_model(cell_type='lstm'):
    cell = {
        'simple': keras.layers.SimpleRNN,
        'lstm':   keras.layers.LSTM,
        'gru':    keras.layers.GRU,
    }[cell_type]
    return keras.Sequential([
        keras.layers.Embedding(500, 16, input_length=maxlen),
        cell(32, dropout=0.3),
        keras.layers.Dense(1, activation='sigmoid')
    ])

results = {}
for cell in ['simple', 'lstm', 'gru']:
    model = build_model(cell)
    model.compile('adam', 'binary_crossentropy', metrics=['accuracy'])
    cb = [keras.callbacks.EarlyStopping(patience=3, restore_best_weights=True)]
    h = model.fit(X_tr, y_tr, epochs=20,
                  validation_data=(X_val, y_val),
                  callbacks=cb, verbose=0)
    test_acc = model.evaluate(X_test, y_test, verbose=0)[1]
    results[cell] = {'test_acc': test_acc, 'epochs': len(h.history['loss'])}
    print(f"{cell.upper():>8}: 테스트={test_acc:.4f}, 에포크={results[cell]['epochs']}")

best = max(results, key=lambda k: results[k]['test_acc'])
print(f"\\n최고 성능 모델: {best.upper()}")`,
  },

  // ────── Chapter 10 ──────────────────────────────
  'attention-js': {
    language: 'javascript',
    title: 'Ch10 — Self-Attention 수식 구현 (JS)',
    description: 'Attention(Q,K,V) = softmax(QK^T/√dk)·V를 JavaScript로 직접 구현합니다.',
    code: `// Self-Attention 수식 구현
// Attention(Q,K,V) = softmax(QK^T / √d_k) · V

function matMul(A, B) {
  const rows = A.length, cols = B[0].length;
  return Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) =>
      A[i].reduce((sum, _, k) => sum + A[i][k] * B[k][j], 0)
    )
  );
}

function softmax(matrix) {
  return matrix.map(row => {
    const maxVal = Math.max(...row);
    const exp = row.map(v => Math.exp(v - maxVal));
    const sum = exp.reduce((a, b) => a + b, 0);
    return exp.map(v => v / sum);
  });
}

function transpose(M) {
  return M[0].map((_, j) => M.map(row => row[j]));
}

// 입력: 3개 토큰, 각 4차원 임베딩
const seq_len = 3, d_k = 4;

const W_Q = [[0.1,-0.2,0.3,0.1],[-0.1,0.4,0.2,-0.3],[0.2,0.1,-0.1,0.2],[0.3,-0.3,0.1,0.4]];
const W_K = [[0.2,0.1,-0.2,0.3],[-0.3,0.2,0.4,0.1],[0.1,-0.1,0.3,-0.2],[0.4,0.3,-0.1,0.2]];
const W_V = [[0.3,-0.1,0.2,0.1],[0.1,0.3,-0.3,0.4],[-0.2,0.2,0.1,-0.1],[0.2,-0.2,0.4,0.3]];

const X = [
  [1.0, 0.5, -0.3, 0.8],  // "파이썬은"
  [0.2, 1.0,  0.7,-0.4],  // "재미있는"
  [0.8, 0.3,  1.0, 0.2],  // "언어다"
];

const Q = matMul(X, W_Q);
const K = matMul(X, W_K);
const V = matMul(X, W_V);

// QK^T / √d_k
const scale = Math.sqrt(d_k);
const scores = matMul(Q, transpose(K)).map(row => row.map(v => v / scale));

// softmax → 어텐션 가중치
const attnWeights = softmax(scores);

// 최종 출력: attn × V
const output = matMul(attnWeights, V);

console.log("=== Self-Attention 결과 ===\\n");
const labels = ["파이썬은", "재미있는", "언어다"];
console.log("어텐션 가중치 (행=Query, 열=Key):");
attnWeights.forEach((row, i) => {
  console.log(\`  \${labels[i]}: [\${row.map(v=>v.toFixed(3)).join(", ")}]\`);
});
console.log("\\n각 행의 합 (= 1 확인):");
attnWeights.forEach((row, i) => {
  console.log(\`  \${labels[i]}: \${row.reduce((a,b)=>a+b,0).toFixed(6)}\`);
});`,
  },

  'ch10-bart': {
    language: 'python',
    title: 'Ch10 — Hugging Face BART 텍스트 요약',
    description: 'transformers 라이브러리로 KoBART 모델을 로드해 한국어 텍스트를 요약합니다.',
    code: `# pip install transformers torch
from transformers import BartForConditionalGeneration, PreTrainedTokenizerFast

# ─── KoBART 모델 로드 ────────────────────────
# 구글 코랩에서 실행하세요
tokenizer = PreTrainedTokenizerFast.from_pretrained('gogamza/kobart-base-v2')
model = BartForConditionalGeneration.from_pretrained('gogamza/kobart-base-v2')

# ─── 요약할 텍스트 ──────────────────────────
text = """
인공지능은 인간의 지능을 모방하는 컴퓨터 시스템입니다.
머신러닝은 인공지능의 한 분야로, 데이터에서 패턴을 학습합니다.
딥러닝은 머신러닝의 하위 분야로, 다층 신경망을 사용합니다.
최근에는 GPT, Claude와 같은 대규모 언어 모델이 등장해
텍스트 생성, 번역, 요약 등 다양한 자연어 처리 작업을 수행합니다.
"""

# ─── 토큰화 및 요약 생성 ────────────────────
inputs = tokenizer.encode(text, return_tensors='pt',
                           max_length=512, truncation=True)
print(f"입력 토큰 수: {inputs.shape[1]}")

summary_ids = model.generate(
    inputs,
    max_length=100,
    min_length=30,
    length_penalty=2.0,
    num_beams=4,
    early_stopping=True
)

summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
print(f"\\n원문 길이: {len(text)}자")
print(f"요약 결과: {summary}")`,
  },

  'ch10-llm': {
    language: 'python',
    title: 'Ch10 — OpenAI API & 토큰 디코딩 전략',
    description: 'OpenAI API로 GPT를 호출하고 temperature·top_p로 다양성을 조절합니다.',
    code: `# pip install openai
from openai import OpenAI

client = OpenAI(api_key="YOUR_API_KEY")

# ─── 기본 텍스트 생성 ────────────────────────
def generate(prompt, model="gpt-4o-mini", **kwargs):
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        **kwargs
    )
    return response.choices[0].message.content

# ─── 디코딩 전략 비교 ────────────────────────
prompt = "파이썬의 특징을 한 문장으로 설명해줘"

# 결정적(Greedy-like): temperature=0
print("[temperature=0 (결정적)]")
for _ in range(2):
    print(" ", generate(prompt, temperature=0, max_tokens=50))

# 창의적: temperature=1.2
print("\\n[temperature=1.2 (창의적)]")
for _ in range(2):
    print(" ", generate(prompt, temperature=1.2, max_tokens=50))

# Top-p 샘플링
print("\\n[top_p=0.5 (Nucleus Sampling)]")
print(" ", generate(prompt, temperature=1.0, top_p=0.5, max_tokens=50))

# ─── 스트리밍 응답 ──────────────────────────
print("\\n[스트리밍 응답]")
stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role":"user","content":"머신러닝이란?"}],
    stream=True,
    max_tokens=100
)
for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
print()`,
  },

  // ────── 기존 유지 ───────────────────────────────
  'perceptron': {
    language: 'javascript',
    title: '퍼셉트론 — 가장 기본적인 신경 세포',
    description: '가중합 + 활성화 함수로 이루어진 단일 뉴런을 구현합니다. AND 게이트를 학습시켜 봅니다.',
    code: `function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }

function neuron(inputs, weights, bias) {
  const weightedSum = inputs.reduce((sum, x, i) => sum + x * weights[i], 0) + bias;
  return sigmoid(weightedSum);
}

const weights = [0.6, 0.6], bias = -0.9;
const testCases = [
  { input: [0,0], expected: 0 }, { input: [1,0], expected: 0 },
  { input: [0,1], expected: 0 }, { input: [1,1], expected: 1 },
];

console.log("=== AND 게이트 퍼셉트론 ===");
console.log("입력1  입력2  출력값  예측");
testCases.forEach(({ input, expected }) => {
  const output = neuron(input, weights, bias);
  const predicted = output > 0.5 ? 1 : 0;
  const ok = predicted === expected ? "✅" : "❌";
  console.log(\`  \${input[0]}      \${input[1]}    \${output.toFixed(3)}   \${predicted} \${ok}\`);
});`,
  },

  'gradient-descent': {
    language: 'javascript',
    title: '경사하강법 — AI 학습의 핵심 알고리즘',
    description: 'y = 3x + 2 규칙을 경사하강법으로 데이터에서 학습합니다.',
    code: `const data = [[1,5],[2,8],[3,11],[4,14],[5,17]];
let w = 0.0, b = 0.0;
const lr = 0.01, epochs = 200;

function predict(x) { return w * x + b; }
function loss() {
  return data.reduce((s,[x,y]) => s + (y-predict(x))**2, 0) / data.length;
}

console.log("에포크  |  손실(MSE)  |  w값   |  b값");
for (let e = 0; e < epochs; e++) {
  let dw=0, db=0;
  data.forEach(([x,y]) => {
    const err = predict(x) - y;
    dw += 2*err*x/data.length; db += 2*err/data.length;
  });
  w -= lr*dw; b -= lr*db;
  if (e%50===0||e===epochs-1)
    console.log(\`  \${String(e).padStart(4)}  |  \${loss().toFixed(4)}    |  \${w.toFixed(3)}  |  \${b.toFixed(3)}\`);
}
console.log(\`\\n✅ y = \${w.toFixed(2)}x + \${b.toFixed(2)}  (정답: y = 3.00x + 2.00)\`);`,
  },

  'knn-classifier': {
    language: 'javascript',
    title: 'K-최근접 이웃 (KNN) — 분류 구현',
    description: '꽃잎 크기로 붓꽃 종류를 분류합니다.',
    code: `const trainData = [
  [1.4,0.2,'setosa'],[1.5,0.2,'setosa'],[1.3,0.3,'setosa'],[1.6,0.2,'setosa'],
  [4.7,1.4,'versicolor'],[4.5,1.5,'versicolor'],[4.9,1.5,'versicolor'],
  [6.0,2.5,'virginica'],[5.9,2.1,'virginica'],[5.6,1.8,'virginica'],
];

function dist(a, b) { return Math.sqrt((a[0]-b[0])**2+(a[1]-b[1])**2); }

function knn(query, k=3) {
  const dists = trainData.map(([x1,x2,label]) => ({ dist: dist([x1,x2], query), label }));
  const nbrs = dists.sort((a,b)=>a.dist-b.dist).slice(0,k);
  const votes = {};
  nbrs.forEach(n => votes[n.label] = (votes[n.label]||0)+1);
  return Object.entries(votes).sort((a,b)=>b[1]-a[1])[0][0];
}

const tests = [[1.5,0.3,'setosa'],[4.8,1.4,'versicolor'],[5.8,2.3,'virginica']];
console.log("입력       예측           정답");
tests.forEach(([x1,x2,expected]) => {
  const pred = knn([x1,x2]);
  const ok = pred === expected ? "✅" : "❌";
  console.log(\`[\${x1},\${x2}]  \${pred.padEnd(14)} \${expected} \${ok}\`);
});`,
  },

  'prompt-builder': {
    language: 'javascript',
    title: '프롬프트 빌더 — 4요소 자동 조립',
    description: '역할·맥락·지시·형식을 조합해 최적화된 프롬프트를 생성합니다.',
    code: `function buildPrompt({ role, context, instruction, format }) {
  const parts = [];
  if (role)        parts.push(\`역할: \${role}\`);
  if (context)     parts.push(\`배경: \${context}\`);
  if (instruction) parts.push(\`요청: \${instruction}\`);
  if (format)      parts.push(\`형식: \${format}\`);
  return parts.join('\\n');
}

const examples = [
  { role: "SNS 마케팅 전문가 (10년 경력)", context: "제품: 친환경 텀블러 / 타겟: 20~30대 직장인",
    instruction: "인스타그램 홍보 문구 3가지 작성", format: "각 2~3문장, 이모지 포함, 해시태그 3개씩" },
  { role: "시니어 Python 개발자", context: "팀 프로젝트, Python 3.11",
    instruction: "코드를 리뷰하고 개선안을 제시해주세요", format: "1.문제점 2.개선 코드 3.이유 순으로" },
];

function scorePrompt(p) {
  return [/역할:/.test(p), /배경:/.test(p), /요청:/.test(p), /형식:/.test(p)].filter(Boolean).length * 25;
}

examples.forEach((ex, i) => {
  const p = buildPrompt(ex);
  console.log(\`=== 프롬프트 \${i+1} (점수: \${scorePrompt(p)}점) ===\`);
  console.log(p);
  console.log();
});`,
  },

  'bias-detection': {
    language: 'javascript',
    title: 'AI 편향 탐지기',
    description: '텍스트에서 성별/연령 편향적 표현을 탐지합니다.',
    code: `const biasPatterns = {
  gender:     { patterns: ["남자답게","여자답게","남자니까","여자니까"], label:"성별 편향", severity:"high" },
  age:        { patterns: ["요즘 애들","젊은 게","늙은이","꼰대"], label:"연령 편향", severity:"medium" },
  stereotype: { patterns: ["당연히","원래 그런","다 그렇잖아"], label:"고정관념", severity:"low" },
};

function detectBias(text) {
  const findings = [];
  for (const [type, config] of Object.entries(biasPatterns)) {
    for (const pattern of config.patterns) {
      if (text.includes(pattern))
        findings.push({ label: config.label, severity: config.severity, pattern });
    }
  }
  return {
    riskLevel: findings.some(f=>f.severity==='high') ? '⚠️ 높음' : findings.length > 0 ? '⚡ 주의' : '✅ 낮음',
    findings,
  };
}

const texts = [
  "남자답게 씩씩하게 일해주세요.",
  "우리 팀은 서로 존중하며 협력합니다.",
  "요즘 애들은 당연히 스마트폰만 한다고 생각하죠.",
];

texts.forEach((text, i) => {
  const r = detectBias(text);
  console.log(\`[텍스트 \${i+1}] "\${text}"\`);
  console.log(\`  위험도: \${r.riskLevel}\`);
  r.findings.forEach(f => console.log(\`  → [\${f.label}] "\${f.pattern}"\`));
  console.log();
});`,
  },
};

export const playgroundCategories = [
  { id: 'ch01-02', label: '🐟 Ch01-02 첫 ML & 데이터', color: 'blue',
    examples: ['ch01-fish', 'ch02-train-test', 'ch02-scaler'] },
  { id: 'ch03-04', label: '📈 Ch03-04 회귀 & 분류', color: 'green',
    examples: ['ch03-knn-reg', 'ch03-linear', 'ch03-regularization', 'ch04-logistic', 'ch04-sgd'] },
  { id: 'ch05-06', label: '🌲 Ch05-06 트리 & 비지도', color: 'orange',
    examples: ['ch05-decision-tree', 'ch05-cross-val', 'ch05-ensemble', 'ch06-kmeans', 'ch06-pca'] },
  { id: 'ch07-08', label: '🧠 Ch07-08 딥러닝 & CNN', color: 'indigo',
    examples: ['ch07-ann', 'ch07-dnn', 'ch07-training', 'ch08-conv', 'ch08-cnn'] },
  { id: 'ch09-10', label: '📝 Ch09-10 RNN & LLM', color: 'purple',
    examples: ['ch09-rnn', 'ch09-imdb', 'ch09-lstm', 'attention-js', 'ch10-bart', 'ch10-llm'] },
  { id: 'algorithms', label: '⚡ JS 직접 구현', color: 'red',
    examples: ['perceptron', 'gradient-descent', 'knn-classifier', 'prompt-builder', 'bias-detection'] },
];
