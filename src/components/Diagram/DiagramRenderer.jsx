import AiHierarchyDiagram  from './AiHierarchyDiagram';
import NeuralNetworkDiagram from './NeuralNetworkDiagram';
import MlPipelineDiagram    from './MlPipelineDiagram';
import PromptFlowDiagram    from './PromptFlowDiagram';
import LlmTokenDiagram      from './LlmTokenDiagram';
import TransformerDiagram   from './TransformerDiagram';
import OpenCvDemo           from '../OpenCV/OpenCvDemo';
// 챕터별 신규 다이어그램 (ML 교재)
import KnnDiagram           from './KnnDiagram';
import TrainTestDiagram     from './TrainTestDiagram';
import RegressionDiagram    from './RegressionDiagram';
import SigmoidDiagram       from './SigmoidDiagram';
import DecisionTreeDiagram  from './DecisionTreeDiagram';
import KMeansDiagram        from './KMeansDiagram';
import ConvolutionDiagram   from './ConvolutionDiagram';
import RnnLstmDiagram       from './RnnLstmDiagram';
// OpenCV 교재 전용 다이어그램
import ImageRepresentDiagram from './ImageRepresentDiagram';
import ColorSpaceDiagram     from './ColorSpaceDiagram';
import ImageFilterDiagram    from './ImageFilterDiagram';
import MorphologyOpsDiagram  from './MorphologyOpsDiagram';
import GeomTransformDiagram  from './GeomTransformDiagram';
import HoughTransformDiagram from './HoughTransformDiagram';
import ArrayOpsDiagram      from './ArrayOpsDiagram';
import ImageIODiagram        from './ImageIODiagram';
import StatsDiagram          from './StatsDiagram';
import Chap05Diagram         from './Chap05Diagram';
// 클로드 코드 전용 다이어그램
import AgenticLoopDiagram     from './AgenticLoopDiagram';
import WorkflowDiagram        from './WorkflowDiagram';
import OrchestratorWorkerDiagram from './OrchestratorWorkerDiagram';
import ClaudeMemoryDiagram    from './ClaudeMemoryDiagram';
import SkillStructureDiagram  from './SkillStructureDiagram';
import PlanRunSyncDiagram     from './PlanRunSyncDiagram';
import MoaiArchDiagram        from './MoaiArchDiagram';
import ContextWindowDiagram   from './ContextWindowDiagram';
import SettingsPriorityDiagram from './SettingsPriorityDiagram';
import HookSystemDiagram      from './HookSystemDiagram';
import AgentTeamDiagram       from './AgentTeamDiagram';
import Trust5Diagram          from './Trust5Diagram';
import TddLoopDiagram         from './TddLoopDiagram';
import WorktreeDiagram        from './WorktreeDiagram';
import McpIntegrationDiagram  from './McpIntegrationDiagram';
import ModelSelectionDiagram  from './ModelSelectionDiagram';
import CliModesDiagram        from './CliModesDiagram';
import ProjectContextDiagram  from './ProjectContextDiagram';
import SkillDevDiagram        from './SkillDevDiagram';
import CustomAgentDiagram     from './CustomAgentDiagram';
import OutputStyleDiagram     from './OutputStyleDiagram';
import CheckpointDiagram      from './CheckpointDiagram';
import NonInteractiveDiagram  from './NonInteractiveDiagram';
import SyncFlowDiagram        from './SyncFlowDiagram';
import ExternalLlmDiagram     from './ExternalLlmDiagram';
import MoaiCommandsDiagram    from './MoaiCommandsDiagram';
// LLM 전용 다이어그램
import BpeTokenizationDiagram  from './BpeTokenizationDiagram';
import SlidingWindowDiagram    from './SlidingWindowDiagram';
import SelfAttentionDiagram    from './SelfAttentionDiagram';
import DecodingStrategiesDiagram from './DecodingStrategiesDiagram';
import RlhfDiagram             from './RlhfDiagram';
import RagPipelineDiagram      from './RagPipelineDiagram';
import ReactAgentDiagram       from './ReactAgentDiagram';
import QuantizationDiagram     from './QuantizationDiagram';
import MultimodalDiagram       from './MultimodalDiagram';
import Chap06Diagram         from './Chap06Diagram';
import Chap07Diagram         from './Chap07Diagram';
import Chap08Diagram         from './Chap08Diagram';
import Chap09Diagram         from './Chap09Diagram';
import Chap10Diagram         from './Chap10Diagram';
import Chap11Diagram         from './Chap11Diagram';
import Chap12Diagram         from './Chap12Diagram';

