export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <h1 className="text-5xl lg:text-6xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
          Terms and Conditions
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms and Conditions ("Terms") govern your access to and use of the Chainlabs website and services
              provided by Chainlabs Pte. Ltd. ("Chainlabs", "we", "us", or "our"), a company registered in Singapore
              at 160 Robinson Road, 14-04 SBF Center, 068914, Singapore.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part
              of these Terms, you may not access our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              2. Services Description
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chainlabs provides blockchain intelligence and wallet labeling services, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Comprehensive wallet label datasets covering multiple blockchain networks</li>
              <li>Real-time blockchain entity identification and risk assessment</li>
              <li>API access and data integration services</li>
              <li>Intelligence reporting and analysis</li>
              <li>Consultation services for compliance and law enforcement</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              The specific services provided to you will be outlined in a separate service agreement.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              3. Account Registration and Access
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To access certain features of our services, you may be required to register an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              4. Acceptable Use
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Use our services in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt the integrity or performance of our services</li>
              <li>Reverse engineer, decompile, or disassemble any part of our services</li>
              <li>Use our data for purposes other than those specified in your service agreement</li>
              <li>Resell, redistribute, or sublicense our data without explicit authorization</li>
              <li>Use automated means to access our services without permission</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              5. Intellectual Property Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content, data, trademarks, and other intellectual property on our website and in our services are
              owned by or licensed to Chainlabs. This includes but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Wallet label datasets and classifications</li>
              <li>Analysis methodologies and algorithms</li>
              <li>Software, APIs, and technical documentation</li>
              <li>Reports, graphics, and visual content</li>
              <li>Trademarks, logos, and branding materials</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Subject to these Terms and your service agreement, we grant you a limited, non-exclusive, non-transferable
              license to access and use our services for their intended purpose.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              6. Data Accuracy and Limitations
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we strive to provide accurate and up-to-date blockchain intelligence, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Blockchain data is complex and constantly evolving</li>
              <li>Our labels and classifications are based on available information and analysis</li>
              <li>We make no guarantees about the completeness or accuracy of any specific data point</li>
              <li>You should conduct your own verification and due diligence</li>
              <li>Our services are intended to supplement, not replace, your own analysis and decision-making</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              7. Confidentiality
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Both parties agree to maintain the confidentiality of any proprietary or confidential information
              disclosed during the course of the business relationship. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Technical specifications and methodologies</li>
              <li>Pricing and commercial terms</li>
              <li>Business strategies and plans</li>
              <li>Customer information and usage data</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              8. Payment Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you purchase services from Chainlabs:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Payment terms will be specified in your service agreement</li>
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>We reserve the right to modify our pricing with reasonable notice</li>
              <li>Late payments may result in service suspension or termination</li>
              <li>You are responsible for all applicable taxes</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              9. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by applicable law:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Our services are provided "as is" without warranties of any kind</li>
              <li>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Our total liability shall not exceed the fees paid by you in the 12 months preceding the claim</li>
              <li>We are not responsible for losses resulting from your use or inability to use our services</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              10. Indemnification
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify and hold Chainlabs harmless from any claims, damages, losses, liabilities, and
              expenses arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Your violation of these Terms</li>
              <li>Your use of our services</li>
              <li>Your violation of any rights of another party</li>
              <li>Any content or information you provide to us</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              11. Term and Termination
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms remain in effect until terminated by either party. We may terminate or suspend your access
              immediately, without prior notice, if you breach these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Upon termination:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Your right to use our services immediately ceases</li>
              <li>You must cease all use of our data and materials</li>
              <li>Provisions regarding confidentiality, intellectual property, and liability survive termination</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              12. Governing Law and Dispute Resolution
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Singapore, without regard
              to its conflict of law provisions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any disputes arising from these Terms shall be resolved through good faith negotiations. If negotiations
              fail, disputes shall be submitted to arbitration in Singapore in accordance with the Arbitration Rules
              of the Singapore International Arbitration Centre.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              13. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify these Terms at any time. We will provide notice of material changes by
              posting the updated Terms on our website and updating the "Last updated" date.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your continued use of our services after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              14. Miscellaneous
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining
              provisions will continue in full force and effect.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Waiver:</strong> No waiver of any term shall be deemed a further or continuing waiver of such term
              or any other term.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Chainlabs
              regarding the use of our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              15. Contact Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Chainlabs Pte. Ltd.</strong></p>
              <p className="text-gray-700 mb-2">160 Robinson Road</p>
              <p className="text-gray-700 mb-2">14-04 SBF Center</p>
              <p className="text-gray-700 mb-2">068914, Singapore</p>
              <p className="text-gray-700 mb-2">Phone: <a href="tel:+16282369769" className="text-[#FF8A00] hover:underline">+1 (628) 236-9769</a></p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
