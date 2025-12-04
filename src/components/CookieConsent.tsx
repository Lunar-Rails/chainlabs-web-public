import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Cookie className="text-[#FF8A00]" size={24} />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#001641] mb-2">
              We Value Your Privacy
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              We use cookies to enhance your browsing experience, analyze site traffic, and provide
              personalized content. By clicking "Accept All", you consent to our use of cookies.
              You can manage your preferences or learn more in our{' '}
              <a href="/privacy-policy" className="text-[#FF8A00] hover:underline font-semibold">
                Privacy Policy
              </a>.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAccept}
                className="bg-[#FF8A00] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg"
              >
                Accept All
              </button>
              <button
                onClick={handleReject}
                className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Reject Non-Essential
              </button>
              <a
                href="/privacy-policy"
                className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center"
              >
                Learn More
              </a>
            </div>
          </div>

          <button
            onClick={handleReject}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close cookie banner"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
