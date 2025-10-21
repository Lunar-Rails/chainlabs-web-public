export default function Footer() {
  const footerLinks = [
    { label: 'The Company', href: '#' },
    { label: 'Solutions', href: '#' },
    { label: 'Industries', href: '#' },
    { label: 'Insights', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src="/CL logo 2.svg" alt="Chainlabs" className="h-8 mb-4" />
            <p className="text-sm text-gray-600 mb-4">
              Blockchain Intelligence & Wallet Labeling
            </p>
            <p className="text-sm text-gray-500">
              123 Blockchain Avenue<br />
              San Francisco, CA 94102<br />
              United States
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#001641] mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#001641] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Chainlabs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-[#001641] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-[#001641] transition-colors">
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
