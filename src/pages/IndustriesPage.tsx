import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

type Page = 'home' | 'company' | 'solutions' | 'industries' | 'insights' | 'requestSample' | 'privacy' | 'terms';

interface IndustriesPageProps {
  onNavigate?: (page: Page) => void;
}

export default function IndustriesPage({ onNavigate }: IndustriesPageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  return (
    <div>
      <section className="relative flex items-center justify-center overflow-hidden" style={{ height: '500px' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/nodes.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-semibold text-white mb-6" style={{ lineHeight: '110%' }}>
            Industries We Serve
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Chainlabs provides blockchain intelligence solutions tailored to the unique needs
            of compliance providers and law enforcement agencies worldwide.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="space-y-0">
          <div className="border-t border-gray-200">
            <button
              onClick={() => setExpandedSection(expandedSection === 'compliance' ? null : 'compliance')}
              className="w-full py-10 flex items-center justify-between group hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center gap-8">
                <span className="text-5xl lg:text-6xl font-bold text-[#FF8A00]">01</span>
                <h2 className="text-3xl lg:text-4xl font-semibold text-[#001641] text-left" style={{ lineHeight: '110%' }}>
                  Compliance Software Providers
                </h2>
              </div>
              <ChevronDown
                size={28}
                className={`text-[#001641] transition-transform duration-300 flex-shrink-0 ${
                  expandedSection === 'compliance' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedSection === 'compliance' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-12 px-2">
                <div className="text-xl font-semibold text-[#FF8A00] mb-6">
                  Power Your Platform with Trusted Intelligence
                </div>
                <div className="space-y-6 mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Integrate Chainlabs' comprehensive wallet label dataset directly into your
                    compliance and risk management platform. Our defensible methodology and
                    audit-ready documentation enable your customers to meet regulatory requirements
                    with confidence.
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed">
                    We provide flexible integration options, from REST APIs to custom data pipelines,
                    ensuring seamless incorporation into your existing infrastructure. Our labels
                    cover 25+ blockchains and are continuously updated with new entities and
                    emerging risk indicators.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      Comprehensive coverage of exchanges, mixers, and DeFi protocols
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      Real-time updates to stay ahead of emerging threats
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      Documented provenance for every label and cluster
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      Dedicated support and custom integration assistance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <button
              onClick={() => setExpandedSection(expandedSection === 'law-enforcement' ? null : 'law-enforcement')}
              className="w-full py-10 flex items-center justify-between group hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center gap-8">
                <span className="text-5xl lg:text-6xl font-bold text-[#FF8A00]">02</span>
                <h2 className="text-3xl lg:text-4xl font-semibold text-[#001641] text-left" style={{ lineHeight: '110%' }}>
                  Law Enforcement
                </h2>
              </div>
              <ChevronDown
                size={28}
                className={`text-[#001641] transition-transform duration-300 flex-shrink-0 ${
                  expandedSection === 'law-enforcement' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedSection === 'law-enforcement' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-12 px-2">
                <div className="text-xl font-semibold text-[#FF8A00] mb-6">
                  Investigate Crypto Crime with Confidence
                </div>
                <div className="space-y-6 mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Law enforcement agencies worldwide trust Chainlabs to support their investigations
                    into cryptocurrency-related crimes. Our wallet labels provide the critical
                    intelligence needed to trace illicit funds, identify bad actors, and build
                    prosecutable cases.
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed">
                    With coverage spanning 25+ blockchains and a global intelligence network operating
                    24/7, we help you stay ahead of sophisticated criminal operations. Our labels are
                    court-admissible and backed by comprehensive documentation of our methodology
                    and sources.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      Intelligence on ransomware groups, scam operations, and darknet markets
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      Court-admissible documentation and methodology transparency
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      Expert witness support and case consultation
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">
                      Secure data handling with strict confidentiality protocols
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-gray-200"></div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
              Validated by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              90% of leading blockchain AML/KYC firms and all top 4 blockchain analytics companies
              rely on Chainlabs for their wallet intelligence needs. Our data powers critical
              compliance and investigation workflows at institutions worldwide.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-12">
              Join the growing network of organizations that trust Chainlabs to deliver accurate,
              defensible, and timely blockchain intelligence. Whether you're building compliance
              tools or investigating financial crimes, we provide the foundation you need to
              succeed.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="text-4xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>250+</div>
                <p className="text-gray-600">
                  New entities added monthly
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="text-4xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>25+</div>
                <p className="text-gray-600">
                  Blockchain networks covered
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="text-4xl font-semibold text-[#001641] mb-3" style={{ lineHeight: '110%' }}>24/7</div>
                <p className="text-gray-600">
                  Global intelligence network
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="bg-[#001641] rounded-3xl p-12 lg:p-16 text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6" style={{ lineHeight: '110%' }}>
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Request a sample of our wallet label dataset and see the Chainlabs difference
            for yourself. No commitment required.
          </p>
          <button
            onClick={() => onNavigate?.('requestSample')}
            className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg inline-flex items-center gap-2"
          >
            Request a sample
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