const DIAGRAMS = {
  // 기존
  'ai-hierarchy':    { component: AiHierarchyDiagram,  title: 'AI 계층 구조',              subtitle: 'AI ⊃ 머신러닝 ⊃ 딥러닝 ⊃ 생성형 AI' },
  'neural-network':  { component: NeuralNetworkDiagram, title: '신경망 동작 원리',           subtitle: '입력층 → 은닉층 → 출력층 신호 전파' },
  'ml-pipeline':     { component: MlPipelineDiagram,    title: 'ML 학습 파이프라인',         subtitle: '데이터 수집 → 전처리 → 학습 → 평가 → 배포' },
  'prompt-flow':     { component: PromptFlowDiagram,    title: '프롬프트 엔지니어링 구조',   subtitle: '역할 + 맥락 + 지시 + 형식 = 좋은 프롬프트' },
  'llm-token':       { component: LlmTokenDiagram,      title: 'LLM 토큰 생성 과정',        subtitle: '확률적으로 다음 토큰을 선택해 문장을 완성' },
  'transformer-arch':{ component: TransformerDiagram,   title: 'Transformer 아키텍처',      subtitle: 'Embedding → Multi-Head Attention → FFN → Output' },
  'opencv-demo':     { component: OpenCvDemo,            title: 'OpenCV 이미지 처리 실습',   subtitle: '브라우저에서 직접 필터를 적용해보세요' },
  // 챕터별
  'knn':             { component: KnnDiagram,            title: 'K-최근접 이웃 (KNN) 분류', subtitle: '가장 가까운 K개의 이웃 다수결로 분류' },
  'train-test':      { component: TrainTestDiagram,      title: '훈련/테스트 세트 분리',     subtitle: 'train_test_split + StandardScaler 시각화' },
  'regression':      { component: RegressionDiagram,    title: '선형·다항·KNN 회귀 비교',  subtitle: '외삽 구간에서의 모델별 예측 차이' },
  'sigmoid':         { component: SigmoidDiagram,       title: '시그모이드·소프트맥스·SGD', subtitle: '로지스틱 회귀의 핵심 함수 인터랙티브 시각화' },
  'decision-tree':   { component: DecisionTreeDiagram,  title: '결정 트리 & 앙상블',       subtitle: '지니 불순도 기반 분기 + 랜덤 포레스트 다수결' },
  'kmeans':          { component: KMeansDiagram,        title: 'K-평균 군집 알고리즘',      subtitle: '초기화 → 배정 → 중심 이동 단계별 시각화' },
  'convolution':     { component: ConvolutionDiagram,   title: '합성곱 연산',               subtitle: '필터 슬라이딩으로 특성 맵 생성 과정' },
  'rnn-lstm':        { component: RnnLstmDiagram,       title: 'RNN · LSTM · GRU',         subtitle: '순환 구조와 LSTM 게이트 메커니즘' },
  // OpenCV 전용
  'image-represent': { component: ImageRepresentDiagram, title: '디지털 영상의 표현',        subtitle: '픽셀·채널·비트 깊이·영상 크기' },
  'color-space':     { component: ColorSpaceDiagram,     title: '컬러 공간 (Color Space)',   subtitle: 'BGR·HSV·Lab 인터랙티브 변환' },
  'image-filter':    { component: ImageFilterDiagram,    title: '영상 필터링',               subtitle: '블러·샤프닝·에지 커널 시각화' },
  'morphology-ops':  { component: MorphologyOpsDiagram,  title: '모폴로지 연산',             subtitle: '침식·팽창·열림·닫힘 단계별' },
  'geom-transform':  { component: GeomTransformDiagram,  title: '기하학적 변환',             subtitle: '이동·크기·회전·어파인 인터랙티브' },
  'hough-transform': { component: HoughTransformDiagram, title: '허프 변환',                subtitle: 'ρ-θ 파라미터 공간 투표 과정' },
  'array-ops':       { component: ArrayOpsDiagram,       title: 'OpenCV 배열 연산',         subtitle: '포화 연산·비트 연산·통계·채널 처리' },
  'image-io':        { component: ImageIODiagram,         title: '영상 파일 처리 (I/O)',      subtitle: 'imread · imwrite · VideoCapture · VideoWriter' },
  'cv-stats':        { component: StatsDiagram,           title: 'OpenCV 통계·행렬 연산',    subtitle: 'minMaxLoc · meanStdDev · countNonZero · gemm' },
  'cv-chap05':       { component: Chap05Diagram,          title: 'Ch05 실습 핵심 개념',       subtitle: '비트연산·차분오버플로·정규화·reduce·GEMM·연립방정식' },
  'cv-chap06':       { component: Chap06Diagram,          title: 'Ch06 실습 핵심 개념',       subtitle: 'LUT·대비조절·히스토그램·평활화·CMY·컬러공간·Hue임계값' },
  'cv-chap07':       { component: Chap07Diagram,          title: 'Ch07 실습 핵심 개념',       subtitle: '회선·Sobel방향·Canny4단계·모폴로지·번호판검출' },
  'cv-chap07-filter': { component: () => <Chap07Diagram onlyTabs={['conv']} />,              title: '7.1 회선과 블러·샤프닝',      subtitle: '회선(Convolution) 원리 인터랙티브 시각화' },
  'cv-chap07-edge':   { component: () => <Chap07Diagram onlyTabs={['sobel','canny']} />,     title: '7.2 에지 검출',               subtitle: 'Sobel 마스크 방향 + Canny 4단계 처리' },
  'cv-chap07-morph':  { component: () => <Chap07Diagram onlyTabs={['morph','plate']} />,     title: '7.3~7.4 모폴로지·번호판',    subtitle: '침식·팽창·열림·닫힘 + 번호판 검출 파이프라인' },
  'cv-chap08':       { component: Chap08Diagram,          title: 'Ch08 실습 핵심 개념',       subtitle: '순방향역방향·보간법·어파인변환·원근투시' },
  'cv-chap09':       { component: Chap09Diagram,          title: 'Ch09 실습 핵심 개념',       subtitle: '공간주파수·DFT스펙트럼·LPF/HPF·DCT압축' },
  'cv-chap10':       { component: Chap10Diagram,          title: 'Ch10 실습 핵심 개념',       subtitle: '허프변환·해리스코너·kNN분류·워핑모핑' },
  'cv-chap11':       { component: Chap11Diagram,          title: 'Ch11 실습 핵심 개념',       subtitle: '하르분류기·히스토그램비교·성별분류파이프라인' },
  'cv-chap12':       { component: Chap12Diagram,          title: 'Ch12 실습 핵심 개념',       subtitle: '동전인식·SVM번호판·kNN문자인식·종합파이프라인' },
  // 클로드 코드 마스터
  'agentic-loop':          { component: AgenticLoopDiagram,        title: '에이전틱 루프',           subtitle: '사용자 요청→분석→계획→실행→확인 자율 반복 사이클' },
  'explore-plan-code-commit': { component: WorkflowDiagram,        title: '탐색-계획-구현-커밋 워크플로', subtitle: '클로드 코드 핵심 4단계 작업 방식' },
  'orchestrator-worker':   { component: OrchestratorWorkerDiagram, title: '오케스트레이터-워커 패턴', subtitle: '병렬 에이전트 협업으로 복잡한 작업 효율화' },
  'claude-memory-layers':  { component: ClaudeMemoryDiagram,       title: '4계층 메모리 시스템',      subtitle: '컨텍스트·CLAUDE.md·파일시스템·외부메모리' },
  'skill-structure':       { component: SkillStructureDiagram,     title: '스킬 구조와 생명주기',     subtitle: 'YAML 프론트매터·본문·트리거·격리실행(fork)' },
  'plan-run-sync':         { component: PlanRunSyncDiagram,        title: 'plan-run-sync 워크플로',  subtitle: 'MoAI-ADK 핵심 SPEC→TDD→동기화 자동화 사이클' },
  'moai-architecture':     { component: MoaiArchDiagram,           title: 'MoAI-ADK 4계층 아키텍처', subtitle: '인터페이스→오케스트레이션→실행→인프라 구조' },
  'context-window':        { component: ContextWindowDiagram,      title: '컨텍스트 윈도우',          subtitle: '20만 토큰 구성 시각화 + 관리 전략 4가지' },
  'settings-priority':     { component: SettingsPriorityDiagram,   title: 'settings.json 우선순위',   subtitle: '프로젝트 로컬 > 공유 > 사용자 전역 3단계' },
  'hook-system':           { component: HookSystemDiagram,         title: '훅 시스템',                subtitle: 'PreToolUse·PostToolUse·Stop 이벤트와 종료 코드' },
  'agent-team':            { component: AgentTeamDiagram,          title: '에이전트 팀 협업',         subtitle: 'Sequential·Parallel·Mixed 실행 모드 + 파일 소유권' },
  'trust5-framework':      { component: Trust5Diagram,             title: 'TRUST-5 품질 프레임워크',  subtitle: 'Tested·Reviewed·Understood·Secured·Typed 5가지 기준' },
  'tdd-loop':              { component: TddLoopDiagram,            title: 'TDD 사이클',               subtitle: 'Red(실패) → Green(통과) → Refactor → TRUST-5 반복' },
  'worktree-parallel':     { component: WorktreeDiagram,           title: 'Git 작업 트리 병렬 개발',  subtitle: '에이전트별 독립 브랜치·디렉토리로 충돌 없는 동시 개발' },
  'mcp-integration':       { component: McpIntegrationDiagram,     title: 'MCP 통합과 외부 연결',     subtitle: 'GitHub·PostgreSQL·Slack·Puppeteer MCP 서버 활용' },
  'model-selection':       { component: ModelSelectionDiagram,     title: '모델 구성과 API 최적화',   subtitle: 'Opus·Sonnet·Haiku 비교 + 프롬프트 캐싱 + 선택 전략' },
  'cli-modes':             { component: CliModesDiagram,           title: 'CLI 실행 모드',             subtitle: '대화형·비대화형 모드 + 주요 플래그 + 단축키' },
  'project-context':       { component: ProjectContextDiagram,     title: '프로젝트 컨텍스트 인식',    subtitle: 'Git·파일구조·CLAUDE.md 자동 파악 + Git 통합' },
  'skill-dev':             { component: SkillDevDiagram,           title: '스킬 개발과 생명주기',      subtitle: '트리거→로드→실행 5단계 + 템플릿 + 환각 방지' },
  'custom-agent':          { component: CustomAgentDiagram,        title: '커스텀 에이전트 개발',      subtitle: '파일 구조·프론트매터 가이드·보안/문서/테스트 예제' },
  'output-style':          { component: OutputStyleDiagram,        title: '출력 스타일 커스터마이징',  subtitle: 'Default·Concise·JSON·Markdown 형식 비교' },
  'checkpoint':            { component: CheckpointDiagram,         title: '체크포인팅과 세션 관리',    subtitle: '/rewind 되감기 + 컨텍스트 전략 + Git 통합' },
  'noninteractive':        { component: NonInteractiveDiagram,     title: '비대화형 모드와 파이프',    subtitle: '파이프 활용·CI/CD 통합·출력 형식 3가지' },
  'sync-flow':             { component: SyncFlowDiagram,           title: '/moai sync 4단계 흐름',    subtitle: '분석→문서동기화→Git커밋→완료보고 자동화' },
  'external-llm':          { component: ExternalLlmDiagram,        title: '외부 LLM 연동',             subtitle: 'GLM-5·Ollama·DeepSeek OpenAI 호환 API 설정' },
  'moai-commands':         { component: MoaiCommandsDiagram,       title: 'MoAI-ADK 슬래시 명령어',   subtitle: 'plan·run·sync·fix + 빌더·유틸리티 전체 레퍼런스' },
  // LLM 전용
  'bpe-tokenization':      { component: BpeTokenizationDiagram,    title: '텍스트 토큰화와 BPE',       subtitle: '언어별 토큰 수 비교 + BPE 5단계 + 비용 차이' },
  'sliding-window':        { component: SlidingWindowDiagram,      title: '슬라이딩 윈도우 데이터셋',  subtitle: '+1 Shift로 (입력, 정답) 쌍 생성 인터랙티브' },
  'self-attention':        { component: SelfAttentionDiagram,      title: '셀프 어텐션 메커니즘',      subtitle: '어텐션 히트맵 · Q·K·V 역할 · 인과적 마스킹' },
  'decoding-strategies':   { component: DecodingStrategiesDiagram, title: '디코딩 전략',               subtitle: 'Temperature · Top-K · Top-P 확률 분포 인터랙티브' },
  'rlhf':                  { component: RlhfDiagram,               title: 'RLHF 파이프라인',           subtitle: 'SFT → 보상 모델 → PPO 3단계 + SFT vs RLHF 비교' },
  'rag-pipeline':          { component: RagPipelineDiagram,        title: 'RAG 파이프라인',            subtitle: '청킹→임베딩→벡터DB→검색→주입 7단계 + 한계' },
  'react-agent':           { component: ReactAgentDiagram,         title: 'ReAct 에이전트 루프',       subtitle: 'Thought→Action→Observation 반복 + 도구 목록 + 멀티 에이전트' },
  'quantization':          { component: QuantizationDiagram,       title: '모델 양자화',               subtitle: '32bit→4bit 압축 · VRAM 절감 · 메모리 시각화' },
  'multimodal':            { component: MultimodalDiagram,         title: '멀티모달 LLM',              subtitle: 'CLIP 대조 학습 · 이미지-텍스트 매칭 · LLaVA 아키텍처' },
};

export default function DiagramRenderer({ type }) {
  const diagram = DIAGRAMS[type];
  if (!diagram) return null;
  const { component: Component, title, subtitle } = diagram;

  return (
    <div className="bg-white rounded-xl border-2 border-blue-100 p-5 my-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-blue-100">
        <div className="w-2 h-6 bg-blue-500 rounded-full" />
        <div>
          <div className="font-bold text-gray-800">{title}</div>
          <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
        <span className="ml-auto text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-200">
          인터랙티브 다이어그램
        </span>
      </div>
      <Component />
    </div>
  );
}
