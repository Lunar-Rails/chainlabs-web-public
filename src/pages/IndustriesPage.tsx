import { ArrowRight } from 'lucide-react';
import { ComplianceIcon, LawEnforcementIcon } from '../components/LineArt';

export default function IndustriesPage() {
  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <h1 className="text-5xl lg:text-6xl font-semibold text-[#001641] text-center mb-6" style={{ lineHeight: '110%' }}>
          Industries We Serve
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-20 leading-relaxed">
          Chainlabs provides blockchain intelligence solutions tailored to the unique needs
          of compliance providers and law enforcement agencies worldwide.
        </p>

        <div className="space-y-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
                Compliance Software Providers
              </h2>
              <div className="text-lg font-semibold text-[#FF8A00] mb-6">
                Power Your Platform with Trusted Intelligence
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Integrate Chainlabs' comprehensive wallet label dataset directly into your
                compliance and risk management platform. Our defensible methodology and
                audit-ready documentation enable your customers to meet regulatory requirements
                with confidence.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We provide flexible integration options, from REST APIs to custom data pipelines,
                ensuring seamless incorporation into your existing infrastructure. Our labels
                cover 25+ blockchains and are continuously updated with new entities and
                emerging risk indicators.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF8A00] rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Comprehensive coverage of exchanges, mixers, and DeFi protocols
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF8A00] rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Real-time updates to stay ahead of emerging threats
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF8A00] rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Documented provenance for every label and cluster
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF8A00] rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Dedicated support and custom integration assistance
                  </span>
                </li>
              </ul>
              <button className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg inline-flex items-center gap-2">
                Request a sample
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="bg-gray-50 p-12 rounded-2xl">
              <ComplianceIcon />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 bg-gray-50 p-12 rounded-2xl">
              <LawEnforcementIcon />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
                Law Enforcement
              </h2>
              <div className="text-lg font-semibold text-[#FF8A00] mb-6">
                Investigate Crypto Crime with Confidence
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Law enforcement agencies worldwide trust Chainlabs to support their investigations
                into cryptocurrency-related crimes. Our wallet labels provide the critical
                intelligence needed to trace illicit funds, identify bad actors, and build
                prosecutable cases.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                With coverage spanning 25+ blockchains and a global intelligence network operating
                24/7, we help you stay ahead of sophisticated criminal operations. Our labels are
                court-admissible and backed by comprehensive documentation of our methodology
                and sources.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF8A00] rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Intelligence on ransomware groups, scam operations, and darknet markets
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF8A00] rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Court-admissible documentation and methodology transparency
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF8A00] rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Expert witness support and case consultation
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#FF8A00] rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Secure data handling with strict confidentiality protocols
                  </span>
                </li>
              </ul>
              <button className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg inline-flex items-center gap-2">
                Contact our team
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 lg:py-32">
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
          <button className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg inline-flex items-center gap-2">
            Request a sample
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
