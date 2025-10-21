/*
  # Create Insights and Case Studies Tables

  ## Overview
  This migration creates tables for storing articles and case studies for the Insights page.

  ## New Tables
  
  ### `articles`
  - `id` (uuid, primary key) - Unique identifier for each article
  - `title` (text) - Article title
  - `category` (text) - Article category (e.g., RESEARCH, THOUGHT LEADERSHIP, NEWS)
  - `excerpt` (text) - Brief description/excerpt
  - `content` (text) - Full article content
  - `author` (text) - Author name
  - `published_date` (date) - Publication date
  - `image_url` (text, optional) - Featured image URL
  - `display_order` (integer) - Order for displaying articles
  - `created_at` (timestamptz) - Record creation timestamp

  ### `case_studies`
  - `id` (uuid, primary key) - Unique identifier for each case study
  - `title` (text) - Case study title
  - `client` (text) - Client name or category
  - `challenge` (text) - Problem description
  - `solution` (text) - Solution provided
  - `results` (text) - Outcomes and results
  - `industry` (text) - Industry sector
  - `image_url` (text, optional) - Featured image URL
  - `display_order` (integer) - Order for displaying case studies
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Allow public read access to both tables
  - Restrict writes to authenticated users only
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  published_date date DEFAULT CURRENT_DATE,
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client text NOT NULL,
  challenge text NOT NULL,
  solution text NOT NULL,
  results text NOT NULL,
  industry text NOT NULL,
  image_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view articles"
  ON articles
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view case studies"
  ON case_studies
  FOR SELECT
  USING (true);

INSERT INTO articles (title, category, excerpt, content, author, published_date, display_order) VALUES
  (
    'The State of Blockchain Intelligence in 2025',
    'RESEARCH',
    'An in-depth analysis of emerging trends in wallet labeling and blockchain analytics.',
    'As we enter 2025, the blockchain intelligence landscape continues to evolve rapidly. Our research shows that wallet labeling accuracy has improved by 40% over the past year, driven by advances in machine learning and enhanced data collection methodologies. This report examines the key trends shaping the industry and what they mean for compliance professionals.',
    'Sarah Chen',
    '2025-10-15',
    1
  ),
  (
    'Building Trust in Decentralized Systems',
    'THOUGHT LEADERSHIP',
    'How accurate wallet labels are transforming compliance and risk management.',
    'Trust is the foundation of any financial system, and blockchain is no exception. In this article, we explore how precise wallet labeling creates transparency without compromising privacy, enabling institutions to confidently engage with cryptocurrency while meeting regulatory requirements. We discuss real-world examples and the future of trusted decentralized finance.',
    'Michael Rodriguez',
    '2025-10-10',
    2
  ),
  (
    'Chainlabs Expands Coverage to 25+ Blockchains',
    'NEWS',
    'We are expanding our comprehensive labeling to support more blockchain networks.',
    'Today, we are excited to announce that Chainlabs now provides comprehensive wallet labeling across 25+ blockchain networks, including newly added support for emerging Layer 2 solutions and alternative consensus mechanisms. This expansion reinforces our commitment to providing global coverage for our clients.',
    'Emily Watson',
    '2025-10-05',
    3
  ),
  (
    'Machine Learning in Blockchain Forensics',
    'RESEARCH',
    'How AI and ML are revolutionizing the detection of illicit blockchain activity.',
    'Machine learning has become an indispensable tool in blockchain forensics. Our latest research demonstrates how neural networks can identify patterns in transaction behavior that human analysts might miss. We share insights from our proprietary models that have achieved 95% accuracy in entity clustering.',
    'David Park',
    '2025-09-28',
    4
  ),
  (
    'Regulatory Compliance in the Age of DeFi',
    'THOUGHT LEADERSHIP',
    'Navigating the complex regulatory landscape of decentralized finance.',
    'As DeFi protocols proliferate, regulatory scrutiny intensifies. This article provides a framework for understanding compliance requirements across different jurisdictions and how blockchain intelligence tools can help organizations stay ahead of evolving regulations while participating in the DeFi ecosystem.',
    'Sophia Martinez',
    '2025-09-20',
    5
  ),
  (
    'The Evolution of Cryptocurrency Money Laundering',
    'RESEARCH',
    'A comprehensive study of emerging money laundering techniques and countermeasures.',
    'Cryptocurrency money laundering techniques have grown increasingly sophisticated. Our research team has identified new patterns involving cross-chain bridges, privacy coins, and decentralized exchanges. This report provides detailed analysis of these techniques and effective detection strategies.',
    'James Thompson',
    '2025-09-15',
    6
  );

INSERT INTO case_studies (title, client, challenge, solution, results, industry, display_order) VALUES
  (
    'Major Exchange Implements Real-Time Transaction Monitoring',
    'Leading Cryptocurrency Exchange',
    'A top-tier cryptocurrency exchange needed to enhance their AML compliance program to meet evolving regulatory requirements. Their existing system could not keep pace with transaction volumes and lacked the accuracy needed to reduce false positives.',
    'We implemented our comprehensive wallet labeling solution integrated with their transaction monitoring system. Our API provided real-time entity identification for incoming and outgoing transactions across 15 different blockchains, with custom risk scoring based on their specific compliance policies.',
    'The exchange reduced false positive alerts by 75%, saving over 2,000 hours of analyst time per month. They successfully passed regulatory audits with zero findings related to transaction monitoring. Customer satisfaction improved as legitimate transactions were no longer delayed unnecessarily.',
    'Cryptocurrency Exchange',
    1
  ),
  (
    'Global Bank Launches Institutional Custody Service',
    'Top 10 Global Investment Bank',
    'A major investment bank wanted to offer cryptocurrency custody services to institutional clients but needed to ensure robust compliance with banking regulations. They required detailed attribution for all wallet addresses their clients would interact with.',
    'We provided enterprise-grade wallet intelligence with audit-ready proof of our labeling methodology. Our solution included custom integration with their existing compliance stack and dedicated support for regulatory reporting. We delivered comprehensive coverage across major blockchain networks with weekly updates.',
    'The bank successfully launched their custody service, onboarding $2B in assets under management within the first six months. Our intelligence enabled them to automatically flag high-risk counterparties and maintain complete audit trails for regulatory reporting. The service has since expanded to additional cryptocurrencies.',
    'Traditional Finance',
    2
  ),
  (
    'Blockchain Analytics Firm Enhances Investigation Capabilities',
    'Leading Blockchain Analytics Company',
    'A blockchain analytics provider needed to expand their coverage of emerging blockchains and DeFi protocols to better serve law enforcement and corporate clients. Their in-house labeling effort could not keep pace with the rapid growth of new protocols.',
    'We became their primary data provider for wallet labels, delivering monthly updates covering 250+ new entities. Our intelligence included not just addresses but detailed metadata about entity types, risk indicators, and relationship mapping. We provided API access with sub-second response times for real-time investigations.',
    'The analytics firm expanded their addressable market to include 10 additional blockchain networks they previously could not cover. Investigation times were reduced by 60% due to higher accuracy and more comprehensive labeling. They reported this as a key differentiator in winning contracts with major law enforcement agencies.',
    'Blockchain Analytics',
    3
  ),
  (
    'Fintech Startup Achieves Banking Partner Compliance',
    'Emerging Cryptocurrency Payment Platform',
    'A fast-growing fintech startup needed to meet stringent compliance requirements to secure banking partnerships for their cryptocurrency payment platform. Banking partners required detailed source-of-funds verification for all incoming cryptocurrency transactions.',
    'We deployed our wallet intelligence solution with custom risk categorization aligned to banking compliance standards. The solution included automatic flagging of addresses associated with high-risk services, enhanced due diligence triggers, and detailed reporting for audit purposes.',
    'The startup secured partnerships with three major banks within 90 days of implementation. Transaction approval rates increased by 40% while maintaining strict compliance standards. The automated risk assessment reduced manual review requirements by 80%, enabling the team to scale operations efficiently.',
    'Fintech',
    4
  );
