/*
  # Create Company Page Tables

  ## Overview
  This migration creates the necessary tables for the Company page, including team members, affiliated companies, and contact form submissions.

  ## New Tables
  
  ### `team_members`
  - `id` (uuid, primary key) - Unique identifier for each team member
  - `name` (text) - Full name of the team member
  - `role` (text) - Job title or role
  - `bio` (text) - Brief biography
  - `photo_url` (text) - URL to profile photo
  - `linkedin_url` (text) - LinkedIn profile URL
  - `display_order` (integer) - Order for displaying team members
  - `created_at` (timestamptz) - Record creation timestamp

  ### `affiliated_companies`
  - `id` (uuid, primary key) - Unique identifier for each company
  - `name` (text) - Company name
  - `logo_url` (text) - URL to company logo
  - `description` (text, optional) - Brief description
  - `display_order` (integer) - Order for displaying companies
  - `created_at` (timestamptz) - Record creation timestamp

  ### `contact_submissions`
  - `id` (uuid, primary key) - Unique identifier for each submission
  - `name` (text) - Sender's name
  - `email` (text) - Sender's email
  - `company` (text, optional) - Sender's company
  - `message` (text) - Message content
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Allow public read access to `team_members` and `affiliated_companies`
  - Allow public insert access to `contact_submissions`
  - Restrict updates and deletes to authenticated users only
*/

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text NOT NULL,
  photo_url text NOT NULL,
  linkedin_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS affiliated_companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliated_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
  ON team_members
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view affiliated companies"
  ON affiliated_companies
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

INSERT INTO team_members (name, role, bio, photo_url, linkedin_url, display_order) VALUES
  ('Sarah Chen', 'Chief Executive Officer', 'Sarah leads Chainlabs with over 15 years of experience in blockchain technology and financial compliance. She founded the company with a vision to make blockchain intelligence accessible and actionable.', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://linkedin.com', 1),
  ('Michael Rodriguez', 'Chief Technology Officer', 'Michael oversees all technical operations and product development. His background in distributed systems and machine learning drives our innovative approach to wallet labeling.', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://linkedin.com', 2),
  ('Emily Watson', 'VP of Intelligence Operations', 'Emily manages our global network of intelligence operatives. With a background in financial crime investigation, she ensures the quality and accuracy of our data.', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://linkedin.com', 3),
  ('David Park', 'Head of Research', 'David leads our research initiatives and develops advanced algorithms for blockchain analysis. He has published numerous papers on cryptocurrency tracing and attribution.', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://linkedin.com', 4),
  ('Sophia Martinez', 'VP of Client Success', 'Sophia ensures our clients get maximum value from our platform. She works closely with enterprises to understand their needs and deliver tailored solutions.', 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://linkedin.com', 5),
  ('James Thompson', 'Lead Data Scientist', 'James develops machine learning models for entity resolution and transaction analysis. His work enables us to identify wallet clusters with unprecedented accuracy.', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400', 'https://linkedin.com', 6);

INSERT INTO affiliated_companies (name, logo_url, display_order) VALUES
  ('Coinbase', '/coinbase white logo@3x.png', 1),
  ('Elementus', '/elementus-white.png', 2),
  ('LookIntoBitcoin', '/lookintobitcoin white logo.png', 3),
  ('Santiment', '/santiment white logo@3x.png', 4),
  ('TRM', '/trm white logo@3x.png', 5),
  ('Scorechain', '/scorechain logo@3x.png', 6),
  ('Upsalla', '/upsalla white logo@3x.png', 7),
  ('Merkle', '/merkle white logo@3x.png', 8),
  ('Iknaio', '/iknaio white logo@3x.png', 9);
