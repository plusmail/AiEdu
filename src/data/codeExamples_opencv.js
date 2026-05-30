export const opencvCodeExamples = {
  'cv-install': {
    language: 'python', title: 'OpenCV 설치 및 기본 확인',
    description: 'OpenCV-Python 설치 후 첫 번째 실행으로 버전과 영상 읽기를 테스트합니다.',
    code: `# 설치 명령 (터미널에서 실행)
# pip install opencv-python numpy matplotlib

import cv2
import numpy as np

print(f"OpenCV 버전: {cv2.__version__}")
print(f"NumPy 버전:  {np.__version__}")

# 영상 읽기 테스트 (파일이 있다면)
# img = cv2.imread('sample.jpg')
# if img is None:
#     print("파일을 찾을 수 없습니다.")
# else:
#     print(f"영상 크기: {img.shape}")   # (H, W, C)
#     print(f"타입: {img.dtype}")         # uint8
#     cv2.imshow('test', img)
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()

# 빈 영상 생성 테스트
black = np.zeros((100, 200, 3), dtype=np.uint8)
white = np.ones((100, 200, 3), dtype=np.uint8) * 255
gray  = np.full((100, 200), 128, dtype=np.uint8)

print(f"검정 영상: {black.shape}")
print(f"흰색 영상: {white.shape}")
print(f"회색 영상: {gray.shape}")`,
  },

  'cv-numpy-basics': {
    language: 'python', title: 'NumPy 배열 = OpenCV 영상',
    description: 'NumPy 배열로 영상을 생성하고 슬라이스·채널 처리를 실습합니다.',
    code: `import cv2
import numpy as np

# 컬러 영상 생성 (100×200, BGR)
img = np.zeros((100, 200, 3), dtype=np.uint8)
img[:50, :, 2] = 255   # 위쪽 절반 빨간색 (R채널)
img[50:, :, 0] = 255   # 아래쪽 절반 파란색 (B채널)

print("영상 기본 정보:")
print(f"  shape: {img.shape}  → (H={img.shape[0]}, W={img.shape[1]}, C={img.shape[2]})")
print(f"  dtype: {img.dtype}")
print(f"  size:  {img.size} 바이트")

# 픽셀 접근
print(f"\n픽셀 [25, 100]: {img[25, 100]}  # BGR")
print(f"픽셀 [75, 100]: {img[75, 100]}  # BGR")

# ROI (관심 영역) 추출
roi = img[20:80, 50:150]
print(f"\nROI shape: {roi.shape}")

# 채널 분리
b, g, r = cv2.split(img)
print(f"\nB채널 최댓값: {b.max()}")
print(f"R채널 최댓값: {r.max()}")

# 슬라이스로 채널 접근
b2 = img[:, :, 0]   # B채널
print(f"B채널(슬라이스) == split 결과: {np.array_equal(b, b2)}")

# numpy 연산: 밝기 조절
bright = np.clip(img.astype(int) + 50, 0, 255).astype(np.uint8)
print(f"\n밝기 증가 후 평균: {bright.mean():.1f}")`,
  },

  'cv-interface': {
    language: 'python', title: 'OpenCV 인터페이스 — 윈도우·그리기',
    description: '창 생성, 도형 그리기, 텍스트 작성 기본 패턴입니다.',
    code: `import cv2
import numpy as np

# 흰 배경 영상 생성
canvas = np.ones((400, 600, 3), dtype=np.uint8) * 255

# ─── 그리기 함수 ───────────────────────────────────
# 직선
cv2.line(canvas, (50, 50), (250, 50), (0, 0, 255), 3)  # 빨간 선

# 사각형 (좌상단, 우하단, 색, 두께/-1=채우기)
cv2.rectangle(canvas, (50, 80), (200, 180), (0, 255, 0), 2)  # 초록 사각형
cv2.rectangle(canvas, (220, 80), (350, 180), (255, 0, 0), -1)  # 파란 채운 사각형

# 원 (중심, 반지름, 색, 두께)
cv2.circle(canvas, (100, 250), 60, (128, 0, 128), 3)  # 보라 원
cv2.circle(canvas, (250, 250), 40, (0, 165, 255), -1)  # 주황 채운 원

# 타원 (중심, 장반경·단반경, 회전각, 시작각, 끝각)
cv2.ellipse(canvas, (450, 200), (80, 50), 30, 0, 360, (0, 200, 200), 2)

# 텍스트
cv2.putText(canvas, 'OpenCV Drawing',
            (50, 360),
            cv2.FONT_HERSHEY_SIMPLEX,
            1.0,        # 폰트 크기
            (50, 50, 50),  # 색상 (BGR)
            2)           # 두께

print("도형 그리기 완료!")
print(f"캔버스 크기: {canvas.shape}")

# 영상 표시 (코랩에서는 matplotlib 사용)
# cv2.imshow('Drawing', canvas)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

# Colab/matplotlib 표시:
# import matplotlib.pyplot as plt
# plt.figure(figsize=(8, 5))
# plt.imshow(cv2.cvtColor(canvas, cv2.COLOR_BGR2RGB))
# plt.axis('off')
# plt.show()`,
  },

  'cv-video': {
    language: 'python', title: '비디오 처리 — 웹캠 캡처',
    description: '웹캠에서 실시간으로 프레임을 읽고 처리하는 기본 패턴입니다.',
    code: `import cv2
import numpy as np

# ─── 웹캠 캡처 기본 패턴 ──────────────────────────
cap = cv2.VideoCapture(0)  # 0 = 첫 번째 카메라

if not cap.isOpened():
    print("카메라를 열 수 없습니다.")
    exit()

# 카메라 속성 확인
width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps    = cap.get(cv2.CAP_PROP_FPS)
print(f"해상도: {width}×{height}, FPS: {fps}")

# 카메라 속성 설정
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

frame_count = 0
while True:
    ret, frame = cap.read()   # 프레임 읽기
    if not ret:
        print("프레임을 읽을 수 없습니다.")
        break

    # ─ 영상 처리 (그레이스케일 변환 예시)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # ─ 프레임 번호 표시
    cv2.putText(frame, f'Frame: {frame_count}',
                (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)

    cv2.imshow('Camera', frame)
    cv2.imshow('Gray',   gray)

    key = cv2.waitKey(1) & 0xFF
    if key == 27 or key == ord('q'):   # ESC 또는 q키
        break

    frame_count += 1

cap.release()
cv2.destroyAllWindows()
print(f"총 {frame_count}프레임 처리 완료")`,
  },

  'cv-pixel-ops': {
    language: 'python', title: '화소 처리 — 밝기·대비·합성',
    description: '화소 밝기 변환, 명암 대비 조절, 영상 합성을 실습합니다.',
    code: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# 테스트용 그레이스케일 영상 생성
img = np.zeros((200, 256), dtype=np.uint8)
for x in range(256):
    img[:, x] = x   # 그라데이션 영상

print(f"원본 평균 밝기: {img.mean():.1f}")

# ─── 밝기 가감 연산 ────────────────────────────────
# 방법1: numpy (주의: uint8 오버플로우!)
bright_np = img + 50   # ← 위험! 255+50 = 49 (오버플로우)
print(f"np 덧셈 최댓값: {bright_np.max()} (← 오버플로우 발생!)")

# 방법2: cv2.add (포화 연산 - 안전)
bright_cv = cv2.add(img, np.full_like(img, 50))
print(f"cv2.add 최댓값: {bright_cv.max()} (← 255에서 클리핑)")

# 방법3: np.clip 사용
bright_clip = np.clip(img.astype(int) + 50, 0, 255).astype(np.uint8)
print(f"np.clip 최댓값: {bright_clip.max()}")

# ─── 명암 대비 조절 ────────────────────────────────
alpha = 2.0  # 대비 계수 (>1이면 대비 증가)
beta  = -60  # 밝기 오프셋
contrast = np.clip(alpha * img.astype(float) + beta, 0, 255).astype(np.uint8)
print(f"\n대비 향상 후 표준편차: {contrast.std():.1f} (원본: {img.std():.1f})")

# ─── 두 영상 합성 ─────────────────────────────────
img1 = np.zeros((100, 200, 3), dtype=np.uint8)
img2 = np.zeros((100, 200, 3), dtype=np.uint8)
img1[:, :100] = [255, 0, 0]   # 파란 왼쪽
img2[:, 100:] = [0, 255, 0]   # 초록 오른쪽

blended = cv2.addWeighted(img1, 0.6, img2, 0.4, 0)
print(f"\n합성 영상 평균: {blended.mean():.1f}")`,
  },

  'cv-histogram': {
    language: 'python', title: '히스토그램 계산 및 평활화',
    description: '히스토그램 계산, 시각화, equalizeHist로 대비 향상을 실습합니다.',
    code: `import cv2
import numpy as np
import matplotlib.pyplot as plt

# 어두운 테스트 영상 생성
img = np.random.randint(0, 100, (200, 200), dtype=np.uint8)
img += 10  # 밝기 오프셋

# ─── 히스토그램 계산 ───────────────────────────────
hist = cv2.calcHist([img], [0], None, [256], [0, 256])
print(f"히스토그램 shape: {hist.shape}")   # (256, 1)
print(f"가장 많은 밝기값: {hist.argmax()}")
print(f"그 빈도: {int(hist.max())}개")

# ─── 히스토그램 평활화 ─────────────────────────────
equ = cv2.equalizeHist(img)
print(f"\n원본  평균={img.mean():.1f}, 표준편차={img.std():.1f}")
print(f"평활화 평균={equ.mean():.1f}, 표준편차={equ.std():.1f}")

# ─── CLAHE (지역 적응형 평활화) ─────────────────────
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
clahe_result = clahe.apply(img)
print(f"CLAHE  평균={clahe_result.mean():.1f}, 표준편차={clahe_result.std():.1f}")

# 컬러 영상 히스토그램 (채널별)
color_img = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)
for i, color in enumerate(['b', 'g', 'r']):
    hist_c = cv2.calcHist([color_img], [i], None, [256], [0, 256])
    print(f"{color.upper()}채널 히스토그램 합계: {int(hist_c.sum())}")`,
  },

  'cv-color-space': {
    language: 'python', title: '컬러 공간 변환 및 색상 검출',
    description: 'BGR→HSV 변환 후 inRange로 특정 색상을 마스크로 추출합니다.',
    code: `import cv2
import numpy as np

# 테스트 영상 생성 (빨강, 초록, 파랑 영역)
img = np.zeros((200, 300, 3), dtype=np.uint8)
img[:, :100]   = [0, 0, 255]   # 빨간 영역 (BGR)
img[:, 100:200] = [0, 255, 0]  # 초록 영역
img[:, 200:]   = [255, 0, 0]   # 파란 영역

print("원본 BGR 영상 생성 완료")
print(f"픽셀[100,50] BGR: {img[100, 50]}")   # 빨간 영역

# ─── 컬러 공간 변환 ────────────────────────────────
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
hsv  = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
lab  = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

print(f"\nHSV 빨간 픽셀: {hsv[100, 50]}")   # H,S,V
print(f"HSV 초록 픽셀: {hsv[100, 150]}")
print(f"HSV 파란 픽셀: {hsv[100, 250]}")

# ─── 빨간색 마스크 추출 ────────────────────────────
# OpenCV에서 빨강은 두 범위로 나뉨 (0~10, 170~180)
lower_red1 = np.array([0,   100, 100])
upper_red1 = np.array([10,  255, 255])
lower_red2 = np.array([170, 100, 100])
upper_red2 = np.array([180, 255, 255])

mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
red_mask = cv2.bitwise_or(mask1, mask2)

# 마스크 적용
red_only = cv2.bitwise_and(img, img, mask=red_mask)
print(f"\n빨간색 마스크 픽셀 수: {cv2.countNonZero(red_mask)}")

# ─── 초록색 마스크 ────────────────────────────────
green_mask = cv2.inRange(hsv,
    np.array([40, 100, 100]),
    np.array([80, 255, 255]))
print(f"초록색 마스크 픽셀 수: {cv2.countNonZero(green_mask)}")`,
  },

  'cv-filtering': {
    language: 'python', title: '영상 필터링 — 블러·샤프닝·에지',
    description: '다양한 블러 필터와 에지 검출 필터를 적용하고 결과를 비교합니다.',
    code: `import cv2
import numpy as np

# 테스트 영상 (에지가 있는 패턴)
img = np.zeros((200, 300), dtype=np.uint8)
img[:100, :150] = 200   # 밝은 영역
img[100:, 150:] = 180   # 다른 밝기 영역
img += np.random.randint(0, 20, img.shape, dtype=np.uint8)  # 노이즈 추가

print("필터링 테스트 영상 준비 완료")
print(f"표준편차(노이즈 수준): {img.std():.2f}")

# ─── 블러링 ────────────────────────────────────────
avg_blur = cv2.blur(img, (5, 5))
gaus_blur = cv2.GaussianBlur(img, (5, 5), 0)
med_blur  = cv2.medianBlur(img, 5)

print(f"\n평균 블러 후 표준편차: {avg_blur.std():.2f}")
print(f"가우시안 블러 후:      {gaus_blur.std():.2f}")
print(f"미디언 블러 후:        {med_blur.std():.2f}")

# ─── 에지 검출 ─────────────────────────────────────
# Canny 에지
edges = cv2.Canny(gaus_blur, threshold1=50, threshold2=150)
edge_count = cv2.countNonZero(edges)
print(f"\nCanny 에지 픽셀 수: {edge_count}")

# Sobel
sobelX = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
sobelY = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
sobel_mag = cv2.magnitude(sobelX, sobelY)
print(f"Sobel 그래디언트 최댓값: {sobel_mag.max():.1f}")

# ─── 샤프닝 ────────────────────────────────────────
sharp_kernel = np.array([[0,-1,0],[-1,5,-1],[0,-1,0]])
sharpened = cv2.filter2D(img, -1, sharp_kernel)
print(f"\n샤프닝 후 표준편차: {sharpened.std():.2f} (원본: {img.std():.2f})")`,
  },

  'cv-morphology': {
    language: 'python', title: '모폴로지 연산',
    description: '침식·팽창·열림·닫힘을 이진 영상에 적용합니다.',
    code: `import cv2
import numpy as np

# 이진 테스트 영상 생성
binary = np.zeros((200, 300), dtype=np.uint8)
# 객체 그리기
cv2.rectangle(binary, (50, 50), (150, 150), 255, -1)
cv2.circle(binary, (220, 100), 60, 255, -1)
# 작은 잡음 추가
for _ in range(50):
    x, y = np.random.randint(0, 300), np.random.randint(0, 200)
    binary[y:y+3, x:x+3] = 255

print(f"원본 흰색 픽셀 수: {cv2.countNonZero(binary)}")

# ─── 구조 요소 생성 ───────────────────────────────
kernel_rect  = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
kernel_ellip = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
kernel_cross = cv2.getStructuringElement(cv2.MORPH_CROSS, (5, 5))

# ─── 기본 연산 ────────────────────────────────────
eroded  = cv2.erode(binary, kernel_rect)
dilated = cv2.dilate(binary, kernel_rect)

print(f"침식 후 흰색 픽셀: {cv2.countNonZero(eroded)}")
print(f"팽창 후 흰색 픽셀: {cv2.countNonZero(dilated)}")

# ─── 복합 연산 ────────────────────────────────────
opened = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel_rect)   # 침식→팽창
closed = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel_rect)  # 팽창→침식
gradient = cv2.morphologyEx(binary, cv2.MORPH_GRADIENT, kernel_rect)  # 팽창-침식

