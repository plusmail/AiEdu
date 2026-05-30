import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CurriculumPage from './pages/CurriculumPage';
import OpenCVCurriculumPage from './pages/OpenCVCurriculumPage';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import ChatPage from './pages/ChatPage';
import PlaygroundPage from './pages/PlaygroundPage';
import ToolsPage from './pages/ToolsPage';
import { useProgress } from './hooks/useProgress';
import { getOpenCVLessonById } from './data/curriculum_opencv';
import { getOpenCVQuizById } from './data/quizzes_opencv';
import { opencvCodeExamples } from './data/codeExamples_opencv';
import { codeExamples as mlCodeExamples } from './data/codeExamples';
import { getQuizById as getMLQuizById } from './data/quizzes';

export default function App() {
  const {
    completeLesson,
    completeQuiz,
    isLessonCompleted,
    isQuizCompleted,
    getModuleProgress,
    getTotalProgress,
  } = useProgress();

  const totalProgressValue = getTotalProgress().percent;

  // ML + OpenCV 퀴즈 통합 조회
  function getUnifiedQuiz(quizId) {
    return getMLQuizById(quizId) || getOpenCVQuizById(quizId);
  }

  return (
    <BrowserRouter>
      <Layout totalProgress={totalProgressValue}>
        <Routes>
          <Route path="/" element={
            <HomePage getModuleProgress={getModuleProgress}
              isQuizCompleted={isQuizCompleted} getTotalProgress={getTotalProgress}/>
          }/>
          <Route path="/curriculum" element={
            <CurriculumPage getModuleProgress={getModuleProgress}
              isLessonCompleted={isLessonCompleted} isQuizCompleted={isQuizCompleted}/>
          }/>
          <Route path="/curriculum/:moduleId" element={
            <CurriculumPage getModuleProgress={getModuleProgress}
              isLessonCompleted={isLessonCompleted} isQuizCompleted={isQuizCompleted}/>
          }/>
          <Route path="/curriculum-cv" element={
            <OpenCVCurriculumPage getModuleProgress={getModuleProgress}
              isLessonCompleted={isLessonCompleted} isQuizCompleted={isQuizCompleted}/>
          }/>
          <Route path="/lesson/:lessonId" element={
            <LessonPage
              isLessonCompleted={isLessonCompleted}
              completeLesson={completeLesson}
              getOpenCVLesson={getOpenCVLessonById}
              opencvCodeExamples={opencvCodeExamples}
              mlCodeExamples={mlCodeExamples}
            />
          }/>
          <Route path="/quiz/:quizId" element={
            <QuizPage
              isQuizCompleted={isQuizCompleted}
              completeQuiz={completeQuiz}
              getQuizByIdOverride={getUnifiedQuiz}
            />
          }/>
          <Route path="/chat" element={<ChatPage />}/>
          <Route path="/tools" element={<ToolsPage />}/>
          <Route path="/playground" element={<PlaygroundPage />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
