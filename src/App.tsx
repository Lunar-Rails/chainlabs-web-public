import { useState } from 'react';
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import IndustriesPage from './pages/IndustriesPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

type Page = 'home' | 'company' | 'solutions' | 'industries' | 'insights';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'solutions':
        return <SolutionsPage />;
      case 'industries':
        return <IndustriesPage />;
      default:
        return <HomePage />;
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
