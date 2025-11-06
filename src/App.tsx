import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import SolutionsPage from './pages/SolutionsPage';
import IndustriesPage from './pages/IndustriesPage';
import InsightsPage from './pages/InsightsPage';
import RequestSamplePage from './pages/RequestSamplePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

type Page = 'home' | 'company' | 'solutions' | 'industries' | 'insights' | 'requestSample' | 'privacy' | 'terms';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
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
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