print(f"\n열림 후 흰색 픽셀: {cv2.countNonZero(opened)}  (잡음 제거)")
print(f"닫힘 후 흰색 픽셀: {cv2.countNonZero(closed)}  (구멍 채움)")
print(f"그래디언트(외곽선): {cv2.countNonZero(gradient)}")`,
  },

  'cv-geometric': {
    language: 'python', title: '기하학 변환 — 크기·회전·어파인·원근',
    description: '영상의 크기 변경, 회전, 어파인 변환, 원근 투시 변환을 실습합니다.',
    code: `import cv2
import numpy as np

# 테스트 영상 생성
img = np.zeros((300, 400, 3), dtype=np.uint8)
cv2.rectangle(img, (50,50), (200,200), (0,255,0), 3)
cv2.circle(img, (300, 150), 80, (0,0,255), 3)
cv2.putText(img, 'TEST', (100,270), cv2.FONT_HERSHEY_SIMPLEX, 2, (255,255,0), 3)

H, W = img.shape[:2]
print(f"원본 크기: {W}×{H}")

# ─── 크기 변경 ──────────────────────────────────
resized_half = cv2.resize(img, None, fx=0.5, fy=0.5,
                          interpolation=cv2.INTER_AREA)   # 축소
resized_2x   = cv2.resize(img, None, fx=2.0, fy=2.0,
                          interpolation=cv2.INTER_CUBIC)  # 확대
