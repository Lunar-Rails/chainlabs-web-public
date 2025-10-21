import { Linkedin, Youtube, Send } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    { label: 'The Company', href: '#' },
    { label: 'Solutions', href: '#' },
    { label: 'Industries', href: '#' },
    { label: 'Insights', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <footer className="bg-[#001641] mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-[#FF8A00]"></div>
                <div className="w-2 h-2 rounded-full bg-[#FF8A00]"></div>
                <div className="w-2 h-2 rounded-full bg-[#FF8A00]"></div>
              </div>
              <span className="text-white text-xl font-semibold">chainlabs</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Blockchain Intelligence & Wallet Labeling
            </p>
            <div className="text-sm text-gray-400 mb-6">
              123 Blockchain Avenue<br />
              San Francisco, CA 94102<br />
              United States
            </div>

            <div className="flex gap-4">
              <a
                href="https://t.me/chainlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Telegram"
              >
                <Send size={18} className="text-white" />
              </a>
              <a
                href="https://linkedin.com/company/chainlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="text-white" />
              </a>
              <a
                href="https://youtube.com/@chainlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Compliance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Certifications & Compliance</h4>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-white font-semibold text-lg mb-1">ISO 27001</div>
                <div className="text-gray-400 text-xs">Certified</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-white font-semibold text-lg mb-1">SOC 2</div>
                <div className="text-gray-400 text-xs">Type II</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-white font-semibold text-lg mb-1">GDPR</div>
                <div className="text-gray-400 text-xs">Compliant</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} Chainlabs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
