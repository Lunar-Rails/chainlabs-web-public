import { useState, FormEvent, ChangeEvent } from 'react';
import { supabase } from '../lib/supabase';

interface FormData {
  firstName: string;
  lastName: string;
  businessEmail: string;
  companyName: string;
  phoneNumber: string;
  organizationType: string;
  country: string;
  solutionOfInterest: string;
  referralSource: string;
  customMessage: string;
  consentGiven: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function RequestSamplePage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    businessEmail: '',
    companyName: '',
    phoneNumber: '',
    organizationType: '',
    country: '',
    solutionOfInterest: '',
    referralSource: '',
    customMessage: '',
    consentGiven: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const organizationTypes = [
    'Financial Institution',
    'Blockchain Analytics',
    'Compliance Software',
    'Law Enforcement',
    'Cryptocurrency Exchange',
    'Research Institution',
    'DeFi Protocol',
    'Investment Fund',
    'Payment Processor',
    'Other',
  ];

  const countries = [
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Singapore',
    'Switzerland',
    'Japan',
    'South Korea',
    'Netherlands',
    'Sweden',
    'Ireland',
    'Hong Kong',
    'United Arab Emirates',
    'Other',
  ];

  const solutions = [
    'Core Tier - Essential Labels',
    'Advanced Tier - Comprehensive Coverage',
    'Enterprise Solution - Custom Intelligence',
    'Compliance Tools',
    'Investigation Platform',
    'Custom Integration',
    'Not Sure Yet',
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required';
    } else if (!validateEmail(formData.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid email address';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.consentGiven) {
      newErrors.consentGiven = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
          first_name: formData.firstName,
          last_name: formData.lastName,
          business_email: formData.businessEmail,
          company_name: formData.companyName,
          phone_number: formData.phoneNumber,
          organization_type: formData.organizationType || null,
          country: formData.country || null,
          solution_of_interest: formData.solutionOfInterest || null,
          referral_source: formData.referralSource || null,
          custom_message: formData.customMessage || null,
          consent_given: formData.consentGiven,
        },
      ]);

      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        businessEmail: '',
        companyName: '',
        phoneNumber: '',
        organizationType: '',
        country: '',
        solutionOfInterest: '',
        referralSource: '',
        customMessage: '',
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-6">
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
              We've received your request and our team will be in touch shortly to provide you with a sample of our blockchain wallet label intelligence.
            </p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-8" style={{ lineHeight: '110%' }}>
              Ready to see what blockchain solution is right for you?
            </h1>

            <ul className="space-y-6 mb-12">
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#001641] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Bring clarity to blockchain data and action on insights
                </p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#001641] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Manage crypto investigations, risk and business growth at scale
                </p>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#001641] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Get hands-on training with our crypto experts
                </p>
              </li>
            </ul>

            <div className="flex items-center gap-8 flex-wrap opacity-40 grayscale">
              <img src="/coinbase white logo@3x.png" alt="Coinbase" className="h-8 object-contain" style={{ filter: 'brightness(0)' }} />
              <img src="/trm white logo@3x.png" alt="TRM" className="h-8 object-contain" style={{ filter: 'brightness(0)' }} />
              <img src="/merkle white logo@3x.png" alt="Merkle" className="h-8 object-contain" style={{ filter: 'brightness(0)' }} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
            <h2 className="text-2xl font-semibold text-[#001641] mb-8" style={{ lineHeight: '110%' }}>
              Request a demo
            </h2>

            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Email Address *
                  </label>
                  <input
                    type="email"
                    id="businessEmail"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      errors.businessEmail ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all`}
                  />
                  {errors.businessEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.businessEmail}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      errors.companyName ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all`}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Type *
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1.25rem',
                    }}
                  >
                    <option value="">Select...</option>
                    {organizationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.25rem',
                  }}
                >
                  <option value="">Select...</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="solutionOfInterest" className="block text-sm font-medium text-gray-700 mb-2">
                  Solution of Interest *
                </label>
                <select
                  id="solutionOfInterest"
                  name="solutionOfInterest"
                  value={formData.solutionOfInterest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.25rem',
                  }}
                >
                  <option value="">Select...</option>
                  {solutions.map((solution) => (
                    <option key={solution} value={solution}>
                      {solution}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about us? *
                </label>
                <textarea
                  id="referralSource"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all resize-none"
                />
              </div>

              <div>
                <label htmlFor="customMessage" className="block text-sm font-medium text-gray-700 mb-2">
                  Help us customize your demo—tell us about your team and goals with Chainalysis. *
                </label>
                <textarea
                  id="customMessage"
                  name="customMessage"
                  value={formData.customMessage}
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
                  By checking this box, you indicate that you'd like us to send you information on Chainalysis
                  products, services, events, and news. Your personal data will be handled in accordance with the{' '}
                  <a href="#" className="text-[#FF8A00] hover:underline">
                    Chainalysis privacy policy
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
    </div>
  );
}
