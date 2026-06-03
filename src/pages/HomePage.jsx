import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, Trophy, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { modules } from '../data/curriculum';

const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: 'bg-blue-100 text-blue-700',   badge: 'bg-blue-600',   text: 'text-blue-700',   bar: 'bg-blue-500' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-700', badge: 'bg-purple-600', text: 'text-purple-700', bar: 'bg-purple-500' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  icon: 'bg-green-100 text-green-700',  badge: 'bg-green-600',  text: 'text-green-700',  bar: 'bg-green-500' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100 text-orange-700', badge: 'bg-orange-600', text: 'text-orange-700', bar: 'bg-orange-500' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    icon: 'bg-red-100 text-red-700',    badge: 'bg-red-600',    text: 'text-red-700',    bar: 'bg-red-500' },
  cyan:   { bg: 'bg-cyan-50',   border: 'border-cyan-200',   icon: 'bg-cyan-100 text-cyan-700',   badge: 'bg-cyan-600',   text: 'text-cyan-700',   bar: 'bg-cyan-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'bg-indigo-100 text-indigo-700', badge: 'bg-indigo-600', text: 'text-indigo-700', bar: 'bg-indigo-500' },
};

function ModuleCard({ module, moduleProgress, isQuizDone }) {
  const c = colorMap[module.color];

  return (
    <div className={`rounded-xl border-2 ${c.border} ${c.bg} p-5 flex flex-col gap-3 transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center text-2xl`}>
          {module.icon}
        </div>
        <div className="flex items-center gap-2">
          {isQuizDone && (
            <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              <CheckCircle2 size={12} /> 완료
            </span>
          )}
          <span className={`text-xs font-medium text-white ${c.badge} px-2 py-1 rounded-full`}>
            모듈 {module.id}
          </span>
        </div>
      </div>

      <div>
        <h3 className={`font-bold text-lg ${c.text}`}>{module.title}</h3>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{module.description}</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Clock size={13} />
        <span>{module.estimatedTime}</span>
        <span>·</span>
        <BookOpen size={13} />
        <span>{module.lessons.length}개 강의</span>
      </div>

      {/* 진도 바 */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>진도</span>
          <span>{moduleProgress.completed}/{moduleProgress.total}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${c.bar} h-2 rounded-full transition-all duration-700`}
            style={{ width: `${moduleProgress.percent}%` }}
          />
        </div>
      </div>

      <Link
        to={`/curriculum/${module.id}`}
        className={`mt-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg ${c.badge} text-white text-sm font-medium hover:opacity-90 transition-opacity`}
      >
        {moduleProgress.completed > 0 ? '이어서 학습' : '학습 시작'}
        <ChevronRight size={16} />
      </Link>
    </div>
  );
}

export default function HomePage({ getModuleProgress, isQuizCompleted, getTotalProgress }) {
  const totalProgress = getTotalProgress();

  const stats = [
    { label: '완료한 강의', value: `${totalProgress.completed}`, sub: `/ ${totalProgress.total}`, icon: '📚' },
    { label: '완료한 모듈', value: `${modules.filter(m => isQuizCompleted(m.quizId)).length}`, sub: `/ ${modules.length}`, icon: '🏆' },
    { label: '전체 진도', value: `${totalProgress.percent}%`, sub: '', icon: '📊' },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* 히어로 섹션 */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-sm mb-4">
            <span>🎓</span> 직업훈련 AI 교육 플랫폼
          </div>
          <h1 className="text-3xl font-bold mb-3 leading-tight">
            AI를 활용하는 능력이<br />당신의 경쟁력입니다
          </h1>
          <p className="text-blue-100 text-base leading-relaxed mb-6">
            기초부터 실전까지, 5개 모듈로 체계적으로 AI를 배웁니다.<br />
            프롬프트 작성부터 현장 AI 활용까지, 바로 써먹는 실용 교육.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/curriculum"
              className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <BookOpen size={18} /> 커리큘럼 보기
            </Link>
            <Link
              to="/chat"
              className="bg-blue-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors border border-blue-500 flex items-center gap-2"
            >
              <MessageSquare size={18} /> AI 실습 해보기
            </Link>
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
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
      {totalProgress.percent > 0 && (
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" /> 나의 학습 진도
            </h2>
            <span className="text-blue-600 font-bold">{totalProgress.percent}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-700"
              style={{ width: `${totalProgress.percent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>시작</span>
            <span>{totalProgress.completed}강의 완료</span>
            <span>완료</span>
          </div>
        </div>
      )}

      {/* 모듈 목록 */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-blue-600" /> 학습 모듈
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.id}
              module={module}
              moduleProgress={getModuleProgress(module.id)}
              isQuizDone={isQuizCompleted(module.quizId)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* AI 실습 안내 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🤖</div>
          <div>
            <h3 className="font-bold text-purple-800 text-lg mb-2">AI 챗봇 실습</h3>
            <p className="text-purple-700 text-sm leading-relaxed mb-4">
              배운 내용을 바탕으로 실제 AI와 직접 대화해보세요. Claude API를 연동하면 실제 AI와 채팅할 수 있습니다.
              프롬프트 예제 버튼으로 배운 기법을 바로 실습할 수 있습니다.
            </p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
            >
              <MessageSquare size={16} /> 실습 시작하기 <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
