import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User, Building2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  published_date: string;
  display_order: number;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  industry: string;
  display_order: number;
}

export default function InsightsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    fetchArticles();
    fetchCaseStudies();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setArticles(data);
    }
  };

  const fetchCaseStudies = async () => {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setCaseStudies(data);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toUpperCase()) {
      case 'RESEARCH':
        return 'text-blue-600';
      case 'THOUGHT LEADERSHIP':
        return 'text-green-600';
      case 'NEWS':
        return 'text-[#FF8A00]';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-[#001641] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-5xl lg:text-7xl font-semibold text-white mb-6 text-center" style={{ lineHeight: '110%' }}>
            Insights & Research
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            Read all the latest news, thought leadership, research, and case studies from Chainlabs
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
          Latest Articles
        </h2>
        <p className="text-xl text-gray-600 mb-16">
          Expert insights on blockchain intelligence, compliance, and security
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="h-48 bg-gradient-to-br from-[#001641] to-[#003982]"></div>
              <div className="p-6">
                <div className={`text-sm font-semibold mb-2 ${getCategoryColor(article.category)}`}>
                  {article.category}
                </div>
                <h3 className="text-xl font-semibold text-[#001641] mb-3 group-hover:text-[#FF8A00] transition-colors" style={{ lineHeight: '110%' }}>
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(article.published_date)}</span>
                  </div>
                </div>
                <span className="text-[#001641] font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read more <ArrowRight size={16} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
            Case Studies
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Real-world success stories from our clients
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setSelectedCaseStudy(caseStudy)}
              >
                <div className="flex items-center gap-2 text-sm text-[#FF8A00] font-semibold mb-4">
                  <Building2 size={16} />
                  <span>{caseStudy.industry}</span>
                </div>
                <h3 className="text-2xl font-semibold text-[#001641] mb-4 group-hover:text-[#FF8A00] transition-colors" style={{ lineHeight: '110%' }}>
                  {caseStudy.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {caseStudy.challenge.substring(0, 150)}...
                </p>
                <span className="text-[#001641] font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read case study <ArrowRight size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="bg-[#001641] rounded-2xl p-12 lg:p-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6" style={{ lineHeight: '110%' }}>
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter for the latest insights, research, and industry news delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
            />
            <button className="bg-[#FF8A00] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {selectedArticle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-64 bg-gradient-to-br from-[#001641] to-[#003982]"></div>
            <div className="p-8 lg:p-12">
              <div className={`text-sm font-semibold mb-4 ${getCategoryColor(selectedArticle.category)}`}>
                {selectedArticle.category}
              </div>
              <h2 className="text-4xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
                {selectedArticle.title}
              </h2>
              <div className="flex items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>{selectedArticle.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{formatDate(selectedArticle.published_date)}</span>
                </div>
              </div>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-8">
                {selectedArticle.content}
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-[#001641] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#002255] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCaseStudy && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCaseStudy(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-2 text-[#FF8A00] font-semibold mb-4">
                <Building2 size={20} />
                <span>{selectedCaseStudy.industry}</span>
              </div>
              <h2 className="text-4xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
                {selectedCaseStudy.title}
              </h2>
              <p className="text-xl text-gray-500 mb-8">{selectedCaseStudy.client}</p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>
                    Challenge
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCaseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>
                    Solution
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCaseStudy.solution}
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-2xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>
                    Results
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCaseStudy.results}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="mt-8 bg-[#001641] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#002255] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
