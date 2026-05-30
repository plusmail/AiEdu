import { useState, useCallback } from 'react';
import { modules } from '../data/curriculum';

const STORAGE_KEY = 'aiedu_progress';

const defaultProgress = {
  completedLessons: [],
  completedQuizzes: {},
  quizScores: {},
  startedModules: [],
  totalPoints: 0,
  lastActivity: null,
};

function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore storage errors
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  const completeLesson = useCallback((lessonId, moduleId) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const next = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        startedModules: prev.startedModules.includes(moduleId)
          ? prev.startedModules
          : [...prev.startedModules, moduleId],
        totalPoints: prev.totalPoints + 10,
        lastActivity: new Date().toISOString(),
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const completeQuiz = useCallback((quizId, score, total) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        completedQuizzes: { ...prev.completedQuizzes, [quizId]: true },
        quizScores: { ...prev.quizScores, [quizId]: { score, total } },
        totalPoints: prev.totalPoints + score * 20,
        lastActivity: new Date().toISOString(),
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    saveProgress(defaultProgress);
    setProgress(defaultProgress);
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons]
  );

  const isQuizCompleted = useCallback(
    (quizId) => !!progress.completedQuizzes[quizId],
    [progress.completedQuizzes]
  );

  const getModuleProgress = useCallback(
    (moduleId) => {
      const module = modules.find((m) => m.id === moduleId);
      if (!module) return { completed: 0, total: 0, percent: 0 };
      const total = module.lessons.length;
      const completed = module.lessons.filter((l) =>
        progress.completedLessons.includes(l.id)
      ).length;
      return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
    },
    [progress.completedLessons]
  );

  const getTotalProgress = useCallback(() => {
    const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const completed = progress.completedLessons.length;
    return { completed, total: totalLessons, percent: Math.round((completed / totalLessons) * 100) };
  }, [progress.completedLessons]);

  return {
    progress,
    completeLesson,
    completeQuiz,
    resetProgress,
    isLessonCompleted,
    isQuizCompleted,
    getModuleProgress,
    getTotalProgress,
  };
}
