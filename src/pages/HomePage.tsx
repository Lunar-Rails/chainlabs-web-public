import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import NetworkVisualization from '../components/NetworkVisualization';
import CountUp from '../components/CountUp';

type Page = 'home' | 'company' | 'solutions' | 'industries' | 'insights' | 'requestSample' | 'privacy' | 'terms';

interface HomePageProps {
  onNavigate?: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [visibleApproaches, setVisibleApproaches] = useState<boolean[]>([false, false, false]);
  const [visibleStats, setVisibleStats] = useState<boolean[]>([false, false, false]);
  const approachRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const approachObservers = approachRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleApproaches((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(ref);
      return observer;
    });

    const statsObservers = statsRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleStats((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      approachObservers.forEach((observer) => observer?.disconnect());
      statsObservers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const faqs = [
    {
      question: "What are wallet labels and why are they important?",
      answer: "Wallet labels are identifications assigned to cryptocurrency addresses that help identify the entity or organization controlling those addresses. They are crucial for compliance, risk management, and investigations in the blockchain space. Chainlabs provides defensible, audit-ready wallet labels that enable organizations to understand who they're transacting with and identify potential risks."
    },
    {
      question: "How many blockchains does Chainlabs support?",
      answer: "Chainlabs currently supports 25+ blockchain networks and continues to expand coverage. Our comprehensive dataset includes labels for major networks like Bitcoin, Ethereum, and other leading chains, ensuring you have the intelligence you need across the entire crypto ecosystem."
    },
    {
      question: "What makes Chainlabs' methodology defensible?",
      answer: "Our methodology combines human intelligence, advanced algorithms, and blockchain forensics. Every label we create includes documented provenance and evidence trails, making them audit-ready and suitable for regulatory compliance. We maintain rigorous validation processes to ensure the highest standards of accuracy and defensibility."
    },
    {
      question: "How often is the wallet label dataset updated?",
      answer: "We add 300+ new organizations to our dataset every month and regularly refresh our historical dataset."
    },
    {
      question: "Who uses Chainlabs' wallet intelligence?",
      answer: "90% of leading blockchain AML/KYC firms use Chainlabs. Our end users include compliance software providers, cryptocurrency exchanges, law enforcement agencies, and research institutions worldwide. We power critical compliance and investigation workflows for organizations that demand the highest quality intelligence."
    },
    {
      question: "How can I integrate Chainlabs data into my platform?",
      answer: "We provide flexible integration options including REST APIs and custom data pipelines."
    },
    {
      question: "What type of categories do you cover?",
      answer: "Our coverage includes essential categories like CeFi, darknet, mixers, and VPN/hosting with monthly updates. We also provide OTC, scams, exploits, DeFi, public entities, and illicit NFTs. In addition to these, we provide custom category creation, real-time updates, dedicated research teams, and extensive customization based on your needs."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div>
      <section className="relative max-w-7xl mx-auto px-6 lg:px-8 py-[100px]">
        <div className="lg:hidden absolute inset-0 opacity-10 pointer-events-none">
          <NetworkVisualization />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative z-10">
            <h1 className="text-5xl lg:text-7xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
              Web3 Wallet Labels You Can Trust
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Defensible, global coverage with audit-ready proof. Powering compliance, investigations, and research.
            </p>
            <button
              onClick={() => onNavigate?.('requestSample')}
              className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg inline-flex items-center gap-2"
            >
              Book a Consultation
              <ArrowRight size={20} />
            </button>
          </div>
          <div className="hidden lg:block h-[600px]">
            <NetworkVisualization />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <h2 className="text-2xl font-semibold text-[#001641] text-center mb-20" style={{ lineHeight: '110%' }}>
            Used by Industry Leaders
          </h2>

          <div className="mb-24 flex flex-col gap-12">
            <div className="flex justify-center items-center gap-16 flex-wrap">
              <img src="/coinbase white logo@3x.png" alt="Coinbase" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/santiment white logo@3x.png" alt="Santiment" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/lookintobitcoin white logo.png" alt="LookIntoBitcoin" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/scorechain logo@3x.png" alt="Scorechain" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
            </div>
            <div className="flex justify-center items-center gap-16 flex-wrap">
              <img src="/merkle white logo@3x.png" alt="Merkle" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/iknaio white logo@3x.png" alt="Iknaio" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/AML-bot-white-logo.png" alt="AML Bot" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
            </div>
            <div className="flex justify-center items-center gap-16 flex-wrap">
              <img src="/nansen-white.webp" alt="Nansen" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/OKLink logo.webp" alt="OKLink" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/ClovrLabs Logo.svg" alt="ClovrLabs" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pb-[100px]">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div
              ref={(el) => statsRefs.current[0] = el}
              className={`bg-white p-10 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center duration-700 ${
                visibleStats[0]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-5xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>4/4</div>
              <p className="text-gray-600 leading-relaxed">
                of the top 4 blockchain analytics firms use Chainlabs
              </p>
            </div>

            <div
              ref={(el) => statsRefs.current[1] = el}
              className={`bg-white p-10 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center duration-700 ${
                visibleStats[1]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-5xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>Global</div>
              <p className="text-gray-600 leading-relaxed">
                Our intelligence operative network spans the globe
              </p>
            </div>

            <div
              ref={(el) => statsRefs.current[2] = el}
              className={`bg-white p-10 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center duration-700 ${
                visibleStats[2]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-5xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>70+</div>
              <p className="text-gray-600 leading-relaxed">
                We labels over 70 different categories and are adding more
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-16 text-center" style={{ lineHeight: '110%' }}>
            Chainlabs in Numbers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
            <div className="text-center p-6">
              <div className="text-5xl lg:text-6xl font-semibold text-[#FFB800] mb-4">
                <CountUp end={308} suffix="M+" duration={2000} />
              </div>
              <p className="text-lg text-gray-600">
                BTC addresses labeled
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl lg:text-6xl font-semibold text-[#FFB800] mb-4">
                <CountUp end={18000} separator duration={2200} />
              </div>
              <p className="text-lg text-gray-600">
                Commercial entities in our database
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl lg:text-6xl font-semibold text-[#FFB800] mb-4">
                <CountUp end={800} suffix="+" duration={2100} />
              </div>
              <p className="text-lg text-gray-600">
                OTC desks
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl lg:text-6xl font-semibold text-[#FFB800] mb-4">
                <CountUp end={480} suffix="+" duration={2300} />
              </div>
              <p className="text-lg text-gray-600">
                Regional exchanges in our database
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl lg:text-6xl font-semibold text-[#FFB800] mb-4">
                <CountUp end={21} duration={1800} />
              </div>
              <p className="text-lg text-gray-600">
                Tokens covered
              </p>
            </div>

            <div className="text-center p-6">
              <div className="text-5xl lg:text-6xl font-semibold text-[#FFB800] mb-4">
                <CountUp end={300} suffix="+" duration={2400} />
              </div>
              <p className="text-lg text-gray-600">
                New entities labeled a month
              </p>
            </div>
          </div>

          <p className="text-2xl lg:text-3xl text-[#001641] text-center" style={{ lineHeight: '150%' }}>
            Every month we add <span className="bg-[#FFB800] px-2 py-1">300+ new organisations</span> that regularly transact on public blockchains and we develop algorithms to infer the address clusters that belong to these organisations. Each entity and each wallet tag comes with a screenshot which contains the URL, wallet address, and other information clearly identifying the entity.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
                Our Approach
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Chainlabs delivers defensible wallet intelligence through a rigorous methodology that combines human expertise with advanced technology. Our approach ensures every label meets the highest standards of accuracy and compliance.
              </p>
              <button
                onClick={() => onNavigate?.('requestSample')}
                className="bg-[#FF8A00] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#e67d00] transition-all inline-flex items-center gap-2"
              >
                Book a Consultation
              </button>
            </div>

            <div className="space-y-0">
              <div
                ref={(el) => approachRefs.current[0] = el}
                className={`border-t border-gray-300 pt-8 pb-8 transition-all duration-700 ${
                  visibleApproaches[0]
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8'
                }`}
              >
                <h3 className="text-3xl font-medium text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
                  Quality in. Quality out.
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Each label comes with accurate and complete metadata verified by Chainlabs Quality Control. Quality control runs to the core of our process and our promise to our customers. Your models are only as good as the data input.
                </p>
              </div>

              <div
                ref={(el) => approachRefs.current[1] = el}
                className={`border-t border-gray-300 pt-8 pb-8 transition-all duration-700 ${
                  visibleApproaches[1]
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8'
                }`}
              >
                <h3 className="text-3xl font-medium text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
                  Efficient, bespoke data ingestion
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our custom-built infrastructure enables rapid processing and integration of new data sources, keeping you ahead of emerging trends and entities.
                </p>
              </div>

              <div
                ref={(el) => approachRefs.current[2] = el}
                className={`border-t border-gray-300 pt-8 pb-8 border-b transition-all duration-700 ${
                  visibleApproaches[2]
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-8'
                }`}
              >
                <h3 className="text-3xl font-medium text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
                  A client centric approach
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your needs drive our innovation. We work closely with clients to understand requirements and deliver tailored solutions that exceed expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F5F6] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] text-center mb-4" style={{ lineHeight: '110%' }}>
            Insights
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Read all the latest news, thought leadership and research from Chainlabs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="p-6">
                <div className="text-sm text-[#FF8A00] font-semibold mb-2">RESEARCH</div>
                <h3 className="text-xl font-semibold text-[#001641] mb-3 group-hover:text-[#FF8A00] transition-colors" style={{ lineHeight: '110%' }}>
                  The State of Blockchain Intelligence in 2025
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  An in-depth analysis of emerging trends in wallet labeling and blockchain analytics.
                </p>
                <span className="text-[#001641] font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read more <ArrowRight size={16} />
                </span>
              </div>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="p-6">
                <div className="text-sm text-[#FF8A00] font-semibold mb-2">THOUGHT LEADERSHIP</div>
                <h3 className="text-xl font-semibold text-[#001641] mb-3 group-hover:text-[#FF8A00] transition-colors" style={{ lineHeight: '110%' }}>
                  Building Trust in Decentralized Systems
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  How accurate wallet labels are transforming compliance and risk management.
                </p>
                <span className="text-[#001641] font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read more <ArrowRight size={16} />
                </span>
              </div>
            </article>

            <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="p-6">
                <div className="text-sm text-[#FF8A00] font-semibold mb-2">NEWS</div>
                <h3 className="text-xl font-semibold text-[#001641] mb-3 group-hover:text-[#FF8A00] transition-colors" style={{ lineHeight: '110%' }}>
                  Chainlabs Expands Coverage to 25+ Blockchains
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  We're expanding our comprehensive labeling to support more blockchain networks.
                </p>
                <span className="text-[#001641] font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read more <ArrowRight size={16} />
                </span>
              </div>
            </article>
          </div>

          <div className="text-center">
            <button className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg inline-flex items-center gap-2">
              More Insights
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 pb-0">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-5xl lg:text-6xl font-bold text-[#001641] mb-16" style={{ lineHeight: '110%' }}>
            FAQs
          </h2>

          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between py-8 text-left hover:opacity-70 transition-opacity"
                >
                  <span className="text-2xl lg:text-3xl font-medium text-[#001641] pr-8" style={{ lineHeight: '120%' }}>
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openFaqIndex === index ? (
                      <Minus size={32} className="text-[#001641]" strokeWidth={2} />
                    ) : (
                      <Plus size={32} className="text-[#001641]" strokeWidth={2} />
                    )}
                  </div>
                </button>

                {openFaqIndex === index && (
                  <div className="pb-8 pr-12">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
