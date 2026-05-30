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
