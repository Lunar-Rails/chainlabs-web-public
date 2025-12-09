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
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <div className="text-sm font-semibold text-[#FF8A00] mb-4 uppercase tracking-wider">
                Dataset Access
              </div>
              <h1 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
                Access the Most Up-to-date and Defensible Wallet Label Dataset in Crypto.
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Since 2019 we have developed a proven wallet label database which is continuously updated with new entities and maintained to ensure our data remains fresh and relevant. Chainlabs provides the widest, industry leading coverage and our excellent customer satisfaction rates are testament to the quality and reliability of our data. We can provide seed labels as well as advanced post-clustered labels, per our customer needs.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.title}
                    className={`bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all hover:border-[#FF8A00] hover:-translate-y-1 group ${
                      index === categories.length - 1 && categories.length % 2 !== 0 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#001641] bg-opacity-5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF8A00] group-hover:bg-opacity-10 transition-colors">
                        <Icon className="text-[#001641] group-hover:text-[#FF8A00] transition-colors" size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-base font-semibold text-[#001641] leading-tight pt-2" style={{ lineHeight: '120%' }}>
                        {category.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
              Trusted by Compliance Leaders
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Industry-leading compliance software providers and blockchain analytics firms rely
              on Chainlabs to power their investigations and risk assessment platforms.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              Our defensible methodology and comprehensive coverage enable you to meet regulatory
              requirements with confidence, backed by audit-ready documentation and provenance
              for every label.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-8 lg:p-10 rounded-2xl shadow-sm">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF8A00] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-[#FF8A00]" size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#001641] mb-1" style={{ lineHeight: '110%' }}>
                    Audit-Ready Documentation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Every label includes provenance and evidence trails for regulatory compliance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF8A00] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-[#FF8A00]" size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#001641] mb-1" style={{ lineHeight: '110%' }}>
                    Global Coverage
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Intelligence network spanning all major jurisdictions and time zones.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#FF8A00] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="text-[#FF8A00]" size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#001641] mb-1" style={{ lineHeight: '110%' }}>
                    Continuous Updates
                  </h3>
                  <p className="text-gray-600 text-sm">
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
