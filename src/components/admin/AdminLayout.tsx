import { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, FolderOpen, LogOut, User } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: 'articles' | 'case-studies';
}

export default function AdminLayout({ children, currentPage }: AdminLayoutProps) {
  const { user, signOut } = useAuth();

  const handleNavigation = (page: string) => {
    window.location.href = `/admin/${page}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#001641] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img
                src="/Chainlabs Logo footer Inversed.svg"
                alt="Chainlabs"
                className="h-8"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleNavigation('articles')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === 'articles'
                      ? 'bg-[#FF8A00] text-white'
                      : 'text-gray-300 hover:text-white hover:bg-[#002255]'
                  }`}
                >
                  <FileText size={18} />
                  Articles
                </button>
                <button
                  onClick={() => handleNavigation('case-studies')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === 'case-studies'
                      ? 'bg-[#FF8A00] text-white'
                      : 'text-gray-300 hover:text-white hover:bg-[#002255]'
                  }`}
                >
                  <FolderOpen size={18} />
                  Case Studies
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <User size={18} />
                <span className="text-sm">{user?.email}</span>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-[#002255] rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
