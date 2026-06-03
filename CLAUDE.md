model: claude-sonnet-4-6

# AiEdu 프로젝트

React + Vite + Tailwind 기반 AI 직업훈련 교육 플랫폼.
배포: docs.yi.or.kr:3012 (외부), 192.168.10.14:3012 (내부망)

## 커리큘럼 구성 (4개)

| 커리큘럼 | 데이터 파일 | 페이지 |
|----------|------------|--------|
| ML 머신러닝 | src/data/curriculum.js | CurriculumPage.jsx |
| OpenCV 영상처리 | src/data/curriculum_opencv.js | OpenCVCurriculumPage.jsx |
| Claude Code | src/data/curriculum_claude.js | ClaudeCurriculumPage.jsx |
| LLM 심화 | src/data/curriculum_llm.js | LlmCurriculumPage.jsx |

## 라우팅 구조

- `/` — HomePage
- `/curriculum` — ML 커리큘럼
- `/curriculum-cv` — OpenCV 커리큘럼
- `/curriculum-claude` — Claude Code 커리큘럼
- `/curriculum-llm` — LLM 심화 커리큘럼
- `/lesson/:lessonId` — 개별 레슨 (LessonPage.jsx)
- `/quiz/:quizId` — 퀴즈 (QuizPage.jsx)
- `/chat` — AI 챗봇 실습 (ChatPage.jsx)
- `/playground` — 코드 플레이그라운드
- `/tools` — 외부 도구 모음

## 주요 파일 크기 (읽기 전 확인)

- `src/data/chapExamples_opencv.js` — **4,978줄** (OpenCV 교재 공개 예제, 수정 불필요)
- `src/data/curriculum_claude.js` — 2,206줄
- `src/data/codeExamples_opencv.js` — 1,932줄
- `src/data/codeExamples.js` — 1,376줄
- `src/data/curriculum_llm.js` — 1,284줄
- `src/data/curriculum.js` — 1,241줄
- `src/components/Diagram/Chap06Diagram.jsx` — 864줄
- `src/components/Diagram/Chap05Diagram.jsx` — 809줄

## 다이어그램 시스템

`DiagramRenderer.jsx` — 다이어그램 타입 키 → 컴포넌트 매핑 허브.
새 다이어그램 추가 시 여기에 등록 필요.

**prefix 규칙:**
- `cv-` — OpenCV 다이어그램 (Chap05~12Diagram 등)
- `ml-` — ML 다이어그램
- `llm-` — LLM 다이어그램
- `claude-` — Claude Code 다이어그램

## 코드 예제 구조

- `codeExamples.js` — ML 커리큘럼 실습 코드
- `codeExamples_opencv.js` — OpenCV 커리큘럼 실습 코드 (키: `cv-ch02-src` 형식)
- `chapExamples_opencv.js` — 교재 챕터별 원본 .py 파일 목록 (키: `chap02`, `chap03` 형식)

## 진도 관리

`src/hooks/useProgress.js` — localStorage 기반 레슨/퀴즈 완료 상태 관리

## 배포 명령

```bash
bash sync.sh           # 내부망 + 외부 모두 동기화 + Docker 재배포
bash sync.sh local     # 192.168.10.14만
bash sync.sh remote    # docs.yi.or.kr:10022만
```

## 저작권

`chapExamples_opencv.js` 소스: "OpenCV-Python 영상처리 프로그래밍", 황선규 저, 성안당.
출판사 상품 페이지에서 공개 배포된 예제. LessonPage.jsx에 출처 표기됨.
