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
import { analytics } from './lib/analytics';

type Page = 'home' | 'company' | 'solutions' | 'industries' | 'insights' | 'requestSample' | 'privacy' | 'terms';

const PAGE_TITLES: Record<Page, string> = {
  home: 'Home - Chainlabs',
  company: 'Company - Chainlabs',
  solutions: 'Solutions - Chainlabs',
  industries: 'Industries - Chainlabs',
  insights: 'Insights - Chainlabs',
  requestSample: 'Request a Sample - Chainlabs',
  privacy: 'Privacy Policy - Chainlabs',
  terms: 'Terms and Conditions - Chainlabs',
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    // Initialize analytics on app mount
    // Add your tracking IDs here when ready
    analytics.init({
      // googleAnalyticsId: 'G-XXXXXXXXXX', // Uncomment and add your GA4 ID
      // metaPixelId: 'XXXXXXXXXXXXXXXX', // Uncomment and add your Meta Pixel ID
    });
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document title
    document.title = PAGE_TITLES[page] || 'Chainlabs';

    // Track page view
    analytics.pageView(`/${page}`, PAGE_TITLES[page]);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Track initial page view
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
