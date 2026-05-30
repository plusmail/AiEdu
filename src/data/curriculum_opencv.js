// 영상처리 OpenCV-Python 교재 목차 기반 커리큘럼
export const opencvModules = [

  // ════════════════════════
  // PART 01 – 영상처리 개요 및 파이썬, OpenCV 소개
  // ════════════════════════

  {
    id: 'cv1', partId: 1,
    title: "Ch 01 — 영상처리 개요",
    description: "영상처리가 무엇인지, 어떤 수준과 분야가 있는지, 디지털 영상이 어떻게 표현되는지 배웁니다.",
    icon: "🖼️", color: "blue", estimatedTime: "50분",
    lessons: [
      {
        id: "cv1-1", title: "1.1~1.4 영상처리란? 수준·역사·관련 분야",
        duration: "15분",
        content: `
<h2>영상처리(Image Processing)란?</h2>
<p>디지털 영상을 <strong>입력</strong>으로 받아 다른 영상이나 정보를 <strong>출력</strong>하는 기술입니다.</p>

<div class="highlight-box">
<strong>영상처리의 3가지 수준:</strong><br>
🔹 <strong>저수준(Low):</strong> 화소 연산 — 밝기 변환, 필터링, 엣지 검출<br>
🔹 <strong>중수준(Mid):</strong> 영역 분할 — 객체 검출, 모폴로지<br>
🔹 <strong>고수준(High):</strong> 이해·인식 — 얼굴 인식, 번호판 인식
</div>

<h3>영상처리의 역사</h3>
<div class="example-box">
1960년대: NASA 우주탐사 위성 사진 복원<br>
1970년대: 의료 영상(CT, MRI) 처리<br>
1980년대: 산업용 기계 비전<br>
1990년대~: 멀티미디어·인터넷 확산<br>
2010년대~: 딥러닝 기반 영상처리 혁명
</div>

<h3>관련 분야</h3>
<div class="example-box">
컴퓨터 비전(Computer Vision) — 기계가 영상을 이해<br>
패턴 인식(Pattern Recognition) — 규칙에서 패턴 검출<br>
컴퓨터 그래픽스(Computer Graphics) — 영상을 생성
</div>`,
        keyPoints: ["영상처리 = 입력 영상 → 처리 → 출력 영상/정보", "저·중·고 3수준으로 분류", "컴퓨터 비전·패턴 인식과 밀접"],
        diagramType: "image-represent",
      },
      {
        id: "cv1-2", title: "1.5~1.7 영상 형성·표현·응용 분야",
        duration: "15분",
        content: `
<h2>디지털 영상의 표현</h2>
<p>디지털 영상은 <strong>픽셀(pixel = picture element)</strong>의 2D 배열입니다. 각 픽셀은 0~255 범위의 정수값을 가집니다.</p>

<div class="highlight-box">
<strong>영상 크기 계산:</strong><br>
가로 W × 세로 H × 채널 C = 전체 데이터 크기<br>
예: 640×480 컬러 영상 = 640 × 480 × 3 = 921,600 바이트 ≈ 900KB
</div>

<h3>픽셀 깊이(Bit Depth)</h3>
<div class="example-box">
1비트 영상: 흑백 2가지 (0 또는 1)<br>
8비트 영상: 256 단계 (0~255) → 그레이스케일<br>
24비트 영상: RGB 각 8비트 → 약 1,677만 색상<br>
32비트 영상: RGBA (투명도 포함)
</div>

<h3>영상처리 응용 분야</h3>
<div class="example-box">
🏥 의료: MRI·CT·X-ray 분석, 종양 검출<br>
🚗 자동차: 자율주행, 차선 인식, 번호판 인식<br>
🔒 보안: 얼굴 인식, 지문 인식, CCTV 분석<br>
🏭 제조: 불량품 검출, 치수 측정<br>
📡 위성: 지형 분석, 기상 관측
</div>`,
        keyPoints: ["픽셀 = 영상의 최소 단위, 0~255 정수값", "W×H×채널 수로 영상 크기 계산", "의료·자율주행·보안 등 다양한 응용"],
        diagramType: "image-represent",
      },
    ],
    quizId: "quiz-cv01",
  },

  {
    id: 'cv2', partId: 1,
    title: "Ch 02 — OpenCV와 파이썬",
    description: "OpenCV 라이브러리의 특징을 알고 파이참 환경을 설정하며 OpenCV-Python을 설치합니다.",
    icon: "🐍", color: "green", estimatedTime: "45분",
    lessons: [
      {
        id: "cv2-1", title: "2.1~2.2 OpenCV 소개 및 파이썬 개요",
        duration: "15분",
        content: `
<h2>OpenCV란?</h2>
<p>OpenCV(Open Source Computer Vision Library)는 인텔이 개발한 오픈소스 컴퓨터 비전 라이브러리입니다. C++, Python, Java를 지원하며 2,500개 이상의 최적화된 알고리즘을 제공합니다.</p>

<div class="highlight-box">
<strong>OpenCV 주요 특징:</strong><br>
• 무료 오픈소스 (BSD 라이선스)<br>
• C++ 기반, Python 인터페이스 제공<br>
• 실시간 처리 최적화<br>
• 딥러닝(DNN) 모듈 포함<br>
• 크로스 플랫폼 (Windows/Mac/Linux)
</div>

<h3>OpenCV 주요 모듈</h3>
<div class="example-box">
core — 기본 배열 연산, 데이터 구조<br>
imgproc — 영상 처리 (필터, 변환, 히스토그램)<br>
highgui — 윈도우 표시, 이벤트 처리<br>
videoio — 비디오 캡처/저장<br>
features2d — 특징점 검출·매칭<br>
dnn — 딥러닝 추론
</div>`,
        keyPoints: ["OpenCV = 2500+ 알고리즘, 무료 오픈소스", "Python 인터페이스로 쉽게 사용", "영상처리·컴퓨터 비전의 사실상 표준"],
        codeExampleId: "cv-install",
      },
      {
        id: "cv2-2", title: "2.3~2.5 파이참 환경설정 및 OpenCV 설치",
        duration: "15분",
        content: `
<h2>개발 환경 설정</h2>

<div class="highlight-box">
<strong>권장 설치 순서:</strong><br>
1. Python 3.x 설치 (python.org)<br>
2. PyCharm 설치 (jetbrains.com/pycharm)<br>
3. pip로 OpenCV 설치
</div>

<h3>OpenCV 설치</h3>
<div class="example-box">
<strong># 기본 버전 (CPU만)</strong><br>
pip install opencv-python<br><br>
<strong># 추가 모듈 포함 (SIFT 등)</strong><br>
pip install opencv-contrib-python<br><br>
<strong># 함께 설치할 패키지</strong><br>
pip install numpy matplotlib
</div>

<h3>설치 확인</h3>
<div class="example-box">
import cv2<br>
print(cv2.__version__)  # 예: 4.8.1<br>
import numpy as np<br>
print(np.__version__)
</div>

<div class="warning-box">
<strong>⚠️ OpenCV-Python 주의:</strong><br>
• cv2.imread()는 BGR 채널 순서 사용 (RGB 아님!)<br>
• matplotlib는 RGB 순서 → 혼용 시 변환 필요
</div>`,
        keyPoints: ["pip install opencv-python으로 설치", "contrib 버전에 SIFT 등 특허 해제 알고리즘 포함", "BGR 채널 순서 주의 (matplotlib와 혼용 시)"],
        codeExampleId: "cv-install",
      },
    ],
    quizId: "quiz-cv02",
  },

  {
    id: 'cv3', partId: 1,
    title: "Ch 03 — 파이썬 둘러보기",
    description: "OpenCV 활용에 필요한 파이썬 핵심 문법과 NumPy 배열 처리를 배웁니다.",
    icon: "📐", color: "purple", estimatedTime: "60분",
    lessons: [
      {
        id: "cv3-1", title: "3.1~3.4 자료 구조·연산자·제어문",
        duration: "20분",
        content: `
<h2>영상처리에서 주로 쓰는 자료 구조</h2>

<div class="example-box">
<strong>리스트 (List):</strong> 화소 좌표, 컬러 값<br>
point = [100, 200]       # (x, y) 좌표<br>
color = [255, 0, 0]      # BGR 색상<br>
<br>
<strong>튜플 (Tuple):</strong> 불변 좌표·크기<br>
size  = (640, 480)       # 영상 크기<br>
roi   = (x, y, w, h)     # 관심 영역
</div>

<h3>슬라이스 — ROI 추출의 핵심</h3>
<div class="highlight-box">
<strong>img[y1:y2, x1:x2]</strong> — 관심 영역(ROI) 추출<br><br>
roi = img[100:200, 50:150]   # y축 100~200, x축 50~150<br>
gray = img[:, :, 0]           # 첫 번째 채널만<br>
flipped = img[::-1, :]        # 상하 반전
</div>

<h3>조건문·반복문 활용</h3>
<div class="example-box">
# 화소별 처리 (느린 방법 — numpy 권장)<br>
for y in range(img.shape[0]):<br>
&nbsp;&nbsp;for x in range(img.shape[1]):<br>
&nbsp;&nbsp;&nbsp;&nbsp;if img[y,x] > 127:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;img[y,x] = 255<br>
&nbsp;&nbsp;&nbsp;&nbsp;else:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;img[y,x] = 0
</div>`,
        keyPoints: ["img[y1:y2, x1:x2] 슬라이스로 ROI 추출", "BGR 순서로 리스트 → [B, G, R]", "화소별 루프보다 NumPy 배열 연산이 100배 빠름"],
        codeExampleId: "cv-numpy-basics",
      },
      {
        id: "cv3-2", title: "3.6 NumPy 패키지 — 영상처리 핵심",
        duration: "20분",
        content: `
<h2>NumPy와 OpenCV 영상의 관계</h2>
<p>OpenCV 영상은 <strong>NumPy ndarray</strong>입니다. NumPy 연산을 그대로 영상에 적용할 수 있습니다.</p>

<div class="highlight-box">
<strong>영상 → NumPy 배열 구조:</strong><br>
컬러 영상: (H, W, 3)  — H×W 픽셀, BGR 3채널<br>
그레이스케일: (H, W)   — H×W 픽셀, 1채널<br>
타입: uint8 (0~255)
</div>

<h3>자주 쓰는 NumPy 함수</h3>
<div class="example-box">
np.zeros((480, 640, 3), dtype=np.uint8)  # 검정 영상<br>
np.ones((480, 640), dtype=np.uint8) * 128  # 회색 영상<br>
img.shape   → (480, 640, 3)    # (H, W, C)<br>
img.dtype   → uint8            # 픽셀 타입<br>
img.copy()  → 독립 복사 (중요!)<br>
img.T       → 전치 (축 교환)
</div>

<h3>배열 연산 = 영상 연산</h3>
<div class="example-box">
# 밝기 증가 (클리핑 주의!)<br>
bright = np.clip(img.astype(int) + 50, 0, 255).astype(np.uint8)<br><br>
# 채널 분리<br>
b, g, r = cv2.split(img)<br>
# 또는: b = img[:, :, 0]
</div>`,
        keyPoints: ["OpenCV 영상 = NumPy ndarray (H, W, C) uint8", "img.copy()로 독립 복사 (= 연산은 뷰)", "np.clip()으로 0~255 범위 초과 방지"],
        codeExampleId: "cv-numpy-basics",
      },
    ],
    quizId: "quiz-cv03",
  },

  {
    id: 'cv4', partId: 1,
    title: "Ch 04 — OpenCV 인터페이스",
    description: "윈도우 제어, 이벤트 처리(키보드·마우스·트랙바), 그리기 함수, 영상·비디오 파일 처리를 배웁니다.",
    icon: "🖥️", color: "orange", estimatedTime: "70분",
    lessons: [
      {
        id: "cv4-1", title: "4.1~4.3 윈도우·이벤트·그리기",
        duration: "20분",
        content: `
<h2>윈도우 제어</h2>
<div class="example-box">
cv2.namedWindow('창 이름', cv2.WINDOW_NORMAL)  # 창 생성<br>
cv2.imshow('창 이름', img)                     # 영상 표시<br>
cv2.waitKey(0)                                  # 키 입력 대기 (0=무한)<br>
cv2.destroyAllWindows()                         # 모든 창 닫기
</div>

<h3>이벤트 처리</h3>
<div class="highlight-box">
<strong>키보드 이벤트:</strong><br>
key = cv2.waitKey(1) & 0xFF<br>
if key == ord('q'): break   # q키 종료<br>
if key == 27: break         # ESC 종료
</div>

<div class="example-box">
<strong>마우스 이벤트:</strong><br>
def on_mouse(event, x, y, flags, param):<br>
&nbsp;&nbsp;if event == cv2.EVENT_LBUTTONDOWN:<br>
&nbsp;&nbsp;&nbsp;&nbsp;print(f"클릭: ({x}, {y})")<br>
cv2.setMouseCallback('창', on_mouse)
</div>

<h3>그리기 함수</h3>
<div class="example-box">
cv2.line(img, (x1,y1), (x2,y2), (B,G,R), 두께)<br>
cv2.rectangle(img, (x1,y1), (x2,y2), color, 두께)<br>
cv2.circle(img, (cx,cy), 반지름, color, 두께)<br>
cv2.putText(img, '텍스트', (x,y), 폰트, 크기, color)
</div>`,
        keyPoints: ["imshow + waitKey + destroyAllWindows 기본 패턴", "마우스 콜백으로 클릭/드래그 이벤트 처리", "line/rectangle/circle로 영상에 그리기"],
        codeExampleId: "cv-interface",
      },
      {
        id: "cv4-2", title: "4.4~4.6 영상파일·비디오·Matplotlib",
        duration: "20분",
        content: `
<h2>영상 파일 처리</h2>
<div class="highlight-box">
<strong>읽기 플래그:</strong><br>
cv2.IMREAD_COLOR    = 1  → 컬러(BGR, 기본값)<br>
cv2.IMREAD_GRAYSCALE = 0  → 그레이스케일<br>
cv2.IMREAD_UNCHANGED = -1 → 원본 그대로(알파 포함)<br><br>
img = cv2.imread('image.jpg', cv2.IMREAD_COLOR)<br>
cv2.imwrite('output.png', img)  # 형식은 확장자로 결정
</div>

<h3>비디오 처리</h3>
<div class="example-box">
<strong>웹캠 캡처:</strong><br>
cap = cv2.VideoCapture(0)      # 0 = 첫 번째 카메라<br>
while True:<br>
&nbsp;&nbsp;ret, frame = cap.read()    # 프레임 읽기<br>
&nbsp;&nbsp;if not ret: break<br>
&nbsp;&nbsp;cv2.imshow('cam', frame)<br>
&nbsp;&nbsp;if cv2.waitKey(1)==27: break<br>
cap.release()                  # 반드시 해제!
</div>

<div class="example-box">
<strong>동영상 저장:</strong><br>
fourcc = cv2.VideoWriter_fourcc(*'XVID')<br>
out = cv2.VideoWriter('out.avi', fourcc, 30, (640,480))<br>
out.write(frame)   # 프레임 저장<br>
out.release()
</div>`,
        keyPoints: ["imread 플래그로 컬러/그레이스케일 선택", "VideoCapture(0)으로 웹캠, 파일명으로 동영상", "cap.release()와 destroyAllWindows() 필수"],
        codeExampleId: "cv-video",
      },
    ],
    quizId: "quiz-cv04",
  },

  {
    id: 'cv5', partId: 1,
    title: "Ch 05 — OpenCV 기본 배열 연산",
    description: "채널 처리, 산술·논리 연산, 통계 함수, 행렬 연산 등 OpenCV의 핵심 배열 연산을 배웁니다.",
    icon: "🔢", color: "red", estimatedTime: "55분",
    lessons: [
      {
        id: "cv5-1", title: "5.1~5.4 배열·채널·산술·논리 연산",
        duration: "20분",
        content: `
<h2>기본 배열 처리</h2>
<div class="example-box">
cv2.add(src1, src2)      # 포화 덧셈 (결과 0~255 클리핑)<br>
cv2.subtract(src1, src2) # 포화 뺄셈<br>
cv2.multiply(src1, src2) # 원소별 곱<br>
cv2.divide(src1, src2)   # 원소별 나눗셈<br><br>
# 가중 합성<br>
cv2.addWeighted(img1, α, img2, β, γ)<br>
# 결과 = α×img1 + β×img2 + γ
</div>

<h3>채널 처리</h3>
<div class="highlight-box">
b, g, r = cv2.split(img)     # 채널 분리<br>
merged  = cv2.merge([b,g,r]) # 채널 병합<br><br>
# 특정 채널만 강조<br>
zeros = np.zeros_like(b)<br>
red_only = cv2.merge([zeros, zeros, r])
</div>

<h3>논리(비트) 연산</h3>
<div class="example-box">
cv2.bitwise_and(img1, img2)  # AND: 마스크 적용<br>
cv2.bitwise_or(img1, img2)   # OR<br>
cv2.bitwise_xor(img1, img2)  # XOR<br>
cv2.bitwise_not(img)         # NOT: 색상 반전
</div>`,
        keyPoints: ["cv2.add는 포화 연산 (255 초과 시 255 유지)", "split/merge로 채널 분리·병합", "bitwise_and로 마스크 영역만 추출"],
        diagramType: "array-ops",
        codeExampleId: "cv-array-ops",
      },
      {
        id: "cv5-2", title: "5.5~5.6 통계·행렬 연산",
        duration: "15분",
        content: `
<h2>통계 관련 함수</h2>
<div class="example-box">
cv2.mean(img)              # 채널별 평균<br>
cv2.meanStdDev(img)        # 평균 + 표준편차<br>
cv2.minMaxLoc(img)         # 최솟값, 최댓값, 위치<br>
cv2.countNonZero(gray)     # 0이 아닌 픽셀 수
</div>

<h3>활용 예시</h3>
<div class="highlight-box">
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(gray)<br>
print(f"최솟값: {min_val} @ {min_loc}")<br>
print(f"최댓값: {max_val} @ {max_loc}")<br><br>
mean, std = cv2.meanStdDev(img)<br>
# 대비가 낮으면 std가 작음
</div>

<h3>행렬 연산</h3>
<div class="example-box">
cv2.gemm(A, B, alpha, C, beta)  # 일반 행렬 곱<br>
# result = alpha*A*B + beta*C<br><br>
# 전치<br>
cv2.transpose(img)<br>
# 행렬식, 역행렬<br>
cv2.determinant(M)<br>
cv2.invert(M)
</div>`,
        keyPoints: ["minMaxLoc으로 최솟·최댓값과 위치 동시 반환", "meanStdDev로 영상 대비 수준 파악", "gemm = alpha*A*B + beta*C 일반 행렬 곱"],
        diagramType: "array-ops",
        codeExampleId: "cv-array-ops",
      },
    ],
    quizId: "quiz-cv05",
  },

  // ════════════════════════
  // PART 02 – 영상처리와 OpenCV 함수 활용
  // ════════════════════════

  {
    id: 'cv6', partId: 2,
    title: "Ch 06 — 화소 처리",
    description: "화소 밝기 변환, 히스토그램 분석과 평활화, RGB·HSI 등 컬러 공간 변환을 배웁니다.",
    icon: "🎨", color: "cyan", estimatedTime: "80분",
    lessons: [
      {
        id: "cv6-1", title: "6.1~6.2 화소 접근과 밝기 변환",
        duration: "20분",
        content: `
<h2>화소(Pixel) 직접 접근</h2>
<div class="example-box">
# 단일 픽셀 읽기<br>
b, g, r = img[y, x]       # 컬러 (BGR)<br>
val = gray[y, x]           # 그레이스케일<br><br>
# 픽셀 쓰기<br>
img[y, x] = [0, 255, 0]    # 초록 픽셀<br>
gray[y, x] = 128           # 중간 밝기
</div>

<h3>밝기 변환 (점 처리)</h3>
<div class="highlight-box">
<strong>가감 연산:</strong><br>
brighter = cv2.add(img, np.ones_like(img)*50)  # 밝게<br>
darker   = cv2.subtract(img, np.ones_like(img)*50)  # 어둡게<br><br>
<strong>명암 대비 조절:</strong><br>
contrast = img.astype(float) * 1.5   # 대비 증가<br>
contrast = np.clip(contrast, 0, 255).astype(np.uint8)
</div>

<h3>영상 합성</h3>
<div class="example-box">
# 알파 블렌딩 (두 영상 합성)<br>
blended = cv2.addWeighted(img1, 0.6, img2, 0.4, 0)<br>
# 결과 = 0.6×img1 + 0.4×img2 + 0
</div>`,
        keyPoints: ["img[y,x]로 픽셀 직접 접근 (느림, 간단한 작업용)", "cv2.add/subtract: 포화 연산으로 클리핑 자동 처리", "addWeighted: 두 영상을 가중치로 합성"],
        diagramType: "image-represent",
        codeExampleId: "cv-pixel-ops",
      },
      {
        id: "cv6-2", title: "6.3 히스토그램",
        duration: "20분",
        content: `
<h2>히스토그램이란?</h2>
<p>영상에서 각 밝기값(0~255)이 몇 개의 픽셀을 가지는지 나타내는 <strong>밝기 분포 그래프</strong>입니다.</p>

<div class="highlight-box">
<strong>히스토그램 계산:</strong><br>
hist = cv2.calcHist([img], [0], None, [256], [0,256])<br>
# 인수: 영상, 채널, 마스크, 빈 수, 범위
</div>

<h3>히스토그램으로 영상 품질 판단</h3>
<div class="example-box">
밝기 쏠림(왼쪽 몰림) → 어두운 영상<br>
밝기 쏠림(오른쪽 몰림) → 밝은 영상<br>
분포 폭이 좁음 → 대비가 낮은 영상<br>
분포 폭이 넓음 → 대비가 높은 영상
</div>

<h3>히스토그램 평활화 (Equalization)</h3>
<div class="highlight-box">
<strong>목적:</strong> 히스토그램을 전체 0~255 범위에 고르게 분포시켜 대비를 향상<br><br>
equ = cv2.equalizeHist(gray)<br><br>
# CLAHE: 지역적 평활화 (더 자연스러움)<br>
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))<br>
result = clahe.apply(gray)
</div>`,
        keyPoints: ["히스토그램 = 밝기값별 픽셀 수 분포", "equalizeHist: 전체 대비 향상", "CLAHE: 국소 영역 적응형 평활화 (더 자연스러움)"],
        diagramType: "color-space",
        codeExampleId: "cv-histogram",
      },
      {
        id: "cv6-3", title: "6.4 컬러 공간 변환",
        duration: "20분",
        content: `
<h2>컬러 공간(Color Space)</h2>
<p>컬러를 표현하는 수학적 모델입니다. 영상처리에서는 목적에 따라 다른 컬러 공간을 사용합니다.</p>

<div class="highlight-box">
<strong>컬러 공간 변환 함수:</strong><br>
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)<br>
hsv  = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)<br>
lab  = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)<br>
yuv  = cv2.cvtColor(img, cv2.COLOR_BGR2YUV)
</div>

<h3>컬러 공간별 특징</h3>
<div class="example-box">
<strong>BGR/RGB:</strong> 기본 색상 표현, 화소 처리<br>
<strong>HSV/HSI:</strong> Hue(색상)·Sat(채도)·Val(명도) — 색상 기반 검출<br>
<strong>Lab:</strong> 인간 시각에 균일한 색차 → 색상 비교<br>
<strong>YUV/YCrCb:</strong> 밝기(Y)와 색상 분리 → JPEG 압축
</div>

<h3>HSV로 색상 검출</h3>
<div class="example-box">
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)<br>
# 빨간색 범위 지정<br>
lower_red = np.array([0, 100, 100])<br>
upper_red = np.array([10, 255, 255])<br>
mask = cv2.inRange(hsv, lower_red, upper_red)<br>
result = cv2.bitwise_and(img, img, mask=mask)
</div>`,
        keyPoints: ["목적에 따라 컬러 공간 선택: 색상 검출→HSV, 색 비교→Lab", "inRange로 특정 색상 범위 마스크 생성", "BGR→GRAY 변환으로 컬러→그레이스케일"],
        diagramType: "color-space",
        codeExampleId: "cv-color-space",
      },
    ],
    quizId: "quiz-cv06",
  },

  {
    id: 'cv7', partId: 2,
    title: "Ch 07 — 영역 처리",
    description: "회선(합성곱), 블러링·샤프닝·에지 검출 필터, 모폴로지 연산을 배웁니다.",
    icon: "🔍", color: "indigo", estimatedTime: "80분",
    lessons: [
      {
        id: "cv7-1", title: "7.1 회선(Convolution)과 블러·샤프닝",
        duration: "20분",
        content: `
<h2>회선(Convolution)이란?</h2>
<p>작은 행렬(커널/마스크)을 영상 위에 <strong>슬라이딩</strong>하며 각 위치에서 원소별 곱의 합을 계산하는 연산입니다.</p>

<div class="highlight-box">
<strong>OpenCV 회선 적용:</strong><br>
kernel = np.array([[1,1,1],[1,1,1],[1,1,1]], np.float32) / 9<br>
blurred = cv2.filter2D(img, -1, kernel)
</div>

<h3>블러링(Smoothing)</h3>
<div class="example-box">
# 평균 블러
cv2.blur(img, (5,5))

# 가우시안 블러 (노이즈 제거에 최적)
cv2.GaussianBlur(img, (5,5), sigmaX=0)

# 미디언 블러 (점잡음 제거에 최적)
cv2.medianBlur(img, 5)
</div>

<h3>샤프닝(Sharpening)</h3>
<div class="example-box">
# 언샤프 마스크 방법
blurred = cv2.GaussianBlur(img, (5,5), 0)
sharp = cv2.addWeighted(img, 1.5, blurred, -0.5, 0)

# 라플라시안 커널
lap_kernel = np.array([[0,-1,0],[-1,5,-1],[0,-1,0]])
sharpened = cv2.filter2D(img, -1, lap_kernel)
</div>`,
        keyPoints: ["회선 = 커널을 슬라이딩하며 원소별 곱의 합", "GaussianBlur: 노이즈 제거, medianBlur: 점잡음", "언샤프 마스크: 원본 - 블러 → 경계 강조"],
        diagramType: "image-filter",
        codeExampleId: "cv-filtering",
      },
      {
        id: "cv7-2", title: "7.2 에지 검출",
        duration: "20분",
        content: `
<h2>에지(Edge)란?</h2>
<p>영상에서 밝기가 급격히 변하는 경계 부분입니다. 객체 윤곽, 텍스처 경계 등이 포함됩니다.</p>

<h3>1차 미분 에지 검출</h3>
<div class="example-box">
# Sobel 필터 (x, y 방향 그래디언트)
sobelX = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
sobelY = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
sobel = cv2.magnitude(sobelX, sobelY)

# Scharr 필터 (Sobel보다 정확)
scharrX = cv2.Scharr(gray, cv2.CV_64F, 1, 0)
</div>

<h3>Canny 에지 검출 — 최고 성능</h3>
<div class="highlight-box">
<strong>Canny 4단계:</strong><br>
① 가우시안 블러 (노이즈 제거)<br>
② Sobel 그래디언트 계산<br>
③ Non-Maximum Suppression (에지 얇게)<br>
④ 이중 임계값 (강한 에지·약한 에지 선별)<br><br>
edges = cv2.Canny(gray, threshold1=50, threshold2=150)
</div>

<h3>2차 미분 (라플라시안)</h3>
<div class="example-box">
lap = cv2.Laplacian(gray, cv2.CV_64F, ksize=3)
lap_abs = cv2.convertScaleAbs(lap)
</div>`,
        keyPoints: ["Sobel: x·y 방향 1차 미분, 그래디언트 크기로 에지", "Canny: 4단계 처리로 가장 정확한 에지 검출", "임계값1 < 임계값2, 비율 1:2~1:3 권장"],
        diagramType: "image-filter",
        codeExampleId: "cv-edge-detection",
      },
      {
        id: "cv7-3", title: "7.3~7.4 기타 필터링과 모폴로지",
        duration: "20분",
        content: `
<h2>모폴로지 연산 (Morphology)</h2>
<p>이진(binary) 영상에서 형태를 변형시키는 연산입니다. 구조 요소(커널)의 형태로 팽창·침식 방향을 결정합니다.</p>

<div class="highlight-box">
<strong>구조 요소 생성:</strong><br>
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,5))<br>
# MORPH_RECT / MORPH_ELLIPSE / MORPH_CROSS
</div>

<div class="example-box">
<strong>침식 (Erosion):</strong> 밝은 영역 축소, 노이즈 제거<br>
eroded = cv2.erode(binary, kernel)<br><br>
<strong>팽창 (Dilation):</strong> 밝은 영역 확장, 구멍 메우기<br>
dilated = cv2.dilate(binary, kernel)<br><br>
<strong>열림 (Opening = 침식→팽창):</strong> 작은 노이즈 제거<br>
opened = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)<br><br>
<strong>닫힘 (Closing = 팽창→침식):</strong> 작은 구멍 메우기<br>
closed = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)
</div>`,
        keyPoints: ["침식: 밝은 영역 축소 → 잡음 제거", "팽창: 밝은 영역 확장 → 구멍 채우기", "열림=침식→팽창(노이즈), 닫힘=팽창→침식(구멍)"],
        diagramType: "morphology-ops",
        codeExampleId: "cv-morphology",
      },
    ],
    quizId: "quiz-cv07",
  },

  {
    id: 'cv8', partId: 2,
    title: "Ch 08 — 기하학 처리",
    description: "영상의 크기 변경, 보간법, 이동·회전·어파인 변환, 원근 투시 변환을 배웁니다.",
    icon: "📐", color: "orange",estimatedTime: "65분",
    lessons: [
      {
        id: "cv8-1", title: "8.1~8.4 크기 변경과 보간법, 이동",
        duration: "20분",
        content: `
<h2>사상(Mapping)이란?</h2>
<p>입력 영상의 각 픽셀 위치를 출력 영상의 위치로 변환하는 함수 관계입니다.</p>

<h3>크기 변경 (확대/축소)</h3>
<div class="highlight-box">
cv2.resize(img, dsize=(640, 480))          # 절대 크기<br>
cv2.resize(img, None, fx=0.5, fy=0.5)     # 비율 변경<br><br>
<strong>보간법 선택:</strong><br>
cv2.INTER_NEAREST  — 최근접(빠름, 계단 현상)<br>
cv2.INTER_LINEAR   — 양선형(기본, 균형)<br>
cv2.INTER_CUBIC    — 3차 회선(고품질, 느림)<br>
cv2.INTER_AREA     — 축소에 최적
</div>

<h3>보간법의 차이</h3>
<div class="example-box">
<strong>최근접 이웃(Nearest Neighbor):</strong><br>
가장 가까운 픽셀 값을 그대로 사용 → 빠르지만 계단 현상<br><br>
<strong>양선형(Bilinear):</strong><br>
주변 4개 픽셀의 거리 가중 평균 → 부드러움
</div>

<h3>평행 이동 (Translation)</h3>
<div class="example-box">
# 이동 행렬: [[1, 0, tx], [0, 1, ty]]
M = np.float32([[1, 0, 100], [0, 1, 50]])  # x로 100, y로 50 이동
moved = cv2.warpAffine(img, M, (W, H))
</div>`,
        keyPoints: ["resize의 보간법: 축소→AREA, 확대→CUBIC", "최근접 = 빠름 계단, 양선형 = 부드러움", "warpAffine: 이동·회전·어파인 변환 모두 적용 가능"],
        diagramType: "geom-transform",
        codeExampleId: "cv-geometric",
      },
      {
        id: "cv8-2", title: "8.5~8.7 회전·어파인·원근 변환",
        duration: "20분",
        content: `
<h2>회전 (Rotation)</h2>
<div class="example-box">
# 중심점(cx,cy) 기준 angle도 회전, scale 크기
M = cv2.getRotationMatrix2D((cx, cy), angle, scale)
rotated = cv2.warpAffine(img, M, (W, H))
</div>

<h2>어파인 변환 (Affine Transform)</h2>
<p>이동·회전·스케일·기울기(shear)를 포함하는 선형 변환입니다. 평행선을 보존합니다.</p>
<div class="highlight-box">
<strong>3점 대응으로 어파인 행렬 계산:</strong><br>
pts1 = np.float32([[50,50],[200,50],[50,200]])<br>
pts2 = np.float32([[10,100],[200,50],[100,250]])<br>
M = cv2.getAffineTransform(pts1, pts2)<br>
warped = cv2.warpAffine(img, M, (W, H))
</div>

<h2>원근 투시 변환 (Perspective Transform)</h2>
<p>카메라 각도 보정, 문서 스캔 보정에 사용합니다.</p>
<div class="example-box">
pts1 = np.float32([[56,65],[368,52],[28,387],[389,390]])<br>
pts2 = np.float32([[0,0],[300,0],[0,300],[300,300]])<br>
M = cv2.getPerspectiveTransform(pts1, pts2)<br>
dst = cv2.warpPerspective(img, M, (300, 300))
</div>`,
        keyPoints: ["getRotationMatrix2D: 중심·각도·스케일로 회전 행렬", "어파인: 3점 대응 → 이동·회전·기울기 변환", "원근: 4점 대응 → 카메라 각도 보정"],
        diagramType: "geom-transform",
        codeExampleId: "cv-geometric",
      },
    ],
    quizId: "quiz-cv08",
  },

  {
    id: 'cv9', partId: 2,
    title: "Ch 09 — 변환영역 처리",
    description: "공간 주파수, 이산 푸리에 변환(DFT), FFT를 이용한 주파수 영역 필터링, 이산 코사인 변환을 배웁니다.",
    icon: "〰️", color: "purple", estimatedTime: "70분",
    lessons: [
      {
        id: "cv9-1", title: "9.1~9.3 공간 주파수와 DFT/FFT",
        duration: "20분",
        content: `
<h2>공간 주파수란?</h2>
<p>영상에서 밝기가 <strong>얼마나 빠르게 변하는가</strong>를 나타냅니다.</p>

<div class="example-box">
<strong>저주파(Low Frequency):</strong><br>
밝기 변화가 완만한 영역 (배경, 평평한 부분)<br><br>
<strong>고주파(High Frequency):</strong><br>
밝기 변화가 급격한 영역 (에지, 텍스처, 노이즈)
</div>

<h2>이산 푸리에 변환 (DFT)</h2>
<p>공간 영역 영상을 <strong>주파수 영역</strong>으로 변환합니다.</p>

<div class="highlight-box">
dft = cv2.dft(np.float32(gray), flags=cv2.DFT_COMPLEX_OUTPUT)<br>
dft_shift = np.fft.fftshift(dft)  # 저주파를 중앙으로<br><br>
# 스펙트럼 시각화<br>
magnitude = cv2.magnitude(dft_shift[:,:,0], dft_shift[:,:,1])<br>
spectrum = 20 * np.log(magnitude + 1)
</div>`,
        keyPoints: ["저주파=완만한 변화, 고주파=급격한 변화(에지·노이즈)", "DFT로 공간→주파수 영역 변환", "fftshift: 저주파 성분을 스펙트럼 중앙으로"],
        codeExampleId: "cv-fft",
      },
      {
        id: "cv9-2", title: "9.4~9.5 주파수 필터링과 DCT",
        duration: "20분",
        content: `
<h2>주파수 영역 필터링</h2>
<p>DFT 스펙트럼에 필터 마스크를 곱한 후 역변환합니다.</p>

<div class="highlight-box">
<strong>주파수 필터링 과정:</strong><br>
① 영상 → DFT → 스펙트럼<br>
② 필터 마스크 생성 (원형 마스크)<br>
③ 스펙트럼 × 마스크<br>
④ 역DFT → 결과 영상
</div>

<div class="example-box">
# 저주파 통과 필터 (LPF) → 블러 효과
rows, cols = gray.shape
crow, ccol = rows//2, cols//2
mask = np.zeros((rows, cols, 2), np.uint8)
cv2.circle(mask, (ccol,crow), 30, (1,1,1), -1)  # 중앙 원형 마스크
filtered = dft_shift * mask
</div>

<h3>버터워스 / 가우시안 필터</h3>
<div class="example-box">
# 버터워스 LPF: H(u,v) = 1 / (1 + (D/D0)^2n)
# 가우시안 LPF: H(u,v) = exp(-D²/2D0²)
# D = 현재 주파수, D0 = 차단 주파수
</div>

<h3>이산 코사인 변환 (DCT)</h3>
<div class="example-box">
# JPEG 압축의 핵심
dct = cv2.dct(np.float32(block))   # 8×8 블록 변환
idct = cv2.idct(dct_compressed)    # 역변환 (복원)
</div>`,
        keyPoints: ["LPF=블러(저주파만 통과), HPF=샤프닝(고주파만 통과)", "버터워스·가우시안 필터로 자연스러운 차단", "DCT: JPEG 압축 원리 (8×8 블록 변환)"],
        codeExampleId: "cv-fft",
      },
    ],
    quizId: "quiz-cv09",
  },

  {
    id: 'cv10', partId: 2,
    title: "Ch 10 — 영상 분할 및 특징 처리",
    description: "허프 변환으로 직선·원 검출, 코너 검출, k-NN 분류기, 영상 워핑·모핑을 배웁니다.",
    icon: "📍", color: "red", estimatedTime: "85분",
    lessons: [
      {
        id: "cv10-1", title: "10.1 허프 변환 (Hough Transform)",
        duration: "25분",
        content: `
<h2>허프 변환이란?</h2>
<p>에지 영상에서 <strong>직선·원 같은 기하학적 형태</strong>를 검출하는 방법입니다. 각 에지 픽셀을 파라미터 공간(ρ-θ)에 투표하고 가장 많이 투표된 파라미터를 찾습니다.</p>

<div class="highlight-box">
<strong>허프 직선 변환 원리:</strong><br>
직선 방정식: ρ = x·cos(θ) + y·sin(θ)<br><br>
각 에지 픽셀 → (ρ, θ) 공간에 사인 곡선 그리기<br>
여러 곡선이 교차하는 점 = 공통 직선의 파라미터
</div>

<div class="example-box">
edges = cv2.Canny(gray, 50, 150)<br><br>
# 확률적 허프 직선 검출<br>
lines = cv2.HoughLinesP(edges, rho=1, theta=np.pi/180,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;threshold=100,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minLineLength=50, maxLineGap=10)<br>
for x1,y1,x2,y2 in lines[:,0]:<br>
&nbsp;&nbsp;cv2.line(img, (x1,y1),(x2,y2),(0,255,0),2)<br><br>
# 허프 원 검출<br>
circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT,<br>
&nbsp;&nbsp;dp=1, minDist=20, param1=50, param2=30)
</div>`,
        keyPoints: ["허프 변환: 에지 픽셀 → 파라미터 공간 투표 → 형태 검출", "HoughLinesP: 확률적 방법으로 선분 직접 반환", "HoughCircles: 원의 중심과 반지름 검출"],
        diagramType: "hough-transform",
        codeExampleId: "cv-hough",
      },
      {
        id: "cv10-2", title: "10.2~10.4 코너 검출·k-NN·워핑",
        duration: "25분",
        content: `
<h2>코너(Corner) 검출</h2>
<p>영상에서 두 방향 모두 밝기 변화가 큰 점(코너)을 검출합니다. 특징점 매칭, 카메라 보정에 활용합니다.</p>

<div class="example-box">
# Harris 코너 검출
harris = cv2.cornerHarris(gray, blockSize=2, ksize=3, k=0.04)
img[harris > 0.01*harris.max()] = [0,0,255]  # 빨간점 표시

# Shi-Tomasi (더 정확한 버전)
corners = cv2.goodFeaturesToTrack(gray, maxCorners=100,
                                   qualityLevel=0.01, minDistance=10)
</div>

<h2>k-NN 분류기 (OpenCV ml 모듈)</h2>
<div class="highlight-box">
knn = cv2.ml.KNearest_create()<br>
knn.train(train_data, cv2.ml.ROW_SAMPLE, labels)<br>
ret, results, neighbours, dist = knn.findNearest(test, k=3)
</div>

<h2>영상 워핑(Warping)과 모핑(Morphing)</h2>
<div class="example-box">
<strong>워핑:</strong> 제어점을 이용해 영상을 변형 (얼굴 특징점 이동)<br>
<strong>모핑:</strong> 두 영상 사이를 자연스럽게 전환<br>
모핑 = 워핑 + 크로스 페이드(addWeighted)
</div>`,
        keyPoints: ["Harris/Shi-Tomasi: 두 방향 모두 변화가 큰 점=코너", "OpenCV ml.KNearest로 k-NN 분류기 구현", "모핑 = 워핑(형태) + 크로스 페이드(색상) 조합"],
        codeExampleId: "cv-hough",
      },
    ],
    quizId: "quiz-cv10",
  },

  // ════════════════════════
  // PART 03 – 영상처리 응용 사례
  // ════════════════════════

  {
    id: 'cv11', partId: 3,
    title: "Ch 11 — 응용 사례 I",
    description: "그림판 프로그램 구현과 하르 분류기를 이용한 얼굴 검출 및 성별 분류를 배웁니다.",
    icon: "🎭", color: "cyan", estimatedTime: "90분",
    lessons: [
      {
        id: "cv11-1", title: "11.1 그림판 프로그램",
        duration: "25분",
        content: `
<h2>그림판 프로그램 전체 구조</h2>

<div class="highlight-box">
<strong>구현 컴포넌트:</strong><br>
① 캔버스 영역 (흰 배경 영상)<br>
② 팔레트 영역 (색상 선택)<br>
③ 아이콘 영역 (도구 선택: 펜, 선, 사각형, 원)<br>
④ 마우스 이벤트 처리
</div>

<h3>마우스 이벤트 기반 그리기</h3>
<div class="example-box">
drawing = False<br>
tool = 'pen'   # pen / line / rect / circle<br>
start_pt = None<br><br>
def on_mouse(event, x, y, flags, param):<br>
&nbsp;&nbsp;global drawing, start_pt<br>
&nbsp;&nbsp;if event == cv2.EVENT_LBUTTONDOWN:<br>
&nbsp;&nbsp;&nbsp;&nbsp;drawing = True; start_pt = (x, y)<br>
&nbsp;&nbsp;elif event == cv2.EVENT_MOUSEMOVE and drawing:<br>
&nbsp;&nbsp;&nbsp;&nbsp;if tool == 'pen':<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cv2.line(canvas, start_pt, (x,y), color, thickness)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;start_pt = (x, y)<br>
&nbsp;&nbsp;elif event == cv2.EVENT_LBUTTONUP:<br>
&nbsp;&nbsp;&nbsp;&nbsp;drawing = False
</div>`,
        keyPoints: ["마우스 이벤트 3가지: DOWN·MOVE·UP으로 그리기 구현", "이전 좌표 저장으로 연속 선 그리기", "도구별 if 분기로 펜/선/사각형/원 구분"],
        codeExampleId: "cv-paint-app",
      },
      {
        id: "cv11-2", title: "11.2 하르 분류기 얼굴 검출·성별 분류",
        duration: "30분",
        content: `
<h2>하르 기반 분류기 (Haar Cascade)</h2>
<p>Viola-Jones 알고리즘을 기반으로 하르 특징값과 AdaBoost 분류기를 조합한 실시간 객체 검출 방법입니다.</p>

<div class="example-box">
# 미리 학습된 분류기 로드
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade  = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_eye.xml')

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
faces = face_cascade.detectMultiScale(
    gray, scaleFactor=1.1, minNeighbors=5, minSize=(30,30))

for (x, y, w, h) in faces:
    cv2.rectangle(img, (x,y), (x+w, y+h), (255,0,0), 2)
    face_roi = gray[y:y+h, x:x+w]
    eyes = eye_cascade.detectMultiScale(face_roi)
</div>

<h3>성별 분류 개요</h3>
<div class="highlight-box">
<strong>히스토그램 비교 방식:</strong><br>
① 얼굴 영역 히스토그램 계산<br>
② 남성/여성 평균 히스토그램과 비교<br>
③ cv2.compareHist()로 유사도 계산<br>
④ 가장 유사한 클래스로 분류
</div>`,
        keyPoints: ["Haar Cascade: XML 파일 로드 → detectMultiScale 호출", "scaleFactor: 다양한 크기 얼굴 검출 비율", "히스토그램 비교: 얼굴 ROI의 색상 분포로 성별 판단"],
        codeExampleId: "cv-face-detect",
      },
    ],
    quizId: "quiz-cv11",
  },

  {
    id: 'cv12', partId: 3,
    title: "Ch 12 — 응용 사례 II",
    description: "동전 인식 프로그램, SVM을 이용한 번호판 검출, k-NN으로 번호판 문자 인식을 배웁니다.",
    icon: "🚗", color: "indigo", estimatedTime: "100분",
    lessons: [
      {
        id: "cv12-1", title: "12.1 동전 인식 프로그램",
        duration: "30분",
        content: `
<h2>동전 인식 전체 처리 과정</h2>

<div class="highlight-box">
<strong>처리 파이프라인:</strong><br>
① 영상 캡처 → 전처리 (그레이스케일, 블러)<br>
② 허프 원 검출 → 동전 객체 검출<br>
③ 개별 동전 ROI 영상 생성<br>
④ 색상 히스토그램 계산 (HSV 공간)<br>
⑤ 미리 저장한 히스토그램과 비교<br>
⑥ 동전 종류 결정 (10원, 50원, 100원, 500원)
</div>

<div class="example-box">
# 허프 원 검출로 동전 찾기
circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT,
    dp=1, minDist=50, param1=50, param2=30,
    minRadius=20, maxRadius=80)

# 각 동전 ROI 추출
for cx, cy, r in circles[0]:
    roi = img[cy-r:cy+r, cx-r:cx+r]
    # 원형 마스크 적용
    mask = np.zeros_like(roi[:,:,0])
    cv2.circle(mask, (r,r), r, 255, -1)
    roi_masked = cv2.bitwise_and(roi, roi, mask=mask)
</div>`,
        keyPoints: ["허프 원으로 동전 위치/크기 검출", "원형 마스크로 동전 부분만 추출", "HSV 히스토그램 비교로 동전 종류 분류"],
        codeExampleId: "cv-coin-detect",
      },
      {
        id: "cv12-2", title: "12.2~12.3 번호판 SVM 검출 및 k-NN 인식",
        duration: "35분",
        content: `
<h2>번호판 검출 (SVM)</h2>

<div class="highlight-box">
<strong>번호판 검출 전체 흐름:</strong><br>
① 에지 검출 + 윤곽선 추출<br>
② 번호판 후보 영역 추출 (가로:세로 비율 필터)<br>
③ SVM 모델로 번호판 여부 판별<br>
④ 번호판 영역 정렬 (어파인 변환)
</div>

<div class="example-box">
# SVM 학습 및 예측
svm = cv2.ml.SVM_create()
svm.setType(cv2.ml.SVM_C_SVC)
svm.setKernel(cv2.ml.SVM_LINEAR)
svm.train(train_data, cv2.ml.ROW_SAMPLE, labels)
svm.save('plate_svm.xml')

# 예측
_, result = svm.predict(candidate_features)
</div>

<h2>번호판 문자 인식 (k-NN)</h2>
<div class="example-box">
# 숫자/문자 영상 학습
knn = cv2.ml.KNearest_create()
knn.train(char_samples, cv2.ml.ROW_SAMPLE, char_labels)

# 번호판에서 문자 분리 후 인식
contours, _ = cv2.findContours(plate_binary,
    cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
for cnt in contours:
    roi = plate[y:y+h, x:x+w]
    roi_resized = cv2.resize(roi, (20, 20)).flatten()
    _, result, _, _ = knn.findNearest(roi_resized, k=1)
</div>`,
        keyPoints: ["SVM으로 번호판/비번호판 이진 분류", "k-NN으로 개별 문자 인식 (20×20 특징 벡터)", "findContours로 번호판 내 문자 분리"],
        codeExampleId: "cv-plate-detect",
      },
    ],
    quizId: "quiz-cv12",
  },
];

export const getOpenCVModuleById = (id) => opencvModules.find(m => m.id === id);
export const getOpenCVLessonById = (lessonId) => {
  for (const module of opencvModules) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return { lesson, module };
  }
  return null;
};
