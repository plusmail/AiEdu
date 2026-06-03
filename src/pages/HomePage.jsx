import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, ChevronRight, Clock, Layers, Wrench } from 'lucide-react';
import { modules as mlModules } from '../data/curriculum';
import { opencvModules } from '../data/curriculum_opencv';
import { llmModules } from '../data/curriculum_llm';
import { claudeModules } from '../data/curriculum_claude';

const CURRICULA = [
  {
    id: 'ml',
    title: 'ML + 딥러닝',
    subtitle: '혼자 공부하는 머신러닝+딥러닝',
    description: '사이킷런·텐서플로우로 배우는 머신러닝 전 과정. KNN부터 CNN·RNN까지 단계별 실습.',
    icon: '📊',
    color: 'blue',
    route: '/curriculum',
    modules: mlModules,
    tags: ['Python', 'Scikit-learn', 'TensorFlow'],
    level: '입문~중급',
  },
  {
    id: 'opencv',
    title: 'OpenCV 영상처리',
    subtitle: 'OpenCV-Python 영상처리 프로그래밍',
    description: '영상 기초부터 에지 검출·색상 분석·형태학 연산까지, OpenCV 실전 영상처리 완성.',
    icon: '👁️',
    color: 'green',
    route: '/curriculum-cv',
    modules: opencvModules,
    tags: ['OpenCV', 'NumPy', '영상처리'],
    level: '중급',
  },
  {
    id: 'llm',
    title: 'LLM 심화',
    subtitle: 'Large Language Model 완전 정복',
    description: '트랜스포머 원리부터 RAG·에이전트·파인튜닝까지, 현업에서 쓰는 LLM 기술 전반.',
    icon: '🧠',
    color: 'purple',
    route: '/curriculum-llm',
    modules: llmModules,
    tags: ['Transformer', 'RAG', 'Agent'],
    level: '중~고급',
  },
  {
    id: 'claude',
    title: 'Claude Code 활용',
    subtitle: '클로드 코드 에이전틱 개발',
    description: 'Claude Code CLI로 실제 프로젝트를 구축하는 에이전틱 개발 워크플로우 마스터.',
    icon: '🤖',
    color: 'orange',
    route: '/curriculum-claude',
    modules: claudeModules,
    tags: ['Claude', 'CLI', 'AI 코딩'],
    level: '중급',
  },
];

const COLOR = {
  blue:   { card: 'border-blue-200 bg-blue-50',   icon: 'bg-blue-100 text-blue-700', badge: 'bg-blue-600', text: 'text-blue-700', bar: 'bg-blue-500', tag: 'bg-blue-100 text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700' },
  green:  { card: 'border-green-200 bg-green-50',  icon: 'bg-green-100 text-green-700', badge: 'bg-green-600', text: 'text-green-700', bar: 'bg-green-500', tag: 'bg-green-100 text-green-700', btn: 'bg-green-600 hover:bg-green-700' },
  purple: { card: 'border-purple-200 bg-purple-50', icon: 'bg-purple-100 text-purple-700', badge: 'bg-purple-600', text: 'text-purple-700', bar: 'bg-purple-500', tag: 'bg-purple-100 text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700' },
  orange: { card: 'border-orange-200 bg-orange-50', icon: 'bg-orange-100 text-orange-700', badge: 'bg-orange-600', text: 'text-orange-700', bar: 'bg-orange-500', tag: 'bg-orange-100 text-orange-700', btn: 'bg-orange-600 hover:bg-orange-700' },
};

function getCurriculumProgress(curriculum, isLessonCompleted) {
  const allLessons = curriculum.modules.flatMap(m => m.lessons);
  const total = allLessons.length;
  const completed = allLessons.filter(l => isLessonCompleted(l.id)).length;
  return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
}

