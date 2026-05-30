import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, BookOpen, Code2, BarChart2 } from 'lucide-react';
import { getLessonById, modules } from '../data/curriculum';
import { codeExamples } from '../data/codeExamples';
import DiagramRenderer from '../components/Diagram/DiagramRenderer';
import CodePlayground from '../components/CodePlayground/CodePlayground';

export default function LessonPage({ isLessonCompleted, completeLesson, getOpenCVLesson, opencvCodeExamples, mlCodeExamples }) {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  // ML 또는 OpenCV 강의 통합 조회
  let result = getLessonById(lessonId);
  let isCV = false;
  if (!result && getOpenCVLesson) {
    result = getOpenCVLesson(lessonId);
    if (result) isCV = true;
  }

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">강의를 찾을 수 없습니다.</p>
        <Link to="/curriculum" className="text-blue-600 hover:underline mt-2 inline-block">커리큘럼으로 돌아가기</Link>
      </div>
    );
  }

  // 코드 예제 소스 선택 (CV vs ML)
  const allCodeExamples = { ...(mlCodeExamples || codeExamples), ...(opencvCodeExamples || {}) };

  const { lesson, module } = result;
  const allLessons = module.lessons;
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const isCompleted = isLessonCompleted(lessonId);

  const codeExample = lesson.codeExampleId ? allCodeExamples[lesson.codeExampleId] : null;

  const colorMap = {
    blue: 'bg-blue-700', purple: 'bg-purple-700', green: 'bg-green-700',
    orange: 'bg-orange-700', red: 'bg-red-700',
  };
  const headerBg = colorMap[module.color] || 'bg-blue-700';

  function handleComplete() {
    completeLesson(lessonId, module.id);
    if (nextLesson) navigate(`/lesson/${nextLesson.id}`);
    else navigate(`/quiz/${module.quizId}`);
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-6">
      {/* 뒤로가기 */}
      <Link to={`/curriculum`} className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ChevronLeft size={16} /> {module.title}으로 돌아가기
      </Link>

      {/* 강의 헤더 */}
      <div className={`${headerBg} rounded-2xl text-white p-6`}>
        <div className="flex items-center gap-2 text-sm opacity-70 mb-2">
          <span>{module.icon}</span>
          <span>모듈 {module.id} · 강의 {currentIndex + 1}/{allLessons.length}</span>
          {lesson.diagramType && (
            <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full ml-2">
              <BarChart2 size={11} /> 인터랙티브 다이어그램
            </span>
          )}
          {codeExample && (
            <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
              <Code2 size={11} /> 코드 실습
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <div className="flex items-center gap-3 mt-3 text-sm opacity-80">
          <span className="flex items-center gap-1"><Clock size={14} /> {lesson.duration}</span>
          {isCompleted && (
            <span className="flex items-center gap-1 bg-green-500/30 px-2 py-0.5 rounded-full">
              <CheckCircle2 size={14} /> 완료
            </span>
          )}
        </div>
      </div>

      {/* 강의 콘텐츠 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </div>

      {/* 인터랙티브 다이어그램 */}
      {lesson.diagramType && (
        <DiagramRenderer type={lesson.diagramType} />
      )}

      {/* 코드 실습 */}
      {codeExample && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 size={18} className="text-gray-600" />
              <span className="font-bold text-gray-800">코드 실습</span>
            </div>
            <Link
              to="/playground"
              className="text-xs text-blue-600 hover:text-blue-500 flex items-center gap-1"
            >
              플레이그라운드에서 더 보기 <ChevronRight size={13} />
            </Link>
          </div>
          <div className="p-4">
            <CodePlayground
              key={lesson.codeExampleId}
              defaultCode={codeExample.code}
              language={codeExample.language}
              title={codeExample.title}
              description={codeExample.description}
            />
          </div>
        </div>
      )}

      {/* 핵심 포인트 */}
      {lesson.keyPoints && lesson.keyPoints.length > 0 && (
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5">
          <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            <BookOpen size={16} /> 핵심 포인트
          </h3>
          <ul className="space-y-2">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 완료 버튼 */}
      {!isCompleted && (
        <button
          onClick={handleComplete}
          className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-base"
        >
          <CheckCircle2 size={20} />
          {nextLesson ? '강의 완료 후 다음으로' : '강의 완료 후 퀴즈 풀기'}
        </button>
      )}

      {/* 이전/다음 네비게이션 */}
      <div className="flex gap-3">
        {prevLesson ? (
          <Link to={`/lesson/${prevLesson.id}`}
            className="flex-1 flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            <ChevronLeft size={16} />
            <div className="min-w-0">
              <div className="text-xs text-gray-400">이전 강의</div>
              <div className="truncate font-medium">{prevLesson.title}</div>
            </div>
          </Link>
        ) : <div className="flex-1" />}

        {nextLesson ? (
          <Link to={`/lesson/${nextLesson.id}`}
            className="flex-1 flex items-center justify-end gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors text-right">
            <div className="min-w-0">
              <div className="text-xs text-gray-400">다음 강의</div>
              <div className="truncate font-medium">{nextLesson.title}</div>
            </div>
            <ChevronRight size={16} className="flex-shrink-0" />
          </Link>
        ) : (
          <Link to={`/quiz/${module.quizId}`}
            className="flex-1 flex items-center justify-end gap-2 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-700 hover:bg-yellow-100 transition-colors text-right">
            <div>
              <div className="text-xs text-yellow-500">모듈 완료!</div>
              <div className="font-medium">퀴즈 풀기</div>
            </div>
            <ChevronRight size={16} className="flex-shrink-0" />
          </Link>
        )}
      </div>
    </div>
  );
}
