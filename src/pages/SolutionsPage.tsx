import { Check, Building2, CreditCard, ShieldAlert, AlertTriangle, Ban } from 'lucide-react';

export default function SolutionsPage() {
  const categories = [
    {
      icon: Building2,
      title: 'OTC, Exchanges & VASPs',
    },
    {
      icon: CreditCard,
      title: 'Gambling, Merchant and ATM',
    },
    {
      icon: ShieldAlert,
      title: 'Darknet Markets, Mixers',
    },
    {
      icon: AlertTriangle,
      title: 'Malware, Scam & Ransomware',
    },
    {
      icon: Ban,
      title: 'Sanction list: Terrorism Financing, CSAM, and more.',
    },
  ];

  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl">
          <div className="text-sm font-semibold text-[#FF8A00] mb-4 uppercase tracking-wider">
            Dataset Access
          </div>
          <h1 className="text-5xl lg:text-6xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
            Access the Most Up-to-date and Defensible Wallet Label Dataset in Crypto.
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Since 2019 we have developed a proven wallet label database which is continuously updated with new entities and maintained to ensure our data remains fresh and relevant. Chainlabs provides the widest, industry leading coverage and our excellent customer satisfaction rates are testament to the quality and reliability of our data. We can provide seed labels as well as advanced post-clustered labels, per our customer needs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-[#FF8A00] group"
                >
                  <div className="w-16 h-16 bg-[#001641] bg-opacity-5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF8A00] group-hover:bg-opacity-10 transition-colors">
                    <Icon className="text-[#001641] group-hover:text-[#FF8A00] transition-colors" size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#001641] leading-tight" style={{ lineHeight: '120%' }}>
                    {category.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
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

          <div className="bg-white p-12 rounded-2xl">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#001641] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-[#001641]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>
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
                  <h3 className="text-xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>
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
                  <h3 className="text-xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>
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
