import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import SolutionsPage from './pages/SolutionsPage';
import IndustriesPage from './pages/IndustriesPage';
import InsightsPage from './pages/InsightsPage';
import RequestSamplePage from './pages/RequestSamplePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/admin/LoginPage';
import ArticlesPage from './pages/admin/ArticlesPage';
import CaseStudiesPage from './pages/admin/CaseStudiesPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { analytics } from './lib/analytics';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type Page = 'home' | 'company' | 'solutions' | 'industries' | 'insights' | 'requestSample' | 'privacy' | 'terms' | 'admin-login' | 'admin-articles' | 'admin-case-studies';

const PAGE_TITLES: Record<Page, string> = {
  home: 'Home - Chainlabs',
  company: 'Company - Chainlabs',
  solutions: 'Solutions - Chainlabs',
  industries: 'Industries - Chainlabs',
  insights: 'Insights - Chainlabs',
  requestSample: 'Request a Sample - Chainlabs',
  privacy: 'Privacy Policy - Chainlabs',
  terms: 'Terms and Conditions - Chainlabs',
  'admin-login': 'Admin Login - Chainlabs',
  'admin-articles': 'Manage Articles - Chainlabs Admin',
  'admin-case-studies': 'Manage Case Studies - Chainlabs Admin',
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { isAdmin, loading } = useAuth();

  useEffect(() => {
    analytics.init({});
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      if (path === '/admin/articles') {
        setCurrentPage('admin-articles');
      } else if (path === '/admin/case-studies') {
        setCurrentPage('admin-case-studies');
      } else {
        setCurrentPage('admin-login');
      }
    }
  }, []);

  useEffect(() => {
    if (currentPage.startsWith('admin-') && currentPage !== 'admin-login') {
      if (!loading && !isAdmin) {
        setCurrentPage('admin-login');
      }
    }
  }, [isAdmin, loading, currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = PAGE_TITLES[page] || 'Chainlabs';
    analytics.pageView(`/${page}`, PAGE_TITLES[page]);

    if (page.startsWith('admin-')) {
      const adminPath = page === 'admin-login' ? '/admin' : `/admin/${page.replace('admin-', '')}`;
      window.history.pushState({}, '', adminPath);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    analytics.pageView(`/${currentPage}`, PAGE_TITLES[currentPage]);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'company':
        return <CompanyPage />;
      case 'solutions':
        return <SolutionsPage />;
      case 'industries':
        return <IndustriesPage onNavigate={handleNavigate} />;
      case 'insights':
        return <InsightsPage />;
      case 'requestSample':
        return <RequestSamplePage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'admin-login':
        return isAdmin ? <ArticlesPage /> : <LoginPage />;
      case 'admin-articles':
        return loading ? <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div> : (isAdmin ? <ArticlesPage /> : <LoginPage />);
      case 'admin-case-studies':
        return loading ? <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div> : (isAdmin ? <CaseStudiesPage /> : <LoginPage />);
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const isAdminPage = currentPage.startsWith('admin-');

  return (
    <div className="min-h-screen" style={{ backgroundColor: isAdminPage ? '#ffffff' : '#F9FAFB' }}>
      {!isAdminPage && <Navigation currentPage={currentPage} onNavigate={handleNavigate} />}
      {renderPage()}
      {!isAdminPage && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
