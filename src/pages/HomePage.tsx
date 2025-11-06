import { useState } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { DataVisualizationChart, HexagonalDiagram } from '../components/LineArt';
import NetworkVisualization from '../components/NetworkVisualization';
import CoverageMap from '../components/CoverageMap';

type Page = 'home' | 'company' | 'solutions' | 'industries' | 'insights' | 'requestSample';

interface HomePageProps {
  onNavigate?: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
      answer: "We add 250+ new organizations to our dataset every month. Update frequency varies by tier: Core and Advanced tiers receive monthly delta updates, while Enterprise customers can receive continuous real-time updates during active briefs. Our global intelligence network operates 24/7 to identify emerging entities and risks."
    },
    {
      question: "Who uses Chainlabs' wallet intelligence?",
      answer: "90% of leading blockchain AML/KYC firms and all top 4 blockchain analytics companies use Chainlabs. Our clients include compliance software providers, cryptocurrency exchanges, law enforcement agencies, and research institutions worldwide. We power critical compliance and investigation workflows for organizations that demand the highest quality intelligence."
    },
    {
      question: "What types of entities does Chainlabs label?",
      answer: "Our coverage includes centralized exchanges (CeFi), darknet marketplaces, mixer services, VPN/hosting providers, OTC desks, scam operations, exploit addresses, DeFi protocols, public entity wallets, and illicit NFT collections. The specific categories available depend on your subscription tier, with Enterprise customers able to request custom categories."
    },
    {
      question: "How can I integrate Chainlabs data into my platform?",
      answer: "We provide flexible integration options including REST APIs, custom data pipelines, and direct database access. All tiers include comprehensive documentation and API libraries. Enterprise customers receive dedicated support and custom integration assistance to ensure seamless incorporation into your existing infrastructure."
    },
    {
      question: "What is the difference between the Core, Advanced, and Enterprise tiers?",
      answer: "The Core tier includes essential categories like CeFi, darknet, mixers, and VPN/hosting with monthly updates. Advanced adds OTC, scams, exploits, DeFi, public entities, and illicit NFTs. Enterprise provides all Advanced features plus custom category creation, real-time updates, dedicated research teams, and extensive customization (>86 hours/month). Each tier is designed for specific use cases and organizational needs."
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
              Request a sample
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
              <img src="/elementus-white.png" alt="Elementus" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/lookintobitcoin white logo.png" alt="LookIntoBitcoin" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/santiment white logo@3x.png" alt="Santiment" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/trm white logo@3x.png" alt="TRM" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
            </div>
            <div className="flex justify-center items-center gap-16 flex-wrap">
              <img src="/scorechain logo@3x.png" alt="Scorechain" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/upsalla white logo@3x.png" alt="Upsalla" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/merkle white logo@3x.png" alt="Merkle" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/iknaio white logo@3x.png" alt="Iknaio" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pb-[100px]">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white p-10 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
              <div className="text-5xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>4/4</div>
              <p className="text-gray-600 leading-relaxed">
                of the top 4 blockchain analytics firms use Chainlabs
              </p>
            </div>

            <div className="bg-white p-10 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
              <div className="text-5xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>Global</div>
              <p className="text-gray-600 leading-relaxed">
                Our intelligence operative network spans the globe, 24/7
              </p>
            </div>

            <div className="bg-white p-10 rounded-xl border border-gray-200 hover:shadow-lg transition-all text-center">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
            <div className="text-left">
              <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
                Our Data
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Chainlabs' tracer network spans 52 countries, ensuring access to exchanges and services that require local KYC and in-country resources.
              </p>
            </div>

            <div>
              <CoverageMap />
            </div>
          </div>

          <p className="text-2xl lg:text-3xl text-[#001641] text-center" style={{ lineHeight: '150%' }}>
            Every month we add <span className="bg-[#FFB800] px-2 py-1">250+ new organisations</span> that regularly transact on public blockchains and we develop algorithms to infer the address clusters that belong to these organisations. Each entity and each wallet tag comes with a screenshot which contains the URL, wallet address, and other information clearly identifying the entity.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] text-center mb-16" style={{ lineHeight: '110%' }}>
            Our Approach
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-white">
                <img
                  src="/Abstract - 4.png"
                  alt="Quality in. Quality out."
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
                  Quality in. Quality out.
                </h3>
                <p className="text-gray-600 leading-relaxed">
                 Each label comes with accurate and complete metadata verified by Chainlabs Quality Control.. Quality control runs to the core of our process and our promise to our customers. Your models are only as good as the data input.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-white">
                <img
                  src="/Abstract - 1.png"
                  alt="Efficient, bespoke data ingestion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
                  Efficient, bespoke data ingestion
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our custom-built infrastructure enables rapid processing and integration of new data sources, keeping you ahead of emerging trends and entities.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-white">
                <img
                  src="/Abstract - 5.png"
                  alt="A client centric approach"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
                  A client centric approach
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your needs drive our innovation. We work closely with clients to understand requirements and deliver tailored solutions that exceed expectations.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate?.('requestSample')}
              className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg inline-flex items-center gap-2"
            >
              Request a sample
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] text-center mb-4" style={{ lineHeight: '110%' }}>
          Insights
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16">
          Read all the latest news, thought leadership and research from Chainlabs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <article className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-[#001641] to-[#003982]"></div>
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
            <div className="h-48 bg-gradient-to-br from-[#001641] to-[#003982]"></div>
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
            <div className="h-48 bg-gradient-to-br from-[#001641] to-[#003982]"></div>
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
