import { Check, ArrowRight } from 'lucide-react';

export default function SolutionsPage() {
  const tiers = [
    {
      name: 'Core',
      bestFor: 'Core compliance teams',
      coverage: 'Core CeFi, Darknet, Mixers, and VPN/Hosting categories...',
      updateFrequency: 'Monthly delta updates',
      customization: 'Limited (86h/month)',
      features: [
        'CeFi labels (exchanges, custodians)',
        'Darknet marketplaces',
        'Mixer services',
        'VPN/Hosting providers',
        'Monthly data updates',
        '86 hours per month of customization',
      ],
    },
    {
      name: 'Advanced',
      bestFor: 'Advanced risk and DeFi analysis',
      coverage: 'Core plus: OTC, Scams, Exploits, DeFi, Public Entities, Illicit NFTs',
      updateFrequency: 'Monthly delta updates',
      customization: 'Limited (86h/month)',
      features: [
        'All Core tier features',
        'OTC desks and brokers',
        'Scam and fraud operations',
        'Exploit and hack labels',
        'DeFi protocol labels',
        'Public entity wallets',
        'Illicit NFT collections',
        '86 hours per month of customization',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise custom',
      bestFor: 'Real time or emerging priorities',
      coverage: 'Advanced plus: Any category or region defined by the client',
      updateFrequency: 'Continuous during active briefs',
      customization: 'Extensive (>86h/month)',
      features: [
        'All Advanced tier features',
        'Custom category creation',
        'Region-specific targeting',
        'Continuous real-time updates',
        'Dedicated research team',
        'Priority brief handling',
        'Extensive customization (>86h/month)',
        'White-glove service',
      ],
    },
  ];

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl">
          <div className="text-sm font-semibold text-[#FF8A00] mb-4 uppercase tracking-wider">
            Dataset Access
          </div>
          <h1 className="text-5xl lg:text-6xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
            Access the Most Up-to-date and Defensible Wallet Label Dataset in Crypto.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our wallet label dataset is continuously updated with the latest entities and addresses.
            We employ a rigorous methodology combining human intelligence, advanced algorithms, and
            blockchain forensics to ensure every label is accurate, defensible, and audit-ready.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#001641] mb-4">
              Choose Your Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-2xl p-8 ${
                  tier.highlighted
                    ? 'border-2 border-[#FF8A00] shadow-xl scale-105'
                    : 'border border-gray-200 shadow-sm'
                } transition-all hover:shadow-lg`}
              >
                {tier.highlighted && (
                  <div className="bg-[#FF8A00] text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-3xl font-bold text-[#001641] mb-6">{tier.name}</h3>

                <div className="space-y-6 mb-8">
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">Best for</div>
                    <div className="text-gray-900">{tier.bestFor}</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">Coverage</div>
                    <div className="text-gray-900">{tier.coverage}</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">
                      Update frequency
                    </div>
                    <div className="text-gray-900">{tier.updateFrequency}</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-2">
                      New data customization
                    </div>
                    <div className="text-gray-900">{tier.customization}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-8">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="text-[#FF8A00] flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    tier.highlighted
                      ? 'bg-[#FF8A00] text-white hover:bg-[#e67d00]'
                      : 'bg-[#001641] text-white hover:bg-[#002a5c]'
                  }`}
                >
                  Request a sample
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 max-w-3xl mx-auto leading-relaxed">
            All tiers include access to our comprehensive documentation, API libraries, and
            compliance-ready audit trails. Enterprise customers receive dedicated support and
            custom integration assistance.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#001641] mb-6">
              Trusted by Compliance Leaders
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              Industry-leading compliance software providers and blockchain analytics firms rely
              on Chainlabs to power their investigations and risk assessment platforms.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our defensible methodology and comprehensive coverage enable you to meet regulatory
              requirements with confidence, backed by audit-ready documentation and provenance
              for every label.
            </p>
          </div>

          <div className="bg-gray-50 p-12 rounded-2xl">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#001641] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-[#001641]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#001641] mb-2">
                    Audit-Ready Documentation
                  </h3>
                  <p className="text-gray-600">
                    Every label includes provenance and evidence trails for regulatory compliance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#001641] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-[#001641]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#001641] mb-2">
                    Global Coverage
                  </h3>
                  <p className="text-gray-600">
                    Intelligence network spanning all major jurisdictions and time zones.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#001641] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-[#001641]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#001641] mb-2">
                    Continuous Updates
                  </h3>
                  <p className="text-gray-600">
                    250+ new entities added monthly, keeping you ahead of emerging risks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
