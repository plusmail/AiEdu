import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Clock, BookOpen, CheckCircle2, ChevronRight, Trophy } from 'lucide-react';
import { opencvModules } from '../data/curriculum_opencv';

const partColors = {
  1: { bg:'bg-blue-50', border:'border-blue-300', header:'bg-blue-700', text:'text-blue-700', bar:'bg-blue-500', light:'bg-blue-100' },
  2: { bg:'bg-green-50', border:'border-green-300', header:'bg-green-700', text:'text-green-700', bar:'bg-green-500', light:'bg-green-100' },
  3: { bg:'bg-orange-50', border:'border-orange-300', header:'bg-orange-700', text:'text-orange-700', bar:'bg-orange-500', light:'bg-orange-100' },
};
const colorMap = {
  blue: { bg:'bg-blue-50', border:'border-blue-300', header:'bg-blue-700', text:'text-blue-700', bar:'bg-blue-500', light:'bg-blue-100' },
  green: { bg:'bg-green-50', border:'border-green-300', header:'bg-green-700', text:'text-green-700', bar:'bg-green-500', light:'bg-green-100' },
  purple: { bg:'bg-purple-50', border:'border-purple-300', header:'bg-purple-700', text:'text-purple-700', bar:'bg-purple-500', light:'bg-purple-100' },
  orange: { bg:'bg-orange-50', border:'border-orange-300', header:'bg-orange-700', text:'text-orange-700', bar:'bg-orange-500', light:'bg-orange-100' },
  red: { bg:'bg-red-50', border:'border-red-300', header:'bg-red-700', text:'text-red-700', bar:'bg-red-500', light:'bg-red-100' },
  cyan: { bg:'bg-cyan-50', border:'border-cyan-300', header:'bg-cyan-700', text:'text-cyan-700', bar:'bg-cyan-500', light:'bg-cyan-100' },
  indigo: { bg:'bg-indigo-50', border:'border-indigo-300', header:'bg-indigo-700', text:'text-indigo-700', bar:'bg-indigo-500', light:'bg-indigo-100' },
};

const PART_LABELS = {
  1: 'PART 01 — 영상처리 개요 및 파이썬·OpenCV 소개',
  2: 'PART 02 — 영상처리와 OpenCV 함수 활용',
  3: 'PART 03 — 영상처리 응용 사례',
};

export default function OpenCVCurriculumPage({ getModuleProgress, isLessonCompleted, isQuizCompleted }) {
  const { moduleId } = useParams();
  const moduleRefs = useRef({});

  // moduleId 파라미터가 있으면 해당 챕터로 스크롤
  useEffect(() => {
    if (!moduleId) return;
    const el = moduleRefs.current[moduleId];
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [moduleId]);

  const groupedByPart = opencvModules.reduce((acc, m) => {
    if(!acc[m.partId]) acc[m.partId]=[];
    acc[m.partId].push(m);
    return acc;
  }, {});

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">영상처리 OpenCV-Python 커리큘럼</h1>
        <p className="text-gray-500 mt-1">3개 PART, 12개 챕터로 구성된 OpenCV-Python 영상처리 교육 과정입니다.</p>
      </div>

      {Object.entries(groupedByPart).map(([partId, modules])=>{
        const pc=partColors[parseInt(partId)];
        return (
          <div key={partId} className="space-y-4">
            {/* PART 헤더 */}
            <div className={`rounded-xl ${pc.header} text-white px-5 py-3`}>
              <div className="font-bold text-sm">{PART_LABELS[parseInt(partId)]}</div>
            </div>

            {/* 챕터 목록 */}
            <div className="space-y-4 pl-0">
              {modules.map(module=>{
                const c=colorMap[module.color]||pc;
                const mp=getModuleProgress?.(module.id)||{completed:0,total:module.lessons.length,percent:0};
                const quizDone=isQuizCompleted?.(module.quizId)||false;

                const isActive = moduleId === module.id;
                return (
                  <div
                    key={module.id}
                    id={module.id}
                    ref={el => { moduleRefs.current[module.id] = el; }}
                    className={`rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-500 ${
                      isActive ? `${c.border} ring-4 ring-offset-2 ring-blue-400 shadow-lg` : c.border
                    }`}
                  >
                    {/* 모듈 헤더 */}
                    <div className={`${c.header} text-white p-5`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{module.icon}</span>
                          <div>
                            <h2 className="text-lg font-bold">{module.title}</h2>
                          </div>
                        </div>
                        <div className="text-right text-sm opacity-80">
                          <div className="font-bold">{mp.percent}%</div>
                          <div>{mp.completed}/{mp.total}</div>
                        </div>
                      </div>
                      <p className="text-sm opacity-80 mt-2">{module.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs opacity-70">
                        <span className="flex items-center gap-1"><Clock size={12}/>{module.estimatedTime}</span>
                        <span className="flex items-center gap-1"><BookOpen size={12}/>{module.lessons.length}강</span>
                        {quizDone&&<span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full"><Trophy size={12}/>퀴즈 완료</span>}
                      </div>
                      <div className="mt-2 bg-white/20 rounded-full h-1.5">
                        <div className="bg-white h-1.5 rounded-full" style={{width:`${mp.percent}%`,transition:'width 0.5s'}}/>
                      </div>
                    </div>

                    {/* 강의 목록 */}
                    <div className={`${c.bg} divide-y divide-gray-100`}>
                      {module.lessons.map((lesson,idx)=>{
                        const done=isLessonCompleted?.(lesson.id)||false;
                        return (
                          <Link key={lesson.id} to={`/lesson/${lesson.id}`}
                            className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/60 transition-colors group">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                              done?'bg-green-500 text-white':`${c.light} ${c.text}`}`}>
                              {done?<CheckCircle2 size={16}/>:idx+1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-medium ${done?'text-gray-400 line-through':'text-gray-800'}`}>
                                {lesson.title}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                <Clock size={11}/>{lesson.duration}
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0"/>
                          </Link>
                        );
                      })}

                      {/* 퀴즈 */}
                      <Link to={`/quiz/${module.quizId}`}
                        className={`flex items-center gap-4 px-5 py-3.5 hover:bg-white/60 transition-colors group ${quizDone?'opacity-60':''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          quizDone?'bg-yellow-400 text-white':'bg-yellow-100 text-yellow-700'}`}>
                          {quizDone?<Trophy size={16}/>:'📝'}
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-medium ${quizDone?'text-gray-400':'text-gray-800'}`}>
                            {quizDone?'퀴즈 완료':'챕터 확인 문제'}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">5문제 · 이해도 확인</div>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0"/>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
