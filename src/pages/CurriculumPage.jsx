import { Link } from 'react-router-dom';
import { Clock, BookOpen, CheckCircle2, ChevronRight, Trophy } from 'lucide-react';
import { modules } from '../data/curriculum';

const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-300',   header: 'bg-blue-700',   text: 'text-blue-700',   bar: 'bg-blue-500',   light: 'bg-blue-100' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-300', header: 'bg-purple-700', text: 'text-purple-700', bar: 'bg-purple-500', light: 'bg-purple-100' },
  green:  { bg: 'bg-green-50',  border: 'border-green-300',  header: 'bg-green-700',  text: 'text-green-700',  bar: 'bg-green-500',  light: 'bg-green-100' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-300', header: 'bg-orange-700', text: 'text-orange-700', bar: 'bg-orange-500', light: 'bg-orange-100' },
  red:    { bg: 'bg-red-50',    border: 'border-red-300',    header: 'bg-red-700',    text: 'text-red-700',    bar: 'bg-red-500',    light: 'bg-red-100' },
  cyan:   { bg: 'bg-cyan-50',   border: 'border-cyan-300',   header: 'bg-cyan-700',   text: 'text-cyan-700',   bar: 'bg-cyan-500',   light: 'bg-cyan-100' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-300', header: 'bg-indigo-700', text: 'text-indigo-700', bar: 'bg-indigo-500', light: 'bg-indigo-100' },
};

export default function CurriculumPage({ getModuleProgress, isLessonCompleted, isQuizCompleted }) {
  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">학습 커리큘럼</h1>
        <p className="text-gray-500 mt-1">총 5개 모듈, 21개 강의로 구성된 체계적인 AI 교육 과정입니다.</p>
      </div>

      <div className="space-y-6">
        {modules.map((module) => {
          const c = colorMap[module.color];
          const mp = getModuleProgress(module.id);
          const quizDone = isQuizCompleted(module.quizId);

          return (
            <div key={module.id} className={`rounded-2xl border-2 ${c.border} overflow-hidden shadow-sm`}>
              {/* 모듈 헤더 */}
              <div className={`${c.header} text-white p-5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{module.icon}</span>
                    <div>
                      <div className="text-xs font-medium opacity-80 mb-0.5">모듈 {module.id}</div>
                      <h2 className="text-lg font-bold">{module.title}</h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{mp.percent}%</div>
                    <div className="text-xs opacity-70">{mp.completed}/{mp.total} 완료</div>
                  </div>
                </div>

                <p className="text-sm opacity-80 mt-2">{module.description}</p>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-xs opacity-80">
                    <Clock size={13} /> {module.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs opacity-80">
                    <BookOpen size={13} /> {module.lessons.length}개 강의
                  </div>
                  {quizDone && (
                    <div className="flex items-center gap-1.5 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      <Trophy size={12} /> 퀴즈 완료
                    </div>
                  )}
                </div>

                {/* 진도 바 */}
                <div className="mt-3 bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-700"
                    style={{ width: `${mp.percent}%` }}
                  />
                </div>
              </div>

              {/* 강의 목록 */}
              <div className={`${c.bg} divide-y divide-gray-100`}>
                {module.lessons.map((lesson, idx) => {
                  const done = isLessonCompleted(lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      to={`/lesson/${lesson.id}`}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/60 transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        done ? 'bg-green-500 text-white' : `${c.light} ${c.text}`
                      }`}>
                        {done ? <CheckCircle2 size={16} /> : idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium ${done ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                          {lesson.title}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Clock size={11} /> {lesson.duration}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                    </Link>
                  );
                })}

                {/* 퀴즈 링크 */}
                <Link
                  to={`/quiz/${module.quizId}`}
                  className={`flex items-center gap-4 px-5 py-3.5 hover:bg-white/60 transition-colors group ${
                    quizDone ? 'opacity-60' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                    quizDone ? 'bg-yellow-400 text-white' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {quizDone ? <Trophy size={16} /> : '📝'}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${quizDone ? 'text-gray-400' : 'text-gray-800'}`}>
                      {quizDone ? '퀴즈 완료' : '모듈 퀴즈 풀기'}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">5문제 · 이해도 확인</div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
