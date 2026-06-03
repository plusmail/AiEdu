// 클로드 코드 마스터 & MoAI-ADK 커리큘럼
// 출처: "클로드 코드 마스터" 교재 목차 기반

export const claudeModules = [

  // ════════════════════════════════════
  // PART 1 — 클로드 코드 마스터
  // ════════════════════════════════════

  {
    id: 'cc1', partId: 1,
    title: "CH 01 — 클로드 코드 시작하기",
    description: "에이전틱 코딩의 개념을 이해하고 클로드 코드를 설치·설정하며 CLI 기초를 익힙니다.",
    icon: "🤖", color: "blue", estimatedTime: "90분",
    difficulty: 2,
    lessons: [
      {
        id: "cc1-1", title: "1-1 클로드 코드와 에이전틱 코딩",
        duration: "25분", difficulty: 2,
        diagramType: "agentic-loop",
        content: `
<h2>앤트로픽과 에이전틱 AI의 부상</h2>
<p>클로드 코드(Claude Code)는 앤트로픽이 개발한 <strong>에이전틱 코딩 도구</strong>입니다. 단순한 코드 자동완성이 아닌, 자율적으로 문제를 분석하고 실행하며 결과를 검증하는 AI 에이전트입니다.</p>

<div class="highlight-box">
<strong>에이전틱 코딩이란?</strong>
AI가 스스로 계획을 세우고 → 도구를 사용하고 → 결과를 확인하고 → 수정하는 자율적 코딩 방식
단순 자동완성(GitHub Copilot)과 달리 완전한 작업 단위를 자율 처리
</div>

<h3>에이전틱 루프: 클로드 코드의 동작 원리</h3>
<div class="example-box">
① 사용자 요청 수신
② 컨텍스트 분석 (파일, 코드, 환경)
③ 계획 수립 (어떤 도구를 어떤 순서로 사용할지)
④ 도구 실행 (파일 읽기/쓰기, 터미널, 검색 등)
⑤ 결과 확인 → 필요 시 ②로 돌아가 반복
⑥ 최종 결과 반환
</div>

<h3>컨텍스트 윈도우와 20만 토큰</h3>
<div class="highlight-box">
<strong>20만 토큰 컨텍스트 = 약 15만 단어 = 300~500페이지 분량</strong>
대용량 코드베이스 전체를 한 번에 이해 가능
대화 이력 + 파일 내용 + 도구 결과가 모두 컨텍스트에 축적
</div>

<h3>컨텍스트 윈도우 관리 전략</h3>
<div class="example-box">
• /compact: 대화 압축으로 컨텍스트 확보
• CLAUDE.md: 프로젝트 규칙을 파일로 외재화
• 세션 분리: 독립적 작업은 별도 세션으로 처리
• 선택적 로딩: 필요한 파일만 참조
</div>`,
        keyPoints: ["에이전틱 코딩 = AI가 자율적으로 계획·실행·검증", "에이전틱 루프: 분석→계획→실행→확인 반복", "20만 토큰 컨텍스트 = 대용량 코드베이스 처리 가능"],
      },
      {
        id: "cc1-2", title: "1-2 클로드 코드 설치 및 인증",
        duration: "15분", difficulty: 1,
        diagramType: "context-window",
        content: `
<h2>운영체제별 설치 방법</h2>
<div class="example-box">
<strong># Node.js 18+ 필요</strong>
npm install -g @anthropic-ai/claude-code

<strong># 버전 확인</strong>
claude --version

<strong># 업데이트</strong>
npm update -g @anthropic-ai/claude-code
</div>

<h3>인증 설정</h3>
<div class="highlight-box">
<strong>방법 1: API 키 (개인 사용자)</strong>
export ANTHROPIC_API_KEY="sk-ant-..."
claude  # 최초 실행 시 자동 인증

<strong>방법 2: Claude.ai 구독 (Pro/Team)</strong>
claude  # 브라우저 OAuth 인증 자동 진행
</div>

<h3>버전 관리와 업데이트 전략</h3>
<div class="example-box">
• 팀 환경: package.json에 버전 고정 권장
• 개인 환경: 자동 업데이트 활성화
• 기업 환경: 검증된 버전 사용 후 점진적 업그레이드
</div>`,
        keyPoints: ["npm install -g @anthropic-ai/claude-code로 설치", "API 키 또는 Claude.ai 구독으로 인증", "팀 환경에서는 버전 고정 권장"],
      },
      {
        id: "cc1-3", title: "1-3 클로드 코드 CLI 기초",
        duration: "20분", difficulty: 2,
        diagramType: "cli-modes",
        content: `
<h2>대화형 모드와 비대화형 모드</h2>
<div class="example-box">
<strong># 대화형 모드 (기본)</strong>
claude                    # 인터랙티브 세션 시작

<strong># 비대화형 모드 (자동화용)</strong>
claude -p "테스트 코드 작성해줘" --output-format json
cat todo.txt | claude -p "할 일 분류해줘"
</div>

<h3>주요 실행 플래그</h3>
<div class="highlight-box">
-p / --print          비대화형, 응답 출력 후 종료
--output-format       json | text | stream-json
--model               사용할 Claude 모델 지정
--max-tokens          최대 출력 토큰 수
--no-cache            프롬프트 캐시 비활성화
--dangerously-skip-permissions  권한 확인 건너뜀 (CI용)
</div>

<h3>체크포인트와 되감기 시스템</h3>
<div class="example-box">
/rewind         이전 체크포인트로 되돌아가기
/checkpoint     현재 상태를 체크포인트로 저장
• 실험적 변경 후 복구 가능
• Git과 병행 사용 시 더욱 강력
</div>`,
        keyPoints: ["claude -p '...'로 비대화형 실행 가능", "파이프(|)로 다른 명령어와 연결", "/rewind로 이전 체크포인트 복구"],
      },
      {
        id: "cc1-4", title: "1-4 프로젝트로 특징 이해하기",
        duration: "25분", difficulty: 2,
        diagramType: "project-context",
        content: `
<h2>프로젝트 컨텍스트의 이해</h2>
<p>클로드 코드는 실행 디렉토리의 파일 구조, Git 이력, CLAUDE.md 등을 자동으로 파악해 프로젝트를 이해합니다.</p>

<div class="highlight-box">
<strong>클로드 코드가 자동 파악하는 것:</strong>
• 디렉토리 구조와 파일 목록
• Git 브랜치, 최근 커밋, 변경 사항
• CLAUDE.md (프로젝트 규칙·문서)
• package.json, requirements.txt 등 설정 파일
</div>

<h3>깃 통합</h3>
<div class="example-box">
# 클로드 코드 안에서 바로 커밋
"변경사항 커밋해줘"
→ 클로드가 git add, git commit -m "..." 자동 실행

# PR 생성도 가능
"현재 변경사항으로 PR 만들어줘"
→ gh pr create 자동 실행
</div>

<h3>효과적인 작업 관리</h3>
<div class="example-box">
• CLAUDE.md에 프로젝트 규칙 명시
• 복잡한 작업은 단계별로 지시
• 중간 결과 확인 후 다음 단계 진행
• /clear로 컨텍스트 초기화 후 새 작업 시작
</div>`,
        keyPoints: ["Git 이력과 파일 구조를 자동으로 파악", "CLAUDE.md로 프로젝트 규칙 상시 적용", "커밋·PR 생성까지 자동화 가능"],
      },
    ],
    quizId: "quiz-cc01",
  },

  {
    id: 'cc2', partId: 1,
    title: "CH 02 — 워크플로와 설정",
    description: "탐색-계획-구현-커밋 워크플로를 익히고 settings.json, 권한, 모델 설정을 마스터합니다.",
    icon: "⚙️", color: "purple", estimatedTime: "80분",
    difficulty: 3,
    lessons: [
      {
        id: "cc2-1", title: "2-1 기본 작업 방식",
        duration: "25분", difficulty: 2,
        diagramType: "explore-plan-code-commit",
        content: `
<h2>탐색-계획-구현-커밋 워크플로</h2>
<p>클로드 코드의 핵심 작업 방식입니다. 각 단계를 명확히 이해하고 활용하면 품질 높은 결과를 얻을 수 있습니다.</p>

<div class="highlight-box">
<strong>① 탐색 (Explore)</strong>
"이 코드베이스 구조를 먼저 파악해줘"
→ 파일 읽기, 의존성 분석, 패턴 파악

<strong>② 계획 (Plan)</strong>
"구현 전에 어떻게 할지 계획만 알려줘"
→ 변경 범위, 순서, 잠재적 위험 파악

<strong>③ 구현 (Code)</strong>
"계획대로 구현해줘"
→ 코드 작성, 테스트, 수정 반복

<strong>④ 커밋 (Commit)</strong>
"변경사항 정리해서 커밋해줘"
→ 의미 있는 단위로 커밋, PR 생성
</div>

<h3>파이프와 클로드</h3>
<div class="example-box">
# 로그 분석
cat error.log | claude -p "에러 패턴 분석해줘"

# 코드 리뷰
git diff | claude -p "변경사항 리뷰해줘"

# 테스트 결과 분석
npm test 2>&1 | claude -p "실패 원인 찾아줘"
</div>`,
        keyPoints: ["탐색→계획→구현→커밋 4단계 워크플로", "계획 단계 분리로 의도치 않은 변경 방지", "파이프로 다른 도구와 강력하게 연동"],
      },
      {
        id: "cc2-2", title: "2-2 설정 관리",
        duration: "20분", difficulty: 3,
        diagramType: "settings-priority",
        content: `
<h2>settings.json 설정과 우선순위</h2>
<div class="highlight-box">
<strong>우선순위 (높음 → 낮음):</strong>
① 프로젝트 로컬: .claude/settings.local.json
② 프로젝트 공유: .claude/settings.json
③ 사용자 전역: ~/.claude/settings.json
</div>

<h3>기본 설정 옵션</h3>
<div class="example-box">
{
  "model": "claude-opus-4-5",
  "permissions": {
    "allow": ["Bash(git:*)", "Read", "Write"],
    "deny": ["Bash(rm -rf *)"]
  },
  "env": {
    "NODE_ENV": "development"
  },
  "hooks": { ... }
}
</div>

<h3>민감한 파일 보호</h3>
<div class="example-box">
# .claude/settings.json
{
  "permissions": {
    "deny": [
      "Read(.env)",
      "Read(**/.env.*)",
      "Write(**/*.pem)"
    ]
  }
}
</div>

<h3>다섯 가지 확장 도구 비교</h3>
<div class="example-box">
Bash    — 터미널 명령 실행 (가장 강력, 위험)
Read    — 파일 읽기
Write   — 파일 쓰기/수정
Agent   — 서브에이전트 실행
MCP     — 외부 MCP 서버 연결
</div>`,
        keyPoints: ["settings.json 3단계 우선순위 체계", "deny로 민감한 파일 접근 차단", "Bash > Write > Read 순서로 권한 강도"],
      },
      {
        id: "cc2-3", title: "2-3 IAM 권한 관리",
        duration: "20분", difficulty: 3,
        diagramType: "settings-priority",
        content: `
<h2>파일 및 명령 권한 설정</h2>
<div class="example-box">
<strong># 허용 패턴</strong>
"Bash(npm:*)"        npm 명령만 허용
"Bash(git:*)"        git 명령만 허용
"Read(**/*.ts)"      .ts 파일만 읽기 허용
"Write(src/**)"      src 디렉토리만 쓰기 허용

<strong># 거부 패턴</strong>
"Bash(rm:*)"         rm 명령 전체 거부
"Bash(sudo:*)"       sudo 명령 거부
"Read(.env*)"        .env 파일 읽기 거부
</div>

<h3>안전한 실행 환경 구축</h3>
<div class="highlight-box">
CI/CD 환경에서는:
• --dangerously-skip-permissions 플래그로 자동 승인
• 단, 도커 컨테이너 등 격리된 환경에서만 사용
• 로컬 개발에서는 권한 확인 프롬프트 유지 권장
</div>`,
        keyPoints: ["Bash(패턴) 으로 명령어별 허용/거부 설정", "프로덕션 파일 보호는 deny 목록으로", "CI/CD에서는 격리 환경 + skip-permissions 조합"],
      },
      {
        id: "cc2-4", title: "2-4 모델 구성과 API 최적화",
        duration: "15분", difficulty: 3,
        diagramType: "model-selection",
        content: `
<h2>모델 별칭 시스템</h2>
<div class="example-box">
claude-opus-4-5        최고 성능 (복잡한 작업)
claude-sonnet-4-6      균형 (일반 개발)
claude-haiku-4-5       빠른 응답 (단순 작업)

<strong># 별칭으로도 접근 가능</strong>
claude-opus     → 최신 Opus
claude-sonnet   → 최신 Sonnet
claude-haiku    → 최신 Haiku
</div>

<h3>프롬프트 캐싱 최적화</h3>
<div class="highlight-box">
<strong>프롬프트 캐싱이란?</strong>
동일한 컨텍스트(CLAUDE.md, 긴 파일 등)를 반복 전송할 때
앤트로픽 서버에 캐시 → 비용 90% 절감, 속도 향상

캐시 유효 시간: 5분
자동 활성화 (별도 설정 불필요)
</div>

<h3>모델 선택 전략</h3>
<div class="example-box">
• 아키텍처 설계, 복잡한 버그 → Opus
• 일반 기능 개발, 코드 리뷰 → Sonnet (기본값)
• 단순 포맷팅, 빠른 Q&A → Haiku
• 비용 최적화: Sonnet으로 작업 후 Opus로 검토
</div>`,
        keyPoints: ["Opus(성능) → Sonnet(균형) → Haiku(속도) 선택", "프롬프트 캐싱으로 비용 90% 절감 자동 적용", "작업 복잡도에 따라 모델 전략적 선택"],
      },
    ],
    quizId: "quiz-cc02",
  },

  {
    id: 'cc3', partId: 1,
    title: "CH 03 — 에이전트 스킬",
    description: "재사용 가능한 스킬을 만들고 관리하는 방법을 배웁니다. SKILL.md 구조와 동적 로딩 패턴을 익힙니다.",
    icon: "🎯", color: "green", estimatedTime: "75분",
    difficulty: 3,
    lessons: [
      {
        id: "cc3-1", title: "3-1 스킬의 개념과 구조",
        duration: "20분", difficulty: 3,
        diagramType: "skill-structure",
        content: `
<h2>스킬이란?</h2>
<p><strong>스킬(Skill)</strong>은 클로드가 특정 작업을 수행하는 방법을 기술한 Markdown 파일입니다. 재사용 가능한 전문 지식을 캡슐화합니다.</p>

<div class="highlight-box">
<strong>컨텍스트 윈도우는 공용 자산이다</strong>
모든 스킬, 에이전트, 대화는 같은 컨텍스트 윈도우를 공유
→ 스킬을 너무 많이 로드하면 컨텍스트 낭비
→ 필요한 스킬만 선택적으로 로드 (점진적 공개)
</div>

<h3>SKILL.md 파일 구조</h3>
<div class="example-box">
---
name: code-review
description: 코드 리뷰를 수행하는 스킬
tools: [Read, Bash]
triggers:
  - "리뷰해줘"
  - "code review"
---

# 코드 리뷰 스킬

## 수행 절차
1. 변경된 파일 목록 파악
2. 각 파일별 품질 검토
3. 개선 사항 우선순위 정리
4. 리뷰 결과 보고서 작성
</div>

<h3>세 단계 점진적 작동 방식</h3>
<div class="example-box">
① 트리거 감지: 사용자 입력에서 키워드 매칭
② 스킬 로드: 해당 SKILL.md를 컨텍스트에 추가
③ 스킬 실행: 정의된 절차에 따라 작업 수행
</div>`,
        keyPoints: ["스킬 = 재사용 가능한 작업 절차 Markdown 파일", "트리거 키워드로 자동 로드 (점진적 공개)", "도구 접근 권한을 스킬별로 제한 가능"],
      },
      {
        id: "cc3-2", title: "3-2 스킬 사용과 개발",
        duration: "25분", difficulty: 3,
        diagramType: "skill-dev",
        content: `
<h2>커스텀 스킬 개발</h2>
<div class="example-box">
<strong># 스킬 파일 위치</strong>
.claude/skills/          프로젝트 스킬
~/.claude/skills/        사용자 전역 스킬

<strong># 기본 스킬 템플릿</strong>
---
name: test-runner
description: 테스트 실행 및 결과 분석
tools: [Bash, Read]
triggers: ["테스트", "test", "검증"]
---

테스트를 실행하고 결과를 분석합니다:
1. npm test 실행
2. 실패한 테스트 원인 분석
3. 수정 방안 제시
</div>

<h3>스킬에서 환각 방지 지침 작성</h3>
<div class="highlight-box">
<strong>환각 방지 핵심 원칙:</strong>
• "모르면 모른다고 말하라" 명시
• 확인 가능한 사실만 주장하도록 지시
• 불확실한 경우 파일을 직접 읽어 확인하도록
• 추측이 필요한 경우 "추측:" 접두어 사용
</div>

<h3>스킬 목록 확인</h3>
<div class="example-box">
/skills           사용 가능한 스킬 목록 표시
/skills list      상세 목록
/skills info 이름  특정 스킬 정보
</div>`,
        keyPoints: [".claude/skills/에 SKILL.md 파일 생성", "환각 방지 지침을 스킬에 명시적으로 포함", "/skills 명령으로 스킬 목록 확인"],
      },
      {
        id: "cc3-3", title: "3-3 스킬 고급 사용과 최적화",
        duration: "25분", difficulty: 4,
        diagramType: "skill-structure",
        content: `
<h2>동적 스킬 로딩 패턴</h2>
<div class="example-box">
<strong># 조건부 스킬 로딩</strong>
---
triggers:
  keywords: ["배포", "deploy"]
  conditions:
    - file_exists: "Dockerfile"
    - branch: "main"
---

<strong># 스킬 조합 예시</strong>
"보안 리뷰 후 배포해줘"
→ security-review 스킬 + deploy 스킬 순차 실행
</div>

<h3>context:fork 메커니즘</h3>
<div class="highlight-box">
<strong>격리 실행이란?</strong>
스킬 실행 시 컨텍스트를 포크(fork) → 독립 실행
→ 스킬 내 대화가 메인 컨텍스트에 영향 없음
→ 비용 절약 + 컨텍스트 오염 방지

설정 방법:
---
context: fork
---
</div>

<h3>스킬 버전 관리</h3>
<div class="example-box">
<strong># Git으로 스킬 버전 관리</strong>
.claude/skills/v1/code-review.md
.claude/skills/v2/code-review.md

<strong># 스킬 문서화 유의 사항</strong>
• 변경 이력 기록
• 테스트 케이스 포함
• 의존하는 도구 명시
• 예상 실행 시간 기재
</div>`,
        keyPoints: ["context:fork로 스킬 격리 실행 → 컨텍스트 오염 방지", "스킬 조합으로 복잡한 작업 파이프라인 구성", "Git으로 스킬 버전 관리 → 팀 협업"],
      },
    ],
    quizId: "quiz-cc03",
  },

  {
    id: 'cc4', partId: 1,
    title: "CH 04 — 서브에이전트",
    description: "오케스트레이터-워커 패턴으로 복잡한 작업을 병렬 처리하는 서브에이전트 시스템을 마스터합니다.",
    icon: "🔄", color: "orange", estimatedTime: "100분",
    difficulty: 4,
    lessons: [
      {
        id: "cc4-1", title: "4-1 서브에이전트의 개념과 아키텍처",
        duration: "25분", difficulty: 4,
        diagramType: "orchestrator-worker",
        content: `
<h2>에이전트 위임 패턴: 오케스트레이터-워커</h2>
<p>복잡한 작업을 여러 전문화된 에이전트에게 분배하는 패턴입니다.</p>

<div class="highlight-box">
<strong>오케스트레이터 (Orchestrator)</strong>
전체 작업을 이해하고 → 하위 작업으로 분해 → 각 워커에게 위임 → 결과 통합

<strong>워커 (Worker)</strong>
특정 분야에 특화 → 독립적으로 실행 → 결과 반환
예: 테스트-워커, 문서화-워커, 보안검사-워커
</div>

<h3>단일 책임 원칙과 서브에이전트</h3>
<div class="example-box">
하나의 에이전트 = 하나의 명확한 책임
✅ 좋은 예: "Python 파일만 리뷰하는 에이전트"
❌ 나쁜 예: "모든 파일 리뷰하고 테스트하고 배포하는 에이전트"
</div>

<h3>에이전트 체인과 병렬 실행</h3>
<div class="example-box">
<strong>순차 체인 (Sequential)</strong>
분석 → 계획 → 구현 → 테스트 → 배포

<strong>병렬 실행 (Parallel)</strong>
프론트엔드 구현 ↗
                  → 통합 테스트
백엔드 구현   ↗
</div>

<h3>언제 서브에이전트를 사용하는가</h3>
<div class="example-box">
✅ 독립적인 하위 작업이 3개 이상
✅ 작업이 서로 다른 도구/권한 필요
✅ 병렬 처리로 시간 단축 가능
✅ 각 작업이 전문 지식 요구
❌ 단순한 선형 작업 (오버엔지니어링)
</div>`,
        keyPoints: ["오케스트레이터가 전체 조율, 워커가 전문 실행", "단일 책임 원칙: 에이전트 하나 = 책임 하나", "병렬 실행으로 복잡한 작업 시간 대폭 단축"],
      },
      {
        id: "cc4-2", title: "4-2 서브에이전트 사용하기",
        duration: "20분", difficulty: 4,
        diagramType: "orchestrator-worker",
        content: `
<h2>에이전트 호출 문법</h2>
<div class="example-box">
<strong># CLAUDE.md 또는 스킬에서</strong>
Use Agent tool to spawn a sub-agent:
- agent: code-reviewer
- task: "src/ 디렉토리 Python 파일 리뷰"
- tools: [Read, Bash]

<strong># 결과 통합</strong>
에이전트 결과를 수집하고 → 요약 보고서 작성
</div>

<h3>사용 가능한 서브에이전트 목록</h3>
<div class="highlight-box">
/agents               사용 가능한 에이전트 목록
/agents list          상세 목록
Claude Code 내장 에이전트:
• general-purpose     범용 작업
• code-reviewer       코드 리뷰 전문
• explore             파일 탐색 전용 (읽기 전용)
• test-runner         테스트 실행
</div>

<h3>작업 재개 기능 활용</h3>
<div class="example-box">
<strong># 에이전트 작업이 중단됐을 때</strong>
claude --resume [세션ID]

<strong># 에러 처리 패턴</strong>
에이전트 실패 시:
1. 에러 로그 수집
2. 원인 분석
3. 수정 후 재시도
4. 최대 3회 재시도 후 사람에게 보고
</div>`,
        keyPoints: ["Agent 도구로 서브에이전트 생성·위임", "/agents로 사용 가능한 에이전트 목록 확인", "--resume으로 중단된 에이전트 작업 재개"],
      },
      {
        id: "cc4-3", title: "4-3 커스텀 서브에이전트 개발",
        duration: "25분", difficulty: 4,
        diagramType: "custom-agent",
        content: `
<h2>서브에이전트 정의 파일 구조</h2>
<div class="example-box">
<strong>.claude/agents/security-checker.md</strong>

---
name: security-checker
description: 보안 취약점 검사 전문 에이전트
tools: [Read, Bash]
model: claude-opus-4-5
---

# 보안 검사 에이전트

당신은 보안 전문가입니다.

## 검사 범위
- SQL Injection 취약점
- XSS 취약점
- 하드코딩된 비밀키
- 취약한 의존성 패키지

## 출력 형식
각 취약점을 심각도(Critical/High/Medium/Low)와
함께 보고하세요.
</div>

<h3>YAML 프론트매터 완전 가이드</h3>
<div class="highlight-box">
name          에이전트 고유 식별자 (필수)
description   기능 설명 (필수, 에이전트 선택에 사용)
tools         허용된 도구 목록
model         사용할 Claude 모델 (기본: sonnet)
max_tokens    최대 출력 토큰
context       fork | inherit
</div>

<h3>스킬 주입 예제</h3>
<div class="example-box">
<strong># 에이전트에 스킬 주입</strong>
---
name: full-stack-dev
skills:
  - code-review
  - test-runner
  - git-workflow
---
</div>`,
        keyPoints: [".claude/agents/에 Markdown 파일로 에이전트 정의", "프론트매터로 도구·모델·컨텍스트 설정", "스킬 주입으로 에이전트 역량 확장"],
      },
      {
        id: "cc4-4", title: "4-4 에이전트 팀",
        duration: "20분", difficulty: 5,
        diagramType: "agent-team",
        content: `
<h2>에이전트 팀의 핵심 개념</h2>
<p>여러 에이전트가 <strong>동시에</strong> 작업하며 메시지를 주고받는 고급 패턴입니다.</p>

<div class="highlight-box">
<strong>에이전트 팀 vs 서브에이전트 차이</strong>
서브에이전트: 오케스트레이터가 순차/병렬 위임
에이전트 팀: 팀원들이 자율적으로 소통하며 협업
</div>

<h3>팀 생성과 생애 주기</h3>
<div class="example-box">
<strong># 팀 생성</strong>
/team create dev-team
  → frontend-agent, backend-agent, qa-agent 추가

<strong># 팀 메시지</strong>
/team message "로그인 기능 구현 시작"

<strong># 팀 해산</strong>
/team disband
</div>

<h3>파일 소유권 전략</h3>
<div class="example-box">
에이전트 충돌 방지 → 파일 단위 소유권 분리
frontend-agent: src/components/**, src/pages/**
backend-agent:  src/api/**, src/models/**
qa-agent:       tests/**, __tests__/**
</div>

<h3>태스크 조정 시스템</h3>
<div class="example-box">
의존 관계 관리:
backend API 완성 → frontend-agent에 알림
→ frontend가 API 연동 시작
</div>`,
        keyPoints: ["에이전트 팀 = 자율 소통하는 다중 에이전트 협업", "파일 소유권 분리로 충돌 방지", "의존 관계 자동 조정으로 순서 보장"],
      },
      {
        id: "cc4-5", title: "4-5 CLI 기반 동적 에이전트 활용",
        duration: "15분", difficulty: 4,
        diagramType: "orchestrator-worker",
        content: `
<h2>--agent 플래그: 기존 에이전트 직접 실행</h2>
<div class="example-box">
<strong># 에이전트를 CLI에서 직접 지정</strong>
claude --agent security-checker -p "src/ 보안 취약점 검사"

<strong># 비대화형 모드 + 에이전트 조합</strong>
claude --agent code-reviewer \
  -p "PR #42 리뷰해줘" \
  --output-format json
</div>

<h3>에이전트 해석 과정</h3>
<div class="highlight-box">
<strong>--agent 플래그 처리 순서:</strong>
① .claude/agents/[이름].md 검색 (프로젝트)
② ~/.claude/agents/[이름].md 검색 (사용자)
③ 내장 에이전트 목록 검색
④ 없으면 오류

<strong>에이전트 이름 매칭:</strong>
--agent security-checker
→ security-checker.md 또는 security_checker.md
</div>

<h3>CLI 에이전트와 에이전트 팀의 관계</h3>
<div class="example-box">
<strong>단독 실행 (--agent)</strong>
하나의 에이전트를 즉시 실행
→ 빠른 단일 작업에 적합

<strong>팀 활성화 (/team)</strong>
여러 에이전트가 지속적으로 협업
→ 복잡한 장기 프로젝트에 적합

<strong>조합 활용</strong>
/team create review-team
claude --agent security-checker  ← 팀과 독립적으로 실행 가능
</div>`,
        keyPoints: ["--agent 플래그로 CLI에서 에이전트 직접 지정", "프로젝트→사용자→내장 순서로 에이전트 검색", "--agent는 빠른 단일 작업, /team은 장기 협업에 적합"],
      },
    ],
    quizId: "quiz-cc04",
  },

  {
    id: 'cc5', partId: 1,
    title: "CH 05 — 출력 인터페이스",
    description: "출력 스타일 커스터마이징, 상태 표시줄, 대화형 모드 고급 기능을 배웁니다.",
    icon: "🖥️", color: "cyan", estimatedTime: "60분",
    difficulty: 2,
    lessons: [
      {
        id: "cc5-1", title: "5-1 출력 스타일 커스터마이징",
        diagramType: "output-style",
        duration: "20분", difficulty: 2,
        content: `
<h2>출력 스타일의 핵심 개념</h2>
<div class="example-box">
<strong># 내장 출력 스타일</strong>
default        표준 Markdown 형식
minimal        최소한의 포맷 (파이프 친화적)
json           JSON 구조화 출력
stream-json    스트리밍 JSON

<strong># 출력 스타일 변경</strong>
claude --output-format json -p "..."
또는 settings.json에서 기본값 설정
</div>

<h3>커스텀 출력 스타일 생성</h3>
<div class="highlight-box">
.claude/output-styles/my-style.md 파일 생성:
---
name: korean-dev
description: 한국어 개발자용 출력 스타일
---

모든 응답은 한국어로 작성합니다.
코드는 반드시 주석을 포함합니다.
에러 메시지는 원인과 해결책을 함께 제시합니다.
</div>`,
        keyPoints: ["--output-format json으로 구조화 출력", "커스텀 스타일로 응답 형식 통일", "팀 표준 스타일로 일관성 확보"],
      },
      {
        id: "cc5-2", title: "5-2 상태 표시줄과 대화형 모드",
        diagramType: "cli-modes",
        duration: "20분", difficulty: 2,
        content: `
<h2>상태 표시줄 설정</h2>
<div class="example-box">
<strong># settings.json</strong>
{
  "statusline": "/path/to/statusline.sh"
}

<strong># Bash 상태 표시줄 예시</strong>
#!/bin/bash
# Git 브랜치와 Claude 모델 표시
BRANCH=$(git branch --show-current 2>/dev/null)
echo "🤖 claude | 📁 \${BRANCH:-no-git} | $(date +%H:%M)"
</div>

<h3>대화형 모드 고급 제어</h3>
<div class="highlight-box">
<strong>핵심 단축키</strong>
Ctrl+C          현재 응답 중단
Ctrl+L          화면 지우기
Ctrl+R          이전 명령어 검색
Esc Esc         다중 행 입력 모드
↑↓              이전/다음 명령어 이력
/clear          컨텍스트 초기화
/compact        컨텍스트 압축
/help           도움말
</div>`,
        keyPoints: ["상태 표시줄 스크립트로 현재 상태 시각화", "Esc Esc로 멀티라인 입력 모드 진입", "/compact로 컨텍스트 절약"],
      },
    ],
    quizId: "quiz-cc05",
  },

  {
    id: 'cc6', partId: 1,
    title: "CH 06 — 메모리와 세션 관리",
    description: "4계층 메모리 시스템과 체크포인팅을 활용해 장기 프로젝트를 효율적으로 관리합니다.",
    icon: "🧠", color: "indigo",estimatedTime: "70분",
    difficulty: 3,
    lessons: [
      {
        id: "cc6-1", title: "6-1 메모리 시스템 이해하기",
        duration: "25분", difficulty: 3,
        diagramType: "claude-memory-layers",
        content: `
<h2>네 가지 계층적 메모리</h2>
<div class="highlight-box">
<strong>① 컨텍스트 윈도우 (휘발성)</strong>
현재 대화 내용 / 최대 20만 토큰 / 세션 종료 시 소멸

<strong>② CLAUDE.md (비휘발성)</strong>
프로젝트 규칙·문서 / Git에 저장 / 매 세션 자동 로드

<strong>③ 파일 시스템 (영구)</strong>
코드·문서·설정 / 도구로 직접 읽고 씀

<strong>④ 외부 메모리 (MCP)</strong>
데이터베이스·API / MCP 서버로 연결
</div>

<h3>CLAUDE.md 가져오기와 조건부 로딩</h3>
<div class="example-box">
<strong># CLAUDE.md 기본 구조</strong>
# 프로젝트 규칙

## 코딩 컨벤션
- TypeScript strict mode 사용
- 함수는 화살표 함수 선호

## 금지 사항
- console.log 프로덕션 코드에 포함 금지

## @import 로 다른 파일 포함
@import ./rules/security.md
@import ./rules/testing.md
</div>

<h3>모듈형 룰 시스템</h3>
<div class="example-box">
.claude/
  rules/
    coding-style.md
    security.md
    git-workflow.md
  CLAUDE.md  ← 위 파일들을 @import로 포함
</div>`,
        keyPoints: ["컨텍스트(휘발) + CLAUDE.md(영구) + 파일시스템 + MCP", "CLAUDE.md @import로 모듈형 규칙 관리", "매 세션마다 CLAUDE.md 자동 로드"],
      },
      {
        id: "cc6-2", title: "6-2 체크포인팅과 세션 관리",
        duration: "25분", difficulty: 3,
        diagramType: "checkpoint",
        content: `
<h2>체크포인팅과 복구 시스템</h2>
<div class="example-box">
<strong>/rewind 사용법</strong>
/rewind           → 체크포인트 목록 표시
/rewind [번호]    → 해당 시점으로 복구
/rewind last      → 바로 이전 체크포인트

<strong>체크포인트 자동 생성 시점</strong>
• 파일 변경 전
• 중요한 명령 실행 전
• 사용자 요청 시
</div>

<h3>세션 관리 전략</h3>
<div class="highlight-box">
<strong>컨텍스트 최적화 순서</strong>
① /compact      현재 대화 압축 (권장)
② /clear        컨텍스트 완전 초기화
③ 새 세션      완전히 새로운 시작

<strong>장기 프로젝트 전략</strong>
• 작업 단위별 세션 분리
• 중요 결정은 CLAUDE.md에 기록
• 세션 간 컨텍스트 전달은 파일로
</div>

<h3>체크포인팅과 깃 통합</h3>
<div class="example-box">
실험적 변경 전:
1. git stash 또는 feature 브랜치 생성
2. /checkpoint 저장
3. 실험 진행
4. 만족 시: git commit
   불만족 시: /rewind + git checkout
</div>`,
        keyPoints: ["/rewind로 이전 체크포인트로 즉시 복구", "/compact로 컨텍스트 절약 후 세션 연장", "Git과 체크포인팅 병행으로 안전한 실험"],
      },
    ],
    quizId: "quiz-cc06",
  },

  {
    id: 'cc7', partId: 1,
    title: "CH 07 — 자동화",
    description: "훅 시스템, MCP 통합, 플러그인으로 클로드 코드를 강력한 자동화 플랫폼으로 확장합니다.",
    icon: "⚡", color: "red", estimatedTime: "90분",
    difficulty: 4,
    lessons: [
      {
        id: "cc7-1", title: "7-1 비대화형 모드와 스크립트 자동화",
        duration: "20분", difficulty: 3,
        diagramType: "noninteractive",
        content: `
<h2>CI/CD에서 클로드 코드 활용</h2>
<div class="example-box">
<strong># GitHub Actions 예시</strong>
- name: AI 코드 리뷰
  run: |
    git diff origin/main...HEAD > changes.diff
    cat changes.diff | claude -p "보안 취약점 검사해줘" \
      --output-format json \
      --dangerously-skip-permissions

<strong># 자동화 고려사항</strong>
• 멱등성: 같은 입력 → 같은 출력
• 타임아웃 설정 필수
• 에러 코드 처리 (0=성공, 1=실패)
</div>`,
        keyPoints: ["--dangerously-skip-permissions는 격리 환경에서만", "파이프로 CI/CD 파이프라인에 통합", "JSON 출력으로 자동화 처리 용이"],
      },
      {
        id: "cc7-2", title: "7-2 훅 시스템",
        duration: "30분", difficulty: 4,
        diagramType: "hook-system",
        content: `
<h2>훅 이벤트</h2>
<div class="example-box">
<strong>주요 훅 이벤트:</strong>
PreToolUse      도구 실행 전 (차단 가능)
PostToolUse     도구 실행 후
Stop            응답 생성 완료 후
Notification    알림 발생 시

<strong>종료 코드 의미:</strong>
0   성공 (계속 진행)
1   소프트 차단 (경고, 계속 진행)
2   하드 차단 (즉시 중단)
</div>

<h3>훅 구성 예시</h3>
<div class="highlight-box">
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "bash ~/.claude/hooks/security-check.sh"
        }]
      }
    ],
    "Stop": [{
      "type": "command",
      "command": "notify-send '클로드 완료'"
    }]
  }
}
</div>

<h3>실용적인 훅 예제</h3>
<div class="example-box">
• rm -rf 명령 차단
• 프로덕션 DB 접근 감지·차단
• 작업 완료 시 Slack 알림
• 매 파일 변경마다 자동 포맷
• Git 커밋 전 린트 검사
</div>`,
        keyPoints: ["PreToolUse 훅으로 위험 명령 차단 가능", "종료 코드 2로 즉시 중단, 1로 경고만", "Stop 훅으로 작업 완료 알림 자동화"],
      },
      {
        id: "cc7-3", title: "7-3 MCP 통합과 플러그인",
        duration: "25분", difficulty: 4,
        diagramType: "mcp-integration",
        content: `
<h2>MCP(Model Context Protocol) 통합</h2>
<div class="example-box">
<strong># .mcp.json 설정</strong>
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "$GITHUB_TOKEN" }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "$DATABASE_URL" }
    }
  }
}
</div>

<h3>주요 MCP 서버 활용 사례</h3>
<div class="highlight-box">
GitHub MCP      → PR, 이슈, 코드 직접 조작
Postgres MCP    → DB 쿼리 직접 실행
Filesystem MCP  → 외부 서버 파일 접근
Slack MCP       → 메시지 전송·검색
Puppeteer MCP   → 웹 브라우저 자동화
</div>

<h3>플러그인 설치</h3>
<div class="example-box">
<strong># 마켓플레이스에서 설치</strong>
claude plugin install @anthropic/claude-dev-tools

<strong># 로컬 플러그인 개발</strong>
.claude/plugins/
  my-plugin/
    plugin.json   ← 메타데이터
    index.js      ← 진입점
</div>`,
        keyPoints: [".mcp.json으로 외부 서비스와 연결", "GitHub·DB·Slack 등 MCP로 직접 조작", "플러그인으로 클로드 코드 기능 영구 확장"],
      },
    ],
    quizId: "quiz-cc07",
  },

  // ════════════════════════════════════
  // PART 2 — MoAI-ADK와 실전 에이전틱 코딩
  // ════════════════════════════════════

  {
    id: 'cc8', partId: 2,
    title: "CH 08 — 클로드 코드와 MoAI-ADK",
    description: "하네스 엔지니어링 개념을 이해하고 MoAI-ADK를 설치·설정합니다. TRUST-5 품질 프레임워크를 적용합니다.",
    icon: "🏗️", color: "purple", estimatedTime: "100분",
    difficulty: 4,
    lessons: [
      {
        id: "cc8-1", title: "8-1 하네스 엔지니어링과 MoAI-ADK",
        duration: "25분", difficulty: 4,
        diagramType: "moai-architecture",
        content: `
<h2>에이전트 하네스란?</h2>
<p><strong>하네스(Harness)</strong>는 AI 에이전트가 실행되는 구조적 프레임워크입니다. 말의 마구처럼 에이전트의 능력을 안전하게 제어·활용합니다.</p>

<div class="highlight-box">
<strong>MoAI-ADK (Mixture of Agents Intelligence - Agent Development Kit)</strong>
여러 AI 에이전트를 조합해 복잡한 소프트웨어를 자율 개발하는 프레임워크
TDD + DDD + 품질 게이트를 자동화
</div>

<h3>하네스 엔지니어링이 해결하는 문제</h3>
<div class="example-box">
❌ 기존 문제점:
• AI가 품질 기준 없이 코드 생성
• 테스트 없는 구현
• 비일관적인 아키텍처

✅ MoAI-ADK 해결책:
• SPEC → TDD → DDD 체계적 개발
• 자동화된 품질 게이트
• 에이전트 간 표준화된 협업
</div>

<h3>MoAI-ADK 실행 엔진</h3>
<div class="example-box">
Loop Engine: 자율 품질 루프
① SPEC 작성 → ② 테스트 작성 → ③ 구현
→ ④ 품질 검사 → 실패 시 ③으로 반복
→ ⑤ 통과 시 다음 SPEC
</div>`,
        keyPoints: ["하네스 = AI 에이전트의 구조적 실행 프레임워크", "MoAI-ADK = SPEC→TDD→DDD 자동화 키트", "Loop Engine이 품질 통과까지 자율 반복"],
      },
      {
        id: "cc8-2", title: "8-2~8-3 설치와 아키텍처",
        duration: "25분", difficulty: 4,
        diagramType: "moai-architecture",
        content: `
<h2>설치와 초기 설정</h2>
<div class="example-box">
<strong># MoAI-ADK 설치</strong>
npm install -g @moai/adk

<strong># 프로젝트 초기화</strong>
cd my-project
moai init

<strong># 환경 진단</strong>
moai diagnose
</div>

<h3>4계층 아키텍처</h3>
<div class="highlight-box">
<strong>계층 1: 인터페이스</strong>
슬래시 명령어, CLI, 플러그인

<strong>계층 2: 오케스트레이션</strong>
Manager 에이전트 그룹 (계획·조정)

<strong>계층 3: 실행</strong>
Expert + Builder 에이전트 그룹

<strong>계층 4: 인프라</strong>
도구, MCP 서버, 파일 시스템
</div>

<h3>MoAI의 지침, CLAUDE.md</h3>
<div class="example-box">
moai init 실행 시 자동 생성:
• CLAUDE.md     프로젝트 규칙
• SPEC/         명세서 디렉토리
• .moai/        MoAI 설정 파일들
</div>`,
        keyPoints: ["moai init으로 프로젝트 초기화 + CLAUDE.md 자동 생성", "4계층: 인터페이스→오케스트레이션→실행→인프라", "Manager·Expert·Builder 에이전트 그룹 체계"],
      },
      {
        id: "cc8-3", title: "8-4~8-5 개발 방법론과 TRUST-5",
        duration: "25분", difficulty: 5,
        diagramType: "trust5-framework",
        content: `
<h2>SPEC과 EARS 형식</h2>
<div class="example-box">
<strong>EARS (Easy Approach to Requirements Syntax)</strong>
When [조건], the [시스템]이 [동작]해야 한다.
If [상황]이면, the [시스템]은 [대응]해야 한다.

<strong>예시:</strong>
When 사용자가 로그인 버튼을 클릭하면,
the 시스템은 이메일과 패스워드를 검증해야 한다.
</div>

<h3>TRUST-5 품질 프레임워크</h3>
<div class="highlight-box">
<strong>T</strong> — Tested        테스트 커버리지 80% 이상
<strong>R</strong> — Reviewed      코드 리뷰 완료
<strong>U</strong> — Understood    코드 이해 가능성
<strong>S</strong> — Secured       보안 취약점 없음
<strong>T</strong> — Typed         타입 안전성 확보

모든 항목을 통과해야 배포 가능
</div>

<h3>LSP 품질 게이트</h3>
<div class="example-box">
Language Server Protocol 활용:
• 타입 에러 자동 감지
• 린트 규칙 위반 즉시 차단
• 코드 스타일 자동 교정
• TRUST-5 달성 여부 자동 판단
</div>`,
        keyPoints: ["EARS 형식으로 명확한 요구사항 명세", "TRUST-5: 테스트·리뷰·이해성·보안·타입 5가지 품질 기준", "LSP 게이트가 자동으로 품질 통과 여부 판단"],
      },
      {
        id: "cc8-4", title: "8-6 에이전트 생태계",
        duration: "25분", difficulty: 4,
        diagramType: "agent-team",
        content: `
<h2>Manager 에이전트 그룹</h2>
<div class="highlight-box">
<strong>오케스트레이터 (Orchestrator)</strong>
전체 프로젝트 조율·분배
→ SPEC 분석, 에이전트 선택, 결과 통합

<strong>플래너 (Planner)</strong>
요구사항 → SPEC 변환
→ EARS 형식 명세서 생성, 마일스톤 분해

<strong>리뷰어 (Reviewer)</strong>
완성된 코드 품질 검증
→ TRUST-5 최종 확인
</div>

<h2>Expert 에이전트 그룹</h2>
<div class="example-box">
frontend-agent    React/Vue/HTML 구현 전문
backend-agent     API/DB/서버 로직 전문
security-agent    보안 취약점 검사 전문
performance-agent 성능 최적화 전문
docs-agent        문서화 전문

공통 특징:
• 단일 책임 원칙 적용
• 특화된 도구 권한만 보유
• 독립적 실행 가능
</div>

<h2>Builder 에이전트 그룹</h2>
<div class="example-box">
builder-agent     커스텀 에이전트 생성
builder-skill     커스텀 스킬 생성
scaffolder        프로젝트 뼈대 자동 생성
migrator          코드베이스 마이그레이션
</div>

<h3>에이전트 선택 의사결정 트리</h3>
<div class="highlight-box">
작업 유형 파악
  ├── 전체 조율 필요? → Orchestrator
  ├── 요구사항 정리? → Planner
  ├── UI 구현?       → frontend-agent
  ├── API 개발?      → backend-agent
  ├── 보안 검사?     → security-agent
  └── 에이전트 생성? → builder-agent
</div>

<h3>에이전트 정의 파일 구조</h3>
<div class="example-box">
.moai/
  agents/
    manager/
      orchestrator.md
      planner.md
    expert/
      frontend.md
      backend.md
      security.md
    builder/
      builder-agent.md
      builder-skill.md
</div>`,
        keyPoints: ["Manager·Expert·Builder 3개 그룹으로 역할 분리", "각 에이전트는 단일 책임 원칙으로 특화", "작업 유형에 따라 적절한 에이전트 그룹 선택"],
      },
    ],
    quizId: "quiz-cc08",
  },

  {
    id: 'cc9', partId: 2,
    title: "CH 09 — MoAI-ADK 워크플로",
    description: "plan-run-sync 핵심 워크플로를 실습하고 에이전트 팀, 빌더 에이전트, 깃 작업 트리까지 MoAI-ADK 전체를 마스터합니다.",
    icon: "🚀", color: "green", estimatedTime: "160분",
    difficulty: 5,
    lessons: [
      {
        id: "cc9-1", title: "9-1 plan-run-sync 핵심 워크플로",
        duration: "30분", difficulty: 5,
        diagramType: "plan-run-sync",
        content: `
<h2>/moai plan — 명세서 생성</h2>
<div class="example-box">
/moai plan "로그인 기능 구현"

→ SPEC/login.md 자동 생성:
  • 기능 요구사항 (EARS 형식)
  • 기술 명세
  • 테스트 시나리오
  • 구현 마일스톤
  • 파일 매핑
</div>

<h3>/moai run — TDD/DDD 구현</h3>
<div class="highlight-box">
/moai run SPEC/login.md

Loop Engine 자동 실행:
① 테스트 코드 작성 (Red)
② 구현 코드 작성 (Green)
③ 리팩토링 (Refactor)
④ TRUST-5 검사
⑤ 실패 시 ②로 반복, 통과 시 종료
</div>

<h3>/moai sync — 문서 동기화</h3>
<div class="example-box">
/moai sync

구현 완료 후:
• 코드 ↔ SPEC 일치 여부 확인
• 변경사항 자동 반영
• Git 커밋 메시지 자동 생성
• 프로젝트 문서 업데이트
</div>

<h3>/moai — 자율 자동화 모드</h3>
<div class="example-box">
/moai   ← plan → run → sync 전체 자동 실행
         인간 개입 최소화 모드
         완료 시 보고서 생성

<strong>단계 전환 조건:</strong>
plan → run:   SPEC 검토 승인 후
run  → sync:  TRUST-5 전 항목 통과 후
</div>`,
        keyPoints: ["/moai plan으로 SPEC 자동 생성", "/moai run으로 TDD 루프 자율 실행", "/moai sync로 코드-SPEC-문서 동기화"],
      },
      {
        id: "cc9-2", title: "9-2 서브에이전트 심층 활용",
        duration: "20분", difficulty: 5,
        diagramType: "orchestrator-worker",
        content: `
<h2>Agent 도구의 기본 사용법</h2>
<div class="example-box">
<strong># 단일 에이전트 호출</strong>
Use the Agent tool:
- subagent_type: "security-checker"
- prompt: "src/ 폴더 SQL Injection 취약점 검사"

<strong># 비동기 병렬 호출</strong>
Run these agents in parallel:
1. frontend-agent: UI 컴포넌트 구현
2. backend-agent:  REST API 구현
3. qa-agent:       테스트 케이스 작성
</div>

<h3>에이전트 호출 패턴</h3>
<div class="highlight-box">
<strong>패턴 1: 순차 체인</strong>
planner → implementer → reviewer
각 단계의 출력이 다음 단계의 입력

<strong>패턴 2: 팬아웃-팬인</strong>
오케스트레이터 → [A,B,C] 병렬 실행 → 통합

<strong>패턴 3: 재귀 에이전트</strong>
에이전트가 하위 에이전트를 생성
→ 필요 깊이만큼 재귀 분해
</div>

<h3>에이전트 간 통신과 컨텍스트 격리</h3>
<div class="example-box">
각 에이전트는 독립된 컨텍스트 윈도우 보유
→ 메인 컨텍스트 오염 없음

결과 전달 방식:
• 파일: 에이전트가 파일 작성 → 오케스트레이터가 읽기
• 반환값: Agent 도구 결과로 직접 수신
• 공유 상태: 지정된 상태 파일 사용
</div>

<h3>에이전트 재개</h3>
<div class="example-box">
<strong># 중단된 에이전트 작업 재개</strong>
Use SendMessage tool:
- to: "[에이전트 ID 또는 이름]"
- message: "계속해줘. 마지막으로 auth API까지 완료했어"

→ 에이전트가 이전 컨텍스트를 유지하며 재개
</div>`,
        keyPoints: ["Agent 도구로 동기/병렬 서브에이전트 실행", "팬아웃-팬인 패턴으로 복잡한 작업 병렬화", "파일·반환값·공유 상태로 에이전트 간 통신"],
      },
      {
        id: "cc9-3", title: "9-3 에이전트 팀 — 팀 기반 병렬 개발",
        duration: "20분", difficulty: 5,
        diagramType: "agent-team",
        content: `
<h2>에이전트 팀 활성화</h2>
<div class="example-box">
<strong># 팀 생성 및 구성</strong>
/team create feature-team
/team add frontend-agent backend-agent qa-agent security-agent

<strong># 팀 실행 모드</strong>
/team run --mode parallel     병렬 실행
/team run --mode sequential   순차 실행
/team run --mode mixed        혼합 실행
</div>

<h3>실행 모드와 팀 모드의 조합</h3>
<div class="highlight-box">
<strong>Mixed 모드 예시 (권장):</strong>
단계 1 (순차): planner → SPEC 작성
단계 2 (병렬): frontend + backend + qa 동시 구현
단계 3 (순차): reviewer → 통합 검토

각 단계 내에서 에이전트들이 독립적으로 실행
→ 의존성 보장 + 최대 병렬화
</div>

<h3>plan 단계 팀 워크플로</h3>
<div class="example-box">
오케스트레이터:  전체 SPEC 분석, 분배
frontend-agent: UI 컴포넌트 SPEC 담당
backend-agent:  API SPEC 담당
qa-agent:       테스트 시나리오 담당
→ 각자 작성 후 → 통합 검토
</div>

<h3>run 단계 팀 워크플로</h3>
<div class="example-box">
frontend-agent: React 컴포넌트 TDD 구현
backend-agent:  FastAPI 엔드포인트 TDD 구현
security-agent: 구현 중 보안 검사 (병렬)
qa-agent:       통합 테스트 케이스 작성

→ 각 에이전트 TRUST-5 통과 시 완료 신호
→ 오케스트레이터가 통합·확인
</div>`,
        keyPoints: ["팀 모드 = 여러 에이전트 자율 협업", "Mixed 모드로 의존성 보장 + 최대 병렬화", "plan·run 단계마다 팀 역할 자동 전환"],
      },
      {
        id: "cc9-4", title: "9-4 스킬 생태계와 점진적 공개",
        duration: "20분", difficulty: 4,
        diagramType: "skill-structure",
        content: `
<h2>스킬 분류 체계</h2>
<div class="example-box">
<strong>MoAI-ADK 스킬 4계층:</strong>
① Core Skills      내장 기본 스킬 (plan, run, sync 등)
② Domain Skills    분야 특화 스킬 (react, fastapi, aws 등)
③ Project Skills   프로젝트 전용 스킬 (.moai/skills/)
④ User Skills      개인 커스텀 스킬 (~/.moai/skills/)
</div>

<h3>YAML 프론트매터 스키마</h3>
<div class="highlight-box">
---
name: react-component
description: React 컴포넌트 생성 스킬
version: "2.1"
tools: [Read, Write, Bash]
triggers:
  keywords: ["컴포넌트", "component"]
  files: ["*.tsx", "*.jsx"]
context: fork
token_budget: 4000
---
</div>

<h3>점진적 공개와 토큰</h3>
<div class="example-box">
<strong>토큰 절약 원칙:</strong>
• 트리거 감지 전: 스킬 내용 미로드 (0 토큰)
• 트리거 감지 후: 해당 스킬만 로드
• context:fork: 메인 컨텍스트와 분리

<strong>token_budget 설정:</strong>
token_budget: 2000   가벼운 스킬
token_budget: 8000   무거운 분석 스킬
token_budget: 20000  복잡한 리팩토링
</div>

<h3>트리거 시스템: 자동 로딩의 방식</h3>
<div class="example-box">
<strong>키워드 트리거:</strong>
"React 컴포넌트 만들어줘" → react-component 스킬 로드

<strong>파일 트리거:</strong>
*.py 파일 편집 시 → python-style 스킬 자동 로드

<strong>슬래시 명령어 연동:</strong>
/react-component → 스킬 직접 호출
</div>`,
        keyPoints: ["4계층 스킬 분류로 재사용성 극대화", "context:fork + token_budget으로 컨텍스트 절약", "키워드·파일·슬래시 명령어 3가지 트리거 방식"],
      },
      {
        id: "cc9-5", title: "9-5 빌더 에이전트와 스킬 만들기",
        duration: "20분", difficulty: 5,
        diagramType: "custom-agent",
        content: `
<h2>builder-agent: 커스텀 에이전트 생성</h2>
<div class="example-box">
/builder-agent "GraphQL API 전문 에이전트 만들어줘"

자동 생성 파일:
.moai/agents/expert/graphql-agent.md

---
name: graphql-agent
description: GraphQL 스키마 설계 및 리졸버 구현 전문
tools: [Read, Write, Bash]
model: claude-sonnet-4-6
---

당신은 GraphQL 전문가입니다...
</div>

<h2>builder-skill: 커스텀 스킬 생성</h2>
<div class="example-box">
/builder-skill "PR 설명 자동 작성 스킬"

자동 생성:
.moai/skills/pr-description.md
</div>

<h3>도구 권한 설계 원칙</h3>
<div class="highlight-box">
<strong>최소 권한 원칙 (Principle of Least Privilege):</strong>
읽기 전용 작업 → [Read] 만
파일 생성 필요 → [Read, Write]
빌드/테스트 필요 → [Read, Write, Bash]
외부 API 필요 → [Read, Write, Bash, MCP]

<strong>Bash 권한 세분화:</strong>
"Bash(npm:*)"     npm만 허용
"Bash(git log:*)" git log만 허용
</div>

<h3>실전: 보안 검사 에이전트 만들기</h3>
<div class="example-box">
/builder-agent "OWASP Top10 보안 검사 에이전트"

생성된 에이전트 특징:
• SQL Injection, XSS, CSRF 체크
• 의존성 취약점 스캔 (npm audit)
• 하드코딩된 시크릿 감지
• 심각도별 리포트 (Critical/High/Medium/Low)
• TRUST-5 S(Secured) 항목 자동 판단
</div>`,
        keyPoints: ["/builder-agent로 전문 에이전트 자동 생성", "/builder-skill로 재사용 스킬 자동 생성", "최소 권한 원칙으로 안전한 에이전트 설계"],
      },
      {
        id: "cc9-6", title: "9-6 훅 시스템과 MCP 통합",
        duration: "15분", difficulty: 4,
        diagramType: "mcp-integration",
        content: `
<h2>MoAI-ADK의 훅 이벤트 체계</h2>
<div class="example-box">
<strong>MoAI 전용 훅 이벤트:</strong>
OnSpecCreated     SPEC 파일 생성 후
OnTestFailed      TDD 테스트 실패 시
OnTrustGatePassed TRUST-5 항목 통과 시
OnSyncComplete    /moai sync 완료 후
OnAgentComplete   에이전트 작업 완료 시

<strong>설정 방법 (.moai/settings.json):</strong>
{
  "hooks": {
    "OnSpecCreated": [{
      "type": "command",
      "command": "echo 'SPEC 생성됨' | slack-notify"
    }]
  }
}
</div>

<h3>MCP 통합</h3>
<div class="highlight-box">
<strong>MoAI-ADK와 MCP 연동:</strong>
.mcp.json에 서버 등록 → 에이전트가 자동 활용

활용 사례:
• GitHub MCP: 이슈→SPEC 자동 변환
• Jira MCP:   태스크 상태 자동 업데이트
• Slack MCP:  단계 전환 시 팀 알림
• DB MCP:     테스트 데이터 자동 생성
</div>

<h3>훅과 MCP의 시너지</h3>
<div class="example-box">
시나리오: 이슈 → 코드 → PR 완전 자동화

① GitHub MCP: 이슈 읽기
② OnSpecCreated 훅: Jira 태스크 생성
③ /moai run: TDD 구현
④ OnTrustGatePassed 훅: Slack 알림
⑤ OnSyncComplete 훅: GitHub PR 자동 생성
</div>`,
        keyPoints: ["MoAI 전용 훅으로 개발 파이프라인 자동화", "MCP로 GitHub·Jira·Slack 외부 도구 연동", "훅+MCP 시너지로 이슈→PR 완전 자동화"],
      },
      {
        id: "cc9-7", title: "9-7 깃 작업 트리: 병렬 SPEC 개발",
        duration: "20분", difficulty: 5,
        diagramType: "worktree-parallel",
        content: `
<h2>MoAI-ADK의 작업 트리 통합</h2>
<div class="highlight-box">
<strong>작업 트리(Git Worktree)란?</strong>
하나의 Git 리포지토리에서 여러 브랜치를 동시에 체크아웃
→ 각 에이전트가 독립된 작업 디렉토리에서 실행
→ 파일 충돌 완전 방지

<strong>MoAI와의 통합 장점:</strong>
에이전트 A: /workspace/feature-auth 디렉토리
에이전트 B: /workspace/feature-payment 디렉토리
→ 완전히 독립적으로 동시 개발 가능
</div>

<h3>작업 트리 하위 명령어</h3>
<div class="example-box">
moai worktree create feature/auth
moai worktree create feature/payment
moai worktree list
moai worktree remove feature/auth
moai worktree merge feature/auth    ← main에 머지
</div>

<h3>병렬 SPEC 개발 패턴</h3>
<div class="example-box">
<strong>main</strong>
  ├── feature/auth        ← 인증 에이전트 (독립 실행)
  ├── feature/payment     ← 결제 에이전트 (독립 실행)
  └── feature/dashboard   ← 대시보드 에이전트 (독립 실행)

완료 후:
1. 각 에이전트 TRUST-5 통과 확인
2. 오케스트레이터가 충돌 없이 순차 머지
3. /moai sync로 통합 문서 업데이트
</div>

<h3>작업 트리 복구와 정리</h3>
<div class="example-box">
<strong># 실패한 작업 트리 복구</strong>
moai worktree recover feature/auth

<strong># 완료된 작업 트리 정리</strong>
moai worktree prune   ← 완료된 브랜치 일괄 제거

<strong># 상태 확인</strong>
moai worktree status  ← 각 에이전트 진행 현황
</div>`,
        keyPoints: ["Git 작업 트리로 에이전트별 독립 작업 공간 제공", "파일 충돌 완전 방지 + 동시 병렬 개발", "omai worktree 명령어로 생성·머지·정리 자동화"],
      },
      {
        id: "cc9-8", title: "9-8 슬래시 명령어와 CLI 유틸리티",
        duration: "15분", difficulty: 3,
        diagramType: "moai-commands",
        content: `
<h2>슬래시 명령어 전체 목록</h2>
<div class="example-box">
<strong>핵심 워크플로:</strong>
/moai plan [설명]   SPEC 생성
/moai run [SPEC]    TDD 구현
/moai sync          문서 동기화
/moai              전체 자동 실행

<strong>프로젝트 관리:</strong>
/moai project [설명]  프로젝트 문서 생성
/moai fix [설명]      버그 수정
/moai loop            품질 루프 재실행

<strong>에이전트·스킬 관리:</strong>
/builder-agent [설명]  에이전트 생성
/builder-skill [설명]  스킬 생성
/team create [이름]    팀 생성
</div>

<h3>CLI 유틸리티 명령어</h3>
<div class="highlight-box">
moai init               프로젝트 초기화
moai diagnose           환경 진단
moai update             MoAI-ADK 업데이트
moai config             설정 편집기 실행
moai worktree [하위명령] 작업 트리 관리
moai report             품질 리포트 생성
</div>

<h3>moai statusline: 상태 표시줄 설정</h3>
<div class="example-box">
<strong># settings.json</strong>
{
  "statusline": "~/.moai/statusline.sh"
}

<strong># MoAI 전용 상태 표시줄 예시</strong>
#!/bin/bash
BRANCH=$(git branch --show-current 2>/dev/null)
SPEC_COUNT=$(ls SPEC/*.md 2>/dev/null | wc -l)
echo "🏗️ moai | 📋 SPECs:\${SPEC_COUNT} | 📁 \${BRANCH:-no-git}"
</div>`,
        keyPoints: ["/moai plan·run·sync·fix 4개 핵심 명령어", "moai CLI로 초기화·진단·리포트 관리", "상태 표시줄로 현재 SPEC·브랜치 상태 시각화"],
      },
    ],
    quizId: "quiz-cc09",
  },

  {
    id: 'cc10', partId: 2,
    title: "CH 10 — 실습: 스네이크 게임 만들기",
    description: "MoAI-ADK의 전체 워크플로를 실제 프로젝트에 적용합니다. 초기화→SPEC→TDD→sync까지 완전한 개발 사이클을 단계별로 경험합니다.",
    icon: "🐍", color: "orange", estimatedTime: "150분",
    difficulty: 4,
    lessons: [
      {
        id: "cc10-1", title: "STEP 1 — 초기화: 프로젝트 문서 생성",
        duration: "25분", difficulty: 3,
        diagramType: "project-context",
        content: `
<h2>01 게임 개발 준비</h2>
<div class="highlight-box">
<strong>이번 실습에서 만드는 것:</strong>
HTML5 Canvas 기반 모던 스네이크 게임
• 순수 JavaScript (프레임워크 없음)
• TDD 방식으로 로직 100% 검증
• TRUST-5 모든 항목 통과
</div>

<h2>02 moai init으로 프로젝트 시작</h2>
<div class="example-box">
mkdir snake-game && cd snake-game
git init
moai init

<strong>생성된 파일:</strong>
├── CLAUDE.md          개발 규칙·컨벤션
├── SPEC/              명세서 디렉토리
├── .moai/
│   ├── settings.json  MoAI 설정
│   └── agents/        에이전트 정의
└── .gitignore
</div>

<h2>03 moai project로 프로젝트 문서 생성</h2>
<div class="example-box">
/moai project "HTML5 Canvas 스네이크 게임"

<strong>자동 생성:</strong>
PROJECT.md       프로젝트 개요, 목표, 기술 스택
ARCHITECTURE.md  파일 구조, 컴포넌트 설계도
</div>

<h3>HTML5 Canvas와 게임 루프 패턴</h3>
<div class="example-box">
<strong>핵심 개념:</strong>
• requestAnimationFrame: 60fps 게임 루프
• Canvas 2D Context: 픽셀 그리기
• 게임 상태 기계: READY → PLAYING → GAME_OVER

<strong>파일 구조 미리보기:</strong>
snake-game/
  src/
    game.js      게임 상태 관리
    render.js    Canvas 렌더링
    input.js     키보드 입력
    snake.js     뱀 로직
    food.js      먹이 로직
  tests/
    game.test.js
    snake.test.js
  index.html
</div>`,
        keyPoints: ["moai init으로 프로젝트 구조 + CLAUDE.md 자동 생성", "/moai project로 PROJECT.md·ARCHITECTURE.md 생성", "requestAnimationFrame 기반 60fps 게임 루프 설계"],
      },
      {
        id: "cc10-2", title: "STEP 2 — plan: 스펙 문서로 게임 규칙 정의",
        duration: "25분", difficulty: 3,
        diagramType: "plan-run-sync",
        content: `
<h2>01 클로드에 게임 규칙 설명하기</h2>
<div class="example-box">
"스네이크 게임을 만들려고 해.
 뱀이 움직이며 먹이를 먹으면 길이가 늘어나고,
 벽이나 자신에 부딪히면 게임 오버야.
 SPEC 문서 만들어줘."
</div>

<h2>02 스펙 문서 생성</h2>
<div class="example-box">
/moai plan "스네이크 게임 전체 구현"

→ SPEC/snake-game.md 생성
</div>

<h3>03 구현 계획: 마일스톤과 파일 매핑</h3>
<div class="highlight-box">
<strong>SPEC에 포함된 마일스톤:</strong>
M1: Canvas 초기화 + 게임 루프 (30분)
M2: 뱀 이동 + 방향 전환 (45분)
M3: 먹이 생성 + 충돌 감지 (30분)
M4: 게임 오버 처리 (20분)
M5: 점수 시스템 + UI 완성 (35분)

<strong>파일 매핑:</strong>
M1 → src/game.js, src/render.js
M2 → src/snake.js, src/input.js
M3 → src/food.js
M4 → src/game.js (상태 전환)
M5 → index.html, src/render.js
</div>

<h3>04 수용 테스트 시나리오 (EARS 형식)</h3>
<div class="example-box">
When 방향키 ↑를 누르면, 뱀이 위로 이동한다.
When 반대 방향(↓)을 누르면, 방향이 무시된다.
When 뱀의 머리가 먹이 위치와 같으면, 길이가 1 증가한다.
When 뱀의 머리가 벽 좌표를 벗어나면, 게임이 종료된다.
When 뱀의 머리가 몸통 좌표와 겹치면, 게임이 종료된다.
When R키를 누르면, 게임이 초기화되어 재시작된다.
</div>

<h3>05 단일 SPEC과 모듈형 SPEC</h3>
<div class="example-box">
<strong>단일 SPEC (소규모 프로젝트):</strong>
SPEC/snake-game.md  ← 전체를 하나로

<strong>모듈형 SPEC (대규모 프로젝트):</strong>
SPEC/
  core/snake.md      뱀 로직
  core/collision.md  충돌 감지
  ui/renderer.md     화면 렌더링
  ui/score.md        점수 UI
</div>`,
        keyPoints: ["EARS 형식으로 모호함 없는 수용 테스트 작성", "마일스톤별 파일 매핑으로 명확한 구현 범위 정의", "프로젝트 규모에 따라 단일/모듈형 SPEC 선택"],
      },
      {
        id: "cc10-3", title: "STEP 3 — run: TDD 방식으로 게임 구현",
        duration: "60분", difficulty: 4,
        diagramType: "tdd-loop",
        content: `
<h2>01 클로드에 구현 요청하기</h2>
<div class="example-box">
/moai run SPEC/snake-game.md

→ Loop Engine 자동 시작
</div>

<h3>마일스톤 1: Canvas 초기화</h3>
<div class="example-box">
<strong>Red (테스트 먼저):</strong>
describe('Game', () => {
  it('캔버스 크기가 400x400이어야 함', () => {
    const game = new Game(400, 400);
    expect(game.width).toBe(400);
  });
});

<strong>Green (구현):</strong>
class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
  }
}
</div>

<h3>마일스톤 2~5 자동 반복</h3>
<div class="highlight-box">
Loop Engine이 M1 통과 후 M2~M5 자동 실행:

M2: 뱀 이동 테스트 작성 → Snake 클래스 구현
M3: 충돌 감지 테스트 → Food 클래스 + 충돌 로직
M4: 게임 오버 테스트 → 상태 전환 로직
M5: 점수 테스트 → Score 클래스 + UI 렌더링

각 마일스톤: TRUST-5 통과 후 다음으로 진행
</div>

<h2>02 전체 구현 결과 요약</h2>
<div class="example-box">
구현 완료:
✅ src/snake.js     뱀 이동·성장 로직
✅ src/food.js      랜덤 먹이 생성
✅ src/collision.js 벽·자기충돌 감지
✅ src/renderer.js  Canvas 렌더링
✅ src/game.js      게임 상태 기계
✅ tests/           44개 테스트 (커버리지 95%)

TRUST-5 결과:
T Tested    ✅ 95% 커버리지
R Reviewed  ✅ 자동 리뷰 완료
U Understood ✅ JSDoc 완비
S Secured   ✅ 취약점 없음
T Typed     ✅ JSDoc 타입 선언
</div>`,
        keyPoints: ["Red→Green→Refactor TDD 사이클로 안정적 구현", "Loop Engine이 마일스톤별 TRUST-5 자동 검증", "44개 테스트로 95% 커버리지 달성"],
      },
      {
        id: "cc10-4", title: "STEP 4 — sync: 문서화와 완료",
        duration: "25분", difficulty: 3,
        diagramType: "sync-flow",
        content: `
<h2>/moai sync 실행</h2>
<div class="example-box">
/moai sync
</div>

<h3>Phase 1: 분석 및 계획 수립</h3>
<div class="example-box">
구현된 코드 분석:
• 파일 5개, 총 387줄
• SPEC 요구사항 6/6 충족
• 테스트 44개, 전체 통과
</div>

<h3>Phase 2: 문서 동기화</h3>
<div class="example-box">
자동 생성/업데이트:
README.md         ← 설치·실행 방법 자동 작성
ARCHITECTURE.md   ← 실제 구현 구조로 업데이트
API.md            ← 클래스·메서드 문서 자동 생성
CHANGELOG.md      ← 변경 이력 자동 기록
</div>

<h3>Phase 3: 깃 커밋 생성</h3>
<div class="highlight-box">
자동 생성된 커밋 메시지:
feat: HTML5 Canvas 스네이크 게임 구현 완료

- Snake, Food, Game 핵심 클래스 구현
- requestAnimationFrame 기반 60fps 게임 루프
- EARS 수용 테스트 6/6 통과
- TRUST-5 전 항목 달성 (커버리지 95%)

Co-Authored-By: MoAI-ADK Loop Engine
</div>

<h3>Phase 4: 완료 요약 + 버그 수정</h3>
<div class="example-box">
<strong>완료 요약 리포트:</strong>
개발 시간: 약 45분
생성 파일: 9개
테스트: 44개 (전체 통과)
커버리지: 95%
TRUST-5: ✅✅✅✅✅

<strong>버그 발생 시:</strong>
/moai fix "뱀 속도가 브라우저마다 다름"
→ Loop Engine이 requestAnimationFrame 타임스탬프로 수정

/moai loop  ← 품질 루프 재실행으로 최종 확인
</div>`,
        keyPoints: ["/moai sync가 README·API·CHANGELOG 자동 생성", "커밋 메시지까지 자동 생성 — 의미 있는 이력", "/moai fix + /moai loop로 버그 수정까지 자동화"],
      },
    ],
    quizId: "quiz-cc10",
  },

  // ════════════════════════════════════
  // APPENDIX — 개발자를 위한 실전 팁
  // ════════════════════════════════════

  {
    id: 'cc-appendix', partId: 3,
    title: "APPENDIX — 개발자를 위한 실전 팁",
    description: "클로드 코드 실전 노하우, SaaS/BaaS 가이드, MCP 전략, Pencil MCP, 외부 LLM 연동까지 심화 활용법을 정리합니다.",
    icon: "📎", color: "indigo", estimatedTime: "90분",
    difficulty: 4,
    lessons: [
      {
        id: "cc-a1", title: "A-1 클로드 코드 개발자의 실전 노하우",
        duration: "20분", difficulty: 3,
        diagramType: "context-window",
        content: `
<h2>프롬프트 엔지니어링 실전 팁</h2>
<div class="highlight-box">
<strong>효과적인 요청 방법:</strong>
❌ "코드 고쳐줘"
✅ "getUserById 함수에서 user가 null일 때
   에러가 발생해. 원인 찾아서 고쳐줘."

<strong>단계별 지시:</strong>
❌ "로그인 기능 전체 만들어줘"
✅ 1. "먼저 구조만 설명해줘"
   2. "계획 보여줘, 구현은 아직"
   3. "JWT 부분부터 구현해줘"
</div>

<h3>컨텍스트 관리 노하우</h3>
<div class="example-box">
• 긴 작업 전: /checkpoint 저장
• 컨텍스트 부족 신호: 응답이 이전 내용 모르면
  → /compact 또는 새 세션
• CLAUDE.md에 "잊어도 되는" 것 빼기
• 파일 참조: 직접 붙여넣기 < Read 도구 활용

<strong>실전 패턴:</strong>
대규모 리팩토링 = 작은 단위로 분해
→ 한 함수씩 순서대로 처리
</div>

<h3>팀 협업에서의 클로드 코드</h3>
<div class="example-box">
• CLAUDE.md를 Git에 커밋 → 팀 전체 공유
• .claude/settings.json → 팀 표준 설정
• .claude/settings.local.json → 개인 설정 (.gitignore)
• 스킬·에이전트 파일도 Git으로 버전 관리
</div>`,
        keyPoints: ["단계별 지시로 의도치 않은 대규모 변경 방지", "/compact로 컨텍스트 절약, /checkpoint로 안전망", "CLAUDE.md + settings.json으로 팀 표준 공유"],
      },
      {
        id: "cc-a2", title: "A-2 에이전틱 코딩을 위한 SaaS/BaaS 가이드",
        duration: "15분", difficulty: 3,
        diagramType: "mcp-integration",
        content: `
<h2>클로드 코드와 잘 맞는 SaaS/BaaS 서비스</h2>
<div class="example-box">
<strong>인증:</strong>
Supabase Auth, Firebase Auth, Auth0
→ MCP 서버 또는 SDK로 클로드가 직접 설정

<strong>데이터베이스:</strong>
Supabase (PostgreSQL + REST API)
PlanetScale (MySQL)
MongoDB Atlas
→ DB MCP로 스키마 생성·쿼리 자동화

<strong>배포:</strong>
Vercel, Netlify, Railway
→ CLI 명령어로 클로드가 직접 배포 실행

<strong>파일 스토리지:</strong>
AWS S3, Cloudflare R2, Supabase Storage
→ SDK 활용으로 파일 관리 자동화
</div>

<h3>MCP와 연동하기</h3>
<div class="highlight-box">
<strong>Supabase MCP 예시:</strong>
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_URL": "$SUPABASE_URL",
        "SUPABASE_KEY": "$SUPABASE_SERVICE_KEY"
      }
    }
  }
}

→ 클로드가 DB 스키마 생성, 데이터 조회 직접 수행
</div>`,
        keyPoints: ["Supabase·Firebase·Auth0로 인증 자동화", "DB MCP로 스키마 생성·마이그레이션 자동화", "Vercel CLI로 클로드가 직접 배포 실행"],
      },
      {
        id: "cc-a3", title: "A-3 MCP와 CLI 도구 선택 전략",
        duration: "15분", difficulty: 3,
        diagramType: "mcp-integration",
        content: `
<h2>MCP vs CLI 도구: 언제 무엇을 쓰나?</h2>
<div class="highlight-box">
<strong>MCP 서버가 적합한 경우:</strong>
✅ 외부 API와 지속적 연결 필요
✅ 복잡한 인증·세션 관리 필요
✅ 리소스/도구/프롬프트를 노출하는 서비스
✅ 양방향 스트리밍 데이터

<strong>CLI 도구가 적합한 경우:</strong>
✅ 단순한 명령어 실행
✅ 로컬 파일·프로세스 조작
✅ 빠른 원타임 작업
✅ MCP 서버가 없는 도구
</div>

<h3>주요 MCP 서버 목록</h3>
<div class="example-box">
공식 Anthropic:
• filesystem, git, github, gitlab
• postgres, sqlite, memory
• puppeteer, fetch, slack

커뮤니티:
• supabase, firebase, notion
• jira, linear, trello
• aws, gcp, azure
• figma, stripe, twilio
</div>

<h3>커스텀 MCP 서버 개발</h3>
<div class="example-box">
<strong># Node.js로 간단한 MCP 서버 만들기</strong>
import { Server } from '@modelcontextprotocol/sdk/server';

const server = new Server({ name: 'my-api' });
server.setRequestHandler(/* 도구 정의 */);

→ stdio 또는 HTTP 전송 방식 선택
→ npx로 실행 또는 로컬 프로세스로 실행
</div>`,
        keyPoints: ["지속 연결·복잡 인증에는 MCP, 단순 명령에는 CLI", "Anthropic 공식 MCP 서버 먼저 활용", "커스텀 MCP 서버로 사내 시스템 연동 가능"],
      },
      {
        id: "cc-a4", title: "A-4 바이브 디자인 Pencil MCP 설치와 활용",
        duration: "15분", difficulty: 3,
        diagramType: "mcp-integration",
        content: `
<h2>Pencil MCP란?</h2>
<div class="highlight-box">
<strong>Pencil MCP</strong>
바이브 코딩(Vibe Coding) 디자인 도구로
Figma와 연동하여 클로드가 UI 디자인·컴포넌트를
직접 생성·수정할 수 있게 해주는 MCP 서버
</div>

<h3>설치 방법</h3>
<div class="example-box">
<strong># .mcp.json에 추가</strong>
{
  "mcpServers": {
    "pencil": {
      "command": "npx",
      "args": ["-y", "@pencil-so/mcp"],
      "env": {
        "PENCIL_API_KEY": "$PENCIL_API_KEY"
      }
    }
  }
}
</div>

<h3>활용 방법</h3>
<div class="example-box">
<strong>컴포넌트 생성:</strong>
"로그인 폼 UI 만들어줘"
→ Pencil MCP가 Figma에 디자인 생성
→ React 컴포넌트 코드도 동시 생성

<strong>디자인 → 코드 변환:</strong>
"이 Figma 프레임을 React 컴포넌트로 변환해줘"
→ 정확한 CSS·레이아웃 자동 추출

<strong>스타일 가이드 적용:</strong>
"팀 디자인 시스템에 맞게 버튼 스타일 수정해줘"
</div>`,
        keyPoints: ["Pencil MCP로 클로드가 Figma 디자인 생성·수정", "디자인→코드 변환으로 UI 개발 속도 대폭 향상", "팀 디자인 시스템 자동 적용"],
      },
      {
        id: "cc-a5", title: "A-5 클로드 코드에서 외부 LLM 사용",
        duration: "15분", difficulty: 4,
        diagramType: "external-llm",
        content: `
<h2>외부 LLM 연동 방법</h2>
<div class="highlight-box">
<strong>환경 변수로 모델 교체:</strong>
ANTHROPIC_API_KEY=sk-ant-... claude       ← 기본
OPENAI_API_KEY=sk-... claude --model gpt  ← OpenAI
</div>

<h3>GLM-5 (智谱 AI) 연동 예시</h3>
<div class="example-box">
<strong># .claude/settings.json</strong>
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/paas/v4/",
    "ANTHROPIC_API_KEY": "$GLM_API_KEY",
    "ANTHROPIC_MODEL": "glm-4"
  }
}

→ 클로드 코드 UI를 그대로 사용하면서
  내부에서 GLM-5 API 호출
</div>

<h3>OpenAI 호환 API 활용</h3>
<div class="example-box">
OpenAI 호환 엔드포인트를 제공하는 서비스:
• DeepSeek, Qwen, Mistral
• 로컬 모델: Ollama, LM Studio
• Azure OpenAI

설정 방법:
ANTHROPIC_BASE_URL=http://localhost:11434/v1
ANTHROPIC_API_KEY=ollama
claude --model llama3.1
</div>`,
        keyPoints: ["ANTHROPIC_BASE_URL로 외부 LLM 엔드포인트 지정", "GLM-5·Ollama 등 OpenAI 호환 API 모두 연동 가능", "비용 절감·특화 모델 활용에 유용"],
      },
      {
        id: "cc-a6", title: "A-6 매니지드 에이전트 (Managed Agents)",
        duration: "10분", difficulty: 4,
        diagramType: "agent-team",
        content: `
<h2>매니지드 에이전트란?</h2>
<div class="highlight-box">
<strong>Managed Agents (관리형 에이전트)</strong>
Anthropic이 클라우드에서 직접 실행·관리하는 에이전트
로컬 인프라 없이 에이전트 기능 바로 활용 가능
</div>

<h3>주요 특징</h3>
<div class="example-box">
✅ 서버리스: 인프라 관리 불필요
✅ 자동 스케일링: 부하에 따라 자동 확장
✅ 영구 세션: 장기 작업 지속 실행 가능
✅ 보안: Anthropic의 격리된 실행 환경
✅ 감사 로그: 모든 액션 추적 가능
</div>

<h3>활용 시나리오</h3>
<div class="example-box">
• CI/CD 파이프라인에서 코드 리뷰 자동화
• 야간 대규모 리팩토링 작업
• 지속적 모니터링 에이전트
• 팀 전체가 공유하는 전문 에이전트

<strong>주의사항:</strong>
• API 사용량에 따른 비용 발생
• 민감한 코드는 로컬 에이전트 권장
• 실행 권한 설정을 신중하게
</div>

<h3>Claude API로 커스텀 에이전트 구축</h3>
<div class="example-box">
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic();

const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 8192,
  tools: [/* 커스텀 도구 정의 */],
  messages: [{ role: 'user', content: prompt }],
});
</div>`,
        keyPoints: ["매니지드 에이전트 = Anthropic 클라우드에서 실행", "서버리스·자동 스케일링으로 인프라 부담 없음", "Claude API + 도구 정의로 커스텀 에이전트 직접 구축"],
      },
    ],
    quizId: "quiz-cc-appendix",
  },
];

export const getClaudeModuleById = (id) => claudeModules.find(m => m.id === id);
export const getClaudeLessonById = (lessonId) => {
  for (const module of claudeModules) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return { lesson, module };
  }
  return null;
};

export const PART_LABELS = {
  1: 'PART 1 — 클로드 코드 마스터',
  2: 'PART 2 — MoAI-ADK와 실전 에이전틱 코딩',
  3: 'APPENDIX — 개발자를 위한 실전 팁',
};

export const DIFFICULTY_LABELS = ['', '입문', '초급', '중급', '고급', '심화'];
export const DIFFICULTY_COLORS = ['', 'text-green-600', 'text-blue-600', 'text-yellow-600', 'text-orange-600', 'text-red-600'];
export const DIFFICULTY_BG    = ['', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100', 'bg-orange-100', 'bg-red-100'];
