import { useState, useEffect } from 'react';
import { ArrowRight, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin_url: string | null;
  display_order: number;
}

interface AffiliatedCompany {
  id: string;
  name: string;
  logo_url: string;
  display_order: number;
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function CompanyPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [affiliatedCompanies, setAffiliatedCompanies] = useState<AffiliatedCompany[]>([]);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchTeamMembers();
    fetchAffiliatedCompanies();
  }, []);

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setTeamMembers(data);
    }
  };

  const fetchAffiliatedCompanies = async () => {
    const { data, error } = await supabase
      .from('affiliated_companies')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setAffiliatedCompanies(data);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const { error } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    if (error) {
      setSubmitStatus('error');
    } else {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white">
      <section className="bg-[#001641] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-5xl lg:text-7xl font-semibold text-white mb-6 text-center" style={{ lineHeight: '110%' }}>
            Building Trust in<br />Blockchain Intelligence
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
            We're a dedicated team of blockchain analysts, data scientists, and intelligence professionals committed to making the decentralized world more transparent and secure.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
              About Chainlabs
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2018, Chainlabs emerged from a simple observation: the blockchain ecosystem needed reliable, defensible wallet labels to enable compliance and investigation work. What started as a small research project has grown into the industry's most trusted source of blockchain intelligence.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Today, we power critical operations for 90% of leading blockchain analytics firms, major exchanges, and regulatory bodies worldwide. Our intelligence network operates 24/7 across the globe, identifying and labeling over 250 new organizations every month.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe in quality over quantity, transparency over opacity, and collaboration over competition. Our mission is to make blockchain technology safer and more accessible for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="text-4xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>2018</div>
              <p className="text-gray-600 leading-relaxed">Founded</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="text-4xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>4/4</div>
              <p className="text-gray-600 leading-relaxed">of the top 4 blockchain analytics firms use Chainlabs</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="text-4xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>Global</div>
              <p className="text-gray-600 leading-relaxed">Our intelligence operative network spans the globe, 24/7</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="text-4xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>70+</div>
              <p className="text-gray-600 leading-relaxed">We labels over 70 different categories and are adding more</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#001641] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-semibold text-white text-center mb-4" style={{ lineHeight: '110%' }}>
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16">
            Our affiliated companies and partners
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 border border-white/20">
            {affiliatedCompanies.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-center p-12 border-r border-b border-white/20 h-48 hover:bg-white/5 transition-all"
              >
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="max-h-16 max-w-full object-contain grayscale opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] text-center mb-6" style={{ lineHeight: '110%' }}>
          Meet Our Leaders
        </h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          A diverse group of 50+ blockchain experts, spanning the globe and passionate about making blokchains transparent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#001641] mb-1" style={{ lineHeight: '110%' }}>
                  {member.name}
                </h3>
                <p className="text-[#FF8A00] font-medium mb-3">{member.role}</p>
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#001641] hover:text-[#FF8A00] transition-colors"
                  >
                    <Linkedin size={20} />
                    <span className="text-sm font-medium">Connect on LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#001641] py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-6" style={{ lineHeight: '110%' }}>
            Join Our Team
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            We're always looking for talented individuals who share our passion for blockchain intelligence and security. Join us in building the future of decentralized trust.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2" style={{ lineHeight: '110%' }}>
                Senior Blockchain Analyst
              </h3>
              <p className="text-gray-300 mb-4">Intelligence Operations · Remote</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lead investigations and develop new methodologies for identifying wallet clusters across multiple blockchains.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2" style={{ lineHeight: '110%' }}>
                Data Scientist
              </h3>
              <p className="text-gray-300 mb-4">Research & Development · San Francisco or Remote</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Build machine learning models for entity resolution and develop advanced algorithms for blockchain analysis.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2" style={{ lineHeight: '110%' }}>
                Full Stack Engineer
              </h3>
              <p className="text-gray-300 mb-4">Engineering · Remote</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Design and build scalable systems for processing and delivering blockchain intelligence to our clients.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all">
              <h3 className="text-xl font-semibold text-white mb-2" style={{ lineHeight: '110%' }}>
                Client Success Manager
              </h3>
              <p className="text-gray-300 mb-4">Client Success · New York or Remote</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Partner with enterprise clients to ensure they get maximum value from our blockchain intelligence platform.
              </p>
            </div>
          </div>

          <button className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg inline-flex items-center gap-2">
            View All Openings
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] text-center mb-6" style={{ lineHeight: '110%' }}>
          Get in Touch
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 leading-relaxed">
          Have questions about our services? Want to request a sample? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
              Contact Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#001641] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-[#001641]" size={20} />
                </div>
                <div>
                  <p className="font-medium text-[#001641]">Email</p>
                  <a href="mailto:hello@chainlabs.com" className="text-gray-600 hover:text-[#FF8A00] transition-colors">
                    hello@chainlabs.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#001641] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-[#001641]" size={20} />
                </div>
                <div>
                  <p className="font-medium text-[#001641]">Phone</p>
                  <a href="tel:+14155551234" className="text-gray-600 hover:text-[#FF8A00] transition-colors">
                    +1 (415) 555-1234
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#001641] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-[#001641]" size={20} />
                </div>
                <div>
                  <p className="font-medium text-[#001641]">Office</p>
                  <p className="text-gray-600">
                    123 Blockchain Avenue<br />
                    San Francisco, CA 94102<br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#001641] mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#001641] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#001641] mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#001641] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">Message sent successfully! We'll get back to you soon.</p>
              )}

              {submitStatus === 'error' && (
                <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
