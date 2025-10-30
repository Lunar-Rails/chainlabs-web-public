import { useState } from 'react';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import SolutionsPage from './pages/SolutionsPage';
import IndustriesPage from './pages/IndustriesPage';
import InsightsPage from './pages/InsightsPage';
import RequestSamplePage from './pages/RequestSamplePage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

type Page = 'home' | 'company' | 'solutions' | 'industries' | 'insights' | 'requestSample';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'company':
        return <CompanyPage />;
      case 'solutions':
        return <SolutionsPage />;
      case 'industries':
        return <IndustriesPage onNavigate={setCurrentPage} />;
      case 'insights':
        return <InsightsPage />;
      case 'requestSample':
        return <RequestSamplePage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