function CurriculumCard({ curriculum, isLessonCompleted }) {
  const c = COLOR[curriculum.color];
  const progress = getCurriculumProgress(curriculum, isLessonCompleted);
  const totalTime = curriculum.modules.reduce((sum, m) => {
    const mins = parseInt(m.estimatedTime) || 0;
    return sum + mins;
  }, 0);
  const hours = Math.floor(totalTime / 60);
  const mins = totalTime % 60;
  const timeLabel = hours > 0 ? `약 ${hours}시간 ${mins > 0 ? mins + '분' : ''}` : `약 ${mins}분`;

  return (
    <div className={`rounded-2xl border-2 ${c.card} p-6 flex flex-col gap-4 transition-all hover:shadow-lg`}>
      {/* 헤더 */}
      <div className="flex items-start justify-between">
        <div className={`w-14 h-14 rounded-2xl ${c.icon} flex items-center justify-center text-3xl flex-shrink-0`}>
          {curriculum.icon}
        </div>
        <span className={`text-xs font-semibold text-white ${c.badge} px-2.5 py-1 rounded-full`}>
          {curriculum.level}
        </span>
      </div>

      {/* 제목·설명 */}
      <div>
        <h2 className={`font-bold text-xl ${c.text} leading-tight`}>{curriculum.title}</h2>
        <p className={`text-xs font-medium ${c.text} opacity-70 mt-0.5 mb-2`}>{curriculum.subtitle}</p>
        <p className="text-sm text-gray-500 leading-relaxed">{curriculum.description}</p>
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-1.5">
        {curriculum.tags.map(tag => (
          <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.tag}`}>{tag}</span>
        ))}
      </div>

      {/* 통계 */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Layers size={13} />{curriculum.modules.length}개 챕터
        </span>
        <span className="flex items-center gap-1">
          <BookOpen size={13} />{progress.total}개 강의
        </span>
        <span className="flex items-center gap-1">
          <Clock size={13} />{timeLabel}
        </span>
      </div>

      {/* 진도 바 */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span>학습 진도</span>
          <span className="font-semibold">{progress.completed}/{progress.total}강의 · {progress.percent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`${c.bar} h-2.5 rounded-full transition-all duration-700`}
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>

      {/* 버튼 */}
      <Link
        to={curriculum.route}
        className={`mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl ${c.btn} text-white text-sm font-bold transition-colors`}
      >
        {progress.completed > 0 ? '이어서 학습' : '학습 시작'}
        <ChevronRight size={16} />
      </Link>
    </div>
  );
}

export default function HomePage({ isLessonCompleted, isQuizCompleted }) {
  const allLessons = CURRICULA.flatMap(c => c.modules.flatMap(m => m.lessons));
  const totalCompleted = allLessons.filter(l => isLessonCompleted(l.id)).length;
  const totalLessons = allLessons.length;
  const totalPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  const stats = [
    { label: '전체 커리큘럼', value: `${CURRICULA.length}`, sub: '개 과정', icon: '🗂️' },
    { label: '완료한 강의', value: `${totalCompleted}`, sub: `/ ${totalLessons}`, icon: '📚' },
    { label: '전체 진도', value: `${totalPercent}%`, sub: '', icon: '📊' },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* 히어로 */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <div className="inline-flex flex-col bg-white/20 rounded-xl px-3 py-1.5 text-sm mb-4">
            <div className="flex items-center gap-2">
              <span>🎓</span> 직업훈련 AI 교육 플랫폼
            </div>
            <span className="text-blue-200 ml-6" style={{ fontSize: '0.65rem' }}>영남인재교육원</span>
          </div>
          <h1 className="text-3xl font-bold mb-3 leading-tight">
            AI를 활용하는 능력이 당신의 경쟁력입니다
          </h1>
          <p className="text-blue-100 text-base leading-relaxed mb-6">
            4개 과정, {totalLessons}개 강의로 구성된 체계적인 AI 교육 커리큘럼.<br />
            ML 기초부터 LLM 심화, 영상처리, AI 코딩 도구까지 한 곳에서.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/chat"
              className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <MessageSquare size={18} /> AI 실습 해보기
            </Link>
            <Link
              to="/tools"
              className="bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors border border-blue-500 flex items-center gap-2"
            >
              <Wrench size={18} /> AI 도구 모음
            </Link>
          </div>
        </div>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-200 text-center shadow-sm">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-gray-800">
              {s.value}<span className="text-base font-normal text-gray-400">{s.sub}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 전체 진도 바 */}
      {totalPercent > 0 && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-gray-800">🏆 전체 학습 진도</h2>
            <span className="text-blue-600 font-bold">{totalPercent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-700"
              style={{ width: `${totalPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>시작</span>
            <span>{totalCompleted}강의 완료</span>
            <span>완료</span>
          </div>
        </div>
      )}

      {/* 커리큘럼 카드 그리드 */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-blue-600" /> 커리큘럼 선택
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {CURRICULA.map(curriculum => (
            <CurriculumCard
              key={curriculum.id}
              curriculum={curriculum}
              isLessonCompleted={isLessonCompleted}
            />
          ))}
        </div>
      </div>

      {/* 하단 실습 배너 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🤖</div>
          <div>
            <h3 className="font-bold text-purple-800 text-lg mb-2">AI 챗봇 실습</h3>
            <p className="text-purple-700 text-sm leading-relaxed mb-4">
              배운 내용을 바탕으로 실제 AI와 직접 대화해보세요.<br />
              프롬프트 예제 버튼으로 배운 기법을 바로 실습할 수 있습니다.
            </p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-purple-600 transition-colors"
            >
              <MessageSquare size={16} /> 실습 시작하기 <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