print(f"축소: {resized_half.shape[:2][::-1]} | 확대: {resized_2x.shape[:2][::-1]}")

# ─── 회전 ──────────────────────────────────────
cx, cy = W//2, H//2
M_rot = cv2.getRotationMatrix2D((cx, cy), 30, 1.0)  # 30도 회전
rotated = cv2.warpAffine(img, M_rot, (W, H))
print(f"회전 행렬:\\n{M_rot}")

# ─── 평행 이동 ─────────────────────────────────
M_trans = np.float32([[1, 0, 50], [0, 1, 30]])   # x+50, y+30
translated = cv2.warpAffine(img, M_trans, (W, H))

# ─── 어파인 변환 ───────────────────────────────
pts1 = np.float32([[50,50],[250,50],[50,200]])
pts2 = np.float32([[30,80],[250,60],[20,240]])
M_affine = cv2.getAffineTransform(pts1, pts2)
warped_affine = cv2.warpAffine(img, M_affine, (W, H))

# ─── 원근 투시 변환 ───────────────────────────
pts3 = np.float32([[0,0],[W,0],[0,H],[W,H]])
pts4 = np.float32([[50,50],[W-50,30],[30,H-50],[W-30,H-30]])
M_persp = cv2.getPerspectiveTransform(pts3, pts4)
warped_persp = cv2.warpPerspective(img, M_persp, (W, H))

