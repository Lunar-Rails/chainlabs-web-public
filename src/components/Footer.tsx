import { Linkedin, Youtube, Send, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    { label: 'Solutions', href: '#' },
    { label: 'Industries', href: '#' },
    { label: 'Insights', href: '#' },
    { label: 'Company', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <footer className="bg-[#001641]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src="/Cl Logo 2 Inverted.svg" alt="Chainlabs" className="h-8" />
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Blockchain Intelligence & Wallet Labeling
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+14155551234" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +1 (415) 555-1234
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  160 Robinson Road<br />
                  14-04 SBF Center,<br />
                  068914, Singapore
                </div>
              </div>
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
            <ul className="space-y-3 mb-6">
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
            </ul>

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
