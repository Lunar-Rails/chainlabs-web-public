import { useState, FormEvent, ChangeEvent } from 'react';
import { supabase } from '../lib/supabase';
import { analytics } from '../lib/analytics';

interface FormData {
  name: string;
  email: string;
  contactNumber: string;
  companyName: string;
  message: string;
  consentGiven: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    contactNumber: '',
    companyName: '',
    message: '',
    consentGiven: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }

    if (!formData.consentGiven) {
      newErrors.consentGiven = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const { error } = await supabase.from('demo_requests').insert([
        {
          first_name: formData.name.split(' ')[0] || formData.name,
          last_name: formData.name.split(' ').slice(1).join(' ') || '',
          business_email: formData.email,
          company_name: formData.companyName || null,
          phone_number: formData.contactNumber,
          organization_type: null,
          country: null,
          solution_of_interest: null,
          referral_source: null,
          custom_message: formData.message || null,
          consent_given: formData.consentGiven,
        },
      ]);

      if (error) throw error;

      analytics.formSubmit('contact_form', {
        has_company: !!formData.companyName,
        has_message: !!formData.message,
      });

      analytics.lead({});

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        contactNumber: '',
        companyName: '',
        message: '',
        consentGiven: false,
      });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl font-semibold text-[#001641] mb-4" style={{ lineHeight: '110%' }}>
              Thank You for Your Interest!
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We've received your message and our team will be in touch shortly.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Blue Gradient Banner */}
      <div className="relative bg-gradient-to-br from-[#001641] via-[#002255] to-[#003388] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-semibold text-white mb-6" style={{ lineHeight: '110%' }}>
            Ready to see what blockchain solution is right for you?
          </h1>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
          <h2 className="text-3xl font-semibold text-[#001641] mb-8 text-center" style={{ lineHeight: '110%' }}>
            Contact Us
          </h2>

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border ${
                  errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all`}
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
              )}
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all resize-none"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consentGiven"
                name="consentGiven"
                checked={formData.consentGiven}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-[#FF8A00] border-gray-300 rounded focus:ring-[#FF8A00]"
              />
              <label htmlFor="consentGiven" className="text-sm text-gray-600 leading-relaxed">
                By checking this box, you indicate that you'd like us to send you information on Chainlabs
                products, services, events, and news. Your personal data will be handled in accordance with the{' '}
                <a href="#" className="text-[#FF8A00] hover:underline">
                  Chainlabs privacy policy
                </a>
                .
              </label>
            </div>
            {errors.consentGiven && (
              <p className="text-red-500 text-xs -mt-4">{errors.consentGiven}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
