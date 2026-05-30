import Header from './Header';

export default function Layout({ children, totalProgress }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header totalProgress={totalProgress} />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t border-gray-200 bg-white mt-12 py-6 text-center text-sm text-gray-400">
        AI 직업훈련 교육 플랫폼 · 직업능력개발훈련
      </footer>
    </div>
  );
}
