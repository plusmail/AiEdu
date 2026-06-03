import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, BookOpen, Code2, BarChart2, FolderOpen } from 'lucide-react';
import { getLessonById } from '../data/curriculum';
import { codeExamples } from '../data/codeExamples';
import DiagramRenderer from '../components/Diagram/DiagramRenderer';
import CodePlayground from '../components/CodePlayground/CodePlayground';

export default function LessonPage({ isLessonCompleted, completeLesson, getOpenCVLesson, getClaudeLesson, getLlmLesson, opencvCodeExamples, mlCodeExamples, chapExamples }) {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [activeCodeTab, setActiveCodeTab] = useState(0);
  const [selectedChapFile, setSelectedChapFile] = useState(0);

  // lessonId prefix로 커리큘럼 구분
  const isCV     = typeof lessonId === 'string' && lessonId.startsWith('cv');
  const isClaude = typeof lessonId === 'string' && lessonId.startsWith('cc');
  const isLlm    = typeof lessonId === 'string' && lessonId.startsWith('llm');

  // 커리큘럼별 강의 조회
  const result = isLlm
    ? (getLlmLesson ? getLlmLesson(lessonId) : null)
    : isClaude
      ? (getClaudeLesson ? getClaudeLesson(lessonId) : null)
      : isCV
        ? (getOpenCVLesson ? getOpenCVLesson(lessonId) : null)
        : getLessonById(lessonId);

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

  // 단일 ID와 배열 ID 모두 지원
  const codeExampleIds = lesson.codeExampleIds
    || (lesson.codeExampleId ? [lesson.codeExampleId] : []);
  const codeExampleList = codeExampleIds.map(id => allCodeExamples[id]).filter(Boolean);
  const codeExample = codeExampleList[0] || null;

  // 챕터 전체 예제 파일 목록 (chapExamples 에서 module.chapId로 조회)
  const chapFileList = (chapExamples && module.chapId)
    ? (chapExamples[module.chapId] || [])
    : [];

  const colorMap = {
    blue: 'bg-blue-700', purple: 'bg-purple-700', green: 'bg-green-700',
    orange: 'bg-orange-700', red: 'bg-red-700', cyan: 'bg-cyan-700',
    indigo: 'bg-indigo-700', yellow: 'bg-yellow-600',
  };
  const headerBg = colorMap[module.color] || 'bg-blue-700';

  const curriculumPath = isLlm
    ? `/curriculum-llm/${module.id}`
    : isClaude
      ? `/curriculum-claude/${module.id}`
      : isCV
        ? `/curriculum-cv/${module.id}`
        : `/curriculum/${module.id}`;

  function handleComplete() {
    completeLesson(lessonId, module.id);
    if (nextLesson) navigate(`/lesson/${nextLesson.id}`);
    else navigate(`/quiz/${module.quizId}`);
  }

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-6">
      {/* 뒤로가기 */}
      <Link
        to={curriculumPath}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
      >
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
      {codeExampleList.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 size={18} className="text-gray-600" />
              <span className="font-bold text-gray-800">코드 실습</span>
              {codeExampleList.length > 1 && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  {codeExampleList.length}개
                </span>
              )}
            </div>
            <Link
              to="/playground"
              className="text-xs text-blue-600 hover:text-blue-500 flex items-center gap-1"
            >
              플레이그라운드에서 더 보기 <ChevronRight size={13} />
            </Link>
          </div>

          {/* 탭 (여러 예제일 때만 표시) */}
          {codeExampleList.length > 1 && (
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {codeExampleList.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCodeTab(i)}
                  className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors flex-shrink-0 ${
                    activeCodeTab === i
                      ? 'border-blue-500 text-blue-700 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {i === 0 ? '📘 개념 예제' : `📂 ${ex.title.split('—')[0].trim()}`}
                </button>
              ))}
            </div>
          )}

          <div className="p-4">
            {codeExampleList[activeCodeTab] && (
              <CodePlayground
                key={`${lessonId}-${activeCodeTab}`}
                defaultCode={codeExampleList[activeCodeTab].code}
                language={codeExampleList[activeCodeTab].language}
                title={codeExampleList[activeCodeTab].title}
                description={codeExampleList[activeCodeTab].description}
              />
            )}
          </div>
        </div>
      )}

      {/* 챕터 전체 예제 소스 파일 선택기 */}
      {chapFileList.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen size={18} className="text-emerald-600" />
              <span className="font-bold text-gray-800">교재 예제 소스 전체</span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                {module.chapId} · {chapFileList.length}개
              </span>
            </div>
            <span className="text-xs text-gray-400">파일 선택 후 실습</span>
          </div>

          {/* 파일 선택 드롭다운 */}
          <div className="px-4 pt-3 pb-2 bg-gray-50 border-b border-gray-100">
            <select
              value={selectedChapFile}
              onChange={e => setSelectedChapFile(Number(e.target.value))}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
            >
              {chapFileList.map((f, i) => (
                <option key={f.id} value={i}>
                  {f.filename}
                </option>
              ))}
            </select>

            {/* 파일 번호 빠른 선택 (작은 버튼 배열) */}
            <div className="flex flex-wrap gap-1 mt-2">
              {chapFileList.map((f, i) => {
                const num = f.filename.match(/^(\d+)/)?.[1] || String(i+1);
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedChapFile(i)}
                    title={f.filename}
                    className={`text-xs px-2 py-1 rounded font-mono transition-colors ${
                      selectedChapFile === i
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-emerald-100'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 선택된 파일 코드 */}
          <div className="p-4">
            {chapFileList[selectedChapFile] && (
              <CodePlayground
                key={`chap-${module.chapId}-${selectedChapFile}`}
                defaultCode={chapFileList[selectedChapFile].code}
                language="python"
                title={`${chapFileList[selectedChapFile].filename}`}
                description={`${module.chapId} / ${chapFileList[selectedChapFile].filename}`}
              />
            )}
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
