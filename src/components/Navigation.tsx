import { Menu, X } from 'lucide-react';
import { useState } from 'react';

type Page = 'home' | 'insights' | 'solutions' | 'industries' | 'company' | 'requestSample';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'solutions' as Page, label: 'Solutions' },
    { id: 'industries' as Page, label: 'Industries' },
    { id: 'insights' as Page, label: 'Insights' },
    { id: 'company' as Page, label: 'Company' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-[20px] sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => onNavigate('home')}
            className="hover:opacity-80 transition-opacity"
          >
            <img src="/CL logo 2.svg" alt="Chainlabs" className="h-16" />
          </button>

          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-base font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-[#001641]'
                    : 'text-gray-600 hover:text-[#001641]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={() => onNavigate('requestSample')}
              className="bg-[#001641] text-white px-6 h-[48px] rounded-full text-sm font-semibold hover:bg-[#002255] transition-colors"
            >
              Request a Sample
            </button>
          </div>

          <button
            className="md:hidden text-[#001641]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-[20px] border-t border-gray-200">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-base font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-[#001641]'
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('requestSample');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-[#001641] text-white px-6 h-[48px] rounded-full text-sm font-semibold"
            >
              Request a Sample
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
