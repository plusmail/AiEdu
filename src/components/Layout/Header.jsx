import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', label: '홈' },
  { path: '/curriculum', label: 'ML+딥러닝' },
  { path: '/curriculum-cv', label: 'OpenCV' },
  { path: '/tools', label: '학습 도구' },
  { path: '/playground', label: '코딩 실습' },
  { path: '/chat', label: 'AI 채팅' },
];

export default function Header({ totalProgress }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-blue-700 text-lg">
          <Brain size={24} className="text-blue-600" />
          <span>AI 직업훈련 교육</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 진도 표시 */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-gray-500">전체 진도</div>
            <div className="text-sm font-bold text-blue-600">{totalProgress}%</div>
          </div>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 flex items-center gap-2 px-4 py-2">
            <span className="text-xs text-gray-500">전체 진도:</span>
            <span className="text-sm font-bold text-blue-600">{totalProgress}%</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${totalProgress}%` }} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
