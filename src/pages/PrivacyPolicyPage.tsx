export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <h1 className="text-5xl lg:text-6xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
          Privacy Policy
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
              Chainlabs Pte. Ltd. ("Chainlabs", "we", "us", or "our") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website or use our blockchain intelligence services.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are registered in Singapore at 160 Robinson Road, 14-04 SBF Center, 068914, Singapore, and our
              operations are subject to the Personal Data Protection Act 2012 (PDPA) of Singapore.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-[#001641] mb-3 mt-6">Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Request a sample of our data</li>
              <li>Contact us for support or inquiries</li>
              <li>Subscribe to our newsletter or updates</li>
              <li>Register for an account or service</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              This information may include: name, email address, company name, job title, phone number,
              and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-[#001641] mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>IP address and general location information</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>To provide, operate, and maintain our services</li>
              <li>To respond to your inquiries and fulfill your requests</li>
              <li>To send you technical notices, updates, and support messages</li>
              <li>To provide customer service and support</li>
              <li>To improve our website and services</li>
              <li>To analyze usage trends and preferences</li>
              <li>To detect, prevent, and address technical issues or fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              4. How We Share Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service</li>
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid legal requests</li>
              <li><strong>Protection of Rights:</strong> We may disclose information to protect our rights, property, or safety, or that of our users or others</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              5. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication procedures</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              However, no method of transmission over the internet or electronic storage is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              6. Your Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under Singapore's PDPA and other applicable laws, you have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Access:</strong> You have the right to request access to the personal information we hold about you</li>
              <li><strong>Correction:</strong> You have the right to request correction of inaccurate or incomplete information</li>
              <li><strong>Withdrawal of Consent:</strong> You may withdraw your consent for us to collect, use, or disclose your personal information</li>
              <li><strong>Data Portability:</strong> You may request a copy of your personal information in a structured format</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              To exercise these rights, please contact us at the email address provided below.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              7. Data Retention
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in
              this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer
              need your personal information, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              8. International Data Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than Singapore. We ensure that
              appropriate safeguards are in place to protect your personal information in accordance with this Privacy
              Policy and applicable data protection laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              9. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to collect information about your browsing activities.
              You can control cookies through your browser settings. However, disabling cookies may affect your ability
              to use certain features of our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              10. Children's Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
              information from children. If you believe we have collected information from a child, please contact us
              immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by
              posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use
              of our services after such changes constitutes your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '120%' }}>
              12. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
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
