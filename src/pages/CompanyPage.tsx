import { useState, useEffect } from 'react';
import { ArrowRight, Linkedin } from 'lucide-react';
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

export default function CompanyPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetchTeamMembers();
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

  return (
    <div>
      <section className="relative bg-[#001641] py-20 lg:py-32 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/workingeyes.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#172B52] opacity-75"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="text-4xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>2018</div>
              <p className="text-gray-600 leading-relaxed">Founded</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="text-4xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>4/4</div>
              <p className="text-gray-600 leading-relaxed">of the top 4 blockchain analytics firms use Chainlabs</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="text-4xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>Global</div>
              <p className="text-gray-600 leading-relaxed">Our intelligence operative network spans the globe, 24/7</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="text-4xl font-semibold text-[#001641] mb-2" style={{ lineHeight: '110%' }}>70+</div>
              <p className="text-gray-600 leading-relaxed">We labels over 70 different categories and are adding more</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F5F6] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-semibold text-[#001641] text-center mb-4" style={{ lineHeight: '110%' }}>
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            Our affiliated companies and partners
          </p>

          <div className="flex flex-col gap-12">
            <div className="flex justify-center items-center gap-16 flex-wrap">
              <img src="/coinbase white logo@3x.png" alt="Coinbase" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/elementus-white.png" alt="Elementus" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/lookintobitcoin white logo.png" alt="LookIntoBitcoin" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/santiment white logo@3x.png" alt="Santiment" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/trm white logo@3x.png" alt="TRM" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
            </div>
            <div className="flex justify-center items-center gap-16 flex-wrap">
              <img src="/scorechain logo@3x.png" alt="Scorechain" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/upsalla white logo@3x.png" alt="Upsalla" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/merkle white logo@3x.png" alt="Merkle" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/iknaio white logo@3x.png" alt="Iknaio" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
            </div>
            <div className="flex justify-center items-center gap-16 flex-wrap">
              <img src="/chainanalysis logo white@3x.png" alt="Chainalysis" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/AML-bot-white-logo.png" alt="AML Bot" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/Elliptic_logo-white.png" alt="Elliptic" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/nansen-white.webp" alt="Nansen" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
              <img src="/OKLink logo.webp" alt="OKLink" className="h-8 object-contain opacity-40 hover:opacity-60 transition-opacity" style={{ filter: 'brightness(0)' }} />
            </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="w-full h-full object-cover object-top grayscale group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#001641] mb-1" style={{ lineHeight: '110%' }}>
                  {member.name}
                </h3>
                <p className="text-[#FF8A00] font-medium mb-3 text-sm">{member.role}</p>
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#001641] hover:text-[#FF8A00] transition-colors text-sm"
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

      <section className="bg-[#F4F5F6] py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold text-[#001641] mb-6" style={{ lineHeight: '110%' }}>
            Join Our Team
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            We're always looking for talented individuals who share our passion for blockchain intelligence and security. Join us in building the future of decentralized trust.
          </p>

          <a
            href="https://chainlabs.notion.site/Chainlabs-Recruiting-7a36a5df1e5347d096542f868bd5e72e"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF8A00] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#e67d00] transition-all hover:shadow-lg inline-flex items-center gap-2"
          >
            View All Openings
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

    </div>
  );
}
