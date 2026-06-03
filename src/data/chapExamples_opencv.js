// 자동 생성: OpenCV 교재 챕터별 전체 예제 소스
// 각 챕터의 모든 .py 파일을 포함합니다.

export const chapExamples = {

  'chap02': [
    {
      id: 'chap02-01-hello',
      filename: '01.hello.py',
      title: 'hello',
      code: `print("hello")


`,
    },
    {
      id: 'chap02-02-opencvtest',
      filename: '02.opencvtest.py',
      title: 'opencvtest',
      code: `import numpy as np
import cv2

image = np.zeros((300, 400), np.uint8)
image.fill(200)                     # 혹은 image[:] = 200

cv2.imshow("Window title", image)
cv2.waitKey(0)
cv2.destroyAllWindows()`,
    },
  ],

  'chap03': [
    {
      id: 'chap03-01-variable',
      filename: '01.variable.py',
      title: 'variable',
      code: `'''# 01.variable.py - 변수의 자료형'''
variable1 = 100                             # 정수 변수 선언
variable2 = 3.14                            # 실수 변수 선언
variable3 = -200                            # 정수 변수 선언
variable4 = 1.2 + 3.4j                      # 복소수 변수 선언
variable5 = 'This is Python'                # 문자열 변수 선언

variable6 = True                            # bool 변수 선언
variable7 = float(variable1)                # 자료형 변경
variable8 = int(variable2)                  # 자료형 변경

print('variable1 =' , variable1, type(variable1))   # 변수의 값과 자료형 출력
print('variable2 =' , variable2, type(variable2))
print('variable3 =' , variable3, type(variable3))
print('variable4 =' , variable4, type(variable4))
print('variable5 =' , variable5, type(variable5))
print('variable6 =' , variable6, type(variable6))
print('variable7 =' , variable7, type(variable7))   # 실수로 변경되어 소수점 표시됨
print('variable8 =' , variable8, type(variable8))   # 정수로 변경되어 소수점이하 소실`,
    },
    {
      id: 'chap03-02-list',
      filename: '02.list.py',
      title: 'list',
      code: `list1 = [1, 2, 3, 4]
list2 = [1, 1.5, 'a', 'a', '문자열']
tuple1 = (1,2)
tuple2 = (1, 1.5, 'b', 'b', '문자열' )
dict1 = { 'name': '배종욱', 'email': 'daum.net' }
set1, set2 = set(list2), set(tuple2)           # 한 행에 두 개 변수 선언

list1[0] = 5
list2.insert(3, 'b')                    # 원소 삽입
# tuple1[0] = 5                         # 에러 발생 - 튜플은 원소 변경불가
dict1['email'] = 'naver.com'            # 킷값으로 접근

print('list1', list1, type(list1))
print('list2', list2, type(list2))
print('tuple1', tuple1, type(tuple1))
print('dict1', dict1, type(dict1))
print('set1', set1, type(set1))
print('set2', set2, type(set2))
print('insection', set1 & set2 )        # 교집합`,
    },
    {
      id: 'chap03-03-command_line',
      filename: '03.command_line.py',
      title: 'command line',
      code: `title = '서기 1년 1월 1일부터 ' \\
        '오늘까지 ' \\
        '일수 구하기 '                       # 3행에 걸쳐 작성 → 1개 논리적 명령행
months = [31, 28, 31, 30, 31, 30,
          31, 31, 30, 31, 30, 31]
year, month = 2020, 1                       # 여러개 변수 한행에 선언
day = 7; ratio = 365.2425                   # 2개 논리적 명령행

days = (year -1) * ratio + \\
       sum(months[:month-1]) + day

print(title), print(' - 년:', year ), print(' - 월:', month)
print(' - 일:', day); print(' * 일수 총합:', int(days))
`,
    },
    {
      id: 'chap03-04-slice_operate',
      filename: '04.slice_operate.py',
      title: 'slice operate',
      code: `a = [0,1,2,3,4,5,6,7,8,9]
print('a = ' , a)
print('a[:2] ->', a[:2])
print('a[4:-1] ->', a[4:-1])
print('a[2::2] ->', a[2::2])
print('a[::-1] ->', a[::-1])
print('a[1::-1] ->', a[1::-1])                  # 첫 2개 원소 역순 – 자주 사용됨
print('a[7:1:-2] ->',a[7:1:-2])                 # 7~2 범위 2씩 감소 – 역순
print('a[:-4:-1] ->', a[:-4:-1])                # 9~7 범위 1씩 감소 – 역순

`,
    },
    {
      id: 'chap03-05-if',
      filename: '05.if.py',
      title: 'if',
      code: `year = 2020

if (year%4==0) and (year % 100 != 0):
    print(year, '는 윤년입니다.')
elif year%400==0:
    print(year , '는 윤년입니다.')
else:
    print(year , '는 윤년이 아닙니다.')`,
    },
    {
      id: 'chap03-06-while',
      filename: '06.while.py',
      title: 'while',
      code: `n=3
while n>=0:
    m = input("Enter a interger: ")
    if int(m)==0: break                         # while 문 벗어남
    n = n - 1                                   # 1씩 감소
else:
    print('4 inputs.')`,
    },
    {
      id: 'chap03-07-for',
      filename: '07.for.py',
      title: 'for',
      code: `kor = [70, 80 ,90, 40, 50]							# 리스트 선언
eng = [90, 80 ,70, 70, 60]
sum1, sum2, sum3, sum4 = 0, 0, 0, 0				    # 누적 변수 초기화

for i in range(0, 5):								# range() 함수로 범위지정
    sum1 = sum1 + kor[i] + eng[i]

for k in kor:										# 리스트 원소 순회
    sum2 = sum2 + k
for e in eng:
    sum2 = sum2 + e

for i, k in enumerate(kor):							# 리스트의 인덱스와 원소로 순회
    sum3 = sum3 + k + eng[i]

for k, e in zip(kor, eng):							# 여러 객체 동시 순회
    sum4 = sum4 + k + e

print ('sum1=', sum1), print ('sum2=', sum2)
print ('sum3=', sum3), print ('sum4=', sum4)`,
    },
    {
      id: 'chap03-08-def',
      filename: '08.def.py',
      title: 'def',
      code: `def calc_area(type, a, b, c = None):
    if type == 1 :                      # 사격형
        result = a * b
        msg = '사각형'
    elif type == 2:                     # 삼각형
        result = a * b / 2
        msg = '삼각형'
    elif type == 3:                     # 평행사변형
        result = (a + b) * c / 2
        msg = '평행사변형'
    return result, msg                  # 반환값 – 2개 반환하면 튜플 반환

def say():
    print ('넓이를 구해요')

def write(result, msg):
    print ( msg,' 넓이는 ', result , '㎡ 입니다.')

say()                                   # 함수 호출 – 인수&반환값 없음
ret = calc_area(type=1, a=5, b=5)		# 함수 호출 – 튜플 반환
area, msg = calc_area(2, 5, 5)			# 함수 호출 – 튜플을 각 원소별로 반환
area2, _ = calc_area(3, 10, 7, 5)		# 함수 호출 – 반환 받을 원소만 지정

print(type(ret))
print(type(area),type(msg) )
write(ret[0], ret[1])
write(area, msg)
write(area2, '평행사변형' )

`,
    },
    {
      id: 'chap03-09-module',
      filename: '09.module.py',
      title: 'module',
      code: `import chap03.header_area as mod
from chap03.header_area import write

mod.say()                                       # 함수 호출 – 인수없음, 반환값 없음
ret = mod.calc_area(type=1, a=5, b=5)			# 함수 호출 – 튜플 반환
write(ret[0], ret[1])


`,
    },
    {
      id: 'chap03-10-inner_fuction',
      filename: '10.inner_fuction.py',
      title: 'inner fuction',
      code: `a = [1.5, 2, 3, 4, 5]
b = map(float, a)
c = divmod(5, 3)

print('최댓값:', max(a) ,'최솟값:' , min(a) )
print( '몫과 나머지:' , c )
print( 'c의 자료형:', type(c), type(c[0]), type(c[1]) )

print('2의 4제곱:', pow(2, 4) )
print('절댓값:', abs(-4) )`,
    },
    {
      id: 'chap03-11-numpy',
      filename: '11.numpy.py',
      title: 'numpy',
      code: `import numpy as np

list1, list2 = [1, 2, 3] , [4, 5.0, 6]
a, b = np.array(list1), np.array(list2)

c = a + b
d = a - b
e = a * b
f = a / b
g = a * 2
h = b + 2

print('a 자료형:', type(a), type(a[0]))
print('b 자료형:', type(b), type(b[0]))
print('c 자료형:', type(c), type(c[0]))
print('g 자료형:', type(g), type(g[0]))
print(c, d, e)
print(f, g, h)`,
    },
    {
      id: 'chap03-12-numpy2',
      filename: '12.numpy2.py',
      title: 'numpy2',
      code: `import numpy as np

a = np.zeros((2,5), np.int)
b = np.ones((3,1), np.uint8)
c = np.empty((1,5), np.float)
d = np.full(5, 15, np.float32)

print(type(a), type(a[0]), type(a[0][0]))
print(type(b), type(b[0]), type(b[0][0]))
print(type(c), type(c[0]), type(c[0][0]))
print(type(d), type(d[0]) )
print('c 형태:', c.shape, '   d 형태:', d.shape)
print(a), print(b)
print(c), print(d)`,
    },
    {
      id: 'chap03-13-numpy3',
      filename: '13.numpy3.py',
      title: 'numpy3',
      code: `import numpy as np

np.random.seed(10)
a = np.random.rand(2, 3)
b = np.random.randn(3, 2)
c = np.random.rand(6)
d = np.random.randint(1, 100, 6)
c = np.reshape(c, (2, 3))              # 형태(shape) 변경 방법1
d = d.reshape(2,-1)                    # 형태(shape) 변경 방법2

print('a 형태:', a.shape, '\\n',  a)
print('b 형태:', b.shape, '\\n', b)
print('c 형태:', c.shape, '\\n', c)
print('d 형태:', d.shape, '\\n', d)

print('다차원 객체 1차원 변환 방법' )
print('a =', a.flatten())                   # 다차원 ndarray 객체를 1차원 벡터로 변환
print('b =', np.ravel(b))                   # 다차원 모든 객체를 1차원 벡터로 변환
print('c =', np.reshape(c, (-1,)))          # 넘파이의 reshape() 함수 사용
print('d =', d.reshape(-1, ))               # ndarray 객체 내장 reshape() 함수 사용

`,
    },
    {
      id: 'chap03-header_area',
      filename: 'header_area.py',
      title: 'header area',
      code: `def calc_area(type, a, b, c = None):
    if type == 1 :                      # 사격형
        result = a * b
        msg = '사각형'
    elif type == 2:                     # 삼각형
        result = a * b / 2
        msg = '삼각형'
    elif type == 3:                     # 평행사변형
        result = (a + b) * c / 2
        msg = '평행사변형'
    return result, msg

def say():
    print ('넓이를 구해요')

def write(result, msg):
    print ( msg,' 넓이는 ', result , ' ㎡ 입니다.')`,
    },
  ],

  'chap04': [
    {
      id: 'chap04-01-move_window',
      filename: '01.move_window.py',
      title: 'move window',
      code: `import numpy as np
import cv2

image = np.zeros((200, 400), np.uint8)
image[:] = 200                                  # 흰색 바탕

title1, title2 = 'Position1', 'Position2'		# 윈도우 이름
cv2.namedWindow(title1, cv2.WINDOW_AUTOSIZE)
cv2.namedWindow(title2)
cv2.moveWindow(title1, 150, 150)                # 윈도우 이동
cv2.moveWindow(title2, 400, 50)

cv2.imshow(title1, image)                       # 행렬 원소를 영상으로 표시
cv2.imshow(title2, image)
cv2.waitKey(0)                                  # 키 이벤트(key event) 대기
cv2.destroyAllWindows()`,
    },
    {
      id: 'chap04-02-resize_window',
      filename: '02.resize_window.py',
      title: 'resize window',
      code: `import numpy as np
import cv2

image = np.zeros((200, 300), np.uint8)
image.fill(255)                                 # 모든 원소에 255(흰색) 지정

title1, title2 = 'AUTOSIZE', 'NORMAL'           # 윈도우 이름
cv2.namedWindow(title1, cv2.WINDOW_AUTOSIZE)
cv2.namedWindow(title2, cv2.WINDOW_NORMAL)

cv2.imshow(title1, image)
cv2.imshow(title2, image)
cv2.resizeWindow(title1, 400, 300)
cv2.resizeWindow(title2, 400, 300)
cv2.waitKey(0)
cv2.destroyAllWindows()                         # 열린 모든 윈도우 제거`,
    },
    {
      id: 'chap04-03-event_key',
      filename: '03.event_key.py',
      title: 'event key',
      code: `import numpy as np
import cv2

## switch case문을 사전(dictionary)으로 구현
switch_case = {
	ord('a'): "a키 입력",               		# ord() 함수- 문자를 아스키코드로 변환
  	ord('b'): "b키 입력",
  0x41: "A키 입력",
  int('0x42', 16): "B키 입력",          		# 16진수인 0x42를 10진수로 변환하면 66임
  2424832: "왼쪽 화살표키 입력",      		    # 0x250000
  2490368: "윗쪽 화살표키 입력",      		    # 0x260000
  2555904: "오른쪽 화살표키 입력",    		    # 0x270000
  2621440: "아래쪽 화살표키 입력"        		# 0x280000
}

image = np.ones((200, 300), np.float)      	# 화소값이 1인 행렬 생성
cv2.namedWindow('Keyboard Event')			# 윈도우 이름
cv2.imshow('Keyboard Event', image)

while True:									# 무한 반복
    key = cv2.waitKeyEx(100)          		# 100ms 동안 키 이벤트 대기
    if key == 27: break                		# ESC 키 누르면 종료

    try:
        result = switch_case[key]
        print(result)
    except KeyError:
        result = -1

cv2.destroyAllWindows()                 	# 열린 모든 윈도우 제거`,
    },
    {
      id: 'chap04-04-event_mouse',
      filename: '04.event_mouse.py',
      title: 'event mouse',
      code: `import numpy as np
import cv2

# 콜백 함수 : event값에 따른 마우스 버튼 종류 구분  
def onMouse(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        print("마우스 왼쪽 버튼 누르기")
    elif event == cv2.EVENT_RBUTTONDOWN:
        print("마우스 오른쪽 버튼 누르기")
    elif event == cv2.EVENT_RBUTTONUP:
        print("마우스 오른쪽 버튼 떼기")
    elif event == cv2.EVENT_LBUTTONDBLCLK:
        print("마우스 왼쪽 버튼 더블클릭")

image = np.full((200, 300), 255, np.uint8)          # 영상 생성

title1, title2 = "Mouse Event1", "Mouse Event2"     # 윈도우 이름
cv2.imshow(title1, image) # 영상 보기
cv2.imshow(title2, image)

cv2.setMouseCallback('Mouse Event1', onMouse)     	# 마우스 콜백 함수
cv2.waitKey(0)                                      # 키 이벤트 대기
cv2.destroyAllWindows()                             # 열린 모든 윈도우 제거`,
    },
    {
      id: 'chap04-05-event_trackbar',
      filename: '05.event_trackbar.py',
      title: 'event trackbar',
      code: `import numpy as np
import cv2

def onChange(value):												# 트랙바 콜백 함수
    global image                        	# 전역 변수 참조

    add_value = value - int(image[0][0])        	# 트랙바 값과 영상 화소값 차분
    print("추가 화소값:", add_value)
    image = image + add_value            		# 행렬과 스칼라 덧셈 수행
    cv2.imshow(title, image)

image = np.zeros((300, 500), np.uint8)           	# 영상 생성

title = 'Trackbar Event'
cv2.imshow(title, image)

cv2.createTrackbar("Brightness", title, image[0][0], 255, onChange)	# 트랙바 콜백 함수 등록
cv2.waitKey(0)
cv2.destroyAllWindows()`,
    },
    {
      id: 'chap04-06-event_mouse_trackbar',
      filename: '06.event_mouse_trackbar.py',
      title: 'event mouse trackbar',
      code: `import numpy as np
import cv2

def onChange(value):
    global image, title                                 # 전역 변수 참조

    add_value = value - int(image[0][0])                # 트렉바 값과 영상화소값 차분
    image = image + add_value
    cv2.imshow(title, image)

def onMouse(event, x, y, flags, param):                 # 마우스 콜백 함수
    global image, bar_name
    
    if event == cv2.EVENT_RBUTTONDOWN:
        if (image[0][0] < 246): image = image + 10
        cv2.setTrackbarPos(bar_name, title, image[0][0])		# 트랙바 위치 변경 
        cv2.imshow(title, image)
        
    elif event == cv2.EVENT_LBUTTONDOWN:
        if (image[0][0] >= 10): image = image - 10
        cv2.setTrackbarPos(bar_name, title, image[0][0])		# 트랙바 위치 변경 
        cv2.imshow(title, image)

image = np.zeros((300, 500), np.uint8)                 

title = "Trackbar & Mouse Event"                    		# 윈도우 이름
bar_name = "Brightness"                                # 트랙바 이름
cv2.imshow(title, image)    

cv2.createTrackbar(bar_name, title, image[0][0], 255, onChange)   # 트랙바 콜백 함수
cv2.setMouseCallback(title, onMouse)
cv2.waitKey(0)													# 키 입력 대기
cv2.destroyAllWindows()                                	# 모든 윈도우 닫기`,
    },
    {
      id: 'chap04-07-draw_line_rect',
      filename: '07.draw_line_rect.py',
      title: 'draw line rect',
      code: `import numpy as np
import cv2

blue, green, red = (255, 0, 0), (0, 255, 0), (0, 0, 255)    	# 색상 선언
image = np.zeros((400, 600, 3), np.uint8)    					# 3채널 컬러 영상 생성
image[:] = (255, 255, 255)

pt1, pt2 = (50, 50), (250, 150)                   		        # 좌표 선언 – 정수형 튜플
pt3, pt4 = (400, 150), (500,  50)
roi = 50, 200, 200, 100

# 직선 그리기
cv2.line(image, pt1, pt2, red)
cv2.line(image, pt3, pt4, green, 3, cv2.LINE_AA)    			# 계단 현상이 감소한 선

# 사각형 그리기
cv2.rectangle(image, pt1, pt2, blue, 3, cv2.LINE_4)             # 4방향 연결선
cv2.rectangle(image, roi, red, 3, cv2.LINE_8 )                  # 내부 채움
cv2.rectangle(image, (400, 200, 100, 100), green, cv2.FILLED )  # 내부 채움

cv2.imshow('Line & Rectangle', image)							# 윈도우에 영상 표시
cv2.waitKey(0)
cv2.destroyAllWindows()											# 모든 열린 윈도우 닫기`,
    },
    {
      id: 'chap04-08-put_text',
      filename: '08.put_text.py',
      title: 'put text',
      code: `import numpy as np
import cv2

olive, violet, brown = (128, 128, 0), (221, 160, 221), (42, 42, 165)
pt1, pt2 = (50, 200), (50, 260)                         # 문자열 위치 좌표

image = np.zeros((300, 500, 3), np.uint8)
image.fill(255)

cv2.putText(image, "SIMPLEX", (50, 50) , cv2.FONT_HERSHEY_SIMPLEX, 2, brown)
cv2.putText(image, "DUPLEX" , (50, 130), cv2.FONT_HERSHEY_DUPLEX , 3, olive)
cv2.putText(image, "TRIPLEX", pt1, cv2.FONT_HERSHEY_TRIPLEX, 2, violet)
fontFace = cv2.FONT_HERSHEY_PLAIN | cv2.FONT_ITALIC         # 글자체 상수
cv2.putText(image, "ITALIC" , pt2, fontFace, 4, violet)

cv2.imshow("Put Text", image)
cv2.waitKey(0)                                  # 키 이벤트 대기`,
    },
    {
      id: 'chap04-09-draw_circle',
      filename: '09.draw_circle.py',
      title: 'draw circle',
      code: `import numpy as np
import cv2

orange, blue, cyan = (0, 165, 255), (255, 0, 0), (255, 255, 0)
white, black = (255, 255, 255), (0, 0, 0)         
image = np.full((300, 500, 3), white, np.uint8)             # 컬러 영상 생성 및 초기화

center = (image.shape[1]//2, image.shape[0]//2)         		# 영상의 중심 좌표
pt1, pt2 = (300, 50), (100, 220)
shade = (pt2[0] + 2, pt2[1] + 2)                          # 그림자 좌표

cv2.circle(image, center, 100, blue)                         # 원 그리기 
cv2.circle(image, pt1   , 50 , orange, 2)
cv2.circle(image, pt2   , 70 , cyan  , -1)                   # 원 내부 채움

font = cv2.FONT_HERSHEY_COMPLEX;
cv2.putText(image, "center_blue", center, font, 1.0, blue)
cv2.putText(image, "pt1_orange", pt1, font, 0.8, orange)
cv2.putText(image, "pt2_cyan",   shade, font, 1.2, black, 2)   # 그림자 효과
cv2.putText(image, "pt2_cyan",   pt2, font, 1.2, cyan , 1)

title = "Draw circles"
cv2.namedWindow(title)
cv2.imshow(title, image)
cv2.waitKey(0)`,
    },
    {
      id: 'chap04-10-draw_ellipse',
      filename: '10.draw_ellipse.py',
      title: 'draw ellipse',
      code: `import numpy as np
import cv2

orange, blue, white = (0, 165, 255), (255, 0, 0), (255,255,255) # 색상 지정
image = np.full((300, 700, 3), white, np.uint8)

pt1, pt2 = (180, 150), (550, 150)                       # 타원 중심점
size = (120, 60)                                        # 타원 크기 - 반지름 값임

cv2.circle(image, pt1, 1, 0, 2)                         # 타원의 중심점(2화소 원) 표시
cv2.circle(image, pt2, 1, 0, 2)

cv2.ellipse(image, pt1, size,  0, 0, 360, blue, 1)      # 타원 그리기
cv2.ellipse(image, pt2, size, 90, 0, 360, blue, 1)
cv2.ellipse(image, pt1, size,  0, 30, 270, orange, 4)   # 호 그리기
cv2.ellipse(image, pt2, size, 90,-45,  90, orange, 4)

cv2.imshow("Draw Eclipse & Arc", image)
cv2.waitKey()                                           # 키입력 대기`,
    },
    {
      id: 'chap04-11-event_draw',
      filename: '11.event_draw.py',
      title: 'event draw',
      code: `import numpy as np
import cv2

def onMouse(event, x, y, flags, param):
    global title, pt                            # 전역 변수 참조

    if event == cv2.EVENT_LBUTTONDOWN:
        if pt[0] < 0:
            pt = (x, y)                         # 시작 좌표 지정
        else:
            cv2.rectangle(image, pt, (x, y), (255,0,0), 2)
            cv2.imshow(title, image)
            pt = (-1, -1)                       # 시작 좌표 초기화
            
    elif event == cv2.EVENT_RBUTTONDOWN:
        if pt[0] < 0: pt = (x, y)
        else:
            dx, dy = pt[0] - x, pt[1] - y       # 두 좌표 간의 거리
            radius = int(np.sqrt(dx * dx + dy * dy))
            cv2.circle(image, pt, radius, (0,0,255), 2)
            cv2.imshow(title, image)
            pt = (-1, -1)                       # 시작 좌표 초기화

image = np.full((300, 500, 3), (255, 255, 255), np.uint8) # 흰색 배경 영상

pt = (-1, -1)                                   # 시작 좌표 초기화
title = "Draw Event"
cv2.imshow(title, image)                        # 윈도우에 영상 띄우기
cv2.setMouseCallback(title, onMouse)            # 마우스 콜백 함수 등록
cv2.waitKey(0)
`,
    },
    {
      id: 'chap04-12-read_image1',
      filename: '12.read_image1.py',
      title: 'read image1',
      code: `import cv2

def print_matInfo(name, image):
    if image.dtype == 'uint8':     mat_type = "CV_8U"
    elif image.dtype == 'int8':    mat_type = "CV_8S"
    elif image.dtype == 'uint16':  mat_type = "CV_16U"
    elif image.dtype == 'int16':   mat_type = "CV_16S"
    elif image.dtype == 'float32': mat_type = "CV_32F"
    elif image.dtype == 'float64': mat_type = "CV_64F"
    nchannel = 3 if image.ndim == 3 else 1

    ## depth, channel 출력
    print("%12s: depth(%s), channels(%s) -> mat_type(%sC%d)"
          % (name, image.dtype, nchannel, mat_type,  nchannel))

title1, title2 = "gray2gray", "gray2color"      # 윈도우 이름
gray2gray  = cv2.imread("images/read_gray.jpg", cv2.IMREAD_GRAYSCALE) # 영상 파일 적재
gray2color = cv2.imread("images/read_gray.jpg", cv2.IMREAD_COLOR)

if (gray2gray is None or gray2color is None) :  # 예외처리 -영상 파일 읽기 여부 조사
    raise Exception("영상파일 읽기 에러")

# 행렬 내 한 화소 값 표시
print("행렬 좌표 (100, 100) 화소값")
print("%s %s" % (title1, gray2gray[100, 100]))
print("%s %s\\n" % (title2, gray2color[100, 100]))

print_matInfo(title1, gray2gray)
print_matInfo(title2, gray2color)

cv2.imshow(title1, gray2gray)
cv2.imshow(title2, gray2color)
cv2.waitKey(0)`,
    },
    {
      id: 'chap04-13-read_image2',
      filename: '13.read_image2.py',
      title: 'read image2',
      code: `import cv2
from Common.utils import print_matInfo  # 행렬 정보 출력 함수 임포트

title1, title2 = "color2gray", "color2color"
color2gray = cv2.imread("images/read_color.jpg", cv2.IMREAD_GRAYSCALE)
color2color = cv2.imread("images/read_color.jpg", cv2.IMREAD_COLOR)
if color2gray is None or color2color is None:
    raise Exception("영상 파일 읽기 에러")

print("행렬 좌표 (100, 100) 화소값")
print("%s %s" % (title1, color2gray[100, 100]))     # 한 화소값 표시
print("%s %s\\n" % (title2, color2color[100, 100]))

print_matInfo(title1, color2gray)                   # 행렬 정보 출력
print_matInfo(title2, color2color)
cv2.imshow(title1, color2gray)                      # 행렬 정보 영상으로 띄우기
cv2.imshow(title2, color2color)
cv2.waitKey(0)`,
    },
    {
      id: 'chap04-14-read_image3',
      filename: '14.read_image3.py',
      title: 'read image3',
      code: `import cv2
from Common.utils import print_matInfo

title1, title2 = "16bit unchanged", "32bit unchanged"  # 윈도우 이름
color2unchanged1 = cv2.imread("images/read_16.tif", cv2.IMREAD_UNCHANGED)
color2unchanged2 = cv2.imread("images/read_32.tif", cv2.IMREAD_UNCHANGED)
if color2unchanged1 is None or color2unchanged2 is None:
    raise Exception("영상파일 읽기 에러")

print("16/32비트 영상 행렬 좌표 (10, 10) 화소값")
print(title1, "원소 자료형 ",  type(color2unchanged1[10][10][0]))   # 원소 좌료형
print(title1, "화소값(3원소) ", color2unchanged1[10, 10] )           # 행렬 내 한 화소 값 표시
print(title2, "원소 자료형 ",  type(color2unchanged2[10][10][0]))
print(title2, "화소값(3원소) ", color2unchanged2[10, 10] )
print()

print_matInfo(title1, color2unchanged1)         # 행렬 정보 출력
print_matInfo(title2, color2unchanged2)
cv2.imshow(title1, color2unchanged1)
cv2.imshow(title2, (color2unchanged2*255).astype("uint8"))
cv2.waitKey(0)`,
    },
    {
      id: 'chap04-15-write_image1',
      filename: '15.write_image1.py',
      title: 'write image1',
      code: `import cv2

image = cv2.imread("images/read_color.jpg", cv2.IMREAD_COLOR)
if image is None: raise Exception("영상 파일 읽기 에러")
    
params_jpg = (cv2.IMWRITE_JPEG_QUALITY, 10)        # JPEG 화질 설정
params_png = [cv2.IMWRITE_PNG_COMPRESSION, 9]       # PNG 압축 레벨 설정

## 행렬을 영상 파일로 저장
cv2.imwrite("images/write_test1.jpg", image)       # 디폴트는 95
cv2.imwrite("images/write_test2.jpg", image, params_jpg) # 지정 화질로 저장
cv2.imwrite("images/write_test3.png", image, params_png)
cv2.imwrite("iamges/write_test4.bmp", image)         # BMP 파일로 저장
print("저장 완료")`,
    },
    {
      id: 'chap04-16-write_image2',
      filename: '16.write_image2.py',
      title: 'write image2',
      code: `import numpy as np
import cv2

image8 = cv2.imread("images/read_color.jpg", cv2.IMREAD_COLOR)
if image8 is None: raise Exception("영상파일 읽기 에러") 	# 영상 파일 예외처리

image16 = np.uint16(image8 * (65535/255))       # 형변환 및 화소 스케일 조정
image32 = np.float32(image8 * (1/255))

# 화소값을 확인하기 위한 관심 영역(10,10 위치에서 2x3 크기) 출력
print("image8 행렬의 일부\\n %s\\n"  % image8[10:12, 10:13])
print("image16 행렬의 일부\\n %s\\n" % image16[10:12, 10:13])
print("image32 행렬의 일부\\n %s\\n" % image32[10:12, 10:13])

cv2.imwrite("images/write_test_16.tif", image16)
cv2.imwrite("images/write_test_32.tif", image32)

cv2.imshow("image16", image16)
cv2.imshow("image32", (image32*255).astype("uint8"))
cv2.waitKey(0)`,
    },
    {
      id: 'chap04-17-read_pccamera',
      filename: '17.read_pccamera.py',
      title: 'read pccamera',
      code: `import cv2

def put_string(frame, text, pt, value, color=(120, 200, 90)):             # 문자열 출력 함수 - 그림자 효과
    text += str(value)
    shade = (pt[0] + 2, pt[1] + 2)
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(frame, text, shade, font, 0.7, (0, 0, 0), 2)  # 그림자 효과
    cv2.putText(frame, text, pt, font, 0.7, (120, 200, 90), 2)  # 글자 적기

capture = cv2.VideoCapture(0)  # 0번 카메라 연결
if capture.isOpened() == False:
    raise Exception("카메라 연결 안됨")

# 카메라 속성 획득 및 출력
print("너비 %d" % capture.get(cv2.CAP_PROP_FRAME_WIDTH))
print("높이 %d" % capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
print("노출 %d" % capture.get(cv2.CAP_PROP_EXPOSURE))
print("밝기 %d" % capture.get(cv2.CAP_PROP_BRIGHTNESS))

while True:  # 무한 반복
    ret, frame = capture.read()  # 카메라 영상 받기
    if not ret: break
    if cv2.waitKey(30) >= 0: break

    exposure = capture.get(cv2.CAP_PROP_EXPOSURE)
    put_string(frame, "EXPOS: ", (10, 40), exposure)
    title = "View Frame from Camera"
    cv2.imshow(title, frame)  # 윈도우에 영상 띄우기
capture.release()`,
    },
    {
      id: 'chap04-18-set_camera_attr',
      filename: '18.set_camera_attr.py',
      title: 'set camera attr',
      code: `import cv2
from Common.utils import put_string

def zoom_bar(value):
    global capture
    capture.set(cv2.CAP_PROP_ZOOM, value) # 줌 설정 

def focus_bar(value):
    global capture
    capture.set(cv2.CAP_PROP_FOCUS, value)

capture = cv2.VideoCapture(0)								# 0번 카메라 연결
if capture.isOpened() is None: raise Exception("카메라 연결 안됨")

capture.set(cv2.CAP_PROP_FRAME_WIDTH, 400)      # 카메라 프레임 너비
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 300)     # 카메라 프레임 높이
capture.set(cv2.CAP_PROP_AUTOFOCUS, 0)          # 오토포커싱 중지
capture.set(cv2.CAP_PROP_BRIGHTNESS, 100)       # 프레임 밝기 초기화

title = "Change Camera Properties"              # 윈도우 이름 지정
cv2.namedWindow(title)                          # 윈도우 생성 - 반드시 생성 해야함
cv2.createTrackbar("zoom" , title, 0, 10, zoom_bar)
cv2.createTrackbar("focus", title, 0, 40, focus_bar)

while True:
    ret, frame = capture.read()                 # 카메라 영상 받기
    if not ret: break
    if cv2.waitKey(30) >= 0: break

    zoom = int(capture.get(cv2.CAP_PROP_ZOOM))
    focus = int(capture.get(cv2.CAP_PROP_FOCUS))
    put_string(frame, "zoom : " , (10, 240), zoom)   # 줌 값 표시
    put_string(frame, "focus : ", (10, 270), focus)    # 초점 값 표시 
    cv2.imshow(title, frame)

capture.release()`,
    },
    {
      id: 'chap04-19-write_camera_frame',
      filename: '19.write_camera_frame.py',
      title: 'write camera frame',
      code: `import cv2

capture = cv2.VideoCapture(0)                       # 0번 카메라 연결
if capture.isOpened() == False: raise Exception("카메라 연결 안됨")

fps = 29.97                                         # 초당 프레임 수
delay = round(1000/ fps)                            # 프레임 간 지연 시간
size  = (640, 360)                                  # 동영상 파일 해상도
fourcc = cv2.VideoWriter_fourcc(*'DX50')            # 압축 코덱 설정

# 카메라 속성 콘솔창에 출력
print("프레임 해상도:", size )
print("압축코덱 숫자:", fourcc)
print("delay: %2d ms" % delay)
print("fps: %.2f" % fps)

capture.set(cv2.CAP_PROP_ZOOM, 1)                   # 카메라 속성 지정
capture.set(cv2.CAP_PROP_FOCUS, 0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH , size[0])     	# 해상도 설정
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, size[1])

# 동영상 파일 개방 및 코덱, 해상도 설정
writer = cv2.VideoWriter("images/video_file.avi", fourcc, fps, size)
if writer.isOpened() == False: raise Exception("동영상 파일 개방 안됨")

while True:
    ret, frame = capture.read()             # 카메라 영상 받기
    if not ret: break
    if cv2.waitKey(delay) >= 0: break

    writer.write(frame)                 # 프레임을 동영상으로 저장
    cv2.imshow("View Frame from Camera", frame)

writer.release()
capture.release()`,
    },
    {
      id: 'chap04-20-read_video_file',
      filename: '20.read_video_file.py',
      title: 'read video file',
      code: `import cv2
from Common.utils import put_string

capture = cv2.VideoCapture("images/video_file.avi")		# 동영상 파일 개방
if not capture.isOpened(): raise Exception("동영상 파일 개방 안됨")		# 예외 처리

frame_rate = capture.get(cv2.CAP_PROP_FPS)           		# 초당 프레임 수
delay = int(1000 / frame_rate)                         		# 지연 시간
frame_cnt = 0                                       		# 현재 프레임 번호

while True:
	ret, frame = capture.read()
	if not ret or cv2.waitKey(delay) >= 0: break    				# 프레임 간 지연 시간 지정
	blue, green, red = cv2.split(frame)             				# 컬러 영상 채널 분리
	frame_cnt += 1

	if 100 <= frame_cnt < 200: cv2.add(blue, 100, blue)  		# blue 채널 밝기 증가
	elif 200 <= frame_cnt < 300: cv2.add(green, 100, green) 	# green 채널 밝기 증가
	elif 300 <= frame_cnt < 400: cv2.add(red  , 100, red)   	# red 채널 밝기 증가

	frame = cv2.merge( [blue, green, red] )                 # 단일채널 영상 합성
	put_string(frame, "frame_cnt : ", (20, 320), frame_cnt)
	cv2.imshow("Read Video File", frame)
capture.release()`,
    },
    {
      id: 'chap04-21-matplotlib',
      filename: '21.matplotlib.py',
      title: 'matplotlib',
      code: `import cv2
import matplotlib.pyplot as plt

image  = cv2.imread("images/matplot.jpg", cv2.IMREAD_COLOR)
if image is None: raise Exception("영상 파일 읽기 에러")

rows, cols = image.shape[:2]
rgb_img = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
gray_img = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)

fig = plt.figure(num=1, figsize=(3,4))
plt.imshow(image ), plt.title('figure1- original(bgr)')
plt.axis('off'), plt.tight_layout()

fig = plt.figure(num=2, figsize=(6,4))
plt.suptitle( 'figure2- pyplot image display')
plt.subplot(1,2,1), plt.imshow(rgb_img)
plt.axis([0,cols, rows,0]), plt.title('rgb color')
plt.subplot(1,2,2), plt.imshow(gray_img, cmap='gray')
plt.title('gray_img2')
plt.show()`,
    },
    {
      id: 'chap04-22-interpolation',
      filename: '22.interpolation.py',
      title: 'interpolation',
      code: `import matplotlib.pyplot as plt
import numpy as np

methods = ['none', 'nearest', 'bilinear', 'bicubic', 'spline16', 'spline36' ]
grid = np.random.rand(5, 5)

fig, axs = plt.subplots(nrows=2, ncols=3, figsize=(8, 6))

for ax, method in zip(axs.flat, methods):
    ax.imshow(grid, interpolation=method, cmap='gray')
    ax.set_title(method)
plt.tight_layout(), plt.show()`,
    },
    {
      id: 'chap04-23-plot',
      filename: '23.plot.py',
      title: 'plot',
      code: `import matplotlib.pyplot as plt
import numpy as np

x = np.arange(10)
y1 = np.arange(10)
y2 = np.arange(10)**2
y3 = np.random.choice(50, size=10)

plt.figure(figsize=(5,3))           				# 그림 객체 생성 - 그래프 크기(단위inch)
plt.plot(x, y1, 'b--', linewidth=2)					# 선 스타일 지정 – 파란색, 파선
plt.plot(x, y2, 'go-', linewidth=3)					# 녹색, 원 마크, 실선
plt.plot(x, y3, 'c+:', linewidth=5)					# 청록색, +마크, 점선

plt.title("Line examples")    						# 그래프 제목
plt.axis([0,10, 0,80])								# 축 범위
plt.tight_layout()
plt.savefig(fname="sample.png", dpi=300)			# 그림 저장
plt.show()				 							# 윈도우 표시`,
    },
  ],

  'chap05': [
    {
      id: 'chap05-01-mat_array',
      filename: '01.mat_array.py',
      title: 'mat array',
      code: `import cv2

image = cv2.imread("images/flip_test.jpg", cv2.IMREAD_COLOR)
if image is None: raise Exception("영상 파일 읽기 오류 발생") # 예외 처리

x_axis = cv2.flip(image, 0)                 # x축 기준 상하 뒤집기
y_axis = cv2.flip(image, 1)                 # y축 기준 좌우 뒤집기
xy_axis = cv2.flip(image, -1)
rep_image   = cv2.repeat(image, 1, 2)       # 반복 복사
trans_image = cv2.transpose(image)          # 행렬 전치

## 각 행렬을 영상으로 표시
titles = ['image', 'x_axis', 'y_axis','xy_axis','rep_image','trans_image']
for title in titles:
    cv2.imshow(title, eval(title))
cv2.waitKey(0)`,
    },
    {
      id: 'chap05-02-mat_channel',
      filename: '02.mat_channel.py',
      title: 'mat channel',
      code: `import numpy as np
import cv2

# numpy array이용해 단일 채널 3개 생성
ch0 = np.zeros((2, 4), np.uint8) + 10           # 0원소 행렬 선언 후 10 더하기
ch1 = np.ones((2, 4), np.uint8) * 20            # 1원소 행렬 선언 후 20 곱하기
ch2 = np.zeros((2, 4), np.uint8); ch2[:] = 30   # 0원소 행렬 선언 후 행렬원소값 30 지정

list_bgr = [ch0, ch1, ch2]                      # 단일 채널들을 모아 리스트 구성
merge_bgr = cv2.merge(list_bgr)                 # 채널 합성
split_bgr = cv2.split(merge_bgr)                # 채널 분리: 컬러영상--> 3채널 분리

print('split_bgr 행렬 형태 ', np.array(split_bgr).shape)
print('merge_bgr 행렬 형태', merge_bgr.shape)

print("[ch0] = \\n%s" % ch0)                     # 단일 채널 원소 출력
print("[ch1] = \\n%s" % ch1)
print("[ch2] = \\n%s" % ch2)
print("[merge_bgr] = \\n %s\\n" % merge_bgr)       # 다중 채널 원소 출력

print("[split_bgr[0]] =\\n%s " % split_bgr[0])
print("[split_bgr[1]] =\\n%s " % split_bgr[1])
print("[split_bgr[2]] =\\n%s " % split_bgr[2])`,
    },
    {
      id: 'chap05-03-image_channels',
      filename: '03.image_channels.py',
      title: 'image channels',
      code: `import cv2

image = cv2.imread( "images/color.jpg", cv2.IMREAD_COLOR)   # 영상 읽기
if image is None: raise Exception("영상 파일 읽기 오류 발생")  # 예외 처리
if image.ndim != 3: raise Exception("컬러 영상 아님")
    
bgr = cv2.split(image)                      # 채널 분리: 컬러영상--> 3채널 분리
# blue, green, red = cv2.split(image)

print("bgr 자료형:",  type(bgr), type(bgr[0]), type(bgr[0][0][0]))
print("bgr 원소개수:", len(bgr))

# 각 채널을 윈도우에 띄우기 
cv2.imshow("image", image)
cv2.imshow("Blue channel" , bgr[0])         # blue 채널
cv2.imshow("Green channel", bgr[1])         # green 채널
cv2.imshow("Red channel"  , bgr[2])         # red 채널
# cv2.imshow("Blue channel" , image[:,:,0])         	# 넘파이 객체 인덱싱
# cv2.imshow("Green channel", image[:,:,1])
# cv2.imshow("Red channel"  , image[:,:,2])
cv2.waitKey()`,
    },
    {
      id: 'chap05-04-arithmethic_op',
      filename: '04.arithmethic_op.py',
      title: 'arithmethic op',
      code: `import numpy as np, cv2

m1 = np.full((3, 6), 10, np.uint8)			# 단일 채널 생성 및 초기화
m2 = np.full((3, 6), 50, np.uint8)
m_mask = np.zeros(m1.shape, np.uint8)		# 마스크 생성
m_mask[ :, 3: ] = 1							# 관심 영역을 지정한 후, 1을 할당

m_add1 = cv2.add(m1, m2)                    # 행렬 덧셈
m_add2 = cv2.add(m1, m2, mask=m_mask)       # 관심 영역만 덧셈 수행

# 행렬 나눗셈 수행
m_div1 = cv2.divide(m1, m2)
m1 = m1.astype(np.float32)                  # 형변환 - 소수 부분 보존
m2 = np.float32(m2)
m_div2 = cv2.divide(m1, m2)

titles = ['m1', 'm2', 'm_mask','m_add1','m_add2','m_div1', 'm_div2']
for title in titles:
    print("[%s] = \\n%s \\n" % (title, eval(title)))`,
    },
    {
      id: 'chap05-05-exp_log',
      filename: '05.exp_log.py',
      title: 'exp log',
      code: `import numpy as np, cv2

# numpy array 생성 예시
v1 = np.array([1, 2, 3], np.float32)          # 1차원 리스트로 생성- 행벡터
v2 = np.array([[1], [2], [3]], np.float32)      # 2차원 리스트로(3행, 1열) - 행벡터
v3 = np.array([[1, 2, 3]], np.float32)        	# 2차원 리스트로(1행, 3열) - 일반 행렬

# OpenCV 산술 연산 함수는 numpy array만 가능함
v1_exp = cv2.exp(v1)                             # 벡터에 대한
v2_exp = cv2.exp(v2)                             # 행렬에 대한 지수 계산
v3_exp = cv2.exp(v3)                             # 행렬에 대한 지수 계산
log = cv2.log(v1)                             # 로그 계산
sqrt= cv2.sqrt(v2)                            # 제곱근 계산
pow = cv2.pow(v3, 3)                          # 3의 거듭제곱 계산

# 결과 출력
print("[v1] 형태: %s 원소: %s" % ( v1.shape, v1))
print("[v2] 형태: %s 원소:\\n%s" % ( v2.shape, v2))
print("[v3] 형태: %s 원소: %s" % ( v3.shape, v3))
print()

# 행렬 정보 출력 - OpenCV 결과는 행렬로 반환됨 - 행벡터는 열벡터로 반환됨
print("[v1_exp] 자료형: %s 형태: %s" % ( type(v1_exp), v1_exp.shape))  # 행벡터 인수의 결과
print("[v2_exp] 자료형: %s 형태: %s" % ( type(v2_exp), v2_exp.shape))  # 행벡터 인수의 결과
print("[v3_exp] 자료형: %s 형태: %s" % ( type(v3_exp), v3_exp.shape))  # 행벡터 인수의 결과
print()

# 열벡터를 1 행에 출력하는 예시 - 행벡터로 변환
print("[log] =", log.T)
print("[sqrt] =", np.ravel(sqrt))         
print("[pow] =", pow.flatten())
`,
    },
    {
      id: 'chap05-06-magnitude',
      filename: '06.magnitude.py',
      title: 'magnitude',
      code: `import numpy as np, cv2

x = np.array([1, 2, 3, 5, 10], np.float32)            # 리스트를 numpy array로 변환
y = np.array([2, 5, 7, 2, 9]).astype("float32")

mag = cv2.magnitude(x, y)                   # 크기 계산
ang = cv2.phase(x, y)                       # 각도(방향) 계산
p_mag, p_ang  = cv2.cartToPolar(x, y)  # 극좌표로 변환
x2, y2 = cv2.polarToCart(p_mag, p_ang)  # 직교좌표로 변한

print("[x] 형태: %s 원소: %s" % ( x.shape, x))
print("[mag] 형태: %s 원소: %s" % ( mag.shape, mag))

print(">>>열벡터를 1행에 출력하는 방법")
print("[m_mag] = %s" % mag.T)
print("[p_mag] = %s" % np.ravel(p_mag))
print("[p_ang] = %s" % np.ravel(p_ang))
print("[x_mat2] = %s" % x2.flatten())
print("[y_mat2] = %s" % y2.flatten())`,
    },
    {
      id: 'chap05-07-bitwise_op',
      filename: '07.bitwise_op.py',
      title: 'bitwise op',
      code: `import numpy as np, cv2

image1 = np.zeros((300, 300), np.uint8)     		# 300행, 300열 검은색 영상 생성
image2 = image1.copy()

h, w = image1.shape[:2]
cx,cy  = w//2, h//2
cv2.circle(image1, (cx,cy), 100, 255, -1)      		# 중심에 원 그리기
cv2.rectangle(image2, (0,0, cx, h), 255, -1)

image3 = cv2.bitwise_or(image1, image2)     	# 원소 간 논리합
image4 = cv2.bitwise_and(image1, image2)    	# 원소 간 논리곱
image5 = cv2.bitwise_xor(image1, image2)    	# 원소 간 배타적 논리합
image6 = cv2.bitwise_not(image1)            	# 행렬 반전

cv2.imshow("image1", image1);			cv2.imshow("image2", image2)
cv2.imshow("bitwise_or", image3);		cv2.imshow("bitwise_and", image4)
cv2.imshow("bitwise_xor", image5);	cv2.imshow("bitwise_not", image6)
cv2.waitKey(0)`,
    },
    {
      id: 'chap05-08-bitwise_overlap',
      filename: '08.bitwise_overlap.py',
      title: 'bitwise overlap',
      code: `import numpy as np, cv2

image = cv2.imread("images/bit_test.jpg", cv2.IMREAD_COLOR)     # 원본 영상 읽기
logo  = cv2.imread("images/logo.jpg", cv2.IMREAD_COLOR)         # 로고 영상 읽기
if image is None or logo is None: raise Exception("영상 파일 읽기 오류 ")

masks = cv2.threshold(logo, 220, 255, cv2.THRESH_BINARY)[1]  # 로고 영상 이진화
masks = cv2.split(masks)

fg_pass_mask = cv2.bitwise_or(masks[0], masks[1])       # 전경 통과 마스크
fg_pass_mask = cv2.bitwise_or(masks[2], fg_pass_mask)
bg_pass_mask = cv2.bitwise_not(fg_pass_mask)            # 배경 통과 마스크

(H, W), (h, w) = image.shape[:2], logo.shape[:2]                       # 로고 영상 크기
x, y = (W-w)//2, (H - h)//2
roi = image[y:y+h, x:x+w]                # 관심 영역(roi) 지정

# 행렬 논리곱과 마스킹을 이용한 관심 영역 복사
foreground = cv2.bitwise_and(logo, logo, mask=fg_pass_mask) # 로고의 전경 복사
background = cv2.bitwise_and(roi , roi , mask=bg_pass_mask) # roi에 원본배경만 복사

dst = cv2.add(background, foreground)            # 로고 전경과 원본 배경 간 합성
image[y:y+h, x:x+w] = dst             # 합성 영상을 원본에 복사

cv2.imshow("background", background);  cv2.imshow("forground", foreground)
cv2.imshow("dst", dst);                 cv2.imshow("image", image)
cv2.waitKey()`,
    },
    {
      id: 'chap05-09-mat_abs',
      filename: '09.mat_abs.py',
      title: 'mat abs',
      code: `import numpy as np, cv2

image1 = cv2.imread("images/abs_test1.jpg", cv2.IMREAD_GRAYSCALE) # 명암도 영상 읽기
image2 = cv2.imread("images/abs_test2.jpg", cv2.IMREAD_GRAYSCALE)
if image1 is None or image2 is None: raise Exception("영상 파일 읽기 오류 발생")

dif_img1 = cv2.subtract(image1, image2)                     # 차분 연산
dif_img2 = cv2.subtract(np.int16(image1), np.int16(image2)) # 음수 보전 위해
abs_dif1 = np.absolute(dif_img2).astype('uint8')
abs_dif2 = cv2.absdiff(image1, image2)              # 차분 절댓값 계산

x, y, w, h = 100, 100, 7, 3
print("[dif_img1(roi) uint8] = \\n%s\\n" % dif_img1[y:y+h, x:x+w])
print("[dif_img2(roi) int16]  = \\n%s\\n"  % dif_img2[y:y+h, x:x+w])
print("[abs_dif1(roi)] = \\n%s\\n" % abs_dif1[y:y+h, x:x+w])
print("[abs_dif2(roi)] = \\n%s\\n" % abs_dif2[y:y+h, x:x+w])

titles = ['image1', 'image2', 'dif_img1', 'abs_dif1','abs_dif2']
for title in titles:
    cv2.imshow(title, eval(title))
cv2.waitKey(0)
`,
    },
    {
      id: 'chap05-10-mat_min_max',
      filename: '10.mat_min_max.py',
      title: 'mat min max',
      code: `import numpy as np, cv2

data = [10, 200, 5 , 7 ,  9,
        15, 35 , 60, 80, 170,
        100, 2 , 55, 37, 70]
m1 = np.reshape(data, (3, 5))   # 리스트를 행태변환하여 행렬 생성
m2 = np.full((3, 5), 50)              # 원소값 50인 행렬 생성

m_min = cv2.min(m1, 30)                  # 두 행렬 원소 간 최솟값을 행렬로 저장
m_max = cv2.max(m1, m2)                  # 두 행렬 최댓값 계산

## 행렬의 최솟값/최댓값과 그 좌표들을 반환
min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(m1)

print("[m1] = \\n%s\\n" % m1)
print("[m_min] = \\n%s\\n" % m_min)
print("[m_max] = \\n%s\\n" % m_max)

# min_loc와 max_loc 좌표는 (y, x)이므로 행렬의 좌표 위차와 반대임
print("m1 행렬 최솟값 좌표 %s, 최솟값: %d" %(min_loc, min_val) )
print("m1 행렬 최댓값 좌표 %s, 최댓값: %d" %(max_loc, max_val) )`,
    },
    {
      id: 'chap05-11-image_min_max',
      filename: '11.image_min_max.py',
      title: 'image min max',
      code: `import numpy as np, cv2

image = cv2.imread("images/minMax.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 오류 발생")

(min_val, max_val, _, _) = cv2.minMaxLoc(image)  # 최솟값과 최댓값 가져오기

ratio = 255/(max_val - min_val)
dst = np.round((image - min_val) * ratio).astype('uint8')
(min_dst, max_dst, _, _) = cv2.minMaxLoc(dst)

print("원본 영상 최솟값= %d , 최댓값= %d" % (min_val, max_val))
print("수정 영상 최솟값= %d , 최댓값= %d" % (min_dst, max_dst))
cv2.imshow("image", image)
cv2.imshow("dst"  , dst)
cv2.waitKey(0)`,
    },
    {
      id: 'chap05-12-sum_avg',
      filename: '12.sum_avg.py',
      title: 'sum avg',
      code: `import numpy as np, cv2

image = cv2.imread("images/sum_test.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 오류 발생")
    
mask = np.zeros(image.shape[:2], np.uint8)
mask[60:160, 20:120] = 255                      # 관심영역을 지정한 후, 255를 할당

sum_value   = cv2.sumElems(image)               # 채널별 합 구하기
mean_value1 = cv2.mean(image)                   # 결과 튜플로 반환
mean_value2 = cv2.mean(image, mask)

print('sum_value 자료형:', type(sum_value), type(sum_value[0]))
print("[sum_value] = ", sum_value)
print("[mean_value1] = ", mean_value1)
print("[mean_value2] = ", mean_value2)
print()

# 평균과 표준편차 결과 저장
mean, stddev = cv2.meanStdDev(image)              # 결과를 행렬(numpy array)로 반환
mean2, stddev2 = cv2.meanStdDev(image, mask=mask) # 마스크가 255인 영역만 계산
print('mean 자료형:', type(mean), type(mean[0][0]))               # 반환 튜플의 원소는 ndarray
print("[mean] = "  , mean.flatten())              # 벡터 변환후 출력
print("[stddev] = ", stddev.flatten())
print( )

print("[mean2] = ",  mean2.flatten())
print("[stddev2] = ", stddev2.flatten())

cv2.imshow("image", image)
cv2.imshow("mask", mask)
cv2.waitKey(0)
`,
    },
    {
      id: 'chap05-13-sort',
      filename: '13.sort.py',
      title: 'sort',
      code: `import numpy as np, cv2

m = np.random.randint(0,100, 15).reshape(3,5)           # 임의 난수 생성
# 행렬 원소 정렬
sort1 = cv2.sort(m, cv2.SORT_EVERY_ROW)                       # 행단위 오름차순
sort2 = cv2.sort(m, cv2.SORT_EVERY_COLUMN)                    # 열단위(세로) 오름차순
sort3 = cv2.sort(m, cv2.SORT_EVERY_ROW + cv2.SORT_DESCENDING) # 행단위(가로) 내림차순
sort4 = np.sort(m, axis=1)                                      # 세로축 정렬
sort5 = np.sort(m, axis=0)                                      # 가로축 정렬
sort6 = np.sort(m, axis=1)[:, ::-1]                             # 가로축 내림차순 정렬

titles= ['m','sort1','sort2','sort3','sort4','sort5', 'sort6']
for title in titles:
        print("[%s] = \\n%s\\n" %(title, eval(title)))
`,
    },
    {
      id: 'chap05-14-sortidx',
      filename: '14.sortidx.py',
      title: 'sortidx',
      code: `import numpy as np, cv2

m = np.random.randint(0,100, 15).reshape(3,5)           # 임의 난수 생성

m_sort1 = cv2.sortIdx(m, cv2.SORT_EVERY_ROW)        # 행렬 원소의 원본 좌표
m_sort2 = cv2.sortIdx(m, cv2.SORT_EVERY_COLUMN)
m_sort3 = np.argsort(m, axis=0)                         # 세로축 정렬

print("[m1] = \\n%s\\n" % m)
print("[m_sort1] = \\n%s\\n" % m_sort1)
print("[m_sort2] = \\n%s\\n" % m_sort2)
print("[m_sort3] = \\n%s\\n" % m_sort3)
`,
    },
    {
      id: 'chap05-15-sortidx_rect',
      filename: '15.sortidx_rect.py',
      title: 'sortidx rect',
      code: `import numpy as np, cv2

def print_rects(rects):
    print("-" * 46)                             	# 라인 출력
    print("사각형 원소\\t\\t랜덤 사각형 정보\\t\\t  크기")
    print("-" * 46)
    for i, (x,y, w,h, a) in enumerate(rects):		# 저장 데이터 출력
         print("rects[%i] = [(%3d,%3d) from (%3d,%3d)] %5d" %(i, x, y, w, h, a))
    print()

rands = np.zeros((5, 5), np.uint16)        		    # 5행 4열 행렬 생성
starts = cv2.randn(rands[:, :2 ], 100, 50)     		# 0~4행까지 시작좌표 랜덤 생성
ends = cv2.randn(rands[:, 2:-1], 300, 50)       		# 5~9행까지 종료좌표 랜덤 생성

sizes = cv2.absdiff(starts, ends)					# 시작좌표와 종료좌표간 차분 절대값
areas = sizes[:, 0] * sizes[:, 1]
rects = rands.copy()
rects[:, 2:-1] = sizes
rects[:,-1] = areas

idx = cv2.sortIdx(areas, cv2.SORT_EVERY_COLUMN).flatten()
# idx = np.argsort(areas, axis=0)

print_rects(rects)
print_rects(rects[idx.astype('int')])

## 리스트 생성 방식
# rects = ["[(%3d,%3d) from (%3d,%3d)]" %(p[0], p[1], s[0], s[1])
#          for p, s in zip(starts, sizes)]				# 시작좌표와 크기로 리스트 생성
# areas = [s[0]*s[1] for s in sizes]					# 넓이 계산 및 리스트에 저장
#
# # 정렬 후, 정렬 원소의 원본 좌표 반환
# sort_idx = cv2.sortIdx(np.array(areas), cv2.SORT_EVERY_COLUMN)
# sort_idx = map(int , sort_idx)
#
# print("-" * 46)                             	# 라인 출력
# print("사각형 원소\\t\\t랜덤 사각형 정보\\t  크기")
# print("-" * 46)
# for i, rect, area in zip(range(5), rects, areas):		# 저장 데이터 출력
#     print("rects["+ str(i) + "] =", rect, area)
#
# print()
# print("-" * 46)
# print("사각형 원소\\t\\t정렬 사각형 정보\\t  크기")
# print("-" * 46)
# for idx in sort_idx:									# 정렬 데이터 출력
#     print("rects[" + str(idx) + "] =", rects[idx], areas[idx])


`,
    },
    {
      id: 'chap05-16-mat_reduce',
      filename: '16.mat_reduce.py',
      title: 'mat reduce',
      code: `import numpy as np, cv2

m = np.random.rand(3,5) * 1000//10

reduce_sum = cv2.reduce(m, dim=0, rtype=cv2.REDUCE_SUM) # 0 - 열방향 축소
reduce_avg = cv2.reduce(m, dim=1, rtype=cv2.REDUCE_AVG) # 1 - 행방향 축소
reduce_max = cv2.reduce(m, dim=0, rtype=cv2.REDUCE_MAX)
reduce_min = cv2.reduce(m, dim=1, rtype=cv2.REDUCE_MIN)

print("[m1] = \\n%s\\n" %m)
print("[m_reduce_sum] =", reduce_sum.flatten())
print("[m_reduce_avg] =", reduce_avg.flatten())
print("[m_reduce_max] =", reduce_max.flatten())
print("[m_reduce_min] =", reduce_min.flatten())
`,
    },
    {
      id: 'chap05-17-mat_gemm',
      filename: '17.mat_gemm.py',
      title: 'mat gemm',
      code: `import numpy as np, cv2

src1 = np.array([1, 2, 3, 1, 2, 3], np.float32).reshape(2, 3) # 2x3 행렬 선언
src2 = np.array([1, 2, 3, 4, 5, 6], np.float32).reshape(2, 3)
src3 = np.array([1, 2, 1, 2, 1, 2], np.float32).reshape(3, 2) # 3x2 행렬 선언
alpha, beta = 1.0, 1.0

dst1 = cv2.gemm(src1, src2, alpha, None, beta, flags=cv2.GEMM_1_T)
dst2 = cv2.gemm(src1, src2, alpha, None, beta, flags=cv2.GEMM_2_T)
dst3 = cv2.gemm(src1, src3, alpha, None, beta)

titles = ['src1','src1','src1','dst1','dst2','dst3']
for title in titles:
    print("[%s] = \\n%s\\n" % (title, eval(title)))`,
    },
    {
      id: 'chap05-18-point_transform',
      filename: '18.point_transform.py',
      title: 'point transform',
      code: `import numpy as np, cv2

theta = 20 * np.pi / 180                        # 회전할 라디안 각도 계산
rot_mat = np.array([[np.cos(theta), -np.sin(theta)],
                    [np.sin(theta),  np.cos(theta)]] , np.float32)            # 넘파이 행렬 생성

pts1 = np.array([(250, 30), (400, 70),
                 (350, 250), (150, 200)], np.float32)
pts2 = cv2.gemm(pts1, rot_mat, 1, None, 1, flags=cv2.GEMM_2_T )

for i, (pt1, pt2) in enumerate(zip(pts1, pts2)):
    print("pts1[%d] = %s, pst2[%d]= %s" %(i, pt1, i, pt2))

## 영상 생성 및 4개의 좌표 그리기
image = np.full((400, 500, 3), 255, np.uint8)
cv2.polylines(image, [np.int32(pts1)], True, (0, 255, 0), 2)
cv2.polylines(image, [np.int32(pts2)], True, (255, 0, 0), 3)
cv2.imshow("image", image)
cv2.waitKey(0)`,
    },
    {
      id: 'chap05-19-equation',
      filename: '19.equation.py',
      title: 'equation',
      code: `import numpy as np, cv2

data = [ 3, 0, 6, -3, 4, 2, -5,-1, 9]				    # 1차원 리스트 생성
m1 = np.array(data, np.float32).reshape(3,3)
m2 = np.array([36, 10, 28], np.float32)

ret, inv = cv2.invert(m1, cv2.DECOMP_LU)                # 역행렬 계산
if ret:
    dst1 = inv.dot(m2)                                  # numpy 제공 행렬곱 함수
    dst2 = cv2.gemm(inv, m2, 1, None, 1)                # OpenC 제공 행렬곱 함수
    ret, dst3 = cv2.solve(m1, m2, cv2.DECOMP_LU)        # 연립방정식 풀이

    print("[inv] = \\n%s\\n" % inv)
    print("[dst1] =", dst1.flatten())                   # 다행 1열 행렬을 한행에 표시
    print("[dst2] =", dst2.flatten())                   # 행렬을 벡터로 변환
    print("[dst3] =", dst3.flatten())                   # 행렬을 벡터로 변환
else:
    print("역행렬이 존재하지 않습니다.")


`,
    },
  ],

  'chap06': [
    {
      id: 'chap06-01-mat_access',
      filename: '01.mat_access.py',
      title: 'mat access',
      code: `import numpy as np

def mat_access1(mat):
    for i in range(mat.shape[0]):
        for j in range(mat.shape[1]):
            k = mat[i, j]  # 원소 접근 - mat1[i][j] 방식도 가능
            mat[i, j] = k * 2  # 원소 할당

def mat_access2(mat):
    for i in range(mat.shape[0]):
        for j in range(mat.shape[1]):
            k = mat.item(i, j)  # 원소 접근
            mat.itemset((i, j), k * 2)  # 원소 할당

mat1 = np.arange(10).reshape(2, 5)
mat2 = np.arange(10).reshape(2, 5)

print("원소 처리 전: \\n%s\\n" % mat1)
mat_access1(mat1)
print("원소 처리 후: \\n%s\\n" % mat1)

print("원소 처리 전: \\n%s\\n" % mat2)
mat_access2(mat2)
print("원소 처리 후: \\n%s" % mat2)`,
    },
    {
      id: 'chap06-02-image_access',
      filename: '02.image_access.py',
      title: 'image access',
      code: `import numpy as np, cv2, time

def pixel_access1(image):
    image1 = np.zeros(image.shape[:2], image.dtype)
    for i in range(image.shape[0]):
        for j in range(image.shape[1]):
            pixel = image[i,j]                  # 화소 접근
            image1[i, j] =  255 - pixel            # 화소 할당
    return image1

def pixel_access2(image):
    image2 = np.zeros(image.shape[:2], image.dtype)
    for i in range(image.shape[0]):
        for j in range(image.shape[1]):
            pixel = image.item(i, j)  # 화소 접근
            image2.itemset((i, j),  255 - pixel)  # 화소 할당
    return image2

def pixel_access3(image):
    lut = [255 - i for i in range(256)]  # 룩업테이블 생성
    lut = np.array(lut, np.uint8)
    image3 = lut[image]
    return image3

def pixel_access4(image):
    image4 = cv2.subtract(255, image)
    return image4

def pixel_access5(image):
    image5 = 255 - image
    return image5

image = cv2.imread("images/bright.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 오류 발생")

# 수행시간 체크
def time_check(func, msg):
    start_time = time.perf_counter()
    ret_img = func(image)
    elapsed = (time.perf_counter() - start_time) * 1000
    print(msg, "수행시간 : %.2f ms" % elapsed)
    return ret_img

image1 = time_check(pixel_access1, "[방법 1] 직접 접근 방식")
image2 = time_check(pixel_access2, "[방법 2] item() 함수 방식")
image3 = time_check(pixel_access3, "[방법 3] 룩업 테이블 방식")
image4 = time_check(pixel_access4, "[방법 4] OpenCV 함수 방식")
image5 = time_check(pixel_access5, "[방법 5] ndarray 연산 방식")

# 결과 영상 보기
cv2.imshow("image  - original", image)
cv2.imshow("image1 - directly access to pixel", image1)
cv2.imshow("image2 - item()/itemset()", image2)
cv2.imshow("image3 - LUT", image3)
cv2.imshow("image4 - OpenCV", image4)
cv2.imshow("image5 - ndarray 방식", image5)
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-03-grayscale_image',
      filename: '03.grayscale_image.py',
      title: 'grayscale image',
      code: `import numpy as np, cv2

image1 = np.zeros((50, 512), np.uint8)         # 50 x 512 영상 생성
image2 = np.zeros((50, 512), np.uint8)

rows, cols = image1.shape[:2]

for i in range(rows):                           # 행렬 전체 조회
    for j in range(cols):
        image1.itemset((i, j), j//2)          # 화소값 점진적 증가
        image2.itemset((i, j), j // 20*10)    # 계단 현상 증가

cv2.imshow("image1", image1)
cv2.imshow("image2", image2)
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-03-pixel_value',
      filename: '03.pixel_value.py',
      title: 'pixel value',
      code: `import cv2

image = cv2.imread("images/pixel.jpg", cv2.IMREAD_GRAYSCALE) # 영상 읽기
if image is None: raise Exception("영상 파일 읽기 오류")

(x,y),(w,h) = (180, 37), (15, 10)                   # 좌표는 x, y
roi_img = image[y:y+h, x:x+w]                   # 행렬 접근은 y, x

#print(“[roi_img] =\\n”, roi_img) # 행렬 원소 바로 출력 가능

print("[roi_img] =")
for row in roi_img:
    for p in row:
        print("%4d" % p, end="")       # 행렬 원 하나 출력
    print()

cv2.rectangle(image, (x,y, w,h), 255, 1)
cv2.imshow("image", image)
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-04-bright_dark',
      filename: '04.bright_dark.py',
      title: 'bright dark',
      code: `import cv2

image = cv2.imread("images/bright.jpg", cv2.IMREAD_GRAYSCALE)    # 영상 읽기
if image is None: raise Exception("영상 파일 읽기 오류")

# OpenCV 함수 이용
dst1 = cv2.add(image, 100)                  # 영상 밝게 saturation 방식
dst2 = cv2.subtract(image, 100)             # 영상 어둡게

# numpy array 이용
dst3 = image + 100                          # 영상 밝게 modulo 방식
dst4 = image - 100                          # 영상 어둡게

cv2.imshow("original image", image)
cv2.imshow("dst1- bright: OpenCV", dst1)
cv2.imshow("dst2- dark: OpenCV", dst2)
cv2.imshow("dst3- bright: numpy", dst3)
cv2.imshow("dst4- dark: numpy", dst4);
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-05-image_synthesis',
      filename: '05.image_synthesis.py',
      title: 'image synthesis',
      code: `import numpy as np, cv2

image1 = cv2.imread("images/add1.jpg", cv2.IMREAD_GRAYSCALE)   # 영상 읽기
image2 = cv2.imread("images/add2.jpg", cv2.IMREAD_GRAYSCALE)
if image1 is None or image2 is None: raise Exception("영상 파일 읽기 오류 발생")

# 영상 합성
alpha, beta = 0.6, 0.7                                        # 곱샘 비율
add_img1 = cv2.add(image1 , image2)                            # 두 영상 단순 더하기
add_img2 = cv2.add(image1 * alpha , image2 * beta)             # 두영상 비율에 따른 더하기
add_img2 = np.clip(add_img2, 0, 255).astype("uint8")           # saturation 처리
add_img3 = cv2.addWeighted(image1, alpha, image2, beta, 0)     # 두영상 비율에 따른 더하기

titles = ['image1','image2','add_img1','add_img2','add_img3']
for t in titles: cv2.imshow(t, eval(t))
cv2.waitKey(0)
`,
    },
    {
      id: 'chap06-06-contrast',
      filename: '06.contrast.py',
      title: 'contrast',
      code: `import numpy as np, cv2

image = cv2.imread("images/contrast.jpg", cv2.IMREAD_GRAYSCALE)  # 영상 읽기
if image is None: raise Exception("영상 파일 읽기 오류 발생")

noimage = np.zeros(image.shape[:2], image.dtype)        # 더미 영상
avg = cv2.mean(image)[0]/2.0                            # 영상 화소 평균의 절반

dst1 = cv2.scaleAdd(image, 0.2, noimage) + 20               # 영상대비 감소
dst2 = cv2.scaleAdd(image, 2.0, noimage)                # 영상대비 증가
dst3 = cv2.addWeighted(image, 0.5, noimage, 0, avg)     # 명암대비 감소
dst4 = cv2.addWeighted(image, 2.0, noimage, 0,-avg)     # 명암대비 증가

# 영상 띄우기
cv2.imshow("image", image)
cv2.imshow("dst1 - decrease contrast", dst1)
cv2.imshow("dst2 - increase contrast", dst2)
cv2.imshow("dst3 - decrease contrast using average", dst3)
cv2.imshow("dst4 - increase contrast using average", dst4)

cv2.imwrite("dst.jpg",dst1)
cv2.waitKey(0)


`,
    },
    {
      id: 'chap06-07-calc_histogram',
      filename: '07.calc_histogram.py',
      title: 'calc histogram',
      code: `import numpy as np, cv2

def calc_histo(image, hsize, ranges=[0, 256]):  # 행렬 원소의 1차원 히스토그램 계산
    hist = np.zeros((hsize, 1), np.float32)  # 히스토그램 누적 행렬
    gap = ranges[1] / hsize  # 계급 간격

    for row in image:  # 2차원 행렬 순회 방식
        for pix in row:
            idx = int(pix / gap)
            hist[idx] += 1
    return hist

image = cv2.imread("images/pixel_test.jpg", cv2.IMREAD_GRAYSCALE)  # 영상 읽기
if image is None: raise Exception("영상 파일 읽기 오류 발생")

hsize, ranges = [16], [0, 256]  # 히스토그램 간격수, 값 범위
hist = calc_histo(image, hsize[0], ranges)  # 사용자 정의 히스토그램 계산

print("사용자 정의 함수: \\n", hist.flatten())  # 행렬을 벡터로 변환하여 출력
cv2.imshow("image", image)
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-07-calc_histogram2',
      filename: '07.calc_histogram2.py',
      title: 'calc histogram2',
      code: `import numpy as np, cv2

def calc_histo(image, channels, hsize, ranges ):
    ch = len(channels)
    shape = hsize if ch >1 else (hsize[0], 1)
    hist = np.zeros(shape, np.float32)         # 히스토그램 누적 행렬
    gap = np.divide(ranges[1::2], hsize)                # 계급 간격

    for row in image:  # 2차원 행렬 순회 방식
        for val in row:
            idx = np.divide(val[channels], gap).astype('uint')
            hist[tuple(idx)]+= 1
    return hist

image = cv2.imread("images/pixel.jpg") # 영상 읽기
if image is None: raise Exception("영상 파일 읽기 오류 발생")

ch, hsize, ranges =[0,1],  [8, 8], [0, 256,0, 256]                  # 히스토그램 간격수, 값 범위
hist1 = calc_histo(image, ch ,hsize, ranges)                  # 사용자 정의 히스토그램 계산
hist2 = cv2.calcHist([image], ch, None, hsize, ranges)  # OpenCV 함수

print("사용자 정의 함수: \\n", hist1)                           # 행렬을 벡터로 변환하여 출력
print("사용자 정의 함수: \\n", hist2)
cv2.imshow("image", image)
cv2.waitKey(0)

`,
    },
    {
      id: 'chap06-08-calc_histogram_opencv',
      filename: '08.calc_histogram_opencv.py',
      title: 'calc histogram opencv',
      code: `import numpy as np, cv2

def calc_histo(image, hsize, ranges=[0, 256]):  # 행렬 원소의 1차원 히스토그램 계산
    hist = np.zeros((hsize, 1), np.float32)  # 히스토그램 누적 행렬
    gap = ranges[1] / hsize  # 계급 간격

    for i in range(image.shape[0]):  # 2차원 행렬 순회 방식
        for j in range(image.shape[1]):
            idx = int(image.item(i,j) / gap)
            hist[idx] += 1
    return hist

image = cv2.imread("images/pixel.jpg", cv2.IMREAD_GRAYSCALE) # 영상 읽기
if image is None: raise Exception("영상 파일 읽기 오류 발생")

hsize, ranges = [32], [0, 256]                  # 히스토그램 간격수, 값 범위
gap = ranges[1]/hsize[0]
ranges_gap  = np.arange(0, ranges[1]+1, gap)
hist1 = calc_histo(image, hsize[0], ranges)  # User 함수
hist2 = cv2.calcHist([image], [0], None, hsize, ranges)  # OpenCV 함수
hist3, bins = np.histogram(image, ranges_gap )

print("User 함수: \\n", hist1.flatten())                # 행렬을 벡터로 변환하여 출력
print("OpenCV 함수: \\n", hist2.flatten())                # 행렬을 벡터로 변환하여 출력
print("numpy 함수: \\n", hist3)                           # 행렬을 벡터로 변환하여 출력

cv2.imshow("image", image)
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-09-draw_histogram',
      filename: '09.draw_histogram.py',
      title: 'draw histogram',
      code: `import numpy as np, cv2

def draw_histo(hist, shape=(200, 256)):
    hist_img = np.full( shape, 255, np.uint8)
    cv2.normalize(hist, hist, 0, shape[0], cv2.NORM_MINMAX)
    gap = hist_img.shape[1]/hist.shape[0]             # 한 계급 너비

    for i, h in enumerate(hist):
        x = int(round(i * gap))                         # 막대 사각형 시작 x 좌표
        w = int(round(gap))
        roi = (x, 0, w, int(h))
        cv2.rectangle(hist_img, roi, 0, cv2.FILLED)

    return cv2.flip(hist_img, 0)                        # 영상 상하 뒤집기 후 반환

image = cv2.imread("images/draw_hist.jpg", cv2.IMREAD_GRAYSCALE)  # 영상 읽기
if image is None: raise Exception("영상 파일 읽기 오류")
    
hist = cv2.calcHist([image], [0], None, [32], [0, 256])
hist_img = draw_histo(hist)

cv2.imshow("image", image)
cv2.imshow("hist_img", hist_img)
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-10-hue_histogram',
      filename: '10.hue_histogram.py',
      title: 'hue histogram',
      code: `import numpy as np, cv2

def make_palette(rows):
    # 리스트 생성 방식
    hue = [round(i * 180 / rows) for i in range(rows)]  # hue 값 리스트 계산
    hsv = [[(h, 255, 255)] for h in hue]                # (hue, 255,255) 화소값 계산
    hsv = np.array(hsv, np.uint8)                       # numpy 행렬의 uint8형 변환
    # # 반복문 방식
    # hsv = np.full((rows, 1, 3), (255,255,255), np.uint8)
    # for i in range(0, rows):                                # 행수만큼 반복
    #     hue = round(i / rows * 180 )                        # 색상 계산
    #     hsv[i] = (hue, 255, 255)                            # HSV 컬러 지정

    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)         # HSV 컬러 -> BGR 컬러

def draw_histo_hue(hist, shape=(200, 256,3)):
    hsv_palate = make_palette(hist.shape[0])                      # 색상 팔레트 생성
    hist_img = np.full(shape, 255, np.uint8)
    cv2.normalize(hist, hist, 0, shape[0], cv2.NORM_MINMAX)    # 정규화

    gap = hist_img.shape[1] / hist.shape[0]  # 한 계급 크기
    for i, h in enumerate(hist):
        x, w = int(round(i * gap)), int(round(gap))
        color = tuple(map(int, hsv_palate[i][0]))                    # 정수형 튜플로 변환
        cv2.rectangle(hist_img, (x,0,w, int(h) ), color , cv2.FILLED) # 팔레트 색으로 그리기

    return cv2.flip(hist_img, 0)

image = cv2.imread("images/hue_hist.jpg", cv2.IMREAD_COLOR)  # 영상 읽기
if image is None: raise Exception("영상 파일 읽기 오류")

hsv_img = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)   # BGR 컬러 -> HSV 컬러     
hue_hist = cv2.calcHist( [hsv_img], [0], None, [18], [0,180])       # Hue 채널 히스토그램 계산
hue_hist_img = draw_histo_hue(hue_hist, (200, 360, 3)) # 히스토그램 그래프

cv2.imshow("image", image)
cv2.imshow("hue_hist_img", hue_hist_img)
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-11-histogram_stretching',
      filename: '11.histogram_stretching.py',
      title: 'histogram stretching',
      code: `import numpy as np, cv2
from Common.histogram import draw_histo

def search_value_idx(hist, bias = 0):
    for i in range(hist.shape[0]):
        idx = np.abs(bias - i)                     # 검색 위치 (처음 또는 마지막)
        if hist[idx] > 0:  return idx                             # 위치 반환
    return -1                                      # 대상 없으면 반환

image = cv2.imread("dst.jpg", cv2.IMREAD_GRAYSCALE)   # 영상읽기
if image is None: raise Exception("영상 파일 읽기 오류")

bsize, ranges = [64], [0,256]                        # 계급 개수 및 화소 범위
hist = cv2.calcHist([image], [0], None, bsize, ranges)

bin_width  = ranges[1]/bsize[0]                      # 계급 너비
high = search_value_idx(hist, bsize[0] - 1) * bin_width
low  = search_value_idx(hist, 0) * bin_width

idx = np.arange(0, 256)
idx = (idx - low) * 255/(high-low)	# 수식 적용하여 인덱스 생성
idx[0:int(low)] = 0
idx[int(high+1):] = 255

dst = cv2.LUT(image, idx.astype('uint8'))
## 룩업 테이블 사용하지 않고 직접 구현
# dst = np.zeros(image.shape, dtype=image.dtype)
# for i in range(dst.shape[0]):
#     for j in range(dst.shape[1]):
#         dst[i,j] = idx[image[i,j]]

hist_dst = cv2.calcHist([dst], [0], None, bsize, ranges)  # 결과 영상 히스토그램 재계산
hist_img = draw_histo(hist, (200,360))          # 원본 영상 히스토그램 그리기
hist_dst_img = draw_histo(hist_dst,(200,360))  # 결과 영상 히스토그램 그리기

print("high_value = ", high)
print("low_value = " , low)
cv2.imshow("image", image);         cv2.imshow("hist_img", hist_img)
cv2.imshow("dst", dst);             cv2.imshow("hist_dst_img", hist_dst_img)
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-12-histogram_equalize',
      filename: '12.histogram_equalize.py',
      title: 'histogram equalize',
      code: `import numpy as np, cv2
from Common.histogram import draw_histo

image = cv2.imread("images/equalize.jpg", cv2.IMREAD_GRAYSCALE) # 영상 읽기
if image is None: raise Exception("영상 파일 읽기 오류")

bins, ranges = [256], [0, 256]
hist = cv2.calcHist([image], [0], None, bins, ranges)    # 히스토그램 계산

# 히스토그램 누적합 계산
accum_hist = np.zeros(hist.shape[:2], np.float32)
accum_hist[0] = hist[0]
for i in range(1, hist.shape[0]):
    accum_hist[i] = accum_hist[i - 1] + hist[i]

accum_hist = (accum_hist / sum(hist)) * 255                 # 누적합의 정규화
dst1 = [[accum_hist[val] for val in row] for row in image] # 화소값 할당
dst1 = np.array(dst1, np.uint8)

# #numpy 함수 및 룩업 테이블 사용
# accum_hist = np.cumsum(hist)                      # 누적합 계산
# cv2.normalize(accum_hist, accum_hist, 0, 255, cv2.NORM_MINMAX)  # 정규화
# dst1 = cv2.LUT(image, accum_hist.astype("uint8"))  #룩업 테이블로 화소값할당

dst2 = cv2.equalizeHist(image)                # OpenCV 히스토그램 평활화
hist1 = cv2.calcHist([dst1], [0], None, bins, ranges)   # 히스토그램 계산
hist2 = cv2.calcHist([dst2], [0], None, bins, ranges)   # 히스토그램 계산
hist_img = draw_histo(hist)
hist_img1 = draw_histo(hist1)
hist_img2 = draw_histo(hist2)

cv2.imshow("image", image);             cv2.imshow("hist_img", hist_img)
cv2.imshow("dst1_User", dst1);          cv2.imshow("User_hist", hist_img1)
cv2.imshow("dst2_OpenCV", dst2);        cv2.imshow("OpenCV_hist", hist_img2)
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-13-convert_cmy',
      filename: '13.convert_cmy.py',
      title: 'convert cmy',
      code: `import numpy as np, cv2

BGR_img = cv2.imread("images/color_model.jpg", cv2.IMREAD_COLOR) # 컬러 영상 읽기
if BGR_img is None: raise Exception("영상 파일 읽기 오류")
    
white = np.array([255, 255, 255], np.uint8)
CMY_img = white - BGR_img
Cyan, Magenta, Yellow = cv2.split(CMY_img) # 채널 분리

titles = ['BGR_img','CMY_img','Cyan','Magenta','Yellow']
[cv2.imshow(t, eval(t)) for t in titles]
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-14-convert_cmyk',
      filename: '14.convert_cmyk.py',
      title: 'convert cmyk',
      code: `import numpy as np, cv2

BGR_img = cv2.imread("images/color_model.jpg", cv2.IMREAD_COLOR) # 컬러 영상 읽기
if BGR_img is None: raise Exception("영상 파일 읽기 오류")

white = np.array([255, 255, 255], np.uint8)
CMY_img = white - BGR_img
CMY = cv2.split(CMY_img) # 채널 분리

black = cv2.min(CMY[0], cv2.min(CMY[1], CMY[2])) # 원소 간의 최솟값 저장
Yellow, Magenta, Cyan = CMY - black

titles = ['black','Yellow','Magenta','Cyan']
[cv2.imshow(t, eval(t)) for t in titles]
cv2.waitKey(0)



`,
    },
    {
      id: 'chap06-15-convert_hsv',
      filename: '15.convert_hsv.py',
      title: 'convert hsv',
      code: `import numpy as np, cv2, math

def calc_hsi(bgr):
    # B, G, R = bgr.astype(float)                           # float 형 변환
    B, G, R = float(bgr[0]), float(bgr[1]), float(bgr[2])       # 속도면에 유리
    bgr_sum = (R + G + B)
    # 색상 계산
    tmp1 = ((R - G) + (R - B)) * 0.5
    tmp2 = math.sqrt((R - G) * (R - G) + (R - B) * (G - B))
    angle = math.acos(tmp1 / tmp2) * (180 / np.pi) if tmp2 else 0

    H = angle if B <= G else 360 - angle
    S = 1.0 - 3 * min([R, G, B]) / bgr_sum if bgr_sum else 0
    I = bgr_sum / 3                                                # 명도 계산
    return (H/2, S*255, I)

# BGR 컬러 -> HSI 컬러
def bgr2hsi(image):
    hsv = [[calc_hsi(pixel) for pixel in row] for row in image ]   # 2차원 배열 순회
    return (np.array(hsv)).astype('uint8')

BGR_img = cv2.imread("images/color_space.jpg", cv2.IMREAD_COLOR) # 컬러 영상 읽기
if BGR_img is None: raise Exception("영상 파일 읽기 오류")

HSI_img = bgr2hsi(BGR_img)                  # BGR를 HSI로 변환
HSV_img = cv2.cvtColor(BGR_img, cv2.COLOR_BGR2HSV) # OpenCV 함수
Hue, Saturation, Intensity = cv2.split(HSI_img)                    # 채널 분리
Hue2, Saturation2, Intensity2 = cv2.split(HSV_img) 					# 채널 분리

titles = ['BGR_img','Hue','Saturation','Intensity']
[cv2.imshow(t, eval(t)) for t in titles]
[cv2.imshow('OpenCV_'+t, eval(t+'2')) for t in titles[1:]]	# OpenCV 결과 영상 표시
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-16-convert_others',
      filename: '16.convert_others.py',
      title: 'convert others',
      code: `import cv2

BGR_img = cv2.imread("images/color_space.jpg", cv2.IMREAD_COLOR) # 컬러 영상 읽기
if BGR_img is None: raise Exception("영상 파일 읽기 오류")
    
Gray_img = cv2.cvtColor(BGR_img, cv2.COLOR_BGR2GRAY) # 명암도 영상 변환   
YCC_img = cv2.cvtColor(BGR_img, cv2.COLOR_BGR2YCrCb) # YCbCr 컬러 공간 변환   
YUV_img = cv2.cvtColor(BGR_img, cv2.COLOR_BGR2YUV)   # YUV 컬러 공간 변환 
LAB_img = cv2.cvtColor(BGR_img, cv2.COLOR_BGR2LAB)   # La*b* 컬러 공간 변환

YCC_ch = cv2.split(YCC_img)
YUV_ch = cv2.split(YUV_img)
Lab_ch = cv2.split(LAB_img)

cv2.imshow("BGR_img", BGR_img)
cv2.imshow("Gray_img", Gray_img)

sp1, sp2, sp3 = ['Y', 'Cr', 'Cb'] , ['Y', 'U', 'V'], ['L', 'A', 'B']
for i in range(len(sp1)):
    cv2.imshow("YCC_img[%d]-%s" %(i, sp1[i]), YCC_ch[i])
    cv2.imshow("YUV_img[%d]-%s" %(i, sp2[i]), YUV_ch[i])
    cv2.imshow("LAB_img[%d]-%s" %(i, sp3[i]), Lab_ch[i])
cv2.waitKey(0)`,
    },
    {
      id: 'chap06-17-hue_threshold',
      filename: '17.hue_threshold.py',
      title: 'hue threshold',
      code: `import numpy as np, cv2

def onThreshold(value):
    th[0] = cv2.getTrackbarPos("Hue_th1", "result")
    th[1] = cv2.getTrackbarPos("Hue_th2", "result")

    ##이진화 - 화소 직접 접근 방법
    # result = np.zeros(hue.shape, np.uint8)
    # for i in range(result.shape[0]):
    #     for j in range(result.shape[1]):
    #         if th[0] <= hue[i, j] < th[1] : result[i, j] = 255

    ##이진화 - 넘파이 함수 활용 방식
    # result = np.logical_and(hue < th[1], hue >= th[0])
    # result = result.astype('uint8') *255

    ## OpenCV 이진화 함수 이용 - 상위 값과 하위 값 제거
    _, result = cv2.threshold(hue, th[1], 255, cv2.THRESH_TOZERO_INV)
    cv2.threshold(result, th[0], 255, cv2.THRESH_BINARY, result)
    cv2.imshow("result", result)

BGR_img = cv2.imread("images/color_space.jpg", cv2.IMREAD_COLOR) # 컬러 영상 읽기
if BGR_img is None: raise Exception("영상 파일 읽기 오류")

HSV_img = cv2.cvtColor(BGR_img, cv2.COLOR_BGR2HSV) # 컬러 공간 변환
hue = np.copy(HSV_img[:,:,0])                      # hue 행렬에 색상 채널 복사

th = [50, 100]                                     # 트랙바로 선택할 범위 변수
cv2.namedWindow("result")
cv2.createTrackbar("Hue_th1", "result", th[0], 255, onThreshold)
cv2.createTrackbar("Hue_th2", "result", th[1], 255, onThreshold)
onThreshold(th[0])                                 # 이진화 수행
cv2.imshow("BGR_img", BGR_img)
cv2.waitKey(0)`,
    },
  ],

  'chap07': [
    {
      id: 'chap07-01-blurring',
      filename: '01.blurring.py',
      title: 'blurring',
      code: `import numpy as np, cv2, time

# 회선 수행 함수 - 행렬 처리 방식(속도 면에서 유리)
def filter(image, mask):
    rows, cols = image.shape[:2]
    dst = np.zeros((rows, cols), np.float32)                 # 회선 결과 저장 행렬
    xcenter, ycenter = mask.shape[1]//2, mask.shape[0]//2  # 마스크 중심 좌표

    for i in range(ycenter, rows - ycenter):                  # 입력 행렬 반복 순회
        for j in range(xcenter, cols - xcenter):
            y1, y2 = i - ycenter, i + ycenter + 1               # 관심영역 높이 범위
            x1, x2 = j - xcenter, j + xcenter + 1               # 관심영역 너비 범위
            roi = image[y1:y2, x1:x2].astype("float32")         # 관심영역 형변환

            tmp = cv2.multiply(roi, mask)                       # 회선 적용 - OpenCV 곱셈
            dst[i, j] = cv2.sumElems(tmp)[0]                    # 출력화소 저장
    return dst                                                  # 자료형 변환하여 반환

# 회선 수행 함수 - 화소 직접 근접
def filter2(image, mask):
    rows, cols = image.shape[:2]
    dst = np.zeros((rows, cols), np.float32)                 # 회선 결과 저장 행렬
    xcenter, ycenter = mask.shape[1]//2, mask.shape[0]//2  # 마스크 중심 좌표

    for i in range(ycenter, rows - ycenter):                  # 입력 행렬 반복 순회
        for j in range(xcenter, cols - xcenter):
            sum = 0.0
            for u in range(mask.shape[0]):                    # 마스크 원소 순회
                for v in range(mask.shape[1]):
                    y, x = i + u - ycenter , j + v - xcenter
                    sum += image[y, x] * mask[u, v]           # 회선 수식
            dst[i, j] = sum
    return dst

image = cv2.imread("images/filter_blur.jpg", cv2.IMREAD_GRAYSCALE)  # 영상 읽기
if image is None: raise Exception("영상파일 읽기 오류")

# 블러링 마스크 원소 지정     
data = [1/9, 1/9, 1/9,
        1/9, 1/9, 1/9,
        1/9, 1/9, 1/9]
mask = np.array(data, np.float32).reshape(3, 3)
blur1 = filter(image, mask)                                    # 회선 수행 - 화소 직접 접근
blur2 = filter2(image, mask)                                   # 회선 수행

cv2.imshow("image", image)
cv2.imshow("blur1", blur1.astype("uint8"))
cv2.imshow("blur2", cv2.convertScaleAbs(blur1))
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-02-sharpening',
      filename: '02.sharpening.py',
      title: 'sharpening',
      code: `import numpy as np, cv2
from Common.filters import filter

image = cv2.imread("images/filter_sharpen.jpg", cv2.IMREAD_GRAYSCALE) # 영상 읽기
if image is None: raise Exception("영상파일 읽기 오류")

# 샤프닝 마스크 원소 지정 
data1 = [0, -1, 0,
        -1, 5, -1,
         0, -1, 0]
data2 = [[-1, -1, -1],
         [-1, 9, -1],
         [-1, -1, -1]]
mask1 = np.array(data1, np.float32).reshape(3, 3)
mask2 = np.array(data2, np.float32)

sharpen1 = filter(image, mask1)                     # 회선 수행 – 저자 구현 함
sharpen2 = filter(image, mask2) 
sharpen1 = cv2.convertScaleAbs(sharpen1)
sharpen2 = cv2.convertScaleAbs(sharpen2)

cv2.imshow("image", image)
cv2.imshow("sharpen1", cv2.convertScaleAbs(sharpen1))  # 윈도우 표시 위한 형변환
cv2.imshow("sharpen2", cv2.convertScaleAbs(sharpen2))
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-03-edge_roberts',
      filename: '03.edge_roberts.py',
      title: 'edge roberts',
      code: `import numpy as np, cv2
from  Common.filters import filter

def differential(image, data1, data2):
    mask1 = np.array(data1, np.float32).reshape(3, 3)
    mask2 = np.array(data2, np.float32).reshape(3, 3)

    dst1 = filter(image, mask1)
    dst2 = filter(image, mask2)
    dst = cv2.magnitude(dst1, dst2)                # 회선 결과인 두 행렬의 크기 계산
    dst1, dst2 = np.abs(dst1), np.abs(dst2)  # 회선 결과 행렬 양수 변경

    dst = np.clip(dst, 0, 255).astype("uint8")
    dst1 = np.clip(dst1, 0, 255).astype("uint8")
    dst2 = np.clip(dst2, 0, 255).astype("uint8")
    return dst, dst1, dst2

image = cv2.imread("images/edge.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")
    
data1 = [-1, 0, 0,
          0, 1, 0,
          0, 0, 0]
data2 = [ 0, 0, -1,
          0, 1, 0,
          0, 0, 0]
dst, dst1, dst2 = differential(image, data1, data2)  		# 회선 수행 및 두 방향의 크기 계산

cv2.imshow("image", image)
cv2.imshow("roberts edge", dst)
cv2.imshow("dst1", dst1)
cv2.imshow("dst2", dst2)
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-04-edge_prewitt',
      filename: '04.edge_prewitt.py',
      title: 'edge prewitt',
      code: `import numpy as np, cv2
from  Common.filters import filter

def differential(image, data1, data2):
    mask1 = np.array(data1, np.float32).reshape(3, 3)
    mask2 = np.array(data2, np.float32).reshape(3, 3)

    dst1 = filter(image, mask1)                     # 사용자 정의 회선 함수
    dst2 = filter(image, mask2)
    dst = cv2.magnitude(dst1, dst2)                 # 회선 결과 두 행렬의 크기 계산

    dst = cv2.convertScaleAbs(dst)                      # 윈도우 표시 위해 OpenCV 함수로 형변환 및 saturation 수행
    dst1 = cv2.convertScaleAbs(dst1)
    dst2 = cv2.convertScaleAbs(dst2)
    return dst, dst1, dst2

image = cv2.imread("images/edge.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")

data1 = [-1, 0, 1,                         # 프리윗 수직 마스크
         -1, 0, 1,
         -1, 0, 1]
data2 = [-1,-1,-1,                         # 프리윗 수평 마스크
          0, 0, 0,
          1, 1, 1]
dst, dst1, dst2 = differential(image, data1, data2)

cv2.imshow("image", image)
cv2.imshow("prewitt edge", dst)
cv2.imshow("dst1 - vertical mask", dst1)
cv2.imshow("dst2 - horizontal mask", dst2)
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-05-edge_sobel',
      filename: '05.edge_sobel.py',
      title: 'edge sobel',
      code: `import numpy as np, cv2
from  Common.filters import differential

image = cv2.imread("images/edge.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")
    
data1 = [-1, 0, 1,                  # 수직 마스크
         -2, 0, 2,
         -1, 0, 1]
data2 = [-1,-2,-1,                 # 수평 마스크
          0, 0, 0,
          1, 2, 1]
dst, dst1, dst2 = differential(image, data1, data2)     # 두 방향 회선 및 크기(에지 강도) 계산
# OpenCV 제공 소벨 에지 계산
dst3 = cv2.Sobel(np.float32(image), cv2.CV_32F, 1, 0, 3)  # x방향 미분 - 수직 마스크
dst4 = cv2.Sobel(np.float32(image), cv2.CV_32F, 0, 1, 3)  # y방향 미분 - 수평 마스크
dst3 = cv2.convertScaleAbs(dst3)                          # 절댓값 및 uint8 형변환
dst4 = cv2.convertScaleAbs(dst4)

cv2.imshow("dst- sobel edge", dst)
cv2.imshow("dst1- vertical_mask", dst1)
cv2.imshow("dst2- horizontal_mask", dst2)
cv2.imshow("dst3- vertical_OpenCV", dst3)
cv2.imshow("dst4- horizontal_OpenCV", dst4)
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-06-edge_laplacian',
      filename: '06.edge_laplacian.py',
      title: 'edge laplacian',
      code: `import numpy as np, cv2

image = cv2.imread("images/laplacian.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")

data1 = [	[0,		1,		0],  												# 4 방향 필터
			[1, 	-4,		1],
			[0, 	1,		0]]
data2 = [	[-1,	-1,		-1],													# 8 방향 필터
			[-1, 	8, 	    -1],
			[-1, 	-1, 	-1]]
mask4 = np.array(data1, np.int16)   # 음수가 있으므로 자료형이 int8인 행렬 선언
mask8 = np.array(data2, np.int16)
# OpenCV 함수 cv2.filter2D() 통한 라플라시안 수행
dst1 = cv2.filter2D(image, cv2.CV_16S, mask4)
dst2 = cv2.filter2D(image, cv2.CV_16S, mask8)
dst3 = cv2.Laplacian(image, cv2.CV_16S, 1)      # OpenCV 라플라시안 수행 함수

cv2.imshow("image", image)
cv2.imshow("filter2D 4-direction", cv2.convertScaleAbs(dst1))
cv2.imshow("filter2D 8-direction", cv2.convertScaleAbs(dst2))
cv2.imshow("Laplacian_OpenCV", cv2.convertScaleAbs(dst3))
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-07-edge_DOG',
      filename: '07.edge_DOG.py',
      title: 'edge DOG',
      code: `import numpy as np, cv2

image = cv2.imread("images/dog.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")

gaus = cv2.GaussianBlur(image, (9,9), 0, 0)            # 가우시안 마스크 적용
dst1 = cv2.Laplacian(gaus, cv2.CV_16S, 9)             # 라플라시안 수행

gaus1 = cv2.GaussianBlur(image, (3, 3), 0)          # 가우사안 블러링
gaus2 = cv2.GaussianBlur(image, (9, 9), 0)
dst2 = gaus1 - gaus2          # DoG 수행

cv2.imshow("image", image)
cv2.imshow("dst1 - LoG", dst1.astype("uint8"))
cv2.imshow("dst2 - DoG", dst2)
cv2.waitKey(0)
`,
    },
    {
      id: 'chap07-08-edge_canny',
      filename: '08.edge_canny.py',
      title: 'edge canny',
      code: `import numpy as np, cv2

def nonmax_suppression(sobel, direct):
    rows, cols = sobel.shape[:2]
    dst = np.zeros((rows, cols), np.float32)
    for i in range(1, rows - 1):
        for j in range(1, cols - 1):
            # 행렬 처리를 통해 이웃 화소 가져오기
            values = sobel[i-1:i+2, j-1:j+2].flatten()
            first = [3, 0, 1, 2]
            id = first[direct[i, j]]
            v1, v2 = values[id], values[8-id]

            ## if 문으로 이웃 화소 가져오기
            # if direct[i, j] == 0: # 기울기 방향 0도
            # v1, v2 = sobel[i, j–1], sobel[i, j+1]
            # if direct[i, j] == 1: # 기울기 방향 45도
            # v1, v2 = sobel[i–1, j–1], sobel[i+1, j+1]
            # if direct[i, j] == 2: # 기울기 방향 90도
            # v1, v2 = sobel[i–1, j], sobel[i+1, j]
            # if direct[i, j] == 3 # 기울기 방향 135도
            # v1, v2 = sobel[i+1, j–1], sobel[i–1, j+1]

            dst[i, j] = sobel[i, j] if (v1 < sobel[i , j] > v2) else 0
    return dst

def trace(max_sobel, i, j, low):
    h, w = max_sobel.shape
    if (0 <= i < h and 0 <= j < w) == False: return  # 추적 화소 범위 확인
    if pos_ck[i, j] == 0 and max_sobel[i, j] > low:
        pos_ck[i, j] = 255
        canny[i, j] = 255

        trace(max_sobel, i - 1, j - 1, low)# 추적 함수 재귀 호출 - 8방향 추적
        trace(max_sobel, i    , j - 1, low)
        trace(max_sobel, i + 1, j - 1, low)
        trace(max_sobel, i - 1, j    , low)
        trace(max_sobel, i + 1, j    , low)
        trace(max_sobel, i - 1, j + 1, low)
        trace(max_sobel, i    , j + 1, low)
        trace(max_sobel, i + 1, j + 1, low)

def hysteresis_th(max_sobel, low, high):                # 이력 임계값 수행
    rows, cols = max_sobel.shape[:2]
    for i in range(1, rows - 1):  # 에지 영상 순회
        for j in range(1, cols - 1):
            if max_sobel[i, j] > high:  trace(max_sobel, i, j, low)  # 추적 시작

image = cv2.imread("images/canny.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 오류")

pos_ck = np.zeros(image.shape[:2], np.uint8)
canny = np.zeros(image.shape[:2], np.uint8)

# 사용자 정의 캐니 에지
gaus_img = cv2.GaussianBlur(image, (5, 5), 0.3)
Gx = cv2.Sobel(np.float32(gaus_img), cv2.CV_32F, 1, 0, 3)  # x방향 마스크
Gy = cv2.Sobel(np.float32(gaus_img), cv2.CV_32F, 0, 1, 3)  # y방향 마스크
sobel = np.fabs(Gx) + np.fabs(Gy)  # 두 행렬 절댓값 덧셈
# sobel = cv2.magnitude(Gx, Gy)                            # 두 행렬 벡터 크기

directs = cv2.phase(Gx, Gy) / (np.pi / 4)
directs = directs.astype(int) % 4
max_sobel = nonmax_suppression(sobel, directs)   # 비최대치 억제
hysteresis_th(max_sobel, 100, 150)          # 이력 임계값

canny2 = cv2.Canny(image, 100, 150)                 # OpenCV 캐니 에지

cv2.imshow("image", image)
cv2.imshow("canny", canny)                 # 사용자 정의 캐니
cv2.imshow("OpenCV_Canny", canny2)           # OpenCV 캐니 에지
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-09-filter_minmax',
      filename: '09.filter_minmax.py',
      title: 'filter minmax',
      code: `import numpy as np, cv2

def minmax_filter(image, ksize, mode):
    rows, cols = image.shape[:2]
    dst = np.zeros((rows, cols), np.uint8)
    center = ksize // 2                                 # 마스크 절반 크기

    for i in range(center, rows - center):             # 입력 영상 순회
        for j in range(center, cols - center):
            # 마스크 영역 행렬 처리 방식
            y1, y2 = i - center, i + center + 1          # 마스크 높이 범위
            x1, x2 = j - center, j + center + 1          # 마스크 너비 범위
            mask = image[y1:y2, x1:x2]                   # 마스크 영역
            dst[i, j] = cv2.minMaxLoc(mask)[mode]
    return dst

image = cv2.imread("images/min_max.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")
    
minfilter_img = minmax_filter(image, 3, 0)               	# 3x3 마스크 최솟값 필터링
maxfilter_img = minmax_filter(image, 3, 1)               	# 3x3 마스크 최솟값 필터링

cv2.imshow("image", image)
cv2.imshow("minfilter_img", minfilter_img)
cv2.imshow("maxfilter_img", maxfilter_img)
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-10-filter_average',
      filename: '10.filter_average.py',
      title: 'filter average',
      code: `import numpy as np, cv2

def average_filter(image, ksize):
    rows, cols = image.shape[:2]
    dst = np.zeros((rows, cols), np.uint8)
    center = ksize // 2                                 # 마스크 절반 크기

    for i in range(rows):           # 입력 영상 순회
        for j in range(cols):
            y1, y2 = i - center, i + center + 1        # 마스크 높이 범위
            x1, x2 = j - center, j + center + 1        # 마스크 너비 범위
            if y1 < 0 or y2 > rows or x1 < 0 or x2 > cols :
                dst[i, j] = image[i, j]
            else:
                mask = image[y1:y2, x1:x2]                 # 범위 지정
                dst[i, j] = cv2.mean(mask)[0]
    return dst

image = cv2.imread("images/filter_avg.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")

avg_img  = average_filter(image, 5)                    # 사용자 정의 평균값 필터 함수
blur_img = cv2.blur(image, (5, 5), borderType=cv2.BORDER_CONSTANT) # OpenCV의 블러링 함수
box_img  = cv2.boxFilter(image, ddepth=-1, ksize=(5, 5))   # OpenCV의 박스 필터 함수

cv2.imshow("image", image),
cv2.imshow("avg_img", avg_img)
cv2.imshow("blur_img", box_img)
cv2.imshow("box_img", box_img)
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-11-filter_median',
      filename: '11.filter_median.py',
      title: 'filter median',
      code: `import numpy as np, cv2

def median_filter(image, ksize):
    rows, cols = image.shape[:2]
    dst = np.zeros((rows, cols), np.uint8)
    center = ksize // 2                                 # 마스크 절반 크기

    for i in range(center, rows - center):              # 입력 영상 순회
        for j in range(center, cols - center):
            y1, y2 = i - center, i + center + 1             # 마스크 높이 범위
            x1, x2 = j - center, j + center + 1             # 마스크 너비 범위
            mask = image[y1:y2, x1:x2].flatten()            # 마스크 영역

            sort_mask = cv2.sort(mask, cv2.SORT_EVERY_COLUMN)    # 정렬 수행
            dst[i, j] = sort_mask[sort_mask.size//2]                  # 출력화소로 지정
    return dst

def salt_pepper_noise(img, n):
    h, w = img.shape[:2]
    x, y = np.random.randint(0, w, n), np.random.randint(0, h, n)
    noise = img.copy()
    for (x,y) in zip(x,y):
        noise[y, x] = 0 if np.random.rand() < 0.5 else 255
    return noise

image = cv2.imread("images/median2.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")
    
noise = salt_pepper_noise(image, 500)
med_img1 = median_filter(noise, 3)                            # 사용자 정의 함수
med_img2 = cv2.medianBlur(noise, 3)                          # OpenCV 제공 함수

cv2.imwrite('../../python/exec/chap07/images/noise.jpg', noise)

cv2.imshow("image", image),
cv2.imshow("noise", noise),
cv2.imshow("median - User", med_img1)
cv2.imshow("median - OpenCV", med_img2)
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-12-filter_gaussian',
      filename: '12.filter_gaussian.py',
      title: 'filter gaussian',
      code: `import numpy as np, cv2

def getGaussianMask(ksize, sigmaX, sigmaY):
    sigma = 0.3 * ((np.array(ksize) - 1.0) * 0.5 - 1.0) + 0.8  # 표준 편차
    if sigmaX <= 0: sigmaX = sigma[0]
    if sigmaY <= 0: sigmaY = sigma[1]

    u = np.array(ksize)//2
    x = np.arange(-u[0], u[0]+1, 1)
    y = np.arange(-u[1], u[1]+1, 1)
    x, y = np.meshgrid(x, y)

    ratio = 1 / (sigmaX*sigmaY * 2 * np.pi)
    v1 = x ** 2 / (2 * sigmaX ** 2)
    v2 = y ** 2 / (2 * sigmaY ** 2 )
    mask = ratio * np.exp(-(v1+v2))
    return mask / np.sum(mask)

image = cv2.imread("images/smoothing.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")

ksize = (5, 17)                                        # 크기는 가로x세로로 표현
gaussian_2d = getGaussianMask(ksize, 0, 0)
gaussian_1dX = cv2.getGaussianKernel(ksize[0], 0, cv2.CV_32F)   # 가로 방향 마스크
gaussian_1dY = cv2.getGaussianKernel(ksize[1], 0, cv2.CV_32F)   # 세로 방향 마스크

gauss_img1 = cv2.filter2D(image, -1, gaussian_2d)     # 사용자 생성 마스크 적용
gauss_img2 = cv2.GaussianBlur(image, ksize, 0)
gauss_img3 = cv2.sepFilter2D(image, -1, gaussian_1dX, gaussian_1dY)

titles = ['image','gauss_img1','gauss_img2','gauss_img3']
[cv2.imshow(t, eval(t)) for t in titles]
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-13-edge_color_canny',
      filename: '13.edge_color_canny.py',
      title: 'edge color canny',
      code: `import cv2

def onTrackbar(th):																	# 트랙바 콜백 함수
	rep_edge = cv2.GaussianBlur(rep_gray, (5, 5), 0)         	# 가우시안 블러링
	rep_edge = cv2.Canny(rep_edge, th, th*2, 5)						# 캐니 에지 검출
	h, w = image.shape[:2]
	cv2.rectangle(rep_edge, (0, 0, w, h), 255, -1)    						# 흰색 사각형 그리기
	color_edge = cv2.bitwise_and(rep_image, rep_image, mask=rep_edge)
	cv2.imshow("color edge", color_edge)

image = cv2.imread("images/color_edge.jpg", cv2.IMREAD_COLOR)
if image is None: raise Exception("영상파일 읽기 오류")

th = 50
rep_image = cv2.repeat(image, 1, 2)                      	# 가로 반복 복사
rep_gray = cv2.cvtColor(rep_image, cv2.COLOR_BGR2GRAY)    	# 명암도 영상 변환

cv2.namedWindow("color edge", cv2.WINDOW_AUTOSIZE)    		# 윈도우 생성
cv2.createTrackbar("Canny th", "color edge", th, 100, onTrackbar)	# 콜백 함수 등록
onTrackbar(th)																					# 콜백 함수 첫 실행
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-14-erode',
      filename: '14.erode.py',
      title: 'erode',
      code: `import numpy as np, cv2

def erode(img, mask=None):
    dst = np.zeros(img.shape, np.uint8)
    if mask is None: mask = np.ones((3, 3), np.uint8)
    ycenter, xcenter = np.divmod(mask.shape[:2], 2)[0]

    mcnt = cv2.countNonZero(mask)
    for i in range(ycenter, img.shape[0] - ycenter):           # 입력 행렬 반복 순회
        for j in range(xcenter, img.shape[1] - xcenter):
            y1, y2 = i - ycenter, i + ycenter + 1              # 마스크 높이 범위
            x1, x2 = j - xcenter, j + xcenter + 1              # 마스크 너비 범위
            roi = img[y1:y2, x1:x2]                            # 마스크 영역
            temp = cv2.bitwise_and(roi, mask)
            cnt  =  cv2.countNonZero(temp)                     # 일치한 화소수 계산
            dst[i, j] = 255 if (cnt == mcnt) else 0            # 출력 화소에 저장
    return dst

image = cv2.imread("images/morph.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")

data = [0, 1, 0,                                               # 마스크 선언 및 초기화
        1, 1, 1,
        0, 1, 0]
mask = np.array(data, np.uint8).reshape(3, 3)
th_img = cv2.threshold(image, 128, 255, cv2.THRESH_BINARY)[1]  # 영상 이진화

dst1 = erode(th_img, mask)                                     # 사용자 정의 침식 함수
dst2 = cv2.erode(th_img, mask)
# dst2 = cv2.morphologyEx(th_img, cv2.MORPH_ERODE, mask)         # OpenCV의 침식 함수

cv2.imshow("image", image)
cv2.imshow("binary image", th_img)
cv2.imshow("User erode", dst1)
cv2.imshow("OpenCV erode", dst2)
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-15-dilate',
      filename: '15.dilate.py',
      title: 'dilate',
      code: `import numpy as np, cv2

def dilate(img, mask):
    dst = np.zeros(img.shape, np.uint8)
    if mask is None: mask = np.ones((3, 3), np.uint8)
    ycenter, xcenter = np.divmod(mask.shape[:2], 2)[0]

    for i in range(ycenter, img.shape[0] - ycenter):    # 입력 행렬 반복 순회
        for j in range(xcenter, img.shape[1] - xcenter):
            y1, y2 = i - ycenter, i + ycenter + 1       # 마스크 높이 범위
            x1, x2 = j - xcenter, j + xcenter + 1       # 마스크 너비 범위
            roi = img[y1:y2, x1:x2]                     # 마스크 영역
            temp = cv2.bitwise_and(roi, mask)
            cnt  = cv2.countNonZero(temp)
            dst[i, j] = 0 if (cnt == 0) else 255  # 출력 화소에 저장
    return dst

image = cv2.imread("images/morph.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")

mask = np.array([[0, 1, 0],                         # 마스크 초기화
                 [1, 1, 1],
                 [0, 1, 0]]).astype("uint8")
th_img = cv2.threshold(image, 128, 255, cv2.THRESH_BINARY)[1]  # 영상 이진화
dst1 = dilate(th_img, mask)                              # 사용자 정의 팽창 함수
dst2 = cv2.morphologyEx(th_img, cv2.MORPH_DILATE, mask)  # OpenCV의 팽창 함수
# dst2 = cv2.dilate(th_img, mask)

cv2.imshow("User dilate", dst1)
cv2.imshow("OpenCV dilate", dst2)
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-16-close_open',
      filename: '16.close_open.py',
      title: 'close open',
      code: `import numpy as np, cv2
from Common.filters import erode, dilate

def opening(img, mask):                     # 열림 연산
    tmp = erode(img, mask)                  # 침식
    dst = dilate(tmp, mask)                 # 팽창
    return dst

def closing(img, mask):                     # 닫힘 연산
    tmp = dilate(img, mask)
    dst = erode(tmp, mask)
    return dst

image = cv2.imread("images/morph.jpg", cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 오류")

mask = np.array([[0, 1, 0],                 # 마스크 초기화
                 [1, 1, 1], 
                 [0, 1, 0]]).astype("uint8")
th_img = cv2.threshold(image, 128, 255, cv2.THRESH_BINARY)[1]   # 영상 이진화

dst1 = opening(th_img, mask)                            # 사용자 정의 열림 함수 호출
dst2 = closing(th_img, mask)                            # 사용자 정의 닫힘 함수 호출
dst3 = cv2.morphologyEx(th_img, cv2.MORPH_OPEN, mask)   # OpenCV의 열림 함수
dst4 = cv2.morphologyEx(th_img, cv2.MORPH_CLOSE, mask, 1)  # OpenCV의 닫힘 함수

cv2.imshow("User opening", dst1);       cv2.imshow("User closing", dst2)
cv2.imshow("OpenCV opening", dst3);     cv2.imshow("OpenCV closing", dst4)
cv2.waitKey(0)`,
    },
    {
      id: 'chap07-17-detect_plate',
      filename: '17.detect_plate.py',
      title: 'detect plate',
      code: `import numpy as np, cv2

while True:
    no = int(input("차량 영상 번호( 0:종료 ) : "))             # 차량 번호 입력
    if no == 0: break;

    fname = "images/test_car/{0:02d}.jpg".format(no)
    image = cv2.imread(fname, cv2.IMREAD_COLOR)
    if image is None:
        print(str(no) + "번 영상 파일이 없습니다.")
        continue
    
    mask = np.ones((5, 17), np.uint8)                      # 닫힘 연산 마스크
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)          # 명암도 영상 변환
    gray = cv2.blur(gray, (5, 5))                           # 블러링
    gray = cv2.Sobel(gray, cv2.CV_8U, 1, 0, 5)              # 소벨 에지 검출

    # 이진화 및 닫힘 연산 수행
    _, th_img = cv2.threshold(gray, 120, 255, cv2.THRESH_BINARY)
    morph = cv2.morphologyEx(th_img, cv2.MORPH_CLOSE, mask, iterations=3)

    cv2.imshow("image", image)
    cv2.imshow("binary image", th_img)
    cv2.imshow("opening", morph)
    cv2.waitKey()
`,
    },
  ],

  'chap08': [
    {
      id: 'chap08-01-scaling',
      filename: '01.scaling.py',
      title: 'scaling',
      code: `import numpy as np, cv2, time

def scaling(img, size):  # 크기 변경 함수
    dst = np.zeros(size[::-1], img.dtype)  # 행렬과 크기는 원소가 역순
    ratioY, ratioX = np.divide(size[::-1], img.shape[:2])
    y = np.arange(0, img.shape[0], 1)
    x = np.arange(0, img.shape[1], 1)
    y, x = np.meshgrid(y, x)
    i, j = np.int32(y * ratioY), np.int32(x * ratioX)
    dst[i, j] = img[y, x]
    return dst

def scaling2(img, size):  # 크기 변경 함수
    dst = np.zeros(size[::-1], img.dtype)  # 행렬과 크기는 원소가 역순
    ratioY, ratioX = np.divide(size[::-1], img.shape[:2])
    for y in range(img.shape[0]):  # 입력 영상 순회 - 순방향 사상
        for x in range(img.shape[1]):
            i, j = int(y * ratioY), int(x * ratioX)  # 목적 영상의 y, x 좌표
            dst[i, j] = img[y, x]
    return dst

def time_check(func, image, size, title):  ## 수행시간 체크 함수
    start_time = time.perf_counter()
    ret_img = func(image, size)
    elapsed = (time.perf_counter() - start_time) * 1000
    print(title, " 수행시간 = %0.2f ms" % elapsed)
    return ret_img

image = cv2.imread('images/scaling.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일을 읽기 에러")

dst1 = scaling(image, (150, 200))  # 크기 변경 - 축소
dst2 = scaling2(image, (150, 200))  # 크기 변경 - 축소
dst3 = time_check(scaling, image, (300, 400), "[방법1] 정방행렬 방식>")
dst4 = time_check(scaling2, image, (300, 400), "[방법2] 반복문 방식>")

cv2.imshow("image", image)
cv2.imshow("dst1- zoom out", dst1)
cv2.imshow("dst3- zoom out", dst3)
cv2.resizeWindow("dst1- zoom out", 260, 200)  # 윈도우 크기 확장
cv2.waitKey(0)`,
    },
    {
      id: 'chap08-02-scaling_nearest',
      filename: '02.scaling_nearest.py',
      title: 'scaling nearest',
      code: `import numpy as np, cv2
from Common.interpolation import scaling

def scaling_nearest(img, size):                                # 크기 변경 함수
    dst = np.zeros(size[::-1], img.dtype)               # 행렬과 크기는 원소가 역순
    ratioY, ratioX = np.divide(size[::-1], img.shape[:2])
    i = np.arange(0, size[1], 1)
    j = np.arange(0, size[0], 1)
    i, j = np.meshgrid(i, j)
    y, x = np.int32(i / ratioY), np.int32(j / ratioX)
    dst[i,j] = img[y,x]

    return dst

image = cv2.imread('images/interpolation.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일을 읽기 에러")

dst1 = scaling(image, (350, 400))                   # 크기 변경 - 기본
dst2 = scaling_nearest(image, (350, 400))           # 크기 변경 - 최근접 이웃 보간

cv2.imshow("image", image)
cv2.imshow("dst1- forward mapping", dst1)          # 순방향 사상
cv2.imshow("dst2- NN interpolation", dst2)         # Nearest Neighbor interpolation
cv2.waitKey(0)`,
    },
    {
      id: 'chap08-03-scaling_bilinear',
      filename: '03.scaling_bilinear.py',
      title: 'scaling bilinear',
      code: `import numpy as np, cv2
from Common.interpolation import scaling_nearest

def bilinear_value(img, pt):
    x, y = np.int32(pt)
    if x >= img.shape[1]-1: x = x -1
    if y >= img.shape[0]-1: y = y - 1

    P1, P3, P2, P4 = np.float32(img[y:y+2,x:x+2].flatten())
   ## 4개의 화소 가져옴 – 화소 직접 접근
   #  P1 = float(img[y, x] )                         # 상단 왼쪽 화소
   #  P3 = float(img[y + 0, x + 1])                  # 상단 오른쪽 화소
   #  P2 = float(img[y + 1, x + 0])                  # 하단 왼쪽 화소
   #  P4 = float(img[y + 1, x + 1])                  # 하단 오른쪽 화소

    alpha, beta = pt[1] - y,  pt[0] - x                   # 거리 비율
    M1 = P1 + alpha * (P3 - P1)                      # 1차 보간
    M2 = P2 + alpha * (P4 - P2)
    P  = M1 + beta  * (M2 - M1)                     # 2차 보간
    return  np.clip(P, 0, 255)                       # 화소값 saturation후 반환

def scaling_bilinear(img, size):                   	# 양선형 보간
    ratioY, ratioX = np.divide(size[::-1], img.shape[:2])  # 변경 크기 비율

    dst = [[ bilinear_value(img, (j/ratioX, i/ratioY))  # for문 이용한 리스트 생성
             for j in range(size[0])]
           for i in range(size[1])]
    return np.array(dst, img.dtype)

image = cv2.imread('images/interpolation.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 에러")

size = (350, 400)
dst1 = scaling_bilinear(image, size)                # 크기 변경 - 양선형 보간
dst2 = scaling_nearest(image, size)                 # 크기 변경 - 최근접 이웃 보간
dst3 = cv2.resize(image, size, 0, 0, cv2.INTER_LINEAR)  # OpenCV 함수 적용
dst4 = cv2.resize(image, size, 0, 0, cv2.INTER_NEAREST)

cv2.imshow("image", image)
cv2.imshow("User_bilinear", dst1)
cv2.imshow("User_Nearest", dst2)
cv2.imshow("OpenCV_bilinear", dst3)
cv2.imshow("OpenCV_Nearest", dst4)
cv2.waitKey(0)`,
    },
    {
      id: 'chap08-04-translate',
      filename: '04.translate.py',
      title: 'translate',
      code: `import numpy as np, cv2

def contain(p, shape):                              # 좌표(y,x)가 범위내 인지 검사
    return 0<= p[0] < shape[0] and 0<= p[1] < shape[1]

def translate(img, pt):
    dst = np.zeros(img.shape, img.dtype)            # 목적 영상 생성
    for i in range(img.shape[0]):                           # 목적 영상 순회 - 역방향 사상
        for j in range(img.shape[1]):
            x, y = np.subtract((j, i) , pt)
            if contain((y, x), img.shape):
                dst[i, j] = img[y, x]
    return dst

image = cv2.imread('images/translate.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일을 읽기 에러")

dst1 = translate(image, (30, 80))                  # x = 30, y = 80 으로 평행이동
dst2 = translate(image, (-70, -50))

cv2.imshow("image", image)
cv2.imshow("dst1: trans to (80, 30)", dst1);
cv2.imshow("dst2: trans to (-50, -70)", dst2);
cv2.waitKey(0)
`,
    },
    {
      id: 'chap08-05-rotate',
      filename: '05.rotate.py',
      title: 'rotate',
      code: `import numpy as np,  cv2
from Common.interpolation import bilinear_value
from Common.utils import contain   , ck_time               # 사각형으로 범위 확인 함수

def rotate(img, degree):
    dst = np.zeros(img.shape[:2], img.dtype)                     # 목적 영상 생성
    radian = (degree/180) * np.pi                               # 회전 각도 - 라디언
    sin, cos = np.sin(radian), np.cos(radian)   # 사인, 코사인 값 미리 계산

    for i in range(img.shape[0]):                                       # 목적 영상 순회 - 역방향 사상
        for j in range(img.shape[1]):
            y = -j * sin + i * cos
            x =  j * cos + i * sin                  # 회선 변환 수식
            if contain((y, x), img.shape):             # 입력 영상의 범위 확인
                dst[i, j] = bilinear_value(img, [x, y])           # 화소값 양선형 보간
    return dst

def rotate_pt(img, degree, pt):
    dst = np.zeros(img.shape[:2], img.dtype)                     # 목적 영상 생성
    radian = (degree/180) * np.pi                               # 회전 각도 - 라디언
    sin, cos = np.sin(radian), np.cos(radian)   # 사인, 코사인 값 미리 계산

    for i in range(img.shape[0]):                              # 목적 영상 순회 - 역방향 사상
        for j in range(img.shape[1]):
            jj, ii = np.subtract((j, i), pt)                # 중심좌표 평행이동,
            y = -jj * sin + ii * cos               # 회선 변환 수식
            x =  jj * cos + ii * sin
            x, y = np.add((x, y), pt)
            if contain((y, x), img.shape):                      # 입력 영상의 범위 확인
                dst[i, j] = bilinear_value(img, [x, y])           # 화소값 양선형 보간
    return dst

image = cv2.imread('images/rotate.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일을 읽기 에러")

center = np.divmod(image.shape[::-1], 2)[0]
dst1 = rotate(image, 20)                                        # 원점 기준 회전 변환
dst2 = rotate_pt(image, 20, center )                             # 영상 중심 기준 회전 변환

cv2.imshow("image", image)
cv2.imshow("dst1-rotated on org", dst1)
cv2.imshow("dst2-rotated on center", dst2)
cv2.waitKey(0)`,
    },
    {
      id: 'chap08-06-rotate2',
      filename: '06.rotate2.py',
      title: 'rotate2',
      code: `import numpy as np, cv2
from Common.interpolation import rotate_pt

def calc_angle(pts):
    d1 = np.subtract(pts[1], pts[0]).astype(float)        # 두 좌표간 차분 계산
    d2 = np.subtract(pts[2], pts[0]).astype(float)
    angle1 = cv2.fastAtan2(d1[1], d1[0])  # 차분으로 각도 계산
    angle2 = cv2.fastAtan2(d2[1], d2[0])
    return (angle2 - angle1)  # 두 각도 간의 차분

def draw_point(x, y):
    pts.append([x,y])
    print("좌표:", len(pts), [x,y])
    cv2.circle(tmp, (x, y), 2, 255, 2)  # 중심 좌표 표시
    cv2.imshow("image", tmp)

def onMouse(event, x, y, flags, param):
    global tmp, pts
    if (event == cv2.EVENT_LBUTTONUP and len(pts) == 0):  draw_point(x, y)
    if (event == cv2.EVENT_LBUTTONDOWN and len(pts) == 1): draw_point(x, y)
    if (event == cv2.EVENT_LBUTTONUP and len(pts) == 2):   draw_point(x, y)

    if len(pts) == 3:
        angle = calc_angle(pts)  # 회전각 계산
        print("회전각 : %3.2f" % angle)
        dst = rotate_pt(image, angle, pts[0])  # 사용자 정의 함수 회전 수행
        cv2.imshow("image", dst)  # 연습문제 - OpenCV 이용해 작성하기, 컬러 영상으로 수행되게 작성하기
        tmp = np.copy(image)  # 임시 행렬 초기화
        pts = []

image = cv2.imread('images/rotate.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일을 읽기 에러")
tmp = np.copy(image)
pts = []

cv2.imshow("image", image)
cv2.setMouseCallback("image", onMouse, 0)
cv2.waitKey(0)`,
    },
    {
      id: 'chap08-07-affine_transform',
      filename: '07.affine_transform.py',
      title: 'affine transform',
      code: `import numpy as np, cv2
from Common.utils import contain, ck_time
from Common.interpolation import bilinear_value

def affine_transform(img, mat):
    rows, cols = img.shape[:2]
    inv_mat = cv2.invertAffineTransform(mat)  # 어파인 변환의 역행렬
    ## 리스트 생성 방식
    pts = [np.dot(inv_mat, (j, i, 1)) for i in range(rows) for j in range(cols)]
    dst = [bilinear_value(img, p) if contain(p, size) else 0 for p in pts]
    dst = np.reshape(dst, (rows, cols)).astype('uint8')

    ## 반복문 방식
    # dst = np.zeros(img.shape, img.dtype)  # 목적 영상 생성
    # for i in range(rows):  # 목적 영상 순회- 역방향 사상
    #     for j in range(cols):
    #         pt = np.dot(inv_mat, (j, i, 1))                # 행렬 내적 계산
    #         if contain(pt, size):  dst[i, j] = bilinear_value(img, pt)     # 화소 양선형 보간

    return dst

image = cv2.imread('images/affine.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일을 읽기 에러")

center = (200, 200)                                 # 회전 변환 기준 좌표
angle, scale = 30,  1                               # 회전 각도, 크기 지정 - 크기 변경은 안 함
size = image.shape[::-1]                            # 영상크기는 행렬 행태의 역순

pt1 = np.array([( 30, 70),(20, 240), (300, 110)], np.float32)
pt2 = np.array([(120, 20),(10, 180), (280, 260)], np.float32)
aff_mat = cv2.getAffineTransform(pt1, pt2)              # 3개 좌표 쌍으로 어파인 행렬 생성
rot_mat = cv2.getRotationMatrix2D(center, angle, scale) # 회전 변환을 위한 어파인 행렬

dst1 = affine_transform(image, aff_mat)             # 어파인 변환 수행
dst2 = affine_transform(image, rot_mat)             # 회전 변환 수행
dst3 = cv2.warpAffine(image, aff_mat, size, cv2.INTER_LINEAR)
dst4 = cv2.warpAffine(image, rot_mat, size, cv2.INTER_LINEAR)

image = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR)
dst1 = cv2.cvtColor(dst1, cv2.COLOR_GRAY2BGR )
dst3 = cv2.cvtColor(dst3, cv2.COLOR_GRAY2BGR )

for i in range(len(pt1)):
    cv2.circle(image, tuple(pt1[i].astype(int)), 3, (0, 0, 255), 2)
    cv2.circle(dst1 , tuple(pt2[i].astype(int)), 3, (0, 0, 255), 2)
    cv2.circle(dst3 , tuple(pt2[i].astype(int)), 3, (0, 0, 255), 2)

cv2.imshow("image", image)
cv2.imshow("dst1_affine", dst1);        cv2.imshow("dst2_affine_rotate", dst2)
cv2.imshow("dst3_OpenCV_affine", dst3); cv2.imshow("dst4_OpenCV_affine_rotate", dst4)
cv2.waitKey(0)`,
    },
    {
      id: 'chap08-08-affine_combination',
      filename: '08.affine_combination.py',
      title: 'affine combination',
      code: `import numpy as np, math, cv2
from Common.interpolation import affine_transform

def getAffineMat(center, degree, fx = 1, fy = 1, translate = (0,0)):
    cen_trans = np.eye(3, dtype=np.float32)
    org_trans = np.eye(3, dtype=np.float32)
    scale_mat = np.eye(3, dtype=np.float32)         # 크기 변경 행렬
    trans_mat = np.eye(3, dtype=np.float32)         # 평행 이동 행렬
    rot_mat   = np.eye(3, dtype=np.float32)         # 회전 변환 행렬

    radian = (degree/180.0) * np.pi                 # 회전 각도 - 라디언  계산
    rot_mat[0] = [ np.cos(radian), np.sin(radian), 0]
    rot_mat[1] = [-np.sin(radian), np.cos(radian), 0]

    cen_trans[:2, 2] = center                       # 중심 좌표를 기준으로 회전
    org_trans[:2, 2] = np.multiply(center[0], -1)   # 원점으로 이동
    trans_mat[:2, 2] = translate                    # 평행 이동 행렬의 원소 지정
    scale_mat[0, 0], scale_mat[1, 1] = fx, fy       # 크기 변경 행렬의 원소 지정

    ret_mat = cen_trans.dot(rot_mat.dot(trans_mat.dot(scale_mat.dot(org_trans))))
    # ret_mat = cen_trans.dot(rot_mat.dot(scale_mat.dot(trans_mat.dot(org_trans))))
    return np.delete(ret_mat, 2, axis=0)            # 행 제거 ret_mat[0:2,:]

image = cv2.imread('images/affine2.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 에러")

size = image.shape[::-1]
center = np.divmod(size, 2)[0]                  # 회전 중심 좌표 - 크기는 행,열의 역순
angle, tr = 45.0, (200, 0)                                      # 각도와 평행이동

aff_mat1 = getAffineMat(center, angle)                          # 중심 좌표 기준 회전
aff_mat2 = getAffineMat((0,0), 0, 2.0, 1.5)                     # 크기 변경 - 확대
aff_mat3 = getAffineMat(center, angle, 0.7, 0.7)                # 회전 및 축소
aff_mat4 = getAffineMat(center, angle, 0.7, 0.7, tr)            # 복합 변환

dst1 = cv2.warpAffine(image, aff_mat1, size)             # OpenCV 함수
dst2 = cv2.warpAffine(image, aff_mat2, size)
dst3 = affine_transform(image, aff_mat3)                        # 사용자 정의 함수
dst4 = affine_transform(image, aff_mat4)

cv2.imshow("image", image)
cv2.imshow("dst1_only_rotate", dst1)
cv2.imshow("dst2_only_scaling", dst2)
cv2.imshow("dst3_rotate_scaling", dst3)
cv2.imshow("dst4_rotate_scaling_translate", dst4)
cv2.waitKey(0)`,
    },
    {
      id: 'chap08-09-affine_event',
      filename: '09.affine_event.py',
      title: 'affine event',
      code: `import numpy as np, cv2

def contain_pts(p, p1, p2):                 # p가 2개 좌표 범위 내 검사
    return p1[0] <= p[0] < p2[0] and p1[1] <= p[1] < p2[1]

def draw_rect(title, img, pts):
    rois = [(p - small, small * 2) for p in pts]
    for (x,y), (w,h) in np.int32(rois):
        cv2.rectangle(img, (x,y,w,h), (0, 255, 0), 2)
    cv2.imshow(title, img)

def affine(img):
    aff_mat = cv2.getAffineTransform(pts1, pts2)
    dst = cv2.warpAffine(img, aff_mat, image.shape[1::-1], cv2.INTER_LINEAR)
    draw_rect("image", np.copy(image), pts1)
    draw_rect('dst', dst, pts2)

def onMouse(event, x, y, flags, param):
    global check
    if event == cv2.EVENT_LBUTTONDOWN:
        for i, p in enumerate(pts1):
            p1, p2 = p - small, p + small
            if contain_pts((x, y), p1, p2): check = i

    if event == cv2.EVENT_LBUTTONUP: check = -1

    if check >= 0:
        pts1[check] = (x, y)
        affine(np.copy(image))

image = cv2.imread('images/affine1.jpg')
if image is None: raise Exception("영상파일 읽기 에러")

small = np.array((12, 12))
check = -1
pts1 = np.float32([(30, 30), (450, 30), (200, 370)])
pts2 = np.float32([(30, 30), (450, 30), (200, 370)])

draw_rect('image', np.copy(image), pts1)
draw_rect('dst', np.copy(image), pts2)
cv2.setMouseCallback("image", onMouse, 0)
cv2.waitKey(0)`,
    },
    {
      id: 'chap08-10-perspective_transform',
      filename: '10.perspective_transform.py',
      title: 'perspective transform',
      code: `import numpy as np, cv2

image = cv2.imread('images/perspective.jpg', cv2.IMREAD_COLOR)
if image is None: raise Exception("영상 파일을 읽기 에러")

pts1 = np.float32([(80, 40),  (315, 133), (75, 300), (335, 300)] )
pts2 = np.float32([(50, 60),  (340, 60), (50, 320), (340, 320)])

perspect_mat = cv2.getPerspectiveTransform(pts1, pts2) #.astype('float32')
dst = cv2.warpPerspective(image, perspect_mat, image.shape[1::-1], cv2.INTER_CUBIC)
print("[perspect_mat] = \\n%s\\n" % perspect_mat )

## 변환 좌표 계산 - 행렬 내적 이용 방법
ones = np.ones((4,1), np.float64)
pts3 = np.append(pts1, ones, axis=1)              # 원본 좌표 -> 동차 좌표 저장
pts4 = cv2.gemm(pts3, perspect_mat.T, 1, None, 1)  # 행렬 곱으로 좌표 변환값 계산

## 변환 좌표 계산 - cv2.transform() 함수 이용방법
# pts3 = np.expand_dims(pts1, axis=0)             # 차원 증가
# pts4 = cv2.transform(pts3, perspect_mat)
# pts4 = np.squeeze(pts4, axis=0)                 # 차원 감소
# pts3 = np.squeeze(pts3, axis=0)                 # 출력 위해

print(" 원본 영상 좌표 \\t 목적 영상 좌표 \\t\\t 동차 좌표 \\t\\t 변환 결과 좌표")
for i in range(len(pts4)):
    pts4[i] /= pts4[i][2]
    print("%i : %-14s %-14s %-18s%-18s" % (i, pts1[i], pts2[i], pts3[i], pts4[i]))
    cv2.circle(image, tuple(pts1[i].astype(int)), 4, (0, 255, 0), -1) # 원본 영상에 pts1 표시
    cv2.circle(dst  , tuple(pts2[i].astype(int)), 4, (0, 255, 0), -1) # 목적 영상에 pts2 표시

cv2.imshow("image", image)
cv2.imshow("dst_perspective", dst)
cv2.waitKey(0)`,
    },
    {
      id: 'chap08-11-perspective_event',
      filename: '11.perspective_event.py',
      title: 'perspective event',
      code: `import numpy as np, cv2
from Common.utils import contain_pts  # 좌표로 범위 확인 함수

def draw_rect(img):
    rois = [(p-small, small * 2) for p in pts1]
    for (x,y), (w,h) in np.int32(rois):
        roi = img[y:y + h, x:x + w]                 # 좌표 사각형 범위 가져오기
        val = np.full(roi.shape, 80, np.uint8)  # 컬러(3차원) 행렬 생성		cv2.add(roi, val, roi)                      			# 관심영역 밝기 증가
        cv2.add(roi, val, roi)
        cv2.rectangle(img, (x,y, w, h), (0, 255, 0), 1)
    cv2.polylines(img, [pts1.astype(int)], True, (0, 255, 0), 1)     # pts는 numpy 배열
    cv2.imshow("select rect", img)

def warp(img):
    perspect_mat = cv2.getPerspectiveTransform(pts1, pts2)
    dst = cv2.warpPerspective(img, perspect_mat, (350, 400), cv2.INTER_CUBIC)
    cv2.imshow("perspective transform", dst)

def onMouse(event, x, y, flags, param):
    global check
    if event == cv2.EVENT_LBUTTONDOWN:
        for i, p in enumerate(pts1):
            p1, p2 = p - small, p + small           # p점에서 우상단, 좌하단 좌표생성
            if contain_pts((x,y), p1, p2): check = i

    if event == cv2.EVENT_LBUTTONUP: check = -1                                  # 좌표 번호 초기화
    
    if check >= 0 :                                 # 좌표 사각형 선택 시
        pts1[check] = (x, y)
        draw_rect(np.copy(image))
        warp(np.copy(image))

image = cv2.imread('images/perspective2.jpg')
if image is None: raise Exception("영상 파일을 읽기 에러")

small = np.array((12, 12))                                    # 좌표 사각형 크기
check = -1                                          # 선택 좌표 사각형 번호 초기화
pts1 = np.float32([(100, 100), (300, 100), (300, 300), (100, 300)])
pts2 = np.float32([(0, 0), (400, 0), (400, 350), (0, 350)])  # 목적 영상 4개 좌표                         # 목적 영상 4개 좌표

draw_rect(np.copy(image))
cv2.setMouseCallback("select rect", onMouse, 0)
cv2.waitKey(0)`,
    },
  ],

  'chap09': [
    {
      id: 'chap09-01-frequence',
      filename: '01.frequence.py',
      title: 'frequence',
      code: `import matplotlib.pyplot as plt
import numpy as np

t = np.arange(0, 1, 0.001)    # Time vector
Hz = [1, 2, 10, 100]
gs = [np.sin(2 * np.pi * t * h) for h in Hz]

plt.figure(figsize=(10,5))
for i, g in enumerate(gs):
    plt.subplot(2, 2, i+1), plt.plot(t, g)
    plt.xlim(0, 1),  plt.ylim(-1, 1 )
    plt.title("frequency: %3d Hz" % Hz[i])
plt.tight_layout()
plt.show()`,
    },
    {
      id: 'chap09-02-frequence_sum',
      filename: '02.frequence_sum.py',
      title: 'frequence sum',
      code: `import matplotlib.pyplot as plt
import numpy as np

t = np.arange(0, 3, 0.001)    # Time vector
g = [0] *5
g[0] = np.sin(2 * np.pi * t )
g[1] = np.sin(2 * np.pi * t * 3 )
g[2] = np.sin(2 * np.pi * t * 5 )
g[3] = g[0] + g[1] + g[2]
g[4] = 0.3* g[0] - 0.7 * g[1] + 0.5* g[2]

titles = ['1Hz', '3Hz','5Hz','sum','weighted sum']
plt.figure(figsize=(13,6))
for i, title in enumerate(titles):
    plt.subplot(2, 3, i+1), plt.plot(t, g[i]), plt.title(title)
plt.tight_layout()
plt.show()`,
    },
    {
      id: 'chap09-03-1d_dft',
      filename: '03.1d_dft.py',
      title: '1d dft',
      code: `import numpy as np, math
import matplotlib.pyplot as plt

def exp(knN):
    th = -2 * math.pi * knN
    return complex(math.cos(th), math.sin(th))              # 복소수 클래스

def dft(g):
    N = len(g)
    dst = [sum(g[n] * exp(k*n/N ) for n in range(N)) for k in range(N) ]
    return np.array(dst)

def idft(g):
    N = len(g)
    dst = [sum(g[n] * exp(-k*n/N) for n in range(N)) for k in range(N) ]
    return np.array(dst) / N

fmax = 1000      # 샘플링 주파수 1000 Hz: 최대주파수의 2배
dt = 1/fmax      # 샘플링 간격
t = np.arange(0, 1, dt)         # 시간 리스트

g1 = np.sin(2*np.pi*50*t)
g2 = np.sin(2*np.pi*120*t)
g3 = np.sin(2*np.pi*260*t)
g = g1 * 0.6 + g2 * 0.9 + g3 * 0.2          # 신호 합성

N = len(g)                          # 신호 길이
df = fmax/N                         #
f = np.arange(0, N, df)
xf = dft(g) * dt                    # 사용자 정의 DFT
g2 = idft(xf) / dt

plt.figure(figsize=(8,8))
plt.subplot(3,1,1), plt.plot(t[0:200], g[0:200]), plt.title('org signal')
plt.subplot(3,1,2), plt.plot(f, np.abs(xf) ), plt.title('dft amplitude')
plt.subplot(3,1,3), plt.plot(t[0:200], g2[0:200]), plt.title('idft signal')
plt.tight_layout()
plt.show()`,
    },
    {
      id: 'chap09-04-2d_dft',
      filename: '04.2d_dft.py',
      title: '2d dft',
      code: `import numpy as np, cv2, time
from Common.dft2d import dft, idft, calc_spectrum, fftshift

def dft2(image):
    tmp = [dft(row) for row in image]
    dst = [dft(row) for row in np.transpose(tmp)]
    return np.transpose(dst)                   # 전치 환원 후 반환

def idft2(image):
    tmp = [idft(row) for row in image]
    dst = [idft(row) for row in np.transpose(tmp)]
    return np.transpose(dst)                   # 전치 환원 후 반환

def ck_time(mode = 0):
    global stime
    if (mode ==0 ):
       stime = time.perf_counter()
    elif (mode==1):
       etime = time.perf_counter()
       print("수행시간 = %.5f sec" % (etime - stime))   #초 단위 경과 시간

image = cv2.imread('images/dft_64.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 에러")

ck_time(0)
dft = dft2(image)                     # 2차원 DFT 수행
spectrum1 = calc_spectrum(dft)
spectrum2 = fftshift(spectrum1)
idft = idft2(dft).real                # 2차원 IDFT 수행
ck_time(1)

cv2.imshow("image", image)
cv2.imshow("spectrum1", spectrum1)
cv2.imshow("spectrum2", spectrum2)
cv2.imshow("idft_img", cv2.convertScaleAbs(idft))
cv2.waitKey(0)`,
    },
    {
      id: 'chap09-05-2d_fft',
      filename: '05.2d_fft.py',
      title: '2d fft',
      code: `import numpy as np, cv2, math
from Common.dft2d import exp, calc_spectrum, fftshift
from Common.fft2d import zeropadding

def butterfly(pair, L, N, dir):
    for k in range(L):                                       # 버터플라이 수행
        Geven, Godd = pair[k], pair[k + L]
        pair[k]     = Geven + Godd * exp(dir * k / N)       # 짝수부
        pair[k + L] = Geven - Godd * exp(dir * k / N)       # 홀수부

def pairing(g, N, dir, start=0, stride=1):
    if N == 1: return [g[start]]
    L = N // 2
    sd = stride * 2
    part1 = pairing(g, L, dir, start, sd)
    part2 = pairing(g, L, dir, start + stride, sd)
    pair = part1 + part2                                     # 결과 병합
    butterfly(pair, L, N, dir)
    return pair

def fft(g):
    return pairing(g, len(g), 1)

def ifft(g):
    fft = pairing(g, len(g), -1)
    return [v / len(g) for v in fft]

def fft2(image):
    pad_img = zeropadding(image)  # 영삽입
    tmp = [fft(row) for row in pad_img]
    dst = [fft(row) for row in np.transpose(tmp)]
    return np.transpose(dst)                        # 전치 환원 후 반환

def ifft2(image):
    tmp = [ifft(row) for row in image]
    dst = [ifft(row) for row in np.transpose(tmp)]
    return np.transpose(dst)                        # 전치 환원 후 반환

image = cv2.imread('images/dft_240.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상파일 읽기 에러")

dft1 = fft2(image)                                # 2차원 DFT 수행
dft2 = np.fft.fft2(image)                                # 2차원 DFT 수행
dft3 = cv2.dft(np.float32(image), flags = cv2.DFT_COMPLEX_OUTPUT)

spectrum1 = calc_spectrum(fftshift(dft1))           # 셔플링후 주파수 스펙트럼 영상 생성
spectrum2 = calc_spectrum(fftshift(dft2))           # 주파수 스펙트럼 영상
spectrum3 = calc_spectrum(fftshift(dft3))           # 주파수 스펙트럼 영상

idft1 = ifft2(dft1).real                          # 2차원 IDFT 수행
idft2 = np.fft.ifft2(dft2).real                          # 2차원 IDFT 수행
idft3 = cv2.idft(dft3, flags=cv2.DFT_SCALE)[:,:,0]

print("user 방법 변환 행렬 크기:", dft1.shape)
print("np.fft 방법 변환 행렬 크기:", dft2.shape)
print("cv2.dft 방법 변환 행렬 크기:", dft3.shape)

cv2.imshow("image", image)
cv2.imshow("spectrum1", spectrum1)
cv2.imshow("spectrum2-np.fft", spectrum2)
cv2.imshow("spectrum3-OpenCV", spectrum3)
cv2.imshow("idft_img1", cv2.convertScaleAbs(idft1))
cv2.imshow("idft_img2", cv2.convertScaleAbs(idft2))
cv2.imshow("idft_img3", cv2.convertScaleAbs(idft3))
cv2.waitKey(0)

`,
    },
    {
      id: 'chap09-06-FFT_filtering1',
      filename: '06.FFT_filtering1.py',
      title: 'FFT filtering1',
      code: `import numpy as np, cv2
from Common.fft2d import fft2, ifft2, calc_spectrum, fftshift

def FFT(image, mode = 2):
    if mode == 1: dft = fft2(image)
    elif mode==2: dft = np.fft.fft2(image)
    elif mode==3: dft = cv2.dft(np.float32(image), flags=cv2.DFT_COMPLEX_OUTPUT)
    dft = fftshift(dft)                              # 셔플링
    spectrum = calc_spectrum(dft)               # 주파수 스펙트럼 영상
    return dft, spectrum

def IFFT(dft, shape, mode=2):
    dft = fftshift(dft)                                 # 역 셔플링
    if mode == 1: img = ifft2(dft).real
    if mode == 2: img = np.fft.ifft2(dft).real
    if mode ==3:  img = cv2.idft(dft, flags= cv2.DFT_SCALE)[:,:,0]
    img = img[:shape[0], :shape[1]]                 # 영삽입 부분 제거
    return cv2.convertScaleAbs(img)

image = cv2.imread('images/dft_240.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 에러")
cy, cx = np.divmod(image.shape, 2)[0]                 # 행렬 중심점 구하기
mode = 1

dft, spectrum = FFT(image, mode)                  # FFT 수행 및 셔플링
lowpass = np.zeros(dft.shape, np.float32)
highpass = np.ones(dft.shape, np.float32)
cv2.circle(lowpass , (cx, cy), 30, (1,1), -1)
cv2.circle(highpass, (cx, cy), 30, (0,0), -1)

lowpassed_dft = dft * lowpass
highpassed_dft = dft * highpass
lowpassed_img = IFFT(lowpassed_dft, image.shape, mode)
highpased_img = IFFT(highpassed_dft, image.shape, mode)

cv2.imshow("image", image)
cv2.imshow("lowpassed_img", lowpassed_img) # 역푸리에 변환 영상
cv2.imshow("highpased_img", highpased_img)
cv2.imshow("spectrum_img", spectrum)
cv2.imshow("lowpass_spect", calc_spectrum(lowpassed_dft))
cv2.imshow("highpass_spect", calc_spectrum(highpassed_dft))
cv2.waitKey(0)`,
    },
    {
      id: 'chap09-07-FFT_filtering2',
      filename: '07.FFT_filtering2.py',
      title: 'FFT filtering2',
      code: `import numpy as np, cv2
from Common.fft2d import FFT, IFFT, calc_spectrum
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D             # 3차원 그래프 라이브러리

def get_gaussianFilter(shape, R):
    u = np.array(shape)//2
    y = np.arange(-u[0], u[0], 1)
    x = np.arange(-u[1], u[1], 1)
    x, y = np.meshgrid(x, y)
    filter = np.exp(-(x**2 + y**2)/ (2 * R**2))
    return x, y, filter if len(shape) < 3 else cv2.merge([filter, filter])

def get_gaussianFilter1(shape, sigmaX, sigmaY):           # OpenCV 함수로 가우시안 커널 생성
    r = cv2.getGaussianKernel(shape[0], sigmaY)
    c = cv2.getGaussianKernel(shape[1], sigmaX)
    filter = np.outer(r,c)
    cv2.normalize(filter, filter, 0, 1, cv2.NORM_MINMAX)
    return filter if len(shape) < 3 else cv2.merge([filter, filter])

def get_butterworthFilter(shape, R, n):
    u = np.array(shape)//2
    y = np.arange(-u[0], u[0], 1)
    x = np.arange(-u[1], u[1], 1)
    x, y = np.meshgrid(x, y)
    dist = np.sqrt(x** 2 + y** 2)
    filter = 1 / (1 + np.power(dist / R, 2 * n))
    return x, y, filter if len(shape) < 3 else cv2.merge([filter, filter])

image = cv2.imread('images/filter.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 에러")

mode = 3
dft, spectrum = FFT(image, mode)                    # FFT 수행 및 셔플링
x1, y1, gauss_filter = get_gaussianFilter(dft.shape, 30)       # 필터 생성
x2, y2, butter_filter = get_butterworthFilter(dft.shape, 30, 10)

filtered_dft1 = dft * gauss_filter                  # 주파수 공간 필터링 - 원소 간 곱셈
filtered_dft2 = dft * butter_filter
gauss_img = IFFT(filtered_dft1, image.shape, mode)
butter_img= IFFT(filtered_dft2, image.shape, mode)
spectrum1 = calc_spectrum(filtered_dft1)
spectrum2 = calc_spectrum(filtered_dft2)

if mode==3:
    gauss_filter, butter_filter = gauss_filter[:,:,0], butter_filter[:,:,0]

fig = plt.figure(figsize=(10,10))                   # 그래프3 생성
ax1 = plt.subplot(332, projection='3d')
ax1.plot_surface(x1, y1, gauss_filter, cmap='RdPu'), plt.title('gauss_filter')
ax2 = plt.subplot(333, projection='3d')
ax2.plot_surface(x2, y2, butter_filter,cmap='RdPu'), plt.title('butter_filter')

titles = ['input image','gauss_lowpassed_image', 'butter_lowpassed_image',
          'input spectrum','gauss_lowpassed_spectrum','butter_lowpassed_spectrum']
images = [image, gauss_img, butter_img, spectrum, spectrum1, spectrum2]
plt.gray()                                          # 명암도 영상으로 표시
for i, t in enumerate(titles):
    plt.subplot(3,3,i+4), plt.imshow(images[i]), plt.title(t)
plt.tight_layout(), plt.show()`,
    },
    {
      id: 'chap09-08-remove_moire',
      filename: '08.remove_moire.py',
      title: 'remove moire',
      code: `import numpy as np, cv2
from Common.fft2d import FFT, IFFT, calc_spectrum

def onRemoveMoire(val):
    radius = cv2.getTrackbarPos("radius", title)
    th  = cv2.getTrackbarPos("threshold", title)
    
    mask= cv2.threshold(spectrum_img, th, 255, cv2.THRESH_BINARY_INV)[1]
    y, x = np.divmod(mask.shape,2)[0]
    cv2.circle(mask, (x, y), radius, 255, -1)

    if dft.ndim<3:
        remv_dft = np.zeros(dft.shape, np.complex)
        remv_dft.imag = cv2.copyTo(dft.imag, mask=mask)
        remv_dft.real = cv2.copyTo(dft.real, mask=mask)
    else:
        remv_dft = cv2.copyTo(dft, mask=mask)

    result[:, image.shape[1]:] = IFFT(remv_dft, image.shape, mode)
    cv2.imshow(title, calc_spectrum(remv_dft))
    cv2.imshow("result", result)

image = cv2.imread('images/mo2.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 에러")

mode = 3
result = cv2.repeat(image, 1, 2)                    # 원본 영상 + 결과 영상
dft, spectrum_img = FFT(image, mode)              # OpenCV dft() 함수 수행

title = "removed moire"
cv2.imshow("result", result)
cv2.imshow(title, spectrum_img)
cv2.createTrackbar("radius", title, 10, 255, onRemoveMoire)
cv2.createTrackbar("threshold", title, 120, 255, onRemoveMoire)
cv2.waitKey(0)`,
    },
    {
      id: 'chap09-09-dct',
      filename: '09.dct.py',
      title: 'dct',
      code: `import numpy as np, cv2, math
import scipy.fftpack as sf

def cos(n,k,N):
    return math.cos((n + 1/2) * math.pi * k / N)

def C(k, N):
    return math.sqrt(1/N) if k==0 else math.sqrt(2/N)

def dct(g):
    N = len(g)
    f = [C(k, N) * sum(g[n] * cos(n, k, N ) for n in range(N)) for k in range(N)]
    return np.array(f, np.float32)

def idct(f):
    N = len(f)
    g = [sum(C(k, N) * f[k] * cos(n, k, N) for k in range(N)) for n in range(N)]
    return np.array(g)

def dct2(image):
    tmp = [dct(row) for row in image]
    dst = [dct(row) for row in np.transpose(tmp)]
    return np.transpose(dst)                   # 전치 환원 후 반환

def idct2(image):
    tmp = [idct(row) for row in image]
    dst = [idct(row) for row in np.transpose(tmp)]
    return np.transpose(dst)                   # 전치 환원 후 반환

def scipy_dct2(a):
    tmp = sf.dct(a, axis=0, norm='ortho' )
    return sf.dct(tmp, axis=1, norm='ortho' )

def scipy_idct2(a):
    tmp = sf.idct(a, axis=0, norm='ortho')
    return sf.idct(tmp, axis=1 , norm='ortho')

block = np.zeros((8,8), np.uint8)
cv2.randn(block, 128, 50)

dct1 = dct2(block)
dct2 = scipy_dct2(block)
dct3 = sf.dctn(block, shape=block.shape, norm='ortho')			# 2차원 dct 수행 다른 방식
dct4 = cv2.dct(block.astype("float32"))

idct1 = idct2(dct1)
idct2 = scipy_idct2(dct2)
idct3 = sf.idctn(dct3, shape=dct2.shape, norm='ortho')			# 2차원 dct 수행 다른 방식
idct4 = cv2.dct(dct4, flags=cv2.DCT_INVERSE)

print('block=\\n', block)
print('dct1(저자구현 함수)=\\n', dct1)
print('dct2(scipy 모듈 함수1)=\\n', dct2)
print('dct3(scipy 모듈 함수2)=\\n', dct3)
print('dct4(OpenCV 함수)=\\n', dct4)
print()
print('idct1(저자구현 함수)=\\n', cv2.convertScaleAbs(idct1))
print('idct2(scipy 모듈 함수1)=\\n', cv2.convertScaleAbs(idct2))
print('idct3(scipy 모듈 함수2)=\\n', cv2.convertScaleAbs(idct3))
print('idct4(OpenCV 함수)=\\n', cv2.convertScaleAbs(idct4))`,
    },
    {
      id: 'chap09-10-dct_filtering',
      filename: '10.dct_filtering.py',
      title: 'dct filtering',
      code: `import numpy as np, cv2
from Common.dct2d import *

def dct2_mode(block, mode):
    if mode==1: return dct2(block)
    elif mode==2: return  scipy_dct2(block)
    elif mode==3: return  cv2.dct(block.astype('float32'))

def idct2_mode(block, mode):
    if mode==1: return idct2(block)
    elif mode==2: return scipy_idct2(block)
    elif mode==3: return cv2.dct(block, flags=cv2.DCT_INVERSE)

def dct_filtering(img, filter, M, N):
    dst = np.empty(img.shape, np.float32)
    for i in range(0, img.shape[0], M):                    # ?? ?? ??
        for j in range(0, img.shape[1], N):
            block = img[i:i+M, j:j+N]                      # ?? ??
            dct_block = dct2_mode(block, mode)             # DCT ??
            dct_block = dct_block * filter                 # ??? ?? ???
            dst[i:i+M, j:j+N] = idct2_mode(dct_block, mode)    # ? DCT
    return cv2.convertScaleAbs(dst)

image = cv2.imread('images/dct.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일을 읽기 에러")
mode = 2
M, N = 8, 8
filters = [np.zeros((M, N), np.float32) for i in range(5)]
titles = ['DC Pass', 'High Pass', 'Low Pass', 'Vertical Pass', 'Horizental Pass' ]

filters[0][0, 0] = 1                     	# DC 계수만 1 지정 – DC Pass
filters[1][:], filters[1][0, 0] = 1, 0		# 모든 계수 1, DC 계수만 0 지정 – High Pass
filters[2][:M//2, :N//2] = 1				# 저주파 영역 모두 1 지정 – Low Pass
filters[3][0, 1:] = 1                     	# 첫 행열 1 지정 – Vertical
filters[4][1:, 0] = 1						# 첫 열만 1 지정 – Horizental

for filter, title in zip(filters, titles):
    dst = dct_filtering(image, filter, M, N)          # ?? ??? DCT ??
    cv2.imshow(title, dst)

cv2.imshow("image", image)
cv2.waitKey(0)`,
    },
  ],

  'chap10': [
    {
      id: 'chap10-01-hough_lines',
      filename: '01.hough_lines.py',
      title: 'hough lines',
      code: `import numpy as np, cv2, math
from Common.hough import accumulate, masking, select_lines

def houghLines(src, rho, theta, thresh):
    acc_mat = accumulate(src, rho, theta)  # 허프 누적 행렬 계산
    acc_dst = masking(acc_mat, 7, 3, thresh)  # 마스킹 처리 7행,3열
    lines = select_lines(acc_dst, rho, theta, thresh)  # 직선 가져오기
    return lines

def draw_houghLines(src, lines, nline):
    dst = cv2.cvtColor(src, cv2.COLOR_GRAY2BGR)  # 컬러 영상 변환
    min_length = min(len(lines), nline)

    for i in range(min_length):
        rho, radian = lines[i, 0, 0:2]  # 수직거리 , 각도 - 3차원 행렬임
        a, b = math.cos(radian), math.sin(radian)
        pt = (a * rho, b * rho)  # 검출 직선상의 한 좌표 계산
        delta = (-1000 * b, 1000 * a)  # 직선상의 이동 위치
        pt1 = np.add(pt, delta).astype('int')
        pt2 = np.subtract(pt, delta).astype('int')
        cv2.line(dst, tuple(pt1), tuple(pt2), (0, 255, 0), 2, cv2.LINE_AA)

    return dst

image = cv2.imread('images/hough.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 에러")
blur  = cv2.GaussianBlur(image, (5, 5), 2, 2)
canny = cv2.Canny(blur, 100, 200, 5)

rho, theta = 1,  np.pi / 180
lines1 = houghLines(canny, rho, theta, 80)
lines2 = cv2.HoughLines(canny, rho, theta, 80)
dst1 = draw_houghLines(canny, lines1, 7)
dst2 = draw_houghLines(canny, lines2, 7)

cv2.imshow("image", image)
cv2.imshow("canny", canny)
cv2.imshow("detected lines", dst1)
cv2.imshow("detected lines_OpenCV", dst2)
cv2.waitKey(0)`,
    },
    {
      id: 'chap10-02-correct_object',
      filename: '02.correct_object.py',
      title: 'correct object',
      code: `import numpy as np, cv2
from Common.hough import *                    # 허프 변환 관련 사용자 정의 함수 포함

def detect_maxObject(img):
    # 외곽선 검출 - Opnecv 4.0부터 반환값은 2개 원소 갖는 튜플
    results = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if int(cv2.__version__[0]) >= 4:                # Opnecv 4.0은 2원소 튜플 반환
        contours = results[0]
    else:
        contours = results[1]				# OpenCV 3.x은 3원소 튜플 반환

    areas = [cv2.contourArea(c) for c in contours]
    idx = np.argsort(areas)
    max_rect = contours[idx[-1]]

    rect = cv2.boundingRect(max_rect)        # 외곽선을 모두 포함하는 사각형 반환
    rect = np.add(rect, (-10, -10, 20, 20))   # 검출 객체 사각형 크기 확대
    return rect

image = cv2.imread('images/harness.jpg', cv2.IMREAD_COLOR)
if image is None: raise Exception("영상 파일 읽기 에러")
rho, theta = 1, np.pi / 180                             # 허프변환 거리간격, 각도간격
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)          # 명암도 영상 변환
_, th_gray = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY) # 이진 영상 변환
kernel = np.ones((3, 3), np.uint8)
morph = cv2.erode(th_gray, kernel, iterations=2)        # 침식 연산 - 2번 반복

x, y, w, h = detect_maxObject(np.copy(morph))               # 가장 큰 객체 검출
roi = th_gray[y:y+h, x:x+w]

canny = cv2.Canny(roi, 40, 100)                         # 캐니 에지 검출
lines = houghLines(canny, rho, theta, 50)               # 허프 직선 검출
# lines = cv2.HoughLines(canny, rho, theta, 50)         # OpenCV 함수

cv2.rectangle(morph, (x, y, w, h), 100, 2)                   # 큰 객체 사각형 표시
canny_line = draw_houghLines(canny, lines, 1)           # 직선 표시

angle = (np.pi - lines[0, 0, 1]) * 180 / np.pi           # 회전 각도 계산
h, w = image.shape[:2]
center = (w//2, h//2)                           # 입력 영상의 중심점
rot_map = cv2.getRotationMatrix2D(center, -angle, 1)    # 반대방향 회전 행렬 계산
dst = cv2.warpAffine(image, rot_map, (w, h), cv2.INTER_LINEAR)  # 역회전 수행

cv2.imshow("image", image)
cv2.imshow("morph", morph)
cv2.imshow("line_detect", canny_line)
cv2.resizeWindow("line_detect", 250, canny_line.shape[0])
cv2.imshow("dst", dst)
cv2.waitKey(0)`,
    },
    {
      id: 'chap10-03-harris_detect',
      filename: '03.harris_detect.py',
      title: 'harris detect',
      code: `import numpy as np, cv2
from Common.utils import put_string, ck_time

def cornerHarris(image, ksize, k):
    dx = cv2.Sobel(image, cv2.CV_32F, 1, 0, ksize)   # 미분 행렬 - 수평 소벨 마스크
    dy = cv2.Sobel(image, cv2.CV_32F, 0, 1, ksize)   # 미분 행렬 - 수직 소벨 마스크

    a = cv2.GaussianBlur(dx * dx, (5, 5), 0)                     # 가우시안 블러링 수행
    b = cv2.GaussianBlur(dy * dy, (5, 5), 0)
    c = cv2.GaussianBlur(dx * dy, (5, 5), 0)
    
    corner = (a * b - c * c) - k * (a + b) ** 2        # 코너 응답 함수 계산 -행렬 연산 적용
    return corner

def drawCorner(corner, image, thresh):
    cnt = 0
    corner = cv2.normalize(corner, 0, 100, cv2.NORM_MINMAX)
    corners = []
    for i in range(1, corner.shape[0]-1 ):
        for j in range(1, corner.shape[1]-1 ):
            neighbor = corner[i-1:i+2, j-1:j+2].flatten()
            max = np.max(neighbor[1::2])
            if thresh < corner[i, j] > max : corners.append((j,i))

    for pt in corners:
        cv2.circle(image, pt, 3, (0, 230, 0), -1)    # 좌표 표시
    print("임계값: %2d , 코너 개수: %2d" %(thresh, len(corners)) )
    return image

def onCornerHarris(thresh):
    img1 = drawCorner(corner1, np.copy(image), thresh)
    img2 = drawCorner(corner2, np.copy(image), thresh)

    put_string(img1, "USER", (10, 30), "" )
    put_string(img2, "OpenCV", (10, 30), "")
    dst = cv2.repeat(img1, 1, 2)                            # 두 개 영상을 하나의 윈도우에 표시
    dst[:, img1.shape[1]:, :] = img2
    cv2.imshow("harris detect", dst)

image = cv2.imread('images/harris.jpg', cv2.IMREAD_COLOR)
if image is None: raise Exception("영상 파일 읽기 에러")

blockSize = 4                                                # 이웃 화소 범위
apertureSize = 3                                             # 소벨 마스크 크기
k = 0.04
thresh = 2                                                   # 코너 응답 임계값
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
corner1 = cornerHarris(gray, apertureSize, k)                # 사용자 정의 함수
corner2 = cv2.cornerHarris(gray, blockSize, apertureSize, k) # OpenCV 제공 함수

onCornerHarris(thresh)
cv2.createTrackbar("Threshold", "harris detect", thresh, 20, onCornerHarris)
cv2.waitKey(0)
`,
    },
    {
      id: 'chap10-04-kNN_exam',
      filename: '04.kNN_exam.py',
      title: 'kNN exam',
      code: `import numpy as np, cv2

def draw_points(image, group, color):
    for p in group:
        pt = tuple(p.astype(int))
        cv2.circle(image, pt, 3, color, cv2.FILLED)

nsample = 50
traindata = np.zeros((nsample*2, 2), np.float32)  # 학습 데이터 행렬
label = np.zeros((nsample*2, 1), np.float32)   # 레이블

cv2.randn(traindata[:nsample], 150, 30)
cv2.randn(traindata[nsample:], 250, 60)
label[:nsample], label[nsample:] = 0 , 1

K = 7
knn = cv2.ml.KNearest_create()  # kNN 클래스로 객체 생성
knn.train(traindata, cv2.ml.ROW_SAMPLE, label)  # 학습 수행

points = [(x, y) for y in range(400) for x in range(400)  ]
ret, resp, neig, dist = knn.findNearest(np.array(points, np.float32), K)  # 분류 수행

colors = [(0, 180, 0) if p==1 else  (0, 0, 180) for p in resp]
image = np.reshape(colors, (400,400,3)).astype("uint8")

draw_points(image, traindata[:nsample], color=(0, 0, 255))
draw_points(image, traindata[nsample:], color=(0, 255, 0))
cv2.imshow("sample K="+ str(K), image)
cv2.waitKey(0)`,
    },
    {
      id: 'chap10-05-mnist_kNN_train',
      filename: '05.mnist_kNN_train.py',
      title: 'mnist kNN train',
      code: `import cv2, numpy as np
import pickle, gzip, os
from urllib.request import urlretrieve
import matplotlib.pyplot as plt

def load_mnist(filename):
    if not os.path.exists(filename):
        print("Downloading" )
        link = "http://deeplearning.net/data/mnist/mnist.pkl.gz"
        urlretrieve(link, filename)
    with gzip.open(filename, 'rb') as f:
        return pickle.load(f, encoding='latin1')

def graph_image(data, lable, title, nsample):
    plt.figure(num=title, figsize=(6, 9))
    rand_idx = np.random.choice(range(data.shape[0]), nsample)
    for i, id in enumerate(rand_idx):
        img = data[id].reshape(28, 28)
        plt.subplot(6, 4, i + 1), plt.axis('off'), plt.imshow(img, cmap='gray')
        plt.title('%s: %d' % (title , lable[id]))
    plt.tight_layout()

train_set, valid_set, test_set = load_mnist('mnist.pkl.gz')
train_data, train_label = train_set
test_data, test_label = test_set
## MNIST 로드 데이터 크기 확인
print('train_set=', train_set[0].shape)
print('valid_set', valid_set[0].shape)
print('test_set', test_set[0].shape)

print('training...')
knn = cv2.ml.KNearest_create()
knn.train(train_data, cv2.ml.ROW_SAMPLE, train_label)               # k-NN 학습 수행

nsample = 100
print("%d개 predicting..." % nsample)
_, resp, _ , _ = knn.findNearest(test_data[:nsample], k=5)            # k-NN 분류 수행
accur = sum(test_label[:nsample] == resp.flatten()) / len(resp)       # 성능 측정

print("정확도=", accur*100, '%')
graph_image(train_data, train_label, 'label', 24)                   # 학습 데이터 그리기
graph_image(test_data[:nsample], resp, 'predict', 24)                #
plt.show()`,
    },
    {
      id: 'chap10-06-cells_visibility',
      filename: '06.cells_visibility.py',
      title: 'cells visibility',
      code: `import cv2
import matplotlib.pyplot as plt

def get_cell(img, j, i, size):
    x, y = (j * size[0], i * size[1])  # 숫자칸 시작좌표
    return img[y:y + size[1], x:x + size[0]]

train_image = cv2.imread('images/train_numbers.png', cv2.IMREAD_GRAYSCALE)
if train_image is None: raise Exception("영상 파일 읽기 에러")
train_image = train_image[5:405, 6:806]                 # 상하좌우 여백 제거

size, K = (40, 40),  15                                 # 숫자 영상 크기
nclass, nsample = 10, 20                                # 그룹수, 그룹당 샘플수
cells =[get_cell(train_image, j, i, size) for i in range(nclass) for j in range(nsample)]
# cells = [np.hsplit(row, nsample) for row in np.vsplit(train_image,nclass)]
# cells = np.reshape(cells, (-1,40,40))

for i, cell in enumerate(cells):
    plt.subplot(10, 20, i+1), plt.axis('off'), plt.imshow(cell, cmap='gray')
plt.tight_layout(), plt.show()`,
    },
    {
      id: 'chap10-07-kNN_number',
      filename: '07.kNN_number.py',
      title: 'kNN number',
      code: `import numpy as np , cv2
from Common.knn import find_number, place_middle, get_cell
import matplotlib.pyplot as plt

size, K = (40, 40),  15                                 # 숫자 영상 크기
nclass, nsample = 10, 20                                # 그룹수, 그룹당 샘플수

train_image = cv2.imread('images/train_numbers.png', cv2.IMREAD_GRAYSCALE)
if train_image is None: raise Exception("영상 파일 읽기 에러")
train_image = train_image[5:405, 6:806]
cv2.threshold(train_image, 32, 255, cv2.THRESH_BINARY, train_image)

cells = [np.hsplit(row, nsample) for row in np.vsplit(train_image, nclass)]
nums = [find_number(c) for c in np.reshape(cells, (-1, 40, 40))]
trainData = np.array([place_middle(n, size) for n in nums])
labels= np.array([ i for i in range(nclass) for j in range(nsample)], np.float32)

print('cells 형태:', np.array(cells).shape)
print('nums 형태:', np.array(nums).shape)
print('trainData 형태:',trainData.shape)
print('labels 형태:',labels.shape)

knn = cv2.ml.KNearest_create()
knn.train(trainData, cv2.ml.ROW_SAMPLE, labels)       # k-NN 학습 수행

plt.figure(figsize=(10,10))
for i in range(50):
    test_img = cv2.imread('images/num/%d%d.png' % (i / 5 , i % 5), cv2.IMREAD_GRAYSCALE)
    cv2.threshold(test_img, 128, 255, cv2.THRESH_BINARY, test_img)  # 이진화

    num = find_number(test_img)
    data = place_middle(num, size)  # 숫자 객체 중심 배치
    data = data.reshape(1, -1)

    _, [[resp]], _, _ = knn.findNearest(data, K)  # 숫자 분류 수행
    plt.subplot(10, 5, i+1), plt.axis('off'), plt.imshow(num, cmap='gray')
    plt.title('resp ' + str(resp))
plt.tight_layout(), plt.show()`,
    },
    {
      id: 'chap10-08-warping',
      filename: '08.warping.py',
      title: 'warping',
      code: `import numpy as np, cv2

def morphing():
    h, w = image.shape[:2]
    dst = np.zeros((h, w), image.dtype)
    ys = np.arange(0, image.shape[0], 1)
    xs = np.arange(0, image.shape[1], 0.1)

    x1, x10 = pt1[0] , pt1[0]*10
    ratios = xs / x1
    ratios[x10:] = (w - xs[x10:]) / (w-x1)

    dxs = xs + ratios * (pt2[0] - pt1[0])
    xs, dxs = xs.astype(int), dxs.astype(int)

    ym, xm = np.meshgrid(ys, xs)
    _, dxm = np.meshgrid(ys, dxs)
    dst[ym, dxm] = image[ym, xm]
    cv2.imshow("image", dst)

def onMouse(event, x, y, flags, param):
    global pt1, pt2
    if event == cv2.EVENT_LBUTTONDOWN:
        pt1 = (x, y)                               # 드래그 시작 좌표
    elif event == cv2.EVENT_LBUTTONUP:
        pt2 = (x, y)                               # 드래그 종료 좌표
        morphing()                                 # 드래그 종료 시 워핑 변환 수행
    elif event == cv2.EVENT_RBUTTONDBLCLK:
        pt1 = pt2 = (-1, -1)
        cv2.imshow("image", image)                 # 오른쪽 버튼 더블 클릭 시 원복

image = cv2.imread('images/warp.jpg', cv2.IMREAD_GRAYSCALE)
if image is None: raise Exception("영상 파일 읽기 에러")

pt1 = pt2 = (-1, -1)
cv2.imshow("image", image)
cv2.setMouseCallback("image", onMouse, 0)          # 마우스 콜백 함수 등록
cv2.waitKey(0)`,
    },
    {
      id: 'chap10-09-warping_image',
      filename: '09.warping_image.py',
      title: 'warping image',
      code: `import numpy as np, cv2, pickle

def findCorners(image, bSize):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    ret, corners = cv2.findChessboardCorners(gray, bSize) # 코너 검출

    if ret:        # 부화소(subpixel) 위치를 찾아서 코너 좌표 개선
        criteria = (cv2.TermCriteria_MAX_ITER + cv2.TermCriteria_EPS, 30, 0.1)
        cv2.cornerSubPix(gray, corners, (11, 11), (-1, -1), criteria)
    return ret, np.array(corners, np.float32), image

def show_image(file, bSize, result):
    cv2.drawChessboardCorners(result[2], bSize, result[1], result[0])  # 코너 표시
    cv2.imshow(file, result[2])

def calibrate_correct(objectPoints, imagePoints, image):
    size = image.shape[1::-1]
    ret = cv2.calibrateCamera(objectPoints, imagePoints, size, None, None)

    newSacle, roi = cv2.getOptimalNewCameraMatrix(ret[1], ret[2], size, 1)
    undistorted = cv2.undistort(image, ret[1], ret[2], None, newSacle)
    x, y, w, h = roi
    return ret, undistorted, undistorted[y:y + h, x:x + w]  # 왜곡 영역 제거

bSize = (8, 7)                                      # 체스판 코너 개수(가로, 세로)
points = [(x, y, 0) for y in range(bSize[1]) for x in range(bSize[0])]
points = np.array(points, np.float32)

# 코너 좌표 및 실세계 3차원 좌표
files = ["chessboard_01", "chessboard_02", "chessboard_02"]
images = [cv2.imread('images/%s.jpg' % file, 1) for file in files]
results = [findCorners(image, bSize) for image in images]
imagePoints = [result[1] for result in results if result[0]]
objectPoints = [points] * len(imagePoints)

[show_image(f, bSize, result) for f, result in zip(files, results) if result[0]]

image = cv2.imread("images/chessboard_05.jpg", cv2.IMREAD_COLOR)
if image is None: raise Exception("영상 파일 읽기 에러")

ret, undistorted, correct_img = calibrate_correct(objectPoints, imagePoints, image)

print("RMS error reported by cv2.calibrateCamera:", ret[0])
print("cameraMatrix =\\n%s" % ret[1])
print("distCoeffs =\\n%s" % ret[2])
print("rvecs =\\n%s" % np.reshape(ret[3], (3,-1)))
print("tvecs =\\n%s" % np.reshape(ret[4], (3,-1)))

with open('camera_calibration.txt', 'wb') as f:
    pickle.dump(ret, f)

cv2.imshow("original", image)
cv2.imshow("undistorted", undistorted)
cv2.imshow("cropUndistorted", correct_img)
cv2.waitKey(0)`,
    },
    {
      id: 'chap10-10-warping_camera',
      filename: '10.warping_camera.py',
      title: 'warping camera',
      code: `import numpy as np, cv2
from Common.utils import put_string
from Common.calibration import *

bSize, mode = (8,7), 'detect mode'             # 체스판 코너수, 카메라 모드
imagePoints= []                                 # 영상 코너 좌표
points = [(x, y, 0) for y in range(bSize[1]) for x in range(bSize[0])]
points = np.array(points, np.float32)

capture = cv2.VideoCapture(0)
if capture.isOpened() is False: raise Exception('카메라 연결 안됨')
capture.set(cv2.CAP_PROP_BRIGHTNESS, 100)
print('카메라 연결 완료')

while(True):
    ret, frame = capture.read()
    key = cv2.waitKey(30)
    if key == 27 or ret is False : break     #  esc 키이면 종료
    if key == 13: mode = 'correct mode'      # 엔터키
    if key == 8:  mode = 'detect mode'       # 백페이스바키

    if mode =='detect mode':
        ret, corners, img = findCorners(frame, bSize)    # 코너 검출
        if ret: show_image('image', bSize, (ret, corners, img))

        if ret and key == 32:                      # 스페이스바이면 저장
            imagePoints.append(corners)             # 코너 좌표 저장
            put_string(frame, "save cord: ", (10, 40), len(imagePoints) )
            cv2.imshow("image", frame)
            cv2.waitKey(500)                        # 표시 내용 보이기 위해 잠깐 멈춤
        else:
            put_string(frame, mode, (10, 40), '')
            cv2.imshow("image", frame)

    elif mode == 'correct mode':
        if len(imagePoints) >= 3 :
            objectPoints = [points] * len(imagePoints)
            _, _, correct_img = calibrate_correct(objectPoints, imagePoints, frame)
            put_string(frame, mode, (400, 40), '')
            cv2.imshow('image', frame)
        else:
            put_string(frame, "Capture more than 3 corner coordinates", (70, 200))
            cv2.imshow("image", frame)
            cv2.waitKey(1000)
            mode = 'detect mode'

capture.release()`,
    },
  ],

  'chap11': [
    {
      id: 'chap11-01-place_icons',
      filename: '01.place_icons.py',
      title: 'place icons',
      code: `import numpy as np, cv2

def place_icons(image, size):
    icon_name = ["rect", "circle", "eclipe", "line", "brush", "eraser",  # 아이콘 파일 이름
                 "open", "save", "plus", "minus", "clear", "color"]
    icons = [(i%2, i//2, 1, 1) for i in range(len(icon_name))]
    icons = np.multiply(icons, size*2)                  # icons 모든 원소에 size 곱합

    for roi, name in zip(icons, icon_name):
        icon = cv2.imread('images/icon/%s.jpg' % name, cv2.IMREAD_COLOR)
        if icon is None: continue
        x, y, w, h = roi
        image[y:y+h, x:x+w] = cv2.resize(icon, size)
    return list(icons)

image = np.full((500, 800, 3), 255, np.uint8)
icons = place_icons(image, (60, 60))                # 아이콘 배치, 아이콘 크기
cv2.imshow("PaintCV", image)
cv2.waitKey(0)


`,
    },
    {
      id: 'chap11-02-place_menu',
      filename: '02.place_menu.py',
      title: 'place menu',
      code: `from paint_init import *
from paint_utils import *

image = np.full((500, 800, 3), 255, np.uint8)
icons = place_icons(image, (60, 60))                # 아이콘 배치, 아이콘 크기
x, y, w, h = icons[-1]                               # 아이콘 사각형 마지막 원소
palatte_roi  = (0, y + h + 2  , 120, 120)           # 팔레트 ROI
hueIndex_roi = (0, y + h + 124, 120, 15)            # 색상인덱스 ROI

icons.append(palatte_roi)      # 팔레트 사각형 추가
icons.append(hueIndex_roi)  # 색상인덱스 사각형 추가

create_hueIndex(image, icons[HUE_IDX])               # 색상인텍스 생성
create_colorPlatte(image, 0, icons[PALETTE])        # 팔레트 생성

cv2.imshow("PaintCV", image)
cv2.waitKey(0)


`,
    },
    {
      id: 'chap11-03-event_platte',
      filename: '03.event_platte.py',
      title: 'event platte',
      code: `from paint_init import *
from paint_utils import *

def onMouse(event, x, y, flags, param):  # 콜백 함수
    global pt1, pt2, mouse_mode, draw_mode

    if event == cv2.EVENT_LBUTTONUP:  # 왼쪽 버튼 떼기
        pt2 = (x, y)  # 종료좌표 저장
        mouse_mode = 1  # 버튼 떼기 상태 지정

        for i, (x0, y0, w, h) in enumerate(icons):  # 메뉴아이콘 사각형 조회
            if x0 <= x < x0+w and y0 <= y < y0+ h:  # 메뉴 클릭 여부 검사
                if i < 6:  # 그리기 명령이면
                    mouse_mode = 0  # 마우스 상태 초기화
                    draw_mode = i  # 그리기 모드
                else:  # 일반 명령이면
                    command(i)
                return  # 버그 수정

    elif event == cv2.EVENT_LBUTTONDOWN:  # 왼쪽 버튼 누르기
        pt1 = (x, y)  # 시작좌표 저장
        mouse_mode = 2

    if mouse_mode >= 2:  # 왼쪽 버튼 누르기 또는 드래그
        mouse_mode = 0 if x < 125 else 3  # 메뉴 영역 확인- 마우스 상태 지정
        pt2 = (x, y)

def command(mode):
    global icons, image, Color, hue

    if mode == PALETTE:  # 색상팔레트 영역 클릭 시
        pixel = image[pt2[::-1]]  # 팔레트 클릭 좌표 화소값
        x, y, w, h = icons[COLOR]
        image[y:y + h - 1, x:x + w - 1] = pixel  # 색상 아이콘 영역에 pixel색 지정
        Color = tuple(map(int, pixel))
        # Color = tuple(pixel.astype('int'))

    elif mode == HUE_IDX:                                # 색상인텍스 클릭 시         
        create_colorPlatte(image, pt2[0], icons[PALETTE])

    cv2.imshow("PaintCV", image)

image = np.full((500, 800, 3), 255, np.uint8)
icons = place_icons(image, (60, 60))                # 아이콘 배치, 아이콘 크기
x, y, w, h = icons[-1]                               # 아이콘 사각형 마지막 원소

icons.append((0, y + h + 2  , 120, 120))      # 팔레트 사각형 추가
icons.append((0, y + h + 124, 120, 15) )  # 색상인덱스 사각형 추가
create_colorPlatte(image, 0, icons[PALETTE])    # 팔레트 생성
create_hueIndex(image, icons[HUE_IDX])                      # 색상인텍스 생성

cv2.imshow("PaintCV", image)
cv2.setMouseCallback("PaintCV", onMouse)                  # 마우스 콜백 함수
cv2.waitKey(0)
`,
    },
    {
      id: 'chap11-04-draw_command',
      filename: '04.draw_command.py',
      title: 'draw command',
      code: `from paint_init import *
from paint_utils import *

def command(mode):
    global icons, image, Color, hue

    if mode == PALETTE:  # 색상팔레트 영역 클릭 시
        Color = tuple(map(int, image[pt2[::-1]]))
        x, y, w, h = icons[COLOR]
        image[y:y + h - 1, x:x + w - 1] = Color

    elif mode == HUE_IDX:                               # 색상인텍스 클릭 시
        create_colorPlatte(image, pt2[0], icons[PALETTE])  # 팔레트 새로 그리기

    cv2.imshow("paintCV", image)

def onMouse(event, x, y, flags, param):
    global pt1, pt2, mouse_mode, draw_mode

    if event == cv2.EVENT_LBUTTONUP:                # 왼쪽 버튼 떼기
        for i, (x0, y0, w, h) in enumerate(icons):  # 메뉴아이콘 사각형 조회
            if x0 <= x < x0+w and y0 <= y < y0+h:  # 메뉴 클릭 여부 검사
                if i < 6:                       # 그리기 명령이면
                    mouse_mode = 0                  # 마우스 상태 초기화
                    draw_mode = i                   # 그리기 모드
                else:                           # 일반 명령이면
                    command(i)
                return

        pt2 = (x, y)                                # 종료좌표 저장
        mouse_mode = 1                              # 버튼 떼기 상태 지정

    elif event == cv2.EVENT_LBUTTONDOWN:            # 왼쪽 버튼 누르기
        pt1 = (x, y)  # 시작좌표 저장
        mouse_mode = 2

    if mouse_mode >= 2:  # 왼쪽 버튼 누르기 또는 드래그
        mouse_mode = 0 if x < 125 else 3  # 메뉴 영역 확인- 마우스 상태 지정
        pt2 = (x, y)

def draw(image, color=(200, 200, 200)):
    global draw_mode, thickness, pt1, pt2

    if draw_mode == DRAW_RECTANGLE:                      # 사각형 그리기
        cv2.rectangle(image, pt1, pt2, color, thickness)
        
    elif draw_mode == DRAW_LINE:                         # 직선 그리기
        cv2.line(image, pt1, pt2, color, thickness)
        
    elif draw_mode == DRAW_BRUSH:                        # 브러시 그리기 
        cv2.line(image, pt1, pt2, color, thickness * 3)
        pt1 = pt2                                   # 종료 좌표를 시작 좌표로 지정
        
    elif draw_mode == ERASE:                             # 지우개
        cv2.line(image, pt1, pt2, (255, 255, 255), thickness * 5)
        pt1 = pt2

    elif draw_mode == DRAW_CIRCLE:                      # 원 그리기
        d = np.subtract(pt1, pt2)                       # 두 좌표 차분
        radius = int(np.sqrt(d[0] ** 2 + d[1] ** 2))
        cv2.circle(image, pt1, radius, color, thickness)

    elif draw_mode == DRAW_ECLIPSE:  # 타원 그리기
        center = np.abs(np.add(pt1, pt2)) // 2  # 두 좌표의 중심점 구하기
        size = np.abs(np.subtract(pt1, pt2)) // 2  # 두 좌표의 크기의 절반
        cv2.ellipse(image, tuple(center), tuple(size), 0, 0, 360, color, thickness)

    cv2.imshow("PaintCV", image)

image = np.full((500, 800, 3), 255, np.uint8)
icons = place_icons(image, (60, 60))                # 아이콘 배치, 아이콘 크기
x, y, w, h = icons[-1]                               # 아이콘 사각형 마지막 원소
palatte_roi  = (0, y + h + 2  , 120, 120)           # 팔레트 ROI
hueIndex_roi = (0, y + h + 124, 120, 15)            # 색상인덱스 ROI

icons.append(palatte_roi)      # 팔레트 사각형 추가
icons.append(hueIndex_roi)  # 색상인덱스 사각형 추가
create_colorPlatte(image, 0, icons[PALETTE])    # 팔레트 생성
create_hueIndex(image, icons[HUE_IDX])                      # 색상인텍스 생성
cv2.imshow("PaintCV", image)
cv2.setMouseCallback("PaintCV", onMouse)                 # 마우스 콜백 함수

while True:
    if mouse_mode == 1:                                # 마우스 버튼 떼기
        draw(image, Color)                             # 원본에 그림
    elif mouse_mode == 3:                              # 마우스 드래그 
        if draw_mode == DRAW_BRUSH or draw_mode == ERASE:
            draw(image, Color)                         # 원본에 그림
        else:
            draw(np.copy(image), (200, 200, 200))      # 복사본에 회색으로 그림
   
    if cv2.waitKey(30) == 27:                          # ESC 키를 누르면 종료 
        break
`,
    },
    {
      id: 'chap11-05-PaintCV',
      filename: '05.PaintCV.py',
      title: 'PaintCV',
      code: `from paint_init import *
from paint_utils import *

def onMouse(event, x, y, flags, param):

    global pt1, pt2, mouse_mode, draw_mode

    if event == cv2.EVENT_LBUTTONUP:  # 왼쪽 버튼 떼기
        for i, (x0, y0, w, h) in enumerate(icons):  # 메뉴아이콘 사각형 조회
            if x0 <= x < x0+ w and y0 <= y < y0 + h:  # 메뉴 클릭 여부 검사
                if i < 6:                   # 그리기 명령이면
                    mouse_mode = 0          # 마우스 상태 초기화
                    draw_mode = i           # 그리기 모드
                else:
                    command(i)              # 일반 명령이면
                return

        pt2 = (x, y)                        # 종료좌표 저장
        mouse_mode = 1                      # 버튼 떼기 상태 지정

    elif event == cv2.EVENT_LBUTTONDOWN:  # 왼쪽 버튼 누르기
        pt1 = (x, y)  # 시작좌표 저장
        mouse_mode = 2

    if mouse_mode >= 2:  # 왼쪽 버튼 누르기 또는 드래그
        mouse_mode = 0 if x < 125 else 3  # 메뉴 영역 확인- 마우스 상태 지정
        pt2 = (x, y)

def draw(image, color=(200, 200, 200)):
    global draw_mode, thickness, pt1, pt2

    if draw_mode == DRAW_RECTANGLE:                 # 사각형 그리기
        cv2.rectangle(image, pt1, pt2, color, thickness)

    elif draw_mode == DRAW_LINE:                    # 직선 그리기
        cv2.line(image, pt1, pt2, color, thickness)

    elif draw_mode == DRAW_BRUSH:                   # 브러시 그리기
        cv2.line(image, pt1, pt2, color, thickness * 3)
        pt1 = pt2                               # 종료 좌표를 시작 좌표로 지정

    elif draw_mode == ERASE:                        # 지우개
        cv2.line(image, pt1, pt2, (255, 255, 255), thickness * 5)
        pt1 = pt2

    elif draw_mode == DRAW_CIRCLE:                  # 원 그리기
        d = np.subtract(pt1, pt2)           # 두 좌표 차분
        radius = int(np.sqrt(d[0] ** 2 + d[1] ** 2))
        cv2.circle(image, pt1, radius, color, thickness)

    elif draw_mode == DRAW_ECLIPSE:                 # 타원 그리기
        center = np.abs(np.add(pt1, pt2)) // 2      # 두 좌표의 중심점 구하기
        size = np.abs(np.subtract(pt1, pt2)) // 2   # 두 좌표의 크기의 절반
        cv2.ellipse(image, tuple(center), tuple(size), 0, 0, 360, color, thickness)

    cv2.imshow("PaintCV", image)

def command(mode):
    global icons, image, canvas, Color, hue, mouse_mode

    if mode == PALETTE:  # 색상팔레트 영역 클릭 시
        pixel = image[pt2[::-1]]
        x, y, w, h = icons[COLOR]
        image[y:y + h - 1, x:x + w - 1] = pixel
        Color = tuple(map(int, pixel))

    elif mode == HUE_IDX:  # 색상인텍스 클릭 시
        create_colorPlatte(image, pt2[0], icons[PALETTE])  # 팔레트 새로 그리기

    elif mode == OPEN:                                   # 영상 파일 열기
        tmp = cv2.imread("images/my_picture.jpg", cv2.IMREAD_COLOR)
        cv2.resize(tmp, canvas.shape[1::-1], canvas)

    elif mode == SAVE:                                  # 캔버스 영역 저장
        cv2.imwrite("images/my_save.jpg", canvas)

    elif mode == PLUS:                                  # 캔버스 영상 밝게 변경
        val = np.full(canvas.shape, 10, np.uint8)     # 증가 화소값 행렬 생성
        cv2.add(canvas, val, canvas)

    elif mode == MINUS:                                 # 캔버스 영상 어둡게 변경
        val = np.full(canvas.shape, 10, np.uint8)     # 증가 화소값 행렬 생성
        cv2.subtract(canvas, val, canvas)

    elif mode == CREAR:                                 # 캔버스 영역 전체 지우기
        canvas[:] = (255, 255, 255)                     # 캔버스를 흰색으로
        mouse_mode = 0                                  # 마우스 상태 초기화

    cv2.imshow("PaintCV", image)

def onTrackbar(value):                                   # 트랙바 콜백 함수
    global mouse_mode, thickness
    mouse_mode = 0                                       # 마우스 상태 초기화
    thickness = value

image = np.full((500, 800, 3), 255, np.uint8)
icons = place_icons(image, (60, 60))                # 아이콘 배치, 아이콘 크기
x, y, w, h = icons[-1]                               # 아이콘 사각형 마지막 원소

icons.append((0, y + h + 2  , 120, 120) )      # 팔레트 사각형 추가
icons.append((0, y + h + 124, 120, 15))  # 색상인덱스 사각형 추가
create_colorPlatte(image, 0, icons[PALETTE])    # 팔레트 생성
create_hueIndex(image, icons[HUE_IDX])                      # 색상인텍스 생성

cv2.imshow("PaintCV", image)
cv2.setMouseCallback("PaintCV", onMouse)                 # 마우스 콜백 함수
cv2.createTrackbar("Thickness", "PaintCV", thickness, 255, onTrackbar)
 
canvas = image[:, w*2:image.shape[1]]                  # 메뉴를 제외한 캔버스 영역

while True:
    if mouse_mode == 1:                                # 마우스 버튼 떼기
        draw(image, Color)                             # 원본에 그림
    elif mouse_mode == 3:                              # 마우스 드래그 
        if draw_mode == DRAW_BRUSH or draw_mode == ERASE:
            draw(image, Color)                         # 원본에 그림
        else:
            draw(np.copy(image), (200, 200, 200))      # 복사본에 회색으로 그림
    if cv2.waitKey(30) == 27:                          # ESC 키를 누르면 종료 
        break`,
    },
    {
      id: 'chap11-06-detect_face',
      filename: '06.detect_face.py',
      title: 'detect face',
      code: `import cv2, numpy as np

def preprocessing(no):  # 검출 전처리
    image = cv2.imread('images/face/%2d.jpg' %no, cv2.IMREAD_COLOR)
    if image is None: return None, None
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # 명암도 영상 변환
    gray = cv2.equalizeHist(gray)  # 히스토그램 평활화
    return image, gray

face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_alt2.xml")  # 정면 검출기
eye_cascade = cv2.CascadeClassifier("haarcascade_eye.xml")  # 눈 검출기
image, gray = preprocessing(34)  # 전처리
if image is None: raise Exception("영상 파일 읽기 에러")

faces = face_cascade.detectMultiScale(gray, 1.1, 2, 0, (100, 100));  # 얼굴 검출
if faces.any():
    x, y, w, h = faces[0]
    face_image = image[y:y + h, x:x + w]  # 얼굴 영역 영상 가져오기
    eyes = eye_cascade.detectMultiScale(face_image, 1.15, 7, 0, (25, 20))  # 눈 검출 수행
    if len(eyes) == 2:  # 눈 사각형이 검출되면
        for ex, ey, ew, eh in eyes:
            center = (x + ex + ew // 2, y + ey + eh // 2)
            cv2.circle(image, center, 10, (0, 255, 0), 2)  # 눈 중심에 원 그리기
    else:
        print("눈 미검출")

    cv2.rectangle(image, faces[0], (255, 0, 0), 2)  # 얼굴 검출 사각형 그리기
    cv2.imshow("image", image)

else: print("얼굴 미검출")
cv2.waitKey(0)`,
    },
    {
      id: 'chap11-07-detect_hair_lip',
      filename: '07.detect_hair_lip.py',
      title: 'detect hair lip',
      code: `from haar_utils import *                            # 전처리 및 영역 검출 함수 임포트

face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_alt2.xml")  # 정면 검출기
eye_cascade = cv2.CascadeClassifier("haarcascade_eye.xml")  # 눈 검출기
image, gray = preprocessing(34)  # 전처리
if image is None: raise Exception("영상 파일을 읽기 에러")

faces = face_cascade.detectMultiScale(gray, 1.1, 2, 0, (100, 100));  # 얼굴 검출
if faces.any() :
    x, y, w, h = faces[0]
    face_image = image[y:y+h, x:x+w]  # 얼굴 영역 영상 가져오기
    eyes = eye_cascade.detectMultiScale(face_image, 1.15, 7, 0, (25, 20))  # 눈 검출

    if len(eyes) == 2:
        face_center = (x + w//2, y + h//2)
        eye_centers  = [[x+ex+ew//2, y+ey+eh//2] for ex,ey,ew,eh in eyes]
        corr_image, corr_center = correct_image(image, face_center, eye_centers )  # 기울기 보정

        rois = detect_object(face_center, faces[0])  # 머리 및 입술영역 검출

        cv2.rectangle(corr_image, rois[0], (255, 0, 255), 2)
        cv2.rectangle(corr_image, rois[1], (255, 0, 255), 2)
        cv2.rectangle(corr_image, rois[2], (255, 0, 0), 2)
        cv2.circle(corr_image, tuple(corr_center[0]), 5, (0, 255, 0), 2)
        cv2.circle(corr_image, tuple(corr_center[1]), 5, (0, 255, 0), 2)
        cv2.circle(corr_image, face_center, 3, (0, 0, 255), 2)
        cv2.imshow("correct_image", corr_image)
    else:
        print("눈 미검출")
else:
    cv2.imshow("image", image)
cv2.waitKey(0)`,
    },
    {
      id: 'chap11-08-compare_hist',
      filename: '08.compare_hist.py',
      title: 'compare hist',
      code: `from haar_utils import *                   # 검출기 적재 및 전처리 함수
from haar_histogram import *                  # 히스토그램 비교 관련 함수

face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_alt2.xml")  # 정면 검출기
eye_cascade = cv2.CascadeClassifier("haarcascade_eye.xml")  # 눈 검출기
image, gray = preprocessing(34)  # 전처리
if image is None: raise Exception("영상 파일을 읽기 에러")

faces = face_cascade.detectMultiScale(gray, 1.1, 2, 0, (100, 100));  # 얼굴 검출
if faces.any():
    x, y, w, h = faces[0]
    face_image = image[y:y + h, x:x + w]  # 얼굴 영역 영상 가져오기
    eyes = eye_cascade.detectMultiScale(face_image, 1.15, 7, 0, (25, 20))  # 눈 검출

    if len(eyes) == 2:
        face_center = (x + w // 2, y + h // 2)
        eye_centers = [(x + ex + ew // 2, y + ey + eh // 2) for ex, ey, ew, eh in eyes]
        corr_image, corr_center = correct_image(image, face_center, eye_centers)  # 기울기 보정

        rois = detect_object(face_center, faces[0])  # 머리 및 입술영역 검출
        masks = make_masks(rois, corr_image.shape[:2])  # 4개 마스크 생성
        sim = calc_histo(corr_image, rois, masks)  # 4개 히스토그램 생성

        print("입술-얼굴 유사도: %4.2f" % sim[0])
        print("윗-귀밑머리 유사도: %4.2f" % sim[1])
    else:
        print("눈 미검출")
else:
    print("얼굴 미검출")`,
    },
    {
      id: 'chap11-09-gender_classifier',
      filename: '09.gender_classifier.py',
      title: 'gender classifier',
      code: `import cv2
from haar_utils import preprocessing,correct_image, detect_object
from haar_classify import classify, display
from haar_histogram import make_masks, calc_histo

face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_alt2.xml")  # 정면 검출기
eye_cascade = cv2.CascadeClassifier("haarcascade_eye.xml")  # 눈 검출기

no, max_no, cnt = 0, 60, 1
while True:
    no = no + cnt
    image, gray = preprocessing(no)                             # 전처리 수행
    if image is None:
        print("%02d.jpg: 영상 파일 없음" % no)
        if no < 0 : no = max_no
        elif no >= max_no: no = 0
        continue

    faces = face_cascade.detectMultiScale(gray, 1.1, 2, 0, (100, 100))
    if faces.any():
        x, y, w, h = faces[0]
        face_image = image[y:y+h, x:x+w]  # 얼굴 영역 영상 가져오기
        eyes = eye_cascade.detectMultiScale(face_image, 1.15, 7, 0, (25, 20))

        if len(eyes) == 2:
            face_center = (x + w // 2, y + h // 2)
            eye_centers = [(x + ex + ew // 2, y + ey + eh // 2) for ex, ey, ew, eh in eyes]
            corr_image, corr_centers = correct_image(image, face_center, eye_centers)  # 기울기 보정

            sub_roi = detect_object(face_center, faces[0])      # 머리 및 입술영역 검출
            masks = make_masks(sub_roi, corr_image.shape[:2])      # 4개 마스크 생성
            sims = calc_histo(corr_image, sub_roi, masks)	    # 4개 히스토그램 생성

            classify(corr_image, sims, no)                        # 성별 분류 및 표시
            display(corr_image, face_center, corr_centers, sub_roi) # 얼굴, 눈 표시
        else: print("%02d.jpg: 눈 미검출" % no)
    else: print("%02d.jpg: 얼굴 미검출" % no)

    key = cv2.waitKeyEx(0)                          # 키 이벤트 대기
    if key == 2490368: cnt =  1                # 윗쪽 화살표 키이면 다음 영상
    elif key == 2621440: cnt = -1                  # 아래쪽 화살표 키이면 이전 영상
    elif key == 32 or key == 27: break              # 프로그램 종료 조건`,
    },
  ],

  'chap12': [
    {
      id: 'chap12-01-find_coins',
      filename: '01.find_coins.py',
      title: 'find coins',
      code: `from coin_preprocess import *

image, th_img = preprocessing(70)                           # 전처리 수행
if image is None: raise Exception("영상 파일 읽기 에러")

circles = find_coins(th_img)                            # 객체(회전사각형) 검출
for center, radius in circles:
    cv2.circle(image, center, radius, (0, 255, 0), 2)   # 동전 영상 원으로 표시

cv2.imshow("preprocessed image", th_img)
cv2.imshow("coin image", image)
cv2.waitKey(0)`,
    },
    {
      id: 'chap12-02-draw_coin_histo',
      filename: '02.draw_coin_histo.py',
      title: 'draw coin histo',
      code: `from coin_preprocess import *
from coin_utils import *                            # 기타 함수
from Common.histogram import draw_histo_hue

coin_no = 15
image, th_img = preprocessing(coin_no)                            # 전처리 수행
circles = find_coins(th_img)                     # 객체(회전사각형) 검출
coin_imgs = make_coin_img(image, circles)                # 동전 영상 생성
coin_hists = [calc_histo_hue(coin) for coin in coin_imgs] # 영상 히스토그램

for i, img in enumerate(coin_imgs):
    h, w = 200, 256
    hist_img = draw_histo_hue(coin_hists[i], (h, w, 3))    # 색상 히스토그램 표시

    merge = np.zeros((h, w+h, 3), np.uint8)
    merge[:, :w] = hist_img
    merge[:, w:] = cv2.resize(img, (h, h))
    cv2.imshow("hist&coin-" + str(i), merge)

cv2.waitKey(0)
`,
    },
    {
      id: 'chap12-02-draw_coin_histo2',
      filename: '02.draw_coin_histo2.py',
      title: 'draw coin histo2',
      code: `from Common.histogram import draw_histo_hue
from coin_preprocess import *
from coin_utils import *                            # 기타 함수

def onMouse(event, x, y, flags, param):
    global pre_img, hist_roi
    if event == cv2.EVENT_LBUTTONDOWN:          # 왼쪽 버튼 누르기
        for i, ((cx, cy), radius) in enumerate(circles):    # 메뉴아이콘 사각형 조회
            dx, dy = (cx - x), (cy - y)
            dist = np.sqrt(dx**2 + dy**2)     # 동전 중점좌표와 클릭좌표간 거리

            if dist < radius:
                hist_img = draw_histo_hue(coin_hists[i], (80, 128, 3))
                h, w = hist_img.shape[:2]
                hist_roi = [x, y, w, h]
                pre_img =  image[y:y + h, x:x + w].copy()
                image[y:y+h, x:x+w] = hist_img
                cv2.imshow("image", image)

    if event == cv2.EVENT_LBUTTONUP:            # 왼쪽 버튼 떼기
        x, y, w, h =  hist_roi
        image[y:y+h, x:x+w] = pre_img
        cv2.imshow("image", image)

coin_no = 15
image, th_img = preprocessing(coin_no)                            # 전처리 수행
circles = find_coins(th_img)                    # 객체 검출

coin_imgs = make_coin_img(image, circles)                # 동전 영상 생성
coin_hists = [calc_histo_hue(coin) for coin in coin_imgs] # 각 동전영상 히스토그램

for center, radius in circles:
    cv2.circle(image, center, radius, (0, 255, 0), 2)

cv2.imshow("image", image)
cv2.setMouseCallback("image", onMouse)
cv2.waitKey(0)`,
    },
    {
      id: 'chap12-02-draw_coin_histo3',
      filename: '02.draw_coin_histo3.py',
      title: 'draw coin histo3',
      code: `from coin_preprocess import *
from coin_utils import *                            # 기타 함수
from Common.histogram import draw_histo_hue
import matplotlib.pyplot as plt

no, max_no = 50, 100

while True:
    gray, image = preprocessing(no)                             # 전처리 수행
    if image is None:
        print("{0:02d}.jpg: 영상 파일이 없습니다.".format(no))
        if no < 0 : no: no = max_no
        no = no + 1
        if no >= max_no: no = 0
        continue

    image, th_img = preprocessing(no)                            # 전처리 수행
    circles = find_coins(th_img)                     # 객체(회전사각형) 검출
    coin_imgs = make_coin_img(image, circles)                # 동전 영상 생성
    coin_hists = [calc_histo_hue(coin) for coin in coin_imgs] # 영상 히스토그램

    merge = np.zeros((200, 456, 3), np.uint8)
    n = int(np.ceil(len(coin_imgs)/4))
    merges = cv2.repeat(merge, n, 4)
    for i, img in enumerate(coin_imgs):
        hist_img = draw_histo_hue(coin_hists[i], (200, 256, 3))    # 색상 히스토그램 표시
        h, w = hist_img.shape[:2]
        merge[:, :w] = hist_img
        merge[:, w:] = cv2.resize(img, (h, h))
        x, y = i%4 , i//4
        y, x = np.multiply( (y, x), merge.shape[:2])
        merges[y:y+h, x:x+w+200] = merge

    cv2.imshow("hist- "+ str(no) ,merges)
    cv2.moveWindow("hist- "+ str(no), -2000,400)

    key = cv2.waitKeyEx(0)  # 키 이벤트 대기
    cv2.destroyAllWindows()
    if key == 2621440:
        no = no + 1  # 아래쪽 화살표 키이면 다음 영상
    elif key == 2490368:
        no = no - 1  # 윗쪽 화살표 키이면 이전 영상
    elif key == 32 or key == 27:
        break  # 프로그램 종료 조건`,
    },
    {
      id: 'chap12-03-calc_coins',
      filename: '03.calc_coins.py',
      title: 'calc coins',
      code: `from coin_preprocess import *
from coin_utils import *                            # 기타 함수
from Common.utils import put_string

coin_no = int(input("동전 영상 번호: "))
image, th_img = preprocessing(coin_no)                              # 전처리 수행
circles = find_coins(th_img)                     # 객체(회전사각형) 검출
coin_imgs = make_coin_img(image, circles)                  # 동전 영상 생성
coin_hists= [calc_histo_hue(coin) for coin in coin_imgs]   # 동전 영상 히스토그램

groups = grouping(coin_hists)                              # 동전 영상 그룹 분리
ncoins = classify_coins(circles, groups)                   # 동전 인식

coin_value = np.array([10, 50, 100, 500])                             # 동전 금액
for i in range(4):
    print("%3d원: %3d개" % (coin_value[i], ncoins[i]))

total = sum(coin_value * ncoins )           # 동전금액* 동전별 개수
str = "Total coin: {:,} Won".format(total)            # 계산된 금액 문자열
print(str)                                                 # 콘솔창에 출력
put_string(image, str, (650, 50), '', (0,230,0))

## 동전 객체에 정보(반지름, 금액) 표시
color = [(0, 0, 250), (255, 255, 0), (0, 250, 0), (250, 0, 255)]  # 동전별 색상
for i, (c, r) in enumerate(circles):
    cv2.circle(image, c, r, color[groups[i]], 2)
    put_string(image, i, (c[0] - 15, c[1] - 10), '', color[2])  # 검출 순번과 동전 반지 표시
    put_string(image, r, (c[0], c[1] + 15), '', color[3])

cv2.imshow("result image", image)
key = cv2.waitKey(0)  # 키 이벤트 대기
`,
    },
    {
      id: 'chap12-04-train_plate_data',
      filename: '04.train_plate_data.py',
      title: 'train plate data',
      code: `import numpy as np, cv2

def SVM_create(type, max_iter, epsilon):
    svm = cv2.ml.SVM_create()                           # SVM 객체 선언
    # SVM 파라미터 지정
    svm.setType(cv2.ml.SVM_C_SVC)             # C-Support Vector Classification
    svm.setKernel(cv2.ml.SVM_LINEAR)                    # 선형 SVM
    svm.setGamma(1)                                     # 커널 함수의 감마 값
    svm.setC(1)                                         # 최적화를 위한 C 파라미터
    svm.setTermCriteria((type, max_iter, epsilon))      # 학습 반복 조건 지정
    return svm

nsample = 140
trainData = [cv2.imread("images/plate/%03d.png" %i, 0) for i in range(nsample)]
trainData = np.reshape( trainData, (nsample, -1)).astype("float32")
labels = np.zeros((nsample,1), np.int32)
labels[:70] = 1

print("SVM 객체 생성")
svm = SVM_create(cv2.TERM_CRITERIA_MAX_ITER, 1000, 1e-6)   # SVM 객체 생성
svm.train(trainData, cv2.ml.ROW_SAMPLE, labels)             # 학습 수행
svm.save("SVMtrain.xml")                             # 학습된 데이터 저장
print("SVM 객체 저장 완료")
`,
    },
    {
      id: 'chap12-05-find_plates',
      filename: '05.find_plates.py',
      title: 'find plates',
      code: `from plate_preprocess import *               # 전처리 및 후보 영역 검출 함수

car_no = int(input("자동차 영상 번호 (0~15): "))
image, morph = preprocessing(car_no)                               # 전처리 - 이진화
if image is None: Exception("영상 읽기 에러")

candidates = find_candidates(morph)                        # 번호판 후보 영역 검색
for candidate in candidates:                                      # 후보 영역 표시
    pts = np.int32(cv2.boxPoints(candidate))
    cv2.polylines(image, [pts], True, (0, 225,255), 2)
    print(candidate)

if not candidates:
    print("번호판 후보 영역 미검출")
cv2.imshow("image", image)
cv2.waitKey(0)`,
    },
    {
      id: 'chap12-06-correct_plate',
      filename: '06.correct_plate.py',
      title: 'correct plate',
      code: `from plate_preprocess import *        # 전처리 및 후보 영역 검출 함수
from plate_candidate import *         # 후보 영역 개선 및 후보 영상 생성 함수

car_no = 0
image, morph = preprocessing(car_no)  # 전처리 - 이진화
candidates = find_candidates(morph)  # 번호판 후보 영역 검색

fills = [color_candidate_img(image, size) for size, _, _ in candidates]
new_candis = [find_candidates(fill) for fill in fills]
new_candis = [cand[0] for cand in new_candis if cand]
candidate_imgs = [rotate_plate(image, cand) for cand in new_candis]

for i, img in enumerate(candidate_imgs):
    cv2.imshow("candidate_img - " + str(i), img)
    cv2.polylines(image, [np.int32(cv2.boxPoints(new_candis[i]))], True, (0, 255, 0), 2)

cv2.imshow("image", image)
cv2.waitKey()  # 키 이벤트 대기`,
    },
    {
      id: 'chap12-07-classify_plates',
      filename: '07.classify_plates.py',
      title: 'classify plates',
      code: `from plate_preprocess import *        # 전처리 및 후보 영역 검출 함수
from plate_candidate import *         # 후보 영역 개선 및 후보 영상 생성 함수

car_no = int(input("자동차 영상 번호 (0~15): "))
image, morph = preprocessing(car_no)                               # 전처리
candidates = find_candidates(morph)                        # 번호판 후보 영역 검색

fills = [color_candidate_img(image, size) for size, _, _ in candidates]
new_candis = [find_candidates(fill) for fill in fills]
new_candis = [cand[0] for cand in new_candis if cand]
candidate_imgs = [rotate_plate(image, cand) for cand in new_candis]

svm = cv2.ml.SVM_load("SVMTrain.xml")                  # 학습된 데이터 적재
rows = np.reshape(candidate_imgs, (len(candidate_imgs), -1))    # 1행 데이터들로 변환
_, results = svm.predict(rows.astype("float32"))                # 분류 수행
correct = np.where(results == 1)[0]        # 1인 값의 위치 찾기

print('분류 결과:\\n', results)
print('번호판 영상 인덱스:', correct )

for i, idx in enumerate(correct):
    cv2.imshow("plate_" +str(i), candidate_imgs[idx])
    cv2.resizeWindow("plate image_" + str(i), (250,28))

for i, candi in enumerate(new_candis):
    color = (0, 255, 0) if i in correct else (0, 0, 255)
    cv2.polylines(image, [np.int32(cv2.boxPoints(candi))], True, color, 2)

print("번호판 검출완료") if len(correct)>0 else print("번호판 미검출")

cv2.imshow("image", image)
cv2.waitKey(0)`,
    },
    {
      id: 'chap12-08-classify_number',
      filename: '08.classify_number.py',
      title: 'classify number',
      code: `from plate_preprocess import *        # 전처리 및 후보 영역 검출 함수
from plate_candidate import *
from plate_classify import *  # k-NN 학습 및 분류

car_no = int(input("자동차 영상 번호 (0~20): "))
image, morph = preprocessing(car_no)                                    # 전처리
candidates = find_candidates(morph)                            # 후보 영역 검색

fills = [color_candidate_img(image, size) for size, _, _ in candidates]
new_candis = [find_candidates(fill) for fill in fills]
new_candis = [cand[0] for cand in new_candis if cand]
candidate_imgs = [rotate_plate(image, cand) for cand in new_candis]

svm = cv2.ml.SVM_load("SVMTrain.xml")                  # 학습된 데이터 적재
rows = np.reshape(candidate_imgs, (len(candidate_imgs), -1))    # 1행 데이터들로 변환
_, results = svm.predict(rows.astype("float32"))                # 분류 수행
result = np.where(results == 1)[0]        # 1인 값의 위치 찾기

plate_no = result[0] if len(result)>0 else -1

K1, K2 = 10, 10
nknn = kNN_train("images/train_numbers.png", K1, 10, 20) # 숫자 학습
tknn = kNN_train("images/train_texts.png", K2, 40, 20)   # 문자 학습

if plate_no >= 0:
    plate_img = preprocessing_plate(candidate_imgs[plate_no])   # 번호판 영상 전처리
    cells_roi = find_objects(cv2.bitwise_not(plate_img))
    cells = [plate_img[y:y+h, x:x+w] for x,y,w,h in cells_roi]

    classify_numbers(cells, nknn, tknn, K1, K2, cells_roi)      # 숫자 객체 분류

    pts = np.int32(cv2.boxPoints(new_candis[plate_no]))
    cv2.polylines(image, [pts], True,  (0, 255, 0), 2)

    color_plate = cv2.cvtColor(plate_img, cv2.COLOR_GRAY2BGR)  # 컬러 번호판 영상
    for x,y, w, h in cells_roi:
        cv2.rectangle(color_plate, (x,y), (x+w,y+h), (0, 0, 255), 1)        # 번호판에 사각형 그리기

    h,w  = color_plate.shape[:2]
    image[0:h, 0:w] = color_plate
else:
    print("번호판 미검출")

cv2.imshow("image", image)
cv2.waitKey(0)`,
    },
  ],
};

export function getChapExamples(chapId) {
  return chapExamples[chapId] || [];
}