print("기하학 변환 완료!")`,
  },

  'cv-fft': {
    language: 'python', title: '푸리에 변환 및 주파수 필터링',
    description: 'DFT로 영상을 주파수 영역으로 변환하고 저주파/고주파 필터링을 실습합니다.',
    code: `import cv2
import numpy as np

# 테스트 영상 (에지가 있는 패턴)
img = np.zeros((256, 256), dtype=np.uint8)
img[64:192, 64:192] = 200   # 중앙 밝은 사각형

# ─── DFT 변환 ──────────────────────────────────
f_complex = cv2.dft(np.float32(img), flags=cv2.DFT_COMPLEX_OUTPUT)
f_shift = np.fft.fftshift(f_complex)   # 저주파를 중앙으로

# 스펙트럼 시각화 (log 스케일)
magnitude = cv2.magnitude(f_shift[:,:,0], f_shift[:,:,1])
spectrum = 20 * np.log(magnitude + 1)
spectrum = cv2.normalize(spectrum, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
print(f"스펙트럼 shape: {spectrum.shape}")
print(f"스펙트럼 범위: {spectrum.min()}~{spectrum.max()}")

# ─── 저주파 통과 필터(LPF) ─────────────────────
rows, cols = img.shape
crow, ccol = rows//2, cols//2
D0 = 30   # 차단 주파수

mask = np.zeros((rows, cols, 2), np.float32)
cv2.circle(mask, (ccol, crow), D0, (1, 1, 1), -1)   # 원형 마스크

# 필터 적용 → 역변환
filtered_shift = f_shift * mask
f_ishift = np.fft.ifftshift(filtered_shift)
img_back = cv2.idft(f_ishift, flags=cv2.DFT_SCALE | cv2.DFT_REAL_OUTPUT)
img_back = cv2.normalize(img_back, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

print(f"\nLPF 결과 평균: {img_back.mean():.1f} (원본: {img.mean():.1f})")
print(f"LPF는 블러 효과 → 고주파(에지) 제거")

# 고주파 통과 필터 (HPF)
mask_hpf = 1 - mask   # LPF의 반대
filtered_hpf = f_shift * mask_hpf
f_ishift_hpf = np.fft.ifftshift(filtered_hpf)
img_hpf = cv2.idft(f_ishift_hpf, flags=cv2.DFT_SCALE | cv2.DFT_REAL_OUTPUT)
img_hpf = cv2.normalize(img_hpf, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)
print(f"HPF 결과 평균: {img_hpf.mean():.1f} (에지만 남음)")`,
  },

  'cv-hough': {
    language: 'python', title: '허프 변환 — 직선·원 검출',
    description: 'HoughLinesP로 직선을, HoughCircles로 원을 검출합니다.',
    code: `import cv2
import numpy as np

# 직선이 있는 테스트 영상 생성
img_line = np.zeros((300, 400, 3), dtype=np.uint8)
cv2.line(img_line, (50,50), (350,250), (255,255,255), 2)
cv2.line(img_line, (50,250), (350,50), (255,255,255), 2)
cv2.line(img_line, (0,150), (400,150), (255,255,255), 2)

gray_line = cv2.cvtColor(img_line, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray_line, 50, 150)

# ─── 허프 직선 검출 (확률적) ──────────────────────
lines = cv2.HoughLinesP(
    edges,
    rho=1,              # 거리 해상도 (픽셀)
    theta=np.pi/180,    # 각도 해상도 (라디안)
    threshold=100,      # 누적 임계값
    minLineLength=50,   # 최소 선분 길이
    maxLineGap=10       # 최대 끊김 허용
)
if lines is not None:
    print(f"검출된 직선 수: {len(lines)}")
    for line in lines:
        x1, y1, x2, y2 = line[0]
        length = np.sqrt((x2-x1)**2 + (y2-y1)**2)
        angle = np.degrees(np.arctan2(y2-y1, x2-x1))
        print(f"  ({x1},{y1}) → ({x2},{y2}), 길이={length:.1f}, 각도={angle:.1f}°")
        cv2.line(img_line, (x1,y1),(x2,y2), (0,255,0), 2)

# ─── 허프 원 검출 ─────────────────────────────────
img_circle = np.zeros((300, 300, 3), dtype=np.uint8)
cv2.circle(img_circle, (100, 100), 60, (255,255,255), 3)
cv2.circle(img_circle, (200, 200), 40, (255,255,255), 3)
gray_circle = cv2.cvtColor(img_circle, cv2.COLOR_BGR2GRAY)
gray_blur   = cv2.GaussianBlur(gray_circle, (9,9), 2)

circles = cv2.HoughCircles(
    gray_blur,
    cv2.HOUGH_GRADIENT,
    dp=1,
    minDist=50,      # 원 중심 간 최소 거리
    param1=50,       # Canny 상위 임계값
    param2=20,       # 누적 임계값
    minRadius=20,
    maxRadius=100
)
if circles is not None:
    circles = np.uint16(np.around(circles))
    print(f"\n검출된 원 수: {len(circles[0])}")
    for x, y, r in circles[0]:
        print(f"  중심=({x},{y}), 반지름={r}")`,
  },

  'cv-face-detect': {
    language: 'python', title: '하르 분류기 — 얼굴 검출',
    description: 'Haar Cascade로 얼굴과 눈을 실시간 검출합니다.',
    code: `import cv2
import numpy as np

# 하르 분류기 로드 (OpenCV 설치 시 포함됨)
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_eye.xml')

print("하르 분류기 로드 완료")
print(f"얼굴 분류기 비어있나: {face_cascade.empty()}")

# ─── 이미지에서 얼굴 검출 ──────────────────────────
# img = cv2.imread('face.jpg')
# 테스트용: 빈 영상에 사각형으로 얼굴 시뮬레이션
img = np.ones((300, 300, 3), dtype=np.uint8) * 200
cv2.circle(img, (150, 130), 80, (180,140,100), -1)  # 가상 얼굴 영역

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# detectMultiScale 파라미터
# scaleFactor: 이미지 피라미드 축소 비율 (1.1 = 10%)
# minNeighbors: 최소 이웃 사각형 수 (높을수록 엄격)
# minSize: 검출할 최소 크기
faces = face_cascade.detectMultiScale(
    gray,
    scaleFactor=1.1,
    minNeighbors=5,
    minSize=(30, 30)
)
print(f"\n검출된 얼굴 수: {len(faces)}")

for (x, y, w, h) in faces:
    cv2.rectangle(img, (x,y), (x+w, y+h), (255, 0, 0), 2)
    face_roi_gray = gray[y:y+h, x:x+w]
    face_roi_color = img[y:y+h, x:x+w]

    eyes = eye_cascade.detectMultiScale(face_roi_gray,
                                        scaleFactor=1.1,
                                        minNeighbors=5)
    print(f"  얼굴 ({x},{y}) {w}×{h}: 눈 {len(eyes)}개 검출")
    for (ex, ey, ew, eh) in eyes:
        cv2.rectangle(face_roi_color, (ex,ey),(ex+ew,ey+eh),(0,255,0),2)

# 웹캠 실시간 검출
# cap = cv2.VideoCapture(0)
# while True:
#     ret, frame = cap.read()
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     faces = face_cascade.detectMultiScale(gray, 1.1, 5)
#     for (x,y,w,h) in faces:
#         cv2.rectangle(frame, (x,y),(x+w,y+h),(255,0,0),2)
#     cv2.imshow('Face Detection', frame)
#     if cv2.waitKey(1) & 0xFF == 27: break
# cap.release()`,
  },

  'cv-coin-detect': {
    language: 'python', title: '동전 인식 — 허프 원 + 히스토그램',
    description: '허프 원 검출로 동전을 찾고 HSV 히스토그램으로 종류를 분류합니다.',
    code: `import cv2
import numpy as np

# ─── 동전 인식 파이프라인 ─────────────────────────
def detect_coins(img):
    """동전 검출 및 분류 함수"""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (9, 9), 2)

    # 허프 원 검출
    circles = cv2.HoughCircles(
        blurred, cv2.HOUGH_GRADIENT,
        dp=1, minDist=50,
        param1=50, param2=30,
        minRadius=15, maxRadius=60
    )

    if circles is None:
        return []

    coins = []
    circles = np.uint16(np.around(circles[0]))

    for (cx, cy, r) in circles:
        # ROI 추출
        x1 = max(0, cx-r); y1 = max(0, cy-r)
        x2 = min(img.shape[1], cx+r); y2 = min(img.shape[0], cy+r)
        roi = img[y1:y2, x1:x2].copy()

        if roi.size == 0:
            continue

        # 원형 마스크 적용
        mask = np.zeros(roi.shape[:2], dtype=np.uint8)
        cv2.circle(mask, (roi.shape[1]//2, roi.shape[0]//2),
                   r, 255, -1)
        roi_masked = cv2.bitwise_and(roi, roi, mask=mask)

        # HSV 히스토그램 계산
        hsv_roi = cv2.cvtColor(roi_masked, cv2.COLOR_BGR2HSV)
        hist = cv2.calcHist([hsv_roi], [0, 1], mask,
                            [18, 8], [0, 180, 0, 256])
        hist = cv2.normalize(hist, None).flatten()

        coins.append({
            'center': (int(cx), int(cy)),
            'radius': int(r),
            'hist': hist,
            'roi': roi
        })

    return coins

# 테스트 실행
test_img = np.random.randint(150, 220, (300, 400, 3), dtype=np.uint8)
# 가상 동전 그리기
for cx, cy, r in [(100,150,45),(200,150,35),(300,150,50)]:
    cv2.circle(test_img, (cx,cy), r, (200,180,100), -1)  # 금색
    cv2.circle(test_img, (cx,cy), r, (100,80,50), 2)

coins = detect_coins(test_img)
print(f"검출된 동전 수: {len(coins)}")
for i, coin in enumerate(coins):
    print(f"동전 {i+1}: 중심={coin['center']}, 반지름={coin['radius']}")`,
  },

  'cv-plate-detect': {
    language: 'python', title: '번호판 검출 — SVM + k-NN',
    description: 'SVM으로 번호판을 검출하고 k-NN으로 문자를 인식하는 파이프라인입니다.',
    code: `import cv2
import numpy as np

# ─── SVM 기반 번호판 검출 ──────────────────────────
def create_plate_svm():
    """번호판 분류 SVM 생성"""
    svm = cv2.ml.SVM_create()
    svm.setType(cv2.ml.SVM_C_SVC)
    svm.setKernel(cv2.ml.SVM_LINEAR)
    svm.setC(1.0)
    return svm

def extract_features(roi, size=(20, 10)):
    """번호판 후보 영상 특징 추출"""
    resized = cv2.resize(roi, size)
    gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY) if len(resized.shape)==3 else resized
    features = gray.flatten().astype(np.float32)
    return features

# ─── k-NN 기반 문자 인식 ──────────────────────────
def create_char_knn():
    """문자 인식 k-NN 생성"""
    knn = cv2.ml.KNearest_create()
    return knn

def recognize_char(knn, char_img, size=(20, 20)):
    """단일 문자 인식"""
    resized = cv2.resize(char_img, size).flatten().astype(np.float32)
    test_data = resized.reshape(1, -1)
    ret, result, neighbours, dist = knn.findNearest(test_data, k=3)
    return int(result[0][0])

# ─── 번호판 전처리 ────────────────────────────────
def preprocess_plate(plate_img):
    """번호판 영상 전처리"""
    gray = cv2.cvtColor(plate_img, cv2.COLOR_BGR2GRAY)
    # Otsu 이진화
    _, binary = cv2.threshold(gray, 0, 255,
                               cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    # 모폴로지 노이즈 제거
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    cleaned = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
    return cleaned

# ─── 전체 파이프라인 시뮬레이션 ────────────────────
print("번호판 검출 시스템 파이프라인")
print("="*40)
print("1. 입력 영상 → Canny 에지 검출")
print("2. findContours → 후보 영역 추출")
print("3. 가로:세로 비율 필터링 (번호판 비율)")
print("4. SVM 분류 → 번호판 여부 판별")
print("5. warpAffine → 번호판 기울기 보정")
print("6. Otsu 이진화 → 문자 분리")
print("7. findContours → 개별 문자 추출")
print("8. k-NN 분류 → 문자 인식")
print("9. 결과 출력")

# SVM 학습 시뮬레이션 (실제로는 수백~수천 장의 학습 영상 필요)
svm = create_plate_svm()
# 가상 학습 데이터 (실제: 번호판/비번호판 영상 특징)
train_data = np.random.randn(100, 200).astype(np.float32)
labels = np.array([1]*50 + [0]*50, dtype=np.int32)
svm.train(train_data, cv2.ml.ROW_SAMPLE, labels)

test_sample = np.random.randn(1, 200).astype(np.float32)
_, result = svm.predict(test_sample)
print(f"\nSVM 테스트 예측: {'번호판' if result[0][0]==1 else '비번호판'}")`,
  },
};
