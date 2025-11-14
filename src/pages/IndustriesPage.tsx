import { ArrowRight } from 'lucide-react';

type Page = 'home' | 'company' | 'solutions' | 'industries' | 'insights' | 'requestSample' | 'privacy' | 'terms';

interface IndustriesPageProps {
  onNavigate?: (page: Page) => void;
}

export default function IndustriesPage({ onNavigate }: IndustriesPageProps) {
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

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="bg-[#001641] p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8A00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-2 bg-[#FF8A00]/20 rounded-full mb-6">
                <span className="text-[#FF8A00] text-sm font-semibold uppercase tracking-wide">
                  For Compliance Providers
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6" style={{ lineHeight: '110%' }}>
                Compliance Software Providers
              </h2>
              <div className="text-xl font-semibold text-[#FF8A00] mb-8">
                Power Your Platform with Trusted Intelligence
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Integrate Chainlabs' comprehensive wallet label dataset directly into your
                compliance and risk management platform. Our defensible methodology and
                audit-ready documentation enable your customers to meet regulatory requirements
                with confidence.
              </p>
              <p className="text-base text-gray-400 leading-relaxed mb-8">
                We provide flexible integration options, from REST APIs to custom data pipelines,
                ensuring seamless incorporation into your existing infrastructure. Our labels
                cover 25+ blockchains and are continuously updated with new entities and
                emerging risk indicators.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Comprehensive coverage of exchanges, mixers, and DeFi protocols
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Real-time updates to stay ahead of emerging threats
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Documented provenance for every label and cluster
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    Dedicated support and custom integration assistance
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tl from-[#001641]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-block px-4 py-2 bg-[#001641]/10 rounded-full mb-6">
                <span className="text-[#001641] text-sm font-semibold uppercase tracking-wide">
                  For Law Enforcement
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
                Law Enforcement
              </h2>
              <div className="text-xl font-semibold text-[#FF8A00] mb-8">
                Investigate Crypto Crime with Confidence
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Law enforcement agencies worldwide trust Chainlabs to support their investigations
                into cryptocurrency-related crimes. Our wallet labels provide the critical
                intelligence needed to trace illicit funds, identify bad actors, and build
                prosecutable cases.
              </p>
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                With coverage spanning 25+ blockchains and a global intelligence network operating
                24/7, we help you stay ahead of sophisticated criminal operations. Our labels are
                court-admissible and backed by comprehensive documentation of our methodology
                and sources.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Intelligence on ransomware groups, scam operations, and darknet markets
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Court-admissible documentation and methodology transparency
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Expert witness support and case consultation
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Secure data handling with strict confidentiality protocols
                  </span>
                </div>
              </div>
            </div>
          </div>
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
