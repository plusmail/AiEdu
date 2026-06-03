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

  /* ── 누락된 예제 (커리큘럼에서 참조되지만 미정의) ── */

  /* 5.1~5.4: 산술·채널·논리 연산 전용 */
  'cv-array-ops': {
    language: 'python', title: '배열 연산 — 산술·채널·논리 (5.1~5.4)',
    description: 'cv2.add/subtract 포화 연산, split/merge 채널 처리, bitwise 논리 연산을 실습합니다.',
    code: `import numpy as np
import cv2

# ─── 산술 연산 (chap05/04.arithmethic_op.py) ─────────────
m1 = np.full((3, 4), 10, np.uint8)
m2 = np.full((3, 4), 50, np.uint8)
mask = np.zeros(m1.shape, np.uint8)
mask[:, 2:] = 1                            # 오른쪽 절반 관심 영역

m_add1 = cv2.add(m1, m2)                   # 포화 덧셈 (0~255 클리핑)
m_add2 = cv2.add(m1, m2, mask=mask)        # 마스크 영역만 덧셈
m_div  = cv2.divide(m1.astype(np.float32), m2.astype(np.float32))

print("add(포화) =\\n", m_add1)
print("add(마스크) =\\n", m_add2)
print("divide =\\n", m_div)

# ─── 채널 처리 (chap05/02.mat_channel.py) ────────────────
img = np.zeros((100, 100, 3), np.uint8)
img[:50, :] = [255, 0, 0]   # 위: 파랑 (BGR)
img[50:, :] = [0, 0, 255]   # 아래: 빨강 (BGR)

b, g, r = cv2.split(img)                   # 채널 분리
zeros = np.zeros_like(b)
red_only  = cv2.merge([zeros, zeros, r])   # 빨강 채널만
blue_only = cv2.merge([b, zeros, zeros])   # 파랑 채널만

print("\\nB채널 max:", b.max(), " R채널 max:", r.max())

# ─── 비트 연산 (chap05/07.bitwise_op.py) ─────────────────
a = np.zeros((100, 100), np.uint8)
b_mat = a.copy()
cv2.circle(a, (50, 50), 40, 255, -1)            # 원
cv2.rectangle(b_mat, (0, 0, 50, 100), 255, -1)  # 왼쪽 사각형

print("\\nOR  픽셀수:", cv2.countNonZero(cv2.bitwise_or(a, b_mat)))
print("AND 픽셀수:", cv2.countNonZero(cv2.bitwise_and(a, b_mat)))
print("XOR 픽셀수:", cv2.countNonZero(cv2.bitwise_xor(a, b_mat)))

# ─── addWeighted 합성 (chap05/08.bitwise_overlap.py) ─────
img1 = np.zeros((100, 200, 3), np.uint8)
img2 = np.zeros((100, 200, 3), np.uint8)
img1[:, :100] = [255, 0, 0]   # 왼쪽 파랑
img2[:, 100:] = [0, 0, 255]   # 오른쪽 빨강
blended = cv2.addWeighted(img1, 0.6, img2, 0.4, 0)
print("\\n합성 영상 평균:", blended.mean().round(2))`,
  },

  /* 5.5~5.6: 통계·행렬 연산 전용 */
  'cv-stats-code': {
    language: 'python', title: '통계·행렬 연산 (5.5~5.6)',
    description: 'minMaxLoc·mean·meanStdDev·countNonZero 통계 함수와 gemm·transpose·determinant 행렬 연산을 실습합니다.',
    code: `import numpy as np
import cv2

# ─── minMaxLoc — 최솟·최댓값과 위치 (chap05/10.mat_min_max.py) ──
data = [10, 200, 5, 7, 9,
        15, 35,  60, 80, 170,
        100, 2,  55, 37, 70]
m = np.reshape(data, (3, 5))

min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(m)
print("행렬 m =\\n", m)
print(f"최솟값: {min_val}  위치(col,row): {min_loc}")
print(f"최댓값: {max_val}  위치(col,row): {max_loc}")
# ⚠️  minMaxLoc 반환 loc는 (x=col, y=row) 순서 — NumPy [row,col]과 반대!

# ─── mean / meanStdDev (chap05/12.sum_avg.py) ────────────
img_gray = np.random.randint(80, 180, (100, 100), dtype=np.uint8)

mean_val = cv2.mean(img_gray)              # (mean, 0, 0, 0) 채널별
mean_arr, std_arr = cv2.meanStdDev(img_gray)

print(f"\\ncv2.mean:       {mean_val[0]:.2f}")
print(f"meanStdDev mean: {mean_arr[0][0]:.2f}")
print(f"meanStdDev std:  {std_arr[0][0]:.2f}")
print(f"→ std 작으면 평탄한 영상, 크면 대비 높은 영상")

# ─── countNonZero (chap05에서 활용) ─────────────────────
_, binary = cv2.threshold(img_gray, 128, 255, cv2.THRESH_BINARY)
count = cv2.countNonZero(binary)
print(f"\\ncountNonZero: {count} / {binary.size} 픽셀")
print(f"비율: {count/binary.size*100:.1f}%")

# ─── sort / sortIdx (chap05/13.sort.py, 14.sortidx.py) ───
vec = np.array([30, 10, 50, 20, 40], np.float32).reshape(1, -1)
sorted_vec = cv2.sort(vec, cv2.SORT_EVERY_ROW | cv2.SORT_ASCENDING)
idx = cv2.sortIdx(vec, cv2.SORT_EVERY_ROW | cv2.SORT_ASCENDING)
print(f"\\n원본: {vec.flatten()}")
print(f"정렬: {sorted_vec.flatten()}")
print(f"인덱스: {idx.flatten()}")

# ─── gemm — 일반 행렬 곱 (chap05/17.mat_gemm.py) ────────
src1 = np.array([[1,2,3],[1,2,3]], np.float32)   # 2×3
src2 = np.array([[1,2,3],[4,5,6]], np.float32)   # 2×3
src3 = np.array([[1,2],[3,4],[5,6]], np.float32) # 3×2

# GEMM_2_T: src2 전치 후 곱 → (2×3)×(3×2) = (2×2)
dst1 = cv2.gemm(src1, src2, 1.0, None, 0.0, flags=cv2.GEMM_2_T)
dst2 = cv2.gemm(src1, src3, 1.0, None, 0.0)     # 일반 곱

print(f"\\nsrc1 × src2ᵀ =\\n{dst1}")
print(f"src1 × src3  =\\n{dst2}")

# ─── transpose / determinant / invert ────────────────────
A = np.array([[3, 8], [4, 6]], np.float64)
At = cv2.transpose(A)
det = cv2.determinant(A)
ret, inv = cv2.invert(A)

print(f"\\nA:\\n{A}")
print(f"Aᵀ:\\n{At}")
print(f"det(A): {det:.1f}  {'→ 역행렬 존재' if det!=0 else '→ 역행렬 없음'}")
if det != 0:
    print(f"A⁻¹:\\n{inv.round(4)}")`,
  },

  'cv-edge-detection': {
    language: 'python', title: '에지 검출 — Roberts·Sobel·Canny',
    description: 'Roberts, Prewitt, Sobel 필터와 OpenCV Canny 에지를 비교합니다.',
    code: `import numpy as np
import cv2

# 테스트용 에지 패턴 영상 생성
img = np.zeros((200, 300), np.uint8)
img[50:150, 50:250] = 200       # 밝은 사각형
img += np.random.randint(0, 10, img.shape, dtype=np.uint8)  # 약간의 노이즈

# ─── Roberts 에지 (chap07/03.edge_roberts.py 참조) ────────
roberts_x = np.array([[1, 0], [0, -1]], np.float32)
roberts_y = np.array([[0, 1], [-1, 0]], np.float32)
rx = cv2.filter2D(img.astype(np.float32), -1, roberts_x)
ry = cv2.filter2D(img.astype(np.float32), -1, roberts_y)
roberts = cv2.convertScaleAbs(rx) + cv2.convertScaleAbs(ry)
print(f"Roberts 에지 픽셀 수: {cv2.countNonZero(roberts > 20)}")

# ─── Sobel 에지 (chap07/05.edge_sobel.py 참조) ─────────────
sobelX = cv2.Sobel(np.float32(img), cv2.CV_32F, 1, 0, 3)  # 수직 마스크(x방향)
sobelY = cv2.Sobel(np.float32(img), cv2.CV_32F, 0, 1, 3)  # 수평 마스크(y방향)
sobel_x_abs = cv2.convertScaleAbs(sobelX)
sobel_y_abs = cv2.convertScaleAbs(sobelY)
sobel_combined = cv2.addWeighted(sobel_x_abs, 0.5, sobel_y_abs, 0.5, 0)
print(f"Sobel 에지 최댓값: {sobel_combined.max()}")

# ─── Laplacian 에지 (chap07/06.edge_laplacian.py 참조) ─────
lap = cv2.Laplacian(img, cv2.CV_64F, ksize=3)
lap_abs = cv2.convertScaleAbs(lap)
print(f"Laplacian 에지 최댓값: {lap_abs.max()}")

# ─── Canny 에지 (chap07/08.edge_canny.py 참조) ─────────────
gaus = cv2.GaussianBlur(img, (5, 5), 0.3)
Gx = cv2.Sobel(np.float32(gaus), cv2.CV_32F, 1, 0, 3)
Gy = cv2.Sobel(np.float32(gaus), cv2.CV_32F, 0, 1, 3)
sobel_mag = np.fabs(Gx) + np.fabs(Gy)

# OpenCV Canny 함수
canny = cv2.Canny(img, 100, 150)
print(f"Canny 에지 픽셀 수: {cv2.countNonZero(canny)}")

# ─── 에지 비교 출력 ────────────────────────────────────────
print("\\n--- 에지 검출 결과 비교 ---")
print(f"Roberts:    {cv2.countNonZero(roberts > 20):5d} 픽셀")
print(f"Sobel:      {cv2.countNonZero(sobel_combined > 20):5d} 픽셀")
print(f"Laplacian:  {cv2.countNonZero(lap_abs > 20):5d} 픽셀")
print(f"Canny:      {cv2.countNonZero(canny):5d} 픽셀")`,
  },

  'cv-paint-app': {
    language: 'python', title: '그림판 프로그램 — 마우스 이벤트 기반',
    description: '마우스 이벤트로 그림판을 구현합니다. 로컬/Colab 환경에서 실행 가능합니다.',
    code: `import numpy as np
import cv2

# ─── 그림판 상태 변수 (chap11/05.PaintCV.py 참조) ───────────
# 도구 모드
DRAW_RECT   = 0
DRAW_CIRCLE = 1
DRAW_ELLIPSE = 2
DRAW_LINE   = 3
DRAW_BRUSH  = 4
ERASE       = 5

# 전역 상태
canvas = np.ones((500, 700, 3), np.uint8) * 255   # 흰 캔버스
color  = (0, 0, 0)       # 그리기 색상 (BGR 검정)
thickness = 3
draw_mode = DRAW_BRUSH
pt1, pt2 = (0, 0), (0, 0)
mouse_mode = 0            # 0=대기, 1=버튼UP, 2=버튼DOWN, 3=드래그

def on_mouse(event, x, y, flags, param):
    global pt1, pt2, mouse_mode

    if event == cv2.EVENT_LBUTTONDOWN:
        pt1 = (x, y)
        mouse_mode = 2                              # 버튼 누름

    elif event == cv2.EVENT_MOUSEMOVE and mouse_mode >= 2:
        pt2 = (x, y)
        mouse_mode = 3                              # 드래그

    elif event == cv2.EVENT_LBUTTONUP:
        pt2 = (x, y)
        mouse_mode = 1                              # 버튼 뗌

def draw(image, c):
    global pt1, pt2, draw_mode, thickness

    if draw_mode == DRAW_RECT:
        cv2.rectangle(image, pt1, pt2, c, thickness)

    elif draw_mode == DRAW_LINE:
        cv2.line(image, pt1, pt2, c, thickness)

    elif draw_mode == DRAW_BRUSH:
        cv2.line(image, pt1, pt2, c, thickness * 3)
        pt1 = pt2                                   # 브러시: 시작점 갱신

    elif draw_mode == ERASE:
        cv2.line(image, pt1, pt2, (255, 255, 255), thickness * 6)
        pt1 = pt2

    elif draw_mode == DRAW_CIRCLE:
        d = np.subtract(pt1, pt2)
        r = int(np.sqrt(d[0]**2 + d[1]**2))
        cv2.circle(image, pt1, r, c, thickness)

    elif draw_mode == DRAW_ELLIPSE:
        cx = abs(pt1[0] + pt2[0]) // 2
        cy = abs(pt1[1] + pt2[1]) // 2
        ax = abs(pt1[0] - pt2[0]) // 2
        ay = abs(pt1[1] - pt2[1]) // 2
        cv2.ellipse(image, (cx, cy), (ax, ay), 0, 0, 360, c, thickness)

    cv2.imshow("PaintCV", image)

# ─── 메인 루프 ───────────────────────────────────────────
cv2.namedWindow("PaintCV")
cv2.setMouseCallback("PaintCV", on_mouse)
cv2.imshow("PaintCV", canvas)

print("단축키: b=브러시, l=직선, r=사각형, c=원, e=지우개, ESC=종료")

while True:
    if mouse_mode == 1:                   # 버튼 뗌 → 원본에 그리기
        draw(canvas, color)
        mouse_mode = 0
    elif mouse_mode == 3:                 # 드래그 → 임시 미리보기
        if draw_mode in (DRAW_BRUSH, ERASE):
            draw(canvas, color)
        else:
            draw(np.copy(canvas), (150, 150, 150))  # 회색 미리보기

    key = cv2.waitKey(30) & 0xFF
    if key == 27: break                   # ESC 종료
    elif key == ord('b'): draw_mode = DRAW_BRUSH;   print("모드: 브러시")
    elif key == ord('l'): draw_mode = DRAW_LINE;    print("모드: 직선")
    elif key == ord('r'): draw_mode = DRAW_RECT;    print("모드: 사각형")
    elif key == ord('c'): draw_mode = DRAW_CIRCLE;  print("모드: 원")
    elif key == ord('e'): draw_mode = ERASE;        print("모드: 지우개")

cv2.destroyAllWindows()`,
  },

  /* ── 챕터별 교재 소스 코드 실습 ── */

  'cv-ch02-src': {
    language: 'python', title: 'Ch 02 실습 — Hello OpenCV',
    description: '교재 chap02 예제: Python 첫 실행, NumPy 배열로 영상 생성 및 화면 출력.',
    code: `# ─────────────────────────────────────────────
# 01.hello.py — 파이썬 첫 실행
# ─────────────────────────────────────────────
print("hello")

# ─────────────────────────────────────────────
# 02.opencvtest.py — OpenCV 첫 번째 프로그램
# ─────────────────────────────────────────────
import numpy as np
import cv2

# NumPy 배열로 200×200 그레이스케일 영상 생성
# shape = (행=Height, 열=Width), dtype=uint8 (0~255)
image = np.zeros((300, 400), np.uint8)
image.fill(200)                     # 모든 픽셀을 200(밝은 회색)으로 채우기
# 또는: image[:] = 200

print("영상 shape:", image.shape)   # (300, 400)
print("영상 dtype:", image.dtype)   # uint8
print("픽셀 최솟값:", image.min())
print("픽셀 최댓값:", image.max())

# 윈도우에 표시 (로컬 환경에서만 작동)
cv2.imshow("Window title", image)
cv2.waitKey(0)                      # 키 입력 대기 (0=무한대기)
cv2.destroyAllWindows()`,
  },

  'cv-ch03-src': {
    language: 'python', title: 'Ch 03 실습 — 파이썬·NumPy 기초',
    description: '교재 chap03 예제: 변수 자료형, NumPy 배열 생성·연산·형태 변환.',
    code: `# ─────────────────────────────────────────────
# 01.variable.py — 변수와 자료형
# ─────────────────────────────────────────────
variable1 = 100                             # 정수
variable2 = 3.14                            # 실수
variable4 = 1.2 + 3.4j                      # 복소수
variable5 = 'This is Python'                # 문자열
variable6 = True                            # bool
variable7 = float(variable1)               # int → float 변환
variable8 = int(variable2)                 # float → int 변환 (소수점 버림)

print('variable1 =', variable1, type(variable1))
print('variable2 =', variable2, type(variable2))
print('variable7 =', variable7, type(variable7))
print('variable8 =', variable8, type(variable8))

# ─────────────────────────────────────────────
# 11.numpy.py — NumPy 기본 연산
# ─────────────────────────────────────────────
import numpy as np

list1, list2 = [1, 2, 3], [4, 5.0, 6]
a, b = np.array(list1), np.array(list2)

print('\\na =', a, '  dtype:', a.dtype)
print('b =', b, '  dtype:', b.dtype)
print('a + b =', a + b)
print('a * b =', a * b)
print('a * 2 =', a * 2)

# ─────────────────────────────────────────────
# 12.numpy2.py — 배열 생성 함수
# ─────────────────────────────────────────────
a = np.zeros((2, 5), np.int32)             # 영행렬
b = np.ones((3, 1), np.uint8)              # 1로 채운 행렬
d = np.full(5, 15, np.float32)             # 특정 값으로 채운 행렬

print('\\nzeros(2,5):\\n', a)
print('ones(3,1):\\n', b)
print('full(5, 15):', d)

# ─────────────────────────────────────────────
# 13.numpy3.py — 난수 생성 및 형태 변환
# ─────────────────────────────────────────────
np.random.seed(10)
a = np.random.rand(2, 3)                   # 0.0~1.0 균등분포
d = np.random.randint(1, 100, 6)           # 1~99 정수 난수
d = d.reshape(2, -1)                       # 형태 변환: (6,) → (2,3)

print('\\nrand(2,3):\\n', a)
print('randint reshape(2,-1):\\n', d)
print('flatten:', d.flatten())             # 1차원으로 변환`,
  },

  'cv-ch04-src': {
    language: 'python', title: 'Ch 04 실습 — OpenCV 인터페이스',
    description: '교재 chap04 예제: 윈도우·이벤트·그리기·영상 읽기·카메라·보간법.',
    code: `import numpy as np
import cv2

# ─────────────────────────────────────────────
# 03.event_key.py — 키보드 이벤트
# ─────────────────────────────────────────────
# switch-case를 딕셔너리로 구현
switch_case = {
    ord('a'): "a키 입력",
    ord('b'): "b키 입력",
    0x41: "A키 입력",
    27: "ESC 키 입력",
}
print("키보드 이벤트 딕셔너리:", switch_case)

# ─────────────────────────────────────────────
# 04.event_mouse.py — 마우스 콜백 패턴
# ─────────────────────────────────────────────
def onMouse(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        print(f"왼쪽 클릭: ({x}, {y})")
    elif event == cv2.EVENT_RBUTTONDOWN:
        print(f"오른쪽 클릭: ({x}, {y})")
    elif event == cv2.EVENT_LBUTTONDBLCLK:
        print(f"더블 클릭: ({x}, {y})")

# ─────────────────────────────────────────────
# 07.draw_line_rect.py — 그리기 함수
# ─────────────────────────────────────────────
blue, green, red = (255, 0, 0), (0, 255, 0), (0, 0, 255)
canvas = np.ones((400, 600, 3), np.uint8) * 255   # 흰 배경

pt1, pt2 = (50, 50), (250, 150)
pt3, pt4 = (400, 150), (500, 50)

cv2.line(canvas, pt1, pt2, red)                            # 빨간 선
cv2.line(canvas, pt3, pt4, green, 3, cv2.LINE_AA)          # 안티앨리어싱 선
cv2.rectangle(canvas, pt1, pt2, blue, 3, cv2.LINE_4)       # 사각형
cv2.rectangle(canvas, (400, 200, 100, 100), green, cv2.FILLED)  # 채운 사각형
cv2.circle(canvas, (100, 300), 60, red, -1)                # 채운 원
cv2.putText(canvas, 'OpenCV Draw', (50, 370),
            cv2.FONT_HERSHEY_SIMPLEX, 1.0, (50, 50, 50), 2)

print("그리기 완료 — 캔버스 shape:", canvas.shape)

# ─────────────────────────────────────────────
# 12.read_image1.py — 영상 읽기 및 정보 출력
# ─────────────────────────────────────────────
def print_matInfo(name, image):
    dtype_map = {'uint8':'CV_8U','int8':'CV_8S','uint16':'CV_16U',
                 'int16':'CV_16S','float32':'CV_32F','float64':'CV_64F'}
    mat_type = dtype_map.get(str(image.dtype), '?')
    nchannel = 3 if image.ndim == 3 else 1
    print(f"{name:12s}: depth({image.dtype}), ch({nchannel}) → {mat_type}C{nchannel}")

# 영상 파일이 있을 때:
# gray2gray  = cv2.imread("images/read_gray.jpg", cv2.IMREAD_GRAYSCALE)
# gray2color = cv2.imread("images/read_gray.jpg", cv2.IMREAD_COLOR)

# 테스트용 영상 생성
gray2gray  = np.random.randint(0, 256, (300, 400), dtype=np.uint8)
gray2color = cv2.cvtColor(gray2gray, cv2.COLOR_GRAY2BGR)

print_matInfo("gray2gray",  gray2gray)
print_matInfo("gray2color", gray2color)
print("픽셀 [100,100]:", gray2gray[100, 100], gray2color[100, 100])

# ─────────────────────────────────────────────
# 22.interpolation.py — 보간법 비교
# ─────────────────────────────────────────────
# 작은 영상을 크게 확대할 때 보간법 비교
small = np.random.randint(0, 256, (50, 50), dtype=np.uint8)

nearest = cv2.resize(small, (200, 200), interpolation=cv2.INTER_NEAREST)
linear  = cv2.resize(small, (200, 200), interpolation=cv2.INTER_LINEAR)
cubic   = cv2.resize(small, (200, 200), interpolation=cv2.INTER_CUBIC)

print(f"\\n최근접: {nearest.shape}, 값 차이: {abs(nearest.astype(int)-linear.astype(int)).mean():.2f}")
print(f"양선형: {linear.shape}")
print(f"3차회선: {cubic.shape}")`,
  },

  'cv-ch05-src': {
    language: 'python', title: 'Ch 05 실습 — OpenCV 기본 배열 연산',
    description: '교재 chap05 예제: flip·repeat·transpose, 채널 처리, 산술·비트 연산, 행렬 통계.',
    code: `import numpy as np
import cv2

# ─────────────────────────────────────────────
# 01.mat_array.py — flip·repeat·transpose
# ─────────────────────────────────────────────
image = np.arange(12, dtype=np.uint8).reshape(3, 4) * 20
print("원본:\\n", image)

x_axis  = cv2.flip(image, 0)   # 상하 반전
y_axis  = cv2.flip(image, 1)   # 좌우 반전
xy_axis = cv2.flip(image, -1)  # 상하+좌우 반전
rep_img = cv2.repeat(image, 1, 2)  # 가로 2번 반복
trans   = cv2.transpose(image)     # 전치 (행↔열)

print("x_axis(상하반전):\\n", x_axis)
print("y_axis(좌우반전):\\n", y_axis)
print("repeat(1×2):\\n", rep_img)
print("transpose:\\n", trans)

# ─────────────────────────────────────────────
# 02.mat_channel.py — 채널 분리·병합
# ─────────────────────────────────────────────
color_img = np.zeros((100, 100, 3), np.uint8)
color_img[:50, :] = [255, 0, 0]   # 위: 파랑
color_img[50:, :] = [0, 0, 255]   # 아래: 빨강

b, g, r = cv2.split(color_img)
zeros = np.zeros_like(b)

blue_only = cv2.merge([b, zeros, zeros])
red_only  = cv2.merge([zeros, zeros, r])

print("\\nB채널 max:", b.max(), "R채널 max:", r.max())

# ─────────────────────────────────────────────
# 04.arithmethic_op.py — 산술 연산
# ─────────────────────────────────────────────
m1 = np.full((3, 6), 10, np.uint8)
m2 = np.full((3, 6), 50, np.uint8)
mask = np.zeros(m1.shape, np.uint8)
mask[:, 3:] = 1                              # 오른쪽 절반 마스크

m_add1 = cv2.add(m1, m2)                     # 포화 덧셈
m_add2 = cv2.add(m1, m2, mask=mask)          # 마스크 영역만
m1f    = m1.astype(np.float32)
m2f    = np.float32(m2)
m_div  = cv2.divide(m1f, m2f)               # 소수 부분 보존

print("\\nadd(포화)  [0,0]:", m_add1[0,0], "  add(마스크)[0,5]:", m_add2[0,5])
print("divide(float) [0,0]:", m_div[0,0])

# ─────────────────────────────────────────────
# 07.bitwise_op.py — 논리 연산
# ─────────────────────────────────────────────
img1 = np.zeros((200, 200), np.uint8)
img2 = img1.copy()
cv2.circle(img1, (100, 100), 80, 255, -1)
cv2.rectangle(img2, (0, 0), (100, 200), 255, -1)

print("\\nOR  흰색픽셀:", cv2.countNonZero(cv2.bitwise_or(img1, img2)))
print("AND 흰색픽셀:", cv2.countNonZero(cv2.bitwise_and(img1, img2)))
print("XOR 흰색픽셀:", cv2.countNonZero(cv2.bitwise_xor(img1, img2)))

# ─────────────────────────────────────────────
# 10.mat_min_max.py — 통계 함수
# ─────────────────────────────────────────────
data = [10,200,5,7,9, 15,35,60,80,170, 100,2,55,37,70]
m = np.reshape(data, (3, 5))
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(m)
print(f"\\nm:\\n{m}")
print(f"최솟값: {min_val} @ {min_loc}   최댓값: {max_val} @ {max_loc}")

mean, std = cv2.meanStdDev(m.astype(np.float64))
print(f"평균: {mean.flatten()[0]:.2f}   표준편차: {std.flatten()[0]:.2f}")

# ─────────────────────────────────────────────
# 17.mat_gemm.py — 행렬 곱
# ─────────────────────────────────────────────
src1 = np.array([[1,2,3],[1,2,3]], np.float32)       # 2×3
src2 = np.array([[1,2,3],[4,5,6]], np.float32)       # 2×3
src3 = np.array([[1,2],[3,4],[5,6]], np.float32)     # 3×2

dst1 = cv2.gemm(src1, src2, 1.0, None, 1.0, flags=cv2.GEMM_1_T)  # src1^T * src2
dst2 = cv2.gemm(src1, src3, 1.0, None, 1.0)                      # src1 * src3
print("\\nsrc1^T * src2:\\n", dst1)
print("src1 * src3:\\n", dst2)`,
  },

  'cv-ch06-src': {
    language: 'python', title: 'Ch 06 실습 — 화소 처리',
    description: '교재 chap06 예제: 화소 접근, 밝기·대비, 히스토그램, HSV 컬러 공간, 색상 검출.',
    code: `import numpy as np
import cv2

# ─────────────────────────────────────────────
# 04.bright_dark.py — 밝기 조절
# ─────────────────────────────────────────────
# 영상 생성 (실제에서는 cv2.imread 사용)
image = np.random.randint(80, 160, (200, 300), dtype=np.uint8)

# OpenCV 함수: 포화 연산 (255 초과 → 255 유지)
dst1 = cv2.add(image, 100)       # 밝게 (saturation 방식)
dst2 = cv2.subtract(image, 100)  # 어둡게

# NumPy 연산: modulo 방식 (255 초과 → 0부터 다시)
dst3 = image + 100               # 위험! 오버플로우 발생
dst4 = image - 100               # 위험! 언더플로우 발생

print("원본 평균:", image.mean().round(1))
print("cv2.add +100 최댓값:", dst1.max(), " (255 클리핑)")
print("numpy +100 최댓값:", dst3.max(), " (오버플로우!)")

# ─────────────────────────────────────────────
# 06.contrast.py — 명암 대비
# ─────────────────────────────────────────────
gray = np.random.randint(100, 150, (200, 200), dtype=np.uint8)
alpha = 2.0   # 대비 계수
beta  = -60   # 밝기 오프셋

contrast = np.clip(alpha * gray.astype(float) + beta, 0, 255).astype(np.uint8)
print(f"\\n원본: 평균={gray.mean():.1f}, std={gray.std():.1f}")
print(f"대비향상: 평균={contrast.mean():.1f}, std={contrast.std():.1f}")

# ─────────────────────────────────────────────
# 07.calc_histogram.py — 히스토그램 계산
# ─────────────────────────────────────────────
img_gray = np.random.randint(0, 100, (200, 200), dtype=np.uint8)  # 어두운 영상

hist = cv2.calcHist([img_gray], [0], None, [256], [0, 256])
print(f"\\n히스토그램 shape: {hist.shape}")
print(f"가장 많은 밝기값: {hist.argmax()}, 빈도: {int(hist.max())}픽셀")

# 히스토그램 평활화
equ = cv2.equalizeHist(img_gray)
print(f"원본  std: {img_gray.std():.1f}")
print(f"평활화 std: {equ.std():.1f}  (대비 향상)")

# CLAHE - 지역 적응형 평활화
clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
clahe_result = clahe.apply(img_gray)
print(f"CLAHE  std: {clahe_result.std():.1f}")

# ─────────────────────────────────────────────
# 15.convert_hsv.py — 컬러 공간 변환
# ─────────────────────────────────────────────
# BGR 영상 생성
bgr_img = np.zeros((200, 300, 3), np.uint8)
bgr_img[:, :100]   = [0, 0, 255]    # 빨강 영역
bgr_img[:, 100:200] = [0, 255, 0]   # 초록 영역
bgr_img[:, 200:]   = [255, 0, 0]    # 파랑 영역

hsv = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2HSV)
lab = cv2.cvtColor(bgr_img, cv2.COLOR_BGR2LAB)

print("\\nHSV 빨강픽셀:", hsv[100, 50])    # [H, S, V]
print("HSV 초록픽셀:", hsv[100, 150])
print("HSV 파랑픽셀:", hsv[100, 250])

# ─────────────────────────────────────────────
# 17.hue_threshold.py — 색상 범위 이진화
# ─────────────────────────────────────────────
# Hue 범위로 색상 검출
hue = hsv[:, :, 0]   # H 채널 (0~180)

# 초록색 Hue 범위: ~40~80
_, result = cv2.threshold(hue, 80, 255, cv2.THRESH_TOZERO_INV)
cv2.threshold(result, 40, 255, cv2.THRESH_BINARY, result)

print(f"\\n초록색 마스크 픽셀 수: {cv2.countNonZero(result)}")
print(f"전체 픽셀 수: {bgr_img.shape[0]*bgr_img.shape[1]}")`,
  },

  'cv-ch07-src': {
    language: 'python', title: 'Ch 07 실습 — 영역 처리(필터링·모폴로지)',
    description: '교재 chap07 예제: 블러링, Sobel·Canny 에지, 침식·팽창·열림·닫힘.',
    code: `import numpy as np
import cv2

# ─────────────────────────────────────────────
# 01.blurring.py — 회선(Convolution) 블러링
# ─────────────────────────────────────────────
image = np.zeros((200, 300), np.uint8)
image[60:140, 60:240] = 200
image += np.random.randint(0, 20, image.shape, dtype=np.uint8)  # 노이즈

# 사용자 정의 블러링 마스크
mask = np.full((3, 3), 1/9, np.float32)
blur_custom = cv2.filter2D(image, -1, mask)            # 직접 회선

# OpenCV 블러링 함수들
blur_avg  = cv2.blur(image, (5, 5))
blur_gaus = cv2.GaussianBlur(image, (5, 5), 0)
blur_med  = cv2.medianBlur(image, 5)

print("평균 블러 std:", blur_avg.std().round(2))
print("가우시안 std:", blur_gaus.std().round(2))
print("미디언  std:", blur_med.std().round(2))

# ─────────────────────────────────────────────
# 02.sharpening.py — 언샤프 마스크 샤프닝
# ─────────────────────────────────────────────
blurred = cv2.GaussianBlur(image, (5, 5), 0)
# 언샤프 마스크: 원본×1.5 - 블러×0.5
sharp_unsharp = cv2.addWeighted(image, 1.5, blurred, -0.5, 0)

# 라플라시안 커널 샤프닝
lap_kernel = np.array([[0,-1,0],[-1,5,-1],[0,-1,0]])
sharp_lap = cv2.filter2D(image, -1, lap_kernel)

print("\\n원본  std:", image.std().round(2))
print("언샤프 std:", sharp_unsharp.std().round(2))
print("라플라시안 std:", sharp_lap.std().round(2))

# ─────────────────────────────────────────────
# 05.edge_sobel.py — Sobel 에지
# ─────────────────────────────────────────────
sobelX = cv2.Sobel(np.float32(image), cv2.CV_32F, 1, 0, 3)  # x방향 수직마스크
sobelY = cv2.Sobel(np.float32(image), cv2.CV_32F, 0, 1, 3)  # y방향 수평마스크
sobel_abs_x = cv2.convertScaleAbs(sobelX)
sobel_abs_y = cv2.convertScaleAbs(sobelY)
print(f"\\nSobel-X 최댓값: {sobelX.max():.1f}")
print(f"Sobel-Y 최댓값: {sobelY.max():.1f}")

# ─────────────────────────────────────────────
# 08.edge_canny.py — Canny 에지 (4단계 처리)
# ─────────────────────────────────────────────
gaus_img = cv2.GaussianBlur(image, (5, 5), 0.3)   # ① 노이즈 제거

# ② Sobel 그래디언트 계산
Gx = cv2.Sobel(np.float32(gaus_img), cv2.CV_32F, 1, 0, 3)
Gy = cv2.Sobel(np.float32(gaus_img), cv2.CV_32F, 0, 1, 3)
sobel_mag = np.fabs(Gx) + np.fabs(Gy)

# OpenCV Canny: ③ NMS + ④ 이력 임계값 자동 처리
canny2 = cv2.Canny(image, 100, 150)
print(f"Canny 에지 픽셀 수: {cv2.countNonZero(canny2)}")

# ─────────────────────────────────────────────
# 14.erode.py — 침식 연산
# ─────────────────────────────────────────────
binary = np.zeros((200, 300), np.uint8)
cv2.rectangle(binary, (30, 30), (150, 150), 255, -1)
cv2.circle(binary, (230, 100), 60, 255, -1)
# 작은 잡음 추가
for _ in range(30):
    x, y = np.random.randint(0,300), np.random.randint(0,200)
    binary[y:y+3, x:x+3] = 255

mask_morph = np.array([[0,1,0],[1,1,1],[0,1,0]], np.uint8)   # 십자 구조요소
_, th_img = cv2.threshold(binary, 128, 255, cv2.THRESH_BINARY)

eroded  = cv2.erode(th_img, mask_morph)
dilated = cv2.dilate(th_img, mask_morph)
opened  = cv2.morphologyEx(th_img, cv2.MORPH_OPEN, mask_morph)   # 침식→팽창
closed  = cv2.morphologyEx(th_img, cv2.MORPH_CLOSE, mask_morph)  # 팽창→침식

print(f"\\n원본  흰색: {cv2.countNonZero(th_img)}")
print(f"침식  흰색: {cv2.countNonZero(eroded)}  (객체 축소)")
print(f"팽창  흰색: {cv2.countNonZero(dilated)} (객체 확장)")
print(f"열림  흰색: {cv2.countNonZero(opened)}  (잡음 제거)")
print(f"닫힘  흰색: {cv2.countNonZero(closed)}  (구멍 채움)")`,
  },

  'cv-ch08-src': {
    language: 'python', title: 'Ch 08 실습 — 기하학 변환',
    description: '교재 chap08 예제: 크기 변경(순방향·역방향), 회전, 어파인, 원근 투시 변환.',
    code: `import numpy as np
import cv2

# ─────────────────────────────────────────────
# 01.scaling.py — 크기 변경 (순방향 사상)
# ─────────────────────────────────────────────
image = np.zeros((200, 300), np.uint8)
cv2.circle(image, (150, 100), 80, 200, -1)
cv2.rectangle(image, (20, 20), (100, 80), 150, 3)

# 순방향 사상: 입력→출력 좌표 계산 (빈 픽셀 발생 가능)
def scaling_forward(img, size):
    dst = np.zeros(size[::-1], img.dtype)
    rY, rX = np.divide(size[::-1], img.shape[:2])
    for y in range(img.shape[0]):
        for x in range(img.shape[1]):
            i, j = int(y * rY), int(x * rX)
            if i < dst.shape[0] and j < dst.shape[1]:
                dst[i, j] = img[y, x]
    return dst

# OpenCV resize (역방향 사상 + 보간법)
dst_nearest = cv2.resize(image, (150, 100), interpolation=cv2.INTER_NEAREST)
dst_linear  = cv2.resize(image, (150, 100), interpolation=cv2.INTER_LINEAR)
dst_area    = cv2.resize(image, (150, 100), interpolation=cv2.INTER_AREA)

print("원본:", image.shape, "→ resize:", dst_linear.shape)
print("NEAREST 평균:", dst_nearest.mean().round(2))
print("LINEAR  평균:", dst_linear.mean().round(2))

# ─────────────────────────────────────────────
# 04.translate.py — 평행 이동
# ─────────────────────────────────────────────
H, W = image.shape[:2]
tx, ty = 50, 30                                    # x로 50, y로 30 이동
M_trans = np.float32([[1, 0, tx], [0, 1, ty]])     # 이동 행렬
translated = cv2.warpAffine(image, M_trans, (W, H))
print(f"\\n평행이동 행렬:\\n{M_trans}")

# ─────────────────────────────────────────────
# 05.rotate.py / 06.rotate2.py — 회전
# ─────────────────────────────────────────────
cx, cy = W // 2, H // 2
M_rot = cv2.getRotationMatrix2D((cx, cy), 30, 1.0)  # 중심 기준 30도 회전
rotated = cv2.warpAffine(image, M_rot, (W, H))
print(f"회전 행렬(30도):\\n{M_rot.round(3)}")

# ─────────────────────────────────────────────
# 07.affine_transform.py — 어파인 변환 (3점 대응)
# ─────────────────────────────────────────────
pts1 = np.float32([[30, 70], [20, 240], [300, 110]])  # 원본 3점
pts2 = np.float32([[120, 20], [10, 180], [280, 260]]) # 목적 3점
aff_mat = cv2.getAffineTransform(pts1, pts2)
dst_affine = cv2.warpAffine(image, aff_mat, (W, H), cv2.INTER_LINEAR)
print(f"\\n어파인 행렬:\\n{aff_mat.round(3)}")

# ─────────────────────────────────────────────
# 10.perspective_transform.py — 원근 투시 변환 (4점 대응)
# ─────────────────────────────────────────────
pts3 = np.float32([[10, 10], [W-10, 10], [10, H-10], [W-10, H-10]])
pts4 = np.float32([[30, 40], [W-20, 20], [20, H-30], [W-40, H-20]])
persp_mat = cv2.getPerspectiveTransform(pts3, pts4)
dst_persp = cv2.warpPerspective(image, persp_mat, (W, H), cv2.INTER_CUBIC)
print(f"원근 변환 행렬:\\n{persp_mat.round(3)}")

# 4개 좌표 동차 변환 검증
ones = np.ones((4, 1), np.float64)
pts3_h = np.append(pts3, ones, axis=1)
pts4_calc = (persp_mat @ pts3_h.T).T
for i in range(4):
    pts4_calc[i] /= pts4_calc[i, 2]
print(f"\\n원본→변환 좌표 검증: pts4[0]={pts4[0]} ≈ {pts4_calc[0,:2].round(1)}")`,
  },

  'cv-ch09-src': {
    language: 'python', title: 'Ch 09 실습 — 주파수 영역 처리',
    description: '교재 chap09 예제: 2D DFT/FFT, 저주파·고주파 필터링, DCT 압축.',
    code: `import numpy as np
import cv2

# ─────────────────────────────────────────────
# 04.2d_dft.py — 2차원 DFT 구현 이해
# ─────────────────────────────────────────────
# 테스트 영상 (64×64 사각형 패턴)
image = np.zeros((64, 64), np.uint8)
image[16:48, 16:48] = 200

# OpenCV DFT
dft = cv2.dft(np.float32(image), flags=cv2.DFT_COMPLEX_OUTPUT)
dft_shift = np.fft.fftshift(dft)           # 저주파를 중앙으로

# 스펙트럼 시각화용 (log 스케일)
mag = cv2.magnitude(dft_shift[:,:,0], dft_shift[:,:,1])
spectrum = 20 * np.log(mag + 1)
spectrum = cv2.normalize(spectrum, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

# IDFT 복원
idft = cv2.idft(dft, flags=cv2.DFT_SCALE | cv2.DFT_REAL_OUTPUT)
print("원본 vs 복원 차이(max):", abs(image.astype(float) - idft).max().round(3))
print("스펙트럼 shape:", spectrum.shape)

# ─────────────────────────────────────────────
# 05.2d_fft.py — NumPy FFT와 OpenCV DFT 비교
# ─────────────────────────────────────────────
# NumPy FFT (더 빠름)
dft_np = np.fft.fft2(image)
dft_np_shift = np.fft.fftshift(dft_np)
mag_np = np.abs(dft_np_shift)
print(f"\\nNumPy FFT shape: {dft_np.shape}")
print(f"OpenCV DFT shape: {dft.shape}")  # (H, W, 2) - 실수/허수 채널

# ─────────────────────────────────────────────
# 06.FFT_filtering1.py — 저주파/고주파 필터링
# ─────────────────────────────────────────────
rows, cols = image.shape
cy, cx = rows // 2, cols // 2

# 저주파 통과 필터 마스크 (원형)
lowpass  = np.zeros((rows, cols, 2), np.float32)
highpass = np.ones((rows, cols, 2), np.float32)
cv2.circle(lowpass,  (cx, cy), 10, (1, 1), -1)   # 중앙 원 = LPF
cv2.circle(highpass, (cx, cy), 10, (0, 0), -1)   # 중앙 제거 = HPF

lp_dft = dft_shift * lowpass
hp_dft = dft_shift * highpass

# 역변환
def idft_from_shift(shifted):
    unshifted = np.fft.ifftshift(shifted)
    result = cv2.idft(unshifted, flags=cv2.DFT_SCALE | cv2.DFT_REAL_OUTPUT)
    return cv2.normalize(result, None, 0, 255, cv2.NORM_MINMAX).astype(np.uint8)

lp_img = idft_from_shift(lp_dft)
hp_img = idft_from_shift(hp_dft)

print(f"\\nLPF 결과 평균: {lp_img.mean():.1f} (블러 효과)")
print(f"HPF 결과 평균: {hp_img.mean():.1f} (에지만 남음)")

# ─────────────────────────────────────────────
# 09.dct.py — DCT (JPEG 압축 원리)
# ─────────────────────────────────────────────
# 8×8 블록 DCT (JPEG의 핵심 연산)
block = np.zeros((8, 8), np.uint8)
cv2.randn(block, 128, 50)    # 난수 8×8 블록

dct4  = cv2.dct(block.astype("float32"))         # OpenCV DCT
idct4 = cv2.dct(dct4, flags=cv2.DCT_INVERSE)    # 역DCT 복원

# 고주파 계수 제거 후 복원 (압축 시뮬레이션)
dct_compressed = dct4.copy()
dct_compressed[4:, :] = 0    # 고주파(아래쪽) 계수 제거
dct_compressed[:, 4:] = 0
idct_compressed = cv2.dct(dct_compressed, flags=cv2.DCT_INVERSE)

error = abs(block.astype(float) - idct_compressed)
print(f"\\n원본 블록[0,:4]: {block[0,:4]}")
print(f"완전복원[0,:4]:  {idct4[0,:4].astype(int)}")
print(f"압축복원[0,:4]:  {idct_compressed[0,:4].astype(int)}")
print(f"압축 오류 평균: {error.mean():.2f}")`,
  },

  'cv-ch10-src': {
    language: 'python', title: 'Ch 10 실습 — 영상 분할 및 특징 처리',
    description: '교재 chap10 예제: 허프 직선·원 검출, 해리스 코너, k-NN 분류, 영상 워핑.',
    code: `import numpy as np
import cv2

# ─────────────────────────────────────────────
# 01.hough_lines.py — 허프 직선 검출
# ─────────────────────────────────────────────
# 직선이 있는 테스트 영상
img_line = np.zeros((300, 400, 3), np.uint8)
cv2.line(img_line, (50, 50),  (350, 250), (255,255,255), 2)
cv2.line(img_line, (50, 250), (350, 50),  (255,255,255), 2)
cv2.line(img_line, (0, 150),  (400, 150), (255,255,255), 2)

gray  = cv2.cvtColor(img_line, cv2.COLOR_BGR2GRAY)
canny = cv2.Canny(gray, 50, 150)

# 확률적 허프 직선 (선분 직접 반환)
lines = cv2.HoughLinesP(canny, rho=1, theta=np.pi/180,
                         threshold=80, minLineLength=40, maxLineGap=10)

if lines is not None:
    print(f"검출된 직선 수: {len(lines)}")
    for line in lines:
        x1, y1, x2, y2 = line[0]
        length = np.sqrt((x2-x1)**2 + (y2-y1)**2)
        angle  = np.degrees(np.arctan2(y2-y1, x2-x1))
        print(f"  ({x1},{y1})→({x2},{y2}), 길이={length:.1f}, 각도={angle:.1f}°")

# ─────────────────────────────────────────────
# 03.harris_detect.py — 해리스 코너 검출
# ─────────────────────────────────────────────
corner_img = np.zeros((200, 200, 3), np.uint8)
cv2.rectangle(corner_img, (30, 30), (170, 170), (255,255,255), 2)  # 사각형
cv2.rectangle(corner_img, (60, 60), (140, 140), (128,128,128), 2)  # 안쪽 사각형

gray_c = cv2.cvtColor(corner_img, cv2.COLOR_BGR2GRAY).astype(np.float32)
harris = cv2.cornerHarris(gray_c, blockSize=4, ksize=3, k=0.04)

# 임계값 이상인 코너 표시
threshold = 0.01 * harris.max()
corner_count = np.sum(harris > threshold)
print(f"\\n해리스 코너 수: {corner_count}")
print(f"최대 응답값: {harris.max():.2f}")

# ─────────────────────────────────────────────
# 04.kNN_exam.py — k-NN 분류기
# ─────────────────────────────────────────────
nsample = 50
traindata = np.zeros((nsample*2, 2), np.float32)
label = np.zeros((nsample*2, 1), np.float32)

# 두 그룹 학습 데이터 생성
cv2.randn(traindata[:nsample], 150, 30)    # 그룹0: 평균(150,150)
cv2.randn(traindata[nsample:], 250, 60)   # 그룹1: 평균(250,250)
label[:nsample] = 0
label[nsample:] = 1

K = 7
knn = cv2.ml.KNearest_create()
knn.train(traindata, cv2.ml.ROW_SAMPLE, label)

# 테스트 포인트 분류
test_pts = np.array([[150, 150], [250, 250], [200, 200]], np.float32)
ret, resp, neig, dist = knn.findNearest(test_pts, K)

print(f"\\nk-NN (K={K}) 분류 결과:")
for i, (pt, cls) in enumerate(zip(test_pts, resp)):
    print(f"  테스트점 {tuple(pt.astype(int))} → 클래스 {int(cls[0])}")

# ─────────────────────────────────────────────
# 08.warping.py — 영상 워핑 (수평 왜곡)
# ─────────────────────────────────────────────
# 단순 워핑 예시: 열 위치를 비율에 따라 이동
warp_src = np.zeros((100, 200), np.uint8)
cv2.rectangle(warp_src, (20, 20), (180, 80), 200, -1)

# 각 열을 오프셋으로 이동 시뮬레이션
warp_dst = np.zeros_like(warp_src)
pivot_x = 100
for y in range(warp_src.shape[0]):
    for x in range(warp_src.shape[1]):
        ratio = x / pivot_x if x < pivot_x else (200 - x) / (200 - pivot_x)
        dx = int(x + ratio * 20)   # 최대 20픽셀 오프셋
        if 0 <= dx < 200:
            warp_dst[y, dx] = warp_src[y, x]

print(f"\\n워핑 전 흰 픽셀: {cv2.countNonZero(warp_src)}")
print(f"워핑 후 흰 픽셀: {cv2.countNonZero(warp_dst)}")`,
  },

  'cv-ch11-src': {
    language: 'python', title: 'Ch 11 실습 — 응용 사례 I (그림판·얼굴검출)',
    description: '교재 chap11 예제: 아이콘 배치, 그림판 구조, 하르 분류기 얼굴·눈 검출.',
    code: `import numpy as np
import cv2

# ─────────────────────────────────────────────
# 01.place_icons.py — 아이콘 배치 (그림판 메뉴)
# ─────────────────────────────────────────────
def place_icons_demo(image, icon_size=(60, 60)):
    """아이콘 위치 계산 (2열 배치)"""
    icon_names = ["rect", "circle", "eclipse", "line", "brush", "eraser",
                  "open", "save", "plus", "minus", "clear", "color"]
    w, h = icon_size
    icons = []
    for i, name in enumerate(icon_names):
        col, row = i % 2, i // 2
        x, y = col * w * 2, row * h * 2
        # 아이콘 영역 표시
        cv2.rectangle(image, (x, y), (x + w, y + h), (180, 180, 180), -1)
        cv2.rectangle(image, (x, y), (x + w, y + h), (100, 100, 100), 1)
        cv2.putText(image, name[:4], (x+3, y+35),
                    cv2.FONT_HERSHEY_PLAIN, 0.8, (0,0,0), 1)
        icons.append((x, y, w, h))
    return icons

canvas = np.full((500, 800, 3), 255, np.uint8)
icons = place_icons_demo(canvas)
print(f"배치된 아이콘 수: {len(icons)}")
print(f"첫 번째 아이콘 위치: {icons[0]}")

# ─────────────────────────────────────────────
# 05.PaintCV.py — 그림판 핵심 구조
# ─────────────────────────────────────────────
DRAW_RECT    = 0
DRAW_CIRCLE  = 1
DRAW_ECLIPSE = 2
DRAW_LINE    = 3
DRAW_BRUSH   = 4
ERASE        = 5

draw_mode = DRAW_BRUSH
thickness = 3
Color = (0, 0, 0)
pt1 = pt2 = (0, 0)
mouse_mode = 0

def draw(image, color=(200, 200, 200)):
    """도구별 그리기 함수"""
    global draw_mode, thickness, pt1, pt2

    if draw_mode == DRAW_RECT:
        cv2.rectangle(image, pt1, pt2, color, thickness)
    elif draw_mode == DRAW_LINE:
        cv2.line(image, pt1, pt2, color, thickness)
    elif draw_mode == DRAW_BRUSH:
        cv2.line(image, pt1, pt2, color, thickness * 3)
        pt1 = pt2                              # 브러시: 연속선
    elif draw_mode == ERASE:
        cv2.line(image, pt1, pt2, (255,255,255), thickness * 5)
        pt1 = pt2
    elif draw_mode == DRAW_CIRCLE:
        d = np.subtract(pt1, pt2)
        r = int(np.sqrt(d[0]**2 + d[1]**2))
        cv2.circle(image, pt1, r, color, thickness)
    elif draw_mode == DRAW_ECLIPSE:
        cx = abs(pt1[0]+pt2[0]) // 2
        cy = abs(pt1[1]+pt2[1]) // 2
        ax = abs(pt1[0]-pt2[0]) // 2
        ay = abs(pt1[1]-pt2[1]) // 2
        cv2.ellipse(image, (cx,cy), (ax,ay), 0, 0, 360, color, thickness)

print("그림판 도구:", {0:"사각형",1:"원",2:"타원",3:"직선",4:"브러시",5:"지우개"})

# ─────────────────────────────────────────────
# 06.detect_face.py — 하르 분류기 얼굴·눈 검출
# ─────────────────────────────────────────────
# 하르 XML 분류기 로드
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade  = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_eye.xml')

print(f"\\n얼굴 분류기 로드 성공: {not face_cascade.empty()}")
print(f"눈 분류기 로드 성공: {not eye_cascade.empty()}")

# 실제 영상 파일이 있을 때:
# image = cv2.imread('images/face/34.jpg', cv2.IMREAD_COLOR)
# gray  = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
# gray  = cv2.equalizeHist(gray)   # 히스토그램 평활화

# detectMultiScale 파라미터 설명
print("""
detectMultiScale 주요 파라미터:
  scaleFactor=1.1   : 이미지 피라미드 축소 비율 (10%)
  minNeighbors=2    : 최소 이웃 사각형 수 (높을수록 엄격)
  minSize=(100,100) : 검출할 최소 얼굴 크기

faces = face_cascade.detectMultiScale(gray, 1.1, 2, 0, (100, 100))
for (x, y, w, h) in faces:
    face_roi = image[y:y+h, x:x+w]
    eyes = eye_cascade.detectMultiScale(face_roi, 1.15, 7)
    for (ex, ey, ew, eh) in eyes:
        center = (x+ex+ew//2, y+ey+eh//2)
        cv2.circle(image, center, 10, (0,255,0), 2)
""")

# ─────────────────────────────────────────────
# 09.gender_classifier.py — 성별 분류 개요
# ─────────────────────────────────────────────
print("""
성별 분류 처리 흐름:
1. 얼굴 검출 → 얼굴 ROI 추출
2. 눈 검출 → 기울기 보정(어파인 변환)
3. 머리/입술 영역 관심구역 설정
4. 각 ROI의 HSV 히스토그램 계산
5. cv2.compareHist()로 남/녀 기준 히스토그램과 유사도 비교
6. 가장 유사한 클래스(남성/여성)로 분류

히스토그램 비교 방법:
  sim = cv2.compareHist(hist1, hist2, cv2.HISTCMP_CORREL)  # 상관계수
  sim = cv2.compareHist(hist1, hist2, cv2.HISTCMP_BHATTACHARYYA)
""")`,
  },

  'cv-ch12-src': {
    language: 'python', title: 'Ch 12 실습 — 응용 사례 II (동전·번호판 인식)',
    description: '교재 chap12 예제: 허프 원 동전 검출, HSV 히스토그램 분류, SVM 번호판, k-NN 문자 인식.',
    code: `import numpy as np
import cv2

# ─────────────────────────────────────────────
# 01.find_coins.py + 03.calc_coins.py — 동전 인식
# ─────────────────────────────────────────────
def preprocessing_coins(img):
    """동전 영상 전처리"""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (9, 9), 2)
    _, th = cv2.threshold(blur, 0, 255,
                          cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    return th

def find_coins(th_img):
    """허프 원으로 동전 검출 → (중심, 반지름) 목록 반환"""
    circles = cv2.HoughCircles(
        th_img, cv2.HOUGH_GRADIENT,
        dp=1, minDist=50, param1=50, param2=30,
        minRadius=20, maxRadius=80)
    if circles is None:
        return []
    circles = np.uint16(np.around(circles[0]))
    return [(tuple(c[:2]), c[2]) for c in circles]  # [(center, radius), ...]

def calc_histo_hue(coin_roi):
    """동전 ROI의 Hue 채널 히스토그램"""
    hsv = cv2.cvtColor(coin_roi, cv2.COLOR_BGR2HSV)
    hist = cv2.calcHist([hsv], [0], None, [18], [0, 180])
    return cv2.normalize(hist, None).flatten()

# 동전 인식 파이프라인 시뮬레이션
test_img = np.random.randint(150, 220, (300, 500, 3), dtype=np.uint8)
# 가상 동전 그리기 (크기: 10원=작음, 100원=중간, 500원=큰)
coin_specs = [(100, 150, 30), (200, 150, 40), (330, 150, 50), (430, 150, 35)]
for cx, cy, r in coin_specs:
    cv2.circle(test_img, (cx, cy), r, (200, 180, 100), -1)
    cv2.circle(test_img, (cx, cy), r, (100,  80,  50),  2)

gray = cv2.cvtColor(test_img, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (9, 9), 2)
circles = cv2.HoughCircles(blur, cv2.HOUGH_GRADIENT,
                           dp=1, minDist=50, param1=50, param2=20,
                           minRadius=20, maxRadius=60)

if circles is not None:
    circles = np.uint16(np.around(circles[0]))
    print(f"검출된 동전 수: {len(circles)}")
    for i, (cx, cy, r) in enumerate(circles):
        print(f"  동전{i+1}: 중심=({cx},{cy}), 반지름={r}")

# ─────────────────────────────────────────────
# 04.train_plate_data.py / 07.classify_plates.py — 번호판 SVM
# ─────────────────────────────────────────────
# SVM 모델 생성 및 학습
svm = cv2.ml.SVM_create()
svm.setType(cv2.ml.SVM_C_SVC)
svm.setKernel(cv2.ml.SVM_LINEAR)
svm.setC(1.0)

# 가상 학습 데이터 (실제: 번호판/비번호판 200×10 특징 벡터)
FEAT_DIM = 200
train_data = np.random.randn(100, FEAT_DIM).astype(np.float32)
labels = np.array([1]*50 + [0]*50, dtype=np.int32)   # 1=번호판, 0=아님
svm.train(train_data, cv2.ml.ROW_SAMPLE, labels)

# 예측
test = np.random.randn(3, FEAT_DIM).astype(np.float32)
_, preds = svm.predict(test)
print(f"\\nSVM 번호판 분류 예측: {['번호판' if p==1 else '비번호판' for p in preds.flatten()]}")

# ─────────────────────────────────────────────
# 08.classify_number.py — k-NN 문자 인식
# ─────────────────────────────────────────────
CHAR_SIZE = (20, 20)   # 문자 정규화 크기

def recognize_char(knn_model, char_img):
    """개별 문자 이미지 → 클래스 예측"""
    gray = cv2.cvtColor(char_img, cv2.COLOR_BGR2GRAY) if char_img.ndim==3 else char_img
    resized  = cv2.resize(gray, CHAR_SIZE)
    features = resized.flatten().astype(np.float32).reshape(1, -1)
    _, result, _, _ = knn_model.findNearest(features, k=3)
    return int(result[0][0])

# k-NN 모델 학습 (실제: MNIST 또는 직접 촬영한 번호판 숫자 데이터)
knn = cv2.ml.KNearest_create()
SAMPLES = 500
char_data   = np.random.randn(SAMPLES, CHAR_SIZE[0]*CHAR_SIZE[1]).astype(np.float32)
char_labels = np.random.randint(0, 10, (SAMPLES, 1)).astype(np.float32)  # 0~9 숫자
knn.train(char_data, cv2.ml.ROW_SAMPLE, char_labels)

# 번호판 문자 인식 흐름
print("""
번호판 문자 인식 파이프라인:
1. SVM으로 번호판 영역 검출
2. warpAffine으로 기울기 보정
3. Otsu 이진화로 문자 분리
4. findContours로 개별 문자 추출
5. 각 문자를 20×20으로 정규화
6. k-NN(k=3)으로 문자 클래스 예측
""")

# 테스트 문자 인식
test_char = np.random.randn(1, CHAR_SIZE[0]*CHAR_SIZE[1]).astype(np.float32)
_, result, _, dist = knn.findNearest(test_char, k=3)
print(f"예측 문자: {int(result[0][0])}, 거리: {dist[0].mean():.2f}")`,
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
