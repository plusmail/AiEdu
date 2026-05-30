import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ChevronRight, Trophy, RotateCcw, Home } from 'lucide-react';
import { getQuizById } from '../data/quizzes';
import { modules } from '../data/curriculum';
import { opencvModules } from '../data/curriculum_opencv';

export default function QuizPage({ isQuizCompleted, completeQuiz, getQuizByIdOverride }) {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = getQuizByIdOverride ? getQuizByIdOverride(quizId) : getQuizById(quizId);

  // 다음 모듈 찾기 (ML + CV 통합)
  const allModules = [...modules, ...opencvModules];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!quiz) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">퀴즈를 찾을 수 없습니다.</p>
        <Link to="/curriculum" className="text-blue-600 hover:underline mt-2 inline-block">커리큘럼으로 돌아가기</Link>
      </div>
    );
  }

  // ML과 CV 모듈 모두에서 찾기
  const module = allModules.find(m => String(m.id) === String(quiz.moduleId));
  const question = quiz.questions[current];
  const isCorrect = selected === question.answer;
  const score = answers.filter(Boolean).length;

  const colorMap = {
    blue: 'bg-blue-700', purple: 'bg-purple-700', green: 'bg-green-700',
    orange: 'bg-orange-700', red: 'bg-red-700', cyan: 'bg-cyan-700', indigo: 'bg-indigo-700',
  };
  const headerBg = module ? (colorMap[module.color] || 'bg-blue-700') : 'bg-blue-700';

  function handleSelect(idx) {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
  }

  function handleNext() {
    const newAnswers = [...answers, selected === question.answer];
    setAnswers(newAnswers);
    setSelected(null);
    setShowExplanation(false);
    if (current + 1 >= quiz.questions.length) {
      const finalScore = newAnswers.filter(Boolean).length;
      completeQuiz(quizId, finalScore, quiz.questions.length);
      setShowResult(true);
    } else {
      setCurrent(current + 1);
    }
  }

  function handleRetry() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setShowExplanation(false);
  }

  const scorePercent = Math.round((score / quiz.questions.length) * 100);
  const nextModule = module ? modules.find((m) => m.id === module.id + 1) : null;

  if (showResult) {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
        <div className={`${headerBg} rounded-2xl text-white p-8 text-center`}>
          <div className="text-5xl mb-4">
            {scorePercent >= 80 ? '🎉' : scorePercent >= 60 ? '👍' : '💪'}
          </div>
          <h1 className="text-2xl font-bold mb-2">{quiz.title} 완료!</h1>
          <div className="text-6xl font-bold my-4">{score}<span className="text-2xl opacity-70">/{quiz.questions.length}</span></div>
          <div className="text-xl opacity-90">{scorePercent}점</div>
          <div className="mt-3 text-sm opacity-70">
            {scorePercent >= 80 ? '훌륭합니다! 다음 모듈로 넘어가세요.' :
             scorePercent >= 60 ? '잘 했습니다! 조금 더 복습하면 완벽할 거예요.' :
             '다시 한 번 강의를 복습하고 도전해보세요!'}
          </div>
        </div>

        {/* 문항별 결과 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-4">문항별 결과</h3>
          <div className="space-y-2">
            {quiz.questions.map((q, i) => (
              <div key={q.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  answers[i] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {answers[i] ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                </div>
                <div className="text-sm text-gray-600 flex-1">{q.question}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <RotateCcw size={16} /> 다시 풀기
          </button>
          {nextModule ? (
            <Link
              to={`/curriculum/${nextModule.id}`}
              className={`flex-1 flex items-center justify-center gap-2 py-3 ${headerBg} text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity`}
            >
              다음 모듈로 <ChevronRight size={16} />
            </Link>
          ) : (
            <Link
              to="/"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-500 transition-colors"
            >
              <Home size={16} /> 홈으로
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-5">
      {/* 헤더 */}
      <div className={`${headerBg} rounded-2xl text-white p-5`}>
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm opacity-70 flex items-center gap-1">
            <Trophy size={14} /> {module?.title} 퀴즈
          </div>
          <div className="text-sm opacity-70">{current + 1} / {quiz.questions.length}</div>
        </div>
        <div className="bg-white/20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${((current) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 문제 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="text-xs text-gray-400 font-medium mb-3">문제 {current + 1}</div>
        <h2 className="text-lg font-bold text-gray-800 leading-relaxed mb-6">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let style = 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer';
            if (selected !== null) {
              if (idx === question.answer) style = 'border-green-500 bg-green-50';
              else if (idx === selected) style = 'border-red-400 bg-red-50';
              else style = 'border-gray-200 opacity-50';
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all ${style}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    selected !== null && idx === question.answer ? 'border-green-500 bg-green-500 text-white' :
                    selected !== null && idx === selected && idx !== question.answer ? 'border-red-400 bg-red-400 text-white' :
                    'border-gray-300 text-gray-400'
                  }`}>
                    {selected !== null && idx === question.answer ? <CheckCircle2 size={12} /> :
                     selected !== null && idx === selected ? <XCircle size={12} /> :
                     String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-sm text-gray-700">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 해설 */}
        {showExplanation && (
          <div className={`mt-5 p-4 rounded-xl animate-slide-up ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className={`font-bold mb-1 flex items-center gap-2 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              {isCorrect ? '정답입니다!' : '오답입니다'}
            </div>
            <p className={`text-sm leading-relaxed ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* 다음 버튼 */}
      {showExplanation && (
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors animate-slide-up"
        >
          {current + 1 >= quiz.questions.length ? (
            <><Trophy size={18} /> 결과 보기</>
          ) : (
            <>다음 문제 <ChevronRight size={18} /></>
          )}
        </button>
      )}
    </div>
  );
}
